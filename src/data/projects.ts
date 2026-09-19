// Centralized media/content registry.
// Replace `src`/`poster`/`images` paths with real files under /public/media/** and
// flip `placeholder: false` — components read this flag to decide whether to render
// the stylised placeholder frame or the real asset. No component code needs to change.

export type MediaAsset = {
  kind: "video" | "image";
  src: string;
  poster?: string;
  placeholder: boolean;
  label: string; // shown on the placeholder frame, e.g. "brand/origin-01.mp4"
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  services: string[];
  blurb?: string;
  media: MediaAsset;
  gallery?: MediaAsset[];
};

export type Category = {
  index: string; // "01"
  id: string;
  nav: string;
  headline: [string, string]; // two-line editorial headline
  subtitle: string;
  timecode: string; // e.g. "00:00 — 00:08"
  projects: Project[];
};

const ph = (label: string, kind: MediaAsset["kind"] = "video"): MediaAsset => ({
  kind,
  src: "",
  placeholder: true,
  label,
});

// Real, already-shot media pulled in from the previous portfolio — lives under
// /public/media/**. `label` doubles as the relative path for reference.
// Videos get a first-frame preview at /media/posters/<same path>.jpg so
// something shows instantly while the (large) video file is still loading.
const asset = (path: string, kind: MediaAsset["kind"] = "video"): MediaAsset => ({
  kind,
  src: `/media/${path}`,
  poster: kind === "video" ? `/media/posters/${path.replace(/\.[^.]+$/, ".jpg")}` : undefined,
  placeholder: false,
  label: path,
});

