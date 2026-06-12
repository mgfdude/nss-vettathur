// Static Database for NSS Vettathur (Kerala, India)

export const STATS = {
  volunteers: "100+",
  activities: "50+",
  treesPlanted: "600+",
  serviceHours: "4800+",
  beneficiaries: "3500+"
};

export const ACTIVITIES = [
  {
    id: "act-1",
    title: "Gramasree Cleanliness Drive & Sanitation Camp",
    category: "Community Service",
    date: "2026-05-18",
    description: "In collaboration with Vettathur Grama Panchayat, NSS volunteers organized a comprehensive waste cleanup and sanitation drive in local public wards. They distributed info leaflets on solid waste management and cleared plastic waste from village canals to prevent monsoon logging.",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
    impact: { volunteers: 48, hours: 240, beneficiaries: 450 }
  },
  {
    id: "act-2",
    title: "Vanamahotsavam: Green Valley Tree Plantation",
    category: "Environment",
    date: "2026-06-05",
    description: "Marking World Environment Day, the unit launched a massive afforestation campaign planting over 150 native fruit-bearing saplings along the riverbanks of Melattur valley. Seedlings were sourced from the Kerala Forest Department to restore ecological balance.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    impact: { volunteers: 60, hours: 300, beneficiaries: 600 }
  },
  {
    id: "act-3",
    title: "Jeevan: Blood Donation & Health Registry Campaign",
    category: "Health",
    date: "2026-04-12",
    description: "Organized in partnership with the Malappuram District Blood Bank, our volunteers successfully donated 65 units of blood in a single day and created a local registry of 100 emergency volunteer donors for Vettathur and nearby areas.",
    image: "https://images.unsplash.com/photo-1615461066841-4a18e041d589?auto=format&fit=crop&w=800&q=80",
    impact: { volunteers: 35, hours: 140, beneficiaries: 120 }
  },
  {
    id: "act-4",
    title: "Cyber Security & Digital Literacy Seminar",
    category: "Cyber Awareness",
    date: "2026-03-22",
    description: "An intensive cyber safety workshop for elderly citizens and homemakers, focusing on UPI fraud, QR code traps, and WhatsApp OTP scam prevention. Volunteers created live demo scenarios of digital safety practices.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    impact: { volunteers: 20, hours: 80, beneficiaries: 150 }
  },
  {
    id: "act-5",
    title: "LED Bulb Assembly Training & Skill Workshop",
    category: "Skill Development",
    date: "2026-02-10",
    description: "To support youth self-reliance, the unit held a hands-on workshop on assembling low-cost, energy-efficient LED bulbs. The training was open to high school students and local neighborhood self-help groups (Kudumbashree).",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    impact: { volunteers: 30, hours: 120, beneficiaries: 90 }
  },
  {
    id: "act-6",
    title: "Spandan: 7-Day Special Winter Camp",
    category: "Special Camps",
    date: "2025-12-23",
    description: "The annual special residential camp conducted at Vettathur LP School. Activities included building a community compost pit, painting school classrooms, running an environmental census, and holding daily cultural integration forums.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    impact: { volunteers: 50, hours: 350, beneficiaries: 800 }
  }
];

export const SCAM_ALERTS = [
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

export const GALLERY_ALBUMS = [
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
    cover: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
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

export const ACHIEVEMENTS = [
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

export const NEWS = [
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

export const BLOGS = [
  {
    id: "blog-1",
    title: "Not Me But You: The Spirit of Active Student Volunteerism",
    author: "Dr. Sandeep K. (Program Officer)",
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

export const TEAM = [
  {
    id: "team-1",
    name: "Dr. Sandeep K.",
    role: "Program Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    email: "sandeep.k@nss-vettathur.techora.in",
    phone: "+91 98765 43210"
  },
  {
    id: "team-2",
    name: "Midhun P.",
    role: "Volunteer Secretary (Boys)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    email: "midhun.p@nss-vettathur.techora.in",
    phone: "+91 98765 43211"
  },
  {
    id: "team-3",
    name: "Arya Lakshmi S.",
    role: "Volunteer Secretary (Girls)",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    email: "arya.l@nss-vettathur.techora.in",
    phone: "+91 98765 43212"
  },
  {
    id: "team-4",
    name: "Fadhil Ahmed",
    role: "Cyber Awareness Lead",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    email: "fadhil.a@nss-vettathur.techora.in",
    phone: "+91 98765 43213"
  }
];

export const TESTIMONIALS = [
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
