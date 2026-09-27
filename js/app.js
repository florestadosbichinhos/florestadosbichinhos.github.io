/* Floresta dos Bichinhos — comportamento da página. Sem dependência externa. */

// Links de download e do repositório do jogo. Vazio = aparece "Em breve".
const LINKS = {
  android: '',
  macos: '',
  linux: '',
  windows: '',
  contribute: '',
  game: '',
};

// Trailer gravado em cada idioma do jogo (tools/trailer no repositório do jogo).
const TRAILERS = {
  'pt-BR': 'assets/video/trailer-pt_BR',
  it: 'assets/video/trailer-it',
};

const FALLBACK_LANG = 'pt-BR';
const LANG_KEY = 'fdb-lang';
const SLIDE_INTERVAL = 4000;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add('js');

// ── idioma ────────────────────────────────────────────────────────
function readStoredLang() {
  try {
    return localStorage.getItem(LANG_KEY);
  } catch {
    return null;
  }
}

function pickLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  const candidates = [fromUrl, readStoredLang(), ...(navigator.languages || [navigator.language])];
  for (const candidate of candidates) {
    if (!candidate) continue;
    if (STRINGS[candidate]) return candidate;
    const base = candidate.split('-')[0];
    const match = Object.keys(STRINGS).find((code) => code.split('-')[0] === base);
    if (match) return match;
  }
  return FALLBACK_LANG;
}

function applyLang(lang) {
  const table = STRINGS[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = table[node.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((node) => {
    node.alt = table[node.dataset.i18nAlt];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
    node.setAttribute('aria-label', table[node.dataset.i18nAria]);
  });
  document.querySelectorAll('.lang__btn').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
  });
  applyTrailer(lang);
  document.querySelectorAll('.peek__dot').forEach((dot, index) => {
    dot.setAttribute('aria-label', `${table.slideGo} ${index + 1}`);
  });
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // navegação privada: só não lembra a escolha
  }
}

function applyTrailer(lang) {
  const video = document.querySelector('.trailer');
  if (!video) return;
  const base = TRAILERS[lang] || TRAILERS[FALLBACK_LANG];
  const source = video.querySelector('source');
  if (source.getAttribute('src') === `${base}.mp4`) return;
  video.pause();
  video.poster = `${base}.webp`;
  source.src = `${base}.mp4`;
  video.load();
}

document.querySelectorAll('.lang__btn').forEach((button) => {
  button.addEventListener('click', () => applyLang(button.dataset.lang));
});

// ── links "em breve" ──────────────────────────────────────────────
document.querySelectorAll('[data-link]').forEach((node) => {
  const url = LINKS[node.dataset.link];
  if (url) {
    node.href = url;
    return;
  }
  node.removeAttribute('href');
  node.setAttribute('aria-disabled', 'true');
});

// ── menu no celular ───────────────────────────────────────────────
function setupMenu() {
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.menu-toggle');
  if (!nav || !toggle) return;
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
}

// ── carrossel das fases ───────────────────────────────────────────
function setupCarousel() {
  const peek = document.querySelector('.peek');
  if (!peek) return;
  const track = peek.querySelector('.peek__track');
  const slides = [...track.children];
  const captions = [...peek.querySelectorAll('.peek__caption')];
  const dotsBox = peek.querySelector('.peek__dots');
  let current = 0;
  let timer = null;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== current)));
    captions.forEach((caption, i) => caption.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
  };
  const restartTimer = () => {
    clearInterval(timer);
    if (reducedMotion) return;
    timer = setInterval(() => showSlide(current + 1), SLIDE_INTERVAL);
  };
  const go = (index) => {
    showSlide(index);
    restartTimer();
  };

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'peek__dot';
    dot.addEventListener('click', () => go(index));
    dotsBox.append(dot);
    return dot;
  });

  peek.querySelector('.peek__arrow--prev').addEventListener('click', () => go(current - 1));
  peek.querySelector('.peek__arrow--next').addEventListener('click', () => go(current + 1));
  peek.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') go(current - 1);
    if (event.key === 'ArrowRight') go(current + 1);
  });
  const stage = peek.querySelector('.peek__stage');
  stage.addEventListener('mouseenter', () => clearInterval(timer));
  stage.addEventListener('mouseleave', restartTimer);
  peek.addEventListener('focusin', () => clearInterval(timer));
  peek.addEventListener('focusout', restartTimer);

  showSlide(0);
  restartTimer();
}

// ── entrada suave das seções ──────────────────────────────────────
const revealables = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealables.forEach((node) => node.classList.add('is-in'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealables.forEach((node) => observer.observe(node));
}

setupMenu();
setupCarousel();
applyLang(pickLang());

// verificação: ?check=overflow escreve no título se há rolagem lateral
if (new URLSearchParams(location.search).get('check') === 'overflow') {
  const root = document.documentElement;
  document.title = `overflow=${root.scrollWidth > root.clientWidth} ${root.scrollWidth}/${root.clientWidth}`;
}
