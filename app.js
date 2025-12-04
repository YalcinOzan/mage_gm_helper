/**
 * ==========================================
 * MAGE 20TH: SECRET LIBRARY - LOGIC CORE
 * File: app.js
 * Architect: Refactor Bey
 * ==========================================
 */

/* ==========================================
   DATA LAYER: ROTE DATABASE (JSON)
   ========================================== */
const ROTE_DB = [
    // --- COMBAT & MARTIAL ARTS ---
    { cat: "combat", name: "Chi-Fire Punch", meta: "Prime 2", desc: "Inflict Aggravated damage with bare hands.", flavor: "Channels Quintessence into fists. Cost: 1 Quint/strike. (HDYDT p.65)" },
    { cat: "combat", name: "The Slipstream", meta: "Forces 2 / Corr 2", desc: "Subtract successes from attacker's roll.", flavor: "Bend light/gravity to appear slightly away from actual location. (HDYDT p.67)" },
    { cat: "combat", name: "The Neo (Bullet Stop)", meta: "Forces 2", desc: "Stop projectiles in mid-air. Vulgar.", flavor: "Creates a kinetic shield that halts bullets instantly. (HDYDT p.67)" },
    { cat: "combat", name: "Internal Burn", meta: "Life 3 + Forces 2", desc: "Inflict Aggravated damage ignoring armor.", flavor: "Disrupts bio-electrical processes. Lethal or Agg. (HDYDT p.33)" },
    { cat: "combat", name: "Curve Bullet", meta: "Forces 2 (+ Corr 1)", desc: "-1 to -3 diff on ranged attacks.", flavor: "Alters gravity/wind to make impossible shots possible. (HDYDT p.34)" },
    { cat: "combat", name: "Rubbing the Bones", meta: "Prime 2", desc: "Inflict bashing damage via friction. Stuns.", flavor: "Agitates the target's pattern, causing internal friction. (HDYDT p.48)" },
    { cat: "combat", name: "Delayed Death Touch", meta: "Time 4 + Life 3", desc: "Set a Time Trigger for damage.", flavor: "Strikes a fatal blow that takes effect after a delay. (HDYDT p.64)" },
    { cat: "combat", name: "Chi-Field Push", meta: "Forces 2 + Prime 2", desc: "Knockback enemies without touching.", flavor: "Projects a wall of force to send opponents flying. (HDYDT p.64)" },
    { cat: "combat", name: "Iron Skin", meta: "Life 3 / Matter 3", desc: "Soak Lethal/Aggravated damage.", flavor: "Transforms skin into stone/metal to withstand attacks. (HDYDT p.67)" },
    { cat: "combat", name: "War Dance", meta: "Life 4 + Mind 2", desc: "Buff allies' Str/Stam and remove fear.", flavor: "Ritual dance instilling bloodlust and resilience. (HDYDT p.61)" },
    { cat: "combat", name: "Quintessence Blade", meta: "Prime 3 (+ Forces 3)", desc: "Conjure weapon of pure energy (Agg Dmg).", flavor: "Creates a blade of plasma/magic. Cost: 1 Quint/turn. (HDYDT p.46)" },
    { cat: "combat", name: "Velocity Boost", meta: "Forces 2 / Entropy 2", desc: "Increase damage by velocity.", flavor: "Uses gravity/entropy for impossible aerial strikes. (HDYDT p.68)" },
    { cat: "combat", name: "Battle Fury", meta: "Life 3 + Mind 3", desc: "Ignore wound penalties, boost stats.", flavor: "Uncages the beast within. Attacks friend and foe alike. (HDYDT p.68)" },
    { cat: "combat", name: "Shiva/Kali Form", meta: "Life 4 + Spirit 4 + Mind 3", desc: "Giant combat avatar. Godlike.", flavor: "Transforms into a 12ft god of destruction. Vulgar. (HDYDT p.69)" },

    // --- TRANSMUTATION & ELEMENTS ---
    { cat: "transmutation", name: "Conjure Object", meta: "Matter 3 + Prime 2", desc: "Create complex matter from nothing.", flavor: "Weaves Quintessence into a pattern. Permanent with Prime 4. (HDYDT p.45)" },
    { cat: "transmutation", name: "Base Transmutation", meta: "Matter 2", desc: "Turn one substance into another.", flavor: "Alchemy: Lead to gold, water to wine, air to stone. (HDYDT p.27)" },
    { cat: "transmutation", name: "Shapechange (Self)", meta: "Life 4", desc: "Transform own body (Wolf, Bird, etc).", flavor: "Alter biology to take animal forms or change appearance. (HDYDT p.19)" },
    { cat: "transmutation", name: "Shapechange (Other)", meta: "Life 5 / Matter 5", desc: "Turn enemy into lawn chair or toad.", flavor: "Rewrites target's pattern. Hard against unwilling targets. (HDYDT p.19)" },
    { cat: "transmutation", name: "Install Cybernetics", meta: "Life 4 + Matter 4", desc: "Fuse machine parts with living flesh.", flavor: "Union of biology and technology. Permanent causes Paradox. (HDYDT p.23)" },
    { cat: "transmutation", name: "Conjure Light/Fire", meta: "Forces 3 + Prime 2", desc: "Create energy from nothing.", flavor: "Light in darkness or fire without fuel. Cost: 1 Quint. (HDYDT p.32)" },
    { cat: "transmutation", name: "Weather Witching", meta: "Forces 4 (+ Entropy 3)", desc: "Summon storm or clear skies.", flavor: "Manipulates large-scale weather. Takes time to manifest. (HDYDT p.38)" },
    { cat: "transmutation", name: "Invisibility", meta: "Forces 2", desc: "Bend light around subject.", flavor: "Makes subject visually undetectable by bending light waves. (HDYDT p.34)" },
    { cat: "transmutation", name: "Accelerated Decay", meta: "Entropy 3 + Time 3", desc: "Rust metal or rot wood instantly.", flavor: "Speeds up natural entropy causing objects to crumble. (HDYDT p.111)" },
    { cat: "transmutation", name: "Elemental Wall", meta: "Forces/Matter 3 + Prime 2", desc: "Wall of fire, ice, or stone.", flavor: "Creates a barrier. Damage based on successes. (HDYDT p.37)" },
    { cat: "transmutation", name: "Petrify", meta: "Life 4 + Matter 2", desc: "Turn living flesh into stone.", flavor: "Transmutes biological cells into inert matter. Kills if permanent. (HDYDT p.27)" },
    { cat: "transmutation", name: "Create Food/Water", meta: "Life 3 + Matter 3", desc: "Conjure nourishment.", flavor: "Creates edible matter. Taste depends on successes. (HDYDT p.32)" },
    { cat: "transmutation", name: "EMP Blackout", meta: "Forces 2 (+ Matter 2)", desc: "Kill power grid or devices.", flavor: "Drains or overloads electrical energy in an area. (HDYDT p.31)" },

    // --- TRAVEL & TIME ---
    { cat: "travel", name: "Teleport", meta: "Correspondence 3", desc: "Instant travel to known location.", flavor: "Instantly moves pattern from A to B. (HDYDT p.76)" },
    { cat: "travel", name: "Open Gateway", meta: "Correspondence 4", desc: "Create stable portal for others.", flavor: "Opens a wormhole/door that others can walk through. (HDYDT p.79)" },
    { cat: "travel", name: "Co-Location", meta: "Correspondence 4", desc: "Be in multiple places at once.", flavor: "Exist in multiple locations. Actions split between them. (HDYDT p.79)" },
    { cat: "travel", name: "Levitation / Flight", meta: "Forces 2 (+ Life 2)", desc: "Defy gravity (Self).", flavor: "Alter gravity or ride wind. Speed depends on Forces. (HDYDT p.75)" },
    { cat: "travel", name: "Bullet Time", meta: "Time 3", desc: "Gain extra actions.", flavor: "Speeds up personal time. 1 Extra Action per 2 Suc. (HDYDT p.68)" },
    { cat: "travel", name: "Rewind Time", meta: "Time 3", desc: "Turn back time (Vulgar & Dangerous).", flavor: "Reverses time flow. Very high diff/Paradox cost. (HDYDT p.111)" },
    { cat: "travel", name: "Time Freeze", meta: "Time 4", desc: "Suspend object/person in time.", flavor: "Pauses the target in a bubble of static time. (HDYDT p.112)" },
    { cat: "travel", name: "The Blink", meta: "Correspondence 3", desc: "Rapid, combat-range teleportation.", flavor: "Short range teleports to confuse enemies/gain position. (HDYDT p.77)" },
    { cat: "travel", name: "The Batman", meta: "Forces 2 + Corr 3", desc: "Vanish into shadows/smoke.", flavor: "Uses smoke/shadows to mask teleport (Coincidental). (HDYDT p.77)" },
    { cat: "travel", name: "Move Mountain", meta: "Corr 5 + Forces 5", desc: "Move an entire location/building.", flavor: "Teleports a whole building or landscape. Godlike feat. (HDYDT p.82)" },
    { cat: "travel", name: "Flying Vehicle", meta: "Forces 2 + Matter 2", desc: "Enchant vehicle to fly.", flavor: "Alters gravity/aerodynamics of a car or carpet. (HDYDT p.75)" },
    { cat: "travel", name: "Traffic Control", meta: "Entropy 2 / Forces 2", desc: "Clear crowds or flip lights.", flavor: "Manipulate probability or electronics to clear path. (HDYDT p.75)" },

    // --- MIND & INFLUENCE ---
    { cat: "mind", name: "Read Surface Thoughts", meta: "Mind 2", desc: "Hear current thoughts/emotions.", flavor: "Scans what the target is currently thinking or feeling. (HDYDT p.114)" },
    { cat: "mind", name: "Mind Control (Puppetry)", meta: "Mind 4", desc: "Take full control of target.", flavor: "Overrides target's will, forcing them to obey. (HDYDT p.122)" },
    { cat: "mind", name: "Alter Memory", meta: "Mind 4", desc: "Edit, delete, or plant memories.", flavor: "Rewrites the target's past. Complexity varies. (HDYDT p.123)" },
    { cat: "mind", name: "Dreamwalk", meta: "Mind 3", desc: "Enter/Manipulate dreams.", flavor: "Enter the Astral Plane or a target's dreamscape. (HDYDT p.54)" },
    { cat: "mind", name: "Astral Projection", meta: "Mind 4", desc: "Project mind into High Umbra.", flavor: "Separate consciousness from body to travel mentally. (HDYDT p.60)" },
    { cat: "mind", name: "Prophecy / Hindsight", meta: "Time 2", desc: "View past or potential future.", flavor: "Glimpse events that have happened or might happen. (HDYDT p.55)" },
    { cat: "mind", name: "Aura Perception", meta: "Mind 1 / Life 1", desc: "Read emotional/health state.", flavor: "See colors of a target's aura to judge mood/nature. (HDYDT p.53)" },
    { cat: "mind", name: "Multi-Tasking", meta: "Mind 1", desc: "Split mind to do multiple tasks.", flavor: "Perform multiple mental tasks without penalty. (HDYDT p.53)" },
    { cat: "mind", name: "Mental Illusion", meta: "Mind 3", desc: "Hallucinations only target sees.", flavor: "Projects sights/sounds directly into target's mind. (HDYDT p.129)" },
    { cat: "mind", name: "Physical Illusion", meta: "Forces 2 + Prime 2", desc: "Holograms everyone sees.", flavor: "Uses light/sound to create fake objects/people. (HDYDT p.129)" },
    { cat: "mind", name: "Instant Sleep", meta: "Mind 4 / Life 4", desc: "Force target into slumber.", flavor: "Shuts down conscious mind or chemical wakefulness. (HDYDT p.128)" },
    { cat: "mind", name: "Universal Translator", meta: "Mind 3", desc: "Understand any spoken language.", flavor: "Tap into universal unconscious to understand meaning. (HDYDT p.114)" },
    { cat: "mind", name: "Lie Detector", meta: "Mind 2 / Entropy 1", desc: "Sense truth or deception.", flavor: "Reads subtle shifts in aura/probability to spot lies. (HDYDT p.126)" },

    // --- SPIRIT & NECROMANCY ---
    { cat: "spirit", name: "Summon Spirit", meta: "Spirit 2", desc: "Call entity from Umbra.", flavor: "Calls a spirit to location. Does not compel obedience. (HDYDT p.90)" },
    { cat: "spirit", name: "Bind Spirit", meta: "Spirit 4", desc: "Force spirit into service/object.", flavor: "Traps spirit into a fetish or forces it to obey. (HDYDT p.100)" },
    { cat: "spirit", name: "Step Sideways", meta: "Spirit 3", desc: "Enter the Spirit World.", flavor: "Physically cross the Gauntlet into the Penumbra. (HDYDT p.90)" },
    { cat: "spirit", name: "Warding", meta: "Corr 4 (+ Sphere)", desc: "Ban object/creature from area.", flavor: "Creates a barrier against specific things (Fire, Spirits). (HDYDT p.95)" },
    { cat: "spirit", name: "Speak with Dead", meta: "Spirit 2 / Entropy 2", desc: "Communicate with ghosts.", flavor: "See and speak to the restless dead across the Shroud. (HDYDT p.85)" },
    { cat: "spirit", name: "Raise Zombie", meta: "Life 2 + Prime 2", desc: "Animate corpse (Rotting).", flavor: "Animates a dead body. It rots unless preserved. (HDYDT p.88)" },
    { cat: "spirit", name: "Spirit Strike", meta: "Spirit 2 + Prime 2", desc: "Damage spirit across Gauntlet.", flavor: "Allows physical attacks to hit spirits in Penumbra. (HDYDT p.65)" },
    { cat: "spirit", name: "Exorcism", meta: "Spirit 4", desc: "Banish possessing entity.", flavor: "Forces a spirit or ghost out of a host body/object. (HDYDT p.125)" },
    { cat: "spirit", name: "Energy Vampirism", meta: "Prime 3", desc: "Drain Quintessence from living.", flavor: "Steals life force from a victim. Inflicts damage. (HDYDT p.49)" },
    { cat: "spirit", name: "Resurrection", meta: "Life 5 + Spirit 5 + Mind 5", desc: "Restore life (Very Hard).", flavor: "Returns soul to body. Extremely Vulgar/difficult. (HDYDT p.88)" },
    { cat: "spirit", name: "Agama Sojourn", meta: "Spirit 4 / Entropy 4", desc: "Project mind into Underworld.", flavor: "Enter the Shadowlands as a wraith-like projection. (HDYDT p.85)" },
    { cat: "spirit", name: "Luck Ward", meta: "Entropy 2 + Corr 2", desc: "Banishes bad luck.", flavor: "Protects an area from entropy and misfortune. (HDYDT p.100)" }
];

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

/* --- ROTE RENDER ENGINE --- */
function initRoteLibrary() {
    ROTE_DB.forEach(rote => {
        // Hedef konteyneri bul (cat-combat, cat-mind vb.)
        const container = document.getElementById('cat-' + rote.cat);
        if (!container) return;

        // HTML Elemanlarını Oluştur
        const row = document.createElement('div');
        row.className = 'data-row';
        // Arama için data-search attribute'u ekle (Name + Meta + Desc)
        row.setAttribute('data-search', `${rote.name} ${rote.meta} ${rote.desc}`);

        // İçerik HTML'ini hazırla (XSS Korumalı yöntem yerine performans için Template Literal kullanıyoruz ama veri bizim olduğu için güvenli)
        row.innerHTML = `
            <div class="data-info">
                <span class="data-name">${rote.name}</span>
                <span class="data-desc">${rote.desc}</span>
                <span class="data-flavor">${rote.flavor}</span>
            </div>
            <span class="data-meta">${rote.meta}</span>
        `;

        // Konteynere ekle
        container.appendChild(row);
    });
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
    initRoteLibrary(); // <--- YENİ EKLENEN SATIR
};