import React, { useState } from 'react';
import { 
  Building2, 
  Car, 
  Star, 
  MapPin, 
  ExternalLink, 
  Users, 
  Luggage, 
  Check, 
  Sparkles,
  Search,
  ShieldCheck
} from 'lucide-react';
import { HOTEL_DEALS, CAR_RENTAL_SERVICES } from '../data/mockData';

export const HotelCarSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'cars'>('hotels');
  const [cityFilter, setCityFilter] = useState('all');

  const filteredHotels = HOTEL_DEALS.filter(
    (h) => cityFilter === 'all' || h.city.includes(cityFilter) || h.country.includes(cityFilter)
  );

  return (
    <div id="hotel-car-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-500/30 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-400/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>প্রবাসী হোটেল ও বিমানবন্দর কার রেন্টাল অ্যাফিলিয়েট</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              ট্রানজিট হোটেল, ওমরাহ স্টে ও বিমানবন্দর গাড়ি বুকিং
            </h2>
            <p className="text-sm text-amber-100/90 mt-1 max-w-xl">
              দুবাই, দোহা, মক্কা-মদিনা ট্রানজিট হোটেল এবং বাংলাদেশে বিমানবন্দরে নেমে নিরাপদ বাড়ি ফেরার গাড়ি সার্ভিস।
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/20 self-start sm:self-center">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'hotels' ? 'bg-white text-amber-900 shadow-sm' : 'text-amber-100 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>হোটেল বুকিং</span>
            </button>
            <button
              onClick={() => setActiveTab('cars')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cars' ? 'bg-white text-amber-900 shadow-sm' : 'text-amber-100 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>বিমানবন্দর গাড়ি সার্ভিস</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content for Hotels */}
      {activeTab === 'hotels' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-700">শহর ফিল্টার:</span>
              {['all', 'দুবাই', 'মদিনা', 'কুয়ালালামপুর', 'ঢাকা'].map((city) => (
                <button
                  key={city}
                  onClick={() => setCityFilter(city)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                    cityFilter === city
                      ? 'bg-amber-100 text-amber-900 font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {city === 'all' ? 'সকল হোটেল' : city}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500">
              Booking.com এবং Agoda স্পেশাল ডিসকাউন্ট যুক্ত
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                id={`hotel-card-${hotel.id}`}
                className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="relative h-48 bg-slate-800 overflow-hidden">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      {hotel.rating} / ৫.০ ({hotel.reviewsCount})
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{hotel.city}, {hotel.country}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug mb-2">
                      {hotel.name}
                    </h3>

                    {hotel.distanceToAirport && (
                      <p className="text-xs text-amber-800 bg-amber-50 px-2 py-1 rounded font-medium inline-block mb-3">
                        ✈️ {hotel.distanceToAirport}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hotel.amenities.map((item, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">প্রতি রাত শুরু</span>
                    <span className="text-xl font-bold text-slate-900 font-mono text-emerald-700">
                      ৳{hotel.pricePerNightBdt.toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={hotel.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
                  >
                    <span>বুকিং দেখুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for Car Rentals */}
      {activeTab === 'cars' && (
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-700">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 mb-0.5">প্রবাসীদের জন্য নিরাপদ পরিবহন গ্যারান্টি:</p>
              <p>
                দেশে ফিরে বিমানবন্দরে লাগেজ নিয়ে টানাটানি ও অতিরিক্ত ভাড়ার ঝামেলা ছাড়াই পূর্বে বুক করা গাড়িতে সরাসরি বাড়ি পৌঁছান। ফ্লাইট বিলম্ব হলেও ড্রাইভার ফ্রি অপেক্ষা করবে।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAR_RENTAL_SERVICES.map((car) => (
              <div
                key={car.id}
                id={`car-card-${car.id}`}
                className="rounded-xl border border-slate-200 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-800 overflow-hidden">
                    <img
                      src={car.imageUrl}
                      alt={car.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block mb-1">
                      {car.city}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug mb-2">
                      {car.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">
                      মডেল: {car.carType}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded-lg">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {car.seats} সিট
                      </span>
                      <span className="flex items-center gap-1">
                        <Luggage className="w-3.5 h-3.5 text-slate-400" />
                        {car.luggage} লাগেজ
                      </span>
                      <span className="text-emerald-700 font-semibold">
                        {car.driverIncluded ? 'ড্রাইভারসহ' : 'সেলফ ড্রাইভ'}
                      </span>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-600 mb-4">
                      {car.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-[11px] text-slate-400 block">ভাড়া শুরু</span>
                    <span className="text-xl font-bold text-slate-900 font-mono text-emerald-700">
                      ৳{car.pricePerDayBdt.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const text = encodeURIComponent(
                          `আসসালামু আলাইকুম, আমি দেশে ফেরার পর বিমানবন্দর থেকে বাড়ি যাওয়ার জন্য "${car.title}" গাড়িটি বুক করতে চাই।`
                        );
                        window.open(`https://wa.me/966505762139?text=${text}`, '_blank');
                      }}
                      className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors cursor-pointer"
                      title="WhatsApp-এ বুক করুন"
                    >
                      <span>WhatsApp বুকিং</span>
                    </button>

                    <a
                      href={car.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg transition-colors shadow-xs"
                    >
                      <span>অনলাইন রিজার্ভ</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
