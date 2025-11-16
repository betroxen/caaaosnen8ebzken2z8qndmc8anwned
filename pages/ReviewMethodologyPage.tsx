import React from 'react';

const SectionWrapper: React.FC<{title: string, subtitle: string, imageSrc: string, children: React.ReactNode}> = ({title, subtitle, imageSrc, children}) => (
    <section className="relative rounded-xl border border-[#333] overflow-hidden p-8 bg-foundation-light">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: `url(${imageSrc})`}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-foundation-light via-foundation-light/80 to-transparent"></div>
        <div className="relative z-10">
            <h2 className="font-orbitron text-2xl font-bold text-white mb-2 tracking-wider uppercase">{title}</h2>
            <p className="text-neon-surge font-jetbrains-mono text-sm uppercase mb-6">{subtitle}</p>
            {children}
        </div>
    </section>
);


const ReviewMethodologyPage: React.FC = () => {
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                INSTITUTIONAL INTEGRITY: <span className="text-neon-surge text-glow">THE ZAPWAY PROTOCOL METHODOLOGY</span>
            </h1>
            <p className="text-text-secondary text-lg text-center mt-6 font-rajdhani leading-relaxed">
                The ZapWay Protocol is built on the core principle that trust must be replaced by verifiability. Our methodology is a defensive architecture, ensuring that every transaction, every result, and every data point meets institutional, cryptographic, and ethical compliance standards. We don't ask for belief—we demand inspection.
            </p>

            <div className="mt-12 space-y-10 text-sm leading-relaxed font-rajdhani">
                <SectionWrapper title="1. The Core Mandate" subtitle="ZK-Rollup Verifiability" imageSrc="https://files.catbox.moe/84uzh1.jpg">
                    <p className="mb-4">We mandate the highest level of cryptographic proof to ensure the integrity of game outcomes and capital movements.</p>
                    <div className="mt-4 space-y-4 border-l-2 border-neon-surge/20 pl-6">
                        <div>
                            <h3 className="font-bold text-text-primary text-base">A. ZK-Rollup Proof of Fairness</h3>
                            <ul className="list-disc list-inside mt-2 space-y-2 text-text-secondary">
                                <li><strong>Objective:</strong> To provide unassailable proof that the random number generation (RNG) governing game outcomes is truly random and has not been tampered with by any party (operator or player).</li>
                                <li><strong>Mechanism:</strong> We utilize Zero-Knowledge Rollup (ZK-Rollup) technology (Layer 2) to finalize and batch game results. The original server seed, client seed, and nonce are cryptographically hashed and included in a verifiable proof.</li>
                                <li><strong>Output:</strong> The Verifiable Provenance Record (VPR). This immutable record, stamped on a highly secure layer, serves as the final, auditable receipt for every single game outcome, accessible via the user dashboard.</li>
                            </ul>
                        </div>
                        <div>
                             <h3 className="font-bold text-text-primary text-base">B. Provably Fair Protocol Enforcement</h3>
                             <p>ZapWay enforces a transparent cryptographic cycle using standard Provably Fair principles, augmented by ZK finality: The final verification step is the ZK-Rollup, ensuring the commitment cannot be retroactively altered.</p>
                        </div>
                    </div>
                </SectionWrapper>

                <SectionWrapper title="2. Ethical Compliance" subtitle="The XAI Framework" imageSrc="https://files.catbox.moe/tcajof.jpg">
                     <p className="mb-4">Compliance is not a cost—it is a competitive advantage. Our Ethical AI framework ensures we meet regulatory mandates for user protection and data governance.</p>
                    <div className="mt-4 space-y-4 border-l-2 border-neon-surge/20 pl-6">
                        <div>
                            <h3 className="font-bold text-text-primary text-base">A. Explainable AI (XAI) for Responsible Gaming (RG)</h3>
                            <ul className="list-disc list-inside mt-2 space-y-2">
                                <li><strong>Mechanism:</strong> Our XAI models continuously analyze user transaction behavior, session duration, deposit frequency, and volatility exposure.</li>
                                <li><strong>Function:</strong> Unlike opaque black-box AI, XAI provides a clear Risk Score and the reasons behind it (e.g., "High-risk activity triggered by loss-chasing patterns").</li>
                                <li><strong>Action Mandate:</strong> If a user's Risk Score exceeds a predefined threshold, the protocol automatically executes a pre-vetted intervention, ensuring compliance with global Responsible Gaming standards before regulatory bodies are forced to intervene.</li>
                            </ul>
                        </div>
                        <div>
                             <h3 className="font-bold text-text-primary text-base">B. AI Data Governance</h3>
                             <p>Customer data used in the XAI framework is processed under strict protocols derived from:</p>
                             <ul className="list-disc list-inside mt-2 space-y-2">
                                 <li><strong>GDPR Article 32 (Technical Measures):</strong> Encryption and pseudonymization of all Personally Identifiable Information (PII) at rest and in transit.</li>
                                 <li><strong>State-Specific Requirements (CCPA/CPRA/CDPA):</strong> Granular controls over data usage, retention, and deletion schedules. Customer data cannot be used to train external or unapproved AI models.</li>
                             </ul>
                        </div>
                    </div>
                </SectionWrapper>

                <SectionWrapper title="3. Security & Data Architecture" subtitle="ISO 27001 Standard" imageSrc="https://files.catbox.moe/n6nuju.jpg">
                     <p className="mb-4">Our internal operations and data handling procedures are mapped directly to the ISO 27001 Information Security Management System (ISMS) framework.</p>
                     <div className="mt-4 overflow-x-auto bg-foundation-light/50 border border-[#333] rounded-lg">
                        <table className="w-full text-left font-jetbrains-mono">
                            <thead>
                                <tr className="border-b-2 border-neon-surge/30 text-xs text-text-tertiary uppercase tracking-wider">
                                    <th className="p-4">Control Area</th>
                                    <th className="p-4">ZapWay Implementation</th>
                                    <th className="p-4">Compliance Benchmark</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333]">
                                <tr className="hover:bg-foundation-lighter/50 transition-colors">
                                    <td className="p-4 align-top font-bold text-white">Data Classification</td>
                                    <td className="p-4 align-top">All data (Public, Internal, Confidential, Restricted) is explicitly classified and handled based on its sensitivity.</td>
                                    <td className="p-4 align-top text-neon-surge">ISO 27001 Control A.8.2</td>
                                </tr>
                                <tr className="hover:bg-foundation-lighter/50 transition-colors">
                                    <td className="p-4 align-top font-bold text-white">Encryption</td>
                                    <td className="p-4 align-top">Mandatory AES-256 encryption for all data at rest (storage). Mandatory TLS 1.3 encryption for all data in transit (network transfer).</td>
                                    <td className="p-4 align-top text-neon-surge">GDPR Article 32</td>
                                </tr>
                                <tr className="hover:bg-foundation-lighter/50 transition-colors">
                                    <td className="p-4 align-top font-bold text-white">Access Control</td>
                                    <td className="p-4 align-top">Least Privilege Principle (LPP) applied across all engineering and administrative roles. No single point of failure in credential management.</td>
                                    <td className="p-4 align-top text-neon-surge">ISO 27001 Control A.9.2</td>
                                </tr>
                                <tr className="hover:bg-foundation-lighter/50 transition-colors">
                                    <td className="p-4 align-top font-bold text-white">Incident Response</td>
                                    <td className="p-4 align-top">Defined Breach Notification Protocol (BNP) with a maximum 72-hour internal detection and remediation timeline, minimizing external damage and cost.</td>
                                    <td className="p-4 align-top text-neon-surge">ISO 27001 Control A.16</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </SectionWrapper>
            </div>

            <div className="border-t border-[#333] pt-8 mt-12 text-center">
                <p className="font-orbitron text-lg font-bold text-white">The ZapWay Methodology is not a promise—it is the verifiable source code for institutional integrity.</p>
            </div>
        </div>
    );
};

export default ReviewMethodologyPage;