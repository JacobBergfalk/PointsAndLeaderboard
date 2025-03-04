import { CoinFlipGame } from "../model/games";
import {
  Account,
  addUser,
  authenticateUser,
  updateBalance,
  getCredits,
} from "../model/account";

export class GameService {
  private account: Account;

  constructor(initialcredits: number) {
    this.account = new Account(initialcredits);
  }

  async flipCoin(
    choice: "Heads" | "Tails",
    betAmount: number,
    req: any
  ): Promise<CoinFlipGame> {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    const win = choice === result;

    updateBalance(req.session.username, win ? betAmount : -betAmount);
    return { betAmount, potentialCreditWonOrLost: betAmount, win, choice };
  }

  async loginUser(username: string, password: string, req: any) {
    if (await authenticateUser(username, password)) {
      req.session.username = username;
      return true;
    }
    return false;
  }

  async registerUser(username: string, password: string, req: any) {
    if (addUser(username, password)) {
      req.session.username = username;
      return true;
    }
    return false;
  }

  async logoutUser(username: string, req: any) {
    delete req.session.username;
  }

  async isLoggedIn(req: any) {
    return req.session.username ?? undefined; // check if username ===  undefined
  }

  // necessary??????
  async addCredits(req: any, amount: number): Promise<boolean> {
    if (!req.session.username) return false;
    return await updateBalance(req.session.username, amount);
  }
  // necessary??????
  async removeCredits(req: any, amount: number): Promise<boolean> {
    if (!req.session.username) return false;
    return await updateBalance(req.session.username, -amount);
  }

  async getCredits(req: any): Promise<number | undefined> {
    if (!req.session.username) return undefined;
    return await getCredits(req.session.username);
  }
}
