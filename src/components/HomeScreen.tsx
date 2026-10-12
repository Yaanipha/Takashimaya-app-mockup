import React from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Gift,
  ShoppingBag,
  Coffee,
  Store,
  ChevronDown,
  Building,
} from 'lucide-react';
import { ROSE_CHAN_IMAGE_URL } from '../data/mockData';
import { UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  onGoToPrivileges: () => void;
  onShowToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  onGoToPrivileges,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full pb-36 pt-16 max-w-md mx-auto px-5">
      {/* Welcome Banner */}
      <div className="pt-3 pb-2 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#C85250] uppercase tracking-wider">
            Ngee Ann City · Orchard Road
          </span>
          <h2 className="text-xl font-extrabold text-[#231F20]">Welcome, {user.name}</h2>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#C85250] text-white flex items-center justify-center font-bold text-sm shadow-xs select-none">
          高
        </div>
      </div>

      {/* Featured Department Store Showcase */}
      <div className="mt-2 relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#231F20] to-[#3D3533] text-white p-5 shadow-md">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#C85250] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2">
            Autumn Luxury Fair
          </div>
          <h3 className="text-lg font-bold leading-tight">
            Japan Craft &amp; Gourmet Atrium
          </h3>
          <p className="text-xs text-white/80 mt-1 max-w-[240px]">
            Explore authentic confectionery, Hokkaido seafood &amp; artisanal ceramic crafts at B2 Atrium.
          </p>
          <div className="flex items-center gap-2 mt-3.5">
            <button
              onClick={onGoToPrivileges}
              className="px-4 py-2 rounded-full bg-white text-[#231F20] text-xs font-bold hover:bg-[#FAF8F5] active:scale-95 transition-all cursor-pointer"
            >
              View Member Perks
            </button>
            <span className="text-[11px] text-white/70 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Until 25 Oct
            </span>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        <button
          onClick={onGoToPrivileges}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E8E2DA] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#FDF0EE] text-[#C85250] flex items-center justify-center mb-1">
            <Gift className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#231F20]">Privileges</span>
        </button>

        <button
          onClick={() => onShowToast('Store directory: B2 to Level 4 Ngee Ann City')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E8E2DA] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#EDF3EE] text-[#658269] flex items-center justify-center mb-1">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#231F20]">Directory</span>
        </button>

        <button
          onClick={() => onShowToast('Takashimaya Food Hall: B2 Gourmet Market open daily 10am-9:30pm')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E8E2DA] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#FBF3EA] text-[#B57635] flex items-center justify-center mb-1">
            <Coffee className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#231F20]">Food Hall</span>
        </button>

        <button
          onClick={() => onShowToast('Customer Service Counter: Level 1 & Level 3')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E8E2DA] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#EEF5F9] text-[#4A7B9D] flex items-center justify-center mb-1">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-[#231F20]">Concierge</span>
        </button>
      </div>

      {/* Rose-chan Mascot Greeting */}
      <div className="mt-4 bg-white rounded-2xl p-4 border border-[#E8E2DA] shadow-xs flex items-center justify-between">
        <div className="flex-1 pr-2">
          <span className="text-[10px] font-bold text-[#C85250] bg-[#FDF0EE] px-2 py-0.5 rounded-full">
            Rose-chan Greeting
          </span>
          <h4 className="text-sm font-bold text-[#231F20] mt-1.5">
            Konichiwa! Ready for shopping?
          </h4>
          <p className="text-xs text-[#6E6764] mt-0.5">
            Remember to present your Rose Points barcode at boutique checkout counters!
          </p>
        </div>
        <img
          src={ROSE_CHAN_IMAGE_URL}
          alt="Rose-chan"
          className="w-16 h-20 object-contain flex-shrink-0"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Floor by Floor Store Guide */}
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#231F20]">Store Floor Directory</h3>
          <span className="text-xs text-[#6E6764]">391 Orchard Road</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E2DA] shadow-xs overflow-hidden divide-y divide-[#E8E2DA]/60">
          <div className="p-3.5 flex items-start gap-3 hover:bg-[#FAF8F5] transition-colors">
            <span className="w-8 h-8 rounded-lg bg-[#FAF8F5] text-[#C85250] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#E8E2DA]">
              L4
            </span>
            <div className="flex-1">
              <span className="text-xs font-bold text-[#231F20] block">Living, Bedding &amp; Children</span>
              <span className="text-[11px] text-[#6E6764]">
                Dyson, Muji Flagship, Le Creuset Cookware, Sanrio, Childrens World
              </span>
            </div>
          </div>

          <div className="p-3.5 flex items-start gap-3 hover:bg-[#FAF8F5] transition-colors">
            <span className="w-8 h-8 rounded-lg bg-[#FAF8F5] text-[#C85250] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#E8E2DA]">
              L3
            </span>
            <div className="flex-1">
              <span className="text-xs font-bold text-[#231F20] block">Ladies &amp; Mens Apparel, VIP Lounge</span>
              <span className="text-[11px] text-[#6E6764]">
                Calvin Klein, Paul Bakery, Tax Refund Center, Customer Service
              </span>
            </div>
          </div>

          <div className="p-3.5 flex items-start gap-3 hover:bg-[#FAF8F5] transition-colors">
            <span className="w-8 h-8 rounded-lg bg-[#FAF8F5] text-[#C85250] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#E8E2DA]">
              L2
            </span>
            <div className="flex-1">
              <span className="text-xs font-bold text-[#231F20] block">Designer Boutiques &amp; Salon</span>
              <span className="text-[11px] text-[#6E6764]">
                TWG Tea Salon, Fitflop, International Designer Brands
              </span>
            </div>
          </div>

          <div className="p-3.5 flex items-start gap-3 hover:bg-[#FAF8F5] transition-colors">
            <span className="w-8 h-8 rounded-lg bg-[#FAF8F5] text-[#C85250] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#E8E2DA]">
              L1
            </span>
            <div className="flex-1">
              <span className="text-xs font-bold text-[#231F20] block">Cosmetics &amp; Luxury Hall</span>
              <span className="text-[11px] text-[#6E6764]">
                Shiseido, Clarins, Dior Beauty, SK-II, Chanel Beauté, Jo Malone
              </span>
            </div>
          </div>

          <div className="p-3.5 flex items-start gap-3 hover:bg-[#FAF8F5] transition-colors">
            <span className="w-8 h-8 rounded-lg bg-[#FAF8F5] text-[#C85250] font-bold text-xs flex items-center justify-center flex-shrink-0 border border-[#E8E2DA]">
              B2
            </span>
            <div className="flex-1">
              <span className="text-xs font-bold text-[#231F20] block">Food Hall &amp; Cold Storage Gourmet</span>
              <span className="text-[11px] text-[#6E6764]">
                Japanese Sweets, Tsujiri Matcha, Meidi-Ya, Cold Storage Fresh, Godiva
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
