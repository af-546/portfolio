import { asset } from "@/lib/asset";

export const profile = {
  name: "Ali Farid",
  legalName: "Muhammad Ali Hassan Farid",
  title: "Software · IT · Systems",
  location: "West Lafayette, IN",
  phone: "+1 (646) 320-6413",
  phoneHref: "tel:+16463206413",
  email: "alifarid@purdue.edu",
  linkedin: "https://www.linkedin.com/in/ali-farid-purdue",
  github: "https://github.com/af-546",
  resume: asset("/Ali_Farid_Resume.pdf"),
  avatar: asset("/ali-github.png"),
  openToRelocation: true,
  graduation: "June 2028",
  target:
    "Summer 2027 internships in software engineering, IT, systems analysis, and related tech roles",
  summary:
    "Purdue Computing & Information Technology student (expected June 2028). Transfer GPA 3.94/4.0. I have shipped live websites, supported IT operations, and done a short stint in finance operations — looking at SWE, IT, and systems analyst internships.",
  bio: [
    "I am a Computing & Information Technology student at Purdue, graduating June 2028. I transferred from Montclair State with a 3.94 GPA after a year of computer science.",
    "At NightHash I work on production React/TypeScript sites, including SoftwareDesign.io and Houston LEAD. During a 2025 internship at King Real Estate I built and launched property and lodging websites, and helped run day-to-day IT for the office.",
    "Before that I managed operations at Alliance Distributors and interned in finance at Askari Bank. I am looking for Summer 2027 internships across software, IT support/ops, and systems analysis — not only web development.",
  ],
  now: [
    "Software developer at NightHash (remote, Boston-based)",
    "Purdue CIT: data structures, OOP, systems programming, calculus",
    "Open to Summer 2027 internships · open to relocation",
  ],
};

export const stats = [
  { label: "Live sites shipped", value: 7, suffix: "", decimals: 0 },
  { label: "Transfer GPA", value: 3.94, suffix: "/4.0", decimals: 2 },
  { label: "IT devices supported", value: 15, suffix: "+", decimals: 0 },
  { label: "Roles across tech & ops", value: 4, suffix: "", decimals: 0 },
];

export const education = [
  {
    school: "Purdue University",
    place: "West Lafayette, IN",
    degree: "B.S. Computing & Information Technology",
    dates: "Expected June 2028",
    note: "Coursework: Data Structures and Algorithms, OOP, Mathematics, Calculus I–II, Systems Programming",
  },
  {
    school: "Montclair State University",
    place: "Montclair, NJ",
    degree: "B.S. Computer Science — 1 year completed",
    dates: "Transferred August 2025",
    note: "GPA 3.94/4.0",
  },
];

