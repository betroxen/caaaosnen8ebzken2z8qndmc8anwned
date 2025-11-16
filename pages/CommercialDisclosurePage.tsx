import React from 'react';

const CommercialDisclosurePage: React.FC = () => {
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                ZAPWAY CORP. LTD. - <span className="text-neon-surge">COMMERCIAL TRANSPARENCY MANDATE</span>
            </h1>
            <p className="text-text-tertiary text-sm text-center mt-2 font-jetbrains-mono">Effective Date: 2025-11-13</p>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Directive: Integrity is the Code. Financial relationships must be as transparent as our ZK-Rollup finality.
            </p>

            <div className="mt-12 space-y-8 text-sm leading-relaxed">
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. OUR CORE PRINCIPLE: MATH IS NON-NEGOTIABLE</h2>
                    <p>ZapWay Corp. LTD. ("ZapWay," "We") builds infrastructure for the future of gaming. We are paid by our partners, but no commercial relationship—past, present, or future—will ever compromise the mathematical integrity of our Provably Fair protocols, our VRF-based RNG, or the L2 ZK-Rollup finality that guarantees your outcome. We get paid, but we don't cheat.</p>
                </section>

                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. AFFILIATE AND COMPENSATION DISCLOSURE</h2>
                    <p>ZapWay operates through commercial partnerships and affiliate relationships. This section details how those relationships work and how they fund our operation:</p>
                     <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                        <div>
                            <h3 className="font-bold text-text-primary">2.1. Affiliate Linking and Compensation</h3>
                             <ul className="list-disc list-inside mt-2 space-y-1">
                                <li><strong className="text-text-primary">What is an Affiliate Link?</strong> When you click a link on our website or within our platform directing you to a third-party casino, service provider, or data provider (a "Partner"), we may track that click. If you then register an account or conduct a transaction with that Partner, ZapWay may receive a commission or fee.</li>
                                <li><strong className="text-text-primary">Zero Cost to You:</strong> Crucially, this compensation is paid by the Partner and does not result in any additional cost, markup, or reduction in odds/payouts for the User. Your terms of play are entirely governed by the Partner and our Provably Fair contract.</li>
                                <li><strong className="text-text-primary">Payment for Visibility:</strong> We may receive compensation for featuring Partners, placing them in specific review rankings, or running dedicated advertising campaigns on our platform.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary">2.2. Advertising and Review Integrity</h3>
                             <ul className="list-disc list-inside mt-2 space-y-1">
                                <li><strong className="text-text-primary">Commercial Influence:</strong> Featured rankings, banners, and promotional content on ZapWay are often paid placements. We reserve the right to accept compensation for promotional material.</li>
                                <li><strong className="text-text-primary">Editorial Independence:</strong> While a Partner may pay for placement, all technical analysis, performance data, and integrity audits related to their use of ZapWay's VRF or ZK-Rollup infrastructure remain objective and uncompromised. We report on the math, not the marketing.</li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. DISTINCTION BETWEEN CORE INFRASTRUCTURE AND PARTNERS</h2>
                    <p>It is essential that Users understand the distinction between the service ZapWay provides and the services provided by our Partners:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                        <li><strong className="text-text-primary">ZapWay's Responsibility (The Code):</strong> We are responsible for the integrity, fairness, and verifiability of the Provably Fair algorithms, the security of the MPC Custody system, and the compliance of our XAI Responsible Gaming interventions.</li>
                        <li><strong className="text-text-primary">Partner's Responsibility (The Game):</strong> Our Partners (casinos, exchanges, etc.) are solely responsible for game design, user experience, bonuses, payout processing, KYC/AML obligations (unless utilizing a ZapWay service), and general operational risk. ZapWay is not liable for Partner disputes outside of verifiable game outcome failures.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">4. FINANCIAL AND INVESTMENT DISCLAIMER</h2>
                    <p>ZapWay is not a financial advisor, broker, or investment entity. We are a technology service provider focused on game integrity.</p>
                     <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                        <li><strong className="text-text-primary">Crypto Risk:</strong> Digital assets are highly volatile and inherently risky. Any information provided by ZapWay regarding the crypto market, including asset movements or market analysis, is for informational purposes only. You are solely responsible for any loss or gain associated with cryptocurrency value fluctuations.</li>
                        <li><strong className="text-text-primary">No Investment Advice:</strong> Nothing on this site constitutes investment, financial, tax, or legal advice. Consult a professional advisor before making any financial decisions.</li>
                    </ul>
                </section>

                <div className="border-t border-[#333] pt-6 text-xs text-text-tertiary font-jetbrains-mono">
                    <p className="font-bold">Zapway Corp. LTD</p>
                    <p>Registered Address: San Isidro de El General Costa Rica 11901 San José</p>
                </div>
            </div>
        </div>
    );
};

export default CommercialDisclosurePage;