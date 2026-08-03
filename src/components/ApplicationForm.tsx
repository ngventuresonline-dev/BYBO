"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { industrySolutions, systems } from "@/lib/content";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  website: string;
  teamSize: string;
  system: string;
  workflow: string;
  frequency: string;
  tools: string;
  goal: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  website: "",
  teamSize: "",
  system: "",
  workflow: "",
  frequency: "",
  tools: "",
  goal: "",
};

const volumeLabels: Record<string, string> = {
  low: "Occasional — a few cases each week",
  medium: "Regular — cases every working day",
  high: "High-volume — dozens or hundreds each day",
};

const readinessLabels: Record<string, string> = {
  manual: "Mostly manual",
  fragmented: "Some tools, poorly connected",
  ready: "Good systems, ready to integrate",
};

function resolveIndustryName(slug: string) {
  return industrySolutions.find((item) => item.slug === slug)?.name ?? slug;
}

function isValidPhone(phone: string) {
  return phone.replace(/\D/g, "").length >= 10;
}

export function ApplicationForm() {
  const searchParams = useSearchParams();
  const startingSystem = searchParams.get("system") ?? "";
  const startingIndustry = searchParams.get("industry") ?? "";
  const startingInterest = searchParams.get("interest") ?? "";
  const startingVolume = searchParams.get("volume") ?? "";
  const startingReadiness = searchParams.get("readiness") ?? "";

  const sourceContext = useMemo(
    () => ({
      industry: startingIndustry,
      industryName: startingIndustry
        ? resolveIndustryName(startingIndustry)
        : "",
      interest:
        startingInterest === "blueprint"
          ? "AI Opportunity Blueprint"
          : startingInterest,
      volume: volumeLabels[startingVolume] ?? startingVolume,
      readiness: readinessLabels[startingReadiness] ?? startingReadiness,
    }),
    [
      startingIndustry,
      startingInterest,
      startingVolume,
      startingReadiness,
    ],
  );

  const hasSourceContext = Boolean(
    sourceContext.industryName ||
      sourceContext.interest ||
      sourceContext.volume ||
      sourceContext.readiness ||
      (startingSystem && systems.some((system) => system.slug === startingSystem)),
  );

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});
  const [data, setData] = useState<FormData>(() => ({
    ...initialData,
    system: systems.some((system) => system.slug === startingSystem)
      ? startingSystem
      : "",
    goal:
      sourceContext.interest === "AI Opportunity Blueprint"
        ? "Evaluate whether an AI Opportunity Blueprint is the right next step for our workflow."
        : "",
  }));

  const update = (field: keyof FormData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setWarnings((current) => ({ ...current, [field]: "" }));
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};
    const nextWarnings: Record<string, string> = {};

    if (step === 0) {
      if (!data.name.trim()) nextErrors.name = "Please enter your name.";
      if (!data.email.trim()) {
        nextErrors.email = "Please enter your work email.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        nextErrors.email = "Please enter a valid email.";
      }
      if (!data.company.trim()) nextErrors.company = "Please enter the company.";
      if (!data.role.trim()) nextErrors.role = "Please enter your role.";
      if (!data.phone.trim()) {
        nextErrors.phone = "Please enter a phone number.";
      } else if (!isValidPhone(data.phone)) {
        nextErrors.phone = "Please enter a valid phone number (at least 10 digits).";
      }
      if (!data.website.trim()) {
        nextWarnings.website =
          "A company website helps us prepare for the call. Add yours if you have one — you can still continue without it.";
      }
    }

    if (step === 1) {
      if (!data.workflow.trim()) {
        nextErrors.workflow = "Describe the workflow or bottleneck.";
      }
      if (!data.frequency) {
        nextErrors.frequency = "Select how often this happens.";
      }
    }

    setErrors(nextErrors);
    setWarnings(nextWarnings);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((current) => Math.min(current + 1, 2));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const summary = useMemo(() => {
    const selectedSystem = systems.find((system) => system.slug === data.system);
    const contextLines = [
      sourceContext.interest
        ? `Interest: ${sourceContext.interest}`
        : null,
      sourceContext.industryName
        ? `Industry: ${sourceContext.industryName}`
        : null,
      sourceContext.volume ? `Opportunity volume: ${sourceContext.volume}` : null,
      sourceContext.readiness
        ? `Current readiness: ${sourceContext.readiness}`
        : null,
    ].filter(Boolean);

    return [
      ...contextLines,
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Role: ${data.role}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "Not provided"}`,
      `Website: ${data.website || "Not provided"}`,
      `Team size: ${data.teamSize || "Not provided"}`,
      `System: ${selectedSystem?.name || "Unsure"}`,
      `Workflow: ${data.workflow}`,
      `Frequency: ${data.frequency}`,
      `Current tools: ${data.tools || "Not provided"}`,
      `Desired outcome: ${data.goal || "Not provided"}`,
    ].join("\n");
  }, [data, sourceContext]);

  const emailSubject = sourceContext.interest
    ? `BYBO Blueprint enquiry — ${data.company || "New application"}`
    : `BYBO consultation — ${data.company || "New application"}`;

  const emailHref = `mailto:hello@bybo.in?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(summary)}`;

  const whatsappHref = `https://wa.me/916360079756?text=${encodeURIComponent(
    `Hi BYBO, I'd like to discuss an AI opportunity.\n\n${summary}`,
  )}`;

  if (submitted) {
    return (
      <div className="technical-card p-6 sm:p-9">
        <span className="flex h-12 w-12 items-center justify-center bg-success text-signal-ink">
          <Check size={22} />
        </span>
        <p className="technical-label mt-8 text-success">Application prepared</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
          Choose how you want to send it.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-fog">
          This preview does not store personal information. Use email or
          WhatsApp to send the prepared application directly to BYBO.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={emailHref} className="signal-button">
            <Mail size={15} /> Send by email
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="ghost-button"
          >
            <MessageCircle size={15} /> Send on WhatsApp
          </a>
        </div>

        <details className="mt-8 border-t border-line pt-5">
          <summary className="cursor-pointer font-mono text-[0.64rem] uppercase tracking-[0.12em] text-dim">
            Review prepared application
          </summary>
          <pre className="mt-5 whitespace-pre-wrap text-sm leading-6 text-fog">
            {summary}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="technical-card overflow-hidden" noValidate>
      <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="technical-label text-signal">Consultation application</p>
          <p className="mt-2 text-sm text-fog">
            Enough context for a useful first conversation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`h-1.5 w-12 ${index <= step ? "bg-signal" : "bg-line"}`}
            />
          ))}
        </div>
      </div>

      {hasSourceContext && (
        <div className="border-b border-line bg-void/45 px-5 py-4 sm:px-8">
          <p className="technical-label text-dim">From your session</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sourceContext.interest && (
              <ContextChip label={sourceContext.interest} />
            )}
            {sourceContext.industryName && (
              <ContextChip label={sourceContext.industryName} />
            )}
            {data.system && (
              <ContextChip
                label={
                  systems.find((system) => system.slug === data.system)?.name ??
                  data.system
                }
              />
            )}
            {sourceContext.volume && (
              <ContextChip label={sourceContext.volume} />
            )}
            {sourceContext.readiness && (
              <ContextChip label={sourceContext.readiness} />
            )}
          </div>
        </div>
      )}

      <div className="min-h-0 p-5 sm:min-h-[34rem] sm:p-8 lg:p-10">
        {step === 0 && (
          <div>
            <StepHeading
              label="01 / You and the business"
              title="Who owns the opportunity?"
            />
            <div className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <Field label="Your name" error={errors.name}>
                <input
                  className="form-field"
                  value={data.name}
                  onChange={(event) => update("name", event.target.value)}
                  autoComplete="name"
                  placeholder="Full name"
                />
              </Field>
              <Field label="Work email" error={errors.email}>
                <input
                  className="form-field"
                  type="email"
                  value={data.email}
                  onChange={(event) => update("email", event.target.value)}
                  autoComplete="email"
                  placeholder="name@company.com"
                />
              </Field>
              <Field label="Company" error={errors.company}>
                <input
                  className="form-field"
                  value={data.company}
                  onChange={(event) => update("company", event.target.value)}
                  autoComplete="organization"
                  placeholder="Company name"
                />
              </Field>
              <Field label="Your role" error={errors.role}>
                <input
                  className="form-field"
                  value={data.role}
                  onChange={(event) => update("role", event.target.value)}
                  autoComplete="organization-title"
                  placeholder="Founder, operations lead…"
                />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input
                  className="form-field"
                  type="tel"
                  value={data.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  required
                />
              </Field>
              <Field label="Website" hint={warnings.website}>
                <input
                  className="form-field"
                  type="url"
                  value={data.website}
                  onChange={(event) => update("website", event.target.value)}
                  placeholder="https://yourcompany.com"
                />
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <StepHeading
              label="02 / The workflow"
              title="Where does momentum break?"
            />
            <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <Field label="Closest system">
                <select
                  className="form-field"
                  value={data.system}
                  onChange={(event) => update("system", event.target.value)}
                >
                  <option value="">I am not sure yet</option>
                  {systems.map((system) => (
                    <option key={system.slug} value={system.slug}>
                      {system.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Team size">
                <select
                  className="form-field"
                  value={data.teamSize}
                  onChange={(event) => update("teamSize", event.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1–10">1–10</option>
                  <option value="11–50">11–50</option>
                  <option value="51–200">51–200</option>
                  <option value="200+">200+</option>
                </select>
              </Field>
              <Field
                label="Describe the workflow or bottleneck"
                error={errors.workflow}
                className="sm:col-span-2"
              >
                <textarea
                  className="form-field"
                  value={data.workflow}
                  onChange={(event) => update("workflow", event.target.value)}
                  placeholder="What happens today, where does it slow down, and who is involved?"
                />
              </Field>
              <Field label="How often does it happen?" error={errors.frequency}>
                <select
                  className="form-field"
                  value={data.frequency}
                  onChange={(event) => update("frequency", event.target.value)}
                >
                  <option value="">Select frequency</option>
                  <option value="A few times each month">A few times each month</option>
                  <option value="Every week">Every week</option>
                  <option value="Every working day">Every working day</option>
                  <option value="Dozens or hundreds daily">
                    Dozens or hundreds daily
                  </option>
                </select>
              </Field>
              <Field label="Tools involved (optional)">
                <input
                  className="form-field"
                  value={data.tools}
                  onChange={(event) => update("tools", event.target.value)}
                  placeholder="WhatsApp, Zoho, Sheets, Shopify…"
                />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <StepHeading
              label="03 / The business case"
              title="What should change if this works?"
            />
            <div className="mt-9">
              <Field label="Desired outcome">
                <textarea
                  className="form-field"
                  value={data.goal}
                  onChange={(event) => update("goal", event.target.value)}
                  placeholder="Faster response, fewer errors, better conversion, shorter processing time…"
                />
              </Field>

              <div className="mt-10 grid gap-4 border border-line bg-void/45 p-5 sm:grid-cols-3">
                {[
                  ["No obligation", "The consultation is for qualification, not a forced sales process."],
                  ["No fake diagnosis", "We will not promise ROI before reviewing the workflow and baseline."],
                  ["No silent storage", "This preview prepares an email or WhatsApp message; it does not store your data."],
                ].map(([title, text]) => (
                  <div key={title}>
                    <p className="technical-label text-signal">{title}</p>
                    <p className="mt-2 text-xs leading-5 text-dim">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((current) => current - 1)}
              className="ghost-button"
            >
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <span />
          )}

          {step < 2 ? (
            <button type="button" onClick={next} className="signal-button">
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button type="submit" className="signal-button">
              Prepare application <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function ContextChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-signal/25 bg-signal/10 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-signal">
      {label}
    </span>
  );
}

function StepHeading({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <p className="technical-label text-signal">{label}</p>
      <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="technical-label text-fog">{label}</span>
      {children}
      {error && (
        <span className="mt-2 block text-xs text-signal" role="alert">
          {error}
        </span>
      )}
      {!error && hint && (
        <span className="mt-2 block text-xs leading-5 text-dim" role="status">
          {hint}
        </span>
      )}
    </label>
  );
}
