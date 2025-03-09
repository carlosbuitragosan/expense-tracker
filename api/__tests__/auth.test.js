import request from 'supertest';
import { app } from '../server.js';

describe('Auth routes', () => {
  it('Should log in a user and return a token.', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'test3@email.com',
      password: 'test3',
    });

    expect(res.status).toBe(200);
  });
});
