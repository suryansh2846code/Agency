// The ONE file ORIGIN edits per client. Swap the brand colour, name, copy,
// programs, stats, photos and contact details — the whole site re-themes.

export const school = {
  name: "Greenfield International School",
  short: "Greenfield",
  tagline: "Where curiosity becomes character.",
  established: 1998,

  // per-client colours — everything derives from these two
  brand: "#3d53c9",
  accent: "#f3c637",

  nav: [
    ["Home", "/demo"],
    ["About", "/demo/about"],
    ["Academics", "/demo/academics"],
    ["Gallery", "/demo/gallery"],
    ["Contact", "/demo/contact"],
  ] as [string, string][],

  hero: {
    eyebrow: "Admissions open · 2026–27",
    lines: ["A HAPPY START", "FOR CURIOUS", "YOUNG MINDS"] as string[],
    note: "More than a school — a place to belong.",
    sticky: "Every child learns\nby doing, playing\n& belonging ✿",
    primaryCta: ["Apply for Admission", "/demo/contact"] as [string, string],
    secondaryCta: ["Take a Campus Tour", "/demo/gallery"] as [string, string],
  },

  stats: [
    { n: "25+", l: "Years of excellence" },
    { n: "1,200+", l: "Students" },
    { n: "90+", l: "Expert teachers" },
    { n: "15:1", l: "Student–teacher ratio" },
  ],

  welcome: {
    eyebrow: "Welcome to Greenfield",
    title: "An education that builds people, not just marks.",
    body: "For over two decades, Greenfield has helped children grow into confident, thoughtful individuals. We pair a strong academic foundation with sports, arts and values — so every student discovers who they are and what they can do.",
    points: ["CBSE-affiliated curriculum", "Safe, green 6-acre campus", "Focus on values & well-being"],
  },

  programs: [
    { title: "Pre-Primary", ages: "Ages 3–5", desc: "Play-based early learning that sparks curiosity and confidence." },
    { title: "Primary", ages: "Grades 1–5", desc: "Strong foundations in literacy, numeracy and creative thinking." },
    { title: "Middle School", ages: "Grades 6–8", desc: "Inquiry-led learning across sciences, humanities and the arts." },
    { title: "Senior Secondary", ages: "Grades 9–12", desc: "Focused streams and mentoring that prepare students for the future." },
  ],

  features: [
    { title: "Caring, qualified teachers", desc: "Mentors who know every child by name and help them thrive." },
    { title: "Modern classrooms & labs", desc: "Smart classrooms, science, computer and robotics labs." },
    { title: "Sports & the arts", desc: "Playgrounds, music, dance and art woven into everyday learning." },
    { title: "Safe & secure campus", desc: "CCTV, trained staff, GPS-tracked transport and a school nurse." },
  ],

  testimonials: [
    { quote: "My daughter looks forward to school every single day. The teachers genuinely care.", name: "Priya Sharma", role: "Parent, Grade 4" },
    { quote: "Greenfield balances academics with character. We couldn't have asked for more.", name: "Rahul Mehta", role: "Parent, Grade 9" },
  ],

  contact: {
    address: "12 Garden Avenue, Springdale, Pune 411001",
    phone: "+91 98765 43210",
    email: "admissions@greenfield.edu.in",
    hours: "Mon–Sat · 8:00 AM – 3:30 PM",
  },

  socials: [
    ["Facebook", "#"],
    ["Instagram", "#"],
    ["YouTube", "#"],
  ] as [string, string][],
};
