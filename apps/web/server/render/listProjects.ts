import type { ProjectAsset } from '@interfaces/ProjectAsset';
import { BootstrapServer } from '@server/BootstrapServer';
import { ProjectsController } from '@server/controllers/ProjectsController';

/** Load project assets from Supabase (empty array when table is empty or query fails). */
export async function listProjects(): Promise<ProjectAsset[]> {
  try {
    const ioc = new BootstrapServer('list-projects').getIOC();
    return await ioc(ProjectsController).list();
  } catch (error) {
    console.warn('listProjects failed', error);
    return [];
  }
}
