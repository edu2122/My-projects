import { Todo } from "../Todo";
import { useTodos } from "../../hooks/useTodos";
import { useState } from "react";
import "./style.css";

export function Todos() {
  const { todos } = useTodos();
  const [isEditing, setIsEditing] = useState("");
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => setIsEditing(todo.id)}
          className={`
            todo
            ${isEditing === todo.id ? "editing" : ""}
          `}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            todo={todo}
            title={todo.title}
            completed={todo.completed}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  );
}
