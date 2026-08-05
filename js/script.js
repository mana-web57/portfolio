
const header = document.querySelector('.header');
const button = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
});

button?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  document.body.style.overflow = open ? 'hidden' : '';
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    button?.setAttribute('aria-expanded', 'false');
    button?.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const heroSlides = [...document.querySelectorAll('.hero-slide')];
const phoneSlides = [...document.querySelectorAll('.phone-slide')];
const heroCurrent = document.getElementById('heroCurrent');
let heroIndex = 0;
if (heroSlides.length) {
  setInterval(() => {
    heroSlides[heroIndex].classList.remove('is-active');
    phoneSlides[heroIndex]?.classList.remove('is-active');
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add('is-active');
    phoneSlides[heroIndex]?.classList.add('is-active');
    if (heroCurrent) heroCurrent.textContent = String(heroIndex + 1).padStart(2, '0');
  }, 5600);
}


