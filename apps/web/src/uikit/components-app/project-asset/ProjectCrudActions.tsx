'use client';

import { projectAssetTheme } from './projectAssetTheme';

type ProjectCrudActionsProps = {
  projectId: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  editTitle: string;
  deleteTitle: string;
  compact?: boolean;
};

function EditIcon({ className }: { className?: string }) {
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
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
  );
}

function DeleteIcon({ className }: { className?: string }) {
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
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

export function ProjectCrudActions({
  projectId,
  onEdit,
  onDelete,
  editTitle,
  deleteTitle,
  compact = false
}: ProjectCrudActionsProps) {
  const btnClass = compact
    ? projectAssetTheme.crudBtnCompact
    : projectAssetTheme.crudBtn;

  return (
    <div className="absolute top-2 right-2 flex gap-1 z-10">
      <button
        type="button"
        title={editTitle}
        className={btnClass}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(projectId);
        }}
      >
        <EditIcon className="w-3.5 h-3.5 text-secondary-text" />
      </button>
      <button
        type="button"
        title={deleteTitle}
        className={`${btnClass} hover:!bg-[rgb(var(--fe-color-error)/0.12)]`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(projectId);
        }}
      >
        <DeleteIcon className="w-3.5 h-3.5 text-[var(--fe-color-error)]" />
      </button>
    </div>
  );
}
