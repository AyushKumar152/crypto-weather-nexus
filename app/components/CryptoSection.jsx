"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCryptoSocket } from "../hooks/useCryptoSocket";

const assets = ["bitcoin", "ethereum", "solana", "dogecoin", "cardano", "litecoin"];

const boxStyles = {
  bitcoin: "border-yellow-500 bg-yellow-100 text-yellow-800",
  ethereum: "border-purple-500 bg-purple-100 text-purple-800",
  solana: "border-green-500 bg-green-100 text-green-800",
  dogecoin: "border-orange-400 bg-orange-100 text-orange-800",
  cardano: "border-blue-400 bg-blue-100 text-blue-800",
  litecoin: "border-gray-400 bg-gray-100 text-gray-800",
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const CryptoSection = () => {
  useCryptoSocket(assets); // just to fetch and dispatch

  const prices = useSelector((state) => state.crypto.cryptoData); // ⬅️ Redux data

  return (
    <div className="flex flex-col gap-4 mt-4">
      {Object.entries(prices).map(([coin, price], index) => (
        <motion.div
          key={coin}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ scale: 1.05 }}
          className={`w-full border-2 rounded-xl px-4 py-3 font-semibold shadow-md flex justify-between items-center ${
            boxStyles[coin] || "border-white bg-white text-black"
          }`}
        >
          <span className="uppercase text-lg">{coin}</span>
          <span className="text-xl font-bold">
            ${parseFloat(price).toFixed(2)}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CryptoSection;
