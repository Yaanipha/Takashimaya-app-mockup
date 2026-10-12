import React, { useState } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, Sparkles, Clock } from 'lucide-react';
import { PointTransaction } from '../types';

interface PointsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: PointTransaction[];
  balance: number;
}

export const PointsHistoryModal: React.FC<PointsHistoryModalProps> = ({
  isOpen,
  onClose,
  transactions,
  balance,
}) => {
  const [filter, setFilter] = useState<'all' | 'earned' | 'redeemed'>('all');

  if (!isOpen) return null;

  const filtered = transactions.filter((t) => {
    if (filter === 'earned') return t.points > 0;
    if (filter === 'redeemed') return t.points < 0;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#FAF8F5] rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8E2DA] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 px-5 border-b border-[#E8E2DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FDF0EE] text-[#C85250] flex items-center justify-center font-bold text-xs">
              高
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231F20]">Points History</h3>
              <p className="text-xs text-[#6E6764]">Rose Points Activity & Statements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4EFEA] hover:bg-[#EFEAE4] flex items-center justify-center text-[#6E6764] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Balance Highlight Box */}
        <div className="p-4 bg-gradient-to-r from-[#FFF0EE] to-[#FAF8F5] border-b border-[#E8E2DA] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#6E6764] uppercase tracking-wider">
              Total Current Balance
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-extrabold text-[#231F20] tabular-nums">
                {balance.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[#C85250]">Rose Points</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-[#6E6764] bg-white px-2 py-1 rounded-full border border-[#E8E2DA]">
              Exp: 450 pts (31 Dec)
            </span>
          </div>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="p-3 bg-white border-b border-[#E8E2DA] flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[#C85250] text-white shadow-xs'
                : 'bg-[#F4EFEA] text-[#6E6764] hover:text-[#231F20]'
            }`}
          >
            All Activity
          </button>
          <button
            onClick={() => setFilter('earned')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filter === 'earned'
                ? 'bg-[#C85250] text-white shadow-xs'
                : 'bg-[#F4EFEA] text-[#6E6764] hover:text-[#231F20]'
            }`}
          >
            Points Earned
          </button>
          <button
            onClick={() => setFilter('redeemed')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              filter === 'redeemed'
                ? 'bg-[#C85250] text-white shadow-xs'
                : 'bg-[#F4EFEA] text-[#6E6764] hover:text-[#231F20]'
            }`}
          >
            Redemptions
          </button>
        </div>

        {/* Transactions List */}
        <div className="overflow-y-auto p-4 flex flex-col gap-2.5 flex-1">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-white rounded-xl border border-[#E8E2DA] flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.points > 0
                      ? 'bg-[#EDF3EE] text-[#658269]'
                      : 'bg-[#FDF0EE] text-[#C85250]'
                  }`}
                >
                  {item.points > 0 ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231F20] line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-[#6E6764] mt-0.5">{item.location}</p>
                  <p className="text-[10px] text-[#6E6764]/70 mt-0.5 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {item.date}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span
                  className={`text-sm font-extrabold tabular-nums ${
                    item.points > 0 ? 'text-[#658269]' : 'text-[#C85250]'
                  }`}
                >
                  {item.points > 0 ? `+${item.points}` : item.points} Pts
                </span>
                <span className="block text-[9px] uppercase tracking-wider text-[#6E6764] font-medium">
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
