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

const CasinoGridCard: React.FC<{ casino: Casino, onClick: () => void, style: React.CSSProperties }> = ({ casino, onClick, style }) => {
    const isEternalCrown = casino.specialRanking === 'ETERNAL CROWN';
    const ratingColor = casino.rating >= 4.5 ? 'text-neon-surge' : casino.rating >= 4.0 ? 'text-white' : 'text-yellow-400';

    return (
        <div 
            className={`p-0 overflow-hidden bg-foundation-light group flex flex-col animate-fadeIn relative rounded-lg card-lift
                ${isEternalCrown ? 'border border-neon-surge shadow-neon-card-hover' : 'border border-[#333] hover:border-neon-surge/50'}`} 
            style={style}
        >
            <div className={`p-4 border-b flex justify-between items-start bg-foundation relative ${isEternalCrown ? 'border-neon-surge/30' : 'border-[#333]'}`}>
                {isEternalCrown && (<div className="absolute inset-0 bg-neon-surge/5 animate-pulse-slow pointer-events-none"></div>)}
                
                <div className="flex items-center gap-4 relative z-10">
                    <div className="relative">
                        <img src={casino.logo} alt={casino.name} className={`w-12 h-12 rounded-full border bg-foundation-light p-0.5 ${isEternalCrown ? 'border-neon-surge' : 'border-[#333]'}`} />
                        {isEternalCrown && (<div className="absolute -top-1 -left-1 text-neon-surge drop-shadow-[0_0_8px_#00FFC0]"><Icons.Gem className="h-5 w-5 fill-neon-surge" /></div>)}
                    </div>
                    <div>
                        <h3 className="font-orbitron text-lg text-white uppercase truncate">{casino.name}</h3>
                        {casino.status === 'VERIFIED' ? (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-neon-surge uppercase tracking-widest mt-1"><Icons.Check className="h-3 w-3" /> ZAP-VERIFIED</span>
                        ) : (
                            <span className="flex items-center gap-1 text-[9px] font-bold text-yellow-400 uppercase tracking-widest mt-1"><Icons.AlertTriangle className="h-3 w-3" /> PENDING VETTING</span>
                        )}
                    </div>
                </div>
                
                <div className={`flex flex-col items-center justify-center h-10 w-10 rounded-full border relative z-10 ${isEternalCrown ? 'bg-neon-surge text-black border-neon-surge' : 'bg-foundation-light border-[#333]'}`}>
                    <span className={`font-jetbrains-mono text-sm font-bold ${ratingColor}`}>{casino.rating.toFixed(1)}</span>
                </div>
            </div>

            <div className="p-4 space-y-4 flex-1 relative">
                <div className="grid grid-cols-2 gap-px bg-[#333] border border-[#333] rounded overflow-hidden">
                    <div className="bg-foundation-light p-3 flex flex-col justify-center"><span className="text-text-tertiary text-[9px] font-jetbrains-mono uppercase mb-1 flex items-center gap-1"><Icons.Zap className="h-3 w-3 text-red-400" /> WITHDRAWAL</span><span className="text-white font-orbitron text-sm truncate" title={casino.withdrawalTime}>{casino.withdrawalTime}</span></div>
                    <div className="bg-foundation-light p-3 flex flex-col justify-center"><span className="text-text-tertiary text-[9px] font-jetbrains-mono uppercase mb-1 flex items-center gap-1"><Icons.Clock className="h-3 w-3 text-blue-400" /> EST.</span><span className="text-white font-orbitron text-sm">{casino.established}</span></div>
                </div>
                <div>
                    <span className="text-text-tertiary text-[9px] font-jetbrains-mono uppercase block mb-2 flex items-center gap-1"><Icons.Gift className="h-3 w-3 text-yellow-400" /> ACTIVE INTEL</span>
                    <p className="text-sm text-white font-medium leading-tight bg-foundation p-3 rounded border border-neon-surge/30 line-clamp-2 min-h-[42px] flex items-center">{casino.bonus}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                    {casino.tags.map(tag => (tag !== 'all' && <span key={tag} className="text-[10px] font-jetbrains-mono uppercase px-2 py-0.5 rounded-full bg-[#333] text-neon-surge border border-neon-surge/30">{tag.replace('-', ' ')}</span>))}
                </div>
            </div>

            <div className="p-4 pt-0 mt-auto relative z-10">
                <Button onClick={onClick} variant="secondary" className="w-full font-orbitron uppercase text-xs tracking-widest">
                    ACCESS INTEL UNIT →
                </Button>
            </div>
        </div>
    );
};

