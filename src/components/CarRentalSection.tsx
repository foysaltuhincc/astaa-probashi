import React, { useState } from 'react';
import {
  Car,
  Phone,
  MapPin,
  MessageCircle,
  ChevronDown,
  ShieldCheck,
  Info,
  AppWindow,
} from 'lucide-react';

interface CounterInfo {
  name: string;
  phone: string;
}

const AIRPORT_COUNTERS: CounterInfo[] = [
  { name: 'World Trust', phone: '01760329714' },
  { name: 'A-5', phone: '01321608554' },
  { name: 'Alvi', phone: '01958090604' },
  { name: 'Aviation', phone: '01911752841' },
  { name: 'Convoy', phone: '01312331376' },
  { name: 'Tourist', phone: '01876073525' },
];

interface CompanyInfo {
  name: string;
  phone: string;
  note: string;
}

const COMPANIES: CompanyInfo[] = [
  { name: 'Giant Rent A Car', phone: '01613008008', note: 'বড় বহর — সেডান থেকে মাইক্রোবাস' },
  { name: 'Sarker Rent A Car', phone: '01613008008', note: 'ঢাকা ও ঢাকার বাইরে সার্ভিস' },
  { name: 'Himu Rent A Car', phone: '01896274004', note: 'বাজেট-বান্ধব ভাড়া' },
  { name: 'Bengal Rent A Car', phone: '01711389054', note: 'ফ্যামিলি ও কর্পোরেট ট্রিপ' },
  { name: 'Haque Rent A Car', phone: '01715834829', note: 'এয়ারপোর্ট পিকআপ স্পেশালিস্ট' },
  { name: 'BCMG Rent A Car', phone: '01711566337', note: 'দূরপাল্লার ভাড়া' },
];

const CITIES = [
  { city: 'চট্টগ্রাম', desc: 'শাহ আমানত বিমানবন্দর থেকে শহর ও কক্সবাজার রুট' },
  { city: 'সিলেট', desc: 'ওসমানী বিমানবন্দর থেকে শহর ও জাফলং রুট' },
  { city: 'কক্সবাজার', desc: 'বিমানবন্দর থেকে হোটেল ও মেরিন ড্রাইভ' },
  { city: 'খুলনা', desc: 'শহর ও যশোর বিমানবন্দর রুট' },
];

const TIPS = [
  'গাড়িতে ওঠার আগে এসি, সিটবেল্ট ও টায়ার একনজর দেখে নিন।',
  'মোট ভাড়া, টোল ও অপেক্ষা-চার্জ আগেই ফোনে নিশ্চিত করুন।',
  'ড্রাইভারের নাম, গাড়ির নম্বর ও কোম্পানির হটলাইন পরিবারকে জানিয়ে রাখুন।',
  'রাতের ফ্লাইট হলে আগে থেকে বুকিং রাখুন — এয়ারপোর্টে দরদাম করবেন না।',
];

const tel = (n: string) => `tel:${n.replace(/[\s-]/g, '')}`;

