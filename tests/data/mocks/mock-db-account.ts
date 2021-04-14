import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateTokenRepository,
} from '@/data/protocols';

import faker from 'faker';

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params | undefined;
  result = true;

  async add(
    params: AddAccountRepository.Params,
  ): Promise<AddAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class CheckAccountByEmailRepositorySpy
  implements CheckAccountByEmailRepository {
  email: string | undefined;
  result = false;

  async checkByEmail(
    email: string,
  ): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class LoadAccountByEmailRepositorySpy
  implements LoadAccountByEmailRepository {
  email: string | undefined;
  result = {
    id: faker.datatype.uuid(),
    username: faker.name.findName(),
    password: faker.internet.password(),
  };

  async loadByEmail(
    email: string,
  ): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class UpdateTokenRepositorySpy implements UpdateTokenRepository {
  id: string | undefined;
  token: string | undefined;

  async updateToken(id: string, token: string): Promise<void> {
    this.id = id;
    this.token = token;
  }
}
