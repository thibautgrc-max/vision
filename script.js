'use strict';

/* ═══════════════════════════════════════════════════════════════════
   VISION — PRIVATE STOCK / V2
   Base Claude conservée : filtres, statuts, cartes, modal, reveal,
   réservation Snapchat. Ajouts : Homme/Femme + Packs avec images.

   À MODIFIER AVANT PUBLICATION
   1. CONFIG.snapchatUsername
   2. Les tableaux PRODUCTS et PACKS
   3. Les chemins "image" lorsque les photos du stock sont prêtes
   ═══════════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────────
   ① CONFIGURATION
   ───────────────────────────────────────────────────────────────── */
const CONFIG = {
  brandName: 'VISION',
  snapchatUsername: 'TON_PSEUDO_SNAP', // sans @
  snapchatUrl: 'https://snapchat.com/t/IqsAqeNC',
  formspreeEndpoint: 'https://formspree.io/f/mdayoorr',
  instagramUrl: '',
  whatsappNumber: '',
  defaultContact: 'snapchat',
  enableWhatsapp: false,
  currency: '€',
  lastUpdate: 'Aujourd’hui',
};


/* ─────────────────────────────────────────────────────────────────
   ② STATUTS STOCK
   ───────────────────────────────────────────────────────────────── */
const STATUS = {
  high:     { label: 'Disponible',       css: 'status-high',     available: true  },
  medium:   { label: 'Disponible',       css: 'status-medium',   available: true  },
  low:      { label: 'Stock limité',      css: 'status-low',      available: true  },
  inquiry:  { label: 'Sur demande',       css: 'status-inquiry',  available: true  },
  reserved: { label: 'Réservé',          css: 'status-reserved', available: false },
  soon:     { label: 'Bientôt',          css: 'status-soon',     available: false },
};


