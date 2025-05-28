const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const BASE_CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const BASE_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const errorMessage =
      data.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  if (data.cod && String(data.cod) !== "200") {
    throw new Error(data.message || "City not found or API error");
  }
  return data;
};

export const fetchWeatherByCity = async (city, units = "metric") => {
  if (!API_KEY) throw new Error("OpenWeatherMap API key is not configured.");
  if (!city) {
    throw new Error("City name is required to fetch current weather.");
  }

  const response = await fetch(
    `${BASE_CURRENT_URL}?q=${city}&appid=${API_KEY}&units=${units}`
  );
  return handleResponse(response);
};

export const fetchForecastByCity = async (city, units = "metric") => {
  if (!API_KEY) throw new Error("OpenWeatherMap API key is not configured.");
  if (!city) {
    throw new Error("City name is required to fetch forecast.");
  }

  const response = await fetch(
    `${BASE_FORECAST_URL}?q=${city}&appid=${API_KEY}&units=${units}&cnt=40`
  );
  return handleResponse(response);
};
