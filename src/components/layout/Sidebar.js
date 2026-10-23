import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Folder, Archive, PlusCircle, Settings, ShieldCheck, X } from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/', label: 'Bosh sahifa', icon: LayoutDashboard },
    { path: '/cases', label: 'Jinoyat ishlari', icon: Folder },
    { path: '/add', label: 'Dalil qo\'shish', icon: PlusCircle },
    { path: '/archive', label: 'Arxiv', icon: Archive },
    { path: '/settings', label: 'Sozlamalar', icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:static top-0 left-0 bottom-0 z-30
        w-64 bg-slate-900 text-white p-4 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between px-2 py-4 mb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-500" size={28} />
            <span className="text-xl font-bold tracking-wider">DALILLAR</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 md:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};