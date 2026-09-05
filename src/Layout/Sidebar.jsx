import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  Tag,
  Contact,
  ShoppingCart,
  BadgeIndianRupee,
  IndianRupee,
  SearchCheck,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  LogOut,
} from "lucide-react";
import originallogo from "../assets/originallogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "../Components/Logout"

const SidebarItem = ({
  icon: Icon,
  label,
  path,
  danger = false,
  onClick,
  className = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = path ? location.pathname === path : false;
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (path) {
      navigate(path);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/login";
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
        transition-all duration-200 text-sm font-medium
        ${active
          ? "bg-yellow-50 text-slate-900"
          : danger
            ? "text-red-500 hover:bg-red-50"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }
        ${className}
      `}>

      <Icon
        size={20}
        className={
          active
            ? "text-yellow-500"
            : danger
              ? "text-red-500"
              : "text-slate-400"
        }
      />

      <span className={
        active
          ? "text-yellow-600"
          : danger
            ? "text-red-500"
            : "text-slate-400"
      }>{label}</span>
    </div>
  );
};

const SidebarDropdown = ({ icon: Icon, label, children, paths = [] }) => {
  const location = useLocation();
  const isActive = paths.includes(location.pathname);
  const [open, setOpen] = useState(isActive);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        className={`
          flex items-center justify-between
          px-3 py-2.5 rounded-lg cursor-pointer
          transition-all duration-200
          ${isActive
            ? "bg-slate-100 text-slate-900"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }
        `}>
        <div className="flex items-center gap-3">
          <Icon
            size={20}
            className={isActive ? "text-slate-900" : "text-slate-400"} />

          <span className="text-sm font-medium">{label}</span>
        </div>

        {open ? (
          <ChevronDown size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 mt-1" : "max-h-0"
          }`}>
        <div className="ml-6 border-slate-200 pl-3 space-y-1">
          {children}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] 
        bg-white border-r border-slate-200 flex flex-col 
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="h-16 md:h-24 flex items-center justify-between lg:justify-center border-b border-slate-100 px-4">
          <img
            src={originallogo}
            alt="Logo"
            className="h-10 md:h-16 w-auto object-contain"
          />
          <button
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <ChevronRight size={24} className="rotate-180" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mb-3">
            Gym Management
          </p>

          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            path="/dashboard"
            onClick={() => setSidebarOpen(false)}
          />


          <SidebarItem
            icon={Users}
            label="Members"
            path="/members"
            onClick={() => setSidebarOpen(false)}
          />

          <SidebarItem
            icon={Building2}
            label="Branches"
            path="/branches"
            onClick={() => setSidebarOpen(false)}
          />
          <SidebarItem
            icon={Tag}
            label="Plans"
            path="/plans"
            onClick={() => setSidebarOpen(false)}
          />

          <SidebarItem
            icon={Contact}
            label="Staffs"
            path="/staffs"
            onClick={() => setSidebarOpen(false)}
          />

          <SidebarItem
            icon={ShoppingCart}
            label="Products"
            path="/products"
            onClick={() => setSidebarOpen(false)}
          />

          <SidebarItem
            icon={BadgeIndianRupee}
            label="Product Sales"
            path="/sales"
            onClick={() => setSidebarOpen(false)}
          />

          <SidebarDropdown
            icon={IndianRupee}
            label="Transactions"
            paths={["/transactions", "/transactions/profit"]}
          >

            <SidebarItem
              icon={IndianRupee}
              label="Transaction"
              path="/transaction"
              className="text-[13px]"
              onClick={() => setSidebarOpen(false)}
            />

            <SidebarItem
              icon={TrendingUp}
              label="Profit"
              path="/profit_loss"
              className="text-[13px]"
              onClick={() => setSidebarOpen(false)}
            />
          </SidebarDropdown>

          <SidebarItem
            icon={SearchCheck}
            label="Enquiry"
            path="/enquiry"
            onClick={() => setSidebarOpen(false)}
          />
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 mt-8 mb-3">System</p>
          <SidebarItem
            icon={Settings}
            label="Settings"
            path="/settings"
            onClick={() => setSidebarOpen(false)}
          />

          <Logout>
            <SidebarItem
              icon={LogOut}
              label="Logout"
            />
          </Logout>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;