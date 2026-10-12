import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Banknote,
  Percent,
  MapPin,
  ShoppingBag,
  FileText,
  Calendar,
  Sparkles,
  ArrowUp,
  HelpCircle,
  ScanLine,
  CheckCircle2,
  Store,
} from 'lucide-react';
import { Brand, Voucher } from '../types';
import { ROSE_CHAN_IMAGE_URL, PARTICIPATING_BRANDS } from '../data/mockData';

interface VoucherDetailScreenProps {
  voucher: Voucher;
  onBack: () => void;
  onRedeem: (voucher: Voucher) => void;
  onSeeAllBrands: () => void;
  onShowToast: (message: string, icon?: string) => void;
}

export const VoucherDetailScreen: React.FC<VoucherDetailScreenProps> = ({
  voucher,
  onBack,
  onRedeem,
  onSeeAllBrands,
  onShowToast,
}) => {
  // Live countdown timer: starting at 14m 56s
  const [secondsRemaining, setSecondsRemaining] = useState(14 * 60 + 56);
  const [isCopied, setIsCopied] = useState(false);
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);
  const [isFaqExpanded, setIsFaqExpanded] = useState(false);
  const [isRedeemedState, setIsRedeemedState] = useState(voucher.isRedeemed || false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(voucher.code);
    setIsCopied(true);
    onShowToast(`Copied ${voucher.code} to clipboard!`, 'check_circle');
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  const handleRedeemClick = () => {
    setIsRedeemedState(true);
    onRedeem(voucher);
  };

  return (
    <div className="flex flex-col w-full pb-36 pt-16">
      <div className="flex flex-col w-full max-w-md mx-auto">
        {/* Voucher Hero Ticket Card */}
        <div className="px-5 pt-4">
          <div className="bg-[#FFFFFF] rounded-2xl p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] border border-[#E8E2DA] relative overflow-hidden flex flex-col gap-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                {/* Friendly Rose Emblem Box */}
                <div className="w-14 h-14 rounded-2xl bg-[#C85250]/10 flex flex-col items-center justify-center p-1 text-[#C85250] flex-shrink-0 border border-[#C85250]/20">
                  <svg className="w-7 h-7 fill-current mb-0.5" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                  <span className="text-[9px] font-bold uppercase tracking-wider leading-none">
                    TAKASHIMAYA
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#231F20] leading-tight tracking-tight">
                    {voucher.discountDisplay}
                  </h2>
                  <p className="text-sm text-[#6E6764] font-medium mt-0.5">
                    {voucher.subtitle}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#C85250]/10 text-[#C85250] text-xs font-semibold tracking-wide uppercase flex-shrink-0 border border-[#C85250]/20 whitespace-nowrap">
                {voucher.exclusiveLabel || 'The Rose Exclusive'}
              </span>
            </div>

            <div className="border-t border-dashed border-[#E8E2DA] pt-3 flex items-center justify-between text-xs text-[#6E6764]">
              <span className="font-medium">
                {voucher.locationDepartment || 'Takashimaya Department Store'}
              </span>
              <span className="text-[#C85250] font-bold">
                {voucher.locationMall || 'Ngee Ann City'}
              </span>
            </div>
          </div>
        </div>

        {/* Participating Brands Horizontal Strip */}
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-[#231F20]">Participating Brands</h3>
            <button
              onClick={onSeeAllBrands}
              className="text-[#C85250] text-xs font-bold hover:underline cursor-pointer"
            >
              See All ({PARTICIPATING_BRANDS.length})
            </button>
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {PARTICIPATING_BRANDS.slice(0, 7).map((brand) => (
              <div
                key={brand.id}
                onClick={onSeeAllBrands}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] flex items-center justify-center font-bold text-xs text-[#231F20] border border-[#E8E2DA] shadow-xs group-hover:border-[#C85250]/50 transition-all">
                  {brand.shortCode}
                </div>
                <span className="text-[11px] font-medium text-[#6E6764] truncate max-w-[56px] text-center">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scannable Barcode & QR Box Card with Perforations and Mascot */}
        <div className="px-5 pt-5">
          <div className="relative bg-[#FFFFFF] rounded-2xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-[#E8E2DA] overflow-hidden">
            {/* Rose-chan Mascot Watermark Badge */}
            <div className="absolute top-4 right-4 w-14 h-32 pointer-events-none z-10 flex items-center justify-center">
              <img
                src={ROSE_CHAN_IMAGE_URL}
                alt="Takashimaya Mascot Rose-chan"
                className="h-full object-contain filter drop-shadow-xs select-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Upper Code Area */}
            <div className="p-5 flex flex-col items-center text-center">
              {/* Live Countdown Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C85250]/10 text-[#C85250] border border-[#C85250]/20 mb-3.5">
                <span className="w-2 h-2 rounded-full bg-[#C85250] animate-pulse"></span>
                <span className="text-xs font-bold tracking-tight">
                  {isRedeemedState
                    ? 'Redeemed • Verified'
                    : `Active • ${formatTimer(secondsRemaining)} min remaining`}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#6E6764] mb-4 font-medium max-w-[240px]">
                Present this member scannable code before payment
              </p>

              {/* High Contrast QR Code with Takashimaya Center Emblem */}
              <div className="bg-white p-3 rounded-2xl shadow-xs border border-[#E8E2DA] flex flex-col items-center justify-center relative select-none">
                <svg
                  className="w-40 h-40"
                  fill="none"
                  viewBox="0 0 160 160"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="white" height="160" width="160"></rect>
                  {/* Top Left Marker */}
                  <rect fill="#1F1B1A" height="40" rx="6" width="40" x="12" y="12"></rect>
                  <rect fill="white" height="24" rx="3" width="24" x="20" y="20"></rect>
                  <rect fill="#C85250" height="12" rx="2" width="12" x="26" y="26"></rect>
                  {/* Top Right Marker */}
                  <rect fill="#1F1B1A" height="40" rx="6" width="40" x="108" y="12"></rect>
                  <rect fill="white" height="24" rx="3" width="24" x="116" y="20"></rect>
                  <rect fill="#C85250" height="12" rx="2" width="12" x="122" y="26"></rect>
                  {/* Bottom Left Marker */}
                  <rect fill="#1F1B1A" height="40" rx="6" width="40" x="12" y="108"></rect>
                  <rect fill="white" height="24" rx="3" width="24" x="20" y="116"></rect>
                  <rect fill="#C85250" height="12" rx="2" width="12" x="26" y="122"></rect>
                  {/* QR Data Matrix Pixels */}
                  <path
                    d="M64 16h8v8h-8zM80 16h8v8h-8zM64 32h16v8H64zM88 40h8v8h-8zM64 48h8v8h-8zM80 48h8v8h-8zM16 64h8v8h-8zM32 64h16v8H32zM56 64h16v8H56zM80 64h8v8h-8zM96 64h8v8h-8zM112 64h16v8h-16zM136 64h8v8h-8zM24 80h8v8h-8zM48 80h8v8h-8zM72 80h16v8H72zM104 80h8v8h-8zM128 80h16v8h-16zM16 96h8v8h-8zM32 96h8v8h-8zM64 96h8v8h-8zM88 96h8v8h-8zM120 96h8v8h-8zM64 112h8v8h-8zM80 112h16v8H80zM112 112h8v8h-8zM136 112h8v8h-8zM64 128h16v8H64zM88 128h8v8h-8zM112 128h16v8h-16zM76 144h8v8h-8zM100 144h8v8h-8zM124 144h8v8h-8z"
                    fill="#1F1B1A"
                  ></path>
                  {/* Center Takashimaya Rose Center Dot */}
                  <circle cx="80" cy="80" fill="#C85250" r="10"></circle>
                  <circle cx="80" cy="80" fill="white" r="4"></circle>
                </svg>
              </div>

              {/* Linear Barcode */}
              <div className="w-full mt-4 flex flex-col items-center">
                <svg
                  className="w-68 max-w-full h-11"
                  fill="none"
                  viewBox="0 0 256 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="#1F1B1A" height="48" width="3" x="0" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="5" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="5" x="10" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="18" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="4" x="23" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="30" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="6" x="35" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="3" x="44" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="50" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="5" x="55" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="3" x="63" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="69" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="6" x="74" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="83" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="4" x="88" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="95" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="6" x="100" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="3" x="109" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="4" x="115" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="122" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="5" x="127" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="3" x="135" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="6" x="141" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="150" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="4" x="155" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="3" x="162" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="168" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="6" x="173" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="3" x="182" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="4" x="188" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="195" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="5" x="200" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="208" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="4" x="213" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="6" x="220" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="229" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="5" x="234" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="2" x="242" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="4" x="247" y="0"></rect>
                  <rect fill="#1F1B1A" height="48" width="3" x="253" y="0"></rect>
                </svg>
              </div>
            </div>

            {/* Ticket Perforation Notch */}
            <div className="relative w-full h-6 flex items-center justify-between px-0 overflow-hidden bg-[#F4EFEA]/60">
              <div className="w-5 h-5 -ml-2.5 rounded-full bg-[#FAF8F5] border border-[#E8E2DA]"></div>
              <div className="flex-1 mx-3 flex items-center justify-between">
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
                <span className="w-1.5 h-0.5 rounded-full bg-[#E8E2DA]"></span>
              </div>
              <div className="w-5 h-5 -mr-2.5 rounded-full bg-[#FAF8F5] border border-[#E8E2DA]"></div>
            </div>

            {/* Lower Code Area */}
            <div className="p-4 bg-[#F4EFEA]/40 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-[#6E6764] uppercase tracking-wider">
                    Manual Voucher Code
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#231F20] font-mono tracking-wider truncate">
                    {voucher.code}
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#231F20] hover:bg-[#F4EFEA] active:scale-95 transition-transform flex-shrink-0 border border-[#E8E2DA] shadow-2xs font-semibold text-xs cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-[#658269]" />
                      <span className="text-[#658269]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#C85250]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#6E6764] text-center pt-1 font-medium">
                Or present this code to cashier at check-out
              </p>
            </div>
          </div>
        </div>

        {/* How To Redeem at Cashier Steps */}
        <div className="px-5 pt-5">
          <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E8E2DA] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FDF0EE] text-[#C85250] flex items-center justify-center">
                <ScanLine className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#231F20]">How To Use at Cashier</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]/60 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#C85250] text-white text-[11px] font-bold flex items-center justify-center mb-1.5">
                  1
                </div>
                <span className="text-[11px] font-bold text-[#231F20]">Present Code</span>
                <span className="text-[10px] text-[#6E6764] mt-0.5">Show QR or Barcode</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]/60 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#B57635] text-white text-[11px] font-bold flex items-center justify-center mb-1.5">
                  2
                </div>
                <span className="text-[11px] font-bold text-[#231F20]">Cashier Scan</span>
                <span className="text-[10px] text-[#6E6764] mt-0.5">Scanned at POS</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2DA]/60 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#658269] text-white text-[11px] font-bold flex items-center justify-center mb-1.5">
                  3
                </div>
                <span className="text-[11px] font-bold text-[#231F20]">Save 15%</span>
                <span className="text-[10px] text-[#6E6764] mt-0.5">Deducted instantly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions Checklist */}
        <div className="px-5 pt-5 flex flex-col gap-3">
          <h3 className="text-base font-bold text-[#231F20]">Terms &amp; Conditions</h3>
          <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E8E2DA] flex flex-col gap-3.5">
            {/* Line 1: Money */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C85250]/10 flex items-center justify-center text-[#C85250] flex-shrink-0">
                <Banknote className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-medium text-[#231F20]">No minimum spending</span>
            </div>

            {/* Line 2: Percent */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C85250]/10 flex items-center justify-center text-[#C85250] flex-shrink-0">
                <Percent className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-medium text-[#231F20]">No maximum discount</span>
            </div>

            {/* Line 3: Pin */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C85250]/10 flex items-center justify-center text-[#C85250] flex-shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-medium text-[#231F20]">
                Participating Takashimaya Orchard boutique counters
              </span>
            </div>

            {/* Line 4: Box */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C85250]/10 flex items-center justify-center text-[#C85250] flex-shrink-0">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-medium text-[#231F20]">
                For purchase a regular priced item only
              </span>
            </div>

            {/* Line 5: Document */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C85250]/10 flex items-center justify-center text-[#C85250] flex-shrink-0">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-medium text-[#231F20]">
                Excluding department store third-party events
              </span>
            </div>

            {/* Line 6: Calendar */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C85250]/10 flex items-center justify-center text-[#C85250] flex-shrink-0">
                <Calendar className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-medium text-[#231F20]">
                Use from 1 Oct 2026 - 31 Oct 2026
              </span>
            </div>

            {/* Expandable link row */}
            <button
              onClick={() => setIsTermsExpanded(!isTermsExpanded)}
              className="flex items-center justify-between pt-3 mt-1 border-t border-[#E8E2DA] text-[#C85250] font-bold text-xs tracking-wide w-full text-left cursor-pointer"
            >
              <span>See More Terms &amp; Conditions</span>
              {isTermsExpanded ? (
                <ChevronUp className="w-4.5 h-4.5" />
              ) : (
                <ChevronDown className="w-4.5 h-4.5" />
              )}
            </button>

            {isTermsExpanded && (
              <div className="flex flex-col gap-2 pt-1 text-[#6E6764] text-xs font-normal leading-relaxed border-t border-[#E8E2DA]/50">
                <p>
                  1. Present your voucher barcode or QR code prior to processing payment at point
                  of sale.
                </p>
                <p>
                  2. Offer applies only during your designated birthday calendar month for verified
                  Rose Members.
                </p>
                <p>
                  3. Cannot be combined with supplementary promotional voucher coupons or
                  clearance markdown promotions.
                </p>
                <p>
                  4. Staff may request proof of Takashimaya cardholder identity or NRIC/FIN verification.
                </p>
                <p>
                  5. Non-transferable and cannot be exchanged for cash or store gift vouchers.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Store Location & FAQ Section for rich scrollable information */}
        <div className="px-5 pt-5 pb-4">
          <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 shadow-xs border border-[#E8E2DA] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EEF5F9] text-[#4A7B9D] flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#231F20]">Frequently Asked Questions</h3>
              </div>
              <button
                onClick={() => setIsFaqExpanded(!isFaqExpanded)}
                className="text-xs text-[#C85250] font-bold cursor-pointer"
              >
                {isFaqExpanded ? 'Hide' : 'Expand'}
              </button>
            </div>

            {isFaqExpanded ? (
              <div className="flex flex-col gap-2.5 pt-1 text-xs text-[#6E6764]">
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]/70">
                  <p className="font-bold text-[#231F20]">Can I use this online at takashimaya.com.sg?</p>
                  <p className="mt-1 leading-relaxed">
                    This in-store voucher is designed for point-of-sale scanning at Takashimaya Department Store, Ngee Ann City counters.
                  </p>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]/70">
                  <p className="font-bold text-[#231F20]">What happens when the 15-minute countdown timer runs out?</p>
                  <p className="mt-1 leading-relaxed">
                    The timer is a security token refresh. Tap &apos;Get&apos; or refresh to generate a fresh barcode instantly for cashier checkout.
                  </p>
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2DA]/70">
                  <p className="font-bold text-[#231F20]">Are luxury boutique counters included?</p>
                  <p className="mt-1 leading-relaxed">
                    Participating boutiques include Shiseido, Clarins, Calvin Klein, TWG Tea, Paul, Fitflop, and cosmetic hall counters.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#6E6764]">
                Tap expand to view FAQ regarding barcode validity, luxury counter exclusions, and receipt policies.
              </p>
            )}
          </div>
        </div>
      </div>

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

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xl border-t border-[#E8E2DA] shadow-lg px-5 py-3.5 pb-safe">
        <div className="flex items-center justify-between max-w-md mx-auto w-full gap-4">
          {/* Points / Redemption Count Left */}
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#6E6764] uppercase tracking-wider">
              Points to redeem
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-[#231F20] leading-none">
                {voucher.pointsText || 'Free'}
              </span>
              <span className="text-xs font-medium text-[#6E6764]">
                {voucher.pointsCost === 0 ? '(1/1 left for you)' : `(Bal: 14,850 pts)`}
              </span>
            </div>
          </div>

          {/* Primary Action Right Button */}
          <button
            onClick={handleRedeemClick}
            disabled={isRedeemedState}
            className={`h-12 px-9 rounded-full font-bold text-base shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer ${
              isRedeemedState
                ? 'bg-[#658269] text-white opacity-90 cursor-default'
                : 'bg-[#C85250] text-white hover:bg-[#A83C3A]'
            }`}
          >
            <span>{isRedeemedState ? 'Redeemed ✓' : 'Get'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
