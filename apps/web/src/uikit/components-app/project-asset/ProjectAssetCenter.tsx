'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePageI18nMapping } from '@/uikit/context/PageI18nContext';
import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import { ProjectCompactItem } from './ProjectCompactItem';
import { ProjectDetailCard } from './ProjectDetailCard';
import { filterProjects } from './projectAssetUtils';
import './project-asset.css';

type ViewMode = 'card' | 'compact';

export type ProjectAssetCenterProps = {
  projects: ProjectAsset[];
};

function GridIcon({ className }: { className?: string }) {
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
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

function EmptyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

const viewBtnActive =
  'bg-emerald-50 text-emerald-700 shadow-sm dark:bg-emerald-950/50 dark:text-emerald-400';
const viewBtnInactive =
  'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800';

export function ProjectAssetCenter({ projects }: ProjectAssetCenterProps) {
  const tt = usePageI18nMapping<HomeI18nInterface>();
  const [view, setView] = useState<ViewMode>('card');
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => filterProjects(projects, search),
    [projects, search]
  );

  const resetSearch = useCallback(() => setSearch(''), []);

  return (
    <div
      data-testid="ProjectAssetCenter"
      className="bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-5 md:py-10">
        <div className="mb-6 md:mb-8 flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-end">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-gray-200/80 dark:border-gray-700 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] md:text-xs font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                {tt.assetBadge}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400">
              {tt.assetHeading}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-xl text-xs md:text-sm">
              {tt.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl px-4 py-1.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div className="text-left">
                <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {tt.totalCount}
                </div>
                <div className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {projects.length}
                </div>
              </div>
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="text-left">
                <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {tt.filteredCount}
                </div>
                <div className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {filtered.length}
                </div>
              </div>
            </div>

            <div className="flex bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-0.5 shadow-sm">
              <button
                type="button"
                onClick={() => setView('card')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 ${
                  view === 'card' ? viewBtnActive : viewBtnInactive
                }`}
              >
                <GridIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{tt.viewCard}</span>
              </button>
              <button
                type="button"
                onClick={() => setView('compact')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 ${
                  view === 'compact' ? viewBtnActive : viewBtnInactive
                }`}
              >
                <ListIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>{tt.viewCompact}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tt.searchPlaceholder}
              className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/90 dark:bg-gray-900/90 shadow-sm focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
            />
          </div>
          <div className="text-[11px] text-gray-400 bg-white/50 dark:bg-gray-900/50 px-3 py-1.5 rounded-full inline-flex items-center justify-center gap-1 whitespace-nowrap">
            <span>{tt.searchHint}</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            data-testid="ProjectAssetEmpty"
            className="text-center py-12 flex flex-col items-center justify-center bg-white/40 dark:bg-gray-900/40 rounded-2xl backdrop-blur-sm"
          >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-3 mb-2">
              <EmptyIcon className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              {tt.emptyTitle}
            </p>
            <p className="text-gray-400 text-xs mt-1">{tt.emptyDesc}</p>
            <button
              type="button"
              onClick={resetSearch}
              className="mt-3 text-sm bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 px-4 py-1.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-950/70 transition"
            >
              {tt.clearFilter}
            </button>
          </div>
        ) : view === 'card' ? (
          <div
            data-testid="ProjectAssetCards"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr"
          >
            {filtered.map((project) => (
              <div key={project.id} className="project-asset-fade-in">
                <ProjectDetailCard project={project} tt={tt} />
              </div>
            ))}
          </div>
        ) : (
          <div
            data-testid="ProjectAssetCompactList"
            className="space-y-3"
          >
            {filtered.map((project) => (
              <div key={project.id} className="project-asset-fade-in">
                <ProjectCompactItem project={project} tt={tt} />
              </div>
            ))}
          </div>
        )}

        <footer className="mt-12 pt-5 border-t border-gray-200/60 dark:border-gray-700/60 text-center text-[10px] md:text-xs text-gray-400 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span>{tt.footer1}</span>
          <span>{tt.footer2}</span>
          <span>{tt.footer3}</span>
        </footer>
      </div>
    </div>
  );
}
