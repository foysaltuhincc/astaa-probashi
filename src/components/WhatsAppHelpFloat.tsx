import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ExternalLink,
  ChevronRight,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export const WhatsAppHelpFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'whatsapp'>('ai');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappCustomMsg, setWhatsappCustomMsg] = useState('');
  
  // Official WhatsApp Number specified by user
  const whatsappNumber = '966505762139';
  const displayPhone = '+966 50 576 2139';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `আসসালামু আলাইকুম! 🇧🇩 আমি আপনার **প্রবাসী এআই সহকারী**। 

বিমান টিকিট, ৪৬ কেজি লাগেজ নিয়ম, astaa.store থেকে দেশে বাজার পাঠানো, আকামা বা সৌদি/উপসাগরীয় নিয়মাবলী নিয়ে যেকোনো প্রশ্ন করতে পারেন। 

*জরুরি টিকিট বুকিং বা ব্যক্তিগত সহায়তায় সরাসরি আমাদের WhatsApp: **${displayPhone}** এ নক দিতে পারেন।*`,
      time: 'এখনই'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTab === 'ai') {
      scrollToBottom();
    }
  }, [messages, isOpen, activeTab]);

  const quickQuestions = [
    '✈️ সস্তায় ৪৬ কেজি লাগেজসহ টিকিট কিভাবে কাটব?',
    '💳 Tabby ও Tamara দিয়ে ৪ কিস্তিতে টিকিট কাটার নিয়ম কি?',
    '🩺 সৌদি থেকে দেশে ডাক্তার ও অ্যাম্বুলেন্স বুক করব কিভাবে?',
    '🛒 astaa.store থেকে দেশে বাজার পাঠানোর নিয়ম কি?',
    '🇸🇦 Absher, Qiwa বা আকামা স্ট্যাটাস কোথায় দেখব?',
    '🚗 ঢাকা এয়ারপোর্ট থেকে বাড়ি যাওয়ার গাড়ি ভাড়া কত?'
  ];

  const handleSendAiMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message history to /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-5).map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error('সার্ভার থেকে উত্তর পাওয়া যায়নি');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `দুঃখিত, সংযোগে সামান্য সমস্যা হয়েছে। সরাসরি টিকিট বা তথ্য জানার জন্য আমাদের WhatsApp-এ মেসেজ করুন: **${displayPhone}**`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = (customText?: string) => {
    const defaultText = `আসসালামু আলাইকুম, আমি প্রবাসী হাব থেকে সস্তায় বিমান টিকিট / astaa.store কেনাকাটা নিয়ে কথা বলতে চাই।`;
    const encoded = encodeURIComponent(customText || whatsappCustomMsg || defaultText);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Pop-up Chat Window */}
      {isOpen && (
        <div 
          id="probashi-assistant-drawer"
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[92vw] sm:w-[410px] h-[550px] max-h-[85vh] flex flex-col overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-3.5 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
                  <Bot className="w-5 h-5 text-emerald-200" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm leading-tight text-white">প্রবাসী এআই সহকারী</h4>
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.2 rounded border border-emerald-400/30">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span>WhatsApp: {displayPhone}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                title="চ্যাট ক্লিয়ার করুন"
                className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 border-b border-slate-200 shrink-0 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('ai')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'ai'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>এআই চ্যাট (Instant AI)</span>
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>সরাসরি WhatsApp</span>
            </button>
          </div>

          {/* Tab 1: AI Chat Assistant */}
          {activeTab === 'ai' && (
            <>
              {/* Message List */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-slate-50 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4 text-emerald-700" />
                      )}
                    </div>
                    <div
                      className={`max-w-[82%] rounded-2xl p-3 shadow-xs leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-emerald-700 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                      }`}
                    >
                      <div>{msg.content}</div>
                      <div
                        className={`text-[10px] mt-1 text-right ${
                          msg.role === 'user' ? 'text-emerald-200' : 'text-slate-400'
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-xs text-xs text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>এআই উত্তর তৈরি করছে...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestion pills */}
              <div className="p-2 bg-slate-100 border-t border-slate-200 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendAiMessage(q)}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1 text-[11px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-full px-2.5 py-1 transition-colors cursor-pointer shrink-0"
                  >
                    <span>{q}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* AI Chat Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendAiMessage();
                }}
                className="p-2.5 bg-white border-t border-slate-200 flex gap-2 items-center"
              >
                <input
                  type="text"
                  placeholder="আকামা, রেমিট্যান্স, টিকিট বা চিকিৎসা নিয়ে প্রশ্ন লিখুন..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-2.5 rounded-xl cursor-pointer transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* Tab 2: Direct WhatsApp Help */}
          {activeTab === 'whatsapp' && (
            <div className="flex-1 p-4 bg-slate-50 flex flex-col justify-between overflow-y-auto text-xs">
              <div className="space-y-3">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900 leading-relaxed">
                  <div className="font-bold flex items-center gap-1.5 text-sm mb-1 text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    সরাসরি অফিশিয়াল WhatsApp হেল্পলাইন
                  </div>
                  <p className="text-[12px] text-emerald-700">
                    বিমান টিকিট বুকিং, তারিখ পরিবর্তন, astaa.store হোম ডেলিভারি অথবা বিশেষ কোনো সহায়তার জন্য আমাদের সৌদি আরব অফিস নম্বরে সরাসরি যোগাযোগ করুন।
                  </p>
                  <div className="mt-2.5 inline-block bg-white text-emerald-800 font-mono font-bold text-sm px-3 py-1 rounded-lg border border-emerald-300 shadow-xs">
                    {displayPhone}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700">
                    দ্রুত মেসেজ পাঠিয়ে যোগাযোগ করুন:
                  </label>
                  <textarea
                    rows={3}
                    value={whatsappCustomMsg}
                    onChange={(e) => setWhatsappCustomMsg(e.target.value)}
                    placeholder="উদাহরণ: আসসালামু আলাইকুম, আমি আগামী মাসে রিয়াদ থেকে ঢাকা যাওয়ার ৪৬ কেজি লাগেজের টিকিট কাটতে চাই..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 font-medium">
                    অথবা বিষয় অনুযায়ী নির্বাচন করুন:
                  </span>
                  {[
                    'সস্তা বিমান টিকিট অনুসন্ধান ও বুকিং সহায়তা',
                    '৪৬ কেজি লাগেজ ও জমজম পানি কনফার্মেশন',
                    'astaa.store থেকে দেশের বাড়িতে বাজার পাঠানো',
                    'ঢাকা/চট্টগ্রাম বিমানবন্দর থেকে গাড়ি বুকিং'
                  ].map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => openWhatsApp(`আসসালামু আলাইকুম, আমি "${topic}" বিষয়ে দ্রুত কথা বলতে চাই।`)}
                      className="w-full text-left py-2 px-3 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{topic}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp এ চ্যাট শুরু করুন</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="btn-whatsapp-float"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 active:scale-95 text-white font-bold px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-white/20"
        title="প্রবাসী এআই সহকারী ও WhatsApp"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
        </div>
        <div className="text-left">
          <div className="text-xs font-bold leading-tight flex items-center gap-1">
            <span>এআই সহকারী ও হেল্পডেস্ক</span>
          </div>
          <span className="text-[10px] text-emerald-200 font-normal hidden sm:block">
            {displayPhone}
          </span>
        </div>
      </button>
    </div>
  );
};
