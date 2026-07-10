// Content for the landing page. Pricing/services mirror agency_notes.txt.
// Brand name is a placeholder — find-and-replace "Brandname" when picked.

export const services = [
  {
    tag: "01",
    title: "Website Design",
    blurb:
      "Fast, mobile-first school sites with admission enquiry forms, galleries and everything a parent checks before choosing a school.",
    points: ["Admissions-focused pages", "Enquiry forms + Maps", "Editable admin panel"],
  },
  {
    tag: "02",
    title: "Social Media",
    blurb:
      "We plan, shoot, edit and post reels & graphics for Instagram and Facebook — consistently, every single month.",
    points: ["Reels + graphics", "Instagram + Facebook", "One shoot day / month"],
  },
  {
    tag: "03",
    title: "Admissions Growth",
    blurb:
      "Everything points to one goal: more enquiries, more seats filled. We track it, report it, and grow it month over month.",
    points: ["Enquiry tracking", "Paid ads", "Monthly reporting"],
  },
];

export const stats = [
  { value: 100, suffix: "+", label: "Admissions influenced" },
  { value: 50, suffix: "k+", label: "Website visitors" },
  { value: 4, suffix: "X", label: "Inquiry growth" },
];

export const process = [
  { step: "01", title: "Discovery", blurb: "Free audit of your current site & socials — we show what's missing." },
  { step: "02", title: "Strategy", blurb: "We design your site and set up a content calendar built for admissions." },
  { step: "03", title: "Website", blurb: "Your new site is designed, built and launched — live in about a week." },
  { step: "04", title: "Content", blurb: "One visit captures a month of reels and posts. Your campus comes alive." },
  { step: "05", title: "Growth", blurb: "We post consistently, run ads, and report the results every month." },
];

export const websitePlans = [
  { name: "Starter", price: "₹15k–25k", note: "one-time", features: ["4–5 pages", "Clean template", "Mobile-friendly", "Contact form"] },
  { name: "Professional", price: "₹35k–60k", note: "one-time", featured: true, features: ["8–10 pages + Admissions", "Custom branding", "Enquiry form + Maps + gallery", "Editable admin panel"] },
  { name: "Premium", price: "₹80k+", note: "one-time", features: ["12+ custom sections", "Fully custom design", "Online admission form", "Calendar + notice board"] },
];

export const socialPlans = [
  { name: "Basic", price: "₹8k–12k", note: "/mo", features: ["8 posts", "Instagram", "Captions + scheduling"] },
  { name: "Growth", price: "₹15k–25k", note: "/mo", featured: true, features: ["12 posts + 4 reels", "Instagram + Facebook", "Stories + 1 shoot day"] },
  { name: "Pro", price: "₹30k–50k", note: "/mo", features: ["16 posts + 8 reels", "IG + FB + YT Shorts", "Paid ads + monthly report"] },
];

// Placeholder portfolio — swap with real case studies once the first site ships.
export const portfolio = [
  { name: "Sunrise Public School", type: "Website + Social", result: "3.4× enquiries in one season" },
  { name: "Greenfield College", type: "Website", result: "50k+ visitors, live in 6 days" },
  { name: "Little Scholars Academy", type: "Social Media", result: "0 → 12k Instagram in 4 months" },
];

// Placeholder testimonials — replace with real principal quotes + video.
export const testimonials = [
  {
    quote: "Parents finally take us seriously online. Enquiries went up before admission season even started.",
    name: "Principal, Sunrise Public School",
    tag: "Website + Social",
  },
  {
    quote: "One team for our website and Instagram. No chasing agencies — they just show up and deliver.",
    name: "Director, Greenfield College",
    tag: "Website",
  },
  {
    quote: "Our reels actually look like a modern school now. Admissions team says it's the best marketing we've done.",
    name: "Trustee, Little Scholars Academy",
    tag: "Social Media",
  },
];
