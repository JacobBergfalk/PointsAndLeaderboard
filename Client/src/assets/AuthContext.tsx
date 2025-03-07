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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check if user is logged in on app load
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("http://localhost:8080/game/session");
      setLoggedIn(response.data.loggedIn);
      setUsername(response.data.username || null);
    } catch (error) {
      console.error("Error checking session:", error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Login
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
  // register
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

  // Logout
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
      value={{
        loggedIn,
        username,

        checkLoginStatus,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
