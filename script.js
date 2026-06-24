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
  reserved: { label: 'Réservé',          css: 'status-reserved', available: false },
  soon:     { label: 'Bientôt',          css: 'status-soon',     available: false },
};


/* ─────────────────────────────────────────────────────────────────
   ③ PRODUITS

   audience : 'homme' ou 'femme'
   image    : déposer les photos dans assets/products/homme|femme
   gallery  : ajouter plusieurs chemins pour la galerie produit
   ───────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'VH-001', audience: 'homme', name: 'Ensemble Carbone', category: 'Ensembles',
    price: 69, oldPrice: 82, sizes: ['S', 'M', 'L', 'XL'], colors: ['Noir profond'],
    stockLevel: 'low', image: '', gallery: [],
    description: 'Sweat zippé et pantalon coordonné. Une silhouette monochrome nette, facile à porter complète ou séparée.',
    material: 'Coton dense 320 g', fit: 'Coupe droite', detail: 'Zip métal · bas ajustable',
    featured: true, topRequested: true, isNew: false,
  },
  {
    id: 'VH-002', audience: 'homme', name: 'T-Shirt Heavy Frame', category: 'T-shirts',
    price: 29, oldPrice: null, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blanc cassé', 'Noir'],
    stockLevel: 'high', image: '', gallery: [],
    description: 'T-shirt lourd avec une épaule tombante et un col renforcé qui conserve sa forme.',
    material: 'Jersey 240 g', fit: 'Oversize', detail: 'Col côtelé renforcé',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-003', audience: 'homme', name: 'Cargo Système', category: 'Bas',
    price: 49, oldPrice: 59, sizes: ['38', '40', '42', '44'], colors: ['Anthracite'],
    stockLevel: 'medium', image: '', gallery: [],
    description: 'Cargo fonctionnel équilibré entre volume streetwear et ligne fuselée.',
    material: 'Ripstop technique', fit: 'Relaxed taper', detail: '6 poches · chevilles ajustables',
    featured: false, topRequested: false, isNew: false,
  },
  {
    id: 'VH-004', audience: 'homme', name: 'Runner Axis', category: 'Chaussures',
    price: 79, oldPrice: 95, sizes: ['40', '41', '42', '43', '44', '45'], colors: ['Gris / Crème'],
    stockLevel: 'low', image: '', gallery: [],
    description: 'Runner graphique avec semelle sculptée, confortable au quotidien et forte visuellement.',
    material: 'Mesh technique', fit: 'Taille normalement', detail: 'Semelle épaisse · laçage rapide',
    featured: true, topRequested: true, isNew: false,
  },
  {
    id: 'VH-005', audience: 'homme', name: 'Veste Utility 02', category: 'Vestes',
    price: 65, oldPrice: null, sizes: ['M', 'L', 'XL'], colors: ['Kaki minéral'],
    stockLevel: 'medium', image: '', gallery: [],
    description: 'Veste courte et structurée qui donne immédiatement plus de présence à la silhouette.',
    material: 'Toile structurée', fit: 'Boxy', detail: 'Poches plaquées · zip métal',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VH-006', audience: 'homme', name: 'Sac Transit', category: 'Accessoires',
    price: 35, oldPrice: null, sizes: ['Unique'], colors: ['Noir'],
    stockLevel: 'high', image: '', gallery: [],
    description: 'Format compact avec trois compartiments pour garder l’essentiel accessible.',
    material: 'Nylon déperlant', fit: 'Bandoulière réglable', detail: '3 compartiments sécurisés',
    featured: false, topRequested: false, isNew: false,
  },

  {
    id: 'VF-001', audience: 'femme', name: 'Set Sculpt 01', category: 'Ensembles',
    price: 62, oldPrice: 75, sizes: ['XS', 'S', 'M', 'L'], colors: ['Cacao'],
    stockLevel: 'low', image: '', gallery: [],
    description: 'Top manches longues et jupe midi. Une silhouette complète, sculptante et fluide.',
    material: 'Maille double épaisseur', fit: 'Près du corps', detail: 'Taille haute · toucher doux',
    featured: true, topRequested: true, isNew: false,
  },
  {
    id: 'VF-002', audience: 'femme', name: 'Top Asymmetry', category: 'Tops',
    price: 27, oldPrice: null, sizes: ['XS', 'S', 'M', 'L'], colors: ['Ivoire', 'Noir'],
    stockLevel: 'high', image: '', gallery: [],
    description: 'Une ligne minimaliste avec une encolure asymétrique qui fonctionne de jour comme le soir.',
    material: 'Jersey doux 220 g', fit: 'Ajusté', detail: 'Encolure asymétrique',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-003', audience: 'femme', name: 'Jean Curve 90', category: 'Bas',
    price: 48, oldPrice: 58, sizes: ['34', '36', '38', '40', '42'], colors: ['Bleu vintage'],
    stockLevel: 'medium', image: '', gallery: [],
    description: 'Jean taille haute à jambe droite, pensé pour allonger la silhouette sans la contraindre.',
    material: 'Denim rigide', fit: 'Taille haute', detail: 'Jambe droite · longueur cheville',
    featured: false, topRequested: false, isNew: false,
  },
  {
    id: 'VF-004', audience: 'femme', name: 'Boot Halo', category: 'Chaussures',
    price: 76, oldPrice: 89, sizes: ['36', '37', '38', '39', '40', '41'], colors: ['Noir'],
    stockLevel: 'low', image: '', gallery: [],
    description: 'Bottine nette et stable, suffisamment graphique pour terminer un look minimaliste.',
    material: 'Fini cuir lisse', fit: 'Taille normalement', detail: 'Talon 7 cm · bout carré',
    featured: true, topRequested: true, isNew: false,
  },
  {
    id: 'VF-005', audience: 'femme', name: 'Blazer Frame', category: 'Vestes',
    price: 68, oldPrice: null, sizes: ['XS', 'S', 'M', 'L'], colors: ['Gris graphite'],
    stockLevel: 'medium', image: '', gallery: [],
    description: 'Blazer à la structure précise, pensé pour fonctionner avec un denim ou en total look.',
    material: 'Twill doublé', fit: 'Oversize structuré', detail: 'Épaules dessinées · croisé',
    featured: false, topRequested: false, isNew: true,
  },
  {
    id: 'VF-006', audience: 'femme', name: 'Mini Bag Orbit', category: 'Accessoires',
    price: 39, oldPrice: 49, sizes: ['Unique'], colors: ['Bordeaux'],
    stockLevel: 'high', image: '', gallery: [],
    description: 'Mini sac compact à la couleur profonde, pensé comme le point final de l’outfit.',
    material: 'Fini grainé', fit: 'Anse + bandoulière', detail: 'Fermoir métal · poche intérieure',
    featured: false, topRequested: false, isNew: false,
  },
];


/* ─────────────────────────────────────────────────────────────────
   ④ PACKS VISION — outfits complets
   ───────────────────────────────────────────────────────────────── */
