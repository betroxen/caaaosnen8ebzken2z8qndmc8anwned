import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-foundation-light border border-[#333333] rounded-xl p-0 overflow-hidden">
      <div className="relative w-full h-full p-5 space-y-4 overflow-hidden bg-foundation-light before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-foundation-lighter before:to-transparent">
        {/* Header */}
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-foundation flex-shrink-0"></div>
            <div className="space-y-2 flex-1">
                <div className="h-5 w-3/4 rounded bg-foundation"></div>
                <div className="h-3 w-1/2 rounded bg-foundation"></div>
            </div>
        </div>

        {/* Body */}
        <div className="space-y-3 pt-4">
            <div className="h-4 w-full rounded bg-foundation"></div>
            <div className="h-4 w-5/6 rounded bg-foundation"></div>
            <div className="h-4 w-3/4 rounded bg-foundation"></div>
        </div>

        {/* Footer */}
        <div className="pt-4">
            <div className="h-10 w-1/2 rounded bg-foundation"></div>
        </div>
      </div>
    </div>
  );
};