
import { Experience, Education, Skill, PersonalDetail } from './types';

export const PERSONAL_INFO = {
  name: "Vishwas Kumar",
  fullName: "Vishwaskumar Kanubhai Parmar",
  email: "Vishwask45@gmail.com",
  phone: "9016597932",
  address: "155-K, Nava Harjanvas, Badodara, Arvalli, Gujarat - 383315",
  objective: "To work with renowned organization this gives me an opportunity to learn and growth with the industry. A professional challenging career, to work with full dedication, gaining professional skill and enrich my experience."
};

export const PERSONAL_DETAILS: PersonalDetail[] = [
  { label: "D.O.B", value: "15.07.1993" },
  { label: "Gender", value: "MALE" },
  { label: "Marital Status", value: "Married" },
  { label: "Nationality", value: "Indian" },
  { label: "Religion", value: "Hindu" },
  { label: "Languages", value: "Gujarati, Hindi, English" }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Developer in Rockwell PLC",
    company: "TTL / MES",
    location: "Live Production",
    period: "Jan 2025 – Present",
    description: [
      "Production Developer with MES-driven execution (Manufacturing Execution Systems).",
      "Fast TTL (Time-To-Live) implementation for optimized logic responsiveness.",
      "Live system ownership and real-time monitoring of automated production lines.",
      "Ensuring smooth end-to-end production workflow through advanced Rockwell PLC integration."
    ]
  },
  {
    role: "Consultant",
    company: "Vega Intellisoft PVT LTD (TTL) - TATA MOTORS",
    location: "Sanand, Gujarat",
    period: "Sep 2023 – Dec 2024",
    description: [
      "Daily on-site technical support for high-volume production lines.",
      "Expert support for Allen-Bradley PLC logic and SCADA/HMI system maintenance.",
      "SQL Database management for production data logging and analysis.",
      "Real-time logic corrections and troubleshooting during critical production cycles."
    ]
  },
  {
    role: "Technician",
    company: "VDA Infosolutions PVT LTD (TCS) - TATA MOTORS",
    location: "Sanand, Gujarat",
    period: "Mar 2021 – Sep 2023",
    description: [
      "On-site troubleshooting for factory floor automation hardware.",
      "Installation and config of Barcode printers (ZM400, ZT410) and Zebra scanners.",
      "HMI (PVP 1500) and AENT Modules configuration.",
      "Preventative maintenance of electrical control panels."
    ]
  },
  {
    role: "Testing Engineer",
    company: "Mascot Pump LTD",
    location: "Ahmedabad",
    period: "Jun 2018 – Mar 2021",
    description: [
      "Performance testing of HP motor variants (v4, v6) and Monoblock pumps.",
      "Generating technical performance reports and quality assurance documentation."
    ]
  }
];

export const SKILLS: Skill[] = [
  {
    category: "Industrial Automation",
    items: ["Rockwell PLC", "RS Logix 5000", "MES Integration", "Factory Talk SCADA", "Siemens TIA Portal"]
  },
  {
    category: "Digital Infrastructure",
    items: ["SQL / Database", "SCADA Networking", "HMI Programming", "MES Workflows"]
  },
  {
    category: "Technical Tools",
    items: ["AutoCAD", "Industrial IT", "Zebra Solutions", "Electrical Design"]
  }
];

export const EDUCATIONS: Education[] = [
  {
    institution: "Universal College of Engineering and Technology",
    period: "2018",
    degree: "BE Electrical Engineering"
  },
  {
    institution: "R. C. Technical Institute",
    period: "2014",
    degree: "Diploma Electrical Engineering"
  }
];
