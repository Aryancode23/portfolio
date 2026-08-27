/* =========================================================
   ARYAN SINGH — INTERACTION ENGINE
   ========================================================= */

document.body.classList.add("loading");

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

let loaded = 0;
const loadNum = $("#loadNum");
const loadBar = $("#loadBar");
const loader = $("#loader");

const loadingTimer = setInterval(() => {
  loaded += Math.floor(Math.random() * 9) + 3;
  if (loaded >= 100) loaded = 100;
  loadNum.textContent = loaded;
  loadBar.style.width = loaded + "%";

  if (loaded === 100) {
    clearInterval(loadingTimer);
    setTimeout(() => {
      loader.style.transition = "opacity .7s ease, transform .9s cubic-bezier(.2,.8,.2,1)";
      loader.style.opacity = "0";
      loader.style.transform = "translateY(-100%)";
      document.body.classList.remove("loading");
      intro();
    }, 300);
  }
}, 55);

/* Smooth scrolling */
let lenis;
if (window.Lenis) {
  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    touchMultiplier: 1.1
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

/* GSAP */
gsap.registerPlugin(ScrollTrigger);

function intro() {
  const tl = gsap.timeline();
  tl.to(".hero .eyebrow", { opacity: 1, y: 0, duration: .7, ease: "power3.out" })
    .to(".hero-title .line", { y: 0, duration: 1.05, stagger: .11, ease: "power4.out" }, "-=.35")
    .to(".hero-bottom .reveal", { opacity: 1, y: 0, duration: .7, stagger: .1, ease: "power3.out" }, "-=.55")
    .to(".hero-photo-wrap", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=.65");

  setupScrollAnimations();
}

/* Reveal animations */
function setupScrollAnimations() {
  $$(".reveal").forEach((el) => {
    if (el.closest(".hero")) return;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: .9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true
      }
    });
  });

  $$(".section-title").forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true }
    });
  });

  gsap.to(".hero-grid", {
    yPercent: 18,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });

  gsap.to(".hero-photo-wrap", {
    y: 130,
    rotate: -4,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 }
  });

  gsap.to(".manifesto-word", {
    xPercent: -8,
    scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: 1 }
  });

  /* Journey timeline: growing line + traveling pulse, synced to scroll */
  const journeyTrack = $("#journeyTrack");
  const journeyFill = $("#journeyFill");
  const journeyPulse = $("#journeyPulse");
  if (journeyTrack && journeyFill && journeyPulse) {
    gsap.set(journeyPulse, { top: "0%" });
    gsap.timeline({
      scrollTrigger: {
        trigger: journeyTrack,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 0.6
      }
    })
      .to(journeyFill, { height: "100%", ease: "none" }, 0)
      .to(journeyPulse, { top: "100%", ease: "none" }, 0);
  }

  /* Counter animation */
  $$(".stat strong[data-count]").forEach(el => {
    const target = Number(el.dataset.count);
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.7,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        const v = Math.round(obj.value);
        el.textContent = target >= 1000 ? v.toLocaleString() + "+" : v;
      }
    });
  });
}

/* Magnetic elements */
$$(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 900) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * .18, y: y * .18, duration: .35, ease: "power3.out" });
    $(".cursor-ring")?.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { x: 0, y: 0, duration: .5, ease: "elastic.out(1, .45)" });
    $(".cursor-ring")?.classList.remove("active");
  });
});

/* Custom cursor */
const dot = $(".cursor-dot");
const ring = $(".cursor-ring");
let mx = innerWidth / 2, my = innerHeight / 2;
let rx = mx, ry = my;

window.addEventListener("mousemove", (e) => {
  mx = e.clientX; my = e.clientY;
  gsap.to(dot, { x: mx, y: my, duration: .08, ease: "none" });
});

gsap.ticker.add(() => {
  rx += (mx - rx) * .14;
  ry += (my - ry) * .14;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
});

$$("a, .skill-pill, .project-card, .certificate-stage").forEach(el => {
  el.addEventListener("mouseenter", () => ring?.classList.add("active"));
  el.addEventListener("mouseleave", () => ring?.classList.remove("active"));
});

/* Scroll progress */
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  $("#scrollProgress").style.width = (scrollY / max * 100) + "%";
}, { passive: true });

/* 3D tilt on project visuals */
$$(".project-visual").forEach(card => {
  card.addEventListener("mousemove", e => {
    if (innerWidth <= 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    gsap.to(card, {
      rotateY: x * 7,
      rotateX: -y * 7,
      transformPerspective: 800,
      duration: .5,
      ease: "power2.out"
    });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: .8, ease: "power3.out" });
  });
});

/* Interactive skill cloud */
$$(".skill-pill").forEach((pill, i) => {
  pill.addEventListener("mouseenter", () => {
    gsap.to(pill, {
      scale: 1.08,
      rotation: (i % 2 ? 2 : -2),
      duration: .25,
      ease: "back.out(2)"
    });
  });
  pill.addEventListener("mouseleave", () => {
    gsap.to(pill, { scale: 1, rotation: 0, duration: .45, ease: "elastic.out(1,.5)" });
  });
});

/* Pause marquee when hovering */
$$(".marquee, .ticker-track").forEach(m => {
  m.addEventListener("mouseenter", () => m.style.animationPlayState = "paused");
  m.addEventListener("mouseleave", () => m.style.animationPlayState = "running");
});

/* Active nav based on sections */
const sections = $$("section[id]");
const navLinks = $$(".nav-link");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = navLinks.find(link => link.getAttribute("href") === "#" + entry.target.id);
      active?.classList.add("active");
    }
  });
}, { rootMargin: "-45% 0px -45% 0px" });
sections.forEach(s => observer.observe(s));

/* Mobile menu */
const navToggle = $("#navToggle");
const mobileMenu = $("#mobileMenu");
if (navToggle && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    lenis?.start();
  };
  const openMenu = () => {
    mobileMenu.classList.add("open");
    navToggle.classList.add("active");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    lenis?.stop();
  };
  navToggle.addEventListener("click", () => {
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  });
  $$(".mobile-menu-links .nav-link, .mobile-menu-cta").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

/* Contact form — submits to FormSubmit without leaving the page */
const contactForm = $("#contactForm");
if (contactForm) {
  const statusEl = $("#formStatus");
  const submitBtn = contactForm.querySelector(".form-submit");
  const submitLabel = contactForm.querySelector(".form-submit-label");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const action = contactForm.getAttribute("action");
    const ajaxUrl = action.replace("https://formsubmit.co/", "https://formsubmit.co/ajax/");

    submitBtn.disabled = true;
    submitLabel.textContent = "Sending...";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    try {
      const res = await fetch(ajaxUrl, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(contactForm)
      });
      if (!res.ok) throw new Error("Request failed");

      statusEl.textContent = "Message sent — thanks, I'll reply soon.";
      statusEl.className = "form-status success";
      contactForm.reset();
    } catch (err) {
      statusEl.textContent = "Couldn't send that — try emailing me directly instead.";
      statusEl.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = "Send it";
    }
  });
}
