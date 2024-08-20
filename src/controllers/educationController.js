const db = require('../db');

class EducationController {
  async createEducation(req, res) {
    const { institution, degree, startDate, endDate } = req.body;

    if (!institution || !degree || !startDate) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('INSERT INTO educations (institution, degree, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *', [institution, degree, startDate, endDate]);
      res.status(201).send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getEducations(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM educations');
      res.send(rows);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateEducation(req, res) {
    const { id } = req.params;
    const { institution, degree, startDate, endDate } = req.body;

    if (!institution || !degree || !startDate) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('UPDATE educations SET institution = $1, degree = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *', [institution, degree, startDate, endDate, id]);
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteEducation(req, res) {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM educations WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new EducationController();