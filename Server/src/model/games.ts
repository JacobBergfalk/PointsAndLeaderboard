export interface Game {
  betAmount: number;
  potentialCreditWonOrLost: number; // Represents the potential profit or loss
  win: boolean;
}

/**
 * Represents a Coin Flip game.
 *
 * - Stores the bet amount, choice, and outcome of the game.
 * - The "win" property is determined after flipping the coin.
 */
export class CoinFlipGame implements Game {
  betAmount: number;
  potentialCreditWonOrLost: number;
  win: boolean;
  choice: string;

  constructor(betAmount: number, choice: "heads" | "tails") {
    this.betAmount = betAmount;
    this.potentialCreditWonOrLost = betAmount;
    this.win = false;
    this.choice = choice;
  }
}
