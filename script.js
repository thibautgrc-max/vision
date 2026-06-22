'use strict';

/* ═══════════════════════════════════════════════════════════════════
   VISION — Private Stock
   ═══════════════════════════════════════════════════════════════════

   MODIFIER : Commence par la zone CONFIG puis la zone PRODUCTS.
   Le reste du code tourne automatiquement.

   ═══════════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────────────────────
   ① CONFIG — Modifier avant déploiement
   ───────────────────────────────────────────────────────────────── */
const CONFIG = {
  brandName:       'VISION',
  snapchatUrl:     'https://www.snapchat.com/add/TON_PSEUDO',   // ← Ton pseudo Snap
  instagramUrl:    '',                                            // ← Optionnel
  whatsappNumber:  '',                                            // ← Ex: '33612345678' (sans +)
  defaultContact:  'snapchat',                                    // 'snapchat' | 'whatsapp'
  currency:        '€',
  lastUpdate:      'Aujourd\'hui',
  enableWhatsapp:  false,                                         // true pour activer WhatsApp
};

/* ─────────────────────────────────────────────────────────────────
   ② STATUTS STOCK — Mappage visuel et textuel
   ───────────────────────────────────────────────────────────────── */
const STATUS = {
  high:     { label: 'Disponible',      css: 'status-high',     available: true  },
  medium:   { label: 'Disponible',      css: 'status-medium',   available: true  },
  low:      { label: 'Dernières pièces', css: 'status-low',     available: true  },
  reserved: { label: 'Réservé',         css: 'status-reserved', available: false },
  soon:     { label: 'Bientôt',         css: 'status-soon',     available: false },
};

