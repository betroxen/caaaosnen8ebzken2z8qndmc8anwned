import React, { useContext } from 'react';
import { Button } from './Button';
import { AppContext } from '../context/AppContext';

export const FinalCTA: React.FC = () => {
  const appContext = useContext(AppContext);

  const handleRegisterClick = () => {
    if (appContext) {
      appContext.openAuthModal('register');
    }
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-foundation bg-cover bg-center" style={{backgroundImage: "url('https://files.catbox.moe/gsgpzo.jpg')"}}>
      <div className="absolute inset-0 bg-gradient-to-t from-foundation via-foundation/80 to-foundation"></div>
      
      <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center">
        <h2 className="font-orbitron font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
          THE GRID IS <span className="text-neon-surge text-glow">LIVE.</span>
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto font-rajdhani">
          Your tactical advantage is waiting. Stop guessing, start verifying. Join the protocol and unlock institutional-grade intel today.
        </p>
        <Button
          size="lg"
          onClick={handleRegisterClick}
          className="mt-10 shadow-[0_0_50px_rgba(0,255,192,0.4)] uppercase tracking-[0.2em] py-4 px-10 text-lg animate-pulse-glow-shadow"
        >
          JOIN THE CIRCUIT
        </Button>
      </div>
    </section>
  );
};