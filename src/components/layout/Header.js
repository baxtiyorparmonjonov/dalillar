import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, LogOut, Menu } from 'lucide-react';

export const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-2 md:hidden text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-base md:text-lg font-semibold text-gray-800 truncate">
          Dalillarni Boshqarish Tizimi
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-3 md:border-l md:pl-4 border-gray-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
            <User size={18} />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-sm font-medium text-gray-700 block leading-tight">{user?.name || "Foydalanuvchi"}</span>
            <span className="text-xs text-gray-400">{user?.role || "Tergovchi"}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Tizimdan chiqish"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};