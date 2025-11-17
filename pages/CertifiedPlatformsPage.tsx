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


export const CertifiedPlatformsPage: React.FC = () => {
    return (
        <div className="animate-fadeIn">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                ZAP CERTIFIED PLATFORMS: <span className="text-neon-surge text-glow">THE INSTITUTIONAL ON-RAMP</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Directive: Minimize Friction. Maximize Compliance.
            </p>
            <p className="mt-8 text-text-secondary leading-relaxed text-center max-w-3xl mx-auto">
                To operate at the speed and integrity required by ZapWay's ZK-Rollup architecture, we only integrate with Virtual Asset Service Providers (VASPs) that meet our strict standards for security, compliance, and user experience. The platforms listed below are ZAP Certified, ensuring a seamless and secure on-ramp to our ecosystem.
            </p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                <PlatformCard
                    icon={Icons.Wallet}
                    title="MoonPay"
                    url="moonpay.com"
                    audience="Users needing to on-ramp from fiat to crypto"
                    rationale={[
                        <><strong>Institutional Grade Security:</strong> Robust AML/KYC protocols that meet global standards.</>,
                        <><strong>Broad Fiat Support:</strong> Extensive support for various fiat currencies and payment methods.</>,
                        <><strong>Seamless API Integration:</strong> Provides a smooth user experience for purchasing crypto directly within partner platforms.</>
                    ]}
                    useCase="On-ramping from traditional bank accounts or credit cards to fund your crypto wallet for use on ZAP-integrated platforms."
                />
                <PlatformCard
                    icon={Icons.GgpWallet}
                    title="Ramp Network"
                    url="ramp.network"
                    audience="Developers and users looking for embedded crypto purchases"
                    rationale={[
                        <><strong>Developer-First Approach:</strong> Easy-to-integrate SDKs and APIs for a native on-ramping experience.</>,
                        <><strong>Global Coverage:</strong> Supports a wide range of countries and local payment methods.</>,
                        <><strong>Competitive Fees:</strong> Transparent and competitive fee structure for crypto purchases.</>
                    ]}
                    useCase="Embedding a non-custodial fiat-to-crypto gateway directly into a dApp or platform for a frictionless user journey."
                />
            </div>
        </div>
    );
};

export default CertifiedPlatformsPage;