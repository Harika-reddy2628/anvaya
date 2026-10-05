"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { createScope, createTimeline, type Scope } from "animejs";
import { ArrowUpRight } from "lucide-react";
import styles from "./StudioIntro.module.css";

const IntroReady = createContext(true);
const SESSION_KEY = "anvaya-intro-seen-v4";
// A finite type-study sequence, not a download progress indicator.
const MONOGRAM_SEQUENCE = [0, 1, 2, 3, 1, 2, 0];
const MONOGRAM_INTERVAL_MS = 400;
const EXIT_START_MS = 2680;
const EXIT_DURATION_MS = 520;
export const useIntroReady = () => useContext(IntroReady);

export function StudioIntro({ children }: { children: ReactNode }) {
  const path = usePathname();
  const initialPath = useRef(path);
  const [ready, setReady] = useState(path !== "/");
  const screen = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const overlay = screen.current;
    const background = content.current;
    if (!overlay || !background) return;
    let scope: Scope | null = null;
    let finished = false;
    let fallback: ReturnType<typeof setTimeout> | null = null;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    function unlock() {
      background!.inert = false;
      document.body.style.overflow = previousOverflow;
    }

    function finish() {
      if (finished) return;
      finished = true;
      if (fallback) clearTimeout(fallback);
      scope?.revert();
      overlay!.hidden = true;
      unlock();
      if (path === "/") {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* Storage is optional. */
        }
      }
      if (overlay!.contains(document.activeElement)) {
        const destination =
          previousFocus &&
          previousFocus !== document.body &&
          !overlay!.contains(previousFocus)
            ? previousFocus
            : background!.querySelector<HTMLElement>("main");
        if (destination?.tagName === "MAIN")
          destination.setAttribute("tabindex", "-1");
        destination?.focus({ preventScroll: true });
      }
      setReady(true);
    }

    finishRef.current = finish;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* Private browsing still works. */
    }
    if (
      path !== "/" ||
      initialPath.current !== "/" ||
      seen ||
      preference.matches ||
      window.location.hash ||
      window.getComputedStyle(overlay).visibility === "hidden"
    ) {
      finish();
      return;
    }

    overlay.hidden = false;
    background.inert = true;
    document.body.style.overflow = "hidden";
    skip.current?.focus({ preventScroll: true });
    fallback = setTimeout(finish, 5000);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (event.key === "Tab" && !finished) {
        event.preventDefault();
        skip.current?.focus({ preventScroll: true });
      }
    };
    const onPreference = () => {
      if (preference.matches) finish();
    };
    window.addEventListener("keydown", onKey);
    preference.addEventListener("change", onPreference);

    scope = createScope({ root: overlay }).add(() => {
      const timeline = createTimeline({
        defaults: { ease: "outCubic" },
        onComplete: finish,
      });
      MONOGRAM_SEQUENCE.forEach((variant, index) => {
        const position = index * MONOGRAM_INTERVAL_MS;
        timeline
          .set("[data-intro-monogram]", { opacity: 0 }, position)
          .set(`[data-intro-monogram="${variant}"]`, { opacity: 1 }, position);
      });
      timeline
        .call(() => setReady(true), EXIT_START_MS - 140)
        .add(
          overlay,
          { opacity: [1, 0], duration: EXIT_DURATION_MS },
          EXIT_START_MS,
        );
    });

    return () => {
      finished = true;
      if (fallback) clearTimeout(fallback);
      scope?.revert();
      unlock();
      window.removeEventListener("keydown", onKey);
      preference.removeEventListener("change", onPreference);
      finishRef.current = () => {};
    };
  }, [path]);

  return (
    <IntroReady.Provider value={ready}>
      <div
        ref={screen}
        className={styles.screen}
        hidden={path !== "/"}
        role="dialog"
        aria-modal="true"
        aria-label="Anvaya studio introduction"
        data-studio-intro
      >
        <div className={styles.center}>
          <div
            className={styles.identity}
            data-intro-identity
            aria-hidden="true"
          >
            {[
              styles.sansSolid,
              styles.serifOutline,
              styles.serifSolid,
              styles.sansOutline,
            ].map((variant, index) => (
              <span
                className={`${styles.monogram} ${variant}`}
                key={variant}
                data-intro-monogram={index}
              >
                A<span>.</span>
              </span>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <button
            ref={skip}
            type="button"
            className={styles.skip}
            onClick={() => finishRef.current()}
          >
            Skip intro <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <noscript>
        <style>{"[data-studio-intro] { display: none !important; }"}</style>
      </noscript>
      <div ref={content} className={styles.content} data-studio-content>
        {children}
      </div>
    </IntroReady.Provider>
  );
}
