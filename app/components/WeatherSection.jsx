"use client";

import { useDispatch, useSelector } from "react-redux";
import { setCity, getWeatherData } from "../redux/slices/weatherSlice";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

const getWeatherIcon = (weather) => {
  switch (weather) {
    case "Clear":
      return <WiDaySunny size={64} />;
    case "Clouds":
      return <WiCloudy size={64} />;
    case "Rain":
      return <WiRain size={64} />;
    case "Snow":
      return <WiSnow size={64} />;
    case "Thunderstorm":
      return <WiThunderstorm size={64} />;
    default:
      return <WiFog size={64} />;
  }
};

export default function Home() {
  const dispatch = useDispatch();
  const { city, data: weatherData, error, loading } = useSelector(
    (state) => state.weather
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") dispatch(getWeatherData(city));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <motion.input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => dispatch(setCity(e.target.value))}
            className="p-3 rounded-md text-black focus:outline-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          />
          <motion.button
            type="submit"
            className="bg-white text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-100 transition"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Weather"}
          </motion.button>
        </form>

        {error && (
          <motion.p
            className="text-red-300 mt-4 text-center font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {error}
          </motion.p>
        )}

        {weatherData && (
          <motion.div
            className="mt-6 text-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {getWeatherIcon(weatherData.weather[0].main)}
            <h2 className="text-2xl font-bold">{weatherData.name}</h2>
            <p className="text-lg">{weatherData.weather[0].main}</p>
            <p className="text-3xl font-semibold">
              {weatherData.main.temp}°C
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
