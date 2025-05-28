import React from "react";
import { useWeatherContext } from "../../context/WeatherContext";
import styles from "./UnitSwitcher.module.css";
import Button from "../Button/Button";

const UnitSwitcher = () => {
  const { units, setUnits } = useWeatherContext();

  return (
    <div
      className={styles.unitSwitcherContainer}
      role="radiogroup"
      aria-label="Temperature units"
    >
      <Button
        variant={units === "metric" ? "primary" : "outline"}
        size="md"
        onClick={() => setUnits("metric")}
        aria-pressed={units === "metric"}
        aria-label="Switch to Celsius"
        className={styles.unitButton}
      >
        °C
      </Button>
      <Button
        variant={units === "imperial" ? "primary" : "outline"}
        size="md"
        onClick={() => setUnits("imperial")}
        aria-pressed={units === "imperial"}
        aria-label="Switch to Fahrenheit"
        className={styles.unitButton}
      >
        °F
      </Button>
    </div>
  );
};

export default UnitSwitcher;
