import React from "react";
import { useAuth } from "./context/AuthContext";
import { WeatherProvider, useWeatherContext } from "./context/WeatherContext";
import { useQuery } from "@tanstack/react-query";

import SearchBar from "./components/SearchBar/SearchBar";
import UnitSwitcher from "./components/UnitSwitcher/UnitSwitcher";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay/ForecastDisplay";
import AuthComponent from "./components/Auth/AuthComponent";
import GlobalLoader from "./components/common/GlobalLoader";
import Button from "./components/Button/Button";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import styles from "./App.module.css";
import "./styles/global.css";
import { fetchWeatherByCity } from "./services/weatherService";

const AppContent = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { city, units, isLoadingPreferences } = useWeatherContext();

  const { status: weatherQueryStatus, error: weatherQueryErrorObject } =
    useQuery({
      queryKey: ["weather", city, units],
      queryFn: () => {
        if (!city || isLoadingPreferences) return Promise.resolve(null);
        return fetchWeatherByCity(city, units);
      },
      enabled: !!city && !isLoadingPreferences,
      retry: 1,
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 5,
    });

  if (authLoading || isLoadingPreferences) {
    const message = authLoading
      ? "Authenticating..."
      : "Loading preferences...";
    return <GlobalLoader message={message} />;
  }

  const displayDashboard = city && weatherQueryStatus !== "error";
  const displayNoCityMessage = !city;
  const displayCommonError = city && weatherQueryStatus === "error";

  return (
    <div className={styles.appWrapper}>
      <header className={styles.appHeader}>
        <h1 className={styles.mainTitle}>Weather Dashboard</h1>
        {user && (
          <Button onClick={signOut} variant="outline" size="sm">
            Sign Out{" "}
            <span className={styles.userEmailHint}>
              ({user.email?.split("@")[0]})
            </span>
          </Button>
        )}
      </header>

      {!user && (
        <div className={styles.authSection}>
          <AuthComponent />
          <p className={styles.guestPrompt}>
            Or, continue as a guest to search weather. Your preferences will be
            saved locally.
          </p>
        </div>
      )}

      <div className={styles.dashboardCore}>
        <div className={styles.topControlsContainer}>
          <div className={styles.searchBarWrapper}>
            <SearchBar />
          </div>
          <div className={styles.unitSwitcherWrapper}>
            <UnitSwitcher />
          </div>
        </div>

        <div className={styles.contentArea}>
          {displayCommonError && (
            <div className={styles.commonErrorWrapper}>
              <ErrorMessage error={weatherQueryErrorObject} />
            </div>
          )}

          {displayDashboard && (
            <div className={styles.dashboardLayout}>
              <section className={styles.weatherSection}>
                <WeatherDisplay />
              </section>
              <aside className={styles.forecastSectionWrapper}>
                <h3 className={styles.forecastTitle}>5-Day Forecast</h3>
                <ForecastDisplay />
              </aside>
            </div>
          )}

          {displayNoCityMessage && !displayCommonError && (
            <p className={styles.noCityMessage}>
              {user
                ? "Welcome! Search for a city to view weather details."
                : "Search for a city to get current weather and a 5-day forecast."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
};

export default App;