/* ─────────────────────────────────────────────────────────────────
   ③ PRODUITS — Ajouter / modifier ici
   ───────────────────────────────────────────────────────────────
   Champs obligatoires : id, name, category, price, stockLevel
   Champs optionnels   : oldPrice, sizes, colors, image, gallery,
                         description, featured, topRequested, isNew,
                         packEligible, createdAt
   ───────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id:           'VIS-001',
    name:         'Ensemble Carbone',
    category:     'Ensembles',
    price:        45,
    oldPrice:     null,
    sizes:        ['S', 'M', 'L', 'XL'],
    colors:       ['Noir'],
    stockLevel:   'low',                    // Affiche "Dernières pièces"
    image:        'assets/products/vis-001.jpg',
    gallery:      [],
    description:  'Coupe structurée, fit parfait. Matière premium.',
    featured:     true,
    topRequested: true,
    isNew:        false,
    packEligible: true,
    createdAt:    '2026-06-22',
  },
  {
    id:           'VIS-002',
    name:         'T-Shirt Oversize',
    category:     'T-shirts',
    price:        18,
    oldPrice:     null,
    sizes:        ['S', 'M', 'L', 'XL', 'XXL'],
    colors:       ['Blanc', 'Noir', 'Gris'],
    stockLevel:   'high',
    image:        'assets/products/vis-002.jpg',
    gallery:      [],
    description:  'Coton lourd 240g, coupe oversize drop épaule.',
    featured:     false,
    topRequested: false,
    isNew:        true,
    packEligible: true,
    createdAt:    '2026-06-22',
  },
  {
    id:           'VIS-003',
    name:         'Short Technique',
    category:     'Shorts',
    price:        22,
    oldPrice:     null,
    sizes:        ['S', 'M', 'L', 'XL'],
    colors:       ['Noir', 'Gris'],
    stockLevel:   'medium',
    image:        'assets/products/vis-003.jpg',
    gallery:      [],
    description:  'Tissu léger et respirant, coupe active.',
    featured:     false,
    topRequested: false,
    isNew:        false,
    packEligible: true,
    createdAt:    '2026-06-18',
  },
  {
    id:           'VIS-004',
    name:         'Sneaker Runner Pro',
    category:     'Chaussures',
    price:        55,
    oldPrice:     70,
    sizes:        ['40', '41', '42', '43', '44', '45'],
    colors:       ['Blanc / Noir'],
    stockLevel:   'low',
    image:        'assets/products/vis-004.jpg',
    gallery:      [],
    description:  'Semelle technique épaisse, look drop.',
    featured:     true,
    topRequested: true,
    isNew:        false,
    packEligible: false,
    createdAt:    '2026-06-15',
  },
  {
    id:           'VIS-005',
    name:         'Parfum Black Series',
    category:     'Parfums',
    price:        35,
    oldPrice:     null,
    sizes:        ['100ml'],
    colors:       ['Flacon noir'],
    stockLevel:   'medium',
    image:        'assets/products/vis-005.jpg',
    gallery:      [],
    description:  'Notes boisées et musquées. Tenue longue durée.',
    featured:     false,
    topRequested: false,
    isNew:        true,
    packEligible: false,
    createdAt:    '2026-06-22',
  },
  {
    id:           'VIS-006',
    name:         'Casquette Signature',
    category:     'Accessoires',
    price:        20,
    oldPrice:     null,
    sizes:        ['Unique'],
    colors:       ['Noir', 'Beige'],
    stockLevel:   'high',
    image:        'assets/products/vis-006.jpg',
    gallery:      [],
    description:  'Broderie discrète, profil bas structuré.',
    featured:     false,
    topRequested: false,
    isNew:        false,
    packEligible: true,
    createdAt:    '2026-06-10',
  },
  {
    id:           'VIS-007',
    name:         'Ensemble Gris Fumée',
    category:     'Ensembles',
    price:        48,
    oldPrice:     null,
    sizes:        ['M', 'L', 'XL'],
    colors:       ['Gris'],
    stockLevel:   'low',
    image:        'assets/products/vis-007.jpg',
    gallery:      [],
    description:  'Ton gris froid, coupe premium épurée.',
    featured:     false,
    topRequested: true,
    isNew:        false,
    packEligible: true,
    createdAt:    '2026-06-20',
  },
  {
    id:           'VIS-008',
    name:         'T-Shirt Essential',
    category:     'T-shirts',
    price:        16,
    oldPrice:     null,
    sizes:        ['S', 'M', 'L', 'XL'],
    colors:       ['Noir', 'Blanc'],
    stockLevel:   'high',
    image:        'assets/products/vis-008.jpg',
    gallery:      [],
    description:  'Basique premium, coton 220g. Coupe regular.',
    featured:     false,
    topRequested: false,
    isNew:        false,
    packEligible: true,
    createdAt:    '2026-06-01',
  },
  {
    id:           'VIS-009',
    name:         'Short Cargo Premium',
    category:     'Shorts',
    price:        28,
    oldPrice:     null,
    sizes:        ['S', 'M', 'L'],
    colors:       ['Beige', 'Noir'],
    stockLevel:   'low',
    image:        'assets/products/vis-009.jpg',
    gallery:      [],
    description:  'Poches cargo latérales, coupe loose streetwear.',
    featured:     false,
    topRequested: false,
    isNew:        true,
    packEligible: true,
    createdAt:    '2026-06-22',
  },
  {
    id:           'VIS-010',
    name:         'Sac Cross-Body',
    category:     'Accessoires',
    price:        40,
    oldPrice:     52,
    sizes:        ['Unique'],
    colors:       ['Noir'],
    stockLevel:   'soon',                   // Affiche "Bientôt"
    image:        'assets/products/vis-010.jpg',
    gallery:      [],
    description:  'Compartiments multiples, bandoulière réglable.',
    featured:     false,
    topRequested: false,
    isNew:        false,
    packEligible: false,
    createdAt:    '2026-06-22',
  },
  {
    id:           'VIS-011',
    name:         'Écouteurs Pro Series',
    category:     'Électronique',
    price:        30,
    oldPrice:     null,
    sizes:        ['Unique'],
    colors:       ['Noir'],
    stockLevel:   'soon',
    image:        'assets/products/vis-011.jpg',
    gallery:      [],
    description:  'Son clair, réduction bruit, autonomie 24h.',
    featured:     false,
    topRequested: false,
    isNew:        false,
    packEligible: false,
    createdAt:    '2026-06-22',
  },
  {
    id:           'VIS-012',
    name:         'Parfum Sport Fresh',
    category:     'Parfums',
    price:        28,
    oldPrice:     null,
    sizes:        ['50ml', '100ml'],
    colors:       ['Flacon transparent'],
    stockLevel:   'high',
    image:        'assets/products/vis-012.jpg',
    gallery:      [],
    description:  'Fraîcheur intense, tenue longue. Idéal quotidien.',
    featured:     false,
    topRequested: false,
    isNew:        false,
    packEligible: false,
    createdAt:    '2026-06-05',
  },
];

/* ─────────────────────────────────────────────────────────────────
   ④ PACKS — Modifier ici
   ───────────────────────────────────────────────────────────────── */
