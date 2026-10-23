"use client";
import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { sendEnquiry } from "../../project/actions";
import { budgetOptions, practices, timelineOptions } from "../../lib/site";
import { enquiryText, initialEnquiryState, parseEnquiry } from "../../lib/enquiry";
import { ComingSoon } from "./Shared";

export function ProjectForm({ initialService }: { initialService?: string }) {
  const [state, action, pending] = useActionState(sendEnquiry, initialEnquiryState);
  const initialPractice = practices.find(p => p.id === initialService);
  const [selection, setSelection] = useState<string[]>(initialPractice && !initialPractice.comingSoon ? [initialPractice.id] : ["unsure"]);
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", outcome: "", timeline: "Not sure yet", budget: "Need guidance", context: "" });
  const [copyStatus, setCopyStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const submission = useRef<HTMLInputElement>(null);
  useEffect(() => { if (submission.current) submission.current.value = crypto.randomUUID(); }, []);
  useEffect(() => {
    if (state.status === "idle") return;
    const first = Object.keys(state.errors || {})[0];
    const invalid = first ? form.current?.querySelector<HTMLElement>(`[name="${first}"]`) : null;
    if (invalid) invalid.focus();
    else status.current?.focus({ preventScroll: true });
    if (state.status === "success" && submission.current) submission.current.value = crypto.randomUUID();
  }, [state]);
  function choose(id: string) {
    if (submission.current) submission.current.value = crypto.randomUUID();
    setSelection(previous => id === "unsure" ? ["unsure"] : previous.includes(id) ? (previous.filter(p => p !== id).length ? previous.filter(p => p !== id) : ["unsure"]) : [...previous.filter(p => p !== "unsure"), id]);
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
  function error(name: string) { return state.errors?.[name] ? <span id={`${name}-error`} className="field-error">{state.errors[name]}</span> : null; }
  function inputProps(name: keyof typeof values) { return { value: values[name], onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { const value = event.currentTarget.value; setValues(previous => ({ ...previous, [name]: value })); if (submission.current) submission.current.value = crypto.randomUUID(); }, "aria-invalid": !!state.errors?.[name], "aria-describedby": `${name}-help${state.errors?.[name] ? ` ${name}-error` : ""}` }; }
  return <form ref={form} action={action} className="form-grid" id="project-enquiry" noValidate>
    <input ref={submission} name="submissionId" type="hidden" />
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this blank</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
    <div className="form-field"><label htmlFor="name">Your name *</label><input id="name" name="name" autoComplete="name" required maxLength={120} {...inputProps("name")} /><small id="name-help">Tell us who we are speaking with.</small>{error("name")}</div>
    <div className="form-field"><label htmlFor="company">Company or project name</label><input id="company" name="company" autoComplete="organization" maxLength={200} {...inputProps("company")} /><small id="company-help">What should we call the work?</small>{error("company")}</div>
    <div className="form-field"><label htmlFor="email">Email address *</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} {...inputProps("email")} /><small id="email-help">Where should we reply?</small>{error("email")}</div>
    <div className="form-field"><label htmlFor="phone">Phone or WhatsApp</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={60} {...inputProps("phone")} /><small id="phone-help">Optional, if you prefer a quicker conversation.</small>{error("phone")}</div>
    <fieldset className="practice-choices" aria-describedby={`services-help${state.errors?.services ? " services-error" : ""}`}><legend>What do you need help with?</legend><div className="choice-grid">{[...practices.map(p => ({ id: p.id as string, name: p.name as string, comingSoon: p.comingSoon })), { id: "unsure", name: "Not sure yet", comingSoon: false }].map(p => <label className="choice" key={p.id}><input type="checkbox" name="services" value={p.id} disabled={p.comingSoon} checked={selection.includes(p.id)} onChange={() => choose(p.id)} /><span>{p.name}{p.comingSoon && <> <ComingSoon /></>}</span></label>)}</div><p id="services-help" className="practice-help">{initialPractice?.comingSoon ? `${initialPractice.name} is coming soon. Choose an available practice, or leave “Not sure yet” selected.` : "Digital Products and Intelligent Operations are coming soon. Digital Presence and Spatial Visuals are available for new projects."}</p>{error("services")}</fieldset>
    <div className="form-field full"><label htmlFor="outcome">What is the outcome you want? *</label><textarea id="outcome" name="outcome" required minLength={10} maxLength={5000} {...inputProps("outcome")} /><small id="outcome-help">Describe what should be clearer, faster, better or newly possible.</small>{error("outcome")}</div>
    <div className="form-field"><label htmlFor="timeline">Timeline</label><select id="timeline" name="timeline" {...inputProps("timeline")}>{timelineOptions.map(o => <option key={o}>{o}</option>)}</select><small id="timeline-help">When would you like to begin?</small>{error("timeline")}</div>
    <div className="form-field"><label htmlFor="budget">Budget range</label><select id="budget" name="budget" {...inputProps("budget")}>{budgetOptions.map(o => <option key={o}>{o}</option>)}</select><small id="budget-help">Choose a range in INR, or select “Need guidance.”</small>{error("budget")}</div>
    <div className="form-field full"><label htmlFor="context">Anything else we should know?</label><textarea id="context" name="context" maxLength={5000} {...inputProps("context")} /><small id="context-help">Links, references, constraints or context are welcome.</small>{error("context")}</div>
    <div className="form-footer"><p>By sending an enquiry, you agree to the handling of your information described in our <Link href="/privacy">Privacy notice</Link>.</p><button className="action" type="submit" disabled={pending}><span>{pending ? "Sending enquiry…" : "Send project enquiry"}</span><span aria-hidden="true">↗</span></button><div ref={status} role="status" aria-live="polite" tabIndex={-1}>{state.message && <p className={`form-status form-status-${state.status}`}>{state.message}</p>}</div><div className="brief-backup"><button type="button" onClick={copy}>Copy brief</button><button type="button" onClick={download}>Download brief</button><p role="status">{copyStatus}</p></div></div>
  </form>;
}
