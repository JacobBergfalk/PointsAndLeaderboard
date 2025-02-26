import cors from "cors";
import express from "express";
import { router as gameRouter } from "./gameRouter";

import session from "express-session";
import dotenv from "dotenv";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/game", gameRouter);