/* ─────────────────────────────────────────────────────────────────
   ③ PRODUITS

   audience : 'homme' ou 'femme'
   group    : clothing | shoes | fragrance | accessories
   image    : déposer les photos dans assets/products/men|women
   gallery  : ajouter plusieurs chemins pour la galerie produit
   ───────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'VH-012', audience: 'homme', group: 'shoes', name: 'Dior B30 — Gris & Noir', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Gris', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-grey-pair.jpg',
    gallery: [],
    description: 'Paire de chaussure de luxe gris, gris et noir, inclus avec coffret et sac Dior officiel.',
    material: 'Haute qualité  · Matériaux premium', fit: 'Pointure normale', detail: 'Coffret/sac inclus · luxe',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-013', audience: 'homme', group: 'shoes', name: 'Dior Chrono — Noir & Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Noir', 'Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-black-white.jpg', gallery: [],
    description: 'Paire de chaussure de luxe, noir et blanc, inclus avec coffret et sac Dior officiel.',
    material: 'Haute qualité · Matériaux premium', fit: 'Pointure normale', detail: 'Coffret/sac inclus · luxe',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-014', audience: 'homme', group: 'shoes', name: 'Dior Chrono — Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-white.jpg',
    gallery: [],
    description: 'Paire de chaussure de luxe, blanc, inclus avec coffret et sac Dior officiel.',
    material: 'Haute qualité · Matériaux premium', fit: 'Pointure normale', detail: 'Coffret/sac inclus · luxe',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-015', audience: 'homme', group: 'shoes', name: 'Asics Gel-Kayano 14 — Bleu Glacier', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['41', '42', '43', '44'], colors: ['Blanc', 'Bleu glacier'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-asics-gel-kayano-blue.jpg', gallery: [],
    description: 'Asics bleutée à finition technique, Coffret/sac inclus.',
    material: 'Haute qualité réspirant · Matériaux premium', fit: 'Pointure normale', detail: 'Gel-Kayano sport · confort quotidien',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-016', audience: 'homme', group: 'shoes', name: 'New Balance 1906R — Phantom Gris', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Gris anthracite', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-new-balance-grey.jpg', gallery: [],
    description: 'New Balance sombre, Coffret/sac inclus.',
    material: 'Haute qualité réspirant', fit: 'Pointure normale', detail: 'Semelle technique ·confort quotidien',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-017', audience: 'homme', group: 'shoes', name: 'New Balance 1906R — Phantom Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Blanc', 'Gris clair'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-new-balance-white.jpg',
    gallery: [],
    description: 'New Balance clair, Coffret/sac inclus.',
    material: 'Haute qualité réspirant', fit: 'Pointure normale', detail: 'Semelle technique ·confort quotidien',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-018', audience: 'homme', group: 'shoes', name: 'On Running Cloudmonster — Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Blanc', 'Gris', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-on-cloudmonster-white.jpg',
    gallery: [],
    description: 'Sneaker On Running claire, sport et moderne, avec semelle Cloud qualitative .',
    material: 'Haute qualité réspirant · semelle Cloud technique', fit: 'Pointure normale', detail: 'Boîte incluse · amorti sculpté',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-019', audience: 'homme', group: 'shoes', name: 'On Running Cloudtilt — Gris & Vert Minéral', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Vert minéral', 'Gris', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-on-cloudtilt-green.jpg', gallery: [],
    description: 'Sneaker On Running sombre, idéale pour une sélection sport chic.',
    material: 'Haute qualité réspirant · semelle Cloud technique', fit: 'Pointure normale', detail: 'Boîte incluse · amorti sculpté',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-020', audience: 'homme', group: 'shoes', name: 'On Running Cloudmonster — Noir & Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Noir', 'Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-on-cloudmonster-black-white.jpg', gallery: [],
    description: 'Sneaker On Running sombre, parfaite pour une sélection quotidienne sombre et sportive.',
    material: 'Haute qualité réspirant · semelle Cloud', fit: 'Pointure normale', detail: 'boîte incluse',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-030', audience: 'homme', group: 'shoes', name: 'Dior B30 — Gris & Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Gris', 'Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-grey-double.jpg', gallery: [],
    description: 'Paire de chaussure de luxe, gris & blanc, inclus avec coffret et sac Dior officiel',
    material: 'Haute qualité · empiècements structurés', fit: 'Pointure normale', detail: 'Coffret/sac inclus · luxe',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-031', audience: 'homme', group: 'shoes', name: 'Dior B30 — Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-white-single.jpg', gallery: [],
    description: 'Paire de chaussure de luxe, blanc, inclus avec coffret et sac Dior officiel.',
    material: 'Haute qualité · empiècements structurés', fit: 'Pointure normale', detail: 'Coffret/sac inclus · luxe',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-032', audience: 'homme', group: 'shoes', name: 'New Balance 1906R — Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['41', '42'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-new-balance-white-1906.jpg', gallery: [],
    description: 'New Balance clair, Coffret/sac inclus.',
    material: 'Haute qualité réspirant', fit: 'Pointure normale', detail: 'Semelle technique · confort quotidien',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-033', audience: 'homme', group: 'shoes', name: 'On Running Cloudtilt — Blanc & Bleu Brume', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['42', '43'], colors: ['Bleu brume', 'Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-on-cloudtilt-blue.jpg', gallery: [],
    description: 'Sneaker On Running, parfaite pour une sélection quotidienne sombre et sportive.',
    material: 'Haute qualité réspirant · semelle Cloud', fit: 'Pointure normale', detail: 'boîte incluse',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-034', audience: 'homme', group: 'clothing', name: 'T-shirt VRUNK Signature V — Noir Vert', category: 'Vêtements / T-shirts',
    price: null, oldPrice: null, sizes: ['S'], colors: ['Noir', 'Vert', 'Rose'],
    stockLevel: 'low', image: 'assets/products/men/shirt-vision-v-green-black-back.jpg', gallery: [],
    alt: 'T-shirt homme noir VRUNK avec grand V au dos',
    description: 'T-shirt noir avec grand V graphique vert au dos.',
    material: 'sport premium', fit: 'Coupe droite', detail: 'Visuel dos signature · VRK',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-035', audience: 'homme', group: 'clothing', name: 'T-shirt VRUNK  — Bleu turquoise', category: 'Vêtements / T-shirts',
    price: null, oldPrice: null, sizes: ['S'], colors: ['Mint', 'Turquoise', 'Noir'],
    stockLevel: 'low', image: 'assets/products/men/shirt-vrk-mint.jpg', gallery: [],
    alt: 'T-shirt homme VRK avec détails turquoise',
    description: 'T-shirt mint VRK à motifs ton sur ton, accent turquoise et rendu sport premium.',
    material: 'Coton technique léger', fit: 'Coupe droite', detail: 'Logo poitrine · graphisme all-over discret',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-036', audience: 'homme', group: 'clothing', name: 'T-shirt VRUNK Mizuno — noir / violet / jaune', category: 'Vêtements / T-shirts',
    price: null, oldPrice: null, sizes: ['L'], colors: ['Graphite', 'Noir', 'Jaune volt'],
    stockLevel: 'low', image: 'assets/products/men/shirt-vrk-mizuno-graphite.jpg', gallery: [],
    alt: 'T-shirt homme graphite VRK Mizuno avec motif hexagonal',
    description: 'T-shirt graphite à motif hexagonal, signature et lecture très sportive.',
    material: 'Textile respirant', fit: 'Coupe sport', detail: 'Motif technique',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-037', audience: 'homme', group: 'clothing', name: 'T-shirt VRUNK Peace — Blanc Rouge', category: 'Vêtements / T-shirts',
    price: null, oldPrice: null, sizes: ['S'], colors: ['Blanc', 'Rouge'],
    stockLevel: 'low', image: 'assets/products/men/shirt-vrk-white-red-front-back.jpg', gallery: [],
    alt: 'T-shirt homme blanc VRK avec visuel rouge devant et dos',
    description: 'Rendu clair et très lisible quotidien.',
    material: 'Coton premium', fit: 'Coupe droite', detail: 'Face + dos visibles · graphisme rouge',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-038', audience: 'homme', group: 'clothing', name: 'T-shirt VRUNK Limited V — Noir Rouge', category: 'Vêtements / T-shirts',
    price: null, oldPrice: null, sizes: ['M'], colors: ['Noir', 'Rouge', 'Blanc'],
    stockLevel: 'low', image: 'assets/products/men/shirt-vrk-black-red-back.jpg', gallery: [],
    alt: 'T-shirt homme noir VRK limited avec grand V rouge au dos',
    description: 'Édition limitée avec grand V rouge au dos.',
    material: 'Coton premium', fit: 'Coupe droite', detail: 'Visuel dos rouge · lightweight division',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-039', audience: 'homme', group: 'clothing', name: 'T-shirt VRUNK Peace — Noir Bleu', category: 'Vêtements / T-shirts',
    price: null, oldPrice: null, sizes: ['M'], colors: ['Noir', 'Bleu'],
    stockLevel: 'low', image: 'assets/products/men/shirt-vrk-black-blue-front-back.jpg', gallery: [],
    alt: 'T-shirt homme noir VRK avec visuel bleu devant et dos',
    description: 'sobre, premium et facile à intégrer en Pack Outfit.',
    material: 'Coton premium', fit: 'Coupe droite', detail: 'Face + dos visibles · graphisme bleu',
    featured: false, topRequested: false, isNew: true,
  },
  // Nouveaux articles Homme · Vêtements — intégration stock du 30/06.
  {
    id: 'VH-040', audience: 'homme', group: 'clothing', name: 'Polo Ralph Lauren torsadé — Blanc', category: 'Vêtements / Polos',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/polo-rl-cable-white.jpg', gallery: [],
    alt: 'Polo homme blanc en maille torsadée avec col boutonné',
    description: 'Polo blanc en maille texturée, rendu propre et lumineux pour une sélection homme premium.',
    material: 'Maille coton texturée', fit: 'Coupe droite', detail: 'Col polo · boutons ton clair · broderie poitrine',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-041', audience: 'homme', group: 'clothing', name: 'Polo Ralph Lauren torsadé — Beige', category: 'Vêtements / Polos',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Beige'],
    stockLevel: 'inquiry', image: 'assets/products/men/polo-rl-cable-beige.jpg', gallery: [],
    alt: 'Polo homme beige en maille torsadée avec étiquette',
    description: 'Polo beige texturé avec étiquette visible, parfait pour une carte catalogue chaude et premium.',
    material: 'Maille coton texturée', fit: 'Coupe droite', detail: 'Col polo · texture torsadée · broderie poitrine',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-042', audience: 'homme', group: 'clothing', name: 'Pull zippé Ralph Lauren — Crème', category: 'Vêtements / Pulls',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Gris clair'],
    stockLevel: 'inquiry', image: 'assets/products/men/sweat-rl-halfzip-grey.jpg', gallery: [],
    alt: 'Pull homme gris clair avec col zippé et étiquette',
    description: 'Pull col zippé gris clair, sobre et facile à porter, avec une lecture produit immédiate.',
    material: 'Molleton premium', fit: 'Coupe droite', detail: 'Col montant · zip court · broderie poitrine',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-043', audience: 'homme', group: 'clothing', name: 'Pull zippé Ralph Lauren — Beige sable', category: 'Vêtements / Pulls',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Beige sable'],
    stockLevel: 'inquiry', image: 'assets/products/men/sweat-rl-halfzip-beige.jpg', gallery: [],
    alt: 'Pull homme beige sable avec col zippé',
    description: 'Version beige sable du col zippé, visuel chaud, propre et cohérent avec l’univers VISION.',
    material: 'Molleton premium', fit: 'Coupe droite', detail: 'Col montant · zip court · broderie poitrine',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-044', audience: 'homme', group: 'clothing', name: 'Pull zippé Ralph Lauren — Blanc crème', category: 'Vêtements / Pulls',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Blanc crème'],
    stockLevel: 'inquiry', image: 'assets/products/men/sweat-rl-halfzip-white.jpg', gallery: [],
    alt: 'Pull homme blanc crème avec col zippé et étiquette',
    description: 'Pull blanc crème avec zip doré, rendu premium et très lisible sur fond sombre.',
    material: 'Molleton premium', fit: 'Coupe droite', detail: 'Col montant · zip doré · broderie poitrine',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-045', audience: 'homme', group: 'clothing', name: 'Short velour Ralph Lauren — Blanc crème', category: 'Vêtements / Shorts',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Blanc crème'],
    stockLevel: 'inquiry', image: 'assets/products/men/short-rl-corduroy-cream.jpg', gallery: [],
    alt: 'Short homme blanc crème côtelé avec cordon de serrage',
    description: 'Short côtelé blanc crème avec cordon, pensé pour composer rapidement un outfit premium.',
    material: 'Maille côtelée', fit: 'Coupe détente', detail: 'Taille élastiquée · cordons · poches latérales',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-046', audience: 'homme', group: 'clothing', name: 'Short velour Ralph Lauren — Beige', category: 'Vêtements / Shorts',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Beige'],
    stockLevel: 'inquiry', image: 'assets/products/men/short-rl-corduroy-beige.jpg', gallery: [],
    alt: 'Short homme beige côtelé avec étiquette',
    description: 'Short beige en texture côtelée, visuel chaleureux et très adapté aux sélections été.',
    material: 'Maille côtelée', fit: 'Coupe détente', detail: 'Taille élastiquée · cordons blancs · broderie jambe',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-047', audience: 'homme', group: 'clothing', name: 'Pull col zippé Ralph Lauren — Gris clair', category: 'Vêtements / Pulls',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Gris chiné'],
    stockLevel: 'inquiry', image: 'assets/products/men/sweat-rl-halfzip-grey-alt.jpg', gallery: [],
    alt: 'Pull homme gris chiné avec col zippé et étiquette',
    description: 'Variante gris chiné du col zippé, ajoutée en fiche séparée pour garder chaque image indépendante.',
    material: 'Molleton premium', fit: 'Coupe droite', detail: 'Col montant · zip court · finition chinée',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-048', audience: 'homme', group: 'clothing', name: 'Short velour Ralph Lauren — Bleu marine', category: 'Vêtements / Shorts',
    price: null, oldPrice: null, sizes: ['M', 'L'], colors: ['Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/men/short-rl-corduroy-navy.jpg', gallery: [],
    alt: 'Short homme bleu marine côtelé avec cordon blanc',
    description: 'Short bleu marine avec cordons blancs, contraste net et lecture produit forte sur mobile.',
    material: 'Maille côtelée', fit: 'Coupe détente', detail: 'Taille élastiquée · cordons blancs · broderie jambe',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-049', audience: 'homme', group: 'clothing', name: 'Veste Harrington Ralph Lauren — Beige', category: 'Vêtements / Vestes',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Beige'],
    stockLevel: 'inquiry', image: 'assets/products/men/jacket-rl-harrington-beige.jpg', gallery: [],
    alt: 'Veste homme beige zippée avec poches latérales',
    description: 'Veste beige zippée avec poches, pièce forte pour compléter une sélection homme premium.',
    material: 'Toile premium', fit: 'Coupe droite', detail: 'Zip complet · poches latérales · bas élastiqué',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-021', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Blanc & Noir', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Blanc', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-white-black.jpg', gallery: [],
    description: 'Ensemble t-shirt blanc imprimé et short cargo noir, prêt pour une proposition pack complète.',
    material: 'Coton premium · short technique', fit: 'Coupe droite', detail: 'Badge cargo · look coordonné',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-022', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Blanc & Gris', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Blanc', 'Gris'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-white-grey.jpg', gallery: [],
    description: 'T-shirt blanc graphique associé à un short gris clair, rendu propre et facile à projeter.',
    material: 'Coton premium · short cargo léger', fit: 'Coupe droite', detail: 'Ensemble coordonné · badge latéral',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-023', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Noir & Gris', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Noir', 'Gris'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-black-grey.jpg', gallery: [],
    description: 'Variation noire et grise, plus sombre, avec un contraste fort et une lecture immédiate.',
    material: 'Coton premium · short cargo léger', fit: 'Coupe droite', detail: 'T-shirt imprimé · short cargo',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-024', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Noir & Marine', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Noir', 'Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-black-navy.jpg', gallery: [],
    description: 'T-shirt noir associé à un short marine, très facile à porter et cohérent avec l’univers VISION.',
    material: 'Coton premium · short cargo léger', fit: 'Coupe droite', detail: 'Palette sombre · badge cargo',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-025', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Blanc & Marine', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Blanc', 'Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-white-navy.jpg', gallery: [],
    description: 'Une combinaison blanc et marine très nette, pensée pour composer rapidement un outfit complet.',
    material: 'Coton premium · short cargo léger', fit: 'Coupe droite', detail: 'Graphisme bleu · short marine',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-026', audience: 'homme', group: 'clothing', name: 'Ensemble Under Armour — Gris Performance', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Gris'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-grey.jpg', gallery: [],
    description: 'Set training gris composé d’un t-shirt technique et d’un short assorti à zips.',
    material: 'Textile performance respirant', fit: 'Coupe sport', detail: 'Poches zippées · motif ton sur ton',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-027', audience: 'homme', group: 'clothing', name: 'Ensemble Under Armour — Turquoise & Noir', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Turquoise', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-turquoise-black.jpg', gallery: [],
    description: 'Set sport turquoise et noir, visuel très identifiable pour une sélection estivale technique.',
    material: 'Textile performance respirant', fit: 'Coupe sport', detail: 'T-shirt imprimé · short noir zippé',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-028', audience: 'homme', group: 'clothing', name: 'Ensemble Under Armour — Noir Graphite', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Graphite', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-dark.jpg', gallery: [],
    description: 'Version sombre graphite, très premium, avec détails techniques et contraste discret.',
    material: 'Textile performance respirant', fit: 'Coupe sport', detail: 'Motif marbré · short noir',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-029', audience: 'homme', group: 'clothing', name: 'Ensemble Under Armour — Beige Sable', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Beige sable'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-beige.jpg', gallery: [],
    description: 'Set beige sable à la lecture douce, parfait pour diversifier une sélection sport premium.',
    material: 'Textile performance respirant', fit: 'Coupe sport', detail: 'T-shirt ton sur ton · short assorti',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-001', audience: 'homme', group: 'accessories', name: 'JBL Charge 6 — Noir', category: 'Audio',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/speaker-charge6-black.jpg', gallery: [],
    description: 'Enceinte portable au format généreux, présentée avec son coffret dans une finition noire discrète et premium.',
    material: 'Finition textile', fit: 'Format portable', detail: 'Bluetooth · autonomie annoncée 28 h',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-002', audience: 'homme', group: 'accessories', name: 'JBL Charge 6 — Bleu', category: 'Audio',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu nuit'],
    stockLevel: 'inquiry', image: 'assets/products/men/speaker-charge6-blue.jpg', gallery: [],
    description: 'La version bleu nuit de l’enceinte portable, mise en scène avec son coffret pour une lecture produit immédiate.',
    material: 'Finition textile', fit: 'Format portable', detail: 'Bluetooth · autonomie annoncée 28 h',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-003', audience: 'homme', group: 'accessories', name: 'JBL Charge 6 — Blanc', category: 'Audio',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/speaker-charge6-white.jpg', gallery: [],
    description: 'Une finition blanche lumineuse et épurée, accompagnée de son coffret et pensée pour un univers plus minimal.',
    material: 'Finition textile', fit: 'Format portable', detail: 'Bluetooth · autonomie annoncée 28 h',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-004', audience: 'homme', group: 'accessories', name: 'Casque Apple Max — Bleu nuit', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu nuit'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-midnight.jpg', gallery: [],
    description: 'Casque circum-aural présenté avec son étui et son coffret, dans une finition bleu nuit profonde.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-005', audience: 'homme', group: 'accessories', name: 'Casque Apple Max — Argent', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Argent'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-silver.jpg', gallery: [],
    description: 'Casque circum-aural dans une finition argent clair, livré avec son étui et présenté dans un décor sobre.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-006', audience: 'homme', group: 'accessories', name: 'Casque Apple Max — Or', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Or'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-gold.jpg', gallery: [],
    description: 'Une déclinaison dorée au rendu chaleureux, avec étui coordonné et coffret de présentation.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-007', audience: 'homme', group: 'accessories', name: 'Casque Apple Max — Graphite', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Graphite'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-graphite.jpg', gallery: [],
    description: 'Casque circum-aural graphite au rendu technique et discret, accompagné de son étui de transport.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-008', audience: 'homme', group: 'accessories', name: 'Casque Apple Max — Cuivre', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Cuivre'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-copper.jpg', gallery: [],
    description: 'Une finition cuivre expressive, mise en valeur par un cadrage produit complet avec étui et coffret.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-009', audience: 'homme', group: 'fragrance', name: 'Baccarat Rouge 540 — 100 ml', category: 'Parfums',
    price: null, oldPrice: null, sizes: ['100 ml'], colors: ['Rouge · Or'],
    stockLevel: 'inquiry', image: 'assets/products/men/fragrance-baccarat-rouge-540.jpg', gallery: [],
    description: 'Flacon Baccarat Rouge 540 présenté dans son écrin rouge et or, avec une mise en scène sombre et raffinée.',
    material: 'Extrait de parfum', fit: 'Flacon 100 ml', detail: 'Écrin de présentation inclus',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-010', audience: 'homme', group: 'fragrance', name: 'Bleu — 100 ml', category: 'Parfums',
    price: null, oldPrice: null, sizes: ['100 ml'], colors: ['Bleu nuit'],
    stockLevel: 'inquiry', image: 'assets/products/men/fragrance-bleu.jpg', gallery: [],
    description: 'Flacon Bleu de Chanel présenté avec son coffret dans une composition bleu nuit très lisible.',
    material: 'Eau de toilette', fit: 'Flacon 100 ml', detail: 'Coffret de présentation inclus',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-011', audience: 'homme', group: 'fragrance', name: 'Sauvage — 100 ml', category: 'Parfums',
    price: null, oldPrice: null, sizes: ['100 ml'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/fragrance-sauvage.jpg', gallery: [],
    description: 'Flacon Sauvage présenté avec son coffret sur une matière sombre, pour une lecture masculine et directe.',
    material: 'Eau de parfum', fit: 'Flacon 100 ml', detail: 'Coffret de présentation inclus',
    featured: false, topRequested: true, isNew: true,
  },

  {
    id: 'VF-001', audience: 'femme', group: 'clothing', name: 'Top ALO yoga — Bleu', category: 'Tops',
    price: null, oldPrice: null, sizes: ['S', 'M'], colors: ['Bleu royal'],
    stockLevel: 'inquiry', image: 'assets/products/women/top-alo-blue.jpg', gallery: [],
    description: 'Top court à dos nageur et ligne athleisure nette, présenté dans une finition bleu royal intense.',
    material: 'Jersey technique extensible', fit: 'Ajusté', detail: 'Dos nageur · maintien près du corps',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-002', audience: 'femme', group: 'clothing', name: 'Top ALO yoga — Rouge', category: 'Tops',
    price: null, oldPrice: null, sizes: ['S', 'M'], colors: ['Rouge profond'],
    stockLevel: 'inquiry', image: 'assets/products/women/top-alo-red.jpg', gallery: [],
    description: 'Top court côtelé à dos nageur, pensé pour une silhouette sportive et structurée.',
    material: 'Maille côtelée extensible', fit: 'Ajusté', detail: 'Finition côtelée · coupe courte',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-003', audience: 'femme', group: 'clothing', name: 'Top ALO yoga — Vert', category: 'Tops',
    price: null, oldPrice: null, sizes: ['S', 'M'], colors: ['Vert émeraude'],
    stockLevel: 'inquiry', image: 'assets/products/women/top-alo-green.jpg', gallery: [],
    description: 'La déclinaison vert émeraude du top côtelé, avec un volume compact et une présence visuelle forte.',
    material: 'Maille côtelée extensible', fit: 'Ajusté', detail: 'Dos nageur · coupe courte',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-004', audience: 'femme', group: 'accessories', name: 'Dyson Supersonic — Noir & Argent', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Noir · Argent'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-supersonic-black.jpg', gallery: [],
    description: 'Sèche-cheveux Supersonic présenté avec son coffret et ses accessoires dans une finition noire sobre.',
    material: 'Finition satinée', fit: 'Format coiffure', detail: 'Diffuseur · concentrateurs · étui',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-005', audience: 'femme', group: 'accessories', name: 'Dyson Supersonic — Bleu & Cuivre', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu nuit · Cuivre'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-supersonic-blue-copper.jpg', gallery: [],
    description: 'Version bleu nuit et cuivre du Supersonic, mise en scène avec son coffret et ses embouts.',
    material: 'Finition satinée', fit: 'Format coiffure', detail: 'Diffuseur · concentrateurs · étui',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-006', audience: 'femme', group: 'accessories', name: 'Dyson Airwrap Complete Long — Bleu & Cuivré', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu · Cuivre'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-airwrap-purple-copper.jpg', gallery: [],
    description: 'Coffret coiffure Airwrap Complete Long avec plusieurs embouts et rangement coordonné.',
    material: 'Finition satinée', fit: 'Coffret multi-styler', detail: 'Embouts coiffage · brosses · étui',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-007', audience: 'femme', group: 'accessories', name: 'Dyson Airwrap Complete Long — Argent & Cuivré', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Argent · Cuivre'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-airwrap-silver-copper.jpg', gallery: [],
    description: 'Coffret Airwrap Complete Long argent et cuivre, présenté avec ses accessoires de coiffage.',
    material: 'Finition métallisée', fit: 'Coffret multi-styler', detail: 'Embouts coiffage · brosses · étui',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-008', audience: 'femme', group: 'accessories', name: 'Dyson Airstrait — Bleu & Or', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu nuit · Or'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-airstrait-blue-gold.jpg', gallery: [],
    description: 'Lisseur-sécheur Airstrait présenté dans son étui rigide, finition bleu nuit et détails dorés.',
    material: 'Finition satinée', fit: 'Format lisseur', detail: 'Étui rigide · câble intégré',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-009', audience: 'femme', group: 'accessories', name: 'Dyson Airstrait — Rose', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Rose poudré'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-airstrait-rose.jpg', gallery: [],
    description: 'Déclinaison rose poudré du lisseur-sécheur Airstrait, accompagnée de son étui de rangement.',
    material: 'Finition satinée', fit: 'Format lisseur', detail: 'Étui rigide · câble intégré',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-010', audience: 'femme', group: 'clothing', name: 'Short ALO yoga — Noir', category: 'Shorts',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/shorts-alo-black.jpg', gallery: [],
    description: 'Short sport léger à taille élastiquée contrastée, conçu pour une silhouette athleisure épurée.',
    material: 'Textile technique léger', fit: 'Coupe running', detail: 'Taille élastiquée · côtés arrondis',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-011', audience: 'femme', group: 'clothing', name: 'Short ALO yoga — Blanc', category: 'Shorts',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/women/shorts-alo-white.jpg', gallery: [],
    description: 'Version blanche du short Flow, avec taille noire contrastée et coupe sportive courte.',
    material: 'Textile technique léger', fit: 'Coupe running', detail: 'Taille élastiquée · côtés arrondis',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-012', audience: 'femme', group: 'clothing', name: 'Ensemble ALO yoga — Noir', category: 'Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/set-alo-black.jpg', gallery: [],
    description: 'Ensemble deux pièces composé d’un t-shirt ajusté et d’un pantalon fluide à jambe large.',
    material: 'Jersey souple', fit: 'Haut ajusté · bas fluide', detail: 'Deux pièces coordonnées',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-013', audience: 'femme', group: 'shoes', name: 'Hermès Chypre — Noir', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['38', '39', '42', '43'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-black.jpg', gallery: [],
    description: 'Sandales plates noires à large découpe H, présentées dans un environnement marbre et orange.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Large bride H · semelle noire',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-014', audience: 'femme', group: 'clothing', name: 'Ensemble ALO yoga — Kaki', category: 'Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Kaki minéral'],
    stockLevel: 'inquiry', image: 'assets/products/women/set-alo-khaki.jpg', gallery: [],
    description: 'Ensemble t-shirt ajusté et pantalon fluide dans une tonalité kaki douce et contemporaine.',
    material: 'Jersey souple', fit: 'Haut ajusté · bas fluide', detail: 'Deux pièces coordonnées',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-015', audience: 'femme', group: 'shoes', name: ' Hermès Claquette — Blanc', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['37', '38', '39'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-white.jpg', gallery: [],
    description: 'Sandales plates blanches à découpe H ton sur ton, dans une présentation nette et lumineuse.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Large bride H · semelle blanche',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-016', audience: 'femme', group: 'shoes', name: 'Hermès Claquette New — Blanc', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['38', '39'], colors: ['Blanc · Argent'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-lock-white.jpg', gallery: [],
    description: 'Sandales blanches à double bride, soulignées par un fermoir métallique central.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Double bride · fermoir métal',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-017', audience: 'femme', group: 'shoes', name: 'Hermès Chypre — Blanc', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['38', '39', '42', '43'], colors: ['Écru · Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-contrast.jpg', gallery: [],
    description: 'Sandales contrastées avec découpe H écrue, semelle noire et bride de maintien réglable.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: ' H Luxe · maintien arrière',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-018', audience: 'femme', group: 'clothing', name: 'Ensemble ALO yoga — Marine', category: 'Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L'], colors: ['Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/women/set-alo-navy.jpg', gallery: [],
    description: 'Ensemble coordonné bleu marine associant un haut ajusté et un pantalon fluide à jambe large.',
    material: 'Jersey souple', fit: 'Haut ajusté · bas fluide', detail: 'Deux pièces coordonnées',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-019', audience: 'femme', group: 'shoes', name: 'Hermès Claquette — Brun', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['38', '39'], colors: ['Brun cognac'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-brown.jpg', gallery: [],
    description: 'Sandales à découpe H dans une teinte brun cognac, rehaussées de surpiqûres claires.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Bride H · surpiqûres contrastées',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-020', audience: 'femme', group: 'shoes', name: 'Hermès Claquette New — Brun', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['38', '39'], colors: ['Cognac · Or'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-lock-cognac.jpg', gallery: [],
    description: 'Sandales cognac à double bride avec fermoir doré central et finitions ton sur ton.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Double bride · fermoir doré',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VF-021', audience: 'femme', group: 'clothing', name: 'Short ALO yoga — Marine', category: 'Shorts',
    price: null, oldPrice: null, sizes: ['S', 'M'], colors: ['Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/women/shorts-alo-navy.jpg', gallery: [],
    description: 'Short Flow bleu marine à taille contrastée, léger et pensé pour un usage sport ou quotidien.',
    material: 'Textile technique léger', fit: 'Coupe running', detail: 'Taille élastiquée · côtés arrondis',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-022', audience: 'femme', group: 'shoes', name: 'Hermès Claquette — Noir Grainé', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['37', '38', '39'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-black-marble.jpg', gallery: [],
    description: 'Sandales noires à découpe H et finition légèrement grainée, photographiées sur un fond marbré.',
    material: 'Finition grainée', fit: 'Forme plate', detail: 'Large bride H · semelle noire',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-023', audience: 'femme', group: 'shoes', name: 'Hermès Claquette New — Noir', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['38', '39'], colors: ['Noir · Or'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-lock-black.jpg', gallery: [],
    description: 'Sandales noires à double bride et fermoir doré, dans une composition élégante et contrastée.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Double bride · fermoir doré',
    featured: true, topRequested: true, isNew: true,
  },
];


/* ─────────────────────────────────────────────────────────────────
   ④ PACKS VISION — outfits complets
   ───────────────────────────────────────────────────────────────── */
