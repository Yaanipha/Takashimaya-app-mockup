import React from 'react';
import { Award, CreditCard, ChevronRight, Phone, ShieldCheck, Clock, Receipt, Bell } from 'lucide-react';
import { UserProfile } from '../types';

interface AccountScreenProps {
  user: UserProfile;
  onOpenTierModal: () => void;
  onOpenPointsHistory: () => void;
  onShowToast: (msg: string) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  user,
  onOpenTierModal,
  onOpenPointsHistory,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full pb-28 pt-16 max-w-md mx-auto px-5">
      {/* Profile Header */}
      <div className="pt-3 pb-3 flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#C85250]/20 shadow-sm flex-shrink-0">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#231F20]">{user.name}</h2>
          <p className="text-xs text-[#6E6764]">Takashimaya Cardholder ID: {user.memberId}</p>
          <div className="inline-flex items-center gap-1.5 mt-1 text-[11px] font-bold text-[#C85250] bg-[#FDF0EE] px-2 py-0.5 rounded-full border border-[#C85250]/20">
            <span>●</span> Rose Cardholder Active
          </div>
        </div>
      </div>

      {/* Virtual Membership Card */}
      <div className="mt-2 relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#9d332d] via-[#bd4b43] to-[#c85250] text-white p-5 shadow-lg flex flex-col justify-between h-44">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-xs">
              高
            </div>
            <span className="text-xs font-bold tracking-wider uppercase">
              TAKASHIMAYA CARD
            </span>
          </div>
          <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Rose Tier
          </span>
        </div>

        <div className="py-2">
          <span className="text-[10px] tracking-widest uppercase text-white/80">
            Available Rose Points
          </span>
          <div className="text-3xl font-extrabold tracking-tight tabular-nums">
            {user.balancePoints.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/90 border-t border-white/20 pt-2 font-mono">
          <span>{user.name.toUpperCase()}</span>
          <span>8849-XXXX-2026</span>
        </div>
      </div>

      {/* Account Navigation List */}
      <div className="mt-4 bg-white rounded-2xl border border-[#E8E2DA] shadow-xs overflow-hidden flex flex-col divide-y divide-[#E8E2DA]/60">
        <button
          onClick={onOpenPointsHistory}
          className="p-3.5 flex items-center justify-between hover:bg-[#F4EFEA] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FDF0EE] text-[#C85250] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#231F20] block">Rose Points Statement</span>
              <span className="text-[11px] text-[#6E6764]">
                Expiring 450 pts on 31 Dec 2026
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6764]" />
        </button>

        <button
          onClick={onOpenTierModal}
          className="p-3.5 flex items-center justify-between hover:bg-[#F4EFEA] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FBF3EA] text-[#B57635] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#231F20]">Membership Tier Status</span>
              <span className="text-[11px] text-[#6E6764]">
                74% towards Rose VIP Tier
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6764]" />
        </button>

        <button
          onClick={() => onShowToast('Past 3 e-Receipts synced from Takashimaya Orchard POS')}
          className="p-3.5 flex items-center justify-between hover:bg-[#F4EFEA] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EDF3EE] text-[#658269] flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#231F20]">Digital e-Receipts</span>
              <span className="text-[11px] text-[#6E6764]">View store purchases & tax invoices</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6764]" />
        </button>

        <button
          onClick={() => onShowToast('Takashimaya Concierge: +65 6738 1111 (Daily 10am - 9:30pm)')}
          className="p-3.5 flex items-center justify-between hover:bg-[#F4EFEA] transition-colors cursor-pointer text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EEF5F9] text-[#4A7B9D] flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#231F20]">Concierge &amp; Customer Care</span>
              <span className="text-[11px] text-[#6E6764]">Ngee Ann City Level 1 Counter</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6764]" />
        </button>
      </div>
    </div>
  );
};
