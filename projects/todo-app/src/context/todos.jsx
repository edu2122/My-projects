import { createContext } from "react";
import { useTodosReducer } from "../reducers/useTodosReducer";
export const TodosContext = createContext();

export function TodosProvider({ children }) {
  // const mockTodos = [
  //   { id: crypto.randomUUID(), title: "Task 1", completed: false },
  //   { id: crypto.randomUUID(), title: "Task 2", completed: false },
  //   { id: crypto.randomUUID(), title: "Task 3", completed: false },
  //   { id: crypto.randomUUID(), title: "Task 4", completed: false },
  // ];

  // const [todos, setTodos] = useState(mockTodos);
  // const [filterSelected, setFilterSelected] = useState(() => {
  //   // read from url query params using URLSearchParams
  //   const params = new URLSearchParams(window.location.search);
  //   const filter = params.get("filter");
  //   if (filter === null) return TODO_FILTERS.ALL;
  //   // check filter is valid, if not return ALL
  //   return Object.values(TODO_FILTERS).includes(filter)
  //     ? filter
  //     : TODO_FILTERS.ALL;
  // });
  const {
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
  } = useTodosReducer();  

  return (
    <TodosContext.Provider
      value={{
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
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
