import { useState } from "react";
import { useTodosFirst } from "../../hooks/useTodosFirst";
import "./style.css";

export function CreateTodo() {
  const { handleSave: onAddTodo } = useTodosFirst();
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTodo({
      title: inputValue,
    });
    setInputValue("");
  };
  const handleChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
  };
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        type="text"
        placeholder="Type your todo here"
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
}
