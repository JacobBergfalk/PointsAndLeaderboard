import bcrypt from "bcrypt";

export interface User {
  username : string;
  password : string;
  balance : number;
}



const users: User[] = []; // fucking array


export function addUser(username: string, password: string) : boolean {
  const salt = bcrypt.genSaltSync(10);

  if(users.find((user) => user.username === username)) return false;

  users.push(new User({
     username: username,
     password: bcrypt.hashSync(password, salt),
     balance: 100, // free credits
  }));
  return true;
} 


export function checkUser(username: string, password: string ): boolean  {
 const user = users.find((user) => user.username === username);
 if(!user) return false;
 return (bcrypt.compare(password, user.password));
}

const getCredits: any(User: username) = () => {
  return this.balance;
}

export const addCredits: any(amount : number) : void => {

}

const removeCredits: any (amount : number): void {
  this.balance +=amount;
}



export class Account{
    private credits: number;

    constructor(initialCredits: number) {
      this.credits= initialCredits;
    }
  
    public getCredits(): number{
      return this.credits;
    }
  
    public addCredits(amount: number) :void{
      this.credits += amount;
    }

    public removeCredits(amount: number): void{
        this.credits -=amount;
    }
  
  }