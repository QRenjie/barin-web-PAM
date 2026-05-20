/** Shared Tailwind classes aligned with app theme tokens (light / dark / pink). */
export const projectAssetTheme = {
  page: 'bg-primary text-primary-text min-h-full',
  badge:
    'inline-flex items-center gap-2 project-asset-surface backdrop-blur-sm rounded-full px-3 py-1 shadow-sm mb-3',
  badgeText: 'text-[11px] md:text-xs font-medium text-secondary-text tracking-wide',
  heading: 'text-2xl md:text-4xl font-bold tracking-tight text-primary-text',
  subtitle: 'text-secondary-text mt-1 max-w-xl text-xs md:text-sm',
  statPanel:
    'project-asset-surface backdrop-blur-sm rounded-2xl px-4 py-1.5 shadow-sm flex items-center gap-3',
  statLabel: 'text-[10px] md:text-xs text-secondary-text font-medium',
  statValue: 'text-xl md:text-2xl font-bold text-primary-text',
  statValueAccent: 'text-xl md:text-2xl font-bold text-brand',
  statDivider: 'h-6 w-px bg-c-border',
  viewToggleWrap:
    'flex project-asset-surface backdrop-blur-sm rounded-xl p-0.5 shadow-sm',
  viewBtnActive:
    'bg-elevated text-brand shadow-sm',
  viewBtnInactive:
    'text-secondary-text hover:bg-elevated hover:text-primary-text',
  viewBtnBase:
    'flex items-center gap-1 px-3 py-1.5 text-xs md:text-sm font-medium rounded-lg transition-all duration-200',
  searchInput:
    'block w-full pl-9 pr-3 py-2.5 border border-primary-border rounded-xl bg-bg-container shadow-sm focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all text-sm text-primary-text placeholder:text-tertiary-text outline-none',
  searchHint:
    'text-[11px] text-tertiary-text project-asset-surface px-3 py-1.5 rounded-full inline-flex items-center justify-center gap-1 whitespace-nowrap',
  emptyPanel:
    'text-center py-12 flex flex-col items-center justify-center project-asset-surface rounded-2xl backdrop-blur-sm',
  emptyIconWrap: 'bg-elevated rounded-full p-3 mb-2',
  emptyIcon: 'h-8 w-8 text-tertiary-text',
  emptyTitle: 'text-secondary-text font-medium',
  emptyDesc: 'text-tertiary-text text-xs mt-1',
  clearFilterBtn:
    'mt-3 text-sm text-brand bg-brand/10 px-4 py-1.5 rounded-full hover:bg-brand/20 transition',
  tag:
    'text-[10px] md:text-xs font-medium bg-elevated text-secondary-text px-2 py-0.5 rounded-full',
  tagSm:
    'text-[9px] bg-elevated text-secondary-text px-1.5 py-0.5 rounded-full',
  footer: 'mt-12 pt-5 border-t border-c-border text-center text-[10px] md:text-xs text-tertiary-text',
  idBadge:
    'bg-elevated rounded-full px-1.5 py-0.5 text-[10px] md:text-xs text-tertiary-text shrink-0',
  crudBtn:
    'p-1.5 bg-secondary border border-c-border rounded-full shadow-sm hover:bg-elevated transition',
  crudBtnCompact:
    'p-1 bg-secondary border border-c-border rounded-full shadow-sm hover:bg-elevated transition'
} as const;
