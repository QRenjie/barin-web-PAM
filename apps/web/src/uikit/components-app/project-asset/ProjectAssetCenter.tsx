'use client';

import { Button, Modal, message } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { usePageI18nMapping } from '@/uikit/context/PageI18nContext';
import { useUserAuth } from '@/uikit/hook/useUserAuth';
import type { HomeI18nInterface } from '@config/i18n-mapping/HomeI18n';
import type { ProjectAsset } from '@interfaces/ProjectAsset';
import type { ProjectUpsertInput } from '@schemas/ProjectSchema';
import { ROUTE_LOGIN } from '@config/route';
import { useLocale } from 'next-intl';
import { ProjectCompactItem } from './ProjectCompactItem';
import { ProjectDetailCard } from './ProjectDetailCard';
import { ProjectFormModal } from './ProjectFormModal';
import {
  createProject,
  deleteProject,
  updateProject
} from './projectsClient';
import { filterProjects } from './projectAssetUtils';
import { projectAssetTheme } from './projectAssetTheme';
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

function PlusIcon({ className }: { className?: string }) {
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
        strokeWidth={2}
        d="M12 4v16m8-8H4"
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

export function ProjectAssetCenter({
  projects: initialProjects
}: ProjectAssetCenterProps) {
  const tt = usePageI18nMapping<HomeI18nInterface>();
  const locale = useLocale();
  const { user, loading: authLoading } = useUserAuth();
  const canManage = !authLoading && !!user;

  const [projects, setProjects] = useState(initialProjects);
  const [view, setView] = useState<ViewMode>('card');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectAsset | null>(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(
    () => filterProjects(projects, search),
    [projects, search]
  );

  const isCatalogEmpty = projects.length === 0;
  const isFilterEmpty = !isCatalogEmpty && filtered.length === 0;

  const resetSearch = useCallback(() => setSearch(''), []);

  const requireAuth = useCallback(() => {
    message.warning(tt.crudLoginRequired);
    window.location.href = `/${locale}${ROUTE_LOGIN}`;
  }, [locale, message, tt.crudLoginRequired]);

  const openAdd = useCallback(() => {
    if (!canManage) {
      requireAuth();
      return;
    }
    setEditing(null);
    setModalOpen(true);
  }, [canManage, requireAuth]);

  const openEdit = useCallback(
    (id: number) => {
      if (!canManage) {
        requireAuth();
        return;
      }
      const project = projects.find((p) => p.id === id);
      if (project) {
        setEditing(project);
        setModalOpen(true);
      }
    },
    [canManage, projects, requireAuth]
  );

  const handleDelete = useCallback(
    (id: number) => {
      if (!canManage) {
        requireAuth();
        return;
      }
      Modal.confirm({
        title: tt.confirmDelete,
        okType: 'danger',
        centered: true,
        onOk: async () => {
          try {
            await deleteProject(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
          } catch {
            message.error(tt.operationFailed);
          }
        }
      });
    },
    [canManage, message, requireAuth, tt]
  );

  const handleSubmit = useCallback(
    async (input: ProjectUpsertInput) => {
      setSaving(true);
      try {
        if (editing) {
          const updated = await updateProject(editing.id, input);
          setProjects((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p))
          );
        } else {
          const created = await createProject(input);
          setProjects((prev) => [...prev, created]);
        }
        setModalOpen(false);
        setEditing(null);
        message.success(tt.modalSave);
      } catch {
        message.error(tt.operationFailed);
      } finally {
        setSaving(false);
      }
    },
    [editing, message, tt]
  );

  const crudProps = { onEdit: openEdit, onDelete: handleDelete };

  return (
    <div data-testid="ProjectAssetCenter" className={projectAssetTheme.page}>
      <div className="max-w-7xl mx-auto flex flex-1 flex-col w-full px-4 sm:px-5 lg:px-8 py-5 md:py-10">
        <div className="mb-6 md:mb-8 flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-end">
          <div className="w-full">
            <div className={projectAssetTheme.badge}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span className={projectAssetTheme.badgeText}>{tt.assetBadge}</span>
            </div>
            <h1 className={projectAssetTheme.heading}>{tt.assetHeading}</h1>
            <p className={projectAssetTheme.subtitle}>{tt.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className={projectAssetTheme.statPanel}>
              <div className="text-left">
                <div className={projectAssetTheme.statLabel}>{tt.totalCount}</div>
                <div className={projectAssetTheme.statValue}>{projects.length}</div>
              </div>
              <div className={projectAssetTheme.statDivider} />
              <div className="text-left">
                <div className={projectAssetTheme.statLabel}>
                  {tt.filteredCount}
                </div>
                <div className={projectAssetTheme.statValueAccent}>
                  {filtered.length}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className={projectAssetTheme.viewToggleWrap}>
                <button
                  type="button"
                  onClick={() => setView('card')}
                  className={`${projectAssetTheme.viewBtnBase} ${
                    view === 'card'
                      ? projectAssetTheme.viewBtnActive
                      : projectAssetTheme.viewBtnInactive
                  }`}
                >
                  <GridIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{tt.viewCard}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setView('compact')}
                  className={`${projectAssetTheme.viewBtnBase} ${
                    view === 'compact'
                      ? projectAssetTheme.viewBtnActive
                      : projectAssetTheme.viewBtnInactive
                  }`}
                >
                  <ListIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{tt.viewCompact}</span>
                </button>
              </div>
              <Button
                type="primary"
                data-testid="AddProjectBtn"
                onClick={openAdd}
                className="flex items-center gap-1 !rounded-xl"
                icon={<PlusIcon className="w-4 h-4" />}
              >
                <span className="hidden min-[480px]:inline">{tt.addProject}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-tertiary-text" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tt.searchPlaceholder}
              className={projectAssetTheme.searchInput}
            />
          </div>
          <div className={projectAssetTheme.searchHint}>
            <span>{tt.searchHint}</span>
          </div>
        </div>

        {isCatalogEmpty || isFilterEmpty ? (
          <div data-testid="ProjectAssetEmpty" className={projectAssetTheme.emptyPanel}>
            <div className={projectAssetTheme.emptyIconWrap}>
              <EmptyIcon className={projectAssetTheme.emptyIcon} />
            </div>
            <p className={projectAssetTheme.emptyTitle}>
              {isCatalogEmpty ? tt.emptyCatalogTitle : tt.emptyTitle}
            </p>
            <p className={projectAssetTheme.emptyDesc}>
              {isCatalogEmpty ? tt.emptyCatalogDesc : tt.emptyDesc}
            </p>
            {isFilterEmpty && (
              <button
                type="button"
                onClick={resetSearch}
                className={projectAssetTheme.clearFilterBtn}
              >
                {tt.clearFilter}
              </button>
            )}
            {isCatalogEmpty && canManage && (
              <Button type="primary" onClick={openAdd} className="mt-3 !rounded-full">
                {tt.addProject}
              </Button>
            )}
          </div>
        ) : view === 'card' ? (
          <div
            data-testid="ProjectAssetCards"
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 auto-rows-fr"
          >
            {filtered.map((project) => (
              <div key={project.id} className="project-asset-fade-in min-w-0">
                <ProjectDetailCard project={project} tt={tt} {...crudProps} />
              </div>
            ))}
          </div>
        ) : (
          <div data-testid="ProjectAssetCompactList" className="space-y-3">
            {filtered.map((project) => (
              <div key={project.id} className="project-asset-fade-in">
                <ProjectCompactItem project={project} tt={tt} {...crudProps} />
              </div>
            ))}
          </div>
        )}

        <footer className={projectAssetTheme.footer}>
          <span>{tt.footerCrud}</span>
        </footer>
      </div>

      <ProjectFormModal
        open={modalOpen}
        editing={editing}
        tt={tt}
        saving={saving}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
