import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";

const navLinks = [
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact +", href: "#contact" },
];

const experienceItems = [
  {
    id: "uh-lab",
    company: "University of Houston",
    title: "Computer Lab Assistant",
    dates: "Aug 2024 — Present",
    location: "Houston, TX",
    description:
      "Provided technical support to 50+ students and staff monthly, improving lab efficiency by 20%. Implemented weekly maintenance for 40 lab computers and conducted five training sessions on popular software. Delivered one-on-one guidance to 15 users monthly to improve technical confidence and productivity.",
  },
  {
    id: "colorstack",
    company: "ColorStack · University of Houston",
    title: "Events Chair",
    dates: "Jun 2025 — Present",
    location: "Houston, TX",
    description:
      "Planned and executed 5+ technical and career events per semester, boosting engagement by 40%. Partnered with 10+ companies and campus groups to support 100+ underrepresented students in tech. Led a team of four to host the largest event of the semester, driving 60% new member sign-ups.",
  },
  {
    id: "nsbe",
    company: "NSBE · University of Houston",
    title: "FEB Programs",
    dates: "Aug 2025 — Present",
    location: "Houston, TX",
    description:
      "Won 1st place in NSBE’s STEM Craft competition out of 10+ teams. Raised $327 through fundraising to sponsor member attendance at the regional conference. Mentored five middle school students in a pre-collegiate STEM initiative and supported outreach events promoting STEM education.",
  },
];

const stats = [
  "3 ORGANIZATIONS",
  "1+ YEARS EXPERIENCE",
  "2 PROJECTS",
  "6 TECH STACK",
];

const highlights = [
  "Supported **50+ students and staff** monthly with hands-on technical help.",
  "Executed **5+ events per semester** to grow community engagement.",
  "Partnered with **10+ companies** to expand access for students in tech.",
  "Mentored **middle school students** through STEM design challenges.",
];

