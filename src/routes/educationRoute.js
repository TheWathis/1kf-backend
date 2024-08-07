const express = require('express');
const router = express.Router();
const EducationController = require('../controllers/educationController');

/**
 * @swagger
 * tags:
 *   name: Educations
 *   description: API endpoints for managing educations
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Education:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the education
 *        institution:
 *          type: string
 *          description: The name of the institution
 *        degree:
 *          type: string
 *          description: The degree obtained
 *        startDate:
 *          type: string
 *          description: The start date of the education
 *        endDate:
 *          type: string
 *          description: The end date of the education
 *        description:
 *          type: string
 *          description: A brief description of the education
 *      required:
 *        - institution
 *        - degree
 *        - startDate
 */

/**
 * @swagger
 * /educations/:
 *   post:
 *     summary: Create a new education
 *     tags: [Educations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       201:
 *         description: Education created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *       500:
 *         description: Server error
 */
router.post('/', EducationController.createEducation);

/**
 * @swagger
 * /educations/:
 *   get:
 *     summary: Get all educations
 *     tags: [Educations]
 *     responses:
 *       200:
 *         description: List of educations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Education'
 *       500:
 *         description: Server error
 */
router.get('/', EducationController.getEducations);

/**
 * @swagger
 * /educations/{id}:
 *   put:
 *     summary: Update an education by ID
 *     tags: [Educations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the education to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       200:
 *         description: The updated education
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *       500:
 *         description: Server error
 */
router.put('/:id', EducationController.updateEducation);

/**
 * @swagger
 * /educations/{id}:
 *  delete:
 *    summary: Delete an education by ID
 *    tags: [Educations]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the education to delete
 *    responses:
 *      204:
 *        description: The education was deleted
 *      500:
 *        description: Internal server error
 */
router.delete('/:id', EducationController.deleteEducation);

module.exports = (app) => {
  app.use('/educations', router);
};