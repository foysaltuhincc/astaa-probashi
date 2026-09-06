import React, { useState, useMemo } from 'react';
import { 
  Plane, 
  ArrowRightLeft, 
  Search, 
  Luggage, 
  Clock, 
  ExternalLink, 
  CheckCircle2,
  Calendar,
  ShieldCheck,
  TrendingDown,
  MessageCircle,
  CreditCard,
  X,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { FlightDeal } from '../types';
import { FLIGHT_DEALS } from '../data/mockData';

const AIRPORTS = [
  { code: 'DAC', city: 'ঢাকা', country: 'বাংলাদেশ', name: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর' },
  { code: 'CGP', city: 'চট্টগ্রাম', country: 'বাংলাদেশ', name: 'শাহ আমানত আন্তর্জাতিক বিমানবন্দর' },
  { code: 'ZYL', city: 'সিলেট', country: 'বাংলাদেশ', name: 'ওসমানী আন্তর্জাতিক বিমানবন্দর' },
  { code: 'RUH', city: 'রিয়াদ', country: 'সৌদি আরব', name: 'কিং খালিদ আন্তর্জাতিক বিমানবন্দর' },
  { code: 'JED', city: 'জেদ্দা', country: 'সৌদি আরব', name: 'কিং আব্দুলআজিজ আন্তর্জাতিক বিমানবন্দর' },
  { code: 'DXB', city: 'দুবাই', country: 'ইউএই', name: 'দুবাই আন্তর্জাতিক বিমানবন্দর' },
  { code: 'DOH', city: 'দোহা', country: 'কাতার', name: 'হামাদ আন্তর্জাতিক বিমানবন্দর' },
  { code: 'KUL', city: 'কুয়ালালামপুর', country: 'মালয়েশিয়া', name: 'কেএলআইএ বিমানবন্দর' },
  { code: 'LHR', city: 'লন্ডন', country: 'যুক্তরাজ্য', name: 'হিথ্রো বিমানবন্দর' }
];

export const FlightAffiliateSearch: React.FC = () => {
  const [fromCode, setFromCode] = useState('RUH');
  const [toCode, setToCode] = useState('DAC');
  const [tripType, setTripType] = useState<'one-way' | 'round'>('one-way');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('ইকোনমি');
  const [showTabbyModal, setShowTabbyModal] = useState(false);
  const tripComAffiliateUrl = 'https://www.trip.com?Allianceid=10456727&SID=330446355&trip_sub1=website&trip_sub3=D19707004';

  // Swap locations
  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  // Filter flights based on selection or popular deals
  const displayedFlights = useMemo(() => {
    const matched = FLIGHT_DEALS.filter(
      (f) => (f.fromCode === fromCode && f.toCode === toCode) ||
             (f.fromCode === toCode && f.toCode === fromCode)
    );
    if (matched.length > 0) return matched;
    return FLIGHT_DEALS;
  }, [fromCode, toCode]);

  const generateAffiliateLink = (_flight: FlightDeal) => tripComAffiliateUrl;

  const openWhatsAppFlightHelp = (flight: FlightDeal) => {
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম! আমি "${flight.airline}" এ ${flight.fromCity} থেকে ${flight.toCity} রুটের টিকিট (মূল্য: ৳${flight.priceBdt.toLocaleString()}) বুক করতে সহায়তা চাই।`
    );
    window.open(`https://wa.me/966505762139?text=${text}`, '_blank');
  };

  return (
    <div id="flight-affiliate-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-800 via-blue-800 to-indigo-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/25 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-400/30 mb-2">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>এজেন্সির চেয়ে গড়ে ৩,০০০-৮,০০০ টাকা সাশ্রয়ী টিকিট</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              সরাসরি বিমান টিকিট বুকিং ও ৪৬ কেজি লাগেজ কনফার্মেশন
            </h2>
            <p className="text-sm text-sky-100/90 mt-1 max-w-2xl">
              অফলাইন এজেন্সির অতিরিক্ত চার্জ ছাড়া বিমান বাংলাদেশ, সাউদিয়া, এমিরেটস ও কাতার এয়ারওয়েজের টিকিট যাচাই করে কাটুন।
            </p>
          </div>

          <a
            href="https://wa.me/966505762139"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-center inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>টিকিট বুকিং হেল্পলাইন</span>
          </a>
        </div>
      </div>

      {/* Tabby & Tamara 4-Month Installment Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-emerald-500/10 to-teal-500/15 border-b border-amber-200/80 p-3.5 sm:p-4 px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="bg-emerald-600 text-white font-black text-[11px] px-2.5 py-1 rounded-md tracking-wide shadow-2xs">
              tabby
            </span>
            <span className="text-slate-400 font-bold text-xs">&</span>
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[11px] px-2.5 py-1 rounded-md tracking-wide shadow-2xs">
              tamara
            </span>
          </div>
          <div className="text-xs text-slate-800 font-medium">
            <strong className="text-slate-900 font-bold">০% সুদে ৪ মাসের কিস্তি:</strong> সৌদি প্রবাসীরা টিকিটের পুরো টাকা একবারে না দিয়ে ৪টি সমান মাসিক কিস্তিতে দিতে পারবেন (আজ মাত্র ২৫% দিয়ে টিকিট কনফার্ম করুন)।
          </div>
        </div>
        <button
          onClick={() => setShowTabbyModal(true)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-950 bg-white border border-sky-300 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-sky-50 transition-colors shrink-0 cursor-pointer"
        >
          <CreditCard className="w-3.5 h-3.5 text-sky-600" />
          <span>কিস্তির নিয়ম দেখুন</span>
        </button>
      </div>

      {/* Flight Search Controls */}
      <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setTripType('one-way')}
              className={`px-3 py-1 rounded cursor-pointer ${tripType === 'one-way' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}
            >
              ওয়ান ওয়ে (One-way)
            </button>
            <button
              onClick={() => setTripType('round')}
              className={`px-3 py-1 rounded cursor-pointer ${tripType === 'round' ? 'bg-sky-600 text-white' : 'text-slate-600'}`}
            >
              রিটার্ন টিকিট (Round-trip)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>যাত্রী সংখ্যা:</span>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="bg-white border border-slate-200 rounded px-2 py-1 text-slate-800 focus:ring-1 focus:ring-sky-500"
            >
              <option value={1}>১ জন প্রাপ্তবয়স্ক</option>
              <option value={2}>২ জন</option>
              <option value={3}>৩ জন</option>
              <option value={4}>৪+ জন (পরিবার)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>ক্লাস:</span>
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="bg-white border border-slate-200 rounded px-2 py-1 text-slate-800"
            >
              <option value="ইকোনমি">ইকোনমি ক্লাস</option>
              <option value="প্রিমিয়াম">প্রিমিয়াম ইকোনমি</option>
              <option value="বিজনেস">বিজনেস ক্লাস</option>
            </select>
          </div>
        </div>

        {/* Airport Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          {/* From */}
          <div className="lg:col-span-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              যেখান থেকে উড়বেন (From)
            </label>
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full text-sm font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} - {a.country} ({a.code})
                </option>
              ))}
            </select>
          </div>

          {/* Swap button */}
          <div className="flex justify-center -my-2 sm:my-0">
            <button
              onClick={handleSwap}
              className="p-2.5 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors shadow-xs cursor-pointer"
              title="রুট অদলবদল করুন"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To */}
          <div className="lg:col-span-2 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
              যেখানে নামবেন (To)
            </label>
            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full text-sm font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
            >
              {AIRPORTS.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} - {a.country} ({a.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Flight Cards List */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              উপলব্ধ ডিল ও নিয়মিত ফ্লাইট সমূহ ({displayedFlights.length} টি)
            </h3>
            <span className="text-xs text-emerald-700 font-medium">
              ✓ অফিশিয়াল এয়ারলাইন সিস্টেমে সরাসরি টিকিট ও ৪৬ কেজি লাগেজ কনফার্মেশন
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            এয়ারপোর্ট ট্যাক্স ও মিল অন্তর্ভুক্ত
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {displayedFlights.map((flight) => (
            <div
              key={flight.id}
              id={`flight-card-${flight.id}`}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-sky-400 bg-white hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Airline info */}
              <div className="flex items-center gap-3 lg:w-56 shrink-0">
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-800 font-extrabold text-sm">
                  {flight.airlineCode}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{flight.airline}</h4>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>জেনুইন PNR ও ট্রাভেল গ্যারান্টি</span>
                  </span>
                </div>
              </div>

              {/* Timing & Route */}
              <div className="flex-1 flex items-center justify-between sm:justify-around gap-2 text-center">
                <div>
                  <span className="text-lg font-bold text-slate-900">{flight.departureTime}</span>
                  <p className="text-xs text-slate-500 font-semibold">{flight.fromCity} ({flight.fromCode})</p>
                </div>

                <div className="flex flex-col items-center px-2">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {flight.duration}
                  </span>
                  <div className="w-24 sm:w-32 h-0.5 bg-slate-200 my-1 relative">
                    <Plane className="w-3.5 h-3.5 text-sky-600 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                  </div>
                  <span className="text-[11px] text-sky-700 font-medium bg-sky-50 px-2 py-0.5 rounded">
                    {flight.stops}
                  </span>
                </div>

                <div>
                  <span className="text-lg font-bold text-slate-900">{flight.arrivalTime}</span>
                  <p className="text-xs text-slate-500 font-semibold">{flight.toCity} ({flight.toCode})</p>
                </div>
              </div>

              {/* Baggage feature */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-xs text-slate-700 flex items-center gap-2 lg:w-52 shrink-0">
                <Luggage className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="leading-tight font-medium">{flight.baggage}</span>
              </div>

              {/* Price, Agency Comparison & Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  {flight.agencyPriceBdt && (
                    <div className="text-xs text-slate-400 line-through">
                      এজেন্সির দর: ৳{flight.agencyPriceBdt.toLocaleString()}
                    </div>
                  )}
                  <div className="text-xl sm:text-2xl font-black text-emerald-800">
                    ৳{flight.priceBdt.toLocaleString()}
                  </div>

                  {/* Tabby & Tamara Installment Calculation */}
                  <div className="mt-1 flex items-center lg:justify-end gap-1.5 text-[11px] font-semibold text-slate-700 bg-amber-50/80 border border-amber-200/60 rounded px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>বা ৪ কিস্তিতে: <strong>৳{Math.round(flight.priceBdt / 4).toLocaleString()}</strong> /মাস</span>
                    <span className="text-amber-800 text-[10px] font-bold">(~{Math.round((flight.priceBdt / 4) / 32.1)} SAR)</span>
                  </div>

                  {flight.savingsBdt && (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded inline-block mt-1">
                      ★ এজেন্সির চেয়ে ৳{flight.savingsBdt.toLocaleString()} সাশ্রয়!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openWhatsAppFlightHelp(flight)}
                    className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold px-2.5 py-2.5 rounded-lg transition-colors cursor-pointer"
                    title="WhatsApp-এ টিকিট সহায়তা নিন"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="hidden sm:inline">সহায়তা</span>
                  </button>

                  <a
                    href={generateAffiliateLink(flight)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`btn-book-${flight.id}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-sky-700 hover:bg-sky-800 active:bg-sky-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xs transition-colors"
                  >
                    <span>সরাসরি কাটুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabby & Tamara Explainer Modal */}
      {showTabbyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-emerald-600 text-white font-black text-xs px-2.5 py-0.5 rounded">
                    tabby
                  </span>
                  <span className="text-slate-400 font-bold text-xs">&</span>
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs px-2.5 py-0.5 rounded">
                    tamara
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                    ০% সুদ
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  সৌদি প্রবাসীদের জন্য ৪ মাসের সহজ কিস্তিতে টিকিট কাটার নিয়ম
                </h3>
              </div>
              <button
                onClick={() => setShowTabbyModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5 text-slate-800 text-xs sm:text-sm leading-relaxed">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-emerald-950 font-medium">
                  <strong>এককালীন টাকার চাপ নেই:</strong> সৌদি আরবের কেন্দ্রীয় ব্যাংক (SAMA) অনুমোদিত <strong>Tabby</strong> ও <strong>Tamara</strong> দিয়ে বিমানের টিকিট কেটে প্রতি মাসের বেতনের সাথে ৪টি সমান কিস্তিতে বিল পরিশোধ করতে পারবেন। কোনো বাড়তি সুদ বা হিডেন ফি নেই।
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-sky-700" />
                  <span>কিস্তিতে টিকিট কাটার ৪টি সহজ ধাপ:</span>
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-sky-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      ১
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-semibold">ফ্লাইট নির্বাচন ও বুকিং পেজ:</strong>
                      <span className="text-slate-600">আমাদের সাইট বা পার্টনার বুকিং পেজে (Almosafer, Flynas, Saudia ইত্যাদি) গিয়ে আপনার পছন্দমতো ফ্লাইট বেছে নিন।</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-sky-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      ২
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-semibold">পেমেন্টে Tabby বা Tamara সিলেক্ট করুন:</strong>
                      <span className="text-slate-600">পেমেন্ট মেথড অপশনে এসে <strong>Tabby (تابي)</strong> অথবা <strong>Tamara (تمارا)</strong> অপশনটিতে ক্লিক করুন।</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-sky-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      ৩
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-semibold">আজ মাত্র ২৫% ডাউনপেমেন্ট করুন:</strong>
                      <span className="text-slate-600">আপনার সৌদি আকামা নম্বর ও মোবাইল দিলে ওটিপি (OTP) আসবে। আপনার সাধারণ আল-রাজি বা এসএনবি MADA এটিএম কার্ড দিয়ে ১ম কিস্তি (২৫%) পরিশোধ করলেই টিকিট কনফার্মড!</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      ৪
                    </span>
                    <div>
                      <strong className="text-slate-900 block font-semibold">বাকি ৩ কিস্তি বেতনের সাথে পরিশোধ:</strong>
                      <span className="text-slate-600">পরবর্তী ৩ মাসের বেতনের নির্দিষ্ট তারিখে বাকি ৩টি কিস্তি স্বয়ংক্রিয়ভাবে ব্যাংক কার্ড থেকে কেটে নেওয়া হবে।</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200">
                <h5 className="font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
                  <span>কাদের জন্য প্রযোজ্য?</span>
                </h5>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>সৌদি আরবের যেকোনো বৈধ আকামা (Iqama) ধারী প্রবাসী।</li>
                  <li>সৌদি মোবাইল নম্বর ও সক্রিয় MADA এটিএম ডেবিট কার্ড।</li>
                  <li>কোনো ধরনের ক্রেডিট কার্ডের বাধ্যবাধকতা নেই।</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/966505762139?text=আমি%20Tabby%20বা%20Tamara%20দিয়ে%20৪%20কিস্তিতে%20টিকিট%20কাটতে%20সহায়তা%20চাই।"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl transition-colors text-xs cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp-এ কিস্তি বুকিং সহায়তা নিন</span>
                </a>
                <button
                  onClick={() => setShowTabbyModal(false)}
                  className="py-2.5 px-4 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
                >
                  বুঝেছি, বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
