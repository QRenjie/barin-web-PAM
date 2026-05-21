import { AppRoutePage } from '@/uikit/components-app/AppRoutePage';
import { ProjectAssetCenter } from '@/uikit/components-app/project-asset/ProjectAssetCenter';
import { PageI18nProvider } from '@/uikit/context/PageI18nContext';
import { i18nConfig } from '@config/i18n';
import { homeI18n, homeI18nNamespace } from '@config/i18n-mapping/HomeI18n';
import type { PageParamsProps } from '@interfaces/AppPageRouter';
import { listProjects } from '@server/render/listProjects';
import {
  getI18nInterface,
  getLocale,
  type PageParamsType
} from '@server/render/pageRouteParams';
import type { Metadata } from 'next';

// Generate static params for all supported locales (used for SSG)
export async function generateStaticParams() {
  // Return one entry for each supported locale
  return i18nConfig.supportedLngs.map((locale) => ({ locale }));
}

// Generate localized SEO metadata per locale (Next.js 15+ best practice)
export async function generateMetadata({
  params
}: {
  params: Promise<PageParamsType>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = getLocale(resolvedParams);
  return await getI18nInterface(locale, homeI18n);
}

export default async function Home({ params }: PageParamsProps) {
  const resolvedParams = await params!;
  const locale = getLocale(resolvedParams);
  const [tt, projects] = await Promise.all([
    getI18nInterface(locale, homeI18n, homeI18nNamespace),
    listProjects()
  ]);

  return (
    <PageI18nProvider value={tt}>
      <AppRoutePage
        tt={tt}
        showAdminButton
        showAuthButton
        mainProps={{ className: 'flex flex-1 flex-col' }}
      >
        <ProjectAssetCenter projects={projects} />
      </AppRoutePage>
    </PageI18nProvider>
  );
}
