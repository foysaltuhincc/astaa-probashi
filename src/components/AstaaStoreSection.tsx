import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ExternalLink, 
  Star, 
  Truck, 
  ShieldCheck, 
  Gift, 
  CreditCard, 
  Heart, 
  Sparkles,
  PackageCheck,
  Shirt,
  Smartphone,
  Home,
  Sparkle,
  Stethoscope,
  Apple,
  MessageCircle
} from 'lucide-react';
import { ASTAA_STORE_PRODUCTS } from '../data/mockData';

export const AstaaStoreSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'সকল পণ্য', icon: ShoppingBag },
    { id: 'fashion', label: 'ফ্যাশন ও পোশাক', icon: Shirt },
    { id: 'gadget', label: 'গ্যাজেট ও টেক', icon: Smartphone },
    { id: 'home_accessories', label: 'হোম এক্সেসরিজ', icon: Home },
    { id: 'beauty_care', label: 'বিউটি ও স্কিন কেয়ার', icon: Sparkle },
    { id: 'health_parents', label: 'মা-বাবার স্বাস্থ্য', icon: Stethoscope },
    { id: 'groceries', label: 'খাঁটি পুষ্টিকর খাদ্য', icon: Apple },
  ];

  // astaa.store Section-wise direct collection links
  const astaaSections = [
    {
      id: 'sec-fashion',
      title: 'ফ্যাশন কালেকশন',
      subtitle: 'পাঞ্জাবি, শাড়ি ও পোশাক',
      url: 'https://astaa.store/collections/fashion',
      icon: Shirt,
      color: 'bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-400'
    },
    {
      id: 'sec-gadgets',
      title: 'গ্যাজেট কর্নার',
      subtitle: 'স্মার্টওয়াচ, ইয়ারবাডস ও ট্যাব',
      url: 'https://astaa.store/collections/gadgets',
      icon: Smartphone,
      color: 'bg-sky-50 text-sky-700 border-sky-200 hover:border-sky-400'
    },
    {
      id: 'sec-home',
      title: 'হোম এক্সেসরিজ',
      subtitle: 'কিচেন, ব্লেন্ডার ও বেডশিট',
      url: 'https://astaa.store/collections/home-accessories',
      icon: Home,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400'
    },
    {
      id: 'sec-beauty',
      title: 'বিউটি ও কেয়ার',
      subtitle: 'স্কিনকেয়ার ও অর্গানিক অয়েল',
      url: 'https://astaa.store/collections/beauty-care',
      icon: Sparkle,
      color: 'bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-400'
    },
    {
      id: 'sec-health',
      title: 'মা-বাবার স্বাস্থ্য',
      subtitle: 'প্রেসার ও ডায়াবেটিস কিট',
      url: 'https://astaa.store/collections/health-parents',
      icon: Stethoscope,
      color: 'bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400'
    },
    {
      id: 'sec-groceries',
      title: 'খাঁটি খাদ্য সম্ভার',
      subtitle: 'সুন্দরবনের মধু ও গাওয়া ঘি',
      url: 'https://astaa.store/collections/groceries',
      icon: Apple,
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400'
    }
  ];

  const filteredProducts = ASTAA_STORE_PRODUCTS.filter((p) => 
    selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <div id="astaa-store-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-950 via-purple-900 to-indigo-950 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/30 text-purple-200 text-xs font-semibold px-3 py-1 rounded-full border border-purple-400/30 mb-2">
              <ShoppingBag className="w-3.5 h-3.5 text-purple-300" />
              <span>বিদেশে বসে দেশে পরিবারের জন্য কেনাকাটা • astaa.store</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              প্রবাসী ভাইদের জন্য astaa.store এর বিশেষ সেকশন ও শপিং
            </h2>
            
            <p className="text-sm text-purple-100/90 mt-2 leading-relaxed">
              সৌদি আরব বা মধ্যপ্রাচ্য থেকে সরাসরি দেশের পরিবারের জন্য ফ্যাশন, গ্যাজেট, হোম এক্সেসরিজ, বিউটি কেয়ার এবং খাঁটি পুষ্টিকর খাদ্য সামগ্রী পাঠান। ৬৪ জেলার যেকোনো প্রান্তে দ্রুত হোম ডেলিভারি!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://astaa.store"
              target="_blank"
              rel="noopener noreferrer"
              id="btn-visit-astaa-main"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer hover:scale-102"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span>astaa.store এর মূল ওয়েবসাইট</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6 pt-6 border-t border-purple-800/60 text-xs">
          <div className="flex items-center gap-2 text-purple-200">
            <Truck className="w-4 h-4 text-amber-300 shrink-0" />
            <span>৬৪ জেলায় ফাস্ট হোম ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200">
            <CreditCard className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>MADA / বিকাশ / আন্তর্জাতিক কার্ড</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200">
            <ShieldCheck className="w-4 h-4 text-sky-300 shrink-0" />
            <span>১০০% আসল পণ্যের ওয়ারেন্টি</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200">
            <Heart className="w-4 h-4 text-rose-300 shrink-0" />
            <span>পরিবারের জন্য নিরাপদ উপহার</span>
          </div>
        </div>
      </div>

      {/* astaa.store Direct Section Cards (Section-wise links) */}
      <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-4.5 h-4.5 text-purple-700" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              astaa.store সেকশন ও ডিপার্টমেন্ট লিংকসমূহ
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">সরাসরি astaa.store কালেকশনে যান</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {astaaSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <a
                key={sec.id}
                href={sec.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl border bg-white shadow-2xs hover:shadow-sm transition-all text-left group flex flex-col justify-between cursor-pointer ${sec.color}`}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center mb-2 shadow-2xs group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight group-hover:text-purple-700">
                    {sec.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {sec.subtitle}
                  </p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-purple-700">
                  <span>ভিজিট করুন</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="px-5 sm:px-6 py-3.5 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-purple-700 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>{filteredProducts.length} টি বিশেষ অফার প্রদর্শিত</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const whatsappOrderMessage = encodeURIComponent(
              `আসসালামু আলাইকুম! আমি প্রবাস থেকে astaa.store এর এই প্রোডাক্টটি দেশের বাড়িতে অর্ডার করতে চাই:\n\nপণ্য: ${product.title}\nমূল্য: ৳${product.priceBdt}\nলিংক: ${product.directStoreUrl}`
            );

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-95"
                      referrerPolicy="no-referrer"
                    />
                    {product.popularForExpat && (
                      <div className="absolute top-2.5 left-2.5 bg-purple-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        প্রবাসীদের হট চয়েস
                      </div>
                    )}
                    <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur text-white text-[11px] px-2 py-0.5 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {product.rating} ({product.reviewsCount})
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded inline-block">
                        {product.categoryLabel}
                      </span>
                      {product.sectionUrl && (
                        <a
                          href={product.sectionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-slate-500 hover:text-purple-700 inline-flex items-center gap-0.5"
                        >
                          <span>সেকশন দেখুন</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 mb-2 group-hover:text-purple-700 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {product.description}
                    </p>

                    <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg flex items-center gap-1.5 mb-3">
                      <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{product.deliveryTime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2 gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg sm:text-xl font-extrabold text-purple-900 font-mono">
                        ৳{product.priceBdt.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-mono">
                        ৳{product.originalPriceBdt.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block">
                      সাশ্রয় ৳{(product.originalPriceBdt - product.priceBdt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={`https://wa.me/966505762139?text=${whatsappOrderMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp এ অর্ডার করুন"
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <a
                      href={`${product.directStoreUrl}?product=${product.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`btn-order-${product.id}`}
                      className="inline-flex items-center gap-1 bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-xs transition-colors"
                    >
                      <span>অর্ডার লিংক</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expat Family Promise Box */}
      <div className="bg-slate-50 border-t border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 block">কাস্টম উপহার বা স্পেশাল রিকোয়েস্ট পাঠাতে চান?</span>
            <span className="text-slate-500">আপনার পরিবারকে কী পাঠাতে চান astaa.store এর নির্দিষ্ট সেকশনে সরাসরি খুঁজে নিন অথবা WhatsApp-এ জানান।</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://astaa.store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-purple-300 text-purple-800 hover:bg-purple-50 font-bold px-4 py-2 rounded-lg transition-colors shrink-0 shadow-xs"
          >
            <span>সকল কালেকশন দেখুন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

