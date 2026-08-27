import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AstroMobileBottomNav } from './AstroMobileBottomNav';
import { AstroMobileHeader } from './AstroMobileHeader';
import { AstroMoreSheet } from './AstroMoreSheet';
import { AstroSystemSheet } from './AstroSystemSheet';
import { AstroCommandFinder } from './AstroCommandFinder';

const meta: Meta<typeof AstroMobileBottomNav> = {
  title: 'Navigation/AstroMobileBottomNav',
  component: AstroMobileBottomNav,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AstroMobileBottomNav>;

const mockProfile = {
  name: 'Aria Stark',
  email: 'aria@example.com',
  phone: '+1-555-0199',
  gender: 'female',
  dob: '1998-06-15',
  time: '12:00',
  location: 'London, UK',
  preferredSystem: 'vedic',
  careerGoal: 'Leadership',
  relationshipStatus: 'Single',
  primaryLifeFocus: 'Self-Realization',
};

// 1. Default Home Tab Active
export const HomeActive: Story = {
  args: {
    activeTab: 'home',
    onNavigate: (tab) => console.log('Navigate to', tab),
  },
};

// 2. Forecast Tab Active
export const ForecastActive: Story = {
  args: {
    activeTab: 'forecast',
    onNavigate: (tab) => console.log('Navigate to', tab),
  },
};

// 3. Central Ask Hero Tab Active
export const AskHeroActive: Story = {
  args: {
    activeTab: 'ask',
    onNavigate: (tab) => console.log('Navigate to', tab),
  },
};

// 4. Charts Tab Active
export const ChartsActive: Story = {
  args: {
    activeTab: 'charts',
    onNavigate: (tab) => console.log('Navigate to', tab),
  },
};

// 5. Me / Account Tab Active
export const MeActive: Story = {
  args: {
    activeTab: 'me',
    onNavigate: (tab) => console.log('Navigate to', tab),
  },
};

// 6. Mobile Header Story
export const MobileHeaderDefault: StoryObj<typeof AstroMobileHeader> = {
  render: () => (
    <AstroMobileHeader
      activeTab="home"
      onOpenSearch={() => alert('Search clicked')}
      onOpenSystemSheet={() => alert('System sheet clicked')}
      onOpenMoreSheet={() => alert('More sheet clicked')}
      userProfile={mockProfile}
      activeSystem="Vedic"
    />
  ),
};

// 7. Mobile Header Secondary Sub-Page with Back Button
export const MobileHeaderSubPage: StoryObj<typeof AstroMobileHeader> = {
  render: () => (
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
  ),
};

// 8. More Astrological Systems Sheet Open
export const MoreSheetCatalog: StoryObj<typeof AstroMoreSheet> = {
  render: () => (
    <AstroMoreSheet
      isOpen={true}
      onClose={() => console.log('Close More Sheet')}
      onNavigate={(route) => console.log('Navigate to', route)}
    />
  ),
};

// 9. Astrology System Switcher Sheet Open
export const SystemSwitcherSheet: StoryObj<typeof AstroSystemSheet> = {
  render: () => (
    <AstroSystemSheet
      isOpen={true}
      activeSystem="vedic"
      onSelectSystem={(sys) => console.log('Selected system', sys)}
      onClose={() => console.log('Close System Sheet')}
    />
  ),
};

// 10. Global Command Finder Open
export const CommandFinderSearch: StoryObj<typeof AstroCommandFinder> = {
  render: () => (
    <AstroCommandFinder
      isOpen={true}
      onClose={() => console.log('Close Search')}
      onNavigate={(route) => console.log('Navigate to', route)}
      onAskQuery={(q) => console.log('Ask query', q)}
    />
  ),
};
