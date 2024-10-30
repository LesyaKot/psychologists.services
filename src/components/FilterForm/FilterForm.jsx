import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import css from "./FilterForm.module.css";

export default function FilterForm({ psychologists, onFilter }) {
  const [filter, setFilter] = useState("A to Z");
  const [showDropdown, setShowDropdown] = useState(false);

  const filterOptions = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];

  const handleFilter = (filter) => {
    setFilter(filter);
    setShowDropdown(false);
    onFilter(filter);
  };

  return (
    <div className={css.filterWrapper}>
      <h3 className={css.title}>Filters</h3>
      <button
        className={css.filterBtn}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {filter}
        {showDropdown ? (
          <ChevronUp className={css.chevronIcon} />
        ) : (
          <ChevronDown className={css.chevronIcon} />
        )}
      </button>
      {showDropdown && (
        <ul className={css.filterDropdown}>
          {filterOptions.map((filterOption, index) => (
            <li
              key={index}
              className={css.filterOption}
              onClick={() => handleFilter(filterOption)}
            >
              {filterOption}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
