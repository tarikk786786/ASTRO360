import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  timestamp: string;
  orderId?: string;
  category: 'recharge' | 'report' | 'consultation' | 'query' | 'store' | 'bonus';
}

interface WalletState {
  balance: number;
  bonusBalance: number;
  transactions: WalletTransaction[];
  
  // Actions
  addCredits: (amount: number, description: string, orderId?: string) => void;
  deductCredits: (amount: number, description: string, category: WalletTransaction['category']) => boolean;
  getFormattedBalance: () => string;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balance: 150, // Welcome bonus of ₹150 for new seekers
      bonusBalance: 50,
      transactions: [
        {
          id: 'tx_welcome_bonus',
          type: 'credit',
          amount: 150,
          description: 'Welcome Gift: Cosmic Credits for Free First Consultation',
          timestamp: new Date().toISOString(),
          category: 'bonus',
        },
      ],

      addCredits: (amount: number, description: string, orderId?: string) => {
        const newTx: WalletTransaction = {
          id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          type: 'credit',
          amount,
          description,
          timestamp: new Date().toISOString(),
          orderId,
          category: 'recharge',
        };

        set((state) => ({
          balance: state.balance + amount,
          transactions: [newTx, ...state.transactions],
        }));
      },

      deductCredits: (amount: number, description: string, category: WalletTransaction['category']) => {
        const currentBalance = get().balance;
        if (currentBalance < amount) {
          return false;
        }

        const newTx: WalletTransaction = {
          id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          type: 'debit',
          amount,
          description,
          timestamp: new Date().toISOString(),
          category,
        };

        set((state) => ({
          balance: state.balance - amount,
          transactions: [newTx, ...state.transactions],
        }));
        return true;
      },

      getFormattedBalance: () => {
        return `₹${get().balance.toLocaleString('en-IN')}`;
      },
    }),
    {
      name: 'astro360_wallet_storage',
    }
  )
);
