
export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  period: string;
  degree: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface PersonalDetail {
  label: string;
  value: string;
}
