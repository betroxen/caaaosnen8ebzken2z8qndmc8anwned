import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ToastContext } from '../context/ToastContext';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ProgressBar } from '../components/ProgressBar';


const mockCasinosData = [
    { id: 'stake', name: 'Stake', icon: Icons.Activity },
    { id: 'bcgame', name: 'BC.Game', icon: Icons.Wallet },
    { id: 'rollbit', name: 'Rollbit', icon: Icons.FileText },
    { id: 'mira', name: 'Mira Casino', icon: Icons.Lock },
    { id: 'slots', name: 'Slots.io', icon: Icons.Database },
];

const ProfilePage: React.FC = () => {
    const toastContext = useContext(ToastContext);
    const appContext = useContext(AppContext);
    
    if (!toastContext || !appContext) return null;

    const { showToast } = toastContext;

    const [bannerGradient, setBannerGradient] = useState<'green' | 'purple'>('green');
    const [profileImage, setProfileImage] = useState('https://placehold.co/150x150/00FFC0/0A0A0A?text=DG');
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [userBio, setUserBio] = useState("Crypto native since 2017. Hunting for max RTP and fair play. Alpha seeker.");

    const [linkedAccounts, setLinkedAccounts] = useState([
         { id: '1', casinoId: 'stake', casinoName: 'Stake', username: 'DegenG_Official', email: '***@zap.gg', verified: true, public: true, platformIcon: Icons.Activity }
    ]);
    const [linkForm, setLinkForm] = useState({
        targetCasino: '',
        username: '',
        email: '',
        attestation: false
    });

    const mfaStatus = true;
    const walletStatus = true;
    const discordHandle = "@DegenGambler";
    const profileHandle = "DegenGambler";
    const zapScore = 88;

    const badges = [
        { name: 'Charge', iconUrl: 'https://files.catbox.moe/t009ik.webp', earned: true },
        { name: 'Spark', iconUrl: 'https://files.catbox.moe/a14nwe.webp', earned: true },
        { name: 'Surge', iconUrl: 'https://files.catbox.moe/49qzvn.webp', earned: true },
        { name: 'Pulse', iconUrl: 'https://files.catbox.moe/vb8gw7.webp', earned: true },
        { name: 'Rush', iconUrl: 'https://files.catbox.moe/99mb5d.webp', earned: true },
        { name: 'Apex', iconUrl: 'https://files.catbox.moe/cldts5.webp', earned: true },
        { name: 'Blaze', iconUrl: 'https://files.catbox.moe/efr45u.webp', earned: true },
        { name: 'Ignite', iconUrl: 'https://files.catbox.moe/je4uhu.webp', earned: false },
        { name: 'VIP Host', iconUrl: 'https://files.catbox.moe/gi909v.webp', earned: false },
    ];

    const toggleBanner = () => {
        setBannerGradient(prev => prev === 'green' ? 'purple' : 'green');
        showToast("Profile theme updated. Signal lock engaged.", "success");
    };

    const cycleProfileImage = () => {
        const images = [
            'https://placehold.co/150x150/00FFC0/0A0A0A?text=DG',
            'https://placehold.co/150x150/8b5cf6/0A0A0A?text=DG',
            'https://placehold.co/150x150/3b82f6/0A0A0A?text=DG',
            'https://placehold.co/150x150/FF6347/0A0A0A?text=DG',
        ];
        const currentIndex = images.indexOf(profileImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setProfileImage(images[nextIndex]);
        showToast("Profile picture updated. New avatar active.", "success");
    };
    
    const handleBioSave = () => {
        setIsEditingBio(false);
        showToast("Bio updated. Intel broadcast is live.", "success");
    };

    const handleLinkAccount = (e: React.FormEvent) => {
        e.preventDefault();
        
        const casino = mockCasinosData.find(c => c.id === linkForm.targetCasino);
        if (!casino) {
            showToast("LINKAGE FAILED: Invalid operator target.", "error");
            return;
        }

        if (linkedAccounts.length >= 5) {
            showToast("LINKAGE ERROR: Maximum of 5 accounts reached.", "error");
            return;
        }
        if (!linkForm.targetCasino || !linkForm.username || !linkForm.email || !linkForm.attestation) {
             showToast("LINKAGE FAILED: All fields and attestation are mandatory.", "error");
             return;
        }

        const newAccount = {
            id: crypto.randomUUID(),
            casinoId: casino.id,
            casinoName: casino.name,
            username: linkForm.username,
            email: linkForm.email,
            verified: false, 
            public: false, 
            platformIcon: casino.icon
        };

        setLinkedAccounts([...linkedAccounts, newAccount]);
        setLinkForm({ targetCasino: '', username: '', email: '', attestation: false });
        showToast(`LINK INITIATED: Verifying ${casino.name} account... Stand by.`, "info");

        setTimeout(() => {
             setLinkedAccounts(prev => prev.map(acc => acc.id === newAccount.id ? { ...acc, verified: true } : acc));
             showToast(`LINK ESTABLISHED: ${casino.name} account verified. Secure line active.`, "success");
        }, 2000);
    };

    const removeLinkedAccount = (id: string) => {
        setLinkedAccounts(prev => prev.filter(acc => acc.id !== id));
        showToast("LINK TERMINATED. Account disconnected.", "info");
    };

    const togglePublicStatus = (id: string) => {
        const isCurrentlyPublic = linkedAccounts.find(a => a.id === id)?.public;
        setLinkedAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, public: !acc.public } : acc));
        showToast(`Visibility set to ${!isCurrentlyPublic ? 'PUBLIC' : 'PRIVATE'}`, 'info');
    };

    const bannerClasses = bannerGradient === 'green' 
        ? 'bg-gradient-to-r from-[#121212] via-[#0A2A20] to-[#121212] border-b border-neon-surge/50' 
        : 'bg-gradient-to-r from-[#121212] via-purple-900/40 to-blue-900/20 border-b border-purple-500/50';

    const ZAP_SCORE_COLOR = zapScore >= 90 ? 'text-neon-surge' : zapScore >= 75 ? 'text-yellow-400' : 'text-warning-low';
    const ZAP_SCORE_TEXT = zapScore >= 90 ? 'ELITE' : zapScore >= 75 ? 'VETERAN' : 'PILOT';
    
    return (
        <div className="font-rajdhani animate-fadeIn">
            <Card className="relative overflow-hidden p-0 mb-8 group/banner border-[#333333] shadow-2xl">
                <div className={`h-48 ${bannerClasses} transition-all duration-500 relative animate-scan-line`}>
                     <button 
                        onClick={toggleBanner} 
                        className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 opacity-0 group-hover/banner:opacity-100 transition-opacity border border-white/20 font-orbitron uppercase"
                    >
                        <Icons.Edit className="h-3 w-3" /> Edit Theme
                    </button>
                </div>
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-end -mt-24 relative z-10 bg-foundation-light">
                    
                    <div className="relative group/pfp cursor-pointer" onClick={cycleProfileImage}>
                        <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-32 h-32 md:w-44 md:h-44 rounded-2xl border-4 border-foundation-light shadow-2xl bg-foundation-light object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/pfp:opacity-100 transition-opacity rounded-2xl flex items-center justify-center border-4 border-transparent">
                            <Icons.Camera className="h-8 w-8 text-white/80" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-foundation-light p-1.5 rounded-full">
                             <div className="bg-neon-surge p-1.5 rounded-full shadow-[0_0_15px_rgba(0,255,192,0.5)]" title="Circuit Status: Online">
                                <Icons.Zap className="w-5 h-5 text-black fill-black" />
                             </div>
                        </div>
                    </div>

                    <div className="flex-1 mt-2 md:mt-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white uppercase">{profileHandle}</h1>
                            <span className={`px-3 py-1 rounded-full bg-yellow-500/10 ${ZAP_SCORE_COLOR} text-sm font-bold border border-yellow-500/20 font-jetbrains-mono`}>
                                STATUS: {ZAP_SCORE_TEXT}
                            </span>
                        </div>
                        
                        {isEditingBio ? (
                            <div className='mt-2'>
                                <textarea
                                    value={userBio}
                                    onChange={(e) => setUserBio(e.target.value)}
                                    className="w-full rounded-md border border-neon-surge/50 bg-foundation p-3 text-sm text-white resize-none font-rajdhani"
                                    rows={2}
                                />
                                <Button size="sm" onClick={handleBioSave} className="mt-2 mr-2">SAVE INTEL</Button>
                                <Button size="sm" variant="ghost" onClick={() => setIsEditingBio(false)}>CANCEL</Button>
                            </div>
                        ) : (
                            <p className="text-text-secondary text-lg max-w-2xl mb-4 leading-relaxed whitespace-pre-wrap flex items-center gap-2">
                                {userBio}
                                <button onClick={() => setIsEditingBio(true)} className='text-neon-surge hover:text-white/80 p-1 rounded-full transition-colors'>
                                    <Icons.Edit className='w-4 h-4' />
                                </button>
                            </p>
                        )}

                        <div className="flex flex-wrap gap-3">
                             <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(`https://zap.gg/profile/${profileHandle}`).then(() => showToast("Profile URL copied to terminal.", "success"))}>
                                 <Icons.Share className="w-4 h-4" /> SHARE PROFILE INTEL
                             </Button>
                             <Button variant="primary" size="sm" onClick={() => appContext.setCurrentPage('Settings')}>
                                 <Icons.Settings className="w-4 h-4" /> COMMAND CONSOLE
                             </Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    
                     <Card className="p-6 md:p-8 border-neon-surge/20 bg-foundation/50">
                        <h2 className="font-orbitron text-xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-3">
                            <Icons.Zap className="h-5 w-5 text-neon-surge" /> ZAP SCORE MATRIX ({zapScore})
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             <div className="p-4 bg-foundation-light rounded-lg border border-[#333333]">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-xs font-jetbrains-mono text-neon-surge uppercase">Integrity</p>
                                    <span className="text-sm font-bold text-white">95%</span>
                                </div>
                                <ProgressBar progress={95} className="h-2" />
                            </div>
                             <div className="p-4 bg-foundation-light rounded-lg border border-[#333333]">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-xs font-jetbrains-mono text-neon-surge uppercase">Activity</p>
                                    <span className="text-sm font-bold text-white">88%</span>
                                </div>
                                <ProgressBar progress={88} className="h-2" />
                            </div>
                             <div className="p-4 bg-foundation-light rounded-lg border border-[#333333]">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-xs font-jetbrains-mono text-neon-surge uppercase">VPR Record</p>
                                    <span className="text-sm font-bold text-white">82%</span>
                                </div>
                                <ProgressBar progress={82} className="h-2" />
                            </div>
                        </div>
                        <p className="text-xs text-text-tertiary mt-4 pt-4 border-t border-[#333333]/50 font-jetbrains-mono">
                            SCORE ANALYSIS: High Integrity, strong Activity. VPR Record needs minor uplift to stabilize Elite status.
                        </p>
                    </Card>

                    <Card className="p-6 md:p-8 border-blue-500/20">
                        <h2 className="font-orbitron text-xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-3">
                            <Icons.Link className="h-5 w-5 text-blue-500" /> OPERATOR LINKAGE CIRCUIT
                        </h2>
                        <p className="text-text-secondary mb-6 text-sm">
                            Link external operator accounts to simplify VPR submissions and verify play history. Max 5 active links.
                        </p>

                        {linkedAccounts.length > 0 && (
                            <div className="mb-8 space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                                <h3 className="text-xs font-jetbrains-mono text-blue-500 uppercase mb-2">// ACTIVE LINKS ({linkedAccounts.length}/5)</h3>
                                {linkedAccounts.map(account => (
                                    <div key={account.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-foundation rounded-lg border border-[#333333] hover:border-blue-500/50 transition-colors">
                                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                            <div className={`p-2 rounded-md ${account.verified ? 'bg-neon-surge/10 text-neon-surge' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                                {account.verified ? <Icons.CheckCircle className="h-4 w-4" /> : <Icons.Loader className="h-4 w-4 animate-spin" />}
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm font-orbitron uppercase">{account.casinoName}</p>
                                                <p className="text-xs text-text-tertiary font-jetbrains-mono flex items-center gap-1">
                                                    <Icons.User className='w-3 h-3'/>{account.username}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             <button 
                                                onClick={() => togglePublicStatus(account.id)}
                                                className="p-2 text-text-tertiary hover:text-blue-500 transition-colors"
                                                title={account.public ? "Publicly Visible" : "Private (Hidden from public profile)"}
                                            >
                                                {account.public ? <Icons.Eye className="h-4 w-4" /> : <Icons.EyeOff className="h-4 w-4" />}
                                            </button>
                                            <Button 
                                                onClick={() => removeLinkedAccount(account.id)}
                                                variant="ghost"
                                                className="text-warning-high hover:bg-warning-high/10 p-2 h-8"
                                                title="Disconnect Account"
                                            >
                                                <Icons.Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleLinkAccount} className="bg-foundation/50 p-4 md:p-6 rounded-xl border border-[#333333]">
                            <h3 className="text-sm font-orbitron text-white uppercase mb-4 flex items-center gap-2">INITIATE NEW LINK <Icons.CornerRightUp className='w-3 h-3 text-neon-surge'/></h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-1">Target Casino</label>
                                    <select 
                                        className="w-full h-10 rounded-md border border-[#333333] bg-foundation-light px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-jetbrains-mono"
                                        value={linkForm.targetCasino}
                                        onChange={(e) => setLinkForm({...linkForm, targetCasino: e.target.value})}
                                        required
                                    >
                                        <option value="">// SELECT OPERATOR</option>
                                        {mockCasinosData.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-1">Casino Username</label>
                                    <Input 
                                        placeholder="EXACT HANDLE..." 
                                        value={linkForm.username}
                                        onChange={(e) => setLinkForm({...linkForm, username: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-1">Casino Email</label>
                                    <Input 
                                        type="email" 
                                        placeholder="REGISTERED EMAIL..." 
                                        value={linkForm.email}
                                        onChange={(e) => setLinkForm({...linkForm, email: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <label className="flex items-start gap-3 cursor-pointer group mb-6 bg-foundation-light p-3 rounded-lg border border-[#333333]">
                                <input 
                                    type="checkbox" 
                                    className="mt-1 accent-blue-500"
                                    checked={linkForm.attestation}
                                    onChange={(e) => setLinkForm({...linkForm, attestation: e.target.checked})}
                                />
                                <div className="text-xs text-text-tertiary leading-relaxed">
                                    <strong className="text-white block mb-1 font-orbitron uppercase">OWNERSHIP PROTOCOL ATTESTATION</strong>
                                    I confirm that I am the sole, legitimate owner of this account, granting ZAP secure, read-only verification access.
                                </div>
                            </label>

                            <Button type="submit" className="w-full font-orbitron uppercase tracking-wider bg-blue-600 hover:bg-blue-500" disabled={!linkForm.attestation}>
                                LINK ACCOUNT & INITIALIZE VERIFICATION
                            </Button>
                        </form>
                    </Card>

                    <Card className="p-6 md:p-8">
                        <h3 className="font-orbitron text-xl text-white mb-6 uppercase border-b border-[#333333] pb-3">RECENT GRID ACTIVITY</h3>
                        <div className="space-y-6">
                            {[
                                { text: 'Completed "High-RTP Scan" Mission, earned +250 ZP.', icon: Icons.Star, color: 'text-neon-surge' },
                                { text: 'VPR #3041 Verified: Stake payout successfully audited.', icon: Icons.CheckCircle, color: 'text-blue-400' },
                                { text: 'Posted "Grid Vetting" update in the Alpha Channel.', icon: Icons.MessageSquare, color: 'text-purple-400' },
                                { text: 'Unlocked "Veteran Pilot" Status.', icon: Icons.Trophy, color: 'text-yellow-400' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 pb-4 border-b border-[#333333] last:border-0 last:pb-0">
                                    <div className={`p-3 rounded-full h-fit shrink-0 border border-[#333333] bg-foundation-light`}>
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm font-orbitron">{item.text}</p>
                                        <p className="text-xs text-text-tertiary mt-1 font-jetbrains-mono">{i + 1} day{i > 0 ? 's' : ''} ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="p-6 md:p-8 border-yellow-500/20 bg-foundation/50">
                         <h2 className="font-orbitron text-xl text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-3">
                            <Icons.Trophy className="h-5 w-5 text-yellow-500" /> CORE INTEL
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="p-3 text-center bg-foundation-light rounded-lg border border-[#333333]">
                                <p className="text-2xl font-jetbrains-mono text-white font-bold">1,240</p>
                                <p className="text-xs text-text-tertiary uppercase font-orbitron">Zap Points</p>
                            </div>
                             <div className="p-3 text-center bg-foundation-light rounded-lg border border-[#333333]">
                                <p className="text-2xl font-jetbrains-mono text-white font-bold">#1,337</p>
                                <p className="text-xs text-text-tertiary uppercase font-orbitron">Global Rank</p>
                            </div>
                             <div className="p-3 text-center bg-foundation-light rounded-lg border border-[#333333]">
                                <p className="text-2xl font-jetbrains-mono text-white font-bold">12</p>
                                <p className="text-xs text-text-tertiary uppercase font-orbitron">Reviews Given</p>
                            </div>
                            <div className="p-3 text-center bg-foundation-light rounded-lg border border-[#333333]">
                                <p className="text-2xl font-jetbrains-mono text-white font-bold">98%</p>
                                <p className="text-xs text-text-tertiary uppercase font-orbitron">RTP Target HIT</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-orbitron text-lg text-white uppercase">Level 42 Circuit</h3>
                             <span className="text-neon-surge font-bold font-jetbrains-mono">4,250 / 5,000 XP</span>
                        </div>
                        <ProgressBar progress={85} className="h-3 mb-4" />
                        <p className="text-sm text-text-tertiary font-jetbrains-mono">// 750 XP UNTIL LEVEL 43.</p>
                    </Card>

                    <Card className="p-6">
                         <h2 className="font-orbitron text-lg text-white mb-6 flex items-center gap-3 uppercase tracking-wider border-b border-[#333333] pb-3">
                            <Icons.Shield className="h-5 w-5 text-purple-500" /> SECURITY VETTING
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-foundation rounded-lg border border-[#333333]">
                                <div>
                                    <p className="text-xs text-text-tertiary font-jetbrains-mono uppercase mb-1">MFA Status</p>
                                    <p className={`text-sm font-bold font-orbitron ${mfaStatus ? 'text-neon-surge' : 'text-warning-high'}`}>
                                        {mfaStatus ? 'VERIFIED & ACTIVE' : 'INACTIVE // RISK'}
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => appContext.setCurrentPage('Settings')} className="font-orbitron uppercase text-xs">
                                    AUDIT
                                </Button>
                            </div>

                             <div className="flex items-center justify-between p-3 bg-foundation rounded-lg border border-[#333333]">
                                <div>
                                    <p className="text-xs text-text-tertiary font-jetbrains-mono uppercase mb-1">SSP Wallet</p>
                                    <p className={`text-sm font-bold font-orbitron ${walletStatus ? 'text-neon-surge' : 'text-yellow-500'}`}>
                                        {walletStatus ? 'CONNECTED' : 'NOT CONNECTED'}
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => appContext.setCurrentPage('Settings')} className="font-orbitron uppercase text-xs">
                                    SYNC
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-foundation rounded-lg border border-[#333333]">
                                <div>
                                    <p className="text-xs text-text-tertiary font-jetbrains-mono uppercase mb-1">Discord Handle</p>
                                    <p className="text-sm font-bold text-white flex items-center gap-2 font-jetbrains-mono">
                                        <Icons.Globe className="w-3 h-3 text-[#7289da]" /> {discordHandle}
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-warning-high hover:text-red-300 hover:bg-warning-high/10 h-8 px-2 font-orbitron uppercase text-xs">
                                    DISCONNECT
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-orbitron text-lg text-white mb-4 uppercase">EARNED BADGES</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                            {badges.map((badge) => (
                                <div key={badge.name} className={`aspect-square p-2 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-300 ${badge.earned ? 'bg-neon-surge/10 border border-neon-surge/30 shadow-[0_0_10px_rgba(0,255,192,0.15)]' : 'bg-foundation-lighter border border-[#333]'}`} title={badge.earned ? badge.name : `${badge.name} (Locked)`}>
                                    <img src={badge.iconUrl} alt={badge.name} className={`w-3/4 h-3/4 object-contain transition-all duration-300 ${!badge.earned && 'grayscale opacity-30'}`} />
                                    <span className={`text-[9px] font-jetbrains-mono mt-1 font-bold uppercase truncate ${badge.earned ? 'text-neon-surge' : 'text-[#666]'}`}>{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
            
            <div className="text-center text-xs text-[#666] font-jetbrains-mono uppercase space-y-2 mt-12">
                <p>
                    <strong className="text-white">DATA STREAM 7.1 // </strong> ALL INTEL IS LIVE AND VERIFIED BY ZAP GRID PROTOCOL.
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;