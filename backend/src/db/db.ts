import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("DB Connected Successfully!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
export async function disconnectDB() {
  try {
    await prisma.$disconnect();
    console.log("DB disconnected Successfully! ");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
