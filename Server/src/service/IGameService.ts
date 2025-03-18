import { CoinFlipGame } from "../model/games";

export interface IGameService {
  flipCoin(
    choice: "Heads" | "Tails",
    betAmount: number,
    req: any
  ): Promise<CoinFlipGame | null>;

  loginUser(username: string, password: string, req: any): Promise<Boolean>;

  registerUser(username: string, password: string, req: any): Promise<Boolean>;

  isLoggedIn(req: any): Promise<Boolean>;

  getCredits(req: any): Promise<Number | undefined>;

  logoutUser(req: any): Promise<void>;

  addCredits(req: any, amount: number): Promise<Boolean>;

  getUsers(req: any): Promise<any[]>;

  openStockTrade(req: any, betAmount: number): Promise<any>;

  closeStockTrade(
    req: any,
    tradeType: "long" | "short",
    betAmount: number,
    entryPrice: number,
    exitPrice: number
  ): Promise<any>;
}

//TODO
// prevent more trade if already active trades
