import React from 'react';

const AMLPolicyPage: React.FC = () => {
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                ANTI-MONEY LAUNDERING (AML) <span className="text-neon-surge">AND CTF POLICY (v2.0)</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Mandate: Institutional Resilience. Zero-Tolerance for Illicit Funds.
            </p>

            <div className="mt-12 space-y-8 text-sm leading-relaxed">
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. INTRODUCTION, SCOPE, AND COMPLIANCE GOAL</h2>
                    <p>This Policy outlines ZapWay Corp. LTD.'s commitment to preventing the use of its Services for money laundering (AML), terrorist financing (CTF), or any form of illegal financial activity. This policy is binding on all personnel and all Users. Our primary compliance framework is guided by the Financial Action Task Force (FATF) Recommendations, VASP requirements (e.g., Curaçao LOK framework), and relevant international financial sanctions.</p>
                </section>

                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. AML COMPLIANCE OFFICER (AMLCO)</h2>
                    <p><strong className="text-text-primary">Responsibilities:</strong> The AMLCO is responsible for the overall implementation, enforcement, and continuous review of this Policy. This includes overseeing the integration of blockchain analytics, training personnel, and serving as the mandated liaison with the relevant Financial Intelligence Unit (FIU) and regulatory bodies in our jurisdiction (Costa Rica).</p>
                </section>
                
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. KNOW YOUR CUSTOMER (KYC) AND CDD</h2>
                    <p>We apply a strict, risk-based approach (RBA) to Customer Due Diligence (CDD). No pseudonymity is tolerated when statutory thresholds are met.</p>
                    <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                        <div>
                            <h3 className="font-bold text-text-primary">3.1. Standard Customer Due Diligence (CDD)</h3>
                            <p>All Users must provide verifiable data based on regulatory risk-thresholds. This includes:</p>
                             <ul className="list-disc list-inside mt-2 space-y-1">
                                <li><strong className="text-text-primary">Identity:</strong> Acceptance of current, government-issued photographic identification (e.g., passport, national ID).</li>
                                <li><strong className="text-text-primary">Proof of Address:</strong> Valid document verifying residential address.</li>
                                <li><strong className="text-text-primary">Non-Custodial Wallet Acknowledgement:</strong> Explicit User acknowledgment that the public wallet address used to interact with the ZK-Rollup is controlled solely by them.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary">3.2. Enhanced Due Diligence (EDD) Triggers</h3>
                            <p>EDD is initiated for Users or transactions categorized as high-risk, including:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>High-Value Activity: Cumulative transactions exceeding pre-set regulatory thresholds.</li>
                                <li>High-Risk Jurisdictions: Users operating from or transferring assets to/from high-risk FATF-monitored jurisdictions.</li>
                                <li>PEPs (Politically Exposed Persons): Mandatory EDD for any User identified as a PEP or associated with a PEP.</li>
                                <li>Blockchain Clustering: Any deposits originating from or routed through known Mixing Services, Sanctioned Wallets, or Darknet Market cluster addresses.</li>
                            </ul>
                            <p className="mt-2">During EDD, we may require verification of the Source of Funds (SOF) and Source of Wealth (SOW).</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">4. TRANSACTION MONITORING (KYT) AND ZK-ROLLUP INTEGRITY</h2>
                     <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                        <div>
                            <h3 className="font-bold text-text-primary">4.1. Monitoring Criteria</h3>
                            <p>The KYT system continuously screens for deviations from expected User behavior and financial indicators, including:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Velocity and Volume: Unusual transaction velocity, rapid or large deposits followed by immediate withdrawals (dusting/layering indicators).</li>
                                <li>Origin Risk: Automated screening of all incoming wallet addresses against recognized risk databases (sanction lists, high-risk entity flags).</li>
                                <li>Internal Red Flags: Irregular patterns of wagers, attempts to fund multiple accounts from a single source, or attempts to abuse the withdrawal mechanism.</li>
                                <li>L2 Integrity: Monitoring the L2 finality logs for impossible transactions or deviations that indicate internal or external compromise attempts.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary">4.2. Automated Flagging and Investigation</h3>
                            <p>Automated systems flag transactions that violate pre-determined thresholds. All flags generate a case file that requires mandatory, documented review by the AMLCO or designated compliance staff.</p>
                        </div>
                    </div>
                </section>
                
                 <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">5. SANCTIONS AND PROHIBITED JURISDICTIONS</h2>
                    <p>ZapWay enforces a zero-tolerance policy against international sanctions.</p>
                     <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                        <li><strong className="text-text-primary">Screening Mandate:</strong> All User data and associated public wallet addresses are screened against international sanctions lists (OFAC, UN, EU, etc.) upon onboarding and continuously thereafter.</li>
                        <li><strong className="text-text-primary">Action:</strong> Any positive match results in the immediate freezing of the account, prohibition of Services access, and mandatory reporting to relevant authorities. Use of the Services from explicitly Prohibited Jurisdictions is technically blocked where feasible.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">6. MPC CUSTODY AND CORPORATE GOVERNANCE</h2>
                    <p>Our use of Multi-Party Computation (MPC) custody for corporate treasuries is a core AML control. MPC ensures that:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                        <li><strong className="text-text-primary">Auditable Governance:</strong> All movements of corporate funds are subject to multi-signature authorization thresholds and generate immutable, auditable logs.</li>
                        <li><strong className="text-text-primary">Anti-Collusion:</strong> No single officer or key holder can initiate or authorize a transaction, significantly reducing the risk of internal collusion or single-point-of-failure fraud, thereby enhancing compliance with VASP governance standards.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">7. SUSPICIOUS ACTIVITY REPORTING (SAR)</h2>
                    <p>The AMLCO is solely responsible for investigating flagged activity and, where appropriate, filing a Suspicious Activity Report (SAR) with the relevant Financial Intelligence Unit (FIU) in a timely and confidential manner. Under no circumstances will a User be notified that a SAR has been filed or that their activity is under suspicion (Tipping Off Prohibition).</p>
                </section>

                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">8. RECORD KEEPING AND IMMUTABILITY</h2>
                     <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                        <li><strong className="text-text-primary">Retention Period:</strong> Customer identification, transaction records, CDD/EDD documentation, and internal compliance reports (including SARs) are maintained for a minimum of five (5) years following the termination of the business relationship.</li>
                        <li><strong className="text-text-primary">Blockchain Data:</strong> As detailed in our Privacy Policy, data recorded on the L2 ZK-Rollup ledger is immutable and will persist indefinitely. This immutability serves as a permanent, verifiable audit trail for all transactional activity.</li>
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

export default AMLPolicyPage;