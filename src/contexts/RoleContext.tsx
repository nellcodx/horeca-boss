import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/data/mock';

interface RoleContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <RoleContext.Provider value={{ role, setRole, isDarkMode, toggleDarkMode }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
};
