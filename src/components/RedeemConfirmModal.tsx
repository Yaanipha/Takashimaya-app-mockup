import React from 'react';
import { X, Ticket, CheckCircle2, AlertCircle } from 'lucide-react';
import { Voucher } from '../types';

interface RedeemConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  voucher: Voucher | null;
  userPoints: number;
  onConfirm: (voucher: Voucher) => void;
}

export const RedeemConfirmModal: React.FC<RedeemConfirmModalProps> = ({
  isOpen,
  onClose,
  voucher,
  userPoints,
  onConfirm,
}) => {
  if (!isOpen || !voucher) return null;

  const hasEnoughPoints = userPoints >= voucher.pointsCost;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E8E2DA] animate-in fade-in slide-in-from-bottom duration-200">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF0EE] text-[#C85250] flex items-center justify-center border border-[#C85250]/20">
            <Ticket className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4EFEA] hover:bg-[#EFEAE4] flex items-center justify-center text-[#6E6764] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85250] bg-[#FDF0EE] px-2 py-0.5 rounded-full">
            {voucher.categoryBadge}
          </span>
          <h3 className="text-xl font-extrabold text-[#231F20] mt-1.5 leading-tight">
            Redeem {voucher.discountDisplay}?
          </h3>
          <p className="text-xs text-[#6E6764] mt-1 font-medium">{voucher.subtitle}</p>
        </div>

        {/* Cost & Balance details */}
        <div className="mt-4 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA] flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between text-[#6E6764]">
            <span>Points Required:</span>
            <span className="font-bold text-[#231F20]">
              {voucher.pointsCost === 0 ? 'Free' : `${voucher.pointsCost.toLocaleString()} Pts`}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#6E6764]">
            <span>Your Available Balance:</span>
            <span className="font-bold text-[#231F20] tabular-nums">
              {userPoints.toLocaleString()} Pts
            </span>
          </div>
          <div className="border-t border-[#E8E2DA] pt-2 flex items-center justify-between text-[#231F20] font-bold">
            <span>Remaining Balance:</span>
            <span className="text-[#C85250] tabular-nums">
              {(userPoints - voucher.pointsCost).toLocaleString()} Pts
            </span>
          </div>
        </div>

        {!hasEnoughPoints && (
          <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-red-50 text-red-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>You do not have enough Rose Points for this voucher.</span>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-[#F4EFEA] hover:bg-[#EFEAE4] text-xs font-bold text-[#231F20] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(voucher)}
            disabled={!hasEnoughPoints}
            className={`flex-1 py-3 rounded-full text-xs font-bold text-white transition-all shadow-sm cursor-pointer ${
              hasEnoughPoints
                ? 'bg-[#C85250] hover:bg-[#A83C3A] active:scale-95'
                : 'bg-neutral-300 opacity-60 cursor-not-allowed'
            }`}
          >
            Confirm &amp; Get
          </button>
        </div>
      </div>
    </div>
  );
};
