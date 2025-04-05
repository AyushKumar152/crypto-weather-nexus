'use client';
import WeatherSection from "./components/WeatherSection";
import CryptoSection from "./components/CryptoSection";
import NewsSection from "./components/NewsSection";
import { motion } from 'framer-motion';

export default function DashBoard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="p-4"
    >
      {
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Crypto Weather Nexus 🌍</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <WeatherSection />
          <CryptoSection />
          <NewsSection />
        </div>
      </div>
  
      }
    </motion.div>
  );
}