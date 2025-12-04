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
    { cat: "combat", name: "Chi-Fire Field", meta: "Prime 2 + Forces 2", desc: "Inflict Aggravated damage on contact.", flavor: "Surrounds the mage with an aura of burning Quintessence. (HDYDT p.64)" },
    { cat: "combat", name: "The Slipstream", meta: "Forces 2 / Corr 2", desc: "Increase attacker's Difficulty (+2).", flavor: "Bend light/gravity to appear slightly away from actual location. (HDYDT p.67)" },
    { cat: "combat", name: "The Neo (Bullet Stop)", meta: "Forces 2", desc: "Stop projectiles in mid-air. Vulgar.", flavor: "Halts bullets instantly. Vulgar with witnesses. (HDYDT p.33 & p.67)" },
    { cat: "combat", name: "Internal Burn", meta: "Life 3 (Optional: +Forces 2)", desc: "Rip life pattern directly. Aggravated.", flavor: "Disrupts bio-electrical processes. Ignores armor. (HDYDT p.33)" },
    { cat: "combat", name: "Curve Bullet", meta: "Forces 2 (+ Corr 1)", desc: "-1 to -3 diff on ranged attacks.", flavor: "Alters gravity/wind to make impossible shots possible. (HDYDT p.34)" },
    { cat: "combat", name: "Kinetic Shield", meta: "Forces 2 (Deflect) / Matter 3 (Hard)", desc: "Create force field or harden object.", flavor: "Stops kinetic energy or reinforces shield integrity. (HDYDT p.65)" },
    { cat: "combat", name: "Rubbing the Bones", meta: "Prime 2", desc: "Inflict bashing damage via friction. Stuns.", flavor: "Agitates the target's pattern, causing internal friction. (HDYDT p.48)" },
    { cat: "combat", name: "Dim Mak (Delayed Death Touch)", meta: "Life 3 + Time 4", desc: "Trigger damage after a delay.", flavor: "Strikes a blow that takes effect at a set time. (HDYDT p.64)" },
    { cat: "combat", name: "Chi-Field Push", meta: "Forces 2 + Prime 2", desc: "Knockback enemies without touching.", flavor: "Projects a wall of force to send opponents flying. (HDYDT p.64)" },
    { cat: "combat", name: "Elemental Armor", meta: "Life 3 (Buff) or Life 5 + Matter 2 (Transform)", desc: "Soak Lethal/Aggravated damage.", flavor: "Enhances durability or turns skin to element. (HDYDT p.67)" },
    { cat: "combat", name: "War Dance", meta: "Life 4 + Mind 2", desc: "Buff allies' Str/Stam and remove fear.", flavor: "Ritual dance instilling bloodlust and resilience. (HDYDT p.61)" },
    { cat: "combat", name: "Quintessence Blade", meta: "Prime 3 (+ Forces 3)", desc: "Conjure weapon of pure energy (Agg Dmg).", flavor: "Creates a blade of plasma/magic. Cost: 1 Quint/turn. (HDYDT p.46)" },
    { cat: "combat", name: "Velocity Boost", meta: "Forces 2 / Entropy 2", desc: "Increase damage by velocity.", flavor: "Uses gravity/entropy for impossible aerial strikes. (HDYDT p.68)" },
    { cat: "combat", name: "Battle Fury", meta: "Life 3 + Mind 3", desc: "Ignore wound penalties, boost stats.", flavor: "Uncages the beast within. Attacks friend and foe alike. (HDYDT p.68)" },
    { cat: "combat", name: "Shiva/Kali Murder Machine", meta: "Life 4 + Mind 5 + Prime 4", desc: "Combat avatar with multiple arms/weapons.", flavor: "Transform into a multi-armed god of destruction. Vulgar. (HDYDT p.69)" },

    // --- TRANSMUTATION & ELEMENTS ---
    { cat: "transmutation", name: "Conjure Object", meta: "Matter 3 + Prime 2", desc: "Create complex matter from nothing.", flavor: "Weaves Quintessence into a pattern. Permanent with Prime 4. (HDYDT p.45)" },
    { cat: "transmutation", name: "Base Transmutation", meta: "Matter 2", desc: "Turn one substance into another.", flavor: "Alchemy: Lead to gold, water to wine, air to stone. (HDYDT p.27)" },
    { cat: "transmutation", name: "Shapechange (Self)", meta: "Life 4", desc: "Transform own body (Wolf, Bird, etc).", flavor: "Alter biology to take animal forms or change appearance. (HDYDT p.19)" },
    { cat: "transmutation", name: "Shapechange (Other)", meta: "Life 5 / Matter 5", desc: "Turn enemy into lawn chair or toad.", flavor: "Rewrites target's pattern. Hard against unwilling targets. (HDYDT p.19)" },
    { cat: "transmutation", name: "Install Cybernetics", meta: "Life 4 + Matter 4", desc: "Fuse machine parts with living flesh.", flavor: "Union of biology and technology. Permanent causes Paradox. (HDYDT p.23)" },
    { cat: "transmutation", name: "Conjure Light/Fire", meta: "Forces 3 + Prime 2", desc: "Create energy from nothing.", flavor: "Light in darkness or fire without fuel. Cost: 1 Quint. (HDYDT p.32)" },
    { cat: "transmutation", name: "Weather Witching", meta: "Forces 4 (Major) / Forces 5 (Drastic)", desc: "Summon storm or clear skies.", flavor: "Manipulates weather patterns. High successes needed. (HDYDT p.38-40)" },
    { cat: "transmutation", name: "Invisibility", meta: "Forces 2", desc: "Bend light around subject.", flavor: "Makes subject visually undetectable by bending light waves. (HDYDT p.34)" },
    { cat: "transmutation", name: "Accelerated Decay", meta: "Entropy 3 + Time 3", desc: "Rust metal or rot wood instantly.", flavor: "Speeds up natural entropy causing objects to crumble. (HDYDT p.111)" },
    { cat: "transmutation", name: "Elemental Wall", meta: "Forces/Matter 3 + Prime 2", desc: "Wall of fire, ice, or stone.", flavor: "Creates a barrier. Damage based on successes. (HDYDT p.37)" },
    { cat: "transmutation", name: "Petrify", meta: "Life 4 + Matter 2", desc: "Turn living flesh into stone.", flavor: "Transmutes biological cells into inert matter. Kills if permanent. (HDYDT p.27)" },
    { cat: "transmutation", name: "Create Food/Water", meta: "Life 3 + Matter 3 + Prime 2", desc: "Conjure nourishment from nothing.", flavor: "Creates edible matter. Prime 2 needed for creation. (HDYDT p.32)" },
    { cat: "transmutation", name: "EMP Blackout", meta: "Forces 2 (+ Matter 2)", desc: "Kill power grid or devices.", flavor: "Drains or overloads electrical energy in an area. (HDYDT p.31)" },

    // --- TRAVEL & TIME ---
    { cat: "travel", name: "Teleportation", meta: "Correspondence 3 (Step) or 4 (Instant)", desc: "Travel to another location.", flavor: "Step through space (Rank 3) or vanish/reappear (Rank 4). (HDYDT p.76)" },
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
    { cat: "spirit", name: "Resurrection", meta: "Life 4/5 + Spirit 4/5 + Mind 4/5", desc: "Restore life (Very Hard).", flavor: "Returns soul to body. Extremely Vulgar/difficult. (HDYDT p.88)" },
    { cat: "spirit", name: "Agama Sojourn", meta: "Spirit 4 / Entropy 4", desc: "Project mind into Underworld.", flavor: "Enter the Shadowlands as a wraith-like projection. (HDYDT p.85)" },
    { cat: "spirit", name: "Luck Ward", meta: "Entropy 2 + Corr 2", desc: "Banishes bad luck.", flavor: "Protects an area from entropy and misfortune. (HDYDT p.100)" }
];

