import React, { useState } from 'react';
import { X, Search, MapPin, Tag } from 'lucide-react';
import { Brand } from '../types';
import { PARTICIPATING_BRANDS } from '../data/mockData';

interface BrandsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBrand?: (brand: Brand) => void;
}

export const BrandsModal: React.FC<BrandsModalProps> = ({
  isOpen,
  onClose,
  onSelectBrand,
}) => {
  const [search, setSearch] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string>('All');

  if (!isOpen) return null;

  const floors = ['All', 'Basement 2', 'Level 1', 'Level 2', 'Level 3', 'Level 4'];

  const filteredBrands = PARTICIPATING_BRANDS.filter((brand) => {
    const matchSearch =
      brand.name.toLowerCase().includes(search.toLowerCase()) ||
      brand.shortCode.toLowerCase().includes(search.toLowerCase()) ||
      brand.category.toLowerCase().includes(search.toLowerCase());

    const matchFloor =
      selectedFloor === 'All' || brand.location.toLowerCase().includes(selectedFloor.toLowerCase());

    return matchSearch && matchFloor;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#FAF8F5] rounded-t-3xl sm:rounded-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[#E8E2DA] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 px-5 border-b border-[#E8E2DA] flex items-center justify-between bg-white">
          <div>
            <h3 className="text-base font-bold text-[#231F20]">Participating Brands</h3>
            <p className="text-xs text-[#6E6764]">
              {PARTICIPATING_BRANDS.length} boutiques at Takashimaya Ngee Ann City
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4EFEA] hover:bg-[#EFEAE4] flex items-center justify-center text-[#6E6764] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3.5 bg-white border-b border-[#E8E2DA] flex flex-col gap-2.5">
          <div className="relative flex items-center bg-[#F4EFEA] rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-[#6E6764] mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search brands (e.g. Dior, TWG, Shiseido)..."
              className="w-full bg-transparent border-0 outline-none text-xs text-[#231F20] placeholder:text-[#6E6764]"
            />
          </div>

          {/* Floor Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {floors.map((floor) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedFloor === floor
                    ? 'bg-[#C85250] text-white'
                    : 'bg-[#F4EFEA] text-[#6E6764] hover:bg-[#EFEAE4]'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Grid / List */}
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 gap-2">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              onClick={() => {
                if (onSelectBrand) onSelectBrand(brand);
                onClose();
              }}
              className="bg-white p-3 rounded-xl border border-[#E8E2DA] flex items-center justify-between hover:border-[#C85250]/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FDF0EE] text-[#C85250] border border-[#C85250]/20 flex items-center justify-center font-bold text-xs flex-shrink-0 group-hover:scale-105 transition-transform">
                  {brand.shortCode}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#231F20] group-hover:text-[#C85250] transition-colors">
                    {brand.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#6E6764]">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#6E6764]" />
                      {brand.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-medium text-[#C85250] bg-[#FDF0EE] px-2.5 py-1 rounded-full flex-shrink-0">
                <MapPin className="w-3 h-3 text-[#C85250]" />
                <span>{brand.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
