import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import ConfirmActionModal from "./ConfirmActionModal";

const Logout = ({ children }) => {
    const navigate = useNavigate();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("adminUser");
        navigate("/login");
    };

    return (
        <>
            <div onClick={() => setConfirmOpen(true)}>
                {children}
            </div>

            {confirmOpen &&
                createPortal(
                    <ConfirmActionModal
                        isOpen={confirmOpen}
                        title="Logout"
                        message="Are you sure you want to logout?"
                        confirmText="Logout"
                        cancelText="Cancel"
                        type="delete"
                        onCancel={() => setConfirmOpen(false)}
                        onConfirm={handleLogout}
                    />,
                    document.body
                )}
        </>
    );
};

export default Logout;