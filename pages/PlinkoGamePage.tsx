import React, { useState, useMemo, useCallback, useContext } from 'react';
import { Icons } from '../components/icons';
import { Tabs } from '../components/Tabs';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { generatePlinkoPath, generateServerSeed, sha512 } from '../lib/crypto';
import { ToastContext } from '../context/ToastContext';


type RiskLevel = 'low' | 'medium' | 'high';
type GameState = 'idle' | 'playing';

const MULTIPLIERS: Record<RiskLevel, Record<number, number[]>> = {
    low: { 8: [0.5,0.6,0.7,0.8,1,1.2,1.4,1.6,2], 10: [0.5,0.6,0.7,0.8,0.9,1,1.2,1.5,1.8,2.5,4], 12: [0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.5,2,3,5,8], 14: [0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.3,1.6,2,3,5,10,18], 16: [0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.4,1.6,1.8,2,2.5,3,4,5], },
    medium: { 8: [0.3,0.5,0.7,1.2,1.5,2,3,5,9], 10: [0.3,0.5,0.7,1.1,1.4,2,3,5,10,17,30], 12: [0.2,0.4,0.6,0.9,1.2,1.5,2,4,8,16,32,64,120], 14: [0.2,0.3,0.5,0.7,1,1.5,2.5,5,10,20,40,80,160,320,640], 16: [0.2,0.3,0.4,0.6,0.9,1.2,1.5,2,3,5,8,12,18,27,40,60,120], },
    high: { 8: [0.1,0.3,0.5,1.5,3,6,12,25,100], 10: [0,0.2,0.4,1,3,8,15,30,100,300,1000], 12: [0,0.2,0.4,0.8,1.5,4,10,30,100,300,1000,3000,10000], 14: [0,0.1,0.3,0.6,1,2,5,20,80,250,800,2500,8000,25000,50000], 16: [0,0.1,0.2,0.5,1,3,8,20,50,150,300,500,1000,2500,5000,10000,30000], },
};

