const request = require('supertest');
const express = require('express');
const LanguageController = require('../src/controllers/languageController');
const db = require('../src/db');

jest.mock('../src/db');

const app = express();
app.use(express.json());
app.post('/languages', LanguageController.createLanguage);
app.get('/languages', LanguageController.getAllLanguages);
app.patch('/languages/:id', LanguageController.partialUpdateLanguage);
app.delete('/languages/:id', LanguageController.deleteLanguage);

describe('LanguageController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createLanguage', () => {
    it('should create language successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'JavaScript', level: 5, type: 'Natural' }] });
      const res = await request(app).post('/languages').send({ name: 'JavaScript', level: 5, type: 'Natural' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ id: 1, name: 'JavaScript', level: 5, type: 'Natural' });
    });

    it('should return 400 if name is missing', async () => {
      const res = await request(app).post('/languages').send({ level: 5, type: 'Natural' });
      expect(res.status).toBe(400);
      expect(res.text).toBe('Name is required');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).post('/languages').send({ name: 'JavaScript', level: 5, type: 'Natural' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('getAllLanguages', () => {
    it('should retrieve all languages successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'JavaScript', level: 5, type: 'Natural' }] });
      const res = await request(app).get('/languages');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1, name: 'JavaScript', level: 5, type: 'Natural' }]);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).get('/languages');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('partialUpdateLanguage', () => {
    it('should update language successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'JavaScript', level: 5, type: 'Natural' }] });
      const res = await request(app).patch('/languages/1').send({ name: 'JavaScript', level: 5, type: 'Natural' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, name: 'JavaScript', level: 5, type: 'Natural' });
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).patch('/languages/1').send({ name: 'JavaScript', level: 5, type: 'Natural' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('deleteLanguage', () => {
    it('should delete language successfully', async () => {
      db.query.mockResolvedValue({});
      const res = await request(app).delete('/languages/1');
      expect(res.status).toBe(204);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).delete('/languages/1');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });
});