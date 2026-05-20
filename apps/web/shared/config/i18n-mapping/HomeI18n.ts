import { COMMON_ADMIN_TITLE } from '../i18n-identifier/common/common';
import * as i18nKeys from '../i18n-identifier/pages/page.home';

/**
 * Home page i18n interface
 *
 * @description
 * - welcome: welcome message
 */
export type HomeI18nInterface = typeof homeI18n;

export const homeI18nNamespace = 'page_home';

export const homeI18n = Object.freeze({
  // basic meta properties
  title: i18nKeys.PAGE_HOME_TITLE,
  description: i18nKeys.PAGE_HOME_DESCRIPTION,
  content: i18nKeys.PAGE_HOME_DESCRIPTION,
  keywords: i18nKeys.PAGE_HOME_KEYWORDS,

  welcome: i18nKeys.PAGE_HOME_WELCOME,
  getStartedTitle: i18nKeys.PAGE_HOME_GET_STARTED,
  getStartedDescription: i18nKeys.PAGE_HOME_GET_STARTED_DESCRIPTION,
  getStartedButton: i18nKeys.PAGE_HOME_GET_STARTED_BUTTON,

  assetBadge: i18nKeys.PAGE_HOME_ASSET_BADGE,
  assetHeading: i18nKeys.PAGE_HOME_ASSET_HEADING,
  totalCount: i18nKeys.PAGE_HOME_TOTAL_COUNT,
  filteredCount: i18nKeys.PAGE_HOME_FILTERED_COUNT,
  viewCard: i18nKeys.PAGE_HOME_VIEW_CARD,
  viewCompact: i18nKeys.PAGE_HOME_VIEW_COMPACT,
  searchPlaceholder: i18nKeys.PAGE_HOME_SEARCH_PLACEHOLDER,
  searchHint: i18nKeys.PAGE_HOME_SEARCH_HINT,
  emptyTitle: i18nKeys.PAGE_HOME_EMPTY_TITLE,
  emptyDesc: i18nKeys.PAGE_HOME_EMPTY_DESC,
  clearFilter: i18nKeys.PAGE_HOME_CLEAR_FILTER,
  repoLabel: i18nKeys.PAGE_HOME_REPO_LABEL,
  testLabel: i18nKeys.PAGE_HOME_TEST_LABEL,
  prodLabel: i18nKeys.PAGE_HOME_PROD_LABEL,
  noRepo: i18nKeys.PAGE_HOME_NO_REPO,
  notConfigured: i18nKeys.PAGE_HOME_NOT_CONFIGURED,
  btnRepo: i18nKeys.PAGE_HOME_BTN_REPO,
  btnTest: i18nKeys.PAGE_HOME_BTN_TEST,
  btnProd: i18nKeys.PAGE_HOME_BTN_PROD,
  noTest: i18nKeys.PAGE_HOME_NO_TEST,
  linkHint: i18nKeys.PAGE_HOME_LINK_HINT,
  footer1: i18nKeys.PAGE_HOME_FOOTER_1,
  footer2: i18nKeys.PAGE_HOME_FOOTER_2,
  footer3: i18nKeys.PAGE_HOME_FOOTER_3,

  adminTitle: COMMON_ADMIN_TITLE
});
