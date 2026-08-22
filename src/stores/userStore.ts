import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfile } from '../types';

interface UserState {
  userProfile: UserProfile;
  isOnboarded: boolean;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  setFullProfile: (profile: UserProfile) => void;
  resetProfile: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: '',
  gender: 'universal',
  dob: '',
  time: '',
  location: '',
  preferredSystem: 'Vedic',
  experienceMode: 'normal',
  careerGoal: '',
  relationshipStatus: 'Single',
  primaryLifeFocus: 'Spiritual Growth',
  ayanamsha: 'Lahiri',
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userProfile: DEFAULT_PROFILE,
      isOnboarded: false,
      setUserProfile: (updates) =>
        set((state) => {
          const updated = { ...state.userProfile, ...updates };
          const onboarded = Boolean(updated.name && updated.dob && updated.location);
          return { userProfile: updated, isOnboarded: onboarded };
        }),
      setFullProfile: (profile) =>
        set(() => ({
          userProfile: profile,
          isOnboarded: Boolean(profile.name && profile.dob && profile.location),
        })),
      resetProfile: () =>
        set(() => ({
          userProfile: DEFAULT_PROFILE,
          isOnboarded: false,
        })),
    }),
    {
      name: 'astroverse_profile_store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
