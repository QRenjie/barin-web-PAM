import {
  BrainUserGateway,
  createAdapter,
  type BrainCredentials,
  type BrainUser,
  type BrainUserRegisterRequest
} from '@brain-toolkit/brain-user';
import { ExecutorError } from '@qlover/fe-corekit';
import { inject, injectable } from '@shared/container';
import { API_USER_NOT_FOUND } from '@config/i18n-identifier/api';
import { ServerConfig } from '@server/ServerConfig';
import {
  deriveRegisterNames,
  toUserSchema,
  toUserSchemaFromAuth
} from './BrainUserMapper';
import { rethrowBrainRequestError, throwIfBrainError } from './brainUserError';
import {
  resolveBrainUserBaseURL,
  resolveBrainUserEnv
} from './brainUserEnv';
import type { UserSchema } from '@schemas/UserSchema';

@injectable()
export class BrainUserBridge {
  protected gateway: BrainUserGateway;

  constructor(@inject(ServerConfig) protected config: ServerConfig) {
    const env = resolveBrainUserEnv(config.env);
    const baseURL = resolveBrainUserBaseURL({
      appEnv: config.env,
      baseURLOverride: process.env.BRAIN_USER_BASE_URL
    });

    const adapter = createAdapter({
      env,
      baseURL,
      requiredToken: false
    });

    this.gateway = new BrainUserGateway(adapter);
  }

  public async login(params: {
    email: string;
    password: string;
  }): Promise<UserSchema> {
    try {
      const credentials = await this.gateway.login({
        email: params.email,
        password: params.password
      });

      throwIfBrainError(credentials, 'brain_user_login_failed');
      this.assertToken(credentials);

      const user = await this.gateway.refreshUserInfo({ token: credentials.token });
      throwIfBrainError(user, 'brain_user_login_failed');

      return toUserSchemaFromAuth(user, credentials);
    } catch (error) {
      rethrowBrainRequestError(error, 'brain_user_login_failed');
    }
  }

  public async loginWithGoogle(authCode: string): Promise<UserSchema> {
    try {
      const credentials = await this.gateway.loginWithGoogle({
        authorization_code: authCode
      });

      throwIfBrainError(credentials, 'brain_user_login_failed');
      this.assertToken(credentials);

      const user = await this.gateway.refreshUserInfo({ token: credentials.token });
      throwIfBrainError(user, 'brain_user_login_failed');

      return toUserSchemaFromAuth(user, credentials);
    } catch (error) {
      rethrowBrainRequestError(error, 'brain_user_login_failed');
    }
  }

  public async register(params: {
    email: string;
    password: string;
    username?: string;
  }): Promise<UserSchema> {
    const names = deriveRegisterNames(params);
    const request: BrainUserRegisterRequest = {
      email: params.email,
      password: params.password,
      first_name: names.first_name,
      last_name: names.last_name
    };

    try {
      const result = await this.gateway.register(request);
      throwIfBrainError(result, 'brain_user_register_failed');

      const token = result.token ?? result.auth_token?.key ?? '';
      return toUserSchema(result, token);
    } catch (error) {
      rethrowBrainRequestError(error, 'brain_user_register_failed');
    }
  }

  public async getUserByToken(token: string): Promise<UserSchema> {
    if (!token.trim()) {
      throw new ExecutorError(API_USER_NOT_FOUND, 'User token is required');
    }

    try {
      const user = await this.gateway.getUserInfo({ token });
      throwIfBrainError(user, API_USER_NOT_FOUND);

      const resolvedToken = user.token ?? token;
      return toUserSchema(user, resolvedToken);
    } catch (error) {
      rethrowBrainRequestError(error, API_USER_NOT_FOUND);
    }
  }

  public async logout(token: string): Promise<void> {
    if (!token.trim()) {
      return;
    }

    try {
      await this.gateway.logout(undefined, { token });
    } catch {
      // Best-effort remote sign-out; local cookie is cleared by ServerAuth.
    }
  }

  protected assertToken(
    credentials: BrainCredentials
  ): asserts credentials is BrainCredentials & { token: string } {
    if (!credentials.token?.trim()) {
      throw new ExecutorError('brain_user_login_failed', 'Missing auth token');
    }
  }
}

export type { BrainUser };
