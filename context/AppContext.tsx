import React, { createContext, useState, ReactNode } from 'react';

export interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  
  isAuthModalOpen: boolean;
  authModalInitialTab: 'login' | 'register';
  openAuthModal: (tab: 'login' | 'register') => void;
  closeAuthModal: () => void;
  
  isReviewModalOpen: boolean;
  initialReviewCasinoId: string | null;
  openReviewModal: (id?: string) => void;
  closeReviewModal: () => void;

  viewingCasinoId: string | null;
  setViewingCasinoId: (id: string | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, _setCurrentPage] = useState('Home');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to logged out
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'register'>('login');
  
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [initialReviewCasinoId, setInitialReviewCasinoId] = useState<string | null>(null);
  
  const [viewingCasinoId, setViewingCasinoId] = useState<string | null>(null);

  const setCurrentPage = (page: string) => {
    _setCurrentPage(page);
    setViewingCasinoId(null); // Reset detail view when changing pages
  }

  const login = () => {
    setIsLoggedIn(true);
    setAuthModalOpen(false);
    _setCurrentPage('Dashboard');
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    _setCurrentPage('Home');
  };
  
  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthModalInitialTab(tab);
    setAuthModalOpen(true);
  };
  
  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const openReviewModal = (id?: string) => {
    setInitialReviewCasinoId(id || null);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setInitialReviewCasinoId(null);
  };

  return (
    <AppContext.Provider 
      value={{ 
        currentPage, setCurrentPage,
        isLoggedIn, login, logout,
        isCollapsed, setIsCollapsed,
        isMobileOpen, setIsMobileOpen,
        isAuthModalOpen,
        authModalInitialTab,
        openAuthModal,
        closeAuthModal,
        isReviewModalOpen,
        initialReviewCasinoId,
        openReviewModal,
        closeReviewModal,
        viewingCasinoId,
        setViewingCasinoId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};