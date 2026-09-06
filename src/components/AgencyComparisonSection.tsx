import React from 'react';
import { 
  ShieldCheck, 
  XCircle, 
  CheckCircle2, 
  TrendingDown, 
  Luggage, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Quote, 
  Star,
  ArrowRight
} from 'lucide-react';
import { AGENCY_COMPARISONS, CUSTOMER_TESTIMONIALS } from '../data/mockData';

interface AgencyComparisonSectionProps {
  onGoToFlightSearch: () => void;
}

export const AgencyComparisonSection: React.FC<AgencyComparisonSectionProps> = ({
  onGoToFlightSearch
}) => {
  return (
    <div id="agency-comparison-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 text-xs font-semibold px-3 py-1 rounded-full border border-rose-400/30 mb-2">
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            <span>দালাল ও অফলাইন এজেন্সির অতিরিক্ত চার্জ থেকে মুক্তি</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            কেন এজেন্সিতে বেশি টাকা দেবেন? সরাসরি কাটুন, ৩০০০-৮০০০ টাকা বাঁচান!
          </h2>

          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            সাধারণ ট্রাভেল এজেন্সিতে প্রবাসীদের কাছে ৩,০০০ থেকে ৮,০০০ টাকা পর্যন্ত অতিরিক্ত মুনাফা নিয়ে টিকিট বিক্রি করা হয়। আমাদের সাইটে আপনি সরাসরি এয়ারলাইনের অফিশিয়াল সিস্টেমে কোনো গোপন ফি ছাড়াই টিকিট কাটতে পারেন।
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="p-5 sm:p-8">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>অফলাইন ট্রাভেল এজেন্সি বনাম প্রবাসী হাব সরাসরি বুকিং:</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3.5 font-bold text-slate-700 w-1/4">সেবা ও সুবিধা</th>
                <th className="p-3.5 font-bold text-rose-700 bg-rose-50/50 w-3/8">
                  সাধারণ অফলাইন এজেন্সি ❌
                </th>
                <th className="p-3.5 font-bold text-emerald-800 bg-emerald-50/60 w-3/8">
                  প্রবাসী হাব অনলাইন টিকিট ✅
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AGENCY_COMPARISONS.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-900">
                    {item.feature}
                  </td>
                  <td className="p-3.5 text-slate-600 bg-rose-50/30">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{item.agencyWay}</span>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-800 bg-emerald-50/40">
                    <div className="flex items-start gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span>{item.probashiHubWay}</span>
                        <span className="block text-[11px] font-bold text-emerald-700 mt-1 bg-emerald-100/60 px-2 py-0.5 rounded w-fit">
                          ★ {item.advantage}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Banner inside */}
        <div className="mt-8 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-300/60 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-1">
              নিজের কষ্টার্জিত টাকা এজেন্সিকে বাড়তি দেবেন কেন?
            </h4>
            <p className="text-xs text-slate-600">
              আজই চেক করে দেখুন আপনার গন্তব্যের টিকিটের মূল্য এবং লাগেজ ছাড়।
            </p>
          </div>

          <button
            onClick={onGoToFlightSearch}
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <span>সস্তা বিমান টিকিট দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Real Testimonials from Expats */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-600" />
              <span>প্রবাসী ভাইদের বাস্তব অভিজ্ঞতা ও সাশ্রয়:</span>
            </h3>
            <span className="text-xs text-slate-500 hidden sm:inline">
              ১০০% ভেরিফাইড টিকিট বুকিং
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CUSTOMER_TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-slate-50 rounded-xl border border-slate-200 p-4.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                        {test.avatarText[0]}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">{test.name}</span>
                        <span className="text-[10px] text-slate-500">{test.location}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {test.savings}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 italic leading-relaxed mt-2">
                    &quot;{test.quote}&quot;
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>রুট: {test.route}</span>
                  <span className="text-amber-500 flex items-center">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                    <Star className="w-3 h-3 fill-amber-400" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
