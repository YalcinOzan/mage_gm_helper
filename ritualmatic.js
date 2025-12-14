/**
 * ============================================================================
 * MAGE 20TH: RITUALMATIC ENGINE
 * File: ritualmatic.js
 * Version: 2.5 (Core Logic)
 * Content: Dice Roller, Casting Logic, State Management, Generators
 * ============================================================================
 */

/* --- INTERNAL UTILITIES --- */
const getEl = (id) => document.getElementById(id);

/* ============================================================================
   1. GLOBAL STATE & LOGIC
   ============================================================================ */

const appState = {
    mode: 'instant',    // 'instant' or 'ritual'
    sphere: 3,          // Highest sphere rating
    extra: 0,           // Feat magnitude modifiers
    resist: 0,          // Opposition/Resistance
    distract: 0,        // Distraction penalties
    gmDiff: 0,          // Manual GM override for Difficulty
    gmGoal: 0,          // Manual GM override for Goal
    bonusDice: 0,       // Extra dice added to pool
    autoSuc: 0,         // Guaranteed successes (Willpower/Teamwork)

    // Boolean Toggles
    sanctum: false,     // Sanctum bonus (-1 Diff)
    inst: false,        // Personalized Instrument (-1 Diff)
    res: false,         // Research/Library (-1 Diff)
    quint: 0,           // Quintessence spent (0-3 points)
    team: false,        // Teamwork bonus (-1 Diff)
    syn: false,         // Synergy bonus (-1 Diff)
    notool: false,      // No Tool penalty (+3 Diff)
    discord: false,     // Resonance Discord (+1 Diff)
    hb: false,          // Homebrew Duration Scale
    pauseOnDiff: false, // Safety: Pause ritual if Diff increases
    spec: false,         // Specialty (Exploding 10s)
    manualRitual: false
};

// Global Timer for Ritual Mode
let activeTimer = null;

// Ritual Specific State
let ritState = {
    totalSuc: 0,
    turn: 0,
    currentDiff: 6,
    isPaused: false,
    hasStarted: false
};

/* ============================================================================
   2. STATE MANAGEMENT FUNCTIONS
   ============================================================================ */

/**
 * Resets the application to its default state.
 */
function resetAll() {
    if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }

    // Reset State Object
    Object.keys(appState).forEach(key => {
        if (typeof appState[key] === 'boolean') appState[key] = false;
        else if (key === 'mode') appState[key] = 'instant';
        else if (key === 'sphere') appState[key] = 3;
        else appState[key] = 0;
    });

    // Reset UI Inputs
    getEl('sel-reality').value = '3';
    getEl('sel-speed').value = '0';
    getEl('sel-dur').value = '0';
    getEl('sel-targ').value = '0';
    getEl('rng-dmg').value = 0;
    getEl('sel-dmg-type').value = 'Lethal';
    getEl('arete').value = '4';
    getEl('will').value = '5';

    // Reset Visual Classes
    document.querySelectorAll('.btn-tool, .btn-hb, .btn-safety, .btn-square')
        .forEach(b => b.classList.remove('active', 'checked'));

    getEl('badge-quint').style.display = 'none';
    getEl('val-bonusDice').textContent = '0';
    getEl('val-autoSuc').textContent = '0';

    // Update Text Displays
    getEl('val-sphere').textContent = '3';
    getEl('val-extra').textContent = '0';
    getEl('val-resist').textContent = '0';
    getEl('val-distract').textContent = '0';
    getEl('log-container').style.display = 'none';

    ritState = { totalSuc: 0, turn: 0, currentDiff: 6, isPaused: false, hasStarted: false };

    setMode('instant');
    recalculate();
    updateLimits();
}

/**
 * Sets the casting mode.
 * @param {string} modeName - 'instant' or 'ritual'
 */
function setMode(modeName) {
    if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
    appState.mode = modeName;
    getEl('btn-m-inst').className = modeName === 'instant' ? 'mode-opt active' : 'mode-opt';
    getEl('btn-m-rit').className = modeName === 'ritual' ? 'mode-opt active' : 'mode-opt';

    recalculate();
    updateButtonState();
}

