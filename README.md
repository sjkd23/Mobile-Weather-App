# Mobile Weather App

A modern, easy-to-use weather forecasting **mobile application** built with React Native and Expo.

---

## Overview

The Mobile Weather App is a cross-platform tool that lets you search for cities, view current weather, and see a 5-day forecast; all in a clean, responsive mobile UI. It uses the OpenWeatherMap API for real-time weather and city lookups. You can easily toggle between light/dark mode, switch Celsius/Fahrenheit, and all your preferences are saved automatically.

---

## Features

- **Search any city worldwide** with auto-suggestions
- **See current weather conditions**  
  (temperature, “feels like,” humidity, wind, weather icons, and more)
- **5-day forecast**: Daily high/low, weather icons, and text descriptions
- **Celsius ↔ Fahrenheit toggle**
- **Light and dark theme support** (system-aware)
- **Robust error handling** with friendly messages
- **Loading indicators** for a smooth experience
- **Designed for mobile**: Fully touch-friendly and responsive
- **Persistent preferences** (unit, theme) with AsyncStorage

---

## Project Structure

```plaintext
app/
  index.tsx                 # App entry point, navigation
  _layout.tsx               # Root layout (Expo Router)
components/
  Header.tsx                # App header, title, theme toggle
  Footer.tsx                # App footer
  SearchBar.tsx             # City search with suggestions
  Error.tsx                 # Error message display
  Loader.tsx                # Loading spinner
  UnitToggle.tsx            # Celsius/Fahrenheit toggle
  ThemeToggle.tsx           # Light/Dark toggle
  SectionWrapper.tsx        # UI wrapper component
  GradientLine.tsx          # Themed line divider
  forecast/
    Forecast.tsx            # Forecast list/grid logic
    ForecastCard.tsx        # Individual forecast card
  today/
    CurrentWeatherCard.tsx  # Current weather card
    LaterTodayForecast.tsx  # Later today’s forecast
hooks/
  useWeatherData.ts         # Fetches weather and forecast data
  useCitySuggestions.ts     # Fetches city suggestions for search
  useDebounce.ts            # Debounce utility for input
context/
  ThemeContext.tsx          # Theme state/context management
  UnitContext.tsx           # Unit state/context management
constants/
  Colors.ts                 # Centralized color palette
  Themes.ts                 # Theme definitions
lib/
  fetchJSON.ts              # API fetch helper with error handling
````

---

## External Libraries & Frameworks

- [React Native](https://reactnative.dev/) – Native app framework
- [Expo](https://expo.dev/) – Mobile toolchain & build system
- [React Navigation](https://reactnavigation.org/) – Navigation
- [OpenWeatherMap API](https://openweathermap.org/api) – Weather and geocoding data
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – Saves your theme/unit settings
- [Expo Vector Icons](https://icons.expo.fyi/) – App icons

---

## Installation & Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/Mobile-Weather-App.git
   cd mobile-weather-app
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the project root:

     ```env
     EXPO_WEATHER_API_KEY=your_openweathermap_api_key
     ```

    [Get your API key from OpenWeatherMap](https://openweathermap.org/appid)

4. **Start the Expo development server**

   ```sh
   npx expo start
   ```

   - Follow the prompts to launch on your emulator or real device (scan QR code with Expo Go).

---

## How to Use

- **Search** for any city using the search bar.
- Instantly **see current weather** and a **5-day forecast**.
- **Switch units** or **toggle dark mode** from the header—your choices are saved.
- Works great on Android and iOS.

---

## Code Organization Notes

- **App entry/navigation:** `app/index.tsx` and `app/_layout.tsx` (Expo Router)
- **Weather data fetching:** in `hooks/` and `lib/fetchJSON.ts`
- **UI components:** in `components/` (organized by feature)
- **Theme and color management:** `constants/` and `context/ThemeContext.tsx`
- **All user preferences** are persisted with AsyncStorage

---

## License

MIT