const skillTabs = {
  "Technical Skills": [
    {
      title: "Full-Stack",
      skills: [
        { name: "Web Development", value: 92 },
        { name: "API Integration", value: 86 },
        { name: "Extension Development", value: 84 },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React / React Native", value: 88 },
        { name: "UI Engineering", value: 85 },
        { name: "Performance Tuning", value: 80 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js Services", value: 82 },
        { name: "GraphQL", value: 78 },
        { name: "Data Handling", value: 80 },
      ],
    },
  ],
  "Frameworks & Tools": [
    {
      title: "Frameworks",
      skills: [
        { name: "React", value: 88 },
        { name: "React Native", value: 84 },
        { name: "Tailwind CSS", value: 80 },
      ],
    },
    {
      title: "Platforms",
      skills: [
        { name: "Chrome Extensions", value: 86 },
        { name: "GitHub", value: 82 },
        { name: "Firebase", value: 74 },
      ],
    },
    {
      title: "Tooling",
      skills: [
        { name: "VS Code", value: 90 },
        { name: "Figma", value: 72 },
        { name: "Notion", value: 84 },
      ],
    },
  ],
  Languages: [
    {
      title: "Programming Languages",
      skills: [
        { name: "JavaScript", value: 90 },
        { name: "TypeScript", value: 82 },
        { name: "Python", value: 78 },
      ],
    },
    {
      title: "Data",
      skills: [
        { name: "SQL", value: 80 },
        { name: "JSON", value: 88 },
        { name: "HTML/CSS", value: 92 },
      ],
    },
    {
      title: "Scripting",
      skills: [
        { name: "Bash", value: 70 },
        { name: "Rust", value: 62 },
        { name: "Java", value: 76 },
      ],
    },
  ],
};

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const WireframeSphere = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(1.3, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    let frameId;
    const animate = () => {
      sphere.rotation.y += 0.0035;
      sphere.rotation.x += 0.0025;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="h-64 w-64 sm:h-72 sm:w-72 lg:h-96 lg:w-96"
    />
  );
};

const SkillBar = ({ name, value }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/80">{name}</span>
      <span className="text-white/50">{value}%</span>
    </div>
    <div className="h-[6px] rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-accent"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </div>
  </div>
);

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
    <span className="info-pill">{item.location}</span>
    <p className="text-white/70 leading-relaxed">{item.description}</p>
  </motion.div>
);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Technical Skills");
  const [activeCompany, setActiveCompany] = useState(experienceItems[0]);
  const [localTime, setLocalTime] = useState("");

  const tabData = useMemo(() => skillTabs[activeTab], [activeTab]);

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
                ECE student at University of Houston building useful projects.
              </p>

              <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Availability
                  </p>
                  <p className="mt-2 text-sm">Fall 2026</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Location
                  </p>
                  <p className="mt-2 text-sm">Houston</p>
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
              <WireframeSphere />
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
                I build systems that blend{" "}
                <span className="font-semibold text-white">user-focused</span>{" "}
                design with{" "}
                <span className="font-semibold text-white">practical</span>{" "}
                engineering. I enjoy shipping projects that improve student
                workflows and create{" "}
                <span className="font-semibold text-white">real-world</span>{" "}
                impact on campus.
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
                    2024 — 2028
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    Contact
                  </p>
                  <p className="mt-4 text-sm text-white/70">
                    nathanbakare1@gmail.com
                    <br />
                    832-946-6005
                    <br />
                    Houston, TX
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
                    <p
                      className="text-white/70"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
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
                A timeline of my professional journey crafting intelligent
                products, collaborating with global teams, and shipping to scale.
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

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-6 text-xs uppercase tracking-[0.25em] text-white/70"
              >
                {stat}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section-wrap pb-24">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-light sm:text-4xl">Projects</h2>
            <p className="mt-4 text-white/60">
              Selected work focused on student productivity, product experience,
              and real-time collaboration.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 grid gap-6 lg:grid-cols-2"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                CourseMate UH
              </p>
              <h3 className="mt-4 text-xl font-semibold">CourseMate UH</h3>
              <p className="mt-4 text-white/70 leading-relaxed">
                Built a Chrome extension integrating Rate My Professor&apos;s
                GraphQL API, reducing professor research time by 85% for 1,200+
                University of Houston students.
              </p>
              <a
                href="https://thenathanb.github.io/CourseMate-UH/privacy-policy.html"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm text-white/70 transition hover:text-white"
              >
                Learn more →
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                ExploreMoves
              </p>
              <h3 className="mt-4 text-xl font-semibold">ExploreMoves</h3>
              <p className="mt-4 text-white/70 leading-relaxed">
                Designed and built an RSVP feature for a social event-sharing
                app. Added inline RSVP (Yes/No/Maybe) to boost engagement by 30%
                and developed real-time updates for 10+ simultaneous users
                during testing.
              </p>
              <a
                href="https://exploremoves.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm text-white/70 transition hover:text-white"
              >
                ExploreMoves →
              </a>
            </div>
          </motion.div>
        </section>

        <section id="expertise" className="section-wrap pb-24">
          <div className="grid gap-8 lg:grid-cols-[0.6fr_1fr]">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl font-light sm:text-4xl">Expertise</h2>
              <p className="mt-4 text-white/60">
                A blend of technical depth and systems thinking, spanning
                full-stack delivery, AI research, and user-centered engineering.
              </p>
            </motion.div>
            <motion.div {...fadeIn} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex flex-wrap gap-3">
                {Object.keys(skillTabs).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em] transition ${
                      activeTab === tab
                        ? "border-accent text-white"
                        : "border-white/10 text-white/50 hover:border-white/30"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 grid gap-8 lg:grid-cols-3"
          >
            {tabData.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {group.title}
                </h3>
                <div className="mt-6 space-y-6">
                  {group.skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} />
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
                  href="tel:+18329466005"
                  className="rounded-full border border-white/20 px-5 py-2 text-sm transition hover:border-accent"
                >
                  832-946-6005
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <a
                href="#"
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
        © 2026 · Nathan Bakare
      </footer>
    </div>
  );
}
