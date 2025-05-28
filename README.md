# Weather Dashboard

A responsive and feature-rich weather dashboard application built with React.js and Vite. This application fetches real-time current weather and 5-day forecast data from the OpenWeatherMap API. Users can search for weather by city, switch temperature units between Celsius and Fahrenheit. Authenticated users, leveraging Supabase for backend services, can have their last searched city and unit preference saved and automatically loaded across sessions.

## Live Demo

`https://weather-dashboard-qm8o.vercel.app/`

## Screenshots

![Image](https://github.com/user-attachments/assets/5cd218ce-2990-4dbd-ab9a-1302efa95643)

![Image](https://github.com/user-attachments/assets/859c7f06-02ab-4cde-a2ae-f4b5bdc7e1f3)

![Image](https://github.com/user-attachments/assets/91aaa451-3a1b-4430-a274-6fb95717ecda)

![Image](https://github.com/user-attachments/assets/092c41a6-0f89-4b9d-89ff-ff91b721b878)

![Image](https://github.com/user-attachments/assets/de1359aa-97fa-41fc-81dc-1d4476d49445)

![Image](https://github.com/user-attachments/assets/a1af5ef6-c613-4b20-b40b-291dbb2893a7)

![Image](https://github.com/user-attachments/assets/4b739607-a28a-4f0f-a51e-fc1b197c8c87)

![Image](https://github.com/user-attachments/assets/5701b670-adba-4771-8b85-268eb863b1aa)

![Image](https://github.com/user-attachments/assets/e08622bd-2825-4d6a-b1e6-03bb0750d3a6)

![Image](https://github.com/user-attachments/assets/6c134803-74ed-451b-8092-7ed25878cc94)

## Features Implemented

**Core Requirements:**
*   **City Search:** Users can search for current weather and 5-day forecast information by city name.
*   **Current Weather Display:** Shows comprehensive details including temperature, humidity, wind speed, "feels like" temperature, atmospheric pressure, and current weather conditions (e.g., Clouds, Rain, Clear) along with an appropriate weather icon.
*   **API Polling:** Current weather data automatically refreshes every 30 seconds for the displayed city, managed efficiently by React Query.
*   **Error Handling:** Gracefully handles and displays user-friendly messages for API errors such as incorrect city names, network failures, or other API issues.
*   **Local Storage:** For guest users, the last searched city and preferred temperature unit are saved in the browser's local storage and reloaded on subsequent visits.
*   **Component-Based Architecture:** The application is structured with clear separation of concerns using dedicated React components for search, current weather display, forecast display, unit switching, authentication, error messages, and reusable UI elements like buttons.
*   **Responsive Design:** The user interface is fully responsive and adapts seamlessly to various screen sizes, including mobile phones, tablets, and desktop computers, using modern CSS techniques like Flexbox and Grid.
*   **Modern Styling:** Features a clean, intuitive, and visually appealing user interface built with a consistent theme defined by CSS Custom Properties (Variables) and styled with CSS Modules for component-level scope.

**Bonus Features:**
*   **5-Day Weather Forecast:** Implements a 5-day weather forecast, displaying daily summaries including the day of the week, a weather icon, the representative temperature, and a brief weather description.
*   **Unit Switching (Celsius/Fahrenheit):** Allows users to dynamically switch between Celsius (°C) and Fahrenheit (°F) for temperature and corresponding wind speed units (m/s or mph). This preference is saved for authenticated users.
*   **React Query (`@tanstack/react-query`):** Utilized for all server state management. This includes fetching data from OpenWeatherMap, intelligent caching, background updates, automatic refetching on window focus, and handling the 30-second polling requirement for current weather.
*   **Supabase Integration:**
    *   **User Authentication:** Full authentication flow (Sign Up with email/password, Sign In, Sign Out) using Supabase Auth.
    *   **Data Persistence:** Authenticated users' `last_searched_city` and `preferred_unit` are saved to a PostgreSQL database managed by Supabase and are loaded when the user logs in.

## Tech Stack

*   **Frontend:**
    *   React.js (v19)
    *   Vite (Build Tool & Dev Server)
    *   JavaScript (ES6+)
    *   CSS Modules (for component-scoped styling)
    *   Global CSS with CSS Custom Properties (for comprehensive theming)
*   **State Management:**
    *   React Context API:
        *   `AuthContext`: For managing user authentication state.
        *   `WeatherContext`: For managing global UI preferences (city, units) and their persistence.
    *   `@tanstack/react-query`: For all server state management (API data fetching, caching, polling).
*   **Backend-as-a-Service (BaaS):**
    *   Supabase (Authentication, PostgreSQL Database for user preferences)
*   **APIs:**
    *   OpenWeatherMap API (Current Weather API, 5 Day / 3 Hour Forecast API)
*   **Linting & Formatting:**
    *   ESLint
    *   Prettier (Assumed, good practice)

## Project Structure

react-weather-dashboard/
├── .env # Environment variables (API keys - GIT IGNORED!)
├── .gitignore # Specifies files/folders for Git to ignore
├── eslint.config.js # ESLint configuration
├── index.html # Main HTML entry point for the application
├── package-lock.json # Records exact versions of installed dependencies
├── package.json # Project metadata, dependencies, and scripts
├── README.md # This project documentation file
├── vite.config.js # Vite build tool configuration
│
├── node_modules/ # Installed npm packages (GIT IGNORED)
│
├── public/ # Static assets served directly
│ └── (e.g., favicon.ico, vite.svg)
│
└── src/ # Main source code for the application
├── App.jsx # Top-level React component, orchestrates layout and providers
├── App.module.css # CSS Modules specific to App.jsx layout
├── main.jsx # Entry point of the React application (renders App to DOM)
├── supabaseClient.js # Supabase client initialization and export
│
├── assets/ # For static assets like images, custom fonts (if any)
│ └── (empty or image files)
│
├── components/ # Reusable UI components
│ ├── Auth/ # Authentication related UI
│ │ ├── AuthComponent.jsx
│ │ └── AuthComponent.module.css
│ ├── Button/ # Reusable Button component
│ │ ├── Button.jsx
│ │ └── Button.module.css
│ ├── common/ # Shared, generic utility components
│ │ |
│ │ ├── GlobalLoader.jsx
│ │ └── GlobalLoader.module.css
│ ├── ErrorMessage/ # Component for displaying error messages
│ ├── ForecastDisplay/ # Component for the 5-day weather forecast
│ ├── SearchBar/ # Component for city search input (input + its own button)
│ ├── UnitSwitcher/ # Component for switching temperature units (°C/°F)
│ └── WeatherDisplay/ # Component for displaying current weather conditions
│
├── context/ # React Context API for global state management
│ ├── AuthContext.jsx # Manages user authentication state
│ └── WeatherContext.jsx # Manages UI preferences (city, units)
│
├── services/ # Modules for external API interactions
│ └── weatherService.js # Functions for OpenWeatherMap API calls
│
└── styles/ # Global styles and theme definitions
└── global.css # Global CSS variables, base element styles, resets

## Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/godwinm8/Weather_Dashboard.git
    cd weather-dashboard
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    *   Create a `.env` file in the project root by copying the example:
        ```bash
        cp .env.example .env
        ```
    *   Open the `.env` file and fill actual API keys and Supabase credentials:
        ```env
        VITE_OPENWEATHERMAP_API_KEY=a3b4bb532a2069818ae4cb0bc89028c8
VITE_SUPABASE_URL=https://pzitrsoudekbvlvzskkl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6aXRyc291ZGVrYnZsdnpza2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzAzMDMsImV4cCI6MjA2Mzg0NjMwM30.MsvCG0q2E187Zq79FmiO4Ea7PzJnulZSQKpX4G1Nl3w
        ```
    *   Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).
    *   Get Supabase Project URL and Anon Public Key from project's dashboard on [Supabase](https://supabase.com) (Settings -> API).

4.  **Set Up Supabase Database Table & Policies:**
    *   Log in to Supabase project dashboard.
    *   Navigate to the "SQL Editor" section.
    *   Click "New query" and execute the following SQL statements:
        ```sql
        -- Create the table to store user preferences
        CREATE TABLE public.user_preferences (
          user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          last_searched_city TEXT,
          preferred_unit TEXT DEFAULT 'metric',
          updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
        );

        -- Enable Row Level Security (RLS) for the table
        ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

        -- Policy: Allow authenticated users to manage (select, insert, update, delete) only their own preferences.
        CREATE POLICY "Users can manage their own preferences"
        ON public.user_preferences
        FOR ALL
        USING (auth.uid() = user_id)
        WITH CHECK (auth.uid() = user_id);

        -- Optional: Create a trigger function to automatically update 'updated_at' on row modification
        CREATE OR REPLACE FUNCTION public.handle_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Optional: Create a trigger that calls the function before any update on user_preferences
        CREATE TRIGGER on_user_preferences_update
          BEFORE UPDATE ON public.user_preferences
          FOR EACH ROW
          EXECUTE PROCEDURE public.handle_updated_at();
        ```
    *   **Supabase Authentication Settings:** In Supabase project, go to "Authentication" -> "Providers" and ensure "Email" is enabled. Under "Authentication" -> "Settings", configure options like "Enable email confirmations" (recommended for production, can be disabled for easier development testing).

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

## How I Approached the Assignment

My development approach for this Weather Dashboard was iterative, starting with core functionalities and progressively integrating advanced features and UI refinements, keeping the user experience and code quality in mind.

1.  **Foundation & Project Setup:** I chose Vite for its fast development server and efficient build process, setting up a standard React project with JavaScript. The initial file structure was planned for modularity, separating components, services, contexts, and styles.

2.  **Core Weather Functionality:** The primary goal was to fetch and display weather information.
    *   A `weatherService.js` module was created to handle all interactions with the OpenWeatherMap API for both current weather and the 5-day forecast.
    *   `WeatherDisplay.jsx` and `ForecastDisplay.jsx` were developed to present this data clearly.
    *   A self-contained `SearchBar.jsx` was implemented for user input.

3.  **State Management - A Hybrid Approach:**
    *   **React Context API:** This was utilized for managing global UI-related state and user-specific data that doesn't necessarily belong to server state.
        *   `AuthContext`: Manages the user's authentication status (user object, loading state from initial session check) and provides authentication functions (`signIn`, `signUp`, `signOut`) that interact with the `supabaseClient.js`.
        *   `WeatherContext`: Manages shared UI preferences such as the `city` and temperature `units`. It includes logic to persist these settings to `localStorage` for guest users and to the Supabase database for authenticated users, ensuring a seamless experience.
    *   **`@tanstack/react-query`:** For all asynchronous data fetching from the OpenWeatherMap API (server state), I leveraged React Query. This powerful library handles data fetching, caching strategies (like `staleTime` and `gcTime`), background updates, request retries, and the required 30-second polling for current weather. This greatly simplified managing loading states, error states, and data freshness within the display components.

4.  **Component Design & Reusability:**
    *   The application was broken down into logical components as per the assignment's structure guidelines.
    *   A generic, reusable `Button` component was created to ensure UI consistency for all interactive button elements across the application.
    *   A `GlobalLoader` component was implemented for a consistent full-page loading experience during initial auth/preference checks.

5.  **Styling - Theming and Responsiveness:**
    *   **CSS Modules:** Used for all component-specific styles to ensure encapsulation and maintainability.
    *   **Global Theming with CSS Custom Properties:** A comprehensive theme was established in `src/styles/global.css` using CSS variables for colors (including light/dark mode considerations if extended), typography (using the 'Inter' font family), a consistent spacing scale, shadows, and border-radius. This allows for easy theme adjustments and ensures visual consistency.
    *   **Responsive Design:** A mobile-first mindset was applied. Modern CSS techniques like Flexbox and CSS Grid were used extensively (especially in `App.module.css` and layout-heavy components) to create a fluid and adaptive UI that works well on all screen sizes, from small mobile devices to large desktops. Specific attention was paid to avoiding page scroll where possible by using a full-height flex layout and allowing internal content areas to scroll if necessary.

6.  **Bonus Features & Advanced Concepts:**
    *   All bonus features were successfully integrated: the 5-day forecast, Celsius/Fahrenheit unit switching, the use of React Query, and Supabase for authentication and data persistence.
    *   The application demonstrates knowledge of API integration, polling mechanisms (via React Query), thoughtful component structure, effective use of React Hooks, and robust state management strategies.

7.  **Error Handling and User Feedback:**
    *   API errors from `weatherService.js` are caught by React Query and displayed using a dedicated `ErrorMessage.jsx` component within the relevant display components.
    *   Authentication errors are handled locally within `AuthComponent.jsx`, providing contextual feedback to the user.
    *   Loading states are clearly indicated using spinners and messages.

This structured approach, combining robust state management with a focus on modularity and modern UI/UX principles, allowed for the creation of a comprehensive and polished application that meets all the specified requirements.



