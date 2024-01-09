import { createContext, useState } from "react";
import { TODO_FILTERS } from "../consts";

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [filterSelected, setFilterSelected] = useState(() => {
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    if (filter === null) return TODO_FILTERS.ALL;
    // check filter is valid, if not return ALL
    return Object.values(TODO_FILTERS).includes(filter)
      ? filter
      : TODO_FILTERS.ALL;
  });

  return (
    <FiltersContext.Provider value={{ filterSelected, setFilterSelected }}>
      {children}
    </FiltersContext.Provider>
  );
};
