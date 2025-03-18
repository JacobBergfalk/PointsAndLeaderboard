import bcrypt from "bcrypt";
import { userModel } from "../../db/user.db";

/**
 * Adds a new user to the database.
 *
 * - Checks if the username already exists.
 * - Hashes the password before storing it securely.
 * - Initializes the user with a default balance of 100.
 *
 * @param {string} username - The username of the new user.
 * @param {string} password - The password to be hashed and stored.
 * @returns {Promise<boolean>} Returns true if the user was successfully added, otherwise false.
 */
export async function addUser(
  username: string,
  password: string
): Promise<boolean> {
  const existingUser = await userModel.findOne({ where: { username } });
  if (existingUser) return false; // Returns false if already exists

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await userModel.create({
      username: username,
      password: hashedPassword,
      balance: 100, // default starting balance
    });
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
}
