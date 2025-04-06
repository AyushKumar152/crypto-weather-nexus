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
        const lowerCaseAssets = assets.map(asset => asset.toLowerCase());
        const url = `wss://ws.coincap.io/prices?assets=${lowerCaseAssets.join(",")}`;
        console.log("🔌 Connecting to WebSocket URL:", url);

        socket = new WebSocket(url);

        socket.onopen = () => {
          console.log("✅ WebSocket connected");
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("📩 WebSocket message:", data);
          dispatch(setCryptoData(data));
        };

        socket.onerror = (event) => {
          console.error("❌ WebSocket error", {
            type: event.type,
            target: event.target,
            message: event.message,
            event,
          });

          if (socket.readyState !== WebSocket.CLOSED) socket.close();
        };

        socket.onclose = (event) => {
          console.warn("🔌 WebSocket closed. Attempting reconnect in 3s...", {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
          });
          setTimeout(connectWebSocket, 3000);
        };
      } catch (err) {
        console.error("❌ WebSocket setup failed:", err);
      }
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
    };
  }, [assets, dispatch]);
};
