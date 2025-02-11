import { CoinFlipGame, Game } from "../model/games";
import { Account } from "../model/account";

export class GameService1 {

    private account: Account;

    constructor(initialcredits: number= 0){
        this.account = new Account(initialcredits);
    }

    async flipCoin(choice: "heads" | "tails", betAmount: number): Promise<CoinFlipGame>{
        const result = Math.random() < 0.5 ? "heads" : "tails";
        const win = choice === result;
        this.winOrLoseCredits(win, betAmount)
        this.displayResult(win);
        return { betAmount, potentialCreditWonOrLost: betAmount, win };
      }

    async displayResult(win: boolean): Promise<void>{
        //Print eller nåt
    }

    async winOrLoseCredits(win: boolean, credits: number): Promise<void>{
        if (win){
            this.account.addCredits(credits)
        } else{
            this.account.removeCredits(credits)
        }
    }
}