import { inject, injectable } from '@shared/container';
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
}
