import { profile } from "@/data/content";
import { Magnetic } from "@/components/ui/Magnetic";

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-gold">
      {children}
    </span>
  );
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.25h4.56V24H.22zM8.34 8.25h4.37v2.14h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.99h-4.56v-8c0-1.9-.03-4.35-2.65-4.35-2.65 0-3.06 2.07-3.06 4.21V24H8.34z" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.79 8.21 10.37.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.02-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.7.82.58C20.56 22.29 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6.5 3.5h3l1.2 4.2-2 1.2a12 12 0 0 0 6.4 6.4l1.2-2 4.2 1.2v3c0 .8-.7 1.5-1.5 1.5C9.2 18.8 5.2 14.8 5 7c0-.8.7-1.5 1.5-1.5Z" />
    </svg>
  );
}

export function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

export const contactLinks = [
  {
    id: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: <MailIcon />,
  },
  {
    id: "phone",
    label: "Phone",
    value: profile.phone,
    href: profile.phoneHref,
    icon: <PhoneIcon />,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "ali-farid-purdue",
    href: profile.linkedin,
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    value: "af-546",
    href: profile.github,
    icon: <GitHubIcon />,
    external: true,
  },
  {
    id: "resume",
    label: "Resume",
    value: "PDF",
    href: profile.resume,
    icon: <FileIcon />,
  },
];

export function ContactLinks({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "space-y-2" : "space-y-3"}>
      {contactLinks.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="group flex items-center gap-3 rounded-xl px-1 py-1 hover:text-gold"
          >
            <IconWrap>{item.icon}</IconWrap>
            <span>
              {!compact && (
                <span className="block text-sm font-medium text-mist group-hover:text-gold/80">{item.label}</span>
              )}
                <span className={compact ? "text-sm font-medium" : "text-sm"}>
                {compact ? item.label : item.value}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ContactPills({ omit = [] }: { omit?: string[] }) {
  const hidden = new Set(omit);
  return (
    <div className="flex flex-wrap gap-2">
      {contactLinks.filter((item) => !hidden.has(item.id)).map((item) => (
        <Magnetic key={item.id}>
          <a
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-sm hover:border-gold/50 hover:text-gold"
          >
            <span className="text-gold">{item.icon}</span>
            {item.label}
          </a>
        </Magnetic>
      ))}
    </div>
  );
}
