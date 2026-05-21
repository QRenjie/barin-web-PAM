import { ExecutorError } from '@qlover/fe-corekit';
import { inject, injectable } from '@shared/container';
import { API_USER_NOT_FOUND } from '@config/i18n-identifier/api';
import { I } from '@config/ioc-identifiter';
import type { UserSchema } from '@schemas/UserSchema';
import { BrainUserBridge } from '../adapters/BrainUserBridge';
import { ServerAuth } from './ServerAuth';
import { RequestLogsRepository } from '../repositorys/RequestLogsRepository';
import type { RequestLogsRepositoryInterface } from '../interfaces/RequestLogsRepositoryInterface';
import type { ServerAuthInterface } from '../interfaces/ServerAuthInterface';
import type {
  UserLoginContext,
  UserLoginParams,
  UserServiceInterface,
  UserServiceRegisterParams
} from '../interfaces/UserServiceInterface';
import type { LoggerInterface } from '@qlover/logger';

@injectable()
export class UserService implements UserServiceInterface {
  @inject(I.Logger)
  protected logger!: LoggerInterface;

  constructor(
    @inject(ServerAuth)
    protected userAuth: ServerAuthInterface,
    @inject(BrainUserBridge)
    protected brainUserBridge: BrainUserBridge,
    @inject(RequestLogsRepository)
    protected requestLogsRepository: RequestLogsRepositoryInterface
  ) {}

  /**
   * @override
   */
  public async register(
    params: UserServiceRegisterParams
  ): Promise<UserSchema> {
    const user = await this.brainUserBridge.register({
      email: params.email,
      password: params.password,
      username: params.username
    });

    this.logger.info('brain-user register success', { email: user.email });

    return user;
  }

  /**
   * @override
   */
  public async login(params: UserLoginParams): Promise<UserSchema> {
    const user = params.authCode
      ? await this.brainUserBridge.loginWithGoogle(params.authCode)
      : await this.brainUserBridge.login({
          email: params.email,
          password: params.password
        });

    this.logger.info('brain-user login success', { email: user.email });

    await this.requestLogsRepository.insertEvent({
      event_category: 'auth',
      event_type: 'login',
      success: true,
      payload: {
        auth_provider: 'brain-user',
        user_agent: params.loginContext?.userAgent ?? null,
        ip_address: params.loginContext?.ipAddress ?? null,
        login_method: params.authCode ? 'oauth' : 'password'
      }
    });

    return user;
  }

  /**
   * @override
   */
  public async logout(context?: UserLoginContext): Promise<void> {
    const token = await this.userAuth.getAuth();

    await this.requestLogsRepository.insertEvent({
      event_category: 'auth',
      event_type: 'logout',
      success: true,
      payload: {
        auth_provider: 'brain-user',
        user_agent: context?.userAgent ?? null,
        ip_address: context?.ipAddress ?? null
      }
    });

    await this.brainUserBridge.logout(token);
  }

  /**
   * @override
   */
  public async refresh(): Promise<UserSchema> {
    const token = await this.userAuth.getAuth();
    return await this.brainUserBridge.getUserByToken(token);
  }

  /**
   * @override
   */
  public async getUser(): Promise<UserSchema> {
    const token = await this.userAuth.getAuth();

    if (!token.trim()) {
      throw new ExecutorError(API_USER_NOT_FOUND);
    }

    return await this.brainUserBridge.getUserByToken(token);
  }
}
