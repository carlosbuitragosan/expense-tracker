import request from 'supertest';
import { app } from '../server.js';

describe('POST /login', () => {
  it('Should log in a user and return a token.', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'test3@email.com',
      password: 'test3',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('token');
  });

  it('Should fail login with wrong password.', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'test3@email.com',
      password: 'test',
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials.');
  });

  it('Should fail login if email not found.', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'ronw@email.com',
      password: '1234',
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid credentials.');
  });
});
