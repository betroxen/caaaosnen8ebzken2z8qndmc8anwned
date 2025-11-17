import React, { useState, useEffect } from 'react';
import { Icons } from '../components/icons';
import { Tabs } from '../components/Tabs';
import { appwriteDatabases, DATABASE_ID, ANALYTICS_COLLECTION_ID } from '../context/AppContext';
import { Models } from 'appwrite';

interface AnalyticsData extends Models.Document {
    totalWagered: number;
    platformRTP: number;
    activePlayers: number;
    totalProfit: number;
    wagerChange24h: number;
}

const StatCard = ({ icon: Icon, title, value, change, loading }: { icon: React.FC<any>, title: string, value: string, change?: string, loading: boolean }) => (
    <div className="bg-foundation-light p-6 border border-[#333] rounded-lg card-lift">
        <div className="flex justify-between items-start">
            <div className="space-y-1">
                <h3 className="text-sm text-text-tertiary font-bold tracking-widest uppercase">{title}</h3>
                {loading ? <div className="h-9 w-32 bg-foundation-lighter rounded animate-pulse mt-1"></div> : <p className="text-3xl font-orbitron font-bold text-white">{value}</p>}
            </div>
            <div className="bg-neon-surge/10 p-3 rounded-md">
                 <Icon className="h-6 w-6 text-neon-surge" />
            </div>
        </div>
        {loading ? <div className="h-5 w-24 bg-foundation-lighter rounded animate-pulse mt-4"></div> : (change && <p className="text-sm text-neon-surge mt-4">{change}</p>)}
    </div>
);

const GamePerformanceTable = () => {
    // This can be expanded to fetch real game data in a future iteration
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
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // In a real app, you'd fetch a specific document, e.g., 'live_stats'
                const response = await appwriteDatabases.listDocuments<AnalyticsData>(DATABASE_ID, ANALYTICS_COLLECTION_ID);
                if (response.documents.length > 0) {
                    setAnalytics(response.documents[0]);
                } else {
                    // Create some default data if none exists
                    const defaultData: Omit<AnalyticsData, keyof Models.Document> = {
                        totalWagered: 2120000, platformRTP: 99.08, activePlayers: 1428, totalProfit: 19316, wagerChange24h: 2.5
                    };
                    const doc = await appwriteDatabases.createDocument(DATABASE_ID, ANALYTICS_COLLECTION_ID, 'live_stats', defaultData);
                    setAnalytics(doc as AnalyticsData);
                }
            } catch (err) {
                console.error("Failed to fetch analytics", err);
                setError("Failed to load intelligence data.");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const formatCurrency = (value: number) => {
        if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
        if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
        return `$${value}`;
    }

    return (
        <div className="animate-fadeIn">
            <h1 className="font-orbitron text-3xl font-bold text-white mb-2">INTELLIGENCE DECK</h1>
            <p className="text-text-secondary mb-8">Real-time platform performance and game analytics.</p>
            
            {error && <div className="p-4 bg-red-900/50 text-red-300 border border-red-500 rounded-md mb-8">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard 
                    icon={Icons.dollarSign} 
                    title="Total Wagered" 
                    value={analytics ? formatCurrency(analytics.totalWagered) : '$0'} 
                    change={analytics ? `${analytics.wagerChange24h > 0 ? '+' : ''}${analytics.wagerChange24h}% last 24h` : undefined} 
                    loading={loading}
                />
                <StatCard 
                    icon={Icons.percent} 
                    title="Platform RTP" 
                    value={analytics ? `${analytics.platformRTP.toFixed(2)}%` : '0%'} 
                    loading={loading}
                />
                <StatCard 
                    icon={Icons.Users} 
                    title="Active Players" 
                    value={analytics ? analytics.activePlayers.toLocaleString() : '0'} 
                    loading={loading}
                />
                <StatCard 
                    icon={Icons.Zap} 
                    title="Total Profit" 
                    value={analytics ? formatCurrency(analytics.totalProfit) : '$0'} 
                    loading={loading}
                />
            </div>

            <Tabs tabs={['Game Performance', 'Player Metrics', 'Financials']}>
                <GamePerformanceTable />
                <div className="text-center py-16 text-text-tertiary">
                    <p>Player metrics visualizations coming soon.</p>
                </div>
                <div className="text-center py-16 text-text-tertiary">
                    <p>Financial reports coming soon.</p>
                </div>
            </Tabs>
        </div>
    );
};

export default AnalyticsPage;