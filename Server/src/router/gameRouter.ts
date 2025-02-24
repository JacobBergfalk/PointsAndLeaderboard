import express, { Request, Response } from "express";
import { GameService } from "../service/gameService";

export const router = express.Router();
const gameService = new GameService(100); //Hundra gratiscredits leovegas

router.post("/coinflip", async (req: Request, res: Response) => {
  const { choice, betAmount } = req.body;

  if (choice !== "Heads") {
    res.status(400).json({ error: "Invalid choice" });
  }

  try {
    const result = await gameService.flipCoin(choice, betAmount);
    const balance = gameService["account"].getCredits();
    res.json({ win: result.win, balance });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get("/balance", async (req: Request, res: Response) => {
  res.json({ balance: gameService["account"].getCredits() });
});
