/**
 * ASTRO360 Global Configuration React Context & Reactive Custom Hook
 * Provides application-wide reactive settings propagation to all UI views & engines
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GlobalConfigState, GlobalConfigManager } from '../lib/globalConfig';

interface GlobalConfigContextValue {
  config: GlobalConfigState;
  updateConfig: (partial: Partial<GlobalConfigState>) => GlobalConfigState;
  resetConfig: (category?: 'all' | 'astrology' | 'localization' | 'islamic' | 'ui') => GlobalConfigState;
}

const GlobalConfigContext = createContext<GlobalConfigContextValue | undefined>(undefined);

export const GlobalConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<GlobalConfigState>(() => GlobalConfigManager.getConfig());

  useEffect(() => {
    // Synchronize initial document attributes
    if (config.isRtl) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
    document.documentElement.lang = config.language;
    document.documentElement.setAttribute('data-theme', config.themeMode);
    if (config.themeMode === 'dark' || config.themeMode === 'cosmic') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const unsubscribe = GlobalConfigManager.subscribe((newConfig) => {
      setConfig(newConfig);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateConfig = (partial: Partial<GlobalConfigState>) => {
    return GlobalConfigManager.updateConfig(partial);
  };

  const resetConfig = (category?: 'all' | 'astrology' | 'localization' | 'islamic' | 'ui') => {
    return GlobalConfigManager.resetConfig(category);
  };

  return (
    <GlobalConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </GlobalConfigContext.Provider>
  );
};

export const useGlobalConfig = (): GlobalConfigContextValue => {
  const context = useContext(GlobalConfigContext);
  if (!context) {
    throw new Error('useGlobalConfig must be used within a GlobalConfigProvider');
  }
  return context;
};
