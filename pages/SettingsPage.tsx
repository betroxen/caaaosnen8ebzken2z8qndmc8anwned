import React, { useState } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const ConsoleModule = ({ title, icon: Icon, children, isWIP = false }: { title: string, icon: React.FC<any>, children: React.ReactNode, isWIP?: boolean }) => (
    <div className={`rounded-xl p-6 border border-foundation-light shadow-lg ${isWIP ? 'bg-foundation-light/50' : 'bg-foundation-light'}`}>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-foundation-lighter">
            <h3 className="flex items-center gap-3 text-xl font-orbitron font-bold text-white uppercase tracking-wider">
                <Icon className={`h-6 w-6 ${isWIP ? 'text-warning-low' : 'text-neon-surge'}`} />
                {title}
            </h3>
            {isWIP && (
                <span className="text-xs font-jetbrains-mono text-warning-low bg-warning-low/10 px-2 py-0.5 rounded-full tracking-widest">
                    AUDIT PENDING
                </span>
            )}
        </div>
        {children}
    </div>
);

const SettingsPage = () => {
    const [preferences] = useState({ theme: 'dark', language: 'EN', timezone: 'UTC+0' });
    const [security] = useState({ twoFactor: false, keyRotation: '30 days' });

    return (
        <div className="min-h-screen bg-foundation p-4 sm:p-8 font-rajdhani animate-fadeIn">
            <header className="max-w-7xl mx-auto mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl font-orbitron font-black text-white uppercase tracking-tighter mb-2">
                    COMMAND CONSOLE
                </h1>
                <p className="text-md sm:text-lg text-text-tertiary font-jetbrains-mono tracking-widest">
                    // OPERATOR SETTINGS, TACTICAL CONFIGURATION & AUDIT LOGS
                </p>
            </header>

            <div className="max-w-7xl mx-auto p-4 sm:p-6 mb-8 bg-blue-900/20 border border-blue-700/50 rounded-xl flex items-center gap-4">
                <Icons.AlertTriangle className="h-6 w-6 text-blue-400 shrink-0" />
                <div>
                    <h4 className="text-lg font-bold text-blue-300 font-orbitron">PROTOCOL DEPLOYMENT IMMINENT</h4>
                    <p className="text-sm text-blue-400">
                        This module is awaiting final code audit and integration with the institutional security layer. All configurations are currently read-only. Estimated deployment: T-14 days.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                <ConsoleModule title="OPERATOR PREFERENCES" icon={Icons.User} isWIP={true}>
                    <p className="text-text-secondary mb-4 text-sm">
                        Define your operational environment and display configuration.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary mb-1">UI Theme Protocol</label>
                            <select
                                value={preferences.theme}
                                disabled
                                className="w-full p-3 bg-foundation-lighter border border-[#333] rounded-lg text-white transition-colors duration-200 text-sm opacity-50 cursor-not-allowed"
                            >
                                <option value="dark">Dark (Tactical)</option>
                                <option value="light">Light (Legacy)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary mb-1">Timezone Configuration</label>
                            <Input
                                placeholder="UTC+0"
                                value={preferences.timezone}
                                disabled
                            />
                        </div>
                    </div>
                </ConsoleModule>

                <ConsoleModule title="SECURITY PROTOCOL" icon={Icons.Shield}>
                    <p className="text-text-secondary mb-4 text-sm">
                        Mandatory technical measures for profile fortification and key management.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-foundation rounded-lg border border-foundation-lighter">
                            <div className="flex items-center gap-3">
                                <Icons.Key className={`h-5 w-5 ${security.twoFactor ? 'text-neon-surge' : 'text-warning-high'}`} />
                                <div>
                                    <p className="text-sm font-semibold text-white">Multi-Factor Authentication</p>
                                    <p className="text-xs text-text-tertiary">
                                        {security.twoFactor ? 'PROTOCOL ACTIVE' : 'REQUIRED FOR TIER 1 ACCESS'}
                                    </p>
                                </div>
                            </div>
                            <Button disabled={true} className="bg-warning-high/20 text-warning-low hover:bg-warning-high/30">
                                {security.twoFactor ? 'Disable' : 'Activate'}
                            </Button>
                        </div>
                        <div>
                            <label className="block text-xs font-jetbrains-mono text-text-tertiary mb-1">Key Rotation Cycle</label>
                            <Input
                                placeholder="30 days"
                                value={security.keyRotation}
                                disabled
                            />
                        </div>
                    </div>
                </ConsoleModule>
                
                <ConsoleModule title="TACTICAL NOTIFICATIONS" icon={Icons.Bell} isWIP={true}>
                    <p className="text-text-secondary mb-4 text-sm">
                        Configure alerts for system audits, XAI risk scores, and protocol updates.
                    </p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-white p-3 bg-foundation rounded-lg border border-foundation-lighter">
                            <p className="text-sm font-jetbrains-mono flex items-center gap-2"><Icons.Shield className="h-4 w-4 text-neon-surge"/> VPR Audit Completion</p>
                            <span className="text-xs text-neon-surge">Enabled</span>
                        </div>
                         <div className="flex items-center justify-between text-white p-3 bg-foundation rounded-lg border border-foundation-lighter">
                            <p className="text-sm font-jetbrains-mono flex items-center gap-2"><Icons.AlertTriangle className="h-4 w-4 text-warning-high"/> XAI Risk Score Alert</p>
                            <span className="text-xs text-warning-high">Disabled</span>
                        </div>
                         <div className="flex items-center justify-between text-white p-3 bg-foundation rounded-lg border border-foundation-lighter">
                            <p className="text-sm font-jetbrains-mono flex items-center gap-2"><Icons.Mail className="h-4 w-4 text-white"/> Protocol News Digest</p>
                            <span className="text-xs text-white">Enabled</span>
                        </div>
                    </div>
                    <Button disabled={true} className="w-full mt-4 bg-blue-900/40 text-blue-400 hover:bg-blue-900/60">
                        View Full Notification History
                    </Button>
                </ConsoleModule>
            </div>

            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-foundation-light">
                 <Button disabled={true} size="lg" className="w-full sm:w-auto bg-neon-surge/20 text-neon-surge font-jetbrains-mono uppercase tracking-widest hover:bg-neon-surge/30 py-3">
                    [ PENDING AUDIT: SAVE CONFIGURATION ]
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;