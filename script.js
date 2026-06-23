'use strict';

/* ═══════════════════════════════════════════════════════════════════
   VISION — Stock Privé
   script.js
   Catalogue mobile-first · Homme/Femme · Outfits · Snapchat CTA
   ═══════════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────────
   1. CONFIG
   Modifier ici avant déploiement
   ───────────────────────────────────────────────────────────────── */
const CONFIG = {
  brandName: 'VISION',
  snapchatUrl: 'https://www.snapchat.com/add/TON_PSEUDO',
  instagramUrl: '',
  whatsappNumber: '',
  defaultContact: 'snapchat',
  currency: '€',
  lastUpdate: 'Aujourd’hui',
  enableWhatsapp: false,
  storageKey: 'vision_selected_catalogue',
};


/* ─────────────────────────────────────────────────────────────────
   2. STATUS
   ───────────────────────────────────────────────────────────────── */
const STATUS = {
  high: {
    label: 'Disponible',
    css: 'status-high',
    available: true,
  },
  medium: {
    label: 'Disponible',
    css: 'status-medium',
    available: true,
  },
  low: {
    label: 'Dernières pièces',
    css: 'status-low',
    available: true,
  },
  reserved: {
    label: 'Réservé',
    css: 'status-reserved',
    available: false,
  },
  soon: {
    label: 'Bientôt',
    css: 'status-soon',
    available: false,
  },
};


/* ─────────────────────────────────────────────────────────────────
   3. PRODUCTS
   Modifier ici avec ton vrai stock
   audience : 'homme' | 'femme' | 'unisex'
   ───────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'VIS-H-001',
    name: 'Ensemble Carbon Fit',
    audience: 'homme',
    category: 'Ensembles',
    price: 45,
    oldPrice: null,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Noir'],
    stockLevel: 'low',
    image: 'assets/products/vis-h-001.jpg',
    gallery: [
      'assets/products/vis-h-001.jpg',
      'assets/products/vis-h-001-2.jpg',
      'assets/products/vis-h-001-3.jpg',
    ],
    description: 'Coupe structurée, look premium, stock limité.',
    featured: true,
    topRequested: true,
    isNew: false,
    createdAt: '2026-06-22',
  },
  {
    id: 'VIS-H-002',
    name: 'T-Shirt Heavy Oversize',
    audience: 'homme',
    category: 'T-shirts',
    price: 24,
    oldPrice: null,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Noir', 'Blanc', 'Gris'],
    stockLevel: 'high',
    image: 'assets/products/vis-h-002.jpg',
    gallery: [],
    description: 'Coton lourd, coupe oversize, tombé propre.',
    featured: false,
    topRequested: false,
    isNew: true,
    createdAt: '2026-06-22',
  },
  {
    id: 'VIS-H-003',
    name: 'Short Technical Drop',
    audience: 'homme',
    category: 'Shorts',
    price: 28,
    oldPrice: null,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Gris'],
    stockLevel: 'medium',
    image: 'assets/products/vis-h-003.jpg',
    gallery: [],
    description: 'Tissu léger, coupe active et finitions propres.',
    featured: false,
    topRequested: false,
    isNew: false,
    createdAt: '2026-06-18',
  },
  {
    id: 'VIS-H-004',
    name: 'Sneaker Runner Shadow',
    audience: 'homme',
    category: 'Chaussures',
    price: 69,
    oldPrice: 85,
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Blanc / Noir'],
    stockLevel: 'low',
    image: 'assets/products/vis-h-004.jpg',
    gallery: [],
    description: 'Silhouette runner, semelle épaisse, look street premium.',
    featured: true,
    topRequested: true,
    isNew: false,
    createdAt: '2026-06-15',
  },
  {
    id: 'VIS-H-005',
    name: 'Casquette Low Profile',
    audience: 'homme',
    category: 'Accessoires',
    price: 20,
    oldPrice: null,
    sizes: ['Unique'],
    colors: ['Noir', 'Beige'],
    stockLevel: 'high',
    image: 'assets/products/vis-h-005.jpg',
    gallery: [],
    description: 'Profil bas structuré, broderie discrète, facile à porter.',
    featured: false,
    topRequested: false,
    isNew: false,
    createdAt: '2026-06-10',
  },

  {
    id: 'VIS-F-001',
    name: 'Ensemble Sculpt Noir',
    audience: 'femme',
    category: 'Ensembles',
    price: 49,
    oldPrice: null,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Noir'],
    stockLevel: 'low',
    image: 'assets/products/vis-f-001.jpg',
    gallery: [
      'assets/products/vis-f-001.jpg',
      'assets/products/vis-f-001-2.jpg',
    ],
    description: 'Fit ajusté, silhouette propre, outfit prêt à porter.',
    featured: true,
    topRequested: true,
    isNew: true,
    createdAt: '2026-06-22',
  },
  {
    id: 'VIS-F-002',
    name: 'Top Essential Ribbed',
    audience: 'femme',
    category: 'Tops',
    price: 22,
    oldPrice: null,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blanc', 'Noir', 'Beige'],
    stockLevel: 'high',
    image: 'assets/products/vis-f-002.jpg',
    gallery: [],
    description: 'Matière côtelée, coupe nette, base premium quotidienne.',
    featured: false,
    topRequested: false,
    isNew: true,
    createdAt: '2026-06-22',
  },
  {
    id: 'VIS-F-003',
    name: 'Short Summer Cut',
    audience: 'femme',
    category: 'Shorts',
    price: 26,
    oldPrice: null,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'Noir'],
    stockLevel: 'medium',
    image: 'assets/products/vis-f-003.jpg',
    gallery: [],
    description: 'Coupe légère, rendu propre, parfait pour outfit été.',
    featured: false,
    topRequested: false,
    isNew: false,
    createdAt: '2026-06-18',
  },
  {
    id: 'VIS-F-004',
    name: 'Sneaker Soft Runner',
    audience: 'femme',
    category: 'Chaussures',
    price: 65,
    oldPrice: 79,
    sizes: ['36', '37', '38', '39', '40'],
    colors: ['Blanc / Gris'],
    stockLevel: 'low',
    image: 'assets/products/vis-f-004.jpg',
    gallery: [],
    description: 'Sneaker clean, facile à associer avec un look complet.',
    featured: true,
    topRequested: true,
    isNew: false,
    createdAt: '2026-06-15',
  },
  {
    id: 'VIS-F-005',
    name: 'Mini Bag Signature',
    audience: 'femme',
    category: 'Accessoires',
    price: 42,
    oldPrice: 55,
    sizes: ['Unique'],
    colors: ['Noir'],
    stockLevel: 'soon',
    image: 'assets/products/vis-f-005.jpg',
    gallery: [],
    description: 'Format compact, finition premium, bientôt disponible.',
    featured: false,
    topRequested: false,
    isNew: false,
    createdAt: '2026-06-22',
  },

  {
    id: 'VIS-U-001',
    name: 'Parfum Black Series',
    audience: 'unisex',
    category: 'Parfums',
    price: 35,
    oldPrice: null,
    sizes: ['100ml'],
    colors: ['Flacon noir'],
    stockLevel: 'medium',
    image: 'assets/products/vis-u-001.jpg',
    gallery: [],
    description: 'Notes boisées et musquées, présence propre et longue tenue.',
    featured: false,
    topRequested: false,
    isNew: true,
    createdAt: '2026-06-22',
  },
  {
    id: 'VIS-U-002',
    name: 'Parfum Fresh Daily',
    audience: 'unisex',
    category: 'Parfums',
    price: 29,
    oldPrice: null,
    sizes: ['50ml', '100ml'],
    colors: ['Flacon transparent'],
    stockLevel: 'high',
    image: 'assets/products/vis-u-002.jpg',
    gallery: [],
    description: 'Fraîcheur nette, idéal au quotidien.',
    featured: false,
    topRequested: false,
    isNew: false,
    createdAt: '2026-06-05',
  },
  {
    id: 'VIS-U-003',
    name: 'Crossbody Utility',
    audience: 'unisex',
    category: 'Accessoires',
    price: 39,
    oldPrice: 49,
    sizes: ['Unique'],
    colors: ['Noir'],
    stockLevel: 'low',
    image: 'assets/products/vis-u-003.jpg',
    gallery: [],
    description: 'Sac compact, pratique, facile à intégrer à un outfit.',
    featured: false,
    topRequested: true,
    isNew: false,
    createdAt: '2026-06-20',
  },
  {
    id: 'VIS-U-004',
    name: 'Audio Pocket Series',
    audience: 'unisex',
    category: 'Électronique',
    price: 35,
    oldPrice: null,
    sizes: ['Unique'],
    colors: ['Noir'],
    stockLevel: 'soon',
    image: 'assets/products/vis-u-004.jpg',
    gallery: [],
    description: 'Format compact, design discret, bientôt disponible.',
    featured: false,
    topRequested: false,
    isNew: false,
    createdAt: '2026-06-22',
  },
];


/* ─────────────────────────────────────────────────────────────────
   4. OUTFITS
   Modifier ici avec tes vrais looks complets
   ───────────────────────────────────────────────────────────────── */