function updateButtonState() {
    let btn = getEl('btn-cast');
    if (appState.mode === 'instant') {
        btn.textContent = "CAST INSTANT SPELL";
        btn.className = "btn-cast style-inst";
    } else {
        if (ritState.isPaused) {
            btn.textContent = "CONTINUE RITUAL";
            btn.className = "btn-cast style-pause";
        } else {
            btn.textContent = "BEGIN RITUAL";
            btn.className = "btn-cast style-rit";
        }
    }
}

/**
 * Increments or Decrements a state counter.
 */
function modifyState(key, value) {
    appState[key] += value;

    // Bounds Check: Sphere (1-9)
    if (key === 'sphere') {
        if (appState[key] < 1) appState[key] = 1;
        if (appState[key] > 9) appState[key] = 9;
    }
    // Bounds Check: Min 0 for other counters
    if (['extra', 'resist', 'distract', 'bonusDice', 'autoSuc'].includes(key) && appState[key] < 0) {
        appState[key] = 0;
    }

    const el = getEl('val-' + key);
    if (el) el.textContent = appState[key];
    recalculate();
}

/**
 * Toggles a boolean state or cycles a multi-state value.
 */
function toggleState(key) {
    // Special Case: Quintessence Cycle (0 -> 1 -> 2 -> 3 -> 0)
    if (key === 'quint') {
        appState.quint = (appState.quint + 1) % 4; // Cycle: 0, 1, 2, 3

        const el = getEl('btn-quint');
        const badge = getEl('badge-quint');

        if (appState.quint > 0) {
            el.classList.add('active');
            badge.style.display = 'inline-flex';
            badge.textContent = appState.quint; // Display number
        } else {
            el.classList.remove('active');
            badge.style.display = 'none'; // Hide
        }
    }
    // Standard toggle (boolean) for other buttons
    else {
        appState[key] = !appState[key];

        let id;
        if (key === 'hb') {
            id = 'btn-hb';
        } else if (key === 'pauseOnDiff') {
            id = 'toggle-safety';
        } else if (key === 'manualRitual') {
            id = 'toggle-manual';
        } else {
            id = 'btn-' + key;
        }

        let el = getEl(id);

        // Exclusive Logic: Cannot have both Focus and No-Tools
        if (key === 'notool' && appState[key]) { appState.inst = false; getEl('btn-inst').classList.remove('active'); }
        if (key === 'inst' && appState[key]) { appState.notool = false; getEl('btn-notool').classList.remove('active'); }

        if (appState[key]) el.classList.add('active'); else el.classList.remove('active');
    }

    recalculate();
}

function toggleSpecialty() {
    appState.spec = !appState.spec;
    let el = getEl('btn-spec');
    if (appState.spec) el.classList.add('checked'); else el.classList.remove('checked');
}

function updateLimits() {
    let a = parseInt(getEl('arete').value);
    let w = parseInt(getEl('will').value);
    getEl('val-limit').textContent = a + w;
}

/* ============================================================================
   3. CALCULATION ENGINE
   ============================================================================ */

/**
 * Core Engine: Calculates Base Difficulty and Goal Successes.
 */
