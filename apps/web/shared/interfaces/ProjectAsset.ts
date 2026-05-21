export type ProjectEnvironment = {
  name: string;
  url: string;
};

export type ProjectAsset = {
  id: number;
  name: string;
  repoUrl?: string;
  environments: ProjectEnvironment[];
  author: string;
  otherInfo: string;
  description: string;
  tags?: string[];
  sortOrder?: number;
};
