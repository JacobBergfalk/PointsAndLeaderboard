import { Request, Response } from "express";
import { GameService } from "../service/gameService";

export class GameController {
  static flipcoin(req: Request, res: Response) {
    const { choice } = req.body;

    if (choice !== "heads" || choice !== "tails") {
      return res
        .status(400)
        .send("Invalid choice. Must be 'heads' or 'tails'.");
    }

    const gameResult = GameService.flipCoin(choice);
    res.json(gameResult);
  }
}
