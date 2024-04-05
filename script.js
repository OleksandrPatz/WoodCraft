document.addEventListener("DOMContentLoaded", () => {
  const spans = document.querySelectorAll(".hero-paragraph-style");
  const heroIcon = document.querySelector(".hero-icon");
  const header = document.querySelector(".header");
  const navLinks = document.querySelectorAll(".nav-list-link");
  const navbarContainer = document.querySelector(".navbar-container");
  const mobileNavButton = document.querySelector(".btn-mobile-nav");
  const nav = document.querySelector(".nav");
  const iconMobileNavOpen = document.querySelector(
    '.icon-mobile-nav[name="reorder-three"]'
  );
  const iconMobileNavClose = document.querySelector(
    '.icon-mobile-nav[name="close"]'
  );
  const productsBoxes = document.querySelectorAll(".products__box");
  const statisticSection = document.querySelector(".statistic");
  let currentSpan = 0;

  // Sticky Navbar
  const observer = new IntersectionObserver(
    (entries) => {
      const ent = entries[0];
      navLinks.forEach((link) => {
        link.classList.toggle("animated", !ent.isIntersecting);
      });
    },
    {
      root: null,
      threshold: 0.1,
    }
  );
  observer.observe(header);

  // Анімація елементів Span
  function animateSpan() {
    spans[currentSpan].classList.remove("animate-span");
    currentSpan = (currentSpan + 1) % spans.length;
    spans[currentSpan].classList.add("animate-span");
    setTimeout(animateSpan, 2800); // Час відповідає тривалості анімації в CSS
  }
  setTimeout(animateSpan, 2800); // Початок після початкової затримки для синхронізації з CSS

  // Анімація іконки героя
  function animateIcon() {
    heroIcon.style.animation = "";
    setTimeout(() => {
      heroIcon.style.animation = "moveTopToBottom 1.4s infinite";
    }, 2800); // Синхронізація з animateSpan
  }
  animateIcon();

  // Перемикач мобільної навігації
  function toggleNav() {
    nav.classList.toggle("nav-open");
    iconMobileNavOpen.style.display = nav.classList.contains("nav-open")
      ? "none"
      : "block";
    iconMobileNavClose.style.display = nav.classList.contains("nav-open")
      ? "block"
      : "none";
  }

  mobileNavButton.addEventListener("click", toggleNav);

  // Перевірка видимості елементів для анімації
  function checkVisibility() {
    requestAnimationFrame(() => {
      // Видимість блоків продуктів
      productsBoxes.forEach((box) => {
        if (box.getBoundingClientRect().top < window.innerHeight - 100) {
          box.querySelectorAll(".products__item").forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("products__item-visible");
            }, index * 200); // Затримка анімації для кожного елементу
          });
        }
      });

      // Анімація секції статистики
      if (
        !statisticSection.classList.contains("animated") &&
        statisticSection.getBoundingClientRect().top < window.innerHeight - 100
      ) {
        statisticSection.classList.add("animated");
        animateStatistics();
      }
    });
  }

  // Зменшення частоти обробки подій прокрутки
  let isScrolling;
  window.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(checkVisibility, 66); // Близько 15 кадрів за секунду
    },
    false
  );

  checkVisibility(); // Первинна перевірка

  // Анімація статистики
  function animateStatistics() {
    const counters = statisticSection.querySelectorAll(".number");
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const step = (count) => {
        const increment = target / 200;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          requestAnimationFrame(() => step(+counter.innerText));
        } else {
          counter.innerText = target.toString();
        }
      };
      step(0);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("nav-open")) {
        toggleNav();
      }
    });
  });
});
