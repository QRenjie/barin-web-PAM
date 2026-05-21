import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import { ProjectCrudActions } from './ProjectCrudActions';
import { hasContent } from './projectAssetDisplayUtils';
import { projectAssetTheme } from './projectAssetTheme';

type ProjectCompactItemProps = {
  project: ProjectAsset;
  tt: HomeI18nInterface;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

function CodeIcon({ className }: { className?: string }) {
  return (
    <svg
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
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
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

const linkPill =
  'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition min-w-0 max-w-full';

export function ProjectCompactItem({
  project,
  tt,
  onEdit,
  onDelete
}: ProjectCompactItemProps) {
  const environments = project.environments ?? [];
  const hasRepo = hasContent(project.repoUrl);
  const hasEnvs = environments.length > 0;
  const hasLinks = hasRepo || hasEnvs;
  const hasDescription = hasContent(project.description);
  const hasOtherInfo = hasContent(project.otherInfo);
  const hasTags = (project.tags?.length ?? 0) > 0;
  const metaLine = hasDescription || hasOtherInfo || hasTags;

  return (
    <div className="project-asset-compact project-asset-card-root relative backdrop-blur-sm rounded-xl shadow-sm p-3 md:px-4 md:py-3.5 transition">
      {onEdit && onDelete && (
        <ProjectCrudActions
          projectId={project.id}
          onEdit={onEdit}
          onDelete={onDelete}
          editTitle={tt.actionEdit}
          deleteTitle={tt.actionDelete}
          compact
        />
      )}

      <div className="flex flex-col gap-2 pr-12 md:pr-14 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h3 className="text-sm md:text-base font-bold text-primary-text truncate">
              {project.name}
            </h3>
            <span className={`${projectAssetTheme.idBadge} shrink-0`}>
              #{project.id}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-secondary-text shrink-0">
            <UserIcon className="w-3 h-3" />
            <span className="max-w-32 truncate">{project.author}</span>
          </div>
        </div>

        {metaLine && (
          <div className="flex flex-col gap-1 min-w-0">
            {hasDescription && (
              <p className="text-[11px] md:text-xs text-tertiary-text line-clamp-2 leading-snug">
                {project.description}
              </p>
            )}
            {hasOtherInfo && (
              <p className="text-[10px] text-tertiary-text/90 line-clamp-1">
                {project.otherInfo}
              </p>
            )}
            {hasTags && (
              <div className="flex flex-wrap gap-1">
                {project.tags!.map((t) => (
                  <span key={t} className={projectAssetTheme.tagSm}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {hasLinks && (
          <div className="project-asset-compact-links">
            {hasRepo && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkPill} project-asset-btn-chip`}
                title={project.repoUrl}
              >
                <CodeIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{tt.btnRepo}</span>
              </a>
            )}
            {environments.map((env) => (
              <a
                key={`${env.name}-${env.url}`}
                href={env.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkPill} project-asset-link-test`}
                title={env.url}
              >
                <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="uppercase tracking-wide">{env.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
