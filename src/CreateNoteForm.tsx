import { useState } from "react";
import type { Note } from "./types";
import styles from "./CreateNoteForm.module.css";

interface Props {
  onSubmit: (note: Note) => void;
}

export default function CreateNoteForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [content, setContent] = useState("");
  const [hidden, setHidden] = useState(false);
  const [tags, setTags] = useState<string>("");
  const [tagsError, setTagsError] = useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
        setTitleError("Title is required");
        return;
    }
    const currentTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (currentTags.length > 5) {
        setTagsError("You can only add up to 5 tags");
        return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
      hidden: hidden,
      tags: currentTags
    };

    onSubmit(note);

    setTitle("");
    setTitleError("");
    setContent("");
    setHidden(false);
    setTags("");
    setTagsError("");
  };

  
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
            <input 
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
            {titleError && <p className={styles.error}>{titleError}</p>}
        </div>
        
        <div className={styles.field}>
            <textarea 
              placeholder="Content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)}
              className={styles.textarea}
            />
        </div>

        <div className={styles.field}>
            <input 
              type="text" 
              placeholder="Tags (comma separated)" 
              value={tags} 
              onChange={(e) => setTags(e.target.value)}
              className={styles.input}
            />
            {tagsError && <p className={styles.error}>{tagsError}</p>}
        </div>

        <div>
            <label className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={hidden} 
                onChange={(e) => setHidden(e.target.checked)}
              />
              Hidden
            </label>
        </div>
        
        <button type="submit" className={styles.submitBtn}>Add Note</button>
    </form>
  );
}