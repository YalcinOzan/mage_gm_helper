/**
 * ============================================================================
 * MAGE 20TH: UI CONTROLLER
 * File: app.js
 * Version: 2.6 (Clean UI Architecture)
 * Content: DOM Manipulation, Tab Switching, Rendering, Event Listeners
 * Depends On: data.js, ritualmatic.js (Logic Layer)
 * ============================================================================
 */

/* --- UI HELPER --- */
const getUIEl = (id) => document.getElementById(id);

/* ============================================================================
   1. NAVIGATION & INTERACTION
   ============================================================================ */

/**
 * Switches the main navigation tabs.
 */
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    getUIEl(tabId).classList.add('active');
    btn.classList.add('active');
}

/**
 * Switches the sub-navigation tabs (within Tools).
 */
function switchSubTab(tabId, btn) {
    document.querySelectorAll('.sub-tab-content').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sub-nav-btn').forEach(b => b.classList.remove('active'));
    getUIEl(tabId).classList.add('active');
    btn.classList.add('active');
}

/**
 * Toggles accordion expansion.
 */
function toggleAcc(header) {
    header.parentElement.classList.toggle('open');
}

/**
 * Filters content based on search input.
 * Searches across text content and data-search attributes.
 */
function filterContent() {
    let input = getUIEl('searchBox').value.toLowerCase();
    document.querySelectorAll('.card, .data-row').forEach(item => {
        let text = item.innerText.toLowerCase();

        // Append hidden search tags if available for better indexing
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

/* ============================================================================
   2. RENDER ENGINES (DEPENDS ON DATA.JS)
   ============================================================================ */

/* --- SPHERES RENDERER --- */
function initSphereLibrary() {
    const container = getUIEl('sphere-container');
    if (!container || typeof SPHERE_DB === 'undefined') return;
    container.innerHTML = '';

    SPHERE_DB.forEach(sphere => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('span');
        title.className = 'card-title';
        title.textContent = `${sphere.icon} ${sphere.name}`;
        card.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'card-list';

        sphere.ranks.forEach((rankDesc, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-title', `${sphere.name} Rank ${index + 1}`);
            li.setAttribute('data-desc', rankDesc);
            li.setAttribute('data-ref', 'M20 Core Rulebook');

            li.innerHTML = `<span>${index + 1}</span> ${rankDesc}`;
            list.appendChild(li);
        });

        card.appendChild(list);
        container.appendChild(card);
    });
}

/* --- ROTES RENDERER --- */
function initRoteLibrary() {
    if (typeof ROTE_DB === 'undefined') return;

    ROTE_DB.forEach(rote => {
        const container = document.getElementById('cat-' + rote.cat);
        if (!container) return;

        const row = document.createElement('div');
        row.className = 'data-row';
        row.setAttribute('data-search', `${rote.name} ${rote.meta} ${rote.desc}`);
        row.setAttribute('data-title', rote.name);
        row.setAttribute('data-desc', rote.flavor);
        row.setAttribute('data-ref', rote.meta);

        row.innerHTML = `
            <div class="data-info">
                <span class="data-name">${rote.name}</span>
                <span class="data-desc">${rote.desc}</span>
                <span class="data-flavor">${rote.flavor}</span>
            </div>
            <span class="data-meta">${rote.meta}</span>
        `;
        container.appendChild(row);
    });
}

/* --- MERITS RENDERER --- */
function initMeritLibrary() {
    if (typeof MERIT_DB === 'undefined') return;

    MERIT_DB.forEach(item => {
        const container = document.getElementById('cat-' + item.cat);
        if (!container) return;

        const row = document.createElement('div');
        row.className = 'data-row';
        row.setAttribute('data-search', `${item.name} ${item.meta} ${item.desc}`);
        row.setAttribute('data-title', item.name);
        row.setAttribute('data-desc', item.flavor);
        row.setAttribute('data-ref', item.meta);

        row.innerHTML = `
            <div class="data-info">
                <span class="data-name">${item.name}</span>
                <span class="data-desc">${item.desc}</span>
                <span class="data-flavor">${item.flavor}</span>
            </div>
            <span class="data-meta">${item.meta}</span>
        `;
        container.appendChild(row);
    });
}

/* --- RULES RENDERER --- */
function initRulesLibrary() {
    const accContainer = document.getElementById('rules-container');
    if (!accContainer || typeof RULES_DB === 'undefined') return;
    accContainer.innerHTML = '';

    RULES_DB.forEach(rule => {
        const accItem = document.createElement('div');
        accItem.className = 'acc-item';

        const header = document.createElement('div');
        header.className = 'acc-header';
        header.onclick = function () { toggleAcc(this); };
        header.innerHTML = rule.title;

        const content = document.createElement('div');
        content.className = 'acc-content';

        if (rule.ref) {
            const refDiv = document.createElement('div');
            refDiv.style.cssText = "padding: 8px 16px; font-size: 0.7rem; color: var(--accent); background: rgba(6, 182, 212, 0.05); border-bottom: 1px solid var(--border); font-family: 'Courier Prime', monospace; text-align: right;";
            refDiv.innerHTML = "📖 " + rule.ref;
            content.appendChild(refDiv);
        }

        if (rule.type === 'table') {
            const table = document.createElement('table');
            const thead = document.createElement('tr');
            rule.headers.forEach(h => {
                const th = document.createElement('th');
                th.innerHTML = h;
                thead.appendChild(th);
            });
            table.appendChild(thead);

            rule.rows.forEach(r => {
                const tr = document.createElement('tr');
                tr.setAttribute('data-search', r.join(' ').replace(/<[^>]*>?/gm, ''));
                r.forEach(cellData => {
                    const td = document.createElement('td');
                    td.innerHTML = cellData;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
            content.appendChild(table);

        } else if (rule.type === 'text') {
            const textDiv = document.createElement('div');
            textDiv.innerHTML = rule.content;
            textDiv.setAttribute('data-search', rule.content.replace(/<[^>]*>?/gm, ''));
            content.appendChild(textDiv);
        }

        accItem.appendChild(header);
        accItem.appendChild(content);
        accContainer.appendChild(accItem);
    });
}

/* ============================================================================
   3. TOOLTIPS & MODALS
   ============================================================================ */

/* --- TOOLTIP SYSTEM --- */
function initGlobalTooltips() {
    const tt = getUIEl('tooltip');
    if (!tt) return;
    const ttTitle = tt.querySelector('.tt-title');
    const ttDesc = tt.querySelector('.tt-desc');
    const ttRef = tt.querySelector('.tt-ref');

    // 1. Mouse Over: Populate and Show
    document.body.addEventListener('mouseover', (e) => {
        const target = e.target.closest('[data-title]');
        if (target) {
            ttTitle.textContent = target.dataset.title || '';
            ttDesc.textContent = target.dataset.desc || '';
            ttRef.textContent = target.dataset.ref || '';
            tt.style.display = 'block';
        }
    });

    // 2. Mouse Move: Update Position (Follow Cursor)
    document.body.addEventListener('mousemove', (e) => {
        const target = e.target.closest('[data-title]');
        if (target) {
            let x = e.clientX + 15;
            let y = e.clientY + 15;

            // Boundary checks to keep tooltip on screen
            if (x + 290 > window.innerWidth) x = e.clientX - 300; // Flip to left
            if (y + 120 > window.innerHeight) y = e.clientY - 120; // Flip up

            tt.style.left = `${x}px`;
            tt.style.top = `${y}px`;
        }
    });

    // 3. Mouse Out: Hide
    document.body.addEventListener('mouseout', (e) => {
        const target = e.target.closest('[data-title]');
        if (target) {
            tt.style.display = 'none';
        }
    });
}

/* --- MODAL LOGIC --- */
function showError(msg) {
    const el = getUIEl('error-modal');
    if (el) el.style.setProperty('display', 'flex', 'important');
}

function closeError() {
    const el = getUIEl('error-modal');
    if (el) el.style.setProperty('display', 'none', 'important');
}

/* --- FEEDBACK FORM --- */
function openFeedback() {
    const el = document.getElementById('feedback-modal');
    if (el) el.style.display = 'flex';
}

function closeFeedback() {
    const el = document.getElementById('feedback-modal');
    if (el) el.style.display = 'none';
    const res = document.getElementById('form-result');
    if (res) res.style.display = 'none';
}

function sendFeedback(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const result = document.getElementById('form-result');
    const btn = document.getElementById('form-submit-btn');

    btn.textContent = "TRANSMITTING...";
    btn.disabled = true;

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.style.display = "block";
                result.style.color = "var(--success)";
                result.innerHTML = "✓ SIGNAL RECEIVED. THANK YOU.";
                form.reset();
                setTimeout(() => { closeFeedback(); btn.textContent = "SEND SIGNAL"; btn.disabled = false; }, 3000);
            } else {
                result.style.display = "block"; result.style.color = "var(--danger)"; result.innerHTML = json.message; btn.textContent = "RETRY"; btn.disabled = false;
            }
        })
        .catch(error => {
            result.style.display = "block"; result.style.color = "var(--danger)"; result.innerHTML = "CONNECTION ERROR."; btn.textContent = "RETRY"; btn.disabled = false;
        });
}

// Global Click Listener for Modals
window.onclick = function (event) {
    const modal = document.getElementById('feedback-modal');
    if (event.target == modal) { closeFeedback(); }
}

/* ============================================================================
   4. INITIALIZATION
   ============================================================================ */
window.onload = function () {
    // 1. Logic Initialization (From ritualmatic.js - if loaded)
    // Checks if the functions exist before calling them to prevent errors if Logic is missing
    if (typeof recalculate === "function") recalculate();
    if (typeof updateLimits === "function") updateLimits();

    // 2. Content Initialization (From data.js)
    initSphereLibrary();
    initRoteLibrary();
    initMeritLibrary();
    initRulesLibrary();

    // 3. UI Initialization
    initGlobalTooltips();
};