function getBaseValues() {
    let sph = parseInt(getEl('val-sphere').textContent);
    let real = parseInt(getEl('sel-reality').value);
    let spd = parseInt(getEl('sel-speed').value);

    // 1. BONUSES
    let sanctumBonus = (appState.sanctum && appState.mode === 'ritual') ? 1 : 0;
    let quintVal = typeof appState.quint === 'number' ? appState.quint : (appState.quint ? 1 : 0);

    let totalBonus = sanctumBonus +
        (appState.inst ? 1 : 0) +
        (appState.res ? 1 : 0) +
        quintVal +
        (appState.team ? 1 : 0) +
        (appState.syn ? 1 : 0);

    // 2. PENALTIES
    let totalPenalty = (appState.notool ? 3 : 0) +
        (appState.discord ? 1 : 0) +
        appState.distract;

    // 3. NET MODIFIER (Cap +/- 3)
    let netMod = totalPenalty - totalBonus + spd;
    if (netMod > 3) netMod = 3;
    if (netMod < -3) netMod = -3;

    // 4. RAW DIFFICULTY
    let rawDiff = sph + real + netMod;
    let floor = Math.max(3, sph); // Minimum Diff = Sphere Rating or 3

    // --- THRESHOLD RULE (M20 p.536) ---
    // If Diff > 9, Diff stays 9, excess becomes required successes.
    let thresholdAdd = 0;
    let finalDiff = rawDiff;

    if (rawDiff > 9) {
        thresholdAdd = rawDiff - 9;
        finalDiff = 9;
    }

    finalDiff = Math.max(floor, finalDiff);

    // --- GOAL CALCULATION ---
    let durIdx = parseInt(getEl('sel-dur').value);
    let durCosts = appState.hb ? [1, 2, 4, 6, 8, 15] : [1, 2, 3, 4, 5, 10];
    let baseDur = durCosts[durIdx];

    let targ = parseInt(getEl('sel-targ').value);
    let dmg = parseInt(getEl('rng-dmg').value);
    let dmgC = Math.ceil(dmg / 2);

    let baseGoal = Math.max(1, baseDur + targ + dmgC + appState.extra + appState.resist + thresholdAdd);

    return { diff: finalDiff, goal: baseGoal };
}

function recalculate() {
    let base = getBaseValues();

    // Text Updates
    let dmg = parseInt(getEl('rng-dmg').value);
    let dmgT = getEl('sel-dmg-type').value;
    let dCol = dmgT === "Lethal" ? "var(--warning)" : (dmgT === "Aggravated" ? "var(--danger)" : "var(--accent)");
    let dTxt = getEl('txt-dmg');

    dTxt.textContent = `${dmg} ${dmgT}`;
    dTxt.style.color = dCol;
    getEl('cost-dmg').textContent = `+${Math.ceil(dmg / 2)} Suc`;

    // Display Values
    let elDiff = getEl('disp-diff');
    let elGoal = getEl('disp-goal');

    // Final Diff & Goal with Manual Overrides
    let finalDiff = base.diff + appState.gmDiff;
    if (finalDiff > 9) finalDiff = 9;
    if (finalDiff < 3) finalDiff = 3;

    elDiff.value = finalDiff;

    let finalGoal = Math.max(1, base.goal + appState.gmGoal);
    elGoal.value = finalGoal;

    if (!ritState.hasStarted) ritState.currentDiff = finalDiff;

    // Visual Styling for Modified Values
    if (appState.gmDiff !== 0) elDiff.classList.add('modified'); else elDiff.classList.remove('modified');
    if (appState.gmGoal !== 0) elGoal.classList.add('modified'); else elGoal.classList.remove('modified');
}

function manualOverride(type) {
    let inputEl = getEl('disp-' + type);
    let rawVal = inputEl.value;
    let base = getBaseValues();

    if (rawVal === "" || isNaN(parseInt(rawVal))) {
        if (type === 'diff') appState.gmDiff = 0; else appState.gmGoal = 0;
    } else {
        let userVal = parseInt(rawVal);

        if (type === 'diff') {
            if (userVal > 9) { userVal = 9; inputEl.value = 9; }
            if (userVal < 3) { userVal = 3; inputEl.value = 3; }
            appState.gmDiff = userVal - base.diff;
        } else {
            if (userVal < 1) { userVal = 1; inputEl.value = 1; }
            appState.gmGoal = userVal - base.goal;
        }
    }
    recalculate();
}

/* ============================================================================
   4. DICE & CASTING ENGINE
   ============================================================================ */

/**
 * Rolls dice and calculates successes.
 */
function doRoll(pool, diff, spec) {
    let suc = 0;
    let ones = 0;
    let results = [];

    for (let i = 0; i < pool; i++) {
        let roll = Math.floor(Math.random() * 10) + 1;
        let isHit = roll >= diff;
        let isBotch = roll === 1;
        let isDouble = (spec && roll === 10);

        let val = roll.toString();

        if (isHit) {
            suc++;
            if (isDouble) {
                suc++;
                val = "10★";
            }
        }

        if (isBotch) {
            ones++;
        }

        results.push({ val: val, raw: roll, hit: isHit, botch: isBotch, double: isDouble });
    }

    return { suc, ones, results };
}

