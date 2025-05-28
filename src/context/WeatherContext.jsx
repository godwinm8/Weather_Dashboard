import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../supabaseClient";

export const WeatherContext = createContext(undefined);

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  const { user } = useAuth();
  const [city, setCityState] = useState("");
  const [units, setUnitsState] = useState("metric");
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      setIsLoadingPreferences(true);
      let loadedCity = "";
      let loadedUnits = "metric";

      if (user) {
        const { data, error } = await supabase
          .from("user_preferences")
          .select("last_searched_city, preferred_unit")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching preferences from Supabase:", error);
        }
        loadedCity = data?.last_searched_city || "";
        loadedUnits = data?.preferred_unit || "metric";
      } else {
        loadedCity = localStorage.getItem("lastSearchedCity") || "";
        loadedUnits = localStorage.getItem("preferredUnit") || "metric";
      }
      setCityState(loadedCity);
      setUnitsState(loadedUnits);
      setIsLoadingPreferences(false);
    };
    loadPreferences();
  }, [user]);

  const handleSetCity = useCallback(
    async (newCity) => {
      const cityToSet = newCity.trim();
      setCityState(cityToSet);

      if (user) {
        if (cityToSet) {
          const { error } = await supabase.from("user_preferences").upsert(
            {
              user_id: user.id,
              last_searched_city: cityToSet,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
          if (error) console.error("Error saving city to Supabase:", error);
        }
      } else {
        if (cityToSet) {
          localStorage.setItem("lastSearchedCity", cityToSet);
        } else {
          localStorage.removeItem("lastSearchedCity");
        }
      }
    },
    [user]
  );

  const handleSetUnits = useCallback(
    async (newUnits) => {
      setUnitsState(newUnits);
      if (user) {
        const { error } = await supabase.from("user_preferences").upsert(
          {
            user_id: user.id,
            preferred_unit: newUnits,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
        if (error) console.error("Error saving units to Supabase:", error);
      } else {
        localStorage.setItem("preferredUnit", newUnits);
      }
    },
    [user]
  );

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity: handleSetCity,
        units,
        setUnits: handleSetUnits,
        isLoadingPreferences,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
