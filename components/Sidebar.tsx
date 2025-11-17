import React, { useContext, createContext } from 'react';
import { Icons } from './icons';
import { AppContext } from '../context/AppContext';
import { sidebarNavItems } from '../constants/sidebar';
import { Button } from './Button';
import { Input } from './Input';
import { ProgressBar } from './ProgressBar';
import { ZapLogo } from './ZapLogo';

interface SidebarContextType {
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarContext = createContext<SidebarContextType>({
  isActive: false,
  isCollapsed: false,
});

const SidebarLink: React.FC<{ href: string; icon: React.FC<any>; children: React.ReactNode; isMobile?: boolean; onClick?: (e: React.MouseEvent) => void }> = ({ href, icon: Icon, children, isMobile, onClick, ...props }) => {
  const { isActive, isCollapsed } = useContext(SidebarContext);
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-medium relative overflow-hidden rounded-md
      ${isCollapsed ? 'justify-center mx-2 px-2 py-3' : isMobile ? 'px-5 py-4 text-sm font-orbitron uppercase tracking-wider' : 'mx-4 px-4 py-3 text-sm'}
      ${isActive 
        ? 'text-white bg-neon-surge/10' 
        : 'text-text-secondary hover:bg-foundation-light hover:text-white'}`}
      {...props}
    >
       <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300 ease-out ${isActive ? 'bg-neon-surge shadow-[0_0_12px_#00FFC0]' : 'bg-transparent'}`} />

      <Icon className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-neon-surge' : 'group-hover:text-white'}`} aria-hidden="true" />
      <span className={`whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 block'}`}>{children}</span>
    </a>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
    const appContext = useContext(AppContext);
    
    if (!appContext) return null;

    const { currentPage, setCurrentPage, auth } = appContext;
    
    // Do not render sidebar if user is not authenticated.
    if (auth.status !== 'authenticated') {
        return null;
    }

    const handleNavClick = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        setCurrentPage(page);
        setIsMobileOpen(false);
    }

    const groupLabels: { [key: string]: string } = {
        DAS: 'Dashboard',
        CAS: 'Operations',
        SUP: 'Support & Intel',
        USER: 'Operator'
    };

    const MobilePilotSummary = () => (
        <div className="p-5 bg-foundation-light/50 border-b border-[#333]">
             <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                    <img
                        src="https://placehold.co/56x56/00FFC0/000000?text=DG"
                        alt="Profile"
                        className="h-14 w-14 rounded-md ring-1 ring-[#333333]"
                    />
                     <div className="absolute -bottom-1 -right-1 bg-foundation p-0.5 rounded-full">
                         <div className="bg-neon-surge p-1 rounded-full shadow-[0_0_10px_rgba(0,255,192,0.5)]" title="Circuit Status: Online">
                            <Icons.Zap className="w-3 h-3 text-black fill-black" />
                         </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold text-white font-orbitron uppercase">DegenGambler</p>
                    <p className="text-[10px] text-neon-surge font-jetbrains-mono flex items-center gap-1 mt-1">
                        LVL 42 OPERATOR
                    </p>
                </div>
             </div>
             <div className="text-xs font-jetbrains-mono text-text-secondary space-y-2">
                 <div className="flex justify-between items-center">
                    <span>PROGRESS</span>
                    <span className="text-white">4,250 / 5,000 XP</span>
                 </div>
                 <ProgressBar progress={85} />
             </div>
        </div>
    );

    return (
        <>
            {/* Mobile Overlay & Sidebar */}
            <div
                className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileOpen(false)}
                aria-hidden="true"
            />
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-72 bg-foundation border-r border-neon-surge/30 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex h-16 items-center justify-between border-b border-[#333] px-4">
                    <div className="flex items-center gap-3" onClick={() => { setCurrentPage('Dashboard'); setIsMobileOpen(false); }}>
                        <ZapLogo />
                        <span className="font-orbitron text-xl font-bold text-white tracking-wider">ZAP</span>
                    </div>
                    <button onClick={() => setIsMobileOpen(false)} className="text-text-tertiary hover:text-white p-2">
                        <Icons.X className="h-5 w-5" />
                    </button>
                </div>
                
                <MobilePilotSummary />

                <nav className="flex-1 overflow-y-auto custom-scrollbar py-6">
                    <ul className="flex flex-col gap-y-1">
                        {sidebarNavItems.map(group => (
                            <li key={group.group}>
                                <h2 className="px-5 mt-4 mb-2 text-xs font-jetbrains-mono text-text-tertiary uppercase tracking-wider">{groupLabels[group.group]}</h2>
                                <ul className="flex flex-col gap-y-1">
                                    {group.items.map(item => (
                                        <li key={item.title}>
                                            <SidebarContext.Provider value={{ isActive: currentPage === item.title, isCollapsed: false }}>
                                                <SidebarLink href={item.href} icon={item.icon} isMobile={true} onClick={(e) => handleNavClick(e, item.title)}>
                                                    {item.title}
                                                </SidebarLink>
                                            </SidebarContext.Provider>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:fixed md:left-0 md:top-0 md:z-40 md:flex md:h-screen md:flex-col border-r border-[#333] bg-foundation transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
                style={{ width: isCollapsed ? '72px' : '256px' }}
            >
                <div className={`flex h-16 items-center border-b border-[#333] transition-all duration-300 ${isCollapsed ? 'justify-center' : 'px-6'}`}>
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setCurrentPage('Dashboard')}
                    >
                        <ZapLogo />
                        {!isCollapsed && <span className="font-orbitron text-xl font-bold text-white tracking-wider group-hover:text-glow">ZAP</span>}
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pt-6 pb-20">
                    <ul className="flex flex-col gap-y-1">
                        {sidebarNavItems.map(group => (
                            <li key={group.group}>
                                {!isCollapsed && <h2 className="px-4 mt-4 mb-2 text-xs font-jetbrains-mono text-text-tertiary uppercase tracking-wider">{groupLabels[group.group]}</h2>}
                                <ul className="flex flex-col gap-y-1">
                                    {group.items.map(item => (
                                        <li key={item.title}>
                                            <SidebarContext.Provider value={{ isActive: currentPage === item.title, isCollapsed }}>
                                                <SidebarLink href={item.href} icon={item.icon} onClick={(e) => handleNavClick(e, item.title)}>
                                                    {item.title}
                                                </SidebarLink>
                                            </SidebarContext.Provider>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={`mt-auto border-t border-[#333] transition-all duration-300 ${isCollapsed ? 'py-3' : 'p-4'}`}>
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`flex w-full items-center gap-3 text-sm text-text-secondary hover:bg-foundation-light hover:text-white rounded-md transition-colors ${isCollapsed ? 'justify-center py-2' : 'p-3'}`}
                    >
                        {isCollapsed ? <Icons.ChevronRight className="h-4 w-4" /> : <Icons.ChevronLeft className="h-4 w-4" />}
                        {!isCollapsed && <span className="font-orbitron uppercase text-xs">Collapse</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};