/**
 * Main Casting Function.
 */
function castSpell() {
    let currentSphere = parseInt(getEl('val-sphere').textContent);
    let currentArete = parseInt(getEl('arete').value);

    // Safety Check: Sphere rating cannot exceed Arete (M20 Core)
    if (currentSphere > currentArete) { showError("Invalid Cast"); return; }

    if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }

    getEl('log-container').style.display = 'block';

    // POOL CALCULATION
    let baseArete = parseInt(getEl('arete').value);
    let totalPool = baseArete + appState.bonusDice;
    let goal = parseInt(getEl('disp-goal').value);
    let limit = parseInt(getEl('val-limit').textContent);

    // --- INSTANT MODE ---
    if (appState.mode === 'instant') {
        getEl('log-title').textContent = "Instant Result";
        getEl('prog-txt').textContent = "";
        getEl('p-bar').style.width = "0%";
        getEl('logs').innerHTML = "";

        let diff = parseInt(getEl('disp-diff').value);
        let res = doRoll(totalPool, diff, appState.spec);
        let net = res.suc - res.ones + appState.autoSuc;
        let type = "fail", msg = "";

        if (appState.autoSuc === 0 && res.suc === 0 && res.ones > 0) {
            type = "botch"; msg = `BOTCH! (${res.ones} Pdx)`;
        } else if (net < 1) {
            type = "fail"; msg = "FAILED";
        } else if (net < goal) {
            type = "fail"; msg = `WEAK (${net}/${goal} Suc)`;
        } else {
            type = "success"; msg = `SUCCESS! (${net} Suc)`;
        }
        addLogEntry(1, diff, res, msg, type);
        return;
    }

    // --- RITUAL MODE ---
    getEl('log-title').textContent = "Ritual Progress";

    // Initialize State if not started
    if (!ritState.hasStarted) {
        getEl('logs').innerHTML = "";
        ritState.totalSuc = 0;
        ritState.turn = 0;
        ritState.currentDiff = parseInt(getEl('disp-diff').value);
        ritState.hasStarted = true;
        ritState.isPaused = false;
    } else {
        ritState.isPaused = false;
    }

    // --- TURN PROCESSOR ---
    const processTurn = () => {
        ritState.turn++;
        let res = doRoll(totalPool, ritState.currentDiff, appState.spec);
        let net = res.suc - res.ones + appState.autoSuc;
        let type = "", msg = "";
        let diffIncreased = false;
        let isFinished = false;

        // 1. Botch Check
        if (appState.autoSuc === 0 && res.suc === 0 && res.ones > 0) {

            // A) PARADOX PUANI HESABI (Paradox Wheel) - Ref: M20 p.547
            let sph = parseInt(getEl('val-sphere').textContent); // En yüksek küre
            let real = parseInt(getEl('sel-reality').value);     // 3=Coin, 4=Vulg, 5=Wit
            let paradoxPoints = 0;

            if (real === 3) {
                // Coincidental: 1 pt per dot (Sadece Botch durumunda)
                paradoxPoints = sph;
            } else if (real === 4) {
                // Vulgar: 1 pt + 1 pt per dot
                paradoxPoints = 1 + sph;
            } else { // 5 (Witness)
                // Vulgar w/ Witness: 2 pts + 2 pts per dot
                paradoxPoints = 2 + (2 * sph);
            }

            // Severity: Atılan her "1" zarı, Paradox puanını artırır.
            paradoxPoints += res.ones;

            // B) BACKLASH (Geri Tepme) - Ref: M20 p.552
            // Ritüelde o ana kadar biriken başarılar hasara dönüşür.
            let backlashEnergy = ritState.totalSuc;

            // LOGLAMA VE BİTİRİŞ
            msg = `BOTCH!`;

            // 1. Satır: Paradox Puanı (Wheel)
            addSystemMsg(`⚠️ PARADOX GAINED: ${paradoxPoints} Points`, false);

            // 2. Satır: Backlash Uyarısı (Eğer birikmiş başarı varsa)
            if (backlashEnergy > 0) {
                addSystemMsg(`💥 BACKLASH DISCHARGE: ${backlashEnergy} Levels of Damage/Effect!`, false);
            } else {
                addSystemMsg(`💥 BACKLASH: Minor Fizzle (0 Energy stored)`, false);
            }

            type = "botch";
            isFinished = true;
        }
        // 2. Normal Result
        else {
            if (net <= 0) {
                type = "fail";
                if (net < 0) {
                    ritState.totalSuc += net;
                    if (ritState.totalSuc < 0) ritState.totalSuc = 0;
                    msg = `Fail (${net})`;
                } else {
                    msg = "Fail (0). Diff +1";
                }
                if (ritState.currentDiff < 9) {
                    ritState.currentDiff++;
                    diffIncreased = true;
                }
            } else {
                type = "success";
                ritState.totalSuc += net;
                msg = `+${net} Suc`;
            }
        }

        // Log & UI Update
        if (type) {
            addLogEntry(ritState.turn, diffIncreased ? ritState.currentDiff - 1 : ritState.currentDiff, res, msg, type);
            let pct = (ritState.totalSuc / goal) * 100;
            if (pct > 100) pct = 100;
            getEl('p-bar').style.width = pct + "%";
            getEl('prog-txt').textContent = `${ritState.totalSuc} / ${goal}`;
        }

        // End Conditions
        if (isFinished) {
            resetRitualState();
            return true;
        }
        if (ritState.totalSuc >= goal) {
            addSystemMsg("RITUAL COMPLETE", true);
            resetRitualState();
            return true;
        }
        if (ritState.turn >= limit) {
            addSystemMsg("EXHAUSTED (Willpower Limit)", false);
            resetRitualState();
            return true;
        }
        if (diffIncreased && appState.pauseOnDiff && !appState.manualRitual) {
            ritState.isPaused = true;
            addSystemMsg(`PAUSED (Diff Increased to ${ritState.currentDiff})`, false);
            updateButtonState();
            if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
            return true;
        }

        return false;
    };

    const resetRitualState = () => {
        if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
        ritState = { totalSuc: 0, turn: 0, currentDiff: 6, isPaused: false, hasStarted: false };
        updateButtonState();
    };

    // --- EXECUTION (Auto vs Manual) ---
    if (appState.manualRitual) {
        let finished = processTurn();
        if (!finished) {
            let btn = getEl('btn-cast');
            btn.textContent = `ROLL TURN ${ritState.turn + 1}`;
            btn.className = "btn-cast-compact style-rit";
        }
    } else {
        updateButtonState();
        activeTimer = setInterval(() => {
            processTurn();
        }, 600);
    }
}

