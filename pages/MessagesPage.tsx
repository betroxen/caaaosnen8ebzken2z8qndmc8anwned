import React, { useState, useEffect, useRef, useCallback, useContext, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, deleteDoc, onSnapshot, setLogLevel } from 'firebase/firestore';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { ToastContext } from '../context/ToastContext';

// Declare global variables to inform TypeScript that they are injected at runtime.
declare global {
    interface Window {
        __app_id?: string;
        __firebase_config?: string;
        __initial_auth_token?: string;
    }
}

// --- GLOBAL CONSTANTS ---
const appId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof window.__firebase_config !== 'undefined' ? window.__firebase_config : '{}');
const initialAuthToken = typeof window.__initial_auth_token !== 'undefined' ? window.__initial_auth_token : null;
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.API_KEY}`;


// --- TYPES ---
interface Message {
    id: number;
    sender: 'me' | 'them';
    text: string;
    time: string;
}

interface Contact {
    id: number;
    name: string;
    status: 'online' | 'offline';
    lastMessage: string;
    time: string;
    unread: number;
    role: 'AI AGENT' | 'OFFICIAL';
}

interface Notification {
    id: number;
    message: string;
    type: 'system' | 'warning' | 'error';
    timestamp: string;
}

// --- MOCK DATA ---
const ZAP_AGENT_CONTACT: Contact = {
    id: 1, name: "ZAP AGENT", status: 'online', lastMessage: "Awaiting tactical input, Operator...", time: "LIVE", unread: 1, role: 'AI AGENT'
};
const ZAP_SUPPORT_CONTACT: Contact = {
    id: 2, name: "ZAP SUPPORT HQ", status: 'offline', lastMessage: "VPR validated. +50 ZP added.", time: "8h ago", unread: 0, role: 'OFFICIAL'
};
const MOCK_CONTACTS: Contact[] = [ZAP_AGENT_CONTACT, ZAP_SUPPORT_CONTACT];
const INITIAL_ZAP_AGENT_HISTORY: Message[] = [{
    id: 1, sender: 'them', text: "ZAP AGENT online. I am your tactical assistant, specialized in crypto intel and VPR auditing. How can I help you gain an edge, Operator?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}];
const STATIC_SUPPORT_HISTORY: Message[] = [
    { id: 1, sender: 'them', text: "Operator, we've reviewed your VPR for the delayed withdrawal on Roobet.", time: "10:42 AM" },
    { id: 2, sender: 'them', text: "Ticket #9432 closed. VPR validated. We've applied a temporary score penalty and credited +50 ZP to your account.", time: "10:50 AM" },
];


// --- UI SUB-COMPONENTS ---
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const { showToast } = useContext(ToastContext)!;
    const copyCode = () => {
        navigator.clipboard.writeText(code);
        showToast("Code block copied to clipboard.", "success");
    };
    return (
        <div className="relative my-2 bg-foundation border border-[#333] rounded-lg text-sm font-jetbrains-mono">
            <Button onClick={copyCode} variant="ghost" size="sm" className="absolute top-2 right-2 h-7 px-2 text-xs font-sans">
                <Icons.Save className="h-3 w-3 mr-1" /> COPY
            </Button>
            <pre className="p-4 pt-8 overflow-x-auto custom-scrollbar text-white"><code className="language-js">{code}</code></pre>
        </div>
    );
};

const MarkdownRenderer = ({ content }: { content: string }) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    const renderInlines = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-foundation-lighter text-neon-surge px-1 py-0.5 rounded text-xs font-jetbrains-mono">$1</code>')
            .replace(/^\s*[-*]\s+(.*)/gm, '<li class="ml-4 list-disc">$1</li>');
    };

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('```') && part.endsWith('```')) {
                    const code = part.slice(3, -3).trim();
                    return <CodeBlock key={index} code={code} />;
                }
                const html = renderInlines(part);
                return <div key={index} dangerouslySetInnerHTML={{ __html: html }} className="prose-p:my-2" />;
            })}
        </>
    );
};

const ChatMessage: React.FC<{ msg: Message }> = ({ msg }) => {
    const { showToast } = useContext(ToastContext)!;
    const copyMessage = () => {
        navigator.clipboard.writeText(msg.text);
        showToast("Message copied.", "success");
    };
    
    return (
        <div className={`flex flex-col group ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
            <div className={`relative max-w-[85%] p-3 px-4 rounded-xl text-sm animate-fadeIn shadow-lg font-rajdhani flex items-start gap-3
                ${msg.sender === 'me' 
                    ? 'bg-neon-surge/10 border border-neon-surge/30 text-white rounded-tr-sm' 
                    : 'bg-foundation-lighter border border-[#333] text-text-secondary rounded-tl-sm'}`
            }>
                <div className="flex-1 min-w-0 break-words leading-relaxed">
                   <MarkdownRenderer content={msg.text} />
                </div>
                <button onClick={copyMessage} className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity text-text-tertiary hover:text-white">
                    <Icons.Save className="h-4 w-4" />
                </button>
            </div>
            <span className="text-[10px] font-jetbrains-mono text-[#666] mt-1.5 uppercase">
                {msg.time} {msg.sender === 'me' && '// SENT'}
            </span>
        </div>
    );
};

