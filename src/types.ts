export type CategoryType = 'all' | 'dining' | 'grocery' | 'beauty' | 'fashion' | 'free' | 'perk';

export interface Brand {
  id: string;
  shortCode: string;
  name: string;
  category: string;
  location: string;
}

export interface Voucher {
  id: string;
  brand: string;
  title: string;
  discountDisplay: string;
  categoryBadge: string;
  categoryType: CategoryType;
  subtitle: string;
  minSpendText: string;
  expiryText: string;
  pointsCost: number;
  pointsText: string;
  sgdValue: string;
  code: string;
  isExclusive?: boolean;
  exclusiveLabel?: string;
  locationDepartment?: string;
  locationMall?: string;
  colorScheme: 'primary' | 'sage' | 'amber' | 'sky';
  isRedeemed?: boolean;
  terms: string[];
  participatingBrands?: string[];
}

export interface PointTransaction {
  id: string;
  title: string;
  date: string;
  points: number;
  type: 'earned' | 'redeemed' | 'bonus' | 'expiring';
  location: string;
}

export interface UserProfile {
  name: string;
  initials: string;
  memberId: string;
  tier: string;
  balancePoints: number;
  expiringPoints: number;
  expiryDateText: string;
  tierProgress: number;
  nextTierThreshold: number;
  avatarUrl: string;
}
