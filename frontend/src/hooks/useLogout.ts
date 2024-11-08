import { useCallback } from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = useCallback(() => {
    setAuth({ user: "", pwd: "", roles: [], accessToken: "" });
    try {
      axios.get("/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  }, [setAuth]);

  return logout;
};

export default useLogout;
