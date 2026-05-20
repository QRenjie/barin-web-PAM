import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import { formatShortUrl } from './projectAssetUtils';

type ProjectDetailCardProps = {
  project: ProjectAsset;
  tt: HomeI18nInterface;
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

export function ProjectDetailCard({ project, tt }: ProjectDetailCardProps) {
  const tagBadges =
    project.tags && project.tags.length > 0 ? (
      <div className="flex flex-wrap gap-1.5 mt-1">
        {project.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] md:text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full dark:bg-gray-800 dark:text-gray-300"
          >
            {t}
          </span>
        ))}
      </div>
    ) : null;

  return (
    <div className="project-asset-card bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-200/80 dark:border-gray-700/80 shadow-sm overflow-hidden flex flex-col h-full transition-all duration-200">
      <div className="p-3 md:p-5 pb-2 md:pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-start gap-1">
          <h3 className="text-base md:text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
            {project.name}
          </h3>
          <span className="bg-gray-50 dark:bg-gray-800 rounded-full px-1.5 py-0.5 text-[10px] md:text-xs text-gray-500 shrink-0">
            #{project.id}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1.5 text-xs md:text-sm text-gray-600 dark:text-gray-400">
          <UserIcon className="w-3 h-3 md:w-4 md:h-4" />
          <span className="font-medium">{project.author}</span>
        </div>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
          📋 {project.description}
        </p>
        {tagBadges}
      </div>

      <div className="px-3 md:px-5 pt-2 pb-2 space-y-2 flex-1">
        <div>
          <div className="text-[10px] md:text-xs font-semibold text-gray-500 dark:text-gray-400 mb-0.5">
            📂 {tt.repoLabel}
          </div>
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition text-xs md:text-sm font-medium bg-indigo-50/60 dark:bg-indigo-950/40 px-2 py-1 rounded-md break-all"
            >
              <CodeIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">
                {formatShortUrl(project.repoUrl, 40)}
              </span>
            </a>
          ) : (
            <span className="text-gray-400 text-xs">🔗 {tt.noRepo}</span>
          )}
        </div>

        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2">
          <div className="bg-amber-50/30 dark:bg-amber-950/20 rounded-lg p-1.5 md:p-2 border border-amber-100/50 dark:border-amber-900/40">
            <div className="text-[10px] md:text-xs font-medium text-amber-700 dark:text-amber-400 mb-0.5">
              🧪 {tt.testLabel}
            </div>
            {project.testUrl ? (
              <a
                href={project.testUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-800 dark:text-amber-400 text-xs md:text-sm bg-amber-50/60 dark:bg-amber-950/30 px-2 py-1 rounded-md break-all"
              >
                <CheckCircleIcon className="w-3 h-3" />
                <span className="truncate">
                  {formatShortUrl(project.testUrl, 30)}
                </span>
              </a>
            ) : (
              <span className="text-gray-400 text-xs">
                🚧 {tt.notConfigured}
              </span>
            )}
          </div>
          <div className="bg-emerald-50/30 dark:bg-emerald-950/20 rounded-lg p-1.5 md:p-2 border border-emerald-100/50 dark:border-emerald-900/40">
            <div className="text-[10px] md:text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-0.5">
              🚀 {tt.prodLabel}
            </div>
            {project.prodUrl ? (
              <a
                href={project.prodUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 text-xs md:text-sm bg-emerald-50/60 dark:bg-emerald-950/30 px-2 py-1 rounded-md break-all"
              >
                <CheckIcon className="w-3 h-3" />
                <span className="truncate">
                  {formatShortUrl(project.prodUrl, 30)}
                </span>
              </a>
            ) : (
              <span className="text-gray-400 text-xs">
                🔒 {tt.notConfigured}
              </span>
            )}
          </div>
        </div>

        <div className="mt-1 pt-1.5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-2 text-[10px] md:text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          📌 {project.otherInfo}
        </div>
      </div>

      <div className="px-3 md:px-5 pb-3 pt-0 text-right text-[10px] text-gray-400">
        🔗 {tt.linkHint}
      </div>
    </div>
  );
}
