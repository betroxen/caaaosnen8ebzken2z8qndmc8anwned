import React from 'react';
import { Icons } from './icons';

const FeaturedCasinos = () => {
  const casinoNames = [ "DUEL", "STAKE", "GAMDOM", "SHUFFLE", "ROOBET", "ROLLBIT", "BC.GAME", "TRUSTDICE", "LIMBO", "BITCASINO" ];
  const marqueeContent = [...casinoNames, ...casinoNames, ...casinoNames];

  return (
    <section className="w-full bg-[#000000] py-12 border-y border-foundation-light">
      <div className="container mx-auto max-w-7xl px-4 mb-8">
        <h2 className="text-center text-xl md:text-2xl font-orbitron font-bold text-white uppercase tracking-widest opacity-80">
          POWERING THE TOP TIER OPERATORS
        </h2>
      </div>
      <div className="relative w-full overflow-hidden mask-image-lr">
        <div className="flex w-max animate-slide items-center">
          {marqueeContent.map((name, index) => (
            <div key={index} className="mx-6 md:mx-10 flex items-center justify-center select-none">
              <span className="text-2xl md:text-3xl font-orbitron font-extrabold text-white tracking-wider opacity-60 hover:opacity-100 hover:text-neon-surge transition-opacity transition-colors duration-300 cursor-default">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: Icons.Shield, title: "ZK-ROLLUP SECURITY", description: "Every result is secured and proven by zero-knowledge proofs on a Layer 2 solution. Trust the math, not the operator. Verifiable Provenance Record (VPR) for all transactions." },
    { icon: Icons.Users, title: "XAI ETHICAL COMPLIANCE", description: "Our Explainable AI (XAI) framework provides automated Responsible Gaming (RG) interventions and transparent risk scoring. Regulatory strength baked into the protocol." },
    { icon: Icons.Zap, title: "DEGEN REWARDS PROTOCOL", description: "Earn Zap Points for network contribution, verifiable transparency checks, and mission completion. Loyalty is coded, not assumed. Maximize your tactical edge." }
  ];

  return (
    <section id="features" className="bg-foundation py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="mb-4 text-center text-4xl font-orbitron font-bold text-white md:text-5xl uppercase tracking-tight">THE ZAP MANDATE</h2>
        <p className="mb-12 text-center text-xl text-text-secondary font-rajdhani">We don't sell games. We sell institutional integrity.</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-xl bg-foundation-light p-8 transition-all duration-500 hover:shadow-neon-card-hover border border-transparent hover:border-neon-surge/30 group card-lift">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-neon-surge/10 border border-neon-surge/30 transition-colors duration-300 group-hover:bg-neon-surge/20">
                <feature.icon className="h-7 w-7 text-neon-surge transition-transform duration-500 group-hover:rotate-12" />
              </div>
              <h3 className="mb-3 text-2xl font-orbitron font-extrabold text-white">{feature.title}</h3>
              <p className="text-text-secondary text-base leading-relaxed font-rajdhani">{feature.description}</p>
              <a href="#" className="mt-4 inline-flex items-center text-neon-surge text-sm font-semibold group-hover:underline">
                Read Protocol
                <Icons.ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CoreSections: React.FC = () => {
    return (
        <>
            <FeaturedCasinos />
            <FeaturesSection />
        </>
    )
}
