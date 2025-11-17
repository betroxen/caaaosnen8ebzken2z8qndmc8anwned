import React, { useState, useEffect, useRef, useContext } from 'react';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';
import { ZapLogo } from './ZapLogo';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab }) => {
    const appContext = useContext(AppContext);
    const toastContext = useContext(ToastContext);

    const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [passwordStrength, setPasswordStrength] = useState(0);
    const [handleAvailable, setHandleAvailable] = useState<boolean | null>(null);
    const [isCheckingHandle, setIsCheckingHandle] = useState(false);
    const handleTimeoutRef = useRef<any>(null);

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
            resetForm();
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [isOpen, initialTab]);

    useEffect(() => {
        if (!password) {
            setPasswordStrength(0);
            return;
        }
        let score = 0;
        if (password.length >= 12) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[!@#$%^&*]/.test(password)) score++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
        setPasswordStrength(score);
    }, [password]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setConfirmPassword('');
        setTermsAccepted(false);
        setPasswordStrength(0);
        setHandleAvailable(null);
        setError('');
        setIsLoading(false);
    }

    const checkHandle = () => {
        if (handleTimeoutRef.current) clearTimeout(handleTimeoutRef.current);
        if (username.length < 3) { setHandleAvailable(null); return; }
        
        setIsCheckingHandle(true);
        handleTimeoutRef.current = setTimeout(() => {
            // This is a mock check. In production, this would be an Appwrite Function call.
            const isAvailable = !['taken', 'admin', 'zap'].includes(username.toLowerCase());
            setHandleAvailable(isAvailable); 
            setIsCheckingHandle(false);
        }, 600);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (activeTab === 'login') {
                if (!email || !password) { throw new Error('AUTH_ERR: CREDENTIALS MISSING'); }
                await appContext?.login(email, password);
                toastContext?.showToast('CONNECTION ESTABLISHED. Welcome back, Operator.', 'success');
            } else {
                if (!username || !email || !password || !confirmPassword) { throw new Error('AUTH_ERR: ALL FIELDS MANDATORY'); }
                if (password !== confirmPassword) { throw new Error('AUTH_ERR: PASSKEY MISMATCH'); }
                if (passwordStrength < 3) { throw new Error('AUTH_ERR: PASSKEY STRENGTH INSUFFICIENT'); }
                if (!termsAccepted) { throw new Error('AUTH_ERR: AFFIRMATION PROTOCOL REQUIRED'); }
                if (handleAvailable === false) { throw new Error('AUTH_ERR: HANDLE UNAVAILABLE'); }

                await appContext?.register(username, email, password);
                toastContext?.showToast('PROFILE CREATED. Welcome to the Grid, Operator.', 'success');
            }
            onClose();
        } catch (err: any) {
            setError(err.message || 'An unknown authentication error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const isLoginValid = email.length > 0 && password.length > 0;
    const isRegisterValid = username.length > 2 && email.length > 0 && password.length >= 12 && password === confirmPassword && termsAccepted && passwordStrength >= 3 && handleAvailable === true;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:py-8 bg-black/80 backdrop-blur-md animate-modal-enter">
            <div className="relative w-full sm:max-w-md max-h-[95vh] flex flex-col bg-foundation border border-neon-surge/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8),_0_0_20px_rgba(0,255,192,0.2)] overflow-hidden">
                <Button variant="ghost" onClick={onClose} className="absolute top-4 right-4 text-text-tertiary hover:text-neon-surge h-auto p-2 z-20">
                    <Icons.X className="h-5 w-5" />
                </Button>

                <div className="flex-shrink-0 p-6 pt-8 text-center relative z-10 bg-foundation">
                    <ZapLogo className="mx-auto mb-4 inline-block shadow-neon-card" iconClassName="h-10 w-10" />
                    <h2 className="font-orbitron font-bold text-xl text-white uppercase tracking-widest text-glow">
                        {activeTab === 'login' ? 'WELCOME BACK, OPERATOR' : 'INITIATE NEW PROFILE'}
                    </h2>
                    <p className="text-xs font-jetbrains-mono text-neon-surge mt-2 tracking-wider opacity-80">
                        {activeTab === 'login' ? '// AUTHENTICATION REQUIRED' : '// SECURE YOUR SPOT ON THE GRID'}
                    </p>
                </div>

                <div className="p-6 pt-3 overflow-y-auto custom-scrollbar flex-1 bg-foundation-light">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {activeTab === 'register' && (
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-jetbrains-mono text-text-secondary uppercase ml-1">Handle (Alias)</label>
                                    {!isCheckingHandle && handleAvailable !== null && (
                                        <span className={`text-xs font-jetbrains-mono uppercase ${handleAvailable ? 'text-neon-surge text-glow' : 'text-warning-high'}`}>
                                            {handleAvailable ? '// VPR AVAILABLE' : '// ALIAS TAKEN'}
                                        </span>
                                    )}
                                     {isCheckingHandle && <span className="text-xs font-jetbrains-mono text-text-secondary animate-pulse">// SCANNING...</span>}
                                </div>
                                <div className="relative">
                                    <Icons.User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${handleAvailable === false ? 'text-warning-high' : 'text-text-tertiary'}`} />
                                    <Input placeholder="UNIQUE_ID..." value={username} onChange={(e: any) => { setUsername(e.target.value); setHandleAvailable(null); }} onBlur={checkHandle} className={`pl-10 ${handleAvailable === false ? '!border-warning-high focus:!ring-warning-high' : ''}`} />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-jetbrains-mono text-text-secondary uppercase ml-1">Email Protocol</label>
                            <div className="relative">
                                <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                                <Input type="email" placeholder="OPERATOR@ZAP.GG" value={email} onChange={(e: any) => setEmail(e.target.value)} className="pl-10" />
                            </div>
                        </div>

                        <div className="space-y-1">
                             <div className="flex justify-between">
                                <label className="text-xs font-jetbrains-mono text-text-secondary uppercase ml-1">Passkey</label>
                                {activeTab === 'register' && (
                                    <span className={`text-xs font-jetbrains-mono uppercase transition-colors ${passwordStrength >= 3 ? 'text-neon-surge' : passwordStrength >= 2 ? 'text-yellow-500' : 'text-text-tertiary'}`}>
                                        STRENGTH: {passwordStrength}/4
                                    </span>
                                )}
                            </div>
                            <div className="relative">
                                <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                                <Input type="password" placeholder={activeTab === 'register' ? "MIN 12 CHARS (A-Z, 0-9, #$@)" : "••••••••"} value={password} onChange={(e: any) => setPassword(e.target.value)} className="pl-10" />
                            </div>
                            {activeTab === 'register' && (
                                <div className="flex gap-1 h-1.5 mt-1.5 rounded overflow-hidden">
                                    {[1, 2, 3, 4].map(level => (
                                        <div key={level} className={`flex-1 transition-all duration-300 ${passwordStrength >= level ? (passwordStrength >= 3 ? 'bg-neon-surge shadow-[0_0_5px_#00FFC0]' : 'bg-yellow-500 shadow-[0_0_5px_#FFC000]') : 'bg-foundation-lighter'}`} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {activeTab === 'register' && (
                            <>
                                <div className="space-y-1">
                                    <label className="text-xs font-jetbrains-mono text-text-secondary uppercase ml-1">Confirm Passkey</label>
                                    <Input type="password" placeholder="RE-ENTER PASSKEY" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} className={`${confirmPassword && password !== confirmPassword ? '!border-warning-high focus:!ring-warning-high' : ''}`} />
                                </div>
                                <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg border-2 border-transparent hover:border-[#3a3846] bg-foundation transition-all">
                                    <div className="relative flex items-center mt-0.5">
                                        <input type="checkbox" className="peer sr-only" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
                                        <div className="h-5 w-5 border-2 border-[#333] rounded-md bg-foundation-light peer-checked:bg-neon-surge peer-checked:border-neon-surge transition-all flex items-center justify-center shadow-inner shadow-black/50">
                                            <Icons.Check className={`h-3 w-3 text-black transition-opacity ${termsAccepted ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                    </div>
                                    <span className="text-xs text-text-secondary leading-snug font-jetbrains-mono uppercase">
                                        I AFFIRM I AM 18+ AND ACCEPT THE <button type="button" className="text-neon-surge hover:underline transition-colors">TERMS</button> AND <button type="button" className="text-neon-surge hover:underline transition-colors">PRIVACY POLICY</button> PROTOCOLS.
                                    </span>
                                </label>
                            </>
                        )}

                        {error && (
                            <div className="p-3 bg-warning-high/10 border border-warning-high/50 rounded-lg text-warning-high text-xs font-jetbrains-mono flex items-start gap-2 animate-fadeIn shadow-[0_0_10px_rgba(255,0,0,0.1)]">
                                <Icons.AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /> 
                                <span className="uppercase">{error}</span>
                            </div>
                        )}

                        <Button type="submit" size="lg" className="w-full" loading={isLoading} disabled={isLoading || (activeTab === 'login' ? !isLoginValid : !isRegisterValid)} >
                            {activeTab === 'login' ? 'ESTABLISH CONNECTION' : 'CREATE OPERATOR PROFILE'}
                        </Button>
                    </form>

                    <div className="mt-5 text-center space-y-3">
                        {activeTab === 'login' ? (
                            <>
                                <button className="text-xs font-jetbrains-mono text-text-secondary hover:text-neon-surge transition-colors uppercase tracking-wider block mx-auto">
                                    [ DECRYPT PASSKEY ]
                                </button>
                                <p className="text-xs text-text-tertiary font-jetbrains-mono uppercase">
                                    NEW TO THE GRID? 
                                    <button onClick={() => { resetForm(); setActiveTab('register'); }} className="text-white hover:text-neon-surge ml-1 font-bold transition-colors">
                                        INITIATE NEW PROFILE
                                    </button>
                                </p>
                            </>
                        ) : (
                            <p className="text-xs text-text-tertiary font-jetbrains-mono uppercase">
                                ALREADY OPERATIVE? 
                                <button onClick={() => { resetForm(); setActiveTab('login'); }} className="text-white hover:text-neon-surge ml-1 font-bold transition-colors">
                                    ESTABLISH CONNECTION
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
