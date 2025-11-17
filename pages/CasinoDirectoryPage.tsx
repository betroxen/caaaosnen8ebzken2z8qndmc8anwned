import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Toggle } from '../components/Toggle';
import { SkeletonCard } from '../components/SkeletonCard';
import { Icons } from '../components/icons';
import { AppContext, appwriteDatabases, DATABASE_ID, CASINOS_COLLECTION_ID } from '../context/AppContext';
import { Models, Query } from 'appwrite';

// Define the Casino type based on your Appwrite collection structure
export interface Casino extends Models.Document {
    id: string;
    name: string;
    logo: string;
    bonus: string;
    description: string;
    tags: string[];
    rating: number;
    reviewCount: number;
    withdrawalTime: string;
    certified: boolean;
    status: 'VERIFIED' | 'UNVERIFIED';
    specialRanking?: string;
    established: string;
}

const CasinoGridCard: React.FC<{ casino: Casino, onClick: () => void, style?: React.CSSProperties }> = ({ casino, onClick, style }) => {
    const isEternalCrown = casino.specialRanking === 'ETERNAL CROWN';
    const ratingColor = casino.rating >= 4.5 ? 'text-neon-surge' : casino.rating >= 4.0 ? 'text-white' : 'text-yellow-400';

    return (
        <div 
            className={`p-0 overflow-hidden bg-foundation-light group flex flex-col animate-fadeIn relative rounded-xl card-lift cursor-pointer
                ${isEternalCrown ? 'border-2 border-neon-surge shadow-neon-card-hover' : 'border border-[#333] hover:border-neon-surge/50'}`} 
            style={style}
            onClick={onClick}
        >
             {isEternalCrown && (
                <div className="absolute -top-3 -right-3 z-10 p-2 bg-foundation rounded-full">
                    <Icons.Gem className="h-6 w-6 text-neon-surge fill-neon-surge drop-shadow-[0_0_10px_#00FFC0]" />
                </div>
            )}
            <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <img src={casino.logo} alt={`${casino.name} logo`} className="w-16 h-16 rounded-xl border-2 border-[#333] bg-foundation" />
                    <div className="flex-1">
                        <h3 className="font-orbitron text-xl font-bold text-white uppercase truncate group-hover:text-neon-surge transition-colors">{casino.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Icons.Star key={i} className={`h-4 w-4 ${i < Math.floor(casino.rating) ? 'fill-neon-surge text-neon-surge' : 'text-[#333]'}`} />
                                ))}
                            </div>
                            <span className={`text-sm font-jetbrains-mono font-bold ${ratingColor}`}>{casino.rating.toFixed(1)}</span>
                            <span className="text-xs text-text-tertiary font-jetbrains-mono">({casino.reviewCount})</span>
                        </div>
                    </div>
                </div>
                <p className="font-rajdhani text-sm text-text-secondary h-12 overflow-hidden mb-4">{casino.description.split('**')[0]}</p>
                 <div className="p-3 bg-foundation rounded-lg border border-neon-surge/20 text-center mb-4">
                    <p className="text-xs text-neon-surge/80 font-jetbrains-mono uppercase tracking-widest">BONUS SIGNAL</p>
                    <p className="text-sm text-white font-orbitron font-bold mt-1">{casino.bonus}</p>
                </div>
            </div>
            <div className="mt-auto p-4 bg-foundation border-t border-[#333] text-center">
                <span className="font-orbitron text-sm text-white uppercase tracking-wider group-hover:text-neon-surge transition-colors">
                    VIEW INTEL &rarr;
                </span>
            </div>
        </div>
    );
};


