import React, { useContext } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';
import { AppContext, AppContextType } from '../context/AppContext';

const faqs = [
    {
        q: 'What is ZAP?',
        a: "ZAP is not a casino. We are the decentralized intelligence layer for crypto gaming protocols. Our mission is to arm operators and players with unbiased data, provably fair mechanics, and community-driven veto power. We replace house illusions with mathematical certainty.",
    },
    {
        q: 'How does Provably Fair work on ZAP?',
        a: "Legacy 'Provably Fair' is a half-truth. It verifies a single outcome but ignores systemic integrity. ZAP's protocol closes this loophole by using ZK-Rollups to create a Verifiable Provenance Record (VPR) for all transactions, ensuring the operator's stated RTP matches the actual, proven RNG output in real-time.",
    },
    {
        q: 'What are ZAP Points (ZP)?',
        a: "ZP are the native reward currency of the ZAP ecosystem. You earn them for network contribution, such as submitting VPRs, participating in community audits, and maintaining high platform activity. ZP is loyalty encoded, not assumed.",
    },
    {
        q: 'Is my data secure with ZAP?',
        a: "Data security is a core mandate. We utilize end-to-end encryption and Multi-Party Computation (MPC) for sensitive data. Player data is sacrosanct. For detailed intel, review our Privacy Policy.",
    },
    {
        q: 'What is a "Veto Event"?',
        a: "A Veto Event is triggered when an operator's integrity fails our protocol's continuous surveillance. This can be due to RTP deviation, a surge in negative community VPRs, or a security breach. A Veto Event results in an immediate audit and potential de-listing from the ZAP Certified Grid.",
    },
];

// FIX: Completed the component by adding JSX content and a default export.
// This resolves the error where the component was not returning a valid ReactNode
// and fixes the missing default export error in App.tsx.
const FAQPage: React.FC = () => {
  const appContext = useContext(AppContext as React.Context<AppContextType | undefined>);

  if (!appContext) return null;

  return (
    <div className="animate-fadeIn">
        <header className="text-center mb-16">
            <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                FAQ // <span className="text-neon-surge">INTEL DECRYPTION</span>
            </h1>
            <p className="font-jetbrains-mono text-lg text-neon-surge/80 mt-6 max-w-4xl mx-auto">
                {'>'} High-signal answers for mission-critical questions. No fluff. Raw data only.
            </p>
        </header>

        <Accordion multiple defaultOpen={['q1']}>
            {faqs.map((faq, i) => (
                <AccordionItem value={`q${i+1}`} key={i}>
                    <AccordionTrigger>
                        <h3 className="font-orbitron text-lg md:text-xl font-bold text-white group-hover:text-neon-surge transition-colors text-left">{faq.q}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="pb-6 pt-2 pr-8">
                            <p className="text-text-secondary font-rajdhani leading-relaxed">{faq.a}</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>

        <div className="mt-16 text-center border-t border-neon-surge/30 pt-10">
            <h2 className="font-orbitron text-2xl text-white uppercase tracking-wider">Still have a query, Operator?</h2>
            <p className="text-text-secondary mt-4 mb-6 max-w-xl mx-auto">
                If the intel archive doesn't have your answer, open a direct communication line with ZAP Support HQ.
            </p>
            <Button size="lg" onClick={() => appContext.setCurrentPage('Support')}>
                <Icons.MessageSquare className="h-5 w-5 mr-3" />
                CONTACT SUPPORT
            </Button>
        </div>
    </div>
  );
};

export default FAQPage;
