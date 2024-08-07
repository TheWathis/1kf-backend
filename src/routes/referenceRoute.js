const express = require('express');
const router = express.Router();
const ReferenceController = require('../controllers/referenceController');

/**
 * @swagger
 * tags:
 *  name: References
 *  description: API endpoints for managing references
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Reference:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the reference
 *        title:
 *          type: string
 *          description: The title of the reference
 *        email:
 *          type: string
 *          description: The email of the reference
 *        phone:
 *          type: string
 *          description: The phone number of the reference
 *        address:
 *          type: string
 *          description: The address of the reference
 *      required:
 *        - name
 */

/**
 * @swagger
 * /references:
 *  post:
 *    summary: Create a new reference
 *    tags: [References]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Reference'
 *    responses:
 *      200:
 *        description: The created reference
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reference'
 */
router.post('/', ReferenceController.createReference);

/**
 * @swagger
 * /references:
 *  get:
 *    summary: Get all references
 *    tags: [References]
 *    responses:
 *      200:
 *        description: List of references
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Reference'
 */
router.get('/', ReferenceController.getAllReferences);

/**
 * @swagger
 * /references/{id}:
 *   patch:
 *     summary: Partially update a reference 
 *     tags: [References]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the reference to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reference'
 *     responses:
 *       200:
 *         description: The updated reference
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reference'
 */
router.patch('/:id', ReferenceController.partialUpdateReference);

/**
 * @swagger
 * /references/{id}:
 *  delete:
 *    summary: Delete a reference
 *    tags: [References]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the reference to delete
 *    responses:
 *      204:
 *        description: The reference was successfully deleted
 *      500:
 *        description: Internal server error
 */
router.delete('/:id', ReferenceController.deleteReference);

module.exports = (app) => {
  app.use('/references', router);
};
