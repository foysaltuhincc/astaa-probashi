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
  DollarSign
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
            <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden border border-emerald-800/40">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-sky-500/10 to-transparent pointer-events-none" />
              
              <div className="max-w-3xl relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/40 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>দালাল ও অফলাইন এজেন্সির বাড়তি চার্জ ছাড়া সরাসরি সেবা</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  কম খরচে বিমান টিকিট ও astaa.store দিয়ে পরিবারের যত্ন
                </h1>

                <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
                  সাধারণ ট্রাভেল এজেন্সির ৩,০০০-৮,০০০ টাকা কমিশন বাঁচিয়ে সরাসরি ৪৬ কেজি নিশ্চিত ব্যাগেজসহ টিকিট কাটুন। এছাড়া বিদেশ থেকে astaa.store-এর মাধ্যমে দেশে থাকা মা-বাবা ও পরিবারের কাছে খাঁটি খাদ্য, গ্যাজেট ও উপহার পৌঁছে দিন ৬৪ জেলায়!
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleScrollToFlights}
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer hover:scale-102"
                  >
                    <Plane className="w-4 h-4 text-slate-950" />
                    <span>সাশ্রয়ী বিমান টিকিট কাটুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('shopping')}
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-purple-200" />
                    <span>astaa.store কেনাকাটা</span>
                  </button>

                  <button
                    onClick={() => document.getElementById('btn-whatsapp-float')?.click()}
                    className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition-colors shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>এআই সহকারীকে প্রশ্ন করুন</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('agency-compare')}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium px-4 py-3 rounded-xl border border-white/20 transition-colors cursor-pointer"
                  >
                    <TrendingDown className="w-4 h-4 text-emerald-300" />
                    <span>এজেন্সির সাথে তুলনা</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
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
