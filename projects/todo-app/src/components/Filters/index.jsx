import { FILTERS_BUTTONS } from "../../consts";
import { useFilters } from "../../hooks/useFilters";
import "./style.css";

export function Filters() {
  const { filterSelected, handleFilterChange } = useFilters();
  const handleClick = ({ event, key }) => {
    event.preventDefault();
    handleFilterChange(key);
  };
  return (
    <ul className="todo-filters">
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === filterSelected;
        const className = isSelected ? "selected" : "";
        return (
          <li className="filters" key={key}>
            <a
              href={href}
              className={className}
              onClick={(event) => handleClick({ event, key })}
            >
              {literal}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
