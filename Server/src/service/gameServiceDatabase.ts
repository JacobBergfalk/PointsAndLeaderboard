import { CoinFlipGame } from "../model/games";
import {
  addUser,
} from "../model/accountDatabase";
import { IGameService } from "./IGameService";
import { userModel } from "../../db/user.db";


export class gameServiceDatabase implements IGameService {
    
    private account: Account;

    constructor(initialcredits: number) {
      this.account = new Account(initialcredits);
    }

    async registerUser(username: string, password: string, req: any) {
        const success = await addUser(username, password);
        if (success) {
          return { message: "User registered successfully" };
        } else {
          throw new Error("Username already exists");
        }
      }

    async flipCoin

    
}