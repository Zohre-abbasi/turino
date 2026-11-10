import { createContext, useContext, useEffect, useState } from "react";

import { getUserProfile } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // بازیابی اطلاعات کاربر هنگام بارگذاری برنامه
  useEffect(() => {
    async function restoreUser() {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    restoreUser();
  }, []);

  // مدیریت منقضی‌شدن احراز هویت
  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
    };

    window.addEventListener("auth-expired", handleAuthExpired);

    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);

  // ورود کاربر
  const login = (data) => {
    if (!data.accessToken || !data.refreshToken || !data.user) {
      console.error("اطلاعات احراز هویت کامل نیست.");
      return false;
    }

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    setUser(data.user);

    return true;
  };

  // خروج کاربر
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
  };

  // به‌روزرسانی اطلاعات کاربر
  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
