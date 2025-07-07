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
        // Silent fail — user is just not logged in
        setIsLoggedIn(false);
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
      // Don’t log anything here — fully silent
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
