import React from 'react';
import { TrendingUp, TrendingDown, Gift } from 'lucide-react';
import { CurrencyRate } from '../types';

interface CurrencyTickerProps {
  rates: CurrencyRate[];
  onSelectCurrency?: (code: string) => void;
}

export const CurrencyTicker: React.FC<CurrencyTickerProps> = ({ rates, onSelectCurrency }) => {
  return (
    <div id="currency-ticker" className="bg-emerald-900 text-emerald-100 text-xs border-b border-emerald-800/80 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 bg-emerald-700/60 text-emerald-200 px-2 py-0.5 rounded font-medium border border-emerald-600/50">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>সরকারি ২.৫% প্রণোদনা চালু</span>
          </span>
          <span className="text-emerald-300 font-semibold hidden md:inline">
            লাইভ মুদ্রা রেট (১ ইউনিট = ৳):
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto scrollbar-none py-0.5">
          {rates.map((rate) => {
            const isPositive = rate.change24h >= 0;
            return (
              <button
                key={rate.code}
                id={`ticker-rate-${rate.code}`}
                onClick={() => onSelectCurrency?.(rate.code)}
                className="inline-flex items-center gap-1.5 bg-emerald-950/60 hover:bg-emerald-800/70 border border-emerald-800/40 rounded px-2.5 py-1 whitespace-nowrap transition-colors cursor-pointer text-left"
                title={`${rate.name} - রেমিট্যান্স হিসাব করতে ক্লিক করুন`}
              >
                <span>{rate.flag}</span>
                <span className="font-bold text-white tracking-wide">{rate.code}</span>
                <span className="text-amber-300 font-mono font-medium">৳{rate.rateToBdt.toFixed(2)}</span>
                <span className={`inline-flex items-center text-[10px] ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPositive ? (
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                  )}
                  {Math.abs(rate.change24h)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
