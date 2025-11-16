import React from 'react';
import { Hero } from '../components/Hero';
import { CoreSections } from '../components/CoreSections';
import { FinalCTA } from '../components/FinalCTA';

interface HomePageProps {
  onRegisterClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRegisterClick }) => {
  return (
    <div className="animate-fadeIn">
      <Hero onRegisterClick={onRegisterClick} />
      <CoreSections />
      <FinalCTA />
    </div>
  );
};

export default HomePage;