const OUTFITS = [
  {
    id: 'OUT-H-001',
    name: 'Outfit Carbon Summer',
    audience: 'homme',
    label: 'Meilleur choix',
    badgeType: 'best',
    image: 'assets/outfits/out-h-001.jpg',
    gallery: [
      'assets/outfits/out-h-001.jpg',
      'assets/outfits/out-h-001-2.jpg',
    ],
    description: 'Look complet prêt à porter, pensé pour un rendu direct.',
    itemLabels: ['T-shirt heavy oversize', 'Short technical drop', 'Sneaker runner shadow'],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 89,
    oldPrice: 105,
    featured: true,
    stockLevel: 'low',
  },
  {
    id: 'OUT-H-002',
    name: 'Outfit Full Black Vision',
    audience: 'homme',
    label: 'Top demandé',
    badgeType: 'top',
    image: 'assets/outfits/out-h-002.jpg',
    gallery: [],
    description: 'Tenue noire complète avec silhouette street premium.',
    itemLabels: ['Ensemble carbon fit', 'Casquette low profile', 'Accessoire utility'],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 79,
    oldPrice: 92,
    featured: false,
    stockLevel: 'medium',
  },
  {
    id: 'OUT-F-001',
    name: 'Outfit Soft Street',
    audience: 'femme',
    label: 'Look prêt',
    badgeType: 'best',
    image: 'assets/outfits/out-f-001.jpg',
    gallery: [
      'assets/outfits/out-f-001.jpg',
      'assets/outfits/out-f-001-2.jpg',
    ],
    description: 'Look complet simple, propre, facile à porter.',
    itemLabels: ['Top essential ribbed', 'Short summer cut', 'Sneaker soft runner'],
    sizes: ['XS', 'S', 'M', 'L'],
    price: 85,
    oldPrice: 98,
    featured: true,
    stockLevel: 'low',
  },
  {
    id: 'OUT-F-002',
    name: 'Outfit Clean Beige',
    audience: 'femme',
    label: 'Drop complet',
    badgeType: 'drop',
    image: 'assets/outfits/out-f-002.jpg',
    gallery: [],
    description: 'Palette beige clean, silhouette premium et légère.',
    itemLabels: ['Top ribbed', 'Short summer cut', 'Mini accessoire'],
    sizes: ['XS', 'S', 'M', 'L'],
    price: 72,
    oldPrice: 86,
    featured: false,
    stockLevel: 'medium',
  },
  {
    id: 'OUT-U-001',
    name: 'Outfit Daily Essential',
    audience: 'unisex',
    label: 'Essentiel',
    badgeType: 'neutral',
    image: 'assets/outfits/out-u-001.jpg',
    gallery: [],
    description: 'Base simple, efficace, pensée pour tous les jours.',
    itemLabels: ['T-shirt premium', 'Accessoire utility', 'Parfum fresh daily'],
    sizes: ['S', 'M', 'L', 'XL'],
    price: 69,
    oldPrice: 82,
    featured: false,
    stockLevel: 'high',
  },
];


/* ─────────────────────────────────────────────────────────────────
   5. SPECIAL FILTERS
   ───────────────────────────────────────────────────────────────── */
