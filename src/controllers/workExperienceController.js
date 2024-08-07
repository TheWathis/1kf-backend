const db = require('../db');

class WorkExperienceController {
  async createWorkExperience(req, res) {
    const { company, title, startDate, endDate } = req.body;

    if (!company || !title || !startDate) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('INSERT INTO work_experiences (company_name, position, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *', [company, title, startDate, endDate]);
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getWorkExperiences(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM work_experiences');
      res.send(rows);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateWorkExperience(req, res) {
    const { id } = req.params;
    const { company, title, startDate, endDate } = req.body;

    if (!company || !title || !startDate) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('UPDATE work_experiences SET company_name = $1, position = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *', [company, title, startDate, endDate, id]);
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteWorkExperience(req, res) {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM work_experiences WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new WorkExperienceController();