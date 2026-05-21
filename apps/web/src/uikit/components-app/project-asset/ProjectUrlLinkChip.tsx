'use client';

import { Tooltip } from 'antd';
import { formatShortUrl } from './projectAssetUtils';
import type { ReactNode } from 'react';

const linkChipBase =
  'flex max-w-full min-w-0 items-center gap-1 transition text-xs md:text-sm font-medium px-2 py-1 rounded-md overflow-hidden';

type ProjectUrlLinkChipProps = {
  href: string;
  className: string;
  icon: ReactNode;
};

export function ProjectUrlLinkChip({
  href,
  className,
  icon
}: ProjectUrlLinkChipProps) {
  const label = formatShortUrl(href);

  return (
    <Tooltip title={href} placement="top" mouseEnterDelay={0.3}>
      <span className="block w-full min-w-0 max-w-full">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkChipBase} w-full ${className}`}
        >
          {icon}
          <span className="truncate min-w-0 flex-1">{label}</span>
        </a>
      </span>
    </Tooltip>
  );
}
