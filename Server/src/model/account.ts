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