const ThinkingBubble = () => (
    <div className="flex flex-col items-start animate-fadeIn">
        <div className="max-w-[80%] p-3 rounded-lg bg-foundation-light border border-[#333] text-text-tertiary rounded-tl-none flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-surge rounded-full animate-pulse [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-neon-surge rounded-full animate-pulse [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-neon-surge rounded-full animate-pulse"></div>
        </div>
        <span className="text-[10px] font-jetbrains-mono text-[#666] mt-1 uppercase">
            // ZAP AGENT processing...
        </span>
    </div>
);


// --- MAIN COMPONENT ---
const MessagesPage = () => {
    const [activeContactId, setActiveContactId] = useState<number | null>(1);
    const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
    const [messageInput, setMessageInput] = useState('');
    const [chatHistory, setChatHistory] = useState<Message[]>(INITIAL_ZAP_AGENT_HISTORY);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLogPanelOpen, setIsLogPanelOpen] = useState(true);

    const [db, setDb] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [saveHistory, setSaveHistory] = useState(true);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<(() => void) | null>(null);
    const [modalTitle, setModalTitle] = useState('');
    const [modalBody, setModalBody] = useState('');

    const activeContact = MOCK_CONTACTS.find(c => c.id === activeContactId);
    
    const filteredContacts = useMemo(() => 
        MOCK_CONTACTS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm]);

    const addNotification = useCallback((message: string, type: 'system' | 'warning' | 'error' = 'system') => {
        setNotifications(prev => [{ id: Date.now(), message, type, timestamp: new Date().toLocaleTimeString() }, ...prev].slice(0, 20));
    }, []);

    const getZapAgentHistoryRef = useCallback((dbInstance: any, userId: string) => {
        return doc(dbInstance, `artifacts/${appId}/users/${userId}/chat_history/zap_agent_data`);
    }, []);

    useEffect(() => {
        const initializeFirebase = async () => { /* ... Firebase logic as before ... */ };
        initializeFirebase();
    }, [addNotification]);
    
    const saveChatHistory = useCallback(async (history: Message[], currentUserId: string, currentDb: any) => { /* ... as before ... */ }, [saveHistory, getZapAgentHistoryRef, activeContactId]);
    
    useEffect(() => { /* ... Firestore onSnapshot logic as before ... */ }, [db, isAuthReady, userId, saveHistory, activeContactId, getZapAgentHistoryRef, saveChatHistory, addNotification]);
    
    useEffect(() => { /* ... Auto-save trigger logic as before ... */ }, [chatHistory, saveHistory, activeContactId, userId, db, saveChatHistory]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isLoading]);

    const handleContactSelect = (id: number) => {
        setActiveContactId(id);
        setMobileView('chat');
        setIsLoading(false);
        setMessageInput('');
        if (id === 1) setChatHistory(INITIAL_ZAP_AGENT_HISTORY);
        else if (id === 2) setChatHistory(STATIC_SUPPORT_HISTORY);
    };

    const handleBackToList = () => setMobileView('list');
    
    const openModal = (title: string, body: string, action: () => void) => {
        setModalTitle(title); setModalBody(body); setModalAction(() => action); setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false); setModalAction(null);
    };

    const handleClearChatHistory = () => {
        if (activeContactId !== 1) return;
        openModal('// CONFIRM: PURGE ZAP AGENT HISTORY', `This action will permanently delete Zap Agent history.`, performClearChatHistory);
    };

    const performClearChatHistory = async () => {
        setChatHistory(INITIAL_ZAP_AGENT_HISTORY.slice(0, 1));
        addNotification('// HISTORY PURGED: Zap Agent session reset.', 'system');
        if (db && userId && saveHistory) {
            try { await deleteDoc(getZapAgentHistoryRef(db, userId)); addNotification('// VPR DELETED: Remote history purged.', 'system'); } catch (error) { addNotification('CRITICAL: Failed to delete remote VPR.', 'error'); }
        }
        closeModal();
    };

    const handleClearNotificationHistory = () => {
        setNotifications([]);
        addNotification('// NOTIFICATION LOGS CLEARED.', 'system');
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim() || isLoading || activeContactId !== 1) return;

        const userMessage: Message = { id: Date.now(), sender: 'me', text: messageInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setChatHistory(prev => [...prev, userMessage]);
        const currentMessage = messageInput;
        setMessageInput('');
        setIsLoading(true);

        const systemPrompt = 'You are Zap Agent, an AI for the ZAP platform. You specialize in crypto gambling intel. Your tone is tactical, concise, and futuristic. You provide high-signal intelligence to help users gain an edge. Use markdown for formatting, especially for code or lists. Address the user as "Operator".';
        
        try {
            const response = await fetch(GEMINI_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: currentMessage }] }], systemInstruction: { parts: [{ text: systemPrompt }] } })
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Response decode error.";

            const aiMessage: Message = { id: Date.now() + 1, sender: 'them', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setChatHistory(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { id: Date.now() + 1, sender: 'them', text: `CRITICAL FAILURE: Connection to Grid severed. API call failed.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setChatHistory(prev => [...prev, errorMessage]);
            addNotification(`CRITICAL FAILURE: Agent connection lost.`, 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="h-full flex flex-col font-rajdhani animate-fadeIn">
            <ConfirmationModal isOpen={isModalOpen} title={modalTitle} body={modalBody} onConfirm={() => { if (modalAction) modalAction(); }} onClose={closeModal} />

            <header className="mb-4 flex-shrink-0">
                <h1 className="font-orbitron text-2xl md:text-3xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                    <Icons.MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-neon-surge" /> SECURE COMM LINK
                </h1>
                <p className="text-neon-surge font-jetbrains-mono text-xs md:text-sm uppercase tracking-widest mt-1 ml-9 md:ml-11 text-glow">
                    // VPR STATUS: {isAuthReady ? 'READY' : 'SYNCING'} // USER ID: {userId ? userId.substring(0, 8) + '...' : 'ANONYMOUS'}
                </p>
            </header>

            <main className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_auto] gap-0 overflow-hidden relative bg-foundation border border-[#333] rounded-xl shadow-[0_0_25px_rgba(0,255,192,0.1)]">

                {/* Contacts Panel */}
                <div className={`w-full bg-foundation flex-shrink-0 flex flex-col transition-transform duration-300 absolute inset-0 z-20 md:relative md:z-auto ${mobileView === 'chat' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
                    <div className="p-4 border-b border-[#333]"><Input placeholder="SEARCH FREQUENCIES..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="text-xs h-9" /></div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {filteredContacts.map(contact => (
                            <button key={contact.id} onClick={() => handleContactSelect(contact.id)} className={`w-full text-left p-4 flex gap-4 transition-all border-l-4 hover:bg-foundation-light ${activeContactId === contact.id ? 'bg-foundation-light border-neon-surge' : 'border-transparent'}`}>
                                <div className="relative flex-shrink-0">
                                    <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${contact.role === 'AI AGENT' ? 'bg-neon-surge/10 border-neon-surge/30' : 'bg-foundation-lighter border-[#333]'}`}>
                                        {contact.role === 'AI AGENT' ? <Icons.Cpu className="h-6 w-6 text-neon-surge" /> : <Icons.Users className="h-6 w-6 text-text-tertiary" />}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-foundation ${contact.status === 'online' ? 'bg-neon-surge' : 'bg-text-tertiary'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`font-orbitron text-sm uppercase truncate ${contact.role === 'AI AGENT' ? 'text-neon-surge' : 'text-white'}`}>{contact.name}</span>
                                        <span className="text-[10px] font-jetbrains-mono text-[#666]">{contact.time}</span>
                                    </div>
                                    <p className={`text-xs truncate font-jetbrains-mono ${contact.unread ? 'text-neon-surge font-bold' : 'text-[#666]'}`}>{contact.lastMessage}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Panel */}
                <div className={`flex-1 flex flex-col bg-foundation-light transition-transform duration-300 absolute inset-0 z-20 md:relative md:z-auto ${mobileView === 'list' ? 'translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
                    {activeContact ? (
                        <>
                            <header className="h-16 flex-shrink-0 bg-foundation border-b border-neon-surge/10 flex items-center px-4 justify-between shadow-inner shadow-black/50">
                                <div className="flex items-center gap-3">
                                    <button onClick={handleBackToList} className="md:hidden text-text-tertiary hover:text-white"><Icons.ChevronLeft className="h-6 w-6" /></button>
                                    <div>
                                        <h2 className={`font-orbitron text-white text-base uppercase tracking-wider ${activeContact.role === 'AI AGENT' ? 'text-neon-surge text-glow' : ''}`}>{activeContact.name}</h2>
                                        <p className="font-jetbrains-mono text-[10px] text-neon-surge uppercase">// {activeContact.role}</p>
                                    </div>
                                </div>
                                <button title="Toggle System Logs" className="hidden lg:block text-text-tertiary hover:text-white" onClick={() => setIsLogPanelOpen(p => !p)}>
                                    <Icons.Terminal className="h-5 w-5" />
                                </button>
                            </header>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-grid"><div className="space-y-6">
                                {chatHistory.map(msg => <ChatMessage key={msg.id} msg={msg} />)}
                                {isLoading && <ThinkingBubble />}
                                <div ref={chatEndRef} />
                            </div></div>

                            <footer className="p-4 bg-foundation border-t border-neon-surge/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                                <form onSubmit={handleSendMessage} className="flex gap-3">
                                    <Input value={messageInput} onChange={(e: any) => setMessageInput(e.target.value)} placeholder={activeContactId === 1 ? "Transmit..." : "Channel Locked"} className="text-sm h-11" disabled={isLoading || activeContactId !== 1} />
                                    <Button type="submit" size="lg" className="w-16 h-11" disabled={!messageInput.trim() || isLoading || activeContactId !== 1}><Icons.ArrowRight className="h-5 w-5" /></Button>
                                </form>
                            </footer>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-text-tertiary p-6 text-center bg-grid">
                            <Icons.Activity className="h-16 w-16 opacity-20 text-neon-surge animate-pulse" />
                            <h3 className="font-orbitron text-xl text-white uppercase tracking-widest mb-2">AWAITING SIGNAL</h3>
                        </div>
                    )}
                </div>

                {/* System Logs Panel */}
                <aside className={`lg:flex flex-col bg-foundation border-l border-[#333] transition-all duration-300 ease-in-out hidden ${isLogPanelOpen ? 'w-[320px] opacity-100' : 'w-0 opacity-0'}`}>
                    <header className="p-4 border-b border-neon-surge/10 flex justify-between items-center">
                        <h3 className="font-orbitron text-lg text-white uppercase tracking-wider">SYSTEM LOGS</h3>
                        <button onClick={handleClearNotificationHistory} disabled={notifications.length === 0} className="text-text-tertiary hover:text-white disabled:opacity-30"><Icons.X className="h-4 w-4" /></button>
                    </header>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                        {notifications.map(n => {
                            const iconMap = { system: Icons.Info, warning: Icons.AlertTriangle, error: Icons.AlertTriangle };
                            const colorMap = { system: 'text-blue-400', warning: 'text-yellow-400', error: 'text-red-500'};
                            const Icon = iconMap[n.type];
                            return (
                                <div key={n.id} className="font-jetbrains-mono text-[10px] p-2 rounded bg-foundation-light border border-[#333]">
                                    <p className={`flex items-start gap-2 ${colorMap[n.type]}`}><Icon className="h-3 w-3 mt-0.5 shrink-0" /> {n.message}</p>
                                    <p className="text-[#666] text-right mt-1">{n.timestamp}</p>
                                </div>
                            );
                        })}
                    </div>
                    <footer className="p-4 border-t border-[#333] space-y-2">
                         <label className="font-jetbrains-mono text-xs text-neon-surge uppercase flex items-center justify-between gap-2 cursor-pointer">
                            <span><Icons.Save className="h-4 w-4 inline mr-1" /> VPR HISTORY SAVE</span>
                            <input type="checkbox" checked={saveHistory} onChange={() => setSaveHistory(p => !p)} disabled={!db} className="accent-neon-surge" />
                        </label>
                        <Button onClick={handleClearChatHistory} variant="destructive" size="sm" className="w-full text-xs" disabled={activeContactId !== 1}><Icons.Trash className="h-4 w-4 mr-2" /> PURGE AGENT HISTORY</Button>
                    </footer>
                </aside>

            </main>
        </div>
    );
};
export default MessagesPage;
