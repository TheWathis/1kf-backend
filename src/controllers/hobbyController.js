const db = require('../db');

class HobbyController {
  async createHobby(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('INSERT INTO hobbies (name) VALUES ($1) RETURNING *', [name]);
      res.status(201).send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getHobbies(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM hobbies');
      res.send(rows);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateHobby(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query('UPDATE hobbies SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteHobby(req, res) {
    try {
      const { id } = req.params;
      await db.query('DELETE FROM hobbies WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new HobbyController();