import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                PRIVACY AND <span className="text-neon-surge">GDPR COMPLIANCE POLICY (v2.0)</span>
            </h1>
            <p className="text-text-tertiary text-sm text-center mt-2 font-jetbrains-mono">Effective Date: 2025-11-13</p>
            <p className="text-text-secondary text-lg text-center mt-4 font-bold">
                Mandate: Ethical Practices & Verifiable Trust. Player data is sacrosanct.
            </p>

             <div className="mt-12 space-y-8 text-sm leading-relaxed">
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. INTRODUCTION & DATA CONTROLLER</h2>
                    <p>ZapWay Corp. LTD. (the "Data Controller") is committed to protecting your personal data with the same rigor we apply to our ZK-Rollups. This Policy outlines our data processing practices in compliance with the EU General Data Protection Regulation (GDPR) and other relevant privacy laws.</p>
                     <div className="mt-4 bg-foundation-light border border-[#333] rounded-md p-4 text-xs font-jetbrains-mono">
                        <p><span className="font-bold text-text-primary">Name:</span> ZapWay Corp. LTD.</p>
                        <p><span className="font-bold text-text-primary">Registered Address:</span> San Isidro de El General Costa Rica 11901 San José</p>
                        <p><span className="font-bold text-text-primary">Data Protection Officer (DPO) Email:</span> dpo@zapway.corp</p>
                    </div>
                </section>

                 <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. LAWFUL GROUNDS FOR PROCESSING</h2>
                    <p>We only process your data when we have an explicit, recognized legal basis. No exceptions.</p>
                    <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                        <li><strong className="text-text-primary">Contractual Necessity (GDPR Art. 6(1)(b)):</strong> Data processing essential to deliver the Services (e.g., account management, wallet connectivity, transaction finality).</li>
                        <li><strong className="text-text-primary">Legal Obligation (GDPR Art. 6(1)(c)):</strong> Mandatory processing for compliance with legal mandates (e.g., KYC/AML checks, tax reporting, regulatory record-keeping).</li>
                        <li><strong className="text-text-primary">Legitimate Interests (GDPR Art. 6(1)(f)):</strong> Processing necessary for our business operations, provided your rights and freedoms are not overridden (e.g., network security, service optimization, internal auditing).</li>
                        <li><strong className="text-text-primary">Consent (GDPR Art. 6(1)(a)):</strong> Processing for specific activities, like non-essential marketing communications, where explicit, informed consent is obtained and can be easily withdrawn.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. DATA COLLECTION: WHAT WE TRACK</h2>
                    <p>We collect and process the following categories of data, which are necessary to power our verifiable, compliant platform:</p>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left font-jetbrains-mono border-collapse">
                            <thead>
                                <tr className="border-b-2 border-neon-surge">
                                    <th className="p-3 text-xs text-white uppercase tracking-wider">Data Category</th>
                                    <th className="p-3 text-xs text-white uppercase tracking-wider">Examples of Data Collected</th>
                                    <th className="p-3 text-xs text-white uppercase tracking-wider">Primary Purpose</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333]">
                                <tr className="hover:bg-foundation-light/50">
                                    <td className="p-3 font-bold align-top">Identity & Contact</td>
                                    <td className="p-3 align-top">Full Name, Date of Birth, Address, Email, KYC/AML documents.</td>
                                    <td className="p-3 align-top">Legal Obligation (KYC/AML), Contractual Necessity.</td>
                                </tr>
                                <tr className="hover:bg-foundation-light/50">
                                    <td className="p-3 font-bold align-top">Blockchain/Financial</td>
                                    <td className="p-3 align-top">Public Wallet Address, Deposit/Withdrawal History, L2 Transaction Logs.</td>
                                    <td className="p-3 align-top">Contractual Necessity, Legal Obligation (AML).</td>
                                </tr>
                                <tr className="hover:bg-foundation-light/50">
                                    <td className="p-3 font-bold align-top">Behavioral/Gaming</td>
                                    <td className="p-3 align-top">Wager amounts, Game results, Loss limits, Session duration, Time stamps.</td>
                                    <td className="p-3 align-top">Responsible Gaming (XAI), Service Improvement.</td>
                                </tr>
                                <tr className="hover:bg-foundation-light/50">
                                    <td className="p-3 font-bold align-top">Technical/Device</td>
                                    <td className="p-3 align-top">IP Address, Device Fingerprint, Browser Type, Geolocation Data.</td>
                                    <td className="p-3 align-top">Security, Fraud Prevention, Legal Obligation (Jurisdiction Checks).</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">4. DATA SUBJECT RIGHTS (GDPR)</h2>
                    <p>You retain full control over your data. To exercise any of these rights, contact our DPO using the details in Section 1.</p>
                     <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                        <li><strong className="text-text-primary">Right to Access:</strong> You can request confirmation of the data we hold and receive a copy.</li>
                        <li><strong className="text-text-primary">Right to Rectification:</strong> You can correct inaccurate or incomplete non-transactional data.</li>
                        <li><strong className="text-text-primary">Right to Erasure ('Right to be Forgotten'):</strong> You may request the deletion of your data. Crucially, this right is overridden by legal and regulatory retention requirements (e.g., AML mandates require data retention for a minimum of five (5) years). Data recorded on a public blockchain (L1/L2) cannot be erased due to the immutable nature of the ledger.</li>
                        <li><strong className="text-text-primary">Right to Restriction of Processing:</strong> You can restrict how we use your personal data.</li>
                        <li><strong className="text-text-primary">Right to Data Portability:</strong> You can request your data in a structured, commonly used, machine-readable format.</li>
                        <li><strong className="text-text-primary">Right to Object:</strong> You can object to processing based on our legitimate interests or for direct marketing.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">5. AUTOMATED DECISION-MAKING & XAI AUDIT (GDPR ART. 22)</h2>
                    <p>We use automated decision-making to protect You and maintain compliance. This is non-negotiable.</p>
                     <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
                        <li><strong className="text-text-primary">Profiling Criteria:</strong> Our Explainable AI (XAI) system profiles risk based on your Behavioral/Gaming Data (e.g., rapid consecutive wagers, high loss rate relative to deposits, sudden changes in session duration).</li>
                        <li><strong className="text-text-primary">Interventions:</strong> Automated decisions include real-time RG interventions such as: mandatory deposit limits, cooling-off periods, and temporary account suspension.</li>
                        <li><strong className="text-text-primary">Audit and Appeal:</strong> Every automated decision is auditable, transparent, and explained to the User upon request. You have the absolute right to request human intervention, express your point of view, and contest the automated decision.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">6. DATA SECURITY, RETENTION & IMMUTABILITY</h2>
                     <div className="mt-4 space-y-3 border-l-2 border-[#333] pl-4">
                        <div>
                            <h3 className="font-bold text-text-primary">6.1. Security</h3>
                            <p>We employ advanced technical and organizational security measures. This includes end-to-end encryption, secure data compartmentalization, and the use of cutting-edge Multi-Party Computation (MPC) protocols to secure sensitive data handling.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary">6.2. Data Retention</h3>
                            <p>We retain data only as long as necessary. Due to global regulatory requirements (e.g., AML), financial and identity data must be retained for a minimum of five (5) years after account closure.</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary">6.3. Blockchain Immutability</h3>
                            <p>You acknowledge that data committed to the underlying Layer 2 ZK-Rollup, including transaction details and outcome proofs, cannot be deleted, modified, or permanently removed from the chain due to the fundamental, immutable nature of blockchain technology.</p>
                        </div>
                    </div>
                </section>
                
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">7. INTERNATIONAL DATA TRANSFERS</h2>
                    <p>As a global platform, your data may be transferred to and processed in countries outside the European Economic Area (EEA). We ensure that any such transfers comply with GDPR by implementing appropriate safeguards, such as Standard Contractual Clauses (SCCs), to guarantee that your data is treated securely and in accordance with this Policy.</p>
                </section>
                
                 <div className="border-t border-[#333] pt-6 text-xs text-text-tertiary font-jetbrains-mono">
                    <p className="font-bold">Zapway Corp. LTD</p>
                    <p>Registered Address: San Isidro de El General Costa Rica 11901 San José</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
