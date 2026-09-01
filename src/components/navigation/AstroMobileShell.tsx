import React, { memo, ReactNode } from 'react';
import { AstroMobileHeader } from './AstroMobileHeader';
import { AstroMobileBottomNav } from './AstroMobileBottomNav';
import type { UserProfile } from '../../types';

export interface AstroMobileShellProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
  pageTitle?: string;
  userProfile: UserProfile;
  onOpenSearch?: () => void;
  onOpenSystemSheet?: () => void;
  onOpenMoreSheet?: () => void;
  onOpenNotifications?: () => void;
  notificationCount?: number;
  activeSystem?: string;
  children: ReactNode;
  miniPlayerSlot?: ReactNode;
  className?: string;
}

export const AstroMobileShell: React.FC<AstroMobileShellProps> = memo(({
  activeTab,
  onNavigate,
  onBack,
  canGoBack = false,
  pageTitle,
  userProfile,
  onOpenSearch,
  onOpenSystemSheet,
  onOpenMoreSheet,
  onOpenNotifications,
  notificationCount = 0,
  activeSystem = 'Vedic',
  children,
  miniPlayerSlot,
  className = '',
}) => {
  const isSubPage = !['home', 'forecast', 'ask', 'charts', 'me', 'landing'].includes(activeTab);

  return (
    <div className={`md:hidden flex flex-col min-h-dvh w-full max-w-full overflow-x-hidden bg-[#040812] text-slate-100 ${className}`}>
      <AstroMobileHeader
        title={pageTitle}
        activeTab={activeTab}
        isSubPage={isSubPage}
        onBack={onBack}
        onOpenSearch={onOpenSearch || (() => {})}
        onOpenSystemSheet={onOpenSystemSheet || (() => {})}
        onOpenMoreSheet={onOpenMoreSheet || (() => {})}
        onOpenNotifications={onOpenNotifications || (() => {})}
        notificationCount={notificationCount}
        userProfile={userProfile}
        activeSystem={activeSystem}
      />

      <main
        id="astro-mobile-main-content"
        className="flex-1 w-full px-2.5 sm:px-4 py-3 sm:py-4 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] overflow-y-auto overflow-x-hidden gpu-accel"
      >
        {children}
      </main>

      {miniPlayerSlot && (
        <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] inset-x-2.5 z-30 max-w-md mx-auto">
          {miniPlayerSlot}
        </div>
      )}

      <AstroMobileBottomNav
        activeTab={activeTab}
        onNavigate={onNavigate}
      />
    </div>
  );
});

AstroMobileShell.displayName = 'AstroMobileShell';
export default AstroMobileShell;
