export interface ProjectLink {
  demo?: string;
  github?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  excerpt: string;
  technologies: string[];
  role: string;
  year: number;
  image: string;
  links: ProjectLink;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  publishedAt: string;
  tags?: string[];
  readingTime?: number;
}

export interface SiteStats {
  totalVisits: number;
  newsletterSubscribers: number;
  monthly: Array<{
    month: string;
    visits: number;
  }>;
}
