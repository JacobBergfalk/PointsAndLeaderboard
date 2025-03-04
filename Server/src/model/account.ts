import bcrypt from "bcrypt";

export interface User {
  username: string;
  password: string;
  balance: number;
}

const users: User[] = []; // fucking array

function findUser(username: string): User | undefined {
  return users.find((user) => user.username === username);
}

export function addUser(username: string, password: string): boolean {
  const salt = bcrypt.genSaltSync(10);

  if (findUser(username)) return false;

  users.push({
    username: username,
    password: bcrypt.hashSync(password, salt),
    balance: 100, // free credits
  });
  return true;
}

export async function authenticateUser(
  username: string,
  password: string
): Promise<boolean> {
  const user = findUser(username);
  if (!user) return false;
  return bcrypt.compare(password, user.password);
}

export async function updateBalance(username: string, amount: number) {
  const user = findUser(username);
  if (!user) return false;

  if (user.balance + amount < 0) return false; // icke negativt
  user.balance += amount;
  return true;
}

export async function getCredits(username: string) {
  return findUser(username)?.balance; // works!
}

export class Account {
  private credits: number;

  constructor(initialCredits: number) {
    this.credits = initialCredits;
  }

  public getCredits(): number {
    return this.credits;
  }

  public addCredits(amount: number): void {
    this.credits += amount;
  }

  public removeCredits(amount: number): void {
    this.credits -= amount;
  }
}
