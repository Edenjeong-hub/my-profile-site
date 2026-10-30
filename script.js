// 모바일 메뉴 토글
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden') === false;
  menuBtn.setAttribute('aria-expanded', String(open));
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// 다크 모드 토글 (localStorage에 저장)
const toggleTheme = () => {
  const dark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', dark ? 'dark' : 'light');
};
['theme-toggle', 'theme-toggle-m'].forEach((id) =>
  document.getElementById(id).addEventListener('click', toggleTheme)
);

// 스크롤 페이드인
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 현재 섹션에 맞춰 내비게이션 강조
const links = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

// 터미널 타이핑 효과
const typed = document.getElementById('typed');
const lines = ['git push origin release', 'echo "Let\'s ship it 🚀"'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) {
  typed.textContent = lines[0];
} else {
  let li = 0, ci = 0, deleting = false;
  const tick = () => {
    const text = lines[li];
    ci += deleting ? -1 : 1;
    typed.textContent = text.slice(0, ci);
    let delay = deleting ? 30 : 70;
    if (!deleting && ci === text.length) { deleting = true; delay = 1800; }
    else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; delay = 400; }
    setTimeout(tick, delay);
  };
  tick();
}

// 푸터 연도
document.getElementById('year').textContent = new Date().getFullYear();
