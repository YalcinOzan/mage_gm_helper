/**
 * ============================================================================
 * MAGE 20TH: DATA LAYER
 * File: data.js
 * Version: 2.5 (Extracted)
 * Content: Static Databases (Spheres, Rotes, Merits, Rules)
 * ============================================================================
 */

/* ----------------------------------------------------------------------------
   1. SPHERES DATABASE
   ---------------------------------------------------------------------------- */
const SPHERE_DB = [
    { name: "Correspondence", icon: "🌐", ranks: ["Immediate Spatial Perception", "Sense & Touch Space", "Pierce Space / Teleport", "Rend Space / Co-location", "Mutate Space / Distort"] },
    { name: "Entropy", icon: "🎲", ranks: ["Sense Fate & Flaws", "Control Probability", "Affect Matter & Energy", "Affect Life / Decay", "Affect Thought / Concepts"] },
    { name: "Forces", icon: "⚡", ranks: ["Perceive Energy", "Control Minor Forces", "Transmute Minor Forces", "Control Major Forces", "Mastery / Cataclysm"] },
    { name: "Life", icon: "🧬", ranks: ["Sense Life & Health", "Alter Simple / Self", "Transform Self / Simple", "Transform Complex Forms", "Create Life / Perfect"] },
    { name: "Matter", icon: "🧱", ranks: ["Matter Perception", "Basic Transmutation", "Alter Form & Shape", "Complex Transformation", "Create / Destroy Matter"] },
    { name: "Mind", icon: "🧠", ranks: ["Sense Thought & Emotion", "Read Surface / Impulse", "Mental Link / Dreamwalk", "Control Conscious Mind", "Control Subconscious"] },
    { name: "Prime", icon: "✨", ranks: ["Sense Quintessence", "Fuel Pattern / Enchant", "Channel / Extract Energy", "Expel / Siphon Energy", "Alter Flow / Create Node"] },
    { name: "Spirit", icon: "👻", ranks: ["Spirit Sight", "Touch Spirit", "Step Sideways / Gauntlet", "Rend Gauntlet / Bind", "Forge Spirit / Gilgul"] },
    { name: "Time", icon: "⏳", ranks: ["Time Sense", "Past & Future Sight", "Time Distortion / Speed", "Time Bubble / Trigger", "Time Travel / Immunity"] }
];

/* ----------------------------------------------------------------------------
   2. ROTES DATABASE
   ---------------------------------------------------------------------------- */
