const express = require('express');
const router = express.Router();
const HobbyController = require('../controllers/hobbyController');

/**
 * @swagger
 * tags:
 *   name: Hobbies
 *   description: API endpoints for managing hobbies
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Hobby:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the hobby
 *        name:
 *          type: string
 *          description: The name of the hobby
 *      required:
 *        - name
 */

/**
 * @swagger
 * /hobbies:
 *   post:
 *     summary: Create a new hobby. ID is auto-generated and not expected in the request body
 *     tags: [Hobbies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hobby'
 *     responses:
 *       201:
 *         description: Hobby created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hobby'
 *       500:
 *         description: Server error
 */
router.post('/', HobbyController.createHobby);

/**
 * @swagger
 * /hobbies:
 *   get:
 *     summary: Get all hobbies
 *     tags: [Hobbies]
 *     responses:
 *       200:
 *         description: List of hobbies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hobby'
 *       500:
 *         description: Server error
 */
router.get('/', HobbyController.getHobbies);

/**
 * @swagger
 * /hobbies/{id}:
 *   put:
 *     summary: Update a hobby by ID
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the hobby to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hobby'
 *     responses:
 *       200:
 *         description: Hobby updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hobby'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
router.put('/:id', HobbyController.updateHobby);

/**
 * @swagger
 * /hobbies/{id}:
 *   delete:
 *     summary: Delete a hobby by ID
 *     tags: [Hobbies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the hobby to delete
 *     responses:
 *       204:
 *         description: Hobby deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/:id', HobbyController.deleteHobby);

module.exports = (app) => {
  app.use('/hobbies', router);
};