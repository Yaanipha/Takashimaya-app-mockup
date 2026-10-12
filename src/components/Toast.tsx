import React, { useEffect } from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  icon?: string;
  onClose: () => void;
  onOpenWallet?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  icon = 'check_circle',
  onClose,
  onOpenWallet,
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-sm mx-auto animate-in fade-in slide-in-from-bottom duration-300">
      <div className="bg-[#231F20] text-white px-4 py-3 rounded-xl shadow-xl flex items-center justify-between border border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="material-symbols-outlined text-green-400 text-[22px] flex-shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon === 'check_circle' ? 'check_circle' : icon}
          </span>
          <span className="text-xs font-semibold leading-tight truncate">
            {message}
          </span>
        </div>
        {onOpenWallet && (
          <button
            onClick={() => {
              onClose();
              onOpenWallet();
            }}
            className="text-xs text-[#FDF0EE] font-bold underline ml-2 flex-shrink-0 cursor-pointer hover:text-white"
          >
            Wallet
          </button>
        )}
      </div>
    </div>
  );
};
