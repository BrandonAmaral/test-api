import { AddAccount, Authentication } from '@/domain/usecases';

import faker from 'faker';

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params | undefined;
  result = true;

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = account;
    return this.result;
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params | undefined;
  result = {
    token: faker.datatype.uuid(),
    username: faker.name.findName(),
  };

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params;
    return this.result;
  }
}
