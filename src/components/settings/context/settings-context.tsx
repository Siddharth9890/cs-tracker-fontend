import { createContext, useContext } from 'react';
//
// import { any } from '../types';

// ----------------------------------------------------------------------

export const SettingsContext = createContext({} as any);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};
