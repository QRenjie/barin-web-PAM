import { API_PROJECTS } from '@config/apiRoutes';
import { NextApiServer } from '@server/NextApiServer';
import { ProjectsController } from '@server/controllers/ProjectsController';
import { ServerAuthPlugin } from '@server/plugins/ServerAuthPlugin';
import type { NextRequest } from 'next/server';

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: List project assets
 *   post:
 *     tags:
 *       - Projects
 *     summary: Create project (requires auth)
 */
export async function GET(req: NextRequest) {
  return new NextApiServer(API_PROJECTS, req).runWithJson(
    async ({ parameters: { IOC } }) => IOC(ProjectsController).list()
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return new NextApiServer(API_PROJECTS, req)
    .use(new ServerAuthPlugin())
    .runWithJson(async ({ parameters: { IOC } }) =>
      IOC(ProjectsController).create(body)
    );
}