const ROTE_DB = [
    // --- COMBAT ---
    { cat: "combat", name: "Chi-Fire Field", meta: "Prime 2 + Forces 2", desc: "Inflict Aggravated damage on contact.", flavor: "Surrounds the mage with an aura of burning Quintessence." },
    { cat: "combat", name: "The Slipstream", meta: "Forces 2 / Corr 2", desc: "Increase attacker's Difficulty (+2).", flavor: "Bend light/gravity to appear slightly away from actual location." },
    { cat: "combat", name: "The Neo (Bullet Stop)", meta: "Forces 2", desc: "Stop projectiles in mid-air. Vulgar.", flavor: "Halts bullets instantly. Vulgar with witnesses." },
    { cat: "combat", name: "Internal Burn", meta: "Life 3 (+Forces 2)", desc: "Rip life pattern directly. Aggravated.", flavor: "Disrupts bio-electrical processes. Ignores armor." },
    { cat: "combat", name: "Curve Bullet", meta: "Forces 2 (+ Corr 1)", desc: "-1 to -3 diff on ranged attacks.", flavor: "Alters gravity/wind to make impossible shots possible." },
    { cat: "combat", name: "Kinetic Shield", meta: "Forces 2 (Deflect) / Matter 3 (Hard)", desc: "Create force field or harden object.", flavor: "Stops kinetic energy or reinforces shield integrity." },
    { cat: "combat", name: "Rubbing the Bones", meta: "Prime 2", desc: "Inflict bashing damage via friction. Stuns.", flavor: "Agitates the target's pattern, causing internal friction." },
    { cat: "combat", name: "Dim Mak (Delayed Death)", meta: "Life 3 + Time 4", desc: "Trigger damage after a delay.", flavor: "Strikes a blow that takes effect at a set time." },
    { cat: "combat", name: "Chi-Field Push", meta: "Forces 2 + Prime 2", desc: "Knockback enemies without touching.", flavor: "Projects a wall of force to send opponents flying." },
    { cat: "combat", name: "Elemental Armor", meta: "Life 3 (Buff) / Matter 2 (Transform)", desc: "Soak Lethal/Aggravated damage.", flavor: "Enhances durability or turns skin to element." },
    { cat: "combat", name: "War Dance", meta: "Life 4 + Mind 2", desc: "Buff allies' Str/Stam and remove fear.", flavor: "Ritual dance instilling bloodlust and resilience." },
    { cat: "combat", name: "Quintessence Blade", meta: "Prime 3 (+ Forces 3)", desc: "Conjure weapon of pure energy (Agg Dmg).", flavor: "Creates a blade of plasma/magic. Cost: 1 Quint/turn." },
    { cat: "combat", name: "Velocity Boost", meta: "Forces 2 / Entropy 2", desc: "Increase damage by velocity.", flavor: "Uses gravity/entropy for impossible aerial strikes." },
    { cat: "combat", name: "Battle Fury", meta: "Life 3 + Mind 3", desc: "Ignore wound penalties, boost stats.", flavor: "Uncages the beast within. Attacks friend and foe alike." },
    { cat: "combat", name: "Shiva/Kali Form", meta: "Life 4 + Mind 5 + Prime 4", desc: "Combat avatar with multiple arms/weapons.", flavor: "Transform into a multi-armed god of destruction. Vulgar." },

    // --- TRANSMUTATION ---
    { cat: "transmutation", name: "Conjure Object", meta: "Matter 3 + Prime 2", desc: "Create complex matter from nothing.", flavor: "Weaves Quintessence into a pattern. Permanent with Prime 4." },
    { cat: "transmutation", name: "Base Transmutation", meta: "Matter 2", desc: "Turn one substance into another.", flavor: "Alchemy: Lead to gold, water to wine, air to stone." },
    { cat: "transmutation", name: "Shapechange (Self)", meta: "Life 4", desc: "Transform own body.", flavor: "Alter biology to take animal forms or change appearance." },
    { cat: "transmutation", name: "Shapechange (Other)", meta: "Life 5 / Matter 5", desc: "Turn enemy into lawn chair or toad.", flavor: "Rewrites target's pattern. Hard against unwilling targets." },
    { cat: "transmutation", name: "Install Cybernetics", meta: "Life 4 + Matter 4", desc: "Fuse machine parts with living flesh.", flavor: "Union of biology and technology. Permanent causes Paradox." },
    { cat: "transmutation", name: "Conjure Light/Fire", meta: "Forces 3 + Prime 2", desc: "Create energy from nothing.", flavor: "Light in darkness or fire without fuel. Cost: 1 Quint." },
    { cat: "transmutation", name: "Weather Witching", meta: "Forces 4 (Major)", desc: "Summon storm or clear skies.", flavor: "Manipulates weather patterns. High successes needed." },
    { cat: "transmutation", name: "Invisibility", meta: "Forces 2", desc: "Bend light around subject.", flavor: "Makes subject visually undetectable by bending light waves." },
    { cat: "transmutation", name: "Accelerated Decay", meta: "Entropy 3 + Time 3", desc: "Rust metal or rot wood instantly.", flavor: "Speeds up natural entropy causing objects to crumble." },
    { cat: "transmutation", name: "Elemental Wall", meta: "Forces/Matter 3 + Prime 2", desc: "Wall of fire, ice, or stone.", flavor: "Creates a barrier. Damage based on successes." },
    { cat: "transmutation", name: "Petrify", meta: "Life 4 + Matter 2", desc: "Turn living flesh into stone.", flavor: "Transmutes biological cells into inert matter." },
    { cat: "transmutation", name: "Create Food/Water", meta: "Life 3 + Matter 3 + Prime 2", desc: "Conjure nourishment from nothing.", flavor: "Creates edible matter. Prime 2 needed for creation." },
    { cat: "transmutation", name: "EMP Blackout", meta: "Forces 2 (+ Matter 2)", desc: "Kill power grid or devices.", flavor: "Drains or overloads electrical energy in an area." },

    // --- TRAVEL ---
    { cat: "travel", name: "Teleportation", meta: "Correspondence 3 (Step) or 4 (Instant)", desc: "Travel to another location.", flavor: "Step through space or vanish/reappear." },
    { cat: "travel", name: "Open Gateway", meta: "Correspondence 4", desc: "Create stable portal for others.", flavor: "Opens a wormhole/door that others can walk through." },
    { cat: "travel", name: "Co-Location", meta: "Correspondence 4", desc: "Be in multiple places at once.", flavor: "Exist in multiple locations. Actions split between them." },
    { cat: "travel", name: "Levitation / Flight", meta: "Forces 2 (+ Life 2)", desc: "Defy gravity (Self).", flavor: "Alter gravity or ride wind. Speed depends on Forces." },
    { cat: "travel", name: "Bullet Time", meta: "Time 3", desc: "Gain extra actions.", flavor: "Speeds up personal time. 1 Extra Action per 2 Suc." },
    { cat: "travel", name: "Rewind Time", meta: "Time 3", desc: "Turn back time (Vulgar).", flavor: "Reverses time flow. Very high diff/Paradox cost." },
    { cat: "travel", name: "Time Freeze", meta: "Time 4", desc: "Suspend object/person in time.", flavor: "Pauses the target in a bubble of static time." },
    { cat: "travel", name: "The Blink", meta: "Correspondence 3", desc: "Rapid, combat-range teleportation.", flavor: "Short range teleports to confuse enemies/gain position." },
    { cat: "travel", name: "The Batman", meta: "Forces 2 + Corr 3", desc: "Vanish into shadows/smoke.", flavor: "Uses smoke/shadows to mask teleport (Coincidental)." },
    { cat: "travel", name: "Move Mountain", meta: "Corr 5 + Forces 5", desc: "Move an entire location.", flavor: "Teleports a whole building or landscape. Godlike feat." },
    { cat: "travel", name: "Flying Vehicle", meta: "Forces 2 + Matter 2", desc: "Enchant vehicle to fly.", flavor: "Alters gravity/aerodynamics of a car or carpet." },
    { cat: "travel", name: "Traffic Control", meta: "Entropy 2 / Forces 2", desc: "Clear crowds or flip lights.", flavor: "Manipulate probability or electronics to clear path." },

    // --- MIND ---
    { cat: "mind", name: "Read Surface Thoughts", meta: "Mind 2", desc: "Hear current thoughts/emotions.", flavor: "Scans what the target is currently thinking or feeling." },
    { cat: "mind", name: "Mind Control (Puppetry)", meta: "Mind 4", desc: "Take full control of target.", flavor: "Overrides target's will, forcing them to obey." },
    { cat: "mind", name: "Alter Memory", meta: "Mind 4", desc: "Edit, delete, or plant memories.", flavor: "Rewrites the target's past. Complexity varies." },
    { cat: "mind", name: "Dreamwalk", meta: "Mind 3", desc: "Enter/Manipulate dreams.", flavor: "Enter the Astral Plane or a target's dreamscape." },
    { cat: "mind", name: "Astral Projection", meta: "Mind 4", desc: "Project mind into High Umbra.", flavor: "Separate consciousness from body to travel mentally." },
    { cat: "mind", name: "Prophecy / Hindsight", meta: "Time 2", desc: "View past or potential future.", flavor: "Glimpse events that have happened or might happen." },
    { cat: "mind", name: "Aura Perception", meta: "Mind 1 / Life 1", desc: "Read emotional/health state.", flavor: "See colors of a target's aura to judge mood/nature." },
    { cat: "mind", name: "Multi-Tasking", meta: "Mind 1", desc: "Split mind to do multiple tasks.", flavor: "Perform multiple mental tasks without penalty." },
    { cat: "mind", name: "Mental Illusion", meta: "Mind 3", desc: "Hallucinations only target sees.", flavor: "Projects sights/sounds directly into target's mind." },
    { cat: "mind", name: "Physical Illusion", meta: "Forces 2 + Prime 2", desc: "Holograms everyone sees.", flavor: "Uses light/sound to create fake objects/people." },
    { cat: "mind", name: "Instant Sleep", meta: "Mind 4 / Life 4", desc: "Force target into slumber.", flavor: "Shuts down conscious mind or chemical wakefulness." },
    { cat: "mind", name: "Universal Translator", meta: "Mind 3", desc: "Understand any spoken language.", flavor: "Tap into universal unconscious to understand meaning." },
    { cat: "mind", name: "Lie Detector", meta: "Mind 2 / Entropy 1", desc: "Sense truth or deception.", flavor: "Reads subtle shifts in aura/probability to spot lies." },

    // --- SPIRIT ---
    { cat: "spirit", name: "Summon Spirit", meta: "Spirit 2", desc: "Call entity from Umbra.", flavor: "Calls a spirit to location. Does not compel obedience." },
    { cat: "spirit", name: "Bind Spirit", meta: "Spirit 4", desc: "Force spirit into service/object.", flavor: "Traps spirit into a fetish or forces it to obey." },
    { cat: "spirit", name: "Step Sideways", meta: "Spirit 3", desc: "Enter the Spirit World.", flavor: "Physically cross the Gauntlet into the Penumbra." },
    { cat: "spirit", name: "Warding", meta: "Corr 4 (+ Sphere)", desc: "Ban object/creature from area.", flavor: "Creates a barrier against specific things (Fire, Spirits)." },
    { cat: "spirit", name: "Speak with Dead", meta: "Spirit 2 / Entropy 2", desc: "Communicate with ghosts.", flavor: "See and speak to the restless dead across the Shroud." },
    { cat: "spirit", name: "Raise Zombie", meta: "Life 2 + Prime 2", desc: "Animate corpse (Rotting).", flavor: "Animates a dead body. It rots unless preserved." },
    { cat: "spirit", name: "Spirit Strike", meta: "Spirit 2 + Prime 2", desc: "Damage spirit across Gauntlet.", flavor: "Allows physical attacks to hit spirits in Penumbra." },
    { cat: "spirit", name: "Exorcism", meta: "Spirit 4", desc: "Banish possessing entity.", flavor: "Forces a spirit or ghost out of a host body/object." },
    { cat: "spirit", name: "Energy Vampirism", meta: "Prime 3", desc: "Drain Quintessence from living.", flavor: "Steals life force from a victim. Inflicts damage." },
    { cat: "spirit", name: "Resurrection", meta: "Life 5 + Spirit 5 + Mind 5", desc: "Restore life (Very Hard).", flavor: "Returns soul to body. Extremely Vulgar/difficult." },
    { cat: "spirit", name: "Agama Sojourn", meta: "Spirit 4 / Entropy 4", desc: "Project mind into Underworld.", flavor: "Enter the Shadowlands as a wraith-like projection." },
    { cat: "spirit", name: "Luck Ward", meta: "Entropy 2 + Corr 2", desc: "Banishes bad luck.", flavor: "Protects an area from entropy and misfortune." }
];

