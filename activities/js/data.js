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
    id: "act-1",
    title: "Spandan: 7-Day Special Winter Camp",
    category: "Special Camps",
    date: "2025-12-23",
    description: "The annual special residential camp conducted at GLP SCHOOL THELAKKAD. Activities included building a community compost pit, painting school classrooms, running an environmental census, and holding daily cultural integration forums.",
    image: (window.location.pathname.includes('/activities/') ? '../' : '') + "assets/images/thumpnail/special-camp-2025.JPG",
    link: "special-camp-2025.html",
    impact: { volunteers: 52, hours: 350, beneficiaries: 800 }
  }
];

const SCAM_ALERTS = [];

const GALLERY_ALBUMS = [
  {
    id: "gal-1",
    title: "Anti-drug campaigner",
    year: "2026",
    category: "Anti-drug",
    cover: "assets/images/thumpnail/Anti-drug_campaigner_26.JPG",
    images: [
      "assets/images/gallery/Anti-drug_campaigner_26/1.jpg",
      "assets/images/gallery/Anti-drug_campaigner_26/2.jpg",
      "assets/images/gallery/Anti-drug_campaigner_26/3.jpg",
      "assets/images/gallery/Anti-drug_campaigner_26/4.jpg",
      "assets/images/gallery/Anti-drug_campaigner_26/5.jpg"
    ]
  },
  {
    id: "gal-2",
    title: "Special Winter Camp - GLP SCHOOL THELAKKAD",
    year: "2025",
    category: "Special Camps",
    cover: "assets/images/thumpnail/special-camp-2025.JPG",
    images: [
      "assets/images/thumpnail/special-camp-2025.JPG",
      "assets/images/gallery/camp2025/6.jpg",
      "assets/images/gallery/camp2025/5.jpg",
      "assets/images/gallery/camp2025/4.jpg",
      "assets/images/gallery/camp2025/3.jpg",
      "assets/images/gallery/camp2025/2.jpg",
      "assets/images/gallery/camp2025/1.jpg"
    ]
  }
];

const ACHIEVEMENTS = [];

const NEWS = [
  {
    id: "news-2",
    title: "Registration Opens for 2026 Volunteer Batch",
    date: "2026-05-25",
    summary: "Higher Secondary students interested in joining the National Service Scheme Unit can submit applications to the Program Officer. Interview dates will be announced next week.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
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




