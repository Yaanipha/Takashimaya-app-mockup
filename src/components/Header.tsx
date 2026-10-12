import React from 'react';
import { Bell, ArrowLeft, Layers } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  isDetailView: boolean;
  onBack: () => void;
  onOpenNotifications: () => void;
  onOpenAccount: () => void;
  onToggleScreen: (view: 'hub' | 'detail') => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  isDetailView,
  onBack,
  onOpenNotifications,
  onOpenAccount,
  onToggleScreen,
  unreadNotificationsCount = 2,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2DA]/80 pt-safe">
      <div className="h-16 px-4 sm:px-5 max-w-md mx-auto w-full flex items-center justify-between gap-2">
        {isDetailView ? (
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack}
              aria-label="Back to Privileges"
              className="w-10 h-10 -ml-1.5 flex items-center justify-center rounded-full text-[#231F20] hover:bg-[#F4EFEA] active:scale-95 transition-all cursor-pointer flex-shrink-0"
              title="Back to Privileges Hub"
            >
              <ArrowLeft className="w-5 h-5 text-[#231F20]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#C85250]/10 text-[#C85250] flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_activity</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-[#C85250] uppercase tracking-wider">
                Screen 2
              </span>
              <h1 className="text-sm sm:text-base font-bold text-[#231F20] tracking-tight truncate">
                Takashimaya Voucher Detail
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#C85250] flex items-center justify-center flex-shrink-0 shadow-sm text-white font-bold text-sm select-none">
              高
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-[#C85250] tracking-wider uppercase truncate">
                Takashimaya Singapore
              </span>
              <span className="text-sm sm:text-base font-bold text-[#231F20] truncate">
                Privileges &amp; Vouchers
              </span>
            </div>
          </div>
        )}

        {/* Right Action Icons & Direct Screen Switcher */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Quick Screen Switcher button */}
          <button
            onClick={() => onToggleScreen(isDetailView ? 'hub' : 'detail')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FDF0EE] text-[#C85250] border border-[#C85250]/20 text-[11px] font-bold hover:bg-[#FCE5E3] active:scale-95 transition-all cursor-pointer shadow-xs"
            title={isDetailView ? 'Switch to Privileges Hub' : 'Switch to Voucher Detail Screen'}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">
              {isDetailView ? 'Hub' : 'Detail'}
            </span>
          </button>

          <button
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="w-9 h-9 relative flex items-center justify-center rounded-full text-[#6E6764] hover:text-[#231F20] hover:bg-[#F4EFEA] active:scale-95 transition-all cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C85250] ring-2 ring-[#FAF8F5]" />
            )}
          </button>

          <button
            onClick={onOpenAccount}
            aria-label="Profile"
            className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:opacity-90 active:scale-95 transition-all"
          >
            {isDetailView ? (
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#C85250]/30 shadow-xs">
                <img
                  src={user.avatarUrl}
                  alt="Member Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#FDF0EE] border border-[#C85250]/25 flex items-center justify-center text-[#C85250] font-bold text-xs tracking-tight shadow-xs">
                {user.initials}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