const PACKS = [
  {
    id:         'PACK-001',
    name:       'Pack Outfit Complet',
    label:      'Meilleur choix',
    badgeType:  'best',
    description: 'Look complet du haut au bas.',
    itemLabels: ['Ensemble Carbone', 'T-Shirt Oversize', 'Short Technique'],
    price:      79,
    oldPrice:   85,
  },
  {
    id:         'PACK-002',
    name:       'Pack Summer',
    label:      'Été 2026',
    badgeType:  null,
    description: 'Tenues légères pour la saison.',
    itemLabels: ['T-Shirt Oversize', 'Short Technique', 'Casquette Signature', 'T-Shirt Essential'],
    price:      69,
    oldPrice:   76,
  },
  {
    id:         'PACK-003',
    name:       'Pack Style + Kicks',
    label:      'Top demandé',
    badgeType:  null,
    description: 'Sneaker + ensemble assorti.',
    itemLabels: ['Ensemble Gris Fumée', 'Sneaker Runner Pro'],
    price:      95,
    oldPrice:   103,
  },
];

/* ─────────────────────────────────────────────────────────────────
   ⑤ FILTRES
   ───────────────────────────────────────────────────────────────── */
const SPECIAL_FILTERS = [
  { key: 'all',      label: 'Tous' },
  { key: 'new',      label: 'Nouveautés' },
  { key: 'last',     label: 'Dernières pièces' },
];

/* ─────────────────────────────────────────────────────────────────
   ⑥ ÉTAT APPLICATION
   ───────────────────────────────────────────────────────────────── */
let state = {
  activeFilter:   'all',
  searchQuery:    '',
  activeProductId: null,
  selectedSize:   null,
  galleryIndex:   0,
  toastTimer:     null,
};

/* ─────────────────────────────────────────────────────────────────
   ⑦ UTILITAIRES
   ───────────────────────────────────────────────────────────────── */

/** Anime un nombre de 0 → target */
function animateCounter(el, target, duration = 1000) {
  if (!el) return;
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const pct = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - pct, 3);
    el.textContent = Math.round(eased * target);
    if (pct < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Retourne les produits filtrés selon l'état */
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    // Filtre actif
    if (state.activeFilter === 'all')  { /* tout */ }
    else if (state.activeFilter === 'new')  { if (!p.isNew) return false; }
    else if (state.activeFilter === 'last') { if (p.stockLevel !== 'low') return false; }
    else { if (p.category !== state.activeFilter) return false; }

    // Recherche
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.colors || []).some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });
}

/** Compte d'articles disponibles réels (pas réservés / bientôt) */
function getAvailableCount() {
  return PRODUCTS.filter(p => STATUS[p.stockLevel]?.available).length;
}

/** Génère le message de commande */
function buildOrderMessage(product, size, askOnly = false) {
  if (askOnly) {
    return `Salut, je suis intéressé par ${product.id} — ${product.name}. Quelles tailles / couleurs sont disponibles ?`;
  }
  const sizeStr = (size && size !== 'Unique') ? ` — Taille ${size}` : '';
  return `Salut, je veux réserver : ${product.id} — ${product.name}${sizeStr}. Disponible ?`;
}

/** Génère le message pour un pack */
function buildPackMessage(pack) {
  return `Salut, je veux réserver : ${pack.id} — ${pack.name} (${CONFIG.currency}${pack.price}). Disponible ?`;
}

/** Copie un texte dans le presse-papier et ouvre le contact */
async function sendOrder(message) {
  // Copier dans le presse-papier
  try {
    await navigator.clipboard.writeText(message);
    showToast('✓ Message copié — Colle-le sur Snapchat');
  } catch {
    showToast('Envoie ce message : ' + message.substring(0, 40) + '…');
  }

  // Ouvrir Snapchat (ou WhatsApp si configuré)
  setTimeout(() => {
    if (CONFIG.enableWhatsapp && CONFIG.whatsappNumber && CONFIG.defaultContact === 'whatsapp') {
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      window.open(CONFIG.snapchatUrl, '_blank');
    }
  }, 380);
}

/** Affiche une notification toast */
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
}

