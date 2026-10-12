import React from 'react';
import { Ticket, QrCode, Clock, CheckCircle2, ArrowRight, Car, Sparkles, ShieldCheck } from 'lucide-react';
import { Voucher } from '../types';

interface WalletScreenProps {
  redeemedVouchers: Voucher[];
  onSelectVoucher: (voucher: Voucher) => void;
  onExplorePrivileges: () => void;
}

export const WalletScreen: React.FC<WalletScreenProps> = ({
  redeemedVouchers,
  onSelectVoucher,
  onExplorePrivileges,
}) => {
  return (
    <div className="flex flex-col w-full pb-36 pt-16 max-w-md mx-auto px-5">
      <div className="pt-3 pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-[#231F20]">My Voucher Wallet</h2>
          <p className="text-xs text-[#6E6764]">Active vouchers ready for in-store checkout</p>
        </div>
        <span className="text-xs font-bold text-[#C85250] bg-[#FDF0EE] px-2.5 py-1 rounded-full border border-[#C85250]/20">
          {redeemedVouchers.length} Active
        </span>
      </div>

      {/* Parking Pass Quick Access Widget */}
      <div className="mt-2 bg-gradient-to-r from-[#EEF5F9] to-[#FAF8F5] rounded-2xl p-4 border border-[#4A7B9D]/30 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4A7B9D]/15 text-[#4A7B9D] flex items-center justify-center flex-shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A7B9D] bg-white px-2 py-0.5 rounded-full border border-[#4A7B9D]/20">
                Active Parking Pass
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#231F20] mt-1">2h Free Carpark Waiver</h4>
            <p className="text-[11px] text-[#6E6764]">Valid B2 &amp; B3 Carpark · Ngee Ann City</p>
          </div>
        </div>
        <button
          onClick={() => {
            alert('Present vehicle IU or scan pass at Level 1 Carpark counter.');
          }}
          className="px-3 py-1.5 rounded-full bg-[#4A7B9D] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer flex-shrink-0"
        >
          View Pass
        </button>
      </div>

      {redeemedVouchers.length === 0 ? (
        <div className="mt-4 bg-white rounded-2xl p-8 border border-[#E8E2DA] flex flex-col items-center text-center shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#FDF0EE] text-[#C85250] flex items-center justify-center mb-3">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#231F20]">No extra vouchers claimed</h3>
          <p className="text-xs text-[#6E6764] mt-1 max-w-[240px]">
            Redeem Takashimaya storewide vouchers or dining perks using your 14,850 Rose Points.
          </p>
          <button
            onClick={onExplorePrivileges}
            className="mt-4 px-5 py-2.5 rounded-full bg-[#C85250] text-white text-xs font-bold active:scale-95 transition-all shadow-sm hover:bg-[#A83C3A] cursor-pointer"
          >
            Explore Privileges Hub
          </button>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {redeemedVouchers.map((voucher) => (
            <div
              key={voucher.id}
              onClick={() => onSelectVoucher(voucher)}
              className="bg-white rounded-2xl p-4 border border-[#E8E2DA] shadow-xs flex flex-col gap-3 hover:border-[#C85250]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85250] bg-[#FDF0EE] px-2 py-0.5 rounded-full border border-[#C85250]/20">
                    {voucher.categoryBadge}
                  </span>
                  <h4 className="text-lg font-extrabold text-[#231F20] mt-1.5 leading-tight">
                    {voucher.discountDisplay}
                  </h4>
                  <p className="text-xs font-semibold text-[#6E6764] mt-0.5">{voucher.subtitle}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#F4EFEA] flex items-center justify-center text-[#231F20] group-hover:bg-[#FDF0EE] group-hover:text-[#C85250] transition-colors">
                  <QrCode className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E2DA]/60 flex items-center justify-between text-xs text-[#6E6764]">
                <div className="flex items-center gap-1 font-mono text-[11px] text-[#231F20] font-bold">
                  <span>{voucher.code}</span>
                </div>
                <span className="text-[#C85250] font-bold flex items-center gap-1 group-hover:underline">
                  Present Code &amp; Barcode
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Helpful Checkout Tip */}
      <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E8E2DA] shadow-xs flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#EDF3EE] text-[#658269] flex items-center justify-center flex-shrink-0 mt-0.5">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div className="text-xs text-[#6E6764]">
          <span className="font-bold text-[#231F20] block mb-0.5">Offline Checkout Ready</span>
          Your voucher codes and scannable barcodes remain securely stored on your device for immediate scanning even when in basement parking or store elevators.
        </div>
      </div>
    </div>
  );
};
