export const fetchWeather = async (city) => {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data?.error || "Failed to fetch weather");
    }
  
    return data;
  };
  