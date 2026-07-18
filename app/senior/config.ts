// The ONE file ORIGIN edits per client. Copy is GENERIC + reusable.
// Replace: name, logo, colours (brand/red/gold), photos and numbers.

export const senior = {
  name: "Northbridge International School", // ← placeholder name / logo wordmark
  short: "Northbridge",
  tagline: "Learn, dream and find yourself.",
  established: 1998,

  brand: "#2f55b0", // blue
  red: "#c0392b", // accent 1
  gold: "#b28b3c", // accent 2

  nav: [
    ["About", "/senior/about"],
    ["Academics", "/senior/academics"],
    ["Student Life", "/senior/student-life"],
    ["Admissions", "/senior/admissions"],
  ] as [string, string][],

  hero: {
    // two-tone headline: [accent lines] then [ink lines]
    accentLines: ["Find", "Yourself"],
    inkLines: ["at School."],
    body: "This is a place where curiosity and character grow together — where every student is encouraged to discover their strengths and become their true self.",
    cta: ["The learning journey", "/senior/academics"] as [string, string],
  },

  whoWeAre: {
    accent: "Who",
    ink: "we are",
    body: "Our story goes back decades, and we've grown alongside our community ever since. As a school built on curiosity and care, we're driven by boundless opportunity — and fully committed to a culture where everyone feels they belong.",
    ctas: [
      ["Our history", "/senior/about", "red"],
      ["Our philosophy", "/senior/about", "gold"],
    ] as [string, string, string][],
  },

  day: {
    accent: "Ever wonder what a day",
    ink: "looks like?",
  },

  journey: {
    accent: "Journey",
    mid: "of education",
    ink: "at School",
    // Click a stage → the content + cards below swap. One entry per stage.
    stages: [
      {
        name: "Early Years",
        title: "Early Years",
        body: "In the early years, our youngest learners explore, play and wonder. Through a hands-on, inquiry-led approach we nurture little minds to think big and dream even bigger.",
        cta: ["Early years at School", "/senior/academics"] as [string, string],
        cards: [
          { title: "Enriching environment", desc: "We create a space where children can tinker, try new things, observe nature and figure the world out in their own way — because learning happens best when it feels natural and exciting." },
          { title: "Play-based learning", desc: "Freedom to experiment and explore from the very start. Every classroom is built to spark curiosity and let young learners grow through discovery." },
        ],
      },
      {
        name: "Elementary",
        title: "Elementary School",
        body: "In the elementary years, students build a strong foundation for everything ahead — with literacy woven through every subject, a deep conceptual approach to maths, and space for self-awareness and communication to come to life.",
        cta: ["Life as an elementary learner", "/senior/academics"] as [string, string],
        cards: [
          { title: "Student voice", desc: "Whether it's sharing ideas in class, leading projects or making tough decisions, we believe student voices matter — and we give them the freedom to be active participants in their own learning." },
          { title: "Problem solving", desc: "From unravelling mysteries to cracking codes, every day brings a new opportunity to think critically and conquer challenges." },
        ],
      },
      {
        name: "Middle School",
        title: "Middle School",
        body: "We know how much changes during the middle years, so we stay tuned in to what makes this age group tick. We tailor our teaching to help each student grow academically, socially and personally — in every way possible.",
        cta: ["The middle school years", "/senior/academics"] as [string, string],
        cards: [
          { title: "Inquiry-based approach", desc: "We encourage students to roll up their sleeves, get hands-on and uncover knowledge by digging into real-world problems — chasing that lightbulb moment when they realise they're investigators on a quest for understanding." },
          { title: "Conceptual learning", desc: "Learning isn't just about facts, it's about grasping the big ideas. We break tricky concepts into bite-sized pieces that actually make sense." },
        ],
      },
      {
        name: "High School",
        title: "High School",
        body: "High school is about far more than preparing for university. Whether they're crunching numbers, crafting essays or hitting the field, our students develop their passions and become the best versions of themselves — ready to lead.",
        cta: ["Explore high school life", "/senior/student-life"] as [string, string],
        cards: [
          { title: "Individualised pathways", desc: "There's no one-size-fits-all approach. With a broad range of advanced courses and electives, students can dive deep into their strengths or explore new interests — free to pave their own academic path." },
          { title: "University counselling", desc: "From building a standout application to understanding campus life, our counsellors are experts at demystifying the next step — so students feel confident about what comes after school." },
        ],
      },
      {
        name: "Alumni",
        title: "Alumni",
        body: "Our alumni aren't just former students — they're lifelong members of a tight-knit community. Even decades on, they stay connected, return to catch up with favourite teachers, and share their wisdom with the students who follow.",
        cta: ["The journey continues", "/senior/about"] as [string, string],
        cards: [
          { title: "Global citizens", desc: "Our alumni make their mark all over the world — and still find their way back to familiar ground to pay it forward, lending their time and expertise to nurture the next generation." },
          { title: "Changemakers", desc: "From sparking innovation in industry to leading grassroots movements, our graduates aren't afraid to shake things up wherever they are." },
        ],
      },
    ],
  },

  people: {
    accent: "Meet the people",
    ink: "who know us best",
    body: "Our community, past and present, is the heart and soul of everything we do — and they tell it best. Spend some time getting to know the people that make our school special.",
    ctas: [
      ["Meet a student", "#", "blue"],
      ["Meet a family", "#", "red"],
      ["Meet an alumni", "#", "gold"],
    ] as [string, string, string][],
  },

  statement: {
    // big statement with hand-drawn annotations
    pre: "In a ",
    circle: "rapidly",
    mid: " evolving landscape, our school equips students with the ",
    wave: "skills",
    mid2: " to navigate change, prioritise learning, and ",
    underline: "embrace",
    post: " innovation.",
    cta: ["The future of learning", "/senior/academics"] as [string, string],
  },

  life: {
    accent: "Life in & out",
    ink: "of the classroom",
    body: "Education goes beyond textbooks and tests — it's about creating unforgettable experiences. From the arts to athletics to service, our students do seriously meaningful things that build character and lifelong skills.",
    cta: ["Explore student life", "/senior/student-life"] as [string, string],
  },

  spotlight: {
    accent: "School",
    ink: "Spotlight",
    body: "Amazing things happen on our campus every day. We often hear our families say, “I wish I could have gone here as a kid.”",
    items: [
      { title: "A legacy of excellence", tag: "Community" },
      { title: "The next big thing", tag: "Student stories" },
      { title: "The admissions journey", tag: "Admissions" },
      { title: "Student & teacher engagement", tag: "Academics" },
    ],
  },

  campuses: [
    { name: "Main Campus", lines: ["[Street Address]", "[District]", "[City, Country]"], phone: "+00 000 000 0000" },
    { name: "City Campus", lines: ["[Street Address]", "[District]", "[City, Country]"], phone: "+00 000 000 0000" },
  ],

  footerButtons: [
    ["Contact", "/senior/contact", "blue"],
    ["Careers", "#", "red"],
    ["Alumni", "#", "gold"],
    ["Portal", "#", "dark"],
  ] as [string, string, string][],

  socials: [
    ["Facebook", "#"],
    ["Instagram", "#"],
    ["LinkedIn", "#"],
    ["YouTube", "#"],
  ] as [string, string][],
};
