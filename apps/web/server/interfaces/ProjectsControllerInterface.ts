import type { ProjectAsset } from '@interfaces/ProjectAsset';

export interface ProjectsControllerInterface {
  list(): Promise<ProjectAsset[]>;
  create(body: unknown): Promise<ProjectAsset>;
  update(id: number, body: unknown): Promise<ProjectAsset>;
  remove(id: number): Promise<void>;
}
