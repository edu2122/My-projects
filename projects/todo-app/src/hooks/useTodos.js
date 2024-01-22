import { useContext } from "react";
import { TodosContext } from "../context/todos.jsx";
import { TODO_FILTERS } from "../consts.js";

export function useTodos() {
  const { todos, setTodos, filterSelected, setFilterSelected } = useContext(TodosContext);

  // Functionalities for the Todos
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

  const handleUpdateTitle =({id, title})=> {
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

  // functionalities for the filters
  const filtersTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const handleFilterChange = (filter) => {
    setFilterSelected(filter);
    const params = new URLSearchParams(window.location.search);
    params.set("filter", filter);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };
  
  const active = (todos) =>
    todos.filter((todo) => todo.completed === false).length;
  const completed = (todos) => todos.length - active(todos);

  return {
    todos: filtersTodos,
    handleAddTodo,
    handleCheck,
    handleDelete,
    handleUpdateTitle,
    handleClearCompleted,
    handleFilterChange,
    active,
    completed,
  };
}



