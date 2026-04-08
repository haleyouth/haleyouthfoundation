export const SITE_CONFIG = {
  name: "Haleyouth Foundation",
  tagline: "...strengthening youth potentials",
  description:
    "Haleyouth Foundation is a registered non-profit empowering youth through mentorship, advancing STEM education, and fostering community development in Nigeria and across Africa.",
  url: "https://haleyouthfoundation.org",
  email: "info@haleyouthfoundation.org",
  phone: "",
  address: "Ateba Agassa-Okene, Kogi State, Nigeria",
  registration: "CAC/IT/NO 154820",
  founded: 2019,
  social: {
    facebook: "https://www.facebook.com/haleyouthfoundation/",
    twitter: "https://x.com/HaleYouth_F",
    linkedin: "https://linkedin.com/company/haleyouth-foundation",
    instagram: "https://www.instagram.com/haleyouthfoundation/",
  },
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Partners", href: "/partners" },
  { label: "Gallery", href: "/gallery" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

export const HERO_SLIDES = [
  {
    image: "/images/events/Garki_IMG_0011.jpg",
    headline: "Keeping Girls in School with Dignity",
    subtitle:
      "Through the Pad-a-Girl initiative, we've distributed 1,000+ reusable pad kits, empowering girls to stay in school and thrive.",
    cta: { text: "Learn More", href: "/programs/pad-a-girl" },
  },
  {
    image: "/images/events/karimo_img.jpg",
    headline: "Climate Action Starts in Communities",
    subtitle:
      "Our Pad-a-Girl Climate Action project brings menstrual health education and sustainable solutions to schools across Northern Nigeria.",
    cta: { text: "Our Programs", href: "/programs" },
  },
  {
    image: "/images/events/Back2School.jpg",
    headline: "Education is the Foundation of Peace",
    subtitle:
      "Our Back-to-School program provides learning materials and support to hundreds of students in underserved communities.",
    cta: { text: "Support Education", href: "/get-involved/donate" },
  },
  {
    image: "/images/events/Jabi_AK ADAAVA 9.jpg",
    headline: "Empowering Youth. Transforming Communities.",
    subtitle:
      "We equip young people with skills, mentorship, and resources to become agents of positive change in their communities.",
    cta: { text: "Get Involved", href: "/get-involved" },
  },
  {
    image: "/images/events/Garki_IMG_0015.jpg",
    headline: "Community Transformation Powered by Youth",
    subtitle:
      "From digital skills training to STEM workshops, we build capacity for the next generation of African leaders.",
    cta: { text: "View Impact", href: "/impact" },
  },
  {
    image: "/images/events/DSC04757.jpg",
    headline: "From Local Action to Global Impact",
    subtitle:
      "Haleyouth Foundation represented at the UN General Assembly SDGs Roundtable Discussion in New York.",
    cta: { text: "Our Story", href: "/about/our-story" },
  },
];

export const PROGRAMS = [
  {
    slug: "pad-a-girl",
    title: "Pad-a-Girl",
    tagline: "Sustainable menstrual hygiene for underserved girls",
    description:
      "Distributing reusable menstrual pad kits and delivering health education to keep girls in school with dignity. Supported by the British Council Climate Action Grant.",
    icon: "Heart",
    category: "Health & Wellness",
    featured: true,
    sdgs: [3, 4, 12, 13],
    stats: [
      { label: "Pad Kits Distributed", value: "500+" },
      { label: "Instruction Cards", value: "700+" },
      { label: "Women Trained", value: "3 Cycles" },
      { label: "Competition Participants", value: "590+" },
    ],
    image: "/images/events/Garki_IMG_0011.jpg",
  },
  {
    slug: "back-to-school",
    title: "Back to School",
    tagline: "Learning materials for rural students",
    description:
      "Providing textbooks, school supplies, and educational support to students in underserved rural communities across Nigeria.",
    icon: "BookOpen",
    category: "Education & Scholarships",
    featured: true,
    sdgs: [1, 4, 10],
    stats: [
      { label: "Students Reached", value: "200+" },
      { label: "Schools Covered", value: "5+" },
      { label: "States Covered", value: "3" },
    ],
    image: "/images/events/Back2School.jpg",
  },
  {
    slug: "scholars-of-change",
    title: "Scholars of Change",
    tagline: "Scholarships and mentorship for tomorrow's leaders",
    description:
      "A comprehensive scholarship program with mentorship, career guidance, and academic support for deserving students from underserved backgrounds.",
    icon: "GraduationCap",
    category: "Education & Scholarships",
    featured: true,
    sdgs: [4, 10],
    stats: [
      { label: "Scholarship Value Mentored", value: "$100K+" },
      { label: "Countries", value: "5+" },
    ],
    image: "/images/events/Back2School2.jpg",
  },
  {
    slug: "stem-camp",
    title: "STEM Camp",
    tagline: "Inspiring the next generation of innovators in STEM",
    description:
      "Hands-on science, technology, engineering, and mathematics workshops for young people, connecting environmental problem-solving with practical skills.",
    icon: "Microscope",
    category: "Education & Scholarships",
    sdgs: [4, 6],
    image: "/images/events/Jabi_AK ADAAVA 9.jpg",
  },
  {
    slug: "digital-skills",
    title: "Digital Skills for Her",
    tagline: "Bridging the digital divide for girls and women",
    description:
      "Digital literacy training for girls and young women with little or no prior exposure to technology, supported by the Commonwealth Network.",
    icon: "Laptop",
    category: "Skills & Empowerment",
    sdgs: [4, 6, 10],
    image: "/images/events/Garki_IMG_0015.jpg",
  },
  {
    slug: "community-healthcare",
    title: "Community Healthcare",
    tagline: "Healthcare access for underserved communities",
    description:
      "Providing healthcare education, awareness campaigns, and support to improve health outcomes in vulnerable communities.",
    icon: "Stethoscope",
    category: "Health & Wellness",
    sdgs: [3],
    image: "/images/events/Garki_IMG_0026.jpg",
  },
  {
    slug: "humanitarian-projects",
    title: "Humanitarian Projects",
    tagline: "Responding to community needs with compassion",
    description:
      "Food drives, emergency support, and social assistance for families facing hardship across Nigeria.",
    icon: "HandHeart",
    category: "Community Development",
    sdgs: [1, 2],
    stats: [{ label: "Families Supported", value: "100+" }],
    image: "/images/events/fooddrive2.jpeg",
  },
  {
    slug: "peace-ambassadors",
    title: "Peace Ambassadors",
    tagline: "Youth-led initiatives for peace and cohesion",
    description:
      "Empowering young people as Peace Ambassadors to promote social cohesion, interfaith dialogue, and community harmony.",
    icon: "Handshake",
    category: "Peace & Advocacy",
    sdgs: [16],
    image: "/images/events/UNGA80_b.jpg",
  },
  {
    slug: "career-advisory",
    title: "Career Advisory",
    tagline: "Mentoring youth to access global opportunities",
    description:
      "Mentoring graduate students to access scholarships and career opportunities worldwide — with a cumulative worth of over $100,000 across France, Germany, UK, and Malaysia.",
    icon: "Compass",
    category: "Skills & Empowerment",
    sdgs: [4, 8],
    image: "/images/events/Unga80_c.jpg",
  },
  {
    slug: "environmental-protection",
    title: "Environmental Protection",
    tagline: "Climate action rooted in community engagement",
    description:
      "Promoting environmental awareness and climate action through education, community engagement, and sustainable practices.",
    icon: "TreePine",
    category: "Climate & Environment",
    sdgs: [13],
    image: "/images/events/Garki_IMG_0011.jpg",
  },
  {
    slug: "youth-skill-acquisition",
    title: "Youth Skill Acquisition",
    tagline: "Practical skills for economic independence",
    description:
      "Skills development and training programs for youth, equipping them with marketable skills for economic empowerment.",
    icon: "Wrench",
    category: "Skills & Empowerment",
    sdgs: [1, 8],
    image: "/images/events/Back2School.jpg",
  },
  {
    slug: "cultural-heritage",
    title: "Cultural Heritage",
    tagline: "Preserving and celebrating African heritage",
    description:
      "Promoting cultural awareness and preserving Nigerian and African cultural heritage through community events and education.",
    icon: "Globe",
    category: "Community Development",
    sdgs: [11],
    image: "/images/events/UNGA80_d.jpeg",
  },
];

export const PARTNERS = [
  {
    name: "British Council",
    logo: "/images/partners/BritishCouncil.png",
    tier: "strategic" as const,
    website:
      "https://www.britishcouncil.org/study-work-abroad/alumni-uk/alumni-opportunities-initiatives/climate-action-grants",
    description: "Alumni UK Climate Action Grants supporter",
  },
  {
    name: "Near Foundation",
    logo: "/images/partners/NearFoundation.png",
    tier: "program" as const,
    website: "https://nearfoundation.ngo/",
    description: "Program partner for youth empowerment",
  },
  {
    name: "African Future Leaders Initiative",
    logo: "/images/partners/FLI.png",
    tier: "program" as const,
    website: null,
    description: "Pan-African youth leadership partner",
  },
  {
    name: "Hope 4 Her Foundation",
    logo: "/images/partners/Hope4Her.png.png",
    tier: "program" as const,
    website: null,
    description: "Girl-child empowerment and support partner",
  },
  {
    name: "Eduvate Kids",
    logo: "/images/partners/eduvatekids.png",
    tier: "program" as const,
    website: "https://eduvatekids-store.web.app/",
    description: "Education and children's development partner",
  },
  {
    name: "Scholarly Echo",
    logo: "/images/partners/ScholarlyEcho.png",
    tier: "program" as const,
    website: "https://scholarly-echo.web.app/",
    description: "Academic mentorship and scholarship partner",
  },
  {
    name: "Precious Little Lives Initiative",
    logo: "/images/partners/prelli.png",
    tier: "program" as const,
    website: null,
    description: "Children and community welfare partner",
  },
  {
    name: "Journalists & Writers Foundation",
    logo: "/images/partners/jwf-logo-1.png",
    tier: "knowledge" as const,
    website: "https://jwf.org/",
    description: "Host of SDGs Roundtable at UNGA",
  },
  {
    name: "UNGA SDGs Conference",
    logo: "/images/partners/sdgs-conference-logo.png",
    tier: "knowledge" as const,
    website: "https://unga-conference.org/",
    description: "United Nations General Assembly SDGs platform",
  },
  {
    name: "Zoom",
    logo: "/images/partners/zoom.png",
    tier: "support" as const,
    website: "https://zoom.us/",
    description: "Trust and support in our journey to impact local communities",
  },
  {
    name: "Claude AI",
    logo: "/images/partners/claude.png",
    tier: "support" as const,
    website: "https://claude.ai/",
    description: "Trust and support in our journey to impact local communities",
  },
  {
    name: "Brilliant",
    logo: "/images/partners/brilliant.png",
    tier: "support" as const,
    website: "https://brilliant.org/",
    description: "Learning by Doing — trust and support in our journey to impact",
  },
  {
    name: "Google for Nonprofits",
    logo: "/images/partners/google-nonprofits.jpg",
    tier: "support" as const,
    website: "https://www.google.com/nonprofits/",
    description: "Trust and support in our journey to impact local communities",
  },
];

export const IMPACT_STATS = [
  { label: "Youth Reached", value: 2000, suffix: "+", icon: "Users" },
  { label: "Girls Supported", value: 1000, suffix: "+", icon: "Heart" },
  { label: "Rural Students", value: 200, suffix: "+", icon: "BookOpen" },
  { label: "Families Supported", value: 100, suffix: "+", icon: "Home" },
  { label: "Scholarship Value", value: 250, suffix: "K+", prefix: "$", icon: "GraduationCap" },
  { label: "Global Partners", value: 9, suffix: "+", icon: "Handshake" },
];

export const TIMELINE_EVENTS = [
  {
    year: "2019",
    title: "Foundation Established",
    description:
      "Haleyouth Foundation was founded by passionate young professionals with a mission to empower youth through mentorship, education, and community development.",
  },
  {
    year: "2020-2022",
    title: "Continuous Social Support",
    description:
      "Ongoing empowerment programs and support for families across Nigeria, reaching hundreds of young people.",
  },
  {
    year: "2023",
    title: "TEDx & Pad-a-Girl Pilot",
    description:
      "Partnered for TEDx Okene, launched the pilot Pad-a-Girl project in public schools in Abuja, and mentored students to access international scholarships.",
  },
  {
    year: "2024",
    title: "Back-to-School & Digital Skills",
    description:
      "Organized the Back-to-School project reaching 200+ rural students. Delivered the Digital Skills for Her project supported by the Commonwealth Network.",
  },
  {
    year: "2025",
    title: "British Council Grant & UNGA",
    description:
      "Won the British Council Alumni UK Climate Action Grant. Dr. Ismaila invited to speak at the SDGs Roundtable Discussion at UNGA in New York.",
  },
];

export const PROGRAM_CATEGORIES = [
  "All",
  "Education & Scholarships",
  "Health & Wellness",
  "Climate & Environment",
  "Skills & Empowerment",
  "Community Development",
  "Peace & Advocacy",
];

export const GALLERY_CATEGORIES = [
  "All",
  "Pad-a-Girl Events",
  "Back-to-School",
  "UNGA & International",
  "Community Outreach",
  "Workshops & Training",
];

export const GALLERY_IMAGES = [
  {
    src: "/images/events/Garki_IMG_0011.jpg",
    caption: "Pad-a-Girl Climate Action project — distribution event at Garki, Abuja",
    category: "Pad-a-Girl Events",
  },
  {
    src: "/images/events/Garki_IMG_0015.jpg",
    caption: "Community engagement during Pad-a-Girl distribution at Garki",
    category: "Pad-a-Girl Events",
  },
  {
    src: "/images/events/Garki_IMG_0026.jpg",
    caption: "Reusable pad distribution and menstrual health education session",
    category: "Pad-a-Girl Events",
  },
  {
    src: "/images/events/JabiAK ADAAVA 37.jpg",
    caption: "Pad-a-Girl event at Jabi — girls holding advocacy placards",
    category: "Pad-a-Girl Events",
  },
  {
    src: "/images/events/Jabi_AK ADAAVA 9.jpg",
    caption: "Pad-a-Girl distribution at Jabi with Haleyouth Foundation banner",
    category: "Pad-a-Girl Events",
  },
  {
    src: "/images/events/Back2School.jpg",
    caption: "Back-to-School project — students receiving textbooks and learning materials",
    category: "Back-to-School",
  },
  {
    src: "/images/events/Back2School2.jpg",
    caption: "Back-to-School initiative supporting rural education",
    category: "Back-to-School",
  },
  {
    src: "/images/events/UNGA80_a.jpg",
    caption:
      "Haleyouth Foundation at the SDGs Roundtable Discussion, UNGA 2025, New York",
    category: "UNGA & International",
  },
  {
    src: "/images/events/UNGA80_b.jpg",
    caption: "Group photo at the SDGs Roundtable Discussion, UNGA 2025",
    category: "UNGA & International",
  },
  {
    src: "/images/events/Unga80_c.jpg",
    caption:
      "Receiving recognition plaque at the SDGs Roundtable Discussion",
    category: "UNGA & International",
  },
  {
    src: "/images/events/UNGA80_d.jpeg",
    caption: "Full group of speakers and attendees at the UNGA SDGs event",
    category: "UNGA & International",
  },
  {
    src: "/images/events/DSC04757.jpg",
    caption: "Speakers panel at the SDGs Roundtable Discussion in New York",
    category: "UNGA & International",
  },
  {
    src: "/images/events/fooddrive1.jpeg",
    caption: "Food drive — bulk supplies prepared for distribution to families in need",
    category: "Community Outreach",
  },
  {
    src: "/images/events/fooddrive2.jpeg",
    caption: "Food drive — packaged food parcels ready for community distribution",
    category: "Community Outreach",
  },
];
