"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { industrySolutions, systems } from "@/lib/content";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  website: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  website: "",
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
      systemName: systems.find((system) => system.slug === startingSystem)?.name,
    }),
    [
      startingIndustry,
      startingInterest,
      startingSystem,
      startingVolume,
      startingReadiness,
    ],
  );

  const hasSourceContext = Boolean(
    sourceContext.industryName ||
      sourceContext.interest ||
      sourceContext.volume ||
      sourceContext.readiness ||
      sourceContext.systemName,
  );

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});
  const [data, setData] = useState<FormData>(initialData);

  const update = (field: keyof FormData, value: string) => {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setWarnings((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    const nextWarnings: Record<string, string> = {};

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
      nextErrors.phone =
        "Please enter a valid phone number (at least 10 digits).";
    }
    if (!data.website.trim()) {
      nextWarnings.website =
        "A company website helps us prepare for the call. Add yours if you have one — you can still continue without it.";
    }

    setErrors(nextErrors);
    setWarnings(nextWarnings);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const summary = useMemo(() => {
    const contextLines = [
      sourceContext.interest
        ? `Interest: ${sourceContext.interest}`
        : null,
      sourceContext.industryName
        ? `Industry: ${sourceContext.industryName}`
        : null,
      sourceContext.systemName ? `System: ${sourceContext.systemName}` : null,
      sourceContext.volume ? `Opportunity volume: ${sourceContext.volume}` : null,
      sourceContext.readiness
        ? `Current readiness: ${sourceContext.readiness}`
        : null,
    ].filter(Boolean);

    const contactLines = [
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Role: ${data.role}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      data.website ? `Website: ${data.website}` : null,
    ].filter(Boolean);

    return [...contextLines, ...contactLines].join("\n");
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
      <div className="border-b border-line px-5 py-5 sm:px-8">
        <p className="technical-label text-signal">Consultation application</p>
        <p className="mt-2 text-sm text-fog">
          Your details are enough for a useful first conversation.
        </p>
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
            {sourceContext.systemName && (
              <ContextChip label={sourceContext.systemName} />
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

      <div className="p-5 sm:p-8 lg:p-10">
        <StepHeading
          label="Your details"
          title="Who should we speak with?"
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

        <p className="mt-8 text-xs leading-5 text-dim">
          No obligation. We&apos;ll use the first call to qualify the
          opportunity — not to force a sales process. Nothing is stored here;
          you send the application by email or WhatsApp.
        </p>

        <div className="mt-8 flex justify-end border-t border-line pt-6">
          <button type="submit" className="signal-button">
            Prepare application <ArrowRight size={14} />
          </button>
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