/** Rendu HTML de l'image produit avec fallback */
function productImageHTML(src, name, id) {
  if (src) {
    return `
      <img
        class="card-img"
        src="${src}"
        alt="${escHtml(name)}"
        loading="lazy"
        onerror="this.parentNode.innerHTML=fallbackImageHTML('${escHtml(id)}')"
      />
    `;
  }
  return fallbackImageHTML(id);
}

function fallbackImageHTML(id) {
  return `
    <div class="card-img-fallback">
      <span class="fallback-logo">VISION</span>
      <span class="fallback-id">${escHtml(id)}</span>
    </div>
  `;
}

/** Escaping HTML basique */
function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─────────────────────────────────────────────────────────────────
   ⑧ TICKER
   ───────────────────────────────────────────────────────────────── */
function renderTicker() {
  const items = [
    'DROP ACTIF',
    'STOCK MIS À JOUR',
    'PHOTOS RÉELLES',
    'RÉSERVATION DIRECTE',
    'QUANTITÉS LIMITÉES',
    `${CONFIG.brandName} PRIVATE STOCK`,
    'SNAPCHAT DIRECT',
  ];

  // Dupliquer pour le scroll infini
  const doubled = [...items, ...items];
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  track.innerHTML = doubled.map(item => `
    <div class="ticker-item">
      <span class="ticker-dot" aria-hidden="true"></span>
      ${escHtml(item)}
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────────────────────────
   ⑨ FILTRES — onglets
   ───────────────────────────────────────────────────────────────── */
function renderFilters() {
  const bar = document.getElementById('filterBar');
  if (!bar) return;

  // Construire la liste des catégories présentes
  const categoriesInData = [...new Set(PRODUCTS.map(p => p.category))];

  const allFilters = [
    ...SPECIAL_FILTERS,
    ...categoriesInData.map(cat => ({ key: cat, label: cat })),
  ];

  bar.innerHTML = allFilters.map(f => `
    <button
      class="filter-tab ${state.activeFilter === f.key ? 'active' : ''}"
      data-filter="${escHtml(f.key)}"
      role="tab"
      aria-selected="${state.activeFilter === f.key}"
    >
      ${escHtml(f.label)}
    </button>
  `).join('');
}

/* ─────────────────────────────────────────────────────────────────
   ⑩ CARTES PRODUITS
   ───────────────────────────────────────────────────────────────── */
function renderProductCard(product) {
  const status = STATUS[product.stockLevel] || STATUS.medium;
  const sizesText = product.sizes?.join(' · ') || '';
  const priceOld  = product.oldPrice
    ? `<span class="card-old-price">${product.oldPrice}${CONFIG.currency}</span>` : '';

  return `
    <article
      class="product-card reveal"
      role="listitem"
      data-id="${escHtml(product.id)}"
      tabindex="0"
      aria-label="${escHtml(product.name)} — ${product.price}${CONFIG.currency} — ${status.label}"
    >
      <div class="card-img-wrap">
        ${productImageHTML(product.image, product.name, product.id)}
        <div class="card-status ${status.css}">${status.label}</div>
        ${product.topRequested ? '<div class="card-top-badge">Top</div>' : ''}
      </div>

      <div class="card-body">
        <span class="card-cat">${escHtml(product.category)}</span>
        <span class="card-name">${escHtml(product.name)}</span>
        ${sizesText ? `<span class="card-sizes">${sizesText}</span>` : ''}

        <div class="card-foot">
          <div>
            <span class="card-price">${product.price}${CONFIG.currency}</span>
            ${priceOld}
          </div>
          <button
            class="card-btn"
            data-action="open"
            data-id="${escHtml(product.id)}"
            aria-label="Voir et réserver ${escHtml(product.name)}"
          >
            Réserver
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const grid  = document.getElementById('productGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultCount');
  if (!grid) return;

  const filtered = getFilteredProducts();

  if (!filtered.length) {
    grid.innerHTML = '';
    if (empty) empty.hidden = false;
    if (count) count.textContent = '0 article';
    return;
  }

  if (empty) empty.hidden = true;
  grid.innerHTML = filtered.map(renderProductCard).join('');
  if (count) count.textContent = `${filtered.length} article${filtered.length > 1 ? 's' : ''}`;

  // Déclencher les reveals
  requestAnimationFrame(observeReveal);
}

/* ─────────────────────────────────────────────────────────────────
   ⑪ PACKS
   ───────────────────────────────────────────────────────────────── */
function renderPackCard(pack) {
  const saving = pack.oldPrice
    ? Math.round((1 - pack.price / pack.oldPrice) * 100) : 0;

  const badgeHtml = pack.label
    ? `<div class="pack-badge ${pack.badgeType === 'best' ? 'best' : ''}">${escHtml(pack.label)}</div>` : '';

  const savingHtml = saving > 0
    ? `<span class="pack-saving">-${saving}%</span>` : '';

  const oldHtml = pack.oldPrice
    ? `<span class="pack-old">${pack.oldPrice}${CONFIG.currency}</span>` : '';

  return `
    <div class="pack-card reveal" data-pack-id="${escHtml(pack.id)}">
      ${badgeHtml}
      <h3 class="pack-name">${escHtml(pack.name)}</h3>
      <p class="pack-desc">${escHtml(pack.description)}</p>

      <div class="pack-items">
        ${pack.itemLabels.map(item => `
          <div class="pack-item">
            <span class="pack-item-dot"></span>
            <span>${escHtml(item)}</span>
          </div>
        `).join('')}
      </div>

      <div class="pack-pricing">
        <span class="pack-price">${pack.price}${CONFIG.currency}</span>
        ${oldHtml}
        ${savingHtml}
      </div>

      <button
        class="pack-cta"
        data-pack-action="reserve"
        data-pack-id="${escHtml(pack.id)}"
        aria-label="Réserver ${escHtml(pack.name)}"
      >
        Réserver le pack
      </button>
    </div>
  `;
}

function renderPacks() {
  const grid = document.getElementById('packsGrid');
  if (!grid) return;
  grid.innerHTML = PACKS.map(renderPackCard).join('');
  requestAnimationFrame(observeReveal);
}

/* ─────────────────────────────────────────────────────────────────
   ⑫ MODAL PRODUIT
   ───────────────────────────────────────────────────────────────── */
function openModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.activeProductId = productId;
  state.selectedSize    = null;
  state.galleryIndex    = 0;

  renderModalContent(product);

  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus sur le bouton fermer pour accessibilité
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
  }
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  state.activeProductId = null;
  state.selectedSize    = null;
}

