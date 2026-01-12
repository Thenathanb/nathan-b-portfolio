const data = window.PORTFOLIO_DATA;

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el && value) {
    el.textContent = value;
  }
};

const setLink = (id, link) => {
  const el = document.getElementById(id);
  if (!el || !link) return;
  el.textContent = link.label || el.textContent;
  el.href = link.href || el.href;
};

const renderList = (containerId, items, renderItem) => {
  const container = document.getElementById(containerId);
  if (!container || !items) return;
  container.innerHTML = "";
  items.forEach((item) => container.appendChild(renderItem(item)));
};

setText("name", data.name);
setText("role", data.role);
setText("location", data.location);
setText("school", data.school);
setText("focus", data.focus);
setText("tagline", data.tagline);
setText("about-lead", data.aboutLead);
setText("about-body", data.aboutBody);
setText("contact-blurb", data.contactBlurb);
setText("eyebrow", data.eyebrow);
setText("footer-name", data.name);

document.title = `${data.name} — Portfolio`;

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

setLink("email-link", { label: "Email", href: data.socials?.[0]?.href });
setLink("resume-link", { label: "Resume", href: data.resumeUrl });

renderList("stats", data.stats, (stat) => {
  const card = document.createElement("div");
  card.className = "stat";
  const title = document.createElement("h3");
  title.textContent = stat.title;
  const value = document.createElement("p");
  value.textContent = stat.value;
  card.append(title, value);
  return card;
});

renderList("nav", data.nav, (item) => {
  const link = document.createElement("a");
  link.href = item.href;
  link.textContent = item.label;
  return link;
});

renderList("experience-list", data.experience, (item) => {
  const card = document.createElement("article");
  card.className = "card";
  const header = document.createElement("div");
  header.className = "card-header";
  const title = document.createElement("h3");
  title.textContent = `${item.title} · ${item.org}`;
  const time = document.createElement("span");
  time.className = "pill";
  time.textContent = item.time;
  header.append(title, time);
  const desc = document.createElement("p");
  desc.textContent = item.description;
  card.append(header, desc);
  if (item.link?.href) {
    const link = document.createElement("a");
    link.href = item.link.href;
    link.textContent = item.link.label || "More";
    link.target = "_blank";
    link.rel = "noreferrer";
    card.append(link);
  }
  return card;
});

const [featuredProject, ...otherProjects] = data.projects || [];

const renderProjectMeta = (item) => {
  const meta = document.createElement("div");
  meta.className = "project-meta";

  if (item.tag) {
    const tag = document.createElement("span");
    tag.className = "pill";
    tag.textContent = item.tag;
    meta.append(tag);
  }

  if (item.time) {
    const time = document.createElement("span");
    time.className = "project-time";
    time.textContent = item.time;
    meta.append(time);
  }

  return meta;
};

const renderProjectBody = (item) => {
  const body = document.createElement("div");
  body.className = "project-body";

  body.append(renderProjectMeta(item));

  const title = document.createElement("h3");
  title.textContent = item.title || "";

  const desc = document.createElement("p");
  desc.textContent = item.description || "";

  const linkRow = document.createElement("div");
  linkRow.className = "project-link";
  if (item.link?.href) {
    const link = document.createElement("a");
    link.href = item.link.href;
    link.textContent = item.link.label || "Open project";
    link.target = "_blank";
    link.rel = "noreferrer";
    linkRow.append(link);
  }

  const tools = document.createElement("div");
  tools.className = "project-tools";

  const addToolGroup = (label, items) => {
    if (!items || items.length === 0) return;
    const group = document.createElement("div");
    group.className = "project-tool-group";
    const heading = document.createElement("span");
    heading.className = "project-tool-label";
    heading.textContent = label;
    const list = document.createElement("div");
    list.className = "project-tool-list";
    items.forEach((tool) => {
      const chip = document.createElement("span");
      chip.className = "project-tool-chip";
      chip.textContent = tool;
      list.append(chip);
    });
    group.append(heading, list);
    tools.append(group);
  };

  addToolGroup("Languages", item.tools?.languages);
  addToolGroup("Tools", item.tools?.tools);
  addToolGroup("Frameworks", item.tools?.frameworks);

  body.append(title, desc, tools, linkRow);
  return body;
};

const renderProjectImage = (item) => {
  const media = document.createElement("div");
  media.className = "project-media";
  if (item.image?.src) {
    const img = document.createElement("img");
    img.src = item.image.src;
    img.alt = item.image.alt || item.title || "";
    media.append(img);
  }
  return media;
};

const featuredContainer = document.getElementById("projects-featured");
if (featuredContainer) {
  featuredContainer.innerHTML = "";
  if (featuredProject) {
    const featured = document.createElement("article");
    featured.className = "project-featured";
    featured.append(renderProjectImage(featuredProject), renderProjectBody(featuredProject));
    featuredContainer.append(featured);
  }
}

renderList("projects-grid", otherProjects, (item) => {
  const card = document.createElement("article");
  card.className = "project-card";
  card.append(renderProjectImage(item), renderProjectBody(item));
  return card;
});

renderList("writing-list", data.writing, (item) => {
  const card = document.createElement("article");
  card.className = "card";
  const header = document.createElement("div");
  header.className = "card-header";
  const title = document.createElement("h3");
  title.textContent = item.title;
  header.append(title);
  const desc = document.createElement("p");
  desc.textContent = item.description;
  card.append(header, desc);
  if (item.link?.href) {
    const link = document.createElement("a");
    link.href = item.link.href;
    link.textContent = item.link.label || "Read";
    link.target = "_blank";
    link.rel = "noreferrer";
    card.append(link);
  }
  return card;
});

renderList("socials", data.socials, (item) => {
  const link = document.createElement("a");
  link.href = item.href;
  link.textContent = item.label;
  link.target = "_blank";
  link.rel = "noreferrer";
  return link;
});
