export interface Game{
    betAmount: number;
    potentialCreditWonOrLost: number; //Kanske borde heta typ creditChange, så kan man sätta den till +-50 typ
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