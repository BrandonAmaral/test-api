import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateTokenRepository,
} from '@/data/protocols';
import { MongoHelper } from '@/infra/db';

export class AccountMongoRepository
  implements
    AddAccountRepository,
    CheckAccountByEmailRepository,
    LoadAccountByEmailRepository,
    UpdateTokenRepository {
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

  async loadByEmail(
    email: string,
  ): Promise<LoadAccountByEmailRepository.Result> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne(
      { email },
      { projection: { _id: 1, username: 1, password: 1 } },
    );
    return account && MongoHelper.map(account);
  }

  async updateToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne({ _id: id }, { $set: { token: token } });
  }
}
