"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { EASE_IN_OUT, EASE_OUT, INTRO_DONE, ScrollTrigger, SplitText, afterIntro, gsap, introWillPlay } from "../../lib/motion";
import { Wordmark } from "./Logo";

const MOTION = "(prefers-reduced-motion: no-preference)";
const FINE = "(prefers-reduced-motion: no-preference) and (pointer: fine)";
const WIDE = "(prefers-reduced-motion: no-preference) and (min-width: 1100px)";
const FADES = [
  ".section-heading > p", ".section-copy > *", ".service-description > *", ".principles article", ".belief-grid article",
  ".working-model > div", ".detail-capabilities article", ".step-list li", ".capabilities-heading p", ".process-intro > p",
  ".process-intro > .action", ".process-closing", ".cta-foot > p", ".cta-foot > div", ".form-aside > *", ".policy-content section",
  ".world-tabs > button", ".thread-section > .wrap > .action", ".service-index", ".page-hero-meta", ".why-section .action", ".studio-note .mini-label", ".studio-note .action",
].join(",");

/** Owns site-wide motion: smooth scrolling, scroll reveals, header state, cursor, magnetic actions and route curtains. */
export function MotionLayer() {
  const path = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const leaving = useRef(false);
  const arrived = useRef(false);
  const fallback = useRef<ReturnType<typeof setTimeout>>(undefined);
  const revealRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      root.classList.add("motion");
      const lenis = new Lenis({ lerp: .095, anchors: false });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (root.dataset.intro === "playing" || introWillPlay(location.pathname)) lenis.stop();
      const resume = () => lenis.start();
      window.addEventListener(INTRO_DONE, resume);

      const header = document.querySelector<HTMLElement>(".site-header");
      let last = scrollY;
      const onScroll = () => {
        const y = scrollY, hero = document.querySelector<HTMLElement>(".hero");
        header?.classList.toggle("is-solid", y > (hero ? hero.offsetHeight - 110 : 12));
        header?.classList.toggle("is-hidden", y > last && y > 420);
        last = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
      // Page depth drives both the top progress line and the header ticker.
      const progress = ScrollTrigger.create({ start: 0, end: "max", onUpdate: self => { gsap.set(bar.current, { scaleX: self.progress }); header?.style.setProperty("--depth", self.progress.toFixed(4)); } });

      const leave = (href: string) => {
        const el = curtain.current;
        if (!el || leaving.current) return;
        leaving.current = true;
        lenis.stop();
        gsap.timeline()
          .set(el, { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)" })
          .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: .62, ease: EASE_IN_OUT })
          .fromTo(el.querySelector(".curtain-word"), { yPercent: 110 }, { yPercent: 0, duration: .6, ease: EASE_OUT }, .3)
          .add(() => router.push(href));
        fallback.current = setTimeout(() => reveal(), 4500);
      };
      const reveal = () => {
        clearTimeout(fallback.current);
        leaving.current = false;
        lenis.start();
        lenis.resize();
        gsap.to(curtain.current, { clipPath: "inset(0% 0% 100% 0%)", duration: .75, delay: .12, ease: EASE_IN_OUT, onComplete: () => gsap.set(curtain.current, { visibility: "hidden" }) });
      };
      revealRef.current = reveal;
      const click = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const anchor = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
        if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download") || root.dataset.intro === "playing") return;
        const url = new URL(anchor.href, location.href);
        if (url.origin !== location.origin || url.pathname === location.pathname) return;
        // Next.js Link skips its own navigation for prevented clicks; the route is pushed once the curtain covers the page.
        event.preventDefault();
        leave(url.pathname + url.search + url.hash);
      };
      window.addEventListener("click", click, true);

      return () => {
        root.classList.remove("motion");
        window.removeEventListener(INTRO_DONE, resume);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("click", click, true);
        header?.classList.remove("is-solid", "is-hidden");
        header?.style.removeProperty("--depth");
        progress.kill();
        gsap.ticker.remove(tick);
        lenis.destroy();
        clearTimeout(fallback.current);
        leaving.current = false;
        revealRef.current = () => {};
        gsap.set(curtain.current, { visibility: "hidden" });
      };
    });

    mm.add(FINE, () => {
      const el = cursor.current;
      if (!el) return;
      root.classList.add("has-cursor");
      const ring = el.querySelector(".cursor-ring"), dot = el.querySelector(".cursor-dot"), label = el.querySelector(".cursor-label");
      const ringX = gsap.quickTo([ring, label], "x", { duration: .55, ease: "power3" }), ringY = gsap.quickTo([ring, label], "y", { duration: .55, ease: "power3" });
      const dotX = gsap.quickTo(dot, "x", { duration: .12, ease: "power3" }), dotY = gsap.quickTo(dot, "y", { duration: .12, ease: "power3" });
      let magnet: HTMLElement | null = null;
      const release = () => { if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: .8, ease: "elastic.out(1, .45)" }); magnet = null; };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        el.dataset.visible = "true";
        ringX(event.clientX); ringY(event.clientY); dotX(event.clientX); dotY(event.clientY);
        const target = event.target as Element;
        el.dataset.state = target.closest("input, textarea, select") ? "text"
          : target.closest(".service-art-link, .world-panels .world-art, .plan-frame") ? "view"
          : target.closest(".hero-art, .hero-copy h1") ? "look"
          : target.closest("a, button, [role=tab], label, summary") ? "link" : "";
        if (label) label.textContent = el.dataset.state === "look" ? "Scroll" : "View";
        const next = target.closest<HTMLElement>(".action:not(.action-text), .pill");
        if (next !== magnet) release();
        magnet = next;
        if (magnet) {
          const box = magnet.getBoundingClientRect();
          gsap.to(magnet, { x: (event.clientX - box.left - box.width / 2) * .28, y: (event.clientY - box.top - box.height / 2) * .38, duration: .5, ease: "power3.out" });
        }
      };
      const out = (event: PointerEvent) => { if (!event.relatedTarget) { el.dataset.visible = "false"; release(); } };
      const press = () => el.dataset.pressed = "true", lift = () => el.dataset.pressed = "false";
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerout", out);
      window.addEventListener("pointerdown", press); window.addEventListener("pointerup", lift);
      return () => {
        root.classList.remove("has-cursor"); release();
        window.removeEventListener("pointermove", move); document.removeEventListener("pointerout", out);
        window.removeEventListener("pointerdown", press); window.removeEventListener("pointerup", lift);
      };
    });
    return () => mm.revert();
  }, [router]);

  useEffect(() => {
    arrived.current = leaving.current;
    if (leaving.current) revealRef.current();
    let mm: gsap.MatchMedia | undefined, cancelled = false;
    const stop = afterIntro(path, () => {
      document.fonts.ready.then(() => {
        if (cancelled) return;
        mm = gsap.matchMedia();
        // Pins first, so later triggers measure positions with the pin spacing in place.
        mm.add(WIDE, () => buildProcess());
        mm.add(MOTION, () => buildPage(arrived.current ? .5 : 0));
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    });
    return () => { cancelled = true; stop(); mm?.revert(); };
  }, [path]);

  return <>
    <div className="scroll-progress" ref={bar} aria-hidden="true" />
    <div className="page-curtain" ref={curtain} aria-hidden="true"><span className="curtain-mask"><Wordmark className="curtain-word" /></span><span className="curtain-note">Technology and design studio</span></div>
    <div className="cursor" ref={cursor} aria-hidden="true"><span className="cursor-ring" /><span className="cursor-dot" /><span className="cursor-label">View</span></div>
  </>;
}

function buildPage(delay: number) {
  const main = document.querySelector("main");
  if (!main) return;
  const q = gsap.utils.selector(main);
  const once = (trigger: Element, start = "top 88%") => ({ trigger, start, once: true });

  const hero = main.querySelector<HTMLElement>(".hero");
  if (hero) {
    const path = hero.querySelector<SVGPathElement>(".hero-thread path");
    const length = path?.getTotalLength() ?? 0;
    gsap.timeline({ delay, defaults: { ease: EASE_OUT } })
      .from(q(".hero-art"), { scale: 1.14, opacity: 0, duration: 2.2, ease: "power3.out" }, 0)
      .from(q(".hero-line > span"), { yPercent: 112, duration: 1.4, stagger: .1 }, .05)
      .from(q(".hero-copy .kicker, .practice-plan, .hero-bar"), { opacity: 0, y: 14, duration: 1, stagger: .1 }, .3)
      .from(q(".hero-description > *"), { opacity: 0, y: 26, duration: 1.1, stagger: .1 }, .55)
      .from(q(".hero-bottom > *"), { opacity: 0, y: 12, duration: .9, stagger: .07 }, .75)
      .fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset" }, .2);
    const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
    gsap.to(q(".hero-copy"), { yPercent: -18, opacity: .15, ease: "none", scrollTrigger: scrub });
    gsap.to(q(".practice-plan"), { yPercent: -40, ease: "none", scrollTrigger: scrub });
    gsap.to(q(".hero-art"), { yPercent: 14, ease: "none", scrollTrigger: scrub });
  }

  q("h1").filter(h => !h.closest(".hero")).forEach(h => SplitText.create(h, {
    type: "lines", mask: "lines", linesClass: "split-line", autoSplit: true,
    onSplit: self => gsap.from(self.lines, { yPercent: 112, duration: 1.25, stagger: .09, ease: EASE_OUT, delay }),
  }));
  gsap.from(q(".page-hero .section-label, .page-intro > *, .page-hero .action, .page-hero .practice-status, .page-hero .plan-head, .page-hero-meta > *, .policy-page .section-label"), { opacity: 0, y: 22, duration: 1.1, stagger: .07, ease: EASE_OUT, delay: delay + .35 });
  q(".page-hero .world-art").forEach(art => gsap.timeline({ delay: delay + .15 })
    .fromTo(art, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: EASE_IN_OUT })
    .from(art.querySelector("svg"), { scale: 1.2, duration: 2, ease: EASE_OUT }, 0));

  q("h2").forEach(h => SplitText.create(h, {
    type: "lines", mask: "lines", linesClass: "split-line", autoSplit: true,
    onSplit: self => gsap.from(self.lines, { yPercent: 115, duration: 1.25, stagger: .09, ease: EASE_OUT, scrollTrigger: once(h) }),
  }));
  q(".section-label").filter(label => !label.closest(".page-hero")).forEach(label => gsap.timeline({ scrollTrigger: once(label, "top 92%") })
    .from(label, { opacity: 0, x: -16, duration: 1, ease: EASE_OUT })
    .from(label.querySelector("b, .bindu"), { opacity: 0, y: 8, duration: .7, ease: EASE_OUT }, .15));

  const fades = q(FADES).filter(el => !el.closest(".point-section .section-copy, .page-hero"));
  gsap.set(fades, { opacity: 0, y: 38 });
  // Reveal on entry, and also when a jump (anchor, history restore, pin) skips past an element.
  const show = (batch: Element[]) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.15, stagger: Math.min(.09, .5 / batch.length), ease: EASE_OUT, overwrite: true });
  const settle = (batch: Element[]) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true });
  ScrollTrigger.batch(fades, { start: "top 92%", onEnter: show, onEnterBack: show, onLeave: settle });

  q(".service-art-link, .viewer-stage, .studio-note-visual").forEach(art => gsap.timeline({ scrollTrigger: once(art, "top 85%") })
    .fromTo(art, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: EASE_IN_OUT })
    .from(art.querySelectorAll(":scope > svg, :scope > .indic, :scope > img, :scope > .viewer-shot.is-active img"), { scale: 1.18, duration: 2, ease: EASE_OUT }, 0));
  // Stacked practice cards: each covered card recedes and dims as the next one settles over it.
  if (matchMedia("(min-width: 761px)").matches) {
    const cards = q(".service-block");
    cards.forEach((card, index) => {
      const next = cards[index + 1];
      if (!next) return;
      gsap.timeline({ scrollTrigger: { trigger: next, start: "top bottom", end: `top ${100 + (index + 1) * 18}px`, scrub: true } })
        .to(card, { scale: .94, ease: "none" }, 0)
        .to(card.querySelector(".service-shade"), { opacity: .62, ease: "none" }, 0);
    });
  }

  q(".point-section .section-copy p").forEach(p => {
    const words = SplitText.create(p, { type: "words" }).words;
    gsap.fromTo(words, { opacity: .14 }, { opacity: 1, stagger: .1, ease: "none", scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 60%", scrub: true } });
  });
  q(".point-signature, .name-mark, .studio-note-visual .indic, .belief-grid h3").forEach(el => gsap.fromTo(el, { yPercent: 18 }, { yPercent: -18, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }));
  q(".marquee-track").forEach((track, index) => gsap.fromTo(track, { xPercent: index % 2 ? -50 : 0 }, { xPercent: index % 2 ? 0 : -50, ease: "none", scrollTrigger: { trigger: track.parentElement, start: "top bottom", end: "bottom top", scrub: .6 } }));

  const footer = document.querySelector(".site-footer");
  const word = footer?.querySelector(".footer-word");
  if (footer && word) {
    const chars = SplitText.create(word, { type: "chars", mask: "chars", charsClass: "split-char" }).chars;
    gsap.timeline({ scrollTrigger: once(footer, "top 80%") })
      .from(chars, { yPercent: 110, duration: 1.3, stagger: .05, ease: EASE_OUT })
      .from(footer.querySelectorAll(".footer-top > *, .footer-bottom"), { opacity: 0, y: 24, duration: 1, stagger: .1, ease: EASE_OUT }, .3);
  }
}

function buildProcess() {
  const section = document.querySelector<HTMLElement>(".process-section");
  const list = section?.querySelector<HTMLElement>(".step-list");
  const frame = section?.querySelector<HTMLElement>(".wrap");
  if (!section || !list || !frame) return;
  section.classList.add("is-horizontal");
  const distance = () => Math.max(0, list.scrollWidth - frame.clientWidth);
  gsap.to(list, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance() + 200}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
  return () => section.classList.remove("is-horizontal");
}
