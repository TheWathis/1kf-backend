const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController');

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Project:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the project
 *        startDate:
 *          type: string
 *          description: The start date of the project
 *        endDate:
 *          type: string
 *          description: The end date of the project
 *        description:
 *          type: string
 *          description: A brief description of the project
 *      required:
 *        - institution
 *        - startDate
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: The created project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */
router.post('/', ProjectController.createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get('/', ProjectController.getProjects);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update an project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: The updated project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 */
router.put('/:id', ProjectController.partialUpdateProject);

/**
 * @swagger
 * /projects/{id}:
 *  delete:
 *    summary: Delete an project by ID
 *    tags: [Projects]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the project to delete
 *    responses:
 *      204:
 *        description: The project was deleted
 *      500:
 *        description: Internal server error
 */
router.delete('/:id', ProjectController.deleteProject);

module.exports = (app) => {
  app.use('/projects', router);
};