/* ==========================================
   DATA LAYER: MERITS & FLAWS DATABASE
   ========================================== */
const MERIT_DB = [
    // --- PHYSICAL MERITS ---
    { cat: "merit-phys", name: "Acute Senses", meta: "1 or 3 pts", desc: "-2 difficulty to all rolls with the chosen sense.", flavor: "Your mage has exceptionally sharp senses (vision, hearing, etc.). 1 pt for one sense, 3 pts for all." },
    { cat: "merit-phys", name: "Ambidextrous", meta: "1 pt", desc: "No penalty for using off-hand.", flavor: "You have equal facility with either hand, suffering no off-hand penalties." },
    { cat: "merit-phys", name: "Catlike Balance", meta: "1 pt", desc: "-2 difficulty to balance-related rolls.", flavor: "Possesses an innately perfect sense of balance, useful for tightrope walking or ledges." },
    { cat: "merit-phys", name: "Claws / Fangs / Horns", meta: "3+ pts", desc: "Natural weapons dealing Str+1 to Str+3 damage.", flavor: "You possess natural weaponry like claws, fangs, or horns. Can be retractable for extra cost." },
    { cat: "merit-phys", name: "Cloak of the Seasons", meta: "3 pts", desc: "Protected from extreme weather/temperatures.", flavor: "Magically protected from natural heat or cold; comfortable regardless of clothing." },
    { cat: "merit-phys", name: "Huge Size", meta: "4 pts", desc: "Gain one extra 'Bruised' Health Level.", flavor: "You are abnormally large (7ft+), granting extra resilience against damage." },
    { cat: "merit-phys", name: "Insensible to Pain", meta: "5 pts", desc: "Ignore all wound penalties until Incapacitated.", flavor: "Your body deadens pain signals, allowing you to function normally even when severely injured." },
    { cat: "merit-phys", name: "Daredevil", meta: "3 pts", desc: "-2 difficulty & ignore botches on risky actions.", flavor: "You thrive on danger. When taking unnecessary risks, you perform better." },
    { cat: "merit-phys", name: "Light Sleeper", meta: "1 pt", desc: "Wake instantly; no penalties for little sleep.", flavor: "You can function on very little sleep and wake up alert at the slightest disturbance." },
    { cat: "merit-phys", name: "Longevity", meta: "2 pts", desc: "You do not age, or age very slowly.", flavor: "Your aging process has halted or slowed significantly due to magical or biological quirks." },

    // --- MENTAL MERITS ---
    { cat: "merit-ment", name: "Ability Aptitude", meta: "1 pt", desc: "-2 difficulty for one specific Ability.", flavor: "A natural flair for a specific skill (e.g., languages, driving), performing it with ease." },
    { cat: "merit-ment", name: "Berserker", meta: "2 pts", desc: "WP roll (Diff 6+Wounds) when injured or frenzy.", flavor: "You enter a red rage in combat, ignoring pain (wound penalties) but attacking friend and foe alike." },
    { cat: "merit-ment", name: "Code of Honor", meta: "2 pts", desc: "+2 dice to Willpower when acting via code.", flavor: "A personal ethical code gives you strength to resist compulsion and temptation." },
    { cat: "merit-ment", name: "Common Sense", meta: "1 pt", desc: "ST warns you if you act against common sense.", flavor: "Practical wisdom that alerts you before you do something disastrously stupid." },
    { cat: "merit-ment", name: "Concentration", meta: "1 pt", desc: "No penalty for distractions/environment.", flavor: "Ability to shut out all distractions and focus intently on the task at hand." },
    { cat: "merit-ment", name: "Eidetic Memory", meta: "2 pts", desc: "Perfect recall; Perc+Alertness (Diff 6) under stress.", flavor: "You remember everything you experience with perfect clarity, like a photographic memory." },
    { cat: "merit-ment", name: "Iron Will", meta: "3 pts", desc: "+3 dice to resist mind magic; spend 1 WP to shake off.", flavor: "Your mind is a fortress, highly resistant to mental control and manipulation." },
    { cat: "merit-ment", name: "Lightning Calculator", meta: "1 pt", desc: "-2 difficulty on math-related rolls.", flavor: "You can perform complex mathematical calculations instantly in your head." },
    { cat: "merit-ment", name: "Time Sense", meta: "1 pt", desc: "Perfect sense of time without a watch.", flavor: "You always know the exact time and date, down to the second." },
    { cat: "merit-ment", name: "Language", meta: "1 pt", desc: "Speak an additional language fluently.", flavor: "You have a natural gift for tongues or learned an extra language." },
    { cat: "merit-ment", name: "Oracular Ability", meta: "3 pts", desc: "Interpret omens/signs automatically.", flavor: "You can see omens and signs of the future. (Denver Wiki / Revised)" },

    // --- SOCIAL MERITS ---
    { cat: "merit-soc", name: "Celestial Affinity", meta: "3 pts", desc: "-2 difficulty dealing with High Umbrood.", flavor: "You have a knack for conversing with noble spirits and angels." },
    { cat: "merit-soc", name: "Ecumenist", meta: "5 pts", desc: "Purchase two specialty Spheres at x7 cost.", flavor: "You understand distinct factions within a Tradition, gaining affinity for both paths." },
    { cat: "merit-soc", name: "Faction Founder", meta: "4 pts", desc: "+1 Social dice within Tradition; teach specialty.", flavor: "You created your own sub-faction, gaining respect and followers." },
    { cat: "merit-soc", name: "Well Connected", meta: "3 pts", desc: "Backgrounds cost 1 pt/level (Allies, Contacts).", flavor: "You have an extensive network of friends and influence, cheaper to maintain." },
    { cat: "merit-soc", name: "Natural Leader", meta: "2 pts", desc: "+2 dice to Leadership rolls.", flavor: "People instinctively look to you for guidance in times of crisis." },

    // --- SUPERNATURAL MERITS ---
    { cat: "merit-super", name: "Astral Vigor", meta: "3 pts", desc: "No astral side effects; 2 Armor in Astral.", flavor: "Your astral form is resilient, avoiding fatigue and retaining a link to your body." },
    { cat: "merit-super", name: "Avatar Companion", meta: "7 pts", desc: "Living companion linked to your Avatar.", flavor: "A person shares your reincarnation cycle, offering guidance and past-life memories." },
    { cat: "merit-super", name: "Circumspect Avatar", meta: "2 pts", desc: "Avatar is subtle; seekings are grounded in reality.", flavor: "Your Avatar acts as a subconscious nudge rather than a flashy spirit guide." },
    { cat: "merit-super", name: "Conditional Magic (Boon)", meta: "1-6 pts", desc: "-3 Difficulty on Arete rolls under specific conditions.", flavor: "Magic works better under certain rare/common conditions. (Mage: Revised)" },
    { cat: "merit-super", name: "Medium", meta: "2 pts", desc: "Naturally sense and speak to ghosts without magic.", flavor: "You are a conduit for the dead, able to hear and see restless spirits." },
    { cat: "merit-super", name: "Parlor Trick", meta: "1 pt", desc: "Perform minor magic at will (no roll/cost).", flavor: "Simple tricks like lighting a candle or changing eye color effortlessly." },
    { cat: "merit-super", name: "Personal Talisman", meta: "1 pt", desc: "Start with a permanent Talisman tied to you.", flavor: "You possess a magical item imbued with your own willpower." },
    { cat: "merit-super", name: "Sphere Natural", meta: "5 pts", desc: "Use one Sphere without Focus instruments.", flavor: "You have internalized the magic of one Sphere so deeply you need no tools for it." },
    { cat: "merit-super", name: "True Faith", meta: "7 pts", desc: "Start with 1 dot of True Faith trait.", flavor: "A deep, unshakable belief that provides protection and miracles against darkness." },
    { cat: "merit-super", name: "Unaging", meta: "2 pts", desc: "You do not age physically; immune to aging potions.", flavor: "You stop aging at a certain point, remaining eternally youthful." },
    { cat: "merit-super", name: "Arcane (Background)", meta: "1-5 pts", desc: "Hard to track/remember.", flavor: "Technically a Background, but purchased with Freebies here." },
    { cat: "merit-super", name: "Lucky", meta: "3 pts", desc: "3 re-rolls per story (can cancel botches).", flavor: "Fortune favors you. You can turn failure into success." },
    { cat: "merit-super", name: "Resistant Pattern", meta: "3 pts", desc: "Soak 2 dice of damage from Kinetic/Fire/etc (Choose 1).", flavor: "Your pattern is naturally resistant to a specific form of damage." },
    { cat: "merit-super", name: "Deathwalker", meta: "4 pts", desc: "Step Sideways to Underworld (Spirit 3). Ignore Avatar Storm there.", flavor: "Your soul bears the imprint of the dead, allowing safe passage to Shadowlands. (Euthanatos Rev)" },
    { cat: "merit-super", name: "Dual Traditions", meta: "7 pts", desc: "Use Foci/Specialty Sphere of two Traditions.", flavor: "You have been trained in the arts of two distinct magical paths. (Guide to Traditions)" },
    { cat: "merit-super", name: "Green Thumb", meta: "1 pt", desc: "-2 diff on plant-related rolls/magick.", flavor: "Plants thrive under your care and you understand their needs instinctively. (Mage: Revised)" },
    { cat: "merit-super", name: "Stormwarden", meta: "3 pts", desc: "Control/Resist weather effects easier.", flavor: "You suffer no ill effects from storms and can sense them coming. (Denver Wiki)" },
    { cat: "merit-super", name: "Unbondable", meta: "3 pts", desc: "Immune to Blood Bonds (Vampire).", flavor: "Vampire blood cannot enslave you. Critical for crossovers. (Denver Wiki)" },
    { cat: "merit-super", name: "True Love", meta: "1-4 pts", desc: "Auto success (1 WP) when protecting love.", flavor: "A bond so strong it transcends death and grants power in crisis. (Denver Wiki)" },
    { cat: "merit-super", name: "Nine Lives", meta: "6 pts", desc: "Survive certain death (roll to lose dot).", flavor: "Fate refuses to let you die easily. Works like the Gift. (Denver Wiki)" },
    { cat: "merit-super", name: "Ghoul", meta: "5 pts", desc: "Gain 1 Potence, 1 Fortitude, and Vitae pool.", flavor: "You drink vampire blood for power. Dangerous addiction. (Mage: Revised)" },
    { cat: "merit-super", name: "Cyclic Magic", meta: "3 pts", desc: "Magick diff -2 during specific regular cycles (Moon/Season).", flavor: "Your magic is tied to natural cycles like phases of the moon. (Mage: Revised)" },
    { cat: "merit-super", name: "Natural Channel", meta: "3 pts", desc: "-2 diff to Summon/Bind spirits. Gauntlet is thinner for you.", flavor: "Spirits find you easier to interact with. (Denver Wiki)" },

    // --- FLAWS (PHYSICAL/MENTAL) ---
    { cat: "flaw-phys", name: "Addiction", meta: "1-3 pts", desc: "Must indulge or suffer dice penalties.", flavor: "Dependent on a substance/act; withdrawal causes weakness and craving." },
    { cat: "flaw-phys", name: "Bad Sight", meta: "3 pts", desc: "+2 difficulty on vision rolls.", flavor: "Uncorrectable vision problem. (Denver Wiki / Revised)" },
    { cat: "flaw-phys", name: "Deranged", meta: "2 pts", desc: "Permanent mental disorder.", flavor: "You suffer from a permanent, uncurable mental illness (e.g., Megalomania, Paranoia)." },
    { cat: "flaw-phys", name: "Nightmares", meta: "1 pt", desc: "WP roll (Diff 7) to sleep restfully or lose 1 die.", flavor: "Horrific dreams plague your sleep, leaving you exhausted." },
    { cat: "flaw-phys", name: "Phobia", meta: "2 pts", desc: "WP roll to face object; +2 diff or flee.", flavor: "An overwhelming, irrational fear of a specific object or situation." },
    { cat: "flaw-phys", name: "Short Fuse", meta: "2 pts", desc: "WP roll (Diff 6) to avoid anger; -2 diff to frenzy.", flavor: "You are easily provoked and struggle to control your temper." },
    { cat: "flaw-phys", name: "Vulnerability", meta: "2-4 pts", desc: "Specific substance causes Agg damage.", flavor: "You are allergic to a common substance (like iron or plastic) which harms you." },
    { cat: "flaw-phys", name: "One Eye", meta: "2 pts", desc: "+2 diff on depth perception/ranged attacks.", flavor: "You are missing an eye or have no depth perception." },
    { cat: "flaw-phys", name: "Deaf", meta: "4 pts", desc: "Cannot hear. Fail auditory rolls automatically.", flavor: "You cannot perceive sound, increasing diff on surprise and alertness." },
    { cat: "flaw-phys", name: "Lame", meta: "3 pts", desc: "Movement speed halved. +2 diff on movement rolls.", flavor: "A leg injury or deformity hampers your movement." },
    { cat: "flaw-phys", name: "Child", meta: "3 pts", desc: "Short, weak, treated as kid. -2 Social w/ adults.", flavor: "You are biologically a child. Hard to be taken seriously. (Denver Wiki)" },
    { cat: "flaw-phys", name: "Monstrous", meta: "3 pts", desc: "Appearance 0. Cannot interact socially w/ sleepers.", flavor: "Your appearance is hideous or clearly inhuman (Nosferatu-like). (Denver Wiki)" },
    { cat: "flaw-phys", name: "Permanent Wound", meta: "3 pts", desc: "Wound that never heals. -1 Health Level max.", flavor: "An old battle scar or curse that magic cannot repair. (Denver Wiki)" },
    { cat: "flaw-phys", name: "Deep Sleeper", meta: "1 pt", desc: "+2 diff to wake up. Miss turns if woken.", flavor: "It is incredibly hard to wake you up, even in emergencies. (Denver Wiki)" },
    { cat: "flaw-ment", name: "Curiosity", meta: "2 pts", desc: "WP roll (Diff 6) to resist checking mysteries.", flavor: "You cannot walk away from a mystery, often leading you into danger. (Denver Wiki)" },
    { cat: "flaw-soc", name: "Dark Secret", meta: "1 pt", desc: "A secret that could destroy you if revealed.", flavor: "You hide a crime or fact that would make you an outcast. (Denver Wiki)" },

    // --- FLAWS (SUPERNATURAL) ---
    { cat: "flaw-super", name: "Bard's Tongue", meta: "1 pt", desc: "Speak uncomfortable truths; 1 WP + 1 Bashing to resist.", flavor: "You compulsively speak prophecies or secrets you'd rather keep hidden." },
    { cat: "flaw-super", name: "Beast Within", meta: "5 pts", desc: "Roll Dynamic Res (Diff 6) to avoid frenzy in stress.", flavor: "An inner beast drives you to rage, similar to vampires or werewolves." },
    { cat: "flaw-super", name: "Bedeviled", meta: "6 pts", desc: "ST creates random misfortunes automatically.", flavor: "A hostile force watches you, causing things to go wrong at the worst times." },
    { cat: "flaw-super", name: "Cast No Shadow", meta: "1 pt", desc: "No reflection/shadow; immune to some mirrors.", flavor: "You lack a shadow or reflection, marking you as supernatural." },
    { cat: "flaw-super", name: "Dark Fate", meta: "5 pts", desc: "Horrible demise inevitable; suffer damage/fail per session.", flavor: "You are doomed to a tragic end, and the universe conspires to bring it about." },
    { cat: "flaw-super", name: "Echoes", meta: "1-5 pts", desc: "Supernatural side-effects (cold, smell, static).", flavor: "Your magic bleeds into reality, causing eerie phenomena around you." },
    { cat: "flaw-super", name: "Geasa / Taboo", meta: "1-5 pts", desc: "Breaking oath causes loss of powers/stats.", flavor: "A sacred oath or ban. Violating it brings dire magical consequences." },
    { cat: "flaw-super", name: "Sphere Inept", meta: "5 pts", desc: "+2 difficulty with one specific Sphere.", flavor: "You struggle to grasp the concepts of one Sphere, finding it harder to use." },
    { cat: "flaw-super", name: "Cursed", meta: "1-5 pts", desc: "Suffer specific misfortune (ST discretion).", flavor: "You are cursed. Effects vary by points (1: Annoying, 5: Life-threatening)." },
    { cat: "flaw-super", name: "Haunted", meta: "3 pts", desc: "Tormented by a malicious ghost.", flavor: "A wraith follows you, causing trouble and demanding attention." },
    { cat: "flaw-super", name: "Mayfly Curse", meta: "5-10 pts", desc: "You age rapidly or have a short lifespan.", flavor: "Your time is short. You age years in days, or have a fixed death date." },
    { cat: "flaw-super", name: "Conditional Magic (Bane)", meta: "1-6 pts", desc: "+3 Difficulty on Arete rolls under specific conditions.", flavor: "Magic fails or is harder against specific targets/times. (Mage: Revised)" },
    { cat: "flaw-super", name: "Prone to Quiet", meta: "3 pts", desc: "Diff -2 to enter Quiet (Madness).", flavor: "Your mind is fragile against Paradox, slipping into madness easily. (Denver Wiki)" },
    { cat: "flaw-super", name: "Touch of Frost", meta: "1 pt", desc: "Plants die, room gets cold (-1 Soc).", flavor: "You radiate unnatural cold/death. Plants wither at your touch. (Denver Wiki)" },
    { cat: "flaw-super", name: "Devil's Mark", meta: "1 pt", desc: "Physical mark showing dark pact/nature.", flavor: "A witch's teat, a strange mole, or a sign clearly visible to witch-hunters. (Denver Wiki)" },
];

