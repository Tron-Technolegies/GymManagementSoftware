import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, Navigate } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const token = localStorage.getItem("accessToken");

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;