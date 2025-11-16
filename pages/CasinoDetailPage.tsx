import React, { useState, useMemo, useContext } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { casinos } from '../constants/casinos';
import { AppContext } from '../context/AppContext';

interface CasinoDetailPageProps {
    casinoId: string;
    onBack: () => void;
    onOpenReview: () => void;
}

export const CasinoDetailPage: React.FC<CasinoDetailPageProps> = ({ casinoId, onBack, onOpenReview }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const casino = useMemo(() => casinos.find(c => c.id === casinoId), [casinoId]);

    if (!casino) {
        return (
            <div className="p-10 flex flex-col items-center justify-center text-text-secondary h-full animate-fadeIn">
                <Icons.AlertTriangle className="h-16 w-16 mb-4 opacity-20 text-warning-high" />
                <h2 className="text-2xl font-orbitron text-white mb-2 uppercase tracking-wider">OPERATOR NOT FOUND</h2>
                <p className="font-jetbrains-mono text-sm mb-8">// ERROR 404: TARGET INVALID OR DELISTED</p>
                <Button onClick={onBack} variant="secondary" className="font-jetbrains-mono uppercase">RETURN TO GRID</Button>
            </div>
        );
    }

    const isEternalCrown = casino.specialRanking === 'ETERNAL CROWN';

    const TABS = [
        { id: 'overview', label: 'OPERATIONAL INTEL', icon: Icons.LayoutDashboard },
        { id: 'kyc', label: 'KYC & COMPLIANCE PROTOCOL', icon: Icons.Shield },
        { id: 'vprs', label: 'VPR FEED (COMMUNITY)', icon: Icons.MessageSquare },
    ];

    return (
        <div className="container mx-auto max-w-7xl animate-fadeIn">
            {/* HEADER NAV */}
            <Button variant="ghost" onClick={onBack} className="mb-6 text-text-secondary hover:text-white pl-0 font-jetbrains-mono uppercase text-xs flex items-center gap-2 group transition-all">
                <Icons.ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> BACK TO DIRECTORY
            </Button>

            {/* HERO INTEL CARD */}
            <Card className={`p-0 bg-foundation mb-8 relative overflow-hidden group ${isEternalCrown ? 'border-neon-surge shadow-[0_0_40px_rgba(0,255,192,0.15)]' : 'border-[#333]'}`}>
                <div className={`absolute inset-0 pointer-events-none bg-grid ${isEternalCrown ? 'opacity-20' : 'opacity-10'}`}></div>

                <div className="p-6 md:p-10 relative z-10 flex flex-col lg:flex-row gap-8 items-start">
                    {/* Logo & Status */}
                    <div className="flex-shrink-0 relative">
                        <img src={casino.logo} alt={casino.name} className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl border-2 shadow-2xl bg-foundation-light p-1 ${isEternalCrown ? 'border-neon-surge' : 'border-[#333]'}`} />
                         <div className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold font-orbitron uppercase tracking-wider border shadow-xl whitespace-nowrap flex items-center gap-1
                            ${casino.status === 'VERIFIED' ? 'bg-neon-surge text-black border-neon-surge' : 'bg-[#333] text-text-secondary border-[#444]'}`}>
                             {casino.status === 'VERIFIED' ? <Icons.CheckCircle className="h-3 w-3" /> : <Icons.AlertTriangle className="h-3 w-3" />}
                             {casino.status} OPERATOR
                         </div>
                    </div>

                    {/* Main Intel Block */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white uppercase tracking-tight flex items-center gap-3">
                                {casino.name}
                                {isEternalCrown && <Icons.Gem className="h-8 w-8 text-neon-surge fill-neon-surge drop-shadow-[0_0_15px_#00FFC0]" />}
                            </h1>
                             {casino.certified && (
                                <span className="px-3 py-1 bg-neon-surge/10 text-neon-surge text-xs font-bold rounded border border-neon-surge/30 flex items-center gap-1.5 uppercase tracking-wider">
                                    <Icons.Shield className="h-3.5 w-3.5" /> ZAP CERTIFIED
                                </span>
                            )}
                        </div>
                        <p className="text-lg text-text-secondary max-w-3xl mb-6 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: casino.description.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neon-surge font-bold">$1</strong>') }}/>

                        {/* Quick Action Cluster */}
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="font-orbitron uppercase tracking-[0.15em] shadow-[0_0_30px_rgba(0,255,192,0.25)] animate-pulse-glow px-8 py-4 h-auto text-sm">
                                INITIATE SESSION <Icons.ExternalLink className="h-4 w-4 ml-2.5" />
                            </Button>
                             <Button variant="secondary" onClick={onOpenReview} className="font-orbitron uppercase tracking-widest border-[#333] hover:border-neon-surge text-xs h-auto py-4 px-6">
                                SUBMIT VPR INTEL <Icons.Edit className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Score Matrix */}
                    <div className={`bg-foundation-light p-6 rounded-xl border text-center min-w-[180px] flex flex-col justify-center shadow-lg ${isEternalCrown ? 'border-neon-surge/50' : 'border-[#333]'}`}>
                        <div className="text-[10px] font-jetbrains-mono text-text-tertiary uppercase tracking-[0.2em] mb-2">ZAP SCORE</div>
                        <div className={`text-5xl font-jetbrains-mono font-bold mb-3 ${casino.rating >= 4.5 ? 'text-neon-surge text-glow' : 'text-white'}`}>
                            {casino.rating.toFixed(1)}
                        </div>
                        <div className="flex justify-center gap-1 mb-3">
                             {[...Array(5)].map((_, i) => (
                                <Icons.Star key={i} className={`h-4 w-4 ${i < Math.floor(casino.rating) ? 'fill-neon-surge text-neon-surge' : 'text-[#333]'}`} />
                             ))}
                        </div>
                        <div className="text-[10px] text-text-tertiary font-jetbrains-mono uppercase border-t border-[#333] pt-3">
                            BASED ON {casino.reviewCount} REPORTS
                        </div>
                    </div>
                </div>
            </Card>

            {/* TABS NAVIGATION */}
            <div className="flex overflow-x-auto border-b border-[#333] mb-8 custom-scrollbar sticky top-16 bg-foundation z-20 pt-2">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2.5 px-6 py-4 font-orbitron uppercase text-xs md:text-sm transition-all border-b-2 whitespace-nowrap tracking-wider ${
                            activeTab === tab.id 
                            ? 'border-neon-surge text-white bg-neon-surge/5' 
                            : 'border-transparent text-text-secondary hover:text-white hover:bg-foundation-light'
                        }`}
                    >
                        <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-neon-surge' : 'opacity-70'}`} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT AREA */}
            <div className="min-h-[500px]">

                {/* === OVERVIEW TAB === */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-tabSlideIn">

                        {/* LEFT: Core Metrics & Payments (8/12) */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Critical Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-foundation-light p-5 rounded-lg border border-[#333] hover:border-neon-surge/30 transition-all group">
                                    <div className="text-text-tertiary text-[10px] font-jetbrains-mono uppercase mb-2 tracking-wider">Payout Velocity</div>
                                    <div className="text-neon-surge font-bold font-jetbrains-mono text-lg md:text-xl flex items-center gap-2 group-hover:text-glow transition-all">
                                        <Icons.Zap className="h-5 w-5" /> {casino.withdrawalTime}
                                    </div>
                                </div>
                                 <div className="bg-foundation-light p-5 rounded-lg border border-[#333] hover:border-neon-surge/30 transition-all">
                                    <div className="text-text-tertiary text-[10px] font-jetbrains-mono uppercase mb-2 tracking-wider">Established</div>
                                    <div className="text-white font-bold font-jetbrains-mono text-lg md:text-xl flex items-center gap-2">
                                        <Icons.Clock className="h-5 w-5 text-blue-500" /> {casino.established}
                                    </div>
                                </div>
                                 <div className="bg-foundation-light p-5 rounded-lg border border-[#333] hover:border-neon-surge/30 transition-all col-span-2 md:col-span-2">
                                    <div className="text-text-tertiary text-[10px] font-jetbrains-mono uppercase mb-2 tracking-wider">Primary Bonus Intel</div>
                                    <div className="text-white font-bold font-orbitron text-lg md:text-xl truncate text-neon-surge" title={casino.bonus}>
                                        {casino.bonus}
                                    </div>
                                </div>
                            </div>

                            {/* ZERO EDGE INTEL (Conditional for Eternal Crown / Special operators) */}
                            {casino.zeroEdgeIntel && (
                                <Card className="p-6 md:p-8 bg-foundation border-neon-surge relative overflow-hidden">
                                    <div className="absolute inset-0 bg-neon-surge/5 animate-pulse-slow pointer-events-none"></div>
                                    <h3 className="font-orbitron text-neon-surge mb-6 uppercase text-sm tracking-[0.2em] flex items-center gap-2 border-b border-neon-surge/30 pb-4 relative z-10">
                                        <Icons.Gem className="h-4 w-4" /> ZERO-EDGE & LEADERBOARD DEEP DIVE
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 mb-6">
                                        <div className="bg-foundation-light p-3 rounded border border-neon-surge/30 font-jetbrains-mono text-center">
                                            <span className="text-text-tertiary text-[10px] block mb-1">TRUE RTP</span>
                                            <span className="text-white font-bold">{casino.zeroEdgeIntel.rtp}</span>
                                        </div>
                                        <div className="bg-foundation-light p-3 rounded border border-neon-surge/30 font-jetbrains-mono text-center">
                                            <span className="text-text-tertiary text-[10px] block mb-1">HOUSE EDGE</span>
                                            <span className="text-neon-surge font-bold">{casino.zeroEdgeIntel.houseEdge}</span>
                                        </div>
                                        <div className="bg-foundation-light p-3 rounded border border-neon-surge/30 font-jetbrains-mono text-center">
                                            <span className="text-text-tertiary text-[10px] block mb-1">KYC FRICTION</span>
                                            <span className="text-neon-surge font-bold">{casino.zeroEdgeIntel.kycFriction}</span>
                                        </div>
                                        <div className="bg-foundation-light p-3 rounded border border-neon-surge/30 font-jetbrains-mono text-center">
                                            <span className="text-text-tertiary text-[10px] block mb-1">WITHDRAWALS</span>
                                            <span className="text-white font-bold">{casino.zeroEdgeIntel.withdrawalLimits}</span>
                                        </div>
                                    </div>
                                    <div className="relative z-10 space-y-4 font-jetbrains-mono text-xs md:text-sm">
                                        <div className="flex justify-between border-b border-[#333] pb-2">
                                            <span className="text-text-tertiary">MONTHLY LEADERBOARD THROUGHPUT:</span>
                                            <span className="text-neon-surge font-bold">{casino.zeroEdgeIntel.leaderboardMonthly}</span>
                                        </div>
                                        <div>
                                            <span className="text-text-tertiary block mb-1">OPERATIONAL THESIS:</span>
                                            <p className="text-white leading-relaxed">{casino.zeroEdgeIntel.mathThesis}</p>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Corporate & Licensing Intel */}
                            <Card className="p-6 md:p-8 bg-foundation border-[#333]">
                                <h3 className="font-orbitron text-white mb-6 uppercase text-sm tracking-[0.2em] flex items-center gap-2 border-b border-[#333] pb-4">
                                    <Icons.Database className="h-4 w-4 text-neon-surge" /> CORPORATE INTELLIGENCE
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                                    <div>
                                        <span className="block text-text-tertiary font-jetbrains-mono uppercase text-xs mb-1">Operating Company</span>
                                        <span className="text-white font-medium text-base">{casino.company}</span>
                                    </div>
                                     <div>
                                        <span className="block text-text-tertiary font-jetbrains-mono uppercase text-xs mb-1">Founder / Ownership</span>
                                        <span className="text-white font-medium text-base">{casino.founder}</span>
                                    </div>
                                     <div className="md:col-span-2">
                                        <span className="block text-text-tertiary font-jetbrains-mono uppercase text-xs mb-1">Licensing Authority</span>
                                        <span className="text-white font-medium text-base flex items-center gap-2">
                                            <Icons.Shield className="h-4 w-4 text-neon-surge" /> {casino.license}
                                        </span>
                                    </div>
                                     <div className="md:col-span-2">
                                        <span className="block text-text-tertiary font-jetbrains-mono uppercase text-xs mb-1">Scale & Revenue Est.</span>
                                        <span className="text-white font-medium text-base">{casino.companySize}</span>
                                    </div>
                                </div>
                            </Card>

                             {/* Payment Rails */}
                             <Card className="p-6 md:p-8 bg-foundation border-[#333]">
                                <h3 className="font-orbitron text-white mb-6 uppercase text-sm tracking-[0.2em] flex items-center gap-2 border-b border-[#333] pb-4">
                                    <Icons.Wallet className="h-4 w-4 text-neon-surge" /> FINANCIAL RAILS
                                </h3>
                                <p className="text-white font-jetbrains-mono text-sm leading-relaxed bg-foundation-light p-4 rounded border border-[#333]">
                                    {casino.paymentMethods}
                                </p>
                            </Card>
                        </div>

                        {/* RIGHT: Sidebar Summary (4/12) */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="p-6 bg-foundation-light rounded-xl border border-[#333]">
                                <h3 className="font-orbitron text-white mb-4 uppercase text-xs tracking-widest">
                                    OPERATIONAL TAGS
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {casino.tags.filter(t => t !== 'all').map(tag => (
                                        <span key={tag} className="px-3 py-1.5 bg-foundation border border-[#333] rounded text-[10px] font-jetbrains-mono text-text-tertiary uppercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                             <div className="p-6 bg-foundation-light rounded-xl border border-[#333]">
                                <h3 className="font-orbitron text-white mb-4 uppercase text-xs tracking-widest">
                                    SUPPORTED LANGUAGES
                                </h3>
                                <p className="text-sm text-text-tertiary leading-relaxed">
                                    {casino.languages}
                                </p>
                            </div>

                             <div className="p-5 bg-yellow-950/20 border-l-4 border-yellow-500 rounded-r-lg">
                                <h4 className="text-yellow-500 font-orbitron uppercase text-xs mb-2 flex items-center gap-2 tracking-wider">
                                    <Icons.AlertTriangle className="h-4 w-4" /> INTEL ADVISORY
                                </h4>
                                <p className="text-[11px] text-yellow-200/70 leading-relaxed font-jetbrains-mono uppercase">
                                    Terms can change instantly. Always verify latest T&Cs on operator site before deposit. ZAP data last synced: NOV 09, 2025.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* === KYC & COMPLIANCE TAB === */}
                {activeTab === 'kyc' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-tabSlideIn">
                        <div className="lg:col-span-2 space-y-6">
                             <Card className="p-6 md:p-8 bg-foundation border-neon-surge/20">
                                <h3 className="font-orbitron text-white mb-8 uppercase text-sm tracking-[0.2em] flex items-center gap-2 border-b border-[#333] pb-4">
                                    <Icons.Lock className="h-4 w-4 text-neon-surge" /> KYC & AML PROTOCOLS
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { lvl: '01', title: 'LEVEL 1 [BASIC]', desc: casino.kycPolicy.level1 },
                                        { lvl: '02', title: 'LEVEL 2 [ENHANCED]', desc: casino.kycPolicy.level2 },
                                        { lvl: '03', title: 'LEVEL 3 [FULL]', desc: casino.kycPolicy.level3 },
                                        { lvl: '04', title: 'LEVEL 4 [VIP/AML]', desc: casino.kycPolicy.level4 }
                                    ].map((item) => (
                                        <div key={item.lvl} className="flex gap-4 p-4 bg-foundation-light rounded-lg border border-[#333] hover:border-neon-surge/30 transition-all">
                                            <div className="text-neon-surge font-jetbrains-mono text-xl font-bold opacity-50">{item.lvl}</div>
                                            <div>
                                                <h4 className="text-white font-orbitron uppercase text-sm mb-1">{item.title}</h4>
                                                <p className="text-sm text-text-secondary font-medium">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="p-6 bg-red-950/10 border-red-900/30">
                                <h3 className="font-orbitron text-warning-high mb-4 uppercase text-sm tracking-widest flex items-center gap-2">
                                    <Icons.Globe className="h-4 w-4" /> RESTRICTED TERRITORIES
                                </h3>
                                <p className="text-white font-jetbrains-mono text-sm leading-relaxed mb-4">
                                    {casino.restrictedTerritories}
                                </p>
                                <p className="text-xs text-red-400 font-jetbrains-mono uppercase border-t border-red-900/30 pt-4">
                                    // WARNING: BYPASSING GEO-FENCES (VPN) MAY VOID WINNINGS PER OPERATOR T&CS.
                                </p>
                            </Card>
                        </div>
                    </div>
                )}

                {/* === VPR FEED TAB === */}
                {activeTab === 'vprs' && (
                    <div className="animate-tabSlideIn">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-foundation p-6 rounded-xl border border-[#333]">
                             <div>
                                 <h3 className="font-orbitron text-lg text-white uppercase flex items-center gap-2 mb-1">
                                    COMMUNITY INTEL FEED
                                </h3>
                                <p className="text-text-secondary text-xs font-jetbrains-mono uppercase">// {casino.reviewCount} VALIDATED REPORTS ON FILE</p>
                             </div>
                             <Button onClick={onOpenReview} className="w-full sm:w-auto font-orbitron uppercase tracking-wider shadow-[0_0_15px_rgba(0,255,192,0.2)]">
                                 <Icons.Plus className="h-4 w-4 mr-2" /> SUBMIT NEW VPR
                             </Button>
                        </div>

                        <div className="space-y-4 opacity-60 text-center py-12 font-jetbrains-mono text-text-secondary uppercase text-sm border-2 border-dashed border-[#333] rounded-xl">
                            [ LIVE VPR FEED INTEGRATION PENDING... ]
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};