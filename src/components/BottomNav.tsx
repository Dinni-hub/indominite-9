import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: boolean;
}

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  items: NavItem[];
  className?: string;
  itemClassName?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onNavigate, items, className, itemClassName }) => {
  return (
    <div className={className || "absolute bottom-0 left-0 right-0 w-full h-24 bg-[#3D2B1F] flex items-center justify-between px-10 rounded-t-[3.5rem] shadow-2xl z-50"}>
      {items.map((item) => (
        <button 
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={itemClassName || `flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-white' : 'text-white/40'}`}
        >
          <div className="relative">
            <item.icon size={24} />
            {item.badge && (
              <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#3D2B1F]"></div>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
        </button>
      ))}
    </div>
  );
};
