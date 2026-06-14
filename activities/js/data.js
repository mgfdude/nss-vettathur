// Static Database for NSS Vettathur (Kerala, India)

const STATS = {
  volunteers: "100",
  activities: "50+",
  treesPlanted: "600+",
  serviceHours: "4800+",
  beneficiaries: "3500+"
};

const ACTIVITIES = [
  {
    id: "act-6",
    title: "Spandan: 7-Day Special Winter Camp",
    category: "Special Camps",
    date: "2025-12-23",
    description: "The annual special residential camp conducted at GLP SCHOOL THELAKKAD. Activities included building a community compost pit, painting school classrooms, running an environmental census, and holding daily cultural integration forums.",
    image: (window.location.pathname.includes('/activities/') ? '../' : '') + "assets/images/thumpnail/special-camp-2025.JPG",
    link: "special-camp-2025.html",
    impact: { volunteers: 52, hours: 350, beneficiaries: 800 }
  }
];

const SCAM_ALERTS = [
  {
    id: "scam-1",
    title: "Fake KSEB Bill Payment Messages",
    date: "2026-06-11",
    description: "Fraudulent SMS or WhatsApp messages claiming your electricity connection will be disconnected by 9:30 PM tonight due to unpaid dues. It provides a fake helpline number where scammers try to install remote control apps.",
    severity: "High",
    prevention: "KSEB never sends disconnection alerts with personal mobile numbers. Always check your payment status via the official 'kseb.in' portal or the KSEB mobile app."
  },
  {
    id: "scam-2",
    title: "WhatsApp Family Call Impersonation",
    date: "2026-06-03",
    description: "Scammers use AI-generated voice cloning or stolen profile pictures to call targets, pretending to be a relative (e.g., son or nephew abroad) facing an urgent accident or legal emergency. They demand immediate bank transfers.",
    severity: "High",
    prevention: "Hang up immediately and call your relative on their normal number. Verify the situation independently before transferring money."
  },
  {
    id: "scam-3",
    title: "QR Code Receive Fraud",
    date: "2026-05-28",
    description: "Buyers or lottery portals online ask you to scan a QR code to 'receive' money. They send a code with text indicating it's a payment collection code, hoping you enter your UPI PIN.",
    severity: "Medium",
    prevention: "Remember, scanning a QR code and entering your UPI PIN is ONLY used to SEND money. You never need to enter your PIN to receive funds."
  },
  {
    id: "scam-4",
    title: "FedEx/Parcel Custom Trap",
    date: "2026-05-14",
    description: "Victims receive a call claiming a parcel sent under their Aadhaar card contains illegal substances and has been seized by customs. Fake police officers on Skype video calls 'interrogate' and extort money to settle the case.",
    severity: "High",
    prevention: "Law enforcement agencies never conduct interrogation over Skype or WhatsApp. Block the call immediately and report it to the Cyber Cell."
  }
];