function renderModalContent(product) {
  const content = document.getElementById('modalContent');
  if (!content) return;

  const status = STATUS[product.stockLevel] || STATUS.medium;
  const hasGallery = product.gallery && product.gallery.length > 1;
  const images = hasGallery ? product.gallery : (product.image ? [product.image] : []);
  const currentImg = images[state.galleryIndex] || null;

  // Zone image
  const imgZone = currentImg
    ? `<img class="modal-img" src="${escHtml(currentImg)}" alt="${escHtml(product.name)}" loading="lazy"
          onerror="this.parentNode.innerHTML='<div class=\\"modal-img-fallback\\"><span class=\\"fb-logo\\">VISION</span></div>'"
       />`
    : `<div class="modal-img-fallback"><span class="fb-logo">VISION</span></div>`;

  // Dots galerie
  const dotsHtml = hasGallery
    ? `<div class="modal-gallery-nav" role="tablist" aria-label="Images galerie">
        ${images.map((_, i) => `
          <button
            class="gallery-dot ${i === state.galleryIndex ? 'active' : ''}"
            data-gallery-i="${i}"
            role="tab"
            aria-label="Image ${i + 1}"
            aria-selected="${i === state.galleryIndex}"
          ></button>
        `).join('')}
       </div>` : '';

  // Tailles
  const sizesHtml = (product.sizes && product.sizes.length)
    ? `<div class="modal-label">Taille</div>
       <div class="modal-sizes">
         ${product.sizes.map(s => `
           <button
             class="size-chip ${state.selectedSize === s ? 'selected' : ''}"
             data-size="${escHtml(s)}"
             aria-pressed="${state.selectedSize === s}"
             aria-label="Taille ${escHtml(s)}"
           >${escHtml(s)}</button>
         `).join('')}
       </div>` : '';

  const priceOld = product.oldPrice
    ? `<span class="modal-old-price">${product.oldPrice}${CONFIG.currency}</span>` : '';

  content.innerHTML = `
    <div class="modal-handle" aria-hidden="true"></div>

    <div class="modal-img-wrap" id="modalImgWrap">
      ${imgZone}
      ${dotsHtml}
    </div>

    <div class="modal-body">
      <div class="modal-status-row">
        <span class="modal-status ${status.css}">${status.label}</span>
        <span class="modal-cat">${escHtml(product.category)}</span>
      </div>

      <h2 class="modal-name">${escHtml(product.name)}</h2>
      <div class="modal-id">${escHtml(product.id)}</div>

      <div class="modal-price-row">
        <span class="modal-price">${product.price}${CONFIG.currency}</span>
        ${priceOld}
      </div>

      ${sizesHtml}

      ${product.description ? `
        <div class="modal-note">
          ${escHtml(product.description)}
        </div>
      ` : ''}

      <div class="modal-actions">
        <button
          class="modal-btn-main"
          id="modalBtnMain"
          aria-label="Réserver ce produit sur Snapchat"
        >
          Réserver maintenant
        </button>
        <button
          class="modal-btn-ask"
          id="modalBtnAsk"
          aria-label="Demander la disponibilité"
        >
          Demander disponibilité
        </button>
      </div>
    </div>
  `;

  // Attacher événements dans la modal
  attachModalEvents(product);
}

