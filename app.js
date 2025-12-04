/**
 * ==========================================
 * MAGE 20TH: SECRET LIBRARY - LOGIC CORE
 * File: app.js
 * Architect: Refactor Bey
 * ==========================================
 */

/* 1. GLOBAL STATE MANAGEMENT */
const appState = {
    mode: 'instant',    // 'instant' or 'ritual'
    sphere: 3,
    extra: 0,
    resist: 0,
    distract: 0,
    gmDiff: 0,          // Manual Override
    gmGoal: 0,          // Manual Override
    // Toggles
    sanctum: false,
    inst: false,
    res: false,
    quint: false,
    team: false,
    syn: false,
    notool: false,
    discord: false,
    hb: false,          // Homebrew Rule
    pauseOnDiff: false, // Safety Protocol
    spec: false         // Specialty Logic
};

let activeTimer = null;
let ritState = {
    totalSuc: 0,
    turn: 0,
    currentDiff: 6,
    isPaused: false,
    hasStarted: false
};

/* 2. DOM UTILITIES */
const getEl = (id) => document.getElementById(id);

/* 3. NAVIGATION & UI LOGIC */
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    getEl(tabId).classList.add('active');
    btn.classList.add('active');
}

function switchSubTab(tabId, btn) {
    document.querySelectorAll('.sub-tab-content').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
    getEl(tabId).classList.add('active');
    btn.classList.add('active');
}

function toggleAcc(header) {
    header.parentElement.classList.toggle('open');
}

function filterContent() {
    let input = getEl('searchBox').value.toLowerCase();
    document.querySelectorAll('.card, .data-row').forEach(item => {
        let text = item.innerText.toLowerCase();
        // Append hidden search tags if available
        if (item.getAttribute('data-search')) {
            text += " " + item.getAttribute('data-search').toLowerCase();
        }

        if (text.includes(input)) {
            item.style.display = "";
            // Auto-open accordion if a child match is found
            if (item.classList.contains('data-row')) {
                item.closest('.acc-item').classList.add('open');
            }
        } else {
            item.style.display = "none";
        }
    });
}

// Tooltip Logic (Initialized on Load)
function initTooltips() {
    const tt = getEl('tooltip');
    const ttT = tt.querySelector('.tt-title');
    const ttD = tt.querySelector('.tt-desc');
    const ttR = tt.querySelector('.tt-ref');

    document.querySelectorAll('[data-title]').forEach(el => {
        el.addEventListener('mousemove', e => {
            tt.style.display = 'block';
            let x = e.clientX + 15, y = e.clientY + 15;
            // Prevent tooltip from going off-screen right
            if (x + 280 > window.innerWidth) x = e.clientX - 295;

            tt.style.left = x + 'px';
            tt.style.top = y + 'px';

            if (ttT.innerText !== el.dataset.title) {
                ttT.innerText = el.dataset.title;
                ttD.innerText = el.dataset.desc;
                ttR.innerText = el.dataset.ref;
            }
        });
        el.addEventListener('mouseleave', () => tt.style.display = 'none');
    });
}

// Error Modal
function showError(msg) { getEl('error-modal').style.display = 'flex'; }
function closeError() { getEl('error-modal').style.display = 'none'; }


/* 4. APP LOGIC: STATE MODIFIERS */
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

