import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

const PartnerVettingPage: React.FC = () => {
    // Status Data
    const status = {
        name: 'INTEGRITY PROTOCOL',
        version: 'ZAP-V3.1.0',
        activeFilters: 7,
        passedAudits: 22,
    };

    return (
        <div className="bg-grid animate-fadeIn">

            {/* HEADER & STATUS METER */}
            <div className="mb-16">
                <div className="flex items-center gap-4 mb-3">
                    <Icons.Shield className="h-10 w-10 text-neon-surge text-glow animate-pulse-slow" />
                    <h1 className="font-orbitron text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider">
                        INTEGRITY VETTING PROTOCOL
                    </h1>
                </div>
                
                {/* Status Meter / Data Strip */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-3 bg-foundation border-l-4 border-neon-surge shadow-lg mt-4 gap-2">
                    <div className="font-jetbrains-mono text-xs uppercase">
                        <span className="text-white mr-2">{status.name}</span> 
                        <span className="text-neon-surge">{status.version}</span>
                    </div>
                    <div className="flex gap-6 font-jetbrains-mono text-sm">
                        <span className="text-yellow-400">FILTERS ACTIVE: {status.activeFilters}</span>
                        <span className="text-neon-surge">AUDITS PASSED: {status.passedAudits}</span>
                    </div>
                </div>
            </div>

            {/* LEVEL 0: THE MANDATE */}
            <Card className="p-8 bg-foundation-light border-4 border-double border-neon-surge/50 mb-16 relative overflow-hidden shadow-[0_0_25px_rgba(0,255,192,0.15)]">
                 <div className="relative z-10">
                    <h2 className="font-orbitron text-xl text-white mb-4 uppercase flex items-center gap-2">
                        <Icons.Filter className="h-5 w-5 text-neon-surge" /> EXECUTION MANDATE: ZERO-TOLERANCE
                    </h2>
                    <p className="text-lg text-white leading-relaxed max-w-4xl border-l-4 border-l-white/20 pl-4 font-rajdhani">
                        ZAP is the <strong className="text-neon-surge">Critical Filter</strong> for the crypto gaming circuit. Our listing is a <strong className="text-neon-surge">Declaration of Trust</strong>. This protocol outlines the <strong className="text-neon-surge">irrefutable evidence</strong> and continuous operational pressure required. Any deviation is a <strong className="text-neon-surge">Veto Event</strong>.
                    </p>
                </div>
            </Card>

            {/* LEVEL I: DATA INGRESS */}
            <section className="mb-16">
                <h2 className="font-orbitron text-3xl text-white mb-8 flex items-center gap-3 border-b-2 border-neon-surge pb-4">
                    <span className="text-neon-surge">LEVEL I //</span> DATA INGRESS & PROOF OF EXISTENCE
                </h2>
                <p className="text-text-tertiary mb-8 text-lg font-rajdhani">
                    Irrefutable proof is required to open the data channel. Operators must be structurally sound and technically verifiable before Phase II is initiated.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 bg-foundation border-[#333] hover:border-neon-surge transition-all duration-300 card-lift">
                        <Icons.BookOpen className="h-8 w-8 text-neon-surge mb-4" />
                        <h3 className="font-orbitron text-lg text-white uppercase mb-2">LICENSING TIER-1</h3>
                        <p className="text-sm text-text-tertiary leading-relaxed font-jetbrains-mono">
                            Valid, non-expired licensing from a tier-1 authority (Curaçao, Malta, etc.). <strong className="text-white">No provisional status accepted.</strong>
                        </p>
                    </Card>
                    <Card className="p-6 bg-foundation border-[#333] hover:border-neon-surge transition-all duration-300 card-lift">
                        <Icons.RefreshCw className="h-8 w-8 text-yellow-500 mb-4" />
                        <h3 className="font-orbitron text-lg text-white uppercase mb-2">PROVABLY FAIR RNG</h3>
                        <p className="text-sm text-text-tertiary leading-relaxed font-jetbrains-mono">
                            Client-Server seed hashing protocol <strong className="text-white">MUST</strong> be deployed and independently audited (iTech Labs, BMM Testlabs).
                        </p>
                    </Card>
                    <Card className="p-6 bg-foundation border-[#333] hover:border-neon-surge transition-all duration-300 card-lift">
                        <Icons.Fingerprint className="h-8 w-8 text-blue-500 mb-4" />
                        <h3 className="font-orbitron text-lg text-white uppercase mb-2">OWNERSHIP MATRIX</h3>
                        <p className="text-sm text-text-tertiary leading-relaxed font-jetbrains-mono">
                            Full UBO (Ultimate Beneficial Owner) disclosure required. Zero tolerance for known sanctions or shell structure opacity.
                        </p>
                    </Card>
                </div>
            </section>

            {/* LEVEL II: FINANCIAL SENTINEL */}
            <section className="mb-16">
                <h2 className="font-orbitron text-3xl text-white mb-8 flex items-center gap-3 border-b-2 border-yellow-500 pb-4">
                    <span className="text-yellow-500">LEVEL II //</span> FINANCIAL SENTINEL & AML DRAG
                </h2>
                <Card className="p-6 md:p-8 bg-foundation-light border-yellow-500/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-text-tertiary mb-6 leading-relaxed font-rajdhani">
                                Operators must demonstrate <strong className="text-white">active compliance</strong> with Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) directives. This protects the ecosystem from compromised liquidity.
                            </p>
                            <ul className="space-y-4 font-jetbrains-mono text-sm">
                                <li className="flex items-start gap-3 p-3 bg-foundation rounded border border-[#333] shadow-[0_0_5px_rgba(255,255,0,0.2)]">
                                    <Icons.CheckCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-white">AML TRANSACTION MONITORING (Real-Time Flux)</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-foundation rounded border border-[#333] shadow-[0_0_5px_rgba(255,255,0,0.2)]">
                                    <Icons.CheckCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-white">TIERED KYC IMPLEMENTATION (Identity & Address Vetting)</span>
                                </li>
                                <li className="flex items-start gap-3 p-3 bg-foundation rounded border border-[#333] shadow-[0_0_5px_rgba(255,255,0,0.2)]">
                                    <Icons.CheckCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-white">SOURCE OF FUNDS (SOF) & WEALTH (SOW) PROTOCOLS</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-center opacity-20 md:order-last order-first">
                            <Icons.Lock className="h-32 w-32 text-yellow-500" />
                        </div>
                    </div>
                </Card>
            </section>

            {/* LEVEL III: VETO PROTOCOL */}
            <section className="mb-16">
                <h2 className="font-orbitron text-3xl text-white mb-8 flex items-center gap-3 border-b-2 border-red-500 pb-4">
                    <span className="text-red-500">LEVEL III //</span> CONTINUOUS VETO PROTOCOL
                </h2>
                <p className="text-text-tertiary mb-8 text-lg font-rajdhani">
                    The license is provisional. ZAP maintains <strong className="text-white">24/7 data surveillance</strong> to detect performance drift or integrity failure. This system operates entirely outside the operator's control.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <Card className="p-6 bg-foundation border-red-500/20 shadow-xl card-lift">
                        <h3 className="font-orbitron text-lg text-white uppercase mb-3 flex items-center gap-2">
                            <Icons.BarChart className="h-5 w-5 text-neon-surge" /> RTP EROSION DETECTION
                        </h3>
                        <p className="text-sm text-text-tertiary leading-relaxed font-jetbrains-mono">
                            Our engine continuously maps historical Payout Log data. A <strong className="text-white">sustained drop (trend alert)</strong> below the advertised return-to-player is an automatic Phase III Veto Flag.
                        </p>
                    </Card>
                    <Card className="p-6 bg-foundation border-red-500/20 shadow-xl card-lift">
                        <h3 className="font-orbitron text-lg text-white uppercase mb-3 flex items-center gap-2">
                            <Icons.Users className="h-5 w-5 text-purple-500" /> COMMUNITY VPR SIGNAL
                        </h3>
                        <p className="text-sm text-text-tertiary leading-relaxed font-jetbrains-mono">
                            The <strong className="text-white">Veto Payout Ratio (VPR)</strong> is aggregated from player reports. If VPR volume exceeds the critical threshold, ZAP initiates a mandatory 48-hour audit window.
                        </p>
                    </Card>
                </div>

                <div className="bg-red-950/40 p-6 rounded-xl border-l-4 border-red-500 flex items-start gap-4 shadow-red-900/50 shadow-xl">
                    <Icons.AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-orbitron text-xl text-red-400 uppercase mb-2">DE-LISTING COMMAND</h3>
                        <p className="text-white leading-relaxed font-rajdhani">
                            Integrity failure results in <strong className="text-red-400">Immediate De-listing</strong>. There is no warning shot. Operational failure (security, fairness, compliance) terminates the partnership. Operators must <strong className="text-red-400">Earn the Circuit</strong> status every 24-hour cycle.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnerVettingPage;