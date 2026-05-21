import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import { hasContent } from './projectAssetDisplayUtils';
import { projectAssetTheme } from './projectAssetTheme';
import { ProjectCrudActions } from './ProjectCrudActions';
import { ProjectUrlLinkChip } from './ProjectUrlLinkChip';

type ProjectDetailCardProps = {
  project: ProjectAsset;
  tt: HomeI18nInterface;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
      data-testid="CodeIcon"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      data-testid="UserIcon"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      data-testid="LinkIcon"
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}

const sectionLabel =
  'text-[10px] md:text-xs font-semibold text-secondary-text mb-1';

export function ProjectDetailCard({
  project,
  tt,
  onEdit,
  onDelete
}: ProjectDetailCardProps) {
  const environments = project.environments ?? [];
  const hasRepo = hasContent(project.repoUrl);
  const hasEnvs = environments.length > 0;
  const hasLinks = hasRepo || hasEnvs;
  const hasDescription = hasContent(project.description);
  const hasOtherInfo = hasContent(project.otherInfo);
  const hasTags = (project.tags?.length ?? 0) > 0;
  const hasBody = hasLinks || hasOtherInfo;

  return (
    <div
      data-testid="ProjectDetailCard"
      className="project-asset-card project-asset-card-root relative backdrop-blur-sm rounded-xl md:rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200"
    >
      {onEdit && onDelete && (
        <ProjectCrudActions
          projectId={project.id}
          onEdit={onEdit}
          onDelete={onDelete}
          editTitle={tt.actionEdit}
          deleteTitle={tt.actionDelete}
        />
      )}

      <div
        className={`p-3 md:p-5 ${hasBody ? 'pb-2 md:pb-3 border-b border-c-border' : 'pb-3 md:pb-5'}`}
      >
        <div className="flex justify-between items-start gap-1">
          <h3 className="text-base md:text-xl font-bold text-primary-text leading-tight pr-12">
            {project.name}
          </h3>
          <span className={projectAssetTheme.idBadge}>#{project.id}</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5 text-xs md:text-sm text-secondary-text">
          <UserIcon className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
          <span className="font-medium">{project.author}</span>
        </div>
        {hasDescription && (
          <p className="text-xs md:text-sm text-secondary-text mt-1.5 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        )}
        {hasTags && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {project.tags!.map((t) => (
              <span
                data-testid="ProjectDetailCard"
                key={t}
                className={projectAssetTheme.tag}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {hasBody && (
        <div className="px-3 md:px-5 py-2 md:py-3 space-y-3 flex-1 min-w-0">
          {hasLinks && (
            <div className="space-y-2.5">
              {hasRepo && (
                <div className="min-w-0">
                  <div className={sectionLabel}>📂 {tt.repoLabel}</div>
                  <ProjectUrlLinkChip
                    href={project.repoUrl!}
                    className="project-asset-link-repo"
                    icon={<CodeIcon className="w-3 h-3 shrink-0" />}
                  />
                </div>
              )}

              {hasEnvs && (
                <div>
                  <div className={sectionLabel}>🌐 {tt.environmentsLabel}</div>
                  <div className="project-asset-env-grid">
                    {environments.map((env) => (
                      <div
                        data-testid="ProjectDetailCard"
                        key={`${env.name}-${env.url}`}
                        className="project-asset-env-item min-w-0"
                      >
                        <span className="project-asset-env-name">
                          {env.name}
                        </span>
                        <ProjectUrlLinkChip
                          href={env.url}
                          className="project-asset-link-test"
                          icon={<LinkIcon className="w-3 h-3 shrink-0" />}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {hasOtherInfo && (
            <p className="text-[10px] md:text-xs leading-relaxed text-tertiary-text border-t border-c-border pt-2 line-clamp-4">
              {project.otherInfo}
            </p>
          )}
        </div>
      )}

      {hasLinks && (
        <div className="px-3 md:px-5 pb-3 pt-0 text-right text-[10px] text-tertiary-text">
          🔗 {tt.linkHint}
        </div>
      )}
    </div>
  );
}
