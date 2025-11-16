import React from 'react';
import { Icons } from '../components/icons';

const badges = [
    { name: 'Charge', iconUrl: 'https://files.catbox.moe/t009ik.webp', description: 'Complete 100 verified wagers in a single session.', earned: true },
    { name: 'Spark', iconUrl: 'https://files.catbox.moe/a14nwe.webp', description: 'Submit your first successful VPR.', earned: true },
    { name: 'Surge', iconUrl: 'https://files.catbox.moe/49qzvn.webp', description: 'Achieve a 10x multiplier on any ZAP game.', earned: true },
    { name: 'Pulse', iconUrl: 'https://files.catbox.moe/vb8gw7.webp', description: 'Maintain a daily login streak for 7 days.', earned: true },
    { name: 'Rush', iconUrl: 'https://files.catbox.moe/99mb5d.webp', description: 'Win 5 consecutive rounds in Mines.', earned: true },
    { name: 'Apex', iconUrl: 'https://files.catbox.moe/cldts5.webp', description: 'Reach the top 10% on the global leaderboard.', earned: true },
    { name: 'Blaze', iconUrl: 'https://files.catbox.moe/efr45u.webp', description: 'Hit the 1000x multiplier on Plinko.', earned: false },
    { name: 'Ignite', iconUrl: 'https://files.catbox.moe/je4uhu.webp', description: 'Successfully refer 3 new operators to the ZAP grid.', earned: false },
    { name: 'VIP Host', iconUrl: 'https://files.catbox.moe/gi909v.webp', description: 'Unlock the VIP Host status through exceptional contribution.', earned: false },
];

const RewardsPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <h1 className="font-orbitron text-4xl font-bold text-white mb-2 text-center">
        <span className="text-neon-surge">//</span> REWARDS HUB
      </h1>
      <p className="text-text-secondary mt-4 max-w-2xl mx-auto text-center">
        Your progress, available bounties, and claimable rewards are managed here. Earn badges by completing tactical objectives across the ZAP ecosystem.
      </p>

      <div className="mt-12">
        <h2 className="font-orbitron text-2xl font-bold text-white mb-6 uppercase tracking-wider">Achievement Grid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
                <div key={badge.name} className={`bg-foundation-light border rounded-lg p-6 flex flex-col items-center text-center transition-all duration-300 card-lift ${badge.earned ? 'border-neon-surge/30' : 'border-[#333]'}`}>
                    <div className={`relative mb-4 w-24 h-24 flex items-center justify-center`}>
                        <img src={badge.iconUrl} alt={badge.name} className={`w-full h-full object-contain transition-all duration-300 ${!badge.earned && 'grayscale opacity-40'}`} />
                        {!badge.earned && <Icons.Lock className="absolute h-8 w-8 text-text-tertiary" />}
                    </div>
                    <h3 className={`font-orbitron text-lg font-bold uppercase ${badge.earned ? 'text-neon-surge text-glow' : 'text-text-tertiary'}`}>{badge.name}</h3>
                    <p className="text-sm text-text-secondary mt-2 flex-1">{badge.description}</p>
                    {badge.earned && (
                        <div className="mt-4 text-xs font-jetbrains-mono uppercase text-neon-surge bg-neon-surge/10 px-3 py-1 rounded-full border border-neon-surge/30">
                            UNLOCKED
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;