import { useState } from "react";
import { useTodosFirst } from "../../hooks/useTodosFirst";
import "./style.css";

function useFormInput() {
  const { handleSave: onAddTodo } = useTodosFirst();
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTodo({
      title: inputValue,
    });
    setInputValue("");
  };
  return {
    inputValue,
    onChange: handleChange,
    onSubmit: handleSubmit,
  };
}

export function CreateTodo() {
  // const [inputValue, setInputValue] = useState("");
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onAddTodo({
  //     title: inputValue,
  //   });
  //   setInputValue("");
  // };
  // const handleChange = (event) => {
  //   const newInputValue = event.target.value;
  //   setInputValue(newInputValue);
  // };
  const { inputValue, onChange: handleChange, onSubmit: handleSubmit } = useFormInput();
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
