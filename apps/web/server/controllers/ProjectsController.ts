import { inject, injectable } from '@shared/container';
import { projectUpsertSchema } from '@schemas/ProjectSchema';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import type { ProjectsControllerInterface } from '@server/interfaces/ProjectsControllerInterface';
import type { ProjectsRepositoryInterface } from '@server/interfaces/ProjectsRepositoryInterface';
import { ProjectsRepository } from '@server/repositorys/ProjectsRepository';

@injectable()
export class ProjectsController implements ProjectsControllerInterface {
  constructor(
    @inject(ProjectsRepository)
    protected projectsRepository: ProjectsRepositoryInterface
  ) {}

  /**
   * @override
   */
  public async list(): Promise<ProjectAsset[]> {
    return this.projectsRepository.listAll();
  }

  /**
   * @override
   */
  public async create(body: unknown): Promise<ProjectAsset> {
    const input = projectUpsertSchema.parse(body);
    return this.projectsRepository.create(input);
  }

  /**
   * @override
   */
  public async update(id: number, body: unknown): Promise<ProjectAsset> {
    if (!Number.isFinite(id) || id < 1) {
      throw new Error('Invalid project id');
    }
    const input = projectUpsertSchema.parse(body);
    return this.projectsRepository.update(id, input);
  }

  /**
   * @override
   */
  public async remove(id: number): Promise<void> {
    if (!Number.isFinite(id) || id < 1) {
      throw new Error('Invalid project id');
    }
    await this.projectsRepository.delete(id);
  }
}
