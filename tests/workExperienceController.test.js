const request = require('supertest');
const express = require('express');
const WorkExperienceController = require('../src/controllers/workExperienceController');
const db = require('../src/db');

// workExperienceController.test.js

jest.mock('../src/db');

const app = express();
app.use(express.json());
app.post('/work-experience', WorkExperienceController.createWorkExperience);
app.get('/work-experience', WorkExperienceController.getWorkExperiences);
app.put('/work-experience/:id', WorkExperienceController.updateWorkExperience);
app.delete('/work-experience/:id', WorkExperienceController.deleteWorkExperience);

describe('WorkExperienceController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createWorkExperience', () => {
    it('should create work experience successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, company_name: 'Test Company', position: 'Developer', start_date: '2020-01-01', end_date: '2023-01-01' }] });
      const res = await request(app).post('/work-experience').send({ company: 'Test Company', title: 'Developer', startDate: '2020-01-01', endDate: '2023-01-01' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 1, company_name: 'Test Company', position: 'Developer', start_date: '2020-01-01', end_date: '2023-01-01' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/work-experience').send({ company: 'Test Company' });
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).post('/work-experience').send({ company: 'Test Company', title: 'Developer', startDate: '2020-01-01', endDate: '2023-01-01' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('getWorkExperiences', () => {
    it('should retrieve work experiences successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, company_name: 'Test Company', position: 'Developer', start_date: '2020-01-01', end_date: '2023-01-01' }] });
      const res = await request(app).get('/work-experience');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1, company_name: 'Test Company', position: 'Developer', start_date: '2020-01-01', end_date: '2023-01-01' }]);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).get('/work-experience');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('updateWorkExperience', () => {
    it('should update work experience successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, company_name: 'Test Company', position: 'Developer', start_date: '2020-01-01', end_date: '2023-01-01' }] });
      const res = await request(app).put('/work-experience/1').send({ company: 'Test Company', title: 'Developer', startDate: '2020-01-01', endDate: '2023-01-01' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, company_name: 'Test Company', position: 'Developer', start_date: '2020-01-01', end_date: '2023-01-01' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).put('/work-experience/1').send({ company: 'Test Company' });
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).put('/work-experience/1').send({ company: 'Test Company', title: 'Developer', startDate: '2020-01-01', endDate: '2023-01-01' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('deleteWorkExperience', () => {
    it('should delete work experience successfully', async () => {
      db.query.mockResolvedValue({});
      const res = await request(app).delete('/work-experience/1');
      expect(res.status).toBe(204);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).delete('/work-experience/1');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });
});