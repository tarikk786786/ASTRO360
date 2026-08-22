import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '../types';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'prof_default_self',
  name: 'Tarik Islam',
  email: 'tarik@astro.tarikislam.in',
  gender: 'male',
  dob: '1995-10-24',
  time: '14:30',
  location: 'New Delhi, India',
  latitude: 28.6139,
  longitude: 77.2090,
  timezone: 'Asia/Kolkata',
  relation: 'self',
  preferredSystem: 'vedic',
  chartStyle: 'north',
  experienceMode: 'normal',
  primaryLifeFocus: 'Wealth, Purpose & Protection',
  ayanamsha: 'lahiri',
};

interface ProfileState {
  profiles: UserProfile[];
  activeProfileId: string;
  
  // Actions
  addProfile: (profile: Omit<UserProfile, 'id'> & { id?: string }) => string;
  updateProfile: (id: string, updates: Partial<UserProfile>) => void;
  deleteProfile: (id: string) => void;
  setActiveProfileId: (id: string) => void;
  getActiveProfile: () => UserProfile;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: [DEFAULT_PROFILE],
      activeProfileId: DEFAULT_PROFILE.id!,

      addProfile: (profileData) => {
        const id = profileData.id || `prof_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const newProfile: UserProfile = {
          ...profileData,
          id,
        };

        set((state) => ({
          profiles: [...state.profiles, newProfile],
          activeProfileId: id,
        }));

        return id;
      },

      updateProfile: (id, updates) => {
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deleteProfile: (id) => {
        set((state) => {
          const remaining = state.profiles.filter((p) => p.id !== id);
          const nextProfiles = remaining.length > 0 ? remaining : [DEFAULT_PROFILE];
          const nextActiveId = state.activeProfileId === id ? nextProfiles[0].id! : state.activeProfileId;
          return {
            profiles: nextProfiles,
            activeProfileId: nextActiveId,
          };
        });
      },

      setActiveProfileId: (id) => {
        const exists = get().profiles.some((p) => p.id === id);
        if (exists) {
          set({ activeProfileId: id });
        }
      },

      getActiveProfile: () => {
        const { profiles, activeProfileId } = get();
        const active = profiles.find((p) => p.id === activeProfileId);
        return active || profiles[0] || DEFAULT_PROFILE;
      },
    }),
    {
      name: 'astro360_multi_profiles_storage',
    }
  )
);
