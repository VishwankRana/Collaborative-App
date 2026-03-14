import express from "express";
import { createServer } from "http";
import { connect } from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import socketHandler from "./socket/socketHandler";

const app = express();
app.use(cors());

connect("mongodb://127.0.0.1:27017/collabDocs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

socketHandler(io);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});