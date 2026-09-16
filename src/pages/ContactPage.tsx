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
  company: z.string().optional(),
  message: z.string().min(12),
});

export function ContactPage() {
  usePageTitle("Contact | Ali Farid");
  const { pushToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<string | null>(null);

  return (
    <div className="section-pad py-12">
      <p className="kicker">Internship and role inquiries</p>
      <h1 className="display-xl mt-2 text-5xl sm:text-6xl">Contact</h1>
      <p className="mt-3 max-w-xl text-lg text-mist">
        {profile.target}. Email, call, LinkedIn, or use the form. It opens your mail app with the note filled in.
      </p>
      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <ContactLinks />
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const parsed = schema.safeParse(form);
            if (!parsed.success) {
              setErrors("Need your name, email, and a short note (about 12 characters).");
              blip("err");
              return;
            }
            setErrors(null);
            const org = parsed.data.company?.trim();
            const subject = encodeURIComponent(
              org ? `Internship / role: ${org}` : "Internship / role inquiry",
            );
            const body = encodeURIComponent(
              `${parsed.data.message}\n\n${parsed.data.name} · ${parsed.data.email}${org ? ` · ${org}` : ""}`,
            );
            window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
            pushToast("Opening your email app");
            blip("ok");
          }}
        >
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-gold"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Your email"
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-gold"
          />
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company or school (optional)"
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-gold"
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Role, dates, and how I can help"
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
