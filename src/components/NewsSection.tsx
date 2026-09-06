import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  Clock, 
  Eye, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck,
  Flame,
  Sparkles
} from 'lucide-react';
import { NewsArticle, CategoryType } from '../types';

interface NewsSectionProps {
  articles: NewsArticle[];
  searchQuery: string;
  onSelectArticle: (article: NewsArticle) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  searchQuery,
  onSelectArticle,
  bookmarks,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const categories = [
    { id: 'all', label: 'সকল সংবাদ' },
    { id: 'visa', label: 'ভিসা ও ইমিগ্রেশন' },
    { id: 'flight', label: 'বিমান ও ট্রাভেল' },
    { id: 'currency', label: 'মুদ্রা ও রেমিট্যান্স' },
    { id: 'health', label: 'স্বাস্থ্য ও বীমা' },
    { id: 'community', label: 'প্রবাসী সুরক্ষা ও অধিকার' },
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const restArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div id="news-section" className="mb-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" />
            <span>প্রবাসী সংবাদ ও জরুরি গাইড</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            সর্বশেষ প্রবাসী খবর ও তথ্যকোষ
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as CategoryType)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* When no match found */}
      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-base font-semibold text-slate-700">কোনো খবর পাওয়া যায়নি</p>
          <p className="text-xs text-slate-400 mt-1">অন্য কোনো শব্দ বা ক্যাটাগরি দিয়ে চেষ্টা করুন।</p>
        </div>
      )}

      {/* Featured Big Article Card */}
      {featuredArticle && (
        <div
          id={`featured-article-${featuredArticle.id}`}
          onClick={() => onSelectArticle(featuredArticle)}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer mb-6 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto relative overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <Flame className="w-3.5 h-3.5" />
                  গুরুত্বপূর্ণ খবর
                </span>
                <span className="bg-white/80 backdrop-blur text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {featuredArticle.countryFlag} {featuredArticle.country}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    {featuredArticle.categoryName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredArticle.publishedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                  {featuredArticle.title}
                </h3>

                <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>লেখক: <strong>{featuredArticle.author}</strong></span>
                  <span>•</span>
                  <span>{featuredArticle.views.toLocaleString()} ভিউ</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(featuredArticle.id);
                    }}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600"
                    title="সেভ করুন"
                  >
                    {bookmarks.includes(featuredArticle.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>বিস্তারিত পড়ুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restArticles.map((article) => {
          const isBookmarked = bookmarks.includes(article.id);
          return (
            <div
              key={article.id}
              id={`article-card-${article.id}`}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="bg-black/60 backdrop-blur text-white text-[11px] font-medium px-2 py-0.5 rounded">
                      {article.categoryName}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur text-white text-[11px] px-2 py-0.5 rounded">
                    {article.countryFlag} {article.country}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  {article.views.toLocaleString()} বার পঠিত
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(article.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-md hover:bg-slate-50"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 group-hover:underline">
                    পড়ুন <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