function attachModalEvents(product) {
  // Chips de taille
  document.querySelectorAll('.size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      state.selectedSize = chip.dataset.size;
      document.querySelectorAll('.size-chip').forEach(c => {
        c.classList.toggle('selected', c.dataset.size === state.selectedSize);
        c.setAttribute('aria-pressed', c.dataset.size === state.selectedSize);
      });
    });
  });

  // Bouton principal : Réserver
  const btnMain = document.getElementById('modalBtnMain');
  if (btnMain) {
    btnMain.addEventListener('click', async () => {
      const msg = buildOrderMessage(product, state.selectedSize, false);
      await sendOrder(msg);
      closeModal();
    });
  }

  // Bouton secondaire : Demander dispo
  const btnAsk = document.getElementById('modalBtnAsk');
  if (btnAsk) {
    btnAsk.addEventListener('click', async () => {
      const msg = buildOrderMessage(product, null, true);
      await sendOrder(msg);
      closeModal();
    });
  }

  // Dots galerie
  document.querySelectorAll('.gallery-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      state.galleryIndex = Number(dot.dataset.galleryI);
      renderModalContent(product);
    });
  });

  // Swipe sur image pour la galerie
  let touchX = null;
  const imgWrap = document.getElementById('modalImgWrap');
  if (imgWrap && product.gallery?.length > 1) {
    imgWrap.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    imgWrap.addEventListener('touchend', e => {
      if (touchX === null) return;
      const delta = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(delta) > 40) {
        const dir  = delta < 0 ? 1 : -1;
        state.galleryIndex = (state.galleryIndex + dir + product.gallery.length) % product.gallery.length;
        renderModalContent(product);
      }
    }, { passive: true });
  }
}

/* ─────────────────────────────────────────────────────────────────
   ⑬ ORDRE PACK
   ───────────────────────────────────────────────────────────────── */
async function reservePack(packId) {
  const pack = PACKS.find(p => p.id === packId);
  if (!pack) return;
  const msg = buildPackMessage(pack);
  await sendOrder(msg);
}

/* ─────────────────────────────────────────────────────────────────
   ⑭ REVEAL AU SCROLL (IntersectionObserver)
   ───────────────────────────────────────────────────────────────── */
let revealObserver = null;

function observeReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
  }
  els.forEach(el => revealObserver.observe(el));
}

/* ─────────────────────────────────────────────────────────────────
   ⑮ SCROLL — header + sticky CTA
   ───────────────────────────────────────────────────────────────── */
function initScrollBehavior() {
  const header      = document.getElementById('header');
  const sticky      = document.getElementById('sticky');
  const heroSection = document.getElementById('home');
  let heroBottom    = 0;

  function updateHeroBottom() {
    if (heroSection) heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
  }

  function onScroll() {
    const y = window.scrollY;

    // Header scrolled style
    if (header) header.classList.toggle('scrolled', y > 40);

    // Sticky CTA visible après le hero
    if (sticky) {
      const stickyVisible = y > heroBottom - 120;
      sticky.classList.toggle('visible', stickyVisible);
      sticky.setAttribute('aria-hidden', String(!stickyVisible));
    }
  }

  updateHeroBottom();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateHeroBottom, { passive: true });
  onScroll(); // État initial
}

