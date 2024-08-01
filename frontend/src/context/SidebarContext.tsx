import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SidebarContextProps {
  showManageATS: boolean;
  setShowManageATS: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showManageATS, setShowManageATS] = useState(true);

  return (
    <SidebarContext.Provider value={{ showManageATS, setShowManageATS }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
