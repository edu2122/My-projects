import { Todo } from "../Todo";
import { useTodosFirst } from "../../hooks/useTodosFirst";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./style.css";

export function Todos() {
  const { todos } = useTodosFirst();
  const [isEditing, setIsEditing] = useState("");
  const [parent] = useAutoAnimate();
  return (
    <ul className="todo-list" ref={parent}>
      {todos?.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => setIsEditing(todo.id)}
          className={`
            todo-item
            ${isEditing === todo.id ? "editing" : ""}
            ${todo.completed ? "completed" : ""}
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
