import { CoinFlipGame } from "../model/games";
import { Account } from "../model/account";

export class GameService {

    private account: Account;

    constructor(initialcredits: number){
        this.account = new Account(initialcredits);
    }

    async flipCoin(choice: "heads" | "tails", betAmount: number): Promise<CoinFlipGame>{
        const result = Math.random() < 0.5 ? "heads" : "tails";
        const win = choice === result;
        this.winOrLoseCredits(win, betAmount)
        //this.displayResult(win);
        return { betAmount, potentialCreditWonOrLost: betAmount, win, choice};
      }

    public displayResult(win: boolean){
        //Print eller nåt
    }

    public winOrLoseCredits(win: boolean, credits: number): void{
        if (win){
            this.account.addCredits(credits)
        } else{
            this.account.removeCredits(credits)
        }
    }
}