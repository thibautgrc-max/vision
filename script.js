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
    id: 'VH-012', audience: 'homme', group: 'shoes', name: 'Sneakers Dior Runner — Gris', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Gris', 'Noir', 'Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-grey-pair.jpg',
    gallery: ['assets/products/men/sneakers-dior-b30-grey-pair.jpg', 'assets/products/men/sneakers-dior-b30-grey-double.jpg'],
    description: 'Paire de sneakers premium gris, noir et blanc, présentée avec coffret et éclairage studio violet.',
    material: 'Mesh technique · empiècements structurés', fit: 'Pointure normale', detail: 'Coffret inclus · silhouette running luxe',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-013', audience: 'homme', group: 'shoes', name: 'Sneakers Dior Runner — Noir & Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Noir', 'Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-black-white.jpg', gallery: [],
    description: 'Version noir et blanc au rendu graphique fort, cadrée proprement avec boîte Dior en arrière-plan.',
    material: 'Mesh respirant · panneaux contrastés', fit: 'Pointure normale', detail: 'Logo latéral graphique · semelle sport',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-014', audience: 'homme', group: 'shoes', name: 'Sneakers Dior Runner — Full White', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Blanc', 'Gris clair'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-dior-b30-white.jpg',
    gallery: ['assets/products/men/sneakers-dior-b30-white.jpg', 'assets/products/men/sneakers-dior-b30-white-single.jpg'],
    description: 'Déclinaison blanche très lumineuse, pensée pour les looks clean et les sélections premium sobres.',
    material: 'Mesh blanc · finitions ton sur ton', fit: 'Pointure normale', detail: 'Coffret inclus · détails brodés',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-015', audience: 'homme', group: 'shoes', name: 'Asics Gel-Kayano 14 — Bleu Glacier', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Blanc', 'Bleu glacier', 'Marine'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-asics-gel-kayano-blue.jpg', gallery: [],
    description: 'Sneaker running bleutée à finition technique, très visuelle avec coffret et reflet studio.',
    material: 'Mesh respirant · overlays métallisés', fit: 'Running fit', detail: 'Gel-Kayano style · confort quotidien',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-016', audience: 'homme', group: 'shoes', name: 'New Balance 1906R — Phantom Grey', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Gris anthracite', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-new-balance-grey.jpg', gallery: [],
    description: 'Silhouette New Balance sombre, profondeur graphite et détails techniques très lisibles.',
    material: 'Mesh · panneaux synthétiques', fit: 'Pointure normale', detail: 'Semelle technique · rendu graphite',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-017', audience: 'homme', group: 'shoes', name: 'New Balance 1906R — Blanc Premium', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Blanc', 'Gris clair'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-new-balance-white.jpg',
    gallery: ['assets/products/men/sneakers-new-balance-white.jpg', 'assets/products/men/sneakers-new-balance-white-1906.jpg'],
    description: 'Paire blanche au rendu studio très propre, adaptée aux looks minimalistes et premium.',
    material: 'Mesh blanc · renforts argentés', fit: 'Pointure normale', detail: 'Semelle confort · finitions claires',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-018', audience: 'homme', group: 'shoes', name: 'On Running Cloudmonster — Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Blanc', 'Gris', 'Bleu fumé'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-on-cloudmonster-white.jpg',
    gallery: ['assets/products/men/sneakers-on-cloudmonster-white.jpg', 'assets/products/men/sneakers-on-cloudtilt-blue.jpg'],
    description: 'Sneaker On Running claire, lisible et moderne, avec semelle Cloud très reconnaissable.',
    material: 'Mesh technique · semelle Cloud', fit: 'Running fit', detail: 'Boîte incluse · amorti sculpté',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-019', audience: 'homme', group: 'shoes', name: 'On Running Cloudtilt — Vert Minéral', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Vert minéral', 'Gris', 'Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-on-cloudtilt-green.jpg', gallery: [],
    description: 'Déclinaison vert minéral avec détails gris, idéale pour une sélection sport chic.',
    material: 'Mesh technique · panneaux translucides', fit: 'Running fit', detail: 'Semelle Cloud · look futuriste',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-020', audience: 'homme', group: 'shoes', name: 'On Running Cloudmonster — Noir & Blanc', category: 'Chaussures / Sneakers',
    price: null, oldPrice: null, sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Noir', 'Blanc', 'Gris'],
    stockLevel: 'inquiry', image: 'assets/products/men/sneakers-on-cloudmonster-black-white.jpg', gallery: [],
    description: 'Version noir et blanc plus affirmée, parfaite pour une sélection quotidienne sombre et sportive.',
    material: 'Mesh technique · semelle Cloud', fit: 'Running fit', detail: 'Colorway contrasté · boîte incluse',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-021', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Blanc & Noir', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blanc', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-white-black.jpg', gallery: [],
    description: 'Ensemble t-shirt blanc imprimé et short cargo noir, prêt pour une proposition pack complète.',
    material: 'Coton premium · short technique', fit: 'Coupe droite', detail: 'Badge cargo · look coordonné',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-022', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Blanc & Gris', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blanc', 'Gris'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-white-grey.jpg', gallery: [],
    description: 'T-shirt blanc graphique associé à un short gris clair, rendu propre et facile à projeter.',
    material: 'Coton premium · short cargo léger', fit: 'Coupe droite', detail: 'Ensemble coordonné · badge latéral',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-023', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Noir & Gris', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Noir', 'Gris'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-black-grey.jpg', gallery: [],
    description: 'Variation noire et grise, plus sombre, avec un contraste fort et une lecture immédiate.',
    material: 'Coton premium · short cargo léger', fit: 'Coupe droite', detail: 'T-shirt imprimé · short cargo',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-024', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Noir & Marine', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Noir', 'Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-black-navy.jpg', gallery: [],
    description: 'T-shirt noir associé à un short marine, très facile à porter et cohérent avec l’univers VISION.',
    material: 'Coton premium · short cargo léger', fit: 'Coupe droite', detail: 'Palette sombre · badge cargo',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-025', audience: 'homme', group: 'clothing', name: 'Ensemble Stone Island — Blanc & Marine', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blanc', 'Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-stone-island-white-navy.jpg', gallery: [],
    description: 'Une combinaison blanc et marine très nette, pensée pour composer rapidement un outfit complet.',
    material: 'Coton premium · short cargo léger', fit: 'Coupe droite', detail: 'Graphisme bleu · short marine',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-026', audience: 'homme', group: 'clothing', name: 'Ensemble Under Armour — Gris Performance', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Gris'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-grey.jpg', gallery: [],
    description: 'Set training gris composé d’un t-shirt technique et d’un short assorti à zips.',
    material: 'Textile performance respirant', fit: 'Coupe sport', detail: 'Poches zippées · motif ton sur ton',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-027', audience: 'homme', group: 'clothing', name: 'Ensemble Under Armour — Turquoise & Noir', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Turquoise', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-turquoise-black.jpg', gallery: [],
    description: 'Set sport turquoise et noir, visuel très identifiable pour une sélection estivale technique.',
    material: 'Textile performance respirant', fit: 'Coupe sport', detail: 'T-shirt imprimé · short noir zippé',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-028', audience: 'homme', group: 'clothing', name: 'Ensemble Under Armour — Noir Graphite', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Graphite', 'Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-dark.jpg', gallery: [],
    description: 'Version sombre graphite, très premium, avec détails techniques et contraste discret.',
    material: 'Textile performance respirant', fit: 'Coupe sport', detail: 'Motif marbré · short noir',
    featured: false, topRequested: true, isNew: true,
  },
  {
    id: 'VH-029', audience: 'homme', group: 'clothing', name: 'Ensemble Under Armour — Beige Sable', category: 'Vêtements / Ensembles',
    price: null, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Beige sable'],
    stockLevel: 'inquiry', image: 'assets/products/men/outfit-under-armour-beige.jpg', gallery: [],
    description: 'Set beige sable à la lecture douce, parfait pour diversifier une sélection sport premium.',
    material: 'Textile performance respirant', fit: 'Coupe sport', detail: 'T-shirt ton sur ton · short assorti',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-001', audience: 'homme', group: 'accessories', name: 'Enceinte Charge 6 — Noir', category: 'Audio',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/men/speaker-charge6-black.jpg', gallery: [],
    description: 'Enceinte portable au format généreux, présentée avec son coffret dans une finition noire discrète et premium.',
    material: 'Finition textile', fit: 'Format portable', detail: 'Bluetooth · autonomie annoncée 28 h',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-002', audience: 'homme', group: 'accessories', name: 'Enceinte Charge 6 — Bleu', category: 'Audio',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu nuit'],
    stockLevel: 'inquiry', image: 'assets/products/men/speaker-charge6-blue.jpg', gallery: [],
    description: 'La version bleu nuit de l’enceinte portable, mise en scène avec son coffret pour une lecture produit immédiate.',
    material: 'Finition textile', fit: 'Format portable', detail: 'Bluetooth · autonomie annoncée 28 h',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-003', audience: 'homme', group: 'accessories', name: 'Enceinte Charge 6 — Blanc', category: 'Audio',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/men/speaker-charge6-white.jpg', gallery: [],
    description: 'Une finition blanche lumineuse et épurée, accompagnée de son coffret et pensée pour un univers plus minimal.',
    material: 'Finition textile', fit: 'Format portable', detail: 'Bluetooth · autonomie annoncée 28 h',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-004', audience: 'homme', group: 'accessories', name: 'Casque Max — Bleu nuit', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu nuit'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-midnight.jpg', gallery: [],
    description: 'Casque circum-aural présenté avec son étui et son coffret, dans une finition bleu nuit profonde.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VH-005', audience: 'homme', group: 'accessories', name: 'Casque Max — Argent', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Argent'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-silver.jpg', gallery: [],
    description: 'Casque circum-aural dans une finition argent clair, livré avec son étui et présenté dans un décor sobre.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-006', audience: 'homme', group: 'accessories', name: 'Casque Max — Or', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Or'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-gold.jpg', gallery: [],
    description: 'Une déclinaison dorée au rendu chaleureux, avec étui coordonné et coffret de présentation.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VH-007', audience: 'homme', group: 'accessories', name: 'Casque Max — Graphite', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Graphite'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-graphite.jpg', gallery: [],
    description: 'Casque circum-aural graphite au rendu technique et discret, accompagné de son étui de transport.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-008', audience: 'homme', group: 'accessories', name: 'Casque Max — Cuivre', category: 'Casques',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Cuivre'],
    stockLevel: 'inquiry', image: 'assets/products/men/headphones-max-copper.jpg', gallery: [],
    description: 'Une finition cuivre expressive, mise en valeur par un cadrage produit complet avec étui et coffret.',
    material: 'Arceau textile · coques satinées', fit: 'Circum-aural', detail: 'Étui de transport inclus',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-009', audience: 'homme', group: 'fragrance', name: 'Baccarat Rouge 540 — 70 ml', category: 'Parfums',
    price: null, oldPrice: null, sizes: ['70 ml'], colors: ['Rouge · Or'],
    stockLevel: 'inquiry', image: 'assets/products/men/fragrance-baccarat-rouge-540.jpg', gallery: [],
    description: 'Flacon Baccarat Rouge 540 présenté dans son écrin rouge et or, avec une mise en scène sombre et raffinée.',
    material: 'Extrait de parfum', fit: 'Flacon 70 ml', detail: 'Écrin de présentation inclus',
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
    id: 'VF-001', audience: 'femme', group: 'clothing', name: 'Top Alo Sculpt — Bleu', category: 'Tops',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Bleu royal'],
    stockLevel: 'inquiry', image: 'assets/products/women/top-alo-blue.jpg', gallery: [],
    description: 'Top court à dos nageur et ligne athleisure nette, présenté dans une finition bleu royal intense.',
    material: 'Jersey technique extensible', fit: 'Ajusté', detail: 'Dos nageur · maintien près du corps',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-002', audience: 'femme', group: 'clothing', name: 'Top Alo Rib — Rouge', category: 'Tops',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Rouge profond'],
    stockLevel: 'inquiry', image: 'assets/products/women/top-alo-red.jpg', gallery: [],
    description: 'Top court côtelé à dos nageur, pensé pour une silhouette sportive et structurée.',
    material: 'Maille côtelée extensible', fit: 'Ajusté', detail: 'Finition côtelée · coupe courte',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-003', audience: 'femme', group: 'clothing', name: 'Top Alo Rib — Vert', category: 'Tops',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Vert émeraude'],
    stockLevel: 'inquiry', image: 'assets/products/women/top-alo-green.jpg', gallery: [],
    description: 'La déclinaison vert émeraude du top côtelé, avec un volume compact et une présence visuelle forte.',
    material: 'Maille côtelée extensible', fit: 'Ajusté', detail: 'Dos nageur · coupe courte',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-004', audience: 'femme', group: 'accessories', name: 'Supersonic — Noir', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Noir · Argent'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-supersonic-black.jpg', gallery: [],
    description: 'Sèche-cheveux Supersonic présenté avec son coffret et ses accessoires dans une finition noire sobre.',
    material: 'Finition satinée', fit: 'Format coiffure', detail: 'Diffuseur · concentrateurs · étui',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-005', audience: 'femme', group: 'accessories', name: 'Supersonic — Bleu & Cuivre', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu nuit · Cuivre'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-supersonic-blue-copper.jpg', gallery: [],
    description: 'Version bleu nuit et cuivre du Supersonic, mise en scène avec son coffret et ses embouts.',
    material: 'Finition satinée', fit: 'Format coiffure', detail: 'Diffuseur · concentrateurs · étui',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-006', audience: 'femme', group: 'accessories', name: 'Airwrap Complete Long — Violet', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Violet · Cuivre'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-airwrap-purple-copper.jpg', gallery: [],
    description: 'Coffret coiffure Airwrap Complete Long avec plusieurs embouts et rangement coordonné violet.',
    material: 'Finition satinée', fit: 'Coffret multi-styler', detail: 'Embouts coiffage · brosses · étui',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-007', audience: 'femme', group: 'accessories', name: 'Airwrap Complete Long — Argent', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Argent · Cuivre'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-airwrap-silver-copper.jpg', gallery: [],
    description: 'Coffret Airwrap Complete Long argent et cuivre, présenté avec ses accessoires de coiffage.',
    material: 'Finition métallisée', fit: 'Coffret multi-styler', detail: 'Embouts coiffage · brosses · étui',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-008', audience: 'femme', group: 'accessories', name: 'Airstrait — Bleu & Or', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Bleu nuit · Or'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-airstrait-blue-gold.jpg', gallery: [],
    description: 'Lisseur-sécheur Airstrait présenté dans son étui rigide, finition bleu nuit et détails dorés.',
    material: 'Finition satinée', fit: 'Format lisseur', detail: 'Étui rigide · câble intégré',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-009', audience: 'femme', group: 'accessories', name: 'Airstrait — Rose', category: 'Beauté & Électronique',
    price: null, oldPrice: null, sizes: ['Unique'], colors: ['Rose poudré'],
    stockLevel: 'inquiry', image: 'assets/products/women/hair-airstrait-rose.jpg', gallery: [],
    description: 'Déclinaison rose poudré du lisseur-sécheur Airstrait, accompagnée de son étui de rangement.',
    material: 'Finition satinée', fit: 'Format lisseur', detail: 'Étui rigide · câble intégré',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-010', audience: 'femme', group: 'clothing', name: 'Short Alo Flow — Noir', category: 'Shorts',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/shorts-alo-black.jpg', gallery: [],
    description: 'Short sport léger à taille élastiquée contrastée, conçu pour une silhouette athleisure épurée.',
    material: 'Textile technique léger', fit: 'Coupe running', detail: 'Taille élastiquée · côtés arrondis',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-011', audience: 'femme', group: 'clothing', name: 'Short Alo Flow — Blanc', category: 'Shorts',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/women/shorts-alo-white.jpg', gallery: [],
    description: 'Version blanche du short Flow, avec taille noire contrastée et coupe sportive courte.',
    material: 'Textile technique léger', fit: 'Coupe running', detail: 'Taille élastiquée · côtés arrondis',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-012', audience: 'femme', group: 'clothing', name: 'Ensemble Alo Studio — Noir', category: 'Ensembles',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/set-alo-black.jpg', gallery: [],
    description: 'Ensemble deux pièces composé d’un t-shirt ajusté et d’un pantalon fluide à jambe large.',
    material: 'Jersey souple', fit: 'Haut ajusté · bas fluide', detail: 'Deux pièces coordonnées',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-013', audience: 'femme', group: 'shoes', name: 'Sandales H — Noir', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['35', '36', '37', '38', '39', '40', '41', '42'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-black.jpg', gallery: [],
    description: 'Sandales plates noires à large découpe H, présentées dans un environnement marbre et orange.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Large bride H · semelle noire',
    featured: true, topRequested: true, isNew: true,
  },
  {
    id: 'VF-014', audience: 'femme', group: 'clothing', name: 'Ensemble Alo Studio — Kaki', category: 'Ensembles',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Kaki minéral'],
    stockLevel: 'inquiry', image: 'assets/products/women/set-alo-khaki.jpg', gallery: [],
    description: 'Ensemble t-shirt ajusté et pantalon fluide dans une tonalité kaki douce et contemporaine.',
    material: 'Jersey souple', fit: 'Haut ajusté · bas fluide', detail: 'Deux pièces coordonnées',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-015', audience: 'femme', group: 'shoes', name: 'Sandales H — Blanc', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['35', '36', '37', '38', '39', '40', '41', '42'], colors: ['Blanc'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-white.jpg', gallery: [],
    description: 'Sandales plates blanches à découpe H ton sur ton, dans une présentation nette et lumineuse.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Large bride H · semelle blanche',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-016', audience: 'femme', group: 'shoes', name: 'Sandales Lock — Blanc', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['35', '36', '37', '38', '39', '40', '41', '42'], colors: ['Blanc · Argent'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-lock-white.jpg', gallery: [],
    description: 'Sandales blanches à double bride, soulignées par un fermoir métallique central.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Double bride · fermoir métal',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-017', audience: 'femme', group: 'shoes', name: 'Sandales H Strap — Écru', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['35', '36', '37', '38', '39', '40', '41', '42'], colors: ['Écru · Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-contrast.jpg', gallery: [],
    description: 'Sandales contrastées avec découpe H écrue, semelle noire et bride de maintien réglable.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Bride H · maintien arrière',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-018', audience: 'femme', group: 'clothing', name: 'Ensemble Alo Studio — Marine', category: 'Ensembles',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/women/set-alo-navy.jpg', gallery: [],
    description: 'Ensemble coordonné bleu marine associant un haut ajusté et un pantalon fluide à jambe large.',
    material: 'Jersey souple', fit: 'Haut ajusté · bas fluide', detail: 'Deux pièces coordonnées',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-019', audience: 'femme', group: 'shoes', name: 'Sandales H — Brun', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['35', '36', '37', '38', '39', '40', '41', '42'], colors: ['Brun cognac'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-brown.jpg', gallery: [],
    description: 'Sandales à découpe H dans une teinte brun cognac, rehaussées de surpiqûres claires.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Bride H · surpiqûres contrastées',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-020', audience: 'femme', group: 'shoes', name: 'Sandales Lock — Cognac', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['35', '36', '37', '38', '39', '40', '41', '42'], colors: ['Cognac · Or'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-lock-cognac.jpg', gallery: [],
    description: 'Sandales cognac à double bride avec fermoir doré central et finitions ton sur ton.',
    material: 'Finition cuir lisse', fit: 'Forme plate', detail: 'Double bride · fermoir doré',
    featured: true, topRequested: false, isNew: true,
  },
  {
    id: 'VF-021', audience: 'femme', group: 'clothing', name: 'Short Alo Flow — Marine', category: 'Shorts',
    price: null, oldPrice: null, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Bleu marine'],
    stockLevel: 'inquiry', image: 'assets/products/women/shorts-alo-navy.jpg', gallery: [],
    description: 'Short Flow bleu marine à taille contrastée, léger et pensé pour un usage sport ou quotidien.',
    material: 'Textile technique léger', fit: 'Coupe running', detail: 'Taille élastiquée · côtés arrondis',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-022', audience: 'femme', group: 'shoes', name: 'Sandales H — Noir Grainé', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['35', '36', '37', '38', '39', '40', '41', '42'], colors: ['Noir'],
    stockLevel: 'inquiry', image: 'assets/products/women/sandals-h-black-marble.jpg', gallery: [],
    description: 'Sandales noires à découpe H et finition légèrement grainée, photographiées sur un fond marbré.',
    material: 'Finition grainée', fit: 'Forme plate', detail: 'Large bride H · semelle noire',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-023', audience: 'femme', group: 'shoes', name: 'Sandales Lock — Noir', category: 'Chaussures / Claquettes',
    price: null, oldPrice: null, sizes: ['35', '36', '37', '38', '39', '40', '41', '42'], colors: ['Noir · Or'],
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
    id: 'PH-003', audience: 'homme', name: 'Pack Street Runner Dior', label: 'Look complet', badgeType: 'best',
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
    id: 'PH-001', audience: 'homme', name: 'Pack Audio Nomade', label: 'Pack privé', badgeType: 'best',
    description: 'Le duo audio VISION : une enceinte portable et un casque coordonné dans une sélection sombre.',
    itemLabels: ['Enceinte Charge 6 — Noir', 'Casque Max — Graphite'],
    sizes: ['Pack unique'], price: null, oldPrice: null, stockLevel: 'inquiry', image: 'assets/products/men/speaker-charge6-black.jpg',
  },
  {
    id: 'PH-002', audience: 'homme', name: 'Duo Signature', label: 'Sélection parfum', badgeType: null,
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
  { key: 'all',         label: 'Nouveautés' },
  { key: 'clothing',    label: 'Vêtements' },
  { key: 'shoes',       label: 'Chaussures / Claquettes' },
  { key: 'fragrance',   label: 'Parfums' },
  { key: 'accessories', label: 'Accessoires & Électroniques' },
  { key: 'packs',       label: 'Packs complets' },
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

function hasKnownPrice(item) {
  return Number.isFinite(item?.price) && item.price > 0;
}

function formatPrice(item) {
  return hasKnownPrice(item) ? `${item.price}${CONFIG.currency}` : 'Prix sur demande';
}

function hasDiscount(item) {
  return hasKnownPrice(item) && Number.isFinite(item?.oldPrice) && item.oldPrice > item.price;
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

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('show'), 3100);
}

