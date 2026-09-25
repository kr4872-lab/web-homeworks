import type { Note,NoteDTO } from "./types";
import { useState } from "react";
import { useEffect } from "react";
import NoteCard from "./NoteCard";
import CreateNoteForm from "./CreateNoteForm";
import {mapNoteFromDTO} from "./utils"

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  // мне не нравятся промисы  
  useEffect(() => {
    async function loadNotes() {
      const response = await fetch('http://localhost:3000/notes');
      const data: NoteDTO[] = await response.json();
      
      setNotes(data.map((note) => mapNoteFromDTO(note)));
    }

    loadNotes();
  }, []);

  
  async function handleSubmit(note: Note) {
    const response = await fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    
    const createdNoteDTO: NoteDTO = await response.json();
    
    setNotes([...notes,mapNoteFromDTO(createdNoteDTO)]);
  }


  async function handleDelete(id: string) {
    await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
    });

    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <div>

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