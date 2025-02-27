import express, { Request, Response } from "express";
import { GameService } from "../service/gameService";

export const router = express.Router();
const gameService = new GameService(100); //Hundra gratiscredits leovegas

router.post("/coinflip", async (req: Request, res: Response) => {
  const { choice, betAmount } = req.body;

  if (choice !== "Heads") {
    res.status(406).json({ error: "Invalid choice" });
  }

  try {
    const result = await gameService.flipCoin(choice, betAmount);
    const balance = gameService["account"].getCredits();
    res.json({ win: result.win, balance });
  } catch (error) {
    res.status(500).json({success: false, });
  }
});

router.get("/balance", async (req: Request, res: Response) => {
  res.json({ balance: gameService["account"].getCredits() });
});



// REGISTER LOGIN AND LOGOUT

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if(!username || !password) {
    res.status(409).json({ success: false, message: "Requires Username and password"});
  }

  if(await gameService.registerUser(username, password, req)) {
    res.status(201).json({ success: true, message: "User registered"});
  } else {
    res.status(500).json({ success: false, message: "Something went wrong"});
  }
 
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if(!username || !password) {
    res.status(409).json({ success: false, message: "Requires Username and password"});
  }

  if(await gameService.loginUser(username, password, req)) {
    res.status(201).json({ success: true, message: "Login successful"});
  } else {
    res.status(500).json({ success: false, message: "Something went wrong"});
  }
 
});

router.post("/logout", async (req: Request, res: Response) => {
  const { username } = req.body;
  await gameService.logoutUser(username, req);
  return  res.status(201).json({ success: true, message: "Logout successful"});
});

