"use client";
import { useEffect, useState } from "react";

const mockWeatherAlerts = [
  "⚠️ Heavy rain expected in Mumbai!",
  "🌪️ Storm warning in Delhi!",
  "☀️ Heatwave alert in Jaipur!",
  "🌨️ Snowfall expected in Shimla!",
];

export default function WeatherAlerts() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockWeatherAlerts.length);
      setAlert(mockWeatherAlerts[randomIndex]);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-500/20 p-4 rounded-xl shadow-lg mt-6">
      <h2 className="text-lg font-semibold mb-2">🚨 Weather Alert</h2>
      <p className="text-yellow-200 font-medium">{alert}</p>
    </div>
  );
}
