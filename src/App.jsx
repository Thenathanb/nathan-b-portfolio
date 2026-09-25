import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WireframeSphere = lazy(() => import("./WireframeSphere.jsx"));

const navLinks = [
  { label: "Work", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact +", href: "#contact" },
];

const experienceItems = [
  {
    id: "ibm",
    company: "IBM",
    title: "Software Developer Co-op",
    team: "IBM Data Infrastructure",
    dates: "Aug 2026 — Present",
    location: "San Jose, CA",
    link: { label: "OpenRAG on GitHub", href: "https://github.com/langflow-ai/openrag" },
    bullets: [
      "Built reliability fixes across the document ingestion pipeline of OpenRAG, IBM's open-source RAG platform (4.6k+ GitHub stars), shipping fixes in Python/FastAPI and TypeScript/Next.js, including OpenSearch bulk-write retries, connector sync fixes and ingestion validation.",
      "Own automated test coverage (pytest) for OpenRAG's FastAPI backend across document ingestion and retrieval workflows, cutting manual regression-testing time by 14% ahead of each release.",
      "Work directly with maintainers through code review on an open-source repository with 400+ forks.",
    ],
  },
  {
    id: "jpmorgan",
    company: "JPMorgan Chase",
    title: "Software Engineer Intern",
    team: "JPMorgan Chase — AI Usage",
    dates: "Jun 2026 — Aug 2026",
    location: "Plano, TX",
    bullets: [
      "Built a full-stack AI cost intelligence dashboard (React/TypeScript) processing 3.1M+ rows of LLM spend data through an offline Node.js ETL pipeline, supporting real-time multi-dimensional filtering without shipping raw data to the browser.",
      "Wrote a unit-tested (Vitest) analytics engine for spend anomaly detection, budget forecasting and ranked cost-saving opportunities, used by finance stakeholders to review FinOps spend.",
      "Integrated Databricks Genie through a secure Vite server-side proxy and built client-side export to Excel, PDF and PowerPoint, cutting manual reporting steps for the cost-governance team.",
    ],
  },
  {
    id: "uh-lab",
    company: "University of Houston",
    title: "Computer Lab Assistant",
    dates: "Aug 2024 — Present",
    location: "Houston, TX",
    bullets: [
      "Provide technical support to 50+ students and staff monthly, improving lab efficiency by 20%.",
      "Run weekly maintenance for 40 lab computers and led five training sessions on popular software.",
    ],
  },
  {
    id: "colorstack",
    company: "ColorStack · University of Houston",
    title: "Events Chair",
    dates: "Jun 2025 — Present",
    location: "Houston, TX",
    bullets: [
      "Plan and run 5+ technical and career events per semester, boosting engagement by 40%.",
      "Partner with 10+ companies and campus groups to support 100+ underrepresented students in tech.",
      "Led a team of four to host the semester's largest event, driving 60% new member sign-ups.",
    ],
  },
  {
    id: "nsbe",
    company: "NSBE · University of Houston",
    title: "FEB Programs",
    dates: "Aug 2025 — Present",
    location: "Houston, TX",
    bullets: [
      "Won 1st place in NSBE's STEM Craft competition out of 10+ teams.",
      "Raised $327 to sponsor member attendance at the regional conference and mentored five middle school students in a pre-collegiate STEM program.",
    ],
  },
];

const projects = [
  {
    title: "CourseMate",
    date: "Jan 2026",
    bullets: [
      "Chrome extension that shows Rate My Professors ratings directly inside UH's course registration flow, so students don't have to switch tabs.",
      "Async scraping system that fetches and caches ratings for 2,000+ UH professors.",
      "Local caching and rate limiting (1 req/sec) cut external lookups by 30% while staying within provider limits.",
    ],
    stack: ["JavaScript", "HTML", "CSS", "GraphQL"],
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/coursemate/opdladhnlkndlddmfmclfgknogjhnenl",
      },
      { label: "GitHub", href: "https://github.com/Thenathanb/CourseMate" },
    ],
  },
  {
    title: "E-Commerce Demand Forecasting",
    date: "Mar 2025",
    bullets: [
      "Trained an LSTM in PyTorch on 500K+ sales records to forecast 30-day demand across 15 product categories, reaching an MAE of 2 units.",
      "Built an MLOps pipeline (Airflow + MLflow) that automates feature extraction from sales data and review text (BERT) for retraining.",
      "Deployed an XGBoost stockout-risk classifier with Flask and Docker at 89% precision on held-out data.",
    ],
    stack: ["Python", "PyTorch", "XGBoost", "Flask", "Docker"],
    links: [],
  },
  {
    title: "ExploreMoves — RSVP",
    date: "May 2025",
    bullets: [
      "Designed and built an inline RSVP feature (Yes / No / Maybe) for a social event-sharing app.",
      "Added real-time RSVP updates, load-tested with 10+ simultaneous users.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "JWT Auth"],
    links: [{ label: "ExploreMoves", href: "https://exploremoves.com/" }],
  },
];

