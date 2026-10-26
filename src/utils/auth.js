export const logoutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminUser");

    window.location.replace("/login");
};

export const isAccessTokenValid = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) return false;

    try {
        const payload = JSON.parse(
            atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
        );

        if (!payload.exp) return false;

        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};
