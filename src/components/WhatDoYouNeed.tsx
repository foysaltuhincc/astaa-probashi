import React from 'react';
import {
  Briefcase,
  Stamp,
  Coins,
  Plane,
  Users,
  HeartPulse,
  Scale,
  Lightbulb,
  House,
  Siren,
  MessageCircleQuestion,
} from 'lucide-react';

interface NeedOption {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  // existing app tab to open, or 'ai' to open the AI assistant drawer
  target: string;
}

const NEEDS: NeedOption[] = [
  { id: 'job', label: 'চাকরি', hint: 'JOB', icon: <Briefcase className="w-5 h-5" />, target: 'ai' },
  { id: 'visa', label: 'ভিসা', hint: 'VISA', icon: <Stamp className="w-5 h-5" />, target: 'emergency' },
  { id: 'money', label: 'টাকা', hint: 'MONEY', icon: <Coins className="w-5 h-5" />, target: 'remittance' },
  { id: 'travel', label: 'ভ্রমণ', hint: 'TRAVEL', icon: <Plane className="w-5 h-5" />, target: 'flights' },
  { id: 'family', label: 'পরিবার', hint: 'FAMILY', icon: <Users className="w-5 h-5" />, target: 'shopping' },
  { id: 'health', label: 'স্বাস্থ্য', hint: 'HEALTH', icon: <HeartPulse className="w-5 h-5" />, target: 'doctor' },
  { id: 'legal', label: 'আইনি', hint: 'LEGAL', icon: <Scale className="w-5 h-5" />, target: 'emergency' },
  { id: 'business', label: 'ব্যবসা', hint: 'BUSINESS', icon: <Lightbulb className="w-5 h-5" />, target: 'affiliate' },
  { id: 'return', label: 'দেশে ফেরা', hint: 'RETURN HOME', icon: <House className="w-5 h-5" />, target: 'ai' },
  { id: 'emergency', label: 'জরুরি', hint: 'EMERGENCY', icon: <Siren className="w-5 h-5" />, target: 'emergency' },
  { id: 'other', label: 'অন্যান্য', hint: 'OTHER', icon: <MessageCircleQuestion className="w-5 h-5" />, target: 'ai' },
];

interface Props {
  onNavigate: (tab: string) => void;
  onAskAI: () => void;
}

export const WhatDoYouNeed: React.FC<Props> = ({ onNavigate, onAskAI }) => {
  const handlePick = (opt: NeedOption) => {
    if (opt.target === 'ai') {
      onAskAI();
    } else {
      onNavigate(opt.target);
    }
  };

  return (
    <section aria-label="আজ আপনার কী দরকার" className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white shadow-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,.25),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(251,191,36,.12),transparent_30%)]" />
      <div className="relative p-6 sm:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
            Aastaa signature
          </p>
          <h2 className="mt-1 text-2xl font-black sm:text-3xl">
            আজ আপনার কী দরকার?
          </h2>
          <p className="mt-1.5 text-sm text-slate-300">
            একটা বেছে নিন — সঠিক সেবা, টুল বা তথ্যের কাছে পৌঁছে দেবো।
          </p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6 sm:gap-3">
          {NEEDS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handlePick(opt)}
              className="group flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.07] px-2 py-4 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300/40 hover:bg-white/[0.12] cursor-pointer"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 transition-colors group-hover:bg-emerald-400/25 group-hover:text-emerald-200">
                {opt.icon}
              </span>
              <span className="text-xs font-bold leading-tight sm:text-sm">{opt.label}</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                {opt.hint}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
