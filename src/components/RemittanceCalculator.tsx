import React, { useState } from 'react';
import { 
  Calculator, 
  Gift, 
  ShieldCheck, 
  AlertTriangle, 
  Coins, 
  Sparkles,
  Smartphone,
  Landmark
} from 'lucide-react';
import { CurrencyRate } from '../types';

interface RemittanceCalculatorProps {
  rates: CurrencyRate[];
  defaultCurrencyCode?: string;
}

export const RemittanceCalculator: React.FC<RemittanceCalculatorProps> = ({
  rates,
  defaultCurrencyCode = 'SAR'
}) => {
  const [selectedCode, setSelectedCode] = useState(defaultCurrencyCode);
  const [foreignAmount, setForeignAmount] = useState<number>(2000);

  const currentRate = rates.find((r) => r.code === selectedCode) || rates[0];

  const baseBdt = Math.round(foreignAmount * currentRate.rateToBdt);
  const incentiveAmount = Math.round(baseBdt * (currentRate.govtIncentivePercent / 100));
  const totalReceivedBdt = baseBdt + incentiveAmount;

  return (
    <div id="remittance-calculator-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/40 mb-2">
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>বাংলাদেশ ব্যাংক অনুমোদিত সরকারি ২.৫% প্রণোদনা অন্তর্ভুক্ত</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              লাইভ রেমিট্যান্স ক্যালকুলেটর ও মুদ্রা রেট
            </h2>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              বৈধ ব্যাংকিং ও মোবাইল ওয়ালেটের মাধ্যমে দেশে টাকা পাঠানোর আসল হিসাব জেনে নিন।
            </p>
          </div>

          <div className="bg-emerald-950/60 border border-emerald-700/60 rounded-xl p-3 text-right">
            <span className="text-[11px] text-emerald-300 block">বর্তমান বাজার দর</span>
            <div className="text-xl font-mono font-bold text-amber-300">
              ১ {currentRate.code} = ৳{currentRate.rateToBdt.toFixed(2)}
            </div>
            <span className="text-[10px] text-emerald-400">সর্বশেষ আপডেট: আজ লাইভ</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Calculator & Breakdown */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              আপনি কোন দেশ থেকে টাকা পাঠাচ্ছেন?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {rates.map((rate) => {
                const isSelected = rate.code === selectedCode;
                return (
                  <button
                    key={rate.code}
                    id={`btn-curr-${rate.code}`}
                    onClick={() => setSelectedCode(rate.code)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="text-base">{rate.flag}</span>
                    <div>
                      <div className="leading-tight">{rate.code}</div>
                      <div className="text-[10px] text-slate-500 font-normal truncate max-w-[60px]">
                        {rate.name.split(' ')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              টাকার পরিমাণ ({currentRate.name} - {currentRate.code})
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-lg font-bold text-slate-400">
                {currentRate.symbol}
              </span>
              <input
                id="input-remittance-amount"
                type="number"
                min="10"
                value={foreignAmount || ''}
                onChange={(e) => setForeignAmount(Math.max(0, Number(e.target.value)))}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xl font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                placeholder="যেমন: ২০০০"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[500, 1000, 2000, 3000, 5000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setForeignAmount(preset)}
                  className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-md border border-slate-200 transition-colors"
                >
                  {preset} {currentRate.code}
                </button>
              ))}
            </div>
          </div>

          {/* Safety & Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950 mb-1">হুন্ডিতে টাকা পাঠাবেন না:</p>
              <p className="leading-relaxed">
                হুন্ডি অবৈধ ও চরম ঝুঁকিপূর্ণ। ব্যাংক বা বিকাশ রেমিট্যান্সের মাধ্যমে পাঠালে সরকার সরাসরি ২.৫% নগদ বোনাস দেয় এবং আপনার পরিবারের হাতে শতভাগ নিরাপদভাবে পৌঁছে যায়।
              </p>
            </div>
          </div>
        </div>

        {/* Right Result Card */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-600" />
                দেশে প্রাপ্ত অর্থের হিসাব
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                বৈধ চ্যানেল
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span>মূল বিনিময় দর (১ {currentRate.code} = ৳{currentRate.rateToBdt}):</span>
                <span className="font-mono font-semibold text-slate-900">৳{baseBdt.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-emerald-700 bg-emerald-100/60 p-2.5 rounded-lg border border-emerald-200">
                <span className="flex items-center gap-1 font-medium">
                  <Gift className="w-4 h-4 text-emerald-600" />
                  সরকারি প্রণোদনা (+২.৫% ক্যাশব্যাক):
                </span>
                <span className="font-mono font-bold text-emerald-800">+৳{incentiveAmount.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-500">বাংলাদেশে মোট পৌঁছে যাবে:</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono mt-1 text-emerald-700">
                  ৳{totalReceivedBdt.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  (কোনো প্রকার লুকানো চার্জ ছাড়া সরাসরি ব্যাংক একাউন্ট বা মোবাইল ওয়ালেটে)
                </p>
              </div>
            </div>
          </div>

          {/* Legal Channel Partner Badges */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-2.5">
              জনপ্রিয় ও নিরাপদ মাধ্যমসমূহ:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-pink-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">বিকাশ রেমিট্যান্স</span>
                  <span className="text-[10px] text-slate-500">তাৎক্ষণিক ওয়ালেটে জমা</span>
                </div>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 block">ইসলামী / অগ্রণী ব্যাংক</span>
                  <span className="text-[10px] text-slate-500">সরাসরি একাউন্ট ও প্রণোদনা</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
