// import { useTodos } from "../../hooks/useTodos";
import { useTodosFirst } from "../../hooks/useTodosFirst";
import { useEffect, useRef, useState } from "react";
import "./style.css";

export function Todo({ id, title, completed, isEditing, setIsEditing }) {
  const {
    handleRemove: removeTodo,
    handleCompleted: setCompleted,
    handleUpdateTitle: setTitle,
  } = useTodosFirst();
  function onToggleCompleted(event) {
    const completed = event.target.checked;
    setCompleted({ id, completed });
  }
  const className = completed ? "completed" : "";
  const [editedTitle, setEditedTitle] = useState(title);
  const inputEditTitle = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditedTitle(editedTitle.trim());
      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle });
      }
      if (editedTitle === "") {
        removeTodo({ id });
      }
      setIsEditing("");
    }
    if (event.key === "Escape") {
      setEditedTitle({ title });
      setIsEditing("");
    }
  };
  useEffect(() => {
    inputEditTitle.current?.focus();
  }, [isEditing]);

  return (
    <>
      {/* Check-todo  */}
      <label className={`container ${className}`}>
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggleCompleted}
        />
        <svg
          viewBox="0 0 512 512"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
          className="check-regular"
        >
          <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"></path>
        </svg>
        <svg
          viewBox="0 0 512 512"
          height="20px"
          xmlns="http://www.w3.org/2000/svg"
          className="check-solid"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path>
        </svg>
        <label
          className={`
              todo-label 
              ${className}`}
        >
          {title}
        </label>
      </label>
      {/* className="delete-btn" */}
      <button onClick={() => removeTodo({ id })} className={`bin-button ${className}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 39 7"
          className="bin-top"
        >
          <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
          <line
            strokeWidth="3"
            stroke="white"
            y2="1.5"
            x2="26.0357"
            y1="1.5"
            x1="12"
          ></line>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 33 39"
          className="bin-bottom"
        >
          <mask fill="white" id="path-1-inside-1_8_19">
            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
          </mask>
          <path
            mask="url(#path-1-inside-1_8_19)"
            fill="white"
            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
          ></path>
          <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
          <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 89 80"
          className="garbage"
        >
          <path
            fill="white"
            d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
          ></path>
        </svg>
      </button>

      {/* <input
        value={editedTitle}
        onChange={(event) => {
          setEditedTitle(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsEditing("");
        }}
        ref={inputEditTitle}
      /> */}
    </>
  );
}
