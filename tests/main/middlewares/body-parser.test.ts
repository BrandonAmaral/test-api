import request from 'supertest';

import app from '@/main/config/app';

describe('BodyParser Middleware', () => {
  it('Should parse body as json', async () => {
    app.post('/test_body_parser', (request, response) => {
      return response.send(request.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ test: 'test' })
      .expect({ test: 'test' });
  });
});
