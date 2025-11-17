import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

const ZapStackCard: React.FC<{ number: string; title: string; children: React.ReactNode; icon: React.FC<any> }> = ({ number, title, children, icon: Icon }) => (
    <div className="bg-foundation border border-[#333] rounded-xl p-6 flex flex-col card-lift h-full">
        <div className="flex items-center gap-3 mb-4">
            <span className="font-jetbrains-mono text-xl text-neon-surge">{number}</span>
            <Icon className="h-5 w-5 text-neon-surge opacity-50" />
        </div>
        <h3 className="font-orbitron text-lg font-bold text-white uppercase mb-3 tracking-wider">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed font-rajdhani flex-1">{children}</p>
    </div>
);

const AboutUsPage: React.FC = () => {
    return (
        <div className="animate-fadeIn font-rajdhani">

            <header className="text-center mb-16">
                <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    ZAPWAY // <span className="text-neon-surge">ARCHITECTURE OF INTEGRITY</span>
                </h1>
                <p className="font-jetbrains-mono text-lg text-neon-surge/80 mt-6 max-w-4xl mx-auto">
                    {'>'} THE ZERO-TRUST THESIS: We are here to dismantle the black box of centralized gaming. The traditional model relies on hope and weak promises. ZapWay replaces both with immutable code and verifiable mathematics. We are not a casino; we are the institutional infrastructure enforcing the new crypto standard.
                </p>
            </header>

            <div className="text-center mb-20 p-4 border-y-2 border-neon-surge/30">
                <p className="font-orbitron text-xl uppercase tracking-[0.3em] text-neon-surge text-glow">
                    DIRECTIVE: DISMANTLE THE BLACK BOX. ESTABLISH THE NEW STANDARD.
                </p>
            </div>

            <section className="mb-24">
                <div className="text-center mb-12">
                    <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider">PHASE ONE: THE ZAP STACK</h2>
                    <h3 className="font-jetbrains-mono text-md text-text-tertiary uppercase tracking-[0.2em] mt-2">// ZERO-TRUST INFRASTRUCTURE</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ZapStackCard number="01" title="ZK-ROLLUP FINALITY" icon={Icons.Shield}>
                        PROOF, NOT PROMISE. Every action is processed on a Layer 2 ZK-Rollup. Results are cryptographically proven, not merely recorded. Instant finality with an immutable on-chain record.
                    </ZapStackCard>
                    <ZapStackCard number="02" title="DECENTRALIZED VRF" icon={Icons.RefreshCw}>
                        AUDITED RANDOMNESS. Game outcomes are powered by audited Verifiable Random Function (VRF) Oracles. This guarantees randomness and ensures provable fairness for every single hand or spin.
                    </ZapStackCard>
                    <ZapStackCard number="03" title="MPC CUSTODY" icon={Icons.Lock}>
                        SELF-CUSTODY DEFENSE. Corporate treasury and player assets are secured by Multi-Party Computation (MPC). This eliminates the single point of failure, enforcing N-of-M multi-signature security for all asset movements.
                    </ZapStackCard>
                    <ZapStackCard number="04" title="SSP REWARD CIRCUIT" icon={Icons.Zap}>
                        SKIN IN THE GAME. ZAPWAY introduces the SSP (Sentinel Score Protocol). Players are rewarded for verified activity and responsible behavior, turning platform participation into a quantifiable, valuable asset.
                    </ZapStackCard>
                </div>
            </section>

            <section className="mb-24">
                 <div className="text-center mb-12">
                    <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider">PHASE TWO: SENTINEL PROTOCOLS</h2>
                    <h3 className="font-jetbrains-mono text-md text-text-tertiary uppercase tracking-[0.2em] mt-2">// PLAYER PROTECTION</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="p-8 bg-foundation border border-[#333] card-lift">
                        <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-6 border-b border-[#333] pb-4 tracking-wider">MODULE A: ETHICAL OVERSIGHT</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-neon-surge mb-2 flex items-center gap-2"><Icons.Cpu className="h-5 w-5" /> Explainable AI (XAI) Engine</h4>
                                <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                                    <li><strong className="text-white">Purpose:</strong> Proactively monitors and enforces Responsible Gaming limits based on auditable metrics.</li>
                                    <li><strong className="text-white">Transparency:</strong> Every automated intervention is fully transparent and auditable by the user. This fulfils rigorous GDPR Article 22 mandates for transparent automated decision-making. We show the user why a limit was applied.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-neon-surge mb-2 flex items-center gap-2"><Icons.Scale className="h-5 w-5" /> VASP Compliance and AML/CTF</h4>
                                 <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                                    <li><strong className="text-white">Standard:</strong> We operate under strict dual-licensing requirements, meeting both iGaming and VASP (Virtual Asset Service Provider) AML/CTF standards.</li>
                                    <li><strong className="text-white">Enforcement:</strong> Zero-tolerance policy for illicit activity. Our systems are built to withstand institutional scrutiny, guaranteeing clean capital flow.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                     <Card className="p-8 bg-foundation border border-[#333] card-lift">
                        <h3 className="font-orbitron text-xl font-bold text-white uppercase mb-6 border-b border-[#333] pb-4 tracking-wider">MODULE B: DATA VERIFICATION</h3>
                         <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-neon-surge mb-2 flex items-center gap-2"><Icons.FileCheck className="h-5 w-5" /> Verifiable Proofs (VPR)</h4>
                                 <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                                    <li><strong className="text-white">Access:</strong> Every player gets a real-time, zero-delay dashboard to instantly verify the cryptographic proofs (VPR) of their gameplay.</li>
                                    <li><strong className="text-white">Motto:</strong> If you can't prove it, it didn't happen. The player holds the final key to verification.</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-neon-surge mb-2 flex items-center gap-2"><Icons.Database className="h-5 w-5" /> The Immutable Ledger</h4>
                                 <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary pl-2">
                                    <li><strong className="text-white">Auditability:</strong> All game transaction data is hashed and committed to the Layer 2 chain, creating a public, immutable ledger. This ensures complete, retroactive auditability of platform performance and fairness claims by any external party.</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <section className="mb-12 text-center bg-foundation-light border border-[#333] p-10 rounded-xl">
                 <div className="text-center mb-8">
                    <h2 className="font-orbitron text-3xl font-bold text-white uppercase tracking-wider">THE FORWARD DEPLOYMENT</h2>
                    <h3 className="font-jetbrains-mono text-md text-text-tertiary uppercase tracking-[0.2em] mt-2">// ZAPWAY’S MISSION</h3>
                </div>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
                    Our mission is not to capture a market; it's to upgrade the entire industry. We partner exclusively with elite operators and protocols, integrating our Provably Fair stack directly onto their platforms. This creates the ZAP Network, bringing a new, non-optional standard of integrity to the wider crypto market.
                </p>
                <div className="my-8 bg-foundation border-y border-neon-surge/30 py-6 px-4">
                    <p className="font-orbitron text-white uppercase tracking-widest"><span className="text-neon-surge">YEAR 1 OBJECTIVE:</span> Establish the ZAP Stack as the default fairness API for all major crypto gaming platforms.</p>
                    <p className="font-orbitron text-white uppercase tracking-widest mt-2"><span className="text-neon-surge">THE METRIC:</span> Replacement of opaque RNG with provable VRF across 80% of partner wagers.</p>
                </div>
                <p className="text-xl font-bold text-white italic">
                    We are not just playing the game. We are the institutional force rewriting the rules.
                </p>
            </section>

             <footer className="text-center font-jetbrains-mono mt-16 space-y-2">
                <p className="text-text-tertiary text-sm uppercase tracking-widest">{'>'} TRANSMISSION COMPLETE.</p>
                <p className="text-neon-surge text-lg font-bold uppercase tracking-wider">{'>'} Join the new standard. Join ZapWay.</p>
            </footer>
        </div>
    );
};

export default AboutUsPage;