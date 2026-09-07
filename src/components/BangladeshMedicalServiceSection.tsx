import React, { useState } from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Ambulance, 
  Video, 
  FlaskConical, 
  Pill, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  CreditCard, 
  Building2,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface SpecialistCategory {
  id: string;
  name: string;
  enName: string;
  icon: string;
  commonIssues: string;
}

const SPECIALIST_CATEGORIES: SpecialistCategory[] = [
  { id: 'cardio', name: 'হৃদরোগ ও কার্ডিওলজি', enName: 'Cardiology', icon: '❤️', commonIssues: 'বুকে ব্যথা, উচ্চ রক্তচাপ, হার্ট অ্যাটাক পরবর্তী ফলোআপ' },
  { id: 'medicine', name: 'মেডিসিন ও ডায়াবেটিস', enName: 'Internal Medicine', icon: '🩺', commonIssues: 'জ্বর, দীর্ঘদিনের দুর্বলতা, সুগার অনিয়ন্ত্রণ, পেটের সমস্যা' },
  { id: 'gynee', name: 'মহিলা ও প্রসূতি (গাইনি)', enName: 'Gynecology & Obstetrics', icon: '🤰', commonIssues: 'গর্ভকালীন পরামর্শ, নিয়মিত আল্ট্রাসনোগ্রাম চেকআপ' },
  { id: 'ortho', name: 'হাড়, জয়েন্ট ও অর্থোপেডিকস', enName: 'Orthopedics', icon: '🦴', commonIssues: 'মাতা-পিতার কোমর ব্যথা, হাঁটু ব্যথা, ফ্র্যাকচার' },
  { id: 'neuro', name: 'মস্তিষ্ক ও নিউরোলজি', enName: 'Neurology', icon: '🧠', commonIssues: 'স্ট্রোকের ঝুঁকি, মাথা ঘোরা, প্যারালাইসিস রিহ্যাব' },
  { id: 'child', name: 'শিশু বিশেষজ্ঞ (পেডিয়াট্রিকস)', enName: 'Pediatrics', icon: '👶', commonIssues: 'শিশুর নিউমোনিয়া, ঠান্ডা-কাশি, টিকাদান ও পুষ্টি' },
  { id: 'gastro', name: 'গ্যাস্ট্রোএন্টারোলজি ও লিভার', enName: 'Gastroenterology', icon: '🫁', commonIssues: 'গ্যাস, আলসার, জন্ডিস ও ফ্যাটি লিভার সমস্যা' },
  { id: 'eye', name: 'চক্ষু রোগ বিশেষজ্ঞ', enName: 'Ophthalmology', icon: '👁️', commonIssues: 'চোখের ছানি অপারেশন, ঝাপসা দেখা, চশমা পাওয়ার' },
];

interface HospitalContact {
  name: string;
  city: string;
  type: string;
  hotline?: string;
  hotlineLabel?: string;
  bookingUrl?: string;
  bookingLabel?: string;
}

const TOP_HOSPITALS: HospitalContact[] = [
  { name: 'Square Hospital', city: 'পান্থপথ, ঢাকা', type: 'টারশিয়ারি কেয়ার', hotline: '10616', hotlineLabel: 'হটলাইন 10616' },
  { name: 'Evercare Hospital', city: 'বসুন্ধরা, ঢাকা', type: 'JCI অ্যাক্রিডিটেড', hotline: '10678', hotlineLabel: 'হটলাইন 10678' },
  { name: 'United (Continental) Hospital', city: 'গুলশান, ঢাকা', type: 'মাল্টি-স্পেশালিটি', hotline: '10666', hotlineLabel: 'হটলাইন 10666' },
  { name: 'Ibn Sina Hospital', city: 'সারাদেশে শাখা', type: 'জনপ্রিয় ডায়াগনস্টিক', hotline: '09610010615', hotlineLabel: 'সিরিয়াল 09610010615' },
  { name: 'Popular Diagnostic Centre', city: 'সকল বিভাগীয় শহর', type: 'শীর্ষ ডায়াগনস্টিক', hotline: '10636', hotlineLabel: 'হটলাইন 10636' },
  { name: 'Labaid Specialized Hospital', city: 'ধানমন্ডি, ঢাকা', type: 'কার্ডিয়াক ও জেনারেল', hotline: '10606', hotlineLabel: 'হটলাইন 10606', bookingUrl: 'https://appointment.labaid.com.bd/', bookingLabel: 'অনলাইন বুকিং' },
  { name: 'BSMMU (সাবেক পিজি হাসপাতাল)', city: 'শাহবাগ, ঢাকা', type: 'জাতীয় রেফারেল — সরাসরি আউটডোর টিকিট' },
];

