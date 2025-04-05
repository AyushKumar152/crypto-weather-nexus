import { useEffect, useState } from "react";
import { fetchCryptoNews } from "../lib/fetchNews"; // adjust the path if needed

const useCryptoNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchCryptoNews();
      setNews(newsData);
      setLoading(false);
    };

    loadNews();
  }, []);

  return { news, loading };
};

export default useCryptoNews;