/* ─────────────────────────────────────────────────────────────────
   ⑯ NAVIGATION — burger mobile
   ───────────────────────────────────────────────────────────────── */
function initMobileNav() {
  const burger   = document.getElementById('navBurger');
  const mobileNav = document.getElementById('mobileNav');
  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  });

  // Fermer sur lien cliqué
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ─────────────────────────────────────────────────────────────────
   ⑰ MODAL — events globaux
   ───────────────────────────────────────────────────────────────── */
function initModal() {
  // Bouton fermer
  document.getElementById('modalClose')?.addEventListener('click', closeModal);

  // Clic sur overlay
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Échap clavier
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Swipe bas pour fermer (mobile) — sur le handle ou modal-content
  let swipeStartY = null;
  const modal = document.getElementById('modal');

  modal?.addEventListener('touchstart', e => {
    swipeStartY = e.touches[0].clientY;
  }, { passive: true });

  modal?.addEventListener('touchmove', e => {
    if (swipeStartY === null) return;
    const delta = e.touches[0].clientY - swipeStartY;
    // Si on swipe vers le bas de plus de 90px sur la zone non-scroll
    if (delta > 90 && e.target.closest('.modal-handle')) {
      closeModal();
      swipeStartY = null;
    }
  }, { passive: true });

  modal?.addEventListener('touchend', () => { swipeStartY = null; });
}

/* ─────────────────────────────────────────────────────────────────
   ⑱ DÉLÉGATION D'ÉVÉNEMENTS — produits + packs + snap
   ───────────────────────────────────────────────────────────────── */
function initEvents() {
  // Ouvrir modal produit (clic sur carte ou bouton)
  document.addEventListener('click', e => {
    // Bouton réserver sur carte
    const cardBtn = e.target.closest('[data-action="open"]');
    if (cardBtn) {
      e.stopPropagation();
      openModal(cardBtn.dataset.id);
      return;
    }

    // Clic sur la carte entière
    const card = e.target.closest('.product-card');
    if (card) {
      openModal(card.dataset.id);
      return;
    }

    // Bouton réserver pack
    const packBtn = e.target.closest('[data-pack-action="reserve"]');
    if (packBtn) {
      reservePack(packBtn.dataset.packId);
      return;
    }

    // Tout bouton Snapchat générique (sans produit)
    if (e.target.closest('.snap-trigger')) {
      window.open(CONFIG.snapchatUrl, '_blank');
    }

    // Instagram
    if (e.target.closest('.insta-trigger') && CONFIG.instagramUrl) {
      window.open(CONFIG.instagramUrl, '_blank');
    }
  });

  // Accessibilité : Entrée / Espace sur carte
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.product-card');
      if (card) {
        e.preventDefault();
        openModal(card.dataset.id);
      }
    }
  });

  // Filtres
  document.addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    state.activeFilter = tab.dataset.filter;
    renderFilters();
    renderProducts();
  });

  // Recherche — debounce 180ms
  let searchTimer;
  document.getElementById('searchInput')?.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.searchQuery = e.target.value.trim();
      renderProducts();
    }, 180);
  });
}

/* ─────────────────────────────────────────────────────────────────
   ⑲ COMPTEUR HERO animé
   ───────────────────────────────────────────────────────────────── */
function initCounters() {
  const available = getAvailableCount();

  // Compteur héro
  const heroCountEl = document.getElementById('heroCount');
  if (heroCountEl) {
    setTimeout(() => animateCounter(heroCountEl, available, 1000), 300);
  }

  // Compteur header
  const countNumEl = document.getElementById('countNum');
  if (countNumEl) {
    setTimeout(() => animateCounter(countNumEl, available, 800), 200);
  }
}

/* ─────────────────────────────────────────────────────────────────
   ⑳ INIT
   ───────────────────────────────────────────────────────────────── */

/** Accessible publiquement pour le bouton "Voir tout" de l'état vide */
window.resetFilters = function () {
  state.activeFilter = 'all';
  state.searchQuery  = '';
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  renderFilters();
  renderProducts();
};

function init() {
  renderTicker();
  renderFilters();
  renderProducts();
  renderPacks();
  initCounters();
  initScrollBehavior();
  initMobileNav();
  initModal();
  initEvents();

  // Observer initial pour les éléments déjà dans la vue
  requestAnimationFrame(observeReveal);
}

document.addEventListener('DOMContentLoaded', init);
