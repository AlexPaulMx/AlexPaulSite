export type Track = {
  title: string;
  artist: string;
  cover: string;
  src: string;
  album?: string;
  genres?: string[];
  year?: string;
  description?: string;
};

export type Supporter = {
  name: string;
  amount: number;
  message?: string;
  avatar?: string;
  date: string;
};

export type Comment = {
  user: string;
  avatar?: string;
  message: string;
  date: string;
};

export type SocialLinks = {
  twitter: string;
  instagram: string;
  youtube: string;
  spotify: string;
};

export type ProjectInfo = {
  name: string;
  description: string;
  goal: number;
  daysLeft: number;
  socialLinks: SocialLinks;
  tracks: Track[];
  supporters: Supporter[];
  comments: Comment[];
}; 