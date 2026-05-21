import { inject, injectable } from '@shared/container';
import { I } from '@config/ioc-identifiter';
import {
  PROJECT_LIST_FIELDS,
  projectRowSchema,
  type ProjectRow,
  type ProjectUpsertInput
} from '@schemas/ProjectSchema';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import type { ProjectsRepositoryInterface } from '@server/interfaces/ProjectsRepositoryInterface';
import {
  projectRowToAsset,
  projectUpsertToRow
} from '@server/utils/projectRowMapper';
import { BaseRepo } from './BaseRepo';
import type { LoggerInterface } from '@qlover/logger';

const TABLE = 'projects';
const SELECT_FIELDS = PROJECT_LIST_FIELDS.join(',');

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

  private parseRows(rows: ProjectRow[]): ProjectAsset[] {
    return rows
      .map((row) => projectRowSchema.safeParse(row))
      .filter((p) => p.success)
      .map((p) => projectRowToAsset(p.data));
  }

  private async nextSortOrder(): Promise<number> {
    const items = await this.listAll();
    if (items.length === 0) return 1;
    const orders = items.map((p) => p.sortOrder ?? p.id);
    return Math.max(...orders) + 1;
  }

  /**
   * @override
   */
  public async listAll(): Promise<ProjectAsset[]> {
    try {
      const result = await this.supabaseBridge.get({
        table: TABLE,
        fields: SELECT_FIELDS,
        orderBy: ['sort_order', 0]
      });
      return this.parseRows((result.data ?? []) as ProjectRow[]);
    } catch (error) {
      this.logger.warn('projects list failed', error);
      return [];
    }
  }

  /**
   * @override
   */
  public async create(input: ProjectUpsertInput): Promise<ProjectAsset> {
    const sortOrder = await this.nextSortOrder();
    const supabase = await this.getSupabase();
    const res = await supabase
      .from(TABLE)
      .insert(projectUpsertToRow(input, sortOrder))
      .select(SELECT_FIELDS)
      .single();
    if (res.error) {
      throw new Error(res.error.message);
    }
    const parsed = projectRowSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error('Invalid project row returned from database');
    }
    return projectRowToAsset(parsed.data);
  }

  /**
   * @override
   */
  public async update(
    id: number,
    input: ProjectUpsertInput
  ): Promise<ProjectAsset> {
    const supabase = await this.getSupabase();
    const res = await supabase
      .from(TABLE)
      .update(projectUpsertToRow(input))
      .eq('id', id)
      .select(SELECT_FIELDS)
      .single();
    if (res.error) {
      throw new Error(res.error.message);
    }
    const parsed = projectRowSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error('Invalid project row returned from database');
    }
    return projectRowToAsset(parsed.data);
  }

  /**
   * @override
   */
  public async delete(id: number): Promise<void> {
    const supabase = await this.getSupabase();
    const res = await supabase.from(TABLE).delete().eq('id', id);
    if (res.error) {
      throw new Error(res.error.message);
    }
  }
}
