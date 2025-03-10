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

  logoutUser(req: any): Promise<void>; //Denna kanske borde returnera något egentligen så vi vet om den är utloggad eller inte

  addCredits(req: any, amount: number): Promise<Boolean>;

  removeCredits(req: any, amount: number): Promise<Boolean>;
}
