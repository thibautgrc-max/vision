'use strict';

(() => {
  const DATA = window.VISION_DATA;
  if (!DATA) return;

  const { config, products, packs } = DATA;
  const state = {
    universe: null,
    filter: 'all',
    query: '',
    activeType: null,
    activeId: null,
    selectedSize: null,
    cart: loadCart(),
    toastTimer: null,
  };

  const el = {
    gate: document.getElementById('universeGate'),
    storefront: document.getElementById('storefront'),
    universeSwitch: document.getElementById('universeSwitch'),
    universeSwitchLabel: document.getElementById('universeSwitchLabel'),
    heroKicker: document.getElementById('heroKicker'),
    heroVisualTag: document.getElementById('heroVisualTag'),
    heroLetter: document.getElementById('heroLetter'),
    availableCount: document.getElementById('availableCount'),
    catalogueEyebrow: document.getElementById('catalogueEyebrow'),
    resultCount: document.getElementById('resultCount'),
    filterList: document.getElementById('filterList'),
    searchInput: document.getElementById('searchInput'),
    productGrid: document.getElementById('productGrid'),
    emptyState: document.getElementById('emptyState'),
    packList: document.getElementById('packList'),
    productOverlay: document.getElementById('productOverlay'),
    modalContent: document.getElementById('modalContent'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartButton: document.getElementById('cartButton'),
    cartCount: document.getElementById('cartCount'),
    drawerCount: document.getElementById('drawerCount'),
    cartItems: document.getElementById('cartItems'),
    cartEmpty: document.getElementById('cartEmpty'),
    cartSummary: document.getElementById('cartSummary'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    sendOrderButton: document.getElementById('sendOrderButton'),
    toast: document.getElementById('toast'),
  };

  const price = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    maximumFractionDigits: 0,
  });

  function escapeHTML(value = '') {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem('vision-cart-v1'));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    try { localStorage.setItem('vision-cart-v1', JSON.stringify(state.cart)); } catch { /* stockage facultatif */ }
  }

  function getItem(type, id) {
    return (type === 'pack' ? packs : products).find(item => item.id === id);
  }

  function currentProducts() {
    return products.filter(product => product.universe === state.universe);
  }

  function filteredProducts() {
    const query = state.query.trim().toLocaleLowerCase('fr');
    return currentProducts().filter(product => {
      if (state.filter === 'new' && !product.isNew) return false;
      if (state.filter === 'low' && product.stock > 3) return false;
      if (!['all', 'new', 'low'].includes(state.filter) && product.category !== state.filter) return false;
      if (!query) return true;
      const haystack = [
        product.id,
        product.name,
        product.category,
        product.material,
        product.fit,
        ...(product.colors || []),
      ].join(' ').toLocaleLowerCase('fr');
      return haystack.includes(query);
    });
  }

  function stockLabel(item) {
    return item.stock <= 3 ? `${item.stock} restant${item.stock > 1 ? 's' : ''}` : 'En stock';
  }

  function placeholderMarkup(item) {
    const letter = item.universe === 'femme' ? 'F' : 'H';
    return `
      <div class="product-placeholder" data-letter="${letter}">
        <span class="placeholder-top">Image stock à remplacer</span>
        <span class="placeholder-bottom">
          <small>${escapeHTML(item.category || 'Pack Vision')}</small>
          <strong>${escapeHTML(item.id)}</strong>
        </span>
      </div>`;
  }

  function mediaMarkup(item) {
    if (!item.image) return placeholderMarkup(item);
    return `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" data-image-for="${escapeHTML(item.id)}">`;
  }

  function activateImageFallbacks(scope = document) {
    scope.querySelectorAll('img[data-image-for]').forEach(image => {
      image.addEventListener('error', () => {
        const item = products.find(p => p.id === image.dataset.imageFor) || packs.find(p => p.id === image.dataset.imageFor);
        if (item) image.replaceWith(fragmentFromHTML(placeholderMarkup(item)));
      }, { once: true });
    });
  }

  function fragmentFromHTML(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  function chooseUniverse(universe, { scroll = true } = {}) {
    if (!['homme', 'femme'].includes(universe)) return;
    state.universe = universe;
    state.filter = 'all';
    state.query = '';
    el.searchInput.value = '';
    document.body.dataset.universe = universe;
    el.gate.hidden = true;
    el.storefront.hidden = false;

    const label = universe === 'homme' ? 'Homme' : 'Femme';
    const index = universe === 'homme' ? '01' : '02';
    el.universeSwitchLabel.textContent = label;
    el.heroKicker.textContent = `Collection ${label} · 2026`;
    el.heroVisualTag.textContent = `${label.toUpperCase()} / ${index}`;
    el.heroLetter.textContent = label.charAt(0);
    el.catalogueEyebrow.textContent = `Sélection ${label}`;
    el.availableCount.textContent = String(currentProducts().filter(item => item.stock > 0).length);

    renderFilters();
    renderProducts();
    renderPacks();
    if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function returnToGate() {
    closeProduct();
    closeCart();
    el.storefront.hidden = true;
    el.gate.hidden = false;
    document.body.removeAttribute('data-universe');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function renderFilters() {
    const categories = [...new Set(currentProducts().map(product => product.category))];
    const filters = [
      ['all', 'Tout'],
      ['new', 'Nouveautés'],
      ['low', 'Dernières pièces'],
      ...categories.map(category => [category, category]),
    ];
    el.filterList.innerHTML = filters.map(([value, label]) => `
      <button class="filter-chip ${state.filter === value ? 'active' : ''}" type="button" role="tab"
        aria-selected="${state.filter === value}" data-filter="${escapeHTML(value)}">${escapeHTML(label)}</button>
    `).join('');
  }

  function renderProducts() {
    const list = filteredProducts();
    el.resultCount.textContent = String(list.length);
    el.emptyState.hidden = list.length > 0;
    el.productGrid.hidden = list.length === 0;
    el.productGrid.innerHTML = list.map(product => {
      const compare = product.compareAt ? `<span class="product-compare">${price.format(product.compareAt)}</span>` : '';
      return `
        <article class="product-card" role="button" tabindex="0" data-product-id="${escapeHTML(product.id)}"
          aria-label="Voir ${escapeHTML(product.name)}, ${price.format(product.price)}">
          <div class="product-media">
            ${mediaMarkup(product)}
            <div class="product-badges">
              ${product.isNew ? '<span class="badge badge--new">Nouveau</span>' : ''}
              ${product.stock <= 3 ? '<span class="badge badge--low">Derniers</span>' : ''}
            </div>
            <span class="product-quick" aria-hidden="true">+</span>
          </div>
          <div class="product-info">
            <div class="product-meta">
              <span>${escapeHTML(product.category)} · ${escapeHTML(product.id)}</span>
              <span class="product-stock ${product.stock <= 3 ? 'low' : ''}">${escapeHTML(stockLabel(product))}</span>
            </div>
            <h3 class="product-name">${escapeHTML(product.name)}</h3>
            <div class="product-price-row"><span class="product-price">${price.format(product.price)}</span>${compare}</div>
          </div>
        </article>`;
    }).join('');
    activateImageFallbacks(el.productGrid);
  }

  function renderPacks() {
    const list = packs.filter(pack => pack.universe === state.universe);
    el.packList.innerHTML = list.map(pack => `
      <article class="pack-card">
        <div class="pack-art">
          ${pack.image ? `<img src="${escapeHTML(pack.image)}" alt="${escapeHTML(pack.name)}" loading="lazy" data-image-for="${escapeHTML(pack.id)}">` : ''}
          <span>${escapeHTML(pack.label)}</span><strong aria-hidden="true">${pack.universe === 'femme' ? 'F' : 'H'}</strong>
        </div>
        <div class="pack-content">
          <p class="pack-ref">${escapeHTML(pack.id)} · ${escapeHTML(stockLabel(pack))}</p>
          <h3>${escapeHTML(pack.name)}</h3>
          <p class="pack-description">${escapeHTML(pack.description)}</p>
          <ul class="pack-items">${pack.items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>
          <div class="pack-foot">
            <div class="pack-price"><span>Prix du pack</span><strong>${price.format(pack.price)} <del>${price.format(pack.compareAt)}</del></strong></div>
            <button class="pack-cta" type="button" data-pack-id="${escapeHTML(pack.id)}">Voir le pack</button>
          </div>
        </div>
      </article>`).join('');
    activateImageFallbacks(el.packList);
  }

  function openItem(type, id) {
    const item = getItem(type, id);
    if (!item) return;
    state.activeType = type;
    state.activeId = id;
    state.selectedSize = item.sizes?.length === 1 ? item.sizes[0] : null;
    renderModal(item, type);
    el.productOverlay.hidden = false;
    syncBodyLock();
    requestAnimationFrame(() => el.productOverlay.querySelector('[data-close-modal]')?.focus());
  }

  function renderModal(item, type) {
    const isPack = type === 'pack';
    const compare = item.compareAt ? `<del>${price.format(item.compareAt)}</del>` : '';
    const details = isPack ? [
      ['Composition', `${item.items.length} pièces`],
      ['Avantage', `${price.format(item.compareAt - item.price)} économisés`],
      ['Disponibilité', stockLabel(item)],
      ['Référence', item.id],
    ] : [
      ['Matière', item.material],
      ['Coupe', item.fit],
      ['Couleur', item.colors.join(' / ')],
      ['Détail', item.detail],
    ];
    el.modalContent.innerHTML = `
      <div class="modal-layout">
        <div class="modal-gallery">${mediaMarkup(item)}</div>
        <div class="modal-details">
          <div class="modal-topline"><span>${isPack ? 'Pack Vision' : escapeHTML(item.category)} · ${escapeHTML(item.id)}</span><span>${escapeHTML(stockLabel(item))}</span></div>
          <h2 id="modalTitle">${escapeHTML(item.name)}</h2>
          <p class="modal-price">${price.format(item.price)} ${compare}</p>
          <p class="modal-description">${escapeHTML(item.description)}</p>
          ${isPack ? `<ul class="pack-items">${item.items.map(part => `<li>${escapeHTML(part)}</li>`).join('')}</ul>` : ''}
          <div class="detail-grid">${details.map(([label, value]) => `<div><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`).join('')}</div>
          <div class="option-label" id="sizeLabel"><span>${isPack ? 'Combinaison de tailles' : 'Choisir la taille'}</span><em>Sélection requise</em></div>
          <div class="size-list">${item.sizes.map(size => `
            <button class="size-button ${state.selectedSize === size ? 'selected' : ''}" type="button" data-size="${escapeHTML(size)}" aria-pressed="${state.selectedSize === size}">${escapeHTML(size)}</button>
          `).join('')}</div>
          <div class="modal-actions">
            <button class="add-button" type="button" data-add-active>Ajouter au panier · ${price.format(item.price)}</button>
            <p class="modal-note">Aucun paiement n’est prélevé ici. La disponibilité est confirmée sur Snapchat.</p>
          </div>
        </div>
      </div>`;
    activateImageFallbacks(el.modalContent);
  }

  function closeProduct() {
    el.productOverlay.hidden = true;
    state.activeType = null;
    state.activeId = null;
    state.selectedSize = null;
    syncBodyLock();
  }

  function addActiveItem() {
    const item = getItem(state.activeType, state.activeId);
    if (!item) return;
    if (!state.selectedSize) {
      document.getElementById('sizeLabel')?.classList.add('has-error');
      el.modalContent.querySelector('.size-button')?.focus();
      showToast('Choisis une taille avant de continuer.');
      return;
    }
    const key = `${state.activeType}:${item.id}:${state.selectedSize}`;
    const existing = state.cart.find(line => line.key === key);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + 1, item.stock);
    } else {
      state.cart.push({ key, type: state.activeType, id: item.id, size: state.selectedSize, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    closeProduct();
    showToast(`${item.name} ajouté au panier.`);
  }

  function openCart() {
    renderCart();
    el.cartOverlay.hidden = false;
    syncBodyLock();
    requestAnimationFrame(() => el.cartOverlay.querySelector('[data-close-cart]')?.focus());
  }

  function closeCart() {
    el.cartOverlay.hidden = true;
    syncBodyLock();
  }

  function syncBodyLock() {
    document.body.classList.toggle('is-locked', !el.productOverlay.hidden || !el.cartOverlay.hidden);
  }

  function updateCartCount() {
    const count = state.cart.reduce((sum, line) => sum + line.quantity, 0);
    el.cartCount.textContent = String(count);
    el.drawerCount.textContent = String(count);
  }

  function cartTotal() {
    return state.cart.reduce((sum, line) => {
      const item = getItem(line.type, line.id);
      return sum + (item ? item.price * line.quantity : 0);
    }, 0);
  }

  function renderCart() {
    state.cart = state.cart.filter(line => getItem(line.type, line.id));
    saveCart();
    updateCartCount();
    const hasItems = state.cart.length > 0;
    el.cartEmpty.hidden = hasItems;
    el.cartSummary.hidden = !hasItems;
    el.cartItems.hidden = !hasItems;
    el.cartSubtotal.textContent = price.format(cartTotal());
    el.cartItems.innerHTML = state.cart.map(line => {
      const item = getItem(line.type, line.id);
      return `
        <div class="cart-line" data-cart-key="${escapeHTML(line.key)}">
          <div class="cart-thumb">${item.image ? `<img src="${escapeHTML(item.image)}" alt="" data-image-for="${escapeHTML(item.id)}">` : `<span>${item.universe === 'femme' ? 'F' : 'H'}</span>`}</div>
          <div class="cart-line-info">
            <small>${line.type === 'pack' ? 'Pack' : escapeHTML(item.category)} · ${escapeHTML(item.id)}</small>
            <strong>${escapeHTML(item.name)}</strong>
            <p>Taille : ${escapeHTML(line.size)}</p>
            <div class="qty-control">
              <button type="button" data-qty="minus" aria-label="Retirer une unité">−</button><b>${line.quantity}</b><button type="button" data-qty="plus" aria-label="Ajouter une unité">+</button>
            </div>
          </div>
          <div class="cart-line-price"><strong>${price.format(item.price * line.quantity)}</strong><button class="remove-line" type="button" data-remove-line>Retirer</button></div>
        </div>`;
    }).join('');
    activateImageFallbacks(el.cartItems);
  }

  function changeQuantity(key, delta) {
    const line = state.cart.find(entry => entry.key === key);
    if (!line) return;
    const item = getItem(line.type, line.id);
    line.quantity = Math.max(0, Math.min(line.quantity + delta, item?.stock || 1));
    if (line.quantity === 0) state.cart = state.cart.filter(entry => entry.key !== key);
    saveCart();
    renderCart();
  }

  function removeLine(key) {
    state.cart = state.cart.filter(line => line.key !== key);
    saveCart();
    renderCart();
  }

  function buildOrderMessage() {
    const lines = state.cart.map(line => {
      const item = getItem(line.type, line.id);
      return `• ${item.id} — ${item.name} — Taille ${line.size} — Qté ${line.quantity} — ${price.format(item.price * line.quantity)}`;
    });
    return [
      'Salut VISION, je souhaite réserver cette sélection :',
      '',
      ...lines,
      '',
      `Total catalogue : ${price.format(cartTotal())}`,
      '',
      'Peux-tu me confirmer la disponibilité et les modalités de livraison ?',
    ].join('\n');
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand('copy');
      area.remove();
      return copied;
    }
  }

  function snapchatConfigured() {
    return config.snapchatUsername && !config.snapchatUsername.includes('TON_PSEUDO');
  }

  function openSnapchat() {
    if (!snapchatConfigured()) {
      showToast('Ajoute ton pseudo Snapchat dans catalog.js avant la mise en ligne.');
      return false;
    }
    window.open(`https://www.snapchat.com/add/${encodeURIComponent(config.snapchatUsername)}`, '_blank', 'noopener');
    return true;
  }

  async function sendOrder() {
    if (!state.cart.length) return;
    const copied = await copyText(buildOrderMessage());
    showToast(copied ? 'Commande copiée. Colle-la dans Snapchat.' : 'Ouvre Snapchat pour envoyer ta sélection.');
    openSnapchat();
  }

  function showToast(message) {
    clearTimeout(state.toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add('visible');
    state.toastTimer = setTimeout(() => el.toast.classList.remove('visible'), 3200);
  }

  function resetFilters() {
    state.filter = 'all';
    state.query = '';
    el.searchInput.value = '';
    renderFilters();
    renderProducts();
  }

  function initEvents() {
    document.addEventListener('click', event => {
      const universe = event.target.closest('[data-choose-universe]');
      if (universe) chooseUniverse(universe.dataset.chooseUniverse);

      const filter = event.target.closest('[data-filter]');
      if (filter) {
        state.filter = filter.dataset.filter;
        renderFilters();
        renderProducts();
      }

      const product = event.target.closest('[data-product-id]');
      if (product) openItem('product', product.dataset.productId);

      const pack = event.target.closest('[data-pack-id]');
      if (pack) openItem('pack', pack.dataset.packId);

      const size = event.target.closest('[data-size]');
      if (size && state.activeId) {
        state.selectedSize = size.dataset.size;
        el.modalContent.querySelectorAll('[data-size]').forEach(button => {
          const selected = button.dataset.size === state.selectedSize;
          button.classList.toggle('selected', selected);
          button.setAttribute('aria-pressed', String(selected));
        });
        document.getElementById('sizeLabel')?.classList.remove('has-error');
      }

      if (event.target.closest('[data-add-active]')) addActiveItem();
      if (event.target.closest('[data-close-modal]')) closeProduct();
      if (event.target.closest('[data-close-cart]')) closeCart();
      if (event.target.closest('[data-open-snap]')) openSnapchat();

      const cartLine = event.target.closest('[data-cart-key]');
      if (cartLine && event.target.closest('[data-qty]')) {
        changeQuantity(cartLine.dataset.cartKey, event.target.closest('[data-qty]').dataset.qty === 'plus' ? 1 : -1);
      }
      if (cartLine && event.target.closest('[data-remove-line]')) removeLine(cartLine.dataset.cartKey);
    });

    document.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-product-id]')) {
        event.preventDefault();
        openItem('product', event.target.dataset.productId);
      }
      if (event.key === 'Escape') {
        if (!el.productOverlay.hidden) closeProduct();
        else if (!el.cartOverlay.hidden) closeCart();
      }
    });

    el.productOverlay.addEventListener('click', event => {
      if (event.target === el.productOverlay) closeProduct();
    });
    el.cartOverlay.addEventListener('click', event => {
      if (event.target === el.cartOverlay) closeCart();
    });
    el.universeSwitch.addEventListener('click', returnToGate);
    el.cartButton.addEventListener('click', openCart);
    el.searchInput.addEventListener('input', event => {
      state.query = event.target.value;
      renderProducts();
    });
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    document.getElementById('clearCart').addEventListener('click', () => {
      state.cart = [];
      saveCart();
      renderCart();
      showToast('Panier vidé.');
    });
    el.sendOrderButton.addEventListener('click', sendOrder);
  }

  function init() {
    updateCartCount();
    initEvents();
    const requestedUniverse = new URLSearchParams(window.location.search).get('univers');
    if (['homme', 'femme'].includes(requestedUniverse)) chooseUniverse(requestedUniverse, { scroll: false });
  }

  init();
})();
