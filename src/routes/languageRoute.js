const express = require('express');
const router = express.Router();
const LanguageController = require('../controllers/languageController');

/**
 * @swagger
 * tags:
 *   name: Languages
 *   description: API endpoints for managing languages
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Language:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the language
 *        level:
 *          type: integer
 *          description: The level of proficiency in the language.
 *          minimum: 1
 *          maximum: 10
 *          default: 5
 *        type:
 *          type: string
 *          description: The type of the language.
 *          enum: [Natural, Programming]
 *          default: Natural
 *      required:
 *        - name
 */

/**
 * @swagger
 * /languages:
 *   post:
 *     summary: Create a new language
 *     tags: [Languages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 *     responses:
 *       201:
 *         description: Language created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', LanguageController.createLanguage);

/**
 * @swagger
 * /languages:
 *   get:
 *     summary: Get all languages
 *     tags: [Languages]
 *     responses:
 *       200:
 *         description: Returns an array of all languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 *       500:
 *         description: Internal server error
 */
router.get('/', LanguageController.getAllLanguages);

/**
 * @swagger
 * /languages/{id}:
 *   patch:
 *     summary: Update a language
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the language to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 *     responses:
 *       200:
 *         description: Language updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', LanguageController.partialUpdateLanguage);

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     summary: Delete a language
 *     tags: [Languages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the language to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Language deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', LanguageController.deleteLanguage);

module.exports = (app) => {
  app.use('/languages', router);
};