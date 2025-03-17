import express, { Request, Response } from "express";
import { GameService } from "../service/gameService";
import { authenticateUser } from "../model/account";
import { IGameService } from "../service/IGameService";
import { gameServiceDatabase } from "../service/gameServiceDatabase";

export const router = express.Router();
const gameService: IGameService = new gameServiceDatabase();

router.post("/coinflip", async (req: Request, res: Response) => {
  const user = await gameService.isLoggedIn(req);
  if (!user) {
    res.status(401).json({ error: "Not logged in" }); // error for not logged in
    return;
  }

  const { choice, betAmount } = req.body;

  if (choice !== "Heads") {
    res.status(406).json({ error: "Invalid choice" });
  }

  try {
    const result = await gameService.flipCoin(choice, betAmount, req);
    const balance = await gameService.getCredits(req);
    if (result === null) {
      res.status(500).json({ success: false });
      return;
    }

    res.json({ win: result.win, balance });
  } catch (error) {
    res.status(500).json({ success: false });
  }
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
  const currentUser = await gameService.isLoggedIn(req);

  if (currentUser) {
    res.status(200).json({ loggedIn: true, username: currentUser });
  } else {
    res.status(401).json({ loggedIn: false, message: "User not logged in" });
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

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await gameService.getUsers(req);
    //console.log(users[0].data.username);
    res.json(users); // Skickar användarna som JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  const { username } = req.body;
  await gameService.logoutUser(username);
  res.status(201).json({ success: true, message: "Logout successful" });
});

// /BALANCE

router.get("/balance/get", async (req: Request, res: Response) => {
  const balance = await gameService.getCredits(req);

  if (balance !== null) {
    res.status(200).json({ success: true, balance });
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

router.post("/stock/trade", async (req: Request, res: Response) => {
  const { tradeType, betAmount, entryPrice } = req.body;
  if (!tradeType || !betAmount || !entryPrice) {
    res.status(400).json({ success: false, message: "Invalid request" });
    return;
  }

  const result = await gameService.openStockTrade(req, betAmount);
  res.json(result);
});

router.post("/stock/close", async (req: Request, res: Response) => {
  const { tradeType, betAmount, entryPrice, exitPrice } = req.body;
  if (!tradeType || !betAmount || !entryPrice || !exitPrice) {
    res.status(400).json({ success: false, message: "Invalid request" });
    return;
  }

  const result = await gameService.closeStockTrade(
    req,
    tradeType,
    betAmount,
    entryPrice,
    exitPrice
  );
  res.json(result);
});
