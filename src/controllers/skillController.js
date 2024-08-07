const db = require('../db');

class SkillController {
  async createSkill(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('INSERT INTO skills (name) VALUES ($1) RETURNING *', [name]);
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getAllSkills(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM skills');
      res.send(rows);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateSkill(req, res) {
    const { id } = req.params;
    const { name, level } = req.body;

    if (!name) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('UPDATE skills SET name = $1, level = $2 WHERE id = $3 RETURNING *', [name, level, id]);
      if (rows.length === 0) {
        return res.status(404).send('Skill not found');
      }
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteSkill(req, res) {
    const { id } = req.params;

    try {
      await db.query('DELETE FROM skills WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new SkillController();