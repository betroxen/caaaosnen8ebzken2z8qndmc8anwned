import React, { useState, useMemo, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { casinos } from '../constants/casinos';
import { Icons } from './icons';
import { Button } from './Button';
import { Input } from './Input';
import { ToastContext } from '../context/ToastContext';

// VPR Protocol Steps & Configuration
const STEPS = ['TARGET', 'SIGNAL', 'DATA', 'EVIDENCE', 'TRANSMIT'];

const CATEGORIES = [
    { value: 'PAYOUT', label: 'PAYOUT SPEED', desc: 'Time from request to wallet.', Icon: Icons.dollarSign },
    { value: 'SUPPORT', label: 'SUPPORT CIRCUIT', desc: 'Competence & speed of service.', Icon: Icons.LifeBuoy },
    { value: 'BONUS', label: 'BONUS T&C', desc: 'Clarity & fairness of terms.', Icon: Icons.Scale },
    { value: 'UX', label: 'GENERAL UX', desc: 'Interface, mobile, loading.', Icon: Icons.LayoutGrid },
];

const PRIORITIES = [
    { value: 'STANDARD', label: 'STANDARD (Routine)', color: 'text-neon-surge/80', ring: 'ring-neon-surge' },
    { value: 'ELEVATED', label: 'ELEVATED (Severe Delay)', color: 'text-yellow-500', ring: 'ring-yellow-500' },
    { value: 'CRITICAL', label: 'CRITICAL (Security/Fraud)', color: 'text-warning-high', ring: 'ring-warning-high' },
];

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCasinoId: string | null;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, initialCasinoId }) => {
    const { showToast } = useContext(ToastContext) || { showToast: () => {} };

    const [currentStep, setCurrentStep] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        targetOperator: initialCasinoId || '',
        incidentDate: '',
        category: 'PAYOUT',
        priority: 'STANDARD',
        ratingPayout: 0,
        ratingTerms: 0,
        ratingSupport: 0,
        summary: '',
        evidenceUrl: '',
        txId: '',
        attestData: false,
        attestTerms: false
    });

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open');
            setCurrentStep(initialCasinoId ? 2 : 1); // Skip to step 2 if casino is pre-selected
            setFormData({
                targetOperator: initialCasinoId || '',
                incidentDate: new Date().toISOString().split('T')[0],
                category: 'PAYOUT',
                priority: 'STANDARD',
                ratingPayout: 0,
                ratingTerms: 0,
                ratingSupport: 0,
                summary: '',
                evidenceUrl: '',
                txId: '',
                attestData: false,
                attestTerms: false
            });
            setSearchTerm('');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [isOpen, initialCasinoId]);

    const selectedCasino = useMemo(() => casinos.find(c => c.id === formData.targetOperator), [formData.targetOperator]);
    const filteredCasinos = useMemo(() => {
        if (!searchTerm) return casinos.slice(0, 5);
        return casinos.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const handleInputChange = (field: keyof typeof formData, value: string | number | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateStep = () => {
        switch (currentStep) {
            case 1:
                if (!formData.targetOperator) { showToast("VPR ERROR: Target Operator required.", "error"); return false; }
                return true;
            case 2:
                 if (!formData.incidentDate) { showToast("VPR ERROR: Incident Date required.", "error"); return false; }
                return true;
            case 3:
                if (formData.ratingPayout === 0 || formData.ratingTerms === 0 || formData.ratingSupport === 0) {
                    showToast("DATA INCOMPLETE: All metrics must be graded (1-5).", "error"); return false;
                }
                if (formData.summary.length < 50) {
                    showToast(`DATA INCOMPLETE: Summary must be detailed (min 50 chars). Current: ${formData.summary.length}`, "error"); return false;
                }
                return true;
            case 4:
                if (!formData.evidenceUrl || !formData.evidenceUrl.startsWith('http')) {
                    showToast("EVIDENCE MISSING: VPR requires a valid verifiable proof URL.", "error"); return false;
                }
                return true;
            case 5:
                if (!formData.attestData || !formData.attestTerms) {
                    showToast("TRANSMISSION FAILED: Mandatory attestations required.", "error"); return false;
                }
                return true;
            default: return true;
        }
    };

    const handleNext = () => {
        if (validateStep()) {
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
        }
    };
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
    const handleSubmit = () => {
        if (!validateStep()) return;
        showToast("VPR TRANSMITTED. Validation Queue activated. +50 ZP Pending.", "success");
        onClose();
    };

    const MetricRater = ({ label, field, Icon }: { label: string, field: keyof typeof formData, Icon: React.FC<any>}) => (
        <div className="p-4 rounded-xl border border-[#3a3846] bg-[#0c0c0e] hover:border-neon-surge/50 transition-all">
            <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-4 flex items-center gap-2">
                <Icon className="h-4 w-4 text-neon-surge" /> {label}
            </label>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-jetbrains-mono w-14 text-warning-high text-center sm:text-left">CRIT (1)</span>
                <div className="flex gap-2 flex-1 justify-center">
                    {[1, 2, 3, 4, 5].map((val) => {
                        const isSelected = formData[field] === val;
                        const isActive = (formData[field] as number) >= val;
                        return (
                            <button
                                key={val}
                                type="button"
                                onClick={() => handleInputChange(field, val)}
                                className={`h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-lg font-bold font-orbitron transition-all border text-lg
                                    ${isActive
                                    ? 'bg-neon-surge border-neon-surge text-black shadow-[0_0_10px_rgba(0,255,192,0.3)] scale-[1.05]'
                                    : 'bg-foundation-light border-[#3a3846] text-[#8d8c9e] hover:border-white/30'
                                    }`}
                            >
                                {val}
                            </button>
                        );
                    })}
                </div>
                <span className="text-xs font-jetbrains-mono w-14 text-neon-surge text-center sm:text-right">APEX (5)</span>
            </div>
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose} />
            <div className="relative w-full max-w-4xl rounded-xl bg-foundation-light border border-neon-surge/30 shadow-[0_0_50px_rgba(0,255,192,0.15)] animate-fadeIn flex flex-col my-auto max-h-[95vh]">
                <div className="p-6 border-b border-neon-surge/30 bg-foundation rounded-t-xl">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="font-orbitron text-2xl font-bold text-white flex items-center gap-3 uppercase text-glow">
                                <Icons.Database className="h-6 w-6 text-neon-surge animate-pulse" /> ZAP VPR SUBMISSION
                            </h2>
                            <p className="text-neon-surge font-jetbrains-mono text-xs uppercase tracking-widest mt-1">// PROTOCOL V2.0 // STATUS: ACTIVE</p>
                        </div>
                        <Button variant="ghost" onClick={onClose} className="text-text-tertiary hover:text-warning-high bg-foundation-light p-2 h-auto w-auto rounded-lg border border-[#3a3846] hover:border-warning-high">
                            <Icons.X className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="mb-3 flex justify-between text-xs font-jetbrains-mono uppercase tracking-wider">
                        {STEPS.map((step, i) => (
                            <div key={step} className={`text-center transition-colors duration-300 w-1/5 ${currentStep > i + 1 ? 'text-neon-surge' : currentStep === i + 1 ? 'text-white font-bold text-glow' : 'text-[#3a3846]'}`}>
                                <div className="text-[10px] md:text-xs">[{i + 1}] {step}</div>
                                {currentStep === i + 1 && <div className="h-0.5 bg-neon-surge w-full mt-1 rounded-full shadow-[0_0_10px_#00FFC0]"></div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-neon-surge/5 border-b border-neon-surge/10 p-3 px-6 text-xs text-text-tertiary font-jetbrains-mono">
                    <strong className="text-neon-surge">DIRECTIVE:</strong> Subjective noise will be purged by the validation queue. **Only raw, verifiable data is accepted.**
                </div>
                <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar bg-foundation-light rounded-b-xl">
                    {currentStep === 1 && (
                        <div className="animate-fadeIn space-y-6">
                            <h3 className="font-orbitron text-xl text-white uppercase mb-4">// IDENTIFY TARGET</h3>
                            <div className="grid grid-cols-1">
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Target Operator (The Subject)</label>
                                    {selectedCasino ? (
                                        <div className="flex items-center justify-between p-3 bg-neon-surge/10 border border-neon-surge rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <img src={selectedCasino.logo} alt={selectedCasino.name} className="w-8 h-8 rounded-full border border-white/20" />
                                                <span className="font-bold text-white font-orbitron">{selectedCasino.name}</span>
                                            </div>
                                            <Button type="button" variant="ghost" onClick={() => handleInputChange('targetOperator', '')} className="text-text-tertiary hover:text-white text-xs uppercase font-jetbrains-mono px-3 py-1 h-auto rounded-full border border-[#3a3846]">Change</Button>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-5 w-5" />
                                            <Input placeholder="SEARCH GRID..." className="pl-10 font-jetbrains-mono" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoFocus />
                                            {searchTerm && (
                                                <div className="absolute top-full left-0 w-full bg-foundation border border-[#3a3846] rounded-lg mt-1 max-h-48 overflow-y-auto z-20 shadow-xl">
                                                    {filteredCasinos.map(c => (
                                                        <button key={c.id} type="button" onClick={() => { handleInputChange('targetOperator', c.id); setSearchTerm(''); }} className="w-full text-left p-3 hover:bg-foundation-light flex items-center gap-3 transition-colors">
                                                            <img src={c.logo} className="w-7 h-7 rounded-full" alt="" /> 
                                                            <span className="text-white font-orbitron text-sm">{c.name}</span>
                                                            <span className="ml-auto text-xs text-text-tertiary font-jetbrains-mono">{c.rating.toFixed(1)} ZAP</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 2 && (
                        <div className="animate-fadeIn space-y-8">
                           <h3 className="font-orbitron text-xl text-white uppercase mb-4">// DEFINE SIGNAL FOCUS</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-3">Date of Incident *</label>
                                    <Input type="date" value={formData.incidentDate} onChange={(e) => handleInputChange('incidentDate', e.target.value)} className="font-jetbrains-mono" max={new Date().toISOString().split('T')[0]}/>
                                </div>
                                <div>
                                     <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-3">Report Category (VPR Focus)</label>
                                     <Input as="select" value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)}>
                                        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                     </Input>
                                </div>
                                <div className="md:col-span-2">
                                     <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-3">Signal Priority Level</label>
                                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {PRIORITIES.map(pri => (
                                            <button type="button" key={pri.value} onClick={() => handleInputChange('priority', pri.value)} className={`w-full p-4 rounded-lg border text-left transition-all font-orbitron uppercase tracking-wider shadow-md ${ formData.priority === pri.value ? `bg-foundation-light border-current ${pri.color} ring-2 ${pri.ring}/50` : 'bg-foundation border-[#3a3846] text-text-tertiary hover:border-text-tertiary' }`}>
                                                {pri.label}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-text-tertiary mt-6 p-4 bg-foundation rounded-lg border border-yellow-500/30">
                                        <Icons.AlertTriangle className="inline-block w-4 h-4 mr-1 text-yellow-500" /> Critical priority is for security breaches or confirmed fraud only. Use responsibly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="animate-fadeIn space-y-6">
                           <h3 className="font-orbitron text-xl text-white uppercase mb-4">// RAW DATA IMPUT</h3>
                           <p className="text-sm text-text-tertiary mb-4">Grade the operator based on **measurable ZAP metrics** (1-Fail, 5-Optimal).</p>
                           <div className="space-y-6">
                               <MetricRater label="PAYOUT EFFICIENCY" field="ratingPayout" Icon={Icons.Clock} />
                               <MetricRater label="CLARITY OF TERMS" field="ratingTerms" Icon={Icons.Scale} />
                               <MetricRater label="SUPPORT COMPETENCE" field="ratingSupport" Icon={Icons.LifeBuoy} />
                           </div>
                           <div className="mt-8">
                               <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Report Summary (The Evidence-Backed Narrative) *</label>
                               <Input as="textarea" rows={6} placeholder="STATE THE FACTS: What happened, expected outcome, actual outcome. Objective data only." value={formData.summary} onChange={(e) => handleInputChange('summary', e.target.value)} />
                               <div className={`text-xs text-right mt-1 font-jetbrains-mono ${formData.summary.length < 50 ? 'text-warning-high' : 'text-neon-surge'}`}>
                                   {formData.summary.length} / 50 minimum chars
                               </div>
                           </div>
                        </div>
                    )}
                    {currentStep === 4 && (
                       <div className="animate-fadeIn space-y-8">
                           <h3 className="font-orbitron text-xl text-white uppercase mb-4">// EVIDENCE INJECTION</h3>
                           <div className="bg-warning-high/10 p-6 rounded-lg border border-warning-high/30 text-center">
                               <Icons.Shield className="w-12 h-12 mx-auto text-warning-high/50 mb-4" />
                               <h3 className="text-white font-orbitron uppercase mb-2">VERIFICATION REQUIRED</h3>
                               <p className="text-text-tertiary text-sm max-w-md mx-auto font-jetbrains-mono">A VPR without immutable evidence is noise. Provide an accessible link (Imgur, Drive) to screenshots or logs.</p>
                           </div>
                           <div>
                               <label className="block text-xs font-jetbrains-mono text-neon-surge uppercase mb-2">Evidence URL (Immutable Link) *</label>
                               <div className="relative">
                                   <Icons.Link className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary h-5 w-5" />
                                   <Input placeholder="https://verifiable-proof-link.com" className="pl-10 font-jetbrains-mono" type="url" value={formData.evidenceUrl} onChange={(e) => handleInputChange('evidenceUrl', e.target.value)} />
                               </div>
                           </div>
                           <div>
                               <label className="block text-xs font-jetbrains-mono text-text-tertiary uppercase mb-2">Transaction ID / Hash (Optional)</label>
                               <Input placeholder="0x..." className="font-jetbrains-mono" value={formData.txId} onChange={(e) => handleInputChange('txId', e.target.value)} />
                               <p className="text-xs text-[#666] mt-2 font-jetbrains-mono">TxID accelerates validation for financial disputes.</p>
                           </div>
                       </div>
                    )}
                    {currentStep === 5 && (
                        <div className="animate-fadeIn space-y-6">
                            <h3 className="font-orbitron text-xl text-white uppercase mb-4">// FINAL CONTRACT ATTESTATION</h3>
                            <div className="border-l-4 border-warning-high bg-warning-high/10 p-4 rounded-r-lg mb-6 shadow-xl">
                                <h3 className="font-orbitron text-warning-high uppercase mb-2 flex items-center gap-2"><Icons.Lock className="h-5 w-5" /> CIRCUIT WARNING</h3>
                                <p className="text-text-tertiary text-sm font-jetbrains-mono">Submitting false data to manipulate the ZAP Score is a severe violation. Violators face permanent disqualification and forfeiture of all SSP rewards.</p>
                            </div>
                            <div className="space-y-5 bg-foundation p-6 rounded-lg border border-neon-surge/30 shadow-md">
                                <label className="flex items-start gap-4 cursor-pointer group">
                                    <div className="relative flex items-center mt-1">
                                        <input type="checkbox" className="peer sr-only" checked={formData.attestData} onChange={(e) => handleInputChange('attestData', e.target.checked)} />
                                        <div className="h-6 w-6 border-2 border-[#3a3846] rounded-md bg-foundation-light peer-checked:bg-neon-surge peer-checked:border-neon-surge transition-all flex items-center justify-center">
                                            <Icons.CheckCircle className={`h-4 w-4 text-black ${formData.attestData ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <strong className="text-white font-orbitron uppercase text-sm block">DATA INTEGRITY ATTESTATION</strong>
                                        <p className="text-xs text-text-tertiary leading-relaxed font-jetbrains-mono">I confirm this VPR contains raw, un-fictionalized data and verifiable facts.</p>
                                    </div>
                                </label>
                                <div className="h-px bg-[#3a3846]/50 w-full my-2"></div>
                                <label className="flex items-start gap-4 cursor-pointer group">
                                     <div className="relative flex items-center mt-1">
                                        <input type="checkbox" className="peer sr-only" checked={formData.attestTerms} onChange={(e) => handleInputChange('attestTerms', e.target.checked)} />
                                        <div className="h-6 w-6 border-2 border-[#3a3846] rounded-md bg-foundation-light peer-checked:bg-neon-surge peer-checked:border-neon-surge transition-all flex items-center justify-center">
                                            <Icons.CheckCircle className={`h-4 w-4 text-black ${formData.attestTerms ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <strong className="text-white font-orbitron uppercase text-sm block">T&C CONTRACT ACCEPTANCE</strong>
                                        <p className="text-xs text-text-tertiary leading-relaxed font-jetbrains-mono">I accept ZAP T&C and understand the penalty for false reporting.</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 md:p-6 border-t border-neon-surge/30 bg-foundation rounded-b-xl flex justify-between items-center">
                    {currentStep > 1 ? (
                        <Button type="button" onClick={handleBack} className="bg-foundation-light text-neon-surge border border-neon-surge/30 hover:bg-foundation-light/80 font-jetbrains-mono text-xs shadow-none px-6">
                            <Icons.ChevronLeft className="mr-2 h-4 w-4" /> BACK
                        </Button>
                    ) : <div className="w-24"></div>}
                    {currentStep < STEPS.length ? (
                        <Button type="button" onClick={handleNext} className="font-orbitron uppercase tracking-wider px-8 shadow-lg">
                            NEXT PHASE <Icons.ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button type="button" onClick={handleSubmit} className="shadow-[0_0_30px_rgba(0,255,192,0.6)] font-orbitron uppercase tracking-widest py-3 px-6 h-auto text-sm md:text-base transition-transform duration-100 hover:scale-[1.02]" disabled={!formData.attestData || !formData.attestTerms}>
                            <Icons.Zap className="mr-2 h-5 w-5 fill-black" /> TRANSMIT VPR
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};