function setMode(modeName) {
    if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
    appState.mode = modeName;
    getEl('btn-m-inst').className = modeName === 'instant' ? 'mode-opt active' : 'mode-opt';
    getEl('btn-m-rit').className = modeName === 'ritual' ? 'mode-opt active' : 'mode-opt';
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

function modifyState(key, value) {
    appState[key] += value;
    // Clamping logic (Min 1, Max 9 for Spheres)
    if (key === 'sphere') {
        if (appState[key] < 1) appState[key] = 1;
        if (appState[key] > 9) appState[key] = 9;
    }
    // Min 0 for counters
    if ((key === 'extra' || key === 'resist' || key === 'distract') && appState[key] < 0) {
        appState[key] = 0;
    }

    const el = getEl('val-' + key);
    if (el) el.textContent = appState[key];
    recalculate();
}

function toggleState(key) {
    appState[key] = !appState[key];

    // Map keys to specific IDs if they differ from standard pattern
    let id;
    if (key === 'hb') id = 'btn-hb';
    else if (key === 'pauseOnDiff') id = 'toggle-safety';
    else id = 'btn-' + key;

    let el = getEl(id);

    // Exclusive Logic (Focus vs No Tools)
    if (key === 'notool' && appState[key]) {
        appState.inst = false;
        getEl('btn-inst').classList.remove('active');
    }
    if (key === 'inst' && appState[key]) {
        appState.notool = false;
        getEl('btn-notool').classList.remove('active');
    }

    if (appState[key]) el.classList.add('active'); else el.classList.remove('active');
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


/* 5. CALCULATOR ENGINE */
function getBaseValues() {
    let sph = parseInt(getEl('val-sphere').textContent);
    let real = parseInt(getEl('sel-reality').value);
    let spd = parseInt(getEl('sel-speed').value);

    // Calculate Bonuses (Capped at -3)
    let bon = (appState.sanctum ? 1 : 0) +
        (appState.inst ? 1 : 0) +
        (appState.res ? 1 : 0) +
        (appState.quint ? 1 : 0) +
        (appState.team ? 1 : 0) +
        (appState.syn ? 1 : 0);
    if (bon > 3) bon = 3;

    // Calculate Penalties
    let pen = (appState.notool ? 3 : 0) +
        (appState.discord ? 1 : 0) +
        appState.distract;

    let baseDiff = sph + real + spd - bon + pen;
    let floor = Math.max(3, sph); // Min diff is sphere rating or 3

    baseDiff = Math.max(floor, Math.min(baseDiff, 10)); // Clamp between floor and 10

    // Goal Calculation
    let durIdx = parseInt(getEl('sel-dur').value);
    let durCosts = appState.hb ? [1, 2, 4, 6, 10] : [1, 2, 3, 4, 6]; // Homebrew vs Standard
    let baseDur = durCosts[durIdx];

    let targ = parseInt(getEl('sel-targ').value);
    let dmg = parseInt(getEl('rng-dmg').value);
    let dmgC = Math.ceil(dmg / 2);

    let baseGoal = Math.max(1, baseDur + targ + dmgC + appState.extra + appState.resist);

    return { diff: baseDiff, goal: baseGoal };
}

function recalculate() {
    let base = getBaseValues();

    // Damage Text Update
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

    elDiff.value = base.diff + appState.gmDiff;
    elGoal.value = base.goal + appState.gmGoal;

    if (!ritState.hasStarted) ritState.currentDiff = parseInt(elDiff.value);

    // Visual indicator if modified by GM
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
        if (type === 'diff') appState.gmDiff = userVal - base.diff;
        else appState.gmGoal = userVal - base.goal;
    }
    recalculate();
}


/* 6. DICE ROLLING ENGINE */
function doRoll(pool, diff, spec) {
    let suc = 0, ones = 0, results = [];
    for (let i = 0; i < pool; i++) {
        let d = Math.floor(Math.random() * 10) + 1;
        if (d >= diff) suc++;
        if (d === 1) ones++;

        let val = d;

        // Exploding dice logic (Specialty)
        if (spec && d === 10) {
            let x = Math.floor(Math.random() * 10) + 1;
            if (x >= diff) suc++;
            val = `10+${x}`;
        }
        results.push({ val: val, raw: d, hit: d >= diff, botch: d === 1 });
    }
    return { suc, ones, results };
}

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


/* 7. CASTING MAIN FUNCTION */
function castSpell() {
    let currentSphere = parseInt(getEl('val-sphere').textContent);
    let currentArete = parseInt(getEl('arete').value);

    if (currentSphere > currentArete) { showError("Invalid Cast"); return; }

    if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
    getEl('log-container').style.display = 'block';

    let arete = parseInt(getEl('arete').value);
    let goal = parseInt(getEl('disp-goal').value);
    let limit = parseInt(getEl('val-limit').textContent);

    // --- MODE 1: INSTANT CAST ---
    if (appState.mode === 'instant') {
        getEl('log-title').textContent = "Instant Result";
        getEl('prog-txt').textContent = "";
        getEl('p-bar').style.width = "0%";
        getEl('logs').innerHTML = "";

        let diff = parseInt(getEl('disp-diff').value);
        let res = doRoll(arete, diff, appState.spec);
        let net = res.suc - res.ones;
        let type = "fail", msg = "";

        if (res.suc === 0 && res.ones > 0) { type = "botch"; msg = `BOTCH! (${res.ones} Pdx)`; }
        else if (net < 1) { msg = "FAILED"; }
        else if (net < goal) { msg = `WEAK (${net}/${goal} Suc)`; }
        else { type = "success"; msg = `SUCCESS! (${net} Suc)`; }

        addLogEntry(1, diff, res, msg, type);
        return;
    }

    // --- MODE 2: RITUAL CAST ---
    getEl('log-title').textContent = "Ritual Progress";

    // Initialization Check
    if (!ritState.isPaused) {
        getEl('logs').innerHTML = "";
        ritState.totalSuc = 0;
        ritState.turn = 0;
        ritState.currentDiff = parseInt(getEl('disp-diff').value);
        ritState.hasStarted = true;
    } else {
        ritState.isPaused = false;
        updateButtonState();
    }

    // Update UI Bars
    getEl('prog-txt').textContent = `${ritState.totalSuc} / ${goal}`;
    getEl('p-bar').style.width = (ritState.totalSuc / goal * 100) + "%";

    // Timer Loop
    activeTimer = setInterval(() => {
        ritState.turn++;
        let res = doRoll(arete, ritState.currentDiff, appState.spec);
        let net = res.suc - res.ones;
        let type = "", msg = "";
        let diffIncreased = false;

        // 1. Botch Logic
        if (res.suc === 0 && res.ones > 0) {
            clearInterval(activeTimer); activeTimer = null;
            let pdx = ritState.totalSuc + res.ones;
            msg = `BOTCH! (${pdx} Pdx)`;
            addSystemMsg("BACKLASH - RITUAL FAILED", false);
            type = "botch";
            ritState = { totalSuc: 0, turn: 0, currentDiff: 6, isPaused: false, hasStarted: false };
            updateButtonState();
        }
        // 2. Normal Logic
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
                if (ritState.currentDiff < 10) { ritState.currentDiff++; diffIncreased = true; }
            } else {
                type = "success";
                ritState.totalSuc += net;
                msg = `+${net} Suc`;
            }
        }

        if (type) {
            addLogEntry(ritState.turn, diffIncreased ? ritState.currentDiff - 1 : ritState.currentDiff, res, msg, type);

            let pct = (ritState.totalSuc / goal) * 100;
            if (pct > 100) pct = 100;
            getEl('p-bar').style.width = pct + "%";
            getEl('prog-txt').textContent = `${ritState.totalSuc} / ${goal}`;

            // CHECK: Pause Safety
            if (diffIncreased && appState.pauseOnDiff && ritState.totalSuc < goal) {
                clearInterval(activeTimer); activeTimer = null;
                ritState.isPaused = true;
                updateButtonState();
                addSystemMsg(`PAUSED (Diff Increased to ${ritState.currentDiff})`, false);
                return;
            }

            // CHECK: Win Condition
            if (ritState.totalSuc >= goal) {
                clearInterval(activeTimer); activeTimer = null;
                addSystemMsg("RITUAL COMPLETE", true);
                ritState = { totalSuc: 0, turn: 0, currentDiff: 6, isPaused: false, hasStarted: false };
                updateButtonState();
            }
            // CHECK: Exhaustion (Turn Limit)
            else if (ritState.turn >= limit) {
                clearInterval(activeTimer); activeTimer = null;
                addSystemMsg("EXHAUSTED (Willpower Limit)", false);
                ritState = { totalSuc: 0, turn: 0, currentDiff: 6, isPaused: false, hasStarted: false };
                updateButtonState();
            }
        }
    }, 600);
}