const PACKS = [
  {
    id: 'PH-001', audience: 'homme', name: 'Total Shadow', label: 'Choix du drop', badgeType: 'best',
    description: 'Le total look sombre, équilibré du haut aux accessoires.',
    itemLabels: ['Ensemble Carbone', 'T-Shirt Heavy Frame', 'Sac Transit'],
    sizes: ['S', 'M', 'L', 'XL'], price: 109, oldPrice: 133, stockLevel: 'low', image: '',
  },
  {
    id: 'PH-002', audience: 'homme', name: 'Utility Axis', label: 'Économie 24€', badgeType: null,
    description: 'Un outfit technique construit autour de volumes utilitaires.',
    itemLabels: ['Veste Utility 02', 'Cargo Système', 'Runner Axis'],
    sizes: ['M / 41', 'M / 42', 'L / 42', 'L / 43', 'XL / 44'], price: 169, oldPrice: 193, stockLevel: 'low', image: '',
  },
  {
    id: 'PF-001', audience: 'femme', name: 'Sculpt & Orbit', label: 'Choix du drop', badgeType: 'best',
    description: 'Une silhouette cacao relevée par un mini sac bordeaux.',
    itemLabels: ['Set Sculpt 01', 'Mini Bag Orbit'],
    sizes: ['XS', 'S', 'M', 'L'], price: 89, oldPrice: 101, stockLevel: 'medium', image: '',
  },
  {
    id: 'PF-002', audience: 'femme', name: 'City Frame', label: 'Économie 30€', badgeType: null,
    description: 'Le vestiaire urbain complet : proportions fortes et bottine graphique.',
    itemLabels: ['Blazer Frame', 'Top Asymmetry', 'Jean Curve 90', 'Boot Halo'],
    sizes: ['S / 37', 'S / 38', 'M / 38', 'M / 39', 'L / 40'], price: 189, oldPrice: 219, stockLevel: 'low', image: '',
  },
];


/* ─────────────────────────────────────────────────────────────────
   ⑤ FILTRES & ÉTAT
   ───────────────────────────────────────────────────────────────── */
