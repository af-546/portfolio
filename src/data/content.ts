import { asset } from "@/lib/asset";

export const profile = {
  name: "Ali Farid",
  legalName: "Muhammad Ali Hassan Farid",
  title: "Software, IT, and systems",
  location: "West Lafayette, IN",
  phone: "+1 (646) 320-6413",
  phoneHref: "tel:+16463206413",
  email: "alifarid@purdue.edu",
  linkedin: "https://www.linkedin.com/in/ali-farid-purdue",
  github: "https://github.com/af-546",
  resume: asset("/Ali_Farid_Resume.pdf"),
  avatar: asset("/portraits/ali-suit.png"),
  photoSuit: asset("/portraits/ali-suit.png"),
  photoStage: asset("/portraits/ali-stage.png"),
  openToRelocation: true,
  graduation: "June 2028",
  target:
    "Summer 2027 internships in software engineering, IT, systems analysis, and related tech roles",
  summary:
    "Purdue Computing and Information Technology student. Expected graduation: June 2028. Transfer GPA 3.94/4.0. I have shipped live websites, supported office IT, and spent time in operations and finance. I am looking at internships in software, IT, and systems analysis.",
  bio: [
    "I study Computing and Information Technology at Purdue. Expected graduation: June 2028. I transferred from Montclair State after a year of computer science, with a 3.94 GPA.",
    "In summer 2026 I was a software developer at NightHash, where I shipped production React and TypeScript sites including SoftwareDesign.io and Houston LEAD. The summer before that, I interned at King Real Estate, built and launched property and lodging websites, and helped run day-to-day IT for the office.",
    "Earlier I managed operations at Alliance Distributors, including the Daraz.pk storefront, and interned in finance at Askari Bank. I am looking for Summer 2027 internships across software, IT support and ops, and systems analysis, not only web development.",
  ],
  now: [
    "Shipped SoftwareDesign.io and Houston LEAD at NightHash, Jun to Aug 2026",
    "Purdue CIT: data structures, OOP, systems programming, calculus",
    "Open to Summer 2027 internships. Open to relocation.",
  ],
};

export const stats = [
  { label: "Live sites shipped", value: 7, suffix: "", decimals: 0 },
  { label: "Transfer GPA", value: 3.94, suffix: "/4.0", decimals: 2 },
  { label: "IT devices supported", value: 15, suffix: "+", decimals: 0 },
  { label: "Roles across tech and ops", value: 4, suffix: "", decimals: 0 },
];

export const education = [
  {
    school: "Purdue University",
    place: "West Lafayette, IN",
    degree: "B.S. Computing and Information Technology",
    dates: "Expected graduation: June 2028",
    note: "Coursework: Data Structures and Algorithms, OOP, IT Architecture, Systems Analysis, Statistics, Calculus I and II, Systems Programming",
  },
  {
    school: "Montclair State University",
    place: "Montclair, NJ",
    degree: "B.S. Computer Science, 1 year completed",
    dates: "Transferred August 2025",
    note: "GPA 3.94/4.0",
  },
];

