import React from 'react';
import { X, Bell, Sparkles, Gift, Tag, Clock } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVoucherNotification: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectVoucherNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#FAF8F5] rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8E2DA] animate-in fade-in slide-in-from-bottom duration-200">
        <div className="p-4 px-5 border-b border-[#E8E2DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FDF0EE] text-[#C85250] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231F20]">Notifications</h3>
              <p className="text-xs text-[#6E6764]">Takashimaya Privilege Alerts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4EFEA] hover:bg-[#EFEAE4] flex items-center justify-center text-[#6E6764] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex flex-col gap-2.5">
          {/* Item 1 */}
          <div
            onClick={() => {
              onSelectVoucherNotification();
              onClose();
            }}
            className="bg-white p-3.5 rounded-xl border border-[#E8E2DA] shadow-xs cursor-pointer hover:border-[#C85250]/40 transition-all flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#FDF0EE] text-[#C85250] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#231F20]">
                  Birthday Perk: 15% Off Ready!
                </span>
                <span className="text-[10px] text-[#6E6764]">Today</span>
              </div>
              <p className="text-[11px] text-[#6E6764] mt-0.5">
                Your birthday month 15% discount voucher is waiting for you in Takashimaya Orchard.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white p-3.5 rounded-xl border border-[#E8E2DA] shadow-xs flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FBF3EA] text-[#B57635] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#231F20]">
                  Rose-chan Weekend: 2x Points Active
                </span>
                <span className="text-[10px] text-[#6E6764]">2d ago</span>
              </div>
              <p className="text-[11px] text-[#6E6764] mt-0.5">
                Earn double Rose Points on all department store purchases every Saturday and Sunday.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white p-3.5 rounded-xl border border-[#E8E2DA] shadow-xs flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#EDF3EE] text-[#658269] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#231F20]">
                  Points Expiry Reminder
                </span>
                <span className="text-[10px] text-[#6E6764]">5d ago</span>
              </div>
              <p className="text-[11px] text-[#6E6764] mt-0.5">
                450 Rose Points will expire on 31 Dec. Redeem for vouchers or carpark passes today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
