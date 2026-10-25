"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzebgrkd";

const TOPICS = [
  "partnership",
  "app support",
  "press",
  "careers",
  "something else",
] as const;

type Topic = (typeof TOPICS)[number];

type FormFields = {
  name: string;
  email: string;
  topic: Topic;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const INITIAL: FormFields = {
  name: "",
  email: "",
  topic: "partnership",
  message: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormFields): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell us your name.";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim()) {
    errors.message = "Please write us a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "A little more detail, please (at least 10 characters).";
  }
  if (!values.consent) {
    errors.consent = "We need your OK before we can reply.";
  }

  return errors;
}

const labelClass = "mb-2 block text-[13px] text-ash";

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-ink-950/60 px-3.5 py-3 text-[16px] text-bone",
    "placeholder:text-ash/60 outline-none transition-[border-color,background-color] duration-200",
    "focus:border-bone/40 focus:bg-ink-950",
    hasError ? "border-red-400/60" : "border-white/[0.08]",
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[13px] text-red-300">
      {message}
    </p>
  );
}

function SubmitButton({ submitting, success }: { submitting: boolean; success: boolean }) {
  return (
    <button
      type="submit"
      disabled={submitting || success}
      aria-busy={submitting}
      className={cn(
        "relative flex h-12 w-full items-center justify-center overflow-hidden rounded-md bg-bone text-base lowercase text-ink-950",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(0,0,0,0.4)] transition-colors",
        "hover:bg-white disabled:cursor-default disabled:hover:bg-bone",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone/70",
      )}
    >
      {/* Fortschritt: läuft während des Sendens einmal durch */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 origin-left bg-ink-950/10",
          submitting ? "scale-x-100 transition-transform duration-[1100ms] ease-in-out" : "scale-x-0",
        )}
      />
      <span className={cn("relative transition-opacity duration-200", (submitting || success) && "opacity-0")}>
        send message
      </span>
      <svg
        aria-hidden
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className={cn(
          "absolute transition-[opacity,transform] duration-300",
          success ? "scale-100 opacity-100" : "scale-75 opacity-0",
        )}
      >
        <path
          d="M5.5 12.5 L10 17 L18.5 7.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="24"
          strokeDashoffset={success ? 0 : 24}
          style={{ transition: "stroke-dashoffset 420ms ease-out 80ms" }}
        />
      </svg>
      <span className="sr-only" aria-live="polite">
        {submitting ? "Sending" : success ? "Message sent" : ""}
      </span>
    </button>
  );
}

export function ContactForm() {
  const [values, setValues] = React.useState<FormFields>(INITIAL);
  const [touched, setTouched] = React.useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);

  const errors = validate(values);
  const showError = (field: keyof FormFields) =>
    touched[field] || submitted ? errors[field] : undefined;

  const set = <K extends keyof FormFields>(field: K, value: FormFields[K]) => {
    setSuccess(false);
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const blur = (field: keyof FormFields) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError(false);

    const keys = Object.keys(errors) as (keyof FormFields)[];
    if (keys.length > 0) {
      document.getElementById(`contact-${keys[0]}`)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const started = Date.now();
      const body = new FormData(e.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });

      // Mindestdauer, damit der Fortschrittsbalken nicht nur aufblitzt.
      const wait = 1100 - (Date.now() - started);
      if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));

      setSubmitting(false);
      if (!response.ok) {
        setServerError(true);
        return;
      }

      setSuccess(true);
      setSubmitted(false);
      setTouched({});
      setValues(INITIAL);
    } catch {
      setServerError(true);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input
        type="hidden"
        name="_subject"
        value={`New message (${values.topic}) | Daverion Digital`}
      />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={blur("name")}
            aria-invalid={Boolean(showError("name"))}
            aria-describedby={showError("name") ? "contact-name-error" : undefined}
            className={inputClass(Boolean(showError("name")))}
          />
          <FieldError id="contact-name-error" message={showError("name")} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={blur("email")}
            aria-invalid={Boolean(showError("email"))}
            aria-describedby={showError("email") ? "contact-email-error" : undefined}
            className={inputClass(Boolean(showError("email")))}
          />
          <FieldError id="contact-email-error" message={showError("email")} />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>What&apos;s it about?</legend>
        <div className="flex flex-wrap gap-1.5">
          {TOPICS.map((topic) => (
            <label key={topic} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={topic}
                checked={values.topic === topic}
                onChange={() => set("topic", topic)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex h-9 items-center rounded-md border px-3 text-[13px] lowercase transition-colors",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bone/70",
                  values.topic === topic
                    ? "border-bone/80 bg-bone text-ink-950"
                    : "border-white/[0.08] bg-ink-950/60 text-ash hover:text-bone",
                )}
              >
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={3}
          placeholder="Tell us what's on your mind."
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          onBlur={blur("message")}
          aria-invalid={Boolean(showError("message"))}
          aria-describedby={showError("message") ? "contact-message-error" : undefined}
          className={cn(inputClass(Boolean(showError("message"))), "resize-y leading-relaxed")}
        />
        <FieldError id="contact-message-error" message={showError("message")} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            value="accepted"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            onBlur={blur("consent")}
            aria-invalid={Boolean(showError("consent"))}
            aria-describedby="contact-consent-error"
            className="mt-0.5 size-4 shrink-0 cursor-pointer accent-bone"
          />
          <span className="text-[13px] leading-relaxed text-ash">
            I agree that Daverion Digital stores and processes my details to answer
            this message. See our{" "}
            <a href="/privacy" className="text-bone/80 underline decoration-white/25 underline-offset-4 hover:text-bone">
              privacy policy
            </a>
            .
          </span>
        </label>
        <FieldError id="contact-consent-error" message={showError("consent")} />
      </div>

      <div className="pt-1">
        <SubmitButton submitting={submitting} success={success} />
        {success ? (
          <p className="mt-3 text-center text-[13px] text-ash">
            Thanks, your message is with us.
          </p>
        ) : null}
        {serverError ? (
          <p role="alert" className="mt-3 text-center text-[13px] text-red-300">
            Something went wrong. Please try again in a moment.
          </p>
        ) : null}
      </div>
    </form>
  );
}
