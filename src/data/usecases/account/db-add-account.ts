import { AddAccount } from '@/domain/usecases';
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  Hasher,
} from '@/data/protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    const checkEmail = await this.checkAccountByEmailRepository.checkByEmail(
      account.email,
    );
    let isValid = false;
    if (!checkEmail) {
      const hashedPassword = await this.hasher.hash(account.password);
      isValid = await this.addAccountRepository.add({
        ...account,
        password: hashedPassword,
      });
    }
    return isValid;
  }
}