export const BangladeshMedicalServiceSection: React.FC = () => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [relation, setRelation] = useState('পিতা');
  const [serviceType, setServiceType] = useState('স্পেশালিস্ট ডাক্তার অ্যাপয়েন্টমেন্ট');
  const [department, setDepartment] = useState('মেডিসিন ও ডায়াবেটিস');
  const [district, setDistrict] = useState('ঢাকা');
  const [preferredDate, setPreferredDate] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare WhatsApp Message
    const text = `🏥 *প্রবাসী হাব - বাংলাদেশে ডাক্তার ও জরুরি সেবা বুকিং আবেদন:*
━━━━━━━━━━━━━━━━━━━━
🇸🇦 *আবেদনকারী:* প্রবাসী ভাই (সৌদি আরব থেকে)
👤 *রোগীর নাম:* ${patientName || 'উল্লেখ নেই'}
👵 *সম্পর্ক:* ${relation}
🎂 *বয়স:* ${patientAge || 'নির্দিষ্ট নয়'}
🩺 *সেবার ধরন:* ${serviceType}
🔬 *বিভাগ:* ${department}
📍 *জেলা/এলাকা:* ${district}
📅 *কাঙ্ক্ষিত তারিখ:* ${preferredDate || 'যত দ্রুত সম্ভব'}
📞 *রোগী/পরিবারের দেশীয় মোবাইল:* ${patientPhone || 'দেওয়া হয়নি'}
📝 *সমস্যার বিবরণ:* ${details || 'জরুরি পরামর্শ প্রয়োজন'}
━━━━━━━━━━━━━━━━━━━━
💳 *পেমেন্ট মেথড:* সৌদি MADA কার্ড / STC Pay / Urpay
অনুগ্রহ করে দ্রুত অ্যাপয়েন্টমেন্ট কনফার্ম করে শিডিউল দিন।`;

    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/966505762139?text=${encoded}`;
    
    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="bd-telehealth-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-950 text-white p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/25 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>সৌদি আরব প্রবাসীদের জন্য বিশেষ স্বাস্থ্য সেবা ডেস্ক</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              সৌদি থেকে দেশে পরিবারের জন্য ডাক্তার অ্যাপয়েন্টমেন্ট ও জরুরি চিকিৎসা
            </h2>
            <p className="text-sm text-teal-100/90 mt-2 leading-relaxed">
              পরবাসে বসেও আপনার মা-বাবা, স্ত্রী বা সন্তানের সুচিকিৎসার ব্যবস্থা করুন। স্কয়ার, এভারকেয়ার ও পপুলারের মতো সেরা হাসপাতালে অ্যাপয়েন্টমেন্ট, ২৪/৭ ভিডিও কনসালটেশন, অ্যাম্বুলেন্স এবং হোম ডায়াগনস্টিক বুক করুন সৌদি MADA কার্ডেই।
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-medium text-emerald-200">
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ০% অতিরিক্ত চার্জ
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> সৌদি MADA / STC Pay পেমেন্ট
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> ২৪/৭ ইনস্ট্যান্ট WhatsApp সাপোর্ট
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center lg:text-right shrink-0 lg:w-72">
            <span className="text-xs text-emerald-300 font-semibold block uppercase tracking-wider">
              জরুরি হেল্পলাইন ও পরামর্শ
            </span>
            <a 
              href="https://wa.me/966505762139?text=আমি%20সৌদি%20থেকে%20দেশে%20পরিবারের%20ডাক্তার%20বা%20জরুরি%20চিকিৎসা%20সহায়তা%20চাই।"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp হেল্পডেস্ক</span>
            </a>
            <span className="text-[11px] text-teal-200 block mt-1.5 font-mono">
              +966 50 576 2139
            </span>
          </div>
        </div>
      </div>

      {/* 4 Core Features Cards */}
      <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-teal-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3 font-bold">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              ১. বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              স্কয়ার, এভারকেয়ার, পপুলার ও ল্যাবএইডের স্বনামধন্য অধ্যাপকদের সিরিয়াল সৌদি আরবেই বসে কনফার্ম করুন।
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-emerald-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 font-bold">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              ২. ৩-পক্ষীয় ভিডিও কনসালটেশন
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              আপনি সৌদি থেকে, পরিবার দেশ থেকে এবং ডাক্তার অনলাইন কনফারেন্সে একসাথে বসে চিকিৎসা ও রিপোর্ট আলোচনা করবেন।
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-rose-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-3 font-bold">
              <Ambulance className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              ৩. জরুরি অ্যাম্বুলেন্স সেবা
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ৬৪ জেলায় এসি, নরমাল ও আইসিইউ (ICU) লাইফ সাপোর্ট অ্যাম্বুলেন্স। এয়ারপোর্ট থেকে রোগী রিসিভ বা হাসপাতালে দ্রুত স্থানান্তর।
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-xl border border-slate-200/90 shadow-2xs hover:border-amber-500 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3 font-bold">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              ৪. হোম স্যাম্পল ও ওষুধ ডেলিভারি
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              বৃদ্ধ মা-বাবাকে ল্যাবে না নিয়ে ঘরে বসেই রক্ত ও ডায়াবেটিস পরীক্ষা করান। প্রেসক্রিপশনের ওষুধ পৌঁছে যাবে বাড়িতে।
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Form & Specialist Grid */}
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Specialist Departments & Hospital Network */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-teal-700" />
                <span>যেসব বিভাগের চিকিৎসকের পরামর্শ পাবেন:</span>
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                যেকোনো বিভাগে ক্লিক করে সরাসরি ফর্মটিতে বিষয় নির্বাচন করতে পারেন:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPECIALIST_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setDepartment(cat.name)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      department === cat.name
                        ? 'border-teal-600 bg-teal-50/60 ring-1 ring-teal-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="font-bold text-slate-900 text-xs">{cat.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{cat.commonIssues}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Hospital Partners Network */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-700" />
                <span>হাসপাতাল হটলাইন ও সিরিয়াল নম্বর — ট্যাপ করে কল করুন:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {TOP_HOSPITALS.map((h, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs flex flex-col gap-1.5"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0"></span>
                      <strong className="text-slate-900 text-xs">{h.name}</strong>
                    </div>
                    <span className="text-slate-400 text-[10px]">{h.city} • {h.type}</span>
                    <div className="flex flex-wrap gap-1.5 mt-0.5">
                      {h.hotline && (
                        <a
                          href={`tel:${h.hotline.replace(/\s/g, '')}`}
                          className="inline-flex items-center gap-1 bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{h.hotlineLabel || h.hotline}</span>
                        </a>
                      )}
                      {h.bookingUrl && (
                        <a
                          href={h.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-white hover:bg-sky-50 text-sky-800 border border-sky-300 text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>{h.bookingLabel}</span>
                        </a>
                      )}
                      {!h.hotline && !h.bookingUrl && (
                        <span className="text-[11px] text-slate-500">সরাসরি হাসপাতাল কাউন্টার থেকে টিকিট নিন</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2.5">
                * হটলাইন নম্বরগুলো বাংলাদেশ থেকে সরাসরি লাগে। সৌদি থেকে না লাগলে WhatsApp ডেস্কে বলুন — আমরা আপনার হয়ে সিরিয়াল নিয়ে দেবো।
              </p>
            </div>

            {/* Saudi Payment reassurance */}
            <div className="bg-gradient-to-r from-amber-50 to-emerald-50 p-4 rounded-xl border border-amber-200/80 flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold block mb-0.5">সৌদি আরব থেকেই পুরো বিল পরিশোধ করুন:</strong>
                আপনার আল-রাজি (Al Rajhi), এসএনবি (SNB) বা যেকোনো ব্যাংকের MADA কার্ড, Urpay বা STC Pay দিয়ে সরাসরি রিয়ালে বিল পরিশোধ করতে পারবেন। দেশে বৃদ্ধ মা-বাবাকে হাসপাতালে গিয়ে লাইনে দাঁড়িয়ে ক্যাশ টাকা দিতে হবে না।
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-5 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-700" />
                <span>অ্যাপয়েন্টমেন্ট ও জরুরি অনুরোধ পাঠান</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                বিনামূল্যে পরামর্শ
              </span>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-3 animate-in fade-in">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-base">আবেদনটি WhatsApp-এ পাঠানো হয়েছে!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  আমাদের মেডিকেল কো-অর্ডিনেটর আপনার রোগীর তথ্য যাচাই করে অতি দ্রুত কল বা মেসেজে অ্যাপয়েন্টমেন্ট সময় ও ডাক্তারের বিবরণ নিশ্চিত করবেন।
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-teal-800 underline hover:text-teal-950 cursor-pointer pt-2 block mx-auto"
                >
                  অন্য কোনো রোগীর জন্য আবার ফর্ম পূরণ করুন
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    সেবার ধরন নির্বাচন করুন *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  >
                    <option value="স্পেশালিস্ট ডাক্তার অ্যাপয়েন্টমেন্ট">১. বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট (হাসপাতাল/চেম্বার)</option>
                    <option value="ভিডিও কনসালটেশন (টেলিমেডিসিন)">২. ৩-পক্ষীয় লাইভ ভিডিও কনসালটেশন</option>
                    <option value="জরুরি অ্যাম্বুলেন্স সার্ভিস">৩. জরুরি অ্যাম্বুলেন্স সেবা (নরমাল / এসি / আইসিইউ)</option>
                    <option value="হোম স্যাম্পল রক্ত পরীক্ষা">৪. বাড়িতে ডায়াগনস্টিক রক্ত পরীক্ষা</option>
                    <option value="জরুরি প্রেসক্রিপশন ওষুধ ডেলিভারি">৫. জরুরি প্রেসক্রিপশনের ওষুধ ডেলিভারি</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      রোগীর সাথে সম্পর্ক *
                    </label>
                    <select
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    >
                      <option value="পিতা (বাবা)">পিতা (বাবা)</option>
                      <option value="মাতা (মা)">মাতা (মা)</option>
                      <option value="স্ত্রী">স্ত্রী</option>
                      <option value="সন্তান">সন্তান</option>
                      <option value="ভাই / বোন">ভাই / বোন</option>
                      <option value="নিজ">নিজ (প্রবাস ফেরত)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      রোগীর বয়স
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: ৫৮ বছর"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    রোগীর নাম *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="রোগীর পূর্ণ নাম লিখুন"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      চিকিৎসার বিভাগ *
                    </label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="যেমন: হৃদরোগ / মেডিসিন"
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      রোগীর জেলা / এলাকা *
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="যেমন: ঢাকা, সিলেট, কুমিল্লা"
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      কাঙ্ক্ষিত তারিখ
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      দেশে পরিবারের মোবাইল
                    </label>
                    <input
                      type="tel"
                      placeholder="০১৭... নম্বর"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    রোগীর প্রধান শারীরিক সমস্যা / উপসর্গ
                  </label>
                  <textarea
                    rows={2}
                    placeholder="যেমন: ৩ দিন ধরে বুকে চিনচিন ব্যথা ও বমিভাব, প্রেসার হাই..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-submit-medical-help"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp-এ অ্যাপয়েন্টমেন্ট কনফার্ম করুন</span>
                </button>

                <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>রোগীর তথ্য সম্পূর্ণ গোপন রাখা হয় • সৌদি সময় অনুযায়ী সহায়তা</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
