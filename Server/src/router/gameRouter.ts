import express, { Request, Response } from "express";
import { GameService } from "../service/gameService";

export const router = express.Router();
const gameService = new GameService(100); //Hundra gratiscredits leovegas

//Denna funkar inte för någon anledning får felsöka senare
router.post("/", async(req: Request, res: Response) =>{
    const { choice, betAmount } = req.body;

    if (!["heads", "tails"].includes(choice)) {
        res.status(400).json({error: "Wrong input, need to be 'heads' or 'tails"});
        return;
    }

    if (betAmount <= 0) {
        res.status(400).json({error: "Bet amount must be greater than 0"});
        return;
    }

    try {
        const result = await gameService.flipCoin(choice, betAmount);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
});

router.get("/balance", async(req: Request, res: Response) => {
    const result = await gameService.displayCredits();
    res.json(result);
    //res.json({ balance: gameService["account"].getCredits() });
});