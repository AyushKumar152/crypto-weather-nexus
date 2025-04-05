const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

ws.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  console.log(data);
};

ws.onerror = (e) => {
  console.error("WebSocket error:", e);
};
