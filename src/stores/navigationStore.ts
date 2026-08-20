import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type DashboardCategory = 'overview' | 'charts' | 'timing' | 'remedies' | 'profile' | 'reports';

interface NavigationState {
  activeTab: string;
  activeCategory: DashboardCategory;
  isSidebarOpen: boolean;
  isCommandPaletteOpen: boolean;
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  setActiveTab: (tab: string) => void;
  setActiveCategory: (category: DashboardCategory) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setIsCommandPaletteOpen: (isOpen: boolean) => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  setIsProfileModalOpen: (isOpen: boolean) => void;
  navigateTo: (tab: string, category?: DashboardCategory) => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      activeTab: 'dashboard',
      activeCategory: 'overview',
      isSidebarOpen: false,
      isCommandPaletteOpen: false,
      isAuthModalOpen: false,
      isProfileModalOpen: false,
      setActiveTab: (tab) => set({ activeTab: tab }),
      setActiveCategory: (category) => set({ activeCategory: category }),
      setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      setIsCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),
      setIsAuthModalOpen: (isOpen) => set({ isAuthModalOpen: isOpen }),
      setIsProfileModalOpen: (isOpen) => set({ isProfileModalOpen: isOpen }),
      navigateTo: (tab, category) =>
        set((state) => ({
          activeTab: tab,
          activeCategory: category || (tab === 'dashboard' ? state.activeCategory : 'overview'),
          isSidebarOpen: false,
        })),
    }),
    {
      name: 'astroverse_navigation_store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeTab: state.activeTab, activeCategory: state.activeCategory }),
    }
  )
);
