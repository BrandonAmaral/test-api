import { AddAccount } from '@/domain/usecases';

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params | undefined;
  result = true;

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params;
    return this.result;
  }
}
