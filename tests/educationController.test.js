// educationController.test.js
const request = require('supertest');
const express = require('express');
const EducationController = require('../src/controllers/educationController');
const db = require('../src/db');

jest.mock('../src/db');

const app = express();
app.use(express.json());
app.post('/education', EducationController.createEducation);
app.get('/education', EducationController.getEducations);
app.put('/education/:id', EducationController.updateEducation);
app.delete('/education/:id', EducationController.deleteEducation);

describe('EducationController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createEducation', () => {
    it('should create education successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, institution: 'Test', degree: 'BSc', start_date: '2020-01-01', end_date: '2023-01-01' }] });
      const res = await request(app).post('/education').send({ institution: 'Test', degree: 'BSc', startDate: '2020-01-01', endDate: '2023-01-01' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 1, institution: 'Test', degree: 'BSc', start_date: '2020-01-01', end_date: '2023-01-01' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/education').send({ institution: 'Test' });
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).post('/education').send({ institution: 'Test', degree: 'BSc', startDate: '2020-01-01', endDate: '2023-01-01' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('getEducations', () => {
    it('should retrieve educations successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, institution: 'Test', degree: 'BSc', start_date: '2020-01-01', end_date: '2023-01-01' }] });
      const res = await request(app).get('/education');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1, institution: 'Test', degree: 'BSc', start_date: '2020-01-01', end_date: '2023-01-01' }]);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).get('/education');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('updateEducation', () => {
    it('should update education successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, institution: 'Test', degree: 'BSc', start_date: '2020-01-01', end_date: '2023-01-01' }] });
      const res = await request(app).put('/education/1').send({ institution: 'Test', degree: 'BSc', startDate: '2020-01-01', endDate: '2023-01-01' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, institution: 'Test', degree: 'BSc', start_date: '2020-01-01', end_date: '2023-01-01' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).put('/education/1').send({ institution: 'Test' });
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).put('/education/1').send({ institution: 'Test', degree: 'BSc', startDate: '2020-01-01', endDate: '2023-01-01' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('deleteEducation', () => {
    it('should delete education successfully', async () => {
      db.query.mockResolvedValue({});
      const res = await request(app).delete('/education/1');
      expect(res.status).toBe(204);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).delete('/education/1');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });
});