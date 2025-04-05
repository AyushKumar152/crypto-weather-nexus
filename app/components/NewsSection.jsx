"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoNews } from "../redux/slices/newsSlice";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const NewsSection = () => {
  const dispatch = useDispatch();
  const { articles: news, loading, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getCryptoNews());
  }, [dispatch]);

  return (
    <div className="p-4 max-h-[600px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Latest Crypto News</h2>
      <ul className="space-y-4">
        {loading ? (
          <li className="text-white">Loading news...</li>
        ) : error ? (
          <li className="text-red-400">{error}</li>
        ) : news.length > 0 ? (
          news.map((item, index) => (
            <motion.li
              key={index}
              className="bg-gray-900 p-4 rounded-xl shadow text-white"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <h3 className="font-bold text-lg">{item.title}</h3>
              </a>
              <p className="text-sm mt-1">{item.description}</p>
              <span className="text-xs text-gray-400 mt-2 block">
                Source: {item.source_id}
              </span>
            </motion.li>
          ))
        ) : (
          <li className="text-white">No news available.</li>
        )}
      </ul>
    </div>
  );
};

export default NewsSection;