const highlights = [
  "Built an AI cost dashboard over **3.1M+ rows** of LLM spend data at JPMorgan Chase.",
  "Contributing to **OpenRAG**, IBM's open-source RAG platform with **4.6k+ GitHub stars**.",
  "Cut manual regression-testing time by **14%** with pytest coverage for OpenRAG's backend.",
  "Trained an LSTM on **500K+ sales records** to forecast demand with an MAE of 2 units.",
];

const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL", "HTML/CSS"],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Flask",
      "PyTorch",
      "XGBoost",
      "Tailwind CSS",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git / GitHub",
      "Docker",
      "OpenSearch",
      "Langflow",
      "Docling",
      "Airflow",
      "MLflow",
      "GraphQL",
      "pytest",
      "Vitest",
    ],
  },
];

const Emphasis = ({ text }) =>
  text.split(/\*\*(.+?)\*\*/).map((part, index) =>
    index % 2 ? (
      <span key={index} className="font-semibold text-white">
        {part}
      </span>
    ) : (
      part
    )
  );

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const ExperienceDetail = ({ item }) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35 }}
    className="space-y-4"
  >
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h3 className="text-2xl font-semibold sm:text-3xl">{item.title}</h3>
      <span className="text-sm text-white/50">{item.dates}</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {item.team && <span className="info-pill">{item.team}</span>}
      {item.location && <span className="info-pill">{item.location}</span>}
    </div>
    <ul className="space-y-3 text-white/70 leading-relaxed">
      {item.bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3">
          <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
    {item.link && (
      <a
        href={item.link.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex text-sm text-white/70 transition hover:text-white"
      >
        {item.link.label} →
      </a>
    )}
  </motion.div>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCompany, setActiveCompany] = useState(experienceItems[0]);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute right-10 top-40 h-4 w-4 rounded-full bg-accent"
        animate={{ y: [0, 14, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur">
        <div className="section-wrap flex h-16 items-center justify-between">
          <span className="text-xs tracking-[0.4em] text-white/60">
            NATHAN BAKARE
          </span>
          <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden text-white/70"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="section-wrap border-t border-white/10 py-4 md:hidden"
            >
              <div className="flex flex-col gap-4 text-sm text-white/70">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-24">
        <section className="section-wrap pb-24 pt-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...fadeIn}>
              <span className="text-xs tracking-[0.5em] text-white/50">
                FOLIO 01
              </span>
              <h1 className="mt-6 text-4xl font-light sm:text-5xl lg:text-6xl">
                <span className="block font-light">Nathan</span>
                <span className="block font-semibold">Bakare</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-white/70">
                Computer Engineering student at the University of Houston
                building backend, AI and data infrastructure. Currently a
                Software Developer Co-op at IBM.
              </p>

              <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Availability
                  </p>
                  <p className="mt-2 text-sm">Summer 2027</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Location
                  </p>
                  <p className="mt-2 text-sm">San Jose</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Contact
                  </p>
                  <p className="mt-2 text-sm">nathanbakare1@gmail.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute -right-6 top-4 h-24 w-24 rounded-full border border-accent/50" />
              <Suspense
                fallback={
                  <div className="h-64 w-64 sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
                }
              >
                <WireframeSphere />
              </Suspense>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section-wrap pb-24">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-light sm:text-4xl">
              Software Developer{" "}
              <span className="font-semibold">specializing</span>
              <br />
              in <span className="font-semibold">fullstack</span> projects
            </h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <p className="text-white/70 leading-relaxed">
                I build{" "}
                <span className="font-semibold text-white">full-stack</span>{" "}
                and backend systems that hold up in{" "}
                <span className="font-semibold text-white">production</span>.
                At IBM I work on OpenRAG, an open-source retrieval-augmented
                generation platform, and at JPMorgan Chase I built an AI cost
                intelligence dashboard over millions of rows of LLM spend data.
                I care about{" "}
                <span className="font-semibold text-white">reliable</span>{" "}
                pipelines, well-tested code and tools people actually use.
              </p>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Education
                  </p>
                  <p className="mt-4 text-sm text-white/70">
                    University of Houston
                    <br />
                    B.S. Computer Engineering
                    <br />
                    GPA 3.87 · Expected May 2028
                    <br />
                    <span className="text-white/50">
                      Data Structures &amp; Algorithms, Operating Systems,
                      Database Systems, Software Engineering
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Contact
                  </p>
                  <p className="mt-4 text-sm text-white/70">
                    nathanbakare1@gmail.com
                    <br />
                    San Jose, CA
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeIn} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {highlights.map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <span className="text-sm text-white/40">0{index + 1}</span>
                    <p className="text-white/70">
                      <Emphasis text={item} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex items-end">
                <a
                  href="/Nathan-Bakare-Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm uppercase tracking-[0.3em] text-white/60 transition hover:text-white"
                >
                  View Full Resume →
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="experience" className="section-wrap pb-24">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1fr]">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl font-light sm:text-4xl">Experience</h2>
              <p className="mt-4 text-white/60">
                Open-source AI infrastructure at IBM, internal AI tooling at
                JPMorgan Chase, and community work at the University of Houston.
              </p>
              <div className="mt-8 space-y-3">
                {experienceItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveCompany(item)}
                    className={`flex w-full items-center justify-between rounded-full border px-4 py-2 text-left text-sm transition ${
                      activeCompany.id === item.id
                        ? "border-accent text-white"
                        : "border-white/10 text-white/60 hover:border-white/30"
                    }`}
                  >
                    <span>{item.company}</span>
                    <span className="text-xs text-white/40">View</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <AnimatePresence mode="wait">
                <ExperienceDetail item={activeCompany} />
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="section-wrap pb-24">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-light sm:text-4xl">Projects</h2>
            <p className="mt-4 text-white/60">
              Selected work across browser extensions, machine learning and
              real-time product features.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 grid gap-6 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <div
                key={project.title}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  {project.date}
                </p>
                <h3 className="mt-4 text-xl font-semibold">{project.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/70 leading-relaxed">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                {project.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-5 pt-6">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </section>

        <section id="expertise" className="section-wrap pb-24">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-light sm:text-4xl">Expertise</h2>
            <p className="mt-4 max-w-2xl text-white/60">
              The languages, frameworks and tools I use day to day across
              backend services, frontends and machine learning.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 grid gap-8 lg:grid-cols-3"
          >
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {group.title}
                </h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="contact" className="section-wrap pb-20">
          <motion.div
            {...fadeIn}
            className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-10 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-sm">
                  NB
                </div>
                <h2 className="text-2xl font-light sm:text-3xl">
                  Let&apos;s work together
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:nathanbakare1@gmail.com"
                  className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:border-accent"
                >
                  nathanbakare1@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/nathan-bakare-b7b0b3326/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:border-accent"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <a
                href="mailto:nathanbakare1@gmail.com"
                className="flex h-28 w-28 items-center justify-center rounded-full bg-accent text-sm font-semibold text-black transition hover:scale-105"
              >
                Get in touch
              </a>
            </div>
          </motion.div>

          <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.25em] text-white/50 sm:grid-cols-3">
            <div>Version: 2026 © Edition</div>
            <div>Local Time: {localTime}</div>
            <div>
              Socials:{" "}
              <a
                href="https://www.linkedin.com/in/nathan-bakare-b7b0b3326/"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 transition hover:text-white"
              >
                LinkedIn
              </a>
              {", "}
              <a
                href="https://github.com/Thenathanb"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 transition hover:text-white"
              >
                GitHub
              </a>
              {", "}
              <a
                href="https://www.instagram.com/nathanbakare/"
                target="_blank"
                rel="noreferrer"
                className="text-white/70 transition hover:text-white"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="section-wrap border-t border-white/10 py-8 text-xs uppercase tracking-[0.25em] text-white/40">
        Last updated {__BUILD_DATE__}
      </footer>
    </div>
  );
}
