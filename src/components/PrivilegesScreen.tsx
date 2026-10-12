import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  QrCode,
  SlidersHorizontal,
  ChevronRight,
  History,
  Award,
  CheckCircle2,
  Clock,
  Ticket,
  ArrowUp,
  MapPin,
  Sparkles,
  Info,
  Gift,
  Building2,
} from 'lucide-react';
import { CategoryType, UserProfile, Voucher } from '../types';
import { ROSE_CHAN_IMAGE_URL } from '../data/mockData';

interface PrivilegesScreenProps {
  user: UserProfile;
  vouchers: Voucher[];
  onSelectVoucher: (voucher: Voucher) => void;
  onRedeemVoucher: (voucher: Voucher) => void;
  onOpenPointsHistory: () => void;
  onOpenMemberTier: () => void;
  onOpenScanPay: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const PrivilegesScreen: React.FC<PrivilegesScreenProps> = ({
  user,
  vouchers,
  onSelectVoucher,
  onRedeemVoucher,
  onOpenPointsHistory,
  onOpenMemberTier,
  onOpenScanPay,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<CategoryType>('all');
  const [hasJoinedQuest, setHasJoinedQuest] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find the exclusive birth month voucher for direct showcase
  const birthMonthVoucher =
    vouchers.find((v) => v.id === 'voucher-birth-month') || vouchers[0];

  // Filter vouchers based on search and category
  const filteredVouchers = useMemo(() => {
    return vouchers.filter((v) => {
      // Exclude birth month voucher from standard grid if showing separately, or include all
      if (v.id === 'voucher-birth-month' && selectedFilter !== 'free' && selectedFilter !== 'all') {
        return false;
      }

      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.categoryBadge.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        selectedFilter === 'all' ||
        v.categoryType === selectedFilter ||
        (selectedFilter === 'dining' && v.categoryType === 'dining') ||
        (selectedFilter === 'free' && v.pointsCost === 0);

      return matchesSearch && matchesFilter;
    });
  }, [vouchers, searchQuery, selectedFilter]);

  const handleQuestClick = () => {
    if (!hasJoinedQuest) {
      setHasJoinedQuest(true);
      onShowToast('Joined Rose-chan Weekend Challenge! 2x Points Active ✨', 'check_circle');
    } else {
      onShowToast('Quest already active: Earn 2x Points this weekend!', 'info');
    }
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-16">
      {/* Friendly Rose Points Summary Card */}
      <section className="px-5 pt-3 pb-1 max-w-md mx-auto w-full">
        <div className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E8E2DA] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] relative overflow-hidden">
          {/* Cardholder Badge & Expiry */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2DA]/60">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#FDF0EE] text-[#C85250] font-bold text-xs flex items-center justify-center select-none">
                高
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#231F20]">
                {user.tier}
              </span>
            </div>
            <span className="text-xs font-medium text-[#6E6764] bg-[#F4EFEA] px-2.5 py-1 rounded-full border border-[#E8E2DA]">
              Exp: {user.expiringPoints} pts ({user.expiryDateText})
            </span>
          </div>

          {/* Available Balance */}
          <div className="pt-3 pb-1 flex items-baseline justify-between">
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-[#6E6764]">
                Available Balance
              </div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-[#231F20] tracking-tight tabular-nums">
                  {user.balancePoints.toLocaleString()}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C85250]">
                  Rose Points
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions / Navigation with Generous Tap Targets */}
          <div className="mt-4 pt-3 border-t border-[#E8E2DA]/60 grid grid-cols-2 gap-2">
            <button
              onClick={onOpenPointsHistory}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#F4EFEA] hover:bg-[#EFEAE4] active:scale-[0.98] transition-all text-xs font-semibold text-[#231F20] cursor-pointer"
            >
              <History className="w-4 h-4 text-[#C85250]" />
              <span>Points History</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#6E6764]" />
            </button>
            <button
              onClick={onOpenMemberTier}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#F4EFEA] hover:bg-[#EFEAE4] active:scale-[0.98] transition-all text-xs font-semibold text-[#231F20] cursor-pointer"
            >
              <Award className="w-4 h-4 text-[#B57635]" />
              <span>Member Tier</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#6E6764]" />
            </button>
          </div>
        </div>
      </section>

      {/* Search & Friendly Filter Categories */}
      <section className="px-5 mt-2 flex flex-col gap-2 max-w-md mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center bg-[#FFFFFF] rounded-xl px-4 py-3 border border-[#E8E2DA] shadow-[0_1px_4px_rgba(0,0,0,0.03)] focus-within:border-[#C85250]/50 transition-all">
            <Search className="w-5 h-5 text-[#6E6764] mr-2.5 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vouchers, brands, dining..."
              className="w-full bg-transparent border-0 outline-none text-sm text-[#231F20] placeholder:text-[#6E6764]/70 min-w-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#6E6764] hover:text-[#231F20] mr-1.5 cursor-pointer"
              >
                ✕
              </button>
            )}
            <button
              onClick={onOpenScanPay}
              aria-label="QR Search"
              className="text-[#6E6764] hover:text-[#C85250] transition-colors flex-shrink-0 cursor-pointer ml-1"
            >
              <QrCode className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              onShowToast('Showing all Takashimaya store privileges & perks', 'tune');
            }}
            aria-label="Filter Options"
            className="w-12 h-12 rounded-xl bg-[#FFFFFF] flex items-center justify-center text-[#231F20] border border-[#E8E2DA] hover:bg-[#F4EFEA] active:scale-95 transition-all shadow-[0_1px_4px_rgba(0,0,0,0.03)] flex-shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-5 h-5 text-[#231F20]" />
          </button>
        </div>

        {/* Warm, Multi-Generational Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#C85250] text-white shadow-sm'
                : 'bg-[#FFFFFF] text-[#6E6764] border border-[#E8E2DA] hover:bg-[#F4EFEA]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All Perks</span>
          </button>

          <button
            onClick={() => setSelectedFilter('dining')}
            className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'dining'
                ? 'bg-[#C85250] text-white shadow-sm'
                : 'bg-[#FFFFFF] text-[#6E6764] border border-[#E8E2DA] hover:bg-[#F4EFEA]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#C85250]">restaurant</span>
            <span>Food & Beverage</span>
          </button>

          <button
            onClick={() => setSelectedFilter('grocery')}
            className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'grocery'
                ? 'bg-[#C85250] text-white shadow-sm'
                : 'bg-[#FFFFFF] text-[#6E6764] border border-[#E8E2DA] hover:bg-[#F4EFEA]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#658269]">shopping_cart</span>
            <span>Grocery</span>
          </button>

          <button
            onClick={() => setSelectedFilter('beauty')}
            className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'beauty'
                ? 'bg-[#C85250] text-white shadow-sm'
                : 'bg-[#FFFFFF] text-[#6E6764] border border-[#E8E2DA] hover:bg-[#F4EFEA]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#C85250]">spa</span>
            <span>Beauty</span>
          </button>

          <button
            onClick={() => setSelectedFilter('fashion')}
            className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'fashion'
                ? 'bg-[#C85250] text-white shadow-sm'
                : 'bg-[#FFFFFF] text-[#6E6764] border border-[#E8E2DA] hover:bg-[#F4EFEA]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#B57635]">apparel</span>
            <span>Fashion</span>
          </button>

          <button
            onClick={() => setSelectedFilter('free')}
            className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedFilter === 'free'
                ? 'bg-[#C85250] text-white shadow-sm'
                : 'bg-[#FFFFFF] text-[#6E6764] border border-[#E8E2DA] hover:bg-[#F4EFEA]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#4A7B9D]">redeem</span>
            <span>Free Perks</span>
          </button>
        </div>
      </section>

      {/* Cheerful Pastel Peach / Cream Rose-chan Mascot Banner */}
      <section className="px-5 mt-3 max-w-md mx-auto w-full">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FFF0E6] via-[#FDF3ED] to-[#FFF8F2] border border-[#F5DACB] p-5 flex items-center justify-between shadow-[0_2px_8px_rgba(200,82,80,0.06)]">
          <div className="flex-1 pr-3 z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/90 text-[#C85250] text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full border border-[#C85250]/20 mb-2 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C85250] animate-pulse"></span>
              Rose-chan Special
            </div>
            <h3 className="text-base font-bold text-[#231F20] leading-snug">
              Double Points Weekend!
            </h3>
            <p className="text-xs text-[#6E6764] mt-1 leading-relaxed">
              Earn 2x points storewide every Saturday &amp; Sunday. Perfect for family outings!
            </p>
            <button
              onClick={handleQuestClick}
              className={`mt-3 inline-flex items-center gap-1.5 text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer ${
                hasJoinedQuest ? 'bg-[#658269]' : 'bg-[#C85250] hover:bg-[#A83C3A]'
              }`}
            >
              <span>{hasJoinedQuest ? 'Quest Active ✓' : 'Join Quest'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="w-24 h-32 flex-shrink-0 relative flex items-center justify-center z-10">
            <img
              src={ROSE_CHAN_IMAGE_URL}
              alt="Rose-chan Mascot"
              className="h-full object-contain drop-shadow-sm select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Prominent Direct Entry Ticket: The Rose Exclusive 15% Off Birth Month Voucher (Direct link to Screen 2) */}
      <section className="px-5 mt-4 max-w-md mx-auto w-full">
        <div
          onClick={() => onSelectVoucher(birthMonthVoucher)}
          className="bg-gradient-to-br from-[#FFF5F3] to-[#FFFFFF] rounded-2xl p-4 border border-[#C85250]/30 shadow-[0_2px_10px_rgba(200,82,80,0.08)] flex flex-col gap-2.5 cursor-pointer hover:border-[#C85250] active:scale-[0.99] transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C85250] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Featured Deal
              </span>
              <span className="text-[11px] font-bold text-[#C85250]">
                THE ROSE EXCLUSIVE
              </span>
            </div>
            <span className="text-xs font-bold text-[#658269] bg-[#EDF3EE] px-2 py-0.5 rounded-full">
              Free to Claim
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-2xl font-extrabold text-[#231F20] tracking-tight">
                15% Off On birth month
              </div>
              <p className="text-xs text-[#6E6764] mt-0.5">
                Takashimaya Department Store · Ngee Ann City
              </p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-[#C85250]/10 text-[#C85250] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[24px]">local_activity</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E8E2DA] flex items-center justify-between">
            <span className="text-[11px] text-[#6E6764] flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#6E6764]" />
              Tap to show full voucher &amp; barcode
            </span>
            <span className="text-xs font-bold text-[#C85250] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              View Voucher Detail
              <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </section>

      {/* Clean, Friendly Vouchers Section */}
      <section className="px-5 mt-5 mb-4 max-w-md mx-auto w-full">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FDF0EE] flex items-center justify-center text-[#C85250]">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231F20]">Takashimaya Vouchers</h3>
              <p className="text-[12px] text-[#6E6764]">
                Tap &apos;Get&apos; to redeem with points instantly
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#C85250] bg-[#FDF0EE] px-2.5 py-1 rounded-full border border-[#C85250]/20">
            {filteredVouchers.length} Available
          </span>
        </div>

        {/* 2-Column Minimal Friendly Cards */}
        <div className="grid grid-cols-2 gap-3">
          {filteredVouchers.map((voucher) => {
            const isRed = voucher.colorScheme === 'primary';
            const isSage = voucher.colorScheme === 'sage';
            const isAmber = voucher.colorScheme === 'amber';
            const isSky = voucher.colorScheme === 'sky';

            let tagBg = 'bg-[#FDF0EE] text-[#C85250] border-[#C85250]/20';
            let titleColor = 'text-[#C85250]';
            let btnBg = 'bg-[#C85250] hover:bg-[#A83C3A]';

            if (isSage) {
              tagBg = 'bg-[#EDF3EE] text-[#658269] border-[#658269]/20';
              titleColor = 'text-[#658269]';
              btnBg = 'bg-[#658269] hover:opacity-90';
            } else if (isAmber) {
              tagBg = 'bg-[#FBF3EA] text-[#B57635] border-[#B57635]/20';
              titleColor = 'text-[#B57635]';
              btnBg = 'bg-[#B57635] hover:opacity-90';
            } else if (isSky) {
              tagBg = 'bg-[#EEF5F9] text-[#4A7B9D] border-[#4A7B9D]/20';
              titleColor = 'text-[#4A7B9D]';
              btnBg = 'bg-[#4A7B9D] hover:opacity-90';
            }

            return (
              <div
                key={voucher.id}
                onClick={() => onSelectVoucher(voucher)}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E8E2DA] shadow-[0_2px_6px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden hover:border-[#C85250]/40 transition-all cursor-pointer group active:scale-[0.99]"
              >
                <div className="p-3.5 pb-2">
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[11px] font-bold text-[#231F20] truncate">
                      {voucher.brand}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagBg} truncate`}
                    >
                      {voucher.categoryBadge}
                    </span>
                  </div>

                  <div className={`text-[22px] font-extrabold ${titleColor} leading-tight`}>
                    {voucher.discountDisplay}
                  </div>

                  <h4 className="text-[13px] font-bold text-[#231F20] mt-1 line-clamp-1 group-hover:text-[#C85250] transition-colors">
                    {voucher.subtitle}
                  </h4>
                  <p className="text-[11px] text-[#6E6764] mt-0.5 line-clamp-1">
                    {voucher.minSpendText}
                  </p>

                  <div className="text-[11px] text-[#6E6764] mt-2.5 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-[#6E6764]" />
                    <span>{voucher.expiryText}</span>
                  </div>
                </div>

                <div className="px-3.5 py-2.5 bg-[#F4EFEA]/50 border-t border-[#E8E2DA] flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-semibold text-[#6E6764] uppercase tracking-wider">
                      Points
                    </span>
                    <span className="text-xs font-bold text-[#231F20]">
                      {voucher.pointsText}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRedeemVoucher(voucher);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-white text-xs font-bold active:scale-95 transition-transform shadow-xs cursor-pointer ${btnBg}`}
                  >
                    Get
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Additional Informational Section: Department Store Guest Privileges & Facilities */}
      <section className="px-5 mt-4 max-w-md mx-auto w-full">
        <div className="bg-[#FFFFFF] rounded-2xl p-4.5 border border-[#E8E2DA] shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FDF0EE] text-[#C85250] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-[#231F20]">
              Takashimaya Guest Services &amp; Facilities
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]/80 flex flex-col">
              <span className="font-bold text-[#231F20]">Customer Service</span>
              <span className="text-[11px] text-[#6E6764] mt-0.5">Level 1 &amp; Level 3</span>
              <span className="text-[10px] text-[#C85250] font-semibold mt-1">Free Gift Wrapping</span>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]/80 flex flex-col">
              <span className="font-bold text-[#231F20]">VIP Lounge</span>
              <span className="text-[11px] text-[#6E6764] mt-0.5">Level 3 West Wing</span>
              <span className="text-[10px] text-[#B57635] font-semibold mt-1">Complimentary Drinks</span>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]/80 flex flex-col">
              <span className="font-bold text-[#231F20]">Tax Refund Lounge</span>
              <span className="text-[11px] text-[#6E6764] mt-0.5">Level 3 Boutique Hall</span>
              <span className="text-[10px] text-[#658269] font-semibold mt-1">Global Blue Terminal</span>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]/80 flex flex-col">
              <span className="font-bold text-[#231F20]">Operating Hours</span>
              <span className="text-[11px] text-[#6E6764] mt-0.5">10:00 AM – 9:30 PM</span>
              <span className="text-[10px] text-[#4A7B9D] font-semibold mt-1">Open 365 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-5 z-40 w-11 h-11 rounded-full bg-[#FFFFFF] text-[#231F20] border border-[#E8E2DA] shadow-lg flex items-center justify-center hover:bg-[#F4EFEA] active:scale-95 transition-all cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 text-[#C85250]" />
        </button>
      )}
    </div>
  );
};
