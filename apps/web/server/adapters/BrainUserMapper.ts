import type { BrainCredentials, BrainUser } from '@brain-toolkit/brain-user';
import { UserRole, type UserSchema } from '@schemas/UserSchema';

export function deriveRegisterNames(params: {
  username?: string;
  email: string;
}): { first_name: string; last_name: string } {
  const username = params.username?.trim();

  if (username) {
    const parts = username.split(/\s+/).filter(Boolean);
    return {
      first_name: parts[0] ?? 'User',
      last_name: parts.slice(1).join(' ') || 'User'
    };
  }

  const localPart = params.email.split('@')[0]?.trim() || 'user';

  return {
    first_name: localPart,
    last_name: 'User'
  };
}

export function toUserRole(user: BrainUser): (typeof UserRole)[keyof typeof UserRole] {
  if (user.is_superuser) {
    return UserRole.ADMIN;
  }

  if (user.roles?.some((role) => role.toLowerCase() === 'admin')) {
    return UserRole.ADMIN;
  }

  return UserRole.USER;
}

export function toUserSchema(
  user: BrainUser,
  token = ''
): UserSchema {
  const credentialToken =
    token || user.auth_token?.key || '';

  return {
    id: String(user.id),
    email: user.email,
    role: toUserRole(user),
    password: '',
    credential_token: credentialToken,
    email_confirmed_at: user.profile?.email_verified ? Date.now() : null,
    created_at: user.created_at ?? new Date().toISOString(),
    updated_at: null
  };
}

export function toUserSchemaFromAuth(
  user: BrainUser,
  credentials: BrainCredentials
): UserSchema {
  const token = credentials.token ?? user.auth_token?.key ?? '';
  return toUserSchema(user, token);
}