export const categories: Category[] = [
  {
    index: "01",
    id: "brand",
    nav: "Brand",
    headline: ["BRAND", "COMMERCIALS"],
    subtitle: "STORIES BUILT TO MOVE PEOPLE.",
    timecode: "00:00 — 00:07",
    projects: [
      {
        slug: "nike-01",
        title: "NIKE",
        client: "Nike",
        year: "",
        role: "AI Visuals & Video Editor",
        services: ["Edit", "Color", "Sound Design"],
        blurb: "A brand commercial edit for Nike.",
        media: asset("brand/nike-01.mp4"),
      },
      {
        slug: "pocketfm-01",
        title: "POCKETFM",
        client: "PocketFM",
        year: "",
        role: "AI Visuals & Video Editor",
        services: ["Edit", "Sound Design"],
        blurb: "A brand commercial edit for PocketFM.",
        media: asset("brand/pocketfm-01.mp4"),
      },
      {
        slug: "pocketfm-trailer",
        title: "POCKETFM TRAILER",
        client: "PocketFM",
        year: "",
        role: "Editor",
        services: ["Edit", "Sound Design"],
        blurb: "A brand commercial trailer edit for PocketFM.",
        media: asset("brand/pocketfm-trailer.mp4"),
      },
      {
        slug: "royal-enfield",
        title: "ROYAL ENFIELD",
        client: "Royal Enfield",
        year: "",
        role: "AI Visuals & Video Editor",
        services: ["Edit", "Color", "Sound Design"],
        blurb: "A brand commercial edit for Royal Enfield.",
        media: asset("brand/royal-enfield.mp4"),
      },
      {
        slug: "campa-cola",
        title: "CAMPA COLA",
        client: "Campa Cola",
        year: "",
        role: "Editor",
        services: ["Edit", "Color", "Grade"],
        blurb: "A brand commercial edit for Campa Cola.",
        media: asset("brand/campa-cola.mp4"),
      },
    ],
  },
  {
    index: "02",
    id: "instagram",
    nav: "Instagram",
    headline: ["INSTAGRAM", "& SOCIAL EDITS"],
    subtitle: "SHORT FORM. HIGH RETENTION.",
    timecode: "00:07 — 00:14",
    projects: [
      {
        slug: "fast-cuts-1",
        title: "FAST CUTS I",
        client: "",
        year: "",
        role: "Editor and Cinematographer",
        services: ["Edit", "Instagram"],
        media: asset("instagram/fast-cuts-1.mp4"),
      },
      {
        slug: "fast-cuts-2",
        title: "FAST CUTS II",
        client: "",
        year: "",
        role: "Editor and Cinematographer",
        services: ["Edit", "Instagram"],
        media: asset("instagram/fast-cuts-2.mp4"),
      },
      {
        slug: "fast-cuts-3",
        title: "FAST CUTS III",
        client: "",
        year: "",
        role: "Editor and Cinematographer",
        services: ["Edit", "Instagram"],
        media: asset("instagram/fast-cuts-3.mp4"),
      },
      {
        slug: "fast-cuts-4",
        title: "FAST CUTS IV",
        client: "",
        year: "",
        role: "Editor and Cinematographer",
        services: ["Edit", "Instagram"],
        media: asset("instagram/fast-cuts-4.mp4"),
      },
      {
        slug: "slow-paced-1",
        title: "SLOW PACED I",
        client: "",
        year: "",
        role: "Editor and Cinematographer",
        services: ["Edit", "Instagram"],
        media: asset("instagram/slow-paced-1.mp4"),
      },
      {
        slug: "slow-paced-2",
        title: "SLOW PACED II",
        client: "",
        year: "",
        role: "Editor and Cinematographer",
        services: ["Edit", "Instagram"],
        media: asset("instagram/slow-paced-2.mp4"),
      },
    ],
  },
  {
    index: "03",
    id: "motion-graphics",
    nav: "Motion Graphics",
    headline: ["MOTION GRAPHICS", "EDITS"],
    subtitle: "TITLES, TRANSITIONS, ANIMATED SYSTEMS.",
    timecode: "00:14 — 00:19",
    projects: [
      {
        slug: "groww-trailer",
        title: "GROWW",
        client: "Groww",
        year: "",
        role: "Motion Designer",
        services: ["Animation", "Motion Graphics"],
        media: asset("motion-graphics/groww-trailer.mp4"),
      },
      {
        slug: "thf-launch",
        title: "THF LAUNCH",
        client: "THF",
        year: "",
        role: "Motion Designer",
        services: ["Animation", "Motion Graphics"],
        media: asset("motion-graphics/thf-launch.mp4"),
      },
      {
        slug: "origin-beerbiceps",
        title: "ORIGIN × SKILLHOUSE MEDIA",
        client: "",
        year: "",
        role: "Motion Designer",
        services: ["Animation", "Motion Graphics"],
        media: asset("motion-graphics/origin.mp4"),
        gallery: [asset("motion-graphics/origin.mp4"), asset("motion-graphics/beerbiceps.mp4")],
      },
    ],
  },
  {
    index: "04",
    id: "cinematography",
    nav: "Freelance Work",
    headline: ["FREELANCE", "WORK"],
    subtitle: "REAL CLIENTS. REAL DELIVERABLES.",
    timecode: "00:19 — 00:25",
    projects: [
      {
        slug: "spinny",
        title: "SPINNY",
        client: "Spinny",
        year: "2026",
        role: "Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        blurb: "A car ownership review edit for Spinny.",
        media: asset("freelance/spinny.mp4"),
      },
      {
        slug: "zoy-cafe",
        title: "ZOY CAFE",
        client: "Zoy",
        year: "2026",
        role: "Editor & Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        media: asset("freelance/zoy-cafe.mp4"),
      },
      {
        slug: "gym",
        title: "GYM",
        client: "",
        year: "2026",
        role: "Editor & Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        media: asset("freelance/gym.mp4"),
      },
      {
        slug: "zoy-conference-room",
        title: "ZOY CONFERENCE ROOM",
        client: "Zoy",
        year: "2026",
        role: "Editor & Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        media: asset("freelance/zoy-conference-room.mp4"),
      },
    ],
  },
  {
    index: "05",
    id: "corporate",
    nav: "Corporate",
    headline: ["CORPORATE", "EDITING"],
    subtitle: "CINEMA → COMMUNICATION.",
    timecode: "00:25 — 00:31",
    projects: [
      {
        slug: "launch-video",
        title: "LAUNCH VIDEO",
        client: "",
        year: "2026",
        role: "Concept · Script · Storyboard · Edit",
        services: ["Edit", "Motion Graphics", "Titling"],
        media: asset("corporate/launch-video.mp4"),
      },
      {
        slug: "investor-workflow",
        title: "INVESTOR WORKFLOW",
        client: "",
        year: "2026",
        role: "Concept · Script · Storyboard · Edit",
        services: ["Edit", "Motion Graphics"],
        media: asset("corporate/investor-workflow.mp4"),
      },
      {
        slug: "customer-spotlight",
        title: "CUSTOMER SPOTLIGHT",
        client: "",
        year: "2026",
        role: "Concept · Script · Storyboard · Edit",
        services: ["Edit", "Sound"],
        media: asset("corporate/customer-spotlight.mp4"),
      },
      {
        slug: "presentation-video",
        title: "COMPANY PRESENTATION",
        client: "",
        year: "2026",
        role: "Concept · Script · Storyboard · Edit",
        services: ["Edit", "Graphics"],
        media: asset("corporate/presentation-video.mp4"),
      },
      {
        slug: "social-content",
        title: "SOCIAL CONTENT",
        client: "",
        year: "2026",
        role: "Concept · Shoot · Edit",
        services: ["Edit", "Sound Design"],
        media: asset("corporate/social-content.mp4"),
      },
    ],
  },
  {
    index: "06",
    id: "events",
    nav: "Events",
    headline: ["EVENT", "WORK"],
    subtitle: "CUT. CUT. CUT.",
    timecode: "00:31 — 00:36",
    projects: [
      {
        slug: "techfest-abhikalpan",
        title: "TECHFEST ABHIKALPAN",
        client: "Techfest",
        year: "",
        role: "Editor",
        services: ["Same-day Edit", "Multicam"],
        blurb: "Event coverage for Techfest's Abhikalpan.",
        media: asset("events/techfest-abhikalpan.mp4"),
      },
      {
        slug: "bits-pilani-oasis-25",
        title: "BITS PILANI OASIS'25",
        client: "BITS Pilani",
        year: "",
        role: "Cinematographer & editor",
        services: ["Same-day Edit", "Multicam"],
        blurb: "Fest coverage from BITS Pilani's Oasis'25.",
        media: asset("events/bits-pilani-oasis-25.mp4"),
      },
      {
        slug: "techfest-website-reveal",
        title: "TECHFEST WEBSITE REVEAL",
        client: "Techfest",
        year: "",
        role: "Cinematographer & editor",
        services: ["Edit", "Reveal Film"],
        blurb: "A website reveal edit for Techfest.",
        media: asset("events/techfest-website-reveal.mp4"),
      },
      {
        slug: "code-rumble-aftermovie",
        title: "CODE RUMBLE AFTERMOVIE",
        client: "Code Rumble",
        year: "",
        role: "Cinematographer & editor",
        services: ["Aftermovie", "Multicam"],
        blurb: "The official aftermovie for Code Rumble.",
        media: asset("events/code-rumble-aftermovie.mp4"),
      },
    ],
  },
  {
    index: "07",
    id: "travel",
    nav: "Travel",
    headline: ["TRAVEL", "FILMS"],
    subtitle: "SLOWER SHOTS. LONGER SILENCES.",
    timecode: "00:36 — 00:43",
    projects: [
      {
        slug: "incredible-india",
        title: "INCREDIBLE INDIA",
        client: "Independent",
        year: "2025",
        role: "Editor / Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        blurb: "A travel edit across incredible India.",
        media: asset("travel/incredible-india.mp4"),
      },
      {
        slug: "shivagange-trek",
        title: "SHIVAGANGE TREK",
        client: "Independent",
        year: "2025",
        role: "Editor / Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        blurb: "A trek up Shivagange, captured and cut.",
        media: asset("travel/shivagange-trek.mp4"),
      },
      {
        slug: "rameshwaram",
        title: "RAMESHWARAM",
        client: "Independent",
        year: "2025",
        role: "Editor / Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        media: asset("travel/rameshwaram.mp4"),
      },
      {
        slug: "chikmagalur",
        title: "CHIKMAGALUR",
        client: "Independent",
        year: "2025",
        role: "Editor / Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        media: asset("travel/chikmagalur.mp4"),
      },
      {
        slug: "mussoorie",
        title: "MUSSOORIE",
        client: "Independent",
        year: "2025",
        role: "Editor / Cinematographer",
        services: ["Camera", "Edit", "Grade"],
        media: asset("travel/mussoorie.mp4"),
      },
    ],
  },
  {
    index: "08",
    id: "photography",
    nav: "Photography",
    headline: ["", "PHOTOGRAPHY"],
    subtitle: "COMPOSITION. LIGHT. MOMENT. FRAMING.",
    timecode: "00:43 — 00:49",
    projects: [
      { slug: "street", title: "STREET", client: "", year: "2026", role: "Photographer", services: ["Documentary", "Street"], media: asset("photography/street.jpg", "image") },
      { slug: "portraits", title: "PORTRAITS", client: "", year: "2026", role: "Photographer", services: ["Portrait"], media: asset("photography/portraits.jpg", "image") },
      { slug: "wildlife", title: "WILDLIFE", client: "", year: "2026", role: "Photographer", services: ["Wildlife"], media: asset("photography/wildlife.jpg", "image") },
      { slug: "light-painting", title: "LIGHT PAINTING", client: "", year: "2026", role: "Photographer", services: ["Long Exposure"], media: asset("photography/light-painting.jpg", "image") },
    ],
  },
];

