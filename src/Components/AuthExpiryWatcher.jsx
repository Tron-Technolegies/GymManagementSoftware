
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isAccessTokenValid, logoutUser } from "../utils/auth";

const AuthExpiryWatcher = () => {
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) return;

        if (!isAccessTokenValid()) {
            logoutUser();
            return;
        }

        try {
            const payload = JSON.parse(
                atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
            );

            const expiresIn = payload.exp * 1000 - Date.now();

            const timer = setTimeout(() => {
                logoutUser();
            }, expiresIn);

            return () => clearTimeout(timer);
        } catch {
            logoutUser();
        }
    }, [location.pathname]);

    return null;
};

export default AuthExpiryWatcher;
