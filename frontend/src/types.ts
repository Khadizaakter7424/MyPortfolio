export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  gitHub: string;
  linkedIn: string;
  objective: string;
  photoUrl: string;
  statusMessage: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Project = {
  name: string;
  description: string[];
  tech: string;
  gitHub: string;
};

export type TimelineEntry = {
  title: string;
  place: string;
  period: string;
};

export type LanguageSkill = {
  name: string;
  level: number;
};

export type PortfolioData = {
  profile: Profile;
  skills: SkillGroup[];
  projects: Project[];
  education: TimelineEntry[];
  training: TimelineEntry[];
  languages: LanguageSkill[];
  hobbies: string[];
};
