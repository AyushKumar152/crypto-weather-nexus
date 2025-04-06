'use client';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCryptoData } from "../redux/slices/cryptoSlice";

export const useCryptoSocket = (assets) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      try {
        socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets.join(",")}`);

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch(setCryptoData(data)); 
        };

        socket.onerror = (error) => {
          console.error("WebSocket error ❌", error);
          socket.close();
        };

        socket.onclose = () => {
          console.warn("WebSocket closed. Attempting reconnect...");
          setTimeout(connectWebSocket, 3000);
        };
      } catch (err) {
        console.error("WebSocket setup failed:", err);
      }
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, [assets, dispatch]);
};
