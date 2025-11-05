import { create } from 'zustand';

interface UserState {
  token: string;
  user: string;
  email: string;
  referralCode: string;
  credits: number;
  referredCount: number;
  convertedCount: number;
  hasPurchased: boolean;
  setUserData: (data: Partial<UserState>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: '',
  user: '',
  email: '',
  referralCode: '',
  credits: 0,
  referredCount: 0,
  convertedCount: 0,
  hasPurchased: false,
  setUserData: (data) => set((state) => ({ ...state, ...data })),
  resetUser: () => set({
    token: '', user: '', email: '', referralCode: '',
    credits: 0, referredCount: 0, convertedCount: 0, hasPurchased: false
  })
}));
