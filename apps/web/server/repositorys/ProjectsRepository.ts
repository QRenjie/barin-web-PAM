import { inject, injectable } from '@shared/container';
import { I } from '@config/ioc-identifiter';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import {
  PROJECT_LIST_FIELDS,
  projectRowSchema,
  type ProjectRow
} from '@schemas/ProjectSchema';
import type { ProjectsRepositoryInterface } from '@server/interfaces/ProjectsRepositoryInterface';
import { projectRowToAsset } from '@server/utils/projectRowMapper';
import { BaseRepo } from './BaseRepo';
import type { LoggerInterface } from '@qlover/logger';

const TABLE = 'projects';

@injectable()
export class ProjectsRepository
  extends BaseRepo
  implements ProjectsRepositoryInterface
{
  @inject(I.Logger)
  protected logger!: LoggerInterface;

  constructor() {
    super(TABLE);
  }

  /**
   * @override
   */
  public async listAll(): Promise<ProjectAsset[]> {
    try {
      const result = await this.supabaseBridge.get({
        table: TABLE,
        fields: PROJECT_LIST_FIELDS.join(','),
        orderBy: ['sort_order', 0]
      });
      const rows = (result.data ?? []) as ProjectRow[];
      return rows
        .map((row) => projectRowSchema.safeParse(row))
        .filter((p) => p.success)
        .map((p) => projectRowToAsset(p.data));
    } catch (error) {
      this.logger.warn('projects list failed', error);
      return [];
    }
  }
}
