import cors from "cors";
import express from "express";
import { router as gameRouter } from "./src/router/gameRouter";

import session from "express-session";
import dotenv from "dotenv";

export const app = express();

dotenv.config();
app.use(express.json());
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
app.use("/game", gameRouter);
