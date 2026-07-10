import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { PrismaClient } from "@prisma/client";

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});