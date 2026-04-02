const advicePool = [
  'На новом месте не меняй приманку каждые две минуты. Сначала пойми глубину, течение и наличие укрытий.',
  'Если вода слишком тихая, то шум с берега слышен сильнее, чем кажется. Рыбу часто пугают раньше первого заброса.',
  'Толще леска — не значит умнее. Грубая оснастка часто убивает осторожные поклёвки.',
  'Не влюбляйся в красивый берег. Работает не картинка, а рельеф, корм и поведение воды.',
  'Если место молчит слишком долго, двигайся. Упрямство редко ловит лучше наблюдательности.',
  'Вечером полезнее вернуться на уже понятную точку, чем вслепую искать новую.'
];

const quotes = [
  'Рыбалка начинается не с заброса, а с тишины.',
  'Лучшее место не кричит о себе.',
  'На воде побеждает не суета, а наблюдение.'
];

function openTipModal() {
  const modal = document.getElementById('tipModal');
  const text = document.getElementById('modalTipText');
  if (!modal || !text) return;
  const randomTip = advicePool[Math.floor(Math.random() * advicePool.length)];
  text.textContent = randomTip;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeTipModal() {
  const modal = document.getElementById('tipModal');
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

['tipBtn', 'tipBtnSecondary', 'nextTipBtn'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('click', openTipModal);
});

const closeBtn = document.getElementById('closeTipModal');
if (closeBtn) closeBtn.addEventListener('click', closeTipModal);

const modal = document.getElementById('tipModal');
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTipModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTipModal();
  });
}

const countEl = document.getElementById('catch-count');
if (countEl) {
  let n = 0;
  const target = Number(countEl.dataset.target || 12);
  const tick = () => {
    n += 1;
    countEl.textContent = n;
    if (n < target) setTimeout(tick, 80);
  };
  tick();
}

const quoteEl = document.getElementById('quote');
if (quoteEl) {
  let i = 0;
  setInterval(() => {
    i = (i + 1) % quotes.length;
    quoteEl.classList.add('fade-swap');
    setTimeout(() => {
      quoteEl.textContent = quotes[i];
      quoteEl.classList.remove('fade-swap');
    }, 180);
  }, 3400);
}

const fishTabs = document.querySelectorAll('.fish-tab');
const fishViews = document.querySelectorAll('.fish-view');
if (fishTabs.length && fishViews.length) {
  fishTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      fishTabs.forEach(item => item.classList.remove('active'));
      fishViews.forEach(view => view.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.fish);
      if (target) target.classList.add('active');
    });
  });
}


function openContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

const contactBtn = document.getElementById('contactBtn');
if (contactBtn) contactBtn.addEventListener('click', openContactModal);
const closeContactBtn = document.getElementById('closeContactModal');
if (closeContactBtn) closeContactBtn.addEventListener('click', closeContactModal);
const contactModal = document.getElementById('contactModal');
if (contactModal) {
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContactModal();
  });
}
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('contactStatus');
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    if (!name || !email || !message) {
      if (status) status.textContent = 'Заполните все поля.';
      return;
    }
    if (status) status.textContent = 'Сообщение принято. Ответ обычно дают в течение дня.';
    contactForm.reset();
  });
}
