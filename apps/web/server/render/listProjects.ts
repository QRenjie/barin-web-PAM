import { mockProjects } from '@shared/data/mockProjects';
import { BootstrapServer } from '@server/BootstrapServer';
import { ProjectsController } from '@server/controllers/ProjectsController';
import type { ProjectAsset } from '@interfaces/ProjectAsset';

/**
 * Load project assets from Supabase. Falls back to mock data when the table
 * is missing, RLS blocks access, or the query fails.
 */
export async function listProjects(): Promise<ProjectAsset[]> {
  try {
    const ioc = new BootstrapServer('list-projects').getIOC();
    const items = await ioc(ProjectsController).list();
    if (items.length > 0) {
      return items;
    }
  } catch (error) {
    console.warn('listProjects: Supabase unavailable, using mock data', error);
  }
  return mockProjects;
}
