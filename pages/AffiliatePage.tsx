import React, { useState, useContext, useEffect } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { ToastContext } from '../context/ToastContext';
import { Toggle } from '../components/Toggle';

// New component for the pillars in Phase One
const PillarCard = ({ icon: Icon, number, title, children }: { icon: React.FC<any>, number: string, title: string, children: React.ReactNode }) => (
    <Card className="p-6 bg-foundation border-[#333] hover:border-neon-surge transition-all duration-300 card-lift h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-neon-surge/10 p-3 rounded-lg border border-neon-surge/30">
                <Icon className="h-6 w-6 text-neon-surge" />
            </div>
            <span className="font-jetbrains-mono text-3xl text-neon-surge/50">{number}</span>
        </div>
        <h3 className="font-orbitron text-lg text-white uppercase font-bold mb-3">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed font-rajdhani flex-1">{children}</p>
    </Card>
);

const AffiliatePage: React.FC = () => {
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        handle: '',
        country: '',
        channel: '',
        url: '',
        reach: '',
        audience: '',
        strategy: '',
        dataAccuracy: false,
        consent: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isFormVisible) {
            const formElement = document.getElementById('application-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [isFormVisible]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleChange = (field: 'dataAccuracy' | 'consent', value: boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.dataAccuracy || !formData.consent) {
            showToast("COMPLIANCE GATE: Both security attestations are mandatory.", "error");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            showToast("DEPLOYMENT REQUEST ACCEPTED. Vetting Protocol initiated.", "success");
            setFormData({
                fullName: '', email: '', handle: '', country: '',
                channel: '', url: '', reach: '', audience: '',
                strategy: '', dataAccuracy: false, consent: false,
            });
            setIsFormVisible(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2500);
    };


    const tiers = [
        { tier: 'SENTINEL (T1)', tpsv: '$0 - $50,000', revShare: '25%', access: 'Standard' },
        { tier: 'OPERATOR (T2)', tpsv: '$50,001 - $250,000', revShare: '30%', access: 'Elevated' },
        { tier: 'INFILTRATOR (T3)', tpsv: '$250,001 - $1,000,000', revShare: '35%', access: 'Priority' },
        { tier: 'ARCHITECT (T4)', tpsv: '$1,000,001+', revShare: '40% (Custom)', access: 'Direct Protocol Access & Governance' },
    ];

    return (
        <div className="font-rajdhani animate-fadeIn">
            <header className="text-center mb-16">
                <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    ZAPWAY // <span className="text-neon-surge">SENTINEL PARTNER PROTOCOL</span>
                </h1>
                <p className="font-orbitron text-lg text-neon-surge/80 mt-6 max-w-4xl mx-auto uppercase tracking-widest text-glow">
                    Directive: Partner with the Protocol. Monetize integrity.
                </p>
                <p className="mt-8 text-text-secondary text-lg leading-relaxed max-w-4xl mx-auto">
                    The old affiliate model is built on opaque promises and unreliable tracking. We replace the black box with verifiable data. Join an elite cadre of partners rewarded for promoting the most secure and transparent infrastructure in iGaming.
                </p>
            </header>

            <section id="phase-one" className="mb-20">
                <h2 className="font-orbitron text-3xl font-bold text-white mb-10 text-center uppercase tracking-wider">
                    PHASE ONE: MONETIZATION ARCHITECTURE
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PillarCard icon={Icons.Zap} number="01" title="INDUSTRY-LEADING COMMISSIONS">
                        Benefit from a high-yield, transparent revenue share model. Performance is measured using Layer 2 settled volume, eliminating disputes and guaranteeing payouts based on verifiable transactions.
                    </PillarCard>
                    <PillarCard icon={Icons.Database} number="02" title="REAL-TIME OPERATIONS DASHBOARD">
                        Access a dedicated Sentinel Partner Dashboard with live, immutable data on your referrals’ activity and earnings. No opaque reporting. Trust our math, not just our word.
                    </PillarCard>
                    <PillarCard icon={Icons.Lock} number="03" title="HIGH-VALUE TACTICAL ASSETS">
                        Utilize our high-conversion Tactical Asset Library. Professionally designed banners, deep links, and compliant marketing copy engineered specifically to convert high-value crypto clientele.
                    </PillarCard>
                </div>
            </section>
            
            <section id="phase-two" className="mb-20">
                <div className="text-center mb-10">
                    <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider">
                        PHASE TWO: THE REWARD MATRIX
                    </h2>
                    <h3 className="font-jetbrains-mono text-md text-text-tertiary uppercase tracking-[0.2em] mt-2">// PROTOCOL SECURED VOLUME</h3>
                </div>
                <p className="text-center text-text-secondary mb-8 max-w-3xl mx-auto">
                    We are rewarded for the security and integrity we provide. Therefore, our partners are rewarded based on the Total Protocol Secured Volume (TPSV) generated by their network—the aggregate value of assets processed and secured by the ZAP Stack.
                </p>
                 <div className="overflow-x-auto bg-foundation-light border border-[#333] rounded-lg p-2 shadow-lg">
                    <table className="w-full text-left font-jetbrains-mono">
                        <thead>
                            <tr className="border-b-2 border-neon-surge/30 text-xs text-text-tertiary uppercase tracking-wider">
                                <th className="p-4">Tier Level</th>
                                <th className="p-4">Monthly TPSV</th>
                                <th className="p-4">Net Revenue Share</th>
                                <th className="p-4">Access Priority</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#333]">
                            {tiers.map(tier => (
                                <tr key={tier.tier} className="hover:bg-foundation-lighter/50 transition-colors">
                                    <td className="p-4 font-bold text-white">{tier.tier}</td>
                                    <td className="p-4 text-text-secondary">{tier.tpsv}</td>
                                    <td className={`p-4 font-bold ${tier.revShare.includes('Custom') ? 'text-yellow-400' : 'text-neon-surge'}`}>{tier.revShare}</td>
                                    <td className="p-4 text-text-secondary">{tier.access}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-center text-xs text-neon-surge font-jetbrains-mono mt-6 uppercase tracking-wider bg-neon-surge/5 border border-neon-surge/20 p-4 rounded-lg">
                    PROTOCOL VERIFICATION: Volume is calculated from Layer 2 settlement data. Your reward is tied to immutable, on-chain proofs, not centralized reports. Payouts are settled instantly via smart contract.
                </p>
            </section>

             <section id="phase-three" className="mb-20 text-center bg-foundation-light border border-[#333] rounded-xl p-10">
                <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider">
                    PHASE THREE: ACTIVATION & DEPLOYMENT
                </h2>
                <p className="mt-4 text-lg text-text-secondary max-w-xl mx-auto">
                    Ready to plug into the network?
                </p>
                <div className="my-8 text-left max-w-lg mx-auto space-y-4">
                    <p className="flex items-start gap-3"><Icons.ArrowRight className="h-4 w-4 text-neon-surge mt-1 shrink-0" /><span><strong className="text-white">ACCESS THE SENTINEL APPLICATION:</strong> Fill out the initial deployment request form.</span></p>
                    <p className="flex items-start gap-3"><Icons.ArrowRight className="h-4 w-4 text-neon-surge mt-1 shrink-0" /><span><strong className="text-white">VERIFICATION & COMPLIANCE:</strong> Our compliance AI runs a rapid check to ensure VASP readiness.</span></p>
                    <p className="flex items-start gap-3"><Icons.ArrowRight className="h-4 w-4 text-neon-surge mt-1 shrink-0" /><span><strong className="text-white">PROTOCOL ACTIVATION:</strong> Receive your unique tracking code and gain immediate access to the Operations Dashboard and Tactical Asset Library.</span></p>
                </div>
                 <p className="text-sm font-bold text-yellow-400 font-jetbrains-mono uppercase tracking-widest mb-8">We're not looking for volume at all costs. We're looking for quality partners.</p>
                <Button size="lg" className="shadow-neon-glow-md uppercase tracking-widest px-12" onClick={() => setIsFormVisible(true)}>
                    APPLY NOW // INITIATE DEPLOYMENT
                </Button>
            </section>

            {isFormVisible && (
                <section id="application-form">
                    <Card className="p-6 md:p-10 border-neon-surge/30 shadow-2xl">
                        <div className="text-center mb-10">
                            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
                                SENTINEL PARTNER DEPLOYMENT REQUEST
                            </h2>
                            <p className="mt-3 text-sm font-jetbrains-mono text-text-tertiary max-w-2xl mx-auto uppercase">
                                Protocol Status: Active. This is the vetting pipeline for high-value operators. Integrity and proven reach are mandatory.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Section 1 */}
                            <div>
                                <h3 className="font-orbitron text-xl text-neon-surge mb-6 pb-3 border-b border-[#333] uppercase">
                                    SECTION 1: OPERATOR PROFILE // IDENTIFICATION
                                </h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 items-start">
                                        <label className="text-sm font-bold text-white pt-2">01. Full Legal Name</label>
                                        <Input name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                                        <p className="text-xs text-text-tertiary font-jetbrains-mono mt-2">For VASP/Compliance records only.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 items-start">
                                        <label className="text-sm font-bold text-white pt-2">02. Primary Contact Email</label>
                                        <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                        <p className="text-xs text-text-tertiary font-jetbrains-mono mt-2">Secure, actively monitored address.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 items-start">
                                        <label className="text-sm font-bold text-white pt-2">03. Preferred Handle</label>
                                        <Input name="handle" value={formData.handle} onChange={handleInputChange} placeholder="Telegram/X" required />
                                        <p className="text-xs text-text-tertiary font-jetbrains-mono mt-2">For rapid security alerts.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4 items-start">
                                        <label className="text-sm font-bold text-white pt-2">04. Country of Operation</label>
                                        <Input name="country" value={formData.country} onChange={handleInputChange} required />
                                        <p className="text-xs text-text-tertiary font-jetbrains-mono mt-2">For regulatory profiling.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h3 className="font-orbitron text-xl text-neon-surge mb-6 pb-3 border-b border-[#333] uppercase">
                                    SECTION 2: NETWORK PROFILE // DEPLOYMENT INTELLIGENCE
                                </h3>
                            </div>
                        </form>
                    </Card>
                </section>
            )}
        </div>
    );
};

export default AffiliatePage;