const SPECIAL_FILTERS = [
  { key: 'all', label: 'Nouveauté Privé' },
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
  return [
    `Salut VISION, je souhaite réserver ce ${label} :`,
    `${item.id} — ${item.name}${sizeText}`,
    `Prix catalogue : ${item.price}${CONFIG.currency}`,
    `Univers : ${audienceLabel()}`,
    '',
    'Peux-tu me confirmer la disponibilité et la livraison ?',
  ].join('\n');
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
  const items = ['DROP ACTIF', 'STOCK MIS À JOUR', 'PHOTOS RÉELLES', 'RÉSERVATION DIRECTE', 'STOCK PRIVÉ', 'OUTFITS PRIVÉS'];
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
    <button class="filter-tab ${state.activeFilter === filter.key ? 'active' : ''}"
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
  const oldPrice = product.oldPrice ? `<span class="card-old-price">${product.oldPrice}${CONFIG.currency}</span>` : '';
  return `
    <article class="product-card reveal" role="listitem" data-id="${escHtml(product.id)}" tabindex="0"
      aria-label="${escHtml(product.name)} — ${product.price}${CONFIG.currency} — ${status.label}">
      <div class="card-img-wrap">
        ${productImageHTML(product.image, product.name, product.id)}
        <div class="card-status ${status.css}">${status.label}</div>
        ${product.topRequested ? '<div class="card-top-badge">Top</div>' : ''}
      </div>
      <div class="card-body">
        <span class="card-cat">Nouveauté Privé</span>
        <span class="card-name">${escHtml(product.name)}</span>
        <span class="card-sizes">${product.sizes.map(escHtml).join(' · ')}</span>
        <div class="card-foot">
          <div><span class="card-price">${product.price}${CONFIG.currency}</span>${oldPrice}</div>
          <button class="card-btn" type="button" data-action="open" data-id="${escHtml(product.id)}" aria-label="Voir ${escHtml(product.name)}">Voir</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultCount');
  if (!grid) return;
  const filtered = getFilteredProducts();

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
    return `<img class="pack-img" src="${escHtml(pack.image)}" alt="Outfit ${escHtml(pack.name)}" loading="lazy" data-pack-fallback="${escHtml(pack.id)}" />`;
  }
  return `<div class="pack-img-fallback">${brandLockupHTML('brand-lockup-pack')}<small>OUTFIT · ${escHtml(pack.id)}</small></div>`;
}

function renderPackCard(pack) {
  const saving = pack.oldPrice ? Math.round((1 - pack.price / pack.oldPrice) * 100) : 0;
  return `
    <article class="pack-card reveal" data-pack-id="${escHtml(pack.id)}">
      <div class="pack-img-wrap">${packImageHTML(pack)}</div>
      <div class="pack-content">
        <div class="pack-badge ${pack.badgeType === 'best' ? 'best' : ''}">${escHtml(pack.label)}</div>
        <h3 class="pack-name">${escHtml(pack.name)}</h3>
        <p class="pack-desc">${escHtml(pack.description)}</p>
        <div class="pack-items">${pack.itemLabels.map(item => `<div class="pack-item"><span class="pack-item-dot"></span><span>${escHtml(item)}</span></div>`).join('')}</div>
        <div class="pack-pricing"><span class="pack-price">${pack.price}${CONFIG.currency}</span><span class="pack-old">${pack.oldPrice}${CONFIG.currency}</span><span class="pack-saving">-${saving}%</span></div>
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
  const oldPrice = item.oldPrice ? `<span class="modal-old-price">${item.oldPrice}${CONFIG.currency}</span>` : '';
  const sizeLabel = isPack ? 'Combinaison de tailles' : 'Choisir la taille';
  const details = isPack
    ? [['Contenu', `${item.itemLabels.length} pièces`], ['Avantage', `${item.oldPrice - item.price}${CONFIG.currency} économisés`]]
    : [['Matière', item.material], ['Coupe', item.fit], ['Couleur', item.colors.join(' / ')], ['Détail', item.detail]];

  content.innerHTML = `
    <div class="modal-handle" aria-hidden="true"></div>
    <div class="modal-img-wrap" id="modalImgWrap">${modalImageHTML(item, type)}${modalGalleryNavHTML(item, type)}</div>
    <div class="modal-body">
      <div class="modal-status-row"><span class="modal-status ${status.css}">${status.label}</span><span class="modal-cat">${isPack ? 'Pack VISION' : 'Nouveauté Privé'}</span></div>
      <h2 class="modal-name">${escHtml(item.name)}</h2>
      <div class="modal-id">${escHtml(item.id)} · ${audienceLabel()}</div>
      <div class="modal-price-row"><span class="modal-price">${item.price}${CONFIG.currency}</span>${oldPrice}</div>
      <p class="modal-description">${escHtml(item.description)}</p>
      ${isPack ? `<div class="modal-pack-items">${item.itemLabels.map(label => `<span>+ ${escHtml(label)}</span>`).join('')}</div>` : ''}
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