// Secondary skills — shown in a single compact "Additional" section rather
// than as full reel chapters, so they don't compete with the video work above.
export type SkillGroup = {
  id: string;
  title: string;
  note: string;
  projects: Project[];
};

export const additionalSkills: SkillGroup[] = [
  {
    id: "design",
    title: "VISUAL DESIGN",
    note: "CAMERA FRAME → DESIGN FRAME.",
    projects: [
      { slug: "carousel", title: "CAROUSEL", client: "Origin", year: "2026", role: "Visual Designer", services: ["Social Design"], media: asset("design/carousel.png", "image") },
      { slug: "hiring-post", title: "HIRING POST", client: "Origin", year: "2026", role: "Designer", services: ["Social Design"], media: asset("design/hiring-post.png", "image") },
      { slug: "brochure", title: "BROCHURE", client: "Origin", year: "2026", role: "Designer", services: ["Print Design"], media: asset("design/brochure.png", "image") },
      { slug: "presentation", title: "PRESENTATION", client: "Origin", year: "2026", role: "Designer", services: ["Presentation Design"], media: asset("design/presentation.png", "image") },
    ],
  },
  {
    id: "blender",
    title: "BLENDER / 3D",
    note: "BUILT FRAME BY FRAME, NOT CAPTURED.",
    projects: [
      { slug: "drilling-animation", title: "DRILLING ANIMATION", client: "Personal", year: "2026", role: "3D Artist", services: ["Blender", "Render"], media: asset("blender/drilling-animation.mp4") },
      { slug: "dimension-animation", title: "DIMENSION ANIMATION", client: "Personal", year: "2026", role: "3D Artist", services: ["Blender", "Render"], media: asset("blender/dimension-animation.mp4") },
    ],
  },
];

