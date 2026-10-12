import React from 'react';
import { X, Award, Check, Sparkles, ShieldCheck, Gift, Car, Coffee } from 'lucide-react';
import { UserProfile } from '../types';

interface MemberTierModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const MemberTierModal: React.FC<MemberTierModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#FAF8F5] rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8E2DA] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 px-5 border-b border-[#E8E2DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FBF3EA] text-[#B57635] flex items-center justify-center font-bold text-xs">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231F20]">Takashimaya Member Tier</h3>
              <p className="text-xs text-[#6E6764]">Privilege &amp; Hospitality Tier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4EFEA] hover:bg-[#EFEAE4] flex items-center justify-center text-[#6E6764] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Tier Status Card */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#FFF4EB] via-[#FAF8F5] to-[#FFFFFF] rounded-2xl p-5 border border-[#F5DACB] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B57635] bg-white px-2.5 py-1 rounded-full border border-[#F5DACB]">
                Active Tier
              </span>
              <span className="text-xs font-semibold text-[#6E6764]">
                ID: {user.memberId}
              </span>
            </div>
            <h4 className="text-xl font-extrabold text-[#231F20] mt-2">
              Takashimaya Cardholder
            </h4>
            <p className="text-xs text-[#6E6764] mt-0.5">
              Accumulate S$2,575 spend to qualify for Rose VIP Tier
            </p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#6E6764] mb-1.5">
                <span>Progress: 7,425 / 10,000 pts</span>
                <span className="text-[#C85250] font-bold">74%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#F4EFEA] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C85250] to-[#B57635] rounded-full transition-all duration-500"
                  style={{ width: '74%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Current Tier Privileges */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8E2DA] shadow-xs flex flex-col gap-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#231F20]">
              Your Active Tier Benefits
            </h5>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#FDF0EE] text-[#C85250] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#231F20]">15% Birthday Month Voucher</p>
                <p className="text-[11px] text-[#6E6764]">
                  Annual 15% storewide discount voucher valid across boutique counters.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EDF3EE] text-[#658269] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#231F20]">2-Hour Free Parking Waiver</p>
                <p className="text-[11px] text-[#6E6764]">
                  Redeemable with points or minimum spend of S$50 in Takashimaya Orchard.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#FBF3EA] text-[#B57635] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#231F20]">Double Points Weekend Quests</p>
                <p className="text-[11px] text-[#6E6764]">
                  Earn 2x Rose Points every Saturday &amp; Sunday storewide.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EEF5F9] text-[#4A7B9D] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#231F20]">Invitation to Private Previews</p>
                <p className="text-[11px] text-[#6E6764]">
                  VIP access to Autumn Japan Food Fair and Spring Luxury Previews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
