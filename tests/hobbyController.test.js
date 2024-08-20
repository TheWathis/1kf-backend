// hobbyController.test.js
const request = require('supertest');
const express = require('express');
const HobbyController = require('../src/controllers/hobbyController');
const db = require('../src/db');

jest.mock('../src/db');

const app = express();
app.use(express.json());
app.put('/hobby/:id', HobbyController.updateHobby);
app.delete('/hobby/:id', HobbyController.deleteHobby);

describe('HobbyController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateHobby', () => {
    it('should update hobby successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'Reading' }] });
      const res = await request(app).put('/hobby/1').send({ name: 'Reading' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, name: 'Reading' });
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