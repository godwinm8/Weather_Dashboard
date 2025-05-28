import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useWeatherContext } from "../../context/WeatherContext";
import { fetchWeatherByCity } from "../../services/WeatherService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./WeatherDisplay.module.css";

const WeatherDisplay = () => {
  const { city, units, isLoadingPreferences } = useWeatherContext();

  const {
    data: weatherData,
    isLoading: isWeatherApiLoading,
    error: queryError,
    isError,
  } = useQuery({
    queryKey: ["weather", city, units],
    queryFn: () => {
      if (!city) return Promise.resolve(null);
      return fetchWeatherByCity(city, units);
    },
    enabled: !!city && !isLoadingPreferences,
    refetchInterval: 30000,
    staleTime: 1000 * 60 * 2,
  });

  if (isLoadingPreferences) {
    return (
      <div className={styles.messageCard}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading preferences...</p>
      </div>
    );
  }

  if (!city) {
    return (
      <div className={styles.messageCard}>
        <p>Enter a city to get current weather conditions.</p>
      </div>
    );
  }

  if (isWeatherApiLoading) {
    return (
      <div className={styles.messageCard}>
        <div className={styles.loadingSpinner}></div>
        <p>Fetching weather for {city}...</p>
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage error={queryError} />;
  }

  if (!weatherData || weatherData.cod !== 200) {
    return (
      <div className={styles.messageCard}>
        <p>
          No weather data found for "{city}". Please check the city name or try
          another.
        </p>
      </div>
    );
  }

  const { name, main, weather, wind, sys } = weatherData;
  const weatherCondition = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weatherCondition.icon}@4x.png`;
  const unitSymbol = units === "metric" ? "°C" : "°F";
  const speedUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className={styles.weatherCard}>
      <h2 className={styles.cityName}>
        {name}, {sys.country}
      </h2>

      <div className={styles.mainInfo}>
        <img
          src={iconUrl}
          alt={weatherCondition.description}
          className={styles.weatherIcon}
          width="100"
          height="100"
        />
        <span className={styles.temperature}>
          {main.temp.toFixed(1)}
          <sup className={styles.degreeSymbol}>{unitSymbol}</sup>
        </span>
      </div>

      <p className={styles.description}>
        {weatherCondition.main}
        <span className={styles.detailedDescription}>
          {" "}
          - {weatherCondition.description}
        </span>
      </p>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <strong className={styles.detailLabel}>Humidity</strong>
          <span className={styles.detailValue}>{main.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <strong className={styles.detailLabel}>Wind</strong>
          <span className={styles.detailValue}>
            {wind.speed.toFixed(1)} {speedUnit}
          </span>
        </div>
        <div className={styles.detailItem}>
          <strong className={styles.detailLabel}>Feels like</strong>
          <span className={styles.detailValue}>
            {main.feels_like.toFixed(1)}
            {unitSymbol}
          </span>
        </div>
        <div className={styles.detailItem}>
          <strong className={styles.detailLabel}>Pressure</strong>
          <span className={styles.detailValue}>{main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
