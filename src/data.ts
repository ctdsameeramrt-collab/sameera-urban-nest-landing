import { USP, PricingPlan, Amenity, Testimonial, FAQItem } from "./types";

export const PROJECT_USPS: USP[] = [
  {
    id: "legal",
    title: "Uncompromising Legal Safety",
    subtitle: "DTCP Approved & RERA Registered",
    description: "Complete peace of mind with 100% legal clarity, clear title deeds, and full statutory compliance. Approved layout under RERA Regn. No: TN/35/Layout/1382/2025.",
    iconName: "ShieldCheck"
  },
  {
    id: "location",
    title: "GST Road Growth Corridor",
    subtitle: "High Appreciation Location",
    description: "Strategically located at Athur, Chengalpattu—just 10 mins from Chengalpattu Railway Junction, minutes from Mahindra World City, and highly accessible to the upcoming Parandur International Airport.",
    iconName: "TrendingUp"
  },
  {
    id: "infrastructure",
    title: "Ready-to-Build Infrastructure",
    subtitle: "Premium Engineering Standards",
    description: "Equipped with wide tar-top internal roads (7.2m to 10m wide), robust underground storm-water drainage, avenue plantations, and ready-to-tap electricity (EB) connections.",
    iconName: "Construction"
  },
  {
    id: "security",
    title: "Gated Community Security",
    subtitle: "24/7 Protection & Peace",
    description: "Secure perimeter compound wall surrounding the entire community, with automated gated entry, a dedicated security cabin, and 24x7 CCTV surveillance.",
    iconName: "Lock"
  },
  {
    id: "vaastu",
    title: "Vaastu-Compliant Plottings",
    subtitle: "Harmonious Living Spaces",
    description: "Every plot layout is scientifically oriented and designed to comply with Vaastu principles, ensuring a healthy, prosperous, and positive environment for your future home.",
    iconName: "Compass"
  },
  {
    id: "credibility",
    title: "Decades of Developer Trust",
    subtitle: "Delivering Solid Land Assets",
    description: "Marketed by Praedia Promoters and developed by Sameeraa Foundations, combining decades of structural experience, hundreds of happy families, and zero legal disputes.",
    iconName: "Award"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "compact",
    name: "Compact Smart Plot",
    sizeRange: "600 sq.ft",
    priceStart: "₹8.4 Lakhs*",
    label: "Plots starting from ₹1,400/sq.ft*",
    bestFor: "Ideal for salaried professionals, small families, and high-growth land investments.",
    highlights: ["Most affordable entry point", "High liquidity & resale demand", "Perfect for a compact 2BHK home"]
  },
  {
    id: "family",
    name: "Standard Family Plot",
    sizeRange: "1,000 - 1,500 sq.ft",
    priceStart: "₹14 Lakhs*",
    label: "Plots starting from ₹1,400/sq.ft*",
    bestFor: "Highly popular configuration, perfect for an independent dual-story family villa.",
    highlights: ["Generous garden/car park space", "Dual-road accessibility options", "Highly approved for standard bank loans"]
  },
  {
    id: "premium",
    name: "Premium Avenue Plot",
    sizeRange: "2,000 - 2,400 sq.ft",
    priceStart: "₹28 Lakhs*",
    label: "Plots starting from ₹1,400/sq.ft*",
    bestFor: "Exclusive corner plots with maximal road width for luxury, spacious residences.",
    highlights: ["Grand layout & frontage size", "Enhanced privacy on wider roads", "Ideal for multi-generational homes"]
  }
];

export const PROJECT_AMENITIES: Amenity[] = [
  {
    id: "gate",
    name: "Gated Entrance",
    iconName: "DoorClosed",
    description: "Grand arch entrance with integrated security cabin for regulated access."
  },
  {
    id: "cctv",
    name: "24/7 CCTV & Security",
    iconName: "Eye",
    description: "Constant surveillance cameras covering major entry points and common areas."
  },
  {
    id: "plantation",
    name: "Avenue Plantation",
    iconName: "TreePine",
    description: "Lush native shady trees planted along roadsides for clean air and aesthetics."
  },
  {
    id: "roads",
    name: "Tar-Top Internal Roads",
    iconName: "Milestone",
    description: "Well-laid, heavy-duty asphalt roads (7.2m to 10m wide) for smooth driveways."
  },
  {
    id: "lighting",
    name: "LED Street Lights",
    iconName: "Lightbulb",
    description: "Modern, power-saving LED lamps installed on every lane for optimal night safety."
  },
  {
    id: "drainage",
    name: "Storm Water Drains",
    iconName: "Waves",
    description: "Engineered underground storm drainage to prevent waterlogging during monsoons."
  },
  {
    id: "play",
    name: "Children's Play Area",
    iconName: "Sparkles",
    description: "Dedicated park space equipped with safe play structures for young residents."
  },
  {
    id: "wall",
    name: "Compound Wall",
    iconName: "Grid",
    description: "Sturdy brick compound wall enclosing the entire gated development."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Karthikeyan R.",
    role: "Senior Project Manager, Mahindra World City",
    quote: "[Client testimonial to be added]"
  },
  {
    id: "t2",
    name: "Meenakshi Sundaram",
    role: "Government High School Principal, Chengalpattu",
    quote: "[Client testimonial to be added]"
  },
  {
    id: "t3",
    name: "Suresh Kumar G.",
    role: "Retired Bank Manager & Active Land Investor",
    quote: "[Client testimonial to be added]"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "Is Sameera Urban Nest approved by Tamil Nadu authorities?",
    answer: "Yes, the project is a fully DTCP-approved layout and registered under Tamil Nadu RERA with Registration Number: TN/35/Layout/1382/2025. This ensures complete legal security, clear ownership titles, and physical development compliance."
  },
  {
    id: "faq2",
    question: "What is the exact price and are there any extra charges?",
    answer: "Plots are priced starting from ₹1,400 per sq.ft. A compact 600 sq.ft plot starts at ₹8.4 Lakhs*. Prices are indicative base values. Registration charges, documentation, patta transfer fees, and security deposit are calculated additionally based on government guidelines at the time of purchase."
  },
  {
    id: "faq3",
    question: "Can I avail a bank loan for purchasing these plots?",
    answer: "Absolutely. Sameera Urban Nest is pre-approved by major nationalized and private financial institutions (including SBI, LIC, and HDFC). We offer comprehensive assistance in processing loans for up to 70-80% of the property value, based on your credit profile."
  },
  {
    id: "faq4",
    question: "How is the water table and is the property prone to monsoonal flooding?",
    answer: "Athur in Chengalpattu is known for an excellent, sweet ground water table, reachable at shallow depths (typically 30-50 feet). Geographically, the property sits on naturally elevated land with no history of flooding. We have integrated concrete storm-water drains running alongside all internal roads for efficient drainage."
  },
  {
    id: "faq5",
    question: "What is the process to schedule a site visit?",
    answer: "Site visits are 100% free and include complimentary pick-up and drop-off in air-conditioned vehicles from your residence or office. To book, simply fill out the form on this page with your preferred date, or tap the click-to-call / WhatsApp links to book instantly with our relationship managers."
  },
  {
    id: "faq6",
    question: "What documents will I receive upon completing the purchase?",
    answer: "Upon registration, you will receive: (1) Registered Sale Deed, (2) Parent Documents trace of 30+ years, (3) Copy of the DTCP Approved Layout blueprint, (4) Individual Patta copy, (5) Nil-Encumbrance Certificate (EC) on your name, and (6) RERA compliance dossier."
  }
];