export const showreel: MediaAsset = asset("showreel/best-edit-1.mp4");

export const heroReel: MediaAsset = asset("hero/action-loop.mp4");

export const profilePhoto: MediaAsset = asset("images/profile.jpg", "image");

export type ExperienceEntry = {
  period: string;
  org: string;
  role: string;
  detail?: string;
};

// Chronological, oldest first — the timeline reads left to right.
export const experience: ExperienceEntry[] = [
  {
    period: "DEC 2024 — MAR 2025",
    org: "CRACK VIRAL",
    role: "Ex-Intern",
    detail: "Video editing internship",
  },
  {
    period: "JAN 2026 — SEPT 2026",
    org: "ORIGIN",
    role: "Ex-Intern\nContent Executive",
  },
  {
    period: "NOW",
    org: "FREELANCE",
    role: "Video Editor / Cinematographer",
    detail: "Brand, corporate and Instagram content creation",
  },
];

export const tools = [
  {
    group: "EDITING",
    items: ["Adobe Premiere Pro", "Adobe After Effects", "CapCut"],
  },
  {
    group: "PHOTO",
    items: ["Adobe Lightroom", "Snapseed"],
  },
  {
    group: "AI",
    items: ["AI Image Generation", "AI Video Generation", "AI Content Creation for Brands"],
  },
];

export type ContactLink = {
  label: string;
  href?: string;
  // When present, the link opens a menu of these instead of navigating.
  options?: { label: string; href: string }[];
};

export const contactLinks: ContactLink[] = [
  { label: "EMAIL", href: "mailto:harsh2027.singh@gmail.com" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/nawabfilms_" },
  {
    label: "YOUTUBE",
    options: [
      { label: "Nawabfilms", href: "https://youtube.com/@nawabfilms-f2x?si=XMf3RM_fCWLjsN_t" },
      { label: "Nomadic Brothers", href: "https://youtube.com/@nomadicbrothers1150?si=8t5tyZqnB29T_Ku_" },
      { label: "Arduino Technex", href: "https://youtube.com/@arduinotechnex671?si=Z-x-QrZpOq3rcY9m" },
    ],
  },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/harshvardhansinghvideoeditor/" },
  { label: "X", href: "https://x.com/nawabfilms65580" },
  { label: "PHONE", href: "tel:+916393277329" },
  { label: "RESUME", href: "https://drive.google.com/file/d/1wgrKKtlA33bIfcsnnXaPuPlQYfxEAnsW/view?usp=sharing" },
];
