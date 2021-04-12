import request from 'supertest';
import { Collection } from 'mongodb';

import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

let accountCollection: Collection;

describe('Account Routes', () => {
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

  describe('POST /signup', () => {
    it('Should return status code 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          email: 'any_email',
          username: 'any_username',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(200);

      await request(app)
        .post('/api/signup')
        .send({
          username: 'any_username',
          email: 'any_email',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(403);
    });
  });
});
