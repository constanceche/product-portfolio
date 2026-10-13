// Everything here comes from the resume PDF. Check any edit against it.

export const profile = {
  name: 'Constance Chen',
  tagline: 'Product person who can build it and bring it to market.',
  intro:
    "Computer science graduate from Binghamton University. I've shipped a donation platform as an engineer, directed a team of 8 engineers as a product manager intern, and now run CRM, data, and marketing work at Canaan Xpress.",
  description:
    'Portfolio of Constance Chen: product, engineering, and growth work across Canaan Xpress, Develop For Good, Kepler U, and HLW.',
  email: 'constancechen333@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chen-constance',
  resumeFile: 'Constance-Chen-Resume.pdf',
};

export const strengths = [
  {
    icon: 'product',
    title: 'Product',
    body: 'I gather requirements from stakeholders, turn feedback into wireframes, scope the work, and track it through launch. At Develop For Good I directed a team of 8 engineers and used post-launch engagement data to set the roadmap.',
  },
  {
    icon: 'code',
    title: 'Engineering',
    body: 'A computer science degree and hands-on builds: a full-stack MERN donation platform taken from 0 to launch, RESTful APIs in Node.js and Express, and a dashboard connected to CRM data.',
  },
  {
    icon: 'growth',
    title: 'Growth',
    body: "I've launched Google Ads Search and Performance Max campaigns, set up SEO and LinkedIn channels, and led a company's first CRM implementation.",
  },
] as const;

export interface Experience {
  org: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  caseStudy?: string;
}

export const experience: Experience[] = [
  {
    org: 'Canaan Xpress',
    role: 'B2B Marketing Analyst (Contract)',
    period: 'Aug 2026 – Present',
    location: 'Valley Stream, NY',
    summary:
      "Led the company's first CRM implementation (Maximizer), tiered repeat customers with SQL, and built a dashboard and APIs that give leadership visual reports on customer trends. Also launched SEO, Google Business Profile, and LinkedIn channels, with SOPs for handoff.",
    caseStudy: 'canaan-xpress-crm',
  },
  {
    org: 'Kepler U',
    role: 'Digital Marketing Extern',
    period: 'Apr 2026 – Jul 2026',
    location: 'Remote',
    summary:
      'Managed the end-to-end launch of 4 new Google Ads Search and Performance Max campaigns for a nonprofit client under Google Ad Grants rules, and fixed a conversion-data gap that lifted impressions 120%+ day over day.',
    caseStudy: 'google-ads-nonprofit',
  },
  {
    org: 'HLW',
    role: 'Marketing Intern',
    period: 'Jun 2025 – Aug 2025',
    location: 'Manhattan, NY',
    summary:
      "Researched prospective B2B clients to inform pitch positioning, and tracked social and web performance across HLW's main account and 4 specialty studio brands with Google Analytics and Hootsuite.",
  },
  {
    org: 'Develop For Good',
    role: 'Product Manager Intern',
    period: 'Oct 2024 – Mar 2025',
    location: 'Remote',
    summary:
      'Gathered requirements from nonprofit stakeholders, turned feedback into wireframes for a landing page redesign, and directed 8 engineers integrating PowerBI reporting and print-on-demand through launch.',
    caseStudy: 'develop-for-good',
  },
  {
    org: 'Develop For Good',
    role: 'Software Engineer Intern',
    period: 'May 2024 – Sep 2024',
    location: 'Remote',
    summary:
      'Delivered the MVP of a donation management platform for Linens N Love, a full-stack MERN app connecting volunteers, hotels, and shelters, from 0 to launch.',
    caseStudy: 'develop-for-good',
  },
];

export const stats = [
  { value: 90, suffix: '%', label: 'Q2 customer retention in my Canaan Xpress analysis, the basis for a customer growth guide' },
  { value: 500, suffix: '+', label: 'target companies covered by the outreach foundation in the CRM I implemented' },
  { value: 8, suffix: '', label: 'engineers directed as a product manager intern at Develop For Good' },
  { value: 120, suffix: '%+', label: 'day-over-day lift in ad impressions after a conversion-goal fix' },
  { value: 1000, suffix: '+', label: 'attendees at Asian Night, a 16-performance showcase' },
];

export const leadership = {
  org: 'Asian Student Union, Binghamton University',
  role: 'President',
  period: 'Aug 2021 – May 2025',
  points: [
    'Coordinated 20+ events and fundraisers with multicultural organizations for over 200 club members.',
    'Orchestrated Asian Night, a showcase of 16 performances with over 1,000 attendees, through promotion, financial management, and grant applications.',
    "Used Asana's Kanban board and agile methods to delegate tasks, improving project completion rates by 25%.",
  ],
};

export const skills = [
  {
    group: 'Product',
    items: ['Product requirements', 'Roadmapping', 'Wireframing', 'User discovery', 'Agile/Scrum', 'Jira', 'Asana', 'Figma'],
  },
  {
    group: 'Data & Technical',
    items: ['SQL', 'Python', 'PowerBI', 'Google Analytics', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    group: 'Marketing',
    items: [
      'Google Ads',
      'Performance Max',
      'Google Ad Grants',
      'Conversion Tracking',
      'Search Query Analysis',
      'SEO',
      'Google Business Profile',
      'LinkedIn Content Strategy',
      'Hootsuite',
      'Metricool',
      'Canva',
      'Adobe Premiere',
    ],
  },
  {
    group: 'Go-to-Market & CRM',
    items: ['LinkedIn Ads', 'Mailchimp', 'Maximizer CRM', 'Microsoft Dynamics CRM'],
  },
];

export const education = {
  school: 'Binghamton University, SUNY',
  college: 'Watson College of Engineering and Applied Science',
  degree: 'Bachelor of Science in Computer Science',
  period: 'Aug 2021 – May 2025',
};
