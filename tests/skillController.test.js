const request = require('supertest');
const express = require('express');
const SkillController = require('../src/controllers/skillController');
const db = require('../src/db');

jest.mock('../src/db');

const app = express();
app.use(express.json());
app.post('/skills', SkillController.createSkill);
app.get('/skills', SkillController.getAllSkills);
app.put('/skills/:id', SkillController.updateSkill);
app.delete('/skills/:id', SkillController.deleteSkill);

describe('SkillController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSkill', () => {
    it('should create skill successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test Skill' }] });
      const res = await request(app).post('/skills').send({ name: 'Test Skill' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 1, name: 'Test Skill' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/skills').send({});
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).post('/skills').send({ name: 'Test Skill' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('getAllSkills', () => {
    it('should retrieve all skills successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test Skill' }] });
      const res = await request(app).get('/skills');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1, name: 'Test Skill' }]);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).get('/skills');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('updateSkill', () => {
    it('should update skill successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'Test Skill', level: 'Intermediate' }] });
      const res = await request(app).put('/skills/1').send({ name: 'Test Skill', level: 'Intermediate' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, name: 'Test Skill', level: 'Intermediate' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).put('/skills/1').send({});
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 404 if skill is not found', async () => {
      db.query.mockResolvedValue({ rows: [] });
      const res = await request(app).put('/skills/1').send({ name: 'Test Skill', level: 'Intermediate' });
      expect(res.status).toBe(404);
      expect(res.text).toBe('Skill not found');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).put('/skills/1').send({ name: 'Test Skill', level: 'Intermediate' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('deleteSkill', () => {
    it('should delete skill successfully', async () => {
      db.query.mockResolvedValue({});
      const res = await request(app).delete('/skills/1');
      expect(res.status).toBe(204);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).delete('/skills/1');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });
});