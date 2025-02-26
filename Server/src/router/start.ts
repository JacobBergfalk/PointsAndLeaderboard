import cors from "cors";
import express from "express";
import { router as gameRouter } from "./gameRouter";

import session from "express-session";
import dotenv from "dotenv";

export const app = express();

app.use(express.json());
app.use("/game", gameRouter);

dotenv.config();
if (!process.env.SESSION_SECRET) {
  console.log("Could not find SESSION_SECRET in .env file");
  process.exit();
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
