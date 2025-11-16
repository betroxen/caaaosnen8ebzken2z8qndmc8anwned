import React from 'react';
import { Icons } from '../components/icons';
import { Tabs } from '../components/Tabs';

const StatCard = ({ icon: Icon, title, value, change }: { icon: React.FC<any>, title: string, value: string, change?: string }) => (
    <div className="bg-foundation-light p-6 border border-[#333] rounded-lg card-lift">
        <div className="flex justify-between items-start">
            <div className="space-y-1">
                <h3 className="text-sm text-text-tertiary font-bold tracking-widest uppercase">{title}</h3>
                <p className="text-3xl font-orbitron font-bold text-white">{value}</p>
            </div>
            <div className="bg-neon-surge/10 p-3 rounded-md">
                 <Icon className="h-6 w-6 text-neon-surge" />
            </div>
        </div>
        {change && <p className="text-sm text-neon-surge mt-4">{change}</p>}
    </div>
);

const GamePerformanceTable = () => {
    const games = [
        { name: 'Mines', totalWagered: '$1,250,430', rtp: '99.12%', profit: '$10,993' },
        { name: 'Plinko', totalWagered: '$876,112', rtp: '99.05%', profit: '$8,323' },
    ];
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left font-jetbrains-mono">
                <thead>
                    <tr className="border-b border-[#333] text-xs text-text-tertiary uppercase tracking-wider">
                        <th className="p-4">Game</th>
                        <th className="p-4 text-right">Total Wagered</th>
                        <th className="p-4 text-right">Platform RTP</th>
                        <th className="p-4 text-right">Platform Profit</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#333]">
                    {games.map(game => (
                        <tr key={game.name} className="hover:bg-foundation-light/50">
                            <td className="p-4 font-bold text-white">{game.name}</td>
                            <td className="p-4 text-right text-text-secondary">{game.totalWagered}</td>
                            <td className="p-4 text-right text-neon-surge">{game.rtp}</td>
                            <td className="p-4 text-right text-white">{game.profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const AnalyticsPage: React.FC = () => {
    return (
        <div className="animate-fadeIn">
            <h1 className="font-orbitron text-3xl font-bold text-white mb-2">INTELLIGENCE DECK</h1>
            <p className="text-text-secondary mb-8">Real-time platform performance and game analytics.</p>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard icon={Icons.dollarSign} title="Total Wagered" value="$2.12M" change="+2.5% last 24h" />
                <StatCard icon={Icons.percent} title="Platform RTP" value="99.08%" />
                <StatCard icon={Icons.Users} title="Active Players" value="1,428" />
                <StatCard icon={Icons.Zap} title="Total Profit" value="$19,316" />
            </div>

            <Tabs tabs={['Game Performance', 'Player Metrics', 'Financials']}>
                {/* Tab 1: Game Performance */}
                <GamePerformanceTable />

                {/* Tab 2: Player Metrics (Placeholder) */}
                <div className="text-center py-16 text-text-tertiary">
                    <p>Player metrics visualizations coming soon.</p>
                </div>
                
                {/* Tab 3: Financials (Placeholder) */}
                 <div className="text-center py-16 text-text-tertiary">
                    <p>Financial reports coming soon.</p>
                </div>
            </Tabs>
        </div>
    );
};

export default AnalyticsPage;
