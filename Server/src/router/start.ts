import express from "express";
import { router as gameRouter1} from "../router/gameRouter1";

export const app = express();

app.use(express.json());
app.use("/game", gameRouter1);