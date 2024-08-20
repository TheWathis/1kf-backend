const db = require('../db');

class ReferenceController {
  async createReference(req, res) {
    const { name, title, email, phone, address } = req.body;

    if (!name) {
      return res.status(400).send('Invalid request');
    }

    try {
      const { rows } = await db.query(
        'INSERT INTO job_references (name, title, email, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, title, email, phone, address]
      );
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllReferences(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM references');
      res.send(rows);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async partialUpdateReference(req, res) {
    const { id } = req.params;
    const { name, title, email, phone, address } = req.body;

    try {
      const { rows } = await db.query(
        'UPDATE job_references SET name = COALESCE($1, name), title = COALESCE($2, title), email = COALESCE($3, email), phone = COALESCE($4, phone), address = COALESCE($5, address) WHERE id = $6 RETURNING *',
        [name, title, email, phone, address, id]
      );
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteReference(req, res) {
    const { id } = req.params;

    try {
      await db.query('DELETE FROM job_references WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new ReferenceController();