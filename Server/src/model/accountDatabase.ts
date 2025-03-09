import bcrypt from "bcrypt";
import { userModel } from "../../db/user.db";


export async function addUser(username: string, password: string): Promise<boolean> {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) return false; // Returnera false om användaren redan finns
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    try {
      await userModel.create({
        username: username,
        password: hashedPassword,
        balance: 100, // free credits
      });
      return true;
    } catch (error) {
      console.error("Error registering user:", error);
      return false;
    }
  }
