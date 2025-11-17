import React, { useContext } from 'react';
import { Icons } from '../components/icons';
import { Button } from '../components/Button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion';
import { AppContext, AppContextType } from '../context/AppContext';


const FAQPage: React.FC = () => {
  const appContext = useContext(AppContext as React.Context<AppContextType | undefined>);

  const INTEL_ITEMS = [
    {
        id: "Q1",
        title: "ZAP: Not a Casino. A Catalyst. What exactly is ZAP?",
        content: "We’re the decentralized brain for crypto gaming. Forget the outdated affiliate model—we’re a data engine, a community watchdog, and a rewards platform rolled into one. Our mission is to reroute the flow and put the power back where it belongs: with the player."
    },
    {
        id: "Q2",
        title: "How are you different from the other 'review sites'?",
        content: "Most are just sales funnels disguised as reviews. We're a utility. We prioritize raw, verified RTPs and community intelligence over paid placement. Our focus is finding your edge, not maximizing their commission."
    },
    {
        id: "Q3",
        title: "Will you take money to boost an operator’s rating?",
        content: "Zero chance. Our reputation is our only asset. We will never compromise a review score for payment. Ratings are locked to the ZAP Score Methodology (40% raw data, 30% security, 20% Veto power). If an operator fails, we call them out. End of story."
    },
    {
        id: "Q4",
        title: "If you won't take bribes, how does ZAP make money?",
        content: "Transparency is non-negotiable. We run standard affiliate partnerships with operators who pass our rigorous Vetting Protocol. This commission funds our data science and auditing. The difference is we disclose everything and feed a percentage of that revenue directly back to the community via the Shared Success Protocol (SSP)."
    },
    {
        id: "Q5",
        title: "What does \"Built by Degens, For the Edge\" actually mean?",
        content: "It means we're in the trenches with you. Our team is former operators, pro gamblers, and data analysts. We know the tricks because we used to run them—and now we’re using that knowledge to give the community the absolute tactical advantage."
    },
    {
        id: "Q6",
        title: "You talk about community power. How does that work?",
        content: "The collective wisdom of thousands beats any single expert. Your verifiable Validated Player Reports (VPRs) and real-time intelligence directly influence platform ratings and can even trigger a Community Veto against a failing operator. You're the quality control."
    },
    {
        id: "Q7",
        title: "What kind of \"raw data\" can I expect to see on ZAP?",
        content: "We go deep. Expect verified True RTP metrics, clear Bonus Protocol Analysis (what the wagering requirement really costs), payout speed tracking, and fee structure deep dives. We provide the verifiable numbers needed to game smarter."
    },
    {
        id: "Q8",
        title: "Do you promote every crypto casino that asks?",
        content: "Absolutely not. We're your Zero-Tolerance Filter. If an operator doesn't meet our ruthless standards for security, compliance, and verifiable fairness, they don't get stamped. We choose curated, high-signal quality over confusing volume."
    },
    {
        id: "Q9",
        title: "How do I earn real rewards for participating?",
        content: "You contribute raw data, you earn rewards. We reward active contributors—those who submit VPRs, help vet the ecosystem, and drive quality—with ZP (Zap Points) that can be redeemed for crypto, high-value bonuses, and exclusive assets via the Shared Success Protocol (SSP) Payout Center."
    },
    {
        id: "Q10",
        title: "What’s the single core philosophy driving ZAP?",
        content: "Gamble Smarter, Not Harder. This is the operating system for every tool, every review, and every data point we provide. It’s designed to maximize your potential return, sharpen your play, and give you a critical advantage over the house."
    }
  ];

  return (
    <div className="container mx-auto max-w-5xl animate-fadeIn">

        <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
                <Icons.BookOpen className="h-8 w-8 text-neon-surge animate-pulse" />
                <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
                    ZAP HQ: FREQUENTLY FIRED QUESTIONS
                </h1>
            </div>
            <p className="text-neon-surge font-jetbrains-mono text-sm uppercase tracking-widest ml-11">
                // INTEL DATABASE // STATUS: CLEAR SIGNAL
            </p>
        </div>

        <div className="bg-foundation-light border-l-4 border-neon-surge p-6 mb-10 rounded-r-xl shadow-lg">
            <p className="text-lg text-white leading-relaxed font-medium">
                Straight answers. No fluff. Everything you need to know about the ZAP revolution.
            </p>
        </div>

        {/* FIX: Accordion components are now correctly structured with children. */}
        <div className="bg-foundation-light rounded-xl border border-[#333] shadow-2xl overflow-hidden p-2 md:p-4">
            <Accordion multiple={false} defaultOpen={["Q1"]}>
                {INTEL_ITEMS.map((item) => (
                    <AccordionItem value={item.id} key={item.id}>
                        <AccordionTrigger>
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-left py-2">
                                <span className="font-jetbrains-mono text-neon-surge text-sm bg-neon-surge/10 px-2 py-1 rounded-md border border-neon-surge/30 whitespace-nowrap self-start">
                                    [{item.id}]
                                </span>
                                <span className="font-bold text-white uppercase text-base md:text-lg hover:text-neon-surge transition-colors leading-tight font-orbitron">
                                    {item.title}
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-6 md:pl-12 pr-4 pb-4">
                                <p className="text-text-secondary text-base leading-relaxed border-l-2 border-[#333] pl-4 font-rajdhani">
                                    {item.content}
                                </p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

        <div className="mt-12 p-8 bg-foundation-light border border-neon-surge/30 rounded-xl relative overflow-hidden text-center shadow-[0_0_50px_rgba(0,255,192,0.1)]">
            <div className="relative z-10">
                <Icons.MessageSquare className="h-12 w-12 text-neon-surge mx-auto mb-4" />
                <h3 className="font-orbitron text-2xl font-bold text-white uppercase mb-2">SIGNAL NOT FOUND?</h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto text-sm md:text-base font-rajdhani">
                    If the answer isn't above, it's time to connect with our specialized team. We're always running.
                </p>
                <Button 
                    size="lg" 
                    onClick={() => appContext?.setCurrentPage('Support')} 
                    className="shadow-[0_0_30px_rgba(0,255,192,0.5)] font-extrabold uppercase tracking-widest px-8 transition-transform transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    ACTIVATE SUPPORT LINE &rarr;
                </Button>
            </div>
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(0,255,192,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,192,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

    </div>
  );
};

export default FAQPage;