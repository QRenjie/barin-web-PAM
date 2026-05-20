export type ProjectAsset = {
  id: number;
  name: string;
  repoUrl?: string;
  testUrl?: string;
  prodUrl?: string;
  author: string;
  otherInfo: string;
  description: string;
  tags?: string[];
};