/* ============================================================================
   5. LOGGING & DISPLAY
   ============================================================================ */

function addLogEntry(turn, diff, rollData, msg, type) {
    const entry = document.createElement('div');
    entry.className = `entry ${type}`;

    const info = document.createElement('div');
    info.innerHTML = `<b>T${turn}</b> <span style="opacity:0.6">(${diff})</span>`;

    const diceSpan = document.createElement('span');
    diceSpan.className = 'dice';
    diceSpan.style.marginLeft = "10px";

    rollData.results.forEach(r => {
        const s = document.createElement('span');
        s.textContent = r.val;
        if (r.botch) { s.className = 'd1 hl-red'; }
        else if (r.hit && !r.botch) { s.className = 'suc hl-green'; }
        else { s.style.color = 'var(--text-muted)'; }
        s.style.marginRight = "4px";
        diceSpan.appendChild(s);
    });

    const msgDiv = document.createElement('b');
    msgDiv.textContent = msg;

    info.appendChild(diceSpan);
    entry.appendChild(info);
    entry.appendChild(msgDiv);

    const logs = getEl('logs');
    logs.insertBefore(entry, logs.firstChild);
}

function addSystemMsg(txt, win) {
    const div = document.createElement('div');
    let c = win ? "var(--success)" : "var(--text-muted)";
    div.style.cssText = `text-align:center; padding:10px; margin-bottom:10px; border:2px solid ${c}; color:${c}; border-radius:8px; font-weight:800;`;
    div.textContent = txt;
    const logs = getEl('logs');
    logs.insertBefore(div, logs.firstChild);
}

