import React, { useState } from 'react';
import {
  Info,
  PhoneCall,
  ShieldCheck,
  FileText,
  AlertTriangle,
} from 'lucide-react';

type LegalPageId = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';

const TABS: { id: LegalPageId; label: string; icon: React.ReactNode }[] = [
  { id: 'about', label: 'আমাদের সম্পর্কে', icon: <Info className="w-4 h-4" /> },
  { id: 'contact', label: 'যোগাযোগ', icon: <PhoneCall className="w-4 h-4" /> },
  { id: 'privacy', label: 'গোপনীয়তা নীতি', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'terms', label: 'শর্তাবলী', icon: <FileText className="w-4 h-4" /> },
  { id: 'disclaimer', label: 'দাবিত্যাগ', icon: <AlertTriangle className="w-4 h-4" /> },
];

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-slate-700 leading-7 mb-3">{children}</p>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-bold text-slate-900 text-base mt-5 mb-2">{children}</h3>
);

export const LegalPages: React.FC = () => {
  const [page, setPage] = useState<LegalPageId>('about');

  return (
    <div id="legal-pages" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">তথ্য ও নীতিমালা</h2>
        <p className="text-sm text-slate-300 mt-1">প্রবাসী হাব সম্পর্কে, যোগাযোগ ও ব্যবহারের নিয়মাবলী।</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setPage(t.id)}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                page === t.id
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8 max-w-3xl">
        {page === 'about' && (
          <div>
            <H>প্রবাসী হাব কী?</H>
            <P>প্রবাসী হাব বাংলাদেশি প্রবাসীদের জন্য একটি তথ্য ও সেবা পোর্টাল। আমাদের লক্ষ্য — বিদেশে যাওয়ার প্রস্তুতি থেকে শুরু করে প্রবাসজীবন, পরিবারের সহায়তা এবং দেশে ফেরার পরিকল্পনা পর্যন্ত প্রতিটি ধাপে নির্ভরযোগ্য তথ্য, দরকারি টুল ও যাচাইকৃত সেবার যোগাযোগ এক জায়গায় পৌঁছে দেওয়া।</P>
            <H>আমরা যা করি</H>
            <P>সাশ্রয়ী বিমান টিকিটের তথ্য ও বুকিং সহায়তা, লাইভ মুদ্রা রেট ও রেমিট্যান্স ক্যালকুলেটর, Tabby/Tamara কিস্তির নির্দেশনা, দেশে পরিবারের জন্য ডাক্তার অ্যাপয়েন্টমেন্ট সমন্বয়, astaa.store-এর মাধ্যমে পরিবারের জন্য কেনাকাটা, বিমানবন্দর গাড়ি সেবার তথ্য এবং দূতাবাস ও জরুরি হেল্পলাইন ডিরেক্টরি।</P>
            <H>আমরা যা করি না</H>
            <P>আমরা কোনো ভিসা এজেন্সি, রিক্রুটিং এজেন্সি, হাসপাতাল বা পরিবহন কোম্পানি নই। আমরা তথ্য দিই ও যোগাযোগে সহায়তা করি; চূড়ান্ত সেবা সংশ্লিষ্ট প্রতিষ্ঠান দেয়। কোনো সরকারি সিদ্ধান্ত, ভিসা অনুমোদন বা আইনি ফলাফলের নিশ্চয়তা আমরা দিই না।</P>
            <H>আমাদের প্রতিশ্রুতি</H>
            <P>ব্যবহারকারীর আস্থাই আমাদের মূলধন। ভুল তথ্য পেলে সংশোধন করি, স্পন্সরড বা অ্যাফিলিয়েট কনটেন্ট স্পষ্টভাবে চিহ্নিত করি এবং ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করি।</P>
          </div>
        )}

        {page === 'contact' && (
          <div>
            <H>যোগাযোগ করুন</H>
            <P>যেকোনো প্রশ্ন, তথ্য সংশোধন, বিজ্ঞাপন বা পার্টনারশিপের জন্য নিচের মাধ্যমে যোগাযোগ করুন। সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দেওয়ার চেষ্টা করি।</P>
            <div className="space-y-3 mt-4">
              <a
                href="https://wa.me/966505762139?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%AC%E0%A6%BE%E0%A6%B8%E0%A7%80%20%E0%A6%B9%E0%A6%BE%E0%A6%AC%E0%A7%87%20%E0%A6%95%E0%A6%A5%E0%A6%BE%20%E0%A6%AC%E0%A6%B2%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <span className="font-bold text-emerald-900 text-sm">WhatsApp হেল্পডেস্ক: +966 50 576 2139</span>
              </a>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <span className="font-bold text-slate-900 text-sm">ইমেইল: contact@astaa.store</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
                <span className="text-slate-700 text-sm">প্রবাসী কল সেন্টার (সরকারি): <strong>১৬১৩৫</strong> (২৪/৭ ফ্রি)</span>
              </div>
            </div>
          </div>
        )}

        {page === 'privacy' && (
          <div>
            <H>গোপনীয়তা নীতি</H>
            <P>সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬। প্রবাসী হাব ব্যবহারকারীর গোপনীয়তাকে গুরুত্ব দেয়। এই নীতি ব্যাখ্যা করে আমরা কী তথ্য সংগ্রহ করি, কেন করি এবং কীভাবে সুরক্ষা দিই।</P>
            <H>১. কী তথ্য সংগ্রহ করি</H>
            <P>(ক) আপনি নিজে দিলে: WhatsApp/ফর্মে দেওয়া নাম, ফোন নম্বর, ভ্রমণ বা চিকিৎসা-সংক্রান্ত বিবরণ। (খ) স্বয়ংক্রিয়ভাবে: ডিভাইসের ধরন, ব্রাউজার, আনুমানিক অবস্থান (দেশ/শহর পর্যায়ে) ও পেজ ভিজিট — সাইট উন্নত করতে। আমরা অপ্রয়োজনীয় সংবেদনশীল তথ্য (পাসওয়ার্ড, OTP, কার্ড নম্বর, পাসপোর্ট স্ক্যান) চাই না ও সংরক্ষণ করি না।</P>
            <H>২. তথ্য কীভাবে ব্যবহার হয়</H>
            <P>সেবা প্রদান (বুকিং সমন্বয়, উত্তর দেওয়া), সাইটের মানোন্নয়ন, নিরাপত্তা (স্প্যাম/অপব্যবহার রোধ) এবং আইনগত বাধ্যবাধকতা পূরণে। আপনার তথ্য বিক্রি করা হয় না।</P>
            <H>৩. তৃতীয় পক্ষ</H>
            <P>হোস্টিং/অ্যানালিটিক্স (যেমন Vercel Analytics), WhatsApp (আপনি নিজে মেসেজ করলে) এবং পেমেন্ট/বুকিং পার্টনার (শুধু প্রয়োজনীয় তথ্য)। বিজ্ঞাপন দেখানো হলে (যেমন Google AdSense) তারা নিজস্ব কুকি নীতি অনুযায়ী বিজ্ঞাপন ব্যক্তিগতকরণ করতে পারে।</P>
            <H>৪. কুকি</H>
            <P>পছন্দ মনে রাখতে (যেমন বুকমার্ক) ও ট্রাফিক বিশ্লেষণে কুকি/লোকাল স্টোরেজ ব্যবহৃত হয়। ব্রাউজার সেটিংস থেকে কুকি বন্ধ করা যায়; কিছু ফিচার তখন কাজ নাও করতে পারে।</P>
            <H>৫. আপনার অধিকার</H>
            <P>আপনার তথ্য দেখা, সংশোধন বা মুছে ফেলার অনুরোধ করতে WhatsApp বা ইমেইলে যোগাযোগ করুন। শিশুদের তথ্য জেনেশুনে সংগ্রহ করি না।</P>
          </div>
        )}

        {page === 'terms' && (
          <div>
            <H>ব্যবহারের শর্তাবলী</H>
            <P>সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬। এই সাইট ব্যবহার করলে আপনি নিচের শর্তগুলো মেনে চলতে সম্মত হচ্ছেন।</P>
            <H>১. তথ্যের প্রকৃতি</H>
            <P>সাইটের তথ্য সাধারণ নির্দেশনা মাত্র — আইনি, ভিসা, চিকিৎসা বা আর্থিক পরামর্শ নয়। টিকিটের দাম, ভাড়া, রেট, নিয়ম ও সময়সূচি পরিবর্তনশীল; সিদ্ধান্তের আগে সংশ্লিষ্ট অফিসিয়াল উৎসে (এয়ারলাইন, হাসপাতাল, দূতাবাস, ব্যাংক) যাচাই করুন।</P>
            <H>২. নিষিদ্ধ ব্যবহার</H>
            <P>ভুয়া তথ্য ছড়ানো, স্প্যাম, সিস্টেমের অপব্যবহার, অন্যের অধিকার লঙ্ঘন এবং আইনবিরোধী কাজে সাইট ব্যবহার নিষেধ। লঙ্ঘনে অ্যাক্সেস বন্ধ করা হতে পারে।</P>
            <H>৩. তৃতীয় পক্ষের লিংক</H>
            <P>এয়ারলাইন, হাসপাতাল, অ্যাফিলিয়েট ও বিজ্ঞাপনদাতার সাইটের বিষয়বস্তু, দাম ও সেবার দায় তাদের। বুকিং/পেমেন্টের আগে তাদের শর্ত পড়ুন।</P>
            <H>৪. দায়সীমা</H>
            <P>সাইট "যেমন আছে" ভিত্তিতে দেওয়া হয়। তথ্যের ভুল, সেবা-ব্যাঘাত বা তৃতীয় পক্ষের কাজের জন্য উদ্ভূত ক্ষতির দায় প্রবাসী হাব নেয় না, আইনে অনুমোদিত সর্বোচ্চ সীমা পর্যন্ত।</P>
            <H>৫. যোগাযোগ</H>
            <P>শর্তাবলী নিয়ে প্রশ্ন থাকলে যোগাযোগ পেজের মাধ্যমে জানান।</P>
          </div>
        )}

        {page === 'disclaimer' && (
          <div>
            <H>দাবিত্যাগ (Disclaimer)</H>
            <P>প্রবাসী হাব একটি তথ্য ও সহায়তা পোর্টাল — ভিসা এজেন্সি, রিক্রুটিং এজেন্সি, হাসপাতাল, পরিবহন কোম্পানি, ব্যাংক বা সরকারি সংস্থা নয়।</P>
            <P>টিকিটের দাম, সিট, লাগেজ নিয়ম, ডাক্তারের শিডিউল, মুদ্রার রেট, ভিসা/আকামা স্ট্যাটাস ও আইনি বিষয় প্রতিনিয়ত বদলায়। এখানকার তথ্য দেখে সিদ্ধান্ত নেওয়ার আগে সংশ্লিষ্ট অফিসিয়াল উৎস (এয়ারলাইন, হাসপাতাল, দূতাবাস, ব্যাংক, নিয়োগকর্তা) থেকে অবশ্যই যাচাই করুন।</P>
            <P>অ্যাফিলিয়েট/স্পন্সরড লিংক থেকে আমরা কমিশন পেতে পারি — এতে আপনার খরচ বাড়ে না। জরুরি চিকিৎসা, আইনি বা নিরাপত্তা বিষয়ে এই সাইট জরুরি সেবার বিকল্প নয়; প্রয়োজনে সংশ্লিষ্ট জরুরি নম্বরে (যেমন ১৬১৩৫) যোগাযোগ করুন।</P>
          </div>
        )}
      </div>
    </div>
  );
};
