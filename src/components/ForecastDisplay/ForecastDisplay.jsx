import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useWeatherContext } from "../../context/WeatherContext";
import { fetchForecastByCity } from "../../services/weatherService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./ForecastDisplay.module.css";

const ForecastDisplay = () => {
  const { city, units, isLoadingPreferences } = useWeatherContext();

  const {
    data: forecastData,
    isLoading: isForecastApiLoading,
    error: queryError,
    isError,
  } = useQuery({
    queryKey: ["forecast", city, units],
    queryFn: () => {
      if (!city) return Promise.resolve(null);
      return fetchForecastByCity(city, units);
    },
    enabled: !!city && !isLoadingPreferences,
  });

  if (isForecastApiLoading && city) {
    return (
      <div className={styles.messageContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading forecast...</p>
      </div>
    );
  }

  if (isError && city) {
    return <ErrorMessage error={queryError} />;
  }

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    if (city) {
      return (
        <div className={styles.messageContainer}>
          <p>Forecast data not available.</p>
        </div>
      );
    }
    return null;
  }

  const processForecastData = (list) => {
    const dailyAggregates = {};
    list.forEach((item) => {
      const dateKey = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyAggregates[dateKey]) {
        dailyAggregates[dateKey] = {
          dt: item.dt,
          temps: [],
          weatherEntries: [],
          representativeItem: item,
        };
      }
      dailyAggregates[dateKey].temps.push(item.main.temp);
      dailyAggregates[dateKey].weatherEntries.push(item.weather[0]);
      const currentHour = new Date(item.dt * 1000).getHours();
      const representativeHour = new Date(
        dailyAggregates[dateKey].representativeItem.dt * 1000
      ).getHours();
      if (Math.abs(currentHour - 12) < Math.abs(representativeHour - 12)) {
        dailyAggregates[dateKey].representativeItem = item;
        dailyAggregates[dateKey].dt = item.dt;
      }
    });
    return Object.values(dailyAggregates)
      .map((dayData) => {
        const repItem = dayData.representativeItem;
        return {
          dt: dayData.dt,
          dateString: new Date(dayData.dt * 1000).toLocaleDateString([], {
            weekday: "short",
          }),
          temp: repItem.main.temp,
          icon: repItem.weather[0].icon,
          description: repItem.weather[0].main,
        };
      })
      .sort((a, b) => a.dt - b.dt)
      .slice(0, 5);
  };

  const processedForecasts = processForecastData(forecastData.list);

  if (processedForecasts.length === 0 && city) {
    return (
      <div className={styles.messageContainer}>
        <p>Not enough forecast data to display.</p>
      </div>
    );
  }
  if (processedForecasts.length === 0 && !city) {
    return null;
  }

  const unitSymbol = units === "metric" ? "°C" : "°F";

  return (
    <div className={styles.forecastGrid}>
      {processedForecasts.map((item) => (
        <div key={item.dt} className={styles.forecastItem}>
          <p className={styles.date}>{item.dateString}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.icon}.png`}
            alt={item.description}
            className={styles.forecastIcon}
            width="50"
            height="50"
          />
          <p className={styles.temp}>
            {item.temp.toFixed(0)}
            {unitSymbol}
          </p>
          <p className={styles.desc}>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastDisplay;
