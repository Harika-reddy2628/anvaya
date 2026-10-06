"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Download, Pencil } from "lucide-react";
import { services, studio, type ServiceId } from "../../lib/studio";
import { useProject } from "./ProjectContext";

export function BriefBuilder({
  initialService,
  retainer = false,
}: {
  initialService?: ServiceId;
  retainer?: boolean;
}) {
  const { selected, select } = useProject();
  const [override, setOverride] = useState<ServiceId | undefined>(
    initialService,
  );
  // Homepage controls share selection; a route-seeded brief owns its local choice.
  const chosen = initialService ? override ?? initialService : selected;
  const service = services.find((item) => item.id === chosen)!;
  const [monthly, setMonthly] = useState(retainer);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState<{
    text: string;
    service: ServiceId;
    monthly: boolean;
  } | null>(null);
  const brief = prepared?.service === chosen && prepared.monthly === monthly
    ? prepared.text : "";
  const [feedback, setFeedback] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const price = monthly ? "$2,500–$4,500 / month" : service.estimate;

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const goal = String(data.get("goal") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (name.length < 2)
      nextErrors.name = "Please enter your name (at least two characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Please enter a valid email address.";
    if (goal.length < 20)
      nextErrors.goal =
        "Tell us a little more about the goal (at least 20 characters).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.current
        ?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
          `[name="${Object.keys(nextErrors)[0]}"]`,
        )
        ?.focus();
      return;
    }
    const text = [
      "ANVAYA / PROJECT BRIEF",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${data.get("company") || "Not specified"}`,
      `Service: ${service.name}`,
      `Engagement: ${monthly ? "Monthly engineering retainer" : "Scoped project"}`,
      "",
      "PROJECT GOAL",
      goal,
      "",
      "EXISTING PRODUCT / CONTEXT",
      String(data.get("context") || "Not specified"),
      "",
      `Integrations: ${data.get("integrations") || "To be scoped"}`,
      `Budget: ${data.get("budget") || "To be discussed"}`,
      `Desired deadline: ${data.get("deadline") || "Flexible / to be agreed"}`,
      "",
      `Indicative range: ${price}`,
      `Timeline: ${monthly ? "Monthly scope to be agreed" : service.timeline}`,
      "",
      "ESTIMATE ASSUMPTIONS",
      service.scope,
      "Prices are indicative; the final quote follows an agreed scope. Third-party subscriptions and platform usage are scoped separately.",
      "",
      "HANDOVER",
      "100% client ownership after final payment. 50% upfront / 50% on final verified delivery, or agreed fully funded platform escrow. 14-day technical defect warranty.",
      "",
      "This brief has been prepared locally. It has not been submitted or sent.",
    ].join("\n");
    setPrepared({ text, service: chosen, monthly });
    setFeedback("");
    requestAnimationFrame(() => result.current?.focus());
  }

  function download() {
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "anvaya-project-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback(
      "Your project brief has been downloaded. It has not been sent.",
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(brief);
      setFeedback(
        "Brief copied. You can paste it into your preferred conversation.",
      );
    } catch {
      setFeedback(
        "Copy is unavailable in this browser. You can download your brief instead.",
      );
    }
  }

  return (
    <div className="brief-builder">
      <form ref={form} onSubmit={prepare} noValidate className="brief-form">
        <div className="form-heading">
          <span className="eyebrow">PROJECT DETAILS</span>
          <span>01 — THE STARTING POINT</span>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="brief-name">
              Your name <span>*</span>
            </label>
            <input
              id="brief-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span className="field-error" id="name-error">
                {errors.name}
              </span>
            )}
          </div>
          <div className="field">
            <label htmlFor="brief-email">
              Email <span>*</span>
            </label>
            <input
              id="brief-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span className="field-error" id="email-error">
                {errors.email}
              </span>
            )}
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="brief-service">What are we building?</label>
            <select
              id="brief-service"
              value={chosen}
              onChange={(event) => {
                const value = event.target.value as ServiceId;
                setOverride(value);
                select(value);
                setPrepared(null);
              }}
            >
              {services.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="brief-company">
              Company <span className="optional">optional</span>
            </label>
            <input
              id="brief-company"
              name="company"
              autoComplete="organization"
              maxLength={150}
              placeholder="Company or studio"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="brief-goal">
            What would success look like? <span>*</span>
          </label>
          <textarea
            id="brief-goal"
            name="goal"
            required
            minLength={20}
            maxLength={4000}
            rows={4}
            placeholder="The idea, the people it serves, and the problem you want to solve…"
            aria-invalid={!!errors.goal}
            aria-describedby={errors.goal ? "goal-error" : undefined}
          />
          {errors.goal && (
            <span className="field-error" id="goal-error">
              {errors.goal}
            </span>
          )}
        </div>
        <details className="brief-more">
          <summary>
            Existing product & integrations <span>+</span>
          </summary>
          <div className="field">
            <label htmlFor="brief-context">
              Current product or source materials
            </label>
            <textarea
              id="brief-context"
              name="context"
              rows={2}
              maxLength={2500}
              placeholder="Existing site, product, plans, models, or the work already done"
            />
          </div>
          <div className="field">
            <label htmlFor="brief-integrations">Tools and integrations</label>
            <input
              id="brief-integrations"
              name="integrations"
              maxLength={1000}
              placeholder="For example: Shopify, your CRM, document sources…"
            />
          </div>
        </details>
        <div className="form-row">
          <div className="field">
            <label htmlFor="brief-budget">Budget (USD)</label>
            <select id="brief-budget" name="budget" defaultValue="">
              <option value="">Let’s discuss</option>
              <option>$500–$1,500</option>
              <option>$1,500–$3,500</option>
              <option>$3,500–$5,000</option>
              <option>$5,000+</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="brief-deadline">
              Desired deadline <span className="optional">optional</span>
            </label>
            <input id="brief-deadline" name="deadline" type="date" />
          </div>
        </div>
        <label className="retainer-checkbox">
          <input
            type="checkbox"
            checked={monthly}
            onChange={(event) => {
              setMonthly(event.target.checked);
              setPrepared(null);
            }}
          />{" "}
          I’m looking for an ongoing engineering partner.
        </label>
        <div className="form-actions">
          <button className="button button-accent magnetic" type="submit">
            Prepare brief <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <span>
            Prepared in your browser. Nothing is sent.
          </span>
        </div>
      </form>
      <aside className="brief-summary">
        <span className="eyebrow">YOUR STARTING POINT</span>
        <h3>{monthly ? "An engineering partner." : service.title}</h3>
        <p>{service.description}</p>
        <div className="estimate">
          <span>INDICATIVE INVESTMENT</span>
          <strong>{price}</strong>
          <small>
            {monthly
              ? "Monthly capacity and scope agreed together"
              : service.timeline}
          </small>
        </div>
        <ul className="deliverables">
          {(monthly
            ? [
                "Prioritized engineering roadmap",
                "Monthly scope and capacity agreed",
                "Specialist product, AI, or spatial work",
              ]
            : service.deliverables.slice(0, 3)
          ).map((item) => (
            <li key={item}>
              <Check size={14} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="estimate-assumptions">
          <span className="eyebrow">ASSUMPTIONS, UP FRONT</span>
          <p>
            {monthly
              ? "Monthly deliverables, capacity, review cadence, and costs are agreed before the engagement begins."
              : service.scope}
          </p>
          <p>
            Indicative range only. Final pricing follows scoping; third-party
            usage and subscriptions are agreed separately.
          </p>
        </div>
      </aside>
      {brief && (
        <div
          ref={result}
          className="brief-result"
          tabIndex={-1}
          role="region"
          aria-label="Prepared project brief"
        >
          <span className="eyebrow">
            <Check size={15} aria-hidden="true" /> BRIEF PREPARED
          </span>
          <h3>Your project brief is ready.</h3>
          <p>
            Your brief is ready to download or copy. It has not been submitted
            or sent.
          </p>
          <pre>{brief}</pre>
          <div className="result-actions">
            <button
              type="button"
              className="button button-accent"
              onClick={download}
            >
              Download brief <Download size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="button button-outline"
              onClick={copy}
            >
              Copy brief <Copy size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setPrepared(null);
                form.current?.querySelector<HTMLInputElement>("input")?.focus();
              }}
            >
              Edit details <Pencil size={14} aria-hidden="true" />
            </button>
            {studio.email && (
              <a
                className="button button-ink"
                href={`mailto:${studio.email}?subject=${encodeURIComponent("Anvaya project enquiry")}&body=${encodeURIComponent(brief)}`}
              >
                Open email draft <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
          <p className="brief-feedback" role="status">
            {feedback}
          </p>
        </div>
      )}
    </div>
  );
}
