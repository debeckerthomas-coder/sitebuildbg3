🚨 CONTEXTE ABSOLU DU PROJET (NE JAMAIS IGNORER) 🚨

Tu agis en tant que Développeur Full-Stack Senior et Tech Lead sur le projet "BG3 Honor Companion". 
C'est une application Web Premium (SaaS) d'aide à la décision pour Baldur's Gate 3 (Mode Honneur).

1. STACK TECHNIQUE (Ultra-Moderne)
- Framework : Next.js 16 (App Router), React 19, TypeScript strict (readonly).
- State : Zustand v5 (avec persistance locale pour le Party Analyzer).
- UI/3D : Tailwind CSS, Radix UI (pour les composants interactifs comme Checkboxes/Dialogs), React Three Fiber, Framer Motion.
- Données : Fichiers MDX (next-mdx-remote) combinés à une base de données relationnelle locale (`src/data/registry.ts`).

2. DESIGN SYSTEM "DARK FANTASY GRIMOIRE" (Règle stricte)
- NE JAMAIS utiliser de couleurs Tailwind génériques (ex: bg-red-500, text-yellow-400).
- Palette personnalisée obligatoire : `abyss` (fonds sombres), `gold` (textes et bordures premium), `blood` (alertes, failsafes).
- Typographie : Utiliser la classe `.prose-gold` pour tout le contenu Markdown. Polices : `Cinzel` (Titres) et `Lora`/`Inter` (Texte).
- Composants interactifs : Ne jamais forcer des balises `<input type="checkbox">` natives, toujours utiliser l'implémentation de Radix UI pour ne pas casser l'état React.

3. ARCHITECTURE DE DONNÉES (Single Source of Truth)
- Le fichier `src/data/registry.ts` est le cœur du site. Il fusionne `ITEMS` et `itemsBilingualV2` dans un index unifié.
- Les Builds (ex: throwzerker, sorcadin) ne stockent que des ID (`coreItems`, `alternativeItems`) dans le registre. 
- Les objets complets sont peuplés dynamiquement via la fonction `getBuildWithItems(buildId)`.

4. COMPOSANTS MDX EXISTANTS (À réutiliser, ne pas réinventer)
- `<QuickDecision>` : Résumé express des pour/contre en haut de page.
- `<ChecklistTracker>` : Système de cases à cocher persistantes (utilisant Radix UI).
- `<EmergencyMatrix>` : Encart d'équipement par acte.
- `<BuildEquipment>` : Galerie dynamique générée via le registre.
- `<FailsafeCard>` : Alternative si le joueur a raté un objet (Style "blood" / alerte).
- `<BuildTimeline>` : Progression visuelle niveau par niveau (`powerSpikes`).
- `<CombatLogSimulator>` : Calculateur de dégâts.

5. DETTE TECHNIQUE CONNUE (À garder en tête)
- Bug de traduction : Dans `registry.ts`, l'indexation force le français (`name: item.name.fr`). Le bilinguisme des objets de l'arsenal V2 est temporairement tronqué.
