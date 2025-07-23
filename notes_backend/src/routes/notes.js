const express = require('express');
const notesController = require('../controllers/notes');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Notes
 *     description: Notes management and CRUD operations
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get a list of all notes
 *     tags: [Notes]
 *     description: Returns a list of all notes. Supports searching by title/content with the "search" query param.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search notes by title/content.
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
router.get('/', notesController.list.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: The note ID.
 *     responses:
 *       200:
 *         description: The note object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 */
router.get('/:id', notesController.get.bind(notesController));

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 description: The note title
 *               content:
 *                 type: string
 *                 description: The note content
 *     responses:
 *       201:
 *         description: Note created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input
 */
router.post('/', notesController.create.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update an existing note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: The note ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Note not found
 */
router.put('/:id', notesController.update.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: The note ID.
 *     responses:
 *       204:
 *         description: Note deleted (no content)
 *       404:
 *         description: Note not found
 */
router.delete('/:id', notesController.delete.bind(notesController));

module.exports = router;
