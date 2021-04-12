import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
} from '@/data/protocols';

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
