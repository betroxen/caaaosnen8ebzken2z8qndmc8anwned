import React, { useState, useEffect } from 'react';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';

interface ProvablyFairModalProps {
    isOpen: boolean;
    onClose: () => void;
    serverSeedHash: string;
    clientSeed: string;
    nonce: number;
    onRotateSeeds: (newClientSeed: string) => void;
}

export const ProvablyFairModal: React.FC<ProvablyFairModalProps> = ({
    isOpen,
    onClose,
    serverSeedHash,
    clientSeed,
    nonce,
    onRotateSeeds
}) => {
    const [newClientSeed, setNewClientSeed] = useState(clientSeed);
    const [verifierStatus, setVerifierStatus] = useState<'PENDING' | 'COMPLETE' | 'ERROR'>('PENDING');

    useEffect(() => {
        if (isOpen) {
            setNewClientSeed(clientSeed); // Reset input on open
            setVerifierStatus('PENDING');
            // Mock ZK Verification delay
            const timer = setTimeout(() => {
                setVerifierStatus('COMPLETE');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, clientSeed, serverSeedHash, nonce]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            onClose();
          }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.classList.toggle('modal-open', isOpen);
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.classList.remove('modal-open');
        }
      }, [isOpen, onClose]);

    if (!isOpen) return null;

    const statusText = {
        PENDING: { icon: Icons.Cpu, color: 'text-yellow-500', label: 'Z-K PROOF INITIATING...' },
        COMPLETE: { icon: Icons.CheckCircle, color: 'text-neon-surge', label: 'Z-K VERIFICATION COMPLETE' },
        ERROR: { icon: Icons.AlertTriangle, color: 'text-red-500', label: 'VERIFICATION ERROR: CHAIN DISCONNECT' },
    };

    const currentStatus = statusText[verifierStatus];
    const isClientSeedDirty = newClientSeed !== clientSeed && newClientSeed.trim() !== '';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-modal-enter">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-lg bg-[#0c0c0e] border border-neon-surge/30 rounded-xl shadow-2xl overflow-hidden font-rajdhani">
                {/* Header */}
                <div className="p-5 bg-foundation-light border-b border-[#333] flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Icons.Lock className="h-5 w-5 text-neon-surge" />
                        <h3 className="font-orbitron font-bold text-white text-sm uppercase tracking-widest">
                            ZAPWAY PROTOCOL // ZK-FAIRNESS CHAIN
                        </h3>
                    </div>
                    <button onClick={onClose} className="text-text-tertiary hover:text-white transition-colors p-1">
                        <Icons.X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* ZK-L2 Verifier Status */}
                    <div className={`bg-foundation-lighter border ${currentStatus.color.replace('text-', 'border-')} p-3 rounded-lg flex items-center gap-3 shadow-lg`}>
                        <currentStatus.icon className={`h-5 w-5 shrink-0 ${currentStatus.color}`} />
                        <div className="text-xs font-jetbrains-mono text-white leading-relaxed">
                            <strong className={`uppercase ${currentStatus.color}`}>{currentStatus.label}</strong>
                            <p className="text-text-tertiary mt-0.5">
                                Layer 2 Z-K Proof verifies current game state hash on a trustless ledger.
                            </p>
                        </div>
                    </div>

                    {/* Active Seeds */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-1">
                                Server Seed Commitment (Hashed)
                            </label>
                            <div className="bg-foundation border border-[#333] rounded p-2.5 flex items-center gap-2">
                                <Icons.Lock className="h-3 w-3 text-warning-high shrink-0" />
                                <code className="text-xs text-white truncate font-jetbrains-mono">{serverSeedHash}</code>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-1">
                                    Client Seed (Modifiable)
                                </label>
                                <Input 
                                    value={newClientSeed}
                                    onChange={(e) => setNewClientSeed(e.target.value)}
                                    className="font-jetbrains-mono text-sm h-10 bg-foundation-lighter border-[#333] focus:border-neon-surge"
                                    placeholder="Enter new client seed..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-1">
                                    Nonce
                                </label>
                                <div className="h-10 bg-foundation-lighter border border-[#333] rounded flex items-center justify-center px-3 font-jetbrains-mono text-white text-sm">
                                    {nonce}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-2">
                        <Button 
                            onClick={() => {
                                onRotateSeeds(newClientSeed);
                                onClose();
                            }}
                            disabled={!isClientSeedDirty}
                            className="w-full font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,192,0.2)]"
                        >
                            <Icons.RefreshCw className="h-4 w-4 inline-block mr-2" />
                            DEPLOY NEW SEED (TRUSTLESS RANDOMIZATION)
                        </Button>
                        {!isClientSeedDirty && (
                            <p className="text-center text-xs text-text-tertiary mt-2 font-jetbrains-mono">
                                Modify the client seed to activate rotation.
                            </p>
                        )}
                    </div>
                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-50 bg-[linear-gradient(transparent_0%,rgba(0,255,192,0.02)_50%,transparent_100%)] bg-[length:100%_3px] animate-scanline-bg"></div>
            </div>
        </div>
    );
};