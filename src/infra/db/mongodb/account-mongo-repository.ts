import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
} from '@/data/protocols';
import { MongoHelper } from '@/infra/db';

export class AccountMongoRepository
  implements AddAccountRepository, CheckAccountByEmailRepository {
  async add(
    account: AddAccountRepository.Params,
  ): Promise<AddAccountRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(account);
    return result !== null;
  }

  async checkByEmail(
    email: string,
  ): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne(
      { email },
      { projection: { _id: 1 } },
    );
    return account !== null;
  }
}
