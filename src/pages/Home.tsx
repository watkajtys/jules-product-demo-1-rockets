import React, { Suspense } from "react";
import CatalogGrid from "../components/CatalogGrid";
import SkeletonCard from "../components/SkeletonCard";
import ErrorBoundary from "../components/ErrorBoundary";



export default function Home() {
  return (
    <>
      <section className="mb-12 relative rounded-xl overflow-hidden border-2 border-surface-variant bg-surface-container-low shadow-[0_0_15px_rgba(0,0,0,0.5)] scanline-overlay">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
        <img 
          alt="Dramatic retrofuturistic rocket launch" 
          className="w-full h-[530px] md:h-[618px] object-cover absolute inset-0 z-0 opacity-60" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCISwIghn4PvHXcXulqfi-OdnpmGsYvTI8kN4V0Xo6w1q85eCc4grpL6SKVTWWbMlCnkpcPJalcaGtyT6d38kns6FHS5oF2RaUwRhjwruj9L7in3hYZtcJLS3dmsoTAzNq41oGfCqyCA6vFsSlR7XOzxwhxC0qHX1N1V5A8HvolMIoZgoTW-TnZYrJ6EnmXy5SOjvnnB2D6AooDglnxfP_pPHUV5rX-kgrqxd1cm9vbIG8P8DJ7a-7_CqoMnYXaCCLkFRdrzWRjNak"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 p-8 md:p-16 h-full flex flex-col justify-center max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-on-background mb-4 drop-shadow-lg uppercase tracking-tight leading-tight">THE FUTURE OF ORBITAL COMMERCE</h1>
          <p className="text-lg text-on-surface-variant mb-8 max-w-lg border-l-2 border-primary pl-4">Advanced propulsion technologies for the next generation of interplanetary logistics. Built for reliability, designed for the cosmos.</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-on-primary font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-sm border border-primary-fixed-dim hover:bg-primary-fixed hover:shadow-[0_0_15px_rgba(255,180,166,0.4)] active:scale-95 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center gap-2"
            >
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>rocket</span>
              Browse Catalog
            </button>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-12">
        <section id="catalog" className="w-full flex flex-col gap-6 scroll-mt-28">
          <div className="flex items-center gap-4 border-b border-surface-variant pb-2">
            <span className="material-symbols-outlined text-primary text-2xl">precision_manufacturing</span>
            <h2 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Propulsion Systems Catalog</h2>
          </div>
          
          <div className="flex items-center gap-2 py-2 overflow-x-auto no-scrollbar mb-4">
            {["ALL SYSTEMS", "PROPULSION", "TELEMETRY", "SYSTEMS"].map((cat) => (
              <button key={cat} className="whitespace-nowrap px-4 py-2 border border-surface-variant bg-surface-container-low text-[10px] uppercase font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors hover:shadow-[inset_0_0_10px_rgba(255,180,166,0.1)] rounded">
                {cat}
              </button>
            ))}
          </div>

          <ErrorBoundary fallback={
            <div className="p-8 bg-error-container/10 border border-error/30 text-error text-center rounded font-mono">
              <span className="material-symbols-outlined text-2xl mb-2 animate-pulse">warning</span>
              <h4 className="text-xs font-bold uppercase">CATALOG DATA UNAVAILABLE</h4>
              <p className="text-[9px] text-on-surface-variant/80 uppercase mt-1">Failed to establish link with orbital inventory manifest.</p>
            </div>
          }>
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            }>
              <CatalogGrid />
            </Suspense>
          </ErrorBoundary>

        </section>



        <aside className="w-full flex flex-col gap-6">
          <div className="flex items-center gap-4 border-b border-surface-variant pb-2">
            <span className="material-symbols-outlined text-primary text-2xl">satellite_alt</span>
            <h2 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Mission Updates</h2>
          </div>
          <div className="bg-surface-container-low border border-surface-variant rounded-lg p-1 scanline-overlay relative">
            <div className="bg-surface-container-lowest p-5 rounded h-full relative z-10 flex flex-col gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              <div className="border-b border-surface-variant pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-tertiary drop-shadow-[0_0_2px_rgba(49,225,146,0.3)] uppercase">T-MINUS 14:00:00</span>
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                </div>
                <h4 className="text-xs font-bold text-on-surface uppercase mb-1">Artemis Payload Integration</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">Final checks completed on the secondary payload bus. Fairing encapsulation scheduled for 0800 hours.</p>
              </div>
              <div className="border-b border-surface-variant pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-secondary uppercase">T-PLUS 45 DAYS</span>
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                </div>
                <h4 className="text-xs font-bold text-on-surface uppercase mb-1">Orbital Hub Alpha Status</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">Solar array deployment nominal. Life support systems engaging primary cycle.</p>
              </div>
              <div className="border-b border-surface-variant pb-3 opacity-70">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-secondary uppercase">ARCHIVED</span>
                  <span className="w-2 h-2 rounded-full bg-surface-variant"></span>
                </div>
                <h4 className="text-xs font-bold text-on-surface uppercase mb-1">Engine Test Stand Firing</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">Successful full-duration burn of the Vanguard prototype at Site 4.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
