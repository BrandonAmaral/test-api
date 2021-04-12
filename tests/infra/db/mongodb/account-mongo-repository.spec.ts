import { AccountMongoRepository, MongoHelper } from '@/infra/db';
import { mockAddAccountParams } from '@/tests/domain/mocks';

import { Collection } from 'mongodb';

import faker from 'faker';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

let accountCollection: Collection;

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!);
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('add()', () => {
    it('Should return an account on success', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      const isValid = await sut.add(addAccountParams);
      expect(isValid).toBe(true);
    });
  });

  describe('checkByEmail()', () => {
    it('Should return true if email is valid', async () => {
      const sut = makeSut();
      const addAccountParams = mockAddAccountParams();
      await accountCollection.insertOne(addAccountParams);
      const exists = await sut.checkByEmail(addAccountParams.email);
      expect(exists).toBe(true);
    });

    it('Should return false if email is not valid', async () => {
      const sut = makeSut();
      const exists = await sut.checkByEmail(faker.internet.email());
      expect(exists).toBe(false);
    });
  });
});
