import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

interface AuthContextType {
  loggedIn: boolean;
  username: string | null;
  checkLoginStatus: () => void;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication state and functions to login, register, logout, and check login status.
 *
 * - Stores user authentication state loggedin and username
 * - Provides functions to log in, register, and log out.
 * - Automatically checks login status when the app loads.
 *
 * @param {React.ReactNode} children - The components that will have access to authentication state.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  /**
   * Checks if the user is currently logged in.
   *
   * - Sends a request to /session to get login status.
   * - If successful, updates loggedIn and username.
   *
   * @async
   */
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/game/session");
      setLoggedIn(response.data.loggedIn);
      setUsername(response.data.username || null);
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  /**
   * Runs checkLoginState at load to ensure login state is accurate.
   */
  useEffect(() => {
    checkLoginStatus();
  }, []);

  /**
   * Attempts to log in a user with provided credentials.
   *
   * - Sends request to /login with username and password.
   * - If login is successful, updates loggedIn and username.
   * - Returns true if login was successful, otherwise false.
   *
   * @param {string} username - The username for login.
   * @param {string} password - The password for login.
   * @returns {Promise<boolean>} Whether the login was successful.
   */
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/game/login", {
        username,
        password,
      });

      if (response.data.success) {
        setLoggedIn(true);
        setUsername(username);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  /**
   * Attempts to register a new user with the provided credentials
   *
   * - Sends a request to /register with username and password.
   * - If registration is successful, updates loggedIn and Username.
   * - Returns true if registration was successful, otherwise false.
   *
   * @param {string} username - The desired username for registration.
   * @param {string} password - The desired password for registration.
   * @returns {Promise<boolean>} Whether the registration was successful.
   */
  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/game/register", {
        username,
        password,
      });

      if (response.data.success) {
        setLoggedIn(true);
        setUsername(username);
        return true;
      }
    } catch (error) {
      console.error("Register error:", error);
    }
    return false;
  };

  /**
   * Logs out the user by sending a request to logout.
   *
   * - If successful, sets loggedIn to false and clears username.
   *
   */
  const logout = async () => {
    try {
      await axios.post("http://localhost:8080/game/logout");
      setLoggedIn(false);
      setUsername(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, username, checkLoginStatus, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access authentication state and functions.
 *
 * @returns {AuthContextType} The authentication context values.
 * @throws {Error} When used outside of this class.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
