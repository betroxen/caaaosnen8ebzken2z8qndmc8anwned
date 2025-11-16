import React from 'react';
import { Icons } from '../components/icons';

const ProtocolDeepDivePage: React.FC = () => {
  return (
    <div className="relative animate-fadeIn max-w-5xl mx-auto">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-10"><source src="https://files.catbox.moe/tibx6u.mp4" type="video/mp4" /></video>
      <div className="absolute inset-0 bg-gradient-to-t from-foundation via-foundation/90 to-foundation z-0"></div>

      <div className="relative z-10">
        <header className="text-center mb-16">
          <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            The Provably Fair Model
          </h1>
          <p className="mt-4 text-xl text-neon-surge font-rajdhani font-bold tracking-wider">
            Built for Verification, Not Just Compliance
          </p>
        </header>

        <section className="mb-12 bg-foundation-light border border-[#333] rounded-lg p-8">
          <p className="text-text-secondary leading-relaxed font-rajdhani">
            The provably fair model emerged alongside blockchain-based gambling platforms, where traditional trust assumptions were no longer acceptable. Instead of relying on third-party certifications, these systems enable players to verify the integrity of each game round themselves, using hashes, seeds, and open algorithms.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Legacy PF Column */}
          <div className="bg-foundation-light/50 border border-yellow-500/30 rounded-xl p-8 space-y-6 h-full">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/30">
                <Icons.FileText className="h-6 w-6 text-yellow-400" />
              </div>
              <h2 className="font-orbitron text-2xl font-bold text-yellow-400 uppercase">Legacy PF Model</h2>
            </div>
            <p className="text-text-secondary font-rajdhani text-sm">
              This model is especially suited to simple, in-house games like dice, crash, or plinko and used by many crypto gambling platforms, including the biggest casinos like Stake, Duel & Shuffle. These games typically don’t rely on complex visual engines or proprietary slot mechanics, making them easier to audit fully.
            </p>
            <div>
              <h3 className="font-bold text-white mb-3 tracking-wider">Key Features (Legacy PF):</h3>
              <ul className="space-y-3 text-text-secondary font-rajdhani text-sm">
                <li className="flex items-start gap-3"><Icons.CheckCircle className="h-4 w-4 text-yellow-400 mt-1 shrink-0" /><span><strong>Commit–reveal architecture:</strong> The casino commits to a server seed (usually hashed) before play begins.</span></li>
                <li className="flex items-start gap-3"><Icons.CheckCircle className="h-4 w-4 text-yellow-400 mt-1 shrink-0" /><span><strong>Player-controlled client seed:</strong> Users can input their own seed, increasing transparency and unpredictability.</span></li>
                <li className="flex items-start gap-3"><Icons.CheckCircle className="h-4 w-4 text-yellow-400 mt-1 shrink-0" /><span><strong>Round-by-round reproducibility:</strong> Players can verify that their result was mathematically fair.</span></li>
                <li className="flex items-start gap-3"><Icons.CheckCircle className="h-4 w-4 text-yellow-400 mt-1 shrink-0" /><span><strong>Open-source verifier tools:</strong> Anyone can inspect the game logic and validate results independently.</span></li>
              </ul>
            </div>
          </div>

          {/* ZAPWAY PROTOCOL Column */}
          <div className="bg-foundation-light border border-neon-surge/30 rounded-xl p-8 space-y-6 shadow-neon-card h-full">
            <div className="flex items-center gap-4">
              <div className="bg-neon-surge/10 p-3 rounded-lg border border-neon-surge/30">
                <Icons.Shield className="h-6 w-6 text-neon-surge" />
              </div>
              <h2 className="font-orbitron text-2xl font-bold text-neon-surge uppercase">ZapWay Protocol</h2>
            </div>
            <p className="text-text-secondary font-rajdhani text-sm">
              We use ZK-Rollup Security where every result is secured and proven by ZERO-KNOWLEDGE PROOFS on a Layer 2 solution. This immediately creates an immutable and publicly auditable Verifiable Provenance Record (VPR) for all transactions.
            </p>
            <div>
              <h3 className="font-bold text-white mb-3 tracking-wider">ZapWay Enforcement:</h3>
              <ul className="space-y-3 text-text-secondary font-rajdhani text-sm">
                <li className="flex items-start gap-3"><Icons.Verified className="h-4 w-4 text-neon-surge mt-1 shrink-0" /><span><strong>Systemic Integrity:</strong> The VPR continuously cross-references the operator's stated Return to Player (RTP) against the actual, mathematically proven RNG output.</span></li>
                <li className="flex items-start gap-3"><Icons.Verified className="h-4 w-4 text-neon-surge mt-1 shrink-0" /><span><strong>Real-Time Audits:</strong> We don't just verify single bets; we verify the SYSTEM'S INTEGRITY in real-time.</span></li>
                <li className="flex items-start gap-3"><Icons.Verified className="h-4 w-4 text-neon-surge mt-1 shrink-0" /><span><strong>Automated Enforcement:</strong> If the operator's reported house edge deviates from the proven aggregate RNG data, the VPR instantly flags the disparity for the entire ZAP Grid.</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center border-t-2 border-warning-high/50 pt-8 bg-warning-high/5 p-8 rounded-xl">
          <h2 className="font-orbitron text-3xl font-black text-warning-low uppercase tracking-tight">ZAPWAY PROTOCOL: WHERE "PROVABLY FAIR" DIES.</h2>
          <p className="mt-4 text-lg text-white max-w-4xl mx-auto font-rajdhani">
            Legacy "Provably Fair" is a <strong className="text-warning-low">HALF-TRUTH</strong>. It verifies the fairness of a single roll (C Fairness) but is willfully blind to the operator's overall systemic return. They can show you a "fair" sequence while quietly <strong className="text-warning-low">RIGGING THE HOUSE EDGE</strong> behind the scenes.
          </p>
          <p className="mt-4 text-xl font-bold text-white font-orbitron uppercase">
              The critical failure point is this: <span className="text-warning-low">PF ONLY VERIFIES THE INPUT SEQUENCE. IT DOES NOT VERIFY THE OUTPUT ACCUMULATION.</span>
          </p>
          <p className="mt-6 text-2xl font-black text-neon-surge font-orbitron uppercase text-glow">
            ZapWay Protocol closes this catastrophic loophole.
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-2xl font-black text-white font-orbitron uppercase">
            STOP TRUSTING. START VERIFYING THE <span className="text-neon-surge">ENTIRE ECOSYSTEM</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProtocolDeepDivePage;