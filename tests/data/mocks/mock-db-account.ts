import { AddAccountRepository } from '@/data/protocols';

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
