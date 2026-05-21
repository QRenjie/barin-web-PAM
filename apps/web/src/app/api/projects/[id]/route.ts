import { ProjectsController } from '@server/controllers/ProjectsController';
import { NextApiServer } from '@server/NextApiServer';
import { ServerAuthPlugin } from '@server/plugins/ServerAuthPlugin';
import type { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

function parseId(raw: string): number {
  const id = Number.parseInt(raw, 10);
  if (!Number.isFinite(id) || id < 1) {
    throw new Error('Invalid project id');
  }
  return id;
}

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Update project (requires auth)
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Delete project (requires auth)
 */
export async function PUT(req: NextRequest, context: RouteContext) {
  const { id: idRaw } = await context.params;
  const id = parseId(idRaw);
  const body = await req.json();
  return new NextApiServer(`/api/projects/${id}`, req)
    .use(new ServerAuthPlugin())
    .runWithJson(async ({ parameters: { IOC } }) =>
      IOC(ProjectsController).update(id, body)
    );
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { id: idRaw } = await context.params;
  const id = parseId(idRaw);
  return new NextApiServer(`/api/projects/${id}`, req)
    .use(new ServerAuthPlugin())
    .runWithJson(async ({ parameters: { IOC } }) => {
      await IOC(ProjectsController).remove(id);
      return { ok: true };
    });
}
