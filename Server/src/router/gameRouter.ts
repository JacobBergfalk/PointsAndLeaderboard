import express, { Request, Response } from "express";
import { GameService } from "../service/gameService";
import { authenticateUser } from "../model/account";

export const router = express.Router();
const gameService = new GameService(100); //Hundra gratiscredits leovegas

router.post("/coinflip", async (req: Request, res: Response) => {
  const user = gameService.isLoggedIn;
  if (!user) res.status(500).json({ success: false }); // error for not logged in

  const { choice, betAmount } = req.body;

  if (choice !== "Heads") {
    res.status(406).json({ error: "Invalid choice" });
  }

  try {
    const result = await gameService.flipCoin(choice, betAmount, req);
    const balance = await gameService.getCredits(req);
    res.json({ win: result.win, balance });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.get("/balance", async (req: Request, res: Response) => {
  res.json({ balance: gameService["account"].getCredits() });
});

// REGISTER LOGIN AND LOGOUT

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(409)
      .json({ success: false, message: "Requires Username and password" });
  }

  if (await gameService.registerUser(username, password, req)) {
    res.status(201).json({ success: true, message: "User registered" });
  } else {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.get("/session", async (req: Request, res: Response) => {
  const currentUser = gameService.isLoggedIn(req);
  if (await currentUser) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(409)
      .json({ success: false, message: "Requires Username and password" });
  }

  if (await gameService.loginUser(username, password, req)) {
    res.status(201).json({ success: true, message: "Login successful" });
  } else {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  const { username } = req.body;
  await gameService.logoutUser(username, req);
  res.status(201).json({ success: true, message: "Logout successful" });
});

router.get("/balance/get", async (req: Request, res: Response) => {
  const balance = await gameService.getCredits(req);
  if (balance !== undefined) {
    res.json({ success: true, balance });
  } else {
    res.status(401).json({ success: false, message: "User not logged in" });
  }
});

router.post("/balance/add", async (req: Request, res: Response) => {
  const { amount } = req.body;
  if (typeof amount !== "number") {
    res.status(400).json({ success: false, message: "Invalid amount" });
    return;
  }

  const success = await gameService.addCredits(req, amount);
  if (success) {
    const balance = await gameService.getCredits(req);
    res.json({ success: true, balance });
  } else {
    res.status(400).json({ success: false, message: "Failed to add credits" });
  }
});

router.post("/balance/remove", async (req: Request, res: Response) => {
  const { amount } = req.body;
  if (typeof amount !== "number") {
    res.status(400).json({ success: false, message: "Invalid amount" });
    return;
  }

  const success = await gameService.removeCredits(req, amount);
  if (success) {
    const balance = await gameService.getCredits(req);
    res.json({ success: true, balance });
  } else {
    res.status(400).json({
      success: false,
      message: "Insufficient credits or failed transaction",
    });
  }
});
