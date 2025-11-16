import React from 'react';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  const progressValue = Math.max(0, Math.min(100, progress));

  return (
    <div className={`w-full bg-foundation-lighter rounded-full h-2.5 ${className}`}>
      <div
        className="bg-neon-surge h-2.5 rounded-full shadow-[0_0_10px_#00FFC0]"
        style={{ width: `${progressValue}%`, transition: 'width 0.5s ease-in-out' }}
      ></div>
    </div>
  );
};