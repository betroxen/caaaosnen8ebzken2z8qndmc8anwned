import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-foundation-light border border-[#333] rounded-xl transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
