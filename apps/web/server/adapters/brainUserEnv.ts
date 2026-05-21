import { BRAIN_DOMAINS } from '@brain-toolkit/brain-user';

/**
 * Maps app `APP_ENV` to brain-user API environment keys.
 */
export function resolveBrainUserEnv(appEnv: string): keyof typeof BRAIN_DOMAINS {
  const override = process.env.BRAIN_USER_ENV?.trim();
  if (override === 'production' || override === 'development') {
    return override;
  }

  if (appEnv === 'production') {
    return 'production';
  }

  return 'development';
}

export function resolveBrainUserBaseURL(options: {
  appEnv: string;
  baseURLOverride?: string;
}): string | undefined {
  if (options.baseURLOverride?.trim()) {
    return options.baseURLOverride.trim();
  }

  const brainEnv = resolveBrainUserEnv(options.appEnv);
  return BRAIN_DOMAINS[brainEnv];
}
