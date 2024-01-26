import { useTodosFirst } from "../../hooks/useTodosFirst";
import { Filters } from "../Filters";
import "./style.css";

export function Footer() {
  const {
    todos,
    handleClearCompleted: onClearCompleted,
    active,
    completed,
  } = useTodosFirst();
  const activeTodos = active(todos);
  const completeTodos = completed(todos);
  return (
    <footer className="filters-container">
      <Filters />
      {/* completed and pendings */}
      <div className={`tools-container `}>
        <div className="notifications">
          <span>
            <strong>{activeTodos} Pending</strong>
          </span>
          <span>
            <strong>{completeTodos} Completed</strong>
          </span>
        </div>
        <div className={`btn-container ${completeTodos ? "show" : ""}`}>
          {completeTodos > 0 && (
            <button className={`clear-completed`} onClick={onClearCompleted}>
              Clear todos
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
