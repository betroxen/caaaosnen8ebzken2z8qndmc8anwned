import React, { useContext } from 'react';
import { Icons } from './icons';
import { AppContext, AppContextType } from '../context/AppContext';

export const Footer: React.FC = () => {
    const appContext = useContext(AppContext as React.Context<AppContextType | undefined>);
    if (!appContext) return null;

    const handleLinkClick = (page: string) => {
        appContext.setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const FooterLink: React.FC<{ page: string; children: React.ReactNode }> = ({ page, children }) => (
        <li className="text-text-secondary hover:text-neon-surge hover:text-glow transition-all duration-200">
            <button onClick={() => handleLinkClick(page)} className="text-left w-full text-sm">{children}</button>
        </li>
    );

    return (
        <footer className="bg-[#0A0A0A] border-t border-neon-surge/30 pt-16 pb-8 font-rajdhani footer-scan-effect">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                    <h1 className="text-7xl font-extrabold tracking-tight uppercase font-orbitron zap-logo-text">
                        ZAP
                    </h1>
                    <p className="text-xl font-semibold text-white mt-1 uppercase tracking-widest font-orbitron">
                        COMMAND CENTER
                    </p>
                    <p className="text-sm text-text-tertiary mt-4 font-jetbrains-mono max-w-lg mx-auto">
                        Gamble Smarter, Not Harder. Your Edge is Data.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-8 border-t border-b border-[#333]/50 py-10 mb-10">
                    <div className="col-span-1">
                        <h3 className="text-sm font-bold text-neon-surge uppercase tracking-wider mb-4 border-l-2 border-neon-surge pl-2 text-glow">
                            Intel Core
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink page="Dashboard">Dashboard</FooterLink>
                            <FooterLink page="Casino Directory">Casinos</FooterLink>
                            <FooterLink page="Bonus Offers">Bonuses</FooterLink>
                            <FooterLink page="Live RTP Tracker">RTP Tracker</FooterLink>
                            <FooterLink page="Affiliate Program">Affiliates</FooterLink>
                        </ul>
                    </div>

                     <div className="col-span-1">
                        <h3 className="text-sm font-bold text-neon-surge uppercase tracking-wider mb-4 border-l-2 border-neon-surge pl-2 text-glow">
                            Protocols
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink page="About Us">About</FooterLink>
                            <FooterLink page="Review Methodology">Methodology</FooterLink>
                            <FooterLink page="Provably Fair">Provably Fair</FooterLink>
                            <FooterLink page="Protocol Deep Dive">Protocol Deep Dive</FooterLink>
                            <FooterLink page="FAQ">FAQ</FooterLink>
                            <FooterLink page="Support">Support</FooterLink>
                        </ul>
                    </div>

                    <div className="col-span-1 sm:col-span-2 md:col-span-1">
                        <h3 className="text-sm font-bold text-neon-surge uppercase tracking-wider mb-4 border-l-2 border-neon-surge pl-2 text-glow">
                            Legal Framework
                        </h3>
                        <ul className="space-y-3">
                            <FooterLink page="Terms of Service">Terms of Service</FooterLink>
                            <FooterLink page="Privacy Policy">Privacy Policy</FooterLink>
                            <FooterLink page="Cookies Policy">Cookies Policy</FooterLink>
                            <FooterLink page="Responsible Gaming">Responsible Gaming</FooterLink>
                             <FooterLink page="AML & CTF Policy">AML/CTF Policy</FooterLink>
                            <FooterLink page="Commercial Disclosure">Disclosure</FooterLink>
                            <FooterLink page="Copyright Notice">Copyright Notice</FooterLink>
                        </ul>
                    </div>

                    <div className="col-span-1 sm:col-span-2 md:col-span-2 flex flex-col justify-start">
                         <h3 className="text-sm font-bold text-neon-surge uppercase tracking-wider mb-4 border-l-2 border-neon-surge pl-2 text-glow">
                            Operational Status
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed font-jetbrains-mono">
                            ACCESS CODE: <span className="text-white">ZAPWAY-GRID-ONLINE-2.0.1</span>. All transactions and data streams are secured via zero-knowledge proof protocols.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between bg-foundation-light border border-neon-surge/40 p-5 rounded-xl mb-8 shadow-neon-card">
                    <div className="flex items-center gap-6 mb-4 sm:mb-0">
                        <p className="text-sm text-text-tertiary uppercase font-jetbrains-mono tracking-wider ml-4 hidden md:block">
                            Connect to the Grid
                        </p>
                        <a href="#" className="text-neon-surge hover:text-white transition-colors duration-300 text-glow p-2 rounded-full hover:bg-neon-surge/10" title="Follow us on X/Twitter">
                            <Icons.TwitterX className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-neon-surge hover:text-white transition-colors duration-300 text-glow p-2 rounded-full hover:bg-neon-surge/10" title="View our Instagram feed">
                            <Icons.Instagram className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-neon-surge hover:text-white transition-colors duration-300 text-glow p-2 rounded-full hover:bg-neon-surge/10" title="Join the Discord Grid">
                           <Icons.Discord className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-neon-surge hover:text-white transition-colors duration-300 text-glow p-2 rounded-full hover:bg-neon-surge/10" title="Join the Telegram Channel">
                            <Icons.Telegram className="h-6 w-6" />
                        </a>
                </div>
                    
                    <div className="bg-warning-high/20 border border-warning-high/50 text-warning-high font-bold px-4 py-2 rounded-full text-sm font-jetbrains-mono tracking-widest uppercase shadow-md shadow-red-900/50">
                        VETTING PROTOCOL: 18+ ONLY
                    </div>
                </div>

                <div className="text-center pt-4 border-t border-[#333]/50">
                    <p className="text-xs text-text-tertiary/50 uppercase font-jetbrains-mono tracking-wider">
                        &copy; {new Date().getFullYear()} ZAPWAY CORP. All rights reserved. <span className="text-neon-surge font-bold">DATA OWNERSHIP SECURED.</span>
                    </p>
                    <p className="text-xs text-text-tertiary/40 mt-1 font-jetbrains-mono tracking-wide">
                        INITIATION DATE: 01.01.2025 | STATUS: GREEN
                    </p>
                </div>
            </div>
        </footer>
    );
};