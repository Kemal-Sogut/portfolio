import { useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BUDGETS,
  PROJECT_TYPES,
  contactSchema,
  type ContactInput,
} from "@/lib/contact/schema";
import { TURNSTILE_ACTION } from "@/lib/contact/turnstile";

const siteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY as string;

export function ContactForm({ defaultType }: { defaultType?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState<string>("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      projectType: (PROJECT_TYPES.some((p) => p.value === defaultType)
        ? defaultType
        : "not-sure") as ContactInput["projectType"],
      budget: "unknown",
      turnstileToken: "",
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  // The page is prerendered, so ?type= is only knowable in the browser.
  // Hydration would overwrite whatever an inline script set, so read it here.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t && PROJECT_TYPES.some((p) => p.value === t)) {
      setValue("projectType", t as ContactInput["projectType"]);
    }
  }, [setValue]);

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && body.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setServerError(body.error ?? "Something went wrong.");
        // Tokens are single-use; the attempt spent it. Get a fresh one.
        turnstileRef.current?.reset();
        setValue("turnstileToken", "");
      }
    } catch {
      setStatus("error");
      setServerError(
        "Could not reach the server. Please email me directly instead.",
      );
      turnstileRef.current?.reset();
      setValue("turnstileToken", "");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border p-8 text-center">
        <h3 className="text-xl font-semibold">
          Thanks — I&rsquo;ll reply within one business day.
        </h3>
        <p className="text-muted-foreground mt-2">
          If it&rsquo;s urgent, call (873) 355-1089.
        </p>
      </div>
    );
  }

  const err = (k: keyof ContactInput) =>
    errors[k] && (
      <p className="text-destructive mt-1 text-xs">
        {errors[k]?.message as string}
      </p>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {err("name")}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {err("email")}
        </div>
      </div>

      <div>
        <Label htmlFor="company">Business (optional)</Label>
        <Input
          id="company"
          autoComplete="organization"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="projectType">What do you need?</Label>
          <select
            id="projectType"
            className="border-input bg-background mt-1 h-10 w-full rounded-md border px-3 text-sm"
            {...register("projectType")}
          >
            {PROJECT_TYPES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          {err("projectType")}
        </div>
        <div>
          <Label htmlFor="budget">Budget</Label>
          <select
            id="budget"
            className="border-input bg-background mt-1 h-10 w-full rounded-md border px-3 text-sm"
            {...register("budget")}
          >
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          {err("budget")}
        </div>
      </div>

      <div>
        <Label htmlFor="message">
          What&rsquo;s slow, manual or broken today?
        </Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="e.g. We quote on paper on-site and type it up at night. Two people, about 15 quotes a week."
          {...register("message")}
        />
        {err("message")}
      </div>

      <Turnstile
        ref={turnstileRef}
        siteKey={siteKey}
        onSuccess={(t) =>
          setValue("turnstileToken", t, { shouldValidate: true })
        }
        onExpire={() => setValue("turnstileToken", "")}
        onError={() => setValue("turnstileToken", "")}
        options={{ theme: "auto", action: TURNSTILE_ACTION }}
      />
      {errors.turnstileToken && (
        <p className="text-destructive text-xs">
          Please complete the spam check.
        </p>
      )}

      {status === "error" && (
        <p className="text-destructive text-sm">{serverError}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
