const request = require('supertest');
const express = require('express');
const ProjectController = require('../src/controllers/projectController');
const db = require('../src/db');

jest.mock('../src/db');

const app = express();
app.use(express.json());
app.post('/projects', ProjectController.createProject);
app.get('/projects', ProjectController.getProjects);
app.patch('/projects/:id', ProjectController.partialUpdateProject);
app.delete('/projects/:id', ProjectController.deleteProject);

describe('ProjectController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createProject', () => {
    it('should create project successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test Project', description: 'Test Description', start_date: '2022-01-01', end_date: '2022-12-31' }] });
      const res = await request(app).post('/projects').send({ name: 'Test Project', description: 'Test Description', startDate: '2022-01-01', endDate: '2022-12-31' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 1, name: 'Test Project', description: 'Test Description', start_date: '2022-01-01', end_date: '2022-12-31' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/projects').send({ name: 'Test Project' });
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).post('/projects').send({ name: 'Test Project', description: 'Test Description', startDate: '2022-01-01', endDate: '2022-12-31' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('getProjects', () => {
    it('should retrieve projects successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test Project', description: 'Test Description', start_date: '2022-01-01', end_date: '2022-12-31' }] });
      const res = await request(app).get('/projects');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1, name: 'Test Project', description: 'Test Description', start_date: '2022-01-01', end_date: '2022-12-31' }]);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).get('/projects');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('partialUpdateProject', () => {
    it('should update project successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test Project', description: 'Test Description', start_date: '2022-01-01', end_date: '2022-12-31' }] });
      const res = await request(app).patch('/projects/1').send({ name: 'Updated Project', description: 'Updated Description', startDate: '2022-01-01', endDate: '2022-12-31' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, name: 'Test Project', description: 'Test Description', start_date: '2022-01-01', end_date: '2022-12-31' });
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).patch('/projects/1').send({ name: 'Updated Project', description: 'Updated Description', startDate: '2022-01-01', endDate: '2022-12-31' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('deleteProject', () => {
    it('should delete project successfully', async () => {
      db.query.mockResolvedValue({});
      const res = await request(app).delete('/projects/1');
      expect(res.status).toBe(204);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).delete('/projects/1');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });
});