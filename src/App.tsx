import type { Note, NoteDTO } from "./types";
import { useState } from "react";
import { useEffect } from "react";
import NoteCard from "./NoteCard";
import CreateNoteForm from "./CreateNoteForm";
import { mapNoteFromDTO } from "./utils";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setError(null);
        const response = await fetch('http://localhost:3000/notes');
        
        if (!response.ok) {
          throw new Error('Failed to load notes');
        }

        const data: NoteDTO[] = await response.json();
        setNotes(data.map((note) => mapNoteFromDTO(note)));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred during the download.');
        }
      }
    }

    loadNotes();
  }, []);

  async function handleSubmit(note: Note) {
    try {
      setError(null);
      const response = await fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error('The note could not be saved.');
      }
      
      const createdNoteDTO: NoteDTO = await response.json();
      setNotes([...notes, mapNoteFromDTO(createdNoteDTO)]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error when adding a note');
      }
    }
  }

  async function handleDelete(id: string) {
    try {
      setError(null);
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error('The note could not be deleted.');
      }

      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error when deleting a note');
      }
    }
  }

  return (
    <div>
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>
      )}

      <CreateNoteForm onSubmit={handleSubmit} />
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default App;