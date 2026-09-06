import React, { useState } from 'react';
import { 
  PhoneCall, 
  HeartPulse, 
  Building, 
  MapPin, 
  Clock, 
  Mail, 
  MessageCircle, 
  ShieldAlert, 
  CheckCircle,
  Headphones
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/mockData';

export const HealthEmbassySection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');

  const filteredContacts = EMERGENCY_CONTACTS.filter(
    (c) => selectedCountry === 'all' || c.country === selectedCountry
  );

  return (
    <div id="health-embassy-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-red-800 to-rose-950 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-rose-500/30 text-rose-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-rose-400/30 mb-2">
              <Headphones className="w-3.5 h-3.5 text-rose-300" />
              <span>২৪/৭ প্রবাসীর যেকোনো আইনি ও চিকিৎসা সংকটে</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              জরুরি দূতাবাস ডিরেক্টরি ও স্বাস্থ্য সুরক্ষা
            </h2>
            <p className="text-sm text-rose-100/90 mt-1 max-w-xl">
              বিদেশে পাসপোর্ট জটিলতা, কোম্পানি সমস্যা, আইনি সহায়তা ও টেলিমেডিসিন পরামর্শ পেতে সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur p-3 rounded-xl border border-white/20 text-center sm:text-right">
            <span className="text-xs text-rose-200 block font-medium">প্রবাসী কল্যাণ জাতীয় হটলাইন</span>
            <a 
              href="tel:16135" 
              className="text-2xl sm:text-3xl font-mono font-extrabold text-white hover:text-amber-300 transition-colors block"
            >
              📞 ১৬১৩৫
            </a>
            <span className="text-[11px] text-rose-200">(বিদেশ থেকে: +৮৮০ ৯৬৫ ৪৩১৬১৩৫)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Health Guidance & Directory */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Health Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5">
            <HeartPulse className="w-6 h-6 text-rose-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              BMET কল্যাণ বীমা সুবিধা
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              বিএমইটি স্মার্ট কার্ডধারী যেকোনো প্রবাসী বিদেশে অসুস্থতা বা দুর্ঘটনায় ৪ থেকে ১০ লক্ষ টাকা পর্যন্ত আর্থিক ক্ষতিপূরণ ও চিকিৎসার সহায়তা পেতে পারেন।
            </p>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5">
            <CheckCircle className="w-6 h-6 text-emerald-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              বাংলায় ফ্রি টেলিমেডিসিন
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              বিদেশে বিদেশী ভাষায় অসুস্থতার কথা বলতে না পারলে হোয়াটসঅ্যাপে দেশীয় বিশেষজ্ঞ চিকিৎসকদের সাথে সরাসরি কথা বলুন এবং প্রেসক্রিপশন বুঝে নিন।
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5">
            <ShieldAlert className="w-6 h-6 text-amber-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              আইনি সহায়তা ও জেল থেকে মুক্তি
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              বেতন বকেয়া, অন্যায়ভাবে আকামা বাতিল বা কোনো মিথ্যা মামলায় জড়ালে তাৎক্ষণিক বাংলাদেশ দূতাবাসের শ্রম কল্যাণ উইংয়ে আবেদন জানান।
            </p>
          </div>
        </div>

        {/* Directory Filter */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700">দেশ অনুযায়ী দূতাবাস:</span>
              {['all', 'সৌদি আরব', 'সংযুক্ত আরব আমিরাত', 'কাতার', 'মালয়েশিয়া', 'বাংলাদেশ'].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    selectedCountry === c
                      ? 'bg-rose-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c === 'all' ? 'সব অফিস' : c}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-500">
              সরাসরি কল বা WhatsApp করতে বাটনে চাপুন
            </span>
          </div>

          {/* Directory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                id={`contact-card-${contact.id}`}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-rose-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      {contact.country} - {contact.city}
                    </span>
                    {contact.isHotline && (
                      <span className="text-[11px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold animate-pulse">
                        হটলাইন
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-base mb-2">
                    {contact.title}
                  </h4>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{contact.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{contact.hours}</span>
                    </p>
                    {contact.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-mono text-slate-700">{contact.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>কল করুন ({contact.phone})</span>
                  </a>

                  {contact.whatsapp && (
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-xs"
                      title="WhatsApp মেসেজ দিন"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
