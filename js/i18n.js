/* ────────────────────────────────────────────────────────────────
   DeebSilk Studio — shared localization engine (all pages)
   - EN (default) + RU. Dictionary at the bottom — add languages
     there without touching page HTML.
   - Elements carry data-i18n="key" (text), data-i18n-ph (placeholder),
     data-i18n-title (title/aria-label), data-i18n-html (innerHTML).
   - Language is saved to localStorage, applied on every page load.
   - Dynamic JS text: call I18N.t('key', {n: 5}) at render time.
   ──────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var STORE = 'ddo_lang';
  var NAME_PREFIX = 'ddo_lang=';

  function readLang() {
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q) return q;
    } catch (e) {}
    try {
      var v = localStorage.getItem(STORE);
      if (v) return v;
    } catch (e) {}
    try {
      if (typeof window.name === 'string' && window.name.indexOf(NAME_PREFIX) === 0) {
        return window.name.substring(NAME_PREFIX.length);
      }
    } catch (e) {}
    return null;
  }

  function writeLang(lng) {
    try { localStorage.setItem(STORE, lng); } catch (e) {}
    try { window.name = NAME_PREFIX + lng; } catch (e) {}
  }

  function propagateLinks() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      try {
        var href = a.getAttribute('href') || '';
        if (href.charAt(0) === '#') return;
        var u = new URL(a.href, location.href);
        if (u.origin !== location.origin) return;
        if (!/\.html/.test(u.pathname)) return;
        if (lang === 'en') u.searchParams.delete('lang');
        else u.searchParams.set('lang', lang);
        if (a.href !== u.href) a.href = u.href;
      } catch (e) {}
    });
  }
  var dict = { en: {}, ru: {} };

  function normalize(d) {
    var out = {};
    Object.keys(d).forEach(function (k) {
      if (typeof d[k] === 'object' && d[k] !== null) {
        var flat = normalize(d[k]);
        Object.keys(flat).forEach(function (sub) { out[k + '.' + sub] = flat[sub]; });
      } else { out[k] = d[k]; }
    });
    return out;
  }

  var DICT = {
    en: {
      brand: { name: 'DEEBSILK', sub: 'STUDIO' },
      nav: {
        wiki: 'Wiki', map: 'Map', minigame: 'Minigame', donate: 'Donate',
        blog: 'Blog', contact: 'Contacts', play: 'Play now', menu: 'Menu'
      },
      footer: {
        desc: 'Independent studio. Deep Dive Online — an anime MMORPG for PC and VR, in active development.',
        game: 'Game', studio: 'Studio',
        wiki: 'Wiki', map: 'Map', minigame: 'Minigame', donate: 'Donate',
        project: 'Project', gallery: 'Gallery', roadmap: 'Roadmap', blog: 'Blog', contact: 'Contacts',
        download: 'Download',
        rights: '© 2026 DeebSilk Studio · Deep Dive Online. All rights reserved.',
        about: 'About the studio', features: 'Features', tech: 'Technology', developer: 'Developer'
      },
      hero: {
        badge: 'Project Origin · Active development',
        studio: 'Game Studio',
        sub: 'An independent studio from the world of <b>Deep Dive Online</b> — a next-gen anime MMORPG for <b>PC and VR</b>. Fight, craft, explore: a world where your skills decide your fate.',
        cta1: 'Explore the project', cta2: 'Dev blog', cta3: 'GitHub', ctaDl: 'Download game',
        stat1v: 'Unity 6', stat1k: 'Engine', stat2v: 'Action RPG', stat2k: 'Genre',
        stat3v: 'PC · VR', stat3k: 'Platforms', scroll: 'Scroll'
      },
      quicknav: { about: 'Studio', project: 'Project', features: 'Features', world: 'World', characters: 'Characters', gallery: 'Gallery', roadmap: 'Roadmap', blog: 'News', tech: 'Tech', faq: 'FAQ', developer: 'Developer' },
      about: {
        eyebrow: 'About the studio',
        title: 'Independent studio.<br>One game — one immersion.',
        p1: '<b>DeebSilk Studio</b> is an indie studio devoted to immersive RPG experiences. We build <b>Deep Dive Online</b> by hand: from idea to class balance, from Blender models to the combat system in Unity&nbsp;6. No corporate layer — just development, lore and community.',
        p2: 'While development is under way, you can already dive into the world: study the wiki, explore the map, try the combat mechanics in the minigame or support the project.',
        linkWiki: 'Wiki', linkMap: 'Map', linkMinigame: 'Minigame', linkDonate: 'Donate',
        stStatus: 'Status', stTitle: 'In active development',
        stDesc: 'We are improving graphics, combat balance and the VR mode. Every update appears in the blog.',
        stProject: 'Project', stGenre: 'Genre', stEngine: 'Engine', stPlatforms: 'Platforms', stStyle: 'Style',
        vProject: 'PROJECT ORIGIN', vGenre: 'FANTASY ACTION RPG', vEngine: 'UNITY 6', vPlatforms: 'PC · OPENXR', vStyle: 'ANIME · VRMMO'
      },
      project: {
        eyebrow: 'Project Origin', title: 'The gates to the virtual world are open',
        label: 'The game', name: 'Deep Dive Online',
        desc: 'Deep Dive Online drops players into a next-generation virtual reality. Legend says the world was woven from stardust and <span class="glow">celestial light</span>. But a mysterious rift opened portals to the lower worlds, and monsters poured through. Now the fate of this world lies with the Players — can you reach floor 100 and uncover the secret of the creator?',
        specEngine: 'Engine', specGenre: 'Genre', specStatus: 'Status', specPlatforms: 'Platforms',
        vEngine: 'Unity 6', vGenre: 'Fantasy Action RPG', vStatus: 'Active Development', vPlatforms: 'PC · VR (OpenXR)',
        cap: '// ART-SHOWCASE · PENDING-RENDER'
      },
      features: {
        eyebrow: 'Game systems', title: 'What already lives in the game',
        f1t: 'Dynamic combat', f1d: 'Real-time combo attacks, dodges and magic abilities. Every class feels different.',
        f2t: 'Inventory system', f2d: 'Hundreds of items, stacks, weight and quick access. Bring back everything you find in dungeons.',
        f3t: 'Equipment', f3d: 'Sets, bonuses, crafting and item upgrades. Look and stats — your way to play.',
        f4t: 'NPC dialogue', f4d: 'Living conversations with choice-based replies. Your words unlock secret quests and story branches.',
        f5t: 'Quests', f5d: 'Story campaign and endless repeatable missions. Rewards grow with every floor.',
        f6t: 'Enemy AI', f6d: 'Monsters learn: they adapt to your style, call for backup and set traps on your path.',
        f7t: 'Open world', f7d: 'Sky castles, dense forests and hidden treasures. Explore the endless expanse of the floors.',
        f8t: 'Controller support', f8d: 'Full gamepad scheme: combat, menus and inventory built for the pad from scratch.',
        f9t: 'VR Ready', f9d: 'Full immersion through OpenXR and Meta Quest. You are inside the world — not in front of a screen.',
        f10t: 'Unique classes', f10d: 'Pick a path from 12 base and dozens of advanced classes. Swordmaster or elemental lord?',
        f11t: 'Interactive map', f11d: 'A living map with zones, teleports and event markers. Don\'t get lost on new floors.',
        f12t: 'Multiplayer', f12d: 'Guilds, boss raids and real-time arenas. Playing together is more fun.'
      },
      world: {
        eyebrow: 'The world', title: 'One hundred floors above the clouds',
        sub: 'The Great Merger split reality into a hundred floating floors. Each one is an ecosystem with its own laws, monsters and secrets.',
        w1t: 'Starting City', w1d: 'The central hub for every new player. Shops, guilds and the road to the first floor.',
        w2t: 'Forest of Ancients', w2d: 'Dangerous woods for levels 10–20. Home of the forest wolves.',
        w3t: 'Sky Castle', w3d: 'The final location of the current floor. Only for the strongest.',
        w4t: 'Dungeon of Fear', w4d: 'The first real trial. At the end waits a boss: the Goblin King.'
      },
      characters: {
        eyebrow: 'Characters', title: 'Meet the wanderers',
        c1t: 'The Warden of the Abyss', c1r: 'Mysterious wanderer', c1d: 'A legless humanoid hovering in the air. A worn cloak hides absolute darkness — only two red lights burn inside the hood.',
        c2t: 'Swordsman', c2r: 'Frontline fighter', c2d: 'Master of melee combat. High defense and steady damage. Perfect for those who lead the charge and protect allies.',
        c3t: 'Mage', c3r: 'Elemental lord', c3d: 'Master of the elements. Huge area damage, but extremely fragile. Needs a team\'s cover.',
        c4t: 'Shadow', c4r: 'Stealth specialist', c4d: 'Master of stealth and swift strikes. Deals devastating damage to single targets and uses poisons.'
      },
      gallery: {
        eyebrow: 'Gallery', title: 'Frames from the world',
        t1tag: 'Art', t1t: 'Sky Castle', t1c: 'The first zone — a city-citadel above the clouds.',
        t2tag: 'Video', t2t: 'Combat teaser', t2c: 'Combo attacks and magic in real time.',
        t3tag: 'Screenshot', t3t: 'Crafting system', t3c: 'The interface for crafting items and upgrading gear.',
        t4tag: 'Screenshot', t4t: 'Floor boss', t4c: 'The guardian of floor 47 awaits a party.',
        t5tag: 'Video', t5t: 'VR mode', t5c: 'Immersion through OpenXR and Meta Quest.',
        t6tag: 'Art', t6t: 'Forest of Shadows', t6c: 'The lower worlds beyond the rift.',
        lbClose: 'Close', lbPrev: 'Previous', lbNext: 'Next', lbLabel: 'Media viewer'
      },
      progress: {
        eyebrow: 'Development progress', title: 'System scan',
        moduleTitle: 'Module status',
        m1: 'Prototype & core', m2: 'Dynamic combat', m3: 'Inventory & equipment',
        m4: 'NPC & dialogue', m5: 'Quests & story', m6: 'Open world', m7: 'VR mode',
        done: 'Done', work: 'In progress', plan: 'Planned',
        phaseEyebrow: 'Phase', phaseBig: 'Heading to <span class="num">Alpha</span>',
        phaseDesc: 'The game core is already playable: combat, inventory and equipment work. Now we are building quests, NPC dialogue and preparing the first big world for a closed test.',
        bBuild: 'Build', vBuild: 'v0.4.x', bTest: 'Test', vTest: 'Open', bChannel: 'Channel', vChannel: 'Discord'
      },
      roadmap: {
        eyebrow: 'Roadmap', title: 'The path from prototype to release',
        r1t: 'Prototype', r1d: 'Base mechanics, controller, combat scene.',
        r2t: 'Core systems', r2d: 'Menus, character, saves, world loading.',
        r3t: 'Combat', r3d: 'Combos, dodges, magic, class balance.',
        r4t: 'Inventory', r4d: 'Items, weight, crafting and upgrades.',
        r5t: 'NPC & dialogue', r5d: 'Living conversations with choice-based replies.',
        r6t: 'Quests', r6d: 'Story campaign and repeatable missions.',
        r7t: 'World', r7d: 'Open zones, teleports, dynamic events.',
        r8t: 'Alpha', r8d: 'Closed test for the Discord community.',
        r9t: 'Beta', r9d: 'Open test, polish, VR mode.',
        r10t: 'Release', r10d: 'Launch on PC and in VR via OpenXR.',
        done: 'Done', work: 'In progress', plan: 'Planned', next: 'Next step', planned: 'Planned', goal: 'Goal'
      },
      blog: {
        eyebrow: 'Media & updates', title: 'Project news',
        wBadge: 'New encounter',
        wName1: 'The mysterious', wName2: 'Warden of the Abyss',
        wDesc: 'A legless humanoid hovering in the air. An old worn cloak hides absolute darkness. No face — only two red lights deep inside the hood. They say he can take objects out of nowhere...',
        wLvl: 'Level', wFloors: 'Floors', wDark: 'Darkness',
        wCta: 'Read the lore',
        b1ver: 'v0.4.0', b1tag: 'Video', b1t: 'Combat teaser', b1d: 'See how combo attacks and magic abilities work in real time.', b1more: 'Watch',
        b2ver: 'v0.3.7', b2tag: 'Development', b2t: 'Crafting system', b2d: 'A first look at the interface for crafting items and upgrading gear.', b2more: 'Watch'
      },
      tech: {
        eyebrow: 'Stack', title: 'Studio technology',
        t1n: 'Unity 6', t1r: 'ENGINE', t2n: 'C#', t2r: 'GAMEPLAY',
        t3n: 'Git', t3r: 'VCS', t4n: 'GitHub', t4r: 'RELEASE',
        t5n: 'Blender', t5r: '3D ASSETS', t6n: 'VS Code', t6r: 'EDITOR',
        t7n: 'OpenXR', t7r: 'VR STANDARD', t8n: 'Meta Quest', t8r: 'TARGET HMD'
      },
      dev: {
        eyebrow: 'Developer', name: 'Deeb',
        desc: 'Founder of <b>DeebSilk Studio</b>. The project is driven by one person: from gameplay logic in C# and world building in Unity 6 to Blender models and interface design.',
        r1: 'Founder', r2: 'Game Developer', r3: 'Gameplay Programmer', r4: 'UI / UX', r5: 'Game Designer'
      },
      faq: {
        eyebrow: 'FAQ', title: 'Questions & answers',
        q1: 'When will the game be released?', a1: 'We are heading to Alpha now. The release date depends on how fast we finish the core systems and the first full world — follow the roadmap and blog.',
        q2: 'Will there be VR support?', a2: 'Yes. OpenXR is our VR standard, with Meta Quest as the primary headset target. VR mode is planned for the Beta stage.',
        q3: 'Can I play already?', a3: 'You can try the combat system right now in the minigame. Closed testing will open with the Alpha stage.',
        q4: 'Will the game be free to play?', a4: 'The final business model is still being decided. The donation page supports development today, and every supporter gets an in-game title.',
        q5: 'How can I support the project?', a5: 'Join the Discord, share the game with friends, or buy a pack on the donation page — all funds go to servers and new artists.'
      },
      future: {
        eyebrow: 'Future projects', title: 'What comes next',
        sub: 'The studio is not standing still. Beyond Project Origin, new ideas are already taking shape.',
        f1t: 'Project Code: ???', f1d: 'A mystery project. Even the name is a secret — a dark fantasy with roguelike elements.',
        f2t: 'Project Code: ???', f2d: 'Something for mobile. An accessible RPG you can play anywhere.',
        f3t: 'Community events', f3d: 'In-game festivals, art contests and lore quests for the community.'
      },
      wiki: {
        eyebrow: 'Wiki', title: 'Knowledge base',
        sub: 'Classes, bestiary, crafting and the lore of Deep Dive Online. A growing archive for new and returning players.',
        sidebarTitle: 'Wiki sections', sidebarBase: 'Knowledge base',
        navClasses: 'Classes', navBestiary: 'Bestiary', navCrafting: 'Crafting', navLore: 'World lore',
        kb1: 'Swordsman', kb2: 'Ancient Forest', kb3: 'Mana crystals', kb4: 'Sky Castle',
        classesTitle: 'Character classes',
        classesP: 'In <b>Deep Dive Online</b> the class system is built around flexibility and specialization. Every player starts as a "Newcomer" and at level 10 chooses one of four base specializations that later branch into dozens of elite paths.',
        c1t: 'Swordsman', c1d: 'Master of melee combat. High defense and steady damage. Perfect for those who like to stay at the edge of the attack and protect allies.',
        c2t: 'Archer', c2d: 'Ranged combat specialist. High attack speed and critical hit chance. Can place magic traps.',
        c3t: 'Mage', c3d: 'Lord of the elements. Huge area damage but extremely low survivability. Requires coordinated group work and cover.',
        c4t: 'Rogue', c4d: 'Master of stealth and swift strikes. Deals devastating damage to single targets and uses poisons effectively.',
        bestiaryTitle: 'Bestiary',
        bestiaryP: 'The world is populated by dangerous creatures adapted to different environments. Each zone has its own unique monsters and world bosses that require a tactical approach.',
        b1name: 'Forest Wolf', b1lvl: '(Lvl 1-5)',
        b1d: 'An aggressive beast found in the starting location. Attacks in packs, which makes it dangerous for lone newcomers.',
        b2name: 'Emerald Dragon', b2lvl: '(World Boss)',
        b2d: 'Ancient guardian of the Sky Castle on the 50th floor. Requires a coordinated raid of 40 players.',
        craftingTitle: 'Crafting system',
        craftingP: 'Crafting in our game is not just a support feature — it is a full profession. Players can gather rare resources and craft legendary equipment that cannot be found in dungeons.',
        k1t: 'Blacksmithing:', k1d: 'Forging weapons and heavy armor from mined ore.',
        k2t: 'Alchemy:', k2d: 'Brewing elixirs that temporarily boost magical abilities.',
        k3t: 'Tailoring:', k3d: 'Sewing light armor and magic robes from sky silk.',
        loreTitle: 'World lore',
        loreP1: 'The history of <b>Deep Dive Online</b> began with the Great Merger of Realities. Two thousand years ago the world was split into a hundred floating floors, each a unique ecosystem with its own laws of physics and magic flows.',
        loreP2: 'The players\' main goal is to pass every trial, defeat the floor guardians and reach the very top, where — according to legend — the Creator of the system himself awaits, able to grant any wish.'
      },
      map: {
        eyebrow: 'World map', title: 'Interactive world map',
        sub: 'Drag to pan, scroll to zoom. Click the markers to inspect locations.',
        hint: 'Drag — move · wheel — zoom · click a marker',
        start: 'Starting City', startD: 'The central hub for all new players. The main shops and guilds are here.',
        forest: 'Forest of Ancients', forestD: 'A dangerous zone for level 10-20 players. Home of the forest wolves.',
        dungeon: 'Dungeon of Fear', dungeonD: 'The first serious trial. At the end waits a boss: the Goblin King.',
        castle: 'Sky Castle', castleD: 'The final location of the current floor. Only for the strongest.',
        lblStart: 'START CITY', lblForest: 'ANCIENT FOREST', lblDungeon: 'DUNGEON', lblCastle: 'SKY CASTLE',
        infoTitle: 'Location', infoDefault: 'Location description will appear here.',
        zoomIn: 'Zoom in', zoomOut: 'Zoom out'
      },
      donate: {
        eyebrow: 'Support', title: 'Support the development',
        sub: 'All funds go to paying for servers and bringing in new artists to create unique content.',
        buy: 'Buy', hot: 'BESTSELLER', soon: 'Soon — in early access',
        currencyTitle: 'Currency packs',
        currencySub: 'Mana Crystals are used to buy cosmetic items and expand your inventory.',
        hot: 'TOP SELLER',
        buy: 'Buy',
        p1t: 'Handful of Crystals', p1price: '299 ₽',
        p1f1: '500 Mana Crystals', p1f2: 'Bonus: +50 crystals', p1f3: 'Access to the closed chat',
        p2t: 'Sage\'s Chest', p2price: '990 ₽',
        p2f1: '2000 Mana Crystals', p2f2: 'Bonus: +400 crystals', p2f3: 'Unique title "Patron"', p2f4: 'Skill reset scroll (×3)',
        p3t: 'King\'s Treasure', p3price: '2490 ₽',
        p3f1: '6000 Mana Crystals', p3f2: 'Bonus: +1500 crystals', p3f3: 'Golden nickname effect', p3f4: 'Early access to new floors',
        starterTitle: 'Starter packs',
        s1t: 'Newcomer Set', s1price: '149 ₽',
        s1d: 'The perfect start for your adventure. Includes basic gear and potions.',
        s2t: 'Swordsman\'s Path', s2price: '499 ₽',
        s2d: 'A rare quality steel sword and a full set of leather armor.',
        s3t: 'Magic Folio', s3price: '499 ₽',
        s3d: 'An apprentice staff and 10 scrolls with powerful fire spells.'
      },
      minigame: {
        eyebrow: 'Minigame', title: 'DDO Arena',
        sub: 'Fight monsters in turn-based battles. Every 5 wins — a boss. How many floors can you reach?',
        highScore: 'Record:',
        goTitle: '💀 Defeated',
        goDesc: 'You fell in battle... but the tower remembers your valor.',
        statLevel: 'Level', statGold: 'Gold', statKills: 'Monsters slain', statScore: 'Score',
        restart: 'Start over',
        playerLabel: 'Player', monsterLabel: 'Monster', bossLabel: '👑 BOSS',
        lvlLabel: 'Lvl', floorLabel: 'Floor',
        atkLabel: 'Atk', defLabel: 'Def', goldLabel: 'Gold', killsLabel: 'Slain',
        atkBtn: '⚔ Attack', powerBtn: '💥 Power strike (15 MP)', healBtn: '❤🩹 Heal (20 MP)', defendBtn: '🛡 Defend', resetBtn: '↺ Reset',
        mon1: 'Forest Goblin', mon2: 'Stone Golem', mon3: 'Shadow Ghost', mon4: 'Fire Salamander',
        mon5: 'Frost Wyvern', mon6: 'Night Assassin', mon7: 'Ancient Elemental', mon8: 'Giant Spider',
        mon9: 'Bandit Marauder', mon10: 'Cursed Knight',
        boss1: 'Goblin King', boss2: 'Dragon of the Depths', boss3: 'Lord of Shadows', boss4: 'Titan of the Abyss',
        bossSpawn: '👑 BOSS floor! {n} appears!', bossAlert: '⚔ A BOSS APPEARED ⚔',
        monSpawn: '👹 {n} (Lvl {l}) enters the arena!',
        logAttack: '⚔ You strike {n} for {d} damage!',
        logPower: '💥 Vengeance strike! {d} damage to {n}!',
        noMp: '❌ Not enough MP! (need {need}, you have {have})',
        logHeal: '❤🩹 You restore {a} HP!',
        logDefend: '🛡 You take a defensive stance! (damage -50%)',
        defendAlert: '🛡 DEFENSE',
        logMonAtk: '👹 {n} attacks you for {d} damage!',
        halfBlocked: ' (half blocked)',
        bossDown: '👑 {n} defeated! +{g}💰 +{s}⭐',
        bossDownAlert: '🏆 BOSS DEFEATED!',
        monDown: '💀 {n} destroyed! +{g}💰 +{s}⭐',
        levelUp: '⬆ LEVEL {l}! Stats increased!',
        levelUpAlert: '⬆ LEVEL {l}!',
        fell: '💀 You fell on floor {f}!',
        newRecord: '🏆 NEW RECORD!',
        start: '🏯 A new adventure begins...'
      },
      contact: {
        eyebrow: 'Contact', title: 'Stay in touch with the studio',
        channels: 'Channels',
        channelsDesc: 'Questions, bug reports, ideas — we read everything. The fastest response is on Discord.',
        ghT: 'GitHub', ghD: 'Open repository & releases',
        dcT: 'Discord', dcD: 'Community server',
        ytT: 'YouTube', ytD: 'Development diaries',
        emT: 'Email', emD: 'hello@deebsilk.studio',
        dcEyebrow: 'Community', dcTitle: 'Join the Discord',
        dcDesc: 'Discuss the game with developers, find raid allies and be the first to hear about new updates.',
        dcCta: 'Join Discord'
      },
      download: {
        eyebrow: 'Download',
        title: 'Get the build',
        sub: 'Deep Dive Online is still in development — but you can already get the playable prototype build. Versions are published on GitHub Releases and installed in one click.',
        statusCheck: 'Checking for the latest build…',
        statusNone: 'No public build published yet',
        statusReady: 'Ready to install',
        btn: 'Download for Windows',
        btnSoon: 'Build coming soon',
        btnAll: 'All releases on GitHub',
        version: 'Version',
        size: 'Size',
        platforms: 'Platforms',
        pc: 'Windows PC',
        vr: 'VR · Meta Quest',
        reqTitle: 'Requirements',
        reqPc: 'Windows 10 64-bit, any GPU, 8 GB RAM',
        reqVr: 'Coming with the VR mode',
        note: 'The build is auto-downloaded from the GitHub release of the latest version.',
        share: 'Share a bug report',
        noBuildDesc: 'We are finishing the prototype. Subscribe to the blog or watch the GitHub repo — the first public build will appear here as soon as it is published.'
      },
      meta: {
        index: 'DeebSilk Studio · Project Origin — Deep Dive Online',
        wiki: 'Wiki · DeebSilk Studio — Deep Dive Online',
        map: 'World Map · DeebSilk Studio — Deep Dive Online',
        donate: 'Donate · DeebSilk Studio — Deep Dive Online',
        minigame: 'Minigame · DeebSilk Studio — Deep Dive Online'
      }
    },
    ru: {
      brand: { name: 'DEEBSILK', sub: 'STUDIO' },
      nav: {
        wiki: 'Вики', map: 'Карта', minigame: 'Мини-игра', donate: 'Донат',
        blog: 'Блог', contact: 'Контакты', play: 'Играть сейчас', menu: 'Меню'
      },
      footer: {
        desc: 'Независимая студия. Deep Dive Online — аниме-MMORPG для ПК и VR. Игра в активной разработке.',
        game: 'Игра', studio: 'Студия',
        wiki: 'Вики', map: 'Карта', minigame: 'Мини-игра', donate: 'Донат',
        project: 'Проект', gallery: 'Галерея', roadmap: 'Роадмап', blog: 'Блог', contact: 'Контакты',
        download: 'Скачать',
        rights: '© 2026 DeebSilk Studio · Deep Dive Online. Все права защищены.',
        about: 'О студии', features: 'Фичи', tech: 'Технологии', developer: 'Разработчик'
      },
      hero: {
        badge: 'Project Origin · Активная разработка',
        studio: 'Игровая студия',
        sub: 'Независимая студия из мира <b>Deep Dive Online</b> — аниме-MMORPG нового поколения для <b>ПК и VR</b>. Сражайся, создавай, исследуй: мир, где твои навыки определяют судьбу.',
        cta1: 'Изучить проект', cta2: 'Блог разработки', cta3: 'GitHub', ctaDl: 'Скачать игру',
        stat1v: 'Unity 6', stat1k: 'Движок', stat2v: 'Action RPG', stat2k: 'Жанр',
        stat3v: 'PC · VR', stat3k: 'Платформы', scroll: 'Листай'
      },
      quicknav: { about: 'О студии', project: 'Проект', features: 'Фичи', world: 'Мир', characters: 'Персонажи', gallery: 'Галерея', roadmap: 'Роадмап', blog: 'Новости', tech: 'Технологии', faq: 'FAQ', developer: 'Разработчик' },
      about: {
        eyebrow: 'О студии',
        title: 'Независимая студия.<br>Одна игра — одно погружение.',
        p1: '<b>DeebSilk Studio</b> — инди-студия, посвящённая иммерсивным RPG-переживаниям. Мы делаем <b>Deep Dive Online</b> своими руками: от идеи до баланса классов, от моделей в Blender до боевой системы в Unity&nbsp;6. Никакого корпоративного слоя — только разработка, лор и сообщество.',
        p2: 'Пока идёт разработка, ты уже можешь окунуться в мир: изучи вики, исследуй карту, испытай боевую механику в мини-игре или поддержи проект.',
        linkWiki: 'Вики', linkMap: 'Карта', linkMinigame: 'Мини-игра', linkDonate: 'Донат',
        stStatus: 'Статус', stTitle: 'В активной разработке',
        stDesc: 'Мы работаем над улучшением графики, боевым балансом и VR-режимом. Каждое обновление появляется в блоге.',
        stProject: 'Проект', stGenre: 'Жанр', stEngine: 'Движок', stPlatforms: 'Платформы', stStyle: 'Стиль',
        vProject: 'PROJECT ORIGIN', vGenre: 'FANTASY ACTION RPG', vEngine: 'UNITY 6', vPlatforms: 'PC · OPENXR', vStyle: 'ANIME · VRMMO'
      },
      project: {
        eyebrow: 'Project Origin', title: 'Врата в виртуальный мир уже открыты',
        label: 'Игра', name: 'Deep Dive Online',
        desc: 'Deep Dive Online переносит игроков в виртуальную реальность нового поколения. Легенда гласит, что мир был создан из звёздной пыли и <span class="glow">небесного света</span>. Однако таинственный разлом открыл порталы в нижние миры, откуда хлынули монстры. Теперь судьба этого мира в руках Игроков — сможете ли вы достичь 100-го этажа и раскрыть тайну создателя?',
        specEngine: 'Движок', specGenre: 'Жанр', specStatus: 'Статус', specPlatforms: 'Платформы',
        vEngine: 'Unity 6', vGenre: 'Fantasy Action RPG', vStatus: 'Active Development', vPlatforms: 'PC · VR (OpenXR)',
        cap: '// ART-SHOWCASE · PENDING-RENDER'
      },
      features: {
        eyebrow: 'Игровые системы', title: 'Что уже живёт в игре',
        f1t: 'Динамичный бой', f1d: 'Комбо-атаки, уклонения и магические способности в реальном времени. Каждый класс чувствуется по-своему.',
        f2t: 'Система инвентаря', f2d: 'Сотни предметов, стеки, вес и быстрый доступ. Перенос всего, что нашёл в подземельях.',
        f3t: 'Снаряжение', f3d: 'Сеты, бонусы, крафт и улучшение предметов. Внешний вид и статы — под твой стиль игры.',
        f4t: 'Диалоги с NPC', f4d: 'Живые разговоры с выбором ответов. Твои слова открывают секретные квесты и сюжетные ветки.',
        f5t: 'Квесты', f5d: 'Сюжетная кампания и бесконечные повторяемые задания. Награды растут с каждым этажом.',
        f6t: 'ИИ врагов', f6d: 'Монстры учатся: подстраиваются под твой стиль, зовут подмогу и ставят ловушки на пути.',
        f7t: 'Открытый мир', f7d: 'Небесные замки, густые леса и скрытые сокровища. Исследуй бескрайние просторы этажей.',
        f8t: 'Поддержка контроллеров', f8d: 'Полная геймпад-схема: бой, меню и инвентарь заточены под геймпад с нуля.',
        f9t: 'VR Ready', f9d: 'Полное погружение через OpenXR и Meta Quest. Ты внутри мира — не перед экраном.',
        f10t: 'Уникальные классы', f10d: 'Выбирай путь из 12 базовых и десятков продвинутых классов. Мастер меча или повелитель стихий?',
        f11t: 'Интерактивная карта', f11d: 'Живая карта с зонами, телепортами и маркерами событий. Не потеряйся на новых этажах.',
        f12t: 'Мультиплеер', f12d: 'Гильдии, рейды на боссов и арены в реальном времени. Играть вместе — веселее.'
      },
      world: {
        eyebrow: 'Мир', title: 'Сто этажей над облаками',
        sub: 'Великое Слияние разделило реальность на сотню парящих этажей. Каждый — экосистема со своими законами, монстрами и тайнами.',
        w1t: 'Начальный Город', w1d: 'Центральный хаб для всех новых игроков. Магазины, гильдии и дорога на первый этаж.',
        w2t: 'Лес Древних', w2d: 'Опасные леса для уровней 10–20. Обитель лесных волков.',
        w3t: 'Небесный Замок', w3d: 'Финальная локация текущего этажа. Только для самых сильных.',
        w4t: 'Подземелье Страха', w4d: 'Первое серьёзное испытание. В конце ждёт босс: Король Гоблинов.'
      },
      characters: {
        eyebrow: 'Персонажи', title: 'Встречайте странников',
        c1t: 'Хранитель Бездны', c1r: 'Таинственный странник', c1d: 'Человекоподобная сущность без ног, парящая в воздухе. Старый плащ скрывает абсолютную тьму — в глубине капюшона горят лишь два красных огонька.',
        c2t: 'Мечник', c2r: 'Воин передовой', c2d: 'Мастер ближнего боя. Высокая защита и стабильный урон. Идеален для тех, кто ведёт за собой и защищает союзников.',
        c3t: 'Маг', c3r: 'Повелитель стихий', c3d: 'Повелитель стихий. Огромный урон по площади, но крайне низкая выживаемость. Нуждается в прикрытии группы.',
        c4t: 'Тень', c4r: 'Мастер скрытности', c4d: 'Мастер скрытности и быстрых атак. Сокрушительный урон одиночным целям, эффективно использует яды.'
      },
      gallery: {
        eyebrow: 'Галерея', title: 'Кадры из мира',
        t1tag: 'Арт', t1t: 'Небесный замок', t1c: 'Первая зона — город-цитадель над облаками.',
        t2tag: 'Видео', t2t: 'Тизер боевой системы', t2c: 'Комбо-атаки и магия в реальном времени.',
        t3tag: 'Скриншот', t3t: 'Система крафта', t3c: 'Интерфейс создания предметов и улучшения снаряжения.',
        t4tag: 'Скриншот', t4t: 'Босс этажа', t4c: 'Страж 47-го этажа ждёт отряд.',
        t5tag: 'Видео', t5t: 'VR-режим', t5c: 'Погружение через OpenXR и Meta Quest.',
        t6tag: 'Арт', t6t: 'Лес теней', t6c: 'Нижние миры за разломом.',
        lbClose: 'Закрыть', lbPrev: 'Предыдущий', lbNext: 'Следующий', lbLabel: 'Просмотр медиа'
      },
      progress: {
        eyebrow: 'Ход разработки', title: 'Системный скан',
        moduleTitle: 'Статус модулей',
        m1: 'Прототип и ядро', m2: 'Динамичный бой', m3: 'Инвентарь и снаряжение',
        m4: 'NPC и диалоги', m5: 'Квесты и сюжет', m6: 'Открытый мир', m7: 'VR-режим',
        done: 'Готово', work: 'В работе', plan: 'Планируется',
        phaseEyebrow: 'Фаза', phaseBig: 'Идём к <span class="num">Альфе</span>',
        phaseDesc: 'Ядро игры уже играбельно: бой, инвентарь и система снаряжения работают. Сейчас собираем квесты, диалоги NPC и готовим первый большой мир для закрытого теста.',
        bBuild: 'Сборка', vBuild: 'v0.4.x', bTest: 'Тест', vTest: 'Открыт', bChannel: 'Канал', vChannel: 'Discord'
      },
      roadmap: {
        eyebrow: 'Роадмап', title: 'Путь от прототипа до релиза',
        r1t: 'Прототип', r1d: 'Базовая механика, контроллер, сцена боя.',
        r2t: 'Основные системы', r2d: 'Меню, персонаж, сохранения, загрузка мира.',
        r3t: 'Бой', r3d: 'Комбо, уклонения, магия, баланс классов.',
        r4t: 'Инвентарь', r4d: 'Предметы, вес, крафт и улучшение.',
        r5t: 'NPC и диалоги', r5d: 'Живые разговоры с выбором ответов.',
        r6t: 'Квесты', r6d: 'Сюжетная кампания и повторяемые задания.',
        r7t: 'Мир', r7d: 'Открытые зоны, телепорты, динамические события.',
        r8t: 'Альфа', r8d: 'Закрытый тест для сообщества Discord.',
        r9t: 'Бета', r9d: 'Открытый тест, полировка, VR-режим.',
        r10t: 'Релиз', r10d: 'Запуск на ПК и в VR через OpenXR.',
        done: 'Готово', work: 'В работе', plan: 'Планируется', next: 'Следующий этап', planned: 'Запланирована', goal: 'Цель'
      },
      blog: {
        eyebrow: 'Медиа и обновления', title: 'Новости проекта',
        wBadge: 'Новая встреча',
        wName1: 'Таинственный', wName2: 'Странник Бездны',
        wDesc: 'Человекоподобная сущность без ног, парящая в воздухе. Старый изношенный плащ скрывает абсолютную тьму. Лица нет — лишь два красных огонька в глубине капюшона. Говорят, он может брать предметы из ниоткуда...',
        wLvl: 'Уровень', wFloors: 'Этажей', wDark: 'Тьма',
        wCta: 'Читать лор',
        b1ver: 'v0.4.0', b1tag: 'Видео', b1t: 'Тизер боевой системы', b1d: 'Посмотрите, как работают комбо-атаки и магические способности в реальном времени.', b1more: 'Смотреть',
        b2ver: 'v0.3.7', b2tag: 'Разработка', b2t: 'Система крафта', b2d: 'Первый взгляд на интерфейс создания предметов и улучшения снаряжения.', b2more: 'Смотреть'
      },
      tech: {
        eyebrow: 'Стек', title: 'Технологии студии',
        t1n: 'Unity 6', t1r: 'ENGINE', t2n: 'C#', t2r: 'GAMEPLAY',
        t3n: 'Git', t3r: 'VCS', t4n: 'GitHub', t4r: 'RELEASE',
        t5n: 'Blender', t5r: '3D ASSETS', t6n: 'VS Code', t6r: 'EDITOR',
        t7n: 'OpenXR', t7r: 'VR STANDARD', t8n: 'Meta Quest', t8r: 'TARGET HMD'
      },
      dev: {
        eyebrow: 'Разработчик', name: 'Deeb',
        desc: 'Основатель <b>DeebSilk Studio</b>. Проект ведётся одним человеком: от геймплей-логики на C# и сборки мира в Unity 6 до моделей в Blender и дизайна интерфейса.',
        r1: 'Founder', r2: 'Game Developer', r3: 'Gameplay Programmer', r4: 'UI / UX', r5: 'Game Designer'
      },
      faq: {
        eyebrow: 'FAQ', title: 'Вопросы и ответы',
        q1: 'Когда выйдет игра?', a1: 'Сейчас идём к Альфе. Дата релиза зависит от того, как быстро добьём основные системы и первый цельный мир — следи за роадмапом и блогом.',
        q2: 'Будет ли поддержка VR?', a2: 'Да. OpenXR — наш VR-стандарт, Meta Quest — основной целевой шлем. VR-режим запланирован на стадию Беты.',
        q3: 'Можно ли уже поиграть?', a3: 'Боевую систему можно опробовать прямо сейчас в мини-игре. Закрытое тестирование откроется вместе со стадией Альфы.',
        q4: 'Игра будет бесплатной?', a4: 'Финальная бизнес-модель ещё решается. Страница доната поддерживает разработку уже сегодня, а каждый спонсор получает внутриигровой титул.',
        q5: 'Как я могу поддержать проект?', a5: 'Вступай в Discord, делись игрой с друзьями или купи набор на странице доната — все средства идут на серверы и новых художников.'
      },
      future: {
        eyebrow: 'Будущие проекты', title: 'Что дальше',
        sub: 'Студия не стоит на месте. Помимо Project Origin, уже оформляются новые идеи.',
        f1t: 'Project Code: ???', f1d: 'Проект-загадка. Даже имя — секрет: тёмное фэнтези с элементами рогалика.',
        f2t: 'Project Code: ???', f2d: 'Что-то для мобильных. Доступная RPG, в которую можно играть где угодно.',
        f3t: 'Ивенты сообщества', f3d: 'Игровые фестивали, арт-конкурсы и лор-квесты для сообщества.'
      },
      wiki: {
        eyebrow: 'Вики', title: 'База знаний',
        sub: 'Классы, бестиарий, крафт и лор Deep Dive Online. Растущий архив для новых и вернувшихся игроков.',
        sidebarTitle: 'Разделы Вики', sidebarBase: 'База знаний',
        navClasses: 'Классы персонажей', navBestiary: 'Бестиарий', navCrafting: 'Система крафта', navLore: 'Лор мира',
        kb1: 'Мечник (Swordman)', kb2: 'Лес Древних', kb3: 'Кристаллы маны', kb4: 'Небесный Замок',
        classesTitle: 'Классы персонажей',
        classesP: 'В <b>Deep Dive Online</b> система классов построена на гибкости и специализации. Каждый игрок начинает путь «Новичком» и на 10-м уровне выбирает одну из четырёх базовых специализаций, которые в дальнейшем разветвляются на десятки элитных путей.',
        c1t: 'Мечник (Swordsman)', c1d: 'Мастер ближнего боя. Высокая защита и стабильный урон. Идеален для тех, кто предпочитает быть на острие атаки и защищать союзников.',
        c2t: 'Лучник (Archer)', c2d: 'Специалист по дальнему бою. Высокая скорость атаки и шанс критического удара. Может устанавливать магические ловушки.',
        c3t: 'Маг (Mage)', c3d: 'Повелитель стихий. Огромный урон по площади, но крайне низкая выживаемость. Требует слаженной работы группы и прикрытия.',
        c4t: 'Тень (Rogue)', c4d: 'Мастер скрытности и быстрых атак. Наносит сокрушительный урон одиночным целям и эффективно использует яды.',
        bestiaryTitle: 'Бестиарий',
        bestiaryP: 'Мир населён опасными существами, адаптированными к различным условиям обитания. Каждая зона имеет своих уникальных монстров и мировых боссов, требующих тактического подхода.',
        b1name: 'Лесной Волк', b1lvl: '(Lvl 1-5)',
        b1d: 'Агрессивный зверь, обитающий в стартовой локации. Нападает стаями, что делает его опасным для одиночных новичков.',
        b2name: 'Изумрудный Дракон', b2lvl: '(Мировой босс)',
        b2d: 'Древний защитник Небесного Замка на 50-м этаже. Требует слаженной работы рейда из 40 человек.',
        craftingTitle: 'Система крафта',
        craftingP: 'Крафт в нашей игре — это не просто вспомогательная функция, а полноценная профессия. Игроки могут собирать редкие ресурсы и создавать легендарное снаряжение, которое невозможно найти в подземельях.',
        k1t: 'Кузнечное дело:', k1d: 'Создание оружия и тяжёлых доспехов из добытой руды.',
        k2t: 'Алхимия:', k2d: 'Приготовление эликсиров, временно усиливающих магические способности.',
        k3t: 'Портняжное дело:', k3d: 'Шитьё лёгкой брони и магических мантий из небесного шёлка.',
        loreTitle: 'Лор мира',
        loreP1: 'История <b>Deep Dive Online</b> началась с Великого Слияния реальностей. Две тысячи лет назад мир был разделён на 100 парящих этажей, каждый из которых представляет собой уникальную экосистему со своими законами физики и магическими потоками.',
        loreP2: 'Основная цель игроков — пройти все испытания, победить стражей этажей и достичь самой вершины, где, согласно легендам, ждёт сам Создатель системы, способный исполнить любое желание.'
      },
      map: {
        eyebrow: 'Карта мира', title: 'Интерактивная карта мира',
        sub: 'Перетаскивайте карту мышью, приближайте колесом. Нажимайте на метки, чтобы осмотреть локации.',
        hint: 'Перетащите — перемещение · колесо — масштаб · клик по метке',
        start: 'Начальный Город', startD: 'Центральный хаб для всех новых игроков. Здесь находятся основные магазины и гильдии.',
        forest: 'Лес Древних', forestD: 'Опасная зона для игроков 10-20 уровня. Обитель лесных волков.',
        dungeon: 'Подземелье Страха', dungeonD: 'Первое серьёзное испытание. В конце ждёт босс: Король Гоблинов.',
        castle: 'Небесный Замок', castleD: 'Финальная локация текущего этажа. Только для самых сильных.',
        lblStart: 'ГОРОД НАЧАЛА', lblForest: 'ЛЕС ДРЕВНИХ', lblDungeon: 'ПОДЗЕМЕЛЬЕ', lblCastle: 'НЕБЕСНЫЙ ЗАМОК',
        infoTitle: 'Локация', infoDefault: 'Описание локации появится здесь.',
        zoomIn: 'Приблизить', zoomOut: 'Отдалить'
      },
      donate: {
        eyebrow: 'Поддержка', title: 'Поддержите разработку',
        sub: 'Все средства идут на оплату серверов и привлечение новых художников для создания уникального контента.',
        buy: 'Купить', hot: 'ХИТ ПРОДАЖ', soon: 'Скоро — на раннем доступе',
        currencyTitle: 'Наборы валюты',
        currencySub: 'Кристаллы Маны используются для покупки косметических предметов и расширения инвентаря.',
        hot: 'ХИТ ПРОДАЖ',
        buy: 'Купить',
        p1t: 'Горсть кристаллов', p1price: '299 ₽',
        p1f1: '500 Кристаллов Маны', p1f2: 'Бонус: +50 кристаллов', p1f3: 'Доступ к закрытому чату',
        p2t: 'Сундук Мудреца', p2price: '990 ₽',
        p2f1: '2000 Кристаллов Маны', p2f2: 'Бонус: +400 кристаллов', p2f3: 'Уникальный титул «Меценат»', p2f4: 'Свиток сброса навыков (×3)',
        p3t: 'Сокровище Короля', p3price: '2490 ₽',
        p3f1: '6000 Кристаллов Маны', p3f2: 'Бонус: +1500 кристаллов', p3f3: 'Золотой эффект ника', p3f4: 'Ранний доступ к новым этажам',
        starterTitle: 'Стартовые наборы',
        s1t: 'Набор Новичка', s1price: '149 ₽',
        s1d: 'Идеальный старт для вашего приключения. Включает базовое снаряжение и зелья.',
        s2t: 'Путь Мечника', s2price: '499 ₽',
        s2d: 'Стальной меч редкого качества и полный комплект кожаной брони.',
        s3t: 'Магический Фолиант', s3price: '499 ₽',
        s3d: 'Посох ученика и 10 свитков с мощными заклинаниями огня.'
      },
      minigame: {
        eyebrow: 'Мини-игра', title: 'DDO Арена',
        sub: 'Сражайся с монстрами в пошаговых битвах. Каждые 5 побед — босс. Сколько этажей ты сможешь пройти?',
        highScore: 'Рекорд:',
        goTitle: '💀 Повержен',
        goDesc: 'Ты пал в бою... но башня помнит твою отвагу.',
        statLevel: 'Уровень', statGold: 'Золота', statKills: 'Убито монстров', statScore: 'Счёт',
        restart: 'Начать заново',
        playerLabel: 'Игрок', monsterLabel: 'Монстр', bossLabel: '👑 БОСС',
        lvlLabel: 'Ур.', floorLabel: 'Этаж',
        atkLabel: 'Атк.', defLabel: 'Защ.', goldLabel: 'Золото', killsLabel: 'Убито',
        atkBtn: '⚔ Атака', powerBtn: '💥 Удар (15 MP)', healBtn: '❤🩹 Лечение (20 MP)', defendBtn: '🛡 Защита', resetBtn: '↺ Сброс',
        mon1: 'Лесной Гоблин', mon2: 'Каменный Голем', mon3: 'Теневой Призрак', mon4: 'Огненный Саламандра',
        mon5: 'Ледяной Виверн', mon6: 'Ночной Убийца', mon7: 'Древний Элементаль', mon8: 'Гигантский Паук',
        mon9: 'Бандит-Мародёр', mon10: 'Проклятый Рыцарь',
        boss1: 'Король Гоблинов', boss2: 'Дракон Глубин', boss3: 'Владыка Теней', boss4: 'Титан Бездны',
        bossSpawn: '👑 БОСС этажа! {n} появляется!', bossAlert: '⚔ БОСС ПОЯВИЛСЯ ⚔',
        monSpawn: '👹 {n} (Ур. {l}) выходит на арену!',
        logAttack: '⚔ Ты атакуешь {n} на {d} урона!',
        logPower: '💥 Удар возмездия! {d} урона {n}!',
        noMp: '❌ Недостаточно MP! (нужно {need}, у тебя {have})',
        logHeal: '❤🩹 Ты восстанавливаешь {a} HP!',
        logDefend: '🛡 Ты встаёшь в защитную стойку! (урон -50%)',
        defendAlert: '🛡 ЗАЩИТА',
        logMonAtk: '👹 {n} атакует тебя на {d} урона!',
        halfBlocked: ' (половина заблокирована)',
        bossDown: '👑 {n} повержен! +{g}💰 +{s}⭐',
        bossDownAlert: '🏆 БОСС ПОВЕРЖЕН!',
        monDown: '💀 {n} уничтожен! +{g}💰 +{s}⭐',
        levelUp: '⬆ УРОВЕНЬ {l}! Характеристики повышены!',
        levelUpAlert: '⬆ УРОВЕНЬ {l}!',
        fell: '💀 Ты пал на этаже {f}!',
        newRecord: '🏆 НОВЫЙ РЕКОРД!',
        start: '🏯 Новое приключение начинается...'
      },
      contact: {
        eyebrow: 'Связь', title: 'Будь на связи со студией',
        channels: 'Каналы',
        channelsDesc: 'Вопросы, багрепорты, идеи — всё это мы читаем. Самый быстрый отклик в Discord.',
        ghT: 'GitHub', ghD: 'Открытый репозиторий и релизы',
        dcT: 'Discord', dcD: 'Сервер сообщества',
        ytT: 'YouTube', ytD: 'Дневники разработки',
        emT: 'Email', emD: 'hello@deebsilk.studio',
        dcEyebrow: 'Сообщество', dcTitle: 'Присоединяйся к Discord',
        dcDesc: 'Обсуждай игру с разработчиками, находи союзников для рейдов и первым узнавай о новых обновлениях.',
        dcCta: 'Вступить в Discord'
      },
      download: {
        eyebrow: 'Скачать',
        title: 'Скачать игру',
        sub: 'Deep Dive Online ещё в разработке — но ты уже можешь получить играбельный прототип. Сборки публикуются в GitHub Releases и устанавливаются в один клик.',
        statusCheck: 'Проверяем последнюю сборку…',
        statusNone: 'Публичная сборка ещё не выпущена',
        statusReady: 'Готово к установке',
        btn: 'Скачать для Windows',
        btnSoon: 'Сборка скоро',
        btnAll: 'Все релизы на GitHub',
        version: 'Версия',
        size: 'Размер',
        platforms: 'Платформы',
        pc: 'Windows PC',
        vr: 'VR · Meta Quest',
        reqTitle: 'Требования',
        reqPc: 'Windows 10 64-бит, любая видеокарта, 8 ГБ ОЗУ',
        reqVr: 'Появится вместе с VR-режимом',
        note: 'Сборка автоматически подтягивается из GitHub-релиза последней версии.',
        share: 'Сообщить о баге',
        noBuildDesc: 'Доделываем прототип. Подпишись на блог или следи за GitHub-репозиторием — первая публичная сборка появится здесь, как только выйдет.'
      },
      meta: {
        index: 'DeebSilk Studio · Project Origin — Deep Dive Online',
        wiki: 'Вики · DeebSilk Studio — Deep Dive Online',
        map: 'Карта Мира · DeebSilk Studio — Deep Dive Online',
        donate: 'Донат · DeebSilk Studio — Deep Dive Online',
        minigame: 'Мини-игра · DeebSilk Studio — Deep Dive Online'
      }
    }
  };

  /* dictionary flattened into dotted keys (en/ru) */
  ['en', 'ru'].forEach(function (lng) {
    var flat = normalize(DICT[lng]);
    Object.keys(flat).forEach(function (k) {
      dict[lng][k] = flat[k];
    });
  });

  var langs = Object.keys(dict);
  var lang = readLang() || 'en';
  if (langs.indexOf(lang) === -1) lang = 'en';

  function t(key, vars) {
    var str = dict[lang][key];
    if (str === undefined) str = dict.en[key];
    if (str === undefined) return key;
    if (vars) {
      str = String(str).replace(/\{(\w+)\}/g, function (m, k) {
        return vars[k] !== undefined ? vars[k] : m;
      });
    }
    return str;
  }

  function apply() {
    document.documentElement.setAttribute('lang', lang);
    var title = document.querySelector('meta[name="x-page"]');
    if (title) {
      var mKey = title.getAttribute('content');
      if (mKey) document.title = t('meta.' + mKey);
    }
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
    });
    propagateLinks();
    document.dispatchEvent(new CustomEvent('ddo:langchange', { detail: lang }));
  }

  function setLang(lng) {
    if (langs.indexOf(lng) === -1) return;
    lang = lng;
    writeLang(lng);
    apply();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-btn');
    if (btn) setLang(btn.getAttribute('data-lang'));
  });

  document.addEventListener('DOMContentLoaded', apply);
  if (document.readyState !== 'loading') apply();

  window.I18N = {
    t: t,
    get lang() { return lang; },
    setLang: setLang,
    apply: apply,
    has: function (key) { return dict[lang][key] !== undefined || dict.en[key] !== undefined; }
  };
})();
