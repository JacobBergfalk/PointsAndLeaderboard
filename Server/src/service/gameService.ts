import { CoinFlipGame } from "../model/games";
import { Account, addUser, checkUser } from "../model/account";

export class GameService {
  private account: Account;

  constructor(initialcredits: number) {
    this.account = new Account(initialcredits);
  }

  async flipCoin(
    choice: "Heads" | "Tails",
    betAmount: number
  ): Promise<CoinFlipGame> {
    const result = Math.random() < 0.5 ? "Heads" : "Tails";
    const win = choice === result;
    this.winOrLoseCredits(win, betAmount);
    this.displayResult(win);
    return { betAmount, potentialCreditWonOrLost: betAmount, win, choice };
  }

  async displayResult(win: boolean) {
    this.account.getCredits();
  }

  public winOrLoseCredits(win: boolean, credits: number): void {
    if (win) {
      this.account.addCredits(credits);
    } else {
      this.account.removeCredits(credits);
    }
  }

  async loginUser(username: string, password: string, req: any) {
    if (await checkUser(username, password)) {
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
}
