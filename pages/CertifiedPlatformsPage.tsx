import React from 'react';
import { Icons } from '../components/icons';

const PlatformCard = ({ icon: Icon, title, url, audience, rationale, useCase }: { icon: React.FC<any>, title: string, url: string, audience: string, rationale: React.ReactNode[], useCase: string }) => (
    <div className="bg-foundation-light border border-[#333] rounded-lg overflow-hidden card-lift">
        <div className="p-6">
            <div className="flex items-center gap-4">
                <Icon className="h-10 w-10 text-neon-surge" />
                <div>
                    <h3 className="font-orbitron text-2xl font-bold text-white">{title}</h3>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-neon-surge hover:underline font-jetbrains-mono">{url}</a>
                </div>
            </div>
            <p className="mt-4 text-sm text-text-secondary"><strong className="text-text-primary">Primary Audience:</strong> {audience}</p>
        </div>
        <div className="bg-foundation p-6 border-t border-[#333]">
            <h4 className="font-orbitron text-md font-bold text-neon-surge mb-3 tracking-wider">WHY IT'S ZAP CERTIFIED:</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
                {rationale.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <Icons.Verified className="h-4 w-4 text-neon-surge mt-1 shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="bg-foundation-light p-6 border-t border-[#333]">
             <h4 className="font-orbitron text-md font-bold text-neon-surge mb-3 tracking-wider">BEST USE CASE:</h4>
             <p className="text-sm text-text-secondary">{useCase}</p>
        </div>
    </div>
);


const CertifiedPlatformsPage: React.FC = () => {
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                ZAP CERTIFIED PLATFORMS: <span className="text-neon-surge text-glow">THE INSTITUTIONAL ON-RAMP</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Directive: Minimize Friction. Maximize Compliance.
            </p>
            <p className="mt-8 text-text-secondary leading-relaxed text-center max-w-3xl mx-auto">
                To operate at the speed and integrity required by ZapWay's ZK-Rollup architecture, we only integrate with Virtual Asset Service Providers (VASPs) that meet our stringent AML/GDPR mandates. The following are the most efficient, compliant on-ramps for our Users:
            </p>

            <div className="mt-12 grid grid-cols-1 gap-8">
                <PlatformCard
                    icon={Icons.SimpleWallet}
                    title="SIMPLE WALLET (SIMPLE.APP)"
                    url="https://simple.app/"
                    audience="Users in the European Economic Area (EEA) requiring easy, compliant transfer from Euro (EUR) bank accounts."
                    rationale={[
                        <><strong>MiCA/GDPR Alignment:</strong> Designed to meet the highest EU regulatory standards, ensuring their KYC/AML and data protocols align perfectly with ZapWay’s needs.</>,
                        <><strong>Low-Friction Fiat On-Ramp:</strong> Provides a direct gateway to convert fiat (Euros) into crypto, eliminating complex transfers and offering local banking integration (e.g., SEPA).</>,
                        <><strong>Dedicated Support:</strong> Optimized for high-volume transactions with a focus on regulatory transparency, minimizing the chance of compliance-related deposit holds.</>,
                    ]}
                    useCase="Ideal for EU-based players who need to reliably move capital from a traditional bank account into crypto, guaranteeing a smooth, legally compliant transfer."
                />
                
                <PlatformCard
                    icon={Icons.GgpWallet}
                    title="GGP WALLET (GGP.GG)"
                    url="https://ggp.gg/en"
                    audience="Crypto-native users globally who already hold assets and prioritize transfer speed and flexibility."
                    rationale={[
                        <><strong>L2 Compatibility & Speed:</strong> Built for decentralized transfers, making it highly compatible with our Layer 2 ZK-Rollup system for faster confirmations and negligible gas fees.</>,
                        <><strong>High-Volume Liquidity:</strong> Offers deep liquidity pools for major cryptocurrencies (BTC, ETH, Stablecoins), allowing for large-scale deposits and rapid withdrawals without significant slippage.</>,
                        <><strong>Global Crypto-Native Focus:</strong> Engineered for users in the digital asset space, offering robust security and specialized support for cross-chain transactions.</>,
                    ]}
                    useCase="The optimal choice for users moving existing crypto balances from cold storage or other exchanges. It offers the fastest path to game-ready capital."
                />
            </div>
            
            <div className="mt-12 border-t-2 border-warning-high/50 pt-6 bg-warning-high/10 p-6 rounded-lg">
                <h2 className="font-orbitron text-xl font-bold text-warning-low mb-3">MANDATE: AVOID UNLISTED EXCHANGES</h2>
                <p className="text-text-secondary leading-relaxed text-sm">
                    Do not use unlisted or non-certified exchanges for high-value transfers. Unregulated exchanges and mixers pose a significant AML risk and will trigger an Enhanced Due Diligence (EDD) review and potential account freeze upon deposit, as mandated by our AML & CTF Policy. Use the certified tools to minimize friction and maximize your tactical advantage.
                </p>
            </div>
        </div>
    );
};

export default CertifiedPlatformsPage;