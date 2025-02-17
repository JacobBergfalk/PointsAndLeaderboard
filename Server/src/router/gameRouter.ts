import express, { Request, Response } from "express";
import { GameService } from "../service/gameService";

export const router = express.Router();
const gameService = new GameService(100); //Hundra gratiscredits leovegas

//Denna funkar inte för någon anledning får felsöka senare
router.post("/", async(req: Request, res: Response) =>{
    const { choice, betAmount } = req.body;

    if (!["heads", "tails"].includes(choice)) {
        //return res.status(400).json({ error: "Invalid choice. Must be 'heads' or 'tails'." });
    }

    if (betAmount <= 0) {
       // return res.status(400).json({ error: "Bet amount must be greater than zero." });
    }

    try {
        const result = await gameService.flipCoin(choice, betAmount);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
});

router.get("/", async(req: Request, res: Response) => {
    res.json({ balance: gameService["account"].getCredits() });
});