export const experience = [
  {
    id: "nighthash",
    company: "NightHash",
    role: "Software Developer",
    place: "Remote, based in Boston, MA",
    dates: "Jan 2026 — Present",
    accent: "#e8c547",
    bullets: [
      "Build and maintain production React/TypeScript sites, including SoftwareDesign.io and Houston LEAD",
      "Work with Vite, Tailwind CSS, forms, and Cloudflare/GitHub deploy workflows on a small team",
    ],
  },
  {
    id: "king",
    company: "King Real Estate",
    role: "Software and Digital Operations Intern",
    place: "Old Orchard Beach, ME",
    dates: "Jun 2025 — Aug 2025",
    accent: "#7af0c6",
    bullets: [
      "Designed, built, and launched websites for King Real Estate and related properties (kingre.org, theoobinn.com, seabreezemotel.com, coastal-oaks.com, Milwaukee Riverfront Plaza, sacolofts.com)",
      "Supported IT for 15+ office devices and handled recurring tickets with written runbooks",
      "Helped run listings and inquiry follow-up across the company’s digital channels",
    ],
  },
  {
    id: "alliance",
    company: "Alliance Distributors",
    role: "Operations Manager",
    place: "Lahore, Pakistan",
    dates: "Jun 2019 — Jul 2022",
    accent: "#ff4d2e",
    bullets: [
      "Ran inventory across 500+ SKUs at 98% count accuracy and grew online orders to about 300/month with 10+ factory partners",
      "Negotiated vendor contracts and cut procurement turnaround by about 15%",
    ],
  },
  {
    id: "askari",
    company: "Askari Bank Pvt. Ltd.",
    role: "Finance Intern",
    place: "Gulberg, Lahore",
    dates: "Jun 2019 — Aug 2019",
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
      "NightHash studio site — services, work, about, and contact for a Boston-based software design studio.",
    challenge:
      "NightHash needed a public studio site that explained the work, showed examples, and made it easy to get in touch.",
    approach:
      "I built the production React/TypeScript site at softwaredesign.io: home, services, work, about, and contact, with a Vite/Tailwind frontend.",
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
      "Business networking site for Greater Houston chapters — membership, events, professionals roster, and chapter info.",
    challenge:
      "Houston LEAD needed a clearer web presence for chapters, membership, and how to get involved.",
    approach:
      "I built a multi-page React/TypeScript site covering chapters, events, membership, and contact flows, and kept a GitHub repo of the production frontend.",
    results: [
      "Live at houstonlead.com",
      "Chapter, events, and membership pages in one site",
      "TypeScript/Vite codebase on GitHub",
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
      "Brokerage site for King Real Estate in Old Orchard Beach, ME — property search, listings, and office contact.",
    challenge:
      "The office needed a public site that matched how they actually sell and rent coastal Maine properties.",
    approach:
      "Built kingre.org from layout through launch during the summer internship: home, about, properties, and inquiry form.",
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
      "Hotel site for a historic inn on Portland Ave — stay info, booking path, and contact.",
    challenge:
      "The inn needed a simple public site that looked like the building, not a generic hotel template.",
    approach:
      "Shipped theoobinn.com with a photo-led home page, booking and contact links, and the inn’s phone and address.",
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
      "Motel site a short walk from Old Orchard Beach — rooms gallery, story, and book-now flow.",
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
    summary:
      "Design-and-build site for Coastal Oaks LLC — Maine buy/rent properties and project photos.",
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
      "Google Site for office suites on Milwaukee’s riverfront — location, photos, and leasing contact.",
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
    title: "Page crawler & summarizer",
    client: "Personal / coursework",
    year: "2024",
    category: "Systems",
    tags: ["Python", "BeautifulSoup", "Requests"],
    summary:
      "Python script that visits a page, writes a short summary, and counts how many subpages it links to.",
    challenge:
      "I wanted a small tool that could open a site, tell me what the page was about, and list child links — not a full search engine.",
    approach:
      "Used Requests and BeautifulSoup: fetch HTML, pull text for a summary, collect same-site <a> hrefs, and print the subpage count. There is a walkthrough of that flow in the Lab.",
    results: [
      "Fetches a page and prints a text summary",
      "Counts linked subpages on the same site",
      "Interactive demo on this site",
    ],
    accent: "#e8c547",
  },
  {
    slug: "traffic-light",
    title: "Traffic light simulator",
    client: "Personal / hardware",
    year: "2025",
    category: "Hardware",
    tags: ["Python", "Raspberry Pi", "GPIO"],
    summary:
      "4-way intersection controller on a Raspberry Pi using GPIO and a simple state machine.",
    challenge:
      "Class project: run real lights with predictable transitions, not just a print-loop in the terminal.",
    approach:
      "Wrote a state machine on the Pi with normal, night, and emergency modes. The Lab page replays that logic in the browser.",
    results: [
      "Hardware 4-way controller",
      "Normal / night / emergency modes",
      "Browser demo of the same states",
    ],
    accent: "#ff4d2e",
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

export const skillNodes = [
  { id: "ts", label: "TypeScript", x: 22, y: 28, r: 18, group: "lang" },
  { id: "py", label: "Python", x: 48, y: 18, r: 16, group: "lang" },
  { id: "java", label: "Java", x: 72, y: 30, r: 14, group: "lang" },
  { id: "sql", label: "SQL", x: 86, y: 52, r: 12, group: "lang" },
  { id: "react", label: "React", x: 30, y: 58, r: 20, group: "fw" },
  { id: "vite", label: "Vite", x: 55, y: 48, r: 13, group: "fw" },
  { id: "html", label: "HTML/CSS", x: 70, y: 68, r: 15, group: "fw" },
  { id: "it", label: "IT support", x: 42, y: 78, r: 14, group: "ops" },
  { id: "net", label: "Networking", x: 18, y: 80, r: 11, group: "ops" },
  { id: "linux", label: "Linux", x: 12, y: 48, r: 13, group: "ops" },
  { id: "dsa", label: "DSA", x: 38, y: 38, r: 12, group: "concept" },
  { id: "sa", label: "Sys analysis", x: 82, y: 82, r: 14, group: "concept" },
  { id: "excel", label: "Excel", x: 90, y: 28, r: 12, group: "concept" },
];

export const skillEdges: [string, string][] = [
  ["ts", "react"],
  ["ts", "vite"],
  ["react", "html"],
  ["html", "it"],
  ["it", "net"],
  ["linux", "py"],
  ["py", "dsa"],
  ["java", "dsa"],
  ["sql", "sa"],
  ["net", "sa"],
  ["excel", "sql"],
];

export const clocks = [
  { id: "wl", label: "West Lafayette", tz: "America/Indiana/Indianapolis" },
  { id: "bos", label: "Boston", tz: "America/New_York" },
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