export const experience = [
  {
    id: "nighthash",
    company: "NightHash",
    role: "Software Developer",
    place: "Remote",
    dates: "Jun 2026 to Aug 2026",
    accent: "#e08a5d",
    bullets: [
      "Built and maintained production React and TypeScript sites, including SoftwareDesign.io and Houston LEAD",
      "Worked with Vite, Tailwind CSS, forms, and Cloudflare and GitHub deploy workflows on a small team",
    ],
  },
  {
    id: "king",
    company: "King Real Estate",
    role: "Software and Digital Operations Intern",
    place: "Old Orchard Beach, ME",
    dates: "Jun 2025 to Aug 2025",
    accent: "#7ec9a0",
    bullets: [
      "Designed, built, and launched websites for King Real Estate and related properties (kingre.org, theoobinn.com, seabreezemotel.com, coastal-oaks.com, Milwaukee Riverfront Plaza, sacolofts.com)",
      "Supported IT for 15+ office devices and handled recurring tickets with written runbooks",
      "Helped run listings and inquiry follow-up across the company's digital channels",
    ],
  },
  {
    id: "alliance",
    company: "Alliance Distributors",
    role: "Operations Manager",
    place: "Lahore, Pakistan",
    dates: "Aug 2019 to Jul 2022",
    accent: "#ff6b57",
    bullets: [
      "Ran the Daraz.pk storefront and warehouse inventory for 500+ listings, kept counts at about 98% accuracy, and grew online orders to around 300 a month with 10+ factory partners",
      "Negotiated vendor contracts and cut procurement turnaround by about 15%",
    ],
  },
  {
    id: "askari",
    company: "Askari Bank Pvt. Ltd.",
    role: "Finance Intern",
    place: "Gulberg, Lahore",
    dates: "Jun 2019 to Aug 2019",
    accent: "#60a5fa",
    bullets: [
      "Reviewed FX transaction flows and daily currency exposure for 50+ client accounts",
      "Built Excel models for rate sensitivity and presented in 3 staff meetings",
      "Handled 50+ daily banking inquiries with a high first-contact resolution rate",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  category: "Web" | "IT" | "Systems" | "Hardware";
  tags: string[];
  url?: string;
  github?: string;
  thumbnail?: string;
  live?: boolean;
  featured?: number;
  summary: string;
  challenge: string;
  approach: string;
  results: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "softwaredesign",
    title: "SoftwareDesign.io",
    client: "NightHash",
    year: "2026",
    category: "Web",
    tags: ["React", "TypeScript", "Vite", "Studio site"],
    url: "https://softwaredesign.io",
    thumbnail: asset("/work/softwaredesign.jpg"),
    live: true,
    featured: 1,
    summary:
      "Public studio site for NightHash, covering services, selected work, about, and a contact path.",
    challenge:
      "NightHash needed a public site that explained the work, showed examples, and made it easy to get in touch.",
    approach:
      "I built the production React and TypeScript site at softwaredesign.io: home, services, work, about, and contact, with a Vite and Tailwind frontend.",
    results: [
      "Live at softwaredesign.io",
      "Studio pages for services, work, about, and contact",
      "Shipped on the NightHash production stack",
    ],
    accent: "#3b82f6",
  },
  {
    slug: "houston-lead",
    title: "Houston LEAD",
    client: "Houston LEAD / NightHash",
    year: "2026",
    category: "Web",
    tags: ["React", "TypeScript", "Vite", "Community site"],
    url: "https://www.houstonlead.com",
    github: "https://github.com/af-546/Houston_Lead",
    thumbnail: asset("/work/houston-lead.jpg"),
    live: true,
    featured: 3,
    summary:
      "Business networking site for Greater Houston chapters, with membership, events, a professionals roster, and chapter info.",
    challenge:
      "Houston LEAD needed a clearer web presence for chapters, membership, and how to get involved.",
    approach:
      "I built a multi-page React and TypeScript site covering chapters, events, membership, and contact flows, and kept a GitHub repo of the production frontend.",
    results: [
      "Live at houstonlead.com",
      "Chapter, events, and membership pages in one site",
      "TypeScript and Vite codebase on GitHub",
    ],
    accent: "#c4a35a",
  },
  {
    slug: "kingre",
    title: "King Real Estate",
    client: "King Real Estate",
    year: "2025",
    category: "Web",
    tags: ["HTML/CSS", "JavaScript", "React", "Listings"],
    url: "https://www.kingre.org",
    thumbnail: asset("/work/kingre.jpg"),
    live: true,
    featured: 4,
    summary:
      "Brokerage site for King Real Estate in Old Orchard Beach, ME, with property search, listings, and office contact.",
    challenge:
      "The office needed a public site that matched how they actually sell and rent coastal Maine properties.",
    approach:
      "Built kingre.org from layout through launch during the summer internship: home, about, properties, and an inquiry form.",
    results: [
      "Live at kingre.org",
      "Property-focused home page and listings path",
      "Office phone, email, and Old Orchard Beach address on every footer",
    ],
    accent: "#c41e3a",
  },
  {
    slug: "oob-inn",
    title: "Old Orchard Beach Inn",
    client: "King Real Estate / OOB Inn",
    year: "2025",
    category: "Web",
    tags: ["Hospitality", "Booking CTA", "HTML/CSS"],
    url: "https://www.theoobinn.com",
    thumbnail: asset("/work/oobinn.jpg"),
    live: true,
    featured: 5,
    summary:
      "Hotel site for a historic inn on Portland Ave, with stay info, a booking path, and contact.",
    challenge:
      "The inn needed a simple public site that looked like the building, not a generic hotel template.",
    approach:
      "Shipped theoobinn.com with a photo-led home page, booking and contact links, and the inn's phone and address.",
    results: [
      "Live at theoobinn.com",
      "Home, book, and contact pages",
      "Clear booking call-to-action",
    ],
    accent: "#4a5c3a",
  },
  {
    slug: "seabreeze",
    title: "Sea Breeze Motel",
    client: "King Real Estate / Sea Breeze Motel",
    year: "2025",
    category: "Web",
    tags: ["Hospitality", "Gallery", "Booking"],
    url: "https://www.seabreezemotel.com",
    thumbnail: asset("/work/seabreeze.jpg"),
    live: true,
    summary:
      "Motel site a short walk from Old Orchard Beach, with a rooms gallery, story, and book-now flow.",
    challenge:
      "The motel needed a site guests would actually use to look at rooms and book.",
    approach:
      "Built seabreezemotel.com with a pool-front hero, room photos, contact, and a booking button.",
    results: [
      "Live at seabreezemotel.com",
      "Photo gallery of rooms and grounds",
      "Book Now and contact on the home page",
    ],
    accent: "#c62828",
  },
  {
    slug: "coastal-oaks",
    title: "Coastal Oaks",
    client: "Coastal Oaks LLC / King Real Estate",
    year: "2025",
    category: "Web",
    tags: ["Development", "Listings", "HTML/CSS"],
    url: "https://www.coastal-oaks.com",
    thumbnail: asset("/work/coastal-oaks.jpg"),
    live: true,
    featured: 6,
    summary:
      "Design-and-build site for Coastal Oaks LLC, with Maine buy and rent properties and project photos.",
    challenge:
      "A small development company needed a public face for projects and contact, not a bloated brochure.",
    approach:
      "Shipped coastal-oaks.com with a home hero, project photos, about, and contact details for the Saco Ave office.",
    results: [
      "Live at coastal-oaks.com",
      "Projects and contact pages",
      "Phone and email on the site",
    ],
    accent: "#1e3a5f",
  },
  {
    slug: "milwaukee-plaza",
    title: "Riverfront Plaza Offices",
    client: "King Real Estate",
    year: "2025",
    category: "Web",
    tags: ["Google Sites", "Commercial", "Leasing"],
    url: "https://sites.google.com/view/mllwaukee-riverfront-plaza",
    thumbnail: asset("/work/milwaukee.jpg"),
    live: true,
    featured: 2,
    summary:
      "Google Site for office suites on Milwaukee's riverfront, with location, photos, and leasing contact.",
    challenge:
      "The listing needed something live quickly that leasing inquiries could actually open on a phone.",
    approach:
      "Put up a Google Site with a cityscape hero, suite highlights, address, phone, and email form.",
    results: [
      "Live Google Site",
      "Address at 1110 N Dr. M.L.K. Jr Dr, Milwaukee",
      "Call and email links on the page",
    ],
    accent: "#8b1e2d",
  },
  {
    slug: "saco-lofts",
    title: "Saco Lofts",
    client: "King Real Estate",
    year: "2025",
    category: "Web",
    tags: ["Squarespace", "Residential"],
    url: "https://www.sacolofts.com",
    live: false,
    summary:
      "Residential loft site built during the King Real Estate internship. The Squarespace domain is currently expired.",
    challenge:
      "Needed a listing site for the Saco loft property on a short intern timeline.",
    approach:
      "Built and launched sacolofts.com on Squarespace. The public domain has since lapsed on the client side.",
    results: [
      "Shipped as part of the 2025 intern web work",
      "Domain currently shows as expired",
      "Kept here because it was production work, not a class mock",
    ],
    accent: "#6b7280",
  },
  {
    slug: "page-crawler",
    title: "Page crawler and summarizer",
    client: "Personal / coursework",
    year: "2024",
    category: "Systems",
    tags: ["Python", "BeautifulSoup", "Requests"],
    summary:
      "Python script that visits a page, writes a short summary, and counts how many subpages it links to.",
    challenge:
      "I wanted a small tool that could open a site, tell me what the page was about, and list child links. Not a full search engine.",
    approach:
      "Used Requests and BeautifulSoup: fetch HTML, pull text for a summary, collect same-site links, and print the subpage count. The Lab lets you paste a live URL and run that flow in the browser.",
    results: [
      "Fetches a page and prints a text summary",
      "Counts linked subpages on the same site",
      "Interactive demo on this site",
    ],
    accent: "#e08a5d",
  },
  {
    slug: "traffic-light",
    title: "Traffic light simulator",
    client: "Personal / hardware",
    year: "2025",
    category: "Hardware",
    tags: ["Python", "Raspberry Pi", "GPIO", "Sensors"],
    summary:
      "Raspberry Pi 4-way controller with real sensors. Approaches with more cars kept a longer green.",
    challenge:
      "Class project: run real lights from sensor input, not a fixed timer or a print-loop in the terminal.",
    approach:
      "Wired sensors on a Raspberry Pi so each approach reported how busy it was. The controller gave a longer green to the heavier direction, with night and emergency modes as fallbacks. The Lab replays that logic in the browser.",
    results: [
      "Hardware 4-way controller on a Raspberry Pi",
      "Sensor-weighted green time, plus night and emergency modes",
      "Browser demo of the same states",
    ],
    accent: "#ff6b57",
  },
];

export const skills = {
  languages: ["Java", "Python", "TypeScript", "JavaScript", "HTML/CSS", "SQL"],
  frameworks: ["React", "Vite", "Tailwind CSS", "Framer Motion", "BeautifulSoup"],
  tools: [
    "Git",
    "GitHub Actions",
    "Linux",
    "VS Code",
    "IntelliJ",
    "Cloudflare Pages",
    "Vercel",
    "Raspberry Pi",
    "Excel",
  ],
  concepts: [
    "DSA",
    "OOP",
    "REST APIs",
    "Web development",
    "IT support",
    "Networking",
    "Systems analysis",
    "Financial modeling",
  ],
};

export const skillContexts = [
  {
    place: "NightHash",
    detail: "Production React sites",
    items: ["TypeScript", "React", "Vite", "Tailwind CSS", "Git"],
  },
  {
    place: "King Real Estate",
    detail: "Websites and office IT",
    items: ["HTML/CSS", "JavaScript", "IT support", "Linux"],
  },
  {
    place: "Alliance / Daraz.pk",
    detail: "Store and inventory ops",
    items: ["Excel", "SQL", "Systems analysis"],
  },
  {
    place: "Purdue CIT",
    detail: "Coursework",
    items: ["Java", "Python", "DSA", "OOP", "IT Architecture"],
  },
];

export const clocks = [
  { id: "wl", label: "West Lafayette", tz: "America/Indiana/Indianapolis" },
  { id: "lhr", label: "Lahore", tz: "Asia/Karachi" },
];

export const nav = [
  { to: "/", label: "Home", shortcut: "H" },
  { to: "/work", label: "Work", shortcut: "W" },
  { to: "/lab", label: "Lab", shortcut: "L" },
  { to: "/about", label: "About", shortcut: "A" },
  { to: "/contact", label: "Contact", shortcut: "C" },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
