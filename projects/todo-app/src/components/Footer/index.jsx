import { useFilters } from "../../hooks/useFilters";
import { useTodos } from "../../hooks/useTodos";
import { Filters } from "../Filters";
import "./style.css";

export function Footer() {
  const { todos, handleClearCompleted: onClearCompleted } = useTodos();
  const { active, completed } = useFilters();
  const activeTodos = active(todos);
  const completeTodos = completed(todos);
  return (
    <footer className="filters-container">
      <Filters />
      {/* completed and pendings */}
      <div className="tools-container">
        <div className="notifications">
          <span>
            <strong>{activeTodos} Pending</strong>
          </span>
          <span>
            <strong>{completeTodos} Completed</strong>
          </span>
        </div>
        {completeTodos > 0 && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </div>
    </footer>
  );
}
