import { CoinFlipGame } from "../model/games";
import { addUser } from "../model/accountDatabase";
import { IGameService } from "./IGameService";
import { userModel } from "../../db/user.db";
import bcrypt from "bcrypt";

export class gameServiceDatabase implements IGameService {
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

  async registerUser(
    username: string,
    password: string,
    req: any
  ): Promise<boolean> {
    const existingUser = await userModel.findOne({ where: { username } });
    if (existingUser) return false;

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      username,
      password: hashedPassword,
      balance: 100,
    }); // Default balance

    req.session.username = username;

    return true;
  }

  async logoutUser(req: any) {
    if (req === undefined) {
      console.error("Logout : session is undefined");
      return;
    }

    delete req.session.username;
  }

  async isLoggedIn(req: any): Promise<boolean> {
    return req.session.username !== undefined;
  }

  async getCredits(req: any): Promise<number | undefined> {
    if (!req.session.username) return undefined;
    const user = await userModel.findOne({
      where: { username: req.session.username },
    });
    return user?.balance;
  }

  async getUsers(req: any): Promise<any[]> {
    try{
    const users = await userModel.findAll();
    return users;
    } catch(error) {
      console.error("Error", error);
      throw new Error("Could not fetch data")
    }
  }

  async addCredits(req: any, amount: number): Promise<boolean> {
    if (!req.session.username) return false;
    const user = await userModel.findOne({
      where: { username: req.session.username },
    });
    if (!user) return false;
    await user.update({ balance: user.balance + amount });
    return true;
  }

  async removeCredits(req: any, amount: number): Promise<boolean> {
    if (!req.session.username) return false;
    const user = await userModel.findOne({
      where: { username: req.session.username },
    });
    if (!user || user.balance < amount) return false;
    await user.update({ balance: user.balance - amount });
    return true;
  }
}