/* ----------------------------------------------------------------------------
   3. MERITS & FLAWS DATABASE
   ---------------------------------------------------------------------------- */
const MERIT_DB = [
    // --- PHYSICAL ---
    { cat: "merit-phys", name: "Acute Senses", meta: "1 or 3 pts", desc: "-2 difficulty to all rolls with the chosen sense.", flavor: "Your mage has exceptionally sharp senses." },
    { cat: "merit-phys", name: "Ambidextrous", meta: "1 pt", desc: "No penalty for using off-hand.", flavor: "You have equal facility with either hand." },
    { cat: "merit-phys", name: "Catlike Balance", meta: "1 pt", desc: "-2 difficulty to balance-related rolls.", flavor: "Possesses an innately perfect sense of balance." },
    { cat: "merit-phys", name: "Claws / Fangs / Horns", meta: "3+ pts", desc: "Natural weapons dealing Str+1 to Str+3 damage.", flavor: "You possess natural weaponry like claws, fangs, or horns." },
    { cat: "merit-phys", name: "Cloak of the Seasons", meta: "3 pts", desc: "Protected from extreme weather/temperatures.", flavor: "Magically protected from natural heat or cold." },
    { cat: "merit-phys", name: "Huge Size", meta: "4 pts", desc: "Gain one extra 'Bruised' Health Level.", flavor: "You are abnormally large (7ft+), granting extra resilience." },
    { cat: "merit-phys", name: "Insensible to Pain", meta: "5 pts", desc: "Ignore all wound penalties until Incapacitated.", flavor: "Your body deadens pain signals." },
    { cat: "merit-phys", name: "Daredevil", meta: "3 pts", desc: "-2 difficulty & ignore botches on risky actions.", flavor: "You thrive on danger." },
    { cat: "merit-phys", name: "Light Sleeper", meta: "1 pt", desc: "Wake instantly; no penalties for little sleep.", flavor: "You can function on very little sleep." },
    { cat: "merit-phys", name: "Longevity", meta: "2 pts", desc: "You do not age, or age very slowly.", flavor: "Your aging process has halted or slowed significantly." },

    // --- MENTAL ---
    { cat: "merit-ment", name: "Ability Aptitude", meta: "1 pt", desc: "-2 difficulty for one specific Ability.", flavor: "A natural flair for a specific skill." },
    { cat: "merit-ment", name: "Berserker", meta: "2 pts", desc: "WP roll (Diff 6+Wounds) when injured. Ignore wound penalties.", flavor: "You enter a red rage in combat, ignoring pain." },
    { cat: "merit-ment", name: "Code of Honor", meta: "2 pts", desc: "+2 dice to Willpower when acting via code.", flavor: "A personal ethical code gives you strength." },
    { cat: "merit-ment", name: "Common Sense", meta: "1 pt", desc: "ST warns you if you act against common sense.", flavor: "Practical wisdom that alerts you before you do something stupid." },
    { cat: "merit-ment", name: "Concentration", meta: "1 pt", desc: "No penalty for distractions/environment.", flavor: "Ability to shut out all distractions." },
    { cat: "merit-ment", name: "Eidetic Memory", meta: "2 pts", desc: "Perfect recall; Perc+Alertness (Diff 6) under stress.", flavor: "You remember everything you experience with perfect clarity." },
    { cat: "merit-ment", name: "Iron Will", meta: "3 pts", desc: "+3 dice to resist mind magic; spend 1 WP to shake off.", flavor: "Your mind is a fortress." },
    { cat: "merit-ment", name: "Lightning Calculator", meta: "1 pt", desc: "-2 difficulty on math-related rolls.", flavor: "You can perform complex mathematical calculations instantly." },
    { cat: "merit-ment", name: "Time Sense", meta: "1 pt", desc: "Perfect sense of time without a watch.", flavor: "You always know the exact time and date." },
    { cat: "merit-ment", name: "Language", meta: "1 pt", desc: "Speak an additional language fluently.", flavor: "You have a natural gift for tongues." },
    { cat: "merit-ment", name: "Oracular Ability", meta: "3 pts", desc: "Interpret omens/signs automatically.", flavor: "You can see omens and signs of the future." },

    // --- SOCIAL ---
    { cat: "merit-soc", name: "Celestial Affinity", meta: "3 pts", desc: "-2 difficulty dealing with High Umbrood.", flavor: "You have a knack for conversing with noble spirits and angels." },
    { cat: "merit-soc", name: "Ecumenist", meta: "5 pts", desc: "Purchase two specialty Spheres at x7 cost.", flavor: "You understand distinct factions within a Tradition." },
    { cat: "merit-soc", name: "Faction Founder", meta: "4 pts", desc: "+1 Social dice within Tradition; teach specialty.", flavor: "You created your own sub-faction, gaining respect." },
    { cat: "merit-soc", name: "Well Connected", meta: "3 pts", desc: "Backgrounds cost 1 pt/level (Allies, Contacts).", flavor: "You have an extensive network of friends and influence." },
    { cat: "merit-soc", name: "Natural Leader", meta: "2 pts", desc: "+2 dice to Leadership rolls.", flavor: "People instinctively look to you for guidance." },

    // --- SUPERNATURAL ---
    { cat: "merit-super", name: "Astral Vigor", meta: "3 pts", desc: "No astral side effects; 2 Armor in Astral.", flavor: "Your astral form is resilient." },
    { cat: "merit-super", name: "Avatar Companion", meta: "7 pts", desc: "Living companion linked to your Avatar.", flavor: "A person shares your reincarnation cycle." },
    { cat: "merit-super", name: "Circumspect Avatar", meta: "2 pts", desc: "Avatar is subtle; seekings are grounded.", flavor: "Your Avatar acts as a subconscious nudge." },
    { cat: "merit-super", name: "Conditional Magic", meta: "1-6 pts", desc: "-3 Difficulty on Arete rolls under specific conditions.", flavor: "Magic works better under certain rare/common conditions." },
    { cat: "merit-super", name: "Medium", meta: "2 pts", desc: "Naturally sense and speak to ghosts.", flavor: "You are a conduit for the dead." },
    { cat: "merit-super", name: "Parlor Trick", meta: "1 pt", desc: "Perform minor magic at will (no roll).", flavor: "Simple tricks like lighting a candle or changing eye color." },
    { cat: "merit-super", name: "Personal Talisman", meta: "1 pt", desc: "Start with a permanent Talisman.", flavor: "You possess a magical item imbued with your own willpower." },
    { cat: "merit-super", name: "Sphere Natural", meta: "5 pts", desc: "Use one Sphere without Focus instruments.", flavor: "You have internalized the magic of one Sphere so deeply." },
    { cat: "merit-super", name: "True Faith", meta: "7 pts", desc: "Start with 1 dot of True Faith trait.", flavor: "A deep, unshakable belief that provides protection and miracles." },
    { cat: "merit-super", name: "Unaging", meta: "2 pts", desc: "You do not age physically.", flavor: "You stop aging at a certain point." },
    { cat: "merit-super", name: "Arcane (Background)", meta: "1-5 pts", desc: "Hard to track/remember.", flavor: "Technically a Background, but purchased with Freebies here." },
    { cat: "merit-super", name: "Lucky", meta: "3 pts", desc: "3 re-rolls per story (can cancel botches).", flavor: "Fortune favors you. You can turn failure into success." },
    { cat: "merit-super", name: "Resistant Pattern", meta: "3 pts", desc: "Soak 2 dice of damage from Kinetic/Fire/etc.", flavor: "Your pattern is naturally resistant to a specific form of damage." },
    { cat: "merit-super", name: "Deathwalker", meta: "4 pts", desc: "Step Sideways to Underworld (Spirit 3).", flavor: "Your soul bears the imprint of the dead." },
    { cat: "merit-super", name: "Dual Traditions", meta: "7 pts", desc: "Use Foci/Specialty Sphere of two Traditions.", flavor: "You have been trained in the arts of two distinct magical paths." },
    { cat: "merit-super", name: "Green Thumb", meta: "1 pt", desc: "-2 diff on plant-related rolls/magick.", flavor: "Plants thrive under your care." },
    { cat: "merit-super", name: "Stormwarden", meta: "3 pts", desc: "Control/Resist weather effects easier.", flavor: "You suffer no ill effects from storms and can sense them coming." },
    { cat: "merit-super", name: "Unbondable", meta: "3 pts", desc: "Immune to Blood Bonds (Vampire).", flavor: "Vampire blood cannot enslave you." },

    // --- FLAWS ---
    { cat: "flaw-phys", name: "Addiction", meta: "1-3 pts", desc: "Must indulge or suffer dice penalties.", flavor: "Dependent on a substance/act." },
    { cat: "flaw-phys", name: "Bad Sight", meta: "3 pts", desc: "+2 difficulty on vision rolls.", flavor: "Uncorrectable vision problem." },
    { cat: "flaw-phys", name: "Deranged", meta: "2 pts", desc: "Permanent mental disorder.", flavor: "You suffer from a permanent, uncurable mental illness." },
    { cat: "flaw-phys", name: "Nightmares", meta: "1 pt", desc: "WP roll (Diff 7) to sleep restfully or lose 1 die.", flavor: "Horrific dreams plague your sleep." },
    { cat: "flaw-phys", name: "Phobia", meta: "2 pts", desc: "WP roll to face object; +2 diff or flee.", flavor: "An overwhelming, irrational fear." },
    { cat: "flaw-phys", name: "Short Fuse", meta: "2 pts", desc: "WP roll (Diff 6) to avoid anger.", flavor: "You are easily provoked and struggle to control your temper." },
    { cat: "flaw-phys", name: "Vulnerability", meta: "2-4 pts", desc: "Specific substance causes Agg damage.", flavor: "You are allergic to a common substance." },
    { cat: "flaw-phys", name: "One Eye", meta: "2 pts", desc: "+2 diff on depth perception/ranged attacks.", flavor: "You are missing an eye or have no depth perception." },
    { cat: "flaw-phys", name: "Deaf", meta: "4 pts", desc: "Cannot hear. Fail auditory rolls automatically.", flavor: "You cannot perceive sound." },
    { cat: "flaw-phys", name: "Lame", meta: "3 pts", desc: "Movement speed halved. +2 diff on movement.", flavor: "A leg injury or deformity hampers your movement." },
    { cat: "flaw-phys", name: "Child", meta: "3 pts", desc: "Short, weak, treated as kid. -2 Social w/ adults.", flavor: "You are biologically a child." },
    { cat: "flaw-phys", name: "Monstrous", meta: "3 pts", desc: "Appearance 0. Cannot interact socially w/ sleepers.", flavor: "Your appearance is hideous or clearly inhuman." },
    { cat: "flaw-phys", name: "Permanent Wound", meta: "3 pts", desc: "Wound that never heals. -1 Health Level max.", flavor: "An old battle scar or curse that magic cannot repair." },
    { cat: "flaw-phys", name: "Deep Sleeper", meta: "1 pt", desc: "+2 diff to wake up. Miss turns if woken.", flavor: "It is incredibly hard to wake you up." },
    { cat: "flaw-ment", name: "Curiosity", meta: "2 pts", desc: "WP roll (Diff 6) to resist checking mysteries.", flavor: "You cannot walk away from a mystery." },
    { cat: "flaw-soc", name: "Dark Secret", meta: "1 pt", desc: "A secret that could destroy you if revealed.", flavor: "You hide a crime or fact that would make you an outcast." },
    { cat: "flaw-super", name: "Bard's Tongue", meta: "1 pt", desc: "Speak uncomfortable truths.", flavor: "You compulsively speak prophecies or secrets." },
    { cat: "flaw-super", name: "Beast Within", meta: "5 pts", desc: "Roll Dynamic Res (Diff 6) to avoid frenzy.", flavor: "An inner beast drives you to rage." },
    { cat: "flaw-super", name: "Bedeviled", meta: "6 pts", desc: "ST creates random misfortunes automatically.", flavor: "A hostile force watches you." },
    { cat: "flaw-super", name: "Cast No Shadow", meta: "1 pt", desc: "No reflection/shadow.", flavor: "You lack a shadow or reflection." },
    { cat: "flaw-super", name: "Dark Fate", meta: "5 pts", desc: "Horrible demise inevitable.", flavor: "You are doomed to a tragic end." },
    { cat: "flaw-super", name: "Echoes", meta: "1-5 pts", desc: "Supernatural side-effects (cold, smell, static).", flavor: "Your magic bleeds into reality." },
    { cat: "flaw-super", name: "Geasa / Taboo", meta: "1-5 pts", desc: "Breaking oath causes loss of powers/stats.", flavor: "A sacred oath or ban." },
    { cat: "flaw-super", name: "Sphere Inept", meta: "5 pts", desc: "+2 difficulty with one specific Sphere.", flavor: "You struggle to grasp the concepts of one Sphere." },
    { cat: "flaw-super", name: "Cursed", meta: "1-5 pts", desc: "Suffer specific misfortune.", flavor: "You are cursed. Effects vary by points." },
    { cat: "flaw-super", name: "Haunted", meta: "3 pts", desc: "Tormented by a malicious ghost.", flavor: "A wraith follows you." },
    { cat: "flaw-super", name: "Mayfly Curse", meta: "5-10 pts", desc: "You age rapidly or have a short lifespan.", flavor: "Your time is short." },
    { cat: "flaw-super", name: "Conditional Magic (Bane)", meta: "1-6 pts", desc: "+3 Difficulty on Arete rolls under specific conditions.", flavor: "Magic fails or is harder against specific targets/times." },
    { cat: "flaw-super", name: "Prone to Quiet", meta: "3 pts", desc: "Diff -2 to enter Quiet (Madness).", flavor: "Your mind is fragile against Paradox." },
    { cat: "flaw-super", name: "Touch of Frost", meta: "1 pt", desc: "Plants die, room gets cold (-1 Soc).", flavor: "You radiate unnatural cold/death." },
    { cat: "flaw-super", name: "Devil's Mark", meta: "1 pt", desc: "Physical mark showing dark pact/nature.", flavor: "A witch's teat, a strange mole, or a sign." },
];