/* ==========================================
   DATA LAYER: RULES DATABASE (M20 CORE EDITION)
   ========================================== */
const RULES_DB = [
    // --- MAGICK FUNDAMENTALS ---
    {
        title: "✨ Magick Difficulties",
        ref: "M20 Core p.535",
        type: "table",
        headers: ["Type", "Diff", "Check"],
        rows: [
            ["<span class='hl-green'>Coincidental</span>", "Highest + 3", "Natural. No Paradox usually."],
            ["<span class='hl-yellow'>Vulgar</span>", "Highest + 4", "Impossible but unseen."],
            ["<span class='hl-red'>Vulgar (Witness)</span>", "Highest + 5", "Impossible & Seen by Sleepers."]
        ]
    },
    {
        title: "🎚️ Sphere Magnitude (What Rank?)",
        ref: "M20 Core p.511",
        type: "table",
        headers: ["Rank", "Capabilities"],
        rows: [
            ["<span class='tag tag-blue'>Rank 1</span>", "Perception, Sensing, Unveiling."],
            ["<span class='tag tag-green'>Rank 2</span>", "Minor Manipulation, Touching, Shielding."],
            ["<span class='tag tag-purple'>Rank 3</span>", "Control, Transmutation, Severing."],
            ["<span class='tag tag-red'>Rank 4</span>", "Major Transformation, Complex Binding."],
            ["<span class='tag tag-red'>Rank 5</span>", "Mastery, Creation from Void, Great Acts."]
        ]
    },
    {
        title: "🔧 Casting Modifiers (Save Diff)",
        ref: "M20 Core p.537-542",
        type: "text",
        content: `
            <ul class="clean-list">
                <li><span class="tag tag-green">-1 Diff</span> <strong>Personal Instrument:</strong> Using a special tool tied to you.</li>
                <li><span class="tag tag-green">-1 Diff</span> <strong>Unique Focus:</strong> Using a created/unique Art.</li>
                <li><span class="tag tag-green">-1 Diff</span> <strong>Quintessence:</strong> Spending 1 point (Max -3).</li>
                <li><span class="tag tag-green">-1 Diff</span> <strong>Time:</strong> Taking extra time (Ritual).</li>
                <li><span class="tag tag-red">+1 Diff</span> <strong>Fast Casting:</strong> Action phase panic.</li>
                <li><span class="tag tag-red">+2 Diff</span> <strong>Distracted:</strong> Under fire or storm.</li>
            </ul>
        `
    },

    // --- PARADOX & CONSENSUS ---
    {
        title: "⚠️ Paradox Generation",
        ref: "M20 Core p.547",
        type: "table",
        headers: ["Event", "Success Cost", "Botch Cost"],
        rows: [
            ["Coincidental", "0", "1 / Dot"],
            ["Vulgar", "1", "1 + (1 / Dot)"],
            ["Vulgar (Witness)", "1", "2 + (2 / Dot)"]
        ]
    },
    {
        title: "💥 Backlash (The Wheel)",
        ref: "M20 Core p.550",
        type: "table",
        headers: ["Pool", "Consequence"],
        rows: [
            ["1-5", "1 Bashing / Suc OR Trivial Flaw"],
            ["6-10", "1 Bashing (Burn) / Suc OR Minor Flaw"],
            ["11-15", "1 Lethal (Burn) / Suc OR Major Flaw"],
            ["16-20", "1 Lethal (Burn) + Perm Paradox"],
            ["<span class='hl-red'>21+</span>", "Aggravated (Burn) + Entity/Spirit"]
        ]
    },

    // --- COMBAT & DAMAGE ---
    {
        title: "⚔️ Combat Maneuvers",
        ref: "M20 Core p.419",
        type: "table",
        headers: ["Action", "Roll", "Diff", "Effect"],
        rows: [
            ["Punch", "Dex + Brawl", "6", "Str Bashing"],
            ["Kick", "Dex + Brawl", "7", "Str+1 Bashing"],
            ["Grapple", "Str + Brawl", "6", "Hold / Immobilize"],
            ["Weapon", "Dex + Melee", "6", "Weapon Damage"],
            ["Disarm", "Dex + Melee", "+1", "Knocks weapon"],
            ["Dodge", "Dex + Athl", "6", "Negates Successes"]
        ]
    },
    {
        title: "🔫 Weapons Chart",
        ref: "M20 Core p.452",
        type: "table",
        headers: ["Weapon", "Diff", "Dmg", "Range"],
        rows: [
            ["Pistol (Lt)", "6", "4 L", "20m"],
            ["Pistol (Hv)", "6", "5 L", "35m"],
            ["Shotgun", "6", "8 L", "20m"],
            ["Rifle", "8", "8 L", "200m"],
            ["Knife", "4", "Str+1 L", "Touch"]
        ]
    },
    {
        title: "🛡️ Armor Rating",
        ref: "M20 Core p.456",
        type: "table",
        headers: ["Class", "Armor", "Penalty"],
        rows: [
            ["Clothing (Reinforced)", "1 (2 v B)", "0"],
            ["Kevlar Vest", "3", "1"],
            ["Flak Jacket", "4", "2"],
            ["Riot Suit", "5", "3"]
        ]
    },

    // --- HEALTH & RECOVERY ---
    {
        title: "🏥 Healing Rates (Awakened)",
        ref: "M20 Core p.407",
        type: "table",
        headers: ["Damage", "Natural Rate", "Magickal (Life)"],
        rows: [
            ["<span class='hl-green'>Bashing</span>", "1 Level / Hour", "Life 2"],
            ["<span class='hl-yellow'>Lethal</span>", "1 Level / Day (Rest)", "Life 3"],
            ["<span class='hl-red'>Aggravated</span>", "1 Level / Week", "Life 3 + Prime 2(1 Quintessence Cost)"]
        ]
    },

    // --- RESOURCES ---
    {
        title: "🧠 Willpower Uses",
        ref: "M20 Core p.397",
        type: "text",
        content: `
            <ul class="clean-list">
                <li><span class="tag tag-blue">Auto Success</span> <strong>Guaranteed Success:</strong> Spend 1 pt to get 1 automatic success on a roll. <br><em style="font-size:0.75rem; color:#ef4444;">(EXCEPTION: Forbidden on damage rolls).</em></li>
                <li><span class="tag tag-red">Resist</span> <strong>Self Control:</strong> Overcome instinct, fear, frenzy, or psychological flaws for 1 turn.</li>
                <li><span class="tag tag-green">Ignore Pain</span> <strong>Heroic Effort:</strong> Ignore all wound penalties (up to Incapacitated) for the entire turn.</li>
                <li><span class="tag tag-purple">Defense</span> <strong>Mental Shield:</strong> Spend 1 pt to increase difficulty of Mind Magick or manipulation against you by +1.</li>
            </ul>
        `
    },
    {
        title: "✨ Quintessence Uses",
        ref: "M20 Core p.332, p.537",
        type: "text",
        content: `
            <ul class="clean-list">
                <li><span class="tag tag-blue">-1 Diff</span> <strong>Lower Difficulty:</strong> Spend 1 pt per -1 Diff (Max -3). Must declare before rolling.</li>
                <li><span class="tag tag-red">Agg Dmg</span> <strong>Inflict Damage:</strong> (Prime 2) Spend 1 pt to charge an attack with Prime energy, making it Aggravated.</li>
                <li><span class="tag tag-green">Create</span> <strong>Creation:</strong> (Prime 2) Required to conjure Matter, Forces, or Life from empty space (The Void).</li>
                <li><span class="tag tag-purple">Heal</span> <strong>Heal Aggravated:</strong> (Life 3) Spend 1 pt to heal 1 Level of Aggravated damage (takes 1 week without Time magic).</li>
                <li><span class="tag tag-purple">Fuel</span> <strong>Power Wonders:</strong> Recharge Artifacts, Talismans, or Technocratic Devices.</li>
                <li><span class="tag tag-blue">Counter</span> <strong>Countermagick:</strong> (Prime 1) Spend points to build a "Odyllic Force" shield against incoming hostile magic.</li>
            </ul>
        `
    },
    // --- GROWTH & XP ---
    {
        title: "📈 Experience (XP) Costs",
        ref: "M20 Core p.336",
        type: "table",
        headers: ["Trait", "Cost Formula", "Example Calculation"],
        rows: [
            ["<span class='hl-green'>New Ability</span>", "3 Points", "0 to 1 = 3 XP"],
            ["Ability (Raise)", "Current Rating x 2", "Rating 2 to 3 = 4 XP"],
            ["<span class='hl-purple'>New Sphere</span>", "10 Points", "0 to 1 = 10 XP"],
            ["Sphere (Raise)", "Current Rating x 7", "Rating 2 to 3 = 14 XP"],
            ["Attribute", "Current Rating x 4", "Rating 3 to 4 = 12 XP"],
            ["<span class='hl-red'>Arete</span>", "Current Rating x 8", "Rating 2 to 3 = 16 XP"],
            ["Willpower", "Current Rating x 1", "Rating 5 to 6 = 5 XP"],
            ["<span class='hl-green'>New Background</span>", "3 Points", "Requires ST Approval"],
            ["Background (Raise)", "Current Rating x 2", "Rating 1 to 2 = 2 XP"],
            ["New Rote", "1 Point per Dot", "Rank 3 Rote = 3 XP"],
            ["Avatar Rating", "Current Rating x 8", "Seekings required. Very rare."]
        ]
    },
    // --- ENVIRONMENT & SPIRIT (NEW ADDITIONS) ---
   {
        title: "👻 The Gauntlet (Spirit Barrier)",
        ref: "M20 Core p.505", // 
        type: "table",
        headers: ["Location", "Difficulty", "Success Needed"],
        rows: [
            ["<span class='hl-green'>Node / Haunt</span>", "3", "1"],
            ["Deep Wilderness", "5", "2"],
            ["Rural Countryside", "6", "3"],
            ["Urban Suburbs", "7", "4"],
            ["City Center", "8", "5"],
            ["<span class='hl-red'>Technocracy Lab</span>", "9", "5"] // 6'dan 5'e düzeltildi
        ]
    },
    {
        title: "📡 Connection & Range (Correspondence)",
        ref: "M20 Core p.503-504",
        type: "table",
        headers: ["Req. Successes", "Range / Connection", "Examples"],
        rows: [
            ["<span class='hl-blue'>1 Success</span>", "Line of Sight / Body Sample", "Target is visible OR you have blood/hair."],
            ["<span class='hl-green'>2 Successes</span>", "Very Familiar / Close Item", "Home, office, pet, lover, prized possession."],
            ["<span class='hl-green'>3 Successes</span>", "Familiar / Casual Friend", "Frequented spot, friend, owned object."],
            ["<span class='hl-yellow'>4 Successes</span>", "Visited Once / Acquaintance", "Met briefly, hotel room, item used once."],
            ["<span class='hl-orange'>5 Successes</span>", "Heard-Described / Briefly Met", "Description only, handshake, item touched."],
            ["<span class='hl-red'>6+ Successes</span>", "Anywhere on Earth / No Link", "Blind reach. No connection."]
        ]
    },
    {
        title: "🔥 Fire & Falling Damage",
        ref: "M20 Core p.436-438",
        type: "table",
        headers: ["Hazard", "Damage", "Type"],
        rows: [
            ["Candle / Torch", "1", "Lethal (Soakable)"],
            ["Gas Fire / Bunsen", "2", "Aggravated"],
            ["Chemical / Magnesium", "3", "Aggravated"],
            ["Molten Metal", "10+", "Aggravated"],
            ["Falling (per 3m)", "1 Level", "Bashing (Max 10)"],
            ["Falling (Spikes)", "+1 Level", "Lethal Damage"]
        ]
    }
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

function initMeritLibrary() {
    MERIT_DB.forEach(item => {
        const container = document.getElementById('cat-' + item.cat);
        if (!container) return;

        const row = document.createElement('div');
        row.className = 'data-row';
        row.setAttribute('data-search', `${item.name} ${item.meta} ${item.desc}`);

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

function initRulesLibrary() {
    const container = document.getElementById('rules-container'); // HTML'de bu ID'ye sahip bir div olduğundan emin olun veya 'tab-rules' içindeki accordion yapısını temizleyip JS ile oluşturun.
    // NOT: Mevcut yapınızda 'tab-rules' içinde statik HTML var. Onu temizleyip JS ile dolduracağız.

    // Önce mevcut 'tab-rules' içeriğini temizleyip container'ı hazırlayalım:
    const tabRules = document.getElementById('tab-rules');
    tabRules.innerHTML = '<div class="accordion" id="rules-accordion"></div>';
    const accContainer = document.getElementById('rules-accordion');

    RULES_DB.forEach(rule => {
        // 1. Accordion Item
        const accItem = document.createElement('div');
        accItem.className = 'acc-item';

        // 2. Header
        const header = document.createElement('div');
        header.className = 'acc-header';
        header.textContent = rule.title;
        header.onclick = function () { toggleAcc(this); };

        // 3. Content Wrapper
        const content = document.createElement('div');
        content.className = 'acc-content';

        // --- YENİ: Referans Bilgisi Ekleme ---
        if (rule.ref) {
            const refDiv = document.createElement('div');
            refDiv.style.cssText = "padding: 8px 16px; font-size: 0.7rem; color: var(--accent); background: rgba(6, 182, 212, 0.05); border-bottom: 1px solid var(--border); font-family: 'Courier Prime', monospace; text-align: right;";
            refDiv.textContent = "📖 " + rule.ref;
            content.appendChild(refDiv);
        }
        // -------------------------------------

        // 4. İçerik Tipi (Tablo veya Metin)
        if (rule.type === 'table') {
            const table = document.createElement('table');

            // Thead
            const thead = document.createElement('tr');
            rule.headers.forEach(h => {
                const th = document.createElement('th');
                th.textContent = h;
                thead.appendChild(th);
            });
            table.appendChild(thead);

            // Tbody
            rule.rows.forEach(r => {
                const tr = document.createElement('tr');
                // Arama için data attribute
                tr.setAttribute('data-search', r.join(' ').replace(/<[^>]*>?/gm, ''));

                r.forEach(cell => {
                    const td = document.createElement('td');
                    td.innerHTML = cell;
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

const resonances = ["Fiery (Dynamic)", "Cold (Static)", "Rotting (Entropic)", "Holy (Static/Primordial)", "Industrial (Static/Tech)", "Wild (Dynamic/Primal)", "Empty (Static)"];
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
    initRoteLibrary();
    initMeritLibrary();
    initRulesLibrary(); // <--- YENİ EKLENDİ
};