export const CasinoDirectoryPage: React.FC = () => {
    const appContext = useContext(AppContext);
    const [casinos, setCasinos] = useState<Casino[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        zapCertified: false,
        zeroEdge: false,
        noKyc: false,
    });

    useEffect(() => {
        const fetchCasinos = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await appwriteDatabases.listDocuments<Casino>(
                    DATABASE_ID,
                    CASINOS_COLLECTION_ID,
                    [Query.limit(50)] // Fetch up to 50 casinos
                );
                setCasinos(response.documents);
            } catch (err) {
                console.error("Failed to fetch casinos:", err);
                setError("Failed to load operator grid. Connection may be compromised.");
            } finally {
                setLoading(false);
            }
        };
        fetchCasinos();
    }, []);

    const filteredCasinos = useMemo(() => {
        return casinos.filter(casino => {
            const nameMatch = casino.name.toLowerCase().includes(searchTerm.toLowerCase());
            const certifiedMatch = !filters.zapCertified || casino.certified;
            const zeroEdgeMatch = !filters.zeroEdge || casino.tags.includes('zero-edge');
            const noKycMatch = !filters.noKyc || casino.tags.includes('no-kyc');
            return nameMatch && certifiedMatch && zeroEdgeMatch && noKycMatch;
        }).sort((a, b) => b.rating - a.rating);
    }, [casinos, searchTerm, filters]);

    const handleFilterChange = (filterName: keyof typeof filters, value: boolean) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const handleCardClick = (casinoId: string) => {
        appContext?.setViewingCasinoId(casinoId);
    };

    return (
        <div className="animate-fadeIn">
            <header className="text-center mb-12">
                <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    OPERATOR <span className="text-neon-surge">GRID</span>
                </h1>
                <p className="font-jetbrains-mono text-lg text-neon-surge/80 mt-6 max-w-4xl mx-auto">
                    {'>'} Raw, unfiltered intelligence on every major player in the circuit.
                </p>
            </header>
            
            <div className="sticky top-16 z-30 bg-foundation/80 backdrop-blur-md py-4 mb-8 rounded-b-xl border-b border-x border-[#333]">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary h-5 w-5" />
                        <Input 
                            placeholder="SEARCH OPERATOR..." 
                            className="pl-12 h-12 text-base font-orbitron tracking-wider"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 text-xs font-jetbrains-mono uppercase">
                        <label className="flex items-center gap-2 cursor-pointer text-white">
                            <input 
                                type="checkbox" 
                                className="accent-neon-surge w-4 h-4"
                                checked={filters.zapCertified}
                                onChange={(e) => handleFilterChange('zapCertified', e.target.checked)}
                            />
                            ZAP CERTIFIED
                        </label>
                         <label className="flex items-center gap-2 cursor-pointer text-white">
                            <input 
                                type="checkbox" 
                                className="accent-neon-surge w-4 h-4"
                                checked={filters.zeroEdge}
                                onChange={(e) => handleFilterChange('zeroEdge', e.target.checked)}
                            />
                            ZERO-EDGE
                        </label>
                         <label className="flex items-center gap-2 cursor-pointer text-white">
                            <input 
                                type="checkbox" 
                                className="accent-neon-surge w-4 h-4"
                                checked={filters.noKyc}
                                onChange={(e) => handleFilterChange('noKyc', e.target.checked)}
                            />
                            NO-KYC
                        </label>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            )}

            {error && (
                <div className="text-center py-20 bg-foundation-light border border-warning-high/30 rounded-lg">
                    <Icons.AlertTriangle className="h-12 w-12 mx-auto text-warning-high mb-4" />
                    <h3 className="font-orbitron text-xl text-white">GRID CONNECTION FAILED</h3>
                    <p className="text-text-secondary mt-2">{error}</p>
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCasinos.map(casino => (
                        <CasinoGridCard key={casino.id} casino={casino} onClick={() => handleCardClick(casino.id)} />
                    ))}
                </div>
            )}

            {!loading && !error && filteredCasinos.length === 0 && (
                 <div className="text-center py-20 bg-foundation-light border border-[#333] rounded-lg">
                    <Icons.SearchX className="h-12 w-12 mx-auto text-text-tertiary mb-4" />
                    <h3 className="font-orbitron text-xl text-white">NO OPERATORS MATCH SIGNAL</h3>
                    <p className="text-text-secondary mt-2">Adjust your filters or broaden your search query.</p>
                </div>
            )}
        </div>
    );
};