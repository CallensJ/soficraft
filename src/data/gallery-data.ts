// ════════════════════════════════════════════════════════════════════════════
// GALLERY DATA — SOFICRAFT
// Interfaces TypeScript + données des 3 collections (10 créations)
// ════════════════════════════════════════════════════════════════════════════

export interface Creation {
  id: string;
  title: string;
  description: string;
  materials: string;
  univers: string;
  image: string;
  imageAlt: string;
  side: "left" | "right";
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  creations: Creation[];
}

// ════════════════════════════════════════════════════════════════════════════
// COLLECTION 1 — CELTIQUE
// ════════════════════════════════════════════════════════════════════════════

const collectionCeltique: Collection = {
  id: "celtique",
  name: "Créations Celtiques",
  tagline:
    "Héritage celtique, runes, symbolisme ancien, connexion à la terre ancestrale",
  creations: [
    {
      id: "foret-ancienne",
      title: "Collier de la Forêt Ancienne",
      description:
        "Dans une forêt que personne n'a jamais visitée vivent des créatures oubliées. Elles parlent un langage de runes, de feuilles qui s'entrelacent, de racines qui se souviennent. Ce collier capture cet instant suspendu où la magie ancienne repose juste sous la surface du réel.\n\nLes feuilles stylisées qui le composent ne sont pas décoratives. Elles sont des gardiens. Chacune d'elles porte une rune celtique, une promesse ancienne. Quand tu le portes autour de ton cou, tu portes l'héritage des forêts primales. Tu dis au monde : je suis connecté(e) à quelque chose de plus grand que moi.\n\nCeux qui portent ce collier rapportent une sensation étrange. Une connexion plus profonde à la nature. Une certitude tranquille que le monde magique existe vraiment.",
      materials:
        "Argent sterling 925, feuilles celtiques stylisées, chaîne ajustable",
      univers:
        "Forêts primales · Héritage celtique · Connexion ancestrale · Gardiens oubliés",
      image: "/images/gallery/foret-ancienne.jpg",
      imageAlt:
        "Collier de la Forêt Ancienne — argent sterling avec feuilles celtiques",
      side: "left",
    },
    {
      id: "runes-protectrices",
      title: "Bracelet des Runes Protectrices",
      description:
        "Il existe des moments dans la vie où tu as besoin d'une armure invisible. Pas contre les ennemis physiques, mais contre les pensées qui t'étouffent, les doutes qui te paralysent, le sentiment que tu ne mérites pas la magie de ta propre existence.\n\nCe bracelet porte trois runes anciennes. Chacune d'elles a une signification : protection, force, clarté. Elles ont été choisies pour accompagner quelqu'un qui se bâtit. Quelqu'un qui refuse de se soumettre.\n\nQuand tu l'enfiles le matin, tu te rappelles quelque chose d'essentiel : tu n'es pas fragile. Tu es enraciné(e). Et même dans les tempêtes, tu resteras debout.",
      materials:
        "Or blanc 14k, runes celtiques en relief, bracelet chaîne ajustable",
      univers:
        "Protection ancestrale · Force intérieure · Runes anciennes · Guerrier(ère) spirituel(le)",
      image: "/images/gallery/runes-protectrices.jpg",
      imageAlt:
        "Bracelet des Runes Protectrices — or blanc avec trois runes en relief",
      side: "right",
    },
    {
      id: "triquetra",
      title: "Bague de la Triquetra",
      description:
        "La Triquetra est l'un des symboles les plus anciens du monde celtique. Elle parle d'équilibre. De trinité. De trois forces qui tournent autour d'un centre immuable — passé, présent, futur. Corps, esprit, âme. Création, destruction, renouveau.\n\nCette bague la capture dans sa plus simple et plus puissante expression. Les trois boucles s'entrelacent sans fin, sans commencement. Quand tu la regardes, tu dois choisir par où commencer — et soudainement tu comprends : il n'y a pas vraiment de commencement. Il y a seulement du mouvement.\n\nElle s'enfile comme un serment silencieux. Un accord avec toi-même que tu accepteras les trois parts de toi-même : celle qui rêve, celle qui crée, celle qui se bat.",
      materials: "Or rose 14k, symbole Triquetra en relief, ajustable",
      univers:
        "Trinité celtique · Équilibre éternel · Renouveau cyclique · Intégrité de soi",
      image: "/images/gallery/triquetra.jpg",
      imageAlt:
        "Bague de la Triquetra — or rose avec symbole triquetra en relief",
      side: "left",
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// COLLECTION 2 — LUNAIRE
// ════════════════════════════════════════════════════════════════════════════

const collectionLunaire: Collection = {
  id: "lunaire",
  name: "Créations Lunaires & Nocturnes",
  tagline: "Lune, nuit, rêves, murmures secrets, connaissance cachée",
  creations: [
    {
      id: "lune-argentee",
      title: "Collier de la Lune Argentée",
      description:
        "La lune a toujours parlé aux personnes qui écoutent réellement. Elle murmure des secrets que le jour ne connaîtra jamais. Elle te dit que le monde souterrain existe, que la magie s'éveille quand tout le reste dort, que ton pouvoir intérieur brille plus fort dans l'obscurité.\n\nCe collier capture l'essence lunaire. Une lune en argent massif, légèrement martelée pour refléter la lumière comme si elle était vraiment vivante, tourne lentement contre ta poitrine. Elle n'est pas parfaitement ronde — elle est croissante, un clin d'œil au cycle infini.\n\nC'est pour les rêveur(euse)s. Pour ceux qui se lèvent la nuit parce qu'une idée les a soudainement appelé(e)s. Pour les sorcier(ère)s du quotidien.",
      materials:
        "Argent sterling 925, lune en relief martelé, chaîne delicate ajustable",
      univers:
        "Lune · Nuit éternelle · Rêves lucides · Sagesse cachée · Cycles féminins",
      image: "/images/gallery/lune-argentee.jpg",
      imageAlt:
        "Collier de la Lune Argentée — argent sterling avec lune martelée",
      side: "right",
    },
    {
      id: "etoiles-veileuses",
      title: "Bracelet des Étoiles Veileuses",
      description:
        "Il existe des nuits où tu as besoin d'une présence. Pas un ami, pas une voix. Simplement quelque chose de calme qui te dit : tu n'es pas seul(e). Le ciel veille sur toi.\n\nCe bracelet te tient la main la nuit. Des petites étoiles en or parsèment une chaîne fine et souple qui s'adapte à ton poignet comme une étreinte douce. Elles ne brillent pas — elles veillent. Silencieuses. Constantes. Là.\n\nC'est pour les personnes qui font de beaux rêves et aussi ceux qui rêvent dur. Pour les âmes sensibles qui se demandent si elles sont folles parce qu'elles sentent les choses aussi profondément. Tu ne l'es pas. Tu es seulement plus proche des étoiles que la plupart des gens.",
      materials:
        "Or blanc 14k, petites étoiles en relief, chaîne fine ajustable",
      univers:
        "Étoiles veileuses · Nuits sans peur · Sensibilité reconnue · Ciel infini",
      image: "/images/gallery/etoiles-veileuses.jpg",
      imageAlt:
        "Bracelet des Étoiles Veileuses — or blanc avec étoiles en relief",
      side: "left",
    },
    {
      id: "anneau-minuit",
      title: "Anneau de Minuit",
      description:
        "Minuit. Ce moment exactement où le jour meurt et quelque chose de nouveau commence à naître. C'est l'heure la plus magique. L'heure où les portails s'ouvrent. Où les vraies conversations peuvent enfin avoir lieu. Où les âmes reconnaissent enfin les âmes.\n\nCet anneau capture cette fraction de seconde. C'est un anneau fin, presque invisible au premier regard. Mais quand la lumière le frappe juste, tu vois quelque chose d'étrange : une lune et des étoiles qui dansent autour de la circonférence. Comme si minuit s'était cristallisé.\n\nIl s'enfile silencieusement. Parfait pour ceux qui savent que le vrai pouvoir est le silence. Que la vraie transformation se fait à minuit.",
      materials: "Or jaune 14k, lune et étoiles en relief subtil, ajustable",
      univers:
        "Minuit magique · Transformation silencieuse · Moment de transition · Portails ouverts",
      image: "/images/gallery/anneau-minuit.jpg",
      imageAlt: "Anneau de Minuit — or jaune avec lune et étoiles en relief",
      side: "right",
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// COLLECTION 3 — ÉLÉMENTAIRE
// ════════════════════════════════════════════════════════════════════════════

const collectionElementaire: Collection = {
  id: "elementaire",
  name: "Créations Élémentaires",
  tagline:
    "Éléments naturels, transformation, énergie brute, connexion à la terre et l'air",
  creations: [
    {
      id: "quatre-elements",
      title: "Collier des Quatre Éléments",
      description:
        "Tu es un univers entier. À l'intérieur de toi coule l'eau des rivières premières. La terre respire sous tes pieds. Le feu brûle dans ton ventre. L'air remplit tes poumons.\n\nCe collier te le rappelle. Quatre pendentifs minuscules, chacun représentant un élément, tournent doucement autour du cou. L'eau est fluide, malléable. La terre est solide, ancrée. Le feu est dur et scintillant. L'air est léger, presque imperceptible. Ensemble, elles forment quelque chose de complexe. De puissant. De toi.\n\nC'est pour les personnes qui se sentent parfois fragmentées. Qui ont du mal à être juste une chose. Une émotion. Un style. Tu es tout à la fois. Et ce collier le proclame.",
      materials:
        "Argent sterling 925, quatre pendentifs élémentaires, chaîne ajustable",
      univers:
        "Quatre éléments · Totalité de soi · Équilibre naturel · Transformation continue",
      image: "/images/gallery/quatre-elements.jpg",
      imageAlt:
        "Collier des Quatre Éléments — argent sterling avec pendentifs élémentaires",
      side: "left",
    },
    {
      id: "racines-profondes",
      title: "Bracelet Racines Profondes",
      description:
        "Les arbres les plus forts ne sont pas ceux qui poussent dans le ciel. Ce sont ceux qui poussent même quand le vent les écrase. Comment font-ils ? Parce que leurs racines sont profondes. Parce qu'elles savent exactement où puiser la force.\n\nCe bracelet s'enroule autour de ton poignet comme ces racines ancestrales. Il te rappelle : même si tu suis ton rêve, tu as besoin de racines. Tu as besoin de savoir d'où tu viens.\n\nIl est travaillé de façon à ce que tu sentes la texture chaque fois que tu le touches. Pas lisse. Pas poli. Authentique. Brut. Comme la vraie force — elle n'est jamais jolie. Mais elle est toujours honnête.",
      materials:
        "Or et argent mélangés, motif racines texturé, bracelet rigide ajustable",
      univers:
        "Ancrage profond · Héritage familial · Force souterraine · Stabilité dans la tempête",
      image: "/images/gallery/racines-profondes.jpg",
      imageAlt:
        "Bracelet Racines Profondes — or et argent avec motif racines texturé",
      side: "right",
    },
    {
      id: "ailes-liberees",
      title: "Bague des Ailes Libérées",
      description:
        "Il y a un moment dans la vie où tu dois choisir : rester au sol ou apprendre à voler. C'est un choix terrifiant parce que tu risques de tomber. Mais c'est aussi le choix le plus beau que tu auras jamais à faire.\n\nCette bague capture ce moment exactement. Deux ailes stylisées émergent de la bande anneau comme si elles apprenaient juste à se déployer. Elles ne sont pas fortes. Elles ne sont pas stables. Elles tremblent presque. Mais elles bougent.\n\nC'est pour les personnes qui ont décidé de quitter leurs cages dorées. Qui sautent, tremblantes, vers l'inconnu. Et qui découvrent, contre toute attente, qu'elles savent comment voler.",
      materials: "Or blanc 14k, ailes en relief, bague ajustable",
      univers:
        "Liberté acquise · Envol courageux · Détachement des attentes · Transformation volontaire",
      image: "/images/gallery/ailes-liberees.jpg",
      imageAlt: "Bague des Ailes Libérées — or blanc avec ailes en relief",
      side: "left",
    },
    {
      id: "alchimie-interieure",
      title: "Collier de l'Alchimie Intérieure",
      description:
        "L'alchimie n'est pas la transformation du plomb en or. C'est ta transformation. C'est l'instant où tu réalises que la peur était ta matière première et que le courage est ce que tu as créé. Que la douleur était tes outils et que la sagesse est ce qui s'est cristallisé.\n\nCe collier symbolise ce processus invisible. Un pendentif géométrique composé de trois formes qui s'imbriquent les unes dans les autres : un cercle (totalité), un carré (stabilité), un triangle (ascension). Ensemble, elles racontent ta transformation.\n\nC'est la pièce finale. Celle que tu offres à toi-même quand tu réalises que tu n'es plus la personne que tu étais il y a un an. Et que c'est magnifique. Que c'est exactement comme ça que tu es supposé(e) être.",
      materials:
        "Argent sterling 925, pendentif géométrique, chaîne fine ajustable",
      univers:
        "Transformation personnelle · Alchimie de soi · Cycles de croissance · Devenir soi",
      image: "/images/gallery/alchimie-interieure.jpg",
      imageAlt:
        "Collier de l'Alchimie Intérieure — argent sterling avec pendentif géométrique",
      side: "right",
    },
  ],
};

// ════════════════════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════════════════════

export const collections: Collection[] = [
  collectionCeltique,
  collectionLunaire,
  collectionElementaire,
];

export { collectionCeltique, collectionLunaire, collectionElementaire };
