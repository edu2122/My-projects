import { useReducer, useEffect } from "react";
import { TODO_FILTERS } from "../consts.js";
import { fetchTodos, updateTodos } from "../services/todos";

const initialState = {
  sync: false,
  todos: (() => {
    const storageTodos = localStorage.getItem("todos");
    return storageTodos ? JSON.parse(storageTodos) : [];
  })(),
  filterSelected: (() => {
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    if (filter === null) return TODO_FILTERS.ALL;
    // check filter is valid, if not return ALL
    return Object.values(TODO_FILTERS).includes(filter)
      ? filter
      : TODO_FILTERS.ALL;
  })(),
};

const reducer = (state, action) => {
  if (action.type === "INIT_TODOS") {
    const { todos } = action.payload;
    return {
      ...state,
      todos,
      sync: false,
    };
  }
  if (action.type === "CLEAR_COMPLETED") {
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => !todo.completed),
    };
  }
  if (action.type === "SAVE") {
    const { title } = action.payload;
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    return {
      ...state,
      sync: true,
      todos: [...state.todos, newTodo],
    };
  }
  if (action.type === "COMPLETED") {
    const { id, completed } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed,
          };
        }

        return todo;
      }),
    };
  }
  if (action.type === "FILTER_CHANGE") {
    const { filter } = action.payload;
    return {
      ...state,
      sync: false,
      filterSelected: filter,
    };
  }
  if (action.type === "REMOVE") {
    const { id } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.filter((todo) => todo.id !== id),
    };
  }
  if (action.type === "UPDATE_TITLE") {
    const { id, title } = action.payload;
    return {
      ...state,
      sync: true,
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
          };
        }
        return todo;
      }),
    };
  }
  return {
    state,
  };
};

export const useTodosReducer = () => {
  const [{ sync, todos, filterSelected }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const handleCompleted = ({ id, completed }) => {
    dispatch({ type: "COMPLETED", payload: { id, completed } });
  };
  const handleRemove = ({ id }) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };
  const handleSave = ({ title }) => {
    dispatch({ type: "SAVE", payload: { title } });
  };
  const handleUpdateTitle = ({ id, title }) => {
    dispatch({ type: "UPDATE_TITLE", payload: { id, title } });
  };
  const handleClearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };
  //
  const handleFilterChange = (filter) => {
    dispatch({ type: "FILTER_CHANGE", payload: { filter } });

    const params = new URLSearchParams(window.location.search);
    params.set("filter", filter);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };
  const filtersTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return true;
  });
  const active = (todos) =>
    todos.filter((todo) => todo.completed === false).length;
  const completed = (todos) => todos.length - active(todos);

  useEffect(() => {
    const storageTodos = localStorage.getItem("todos");
    if (storageTodos) {
      dispatch({
        type: "INIT_TODOS",
        payload: { todos: JSON.parse(storageTodos) },
      });
    } else {
      fetchTodos()
        .then((todos) => {
          dispatch({ type: "INIT_TODOS", payload: { todos } });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    if (sync) {
      updateTodos({ todos })
        .then(() => {
          localStorage.setItem("todos", JSON.stringify(todos));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [todos, sync]);
  return {
    todos: filtersTodos,
    active,
    completed,
    filterSelected,
    handleCompleted,
    handleRemove,
    handleSave,
    handleUpdateTitle,
    handleClearCompleted,
    handleFilterChange,
  };
};