export const CarRentalSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div id="car-rental-directory" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 bg-white/10 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/15 mb-2">
          <Car className="w-3.5 h-3.5" />
          <span>বিমানবন্দর ও শহর গাড়ি ভাড়া ডিরেক্টরি</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          এয়ারপোর্ট থেকে বাড়ি — নিরাপদ গাড়ি, নিশ্চিত ভাড়া
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
          হযরত শাহজালাল বিমানবন্দরের অফিসিয়াল কাউন্টার, verified কোম্পানি ও শহরভিত্তিক সেবা — সব নম্বর এক জায়গায়।
        </p>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        {/* 1. Airport counters table */}
        <section>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-700" />
            <span>১. বিমানবন্দর কাউন্টার (হযরত শাহজালাল)</span>
          </h3>
          <p className="text-xs text-slate-600 mb-3">
            এগুলো বিমানবন্দরের ভেতরের অফিসিয়াল কাউন্টার — <strong>প্রি-পেইড ও ঝামেলামুক্ত</strong>। কাউন্টারে টাকা দিয়ে রসিদ নিন, বাইরে দালালের কথায় গাড়ি নেবেন না।
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white text-left">
                  <th className="p-3 font-bold">কাউন্টার</th>
                  <th className="p-3 font-bold">ফোন</th>
                  <th className="p-3 font-bold text-right">কল করুন</th>
                </tr>
              </thead>
              <tbody>
                {AIRPORT_COUNTERS.map((c) => (
                  <tr key={c.name} className="border-t border-slate-100 hover:bg-indigo-50/50">
                    <td className="p-3 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3 font-mono text-slate-700">{c.phone}</td>
                    <td className="p-3 text-right">
                      <a
                        href={tel(c.phone)}
                        className="inline-flex items-center gap-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>কল</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Private companies */}
        <section>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1 flex items-center gap-2">
            <Car className="w-4 h-4 text-indigo-700" />
            <span>২. বেসরকারি রেন্ট-এ-কার কোম্পানি</span>
          </h3>
          <p className="text-xs text-slate-600 mb-3">
            আগে ফোনে গন্তব্য জানিয়ে মোট ভাড়া (টোলসহ) নিশ্চিত করে নিন।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMPANIES.map((c) => (
              <div key={c.name} className="border border-slate-200 rounded-xl p-4 hover:border-indigo-400 hover:shadow-md transition-all bg-white">
                <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 mb-2.5">{c.note}</p>
                <a
                  href={tel(c.phone)}
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-indigo-800 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-mono">{c.phone}</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 3. City-wise */}
        <section>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1">৩. শহরভিত্তিক সেবা</h3>
          <p className="text-xs text-slate-600 mb-3">
            ঢাকার বাইরের শহরে নম্বর সংগ্রহ চলছে — এখনই দরকার হলে WhatsApp ডেস্কে জানান, ব্যবস্থা করে দেবো।
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CITIES.map((c) => (
              <div key={c.city} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-700" />
                  <span>{c.city}</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 mb-2.5">{c.desc}</p>
                <a
                  href="https://wa.me/966505762139?text=%E0%A6%86%E0%A6%AE%E0%A6%BE%E0%A6%95%E0%A7%87%20%E0%A6%97%E0%A6%BE%E0%A7%9C%E0%A6%BF%20%E0%A6%AD%E0%A6%BE%E0%A7%9C%E0%A6%BE%20%E0%A6%B2%E0%A6%BE%E0%A6%97%E0%A6%AC%E0%A7%87%E0%A5%A4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>গাড়ি লাগবে জানান</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Uber/Pathao alternative */}
        <section className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
          <AppWindow className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-slate-900 font-bold block mb-0.5">৪. বিকল্প: উবার ও পাঠাও অ্যাপ</strong>
            ঢাকা ও চট্টগ্রামে অ্যাপে গন্তব্য দিলে নির্দিষ্ট পিকআপ পয়েন্ট থেকে গাড়ি পাবেন। রাত ১২টার পর ও ঈদের সময় সার্জ প্রাইস ও গাড়ি-স্বল্পতা থাকে — তখন কাউন্টার/কোম্পানির প্রি-বুকিং নিরাপদ।
          </div>
        </section>

        {/* 5. Disclaimer */}
        <section className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <strong className="font-bold">সতর্কবার্তা:</strong> প্রবাসী হাব কোনো এজেন্সি বা গাড়ির মালিক নয়। দাম, সেবা ও নিরাপত্তা সম্পর্কে <strong>সরাসরি সংশ্লিষ্ট কোম্পানিকে</strong> যোগাযোগ করে নিশ্চিত হোন। কোনো অগ্রিম টাকা পাঠানোর আগে কোম্পানির পরিচয় যাচাই করুন।
          </p>
        </section>

        {/* 6. Tips + FAQ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="font-bold text-slate-900 text-sm mb-2.5 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-700" />
              <span>৬. গাড়ি নেওয়ার আগে করণীয়</span>
            </h4>
            <ul className="space-y-2">
              {[
                'গাড়িতে ওঠার আগে এসি, সিটবেল্ট, টায়ার ও জ্বালানি একনজর দেখুন।',
                'মোট ভাড়া + টোল + অপেক্ষা-চার্জ ফোনে/SMS-এ লিখিত নিন।',
                'ড্রাইভারের নাম, গাড়ির নম্বর পরিবারকে জানিয়ে রাখুন।',
                'রাতের ফ্লাইটে আগে থেকে বুকিং রাখুন; দালালের পেছনে যাবেন না।',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-indigo-700 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2.5">সাধারণ প্রশ্ন (FAQ)</h4>
            <FaqList />
          </div>
        </section>
      </div>
    </div>
  );
};

const FAQS = [
  {
    q: 'এয়ারপোর্ট থেকে বেরিয়ে কি সাথে সাথে গাড়ি পাবো?',
    a: 'হ্যাঁ — উপরের কাউন্টারগুলো বিমানবন্দরের ভেতরেই থাকে ও প্রি-পেইড সিস্টেমে চলে। ফ্লাইটের ২-৩ ঘণ্টা আগে ফোনে বুক করলে গাড়ি গেটে অপেক্ষা করবে।',
  },
  {
    q: 'ভাড়া কত হবে, আগে জানা যাবে?',
    a: 'হ্যাঁ — গন্তব্য বললেই কোম্পানি ফোনে মোট ভাড়া (টোলসহ) জানিয়ে দেয়। মৌখিক কথায় নয়, SMS/লিখিত কনফার্মেশন নিন।',
  },
  {
    q: 'উবার/পাঠাও কি এয়ারপোর্ট থেকে পাওয়া যায়?',
    a: 'হ্যাঁ — ঢাকা ও চট্টগ্রামে অ্যাপের নির্দিষ্ট পিকআপ পয়েন্ট থেকে পাবেন। রাত ১২টার পর গাড়ি কম থাকে, বিকল্প হিসেবে কাউন্টার বুকিং রাখুন।',
  },
  {
    q: 'প্রবাসী হাব কি নিজে গাড়ি দেয়?',
    a: 'না — প্রবাসী হাব কোনো এজেন্সি বা গাড়ির মালিক নয়। আমরা যাচাইকৃত যোগাযোগের তালিকা দিই; বুকিং ও সেবার দায়িত্ব সংশ্লিষ্ট কোম্পানির।',
  },
];

const FaqList: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {FAQS.map((f, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-2 p-3 text-left cursor-pointer"
          >
            <span className="font-bold text-slate-900 text-xs sm:text-sm">{f.q}</span>
            <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <p className="px-3 pb-3 text-xs text-slate-600 leading-relaxed">{f.a}</p>
          )}
        </div>
      ))}
    </div>
  );
};
