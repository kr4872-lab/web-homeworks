import type { Note } from "./types";
import styles from "./NoteCard.module.css";

interface Props {
  note: Note;
  onDelete: (id: string) => void;
}


export default function NoteCard({ note, onDelete }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{note.title}</h2>
        
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className={`${styles.badge} ${note.hidden ? styles.badgeHidden : ""}`}>
            {note.hidden ? "hidden" : "opened"}
          </span>
          
          <button 
            onClick={() => onDelete(note.id)}
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              border: "none",
              borderRadius: "6px",
              padding: "6px 10px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "500"
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <span>{note.createdAt.toLocaleDateString()}</span>
      </div>

      <p className={styles.content}>{note.content}</p>

      {note.tags.length > 0 && (
        <div className={styles.tagsContainer}>
          {note.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}