/* 8. RANDOM GENERATORS */
const npcRoles = ["Techno-Hacker", "Hermit", "Corporate Mage", "Street Shaman", "Necromancer", "Hitman", "Cultist", "Detective", "Spirit Guide"];
const npcTraits = ["Paranoid", "Arrogant", "Helpful", "Cryptic", "Aggressive", "Sleepy", "Fanatical", "Charming"];
function genNPC() { getEl('res-npc').textContent = `${npcTraits[Math.floor(Math.random() * npcTraits.length)]} ${npcRoles[Math.floor(Math.random() * npcRoles.length)]}`; }

const resonances = ["Fiery (Dynamic)", "Cold (Stasis)", "Rotting (Entropic)", "Holy (Sacred)", "Industrial (Tech)", "Wild (Primal)", "Empty (Static)"];
function genRes() { getEl('res-rez').textContent = resonances[Math.floor(Math.random() * resonances.length)]; }

const flaws = ["Clocks run backwards", "Shadows detach", "Echoing voice", "Tech glitch", "Milk sours", "Temperature drop", "Sulfur smell", "Animals panic"];
function genFlaw() { getEl('res-flaw').textContent = flaws[Math.floor(Math.random() * flaws.length)]; }

function quickRoll() {
    let p = parseInt(getEl('q-pool').value) || 1;
    let d = parseInt(getEl('q-diff').value) || 6;
    let suc = 0, ones = 0;
    for (let i = 0; i < p; i++) {
        let r = Math.floor(Math.random() * 10) + 1;
        if (r >= d) suc++;
        if (r === 1) ones++;
    }
    let net = suc - ones;
    let el = getEl('q-res');
    if (suc === 0 && ones > 0) { el.textContent = "BOTCH!"; el.style.color = "var(--danger)"; }
    else if (net < 0) { el.textContent = "FAIL"; el.style.color = "var(--text-muted)"; }
    else { el.textContent = `${net} SUCCESSES`; el.style.color = "var(--success)"; }
}

/* 9. INITIALIZATION */
window.onload = function () {
    recalculate();
    updateLimits();
    initTooltips();
};