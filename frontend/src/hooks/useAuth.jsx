// src/hooks/useAuth.js
import { useEffect, useState, useCallback } from "react";
import { USER_API, AUTH_API } from "../config/api";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = useCallback(async () => {
    try {
      const res = await fetch(AUTH_API.IS_LOGGED_IN, {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 403) {
        setIsLoggedIn(false);
        setIsLoggedIn(false);
        console.clear();
        console.clear();

        console.log(
          "%c 🚷 STOP: You are not supposed to be here!",
          "color: red; font-size: 24px; font-weight: bold; padding: 8px;"
        );

        console.log(
          "%c 💡 Tip: This area is protected by highly trained digital squirrels.",
          "color: orange; font-size: 18px; font-style: italic; padding: 6px;"
        );

        console.log(
          "%c 🐿️ Unauthorized access attempt detected. We’re telling your toaster.",
          "color: #ff4081; font-size: 16px; padding: 6px;"
        );

        return false;
      }

      if (!res.ok) throw new Error("Unexpected error");

      setIsLoggedIn(true);

      const profileRes = await fetch(USER_API.GET_PROFILE, {
        method: "GET",
        credentials: "include",
      });

      if (profileRes.ok) {
        const data = await profileRes.json();
        if (data.profileImage) {
          localStorage.setItem("profileImageUrl", data.profileImage);
        } else {
          localStorage.removeItem("profileImageUrl");
        }
      }

      return true;
    } catch {
      setIsLoggedIn(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return { isLoggedIn, loading, checkLoginStatus, setIsLoggedIn };
}
