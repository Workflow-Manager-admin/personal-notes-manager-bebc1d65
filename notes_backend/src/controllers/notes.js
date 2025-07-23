const notesService = require('../services/notes');

/**
 * Validate note fields, return an error message or null.
 */
function validateNoteFields(fields, required = ['title']) {
  if (required.includes('title') && (typeof fields.title !== 'string' || fields.title.trim().length === 0)) {
    return 'Title is required and must be a non-empty string.';
  }
  if ('content' in fields && typeof fields.content !== 'string') {
    return 'Content must be a string.';
  }
  return null;
}

class NotesController {
  // PUBLIC_INTERFACE
  async list(req, res) {
    /**
     * GET /notes
     * Query: ?search=term
     */
    try {
      const { search } = req.query;
      const notes = notesService.getAllNotes({ search });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: 'Unable to list notes' });
    }
  }

  // PUBLIC_INTERFACE
  async get(req, res) {
    /**
     * GET /notes/:id
     */
    try {
      const { id } = req.params;
      const note = notesService.getNoteById(id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch {
      res.status(500).json({ error: 'Unable to get note' });
    }
  }

  // PUBLIC_INTERFACE
  async create(req, res) {
    /**
     * POST /notes
     */
    const { title, content } = req.body;
    const validationError = validateNoteFields({ title, content });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    try {
      const note = notesService.createNote({ title, content });
      res.status(201).json(note);
    } catch {
      res.status(500).json({ error: 'Unable to create note' });
    }
  }

  // PUBLIC_INTERFACE
  async update(req, res) {
    /**
     * PUT /notes/:id
     */
    const { id } = req.params;
    const { title, content } = req.body;
    // If title is present, validate it as non-empty string; content can be empty.
    if (title !== undefined) {
      const validationError = validateNoteFields({ title }, ['title']);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }
    }
    try {
      const updated = notesService.updateNote(id, { title, content });
      if (!updated) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json(updated);
    } catch {
      res.status(500).json({ error: 'Unable to update note' });
    }
  }

  // PUBLIC_INTERFACE
  async delete(req, res) {
    /**
     * DELETE /notes/:id
     */
    try {
      const { id } = req.params;
      const deleted = notesService.deleteNote(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(204).send();
    } catch {
      res.status(500).json({ error: 'Unable to delete note' });
    }
  }
}

module.exports = new NotesController();
