import React from 'react';

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    style={{ boxSizing: 'border-box' }}
  >
    {children}
  </div>
);

export default PageLayout;
