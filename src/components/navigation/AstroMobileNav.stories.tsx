import React from 'react';
import { AstroMobileBottomNav } from './AstroMobileBottomNav';
import { AstroMobileHeader } from './AstroMobileHeader';
import { AstroMoreSheet } from './AstroMoreSheet';
import { AstroSystemSheet } from './AstroSystemSheet';
import { AstroCommandFinder } from './AstroCommandFinder';

const mockProfile = {
  name: 'Aria Stark',
  email: 'aria@example.com',
  phone: '+1-555-0199',
  gender: 'female' as const,
  dob: '1998-06-15',
  time: '12:00',
  location: 'London, UK',
  preferredSystem: 'vedic',
  careerGoal: 'Leadership',
  relationshipStatus: 'Single',
  primaryLifeFocus: 'Self-Realization',
};

// 1. Default Home Tab Active
export const HomeActive = () => (
  <AstroMobileBottomNav
    activeTab="home"
    onNavigate={(tab: string) => console.log('Navigate to', tab)}
  />
);

// 2. Forecast Tab Active
export const ForecastActive = () => (
  <AstroMobileBottomNav
    activeTab="forecast"
    onNavigate={(tab: string) => console.log('Navigate to', tab)}
  />
);

// 3. Central Ask Hero Tab Active
export const AskHeroActive = () => (
  <AstroMobileBottomNav
    activeTab="ask"
    onNavigate={(tab: string) => console.log('Navigate to', tab)}
  />
);

// 4. Charts Tab Active
export const ChartsActive = () => (
  <AstroMobileBottomNav
    activeTab="charts"
    onNavigate={(tab: string) => console.log('Navigate to', tab)}
  />
);

// 5. Me / Account Tab Active
export const MeActive = () => (
  <AstroMobileBottomNav
    activeTab="me"
    onNavigate={(tab: string) => console.log('Navigate to', tab)}
  />
);

// 6. Mobile Header Story
export const MobileHeaderDefault = () => (
  <AstroMobileHeader
    activeTab="home"
    onOpenSearch={() => alert('Search clicked')}
    onOpenSystemSheet={() => alert('System sheet clicked')}
    onOpenMoreSheet={() => alert('More sheet clicked')}
    userProfile={mockProfile}
    activeSystem="Vedic"
  />
);

// 7. Mobile Header Secondary Sub-Page with Back Button
export const MobileHeaderSubPage = () => (
  <AstroMobileHeader
    title="Vimshottari Dasha 120-Year Timeline"
    activeTab="dasha"
    isSubPage={true}
    onBack={() => alert('Back clicked')}
    onOpenSearch={() => alert('Search clicked')}
    onOpenSystemSheet={() => alert('System sheet clicked')}
    onOpenMoreSheet={() => alert('More sheet clicked')}
    userProfile={mockProfile}
    activeSystem="Vedic"
  />
);

// 8. More Astrological Systems Sheet Open
export const MoreSheetCatalog = () => (
  <AstroMoreSheet
    isOpen={true}
    onClose={() => console.log('Close More Sheet')}
    onNavigate={(route: string) => console.log('Navigate to', route)}
  />
);

// 9. Astrology System Switcher Sheet Open
export const SystemSwitcherSheet = () => (
  <AstroSystemSheet
    isOpen={true}
    activeSystem="vedic"
    onSelectSystem={(sys: string) => console.log('Selected system', sys)}
    onClose={() => console.log('Close System Sheet')}
  />
);

// 10. Global Command Finder Open
export const CommandFinderSearch = () => (
  <AstroCommandFinder
    isOpen={true}
    onClose={() => console.log('Close Search')}
    onNavigate={(route: string) => console.log('Navigate to', route)}
    onAskQuery={(q: string) => console.log('Ask query', q)}
  />
);
