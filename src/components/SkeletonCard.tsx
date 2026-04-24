import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-surface-container-low border border-surface-variant rounded-lg p-6 relative flex flex-col h-full animate-pulse">
      <div className="absolute top-0 right-0 p-3 z-10">
        <div className="w-20 h-8 bg-surface-container-high rounded"></div>
      </div>
      <div className="w-full h-48 mb-4 rounded bg-surface-container-high border border-surface-variant"></div>
      <div className="w-3/4 h-6 bg-surface-container-high mb-2 rounded"></div>
      <div className="w-full h-4 bg-surface-container-high mb-4 rounded"></div>
      <div className="w-2/3 h-4 bg-surface-container-high mb-4 rounded"></div>

      <div className="flex flex-col gap-2 mt-auto">
        <div className="w-1/2 h-4 bg-surface-container-high mb-2 rounded"></div>
        <div className="flex justify-between items-center border-t border-surface-variant pt-4">
          <div className="w-1/4 h-4 bg-surface-container-high rounded"></div>
          <div className="w-16 h-4 bg-surface-container-high rounded"></div>
        </div>
      </div>
    </div>
  );
}


