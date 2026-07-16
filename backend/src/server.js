import dotenv from "dotenv";
dotenv.config();
import { initializeSocket } from "./socket/socket.js";
import app from "./app.js";
import { PrismaClient } from "@prisma/client";
import { setIO } from "./socket/socketManager.js";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

// Test Database Connection
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Supabase Database");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

connectDB();

import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setIO(io);
initializeSocket(io);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});