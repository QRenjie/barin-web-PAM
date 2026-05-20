import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import { ProjectCrudActions } from './ProjectCrudActions';
import { projectAssetTheme } from './projectAssetTheme';
import { formatShortUrl } from './projectAssetUtils';

type ProjectDetailCardProps = {
  project: ProjectAsset;
  tt: HomeI18nInterface;
  canManage?: boolean;
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
        strokeWidth={1.8}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
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
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
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
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

const linkChipBase =
  'inline-flex items-center gap-1 transition text-xs md:text-sm font-medium px-2 py-1 rounded-md break-all';

export function ProjectDetailCard({
  project,
  tt,
  canManage,
  onEdit,
  onDelete
}: ProjectDetailCardProps) {
  const tagBadges =
    project.tags && project.tags.length > 0 ? (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {project.tags.map((t) => (
          <span key={t} className={projectAssetTheme.tag}>
            {t}
          </span>
        ))}
      </div>
    ) : null;

  return (
    <div className="project-asset-card project-asset-card-root relative backdrop-blur-sm rounded-xl md:rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200">
      {canManage && onEdit && onDelete && (
        <ProjectCrudActions
          projectId={project.id}
          onEdit={onEdit}
          onDelete={onDelete}
          editTitle={tt.actionEdit}
          deleteTitle={tt.actionDelete}
        />
      )}
      <div className="p-3 md:p-5 pb-2 md:pb-3 border-b border-c-border">
        <div className="flex justify-between items-start gap-1">
          <h3 className="text-base md:text-xl font-bold text-primary-text leading-tight pr-12">
            {project.name}
          </h3>
          <span className={projectAssetTheme.idBadge}>#{project.id}</span>
        </div>
        <div className="flex items-center gap-1 mt-1.5 text-xs md:text-sm text-secondary-text">
          <UserIcon className="w-3 h-3 md:w-4 md:h-4" />
          <span className="font-medium">{project.author}</span>
        </div>
        <p className="text-xs md:text-sm text-secondary-text mt-1.5 leading-relaxed">
          📋 {project.description}
        </p>
        {tagBadges}
      </div>

      <div className="px-3 md:px-5 pt-2 pb-2 space-y-2 flex-1">
        <div>
          <div className="text-[10px] md:text-xs font-semibold text-secondary-text mb-0.5">
            📂 {tt.repoLabel}
          </div>
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkChipBase} project-asset-link-repo`}
            >
              <CodeIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">
                {formatShortUrl(project.repoUrl, 40)}
              </span>
            </a>
          ) : (
            <span className="text-tertiary-text text-xs">🔗 {tt.noRepo}</span>
          )}
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2">
          <div className="project-asset-env-box-test rounded-lg p-1.5 md:p-2">
            <div className="text-[10px] md:text-xs font-medium text-secondary-text mb-0.5">
              🧪 {tt.testLabel}
            </div>
            {project.testUrl ? (
              <a
                href={project.testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkChipBase} project-asset-link-test`}
              >
                <CheckCircleIcon className="w-3 h-3" />
                <span className="truncate">
                  {formatShortUrl(project.testUrl, 30)}
                </span>
              </a>
            ) : (
              <span className="text-tertiary-text text-xs">
                🚧 {tt.notConfigured}
              </span>
            )}
          </div>
          <div className="project-asset-env-box-prod rounded-lg p-1.5 md:p-2">
            <div className="text-[10px] md:text-xs font-medium text-brand mb-0.5">
              🚀 {tt.prodLabel}
            </div>
            {project.prodUrl ? (
              <a
                href={project.prodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkChipBase} project-asset-link-prod`}
              >
                <CheckIcon className="w-3 h-3" />
                <span className="truncate">
                  {formatShortUrl(project.prodUrl, 30)}
                </span>
              </a>
            ) : (
              <span className="text-tertiary-text text-xs">
                🔒 {tt.notConfigured}
              </span>
            )}
          </div>
        </div>

        <div className="mt-1 pt-1.5 border-t border-c-border project-asset-muted-box rounded-lg p-2 text-[10px] md:text-xs leading-relaxed text-secondary-text">
          📌 {project.otherInfo}
        </div>
      </div>

      <div className="px-3 md:px-5 pb-3 pt-0 text-right text-[10px] text-tertiary-text">
        🔗 {tt.linkHint}
      </div>
    </div>
  );
}
