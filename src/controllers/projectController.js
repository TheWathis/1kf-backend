const db = require('../db');

class ProjectController {
  async createProject(req, res) {
    const { name, description, startDate, endDate } = req.body;

    if (!name || !startDate) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('INSERT INTO projects (name, description, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, startDate, endDate]);
      res.status(201).send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getProjects(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM projects');
      res.send(rows);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async partialUpdateProject(req, res) {
    const { id } = req.params;
    const { name, description, startDate, endDate } = req.body;

    try {
      const { rows } = await db.query('UPDATE projects SET name = COALESCE($1, name), description = COALESCE($2, description), start_date = COALESCE($3, start_date), end_date = COALESCE($4, end_date) WHERE id = $5 RETURNING *', [name, description, startDate, endDate, id]);
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM projects WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new ProjectController();