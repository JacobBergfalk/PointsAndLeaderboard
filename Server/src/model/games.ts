export interface Game{
    betAmount: number;
    potentialCreditWonOrLost: number;
    win: boolean;
}

export class CoinFlipGame implements Game{
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