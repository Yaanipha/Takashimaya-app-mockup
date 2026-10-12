import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabId } from './components/BottomNav';
import { PrivilegesScreen } from './components/PrivilegesScreen';
import { VoucherDetailScreen } from './components/VoucherDetailScreen';
import { WalletScreen } from './components/WalletScreen';
import { HomeScreen } from './components/HomeScreen';
import { AccountScreen } from './components/AccountScreen';
import { PointsHistoryModal } from './components/PointsHistoryModal';
import { MemberTierModal } from './components/MemberTierModal';
import { BrandsModal } from './components/BrandsModal';
import { ScanPayModal } from './components/ScanPayModal';
import { NotificationsModal } from './components/NotificationsModal';
import { RedeemConfirmModal } from './components/RedeemConfirmModal';
import { Toast } from './components/Toast';
import {
  INITIAL_USER,
  INITIAL_VOUCHERS,
  INITIAL_TRANSACTIONS,
} from './data/mockData';
import { UserProfile, Voucher, PointTransaction } from './types';

export default function App() {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [vouchers, setVouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);
  const [transactions, setTransactions] = useState<PointTransaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<TabId>('privileges');
  
  // Navigation & Detail Screen state
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  // Modals state
  const [isPointsHistoryOpen, setIsPointsHistoryOpen] = useState(false);
  const [isMemberTierOpen, setIsMemberTierOpen] = useState(false);
  const [isBrandsModalOpen, setIsBrandsModalOpen] = useState(false);
  const [isScanPayOpen, setIsScanPayOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [voucherToRedeem, setVoucherToRedeem] = useState<Voucher | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');

  // Redeemed vouchers in Wallet
  const redeemedVouchers = vouchers.filter((v) => v.isRedeemed);

  const showToast = (message: string, icon = 'check_circle') => {
    setToastMessage(message);
    setToastIcon(icon);
  };

  // Open voucher detail screen
  const handleSelectVoucher = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from detail screen to hub
  const handleBackToHub = () => {
    setSelectedVoucher(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick toggle between Screen 1 (Hub) and Screen 2 (Voucher Detail)
  const handleToggleScreen = (view: 'hub' | 'detail') => {
    if (view === 'hub') {
      setSelectedVoucher(null);
      setActiveTab('privileges');
    } else {
      const birthVoucher =
        vouchers.find((v) => v.id === 'voucher-birth-month') || vouchers[0];
      setSelectedVoucher(birthVoucher);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger redemption flow (from "Get" button)
  const handleRequestRedeem = (voucher: Voucher) => {
    setVoucherToRedeem(voucher);
  };

  // Confirm redemption
  const handleConfirmRedeem = (voucher: Voucher) => {
    if (user.balancePoints < voucher.pointsCost) {
      showToast('Insufficient Rose Points to redeem', 'error');
      return;
    }

    // Deduct points
    setUser((prev) => ({
      ...prev,
      balancePoints: prev.balancePoints - voucher.pointsCost,
    }));

    // Mark as redeemed
    setVouchers((prev) =>
      prev.map((v) => (v.id === voucher.id ? { ...v, isRedeemed: true } : v))
    );

    // If currently viewing detail of this voucher, update selectedVoucher
    if (selectedVoucher && selectedVoucher.id === voucher.id) {
      setSelectedVoucher((prev) => (prev ? { ...prev, isRedeemed: true } : null));
    }

    // Record transaction
    const newTransaction: PointTransaction = {
      id: `t-${Date.now()}`,
      title: `Redeemed: ${voucher.title}`,
      date: 'Just now',
      points: -voucher.pointsCost,
      type: 'redeemed',
      location: voucher.locationDepartment || 'Takashimaya Singapore',
    };
    setTransactions((prev) => [newTransaction, ...prev]);

    setVoucherToRedeem(null);
    showToast(`Claimed: ${voucher.title} (-${voucher.pointsCost} Pts)`, 'check_circle');
  };

  // Handle points earned via Scan & Pay
  const handlePointsEarned = (earnedPts: number) => {
    setUser((prev) => ({
      ...prev,
      balancePoints: prev.balancePoints + earnedPts,
    }));

    const newTransaction: PointTransaction = {
      id: `t-${Date.now()}`,
      title: 'Checkout Point Accrual',
      date: 'Just now',
      points: earnedPts,
      type: 'earned',
      location: 'Ngee Ann City Boutique POS',
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    showToast(`+${earnedPts} Rose Points credited to your account!`, 'check_circle');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#231F20] flex flex-col font-sans selection:bg-[#C85250]/20 selection:text-[#C85250]">
      {/* Top Header */}
      <Header
        user={user}
        isDetailView={selectedVoucher !== null}
        onBack={handleBackToHub}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAccount={() => {
          setSelectedVoucher(null);
          setActiveTab('account');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleScreen={handleToggleScreen}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col relative w-full">
        {selectedVoucher !== null ? (
          /* Screen 2: Voucher Detail View */
          <VoucherDetailScreen
            voucher={selectedVoucher}
            onBack={handleBackToHub}
            onRedeem={handleConfirmRedeem}
            onSeeAllBrands={() => setIsBrandsModalOpen(true)}
            onShowToast={showToast}
          />
        ) : (
          /* Screen 1 or active bottom tab */
          <>
            {activeTab === 'privileges' && (
              <PrivilegesScreen
                user={user}
                vouchers={vouchers}
                onSelectVoucher={handleSelectVoucher}
                onRedeemVoucher={handleRequestRedeem}
                onOpenPointsHistory={() => setIsPointsHistoryOpen(true)}
                onOpenMemberTier={() => setIsMemberTierOpen(true)}
                onOpenScanPay={() => setIsScanPayOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'home' && (
              <HomeScreen
                user={user}
                onGoToPrivileges={() => setActiveTab('privileges')}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'wallet' && (
              <WalletScreen
                redeemedVouchers={redeemedVouchers}
                onSelectVoucher={handleSelectVoucher}
                onExplorePrivileges={() => setActiveTab('privileges')}
              />
            )}

            {activeTab === 'account' && (
              <AccountScreen
                user={user}
                onOpenTierModal={() => setIsMemberTierOpen(true)}
                onOpenPointsHistory={() => setIsPointsHistoryOpen(true)}
                onShowToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation Bar (Hidden when in Voucher Detail View) */}
      {selectedVoucher === null && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSelectedVoucher(null);
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenScanPay={() => setIsScanPayOpen(true)}
          walletCount={redeemedVouchers.length}
        />
      )}

      {/* Modals & Sheets */}
      <PointsHistoryModal
        isOpen={isPointsHistoryOpen}
        onClose={() => setIsPointsHistoryOpen(false)}
        transactions={transactions}
        balance={user.balancePoints}
      />

      <MemberTierModal
        isOpen={isMemberTierOpen}
        onClose={() => setIsMemberTierOpen(false)}
        user={user}
      />

      <BrandsModal
        isOpen={isBrandsModalOpen}
        onClose={() => setIsBrandsModalOpen(false)}
        onSelectBrand={(brand) => {
          showToast(`Filtered for ${brand.name} in Takashimaya`, 'check_circle');
        }}
      />

      <ScanPayModal
        isOpen={isScanPayOpen}
        onClose={() => setIsScanPayOpen(false)}
        user={user}
        onPointsEarned={handlePointsEarned}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectVoucherNotification={() => {
          const birthVoucher = vouchers.find((v) => v.id === 'voucher-birth-month') || vouchers[0];
          setSelectedVoucher(birthVoucher);
        }}
      />

      <RedeemConfirmModal
        isOpen={voucherToRedeem !== null}
        onClose={() => setVoucherToRedeem(null)}
        voucher={voucherToRedeem}
        userPoints={user.balancePoints}
        onConfirm={handleConfirmRedeem}
      />

      {/* Interactive Toast Notification */}
      <Toast
        message={toastMessage}
        icon={toastIcon}
        onClose={() => setToastMessage(null)}
        onOpenWallet={() => {
          setSelectedVoucher(null);
          setActiveTab('wallet');
        }}
      />
    </div>
  );
}
