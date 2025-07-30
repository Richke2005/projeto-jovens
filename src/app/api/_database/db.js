import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connect() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

async function disconnect() {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
}

export {
  prisma,
  connect,
  disconnect,
};