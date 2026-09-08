import React from 'react';
import { 
  PhoneCall, 
  Mail, 
  Globe, 
  Heart, 
  ShoppingBag, 
  Plane, 
  Coins, 
  Building2, 
  ShieldCheck,
  MessageCircle,
  DollarSign
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800 text-xs">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-xl">
                🇧🇩
              </div>
              <span className="text-xl font-bold text-white tracking-tight">প্রবাসী হাব</span>
              <span className="bg-emerald-900/80 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-emerald-700">
                ProbashiHub
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              সৌদি আরব, ইউএই, কাতার, মালয়েশিয়া, ওমান, কুয়েত ও ইউরোপ-আমেরিকায় বসবাসরত রেমিট্যান্স যোদ্ধাদের এক ছাতার নিচে বিশ্বস্ত তথ্য, সুলভ ফ্লাইট টিকিট, লাইভ রেমিট্যান্স ও জরুরি দূতাবাস সহায়তা।
            </p>
            <div className="pt-2 flex items-center gap-2 text-emerald-400 font-semibold">
              <PhoneCall className="w-4 h-4" />
              <span>প্রবাসী কল সেন্টার: ১৬১৩৫ (২৪/৭ ফ্রি)</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              প্রধান সেবাসমূহ
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('flights')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plane className="w-3.5 h-3.5 text-sky-400" />
                  <span>বিমান টিকিট ও লাগেজ ছাড়</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('shopping')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
                  <span>পরিবারের জন্য astaa.store</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('affiliate')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                  <span>অ্যাফিলিয়েট ও পার্টনার ইনকাম</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('remittance')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Coins className="w-3.5 h-3.5 text-emerald-400" />
                  <span>মুদ্রা রেট ও ২.৫% প্রণোদনা</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('hotels')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>ট্রানজিট হোটেল ও কার রেন্টাল</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Expat Guides */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              জরুরি গাইড ও আইন
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>সৌদি কাফালা ও কিওয়া নিয়মাবলী</li>
              <li>দুবাই গ্রিন ও গোল্ডেন রেসিডেন্সি</li>
              <li>মালয়েশিয়া পাসপোর্ট নবায়ন নির্দেশিকা</li>
              <li>দেশে জমি ও ফ্ল্যাটে নিরাপদ বিনিয়োগ</li>
              <li>শাহজালাল বিমানবন্দর প্রবাসী লাউঞ্জ</li>
            </ul>
          </div>

          {/* Col 4: Support & Community */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              সহায়তা ও যোগাযোগ
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://wa.me/966505762139"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: +966 50 576 2139</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('emergency')}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>দূতাবাস হেল্পলাইন ও বীমা</span>
                </button>
              </li>
              <li className="text-slate-400">বিমান টিকিট বুকিং সাপোর্ট</li>
              <li className="text-slate-400">৬৪ জেলায় হোম ডেলিভারি ট্র্যাকিং</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© ২০২৬ প্রবাসী হাব (Probashi Hub) — সকল অধিকার সংরক্ষিত।</p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors cursor-pointer">আমাদের সম্পর্কে</button>
            <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors cursor-pointer">যোগাযোগ</button>
            <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors cursor-pointer">গোপনীয়তা নীতি</button>
            <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors cursor-pointer">শর্তাবলী</button>
            <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors cursor-pointer">দাবিত্যাগ</button>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>বিশ্বজুড়ে আমাদের সম্মানিত রেমিট্যান্স যোদ্ধাদের সম্মানে নিবেদিত</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
