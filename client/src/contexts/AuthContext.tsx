import axios from "axios";
import { createContext, useState } from "react";

type loginCreds = {
  username: string;
  password: string;
};

type loginType = (loginCreds: loginCreds) => Promise<string> | string;

type AuthType = {
  token: string;
  login: loginType;
  logout: () => void;
};

const initialAuthContext: AuthType = {
  token: "",
  login: () => "",
  logout: () => {},
};

export const AuthContext = createContext<AuthType>(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // if no token is found in LS set it to empty string
  const initialToken = localStorage.getItem("token") || "";
  const [token, setToken] = useState(initialToken);

  const login = async (loginCreds: loginCreds): Promise<string> => {
    try {
      const response = await axios.request({
        method: "POST",
        url: "/api/signin",
        headers: {
          "Content-Type": "application/json",
        },
        data: { username: loginCreds.username, password: loginCreds.password },
      });

      console.log(response.data.token);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      return "success"; // Return a string indicating success
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        console.log("Invalid username or password");
        return "Invalid username or password"; // Return a string for this case
      } else {
        return "something went wrong"; // Return a string for other errors
      }
    }
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