function isSnapchatConfigured() {
  return CONFIG.snapchatUsername && !CONFIG.snapchatUsername.includes('TON_PSEUDO');
}

function contactUrl(message = '') {
  if (CONFIG.enableWhatsapp && CONFIG.whatsappNumber && CONFIG.defaultContact === 'whatsapp') {
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
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

async function sendOrder(message) {
  const copied = await copyMessage(message);
  if (!isSnapchatConfigured() && CONFIG.defaultContact === 'snapchat') {
    showToast('Configure ton pseudo Snapchat dans script.js');
    return;
  }
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
  state.activeFilter = 'all';
  state.searchQuery = '';

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
  document.getElementById('catalogEyebrow').textContent = `Sélection privée ${label}`;

  renderFilters();
  renderProducts();
  renderPacks();
  initCounters();
  requestAnimationFrame(observeReveal);
  if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
}

function openAudienceGate() {
  closeModal();
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
  const items = ['DROP ACTIF', 'STOCK MIS À JOUR', 'VISUELS PRODUITS', 'RÉSERVATION DIRECTE', 'STOCK PRIVÉ', 'PACKS COMPLETS'];
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

function productImageHTML(src, name, id) {
  if (!src) return fallbackImageHTML(id);
  return `<img class="card-img" src="${escHtml(src)}" alt="${escHtml(name)}" loading="lazy" data-fallback-id="${escHtml(id)}" />`;
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
        ${productImageHTML(product.image, product.name, product.id)}
        <div class="card-status ${status.css}">${status.label}</div>
        ${product.topRequested ? '<div class="card-top-badge">Top</div>' : (product.isNew ? '<div class="card-top-badge">Nouveau</div>' : '')}
      </div>
      <div class="card-body">
        <span class="card-cat">${escHtml(product.category)}</span>
        <span class="card-name">${escHtml(product.name)}</span>
        <span class="card-sizes">${product.sizes.map(escHtml).join(' · ')}</span>
        <div class="card-foot">
          <div><span class="card-price ${hasKnownPrice(product) ? '' : 'price-on-request'}">${price}</span>${oldPrice}</div>
          <button class="card-btn" type="button" data-action="open" data-id="${escHtml(product.id)}" aria-label="Voir ${escHtml(product.name)}">Voir</button>
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

  if (title && state.activeFilter !== 'packs') title.textContent = activeMeta.label;
  if (emptyMessage) emptyMessage.textContent = state.searchQuery
    ? 'Aucun article ne correspond à cette recherche'
    : `Aucun article dans la catégorie ${activeMeta.label}`;

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
    return `<img class="pack-img" src="${escHtml(pack.image)}" alt="Pack ${escHtml(pack.name)}" loading="lazy" data-pack-fallback="${escHtml(pack.id)}" />`;
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

function renderPacks() {
  const grid = document.getElementById('packsGrid');
  if (!grid) return;
  grid.innerHTML = getAudiencePacks().map(renderPackCard).join('');
  grid.querySelectorAll('img[data-pack-fallback]').forEach(image => {
    image.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'pack-img-fallback';
      fallback.innerHTML = `${brandLockupHTML('brand-lockup-pack')}<small>OUTFIT · ${escHtml(image.dataset.packFallback)}</small>`;
      image.replaceWith(fallback);
    }, { once: true });
  });
  requestAnimationFrame(observeReveal);
}


/* ─────────────────────────────────────────────────────────────────
   ⑩ MODAL PRODUIT / PACK
   ───────────────────────────────────────────────────────────────── */
function openModal(id, type = 'product') {
  const item = itemById(type, id);
  if (!item) return;
  state.activeItemId = id;
  state.activeItemType = type;
  state.selectedSize = item.sizes?.length === 1 ? item.sizes[0] : null;
  state.galleryIndex = 0;
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
  return `<img class="modal-img" src="${escHtml(image)}" alt="${escHtml(item.name)}" loading="lazy" data-modal-fallback="${escHtml(item.id)}" />`;
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
  const details = isPack
    ? [['Contenu', `${item.itemLabels.length} pièces`], ['Tarif', hasKnownPrice(item) ? formatPrice(item) : 'Sur demande']]
    : [['Matière', item.material], ['Coupe', item.fit], ['Couleur', item.colors.join(' / ')], ['Détail', item.detail]];
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
      <div class="modal-status-row"><span class="modal-status ${status.css}">${status.label}</span><span class="modal-cat">${isPack ? 'Pack VISION' : escHtml(item.category)}</span></div>
      <h2 class="modal-name">${escHtml(item.name)}</h2>
      <div class="modal-id">${escHtml(item.id)} · ${audienceLabel()}</div>
      <div class="modal-price-row"><span class="modal-price ${hasKnownPrice(item) ? '' : 'price-on-request'}">${formatPrice(item)}</span>${oldPrice}</div>
      <p class="modal-description">${escHtml(item.description)}</p>
      ${isPack ? `<div class="modal-pack-items">${item.itemLabels.map(label => `<span>+ ${escHtml(label)}</span>`).join('')}</div>` : ''}
      ${referralInline}
      <div class="modal-detail-grid">${details.map(([label, value]) => `<div><span>${escHtml(label)}</span><strong>${escHtml(value)}</strong></div>`).join('')}</div>
      <div class="modal-label" id="modalSizeLabel">${sizeLabel}<em>Choix requis</em></div>
      <div class="modal-sizes">${item.sizes.map(size => `<button class="size-chip ${state.selectedSize === size ? 'selected' : ''}" type="button" data-size="${escHtml(size)}" aria-pressed="${state.selectedSize === size}">${escHtml(size)}</button>`).join('')}</div>
      <div class="modal-actions">
        <button class="modal-btn-main" id="modalBtnMain" type="button">Réserver maintenant</button>
        <button class="modal-btn-ask" id="modalBtnAsk" type="button">Demander la disponibilité</button>
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
    });
  });

  document.getElementById('modalBtnMain')?.addEventListener('click', async () => {
    if (!state.selectedSize) {
      document.getElementById('modalSizeLabel')?.classList.add('error');
      showToast('Choisis ta taille avant de réserver');
      return;
    }
    await sendOrder(buildOrderMessage(item, state.selectedSize, type));
  });

  document.getElementById('modalBtnAsk')?.addEventListener('click', async () => {
    await sendOrder(buildOrderMessage(item, null, type, true));
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
    const stickyVisible = Boolean(state.audience) && window.scrollY > 280;
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
  document.addEventListener('click', event => {
    const audienceButton = event.target.closest('.audience-choice[data-audience]');
    if (audienceButton) return selectAudience(audienceButton.dataset.audience);

    const filter = event.target.closest('[data-filter]');
    if (filter) {
      state.activeFilter = filter.dataset.filter;
      renderFilters();
      if (state.activeFilter === 'packs') {
        document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      renderProducts();
      return;
    }

    const cardButton = event.target.closest('[data-action="open"]');
    if (cardButton) {
      event.stopPropagation();
      openModal(cardButton.dataset.id, 'product');
      return;
    }

    const card = event.target.closest('.product-card');
    if (card) return openModal(card.dataset.id, 'product');

    const packButton = event.target.closest('[data-pack-action="open"]');
    if (packButton) return openModal(packButton.dataset.packId, 'pack');

    if (event.target.closest('.snap-trigger')) openGenericContact();
  });

  document.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.product-card')) {
      event.preventDefault();
      openModal(event.target.dataset.id, 'product');
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