const CasinoListItem: React.FC<{ casino: Casino, onClick: () => void, style: React.CSSProperties }> = ({ casino, onClick, style }) => {
    const isEternalCrown = casino.specialRanking === 'ETERNAL CROWN';
    const ratingColor = casino.rating >= 4.5 ? 'text-neon-surge' : casino.rating >= 4.0 ? 'text-white' : 'text-yellow-400';
    
    return (
      <div 
        className={`bg-foundation-light border rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fadeIn transition-all duration-300 hover:border-neon-surge/50 hover:shadow-neon-card ${isEternalCrown ? 'border-neon-surge' : 'border-[#333]'}`} 
        style={style}
      >
        <img src={casino.logo} alt={casino.name} className="w-12 h-12 rounded-lg border bg-foundation p-1 border-[#333] flex-shrink-0" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-orbitron text-lg text-white uppercase truncate">{casino.name}</h3>
            {casino.status === 'VERIFIED' && <span className="flex items-center gap-1 text-[9px] font-bold text-neon-surge uppercase tracking-widest"><Icons.Check className="h-3 w-3" /> VERIFIED</span>}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-tertiary font-jetbrains-mono mt-1">
            <span className="flex items-center gap-1.5"><Icons.Zap className="h-3 w-3 text-red-400" /> {casino.withdrawalTime}</span>
            <span className="flex items-center gap-1.5"><Icons.Gift className="h-3 w-3 text-yellow-400" /> {casino.bonus}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto w-full sm:w-auto mt-4 sm:mt-0">
            <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg border bg-foundation border-[#333]">
                <span className={`font-jetbrains-mono text-lg font-bold ${ratingColor}`}>{casino.rating.toFixed(1)}</span>
                <span className="text-[9px] text-text-tertiary font-jetbrains-mono uppercase">SCORE</span>
            </div>
            <Button onClick={onClick} variant="secondary" className="w-full sm:w-auto font-orbitron uppercase text-xs tracking-widest h-12">
                INTEL →
            </Button>
        </div>
      </div>
    );
};


const CATEGORY_FILTERS = ['ALL', 'ZERO-EDGE', 'HIGH-BONUS', 'NEW', 'LIVE', 'SPORTS', 'CRYPTO'];

const CasinoDirectoryPage: React.FC = () => {
    const appContext = useContext(AppContext);
    const [casinos, setCasinos] = useState<Casino[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [filterCategory, setFilterCategory] = useState('ALL');
    const [minRating, setMinRating] = useState(3.0);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
    const [view, setView] = useState<'grid' | 'list'>('grid');

    useEffect(() => {
        const fetchCasinos = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await appwriteDatabases.listDocuments<Casino>(
                    DATABASE_ID,
                    CASINOS_COLLECTION_ID,
                    [Query.limit(100)] // Adjust limit as needed
                );
                setCasinos(response.documents as unknown as Casino[]);
            } catch (err) {
                console.error("Failed to fetch casinos:", err);
                setError("Failed to load operator grid data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchCasinos();
    }, []);

    const filteredCasinos = useMemo(() => {
        return casinos
            .filter(c => {
                const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = filterCategory === 'ALL' || c.tags.includes(filterCategory.toLowerCase());
                const matchesRating = c.rating >= minRating;
                const matchesVerified = !showVerifiedOnly || c.status === 'VERIFIED';
                return matchesSearch && matchesCategory && matchesRating && matchesVerified;
            })
            .sort((a, b) => {
                if (sortBy === 'rating') return b.rating - a.rating;
                if (sortBy === 'newest') return parseInt(b.established) - parseInt(a.established);
                return 0;
            });
    }, [casinos, searchTerm, sortBy, filterCategory, minRating, showVerifiedOnly]);

    const handleFilterClose = () => {
        if (isMobileFiltersOpen) setIsMobileFiltersOpen(false);
    }
    
    return (
        <div className="flex flex-col animate-fadeIn">

            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 flex-shrink-0 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Icons.Server className="h-8 w-8 text-neon-surge text-glow animate-pulse-slow" />
                        <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                            OPERATOR GRID
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] md:text-xs font-jetbrains-mono uppercase tracking-widest ml-1 md:ml-0">
                        <p className="text-neon-surge">// STATUS: LIVE</p>
                        <span className="text-[#333]">|</span>
                        <p className="text-text-tertiary">TRACKING {casinos.length} UNITS</p>
                        <span className="text-[#333] hidden sm:inline">|</span>
                        <p className="text-text-tertiary hidden sm:inline">LAST SYNC: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
                
                <Button 
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="md:hidden w-full flex items-center gap-2 justify-center bg-foundation-light text-neon-surge border border-neon-surge/30 hover:bg-foundation-lighter font-orbitron uppercase text-xs shadow-none"
                >
                    <Icons.Sliders className="h-4 w-4" /> ADJUST PARAMETERS
                </Button>
            </header>

            <div className="flex flex-1 gap-8 relative">
                <>
                    <div 
                        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isMobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                        onClick={handleFilterClose}
                    />
                    <div className={`fixed md:sticky top-0 h-full md:h-auto left-0 z-50 md:z-auto w-72 bg-foundation md:bg-transparent border-r border-[#333] md:border-none flex flex-col transition-transform duration-300 ease-out transform ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                        <div className="md:hidden p-4 border-b border-neon-surge/30 flex justify-between items-center bg-foundation">
                            <h3 className="font-orbitron text-white uppercase text-sm flex items-center gap-2"><Icons.Sliders className="h-4 w-4 text-neon-surge" /> SEARCH PARAMETERS</h3>
                            <button onClick={handleFilterClose} className="text-text-tertiary hover:text-neon-surge transition-colors p-1">
                                <Icons.X className="h-5 w-5" />
                            </button>
                        </div>

                        <Card className="h-full md:h-auto flex-1 md:flex-none overflow-y-auto custom-scrollbar p-5 bg-foundation border-[#333] md:sticky md:top-24 shadow-none md:shadow-xl">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-orbitron text-white uppercase text-sm mb-4 flex items-center gap-2">
                                        <Icons.Filter className="h-4 w-4 text-neon-surge" /> CLASSIFICATION TAGS
                                    </h3>
                                    <div className="space-y-1">
                                        {CATEGORY_FILTERS.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => { setFilterCategory(cat); handleFilterClose(); }}
                                                className={`w-full text-left px-3 py-2 rounded-[4px] font-orbitron uppercase text-xs transition-all flex justify-between items-center ${
                                                    filterCategory === cat 
                                                    ? 'bg-neon-surge/15 text-neon-surge border border-neon-surge/50 font-bold shadow-[0_0_10px_rgba(0,255,192,0.1)]' 
                                                    : 'text-text-tertiary hover:bg-foundation-light hover:text-white border border-transparent'
                                                }`}
                                            >
                                                <span>{cat.replace('-', ' ')}</span>
                                                {filterCategory === cat && <Icons.Check className="h-3 w-3" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-px bg-[#333] w-full"></div>
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-3 flex justify-between">
                                        <span>MIN ZAP SCORE</span>
                                        <span className="text-white font-bold">{minRating.toFixed(1)}+</span>
                                    </label>
                                    <Input 
                                        as="input" type="range" min="0" max="5" step="0.1" 
                                        value={minRating}
                                        onChange={(e) => setMinRating(Number(e.target.value))}
                                        className="w-full h-1.5 bg-[#333] rounded-lg appearance-none cursor-pointer p-0 accent-neon-surge"
                                    />
                                    <div className="flex justify-between text-[10px] text-[#666] font-jetbrains-mono mt-2">
                                        <span>0.0 (RISK)</span><span>5.0 (APEX)</span>
                                    </div>
                                </div>
                                <div className="h-px bg-[#333] w-full"></div>
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">INTEGRITY VETTING</label>
                                    <Toggle 
                                        checked={showVerifiedOnly} 
                                        onChange={setShowVerifiedOnly}
                                        label={<span className="text-xs font-orbitron flex items-center gap-2 text-white"><Icons.Shield className="h-4 w-4 text-neon-surge" /> VERIFIED ONLY</span>}
                                        description=""
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </>

                <div className="flex-1 flex flex-col min-w-0 md:ml-8 lg:ml-0 xl:ml-8">
                    <div className="mb-6 p-1.5 bg-foundation border border-neon-surge/20 rounded-lg flex flex-col sm:flex-row gap-2 shadow-[0_0_15px_rgba(0,255,192,0.05)]">
                        <div className="relative flex-1">
                            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary h-4 w-4" />
                            <Input placeholder="> QUERY GRID... [e.g., THE VAULT]" className="pl-10 bg-foundation-light border-transparent h-11 font-jetbrains-mono text-sm focus:border-neon-surge rounded-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <div className="flex items-center bg-foundation-light rounded-md">
                          <Input as="select" className="h-11 bg-transparent border-transparent rounded-md px-4 text-xs text-text-tertiary font-orbitron uppercase focus:border-neon-surge cursor-pointer hover:text-white transition-colors" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                              <option value="rating">SORT: ZAP SCORE (HIGH)</option>
                              <option value="newest">SORT: ESTABLISHED (NEW)</option>
                          </Input>
                          <div className="h-6 w-px bg-[#333]"></div>
                          <button onClick={() => setView('grid')} className={`h-11 w-11 flex items-center justify-center rounded-l-none rounded-r-md transition-colors ${view === 'grid' ? 'text-neon-surge bg-neon-surge/10' : 'text-text-tertiary hover:text-white'}`}>
                            <Icons.LayoutGrid className="h-5 w-5" />
                          </button>
                          <button onClick={() => setView('list')} className={`h-11 w-11 flex items-center justify-center rounded-l-none rounded-r-md transition-colors ${view === 'list' ? 'text-neon-surge bg-neon-surge/10' : 'text-text-tertiary hover:text-white'}`}>
                            <Icons.List className="h-5 w-5" />
                          </button>
                        </div>
                    </div>

                    {!loading && (<p className="mb-4 px-1 font-jetbrains-mono text-xs text-text-tertiary uppercase">// DISPLAYING <span className="text-white font-bold">{filteredCasinos.length}</span> INTEL UNITS</p>)}

                     {error && (
                        <div className="p-8 text-center bg-red-900/20 border border-red-500/50 rounded-xl text-red-400">
                            <Icons.AlertTriangle className="h-10 w-10 mx-auto mb-4" />
                            <h3 className="font-orbitron text-lg font-bold text-white mb-2">GRID CONNECTION FAILED</h3>
                            <p className="font-jetbrains-mono text-sm">{error}</p>
                        </div>
                    )}

                    <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-8" : "flex flex-col gap-4 pb-8"}>
                        {loading ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                        : filteredCasinos.length > 0 ? (
                            filteredCasinos.map((casino, index) => (
                                view === 'grid' 
                                ? <CasinoGridCard key={casino.id} casino={casino} onClick={() => appContext?.setViewingCasinoId(casino.id)} style={{ animationDelay: `${index * 50}ms` }} />
                                : <CasinoListItem key={casino.id} casino={casino} onClick={() => appContext?.setViewingCasinoId(casino.id)} style={{ animationDelay: `${index * 30}ms` }} />
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 bg-foundation border border-warning-high/50 rounded-xl p-8 text-center animate-fadeIn md:col-span-2 lg:col-span-2 xl:col-span-3 shadow-xl">
                                <Icons.SearchX className="h-16 w-16 text-warning-high/50 mb-4" />
                                <h3 className="font-orbitron text-xl text-white uppercase mb-2">SIGNAL LOST</h3>
                                <p className="text-text-tertiary font-jetbrains-mono text-sm max-w-md mx-auto">No operators matched your current parameters. Adjust the **ZAP SCORE** or **CLASSIFICATION TAGS**.</p>
                                <Button onClick={() => {setSearchTerm(''); setFilterCategory('ALL'); setMinRating(3.0); setShowVerifiedOnly(false);}} className="mt-6 text-black bg-neon-surge border border-neon-surge hover:bg-neon-surge/90 font-jetbrains-mono uppercase text-xs">
                                    RESET ALL PARAMETERS
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CasinoDirectoryPage;