/* ----------------------------------------------------------------------------
   4. RULES DATABASE
   ---------------------------------------------------------------------------- */
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
        title: "🔥 Magickal Feats (Base Costs)",
        ref: "M20 Core p.502",
        type: "table",
        headers: ["Successes", "Feat Difficulty", "Example"],
        rows: [
            ["1 Success", "Simple", "Flash of light, seeing through a wall."],
            ["2 Successes", "Standard", "Healing self, minor telekinesis."],
            ["3 Successes", "Difficult", "Teleporting, throwing a fireball."],
            ["4 Successes", "Impressive", "Shapeshifting others, complex illusion."],
            ["5 Successes", "Mighty", "Major storms, turning human to stone."],
            ["10+ Successes", "Godlike", "Rewriting memories, moving buildings."]
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
                <li><span class="tag tag-green">-1 Diff</span> <strong>Quintessence:</strong> Spending 1 pt (Max -3).</li>
                <li><span class="tag tag-green">-1 Diff</span> <strong>Time:</strong> Taking extra time (Ritual).</li>
                <li><span class="tag tag-red">+1 Diff</span> <strong>Fast Casting:</strong> Action phase panic.</li>
                <li><span class="tag tag-red">+2 Diff</span> <strong>Distracted:</strong> Under fire or storm.</li>
            </ul>
        `
    },
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
            ["Sphere (Native Raise)", "Current Rating x 7", "Rating 2 to 3 = 14 XP"],
            ["Sphere (Raise)", "Current Rating x 8", "Rating 2 to 3 = 16 XP"],
            ["Attribute", "Current Rating x 4", "Rating 3 to 4 = 12 XP"],
            ["<span class='hl-red'>Arete</span>", "Current Rating x 8", "Rating 2 to 3 = 16 XP"],
            ["Willpower", "Current Rating x 1", "Rating 5 to 6 = 5 XP"],
            ["<span class='hl-green'>New Background</span>", "3 Points", "Requires ST Approval"],
            ["Background (Raise)", "Current Rating x 2", "Rating 1 to 2 = 2 XP"],
            ["New Rote", "1 Point per Dot", "Rank 3 Rote = 3 XP"],
            ["Avatar Rating", "Current Rating x 8", "Seekings required. Very rare."]
        ]
    },
    // --- ENVIRONMENT ---
    {
        title: "👻 The Gauntlet (Spirit Barrier)",
        ref: "M20 Core p.505",
        type: "table",
        headers: ["Location", "Difficulty", "Success Needed"],
        rows: [
            ["<span class='hl-green'>Node / Haunt</span>", "3", "1"],
            ["Deep Wilderness", "5", "2"],
            ["Rural Countryside", "6", "3"],
            ["Urban Suburbs", "7", "4"],
            ["City Center", "8", "5"],
            ["<span class='hl-red'>Technocracy Lab</span>", "9", "5"]
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

// EOF: data.js