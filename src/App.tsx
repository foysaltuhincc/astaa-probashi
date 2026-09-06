import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { 
  Plane, 
  Coins, 
  Building2, 
  HeartPulse, 
  Sparkles, 
  ArrowRight, 
  Newspaper,
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  TrendingDown,
  Stethoscope,
  DollarSign,
  BadgeCheck,
  Headphones,
  HeartHandshake,
  MapPin
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { CurrencyTicker } from './components/CurrencyTicker';
import { FlightAffiliateSearch } from './components/FlightAffiliateSearch';
import { AgencyComparisonSection } from './components/AgencyComparisonSection';
import { AstaaStoreSection } from './components/AstaaStoreSection';
import { AffiliateProgramSection } from './components/AffiliateProgramSection';
import { RemittanceCalculator } from './components/RemittanceCalculator';
import { NewsSection } from './components/NewsSection';
import { HotelCarSection } from './components/HotelCarSection';
import { BangladeshMedicalServiceSection } from './components/BangladeshMedicalServiceSection';
import { HealthEmbassySection } from './components/HealthEmbassySection';
import { ArticleModal } from './components/ArticleModal';
import { WhatsAppHelpFloat } from './components/WhatsAppHelpFloat';
import { Footer } from './components/Footer';
import { 
  CURRENCY_RATES, 
  NEWS_ARTICLES 
} from './data/mockData';
import { NewsArticle } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('probashi_bookmarks');
      return saved ? JSON.parse(saved) : ['art-1', 'art-3'];
    } catch {
      return ['art-1', 'art-3'];
    }
  });
  const [activeCurrencyCode, setActiveCurrencyCode] = useState('SAR');

  useEffect(() => {
    try {
      localStorage.setItem('probashi_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectCurrencyTicker = (code: string) => {
    setActiveCurrencyCode(code);
    setActiveTab('remittance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToFlights = () => {
    setActiveTab('flights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Currency Ticker */}
      <CurrencyTicker 
        rates={CURRENCY_RATES} 
        onSelectCurrency={handleSelectCurrencyTicker} 
      />

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Hero Section shown on 'all' tab */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            {/* Core Value Proposition Hero */}
            <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-emerald-950/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(16,185,129,.34),transparent_28%),radial-gradient(circle_at_70%_90%,rgba(14,165,233,.2),transparent_30%)]" />
              <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -left-8 bottom-12 h-40 w-40 rounded-full border border-emerald-400/20" />

              <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:p-12">
                <div className="max-w-3xl">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-100">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    প্রবাসী পরিবারের জন্য এক জায়গায় প্রয়োজনীয় সেবা
                  </div>

                  <h1 className="max-w-2xl text-4xl font-black leading-[1.18] tracking-tight sm:text-5xl lg:text-6xl">
                    দূরত্ব কমান, পরিবারের পাশে থাকুন
                  </h1>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    স্বচ্ছ দামে বিমান টিকিট, দেশে পরিবারের জন্য প্রয়োজনীয় কেনাকাটা এবং নির্ভরযোগ্য সহায়তা—সবকিছু এখন আপনার হাতের মুঠোয়।
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={handleScrollToFlights} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-300 cursor-pointer">
                      <Plane className="h-4 w-4" /> বিমান টিকিট খুঁজুন <ArrowRight className="h-4 w-4" />
                    </button>
                    <button onClick={() => setActiveTab('shopping')} className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20 cursor-pointer">
                      <ShoppingBag className="h-4 w-4 text-purple-200" /> পরিবারের জন্য কিনুন
                    </button>
                  </div>
                </div>

                <aside className="rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Astaa promise</p>
                  <div className="mt-5 space-y-4">
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300"><BadgeCheck className="h-5 w-5" /></span>
                      <div><p className="font-bold">স্বচ্ছ সেবা ও সাশ্রয়</p><p className="mt-0.5 text-xs leading-5 text-slate-300">অফলাইন এজেন্সির বাড়তি কমিশন ছাড়াই বুকিং করুন।</p></div>
                    </div>
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300"><MapPin className="h-5 w-5" /></span>
                      <div><p className="font-bold">৬৪ জেলায় পরিবারের কাছে</p><p className="mt-0.5 text-xs leading-5 text-slate-300">উপহার ও প্রয়োজনীয় জিনিস পৌঁছে দিন দেশে।</p></div>
                    </div>
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300"><Headphones className="h-5 w-5" /></span>
                      <div><p className="font-bold">প্রয়োজনে দ্রুত সহায়তা</p><p className="mt-0.5 text-xs leading-5 text-slate-300">আমাদের সহকারীকে জিজ্ঞাসা করুন, আমরা পাশে আছি।</p></div>
                    </div>
                  </div>
                  <button onClick={() => document.getElementById('btn-whatsapp-float')?.click()} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-extrabold text-emerald-950 transition hover:bg-emerald-300 cursor-pointer">
                    <HeartHandshake className="h-4 w-4" /> এআই সহকারীকে প্রশ্ন করুন
                  </button>
                </aside>
              </div>
            </section>

            {/* Quick Action Category Grid */}
            <section>
              <div className="mb-4 flex items-end justify-between gap-4">
                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Explore services</p><h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">আপনার প্রয়োজনের সেবা বেছে নিন</h2></div>
                <button onClick={() => setActiveTab('agency-compare')} className="hidden items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 sm:inline-flex cursor-pointer">কেন Astaa? <ArrowRight className="h-3.5 w-3.5" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              <button
                onClick={() => setActiveTab('flights')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-sky-400 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Plane className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">বিমান টিকিট</h3>
                <p className="text-[11px] text-slate-500">৪৬ কেজি লাগেজ ছাড়</p>
              </button>

              <button
                onClick={() => setActiveTab('agency-compare')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <TrendingDown className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">এজেন্সি সাশ্রয়</h3>
                <p className="text-[11px] text-slate-500">৳৩০০০-৮০০০ বাঁচান</p>
              </button>

              <button
                onClick={() => setActiveTab('affiliate')}
                className="bg-white p-4 rounded-xl border border-emerald-300 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer bg-gradient-to-b from-white to-emerald-50/30"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">অ্যাফিলিয়েট</h3>
                <p className="text-[11px] text-emerald-700 font-semibold">রেফার করে আয়</p>
              </button>

              <button
                onClick={() => setActiveTab('doctor')}
                className="bg-white p-4 rounded-xl border border-teal-200 hover:border-teal-500 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">দেশে ডাক্তার সেবা</h3>
                <p className="text-[11px] text-slate-500">পরিবারের চিকিৎসা</p>
              </button>

              <button
                onClick={() => setActiveTab('shopping')}
                className="bg-white p-4 rounded-xl border border-purple-200 hover:border-purple-400 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">astaa.store শপিং</h3>
                <p className="text-[11px] text-slate-500">পরিবারের জন্য উপহার</p>
              </button>

              <button
                onClick={() => setActiveTab('remittance')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Coins className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">রেমিট্যান্স বোনাস</h3>
                <p className="text-[11px] text-slate-500">২.৫% প্রণোদনা রেট</p>
              </button>

              <button
                onClick={() => setActiveTab('hotels')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-400 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">এয়ারপোর্ট গাড়ি</h3>
                <p className="text-[11px] text-slate-500">নিরাপদে বাড়ি ফেরা</p>
              </button>

              <button
                onClick={() => setActiveTab('emergency')}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-rose-400 shadow-xs hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <HeartPulse className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">দূতাবাস হেল্প</h3>
                <p className="text-[11px] text-slate-500">১৬১৩৫ কল সেন্টার</p>
              </button>
              </div>
            </section>
          </div>
        )}

        {/* 1. Core Business: Flight Search & Direct Affiliate Booking */}
        {(activeTab === 'all' || activeTab === 'flights') && (
          <FlightAffiliateSearch />
        )}

        {/* 2. Official Affiliate Partner & Earning Program */}
        {(activeTab === 'all' || activeTab === 'affiliate') && (
          <AffiliateProgramSection />
        )}

        {/* 3. Agency Comparison: Why buy on our site instead of offline agency */}
        {(activeTab === 'all' || activeTab === 'agency-compare') && (
          <AgencyComparisonSection onGoToFlightSearch={handleScrollToFlights} />
        )}

        {/* 3. Shopping for Family in Bangladesh: astaa.store */}
        {(activeTab === 'all' || activeTab === 'shopping') && (
          <AstaaStoreSection />
        )}

        {/* 4. Live Remittance & Incentive Calculator */}
        {(activeTab === 'all' || activeTab === 'remittance') && (
          <RemittanceCalculator 
            rates={CURRENCY_RATES} 
            defaultCurrencyCode={activeCurrencyCode}
          />
        )}

        {/* 5. Transit Hotel & Airport to Home Safe Car Booking */}
        {(activeTab === 'all' || activeTab === 'hotels') && (
          <HotelCarSection />
        )}

        {/* 6. News & Expat Magazine / Immigration Articles */}
        {(activeTab === 'all' || activeTab === 'news') && (
          <NewsSection
            articles={NEWS_ARTICLES}
            searchQuery={searchQuery}
            onSelectArticle={(article) => setSelectedArticle(article)}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {/* 7. Doctor Appointment & Emergency Healthcare for Expat Family */}
        {(activeTab === 'all' || activeTab === 'doctor' || activeTab === 'emergency') && (
          <BangladeshMedicalServiceSection />
        )}

        {/* 8. Emergency Embassy Directory & Welfare */}
        {(activeTab === 'all' || activeTab === 'emergency') && (
          <HealthEmbassySection />
        )}
      </main>

      {/* Article Detail Reading Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={selectedArticle ? bookmarks.includes(selectedArticle.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* 24/7 Omnipresent WhatsApp Support Floating Desk */}
      <WhatsAppHelpFloat />

      {/* Footer */}
      <Footer 
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      <Analytics />
    </div>
  );
}
