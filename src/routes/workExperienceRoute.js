const express = require('express');
const router = express.Router();
const WorkExperienceController = require('../controllers/workExperienceController');

/**
 * @swagger
 * tags:
 *  name: Work Experiences
 *  description: API endpoints for managing work experiences
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    WorkExperience:
 *      type: object
 *      properties:
 *        company:
 *          type: string
 *          description: The name of the company
 *        position:
 *          type: string
 *          description: The position held in the company
 *        startDate:
 *          type: string
 *          format: date
 *          description: The start date of the work experience
 *        endDate:
 *          type: string
 *          format: date
 *          description: The end date of the work experience
 *      required:
 *        - company
 *        - position
 *        - startDate
 */

/**
 * @swagger
 * /work-experiences:
 *   post:
 *     summary: Create a new work experience
 *     tags: [Work Experiences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkExperience'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', WorkExperienceController.createWorkExperience);

/**
 * @swagger
 * /work-experiences:
 *   get:
 *     summary: Get all work experiences
 *     tags: [Work Experiences]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal server error
 */
router.get('/', WorkExperienceController.getWorkExperiences);

/**
 * @swagger
 * /work-experiences/{id}:
 *   put:
 *     summary: Update a work experience
 *     tags: [Work Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the work experience to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkExperience'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Work experience not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', WorkExperienceController.updateWorkExperience);

/**
 * @swagger
 * /work-experiences/{id}:
 *   delete:
 *     summary: Delete a work experience
 *     tags: [Work Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the work experience to delete
 *     responses:
 *       204:
 *         description: The work experience was successfully deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', WorkExperienceController.deleteWorkExperience);

module.exports = (app) => {
  app.use('/work-experiences', router);
};