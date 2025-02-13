import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: null,
    nickname: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("username");
    const nickname = localStorage.getItem("nickname");
    if (accessToken && refreshToken && username && nickname) {
      setAuth({
        username,
        nickname,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (username, accessToken, refreshToken, nickname) => {
    setAuth({
      username,
      nickname,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
    localStorage.setItem("username", username);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setAuth({
      username: null,
      nickname: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("username");
    localStorage.removeItem("nickname");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
