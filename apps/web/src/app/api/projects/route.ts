import { API_PROJECTS } from '@config/apiRoutes';
import { NextApiServer } from '@server/NextApiServer';
import { ProjectsController } from '@server/controllers/ProjectsController';
import type { NextRequest } from 'next/server';

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: List project assets
 *     description: |
 *       Public catalog of company projects (repo, test/prod URLs, owner, tags).
 *       Data is stored in Supabase table `projects` with public SELECT RLS.
 *     responses:
 *       200:
 *         description: Success envelope; `data` is ProjectAsset[].
 */
export async function GET(req: NextRequest) {
  return new NextApiServer(API_PROJECTS, req).runWithJson(
    async ({ parameters: { IOC } }) => IOC(ProjectsController).list()
  );
}
