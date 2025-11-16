import React, { useState } from 'react';

interface TabsProps {
    tabs: string[];
    children: React.ReactNode[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="border-b border-white/10 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(index)}
                            className={`${
                                activeTab === index
                                    ? 'border-neon-surge text-neon-surge'
                                    : 'border-transparent text-[#8d8c9e] hover:text-white hover:border-gray-500'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-orbitron text-sm transition-colors uppercase tracking-wider`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            <div>
                {children.map((child, index) => (
                    <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
};