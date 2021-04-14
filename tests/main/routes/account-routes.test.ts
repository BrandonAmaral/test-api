import app from '@/main/config/app';
import { MongoHelper } from '@/infra/db';

import request from 'supertest';
import { Collection } from 'mongodb';
import { hash } from 'bcrypt';

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
    it('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          username: 'any_username',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(200);

      await request(app)
        .post('/api/signup')
        .send({
          username: 'any_username',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password',
        })
        .expect(403);
    });
  });

  describe('POST /signin', () => {
    it('Should return 200 on signin', async () => {
      const password = await hash('any_password', 12);
      await accountCollection.insertOne({
        username: 'any_username',
        email: 'any_email@mail.com',
        password,
      });
      await request(app)
        .post('/api/signin')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password',
        })
        .expect(200);
    });

    it('Should return 401 on signin', async () => {
      await request(app)
        .post('/api/signin')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password',
        })
        .expect(401);
    });
  });
});
