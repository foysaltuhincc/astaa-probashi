import React, { useState } from 'react';
import { 
  Plane, 
  Coins, 
  Newspaper, 
  Building2, 
  PhoneCall, 
  Menu, 
  X, 
  Sparkles,
  Search,
  ShoppingBag,
  TrendingDown,
  MessageCircle,
  Stethoscope,
  DollarSign
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'all', label: 'সকল ফিচার', icon: Sparkles },
    { id: 'flights', label: 'বিমান টিকিট (মূল ডিল)', icon: Plane, highlight: true },
    { id: 'agency-compare', label: 'এজেন্সি সাশ্রয়', icon: TrendingDown },
    { id: 'doctor', label: 'দেশে ডাক্তার ও জরুরি সেবা', icon: Stethoscope, badge: 'নতুন' },
    { id: 'shopping', label: 'কেনাকাটা astaa.store', icon: ShoppingBag },
    { id: 'affiliate', label: 'অ্যাফিলিয়েট পার্টনার', icon: DollarSign, badge: 'ইনকাম' },
    { id: 'remittance', label: 'মুদ্রা ও রেমিট্যান্স', icon: Coins },
    { id: 'hotels', label: 'হোটেল ও এয়ারপোর্ট গাড়ি', icon: Building2 },
    { id: 'news', label: 'সংবাদ ও ভিসা গাইড', icon: Newspaper },
    { id: 'emergency', label: 'দূতাবাস ডিরেক্টরি', icon: PhoneCall },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Logo & Tagline */}
          <div 
            id="brand-logo" 
            onClick={() => handleTabClick('all')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl">🇧🇩</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">প্রবাসী হাব</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  ফ্লাইট ও শপিং পোর্টাল
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                কম মূল্যে বিমান টিকিট, astaa.store শপিং ও রেমিট্যান্স হাব
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden xl:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ফ্লাইট রুট, টিকিট বা পণ্য খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-slate-400 hover:text-slate-600 p-0.5"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              id="header-ai-btn"
              onClick={() => {
                document.getElementById('btn-whatsapp-float')?.click();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="প্রবাসী এআই সহকারীকে যেকোনো প্রশ্ন করুন"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>এআই সহকারী</span>
            </button>

            <a
              id="header-whatsapp-btn"
              href="https://wa.me/966505762139"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="২৪/৭ টিকিট ও শপিং সহায়তা (+966 50 576 2139)"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp: +966 50 576 2139</span>
            </a>

            <a
              id="header-hotline-button"
              href="tel:16135"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>১৬১৩৫ হেল্পলাইন</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-ai-btn"
              onClick={() => {
                document.getElementById('btn-whatsapp-float')?.click();
              }}
              className="p-1.5 bg-emerald-600 text-white rounded-md text-xs flex items-center justify-center font-bold"
              title="এআই সহকারী"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
            <a
              href="https://wa.me/966505762139"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-300 text-xs flex items-center justify-center"
              title="WhatsApp: +966 50 576 2139"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav id="desktop-navigation" className="hidden md:flex items-center gap-1 border-t border-slate-100 py-1.5 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : item.highlight
                    ? 'bg-sky-50 text-sky-800 font-bold border border-sky-200 hover:bg-sky-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-sky-700' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="আর্টিকেল, টিকিট বা পণ্য খুঁজুন..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <a
              href="https://wa.me/966505762139"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: +966 50 576 2139</span>
            </a>
            <a
              href="tel:16135"
              className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
            >
              <PhoneCall className="w-4 h-4" />
              <span>জরুরি প্রবাসী হেল্পলাইন: ১৬১৩৫</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
