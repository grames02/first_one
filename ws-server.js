// service/ws-server.js

const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const cors = require("cors");

const app = express();
const port = 4000;

// Enable CORS for API routes if needed
app.use(cors());
app.use(express.json());

// Optional: basic HTTP route for sanity check
app.get("/", (req, res) => {
  res.send("HTTP server is running!");
});

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server on the same HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected via WebSocket");

  // Send a JSON message to the client
  ws.send(JSON.stringify({ message: "Hello from the server!" }));

  ws.on("message", (message) => {
    console.log("📨 Received:", message.toString());

    // Respond with a JSON object
    ws.send(JSON.stringify({
      message: `You said: ${message}`,
    }));
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start listening
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
