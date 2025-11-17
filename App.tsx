'use client';

import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import MinesGamePage from './pages/MinesGamePage';
import PlinkoGamePage from './pages/PlinkoGamePage';
import AboutUsPage from './pages/AboutUsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ResponsibleGamingPage from './pages/ResponsibleGamingPage';
import AMLPolicyPage from './pages/AMLPolicyPage';
import CommercialDisclosurePage from './pages/CommercialDisclosurePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import MessagesPage from './pages/MessagesPage';
import RewardsPage from './pages/RewardsPage';
import { CasinoDirectoryPage } from './pages/CasinoDirectoryPage';
import { CasinoDetailPage } from './pages/CasinoDetailPage';
import BonusOffersPage from './pages/BonusOffersPage';
import LiveRTPTrackerPage from './pages/LiveRTPTrackerPage';
import ReviewMethodologyPage from './pages/ReviewMethodologyPage';
import ProvablyFairPage from './pages/ProvablyFairPage';
import SupportPage from './pages/SupportPage';
import CookiesPolicyPage from './pages/CookiesPolicyPage';
import { CertifiedPlatformsPage } from './pages/CertifiedPlatformsPage';
import AffiliatePage from './pages/AffiliatePage';
import CopyrightNoticePage from './pages/CopyrightNoticePage';
import FAQPage from './pages/FAQPage';
import ProtocolDeepDivePage from './pages/ProtocolDeepDivePage';
import PartnerVettingPage from './pages/PartnerVettingPage';
import { AuthModal } from './components/LoginModal';
import { Toaster } from './components/Toaster';
import { ReviewModal } from './components/ReviewModal';
import { Icons } from './components/icons';
import PageLayout from './components/PageLayout';

function App() {
  const appContext = useContext(AppContext);
  if (!appContext) return null;

  const {
    auth, logout,
    currentPage, setCurrentPage,
    isCollapsed, isMobileOpen, setIsMobileOpen,
    openAuthModal, closeAuthModal, isAuthModalOpen, authModalInitialTab,
    openReviewModal, closeReviewModal, isReviewModalOpen, initialReviewCasinoId,
    viewingCasinoId, setViewingCasinoId
  } = appContext;

  // Pages with special full-bleed layouts (e.g., video backgrounds) are excluded from the standard container.
  const pagesWithCustomLayout = ['Home', 'ProvablyFairPage', 'ProtocolDeepDivePage'];

  const renderPage = () => {
    switch (currentPage) {
      case 'Mines Game': return <MinesGamePage />;
      case 'Plinko Game': return <PlinkoGamePage />;
      case 'About Us': return <AboutUsPage />;
      case 'Analytics': return <AnalyticsPage />;
      case 'Terms of Service': return <TermsOfServicePage />;
      case 'Privacy Policy': return <PrivacyPolicyPage />;
      case 'Cookies Policy': return <CookiesPolicyPage />;
      case 'Responsible Gaming': return <ResponsibleGamingPage />;
      case 'AML & CTF Policy': return <AMLPolicyPage />;
      case 'Commercial Disclosure': return <CommercialDisclosurePage />;
      case 'Copyright Notice': return <CopyrightNoticePage />;
      case 'Profile': return <ProfilePage />;
      case 'Settings': return <SettingsPage />;
      case 'Messages': return <MessagesPage />;
      case 'Rewards': return <RewardsPage />;
      // FIX: Changed default import to named import for CasinoDirectoryPage as the module does not have a default export.
      case 'Casino Directory': return <CasinoDirectoryPage />;
      case 'Bonus Offers': return <BonusOffersPage />;
      case 'Live RTP Tracker': return <LiveRTPTrackerPage />;
      case 'Review Methodology': return <ReviewMethodologyPage />;
      case 'Partner Vetting': return <PartnerVettingPage />;
      case 'Provably Fair': return <ProvablyFairPage />;
      case 'Protocol Deep Dive': return <ProtocolDeepDivePage />;
      case 'Support': return <SupportPage />;
      case 'FAQ': return <FAQPage />;
      case 'Certified Platforms': return <CertifiedPlatformsPage />;
      case 'Affiliate Program': return <AffiliatePage />;
      case 'Home': return <HomePage onRegisterClick={() => openAuthModal('register')} />;
      case 'Dashboard':
      default:
        return <DashboardPage />;
    }
  };
  
  if (auth.status === 'loading') {
    return (
      <div className="bg-foundation text-text-primary font-rajdhani min-h-screen flex flex-col items-center justify-center">
          <Icons.Zap className="h-16 w-16 text-neon-surge animate-pulse-glow" />
          <p className="mt-4 font-jetbrains-mono text-neon-surge uppercase tracking-widest animate-pulse">Initializing Secure Connection...</p>
      </div>
    );
  }

  if (auth.status === 'unauthenticated') {
    return (
      <div className="bg-foundation text-text-primary font-rajdhani min-h-screen flex flex-col">
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          initialTab={authModalInitialTab}
        />
        <Toaster />
        <Header
          isLoggedIn={false}
          onLogout={() => {}}
          onOpenLogin={() => openAuthModal('login')}
          onOpenRegister={() => openAuthModal('register')}
        />
        <main className="flex-grow pt-16">
          {['Home', 'Dashboard'].includes(currentPage) ? (
            <HomePage onRegisterClick={() => openAuthModal('register')} />
          ) : (
            <PageLayout>
              {renderPage()}
            </PageLayout>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-foundation text-text-primary font-rajdhani min-h-screen">
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialTab={authModalInitialTab}
      />
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        initialCasinoId={initialReviewCasinoId}
      />
      <Toaster />
      <Header
        isLoggedIn={true}
        onLogout={logout}
        onOpenLogin={() => openAuthModal('login')}
        onOpenRegister={() => openAuthModal('register')}
        onOpenReview={() => openReviewModal()}
        onToggleMobileNav={() => setIsMobileOpen(!isMobileOpen)}
      />
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={appContext.setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div
        className={`relative flex flex-col min-h-screen transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:pl-[var(--sidebar-width)]`}
        style={{ '--sidebar-width': isCollapsed ? '72px' : '256px' } as React.CSSProperties}
      >
        <main className="flex-grow pt-16">
           {pagesWithCustomLayout.includes(currentPage) && !viewingCasinoId ? (
                renderPage()
              ) : (
                <PageLayout>
                  {viewingCasinoId ? (
                      <CasinoDetailPage casinoId={viewingCasinoId} onBack={() => setViewingCasinoId(null)} onOpenReview={() => openReviewModal(viewingCasinoId)} />
                  ) : (
                      renderPage()
                  )}
                </PageLayout>
            )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
