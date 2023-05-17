const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});
const queue = require("./db/queue");

//in case server and client run on different urls
io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.on("name", (data) => {
    console.log(data);
    io.emit("public", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });

  socket.on("addToQueue", (user) => {
    queue.push(user);
    console.log("User added to queue:", user);
    io.emit("queueUpdated", queue); // Emit updated queue to all clients
  });
});

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});

app.get("/api", (req, res) => {
  console.log(queue);
  res.json(queue);
});

app.post("/api", (req, res) => {
  queue.push(req.body);
});
