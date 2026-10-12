import React, { useState } from 'react';
import { X, QrCode, ScanLine, Sparkles, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface ScanPayModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onPointsEarned: (pts: number) => void;
}

export const ScanPayModal: React.FC<ScanPayModalProps> = ({
  isOpen,
  onClose,
  user,
  onPointsEarned,
}) => {
  const [mode, setMode] = useState<'scan' | 'memberQr'>('memberQr');
  const [simulatedScanned, setSimulatedScanned] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setSimulatedScanned(true);
    setTimeout(() => {
      onPointsEarned(250);
      setSimulatedScanned(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#FAF8F5] rounded-t-3xl sm:rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E8E2DA] animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 px-5 border-b border-[#E8E2DA] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#C85250] text-white flex items-center justify-center font-bold text-xs">
              高
            </div>
            <div>
              <h3 className="text-base font-bold text-[#231F20]">Takashimaya Pay &amp; Points</h3>
              <p className="text-xs text-[#6E6764]">Scan at checkout to earn &amp; redeem</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F4EFEA] hover:bg-[#EFEAE4] flex items-center justify-center text-[#6E6764] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="p-3 bg-white border-b border-[#E8E2DA] flex items-center gap-2">
          <button
            onClick={() => setMode('memberQr')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'memberQr'
                ? 'bg-[#C85250] text-white shadow-xs'
                : 'bg-[#F4EFEA] text-[#6E6764]'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>My Member Code</span>
          </button>
          <button
            onClick={() => setMode('scan')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'scan'
                ? 'bg-[#C85250] text-white shadow-xs'
                : 'bg-[#F4EFEA] text-[#6E6764]'
            }`}
          >
            <ScanLine className="w-4 h-4" />
            <span>Scan In-Store QR</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center text-center">
          {mode === 'memberQr' ? (
            <div className="flex flex-col items-center w-full">
              {/* Member Card Barcode & QR */}
              <div className="w-full bg-white p-5 rounded-2xl border border-[#E8E2DA] shadow-xs flex flex-col items-center">
                <div className="flex items-center justify-between w-full pb-3 border-b border-[#E8E2DA]/60 text-xs">
                  <span className="font-bold text-[#231F20]">{user.name}</span>
                  <span className="text-[#C85250] font-bold">14,850 Rose Pts</span>
                </div>

                {/* QR Code Container */}
                <div className="p-3 bg-white rounded-xl border border-[#E8E2DA] my-4 shadow-2xs">
                  <svg className="w-44 h-44" fill="none" viewBox="0 0 160 160">
                    <rect fill="white" height="160" width="160"></rect>
                    <rect fill="#231F20" height="40" rx="6" width="40" x="12" y="12"></rect>
                    <rect fill="white" height="24" rx="3" width="24" x="20" y="20"></rect>
                    <rect fill="#C85250" height="12" rx="2" width="12" x="26" y="26"></rect>
                    <rect fill="#231F20" height="40" rx="6" width="40" x="108" y="12"></rect>
                    <rect fill="white" height="24" rx="3" width="24" x="116" y="20"></rect>
                    <rect fill="#C85250" height="12" rx="2" width="12" x="122" y="26"></rect>
                    <rect fill="#231F20" height="40" rx="6" width="40" x="12" y="108"></rect>
                    <rect fill="white" height="24" rx="3" width="24" x="20" y="116"></rect>
                    <rect fill="#C85250" height="12" rx="2" width="12" x="26" y="122"></rect>
                    <path
                      d="M64 16h8v8h-8zM80 16h8v8h-8zM64 32h16v8H64zM88 40h8v8h-8zM64 48h8v8h-8zM80 48h8v8h-8zM16 64h8v8h-8zM32 64h16v8H32zM56 64h16v8H56zM80 64h8v8h-8zM96 64h8v8h-8zM112 64h16v8h-16zM136 64h8v8h-8zM24 80h8v8h-8zM48 80h8v8h-8zM72 80h16v8H72zM104 80h8v8h-8zM128 80h16v8h-16zM16 96h8v8h-8zM32 96h8v8h-8zM64 96h8v8h-8zM88 96h8v8h-8zM120 96h8v8h-8zM64 112h8v8h-8zM80 112h16v8H80zM112 112h8v8h-8zM136 112h8v8h-8zM64 128h16v8H64zM88 128h8v8h-8zM112 128h16v8h-16zM76 144h8v8h-8zM100 144h8v8h-8zM124 144h8v8h-8z"
                      fill="#231F20"
                    ></path>
                    <circle cx="80" cy="80" fill="#C85250" r="10"></circle>
                    <circle cx="80" cy="80" fill="white" r="4"></circle>
                  </svg>
                </div>

                <div className="font-mono font-bold text-sm text-[#231F20] tracking-wider">
                  8849 · 2026 · 1029
                </div>
                <p className="text-[11px] text-[#6E6764] mt-1">
                  Present to cashier at Ngee Ann City before settlement
                </p>
              </div>

              <button
                onClick={handleSimulateScan}
                className="mt-4 w-full py-3 rounded-full bg-[#C85250] text-white font-bold text-xs shadow-sm active:scale-95 transition-all hover:bg-[#A83C3A] cursor-pointer"
              >
                {simulatedScanned ? 'Processing Checkout Scan...' : 'Simulate Cashier Scan (+250 Pts)'}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="relative w-64 h-64 rounded-2xl bg-neutral-900 border-2 border-dashed border-[#C85250] flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-x-8 top-12 bottom-12 border-2 border-[#C85250]/70 rounded-xl pointer-events-none animate-pulse"></div>
                <ScanLine className="w-12 h-12 text-[#C85250] animate-bounce" />
                <p className="text-white text-xs font-semibold mt-3">Align QR code within frame</p>
              </div>

              <button
                onClick={handleSimulateScan}
                className="mt-4 w-full py-3 rounded-full bg-[#C85250] text-white font-bold text-xs shadow-sm active:scale-95 transition-all hover:bg-[#A83C3A] cursor-pointer"
              >
                {simulatedScanned ? 'Verifying Receipt QR...' : 'Simulate In-Store QR Scan'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
