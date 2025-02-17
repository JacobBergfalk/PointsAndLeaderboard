import express from "express";
import { router as gameRouter} from "./gameRouter";

export const app = express();

app.use(express.json());


app.use("/game", gameRouter);