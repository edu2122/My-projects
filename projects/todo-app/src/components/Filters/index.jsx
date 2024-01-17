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
    <ul className="filters">
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === filterSelected;
        const className = isSelected ? "selected" : "";
        return (
          <li
            key={key}
            onClick={(event) => handleClick({ event, key })}
            className={`filter ${className}`}
          >
            <a href={href} onClick={(event) => handleClick({ event, key })}>
              {literal}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
