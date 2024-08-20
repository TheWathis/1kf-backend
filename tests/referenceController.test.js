const request = require('supertest');
const express = require('express');
const ReferenceController = require('../src/controllers/referenceController');
const db = require('../src/db');

// referenceController.test.js

jest.mock('../src/db');

const app = express();
app.use(express.json());
app.post('/reference', ReferenceController.createReference);
app.get('/reference', ReferenceController.getAllReferences);
app.patch('/reference/:id', ReferenceController.partialUpdateReference);
app.delete('/reference/:id', ReferenceController.deleteReference);

describe('ReferenceController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReference', () => {
    it('should create reference successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' }] });
      const res = await request(app).post('/reference').send({ name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' });
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app).post('/reference').send({ title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' });
      expect(res.status).toBe(400);
      expect(res.text).toBe('Invalid request');
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).post('/reference').send({ name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('getAllReferences', () => {
    it('should retrieve all references successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' }] });
      const res = await request(app).get('/reference');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: 1, name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' }]);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).get('/reference');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('partialUpdateReference', () => {
    it('should update reference successfully', async () => {
      db.query.mockResolvedValue({ rows: [{ id: 1, name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' }] });
      const res = await request(app).patch('/reference/1').send({ name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' });
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).patch('/reference/1').send({ name: 'John Doe', title: 'Manager', email: 'john@example.com', phone: '1234567890', address: '123 Main St' });
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });

  describe('deleteReference', () => {
    it('should delete reference successfully', async () => {
      db.query.mockResolvedValue({});
      const res = await request(app).delete('/reference/1');
      expect(res.status).toBe(204);
    });

    it('should return 500 if database error occurs', async () => {
      db.query.mockRejectedValue(new Error('Database error'));
      const res = await request(app).delete('/reference/1');
      expect(res.status).toBe(500);
      expect(res.text).toBe('Database error');
    });
  });
});