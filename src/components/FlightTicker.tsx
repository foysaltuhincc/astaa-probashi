import React from 'react';
import { Plane } from 'lucide-react';
import { FLIGHT_DEALS } from '../data/mockData';

export const FlightTicker: React.FC = () => {
  const items = [...FLIGHT_DEALS, ...FLIGHT_DEALS];

  return (
    <div className="bg-slate-950 border-b border-white/10 overflow-hidden">
      <style>{`
        @keyframes probashi-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .probashi-ticker-track {
          animation: probashi-ticker-scroll 45s linear infinite;
        }
        .probashi-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex items-stretch">
        <a
          href="#flight-affiliate-section"
          className="shrink-0 z-10 flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[11px] font-extrabold px-3 py-2"
        >
          <Plane className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">আজকের টিকিট দর</span>
          <span className="sm:hidden">টিকিট</span>
        </a>
        <div className="relative flex-1 overflow-hidden">
          <div className="probashi-ticker-track flex items-center gap-8 whitespace-nowrap py-2 pl-4 w-max">
            {items.map((f, i) => (
              <a
                key={`${f.id}-${i}`}
                href="#flight-affiliate-section"
                className="inline-flex items-center gap-1.5 text-[11px] text-slate-200 hover:text-amber-300 transition-colors"
              >
                <span className="font-bold text-white">
                  {f.fromCode}→{f.toCode}
                </span>
                <span className="text-slate-400">{f.airline}</span>
                <span className="font-extrabold text-amber-300">
                  ৳{f.priceBdt.toLocaleString('en-US')}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
