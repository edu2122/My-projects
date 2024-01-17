import { CreateTodo } from "../CreateTodo";
import "./style.css";

export function Header() {
  return (
    <header className="todo-header">
      <h1 className="todo-title">Todo App</h1>
      <CreateTodo />
    </header>
  );
}
