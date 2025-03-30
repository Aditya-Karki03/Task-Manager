import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || "";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});
