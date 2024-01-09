import { useContext } from "react";
import { TodosContext } from "../context/todos.jsx";
import { useFilters } from "./useFilters.js";
export function useTodos() {
  const { todos, setTodos } = useContext(TodosContext);
  const { filtersTodos } = useFilters();

  const handleCheck = ({ id, completed }) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
          };
        }
        return todo;
      })
    );
  };

  const handleAddTodo = ({ title }) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id) =>{
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  }

  const  handleUpdateTitle =({id, title})=> {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }
  return {
    todos: filtersTodos(todos),
    handleAddTodo,
    handleCheck,
    handleDelete,
    handleUpdateTitle,
    handleClearCompleted,
  };
}
