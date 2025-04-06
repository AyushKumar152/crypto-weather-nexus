

export const fetchNews = async () => {
  const apiKey = "pub_785151b5e348e9d7b9b319a0fe102d22da01c";
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cryptocurrency&country=in&language=en&category=business`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.results || [];
  } catch (err) {
    console.error("Error fetching news:", err);
    return [];
  }
};
