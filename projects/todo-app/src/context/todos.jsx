import { createContext, useState } from "react";

export const TodosContext = createContext();

export function TodosProvider({ children }) {
  const mockTodos = [
    { id: crypto.randomUUID(), title: "Task 1", completed: false },
    { id: crypto.randomUUID(), title: "Task 2", completed: false },
    { id: crypto.randomUUID(), title: "Task 3", completed: false },
    { id: crypto.randomUUID(), title: "Task 4", completed: false },
  ];

  const [todos, setTodos] = useState(mockTodos);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}
