// ── Hamburger menu ──
const ham = document.getElementById('hamburger');
const nav = document.getElementById('navLinks');
ham.addEventListener('click', () => {
  nav.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// ── Nav scroll shadow ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// ── Carousel ──
const track = document.getElementById('carouselTrack');
const slides = track.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');
let current = 0;
const total = slides.length;

// Build dots
slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', 'Slide ' + (i + 1));
  d.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(d);
});

function updateDots() {
  dotsContainer.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

function goTo(idx) {
  current = (idx + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
}

document.getElementById('carouselPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('carouselNext').addEventListener('click', () => goTo(current + 1));

// Auto-advance
let autoplay = setInterval(() => goTo(current + 1), 5500);
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
track.parentElement.addEventListener('mouseleave', () => {
  clearInterval(autoplay);
  autoplay = setInterval(() => goTo(current + 1), 5500);
});

// Touch swipe
let touchStart = null;
track.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  if (touchStart === null) return;
  const diff = touchStart - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
  touchStart = null;
});

// ── Gallery Lightbox ──
const galleryLabels = [
  'Dashboard Principal',
  'PDV / Vendas',
  'Gestão de Estoque',
  'Relatórios Gerenciais',
  'Fiscal / NF-e',
];
let lbCurrent = 0;

function openLightbox(idx) {
  const items = document.querySelectorAll('.gallery-item img');
  if (items.length === 0) return; // sem imagens ainda
  lbCurrent = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateLightbox() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items[lbCurrent]) return;
  document.getElementById('lightboxImg').src = items[lbCurrent].src;
  document.getElementById('lightboxImg').alt = galleryLabels[lbCurrent] || '';
  document.getElementById('lightboxCaption').textContent = galleryLabels[lbCurrent] || '';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function closeLightboxOutside(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

function lightboxNav(dir) {
  const total = document.querySelectorAll('.gallery-item img').length;
  lbCurrent = (lbCurrent + dir + total) % total;
  updateLightbox();
}

document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxNav(-1);
  if (e.key === 'ArrowRight') lightboxNav(1);
});

// ── Serviços Carousel ──────────────────────────────────────
(function(){
  var track   = document.getElementById('scTrack');
  var dotsBox = document.getElementById('scDots');
  var btnPrev = document.getElementById('scPrev');
  var btnNext = document.getElementById('scNext');
  if(!track) return;

  var cards   = Array.from(track.querySelectorAll('.sc-card'));
  var total   = cards.length;
  var cur     = 0;

  function perPage(){
    return window.innerWidth <= 560 ? 1 : window.innerWidth <= 900 ? 2 : 3;
  }
  function maxIdx(){ return Math.max(0, total - perPage()); }

  function buildDots(){
    dotsBox.innerHTML = '';
    var pages = Math.ceil(total / perPage());
    for(var i=0;i<pages;i++){
      (function(idx){
        var d = document.createElement('button');
        d.className = 'sc-dot';
        dotsBox.appendChild(d);
        d.addEventListener('click', function(){ goTo(idx * perPage()); });
      })(i);
    }
    updateDots();
  }

  function updateDots(){
    var page = Math.round(cur / perPage());
    Array.from(dotsBox.querySelectorAll('.sc-dot')).forEach(function(d,i){
      d.classList.toggle('active', i===page);
    });
  }

  function goTo(idx){
    cur = Math.max(0, Math.min(idx, maxIdx()));
    var cardW = cards[0].getBoundingClientRect().width;
    var gap   = 24;
    track.style.transform = 'translateX(-' + (cur*(cardW+gap)) + 'px)';
    updateDots();
    btnPrev.disabled = cur === 0;
    btnNext.disabled = cur >= maxIdx();
  }

  btnPrev.addEventListener('click', function(){ goTo(cur - perPage()); });
  btnNext.addEventListener('click', function(){ goTo(cur + perPage()); });

  var timer = setInterval(function(){
    goTo(cur + perPage() > maxIdx() ? 0 : cur + perPage());
  }, 4500);

  track.parentElement.addEventListener('mouseenter', function(){ clearInterval(timer); });
  track.parentElement.addEventListener('mouseleave', function(){
    clearInterval(timer);
    timer = setInterval(function(){
      goTo(cur + perPage() > maxIdx() ? 0 : cur + perPage());
    }, 4500);
  });

  var tx = null;
  track.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; }, {passive:true});
  track.addEventListener('touchend',   function(e){
    if(tx===null) return;
    var d = tx - e.changedTouches[0].clientX;
    if(Math.abs(d)>40) goTo(cur + (d>0 ? perPage() : -perPage()));
    tx = null;
  });

  window.addEventListener('resize', function(){ buildDots(); goTo(0); });

  buildDots();
  goTo(0);
})();

/**
 * função para chamar o whatsapp com ou sem complemento.
 * para chamar a função sem qualquer complemento na mensagem (ou seja,a mensagem padrão),
 * chame a função sem passar o parâmetro complemento.
 * para criar a função com mensagem específica, passe uma string para o complemento.
 * para criar uma mensagem 100% personalizada, chame o parâmetro absolute;
 */
function ChamarWhatsapp(complemento, absolute) {
  msg = `https://wa.me/557991808054?text=Olá!%20Gostaria%20de%20contratar%20a%20MarkSystte%21`;
  if (complemento != undefined)
    msg = `https://wa.me/557991808054?text=Olá!%20Gostaria%20de%20conhecer%20mais%20sobre ${complemento}.`;

  if (absolute != undefined)
    msg = `https://wa.me/557991808054?text=${absolute}`;

  window.open(msg);
  contratarServico();
}

function contratarServico() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(13,42,74,.7);backdrop-filter:blur(8px);
    display:flex;align-items:center;justify-content:center;
    animation:fadeIn .25s ease;
  `;
  overlay.innerHTML = `
    <div style="
      background:#fff;border-radius:18px;padding:48px 40px;max-width:440px;width:90%;
      text-align:center;box-shadow:0 24px 80px rgba(13,42,74,.25);
      animation:slideUp .3s ease;
    ">
      <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#1a5f9e,#4aa3d4);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 8px 28px rgba(26,95,158,.35);">
        <i class="fa-solid fa-check" style="color:#fff;font-size:1.5rem"></i>
      </div>
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.7rem;color:#0d2a4a;font-weight:700;margin-bottom:10px">Obrigado!</h3>
      <p style="color:#3a5068;font-size:.9rem;line-height:1.7;margin-bottom:28px">Obrigado pelo interesse na MarkSystte! Nossa equipe comercial responderá sua mensagem em até <strong>2 horas</strong>.</p>
      <button onclick="this.closest('div[style*=fixed]').remove()" style="background:#1a5f9e;color:#fff;border:none;padding:12px 32px;border-radius:8px;font-size:.9rem;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;box-shadow:0 6px 20px rgba(26,95,158,.3);">Fechar</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  const style = document.createElement('style');
  style.textContent = `@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}`;
  document.head.appendChild(style);
}