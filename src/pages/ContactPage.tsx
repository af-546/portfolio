import { useState } from "react";
import { z } from "zod";
import { profile } from "@/data/content";
import { useApp } from "@/context/AppContext";
import { usePageTitle } from "@/hooks/usePageTitle";
import { blip } from "@/lib/audio";
import { ContactLinks } from "@/components/ui/ContactLinks";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  message: z.string().min(12),
});

export function ContactPage() {
  usePageTitle("Contact | Ali Farid");
  const { pushToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<string | null>(null);

  return (
    <div className="section-pad py-12">
      <p className="hud-line">Get in touch</p>
      <h1 className="display-xl mt-2 text-5xl sm:text-6xl">Contact</h1>
      <p className="mt-3 max-w-xl text-lg text-mist">
        {profile.target}. Email, call, or send the form. All of these are live links.
      </p>
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <ContactLinks />
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = schema.safeParse(form);
            if (!parsed.success) {
              setErrors("Need a name, work email, company, and a short note.");
              blip("err");
              return;
            }
            setErrors(null);
            const subject = encodeURIComponent(`Internship / role: ${parsed.data.company}`);
            const body = encodeURIComponent(
              `${parsed.data.message}\n\n${parsed.data.name} · ${parsed.data.email}`,
            );
            window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
            pushToast("Opening your email app");
            blip("ok");
          }}
        >
          {(["name", "email", "company"] as const).map((k) => (
            <input
              key={k}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
              placeholder={k}
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-gold"
            />
          ))}
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="role, dates, and how I can help"
            rows={6}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-gold"
          />
          {errors && <p className="text-sm text-signal">{errors}</p>}
          <button
            type="submit"
            className="rounded-full bg-gold px-6 py-3 btn-label text-void"
          >
            Open email
          </button>
        </form>
      </div>
    </div>
  );
}
