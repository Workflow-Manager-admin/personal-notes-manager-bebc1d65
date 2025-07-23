const { v4: uuidv4 } = require('uuid');

class NotesService {
  constructor() {
    // In-memory notes storage: { id: { id, title, content, createdAt, updatedAt } }
    this.notes = {};
  }

  // PUBLIC_INTERFACE
  createNote({ title, content }) {
    /** Create a new note with title and content. */
    const id = uuidv4();
    const timestamp = new Date().toISOString();
    const note = {
      id,
      title: title.trim(),
      content: content?.trim() || '',
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.notes[id] = note;
    return { ...note };
  }

  // PUBLIC_INTERFACE
  getNoteById(id) {
    /** Get a single note by its ID. */
    return this.notes[id] ? { ...this.notes[id] } : null;
  }

  // PUBLIC_INTERFACE
  getAllNotes({ search }) {
    /**
     * Get a list of all notes.
     * Optionally filter by search term (in title or content, case-insensitive).
     */
    let noteList = Object.values(this.notes);
    if (search && typeof search === 'string' && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      noteList = noteList.filter(
        (n) => regex.test(n.title) || regex.test(n.content)
      );
    }
    // Most recent first
    noteList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return noteList.map((n) => ({ ...n }));
  }

  // PUBLIC_INTERFACE
  updateNote(id, { title, content }) {
    /** Update a note's title/content by ID. Returns updated note, or null if not found. */
    if (!this.notes[id]) return null;
    if (title !== undefined) this.notes[id].title = title.trim();
    if (content !== undefined) this.notes[id].content = content.trim();
    this.notes[id].updatedAt = new Date().toISOString();
    return { ...this.notes[id] };
  }

  // PUBLIC_INTERFACE
  deleteNote(id) {
    /** Delete a note by ID. Returns true if deleted, or false if not found. */
    if (!this.notes[id]) return false;
    delete this.notes[id];
    return true;
  }
}

module.exports = new NotesService();
