import request from 'supertest';

import app from '@/main/config/app';

describe('CORS Middleware', () => {
  it('Should enable CORS', async () => {
    app.get('/test_cors', (request, response) => {
      return response.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*');
  });
});
