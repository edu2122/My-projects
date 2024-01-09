import { useTodos } from "../../hooks/useTodos";
import { useEffect, useRef, useState } from "react";
import "./style.css";

export function Todo({ id, title, completed, isEditing, setIsEditing }) {
  const {
    handleDelete: removeTodo,
    handleCheck: setCompleted,
    handleUpdateTitle: setTitle,
  } = useTodos();
  function onToggleCompleted(event) {
    const completed = event.target.checked;
    setCompleted({ id, completed });
  }
  const className = completed ? "completed" : "incomplete";
  const [editedTitle, setEditedTitle] = useState(title);
  const inputEditTitle = useRef(null);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditedTitle(editedTitle.trim());
      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle });
      }
      if (editedTitle === "") {
        removeTodo(id);
      }
      setIsEditing("");
    }
    if (event.key === "Escape") {
      setEditedTitle(title);
      setIsEditing("");
    }
  };
  useEffect(() => {
    inputEditTitle.current?.focus();
  }, [isEditing]);

  return (
    <>
      <label
        className={`
        todo-label 
        ${className}`}
      >
        {title}
      </label>
      <div>
        <span
          className={`
            todo-checkbox-icon 
            ${className}
          `}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggleCompleted}
          />
        </span>
        <button onClick={() => removeTodo(id)}></button>
      </div>
      <input
        value={editedTitle}
        onChange={(event) => {
          setEditedTitle(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsEditing("");
        }}
        ref={inputEditTitle}
      />
    </>
  );
}
