const db = require('../db');

class LanguageController {
  async createLanguage(req, res) {
    const { name, level, type } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const query = {
      text: 'INSERT INTO languages(name, level, type) VALUES($1, $2, $3) RETURNING *',
      values: [name, level || 5, type || 'Natural'],
    };

    try {
      const { rows } = await db.query(query);
      res.status(201).send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getAllLanguages(req, res) {
    try {
      const { rows } = await db.query('SELECT * FROM languages');
      res.send(rows);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async partialUpdateLanguage(req, res) {
    const { id } = req.params;
    const { name, level, type } = req.body;

    const query = {
      text: 'UPDATE languages SET name = COALESCE($1, name), level = COALESCE($2, level), type = COALESCE($3, type) WHERE id = $4 RETURNING *',
      values: [name, level, type, id],
    };

    try {
      const { rows } = await db.query(query);
      res.send(rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async deleteLanguage(req, res) {
    const { id } = req.params;

    try {
      await db.query('DELETE FROM languages WHERE id = $1', [id]);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new LanguageController();