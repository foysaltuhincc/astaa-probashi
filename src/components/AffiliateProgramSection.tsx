import React, { useState } from 'react';
import { 
  DollarSign, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Percent, 
  Plane, 
  ShoppingBag, 
  Building2, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  MessageCircle, 
  Gift, 
  ExternalLink,
  HelpCircle,
  Award
} from 'lucide-react';

export const AffiliateProgramSection: React.FC = () => {
  const [partnerName, setPartnerName] = useState('');
  const [phoneOrId, setPhoneOrId] = useState('');
  const [copied, setCopied] = useState(false);
  const [ticketsPerMonth, setTicketsPerMonth] = useState(6);
  const [ordersPerMonth, setOrdersPerMonth] = useState(10);

  // Generate personalized affiliate link
  const cleanId = (phoneOrId.trim() || partnerName.trim() || 'PROBASHI').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const generatedLink = `https://astaa-probashi.ai.studio/?ref=${cleanId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `ভাই, সাধারণ এজেন্সির অতিরিক্ত ৩,০০০-৮,০০০ টাকা কমিশন ছাড়া কম খরচে ৪৬ কেজি নিশ্চিত ব্যাগেজসহ বিমান টিকিট কাটতে এবং দেশে পরিবারের জন্য astaa.store থেকে নির্ভেজাল বাজার পাঠাতে এই লিংকে ঢুকুন:\n${generatedLink}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Commission Calculations
  // Average ticket commission: ৳800 per ticket
  // Average shopping commission: ৳350 per order
  const monthlyTicketEarning = ticketsPerMonth * 850;
  const monthlyOrderEarning = ordersPerMonth * 400;
  const totalMonthlyEarning = monthlyTicketEarning + monthlyOrderEarning;

  const affiliateNetworks = [
    {
      name: 'Travelpayouts & Aviasales',
      category: 'আন্তর্জাতিক বিমান টিকিট',
      commission: 'প্রতি টিকিটে ১.৫% - ৩.০% কমিশন (গড়ে ৳৮০০ - ৳১,৫০০)',
      badge: 'গ্লোবাল পার্টনার',
      description: 'বিমান বাংলাদেশ, সাউদিয়া, কাতার, এমিরেটস সহ বিশ্বব্যাপী ১২০+ এয়ারলাইন্সের অফিশিয়াল অ্যাফিলিয়েট বুকিং পার্টনার।',
      link: 'https://www.travelpayouts.com/',
      icon: Plane,
      color: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      name: 'astaa.store মার্চেন্ট পার্টনার',
      category: 'প্রবাসী পরিবারের কেনাকাটা',
      commission: 'প্রতি সফল বিক্রয়ে ৮% থেকে ১২% সরাসরি ক্যাশ কমিশন',
      badge: 'সর্বোচ্চ আয়',
      description: 'দেশের বাড়িতে খাঁটি সরিষার তেল, ঘি, মধু, শাড়ি-পাঞ্জাবি ও ইলেকট্রনিক্স অর্ডারে প্রতি মাসে আকর্ষণীয় ইনকাম।',
      link: 'https://astaa.store/',
      icon: ShoppingBag,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      name: 'Trip.com & Skyscanner',
      category: 'কম্পেয়ার ও ডিরেক্ট বুকিং',
      commission: 'প্রতি ভেরিফায়েড ফ্লাইটে ৫% পর্যন্ত রেভিনিউ শেয়ার',
      badge: 'জনপ্রিয়',
      description: 'মধ্যপ্রাচ্য ও এশিয়ার সবচেয়ে কম ভাড়ার ট্রাভেল ডিল ও রিয়েল-টাইম সিট কনফার্মেশন।',
      link: 'https://www.trip.com/',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      name: 'Booking.com & Agoda',
      category: 'ট্রানজিট হোটেল ও কার',
      commission: 'হোটেল ও এয়ারপোর্ট পিকআপে ৪% - ৭% পেআউট',
      badge: 'ট্রানজিট স্টে',
      description: 'দুবাই, দোহা, কুয়ালালামপুর বা ঢাকা বিমানবন্দরে ট্রানজিট হোটেল ও নিরাপদ কার বুকিং সুবিধা।',
      link: 'https://www.booking.com/',
      icon: Building2,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    }
  ];

  return (
    <section id="affiliate-program-section" className="space-y-8 mb-10">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-emerald-700/50 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30 mb-3">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>প্রবাসী হাব ও astaa.store অফিসিয়াল অ্যাফিলিয়েট পার্টনারশিপ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            লিংক শেয়ার করে প্রতি মাসে ৳১৫,০০০ - ৳৫০,০০০+ আয় করুন
          </h2>

          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            সৌদি আরব, দুবাই, কাতার, কুয়েত বা মালয়েশিয়ায় থাকা প্রবাসী ভাই ও ট্রাভেল উদ্যোক্তাদের জন্য সহজ সুযোগ। আপনার বন্ধুবান্ধব ও রুমমেটদের কম খরচে বিমানের টিকিট ও astaa.store-এর পণ্য রেফার করুন এবং প্রতিটি সফল অর্ডারে সরাসরি কমিশন বুঝে নিন।
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => {
                document.getElementById('affiliate-link-generator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer hover:scale-102"
            >
              <Share2 className="w-4 h-4 text-slate-950" />
              <span>আপনার নিজস্ব অ্যাফিলিয়েট লিংক তৈরি করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/966505762139?text=আমি%20প্রবাসী%20হাব%20অ্যাফিলিয়েট%20পার্টনার%20হিসেবে%20যুক্ত%20হতে%20চাই"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>পার্টনার হেল্পডেস্কে হোয়াটসঅ্যাপ করুন</span>
            </a>
          </div>
        </div>
      </div>

      {/* 1. Integrated Affiliate Networks */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>আমাদের শীর্ষ অনুমোদিত অ্যাফিলিয়েট নেটওয়ার্ক</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              যেকোনো অফিশিয়াল প্ল্যাটফর্মের মাধ্যমে সুরক্ষিত ট্র্যাকিং ও ইনস্ট্যান্ট পেআউট সুবিধা
            </p>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full w-fit">
            ১০০% নিরাপদ ও স্বচ্ছ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {affiliateNetworks.map((net, idx) => {
            const Icon = net.icon;
            return (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-xl p-5 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between bg-slate-50/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${net.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{net.name}</h4>
                        <span className="text-[11px] text-slate-500 font-medium">{net.category}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                      {net.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {net.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-700">
                    💰 {net.commission}
                  </span>
                  <a
                    href={net.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
                  >
                    <span>বিস্তারিত</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Monthly Earning Calculator */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="max-w-2xl">
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
            সম্ভাব্য লাভ ক্যালকুলেটর
          </span>
          <h3 className="text-xl sm:text-2xl font-bold mt-1">
            মাসে কত আয় করতে পারবেন হিসাব করুন
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            স্লাইডার টেনে আপনার রেফারেলের সংখ্যা নির্ধারণ করুন এবং সম্ভাব্য মাসিক কমিশন দেখুন:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-5 bg-white/5 p-5 rounded-xl border border-white/10">
            {/* Slider 1: Tickets */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm font-bold mb-2">
                <span className="flex items-center gap-2 text-slate-200">
                  <Plane className="w-4 h-4 text-sky-400" />
                  মাসিক বিমান টিকিট বুকিং রেফার:
                </span>
                <span className="text-amber-300 font-black text-base">{ticketsPerMonth} টি টিকিট</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={ticketsPerMonth}
                onChange={(e) => setTicketsPerMonth(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>১ টি</span>
                <span>২৫ টি</span>
                <span>৫০ টি</span>
              </div>
            </div>

            {/* Slider 2: astaa.store orders */}
            <div>
              <div className="flex justify-between text-xs sm:text-sm font-bold mb-2">
                <span className="flex items-center gap-2 text-slate-200">
                  <ShoppingBag className="w-4 h-4 text-purple-400" />
                  মাসিক astaa.store পণ্য অর্ডার রেফার:
                </span>
                <span className="text-amber-300 font-black text-base">{ordersPerMonth} টি অর্ডার</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={ordersPerMonth}
                onChange={(e) => setOrdersPerMonth(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>১ টি</span>
                <span>৫০ টি</span>
                <span>১০০ টি</span>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-5 text-white flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs font-semibold text-emerald-100">আপনার সম্ভাব্য মাসিক আয়</span>
              <div className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
                ৳{totalMonthlyEarning.toLocaleString()}
              </div>
              <p className="text-xs text-emerald-100 mt-2">
                টিকিট থেকে: ৳{monthlyTicketEarning.toLocaleString()} + শপিং থেকে: ৳{monthlyOrderEarning.toLocaleString()}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/50">
              <a
                href="https://wa.me/966505762139?text=আমি%20প্রবাসী%20হাব%20অ্যাফিলিয়েট%20পার্টনার%20হিসেবে%20রেজিস্ট্রেশন%20করতে%20চাই"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold py-2.5 rounded-lg transition-colors shadow-xs"
              >
                <span>কমিশন তোলা শুরু করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Link Generator & Referral Share */}
      <div id="affiliate-link-generator" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <span>আপনার নিজস্ব রেফারেল লিংক তৈরি করুন</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            আপনার নাম অথবা মোবাইল নম্বর দিন। সিস্টেম আপনার জন্য একটি ইউনিক ট্র্যাকিং লিংক তৈরি করে দেবে যা বন্ধুদের সাথে শেয়ার করতে পারবেন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              আপনার নাম:
            </label>
            <input
              type="text"
              placeholder="উদাঃ Foysal Tuhin"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              WhatsApp নম্বর বা রেফারেল কোড:
            </label>
            <input
              type="text"
              placeholder="উদাঃ 0505762139 বা TUHIN2026"
              value={phoneOrId}
              onChange={(e) => setPhoneOrId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Output Link Box */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-2xl">
          <span className="text-xs font-bold text-slate-600 block mb-1">
            আপনার রেডি-টু-শেয়ার লিংক:
          </span>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-emerald-800 select-all"
            />
            
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'কপি হয়েছে!' : 'লিংক কপি করুন'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp এ শেয়ার</span>
            </button>
          </div>
        </div>

        {/* 3 Simple Steps */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-800 mb-4">
            সহজ ৩ ধাপে কীভাবে কাজ করবেন?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                ১
              </span>
              <h5 className="text-xs font-bold text-slate-900">লিংক শেয়ার করুন</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                আপনার প্রবাসী বন্ধু, ফেসবুক গ্রুপ বা হোয়াটসঅ্যাপে আপনার লিংকটি পাঠান।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                ২
              </span>
              <h5 className="text-xs font-bold text-slate-900">টিকেট বা শপিং বুকিং</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                তারা আপনার লিংকে এসে সাশ্রয়ী মূল্যে টিকিট কাটবে অথবা পরিবারের জন্য শপিং করবে।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-2">
                ৩
              </span>
              <h5 className="text-xs font-bold text-slate-900">কমিশন গ্রহণ করুন</h5>
              <p className="text-[11px] text-slate-500 mt-1">
                সরাসরি আপনার বিকাশ, নগদ অথবা সৌদি ব্যাংকিং কার্ডে আপনার আয় পাঠিয়ে দেওয়া হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