const SPECIAL_FILTERS = [
  { key: 'all', label: 'Tous' },
  { key: 'new', label: 'Nouveautés' },
  { key: 'last', label: 'Dernières pièces' },
  { key: 'top', label: 'Top demandé' },
];


/* ─────────────────────────────────────────────────────────────────
   6. STATE
   ───────────────────────────────────────────────────────────────── */
const state = {
  activeCatalogue: null,
  activeFilter: 'all',
  searchQuery: '',
  activeProductId: null,
  activeOutfitId: null,
  selectedSize: null,
  productGalleryIndex: 0,
  outfitGalleryIndex: 0,
  toastTimer: null,
  searchTimer: null,
  revealObserver: null,
  lastFocusedElement: null,
};


/* ─────────────────────────────────────────────────────────────────
   7. DOM HELPERS
   ───────────────────────────────────────────────────────────────── */
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function byId(id) {
  return document.getElementById(id);
}

function exists(el) {
  return Boolean(el);
}

function setHidden(el, hidden = true) {
  if (!el) return;
  el.hidden = hidden;
  el.setAttribute('aria-hidden', String(hidden));
}

function setText(el, text = '') {
  if (!el) return;
  el.textContent = text;
}

function lockBody(lock = true) {
  document.body.style.overflow = lock ? 'hidden' : '';
}

function safeFocus(el) {
  if (!el || typeof el.focus !== 'function') return;
  window.setTimeout(() => el.focus(), 40);
}


/* ─────────────────────────────────────────────────────────────────
   8. TEXT / HTML HELPERS
   ───────────────────────────────────────────────────────────────── */
function escHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalize(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function formatPrice(value) {
  if (value === null || value === undefined || value === '') return '';
  return `${value}${CONFIG.currency}`;
}

function getStatus(key) {
  return STATUS[key] || STATUS.medium;
}

function getAudienceLabel(audience) {
  if (audience === 'homme') return 'Homme';
  if (audience === 'femme') return 'Femme';
  return 'Unisex';
}

function getSaving(oldPrice, price) {
  if (!oldPrice || !price || oldPrice <= price) {
    return { amount: 0, percent: 0 };
  }

  const amount = oldPrice - price;
  const percent = Math.round((amount / oldPrice) * 100);

  return { amount, percent };
}

function mediaHTML(src, name, fallbackId, className = 'card-img') {
  const safeSrc = escHtml(src || '');
  const safeName = escHtml(name || CONFIG.brandName);
  const safeId = escHtml(fallbackId || CONFIG.brandName);

  if (!safeSrc) {
    return `
      <div class="${className}-fallback">
        <span class="fallback-logo">${escHtml(CONFIG.brandName)}</span>
        <span class="fallback-id">${safeId}</span>
      </div>
    `;
  }

  return `
    <img
      class="${className}"
      src="${safeSrc}"
      alt="${safeName}"
      loading="lazy"
      decoding="async"
      onerror="this.hidden=true; this.nextElementSibling.hidden=false;"
    />
    <div class="${className}-fallback" hidden>
      <span class="fallback-logo">${escHtml(CONFIG.brandName)}</span>
      <span class="fallback-id">${safeId}</span>
    </div>
  `;
}

function animateCounter(el, target, duration = 800) {
  if (!el) return;

  const finalTarget = Number(target) || 0;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;

    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    el.textContent = String(Math.round(eased * finalTarget));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}


/* ─────────────────────────────────────────────────────────────────
   9. CATALOGUE SELECTION
   ───────────────────────────────────────────────────────────────── */
function isValidCatalogue(audience) {
  return audience === 'homme' || audience === 'femme';
}

function selectCatalogue(audience) {
  if (!isValidCatalogue(audience)) return;

  state.activeCatalogue = audience;
  state.activeFilter = 'all';
  state.searchQuery = '';
  state.selectedSize = null;
  state.productGalleryIndex = 0;
  state.outfitGalleryIndex = 0;

  setStoredCatalogue(audience);
  applyCatalogueSelection(true);
}

function resetCatalogueSelection() {
  state.activeCatalogue = null;
  state.activeFilter = 'all';
  state.searchQuery = '';
  state.selectedSize = null;
  state.activeProductId = null;
  state.activeOutfitId = null;

  removeStoredCatalogue();

  const genderGate = byId('genderGate');
  const appShell = byId('appShell');
  const catalogueBadge = byId('catalogueBadge');
  const changeBtn = byId('changeCatalogueBtn');
  const mobileChangeBtn = byId('mobileChangeCatalogueBtn');
  const searchInput = byId('searchInput');

  if (searchInput) searchInput.value = '';

  setHidden(genderGate, false);
  setHidden(appShell, true);
  setHidden(catalogueBadge, true);
  setHidden(changeBtn, true);
  setHidden(mobileChangeBtn, true);

  setText(byId('stickyLabel'), 'Choisir mon catalogue');

  closeMobileNav();
  closeProductModal();
  closeOutfitModal();

  window.setTimeout(() => {
    genderGate?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

function applyCatalogueSelection(shouldScroll = false) {
  if (!isValidCatalogue(state.activeCatalogue)) {
    resetCatalogueView();
    return;
  }

  const audience = state.activeCatalogue;
  const label = getAudienceLabel(audience);

  const genderGate = byId('genderGate');
  const appShell = byId('appShell');
  const catalogueBadge = byId('catalogueBadge');
  const changeBtn = byId('changeCatalogueBtn');
  const mobileChangeBtn = byId('mobileChangeCatalogueBtn');

  setHidden(genderGate, true);
  setHidden(appShell, false);
  setHidden(catalogueBadge, false);
  setHidden(changeBtn, false);
  setHidden(mobileChangeBtn, false);

  setText(catalogueBadge, label);
  setText(byId('heroTitle'), `VISION ${label.toUpperCase()}`);
  setText(byId('heroSubtitle'), `Catalogue ${label} · Photos réelles · Réservation directe`);
  setText(byId('stickyLabel'), 'Réserver sur Snapchat');

  const availableCount = getAvailableProducts().length;
  animateCounter(byId('heroCount'), availableCount, 900);

  renderFilters();
  renderProducts();
  renderOutfits();

  closeMobileNav();

  if (shouldScroll) {
    window.setTimeout(() => {
      byId('catalogueHero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  observeReveal();
}

function resetCatalogueView() {
  const genderGate = byId('genderGate');
  const appShell = byId('appShell');

  setHidden(genderGate, false);
  setHidden(appShell, true);
  setText(byId('stickyLabel'), 'Choisir mon catalogue');
}


/* ─────────────────────────────────────────────────────────────────
   10. URL + LOCALSTORAGE
   ───────────────────────────────────────────────────────────────── */
function getInitialCatalogueFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const queryCatalogue = normalize(params.get('catalogue') || '');
  const hashCatalogue = normalize(window.location.hash.replace('#', ''));

  if (isValidCatalogue(queryCatalogue)) return queryCatalogue;
  if (isValidCatalogue(hashCatalogue)) return hashCatalogue;

  return null;
}

function getStoredCatalogue() {
  try {
    const stored = window.localStorage.getItem(CONFIG.storageKey);
    return isValidCatalogue(stored) ? stored : null;
  } catch {
    return null;
  }
}

function setStoredCatalogue(audience) {
  try {
    window.localStorage.setItem(CONFIG.storageKey, audience);
  } catch {
    // localStorage non disponible : ignorer proprement.
  }
}

function removeStoredCatalogue() {
  try {
    window.localStorage.removeItem(CONFIG.storageKey);
  } catch {
    // localStorage non disponible : ignorer proprement.
  }
}


/* ─────────────────────────────────────────────────────────────────
   11. FILTERING
   ───────────────────────────────────────────────────────────────── */
function belongsToActiveCatalogue(item) {
  if (!state.activeCatalogue) return false;
  return item.audience === state.activeCatalogue || item.audience === 'unisex';
}

function getCatalogueProducts() {
  return PRODUCTS.filter(belongsToActiveCatalogue);
}

function getCatalogueOutfits() {
  return OUTFITS.filter(belongsToActiveCatalogue);
}

function getAvailableProducts() {
  return getCatalogueProducts().filter(product => getStatus(product.stockLevel).available);
}

function productMatchesFilter(product) {
  if (state.activeFilter === 'all') return true;
  if (state.activeFilter === 'new') return Boolean(product.isNew);
  if (state.activeFilter === 'last') return product.stockLevel === 'low';
  if (state.activeFilter === 'top') return Boolean(product.topRequested);
  return product.category === state.activeFilter;
}

function productMatchesSearch(product) {
  if (!state.searchQuery) return true;

  const q = normalize(state.searchQuery);
  const searchable = [
    product.id,
    product.name,
    product.category,
    product.description,
    ...(product.colors || []),
    ...(product.sizes || []),
  ].map(normalize).join(' ');

  return searchable.includes(q);
}

function getFilteredProducts() {
  return getCatalogueProducts()
    .filter(productMatchesFilter)
    .filter(productMatchesSearch);
}

function getDynamicCategories() {
  return [...new Set(getCatalogueProducts().map(product => product.category))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, 'fr'));
}

function resetFilters() {
  state.activeFilter = 'all';
  state.searchQuery = '';

  const searchInput = byId('searchInput');
  if (searchInput) searchInput.value = '';

  renderFilters();
  renderProducts();
}


/* ─────────────────────────────────────────────────────────────────
   12. TICKER
   ───────────────────────────────────────────────────────────────── */
function renderTicker() {
  const tickerTrack = byId('tickerTrack');
  if (!tickerTrack) return;

  const items = [
    'DROP ACTIF',
    'STOCK PRIVÉ',
    'PHOTOS RÉELLES',
    'RÉSERVATION DIRECTE',
    'OUTFITS VISION',
    'QUANTITÉS LIMITÉES',
    'SNAPCHAT DIRECT',
    CONFIG.lastUpdate ? `MIS À JOUR ${CONFIG.lastUpdate}` : 'STOCK MIS À JOUR',
  ];

  const doubled = [...items, ...items];

  tickerTrack.innerHTML = doubled.map(item => `
    <div class="ticker-item">
      <span class="ticker-dot" aria-hidden="true"></span>
      <span>${escHtml(item)}</span>
    </div>
  `).join('');
}


/* ─────────────────────────────────────────────────────────────────
   13. PRODUCT RENDERING
   ───────────────────────────────────────────────────────────────── */
function renderFilters() {
  const filterBar = byId('filterBar');
  if (!filterBar) return;

  const categoryFilters = getDynamicCategories().map(category => ({
    key: category,
    label: category,
  }));

  const filters = [...SPECIAL_FILTERS, ...categoryFilters];

  if (!filters.some(filter => filter.key === state.activeFilter)) {
    state.activeFilter = 'all';
  }

  filterBar.innerHTML = filters.map(filter => `
    <button
      class="filter-tab ${state.activeFilter === filter.key ? 'active' : ''}"
      type="button"
      role="tab"
      data-filter="${escHtml(filter.key)}"
      aria-selected="${state.activeFilter === filter.key}"
    >
      ${escHtml(filter.label)}
    </button>
  `).join('');
}

function renderProductCard(product) {
  const status = getStatus(product.stockLevel);
  const sizesText = (product.sizes || []).join(' · ');
  const colorsText = (product.colors || []).join(' · ');
  const hasOldPrice = Boolean(product.oldPrice && product.oldPrice > product.price);

  return `
    <article
      class="product-card reveal"
      role="listitem"
      tabindex="0"
      data-product-id="${escHtml(product.id)}"
      data-id="${escHtml(product.id)}"
      aria-label="${escHtml(product.name)} — ${formatPrice(product.price)} — ${escHtml(status.label)}"
    >
      <div class="card-img-wrap">
        ${mediaHTML(product.image, product.name, product.id, 'card-img')}

        <div class="card-status ${escHtml(status.css)}">
          ${escHtml(status.label)}
        </div>

        <div class="card-badges">
          ${product.topRequested ? '<span class="card-top-badge">Top</span>' : ''}
          ${product.isNew ? '<span class="card-new-badge">New</span>' : ''}
        </div>
      </div>

      <div class="card-body">
        <div class="card-line">
          <span class="card-cat">${escHtml(product.category)}</span>
          <span class="card-audience">${escHtml(getAudienceLabel(product.audience))}</span>
        </div>

        <h3 class="card-name">${escHtml(product.name)}</h3>

        ${sizesText ? `<p class="card-sizes">${escHtml(sizesText)}</p>` : ''}
        ${colorsText ? `<p class="card-colors">${escHtml(colorsText)}</p>` : ''}

        <div class="card-foot">
          <div class="card-pricing">
            <span class="card-price">${formatPrice(product.price)}</span>
            ${hasOldPrice ? `<span class="card-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>

          <button
            class="card-btn"
            type="button"
            data-product-action="open"
            data-id="${escHtml(product.id)}"
            aria-label="Voir ${escHtml(product.name)}"
          >
            Voir
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const productGrid = byId('productGrid');
  const emptyState = byId('emptyState');
  const resultCount = byId('resultCount');

  if (!productGrid) return;

  const products = getFilteredProducts();

  if (!products.length) {
    productGrid.innerHTML = '';
    setHidden(emptyState, false);
    setText(resultCount, '0 article');
    return;
  }

  setHidden(emptyState, true);

  productGrid.innerHTML = products.map(renderProductCard).join('');

  setText(
    resultCount,
    `${products.length} article${products.length > 1 ? 's' : ''}`
  );

  observeReveal();
}


/* ─────────────────────────────────────────────────────────────────
   14. OUTFIT RENDERING
   ───────────────────────────────────────────────────────────────── */
function renderOutfitCard(outfit) {
  const status = getStatus(outfit.stockLevel);
  const saving = getSaving(outfit.oldPrice, outfit.price);
  const items = (outfit.itemLabels || []).slice(0, 4);
  const hasOldPrice = Boolean(outfit.oldPrice && outfit.oldPrice > outfit.price);

  return `
    <article
      class="outfit-card reveal"
      role="listitem"
      tabindex="0"
      data-outfit-id="${escHtml(outfit.id)}"
      aria-label="${escHtml(outfit.name)} — ${formatPrice(outfit.price)}"
    >
      <div class="outfit-img-wrap">
        ${mediaHTML(outfit.image, outfit.name, outfit.id, 'outfit-img')}

        <div class="outfit-overlay" aria-hidden="true"></div>

        <div class="outfit-badge ${outfit.badgeType === 'best' ? 'best' : ''}">
          ${escHtml(outfit.label || 'Outfit')}
        </div>

        <div class="outfit-status ${escHtml(status.css)}">
          ${escHtml(status.label)}
        </div>
      </div>

      <div class="outfit-body">
        <div class="outfit-line">
          <span class="outfit-audience">${escHtml(getAudienceLabel(outfit.audience))}</span>
          ${saving.percent ? `<span class="outfit-saving">-${saving.percent}%</span>` : ''}
        </div>

        <h3 class="outfit-name">${escHtml(outfit.name)}</h3>

        <div class="outfit-items">
          ${items.map(item => `
            <span class="outfit-item">
              <span class="outfit-item-dot" aria-hidden="true"></span>
              ${escHtml(item)}
            </span>
          `).join('')}
        </div>

        <div class="outfit-foot">
          <div class="outfit-pricing">
            <span class="outfit-price">${formatPrice(outfit.price)}</span>
            ${hasOldPrice ? `<span class="outfit-old-price">${formatPrice(outfit.oldPrice)}</span>` : ''}
          </div>

          <button
            class="outfit-btn"
            type="button"
            data-outfit-action="open"
            data-id="${escHtml(outfit.id)}"
            aria-label="Voir l'outfit ${escHtml(outfit.name)}"
          >
            Voir l’outfit
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderOutfits() {
  const outfitsGrid = byId('outfitsGrid');
  if (!outfitsGrid) return;

  const outfits = getCatalogueOutfits();

  if (!outfits.length) {
    outfitsGrid.innerHTML = `
      <div class="outfit-empty">
        <span class="empty-glyph" aria-hidden="true">◎</span>
        <p>Aucun outfit disponible pour ce catalogue.</p>
      </div>
    `;
    return;
  }

  outfitsGrid.innerHTML = outfits.map(renderOutfitCard).join('');
  observeReveal();
}


/* ─────────────────────────────────────────────────────────────────
   15. PRODUCT MODAL
   ───────────────────────────────────────────────────────────────── */
function openProductModal(productId) {
  const product = PRODUCTS.find(item => item.id === productId);
  if (!product) return;

  state.activeProductId = productId;
  state.selectedSize = null;
  state.productGalleryIndex = 0;
  state.lastFocusedElement = document.activeElement;

  renderProductModal(product);

  const overlay = byId('modalOverlay');
  const closeBtn = byId('modalClose');

  if (!overlay) return;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  lockBody(true);
  safeFocus(closeBtn);
}

function closeProductModal() {
  const overlay = byId('modalOverlay');
  if (!overlay) return;

  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');

  state.activeProductId = null;
  state.selectedSize = null;
  state.productGalleryIndex = 0;

  if (!isAnyModalOpen()) {
    lockBody(false);
  }

  safeFocus(state.lastFocusedElement);
}

function renderProductModal(product) {
  const modalContent = byId('modalContent');
  if (!modalContent) return;

  const status = getStatus(product.stockLevel);
  const available = Boolean(status.available);
  const images = product.gallery?.length ? product.gallery : (product.image ? [product.image] : []);
  const currentImage = images[state.productGalleryIndex] || product.image || '';
  const hasGallery = images.length > 1;
  const hasOldPrice = Boolean(product.oldPrice && product.oldPrice > product.price);
  const sizes = product.sizes || [];
  const colors = product.colors || [];

  modalContent.innerHTML = `
    <div class="modal-handle" aria-hidden="true"></div>

    <div class="modal-img-wrap" id="productModalImgWrap">
      ${mediaHTML(currentImage, product.name, product.id, 'modal-img')}

      ${hasGallery ? `
        <div class="modal-gallery-nav" role="tablist" aria-label="Galerie produit">
          ${images.map((_, index) => `
            <button
              class="gallery-dot ${index === state.productGalleryIndex ? 'active' : ''}"
              type="button"
              data-product-gallery-index="${index}"
              role="tab"
              aria-label="Image ${index + 1}"
              aria-selected="${index === state.productGalleryIndex}"
            ></button>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <div class="modal-body">
      <div class="modal-status-row">
        <span class="modal-status ${escHtml(status.css)}">${escHtml(status.label)}</span>
        <span class="modal-cat">${escHtml(product.category)}</span>
        <span class="modal-audience">${escHtml(getAudienceLabel(product.audience))}</span>
      </div>

      <h2 class="modal-name">${escHtml(product.name)}</h2>
      <p class="modal-id">${escHtml(product.id)}</p>

      <div class="modal-price-row">
        <span class="modal-price">${formatPrice(product.price)}</span>
        ${hasOldPrice ? `<span class="modal-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
      </div>

      ${colors.length ? `
        <div class="modal-block">
          <div class="modal-label">Couleur</div>
          <div class="modal-tags">
            ${colors.map(color => `<span class="modal-tag">${escHtml(color)}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${sizes.length ? `
        <div class="modal-block">
          <div class="modal-label">Taille</div>
          <div class="modal-sizes">
            ${sizes.map(size => `
              <button
                class="size-chip"
                type="button"
                data-size="${escHtml(size)}"
                aria-pressed="false"
                aria-label="Choisir la taille ${escHtml(size)}"
              >
                ${escHtml(size)}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${product.description ? `
        <div class="modal-note">
          ${escHtml(product.description)}
        </div>
      ` : ''}

      <div class="modal-actions">
        <button
          class="modal-btn-main"
          id="modalBtnMain"
          type="button"
          aria-label="${available ? 'Réserver sur Snapchat' : 'Demander la disponibilité'}"
        >
          ${available ? 'Réserver sur Snapchat' : 'Demander disponibilité'}
        </button>

        <button
          class="modal-btn-ask"
          id="modalBtnAsk"
          type="button"
          aria-label="Demander la disponibilité"
        >
          Demander disponibilité
        </button>
      </div>
    </div>
  `;

  attachProductModalEvents(product);
}

function attachProductModalEvents(product) {
  const status = getStatus(product.stockLevel);
  const available = Boolean(status.available);

  $$('.size-chip', byId('modalContent') || document).forEach(chip => {
    chip.addEventListener('click', () => {
      state.selectedSize = chip.dataset.size || null;

      $$('.size-chip', byId('modalContent') || document).forEach(item => {
        const selected = item.dataset.size === state.selectedSize;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
    });
  });

  $$('.gallery-dot[data-product-gallery-index]', byId('modalContent') || document).forEach(dot => {
    dot.addEventListener('click', () => {
      state.productGalleryIndex = Number(dot.dataset.productGalleryIndex) || 0;
      renderProductModal(product);
    });
  });

  const mainBtn = byId('modalBtnMain');
  const askBtn = byId('modalBtnAsk');

  mainBtn?.addEventListener('click', async () => {
    const message = buildProductOrderMessage(product, state.selectedSize, !available);
    await sendOrder(message);
    closeProductModal();
  });

  askBtn?.addEventListener('click', async () => {
    const message = buildProductOrderMessage(product, null, true);
    await sendOrder(message);
    closeProductModal();
  });

  initGallerySwipe(
    byId('productModalImgWrap'),
    product.gallery?.length ? product.gallery.length : (product.image ? 1 : 0),
    direction => {
      const images = product.gallery?.length ? product.gallery : (product.image ? [product.image] : []);
      if (images.length <= 1) return;

      state.productGalleryIndex = (state.productGalleryIndex + direction + images.length) % images.length;
      renderProductModal(product);
    }
  );
}


/* ─────────────────────────────────────────────────────────────────
   16. OUTFIT MODAL
   ───────────────────────────────────────────────────────────────── */
function openOutfitModal(outfitId) {
  const outfit = OUTFITS.find(item => item.id === outfitId);
  if (!outfit) return;

  state.activeOutfitId = outfitId;
  state.selectedSize = null;
  state.outfitGalleryIndex = 0;
  state.lastFocusedElement = document.activeElement;

  renderOutfitModal(outfit);

  const overlay = byId('outfitModalOverlay');
  const closeBtn = byId('outfitModalClose');

  if (!overlay) return;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  lockBody(true);
  safeFocus(closeBtn);
}

function closeOutfitModal() {
  const overlay = byId('outfitModalOverlay');
  if (!overlay) return;

  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');

  state.activeOutfitId = null;
  state.selectedSize = null;
  state.outfitGalleryIndex = 0;

  if (!isAnyModalOpen()) {
    lockBody(false);
  }

  safeFocus(state.lastFocusedElement);
}

function renderOutfitModal(outfit) {
  const modalContent = byId('outfitModalContent');
  if (!modalContent) return;

  const status = getStatus(outfit.stockLevel);
  const images = outfit.gallery?.length ? outfit.gallery : (outfit.image ? [outfit.image] : []);
  const currentImage = images[state.outfitGalleryIndex] || outfit.image || '';
  const hasGallery = images.length > 1;
  const sizes = outfit.sizes || [];
  const items = outfit.itemLabels || [];
  const saving = getSaving(outfit.oldPrice, outfit.price);
  const hasOldPrice = Boolean(outfit.oldPrice && outfit.oldPrice > outfit.price);

  modalContent.innerHTML = `
    <div class="modal-handle" aria-hidden="true"></div>

    <div class="modal-img-wrap outfit-modal-img-wrap" id="outfitModalImgWrap">
      ${mediaHTML(currentImage, outfit.name, outfit.id, 'modal-img')}

      ${hasGallery ? `
        <div class="modal-gallery-nav" role="tablist" aria-label="Galerie outfit">
          ${images.map((_, index) => `
            <button
              class="gallery-dot ${index === state.outfitGalleryIndex ? 'active' : ''}"
              type="button"
              data-outfit-gallery-index="${index}"
              role="tab"
              aria-label="Image ${index + 1}"
              aria-selected="${index === state.outfitGalleryIndex}"
            ></button>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <div class="modal-body">
      <div class="modal-status-row">
        <span class="modal-status ${escHtml(status.css)}">${escHtml(status.label)}</span>
        <span class="modal-cat">${escHtml(outfit.label || 'Outfit')}</span>
        <span class="modal-audience">${escHtml(getAudienceLabel(outfit.audience))}</span>
      </div>

      <h2 class="modal-name">${escHtml(outfit.name)}</h2>
      <p class="modal-id">${escHtml(outfit.id)}</p>

      ${outfit.description ? `
        <div class="modal-note">
          ${escHtml(outfit.description)}
        </div>
      ` : ''}

      ${items.length ? `
        <div class="modal-block">
          <div class="modal-label">Inclus dans l’outfit</div>
          <div class="modal-list">
            ${items.map(item => `
              <div class="modal-list-item">
                <span class="modal-list-dot" aria-hidden="true"></span>
                <span>${escHtml(item)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${sizes.length ? `
        <div class="modal-block">
          <div class="modal-label">Taille</div>
          <div class="modal-sizes">
            ${sizes.map(size => `
              <button
                class="size-chip"
                type="button"
                data-size="${escHtml(size)}"
                aria-pressed="false"
                aria-label="Choisir la taille ${escHtml(size)}"
              >
                ${escHtml(size)}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="modal-price-row outfit-price-row">
        <span class="modal-price">${formatPrice(outfit.price)}</span>
        ${hasOldPrice ? `<span class="modal-old-price">${formatPrice(outfit.oldPrice)}</span>` : ''}
        ${saving.amount ? `
          <span class="modal-saving">
            Économie ${formatPrice(saving.amount)}${saving.percent ? ` · -${saving.percent}%` : ''}
          </span>
        ` : ''}
      </div>

      <div class="modal-actions">
        <button
          class="modal-btn-main"
          id="outfitModalBtnMain"
          type="button"
          aria-label="Réserver l’outfit sur Snapchat"
        >
          Réserver l’outfit sur Snapchat
        </button>
      </div>
    </div>
  `;

  attachOutfitModalEvents(outfit);
}

function attachOutfitModalEvents(outfit) {
  $$('.size-chip', byId('outfitModalContent') || document).forEach(chip => {
    chip.addEventListener('click', () => {
      state.selectedSize = chip.dataset.size || null;

      $$('.size-chip', byId('outfitModalContent') || document).forEach(item => {
        const selected = item.dataset.size === state.selectedSize;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
    });
  });

  $$('.gallery-dot[data-outfit-gallery-index]', byId('outfitModalContent') || document).forEach(dot => {
    dot.addEventListener('click', () => {
      state.outfitGalleryIndex = Number(dot.dataset.outfitGalleryIndex) || 0;
      renderOutfitModal(outfit);
    });
  });

  const mainBtn = byId('outfitModalBtnMain');

  mainBtn?.addEventListener('click', async () => {
    const message = buildOutfitOrderMessage(outfit, state.selectedSize);
    await sendOrder(message);
    closeOutfitModal();
  });

  initGallerySwipe(
    byId('outfitModalImgWrap'),
    outfit.gallery?.length ? outfit.gallery.length : (outfit.image ? 1 : 0),
    direction => {
      const images = outfit.gallery?.length ? outfit.gallery : (outfit.image ? [outfit.image] : []);
      if (images.length <= 1) return;

      state.outfitGalleryIndex = (state.outfitGalleryIndex + direction + images.length) % images.length;
      renderOutfitModal(outfit);
    }
  );
}

function initGallerySwipe(element, length, callback) {
  if (!element || length <= 1 || typeof callback !== 'function') return;

  let startX = null;

  element.addEventListener('touchstart', event => {
    startX = event.touches?.[0]?.clientX ?? null;
  }, { passive: true });

  element.addEventListener('touchend', event => {
    if (startX === null) return;

    const endX = event.changedTouches?.[0]?.clientX ?? startX;
    const delta = endX - startX;

    startX = null;

    if (Math.abs(delta) < 40) return;

    callback(delta < 0 ? 1 : -1);
  }, { passive: true });
}

function isAnyModalOpen() {
  return Boolean(
    byId('modalOverlay')?.classList.contains('open') ||
    byId('outfitModalOverlay')?.classList.contains('open')
  );
}


/* ─────────────────────────────────────────────────────────────────
   17. ORDER / SNAPCHAT LOGIC
   ───────────────────────────────────────────────────────────────── */
function buildProductOrderMessage(product, size, askOnly = false) {
  if (askOnly) {
    return `Salut, je suis intéressé par ${product.id} — ${product.name}. Quelles tailles / couleurs sont disponibles ?`;
  }

  const sizePart = size && size !== 'Unique' ? ` Taille : ${size}.` : '';

  return `Salut, je veux réserver : ${product.id} — ${product.name}.${sizePart} Disponible ?`;
}

function buildOutfitOrderMessage(outfit, size) {
  const sizePart = size && size !== 'Unique' ? ` Taille : ${size}.` : '';

  return `Salut, je veux réserver l’outfit VISION : ${outfit.id} — ${outfit.name}.${sizePart} Disponible ?`;
}

async function sendOrder(message) {
  const finalMessage = String(message || '').trim();

  if (!finalMessage) {
    openContact();
    return;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(finalMessage);
      showToast('Message copié — colle-le sur Snapchat');
    } else {
      throw new Error('Clipboard indisponible');
    }
  } catch {
    showToast(`Message prêt : ${finalMessage.slice(0, 44)}…`);
  }

  window.setTimeout(() => {
    openContact(finalMessage);
  }, 360);
}

function openContact(message = '') {
  if (CONFIG.enableWhatsapp && CONFIG.whatsappNumber && CONFIG.defaultContact === 'whatsapp') {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    return;
  }

  window.open(CONFIG.snapchatUrl, '_blank', 'noopener,noreferrer');
}


/* ─────────────────────────────────────────────────────────────────
   18. TOAST
   ───────────────────────────────────────────────────────────────── */
function showToast(message) {
  const toast = byId('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  window.clearTimeout(state.toastTimer);

  state.toastTimer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


/* ─────────────────────────────────────────────────────────────────
   19. MOBILE NAV
   ───────────────────────────────────────────────────────────────── */
function initMobileNav() {
  const navBurger = byId('navBurger');
  const mobileNav = byId('mobileNav');

  if (!navBurger || !mobileNav) return;

  navBurger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');

    navBurger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  });

  $$('.mobile-link', mobileNav).forEach(link => {
    link.addEventListener('click', event => {
      const isButton = link.tagName.toLowerCase() === 'button';
      if (!isButton) closeMobileNav();
    });
  });
}

function closeMobileNav() {
  const navBurger = byId('navBurger');
  const mobileNav = byId('mobileNav');

  if (!navBurger || !mobileNav) return;

  mobileNav.classList.remove('open');
  navBurger.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
}


/* ─────────────────────────────────────────────────────────────────
   20. STICKY CTA
   ───────────────────────────────────────────────────────────────── */
function initStickyCTA() {
  const sticky = byId('sticky');
  const stickyBtn = byId('stickyBtn');

  if (!sticky || !stickyBtn) return;

  sticky.classList.add('visible');

  stickyBtn.addEventListener('click', () => {
    if (!state.activeCatalogue) {
      byId('genderGate')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    openContact();
  });
}

function updateStickyVisibility() {
  const sticky = byId('sticky');
  if (!sticky) return;

  sticky.classList.add('visible');
  sticky.setAttribute('aria-hidden', 'false');
}


/* ─────────────────────────────────────────────────────────────────
   21. SCROLL + REVEAL
   ───────────────────────────────────────────────────────────────── */
function observeReveal() {
  const elements = $$('.reveal:not(.visible)');

  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('visible'));
    return;
  }

  if (!state.revealObserver) {
    state.revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        state.revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    });
  }

  elements.forEach(element => state.revealObserver.observe(element));
}

function initScrollBehavior() {
  const header = byId('header');

  function onScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 24);
    }

    updateStickyVisibility();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  onScroll();
}


/* ─────────────────────────────────────────────────────────────────
   22. GLOBAL EVENTS
   ───────────────────────────────────────────────────────────────── */
function initGlobalEvents() {
  byId('choiceHomme')?.addEventListener('click', () => selectCatalogue('homme'));
  byId('choiceFemme')?.addEventListener('click', () => selectCatalogue('femme'));

  byId('changeCatalogueBtn')?.addEventListener('click', resetCatalogueSelection);
  byId('mobileChangeCatalogueBtn')?.addEventListener('click', () => {
    resetCatalogueSelection();
    closeMobileNav();
  });

  byId('modalClose')?.addEventListener('click', closeProductModal);
  byId('outfitModalClose')?.addEventListener('click', closeOutfitModal);

  byId('modalOverlay')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeProductModal();
  });

  byId('outfitModalOverlay')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeOutfitModal();
  });

  byId('searchInput')?.addEventListener('input', event => {
    window.clearTimeout(state.searchTimer);

    state.searchTimer = window.setTimeout(() => {
      state.searchQuery = event.target.value.trim();
      renderProducts();
    }, 160);
  });

  document.addEventListener('click', event => {
    const filterTab = event.target.closest('.filter-tab');
    if (filterTab) {
      state.activeFilter = filterTab.dataset.filter || 'all';
      renderFilters();
      renderProducts();
      return;
    }

    const resetBtn = event.target.closest('[data-action="reset-filters"]');
    if (resetBtn) {
      resetFilters();
      return;
    }

    const productAction = event.target.closest('[data-product-action="open"]');
    if (productAction) {
      event.stopPropagation();
      openProductModal(productAction.dataset.id);
      return;
    }

    const productCard = event.target.closest('.product-card');
    if (productCard && productCard.dataset.productId) {
      openProductModal(productCard.dataset.productId);
      return;
    }

    const outfitAction = event.target.closest('[data-outfit-action="open"]');
    if (outfitAction) {
      event.stopPropagation();
      openOutfitModal(outfitAction.dataset.id);
      return;
    }

    const outfitCard = event.target.closest('.outfit-card');
    if (outfitCard && outfitCard.dataset.outfitId) {
      openOutfitModal(outfitCard.dataset.outfitId);
      return;
    }

    const snapTrigger = event.target.closest('.snap-trigger');
    if (snapTrigger) {
      openContact();
      return;
    }

    const instaTrigger = event.target.closest('.insta-trigger');
    if (instaTrigger && CONFIG.instagramUrl) {
      window.open(CONFIG.instagramUrl, '_blank', 'noopener,noreferrer');
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeProductModal();
      closeOutfitModal();
      closeMobileNav();
      return;
    }

    if (event.key !== 'Enter' && event.key !== ' ') return;

    const productCard = event.target.closest('.product-card');
    if (productCard && productCard.dataset.productId) {
      event.preventDefault();
      openProductModal(productCard.dataset.productId);
      return;
    }

    const outfitCard = event.target.closest('.outfit-card');
    if (outfitCard && outfitCard.dataset.outfitId) {
      event.preventDefault();
      openOutfitModal(outfitCard.dataset.outfitId);
    }
  });

  window.addEventListener('hashchange', () => {
    const catalogue = getInitialCatalogueFromUrl();
    if (catalogue) selectCatalogue(catalogue);
  });
}


/* ─────────────────────────────────────────────────────────────────
   23. INIT
   ───────────────────────────────────────────────────────────────── */
function init() {
  renderTicker();
  initMobileNav();
  initStickyCTA();
  initScrollBehavior();
  initGlobalEvents();

  const urlCatalogue = getInitialCatalogueFromUrl();
  const storedCatalogue = getStoredCatalogue();
  const initialCatalogue = urlCatalogue || storedCatalogue;

  if (isValidCatalogue(initialCatalogue)) {
    state.activeCatalogue = initialCatalogue;
    applyCatalogueSelection(false);
  } else {
    resetCatalogueView();
  }

  updateStickyVisibility();
  observeReveal();
}

window.resetFilters = resetFilters;
window.selectCatalogue = selectCatalogue;
window.resetCatalogueSelection = resetCatalogueSelection;

document.addEventListener('DOMContentLoaded', init);
