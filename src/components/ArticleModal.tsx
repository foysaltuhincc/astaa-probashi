import React from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Check,
  User,
  ShieldCheck
} from 'lucide-react';
import { NewsArticle } from '../types';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      id="article-modal-backdrop" 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="article-modal-container"
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 my-auto"
      >
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-72 w-full bg-slate-900">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover opacity-85"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Tags on image */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
            <span className="bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs">
              {article.categoryName}
            </span>
            <span className="bg-white/20 backdrop-blur text-white text-xs px-2.5 py-1 rounded-md border border-white/30">
              {article.countryFlag} {article.country}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Meta header */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {article.views.toLocaleString()} পঠিত
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(article.id)}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 text-xs transition-colors"
                title="সংরক্ষণ করুন"
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">সংরক্ষিত</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>সেভ</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 text-xs transition-colors"
                title="লিংক কপি করুন"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-medium">কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-400" />
                    <span>শেয়ার</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
            {article.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-900">{article.author}</span>
              <span className="text-slate-400 mx-1.5">•</span>
              <span>{article.authorRole}</span>
            </div>
          </div>

          {/* Body paragraphs */}
          <div className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line font-normal">
            {article.content}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-semibold mr-1">ট্যাগ:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Disclaimer badge */}
          <div className="bg-emerald-50 rounded-xl p-3 text-xs text-emerald-900 border border-emerald-200 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              তথ্যসূত্র: সংশ্লিষ্ট দেশের শ্রম ও ইমিগ্রেশন মন্ত্রণালয় এবং বাংলাদেশ দূতাবাস বুলেটিন। প্রবাসীদের সুরক্ষায় সঠিক তথ্য পৌঁছে দেওয়া আমাদের উদ্দেশ্য।
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