/* ============================================================================
   6. GENERATORS
   ============================================================================ */

const npcRoles = ["Techno-Hacker", "Hermit", "Corporate Mage", "Street Shaman", "Necromancer", "Hitman", "Cultist", "Detective", "Spirit Guide"];
const npcTraits = ["Paranoid", "Arrogant", "Helpful", "Cryptic", "Aggressive", "Sleepy", "Fanatical", "Charming"];
function genNPC() { getEl('res-npc').textContent = `${npcTraits[Math.floor(Math.random() * npcTraits.length)]} ${npcRoles[Math.floor(Math.random() * npcRoles.length)]}`; }

const resonances = ["Fiery (Dynamic)", "Cold (Static)", "Rotting (Entropic)", "Holy (Static/Primordial)", "Industrial (Static/Tech)", "Wild (Dynamic/Primal)", "Empty (Static)"];
function genRes() { getEl('res-rez').textContent = resonances[Math.floor(Math.random() * resonances.length)]; }

const flaws = ["Clocks run backwards", "Shadows detach", "Echoing voice", "Tech glitch", "Milk sours", "Temperature drop", "Sulfur smell", "Animals panic"];
function genFlaw() { getEl('res-flaw').textContent = flaws[Math.floor(Math.random() * flaws.length)]; }

/* --- QUICK ROLL ENGINE (Visual Dice Edition) --- */
window.quickRoll = () => {
    let p = parseInt(document.getElementById('q-pool').value) || 1;
    let d = parseInt(document.getElementById('q-diff').value) || 6;

    // Zarları at
    let res = doRoll(p, d, false);

    // Net Sonuç
    let net = res.suc - res.ones;
    let el = document.getElementById('q-res');

    // 1. Özet Metni Hazırla
    let mainText = "";
    let colorStyle = "";

    if (res.suc === 0 && res.ones > 0) {
        mainText = "⚠️ BOTCH!";
        colorStyle = "color: var(--danger); text-shadow: 0 0 10px rgba(239, 83, 80, 0.4);";
    } else if (net <= 0) {
        mainText = "FAILURE";
        colorStyle = "color: var(--text-muted);";
    } else {
        mainText = `${net} SUCCESS${net > 1 ? 'ES' : ''}`;
        colorStyle = "color: var(--success); font-weight:800;";
    }

    // 2. Zar Görsellerini Oluştur (Dice Visualization)
    let diceHTML = `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:8px;">`;

    res.results.forEach(r => {
        // Renk Kodlaması: 1=Kırmızı, Başarı=Yeşil, Başarısız=Gri
        let borderColor = "var(--border)";
        let textColor = "var(--text-muted)";
        let bg = "rgba(255,255,255,0.05)";

        if (r.botch) {
            borderColor = "var(--danger)";
            textColor = "var(--danger)";
            bg = "rgba(239, 83, 80, 0.1)";
        } else if (r.hit) {
            borderColor = "var(--success)";
            textColor = "var(--success)";
            bg = "rgba(102, 187, 106, 0.1)";
        }

        diceHTML += `
            <span style="
                display:inline-flex; align-items:center; justify-content:center;
                width:26px; height:26px;
                border:1px solid ${borderColor};
                background:${bg};
                color:${textColor};
                border-radius:3px;
                font-family:var(--font-mono);
                font-weight:700;
                font-size:0.8rem;
            ">${r.val}</span>
        `;
    });
    diceHTML += `</div>`;

    // 3. Ekrana Bas
    el.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:flex-start;">
            <div style="display:flex; justify-content:space-between; width:100%; align-items:baseline;">
                <span style="${colorStyle} font-size:1.1rem; letter-spacing:0.5px;">${mainText}</span>
                <span style="font-size:0.65rem; color:#666; font-family:var(--font-mono);">Diff: ${d}</span>
            </div>
            ${diceHTML}
        </div>
    `;
};

// EOF: ritualmatic.js