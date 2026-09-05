import React, { useEffect } from 'react';
import { User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAdminSettings from '../hooks/useAdminSettings'

const Header = ({ setSidebarOpen }) => {
    const { admin, fetchAdminProfile } = useAdminSettings();

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <button
                        className="p-2 -ml-2 text-slate-600 lg:hidden hover:bg-slate-100 rounded-lg"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    <div>
                        <h1 className="text-lg font-bold text-slate-900 leading-tight">
                            Gym Management
                        </h1>

                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider hidden sm:block">
                            Management System
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">

                    <div className="h-8 w-[1px] bg-slate-100 mx-1 md:mx-2 hidden sm:block"></div>

                    <div className="flex items-center gap-2 md:gap-3">

                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-semibold text-slate-900 leading-none">
                                {admin?.username || ""}
                            </div>

                            <div className="text-[10px] text-slate-400 mt-1">
                                Authorized Access
                            </div>
                        </div>

                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                            <Link to="settings">
                                <User size={18} className="md:w-5 md:h-5" />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;