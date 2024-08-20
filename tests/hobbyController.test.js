const request = require('supertest');
const express = require('express');
const HobbyController = require('../src/controllers/hobbyController');
const db = require('../src/db');

jest.mock('../src/db');

const app = express();
app.use(express.json());
app.post('/hobby', HobbyController.createHobby);
app.get('/hobby', HobbyController.getHobbies);
app.put('/hobby/:id', HobbyController.updateHobby);
app.delete('/hobby/:id', HobbyController.deleteHobby);

describe('HobbyController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createHobby', () => {
    it('should create a new hobby successfully', async () => {
      const hobbyName = 'Reading';
      db.query.mockResolvedValue({ rows: [{ id: 1, name: hobbyName }] });
      const res = await request(app).post('/hobby').send({ name: hobbyName });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 1, name: hobbyName });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/hobby').send({});
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).post('/hobby').send({ name: 'Reading' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('getHobbies', () => {
    it('should get all hobbies successfully', async () => {
      const hobbies = [{ id: 1, name: 'Reading' }, { id: 2, name: 'Gardening' }];
      db.query.mockResolvedValue({ rows: hobbies });
      const res = await request(app).get('/hobby');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(hobbies);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).get('/hobby');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('updateHobby', () => {
    it('should update hobby successfully', async () => {
      const hobbyId = 1;
      const hobbyName = 'Reading';
      db.query.mockResolvedValue({ rows: [{ id: hobbyId, name: hobbyName }] });
      const res = await request(app).put(`/hobby/${hobbyId}`).send({ name: hobbyName });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: hobbyId, name: hobbyName });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).put('/hobby/1').send({});
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).put('/hobby/1').send({ name: 'Reading' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('deleteHobby', () => {
    it('should delete hobby successfully', async () => {
      db.query.mockResolvedValue({});
      const res = await request(app).delete('/hobby/1');
      expect(res.status).toBe(204);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).delete('/hobby/1');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });
});