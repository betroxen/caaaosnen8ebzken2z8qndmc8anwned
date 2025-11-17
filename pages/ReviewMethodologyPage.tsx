import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';

const MethodologySection: React.FC<{ icon: React.FC<any>; title: string; subtitle: string; children: React.ReactNode }> = ({ icon: Icon, title, subtitle, children }) => (
    <section className="mb-12">
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-neon-surge/10 p-3 rounded-lg border border-neon-surge/30">
                <Icon className="h-8 w-8 text-neon-surge" />
            </div>
            <div>
                <h2 className="font-orbitron text-2xl font-bold text-white uppercase tracking-wider">{title}</h2>
                <p className="font-jetbrains-mono text-sm text-neon-surge/80 uppercase tracking-widest">{subtitle}</p>
            </div>
        </div>
        <div className="font-rajdhani text-text-secondary leading-relaxed space-y-4 pl-4 border-l-2 border-[#333]">{children}</div>
    </section>
);

const ReviewMethodologyPage: React.FC = () => {
    return (
        <div className="animate-fadeIn max-w-5xl mx-auto">
            <header className="text-center mb-16">
                <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    ZAPWAY // <span className="text-neon-surge">VETTING METHODOLOGY</span>
                </h1>
                <p className="font-jetbrains-mono text-lg text-neon-surge/80 mt-6 max-w-4xl mx-auto">
                    {'>'} MANDATE: Our ratings are not for sale. This is the code behind our scores.
                </p>
            </header>
            
            <MethodologySection icon={Icons.Database} title="Data Integrity & Performance" subtitle="40% WEIGHT">
                <p>This is the core of the ZAP score. We measure objective, verifiable performance metrics.</p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong className="text-white">True RTP Analysis:</strong> We analyze payout data against stated RTPs to detect statistical deviation.</li>
                    <li><strong className="text-white">Withdrawal Velocity:</strong> Time-stamped withdrawal tests to measure speed and consistency.</li>
                    <li><strong className="text-white">Community VPR Data:</strong> Aggregated data from Validated Player Reports (VPRs) on payout success and bonus fairness.</li>
                </ul>
            </MethodologySection>

            <MethodologySection icon={Icons.Shield} title="Security & Compliance" subtitle="30% WEIGHT">
                <p>An operator's security posture is non-negotiable. We conduct deep-dive audits on their infrastructure and policies.</p>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong className="text-white">Licensing & Regulation:</strong> Verification of active, reputable gaming licenses.</li>
                    <li><strong className="text-white">AML/KYC Protocol Strength:</strong> Assessment of their Anti-Money Laundering and Know Your Customer procedures.</li>
                    <li><strong className="text-white">Platform Security:</strong> SSL/TLS encryption, 2FA availability, and smart contract audits (where applicable).</li>
                </ul>
            </MethodologySection>

            <MethodologySection icon={Icons.Users} title="Community Veto & Support" subtitle="20% WEIGHT">
                <p>The collective experience of the ZAP community acts as a live, decentralized audit. </p>
                <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong className="text-white">Veto Power Score:</strong> A metric derived from the volume and severity of negative VPRs. High scores can trigger a re-vetting.</li>
                    <li><strong className="text-white">Support Competence:</strong> We test support channels for speed, knowledge, and resolution effectiveness.</li>
                </ul>
            </MethodologySection>

             <MethodologySection icon={Icons.Gem} title="Bonus & Feature Value" subtitle="10% WEIGHT">
                <p>Bonuses are analyzed for true value, not just headline numbers.</p>
                 <ul className="list-disc list-inside space-y-2 pl-2">
                    <li><strong className="text-white">Wagering Requirement Analysis:</strong> Calculation of the "true cost" of a bonus.</li>
                    <li><strong className="text-white">Innovation & UX:</strong> Reward for unique features, clean user interface, and overall player experience.</li>
                </ul>
            </MethodologySection>
        </div>
    );
};

export default ReviewMethodologyPage;
