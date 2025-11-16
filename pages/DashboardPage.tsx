import React from 'react';
import { Icons } from '../components/icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

const features = [
    { 
        icon: Icons.Shield, 
        title: "ZK-Rollup Security", 
        description: "Every result is secured and proven by zero-knowledge proofs on a Layer 2 solution. Trust the math, not the operator.",
        videoSrc: "https://files.catbox.moe/8e1gap.mp4",
        assetType: 'video'
    },
    { 
        icon: Icons.Users, 
        title: "XAI Ethical Compliance", 
        description: "Our Explainable AI (XAI) framework provides automated Responsible Gaming (RG) interventions and transparent risk scoring.",
        imgSrc: "https://files.catbox.moe/lla5q6.jpg",
        assetType: 'image'
    },
    { 
        icon: Icons.Zap, 
        title: "Degen Rewards Protocol", 
        description: "Earn Zap Points for network contribution, verifiable transparency checks, and mission completion. Loyalty is coded, not assumed.",
        imgSrc: "https://files.catbox.moe/3fnexw.jpg",
        assetType: 'image'
    }
];

const DashboardWidget: React.FC<{ icon: React.FC<any>, title: string, description: string, assetType: 'video' | 'image', videoSrc?: string, imgSrc?: string }> = ({ icon: Icon, title, description, assetType, videoSrc, imgSrc }) => (
    <Card className="p-0 overflow-hidden group relative card-lift flex flex-col h-[400px]">
        {assetType === 'video' && videoSrc && (
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110"
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
        )}
        {assetType === 'image' && imgSrc && (
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 transition-transform duration-500 group-hover:scale-110"
                style={{backgroundImage: `url(${imgSrc})`}}
            ></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foundation via-foundation/80 to-transparent z-10"></div>
        
        <div className="relative z-20 flex flex-col justify-end h-full p-6 text-white">
             <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neon-surge/10 border border-neon-surge/30 transition-colors duration-300 group-hover:bg-neon-surge/20">
                <Icon className="h-6 w-6 text-neon-surge transition-transform duration-500 group-hover:rotate-12" />
              </div>
            <h3 className="font-orbitron text-xl font-bold uppercase tracking-wider text-shadow-neon">{title}</h3>
            <p className="text-sm text-text-secondary mt-2 font-rajdhani">{description}</p>
            <Button variant="ghost" size="sm" className="mt-4 self-start font-orbitron uppercase tracking-wider !px-0">
                View Protocol <Icons.ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    </Card>
);

const DashboardPage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <h1 className="font-orbitron text-3xl font-bold text-white mb-2 uppercase tracking-wider">Command Center</h1>
      <p className="text-text-secondary mb-8 font-jetbrains-mono text-sm">// Welcome back, Operator. Systems are online and nominal.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(feature => (
            <DashboardWidget 
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                assetType={feature.assetType as 'video' | 'image'}
                videoSrc={feature.videoSrc}
                imgSrc={feature.imgSrc}
            />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;