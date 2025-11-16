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

    const handleNavClick = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        if (appContext?.setCurrentPage) {
            appContext.setCurrentPage(page);
        }
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
                    className="h-14 w-14 rounded-xl border border-[#333]"
                    />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-neon-surge rounded-full border-4 border-foundation-light"></div>
                </div>
                <div>
                    <div className="font-orbitron text-white uppercase text-sm tracking-wider">DegenGambler</div>
                    <div className="text-[10px] font-jetbrains-mono text-neon-surge flex items-center gap-2 mt-1">
                        <Icons.Shield className="h-3 w-3" /> LVL 42 OPERATOR
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-jetbrains-mono text-text-tertiary uppercase">
                    <span>XP TO NEXT LEVEL</span>
                    <span className="text-white">4,250 / 5,000</span>
                </div>
                <ProgressBar progress={85} className="h-1.5 bg-foundation" />
            </div>
        </div>
    );

    return (
    <>
      {/* === MOBILE DRAWER === */}
      <div 
        className={`fixed inset-0 top-16 z-[80] bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out ${isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMobileOpen(false)} 
        aria-hidden="true" 
      />

      <div className={`fixed left-0 top-16 bottom-0 z-[90] w-[85vw] max-w-[300px] md:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <div className="h-full flex flex-col bg-foundation border-r border-[#333] shadow-2xl">
             <div className="shrink-0">
                 {appContext?.isLoggedIn && <MobilePilotSummary />}
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
                <nav className="flex flex-col gap-6">
                    {sidebarNavItems.map((group) => (
                    <div key={group.group}>
                        <h3 className="font-jetbrains-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-2 ml-5">
                             // {groupLabels[group.group] || group.group}
                        </h3>
                        <div className="flex flex-col gap-px">
                        {group.items.map((item) => (
                            <SidebarContext.Provider key={item.title} value={{ isActive: appContext?.currentPage === item.title, isCollapsed: false }}>
                                <SidebarLink
                                    href={item.href}
                                    icon={item.icon}
                                    isMobile={true}
                                    onClick={(e) => handleNavClick(e, item.title)}
                                >
                                    {item.title}
                                </SidebarLink>
                            </SidebarContext.Provider>
                        ))}
                        </div>
                    </div>
                    ))}
                </nav>
             </div>

             <div className="shrink-0 p-4 border-t border-[#333] bg-foundation pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <Button
                    variant="ghost"
                    className="w-full font-orbitron uppercase text-xs tracking-wider text-text-secondary hover:text-white border border-[#333] hover:bg-foundation-light h-11"
                    onClick={() => setIsMobileOpen(false)}
                >
                    <Icons.X className="h-4 w-4 mr-2" /> CLOSE TERMINAL
                </Button>
             </div>
         </div>
      </div>

      {/* === DESKTOP SIDEBAR === */}
      <aside 
        className={`hidden md:flex fixed left-0 top-0 bottom-0 flex-col flex-shrink-0 border-r border-[#333] bg-foundation transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-40
        ${isCollapsed ? 'w-[72px]' : 'w-64'}`}
      >
        <div className="flex items-center h-16 shrink-0 px-4 border-b border-[#333]">
          <button onClick={() => appContext?.setCurrentPage('Dashboard')} className="flex items-center gap-3 group w-full">
            <ZapLogo iconClassName="h-6 w-6" className="p-2"/>
            {!isCollapsed && <span className="font-orbitron text-xl font-bold text-white tracking-wider group-hover:text-neon-surge transition-colors">ZAP</span>}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar py-6">
            {!isCollapsed && (
                <div className="px-4 mb-6">
                     <div className="relative group">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4 group-focus-within:text-neon-surge transition-colors" />
                        <Input placeholder="SEARCH INTEL..." className="pl-9 bg-foundation-light border-[#333] text-xs font-jetbrains-mono h-9 focus:border-neon-surge transition-all" />
                    </div>
                </div>
            )}
             {isCollapsed && (
                <div className="flex justify-center mb-6">
                    <button className="p-2 text-text-tertiary hover:text-white bg-foundation-light rounded-md border border-[#333] hover:border-neon-surge transition-all">
                         <Icons.Search className="h-4 w-4" />
                    </button>
                </div>
            )}

            <nav className="flex flex-col gap-4">
                {sidebarNavItems.map((group) => (
                <div key={group.group}>
                    {!isCollapsed && (
                    <h3 className="font-jetbrains-mono text-[10px] uppercase tracking-widest text-text-tertiary px-6 mb-2">
                        // {groupLabels[group.group] || group.group}
                    </h3>
                    )}
                    <div className="flex flex-col gap-px">
                    {group.items.map((item) => (
                        <SidebarContext.Provider key={item.title} value={{ isActive: appContext?.currentPage === item.title, isCollapsed }}>
                        <SidebarLink
                            href={item.href}
                            icon={item.icon}
                            onClick={(e) => handleNavClick(e, item.title)}
                        >
                            {item.title}
                        </SidebarLink>
                        </SidebarContext.Provider>
                    ))}
                    </div>
                </div>
                ))}
            </nav>
        </div>

        <div className={`shrink-0 border-t border-[#333] bg-foundation p-2 flex ${isCollapsed ? 'justify-center' : 'justify-start'} items-center`}>
             <Button
                variant="ghost"
                size="sm"
                className={`text-text-secondary hover:text-white border border-transparent hover:border-[#333] transition-all ${isCollapsed ? 'px-0 w-12 h-12 flex items-center justify-center' : 'w-full flex items-center justify-start gap-2 h-12'}`}
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "Expand" : "Collapse"}
            >
                {isCollapsed ? (
                    <Icons.ChevronRight className="h-5 w-5" />
                ) : (
                    <>
                        <Icons.ChevronLeft className="h-5 w-5" />
                        <span className="font-orbitron uppercase text-xs tracking-wider">COLLAPSE</span>
                    </>
                )}
            </Button>
        </div>
      </aside>
    </>
  );
};