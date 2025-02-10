export interface CoinFlipGame {
  credits: number;
  choice: "heads" | "tails";
  result: "heads" | "tails";
  win: boolean;
}
