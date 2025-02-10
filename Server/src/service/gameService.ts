import { CoinFlipGame } from "../model/gamestate";

export class GameService {
  static flipCoin(choice: "heads" | "tails"): CoinFlipGame {
    const result = Math.random() < 0.5 ? "heads" : "tails";
    const win = choice === result;

    return {
      credits: win ? 50 : -50, // potentiellt credits??
      choice,
      result,
      win,
    };
  }
}
