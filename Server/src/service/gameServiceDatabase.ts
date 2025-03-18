import { CoinFlipGame } from "../model/games";
import { addUser } from "../model/accountDatabase";
import { IGameService } from "./IGameService";
import { userModel } from "../../db/user.db";
import bcrypt from "bcrypt";

export class gameServiceDatabase implements IGameService {
  /**
   * Simulates a coin flip game and detemines by a 50% chans if the user wins or loses.
   *
   * - Checks if the user is logged in.
   * - Ensures the user has enough balance to place the bet.
   * - Updates the user's balance accordingly.
   *
   * @param choice - The user's choice.
   * @param betAmount - The amount wagered on the coin flip.
   * @param req - The request object containing session data.
   * @returns - The result of the game, or null if the user is not authenticated or has insufficient balance.
   */

  async flipCoin(
    choice: "Heads" | "Tails",
    betAmount: number,
    req: any
  ): Promise<CoinFlipGame | null> {
    if (req.session.username === undefined) return null;

    const user = await userModel.findOne({
      where: { username: req.session.username },
    });
    if (!user || user.balance < betAmount) return null;

    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    const win = choice === result;
    const newBalance = win
      ? user.balance + betAmount
      : user.balance - betAmount;

    await user.update({ balance: newBalance });

    return { betAmount, potentialCreditWonOrLost: betAmount, win, choice };
  }

  /**
   * Logs in a user by verifying credentials with the current users and assigning a session with the username.
   *
   * @param username - The username.
   * @param password - The password.
   * @param req - The request object containing session data.
   * @returns - true if login is successful, otherwise false.
   */
  async loginUser(
    username: string,
    password: string,
    req: any
  ): Promise<boolean> {
    const user = await userModel.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.username = username;
      return true;
    }
    return false;
  }
  /**
   * Registers a new user in the database and log in the user
   *
   * @param username - The username
   * @param password - The password
   * @param req - The request object containing session data.
   * @returns - true if registration is successful, otherwise false.
   */
  async registerUser(
    username: string,
    password: string,
    req: any
  ): Promise<boolean> {
    // CHECK IF THERE IS A user already logged in
    const existingUser = await userModel.findOne({ where: { username } });
    if (existingUser) return false;

    addUser(username, password);
    req.session.username = username;
    return true;
  }

  /**
   * Logs out the user from the current session and deletes the session username
   *
   * @param req - The request object containing session data.
   */
  async logoutUser(req: any) {
    if (req === null) {
      console.error("Logout : session is undefined");
      return;
    }

    delete req.session.username;
  }

  /**
   * Checks if a user is logged in.
   *
   * @param req - The request object containing session data.
   * @returns - The username if logged in, otherwise null.
   */
  async isLoggedIn(req: any): Promise<boolean> {
    return req.session && req.session.username ? req.session.username : null;
  }

  /**
   * Retrieves the user's balance.
   *
   * @param req - The request object containing session data.
   * @returns - The user's balance, or undefined if not logged in.
   */
  async getCredits(req: any): Promise<number | undefined> {
    if (!req.session.username) return undefined;
    const user = await userModel.findOne({
      where: { username: req.session.username },
    });
    return user?.balance;
  }

  /**
   * Retrieves all registered users.
   *
   * @param req - The request object containing session data.
   * @returns - A list of users.
   */
  async getUsers(req: any): Promise<any[]> {
    try {
      const users = await userModel.findAll();
      return users;
    } catch (error) {
      console.error("Error", error);
      throw new Error("Could not fetch data");
    }
  }

  /**
   * Adds credits to the user's balance.
   *
   * @param req - The request object containing session data.
   * @param amount - The amount to add.
   * @returns - true if successful, otherwise false.
   */
  async addCredits(req: any, amount: number): Promise<boolean> {
    if (!req.session.username) return false;
    const user = await userModel.findOne({
      where: { username: req.session.username },
    });
    if (!user) return false;
    await user.update({ balance: user.balance + amount });
    return true;
  }

  /**
   * Opens a stock trade.
   *
   * @param req - The request object containing session data.
   * @param betAmount - The amount wagered.
   * @returns - The result of the trade.
   */
  async openStockTrade(req: any, betAmount: number) {
    try {
      if (!req.session.username)
        return { success: false, message: "Not logged in" };

      const user = await userModel.findOne({
        where: { username: req.session.username },
      });

      if (!user || user.balance < betAmount) {
        return { success: false, message: "Insufficient balance" };
      }
      await user.update({ balance: user.balance - betAmount }); // removes betamount when placing bet

      return {
        success: true,
        message: "Trade opened",
      };
    } catch (error) {
      console.error("Error opening trade:", error);
      return { success: false, message: "Error opening trade" };
    }
  }

  /**
   * Closes a stock trade.
   *
   * @param req - The request object containing session data.
   * @param tradeType - Long or Short.
   * @param betAmount - The amount wagered.
   * @param entryPrice - Entry price of the trade.
   * @param exitPrice - Exit price of the trade.
   * @returns - The result of the trade.
   */
  async closeStockTrade(
    req: any,
    tradeType: "long" | "short",
    betAmount: number,
    entryPrice: number,
    exitPrice: number
  ) {
    try {
      if (!req.session.username)
        return { success: false, message: "Not logged in" };

      const user = await userModel.findOne({
        where: { username: req.session.username },
      });
      if (!user) return { success: false, message: "User not found" };

      let profitOrLoss = 0;
      if (tradeType === "long") {
        profitOrLoss = (exitPrice - entryPrice) * (betAmount / entryPrice);
      } else if (tradeType === "short") {
        profitOrLoss = (entryPrice - exitPrice) * (betAmount / entryPrice);
      }
      await user.update({ balance: Math.round(user.balance + profitOrLoss) }); // updates and adds the rest of the betamount not lost

      return { success: true, newBalance: user.balance, profitOrLoss };
    } catch (error) {
      console.error("Error closing trade:", error);
      return { success: false, message: "Error closing trade" };
    }
  }
}
