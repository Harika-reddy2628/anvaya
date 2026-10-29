"use client";
import { useRef, type MouseEvent, type ReactNode } from "react";

/* FAQ rows stay native <details>, so they open without JavaScript and keep their semantics. With JavaScript the
   summary click is intercepted: the answer's height eases open or closed with a light fade and lift, and the icon
   turns at the click (data-open) rather than when the animation ends. Reduced motion toggles instantly. */

const OPEN = { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" };
const CLOSE = { duration: 300, easing: "cubic-bezier(.4,0,.2,1)" };

function FaqItem({ number, question, answer }: { number: string; question: string; answer: ReactNode }) {
  const item = useRef<HTMLDetailsElement>(null), body = useRef<HTMLDivElement>(null), running = useRef<Animation[]>([]);

  function toggle(event: MouseEvent) {
    const details = item.current, panel = body.current;
    if (!details || !panel || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    // A closed <details> can still report its content's height, so a closed row always starts from zero.
    const from = details.open ? panel.getBoundingClientRect().height : 0;
    running.current.forEach(animation => animation.cancel());
    const opening = !(details.open && details.dataset.open !== "false");
    details.dataset.open = String(opening);
    if (opening) details.open = true;
    const to = opening ? panel.scrollHeight : 0;
    const content = panel.firstElementChild as HTMLElement | null;
    const height = panel.animate([{ height: `${from}px` }, { height: `${to}px` }], opening ? OPEN : CLOSE);
    const fade = content?.animate(opening ? [{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }] : [{ opacity: 1 }, { opacity: 0 }], opening ? OPEN : CLOSE);
    running.current = fade ? [height, fade] : [height];
    height.onfinish = () => {
      if (!opening) details.open = false;
      running.current = [];
    };
  }

  return <details className="faq-item" ref={item}>
    <summary onClick={toggle}><span className="faq-number">{number}</span><span className="faq-question">{question}</span><span className="faq-icon" aria-hidden="true" /></summary>
    <div className="faq-body" ref={body}><div className="faq-answer">{answer}</div></div>
  </details>;
}

export function Faq({ items }: { items: readonly (readonly [string, ReactNode])[] }) {
  return <div className="faq-list">{items.map(([question, answer], index) => <FaqItem key={question} number={String(index + 1).padStart(2, "0")} question={question} answer={answer} />)}</div>;
}
