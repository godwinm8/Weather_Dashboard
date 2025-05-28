import React, { useState } from "react";
import { useWeatherContext } from "../../context/WeatherContext";
import Button from "../Button/Button";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [inputCity, setInputCity] = useState("");
  const { setCity } = useWeatherContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        placeholder="Enter city name or zip code"
        className={styles.searchInput}
        aria-label="Search city"
      />
      <Button
        type="submit"
        variant="primary"
        size="sm"
        className={styles.searchButtonOverride}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
