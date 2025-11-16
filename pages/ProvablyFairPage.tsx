import React, { useState, useEffect, useRef, useCallback } from 'react';

// Import actual components from the project structure
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

// Declare global variable for CryptoJS dependency
declare global {
    interface Window {
        CryptoJS: any;
    }
}

const ProvablyFairPage: React.FC = () => {
    // --- STATE MANAGEMENT ---
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logContainerRef = useRef<HTMLDivElement>(null);

    const [serverSeed, setServerSeed] = useState('a1b2c3d4e5f6789012345678901234567890123456789012345678901234');
    const [clientSeed, setClientSeed] = useState('zap_player_42');
    const [nonce, setNonce] = useState(1);
    const [cursor, setCursor] = useState(0);
    const [gameType, setGameType] = useState('DICE'); // DICE | PLINKO | FLOAT | MINES

    // Game Specific Inputs
    const [plinkoRows, setPlinkoRows] = useState(16);
    const [minesCount, setMinesCount] = useState(3);
    const [isVerifying, setIsVerifying] = useState(false);

    const [hashedServerSeed, setHashedServerSeed] = useState('');
    const [verifierLog, setVerifierLog] = useState<{ timestamp: string; type: string; result: React.ReactNode }[]>([]);

    // --- KINETIC EFFECTS (Canvas Animation) ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles: any[] = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.fillStyle = `rgba(0, 255, 192, ${p.opacity * 0.5})`; // Neon Teal
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap particles around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Scroll to bottom of log when a new entry is added
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [verifierLog]);

    // --- CRYPTOGRAPHIC CORE ---
    useEffect(() => {
        if (window.CryptoJS && serverSeed) {
             setHashedServerSeed(window.CryptoJS.SHA512(serverSeed).toString());
        }
    }, [serverSeed]);

    const hmacSha512 = useCallback((key: string, message: string) => {
        if (!window.CryptoJS) return '';
        try {
            return window.CryptoJS.HmacSHA512(message, key).toString();
        } catch (error) {
            console.error("HMAC-SHA512 Failed: CryptoJS not found.", error);
            return '';
        }
    }, []);

    const generateFloat = useCallback((currentCursor: number) => {
        const hash = hmacSha512(serverSeed, `${clientSeed}:${nonce}:${currentCursor}`);
        if (!hash) throw new Error("Cryptographic engine failure.");
        const hexSegment = hash.substring(0, 14);
        const bytes = parseInt(hexSegment, 16);
        return bytes / Math.pow(2, 56);
    }, [serverSeed, clientSeed, nonce, hmacSha512]);

    const generateInteger = useCallback((maxExclusive: number, startCursor: number) => {
        const float = generateFloat(startCursor);
        return { 
            value: Math.floor(float * maxExclusive), 
            nextCursor: startCursor + 1 
        };
    }, [generateFloat]);

    const logResult = useCallback((type: string, content: React.ReactNode) => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
        const timestamp = `${timeString}.${milliseconds}`;
        setVerifierLog(prev => [{ timestamp, type, result: content }, ...prev].slice(0, 10));
    }, []);

    // --- GAME VERIFIERS ---
    const verifyDice = useCallback(() => {
        const float = generateFloat(cursor);
        const roll = (float * 10001) / 100;
        logResult('DICE', 
            <span className="animate-glitch-reveal">
                ROLLED: <strong className="text-[#00FFC0] text-xl tabular-nums">{roll.toFixed(4)}</strong>
            </span>
        );
    }, [cursor, generateFloat, logResult]);

    const verifyFloat = useCallback(() => {
        const float = generateFloat(cursor);
        logResult('FLOAT', 
            <span className="animate-glitch-reveal">
                RAW VALUE: <strong className="text-[#00FFC0] text-lg tabular-nums">{float.toFixed(18)}</strong>
            </span>
        );
    }, [cursor, generateFloat, logResult]);

    const verifyPlinko = useCallback(() => {
        let currentCursor = cursor;
        let bucket = 0;
        for (let i = 0; i < plinkoRows; i++) {
            const float = generateFloat(currentCursor);
            currentCursor++;
            if (float >= 0.5) {
                bucket += 1;
            } 
        }
        logResult(`PLINKO (R:${plinkoRows})`, 
            <span className="animate-glitch-reveal">
                PATH: <strong className="text-[#00FFC0] text-xl">{bucket}</strong> / {plinkoRows} <span className="text-xs text-[#8d8c9e] ml-2">({plinkoRows} RNG calls consumed)</span>
            </span>
        );
    }, [cursor, plinkoRows, generateFloat, logResult]);

    const verifyMines = useCallback(() => {
        const boardSize = 25;
        const availableTiles = Array.from({ length: boardSize }, (_, i) => i);
        const positions = [];
        let currentCursor = cursor;
        const count = Math.min(24, Math.max(1, minesCount));

        for (let i = 0; i < count; i++) {
            const result = generateInteger(availableTiles.length, currentCursor);
            currentCursor = result.nextCursor;
            const pickIndex = result.value;
            positions.push(availableTiles[pickIndex]);
            availableTiles.splice(pickIndex, 1);
        }
        positions.sort((a, b) => a - b);

        logResult(`MINES (C:${count})`, (
            <div className="animate-glitch-reveal">
                <div className="mb-2 text-[#E0E0E0]">MINE LOCATIONS (0-24, {count} picks):</div>
                <div className="flex flex-wrap gap-2">
                    {positions.map(pos => (
                        <span key={pos} className="bg-red-800/50 text-red-300 border border-red-900 px-2 py-0.5 rounded-md font-bold text-xs shadow-inner shadow-red-950">
                            {pos.toString().padStart(2, '0')}
                        </span>
                    ))}
                </div>
            </div>
        ));
    }, [cursor, minesCount, generateInteger, logResult]);

    const executeVerify = useCallback(async () => {
        if (isVerifying) return;
        setIsVerifying(true);
        logResult('STATUS', <span className="text-yellow-400">EXECUTING AUDIT (K:{cursor})...</span>);
        await new Promise(resolve => setTimeout(resolve, 300));

        try {
            switch (gameType) {
                case 'DICE': verifyDice(); break;
                case 'FLOAT': verifyFloat(); break;
                case 'PLINKO': verifyPlinko(); break;
                case 'MINES': verifyMines(); break;
            }
            logResult('SUCCESS', <span className="text-[#00FFC0] font-bold">AUDIT COMPLETE. RESULT VERIFIED.</span>);
        } catch (e: any) {
            logResult('ERROR', <span className="text-red-500 font-bold">CRITICAL: {e.message || "Unknown error."}</span>);
        } finally {
            setIsVerifying(false);
        }
    }, [isVerifying, gameType, verifyDice, verifyFloat, verifyPlinko, verifyMines, logResult, cursor]);

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-sans relative overflow-hidden">
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen" />

            <div className="container mx-auto max-w-7xl p-4 py-12 md:py-20 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#00FFC0]/10 border border-[#00FFC0]/40 rounded-full mb-6 shadow-md shadow-[#00FFC0]/10">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFC0] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FFC0]"></span>
                        </span>
                        <span className="text-[#00FFC0] font-mono text-xs uppercase tracking-[0.2em] font-extrabold">HYPER-AUDIT CORE INITIATED</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-4 tracking-tighter [text-shadow:0_0_10px_rgba(0,255,192,0.3)]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00FFC0]">THE CODE</span> IS THE CONTRACT.
                    </h1>
                    <p className="text-lg text-[#8d8c9e] font-medium max-w-3xl mx-auto">
                        Validate **every single round**. Paste the revealed Server Seed, match your Client Seed and Nonce, and prove the result is exactly what you saw.
                    </p>
                </div>

                <Card className="bg-[#14131c] backdrop-blur-xl border-[#00FFC0]/30 p-0 overflow-hidden shadow-[0_0_50px_rgba(0,255,192,0.15),inset_0_0_10px_rgba(0,255,192,0.05)] relative">
                    <div className="bg-[#0A0A0A] p-4 border-b border-[#00FFC0]/30 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Icons.Terminal className="h-6 w-6 text-[#00FFC0]" />
                            <span className="font-mono text-white text-base uppercase tracking-widest font-bold">ZAPWAY AUDIT CONSOLE V3.0</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3.5 h-3.5 rounded-full bg-red-700/50 border border-red-500/70"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-yellow-700/50 border border-yellow-500/70"></div>
                            <div className="w-3.5 h-3.5 rounded-full bg-[#00FFC0]/50 border border-[#00FFC0] animate-pulse"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
                        <div className="lg:col-span-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#333]/70 bg-[#1A1A1A]/70">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[#00FFC0] text-xs uppercase font-mono tracking-wider mb-2 block">Server Seed (Revealed)</label>
                                    <Input 
                                        value={serverSeed}
                                        onChange={(e) => setServerSeed(e.target.value)}
                                        className="font-mono text-xs bg-[#0A0A0A] h-12"
                                        placeholder="Paste revealed server seed..."
                                    />
                                    <div className="mt-3 p-3 bg-black/50 rounded border border-[#333] text-[10px] font-mono text-[#8d8c9e] break-all shadow-inner shadow-black/70">
                                        <span className="text-[#00FFC0] mr-2">[HASH]</span> 
                                        {hashedServerSeed || '... WAITING FOR INPUT ...'}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[#00FFC0] text-xs uppercase font-mono tracking-wider mb-2 block">Client Seed (Your Input)</label>
                                    <Input 
                                        value={clientSeed}
                                        onChange={(e) => setClientSeed(e.target.value)}
                                        className="font-mono text-xs bg-[#0A0A0A] h-12"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[#8d8c9e] text-xs uppercase font-mono tracking-wider mb-2 block">Nonce (Game ID)</label>
                                        <Input 
                                            type="number" 
                                            value={nonce}
                                            onChange={(e) => setNonce(Number(e.target.value))}
                                            className="font-mono bg-[#0A0A0A] tabular-nums"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[#8d8c9e] text-xs uppercase font-mono tracking-wider mb-2 block">Cursor (RNG Index)</label>
                                        <Input 
                                            type="number" 
                                            value={cursor}
                                            onChange={(e) => setCursor(Number(e.target.value))}
                                            className="font-mono bg-[#0A0A0A] tabular-nums"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 p-6 md:p-8 flex flex-col">
                            <div className="flex flex-wrap gap-1 mb-8 p-1 bg-[#0A0A0A] border border-[#333] rounded-xl shadow-inner shadow-black/70">
                                {['DICE', 'PLINKO', 'MINES', 'FLOAT'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setGameType(type)}
                                        disabled={isVerifying}
                                        className={`flex-1 py-3 text-xs font-mono uppercase rounded-lg transition-all ${gameType === type ? 'bg-[#00FFC0] text-black font-extrabold shadow-lg shadow-[#00FFC0]/30' : 'text-[#8d8c9e] hover:bg-[#1A1A1A] hover:text-white'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="mb-8 min-h-[60px]">
                                {gameType === 'PLINKO' && (
                                    <div className="animate-fadeIn">
                                        <label className="text-[#8d8c9e] text-xs uppercase font-mono tracking-wider mb-2 block">Plinko Rows (RNG calls)</label>
                                        <Input 
                                            as="select"
                                            value={plinkoRows} onChange={(e) => setPlinkoRows(Number(e.target.value))}
                                            className="w-full h-11 bg-[#0A0A0A] border border-[#333] rounded-lg px-4 text-sm text-white font-mono focus:border-[#00FFC0]"
                                            disabled={isVerifying}
                                        >
                                            {[8, 10, 12, 14, 16].map(r => <option key={r} value={r}>{r} ROWS (Needs {r} Cursors)</option>)}
                                        </Input>
                                    </div>
                                )}
                                {gameType === 'MINES' && (
                                    <div className="animate-fadeIn">
                                        <label className="text-[#8d8c9e] text-xs uppercase font-mono tracking-wider mb-2 block">Mines Count (1-24 Picks)</label>
                                        <Input 
                                            type="number" min="1" max="24"
                                            value={minesCount} 
                                            onChange={(e) => setMinesCount(Math.min(24, Math.max(1, Number(e.target.value))))}
                                            className="font-mono bg-[#0A0A0A]"
                                            disabled={isVerifying}
                                        />
                                    </div>
                                )}
                                {(gameType === 'DICE' || gameType === 'FLOAT') && (
                                    <div className="text-[#8d8c9e] text-xs font-mono flex items-center h-full opacity-50 uppercase mt-4">
                                        // RNG FUNCTION: Requires 1 cursor (C:{cursor}) for calculation.
                                    </div>
                                )}
                            </div>

                            <Button 
                                onClick={executeVerify} 
                                disabled={isVerifying || !serverSeed || !clientSeed}
                                size="lg" 
                                className="w-full py-5 font-mono uppercase tracking-[0.3em] text-lg shadow-[0_0_40px_rgba(0,255,192,0.4)] transition-all duration-300 transform active:scale-[0.99]"
                            >
                                {isVerifying ? 'CALCULATING...' : `RUN ${gameType} AUDIT`}
                            </Button>

                            <div className="mt-8 flex-1 bg-[#050505]/90 rounded-xl border border-[#00FFC0]/20 p-6 font-mono text-sm overflow-y-auto custom-scrollbar shadow-[inset_0_0_30px_rgba(0,0,0,0.9),0_0_10px_rgba(0,255,192,0.05)] relative min-h-[200px]" ref={logContainerRef}>
                                {verifierLog.length === 0 ? (
                                    <div className="h-full flex items-center justify-center text-[#333] uppercase tracking-widest">
                                        INITIATING AUDIT LOG SEQUENCE...
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {verifierLog.map((log, i) => (
                                            <div key={i} className={`flex gap-3 leading-snug ${i === 0 ? 'opacity-100 font-medium' : 'opacity-70 text-[#8d8c9e]'}`}>
                                                <span className="text-[#666] shrink-0 tabular-nums">[{log.timestamp}]</span>
                                                <span className={`font-bold shrink-0 ${log.type.includes('ERROR') ? 'text-red-500' : 'text-[#00FFC0]'} w-20`}>[{log.type.padEnd(5, '.')}]</span>
                                                <span className="text-[#E0E0E0] break-words flex-1">{log.result}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="absolute bottom-6 left-6 flex gap-2 text-[#00FFC0] mt-4">
                                    <span className="opacity-90">READY</span><span className="animate-pulse">_</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="p-8 bg-[#1a1a1a] border-[#333] hover:border-[#00FFC0] group shadow-xl shadow-black/30">
                        <Icons.Lock className="h-9 w-9 text-[#00FFC0] mb-4 group-hover:text-white transition-colors" />
                        <h3 className="font-mono text-white uppercase mb-2 text-lg tracking-widest">SERVER LOCK</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            We commit to the **Server Seed** by showing you its irrevocable hash. This is the **Digital Signature** we cannot change.
                        </p>
                    </Card>
                    <Card className="p-8 bg-[#1a1a1a] border-[#333] hover:border-[#00FFC0] group shadow-xl shadow-black/30">
                        <Icons.Users className="h-9 w-9 text-[#00FFC0] mb-4 group-hover:text-white transition-colors" />
                        <h3 className="font-mono text-white uppercase mb-2 text-lg tracking-widest">CLIENT INJECTION</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Your **Client Seed** is the critical entropy. Combined with our seed, it ensures the resulting HMAC-SHA512 hash sequence is uniquely yours.
                        </p>
                    </Card>
                    <Card className="p-8 bg-[#1a1a1a] border-[#333] hover:border-[#00FFC0] group shadow-xl shadow-black/30">
                        <Icons.Eye className="h-9 w-9 text-[#00FFC0] mb-4 group-hover:text-white transition-colors" />
                        <h3 className="font-mono text-white uppercase mb-2 text-lg tracking-widest">IRREFUTABLE PROOF</h3>
                        <p className="text-sm text-[#8d8c9e] leading-relaxed">
                            Once the seed is revealed, the hash sequence and game outcome are provably identical. Trust is not assumed; it is **Calculated**.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProvablyFairPage;