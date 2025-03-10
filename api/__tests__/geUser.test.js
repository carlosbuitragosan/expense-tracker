import request from 'supertest';
import { app } from '../server.js';

describe('GET /profile', () => {
  xit('Should return the profile data for a valid user.', async () => {
    const loginResponse = await request(app).post('/users/login').send({
      email: 'test3@email.com',
      password: 'test3',
    });

    const token = loginResponse.body.token;

    const res = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