const PlinkoGamePage: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [betAmount, setBetAmount] = useState(1.0);
    const [riskLevel, setRiskLevel] = useState<RiskLevel>('medium');
    const [rows, setRows] = useState(8);
    const [gameHistory, setGameHistory] = useState<any[]>([]);
    const [balls, setBalls] = useState<any[]>([]);
    const toastContext = useContext(ToastContext);

    // --- Provably Fair State ---
    const [clientSeed, setClientSeed] = useState('zap-player-default-seed');
    const [serverSeed, setServerSeed] = useState(() => generateServerSeed());
    const [hashedServerSeed, setHashedServerSeed] = useState(() => sha512(serverSeed));
    const [nonce, setNonce] = useState(1);

    const boardMultipliers = MULTIPLIERS[riskLevel][rows as 8 | 10 | 12 | 14 | 16];

    // This generatePath is for VISUALS ONLY. The outcome is determined by the crypto lib.
    const generateVisualPath = (endIndex: number) => {
        const path = [{ x: 50, y: 5 }];
        let currentX = 50;
        let rightMoves = endIndex;
        let leftMoves = rows - endIndex;

        for (let i = 0; i < rows; i++) {
            const rowWidth = i * 5 + 5;
            let move;
            if (rightMoves > 0 && (leftMoves === 0 || Math.random() < rightMoves / (rightMoves + leftMoves))) {
                move = 1;
                rightMoves--;
            } else {
                move = -1;
                leftMoves--;
            }
            
            currentX += move * 2.5;
            currentX = Math.max(50 - rowWidth / 2, Math.min(50 + rowWidth / 2, currentX));
            path.push({ x: currentX, y: i * 7.5 + 5 });
        }
        
        const bucketWidth = 100 / boardMultipliers.length;
        path.push({ x: (endIndex * bucketWidth) + (bucketWidth / 2) , y: rows * 7.5 + 15 });

        return path;
    };


    const handlePlay = useCallback(() => {
        if (gameState === 'playing') return;
        setGameState('playing');

        const endIndex = generatePlinkoPath(serverSeed, clientSeed, nonce, rows);
        const multiplier = boardMultipliers[endIndex];
        const profit = (betAmount * multiplier) - betAmount;

        const newBall = {
            id: Date.now() + Math.random(),
            path: generateVisualPath(endIndex),
            profit,
            multiplier,
            color: profit > 0 ? 'bg-neon-surge' : (profit < 0 ? 'bg-warning-high' : 'bg-text-tertiary'),
        };

        setBalls(prev => [...prev, newBall]);

        setTimeout(() => {
            setGameHistory(prev => [{ bet: betAmount, multiplier, profit, nonce }, ...prev].slice(0, 10));
            setBalls(prev => prev.filter(b => b.id !== newBall.id));
            setGameState('idle');
            setNonce(prev => prev + 1);
        }, 4000);

    }, [betAmount, gameState, rows, boardMultipliers, serverSeed, clientSeed, nonce]);
    
     const changeSeeds = () => {
        const newServerSeed = generateServerSeed();
        setServerSeed(newServerSeed);
        setHashedServerSeed(sha512(newServerSeed));
        setNonce(1);
        toastContext?.showToast('New server seed generated and hashed.', 'success');
    };

    const pegs = useMemo(() => {
        const pegArray: { x: number, y: number }[] = [];
        for (let i = 0; i < rows; i++) {
            const numPegs = i + 2;
            const y = i * 7.5 + 10;
            const spacing = (i + 1) * 5;
            for (let j = 0; j < numPegs; j++) {
                const x = 50 - spacing/2 + j * (spacing / (numPegs-1));
                pegArray.push({ x, y });
            }
        }
        return pegArray;
    }, [rows]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-foundation-light p-6 border border-[#333] rounded-lg card-lift">
                    <Tabs tabs={['MANUAL', 'PROVABLY FAIR']}>
                        {/* Manual Controls */}
                        <div>
                            <h2 className="font-orbitron text-2xl text-neon-surge mb-4">PLINKO SIMULATOR</h2>
                            <div>
                                <label className="text-sm text-text-tertiary font-bold tracking-widest">BET AMOUNT</label>
                                <Input type="number" value={betAmount} onChange={e => setBetAmount(parseFloat(e.target.value))} className="mt-2 text-lg" />
                            </div>
                            <div className="mt-4">
                                <label className="text-sm text-text-tertiary font-bold tracking-widest">RISK</label>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {(['low', 'medium', 'high'] as RiskLevel[]).map(r => (
                                        <button key={r} onClick={() => setRiskLevel(r)} className={`py-2 rounded uppercase font-bold text-xs transition ${riskLevel === r ? 'bg-neon-surge text-black' : 'bg-foundation-lighter text-text-secondary hover:bg-foundation-lighter/50'}`}>{r}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm text-text-tertiary font-bold tracking-widest">ROWS: {rows}</label>
                                <input type="range" min="8" max="16" step="2" value={rows} onChange={e => setRows(parseInt(e.target.value))} className="w-full h-2 bg-neon-surge/20 rounded-lg appearance-none cursor-pointer mt-2"/>
                            </div>
                            <button onClick={handlePlay} disabled={gameState === 'playing'} className="w-full mt-6 bg-neon-surge text-black py-4 font-orbitron font-bold text-lg uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-neon-glow-md disabled:bg-foundation-lighter disabled:text-text-tertiary">DROP BALL</button>
                        </div>
                        {/* Provably Fair Controls */}
                        <div className="space-y-4">
                             <h2 className="font-orbitron text-lg text-neon-surge mb-2">SEED CONTROLS</h2>
                             <div>
                                 <label className="text-xs text-text-tertiary font-bold tracking-widest">CLIENT SEED</label>
                                 <Input value={clientSeed} onChange={e => setClientSeed(e.target.value)} disabled={gameState === 'playing'} className="mt-1" />
                             </div>
                             <div>
                                 <label className="text-xs text-text-tertiary font-bold tracking-widest">HASHED SERVER SEED</label>
                                 <Input value={hashedServerSeed} readOnly disabled className="mt-1 bg-foundation-lighter" />
                             </div>
                              <div>
                                 <label className="text-xs text-text-tertiary font-bold tracking-widest">NONCE</label>
                                 <Input type="number" value={nonce} onChange={e => setNonce(Number(e.target.value))} disabled={gameState === 'playing'} className="mt-1" />
                             </div>
                             <Button onClick={changeSeeds} disabled={gameState === 'playing'} variant="ghost" size="sm" className="w-full">
                                <Icons.RefreshCw className="h-4 w-4 mr-2" /> GENERATE NEW SEED PAIR
                             </Button>
                        </div>
                    </Tabs>
                </div>

                <div className="bg-foundation-light p-6 border border-[#333] rounded-lg card-lift">
                     <h3 className="font-orbitron text-lg text-neon-surge mb-4">GAME LOG</h3>
                     <div className="space-y-2 text-sm font-jetbrains-mono">
                        {gameHistory.length === 0 && <p className="text-text-tertiary">No games played yet.</p>}
                        {gameHistory.map((game, i) => (
                            <div key={i} className={`flex justify-between p-2 rounded ${game.profit > 0 ? 'bg-neon-surge/10' : 'bg-warning-high/10'}`}>
                                <span>Nonce: {game.nonce} | {game.multiplier.toFixed(2)}x</span>
                                <span className={game.profit > 0 ? 'text-neon-surge' : 'text-warning-high'}>{game.profit.toFixed(2)}</span>
                            </div>
                        ))}
                     </div>
                </div>
            </div>

            <div className="lg:col-span-2 aspect-[4/5] bg-foundation-light border border-[#333] rounded-lg relative overflow-hidden flex flex-col items-center p-4">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"><source src="https://files.catbox.moe/rg0upq.mp4" type="video/mp4" /></video>
                <div className="absolute inset-0 bg-foundation-light/80 z-0"></div>

                <div className="relative w-full h-[90%] z-10">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute top-0 left-0">
                        {pegs.map((peg, i) => <circle key={i} cx={peg.x} cy={peg.y} r="0.5" fill="#4A4A4A" />)}
                    </svg>
                     {balls.map(ball => (
                        <div key={ball.id} className={`absolute w-3 h-3 rounded-full ${ball.color} shadow-lg`} style={{ 
                            offsetPath: `path("M ${ball.path.map((p: any) => `${p.x} ${p.y}`).join(' L ')}")`,
                            animation: `move 4s cubic-bezier(0.25, 0.1, 0.5, 1) forwards`,
                            top: 0,
                            left: 0
                        }}>
                            <style>{`@keyframes move { 100% { offset-distance: 100%; } }`}</style>
                        </div>
                    ))}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-[10%] flex justify-center z-10">
                    {boardMultipliers.map((m, i) => {
                        let colorClass = 'bg-foundation-lighter/50 text-text-secondary';
                        if (m >= 1000) colorClass = 'bg-purple-500/30 text-purple-300';
                        else if (m >= 100) colorClass = 'bg-yellow-500/30 text-yellow-300';
                        else if (m >= 10) colorClass = 'bg-red-500/30 text-red-400';
                        else if (m >= 2) colorClass = 'bg-neon-surge/30 text-neon-surge';
                        
                        return ( <div key={i} className={`h-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${colorClass}`} style={{ width: `${100 / boardMultipliers.length}%` }}>{m}x</div> )
                    })}
                </div>
            </div>
        </div>
    );
};

export default PlinkoGamePage;