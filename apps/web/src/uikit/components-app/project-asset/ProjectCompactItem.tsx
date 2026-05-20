import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset } from '@interfaces/ProjectAsset';

type ProjectCompactItemProps = {
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
        strokeWidth={1.5}
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

export function ProjectCompactItem({ project, tt }: ProjectCompactItemProps) {
  const shortInfo =
    project.otherInfo.length > 60
      ? `${project.otherInfo.substring(0, 60)}…`
      : project.otherInfo;

  const repoButton = project.repoUrl ? (
    <a
      href={project.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 md:gap-1.5 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 bg-indigo-50/70 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/60 py-1.5 rounded-lg text-xs md:text-sm transition w-full"
    >
      <CodeIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
      <span className="hidden sm:inline">{tt.btnRepo}</span>
    </a>
  ) : (
    <span className="flex items-center justify-center gap-1 text-gray-400 bg-gray-100 dark:bg-gray-800 py-1.5 rounded-lg text-xs w-full">
      <CodeIcon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{tt.noRepo}</span>
    </span>
  );

  const testButton = project.testUrl ? (
    <a
      href={project.testUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 md:gap-1.5 text-amber-600 hover:text-amber-800 dark:text-amber-400 bg-amber-50/70 hover:bg-amber-100 dark:bg-amber-950/40 py-1.5 rounded-lg text-xs md:text-sm transition w-full"
    >
      <CheckCircleIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
      <span className="hidden sm:inline">{tt.btnTest}</span>
    </a>
  ) : (
    <span className="flex items-center justify-center gap-1 text-gray-400 bg-gray-100 dark:bg-gray-800 py-1.5 rounded-lg text-xs w-full">
      <CheckCircleIcon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{tt.noTest}</span>
    </span>
  );

  const prodButton = project.prodUrl ? (
    <a
      href={project.prodUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 md:gap-1.5 text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 bg-emerald-50/70 hover:bg-emerald-100 dark:bg-emerald-950/40 py-1.5 rounded-lg text-xs md:text-sm transition w-full"
    >
      <CheckIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
      <span className="hidden sm:inline">{tt.btnProd}</span>
    </a>
  ) : (
    <span className="flex items-center justify-center gap-1 text-gray-400 bg-gray-100 dark:bg-gray-800 py-1.5 rounded-lg text-xs w-full">
      <CheckIcon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{tt.notConfigured}</span>
    </span>
  );

  return (
    <div className="project-asset-compact bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-3 md:p-4 transition">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm md:text-base font-bold text-gray-800 dark:text-gray-100">
              {project.name}
            </h3>
            <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded-full">
              #{project.id}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <UserIcon className="w-3 h-3" />
            <span>{project.author}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-0 sm:hidden">
          {project.tags?.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[9px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded-full"
            >
              {t}
            </span>
          ))}
          <span className="text-[10px] text-gray-400 truncate">{shortInfo}</span>
        </div>

        <div className="hidden sm:block text-[11px] text-gray-400 truncate">
          📄{' '}
          {project.description.length > 80
            ? `${project.description.substring(0, 80)}…`
            : project.description}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-1">
          {repoButton}
          {testButton}
          {prodButton}
        </div>
      </div>
    </div>
  );
}
