"use client";
import { useActionState, useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent, type ReactNode } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { sendEnquiry } from "../../project/actions";
import { budgetOptions, practices, timelineOptions } from "../../lib/site";
import { enquiryText, initialEnquiryState, parseEnquiry, type EnquiryState } from "../../lib/enquiry";
import { ComingSoon } from "./Shared";

/* Three short steps: what you need, the project, how to reach you. Every field stays in the one <form>, so the server
   action receives everything; before hydration (or without JavaScript) all steps show at once and submit normally. */
const steps = [
  { title: "What do you need?", hint: "Pick one or more. Not sure? That is fine too.", label: "Your needs", fields: ["services"] },
  { title: "Tell us about the project.", hint: "A few lines is enough. We will ask the rest.", label: "The project", fields: ["outcome", "timeline", "budget", "context"] },
  { title: "How can we reach you?", hint: "We reply by email with a clear next step.", label: "Your details", fields: ["name", "company", "email", "phone"] },
] as const;
const starters = ["A new website for my business", "An app for my customers", "Automate WhatsApp replies and follow-ups", "3D renders of a building or interior"];
const MIN_OUTCOME = 10;
type Values = { name: string; company: string; email: string; phone: string; outcome: string; timeline: string; budget: string; context: string };

export function ProjectForm({ initialService, onRestart }: { initialService?: string; onRestart?: () => void }) {
  const [state, action, pending] = useActionState(sendEnquiry, initialEnquiryState);
  const initialPractice = practices.find(p => p.id === initialService);
  const [selection, setSelection] = useState<string[]>(initialPractice && !initialPractice.comingSoon ? [initialPractice.id] : ["unsure"]);
  const [values, setValues] = useState<Values>({ name: "", company: "", email: "", phone: "", outcome: "", timeline: "Not sure yet", budget: "Need guidance", context: "" });
  const [step, setStep] = useState(0);
  const [stepped, setStepped] = useState(false);
  const [local, setLocal] = useState<Record<string, string>>({});
  const [offline, setOffline] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLLegendElement>(null);
  // A new id whenever the answers change; a retry of the same answers reuses it, so the provider can de-duplicate.
  const [submissionId, setSubmissionId] = useState("");
  const moved = useRef(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- ids and stepping exist only once hydrated
    setSubmissionId(crypto.randomUUID()); setStepped(true);
    const update = () => setOffline(!navigator.onLine);
    update(); addEventListener("online", update); addEventListener("offline", update);
    return () => { removeEventListener("online", update); removeEventListener("offline", update); };
  }, []);
  // Server errors: return to the step that holds the first invalid field and focus it.
  useEffect(() => {
    if (state.status === "idle") return;
    const first = Object.keys(state.errors || {})[0];
    const owner = first ? steps.findIndex(s => (s.fields as readonly string[]).includes(first)) : -1;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- follow the server's verdict to the right step
    if (owner >= 0) setStep(owner);
    requestAnimationFrame(() => {
      const invalid = first ? form.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null;
      if (invalid) invalid.focus(); else status.current?.focus({ preventScroll: true });
    });
  }, [state]);
  useEffect(() => { if (moved.current) heading.current?.focus(); }, [step]);

  const errors: Record<string, string> = { ...(state.errors || {}), ...local };
  function fresh() { setSubmissionId(crypto.randomUUID()); }
  function clear(name: string) { if (local[name]) setLocal(previous => Object.fromEntries(Object.entries(previous).filter(([key]) => key !== name))); }
  function choose(id: string) {
    fresh(); clear("services");
    setSelection(previous => id === "unsure" ? ["unsure"] : previous.includes(id) ? (previous.filter(p => p !== id).length ? previous.filter(p => p !== id) : ["unsure"]) : [...previous.filter(p => p !== "unsure"), id]);
  }
  function set(name: keyof Values, value: string) { setValues(previous => ({ ...previous, [name]: value })); fresh(); clear(name); }
  /** Checks only the fields on one step, with the same rules the server applies. */
  function check(index: number) {
    const found = parseEnquiry(new FormData(form.current!)).errors;
    const mine = Object.fromEntries(Object.entries(found).filter(([key]) => (steps[index].fields as readonly string[]).includes(key)));
    setLocal(mine);
    const first = Object.keys(mine)[0];
    if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    return !first;
  }
  function go(index: number) { moved.current = true; setStep(index); }
  function next() { if (check(step)) go(Math.min(step + 1, steps.length - 1)); }
  function keys(event: KeyboardEvent<HTMLFormElement>) {
    if (!stepped || step === steps.length - 1 || event.key !== "Enter") return;
    const target = event.target;
    if (target instanceof HTMLInputElement && target.type !== "checkbox" && target.type !== "radio") { event.preventDefault(); next(); }
  }
  function brief() { return enquiryText(parseEnquiry(new FormData(form.current!)).data); }
  async function copy() {
    try { await navigator.clipboard.writeText(brief()); setCopyStatus("Brief copied. This does not send an enquiry."); }
    catch { setCopyStatus("Clipboard is unavailable. Use Download brief to keep a copy."); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([brief()], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "anvaya-project-brief.txt"; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setCopyStatus("Brief downloaded. This does not send an enquiry.");
  }
  function error(name: string) { return errors[name] ? <span id={`${name}-error`} className="field-error">{errors[name]}</span> : null; }
  function field(name: keyof Values) {
    return {
      id: name, name, value: values[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(name, event.currentTarget.value),
      "aria-invalid": !!errors[name], "aria-describedby": `${name}-help${errors[name] ? ` ${name}-error` : ""}`,
    };
  }
  const shown = (index: number) => !stepped || index === step;
  const last = !stepped || step === steps.length - 1;
  const chosen = selection.map(id => practices.find(p => p.id === id)?.name || "Not sure yet");
  const outcomeLeft = Math.max(0, MIN_OUTCOME - values.outcome.trim().length);

  if (state.status === "success") return <Success state={state} name={values.name} email={values.email} chosen={chosen} onRestart={onRestart} />;

  return <form ref={form} action={action} className={`form-grid enquiry-form${stepped ? " is-stepped" : ""}`} id="project-enquiry" noValidate onKeyDown={keys} aria-busy={pending}>
    <input name="submissionId" type="hidden" value={submissionId} />
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this blank</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>

    {stepped && <ol className="form-progress" aria-label="Enquiry steps">{steps.map((s, i) => <li key={s.title} className={i === step ? "is-current" : i < step ? "is-done" : undefined}>
      <button type="button" onClick={() => i < step && go(i)} disabled={i > step} aria-current={i === step ? "step" : undefined}>
        <span className="form-progress-dot" aria-hidden="true">{i < step ? "✓" : i + 1}</span><span className="form-progress-name">{s.label}</span>
      </button>
    </li>)}</ol>}

    <fieldset className="form-step practice-choices" hidden={!shown(0)} aria-describedby={`services-help${errors.services ? " services-error" : ""}`}>
      <legend className="form-step-title" ref={step === 0 ? heading : undefined} tabIndex={-1}>{steps[0].title}</legend>
      <p className="form-step-hint">{steps[0].hint}</p>
      <div className="service-choice-grid">
        {[...practices.map(p => ({ id: p.id as string, name: p.name as string, offer: p.offer as string, comingSoon: p.comingSoon })), { id: "unsure", name: "Not sure yet", offer: "Tell us the problem and we will suggest the right service.", comingSoon: false }].map(p =>
          <label className={`service-choice${p.comingSoon ? " is-soon" : ""}`} key={p.id}>
            <input type="checkbox" name="services" value={p.id} disabled={p.comingSoon} checked={selection.includes(p.id)} onChange={() => choose(p.id)} />
            <span className="service-choice-check" aria-hidden="true" />
            <span className="service-choice-name">{p.name}{p.comingSoon && <> <ComingSoon /></>}</span>
            <span className="service-choice-offer">{p.offer}</span>
          </label>)}
      </div>
      <p id="services-help" className="practice-help">{initialPractice?.comingSoon ? `${initialPractice.name} is coming soon. Choose an available service, or leave “Not sure yet” selected.` : "Apps & Software and AI & Automation are coming soon."}</p>
      {error("services")}
    </fieldset>

    <fieldset className="form-step" hidden={!shown(1)}>
      <legend className="form-step-title" ref={step === 1 ? heading : undefined} tabIndex={-1}>{steps[1].title}</legend>
      <p className="form-step-hint">{steps[1].hint}</p>
      <div className="form-field full">
        <label htmlFor="outcome">What do you want to achieve? *</label>
        <div className="starter-row" role="group" aria-label="Quick starts">{starters.map(text => <button type="button" key={text} className="starter" onClick={() => set("outcome", values.outcome.trim() ? `${values.outcome.trim()} ${text}.` : `${text}.`)}>+ {text}</button>)}</div>
        <textarea required minLength={MIN_OUTCOME} maxLength={5000} placeholder="For example: a new website for our clinic so patients can book appointments online." {...field("outcome")} />
        <small id="outcome-help" className={outcomeLeft ? undefined : "is-ok"}>{outcomeLeft ? `Describe it in your own words — ${outcomeLeft} more character${outcomeLeft === 1 ? "" : "s"} to go.` : "✓ Great, that is enough to start."}</small>
        {error("outcome")}
      </div>
      <Chips name="timeline" label="When do you want to start?" options={timelineOptions} value={values.timeline} onChange={value => set("timeline", value)} error={error("timeline")} />
      <Chips name="budget" label="Rough budget" help="In Indian rupees. Choose “Need guidance” if unsure." options={budgetOptions} value={values.budget} onChange={value => set("budget", value)} error={error("budget")} />
      <div className="form-field full"><label htmlFor="context">Anything else? <span className="optional">Optional</span></label><textarea maxLength={5000} placeholder="Links to your current website, reference designs, deadlines…" {...field("context")} /><small id="context-help">Links, examples or constraints are welcome.</small>{error("context")}</div>
    </fieldset>

    <fieldset className="form-step" hidden={!shown(2)}>
      <legend className="form-step-title" ref={step === 2 ? heading : undefined} tabIndex={-1}>{steps[2].title}</legend>
      <p className="form-step-hint">{steps[2].hint}</p>
      <div className="form-pair">
        <div className="form-field"><label htmlFor="name">Your name *</label><input autoComplete="name" required maxLength={120} {...field("name")} /><small id="name-help">So we know who we are talking to.</small>{error("name")}</div>
        <div className="form-field"><label htmlFor="email">Email *</label><input type="email" inputMode="email" autoComplete="email" required maxLength={254} {...field("email")} /><small id="email-help">We will reply here.</small>{error("email")}</div>
        <div className="form-field"><label htmlFor="company">Company or project name <span className="optional">Optional</span></label><input autoComplete="organization" maxLength={200} {...field("company")} /><small id="company-help">What should we call the project?</small>{error("company")}</div>
        <div className="form-field"><label htmlFor="phone">Phone or WhatsApp <span className="optional">Optional</span></label><input type="tel" inputMode="tel" autoComplete="tel" maxLength={60} placeholder="+91 …" {...field("phone")} /><small id="phone-help">Include your country code if you are outside India.</small>{error("phone")}</div>
      </div>
      {stepped && <dl className="form-summary" aria-label="Your answers">
        <div><dt>Services</dt><dd>{chosen.join(", ")}</dd><button type="button" onClick={() => go(0)}>Edit</button></div>
        <div><dt>Project</dt><dd>{values.outcome.trim() || "—"}</dd><button type="button" onClick={() => go(1)}>Edit</button></div>
        <div><dt>Start · Budget</dt><dd>{values.timeline} · {values.budget}</dd><button type="button" onClick={() => go(1)}>Edit</button></div>
      </dl>}
    </fieldset>

    <div className="form-footer">
      {offline && <p className="form-status form-status-error" role="alert">You appear to be offline. Your answers are kept on this page — send when you are back online, or copy your brief below.</p>}
      {!last
        ? <div className="form-nav">{step > 0 && <button type="button" className="form-back" onClick={() => go(step - 1)}>← Back</button>}<button type="button" className="action action-light" onClick={next}><span>Continue</span><span aria-hidden="true">→</span></button><span className="form-count">Step {step + 1} of {steps.length}</span></div>
        : <>
          <p>By sending, you agree to how we handle your details in our <Link href="/privacy">Privacy notice</Link>.</p>
          <div className="form-nav">{stepped && <button type="button" className="form-back" onClick={() => go(step - 1)}>← Back</button>}<button className={`action action-light${pending ? " is-pending" : ""}`} type="submit" disabled={pending || offline}><span>{pending ? "Sending…" : "Send enquiry"}</span><span className="send-icon" aria-hidden="true">{pending ? "" : "↗"}</span></button></div>
        </>}
      <div ref={status} role="status" aria-live="polite" tabIndex={-1}>{state.status === "error" && state.message && <div className="form-status form-status-error"><p>{state.message}</p>{!state.errors && <p>Nothing has been lost — your answers are still here. Try again, or copy your brief and email it to us.</p>}</div>}</div>
      {(state.status === "error" || last) && <div className="brief-backup"><button type="button" onClick={copy}>Copy brief</button><button type="button" onClick={download}>Download brief</button><p role="status">{copyStatus}</p></div>}
    </div>
  </form>;
}

/** A single choice shown as tappable chips (radio buttons underneath, so the form and keyboard work as usual). */
function Chips({ name, label, help, options, value, onChange, error }: { name: string; label: string; help?: string; options: readonly string[]; value: string; onChange: (value: string) => void; error: ReactNode }) {
  return <fieldset className="form-field full chip-field" aria-describedby={help ? `${name}-help` : undefined}>
    <legend>{label}</legend>
    <div className="chip-row">{options.map(option => <label className="chip" key={option}><input type="radio" name={name} value={option} checked={value === option} onChange={() => onChange(option)} /><span>{option}</span></label>)}</div>
    {help && <small id={`${name}-help`}>{help}</small>}
    {error}
  </fieldset>;
}

function Success({ state, name, email, chosen, onRestart }: { state: EnquiryState; name: string; email: string; chosen: string[]; onRestart?: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => { panel.current?.focus(); }, []);
  return <div ref={panel} className="form-success" role="status" tabIndex={-1}>
    <span className="form-success-mark" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg></span>
    <h3>Thank you{name ? `, ${name.split(" ")[0]}` : ""}.</h3>
    <p>{state.message}</p>
    <dl className="form-summary"><div><dt>Services</dt><dd>{chosen.join(", ")}</dd></div><div><dt>Reply to</dt><dd>{email}</dd></div></dl>
    <ol className="form-success-next"><li>We read your message.</li><li>We plan the right first step.</li><li>We email you with a clear answer.</li></ol>
    <div className="form-nav"><Link className="action action-light" href="/work"><span>See our work</span><span aria-hidden="true">↗</span></Link>{onRestart && <button type="button" className="form-back" onClick={onRestart}>Send another enquiry</button>}</div>
  </div>;
}

/** Seeds the service choice from ?service= (an id or slug); a different seed, or "send another", remounts a fresh form. */
export function ProjectFormFromQuery() {
  const service = useSearchParams().get("service");
  const initialService = practices.find(p => p.id === service || p.slug === service)?.id;
  const [round, setRound] = useState(0);
  return <ProjectForm key={`${initialService || "unsure"}-${round}`} initialService={initialService} onRestart={() => setRound(r => r + 1)} />;
}
