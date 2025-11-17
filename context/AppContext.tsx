import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Client, Account, Databases, Models, ID, Query } from 'appwrite';
import { ToastContext } from './ToastContext';

// --- Appwrite Configuration ---
const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const APPWRITE_PROJECT_ID = '66a1508f000392667733';
export const appwriteClient = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
export const appwriteAccount = new Account(appwriteClient);
export const appwriteDatabases = new Databases(appwriteClient);

// --- Database & Collection IDs ---
export const DATABASE_ID = '66a15147000b9736c99c';
export const PROFILES_COLLECTION_ID = '66a1517700010943564c';
export const CASINOS_COLLECTION_ID = '66a151590038827a513c';
export const ANALYTICS_COLLECTION_ID = '66a15167000c01a182c4';
export const MESSAGES_COLLECTION_ID = '66a1518c001f3e79147e';

// --- Type Definitions ---
export interface UserProfile extends Models.Document {
    userId: string;
    username: string;
    bio: string;
    level: number;
    xp: number;
    zapScore: number;
    zapPoints: number;
    rank: number;
}

interface AuthState {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  user: Models.User<Models.Preferences> | null;
  profile: UserProfile | null;
}

export interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
  
  auth: AuthState;
  register: (username: string, email: string, pass: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'register'>('login');
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [initialReviewCasinoId, setInitialReviewCasinoId] = useState<string | null>(null);
  const [viewingCasinoId, setViewingCasinoId] = useState<string | null>(null);

  const [auth, setAuth] = useState<AuthState>({ status: 'loading', user: null, profile: null });
  const { showToast } = React.useContext(ToastContext) || { showToast: () => {} };

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
        const profile = await appwriteDatabases.getDocument<UserProfile>(DATABASE_ID, PROFILES_COLLECTION_ID, userId);
        setAuth(prev => ({ ...prev, profile }));
    } catch (error) {
        console.warn("No profile found for user, will create one.");
        return null;
    }
  }, []);

  const checkSession = useCallback(async () => {
    try {
        const user = await appwriteAccount.get();
        await fetchUserProfile(user.$id);
        setAuth(prev => ({ ...prev, status: 'authenticated', user }));
        _setCurrentPage('Dashboard');
    } catch (error) {
        setAuth({ status: 'unauthenticated', user: null, profile: null });
        _setCurrentPage('Home');
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const setCurrentPage = (page: string) => {
    _setCurrentPage(page);
    setViewingCasinoId(null);
  };

  const createProfileForNewUser = async (userId: string, username: string) => {
      try {
          const newProfile: Omit<UserProfile, keyof Models.Document> = {
              userId,
              username,
              bio: "New Operator on the Grid. Ready for intel.",
              level: 1,
              xp: 0,
              zapScore: 75,
              zapPoints: 100,
              rank: 0
          };
          const profileDoc = await appwriteDatabases.createDocument<UserProfile>(
              DATABASE_ID,
              PROFILES_COLLECTION_ID,
              userId,
              newProfile
          );
          setAuth(prev => ({...prev, profile: profileDoc}));
      } catch(e) {
          console.error("Failed to create user profile:", e);
          showToast("CRITICAL: Failed to initialize user profile.", 'error');
      }
  };

  const register = async (username: string, email: string, pass: string) => {
    await appwriteAccount.create(ID.unique(), email, pass, username);
    await login(email, pass); // Login after successful registration
    await createProfileForNewUser(auth.user!.$id, username);
    _setCurrentPage('Dashboard');
    closeAuthModal();
  };

  const login = async (email: string, pass: string) => {
    await appwriteAccount.createEmailPasswordSession(email, pass);
    await checkSession();
    _setCurrentPage('Dashboard');
    closeAuthModal();
  };
  
  const logout = async () => {
    await appwriteAccount.deleteSession('current');
    setAuth({ status: 'unauthenticated', user: null, profile: null });
    _setCurrentPage('Home');
  };
  
  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthModalInitialTab(tab);
    setAuthModalOpen(true);
  };
  
  const closeAuthModal = () => setAuthModalOpen(false);

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
        isCollapsed, setIsCollapsed,
        isMobileOpen, setIsMobileOpen,
        auth, register, login, logout,
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