const PACKS = [
  {
    id: 'PH-003', audience: 'homme', name: 'Pack Dior', label: 'Look complet', badgeType: 'best',
    description: 'Une base sneaker premium à associer avec une tenue sobre. Idéal pour réserver la paire et composer le look.',
    itemLabels: ['Sneakers Dior Runner — Gris', 'Option ensemble VISION coordonné'],
    sizes: ['Pack sur mesure'], price: null, oldPrice: null, stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-grey-pair.jpg',
  },
  {
    id: 'PH-004', audience: 'homme', name: 'Pack Stone Island Summer', label: 'Outfit privé', badgeType: 'best',
    description: 'T-shirt graphique, short cargo et proposition sneaker : une silhouette complète prête à sortir.',
    itemLabels: ['Ensemble Stone Island — Blanc & Noir', 'Sneaker au choix selon taille'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: null, oldPrice: null, stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-white-black.jpg',
  },
  {
    id: 'PH-005', audience: 'homme', name: 'Pack Performance Premium', label: 'Sélection sport', badgeType: null,
    description: 'Un set technique Under Armour avec sneaker running pour une sélection sport crédible et nette.',
    itemLabels: ['Ensemble Under Armour — Noir Graphite', 'On Running Cloudmonster — Noir & Blanc'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], price: null, oldPrice: null, stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-dark.jpg',
  },
  {
    id: 'PH-001', audience: 'homme', name: 'Pack Audio', label: 'Pack privé', badgeType: 'best',
    description: 'Le duo audio VISION : une enceinte portable et un casque coordonné dans une sélection sombre.',
    itemLabels: ['Enceinte Charge 6 — Noir', 'Casque Max — Graphite'],
    sizes: ['Pack unique'], price: null, oldPrice: null, stockLevel: 'inquiry', image: 'assets/products/men/speaker-charge6-black.jpg',
  },
  {
    id: 'PH-002', audience: 'homme', name: 'Duo Signature', label: 'Sélection parfum luxe', badgeType: null,
    description: 'Deux signatures olfactives dans un pack confidentiel, proposé directement sur demande.',
    itemLabels: ['Bleu — 100 ml', 'Sauvage — 100 ml'],
    sizes: ['Pack unique'], price: null, oldPrice: null, stockLevel: 'inquiry', image: 'assets/products/men/fragrance-bleu.jpg',
  },
  {
    id: 'PF-001', audience: 'femme', name: 'Pack Active Noir', label: 'Tenue complète', badgeType: 'best',
    description: 'Une silhouette complète et monochrome, prête à être réservée en un seul message.',
    itemLabels: ['T-shirt Alo ajusté', 'Pantalon Alo fluide'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'], price: null, oldPrice: null, stockLevel: 'inquiry', image: 'assets/products/women/set-alo-black.jpg',
  },
  {
    id: 'PF-002', audience: 'femme', name: 'Pack Active Kaki', label: 'Sélection privée', badgeType: null,
    description: 'Le duo kaki coordonné pour une allure douce, sportive et immédiatement lisible.',
    itemLabels: ['T-shirt Alo ajusté', 'Pantalon Alo fluide'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'], price: null, oldPrice: null, stockLevel: 'inquiry', image: 'assets/products/women/set-alo-khaki.jpg',
  },
];


/* ─────────────────────────────────────────────────────────────────
   ⑤ FILTRES & ÉTAT
   ───────────────────────────────────────────────────────────────── */
const SPECIAL_FILTERS = [
  { key: 'all',         label: 'Nouveauté' },
  { key: 'clothing',    label: 'Vêtements' },
  { key: 'shoes',       label: 'Paires' },
  { key: 'fragrance',   label: 'Parfums' },
  { key: 'accessories', label: 'Bonus' },
  { key: 'packs',       label: 'Prix Pack' },
];

const state = {
  audience: null,
  activeFilter: 'all',
  searchQuery: '',
  activeItemId: null,
  activeItemType: null,
  selectedSize: null,
  galleryIndex: 0,
  toastTimer: null,
};

const PACK_CONFIG = {
  twoItemsDiscountPercent: 8,
  threeItemsDiscountPercent: 14,
  minItems: 2,
  maxItems: 3,
  currency: '€',
};

const packState = {
  activeGender: null,
  homme: {
    mode: 3,
    clothingIndex: 0,
    footwearIndex: 0,
    bonusIndex: 0,
    selectedClothing: null,
    selectedFootwear: null,
    selectedBonus: null,
  },
  femme: {
    mode: 3,
    clothingIndex: 0,
    footwearIndex: 0,
    bonusIndex: 0,
    selectedClothing: null,
    selectedFootwear: null,
    selectedBonus: null,
  },
};

const currentReservationContext = {
  type: 'none',
  gender: null,
  product: null,
  pack: null,
  message: '',
};

const seamlessVideoControllers = [];


/* ─────────────────────────────────────────────────────────────────
   ⑥ UTILITAIRES
   ───────────────────────────────────────────────────────────────── */
function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function brandLockupHTML(className = 'brand-lockup-mini') {
  return `<span class="brand-lockup ${className}" aria-label="VISION"><img src="assets/brand/vision-logo.jpeg" alt="" width="28" height="28" /><span>VISION</span></span>`;
}

function itemAltText(item = {}, fallback = '') {
  return item.alt || fallback || item.name || item.id || 'Article VISION';
}

function hasKnownPrice(item) {
  return Number.isFinite(item?.price) && item.price > 0;
}

function formatPrice(item) {
  return hasKnownPrice(item) ? `${item.price}${CONFIG.currency}` : 'Prix sur demande';
}

function hasDiscount(item) {
  return hasKnownPrice(item) && Number.isFinite(item?.oldPrice) && item.oldPrice > item.price;
}

function shortText(value = '', max = 34) {
  const text = String(value || '').trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function formatMoney(value) {
  return Number.isFinite(value) ? `${Math.round(value)}${PACK_CONFIG.currency}` : 'Prix à confirmer sur Snapchat';
}

function productPriceValue(product) {
  return hasKnownPrice(product) ? product.price : null;
}

function productSizeLabel(product) {
  if (!product?.sizes?.length) return 'Taille à confirmer';
  if (product.sizes.length === 1) return product.sizes[0];
  return product.sizes.slice(0, 4).join(' / ') + (product.sizes.length > 4 ? '…' : '');
}

function displayCategory(product = {}) {
  if (product.group === 'shoes') return 'Paires';
  if (product.group === 'clothing') return product.category?.includes('Ensemble') ? 'Outfit' : 'Vêtement';
  if (product.group === 'fragrance') return 'Parfum';
  if (product.group === 'accessories') return product.category?.includes('Beauté') ? 'Beauté' : 'Bonus';
  return product.category || 'Stock privé';
}

function statusForProduct(product) {
  return STATUS[product?.stockLevel] || { label: 'Disponibilité à confirmer', css: 'status-inquiry', available: true };
}

function trackVisionEvent(eventName, payload = {}) {
  const event = {
    event: eventName,
    payload,
    at: new Date().toISOString(),
  };

  try {
    const key = 'visionTrackingEvents';
    const events = JSON.parse(window.localStorage.getItem(key) || '[]');
    events.push(event);
    window.localStorage.setItem(key, JSON.stringify(events.slice(-80)));
  } catch {
    // Tracking local optionnel : ne jamais bloquer le catalogue.
  }
}

async function submitVisionReservation(payload = {}) {
  if (!CONFIG.formspreeEndpoint) return { ok: false, skipped: true };

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 3800);
  try {
    const response = await fetch(CONFIG.formspreeEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
      }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('VISION reservation submission failed');
    return { ok: true };
  } catch (error) {
    console.warn('VISION Formspree reservation:', error);
    return { ok: false, error };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function animateCounter(el, target, duration = 700) {
  if (!el) return;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const pct = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round((1 - Math.pow(1 - pct, 3)) * target);
    if (pct < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/*
  Deux couches vidéo se chevauchent avant la dernière image.
  Le second lecteur démarre pendant que le premier joue encore :
  aucune frame noire ni pause visible dans les WebViews mobiles.
*/
function initSeamlessVideos() {
  document.querySelectorAll('[data-seamless-video]').forEach(container => {
    if (container.dataset.seamlessReady === 'true') return;
    const layers = [...container.querySelectorAll('.choice-video')];
    if (layers.length < 2) return;

    container.dataset.seamlessReady = 'true';
    let activeIndex = 0;
    let switching = false;
    let running = false;
    let frameId = null;

    const safePlay = video => {
      video.muted = true;
      video.playsInline = true;
      const promise = video.play();
      if (promise?.catch) promise.catch(() => {});
    };

    const tick = () => {
      if (!running) return;
      const active = layers[activeIndex];
      const duration = active.duration;

      if (!switching && Number.isFinite(duration) && duration > 0 && active.currentTime > .2 && duration - active.currentTime <= .34) {
        switching = true;
        const nextIndex = activeIndex === 0 ? 1 : 0;
        const next = layers[nextIndex];
        try { next.currentTime = 0; } catch { /* métadonnées encore en préparation */ }
        safePlay(next);
        next.classList.add('is-active');

        setTimeout(() => {
          if (!running) return;
          active.classList.remove('is-active');
          active.pause();
          try { active.currentTime = 0; } catch { /* reprise native en secours */ }
          activeIndex = nextIndex;
          switching = false;
        }, 320);
      }

      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      layers.forEach((video, index) => video.classList.toggle('is-active', index === activeIndex));
      safePlay(layers[activeIndex]);
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      switching = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = null;
      layers.forEach(video => video.pause());
    };

    layers.forEach(video => {
      video.addEventListener('stalled', () => {
        if (running && video.classList.contains('is-active')) safePlay(video);
      });
      video.addEventListener('error', () => container.classList.add('video-unavailable'));
    });

    seamlessVideoControllers.push({ start, stop });
    start();
  });

  document.addEventListener('visibilitychange', () => {
    const gateVisible = !document.getElementById('audienceGate')?.hidden;
    seamlessVideoControllers.forEach(controller => {
      if (!document.hidden && gateVisible) controller.start();
      else controller.stop();
    });
  });
}

function setGateVideosPlaying(shouldPlay) {
  seamlessVideoControllers.forEach(controller => {
    if (shouldPlay) controller.start();
    else controller.stop();
  });
}

function audienceLabel() {
  return state.audience === 'femme' ? 'Femme' : 'Homme';
}

function getAudienceProducts() {
  return PRODUCTS.filter(product => product.audience === state.audience);
}

function getAudiencePacks() {
  return PACKS.filter(pack => pack.audience === state.audience);
}

function getAvailableCount() {
  return getAudienceProducts().filter(product => STATUS[product.stockLevel]?.available).length;
}

function getFilteredProducts() {
  return getAudienceProducts().filter(product => {
    if (['clothing', 'shoes', 'fragrance', 'accessories'].includes(state.activeFilter) && product.group !== state.activeFilter) {
      return false;
    }
    if (state.searchQuery) {
      const query = state.searchQuery.toLocaleLowerCase('fr');
      const content = [
        product.id, product.name, product.category, product.description,
        product.material, product.fit, product.detail, ...(product.colors || []),
      ].join(' ').toLocaleLowerCase('fr');
      if (!content.includes(query)) return false;
    }
    return true;
  });
}

function itemById(type, id) {
  return (type === 'pack' ? PACKS : PRODUCTS).find(item => item.id === id);
}

function productSearchText(product = {}) {
  return [
    product.group,
    product.category,
    product.type,
    product.section,
    product.name,
    product.title,
    product.description,
    product.detail,
    product.material,
    ...(product.tags || []),
  ].filter(Boolean).join(' ').toLocaleLowerCase('fr');
}

function getProductsByGender(gender) {
  return PRODUCTS.filter(product => {
    const rawGender = String(product.audience || product.gender || product.section || '').toLocaleLowerCase('fr');
    return rawGender ? rawGender === gender : true;
  });
}

function normalizeCategory(product) {
  const text = productSearchText(product);
  const clothingKeywords = ['vêtement', 'vetement', 'clothing', 'apparel', 't-shirt', 'tee-shirt', 'short', 'ensemble', 'pull', 'veste', 'polo', 'chemise', 'tenue', 'pantalon'];
  const footwearKeywords = ['chaussure', 'shoes', 'sneaker', 'basket', 'paire', 'claquette', 'slide', 'footwear', 'runner', 'running'];
  if (clothingKeywords.some(keyword => text.includes(keyword))) return 'clothing';
  if (footwearKeywords.some(keyword => text.includes(keyword))) return 'footwear';
  return 'bonus';
}

function getAvailableProducts(products) {
  return products.filter(product => {
    const status = STATUS[product.stockLevel];
    if (!status) return true;
    return status.available !== false;
  });
}

function getClothingProducts(gender) {
  return getAvailableProducts(getProductsByGender(gender)).filter(product => normalizeCategory(product) === 'clothing');
}

function getFootwearProducts(gender) {
  return getAvailableProducts(getProductsByGender(gender)).filter(product => normalizeCategory(product) === 'footwear');
}

function getBonusProducts(gender) {
  return getAvailableProducts(getProductsByGender(gender)).filter(product => normalizeCategory(product) === 'bonus');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('show'), 3100);
}

function isSnapchatConfigured() {
  return Boolean(CONFIG.snapchatUrl) || (CONFIG.snapchatUsername && !CONFIG.snapchatUsername.includes('TON_PSEUDO'));
}

function contactUrl(message = '') {
  if (CONFIG.enableWhatsapp && CONFIG.whatsappNumber && CONFIG.defaultContact === 'whatsapp') {
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  if (CONFIG.snapchatUrl) return CONFIG.snapchatUrl;
  return `https://www.snapchat.com/add/${encodeURIComponent(CONFIG.snapchatUsername)}`;
}

async function copyMessage(message) {
  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = message;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  }
}

async function sendOrder(message, reservationPayload = null) {
  const copied = await copyMessage(message);
  if (!isSnapchatConfigured() && CONFIG.defaultContact === 'snapchat') {
    showToast('Configure ton pseudo Snapchat dans script.js');
    return;
  }
  if (reservationPayload) submitVisionReservation(reservationPayload);
  showToast(copied ? '✓ Message copié — colle-le sur Snapchat' : 'Ouvre Snapchat pour envoyer ta demande');
  setTimeout(() => window.open(contactUrl(message), '_blank', 'noopener'), 250);
}

function openGenericContact() {
  if (!isSnapchatConfigured() && CONFIG.defaultContact === 'snapchat') {
    showToast('Configure ton pseudo Snapchat dans script.js');
    return;
  }
  window.open(contactUrl(), '_blank', 'noopener');
}

function buildOrderMessage(item, size, type, askOnly = false) {
  const label = type === 'pack' ? 'PACK VISION' : 'ARTICLE';
  if (askOnly) {
    return `Salut VISION, je suis intéressé(e) par ${item.id} — ${item.name}. Peux-tu me confirmer les tailles, couleurs et la disponibilité ?`;
  }
  const sizeText = size ? ` — Taille ${size}` : '';
  const lines = [
    `Salut VISION, je souhaite réserver ce ${label} :`,
    `${item.id} — ${item.name}${sizeText}`,
  ];
  if (hasKnownPrice(item)) lines.push(`Prix catalogue : ${formatPrice(item)}`);
  else lines.push('Je souhaite connaître le prix actuel.');
  lines.push(
    `Univers : ${audienceLabel()}`,
    '',
    'Peux-tu me confirmer la disponibilité et la livraison ?',
  );
  return lines.join('\n');
}


/* ─────────────────────────────────────────────────────────────────
   ⑦ SÉLECTION HOMME / FEMME
   ───────────────────────────────────────────────────────────────── */
function selectAudience(audience, { scroll = true } = {}) {
  if (!['homme', 'femme'].includes(audience)) return;
  state.audience = audience;
  packState.activeGender = audience;
  state.activeFilter = 'all';
  state.searchQuery = '';
  trackVisionEvent(`click_gender_${audience}`, { gender: audience });

  const gate = document.getElementById('audienceGate');
  const shell = document.getElementById('appShell');
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  if (gate) gate.hidden = true;
  if (shell) shell.hidden = false;
  setGateVideosPlaying(false);
  document.body.classList.remove('gate-open');
  document.body.dataset.audience = audience;

  const label = audienceLabel();
  document.getElementById('audienceSwitchLabel').textContent = label;
  document.getElementById('audienceHeroTitle').textContent = label.toUpperCase();
  document.getElementById('catalogEyebrow').textContent = 'Stock privé · Réservation Snap';

  renderFilters();
  renderProducts();
  renderPacks();
  initCounters();
  clearStickySelection();
  requestAnimationFrame(observeReveal);
  if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
}

function openAudienceGate() {
  closeModal();
  state.audience = null;
  clearStickySelection();
  document.getElementById('appShell').hidden = true;
  document.getElementById('audienceGate').hidden = false;
  document.body.classList.add('gate-open');
  document.body.removeAttribute('data-audience');
  window.scrollTo({ top: 0, behavior: 'auto' });
  setGateVideosPlaying(true);
}


/* ─────────────────────────────────────────────────────────────────
   ⑧ TICKER, FILTRES, PRODUITS
   ───────────────────────────────────────────────────────────────── */
function renderTicker() {
  const items = ['DROP ACTIF', 'STOCK PRIVÉ', 'RÉSERVATION SNAP', 'DERNIÈRES PIÈCES', 'PRIX PACK'];
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  track.innerHTML = [...items, ...items].map(item => `
    <div class="ticker-item"><span class="ticker-dot" aria-hidden="true"></span>${escHtml(item)}</div>
  `).join('');
}

function renderFilters() {
  const bar = document.getElementById('filterBar');
  if (!bar) return;
  bar.innerHTML = SPECIAL_FILTERS.map(filter => `
    <button class="filter-tab ${filter.key === 'packs' ? 'filter-tab-pack' : ''} ${state.activeFilter === filter.key ? 'active' : ''}"
      data-filter="${escHtml(filter.key)}" type="button" role="tab"
      aria-selected="${state.activeFilter === filter.key}">${escHtml(filter.label)}</button>
  `).join('');
}

function fallbackImageHTML(id) {
  return `<div class="card-img-fallback">${brandLockupHTML('brand-lockup-card')}<span class="fallback-id">PHOTO À AJOUTER · ${escHtml(id)}</span></div>`;
}

function productImageHTML(src, name, id, alt = name) {
  if (!src) return fallbackImageHTML(id);
  return `<img class="card-img" src="${escHtml(src)}" alt="${escHtml(alt)}" loading="lazy" data-fallback-id="${escHtml(id)}" />`;
}

function attachImageFallbacks(scope = document) {
  scope.querySelectorAll('img[data-fallback-id]').forEach(image => {
    image.addEventListener('error', () => {
      const template = document.createElement('template');
      template.innerHTML = fallbackImageHTML(image.dataset.fallbackId).trim();
      image.replaceWith(template.content.firstElementChild);
    }, { once: true });
  });
}

function renderProductCard(product) {
  const status = STATUS[product.stockLevel] || STATUS.medium;
  const oldPrice = hasDiscount(product) ? `<span class="card-old-price">${product.oldPrice}${CONFIG.currency}</span>` : '';
  const price = formatPrice(product);
  return `
    <article class="product-card reveal" role="listitem" data-id="${escHtml(product.id)}" data-group="${escHtml(product.group)}" tabindex="0"
      aria-label="${escHtml(product.name)} — ${price} — ${status.label}">
      <div class="card-img-wrap">
        ${productImageHTML(product.image, product.name, product.id, itemAltText(product))}
        <div class="card-status ${status.css}">${status.label}</div>
        ${product.topRequested ? '<div class="card-top-badge">Top</div>' : (product.isNew ? '<div class="card-top-badge">Nouveau</div>' : '')}
      </div>
      <div class="card-body">
        <span class="card-cat">${escHtml(displayCategory(product))}</span>
        <span class="card-name">${escHtml(product.name)}</span>
        <span class="card-sizes">${product.sizes.map(escHtml).join(' · ')}</span>
        <div class="card-foot">
          <div><span class="card-price ${hasKnownPrice(product) ? '' : 'price-on-request'}">${price}</span>${oldPrice}</div>
          <button class="card-btn" type="button" data-action="open" data-id="${escHtml(product.id)}" aria-label="Réserver ${escHtml(product.name)}">Réserver</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultCount');
  const title = document.getElementById('catalogTitle');
  const emptyMessage = document.getElementById('emptyMessage');
  if (!grid) return;
  const filtered = getFilteredProducts();
  const activeMeta = SPECIAL_FILTERS.find(filter => filter.key === state.activeFilter) || SPECIAL_FILTERS[0];

  if (title) title.textContent = `VISION ${audienceLabel()}`;
  if (emptyMessage) emptyMessage.textContent = state.searchQuery
    ? 'Aucun article trouvé'
    : `Aucun article — ${activeMeta.label}`;

  grid.innerHTML = filtered.map(renderProductCard).join('');
  grid.hidden = filtered.length === 0;
  if (empty) empty.hidden = filtered.length > 0;
  if (count) count.textContent = `${filtered.length} pièce${filtered.length > 1 ? 's' : ''}`;
  attachImageFallbacks(grid);
  requestAnimationFrame(observeReveal);
}


/* ─────────────────────────────────────────────────────────────────
   ⑨ PACKS VISION
   ───────────────────────────────────────────────────────────────── */
function packImageHTML(pack) {
  if (pack.image) {
    return `<img class="pack-img" src="${escHtml(pack.image)}" alt="${escHtml(itemAltText(pack, `Pack ${pack.name}`))}" loading="lazy" data-pack-fallback="${escHtml(pack.id)}" />`;
  }
  return `<div class="pack-img-fallback">${brandLockupHTML('brand-lockup-pack')}<small>OUTFIT · ${escHtml(pack.id)}</small></div>`;
}

function renderPackCard(pack) {
  const discounted = hasDiscount(pack);
  const saving = discounted ? Math.round((1 - pack.price / pack.oldPrice) * 100) : 0;
  const oldPrice = discounted ? `<span class="pack-old">${pack.oldPrice}${CONFIG.currency}</span>` : '';
  const savingBadge = discounted ? `<span class="pack-saving">-${saving}%</span>` : '';
  return `
    <article class="pack-card reveal" data-pack-id="${escHtml(pack.id)}">
      <div class="pack-img-wrap">${packImageHTML(pack)}</div>
      <div class="pack-content">
        <div class="pack-badge ${pack.badgeType === 'best' ? 'best' : ''}">${escHtml(pack.label)}</div>
        <h3 class="pack-name">${escHtml(pack.name)}</h3>
        <p class="pack-desc">${escHtml(pack.description)}</p>
        <div class="pack-items">${pack.itemLabels.map(item => `<div class="pack-item"><span class="pack-item-dot"></span><span>${escHtml(item)}</span></div>`).join('')}</div>
        <div class="pack-pricing"><span class="pack-price ${hasKnownPrice(pack) ? '' : 'price-on-request'}">${formatPrice(pack)}</span>${oldPrice}${savingBadge}</div>
        <div class="vision-referral-pack-note">
          <p>Pack éligible Vision Club : filleul -10 €, parrain +15 € crédit.</p>
          <button class="vision-referral-inline-btn" type="button" data-referral-open="filleul" data-referral-offer="pack">Activer l’offre Pack Outfit</button>
        </div>
        <button class="pack-cta" type="button" data-pack-action="open" data-pack-id="${escHtml(pack.id)}">Voir &amp; réserver le pack</button>
      </div>
    </article>`;
}

function getPackLists(gender) {
  return {
    clothing: getClothingProducts(gender),
    footwear: getFootwearProducts(gender),
    bonus: getBonusProducts(gender),
  };
}

function wrapIndex(index, length) {
  if (!length) return 0;
  return (index % length + length) % length;
}

function getPackMode(gender = state.audience) {
  return packState[gender]?.mode === 2 ? 2 : 3;
}

function setPackMode(gender, mode) {
  if (!['homme', 'femme'].includes(gender)) return;
  const cleanMode = Number(mode) === 2 ? 2 : 3;
  packState[gender].mode = cleanMode;
}

function initPackOutfit(gender = state.audience) {
  if (!['homme', 'femme'].includes(gender)) return null;
  const lists = getPackLists(gender);
  const active = packState[gender];
  active.mode = getPackMode(gender);

  active.clothingIndex = wrapIndex(active.clothingIndex, lists.clothing.length);
  active.footwearIndex = wrapIndex(active.footwearIndex, lists.footwear.length);
  active.bonusIndex = wrapIndex(active.bonusIndex, lists.bonus.length);
  active.selectedClothing = lists.clothing[active.clothingIndex] || null;
  active.selectedFootwear = lists.footwear[active.footwearIndex] || null;
  active.selectedBonus = active.mode === 3 ? (lists.bonus[active.bonusIndex] || null) : null;

  return { lists, active };
}

function packItemImageHTML(item, type) {
  if (!item) {
    return `<div class="vision-pack-img-fallback"><span aria-hidden="true">+</span><small>${type === 'bonus' ? 'Bonus bientôt' : 'Stock bientôt'}</small></div>`;
  }
  if (!item.image) {
    return `<div class="vision-pack-img-fallback">${brandLockupHTML('brand-lockup-pack')}<small>${escHtml(item.id)}</small></div>`;
  }
  return `<img class="vision-pack-item-img" src="${escHtml(item.image)}" alt="${escHtml(itemAltText(item))}" loading="lazy" data-pack-builder-fallback="${escHtml(item.id)}" data-pack-builder-type="${escHtml(type)}" />`;
}

function packItemBadge(item, status) {
  if (!item) return '';
  if (item.topRequested) return 'Top pack';
  if (status?.css === 'status-low') return 'Dernière pièce';
  if (item.group === 'shoes') return 'Se combine bien';
  return item.isNew ? 'Nouveau' : 'Stock limité';
}

function renderPackSelectorCard(gender, type, meta, items, index) {
  const item = items[index];
  const total = items.length;
  if (!item) {
    return `
      <article class="vision-pack-selector vision-smart-pack-card is-empty" data-pack-type="${escHtml(type)}">
        <div class="vision-pack-selector-top">
          <span>${escHtml(meta.step)}</span>
          <em>0 / 0</em>
        </div>
        <div class="vision-pack-empty">
          <strong>${escHtml(meta.label)} bientôt</strong>
          <p>Le prochain outfit arrive bientôt sur Snap.</p>
        </div>
      </article>`;
  }

  const status = statusForProduct(item);
  const price = formatPrice(item);
  const badge = packItemBadge(item, status);
  return `
    <article class="vision-pack-selector vision-smart-pack-card reveal" data-pack-type="${escHtml(type)}">
      <div class="vision-pack-selector-top">
        <span>${escHtml(meta.step)}</span>
        <em>${index + 1} / ${total}</em>
      </div>
      ${badge ? `<div class="vision-pack-card-badge">${escHtml(badge)}</div>` : ''}
      <div class="vision-pack-selector-body">
        <button class="vision-pack-arrow" type="button" data-pack-nav="${escHtml(type)}" data-pack-direction="-1" data-pack-gender="${escHtml(gender)}" aria-label="Article précédent ${escHtml(meta.label)}">‹</button>
        <div class="vision-pack-product">
          <div class="vision-pack-product-media">${packItemImageHTML(item, type)}</div>
          <div class="vision-pack-product-copy">
            <small>${escHtml(meta.label)}</small>
            <strong>${escHtml(item.name)}</strong>
            <span>${escHtml(productSizeLabel(item))}</span>
          </div>
        </div>
        <button class="vision-pack-arrow" type="button" data-pack-nav="${escHtml(type)}" data-pack-direction="1" data-pack-gender="${escHtml(gender)}" aria-label="Article suivant ${escHtml(meta.label)}">›</button>
      </div>
      <div class="vision-pack-selector-foot">
        <span class="vision-pack-status ${escHtml(status.css)}">${escHtml(status.label)}</span>
        <strong class="${hasKnownPrice(item) ? '' : 'price-on-request'}">${escHtml(price)}</strong>
      </div>
      <button class="vision-pack-add" type="button" data-pack-add="${escHtml(type)}" data-pack-gender="${escHtml(gender)}">Ajouter</button>
    </article>`;
}

function formatPackMoney(value, fallback = 'À confirmer') {
  return Number.isFinite(value) ? `${Math.round(value)}${PACK_CONFIG.currency}` : fallback;
}

function getSelectedPackItems(gender = state.audience) {
  const active = initPackOutfit(gender)?.active;
  if (!active) return [];
  return [
    active.selectedClothing,
    active.selectedFootwear,
    ...(active.mode === 3 ? [active.selectedBonus] : []),
  ].filter(Boolean);
}

function getPackPricing(gender = state.audience) {
  const selection = initPackOutfit(gender)?.active;
  if (!selection) return null;
  const mode = getPackMode(gender);
  const items = getSelectedPackItems(gender);
  const valid = Boolean(selection.selectedClothing && selection.selectedFootwear && (mode === 2 || selection.selectedBonus));
  const hasUnknownPrice = items.some(item => !hasKnownPrice(item));
  const originalPrice = !hasUnknownPrice ? items.reduce((sum, item) => sum + productPriceValue(item), 0) : null;
  const discountPercent = mode === 3 ? PACK_CONFIG.threeItemsDiscountPercent : PACK_CONFIG.twoItemsDiscountPercent;
  const discountRate = discountPercent / 100;
  const finalPrice = valid && Number.isFinite(originalPrice) ? Math.max(0, originalPrice * (1 - discountRate)) : null;
  const savings = Number.isFinite(originalPrice) && Number.isFinite(finalPrice) ? originalPrice - finalPrice : null;
  const savingPercent = Number.isFinite(savings) && Number.isFinite(originalPrice) && originalPrice > 0
    ? Math.round((savings / originalPrice) * 100)
    : discountPercent;
  return { valid, mode, selectedCount: items.length, hasUnknownPrice, originalPrice, finalPrice, savings, savingPercent, discountPercent, discountRate };
}

function updatePackPricing(gender = state.audience) {
  return getPackPricing(gender);
}

function generatePackSnapMessage(gender = state.audience) {
  const pack = initPackOutfit(gender)?.active;
  const pricing = updatePackPricing(gender);
  if (!pack || !pricing?.valid) return '';
  const label = gender === 'femme' ? 'Femme' : 'Homme';
  const items = getSelectedPackItems(gender);
  return [
    'Salut Vision, je veux réserver ce Pack Outfit :',
    '',
    `Section : ${label}`,
    `Format : Pack ${pricing.mode} articles`,
    '',
    ...items.map(item => `* ${item.name} — ${productSizeLabel(item)} — ${formatPrice(item)}`),
    '',
    `Total à l’unité : ${formatPackMoney(pricing.originalPrice)}`,
    `Prix Pack : ${formatPackMoney(pricing.finalPrice)}`,
    `Économie : ${formatPackMoney(pricing.savings)}`,
    '',
    'Mon Snap : @',
  ].join('\n');
}

function packReservationPayload(gender = state.audience) {
  const pack = initPackOutfit(gender)?.active;
  const pricing = updatePackPricing(gender);
  if (!pack) return null;
  return {
    source: 'Pack Outfit VISION',
    gender,
    mode: pricing?.mode || getPackMode(gender),
    selectedClothing: pack.selectedClothing?.name || '',
    selectedFootwear: pack.selectedFootwear?.name || '',
    selectedBonus: pack.selectedBonus?.name || '',
    packOriginalPrice: pricing?.originalPrice ?? 'Prix à confirmer',
    packFinalPrice: pricing?.finalPrice ?? 'Prix à confirmer',
    savings: pricing?.savings ?? 'Prix à confirmer',
  };
}

async function copyPackMessage(gender = state.audience) {
  const message = generatePackSnapMessage(gender);
  if (!message) {
    showToast('Pack Outfit à compléter.');
    return false;
  }
  const copied = await copyMessage(message);
  showToast(copied ? 'Message copié — envoie-le sur Snapchat pour bloquer ton pack.' : 'Message prêt pour Snapchat.');
  trackVisionEvent('copy_pack_message', { gender });
  return copied;
}

async function openSnapchatWithPack(gender = state.audience) {
  const message = generatePackSnapMessage(gender);
  if (!message) {
    showToast('Pack Outfit à compléter.');
    return;
  }
  trackVisionEvent('open_snapchat_pack', { gender });
  await sendOrder(message, packReservationPayload(gender));
}

function renderPackOutfitSection(gender = state.audience) {
  const root = document.getElementById('packOutfitRoot');
  if (!root || !['homme', 'femme'].includes(gender)) return;
  packState.activeGender = gender;

  const payload = initPackOutfit(gender);
  if (!payload) return;
  const { lists, active } = payload;
  const pricing = updatePackPricing(gender);
  const label = gender === 'femme' ? 'Femme' : 'Homme';
  const packReady = pricing?.valid;
  const mode = getPackMode(gender);
  const hasProducts = lists.clothing.length && lists.footwear.length && (mode === 2 || lists.bonus.length);
  const unitText = formatPackMoney(pricing?.originalPrice);
  const packText = formatPackMoney(pricing?.finalPrice);
  const savingText = formatPackMoney(pricing?.savings);
  const savingHeadline = Number.isFinite(pricing?.savings) && pricing.savings > 0
    ? `${savingText} économisés`
    : 'Prix par pièce optimisé';
  const discountText = Number.isFinite(pricing?.savings) && pricing.savings > 0
    ? `Économie active · -${pricing.savingPercent}%`
    : 'Avantage pack actif';

  document.getElementById('packEyebrow').textContent = 'Stock privé · Prix optimisé';
  document.getElementById('packTitle').textContent = 'Pack Outfit VISION';
  document.getElementById('packSubtitle').textContent = 'Compose 2 ou 3 pièces. Le prix par article descend.';

  if (!hasProducts) {
    root.innerHTML = `
      <div class="vision-pack-smart is-empty reveal">
        <div class="vision-pack-empty-premium">
          <span>Pack en préparation</span>
          <strong>Le prochain outfit arrive bientôt sur Snap.</strong>
          <a href="#stock" class="vision-pack-stock-link">Voir le stock actuel</a>
        </div>
      </div>`;
    requestAnimationFrame(observeReveal);
    return;
  }

  root.innerHTML = `
    <div class="vision-pack-smart is-mode-${mode} reveal" data-pack-builder="${escHtml(gender)}">
      <div class="vision-pack-smart-controls" aria-label="Choix rapide Pack Outfit">
        <div class="vision-pack-toggle" role="group" aria-label="Univers du pack">
          <button type="button" class="${gender === 'homme' ? 'active' : ''}" data-pack-gender-choice="homme" aria-pressed="${gender === 'homme'}">Homme</button>
          <button type="button" class="${gender === 'femme' ? 'active' : ''}" data-pack-gender-choice="femme" aria-pressed="${gender === 'femme'}">Femme</button>
        </div>
        <div class="vision-pack-toggle vision-pack-mode-toggle" role="group" aria-label="Nombre d’articles du pack">
          <button type="button" class="${mode === 2 ? 'active' : ''}" data-pack-mode="2" data-pack-gender="${escHtml(gender)}" aria-pressed="${mode === 2}">
            <span>Pack 2 articles</span><small>Prix par pièce réduit</small>
          </button>
          <button type="button" class="is-best ${mode === 3 ? 'active' : ''}" data-pack-mode="3" data-pack-gender="${escHtml(gender)}" aria-pressed="${mode === 3}">
            <span>Pack 3 articles</span><small>Meilleur deal</small>
          </button>
        </div>
      </div>

      <div class="vision-pack-benefit">
        <span>Pack gagnant</span>
        <strong>Plus tu ajoutes, plus c’est rentable</strong>
      </div>

      <div class="vision-pack-builder" aria-label="Builder Pack Outfit ${escHtml(label)}">
        ${renderPackSelectorCard(gender, 'clothing', { label: 'Pièce', step: 'Étape 1 · Pièce' }, lists.clothing, active.clothingIndex)}
        <div class="vision-pack-connector" aria-hidden="true">+</div>
        ${renderPackSelectorCard(gender, 'footwear', { label: 'Paire', step: 'Étape 2 · Paire' }, lists.footwear, active.footwearIndex)}
        ${mode === 3 ? `<div class="vision-pack-connector is-best" aria-hidden="true">+</div>${renderPackSelectorCard(gender, 'bonus', { label: 'Bonus', step: 'Étape 3 · Bonus' }, lists.bonus, active.bonusIndex)}` : ''}
      </div>

      <div class="vision-pack-economy" aria-label="Résumé économie Pack Outfit">
        <div class="vision-pack-economy-main">
          <span>${escHtml(discountText)}</span>
          <strong>${escHtml(savingHeadline)}</strong>
        </div>
        <div class="vision-pack-economy-grid">
          <div><span>À l’unité</span><strong>${escHtml(unitText)}</strong></div>
          <div><span>Prix Pack</span><strong>${escHtml(packText)}</strong></div>
          <div><span>Avantage</span><strong>${escHtml(savingText)}</strong></div>
        </div>
        ${pricing?.hasUnknownPrice ? '<p class="vision-pack-price-note">Économie réelle calculée dès que les prix sont confirmés.</p>' : ''}
        <div class="vision-pack-actions">
          <button class="vision-pack-copy" type="button" data-pack-copy="${escHtml(gender)}" ${packReady ? '' : 'disabled'}>Copier</button>
          <button class="vision-pack-snap" type="button" data-pack-snap="${escHtml(gender)}" ${packReady ? '' : 'disabled'}>Réserver mon pack sur Snap</button>
        </div>
        <small class="vision-pack-trust">VISION valide ton pack directement sur Snapchat.</small>
      </div>
    </div>`;

  root.querySelectorAll('img[data-pack-builder-fallback]').forEach(image => {
    image.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'vision-pack-img-fallback';
      fallback.innerHTML = `${brandLockupHTML('brand-lockup-pack')}<small>${escHtml(image.dataset.packBuilderFallback)}</small>`;
      image.replaceWith(fallback);
    }, { once: true });
  });

  requestAnimationFrame(observeReveal);
}

function updatePackVisual(gender = state.audience) {
  renderPackOutfitSection(gender);
}

function updatePackSelection(gender, type, direction) {
  if (!['homme', 'femme'].includes(gender) || !packState[gender]) return;
  const lists = getPackLists(gender);
  const key = `${type}Index`;
  if (!Object.prototype.hasOwnProperty.call(packState[gender], key)) return;
  const length = lists[type]?.length || 0;
  if (!length) return;
  packState[gender][key] = wrapIndex(packState[gender][key] + Number(direction || 1), length);
  initPackOutfit(gender);
  updatePackVisual(gender);
  setStickyPack(packState[gender], gender);
  trackVisionEvent(`change_pack_${type}`, { gender, direction });
}

function renderPacks() {
  renderPackOutfitSection(packState.activeGender || state.audience);
}


/* ─────────────────────────────────────────────────────────────────
   ⑩ BARRE DE RÉSERVATION + FICHE RAPIDE
   ───────────────────────────────────────────────────────────────── */
function productReservationPayload(product) {
  if (!product) return null;
  return {
    source: 'Produit VISION',
    gender: product.audience || state.audience || '',
    productId: product.id,
    productName: product.name,
    productPrice: hasKnownPrice(product) ? product.price : 'Prix à confirmer',
    productSize: state.selectedSize || productSizeLabel(product),
    productCategory: product.category || normalizeCategory(product),
  };
}

function generateProductSnapMessage(product) {
  if (!product) return '';
  const label = product.audience === 'femme' || state.audience === 'femme' ? 'Femme' : 'Homme';
  return [
    'Salut VISION, je veux réserver cet article :',
    `Section : ${label}`,
    `Article : ${product.name}`,
    `Taille : ${state.selectedSize || productSizeLabel(product)}`,
    `Prix : ${formatPrice(product)}`,
    'Disponibilité : à confirmer',
  ].join('\n');
}

async function copyProductMessage(product) {
  const message = generateProductSnapMessage(product);
  if (!message) {
    showToast('Article à sélectionner.');
    return false;
  }
  const copied = await copyMessage(message);
  showToast(copied ? 'Message copié — envoie-le sur Snapchat pour bloquer l’article.' : 'Message prêt pour Snapchat.');
  trackVisionEvent('copy_product_message', {
    gender: product?.audience || state.audience,
    productId: product?.id,
  });
  return copied;
}

async function openSnapchatWithProduct(product) {
  const message = generateProductSnapMessage(product);
  if (!message) return;
  trackVisionEvent('open_snapchat_product', {
    gender: product?.audience || state.audience,
    productId: product?.id,
  });
  await sendOrder(message, productReservationPayload(product));
}

function compatiblePackType(product) {
  const category = normalizeCategory(product);
  if (category === 'clothing') return 'clothing';
  if (category === 'footwear') return 'footwear';
  if (category === 'bonus') return 'bonus';
  return null;
}

function packAddButtonLabel(product) {
  const type = compatiblePackType(product);
  if (type === 'clothing') return 'Ajouter comme pièce principale';
  if (type === 'footwear') return 'Ajouter comme paire';
  if (type === 'bonus') return 'Ajouter comme bonus';
  return '';
}

function addProductToPack(product) {
  if (!product) return;
  const gender = product.audience || state.audience;
  const type = compatiblePackType(product);
  if (!['homme', 'femme'].includes(gender) || !type) {
    showToast('Article non compatible avec le Pack Outfit.');
    return;
  }

  const lists = getPackLists(gender);
  const list = lists[type] || [];
  const index = list.findIndex(item => item.id === product.id);
  if (index < 0) {
    showToast('Article indisponible dans le Pack Outfit.');
    return;
  }

  packState[gender][`${type}Index`] = index;
  initPackOutfit(gender);
  if (state.audience === gender) renderPacks();
  setStickyPack(packState[gender], gender);
  closeQuickProductSheet();
  showToast('Ajouté au Pack Outfit.');
  trackVisionEvent('add_product_to_pack', { gender, type, productId: product.id });

  window.setTimeout(() => {
    document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 180);
}

function reservationContextSummary(context = currentReservationContext) {
  if (context.type === 'product' && context.product) {
    return {
      kicker: 'VISION — Article sélectionné',
      title: '1 article sélectionné',
      meta: `${shortText(context.product.name, 42)} · ${formatPrice(context.product)}`,
      button: 'Réserver',
    };
  }

  if (context.type === 'pack' && context.gender) {
    const pricing = updatePackPricing(context.gender);
    const unit = formatPackMoney(pricing?.originalPrice);
    const price = formatPackMoney(pricing?.finalPrice);
    const savings = formatPackMoney(pricing?.savings);
    return {
      kicker: `VISION — Pack ${context.gender === 'femme' ? 'Femme' : 'Homme'}`,
      title: `${pricing?.selectedCount || 0} article${pricing?.selectedCount > 1 ? 's' : ''} sélectionné${pricing?.selectedCount > 1 ? 's' : ''}`,
      meta: pricing?.hasUnknownPrice
        ? `À l’unité : ${unit} · Prix pack activé`
        : `À l’unité : ${unit} · Pack : ${price} · Tu gardes ${savings}`,
      button: 'Réserver ce pack',
    };
  }

  return {
    kicker: 'VISION — Stock privé',
    title: 'Réservation rapide Snapchat',
    meta: 'Choisis une pièce ou compose ton pack.',
    button: 'Réserver sur Snap',
  };
}

function updateStickyReservationBar(context = currentReservationContext) {
  const sticky = document.getElementById('sticky');
  if (!sticky) return;
  const summary = reservationContextSummary(context);
  document.getElementById('stickyKicker').textContent = summary.kicker;
  document.getElementById('stickyTitle').textContent = summary.title;
  document.getElementById('stickyMeta').textContent = summary.meta;
  document.getElementById('stickyButtonLabel').textContent = summary.button;

  const shouldShow = Boolean(state.audience);
  sticky.classList.toggle('visible', shouldShow);
  sticky.setAttribute('aria-hidden', String(!shouldShow));
  sticky.dataset.context = context.type || 'none';
}

function setStickyProduct(product) {
  if (!product) return;
  currentReservationContext.type = 'product';
  currentReservationContext.gender = product.audience || state.audience;
  currentReservationContext.product = product;
  currentReservationContext.pack = null;
  currentReservationContext.message = generateProductSnapMessage(product);
  updateStickyReservationBar(currentReservationContext);
}

function setStickyPack(activePackState, gender = state.audience) {
  if (!['homme', 'femme'].includes(gender)) return;
  const pricing = updatePackPricing(gender);
  currentReservationContext.type = 'pack';
  currentReservationContext.gender = gender;
  currentReservationContext.product = null;
  currentReservationContext.pack = {
    ...activePackState,
    pricing,
  };
  currentReservationContext.message = generatePackSnapMessage(gender);
  updateStickyReservationBar(currentReservationContext);
}

function clearStickySelection() {
  currentReservationContext.type = 'none';
  currentReservationContext.gender = state.audience;
  currentReservationContext.product = null;
  currentReservationContext.pack = null;
  currentReservationContext.message = '';
  updateStickyReservationBar(currentReservationContext);
}

async function handleStickyReservationClick() {
  trackVisionEvent('sticky_bar_click', {
    type: currentReservationContext.type,
    gender: currentReservationContext.gender || state.audience,
    productId: currentReservationContext.product?.id,
  });

  if (currentReservationContext.type === 'product' && currentReservationContext.product) {
    await openSnapchatWithProduct(currentReservationContext.product);
    return;
  }

  if (currentReservationContext.type === 'pack' && currentReservationContext.gender) {
    await openSnapchatWithPack(currentReservationContext.gender);
    return;
  }

  openGenericContact();
}

function initStickyReservationBar() {
  updateStickyReservationBar(currentReservationContext);
}

function renderQuickProductContent(product) {
  return renderModalContent(product, 'product');
}

function openQuickProductSheet(product) {
  if (!product) return;
  setStickyProduct(product);
  trackVisionEvent('open_product_sheet', {
    gender: product.audience || state.audience,
    productId: product.id,
  });
  openModal(product.id, 'product');
}

function closeQuickProductSheet() {
  closeModal();
}


/* ─────────────────────────────────────────────────────────────────
   ⑪ MODAL PRODUIT / PACK
   ───────────────────────────────────────────────────────────────── */
function openModal(id, type = 'product') {
  const item = itemById(type, id);
  if (!item) return;
  state.activeItemId = id;
  state.activeItemType = type;
  state.selectedSize = item.sizes?.length === 1 ? item.sizes[0] : null;
  state.galleryIndex = 0;
  if (type === 'product') setStickyProduct(item);
  renderModalContent(item, type);

  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('modalClose')?.focus(), 40);
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  if (!document.body.classList.contains('gate-open')) document.body.style.overflow = '';
  state.activeItemId = null;
  state.activeItemType = null;
  state.selectedSize = null;
}

function getItemImages(item, type) {
  return type === 'product' && item.gallery?.length ? item.gallery : (item.image ? [item.image] : []);
}

function modalImageHTML(item, type) {
  const images = getItemImages(item, type);
  const image = images[state.galleryIndex];
  if (!image) return `<div class="modal-img-fallback">${brandLockupHTML('brand-lockup-modal')}<small>PHOTO À AJOUTER · ${escHtml(item.id)}</small></div>`;
  return `<img class="modal-img" src="${escHtml(image)}" alt="${escHtml(itemAltText(item))}" loading="lazy" data-modal-fallback="${escHtml(item.id)}" />`;
}

function modalGalleryNavHTML(item, type) {
  const images = getItemImages(item, type);
  if (images.length < 2) return '';
  return `<div class="modal-gallery-nav" role="tablist" aria-label="Photos du produit">
    ${images.map((_, index) => `<button class="gallery-dot ${index === state.galleryIndex ? 'active' : ''}" type="button" data-gallery-index="${index}" role="tab" aria-label="Photo ${index + 1}" aria-selected="${index === state.galleryIndex}"></button>`).join('')}
  </div>`;
}

function renderModalContent(item, type) {
  const content = document.getElementById('modalContent');
  if (!content) return;
  const isPack = type === 'pack';
  const status = STATUS[item.stockLevel] || STATUS.medium;
  const oldPrice = hasDiscount(item) ? `<span class="modal-old-price">${item.oldPrice}${CONFIG.currency}</span>` : '';
  const sizeLabel = isPack ? 'Combinaison de tailles' : 'Choisir la taille';
  const packButtonLabel = !isPack ? packAddButtonLabel(item) : '';
  const details = isPack
    ? [['Contenu', `${item.itemLabels?.length || 0} pièces`], ['Tarif', hasKnownPrice(item) ? formatPrice(item) : 'Sur demande']]
    : [['Matière', item.material], ['Coupe', item.fit], ['Couleur', (item.colors || []).join(' / ')], ['Détail', item.detail]];
  const quickTrust = !isPack
    ? `<div class="quick-trust">
        <div><span aria-hidden="true">◆</span><p>Stock privé</p></div>
        <div><span aria-hidden="true">◆</span><p>Réservation Snap</p></div>
        <div><span aria-hidden="true">◆</span><p>Dispo confirmée</p></div>
      </div>`
    : '';
  const referralInline = isPack
    ? `<div class="vision-referral-inline">
        <strong>Pack éligible Vision Club</strong>
        <p>Filleul -10 €, parrain +15 € crédit après validation Snapchat.</p>
        <button class="vision-referral-inline-btn" type="button" data-referral-open="filleul" data-referral-offer="pack">Activer l’offre Pack Outfit</button>
      </div>`
    : `<div class="vision-referral-inline">
        <strong>Parrainage Vision</strong>
        <p>Ton ami gagne -5 €, ton parrain reçoit +10 € crédit.</p>
        <button class="vision-referral-inline-btn" type="button" data-referral-open="filleul" data-referral-offer="article">Utiliser / créer un parrainage</button>
      </div>`;

  content.innerHTML = `
    <div class="modal-handle" aria-hidden="true"></div>
    <div class="modal-img-wrap" id="modalImgWrap">${modalImageHTML(item, type)}${modalGalleryNavHTML(item, type)}</div>
    <div class="modal-body">
      <div class="modal-status-row"><span class="modal-status ${status.css}">${status.label}</span><span class="modal-cat">${isPack ? 'Pack VISION' : escHtml(displayCategory(item))}</span></div>
      <h2 class="modal-name">${escHtml(item.name)}</h2>
      <div class="modal-id">${escHtml(item.id)} · ${audienceLabel()}</div>
      <div class="modal-price-row"><span class="modal-price ${hasKnownPrice(item) ? '' : 'price-on-request'}">${formatPrice(item)}</span>${oldPrice}</div>
      <p class="modal-description">${escHtml(item.description)}</p>
      ${isPack ? `<div class="modal-pack-items">${(item.itemLabels || []).map(label => `<span>+ ${escHtml(label)}</span>`).join('')}</div>` : ''}
      ${quickTrust}
      ${referralInline}
      <div class="modal-detail-grid">${details.map(([label, value]) => `<div><span>${escHtml(label)}</span><strong>${escHtml(value || 'À confirmer')}</strong></div>`).join('')}</div>
      <div class="modal-label" id="modalSizeLabel">${sizeLabel}<em>Choix requis</em></div>
      <div class="modal-sizes">${item.sizes.map(size => `<button class="size-chip ${state.selectedSize === size ? 'selected' : ''}" type="button" data-size="${escHtml(size)}" aria-pressed="${state.selectedSize === size}">${escHtml(size)}</button>`).join('')}</div>
      <div class="modal-actions">
        <button class="modal-btn-main" id="modalBtnMain" type="button">${isPack ? 'Réserver maintenant' : 'Réserver sur Snapchat'}</button>
        ${!isPack ? '<button class="modal-btn-copy" id="modalBtnCopy" type="button">Copier le message</button>' : ''}
        ${packButtonLabel ? `<button class="modal-btn-pack" id="modalBtnPack" type="button">${escHtml(packButtonLabel)}</button>` : ''}
        <button class="modal-btn-ask" id="modalBtnAsk" type="button">Demander la disponibilité</button>
        <button class="modal-btn-back" id="modalBtnBack" type="button">Retour au catalogue</button>
      </div>
    </div>`;

  const modalImage = content.querySelector('img[data-modal-fallback]');
  modalImage?.addEventListener('error', () => {
    modalImage.parentElement.innerHTML = `<div class="modal-img-fallback">${brandLockupHTML('brand-lockup-modal')}</div>`;
  }, { once: true });
  attachModalEvents(item, type);
}

function attachModalEvents(item, type) {
  document.querySelectorAll('.size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.selectedSize = chip.dataset.size;
      document.querySelectorAll('.size-chip').forEach(button => {
        const selected = button.dataset.size === state.selectedSize;
        button.classList.toggle('selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      document.getElementById('modalSizeLabel')?.classList.remove('error');
      if (type === 'product') setStickyProduct(item);
    });
  });

  document.getElementById('modalBtnMain')?.addEventListener('click', async () => {
    if (!state.selectedSize) {
      document.getElementById('modalSizeLabel')?.classList.add('error');
      showToast('Choisis ta taille avant de réserver');
      return;
    }
    if (type === 'product') await openSnapchatWithProduct(item);
    else await sendOrder(buildOrderMessage(item, state.selectedSize, type));
  });

  document.getElementById('modalBtnAsk')?.addEventListener('click', async () => {
    if (type === 'product') await sendOrder(generateProductSnapMessage(item), productReservationPayload(item));
    else await sendOrder(buildOrderMessage(item, null, type, true));
  });

  document.getElementById('modalBtnCopy')?.addEventListener('click', async () => {
    if (!state.selectedSize) {
      document.getElementById('modalSizeLabel')?.classList.add('error');
      showToast('Choisis ta taille avant de copier le message');
      return;
    }
    await copyProductMessage(item);
  });

  document.getElementById('modalBtnPack')?.addEventListener('click', () => {
    addProductToPack(item);
  });

  document.getElementById('modalBtnBack')?.addEventListener('click', () => {
    closeQuickProductSheet();
  });

  document.querySelectorAll('[data-gallery-index]').forEach(dot => {
    dot.addEventListener('click', () => {
      state.galleryIndex = Number(dot.dataset.galleryIndex);
      renderModalContent(item, type);
    });
  });

  const images = getItemImages(item, type);
  const imageWrap = document.getElementById('modalImgWrap');
  let touchStartX = null;
  if (imageWrap && images.length > 1) {
    imageWrap.addEventListener('touchstart', event => {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });
    imageWrap.addEventListener('touchend', event => {
      if (touchStartX === null) return;
      const distance = event.changedTouches[0].clientX - touchStartX;
      touchStartX = null;
      if (Math.abs(distance) < 40) return;
      const direction = distance < 0 ? 1 : -1;
      state.galleryIndex = (state.galleryIndex + direction + images.length) % images.length;
      renderModalContent(item, type);
    }, { passive: true });
  }
}


/* ─────────────────────────────────────────────────────────────────
   ⑪ REVEAL, SCROLL, ÉVÉNEMENTS
   ───────────────────────────────────────────────────────────────── */
let revealObserver = null;

function observeReveal() {
  const elements = document.querySelectorAll('.reveal:not(.visible)');
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .06, rootMargin: '0px 0px -24px 0px' });
  }
  elements.forEach(element => revealObserver.observe(element));
}

function initScrollBehavior() {
  const header = document.getElementById('header');
  const sticky = document.getElementById('sticky');
  const onScroll = () => {
    const scrolled = window.scrollY > 36;
    header?.classList.toggle('scrolled', scrolled);
    const stickyVisible = Boolean(state.audience) && (window.scrollY > 220 || currentReservationContext.type !== 'none' || window.matchMedia('(max-width: 760px)').matches);
    sticky?.classList.toggle('visible', stickyVisible);
    sticky?.setAttribute('aria-hidden', String(!stickyVisible));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function resetFilters() {
  state.activeFilter = 'all';
  state.searchQuery = '';
  document.getElementById('searchInput').value = '';
  renderFilters();
  renderProducts();
}

function initEvents() {
  document.querySelectorAll('.audience-choice[data-audience]').forEach(button => {
    if (button.dataset.audienceBound === 'true') return;
    button.dataset.audienceBound = 'true';
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      selectAudience(button.dataset.audience);
    });
  });

  document.addEventListener('click', event => {
    const audienceButton = event.target.closest('.audience-choice[data-audience]');
    if (audienceButton) {
      event.preventDefault();
      return selectAudience(audienceButton.dataset.audience);
    }

    const packNav = event.target.closest('[data-pack-nav]');
    if (packNav) {
      updatePackSelection(packNav.dataset.packGender, packNav.dataset.packNav, Number(packNav.dataset.packDirection));
      return;
    }

    const packCopy = event.target.closest('[data-pack-copy]');
    if (packCopy) {
      copyPackMessage(packCopy.dataset.packCopy);
      return;
    }

    const packSnap = event.target.closest('[data-pack-snap]');
    if (packSnap) {
      openSnapchatWithPack(packSnap.dataset.packSnap);
      return;
    }

    const packGenderChoice = event.target.closest('[data-pack-gender-choice]');
    if (packGenderChoice) {
      const gender = packGenderChoice.dataset.packGenderChoice;
      if (['homme', 'femme'].includes(gender)) {
        packState.activeGender = gender;
        renderPackOutfitSection(gender);
        setStickyPack(packState[gender], gender);
        trackVisionEvent('change_pack_gender', { gender });
      }
      return;
    }

    const packMode = event.target.closest('[data-pack-mode]');
    if (packMode) {
      const gender = packMode.dataset.packGender || packState.activeGender || state.audience;
      setPackMode(gender, Number(packMode.dataset.packMode));
      renderPackOutfitSection(gender);
      setStickyPack(packState[gender], gender);
      trackVisionEvent('change_pack_mode', { gender, mode: getPackMode(gender) });
      return;
    }

    const packAdd = event.target.closest('[data-pack-add]');
    if (packAdd) {
      const gender = packAdd.dataset.packGender || packState.activeGender || state.audience;
      initPackOutfit(gender);
      setStickyPack(packState[gender], gender);
      showToast('Pack validé — économie prête sur Snap.');
      trackVisionEvent('confirm_pack_item', { gender, type: packAdd.dataset.packAdd, mode: getPackMode(gender) });
      return;
    }

    if (event.target.closest('[data-sticky-reserve]')) {
      handleStickyReservationClick();
      return;
    }

    const filter = event.target.closest('[data-filter]');
    if (filter) {
      state.activeFilter = filter.dataset.filter;
      renderFilters();
      if (state.activeFilter === 'packs') {
        initPackOutfit(state.audience);
        setStickyPack(packState[state.audience], state.audience);
        trackVisionEvent('view_pack_outfit', { gender: state.audience, source: 'filter' });
        document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      renderProducts();
      return;
    }

    const cardButton = event.target.closest('[data-action="open"]');
    if (cardButton) {
      event.stopPropagation();
      openQuickProductSheet(itemById('product', cardButton.dataset.id));
      return;
    }

    const card = event.target.closest('.product-card');
    if (card) return openQuickProductSheet(itemById('product', card.dataset.id));

    const packButton = event.target.closest('[data-pack-action="open"]');
    if (packButton) return openModal(packButton.dataset.packId, 'pack');

    if (event.target.closest('.snap-trigger')) openGenericContact();
  });

  document.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.product-card')) {
      event.preventDefault();
      openQuickProductSheet(itemById('product', event.target.dataset.id));
    }
    if (event.key === 'Escape') closeModal();
  });

  document.getElementById('audienceSwitch')?.addEventListener('click', openAudienceGate);
  document.getElementById('resetFilters')?.addEventListener('click', resetFilters);
  document.getElementById('searchInput')?.addEventListener('input', event => {
    state.searchQuery = event.target.value.trim();
    if (state.activeFilter === 'packs') {
      state.activeFilter = 'all';
      renderFilters();
    }
    renderProducts();
  });

  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeModal();
  });
}

function initCounters() {
  const available = getAvailableCount();
  animateCounter(document.getElementById('heroCount'), available, 650);
  animateCounter(document.getElementById('countNum'), available, 520);
}

function init() {
  renderTicker();
  initSeamlessVideos();
  initScrollBehavior();
  initEvents();
  initStickyReservationBar();

  const directAudience = new URLSearchParams(window.location.search).get('univers');
  if (['homme', 'femme'].includes(directAudience)) selectAudience(directAudience, { scroll: false });
}

document.addEventListener('DOMContentLoaded', init);


/* ═══════════════════════════════════════════════════════════════════
   VISION CLUB — Parrainage Privé
   Module isolé : pseudos Snapchat, Formspree, partage et tracking local.
   ═══════════════════════════════════════════════════════════════════ */
(function initVisionReferralClub() {
  const VISION_FORMSPREE_ENDPOINT = "https://formspree.io/f/mdayoorr";
  const VISION_SNAP_URL = "https://snapchat.com/t/IqsAqeNC";

  const STORAGE_KEYS = {
    parrain: 'visionReferralParrainSnap',
    filleul: 'visionReferralFilleulSnap',
    from: 'visionReferralFrom',
    offer: 'visionReferralOffer',
    events: 'visionReferralEvents',
  };

  const OFFERS = {
    article: {
      label: 'Article au choix',
      filleulDiscount: '-5€',
      parrainCredit: '+10€ crédit Vision',
      description: 'Valable dès la première commande Vision validée.',
    },
    pack: {
      label: 'Pack Outfit',
      filleulDiscount: '-10€',
      parrainCredit: '+15€ crédit Vision',
      description: 'Le meilleur deal pour les looks complets.',
    },
  };

  const referralState = {
    mode: 'parrain',
    offer: 'article',
    parrainSnap: '',
    filleulSnap: '',
    detectedParrain: '',
    generatedUrl: '',
    isSubmitting: false,
    previousFocus: null,
    previousBodyOverflow: null,
  };

  function storageGet(key) {
    try {
      return window.localStorage.getItem(key) || '';
    } catch {
      return '';
    }
  }

  function storageSet(key, value) {
    try {
      if (value) window.localStorage.setItem(key, value);
      else window.localStorage.removeItem(key);
    } catch {
      // localStorage peut être indisponible dans certains navigateurs intégrés.
    }
  }

  function normalizeSnapUsername(value) {
    return String(value || '')
      .trim()
      .replace(/^@+/, '')
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9._-]/g, '')
      .slice(0, 32);
  }

  function formatSnapDisplay(value) {
    const snap = normalizeSnapUsername(value);
    return snap ? `@${snap}` : '';
  }

  function getParrainFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const directParrain = normalizeSnapUsername(params.get('parrain'));
    if (directParrain) return directParrain;

    const legacyRef = String(params.get('ref') || '').replace(/^VISION[-_]?/i, '');
    return normalizeSnapUsername(legacyRef);
  }

  function getReferralBaseUrl() {
    if (window.location.origin && window.location.origin !== 'null') {
      return `${window.location.origin}${window.location.pathname}`;
    }
    return window.location.href.split('?')[0].split('#')[0];
  }

  function buildReferralUrl(parrainSnap) {
    const snap = normalizeSnapUsername(parrainSnap);
    const url = new URL(getReferralBaseUrl(), window.location.href);
    url.searchParams.set('parrain', snap);
    return url.toString();
  }

  async function copyToClipboard(text) {
    if (!text) return false;
    if (typeof copyMessage === 'function') {
      try {
        return await copyMessage(text);
      } catch {
        // Fallback manuel ci-dessous.
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fallback manuel ci-dessous.
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      return copied;
    } catch {
      return false;
    }
  }

  function showVisionToast(message) {
    if (typeof showToast === 'function') {
      showToast(message);
      return;
    }
    console.info('VISION Referral:', message);
  }

  function compactPayload(payload) {
    try {
      return JSON.parse(JSON.stringify(payload, (key, value) => {
        if (typeof value === 'string' && value.length > 500) return `${value.slice(0, 500)}…`;
        return value;
      }));
    } catch {
      return {};
    }
  }

  function trackReferralEvent(eventName, payload = {}) {
    const event = {
      event: eventName,
      payload: compactPayload(payload),
      at: new Date().toISOString(),
    };

    try {
      const events = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.events) || '[]');
      events.push(event);
      window.localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events.slice(-50)));
    } catch {
      // Tracking local uniquement : si indisponible, on ne bloque jamais l'expérience.
    }
  }

  function getReferralModal() {
    return document.querySelector('[data-referral-modal]');
  }

  function isReferralModalOpen() {
    return getReferralModal()?.classList.contains('is-open') || false;
  }

  function setTriggersExpanded(isOpen) {
    document.querySelectorAll('[data-referral-trigger]').forEach(trigger => {
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  function lockPageScroll() {
    if (referralState.previousBodyOverflow === null) {
      referralState.previousBodyOverflow = document.body.style.overflow || '';
    }
    document.body.style.overflow = 'hidden';
  }

  function unlockPageScroll() {
    const productModalOpen = document.getElementById('modalOverlay')?.classList.contains('open');
    if (!document.body.classList.contains('gate-open') && !productModalOpen) {
      document.body.style.overflow = referralState.previousBodyOverflow || '';
    }
    referralState.previousBodyOverflow = null;
  }

  function setSubmitting(isSubmitting) {
    referralState.isSubmitting = Boolean(isSubmitting);
    document.querySelectorAll('[data-referral-send], [data-referral-validate], [data-referral-create-link], [data-referral-share], [data-referral-copy-link]').forEach(button => {
      button.disabled = referralState.isSubmitting;
    });
  }

  function selectReferralOffer(offerType) {
    const nextOffer = OFFERS[offerType] ? offerType : 'article';
    referralState.offer = nextOffer;
    storageSet(STORAGE_KEYS.offer, nextOffer);
    trackReferralEvent('referral_offer_selected', { offer: OFFERS[nextOffer].label });
    updateReferralUI();
    showVisionToast('Offre sélectionnée.');
  }

  function setReferralMode(mode) {
    referralState.mode = mode === 'filleul' ? 'filleul' : 'parrain';
    updateReferralUI();
  }

  function updateOfferCards() {
    document.querySelectorAll('[data-referral-offer-choice]').forEach(card => {
      const active = card.dataset.referralOfferChoice === referralState.offer;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-pressed', String(active));
    });
  }

  function updateModeTabs() {
    document.querySelectorAll('[data-referral-mode]').forEach(tab => {
      const active = tab.dataset.referralMode === referralState.mode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    document.querySelectorAll('[data-referral-pane]').forEach(pane => {
      pane.classList.toggle('is-active', pane.dataset.referralPane === referralState.mode);
    });
  }

  function updateDetectedBanners() {
    const detected = referralState.detectedParrain || '';
    document.querySelectorAll('[data-referral-detected]').forEach(banner => {
      banner.hidden = !detected;
    });
    document.querySelectorAll('[data-referral-detected-name]').forEach(node => {
      node.textContent = detected ? `Parrain détecté : ${formatSnapDisplay(detected)}` : 'Parrain détecté';
    });

    const panelNote = document.querySelector('[data-referral-panel-detected]');
    if (panelNote) panelNote.hidden = !detected;
    const panelName = document.querySelector('[data-referral-panel-detected-name]');
    if (panelName && detected) panelName.textContent = formatSnapDisplay(detected);

    document.querySelectorAll('[data-referral-parrain-field]').forEach(field => {
      field.hidden = Boolean(detected && referralState.mode === 'filleul');
    });
  }

  function updateReferralInputs() {
    const parrainInputs = document.querySelectorAll('[data-referral-input="parrain"], [data-referral-input="parrain-filleul"]');
    parrainInputs.forEach(input => {
      if (document.activeElement !== input) input.value = referralState.parrainSnap;
    });

    const filleulInput = document.querySelector('[data-referral-input="filleul"]');
    if (filleulInput && document.activeElement !== filleulInput) filleulInput.value = referralState.filleulSnap;
  }

  function updateGeneratedLink() {
    const generated = document.querySelector('[data-referral-generated]');
    const urlOutput = document.querySelector('[data-referral-generated-url]');
    const parrainOutput = document.querySelector('[data-referral-generated-parrain]');

    if (!generated) return;
    generated.hidden = !referralState.generatedUrl;
    if (urlOutput) urlOutput.textContent = referralState.generatedUrl || '';
    if (parrainOutput) parrainOutput.textContent = referralState.parrainSnap
      ? `Parrain : ${formatSnapDisplay(referralState.parrainSnap)}`
      : 'Parrain : @snap';
  }

  function updateReferralUI() {
    updateOfferCards();
    updateModeTabs();
    updateDetectedBanners();
    updateReferralInputs();
    updateGeneratedLink();
  }

  function focusReferralPanel() {
    const modal = getReferralModal();
    const target = referralState.mode === 'filleul'
      ? modal?.querySelector('[data-referral-input="filleul"]')
      : modal?.querySelector('[data-referral-input="parrain"]');
    setTimeout(() => (target || modal?.querySelector('[data-referral-close]'))?.focus(), 80);
  }

  function openReferralModal(mode = null, offerType = null) {
    const modal = getReferralModal();
    if (!modal) return;

    referralState.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (offerType && OFFERS[offerType]) referralState.offer = offerType;
    referralState.mode = mode || (referralState.detectedParrain ? 'filleul' : 'parrain');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    setTriggersExpanded(true);
    lockPageScroll();
    updateReferralUI();
    focusReferralPanel();
    trackReferralEvent('referral_modal_opened', {
      mode: referralState.mode,
      offer: OFFERS[referralState.offer].label,
      detected_parrain: formatSnapDisplay(referralState.detectedParrain),
    });
  }

  function closeReferralModal() {
    const modal = getReferralModal();
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    setTriggersExpanded(false);
    unlockPageScroll();
    referralState.previousFocus?.focus?.();
    referralState.previousFocus = null;
  }

  function ensureParrainSnap() {
    const snap = normalizeSnapUsername(referralState.parrainSnap);
    if (!snap) {
      showVisionToast('Ajoute ton Snapchat.');
      return '';
    }
    referralState.parrainSnap = snap;
    storageSet(STORAGE_KEYS.parrain, snap);
    return snap;
  }

  function createReferralLink() {
    const parrainSnap = ensureParrainSnap();
    if (!parrainSnap) return '';

    referralState.generatedUrl = buildReferralUrl(parrainSnap);
    storageSet(STORAGE_KEYS.parrain, parrainSnap);
    updateReferralUI();
    showVisionToast('Lien créé.');
    trackReferralEvent('referral_link_created', {
      parrain_snap: formatSnapDisplay(parrainSnap),
      referral_url: referralState.generatedUrl,
    });
    return referralState.generatedUrl;
  }

  function getCurrentReferralLink() {
    return referralState.generatedUrl || createReferralLink();
  }

  async function shareReferralLink() {
    const url = getCurrentReferralLink();
    if (!url) return;

    const sharePayload = {
      title: 'VISION Catalogue',
      text: 'Rejoins le catalogue privé VISION. Utilise mon Snap en parrain et profite de ton avantage.',
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
        showVisionToast('Catalogue partagé.');
      } else {
        await copyToClipboard(url);
        showVisionToast('Lien copié — envoie-le sur Snapchat.');
      }
      trackReferralEvent('referral_link_shared', {
        parrain_snap: formatSnapDisplay(referralState.parrainSnap),
        referral_url: url,
      });
    } catch (error) {
      if (error?.name !== 'AbortError') {
        await copyToClipboard(url);
        showVisionToast('Lien copié — envoie-le sur Snapchat.');
      }
    }
  }

  async function copyReferralLink() {
    const url = getCurrentReferralLink();
    if (!url) return;
    await copyToClipboard(url);
    showVisionToast('Lien copié.');
    trackReferralEvent('referral_link_copied', {
      parrain_snap: formatSnapDisplay(referralState.parrainSnap),
      referral_url: url,
    });
  }

  function buildSnapchatReferralMessage(mode = referralState.mode) {
    const offer = OFFERS[referralState.offer] || OFFERS.article;
    const parrain = formatSnapDisplay(referralState.parrainSnap);
    const filleul = formatSnapDisplay(referralState.filleulSnap);

    if (mode === 'filleul') {
      return [
        'Salut Vision, je veux utiliser le parrainage :',
        `Parrain : ${parrain}`,
        `Filleul : ${filleul}`,
        `Offre : ${offer.label}`,
      ].join('\n');
    }

    return [
      'Salut Vision, je veux activer mon lien de parrainage :',
      `Parrain : ${parrain}`,
      `Lien partagé : ${getCurrentReferralLink()}`,
      `Offre : ${offer.label}`,
    ].join('\n');
  }

  function buildReferralPayload(mode = referralState.mode) {
    const offer = OFFERS[referralState.offer] || OFFERS.article;
    const parrain = formatSnapDisplay(referralState.parrainSnap);
    const filleul = mode === 'filleul'
      ? formatSnapDisplay(referralState.filleulSnap)
      : '@filleul-à-valider';

    return {
      subject: `VISION Parrainage — ${offer.label} — ${parrain} → ${filleul}`,
      type: 'Parrainage Vision',
      mode: mode === 'filleul' ? 'Filleul' : 'Parrain',
      offer: offer.label,
      parrain_snap: parrain,
      filleul_snap: filleul,
      filleul_discount: offer.filleulDiscount,
      parrain_credit: offer.parrainCredit,
      referral_url: buildReferralUrl(referralState.parrainSnap),
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      submitted_at: new Date().toISOString(),
      status: 'À valider sur Snapchat',
    };
  }

  async function submitReferralToFormspree(payload) {
    if (!VISION_FORMSPREE_ENDPOINT) {
      trackReferralEvent('referral_formspree_submit_skipped', { reason: 'missing_endpoint' });
      return { ok: false, skipped: true };
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4500);

    try {
      const response = await fetch(VISION_FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Formspree submission failed');
      return { ok: true };
    } catch (error) {
      console.warn('VISION Formspree error:', error);
      return { ok: false, error };
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  function validateReferralFields(mode = referralState.mode) {
    referralState.parrainSnap = normalizeSnapUsername(referralState.parrainSnap);
    referralState.filleulSnap = normalizeSnapUsername(referralState.filleulSnap);

    if (!referralState.parrainSnap) {
      showVisionToast(mode === 'filleul' ? 'Ajoute le Snap du parrain.' : 'Ajoute ton Snapchat.');
      return false;
    }

    if (mode === 'filleul' && !referralState.filleulSnap) {
      showVisionToast('Ajoute ton Snapchat.');
      return false;
    }

    storageSet(STORAGE_KEYS.parrain, referralState.parrainSnap);
    storageSet(STORAGE_KEYS.filleul, referralState.filleulSnap);
    return true;
  }

  function openSnapchatVision() {
    trackReferralEvent('referral_snapchat_clicked', { url: VISION_SNAP_URL });
    const opened = window.open(VISION_SNAP_URL, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = VISION_SNAP_URL;
  }

  async function openSnapchatWithReferralMessage(mode = referralState.mode) {
    const message = buildSnapchatReferralMessage(mode);
    await copyToClipboard(message);
    openSnapchatVision();
    showVisionToast('Message copié — colle-le dans Snapchat.');
  }

  async function sendReferralToVision(mode = referralState.mode) {
    if (referralState.isSubmitting) return;

    const gotcha = document.querySelector('[data-referral-gotcha]')?.value.trim();
    if (gotcha) {
      trackReferralEvent('referral_formspree_submit_skipped', { reason: 'honeypot' });
      return;
    }

    if (!validateReferralFields(mode)) return;

    setSubmitting(true);
    const payload = buildReferralPayload(mode);
    const message = buildSnapchatReferralMessage(mode);
    trackReferralEvent('referral_formspree_submit_started', payload);

    const formspreeRequest = submitReferralToFormspree(payload)
      .then(result => {
        if (result.ok) {
          trackReferralEvent('referral_formspree_submit_success', payload);
          showVisionToast('Parrainage envoyé à Vision.');
        } else {
          trackReferralEvent('referral_formspree_submit_error', {
            subject: payload.subject,
            error: result.error?.message || 'Formspree unavailable',
          });
        }
        return result;
      });

    try {
      await copyToClipboard(message);
      showVisionToast('Message copié — colle-le dans Snapchat.');
      openSnapchatVision();
      await Promise.race([
        formspreeRequest,
        new Promise(resolve => window.setTimeout(resolve, 650)),
      ]);
    } catch {
      showVisionToast('Message prêt pour Vision.');
      openSnapchatVision();
    } finally {
      setSubmitting(false);
    }
  }

  function hydrateReferralState() {
    const urlParrain = getParrainFromUrl();
    const storedOffer = storageGet(STORAGE_KEYS.offer);
    referralState.offer = OFFERS[storedOffer] ? storedOffer : 'article';
    referralState.filleulSnap = normalizeSnapUsername(storageGet(STORAGE_KEYS.filleul));

    if (urlParrain) {
      referralState.parrainSnap = urlParrain;
      referralState.detectedParrain = urlParrain;
      referralState.mode = 'filleul';
      storageSet(STORAGE_KEYS.parrain, urlParrain);
      storageSet(STORAGE_KEYS.from, urlParrain);
      trackReferralEvent('referral_parrain_detected', {
        parrain_snap: formatSnapDisplay(urlParrain),
        page_url: window.location.href,
      });
      window.setTimeout(() => showVisionToast('Parrain détecté.'), 650);
      return;
    }

    referralState.parrainSnap = normalizeSnapUsername(storageGet(STORAGE_KEYS.parrain) || storageGet(STORAGE_KEYS.from));
  }

  function handleReferralInput(input) {
    const field = input.dataset.referralInput;
    const normalized = normalizeSnapUsername(input.value);

    if (field === 'parrain' || field === 'parrain-filleul') {
      if (referralState.parrainSnap !== normalized) referralState.generatedUrl = '';
      referralState.parrainSnap = normalized;
      storageSet(STORAGE_KEYS.parrain, normalized);
      trackReferralEvent('referral_parrain_snap_entered', { parrain_snap: formatSnapDisplay(normalized) });
      updateReferralUI();
      return;
    }

    if (field === 'filleul') {
      referralState.filleulSnap = normalized;
      storageSet(STORAGE_KEYS.filleul, normalized);
      trackReferralEvent('referral_filleul_snap_entered', { filleul_snap: formatSnapDisplay(normalized) });
    }
  }

  function bindReferralEvents() {
    document.addEventListener('click', event => {
      const trigger = event.target.closest('[data-referral-trigger]');
      if (trigger) {
        event.preventDefault();
        event.stopPropagation();
        openReferralModal();
        return;
      }

      const openButton = event.target.closest('[data-referral-open]');
      if (openButton) {
        event.preventDefault();
        event.stopPropagation();
        const mode = openButton.dataset.referralOpen || 'filleul';
        const offer = openButton.dataset.referralOffer || 'article';
        openReferralModal(mode, offer);
        return;
      }

      if (event.target.closest('[data-referral-close]')) {
        event.preventDefault();
        closeReferralModal();
        return;
      }

      const modeButton = event.target.closest('[data-referral-mode]');
      if (modeButton) {
        event.preventDefault();
        setReferralMode(modeButton.dataset.referralMode);
        return;
      }

      const offerCard = event.target.closest('[data-referral-offer-choice]');
      if (offerCard) {
        event.preventDefault();
        selectReferralOffer(offerCard.dataset.referralOfferChoice);
        return;
      }

      if (event.target.closest('[data-referral-create-link]')) {
        event.preventDefault();
        createReferralLink();
        return;
      }

      if (event.target.closest('[data-referral-share]')) {
        event.preventDefault();
        shareReferralLink();
        return;
      }

      if (event.target.closest('[data-referral-copy-link]')) {
        event.preventDefault();
        copyReferralLink();
        return;
      }

      if (event.target.closest('[data-referral-validate]')) {
        event.preventDefault();
        sendReferralToVision('filleul');
        return;
      }

      if (event.target.closest('[data-referral-send]')) {
        event.preventDefault();
        sendReferralToVision(referralState.mode);
      }
    });

    document.addEventListener('input', event => {
      const input = event.target.closest('[data-referral-input]');
      if (!input) return;
      handleReferralInput(input);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && isReferralModalOpen()) {
        event.preventDefault();
        event.stopPropagation();
        closeReferralModal();
      }
    }, true);
  }

  function bootReferralClub() {
    hydrateReferralState();
    bindReferralEvents();
    updateReferralUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootReferralClub);
  } else {
    bootReferralClub();
  }
})();
