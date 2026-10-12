import React from 'react';
import { Home, Wallet, User, QrCode } from 'lucide-react';

export type TabId = 'home' | 'privileges' | 'scan' | 'wallet' | 'account';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onOpenScanPay: () => void;
  walletCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onOpenScanPay,
  walletCount = 0,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#FAF8F5]/92 backdrop-blur-md border-t border-[#E8E2DA]/90">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto relative">
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          aria-label="Home"
          className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
            activeTab === 'home'
              ? 'text-[#C85250] font-bold'
              : 'text-[#6E6764] hover:text-[#231F20]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* Privileges (Flower/Rose icon) */}
        <button
          onClick={() => onTabChange('privileges')}
          aria-label="Privileges"
          className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
            activeTab === 'privileges'
              ? 'text-[#C85250] font-bold'
              : 'text-[#6E6764] hover:text-[#231F20]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[23px]"
            style={{
              fontVariationSettings: activeTab === 'privileges' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            local_florist
          </span>
          <span className="text-[10px] font-bold mt-0.5">Privileges</span>
        </button>

        {/* Scan/Pay Floating Button */}
        <div className="relative flex flex-col items-center justify-center -top-3.5">
          <button
            onClick={onOpenScanPay}
            aria-label="Scan & Pay"
            className="w-13 h-13 p-3.5 rounded-full bg-[#C85250] text-white flex items-center justify-center shadow-[0_6px_18px_rgba(200,82,80,0.4)] active:scale-95 hover:bg-[#A83C3A] transition-all cursor-pointer"
          >
            <QrCode className="w-6 h-6 stroke-[2.2]" />
          </button>
          <span className="text-[10px] text-[#6E6764] mt-1 font-semibold">
            Scan/Pay
          </span>
        </div>

        {/* Wallet */}
        <button
          onClick={() => onTabChange('wallet')}
          aria-label="Wallet"
          className={`flex flex-col items-center justify-center w-14 h-full relative cursor-pointer transition-colors ${
            activeTab === 'wallet'
              ? 'text-[#C85250] font-bold'
              : 'text-[#6E6764] hover:text-[#231F20]'
          }`}
        >
          <Wallet className="w-5 h-5" />
          {walletCount > 0 && (
            <span className="absolute top-2 right-2 px-1.5 py-0.2 rounded-full bg-[#C85250] text-white text-[9px] font-bold">
              {walletCount}
            </span>
          )}
          <span className="text-[10px] font-semibold mt-1">Wallet</span>
        </button>

        {/* Account */}
        <button
          onClick={() => onTabChange('account')}
          aria-label="Account"
          className={`flex flex-col items-center justify-center w-14 h-full cursor-pointer transition-colors ${
            activeTab === 'account'
              ? 'text-[#C85250] font-bold'
              : 'text-[#6E6764] hover:text-[#231F20]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Account</span>
        </button>
      </div>
    </nav>
  );
};
