import React, { useState } from "react";

const SearchField = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchInput);
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex justify-content-between mt-3">
        <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Поиск"
            style={{ width: "85%", height: 30 }}
        />
        <button type="submit"style={{ width: "15%", height: 30 }}>Найти</button>
        </form>
    );
}

export default SearchField