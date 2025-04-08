import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import router from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT || "";

//middleware to parse the body
app.use(express.json());

app.use("/v1", router);

app.listen(port, async () => {
  await connectDB();
  console.log(`App is listening at port ${port}`);
});
