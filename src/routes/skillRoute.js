const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/skillController');

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: API endpoints for managing skills
 */

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Returns an array of all skills
 *       500:
 *         description: Internal server error
 */
router.get('/', SkillController.getAllSkills);

/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the skill
 *             example:
 *               name: JavaScript
 *     responses:
 *       201:
 *         description: Skill created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', SkillController.createSkill);

/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the skill to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the skill
 *             example:
 *               name: Python
 *     responses:
 *       200:
 *         description: Skill updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Skill not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', SkillController.updateSkill);

/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the skill to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *       404:
 *         description: Skill not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', SkillController.deleteSkill);

module.exports = (app) => {
  app.use('/skills', router);
};