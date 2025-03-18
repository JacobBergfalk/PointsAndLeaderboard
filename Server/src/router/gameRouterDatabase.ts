import express, { Request, Response } from "express";
import { IGameService } from "../service/IGameService";
import { gameServiceDatabase } from "../service/gameServiceDatabase";
import { exit } from "process";

export const router = express.Router();
const gameService: IGameService = new gameServiceDatabase();

/**
 * Handles the coin flip game.
 *
 * - Requires the user to be logged in.
 * - Validates the users choice and bet amount.
 * - Executes the coin flip and returns the result.
 */
router.post("/coinflip", async (req: Request, res: Response) => {
  const user = await gameService.isLoggedIn(req);

  if (!user) {
    res.status(401).json({ error: "Not logged in" }); // error for not logged in
    return;
  }

  const { choice, betAmount } = req.body;

  if (!choice || !betAmount || typeof betAmount !== "number" || betAmount < 0) {
    res
      .status(400)
      .json({ success: false, message: "Invalid request parameters" });
    return;
  }

  if (choice !== "Heads") {
    res.status(406).json({ success: false, error: "Invalid choice" });
    return;
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
    res.status(500).json({ success: false, message: "Database error" });
  }
});

// REGISTER LOGIN AND LOGOUT

/**
 * Handles user registration.
 *  - Validates if the request contains a valid username and password
 */
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(409)
      .json({ success: false, message: "Requires Username and password" });
  }

  try {
    const success = await gameService.loginUser(username, password, req);
    if (success) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

/**
 * Handles logout.
 */
router.post("/logout", async (req: Request, res: Response) => {
  try {
    await gameService.logoutUser(req);
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * Handles user registration.
 * - Validates if the request contains a valid username and password
 */
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(409)
      .json({ success: false, message: "Requires Username and password" });
    return;
  }

  try {
    const registered = await gameService.registerUser(username, password, req);
    if (registered) {
      res.status(201).json({ success: true, message: "User registered" });
    } else {
      res
        .status(409)
        .json({ success: false, message: "Username already exists" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Database error" });
  }
});

/**
 * Returns the current session status.
 * - True if a user is signed in otherwise false
 */
router.get("/session", async (req: Request, res: Response) => {
  try {
    const currentUser = await gameService.isLoggedIn(req);
    if (currentUser) {
      res.status(200).json({ loggedIn: true, username: currentUser });
    } else {
      res.status(401).json({ loggedIn: false, message: "User not logged in" });
    }
  } catch (error) {
    console.error("Session check error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * Returns a list of all users logged in the database
 * -  Returns the list as a JSON
 */
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await gameService.getUsers(req);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// BALANCE

/**
 * Retrieves the user's balance.
 */
router.get("/balance/get", async (req: Request, res: Response) => {
  try {
    const balance = await gameService.getCredits(req);
    if (balance !== undefined) {
      res.status(200).json({ success: true, balance });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Could not retrieve balance" });
    }
  } catch (error) {
    console.error("Balance error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * Adds credits to the user's balance.
 * - Validates if the request contains a valid number
 */
router.post("/balance/add", async (req: Request, res: Response) => {
  const { amount } = req.body;
  if (typeof amount !== "number") {
    res.status(400).json({ success: false, message: "Invalid amount" });
    return;
  }

  try {
    const success = await gameService.addCredits(req, amount);
    if (success) {
      const balance = await gameService.getCredits(req);
      res.json({ success: true, balance });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Failed to add credits" });
    }
  } catch (error) {
    console.error("Balance add error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Stock Chart

/**
 * Opens a stock trade.
 * - Validates if the request contains a valid paramiters
 */
router.post("/stock/trade", async (req: Request, res: Response) => {
  const { tradeType, betAmount, entryPrice } = req.body;
  if (
    !tradeType ||
    !betAmount ||
    !entryPrice ||
    betAmount < 0 ||
    entryPrice < 0
  ) {
    res.status(400).json({ success: false, message: "Invalid request" });
    return;
  }

  try {
    const result = await gameService.openStockTrade(req, betAmount);
    res.json(result);
  } catch (error) {
    console.error("Stock trade error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/**
 * Closes a stock trade.
 */
router.post("/stock/close", async (req: Request, res: Response) => {
  const { tradeType, betAmount, entryPrice, exitPrice } = req.body;
  if (
    !tradeType ||
    !betAmount ||
    !entryPrice ||
    !exitPrice ||
    betAmount < 0 ||
    entryPrice < 0 ||
    exitPrice < 0
  ) {
    res.status(400).json({ success: false, message: "Invalid request" });
    return;
  }

  try {
    const result = await gameService.closeStockTrade(
      req,
      tradeType,
      betAmount,
      entryPrice,
      exitPrice
    );
    res.json(result);
  } catch (error) {
    console.error("Stock close error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
