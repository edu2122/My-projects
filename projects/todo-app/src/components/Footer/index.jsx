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
    <footer >
      <div>
        <span>
          <strong className="strong">{activeTodos} pending</strong>
        </span>
        <span>
          <strong className="strong">{completeTodos} completed</strong>
        </span>
        {completeTodos > 0 && (
          <button className="clear-completed" onClick={onClearCompleted}>
            Clear completed
          </button>
        )}
      </div>
      <Filters />
    </footer>
  );
}
