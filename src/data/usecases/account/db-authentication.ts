import { Authentication } from '@/domain/usecases';
import {
  LoadAccountByEmailRepository,
  HasherComparer,
  Encrypter,
  UpdateTokenRepository,
} from '@/data/protocols';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByRepository: LoadAccountByEmailRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter,
    private readonly updateTokenRepository: UpdateTokenRepository,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByRepository.loadByEmail(
      params.email,
    );
    if (account) {
      const isValid = await this.hasherComparer.compare(
        params.password,
        account.password,
      );
      if (isValid) {
        const token = await this.encrypter.encrypt(account.id);
        await this.updateTokenRepository.updateToken(account.id, token);
        return { token, username: account.username };
      }
    }
    return null!;
  }
}