const GALLERY_ALBUMS = [
  {
    id: "gal-1",
    title: "World Environment Day Sapling Drive",
    year: "2026",
    category: "Environment",
    cover: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "gal-2",
    title: "Life-Saving Blood Camp 2026",
    year: "2026",
    category: "Health",
    cover: "https://images.unsplash.com/photo-1615461066841-4a18e041d589?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1615461066841-4a18e041d589?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536856788636-e87f87a89270?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "gal-3",
    title: "Special Winter Camp - Vettathur LP School",
    year: "2025",
    category: "Special Camps",
    cover: "/assets/images/thumpnail/special-camp-2025.JPG",
    images: [
      "/assets/images/thumpnail/special-camp-2025.JPG",
      "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "gal-4",
    title: "Cyber Security and Digital Literacy Drive",
    year: "2026",
    category: "Cyber Awareness",
    cover: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const ACHIEVEMENTS = [
  {
    id: "ach-1",
    year: "2026",
    title: "Excellent Community Service Recognition",
    description: "Awarded by the Vettathur Grama Panchayat for outstanding work in sanitation, cleanliness, and local water body restoration during pre-monsoon camps.",
    category: "Unit Award"
  },
  {
    id: "ach-2",
    year: "2025",
    title: "Green Campus Model Project Award",
    description: "Received recognition at the District level for launching organic vegetable gardens and a composting program inside college and local school campuses.",
    category: "Environmental Award"
  },
  {
    id: "ach-3",
    year: "2025",
    title: "State Level Pre-RD Selection",
    description: "Volunteer Secretary Arjun K. was selected and represented the unit in the State Pre-Republic Day parade training camp held in Trivandrum.",
    category: "Volunteer Achievement"
  },
  {
    id: "ach-4",
    year: "2024",
    title: "Blood Donor Unit Appreciation",
    description: "Appreciated by Malappuram District Blood Bank for coordinating 150+ blood donations across multiple campaigns in rural health sectors.",
    category: "Social Impact"
  }
];

const NEWS = [
  {
    id: "news-1",
    title: "NSS Vettathur Launches Monsoon Precaution Campaign",
    date: "2026-06-10",
    summary: "As monsoon starts, NSS units have deployed plastic cleanup squads and published health tips detailing prevention of leptospirosis and dengue in local school centers.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "news-2",
    title: "Registration Opens for 2026 Volunteer Batch",
    date: "2026-05-25",
    summary: "Higher Secondary students interested in joining the National Service Scheme Unit can submit applications to the Program Officer. Interview dates will be announced next week.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "news-3",
    title: "Panchayat Level Water Quality Survey Completed",
    date: "2026-04-30",
    summary: "A joint initiative by NSS and local departments analyzed well-water quality in 3 core village zones. Survey reports have been submitted to local authorities.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
  }
];

const BLOGS = [
  {
    id: "blog-techora",
    title: "Techora.in: Building Practical Digital Presence for Local Communities",
    author: "NSS Vettathur Editorial Team",
    date: "2026-06-12",
    summary: "A short look at how Techora.in supports practical, accessible web presence for organizations, student groups, and community initiatives that need reliable digital visibility.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    sourceUrl: "https://techora.in",
    sourceLabel: "Visit techora.in",
    content: "Digital presence has become an essential part of how local organizations communicate their work, share updates, and stay connected with the public. For student groups, service units, and community-focused teams, a clear website can make activities easier to discover and preserve important stories beyond social media posts.\n\nTechora.in focuses on building practical web solutions that help organizations present their identity, publish updates, and create a dependable online reference point. For a unit like NSS Vettathur, this kind of support matters because community service work deserves a clean and accessible digital home.\n\nA good website is not only about design. It is about trust, structure, speed, and making information easy for people to find. Platforms and teams that understand these needs can help local initiatives become more visible while keeping the experience simple for visitors.\n\nAs community programs continue to use digital tools for outreach, partners such as Techora.in play a useful role in connecting grassroots activity with modern web standards."
  },
  {
    id: "blog-1",
    title: "Not Me But You: The Spirit of Active Student Volunteerism",
    author: "Naadira.P (Program Officer)",
    date: "2026-05-20",
    summary: "How student volunteering shifts the mindset of youth from individual concerns to collective growth. A reflection on community camps and the lessons learned outside classrooms.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    content: "The National Service Scheme (NSS) has been a cornerstone of student-led community action in India since its inception. In rural Kerala, the impact is even more palpable. Our weekly campaigns teach students valuable lessons in crisis management, environmental conservation, and social integration. Experiencing the lives of local villagers helps volunteers develop empathy, leadership, and a sense of shared responsibility. This article explores stories of young volunteers who went on to lead great grassroots social movements."
  },
  {
    id: "blog-2",
    title: "How to Keep Your Family Safe from Digital Scams",
    author: "Anjali Dev (Cyber Cell Lead, Volunteer)",
    date: "2026-04-18",
    summary: "A breakdown of common tricks used by cybercriminals targetting rural citizens in Kerala. Practical tips to secure mobile banking apps, social logins, and avoiding identity thefts.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    content: "With high mobile phone penetration in Kerala, digital scams have reached our doorsteps. Homemakers and senior citizens are particularly vulnerable to phishing scams, credit card updates, and fake lottery rewards. Educating our families is the first line of defense. Always remember: banks never ask for passwords or OTPs over phone calls. Enable two-factor authentication on WhatsApp and social media handles. In case of financial fraud, dial the national cyber helpline '1930' within the first golden hour to freeze stolen money."
  },
  {
    id: "blog-3",
    title: "Restoring Local Ecology: Planting Native Trees in Melattur",
    author: "Midhun P. (Volunteer Secretary)",
    date: "2026-03-05",
    summary: "Why planting exotic decorative plants harms the soil and why NSS Vettathur focuses purely on native species like Jackfruit, Mango, and Mahogany during Vanamahotsavam drives.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    content: "Native biodiversity is the backbone of Kerala's soil stability and water tables. When we plant non-native species, we disrupt local insect webs and birds. In our latest afforestation campaign, our unit collaborated with botanists to select native trees. These trees withstand monsoon downpours and hold slopes firmly, preventing landslides. We hope to inspire schools and households across Malappuram to adopt this native-only policy for their home gardens."
  }
];

const TEAM = [
  {
    id: "team-1",
    name: "Naadira.P",
    role: "Program Officer",
    image: "assets/images/team/PO/PO.png?auto=format&fit=crop&w=300&q=80",
    email: "diginss376@gmail.com",
    phone: "+91 81390 10484"
  },
  {
    id: "team-2",
    name: "Muhammed Rifan.KP.",
    role: "Volunteer Secretary (Boys 25-26)",
    image: "assets/images/team/leaders/25-26/boy.png?auto=format&fit=crop&w=300&q=80",
    email: "diginss376@gmail.com"
  },
  {
    id: "team-3",
    name: "Sana Fathima.AK.",
    role: "Volunteer Secretary (Girls 25-26)",
    image: "assets/images/team/leaders/25-26/girl.png?auto=format&fit=crop&w=300&q=80",
    email: "diginss376@gmail.com" 
  },
  {
    id: "team-4",
    name: "Raihan.AV",
    role: "Media Wing(25-26)",
    image: "assets/images/team/leaders/25-26/boy.png?auto=format&fit=crop&w=300&q=80",
    email: "diginss376@gmail.com" 
  },
  {
    id: "team-5",
    name: "?",
    role: "Volunteer leader(Boys 26-27)",
    image: "assets/images/team/leaders/25-26/boy.png?auto=format&fit=crop&w=300&q=80",
    email: "diginss376@gmail.com"
  },
  {
    id: "team-6",
    name: "?",
    role: "Volunteer leader(Girls 26-27)",
    image: "assets/images/team/leaders/25-26/boy.png?auto=format&fit=crop&w=300&q=80",
    email: "diginss376@gmail.com"
  },
  {
    id: "team-7",
    name: "?",
    role: "Media Wing(26-27)",
    image: "assets/images/team/leaders/25-26/boy.png?auto=format&fit=crop&w=300&q=80",
    email: "diginss376@gmail.com"
  }
];

const TESTIMONIALS = [
  {
    name: "P. Devadas",
    role: "Ward Member, Vettathur Panchayat",
    text: "The dedication of the NSS Vettathur volunteers during the sanitation campaign was exemplary. They cleared waste water channels and educated families with outstanding professionalism."
  },
  {
    name: "K. Rema",
    role: "Homemaker, Melattur",
    text: "Thanks to the cyber awareness seminar, I was able to recognize a scam WhatsApp video call claiming my grandson was in jail. These student campaigns are a shield for us."
  },
  {
    name: "Abhinav S.",
    role: "Alumni Volunteer (2023 Batch)",
    text: "NSS was the turning point in my student life. It taught me practical leadership, community organization, and shaped my career in public health."
  }
];




