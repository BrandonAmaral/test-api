import { AddAccount } from '@/domain/usecases';
import { AddAccountRepository, Hasher } from '@/data/protocols';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    let isValid = false;
    const hashedPassword = await this.hasher.hash(account.password);
    isValid = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword,
    });
    return isValid;
  }
}
