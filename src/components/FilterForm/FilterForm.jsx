import { useState } from "react";
import css from './FilterForm.module.css';

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
            <h2>Filters</h2>
            <button className={css.filterBtn} onClick={() => setShowDropdown(!showDropdown)}>
                {filter}
            </button>
            {showDropdown && (
                <ul className={css.filterDropdown}>
                    {filterOptions.map((filter, index) => (
                        <li
                            key={index}
                            className={css.filterOption}
                            onClick={() => handleFilter(filter)}
                        >
                            {filter}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
