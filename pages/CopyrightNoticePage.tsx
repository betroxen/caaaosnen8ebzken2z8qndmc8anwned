import React from 'react';

const CopyrightNoticePage: React.FC = () => {
    return (
        <div className="animate-fadeIn max-w-4xl mx-auto text-text-secondary">
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white text-center">
                ZAPWAY CORP. OFFICIAL COPYRIGHT <span className="text-neon-surge">AND INTELLECTUAL PROPERTY NOTICE</span>
            </h1>
            <p className="text-text-tertiary text-sm text-center mt-4 font-jetbrains-mono">
                 Copyright © {new Date().getFullYear()} ZapWay Corp. All Rights Reserved.
            </p>

            <div className="mt-12 space-y-8 text-sm leading-relaxed">
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">1. COPYRIGHT OWNERSHIP</h2>
                    <p>All content, code, documentation, graphics, logos, designs, architecture, and technology, including but not limited to the Zap Rewards Protocol, the Protocol Scoreboard, the ZK-Rollup Integration methodology, and all related software source code (collectively, the "Proprietary Material"), are the exclusive property of ZapWay Corp., unless otherwise explicitly stated.</p>
                    <p className="mt-2">This Proprietary Material is protected by international copyright laws and treaties. Unauthorized reproduction, distribution, public display, or modification of this material is strictly prohibited and constitutes an infringement of ZapWay Corp.'s rights.</p>
                </section>

                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">2. TRADEMARKS</h2>
                    <p><strong className="text-text-primary">ZAPWAY®, ZAP POINTS™, ZP™,</strong> and the associated Zap logo and stylized names are registered or unregistered trademarks and service marks of ZapWay Corp.</p>
                    <p className="mt-2">The use of any ZapWay Corp. trademark or service mark without the express written permission of ZapWay Corp. is strictly prohibited. You may not use any of these trademarks in connection with any product or service that is not ZapWay Corp.'s or in any manner that is likely to cause confusion among customers or that disparages or discredits ZapWay Corp.</p>
                </section>
                
                <section>
                    <h2 className="font-orbitron text-xl font-bold text-white mb-3 tracking-wider">3. RESERVATION OF RIGHTS</h2>
                    <p>ZapWay Corp. reserves all rights not expressly granted in and to the Proprietary Material and the trademarks. No license or right under any copyright, patent, trademark, or other intellectual property right of ZapWay Corp. or any third party is granted or conferred by the unauthorized use of any material within this domain or application.</p>
                    <p className="mt-2">Any attempt to reverse-engineer, decompile, or otherwise access the proprietary source code of the ZapWay Protocol without a signed institutional agreement is a direct violation of this notice.</p>
                </section>

                <div className="border-t border-[#333] pt-6 mt-12 text-xs text-text-tertiary font-jetbrains-mono">
                    <p className="font-bold">For inquiries regarding intellectual property licensing or permissions, please contact:</p>
                    <a href="mailto:compliance@zapway.gg" className="text-neon-surge hover:underline">compliance@zapway.gg</a>
                </div>
            </div>
        </div>
    );
};

export default CopyrightNoticePage;