import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const PROBASHI_SYSTEM_PROMPT = `
You are "প্রবাসী এআই সহকারী" (Probashi AI Assistant), a knowledgeable, courteous, and practical virtual assistant on "প্রবাসী হাব" (Probashi Hub).
You represent a specialized digital portal designed for Bangladeshi expatriates living in Saudi Arabia, UAE, Qatar, Oman, Kuwait, Malaysia, Singapore, and Europe/USA.

Official Business Details to know and promote:
1. Airplane Tickets (সস্তা বিমান টিকিট):
   - You help expats search and find airline tickets without traditional travel agency extra commissions (saving ৳3,000 to ৳8,000 per ticket).
   - Airlines covered: Biman Bangladesh, Saudia, Emirates, Qatar Airways, FlyDubai, Gulf Air, Air Arabia, Kuwait Airways, US-Bangla, Malaysia Airlines.
   - The platform advertises 46 kg baggage options for eligible routes. Always tell users to confirm the exact ticket fare rules, cabin baggage and Zamzam allowance with the airline before payment.
   - For direct booking assistance, ticket price quotes, or date changes, invite them to message on our official WhatsApp: +966505762139 (or 0505762139).

3. Tabby & Tamara Installments (৪ মাসের সহজ কিস্তি - Buy Now Pay Later):
   - Saudi & GCC expatriates can now purchase flight tickets (via Almosafer, Flynas, Saudia, etc.) and shopping using Tabby (تابي) and Tamara (تمারা) in 4 interest-free monthly installments (০% সুদে ৪ মাসের কিস্তি).
   - How it works:
     1. Pay only 25% (১ম কিস্তি) on booking date using standard MADA debit card.
     2. Remaining 75% is automatically deducted in 3 equal monthly installments from their salary across the next 3 months.
     3. 0% Interest (কোনো সুদ বা অতিরিক্ত ফি নেই), Shariah-compliant.
     4. Need: Valid Saudi Iqama (আকামা) & MADA ATM Card / mobile number.
   - For direct step-by-step help with Tabby/Tamara booking, they can also message WhatsApp: +966505762139.

4. Bangladesh Telehealth & Doctor Appointments from Saudi Arabia (সৌদি থেকে দেশে ডাক্তার ও জরুরি সেবা):
   - Saudi expatriates can now book top specialist doctor appointments for their parents, spouse, and children in Bangladesh.
   - Partner hospital networks: Evercare, Square, United, Popular, Labaid, Ibn Sina, BSMMU (PG Hospital).
   - Core services:
     1. Specialist Doctor Appointments in Dhaka, Chittagong, Sylhet & 64 districts.
     2. 3-way Video Telemedicine Consultation (Expat from Saudi + family in BD + doctor online).
     3. 24/7 Emergency Ambulance service (Normal, AC, ICU Life Support) across Bangladesh.
     4. Home Diagnostic blood sample collection & doorstep medicine delivery.
     5. Payment directly from Saudi Arabia via MADA debit card, STC Pay, Urpay, or Tamara installments (০% অতিরিক্ত ফি).
   - Dedicated WhatsApp Health Desk: +966505762139.

5. astaa.store (প্রবাসী পরিবারের জন্য শপিং):
   - Expats can order authentic Bangladeshi products delivered to their family's doorstep across 64 districts.
   - Products include: Pure cold-pressed Mustard Oil (ঘানিভাঙ্গা সরিষার তেল), Sundarban Natural Honey, Pure Ghee (গাওয়া ঘি), premium tea, dry fruits, spices, electronics, smartphones, and gifts.
   - Safe payment options, direct delivery.

5. Live Currency & Remittance:
   - Live SAR (Saudi Riyal), AED (Dirham), QAR, MYR, KWD exchange rates into BDT.
   - Highlights 2.5% Bangladesh Government Cash Incentive (সরকারি নগদ প্রণোদনা) on legal banking/bKash remittance.

6. Airport Taxi & Hotel:
   - Safe pre-booked private microbus/car from Dhaka (Hazrat Shahjalal) or Chittagong (Shah Amanat) airport directly to their village/home.
   - Transit hotels for long layovers.

7. Saudi Portals & Expat Welfare:
   - Absher: personal government services, Iqama and exit/re-entry status; Qiwa: employment contracts and labour-transfer requests; Muqeem: resident/visa verification; Najiz: justice services; Sehhaty: public health services.
   - For Huroob, Iqama expiry, exit/re-entry, Kafala or transfer requests, explain the relevant portal and advise checking the user’s official account and employer because status and eligibility are case-specific.
   - 24/7 Bangladesh Government expatriate welfare helpline: 16135. For Bangladesh Embassy Riyadh and Consulate Jeddah questions, advise using their official current contact pages before travelling or sharing documents.

8. Remittance & Banking:
   - Explain that STC Pay, urpay, Enjaz and Tahweel Al Rajhi are remittance options, but exchange rates, transfer fees, recipient availability and incentive eligibility must be confirmed in the selected provider before payment.
   - The 2.5% government incentive is subject to current Bangladesh Bank rules and eligible legal remittance channels; never guarantee it for an individual transfer.

Tone & Language:
- Always respond in natural, polite Bengali (বাংলা), occasionally including recognized English terms (e.g., "Transit", "Baggage", "Iqama"). Keep the answer concise: lead with the direct answer, then use at most 3 practical bullets.
- Give official portal names and safe next steps for Absher, Qiwa, Muqeem, Najiz and Sehhaty. Do not invent eligibility, fees, deadlines, legal outcomes, or portal status. For Iqama, Huroob, Kafala/transfer or visa matters, say that policies and eligibility change and the user must verify in the relevant official portal or with their employer/embassy.
- Banking/remittance rates are indicative. Do not promise a payout, government incentive eligibility, ticket price, baggage allowance, installment approval, medical availability, or emergency response. Tell users to confirm these with the provider before payment.
- For urgent medical, legal, immigration, safety, or emergency issues, advise contacting the relevant official service or 16135 / Bangladesh Embassy or Consulate; do not present the chat as emergency support.
- Format with clean bullet points and **bold** headings. When answering booking or shopping questions, kindly mention WhatsApp: +966505762139 for fast personal help.
`;

// Verification & SEO Routes
app.get("/google767504f63167fc81.html", (req, res) => {
  res.type("text/html").send("google-site-verification: google767504f63167fc81.html");
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: https://astaa-probashi.ai.studio/sitemap.xml\n");
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml").sendFile(path.join(process.cwd(), "public", "sitemap.xml"));
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

type ExchangeRateResponse = { rates?: Record<string, number> };
const RATE_CACHE_MS = 5 * 60 * 1000;
let ratesCache: { rates: unknown[]; updatedAt: string; expiresAt: number } | null = null;

app.get("/api/rates", async (_req, res) => {
  if (ratesCache && ratesCache.expiresAt > Date.now()) {
    res.json({ rates: ratesCache.rates, updatedAt: ratesCache.updatedAt, source: "exchange-rate-api" });
    return;
  }

  const fallbackRates = [
    { code: "SAR", name: "সৌদি রিয়াল", country: "সৌদি আরব", flag: "🇸🇦", symbol: "SR", rateToBdt: 32.10, bankRate: 32.05, change24h: 0, govtIncentivePercent: 2.5 },
    { code: "AED", name: "ইউএই দিরহাম", country: "সংযুক্ত আরব আমিরাত", flag: "🇦🇪", symbol: "AED", rateToBdt: 32.80, bankRate: 32.72, change24h: 0, govtIncentivePercent: 2.5 },
    { code: "QAR", name: "কাতারি রিয়াল", country: "কাতার", flag: "🇶🇦", symbol: "QR", rateToBdt: 33.15, bankRate: 33.05, change24h: 0, govtIncentivePercent: 2.5 },
    { code: "KWD", name: "কুয়েতি দিনার", country: "কুয়েত", flag: "🇰🇼", symbol: "KD", rateToBdt: 393.50, bankRate: 392.80, change24h: 0, govtIncentivePercent: 2.5 },
    { code: "OMR", name: "ওমানি রিয়াল", country: "ওমান", flag: "🇴🇲", symbol: "OMR", rateToBdt: 312.80, bankRate: 312.10, change24h: 0, govtIncentivePercent: 2.5 },
    { code: "MYR", name: "মালয়েশিয়ান রিঙ্গিত", country: "মালয়েশিয়া", flag: "🇲🇾", symbol: "RM", rateToBdt: 27.50, bankRate: 27.42, change24h: 0, govtIncentivePercent: 2.5 },
    { code: "SGD", name: "সিঙ্গাপুর ডলার", country: "সিঙ্গাপুর", flag: "🇸🇬", symbol: "S$", rateToBdt: 90.40, bankRate: 90.15, change24h: 0, govtIncentivePercent: 2.5 },
    { code: "USD", name: "ইউএস ডলার", country: "যুক্তরাষ্ট্র", flag: "🇺🇸", symbol: "$", rateToBdt: 120.80, bankRate: 120.40, change24h: 0, govtIncentivePercent: 2.5 },
  ];

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/BDT", { signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`Exchange provider returned ${response.status}`);
    const data = await response.json() as ExchangeRateResponse;
    if (!data.rates) throw new Error("Exchange provider returned no rates");
    const rates = fallbackRates.map((rate) => {
      const bdtPerUnit = data.rates?.[rate.code] ? 1 / data.rates[rate.code] : rate.rateToBdt;
      return { ...rate, rateToBdt: Number(bdtPerUnit.toFixed(2)), bankRate: Number((bdtPerUnit * 0.998).toFixed(2)) };
    });
    const updatedAt = new Date().toISOString();
    ratesCache = { rates, updatedAt, expiresAt: Date.now() + RATE_CACHE_MS };
    res.json({ rates, updatedAt, source: "exchange-rate-api" });
  } catch (error) {
    console.warn("Live rate fetch failed; returning fallback rates:", error);
    res.json({ rates: fallbackRates, updatedAt: new Date().toISOString(), isFallback: true, source: "fallback" });
  }
});

// AI Chat endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== "string" || message.trim().length > 2000) {
    res.status(400).json({ error: "A message of up to 2000 characters is required" });
    return;
  }

  const ai = getGeminiClient();

  if (!ai) {
    // Graceful fallback response when API key is not yet set
    const fallbackAnswer = generateFallbackReply(message);
    res.json({ reply: fallbackAnswer, isFallback: true });
    return;
  }

  try {
    const formattedHistory = Array.isArray(history)
      ? history.slice(-6).map((item: { role: string; content: string }) => ({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.content }],
        }))
      : [];

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: message }] },
    ];

    // Primary model: gemini-3.6-flash, with fallback to gemini-3.5-flash-lite
    let replyText = "";
    const candidateModels = ["gemini-3.6-flash", "gemini-3.5-flash-lite"];

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: PROBASHI_SYSTEM_PROMPT,
            temperature: 0.7,
          },
        });
        if (response.text) {
          replyText = response.text;
          break;
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.warn(`Model ${modelName} call issue, trying fallback:`, errorMessage);
      }
    }

    if (!replyText) {
      replyText = generateFallbackReply(message);
    }

    res.json({ reply: replyText });
  } catch (error) {
    console.error("Chat handling error:", error);
    // Smooth fallback if all API calls or parsing fail
    const fallback = generateFallbackReply(message);
    res.json({
      reply: fallback,
      isFallback: true,
    });
  }
});

// Rule-based fallback for immediate testing without API key
function generateFallbackReply(msg: string): string {
  const lower = msg.toLowerCase();

  if (lower.includes("tabby") || lower.includes("tamara") || lower.includes("ট্যাবি") || lower.includes("তামারা") || lower.includes("কিস্তি") || lower.includes("installment")) {
    return `💳 **Tabby ও Tamara দিয়ে ৪ মাসের সহজ কিস্তিতে টিকিট কাটার নিয়ম:**\n\n- **০% সুদ ও অতিরিক্ত ফি ছাড়া:** সৌদি আরব ও ইউএই-তে প্রবাসীরা বিমানের টিকিট এবং কেনাকাটার বিল একবারে পরিশোধ না করে **৪টি সহজ মাসিক কিস্তিতে** ভাগ করে দিতে পারেন।\n- **পেমেন্ট নিয়ম:** টিকিট কাটার দিন মাত্র ২৫% (প্রথম কিস্তি) আপনার MADA এটিএম কার্ড দিয়ে পরিশোধ করতে হবে। বাকি ৭৫% পরবর্তী ৩ মাসের বেতনের সাথে সমান কিস্তিতে স্বয়ংক্রিয়ভাবে কাটা হবে।\n- **কী কী লাগবে:** সৌদি বৈধ আকামা (Iqama), সৌদি মোবাইল নম্বর এবং যে কোনো ব্যাংকের MADA ডেবিট কার্ড।\n- **সহায়তা:** Tabby বা Tamara দিয়ে টিকিট কাটতে কোনো সমস্যা হলে সরাসরি আমাদের WhatsApp: **+966505762139** এ মেসেজ দিন, আমরা বুকিংয়ে সাহায্য করব।`;
  }

  if (lower.includes("ticket") || lower.includes("টিকিট") || lower.includes("বিমান") || lower.includes("flight") || lower.includes("ভাড়া")) {
    return `✈️ **প্রবাসী হাব বিমান টিকিট তথ্য:**\n\n- **সরাসরি বুকিং সুবিধা:** সাধারণ ট্রাভেল এজেন্সির ৩,০০০ থেকে ৮,০০০ টাকা অতিরিক্ত সার্ভিস চার্জ ছাড়াই আপনি আমাদের সাইট থেকে সরাসরি সেরা এয়ারলাইন্সের টিকিট কাটতে পারেন।\n- **কিস্তি সুবিধা (Tabby & Tamara):** একবারে পুরো টাকা না দিয়ে ০% সুদে ৪ মাসের কিস্তিতেও টিকিট কাটার সুযোগ রয়েছে।\n- **লাগেজ সুবিধা:** সৌদি আরব ও মধ্যপ্রাচ্যের ফ্লাইটে সাধারণত **৪৬ কেজি (২টি ২৩ কেজি ব্যাগ)** + ৭ কেজি হ্যান্ডব্যাগ ও ৫ লিটার ফ্রি জমজম পানির সুবিধা থাকে।\n- **বুকিং সহায়তা:** নির্দিষ্ট তারিখের টিকেটের দাম জানতে ও কনফার্ম করতে আমাদের অফিসিয়াল WhatsApp নম্বরে যোগাযোগ করুন: **+966505762139**।`;
  }

  if (lower.includes("astaa") || lower.includes("শপিং") || lower.includes("বাজার") || lower.includes("দোকান") || lower.includes("তেল") || lower.includes("ঘি") || lower.includes("কেনাকাটা")) {
    return `🛒 **astaa.store প্রবাসী শপিং সেবা:**\n\n- আপনি প্রবাসে থেকেই দেশের বাড়িতে মা-বাবা ও পরিবারের জন্য খাঁটি ঘানিভাঙ্গা সরিষার তেল, সুন্দরবনের প্রাকৃতিক মধু, গাওয়া ঘি, শুকনো খাবার বা গ্যাজেট সরাসরি পাঠাতে পারেন।\n- বাংলাদেশের ৬৪ জেলাতেই হোম ডেলিভারির সুবিধা রয়েছে।\n- পণ্য দেখতে আমাদের মেনু থেকে **'পরিবারের জন্য কেনাকাটা'** ট্যাবে ক্লিক করুন অথবা WhatsApp এ যোগাযোগ করুন।`;
  }

  if (lower.includes("টাকা") || lower.includes("রেট") || lower.includes("কারেন্সি") || lower.includes("রিয়াল") || lower.includes("দিরহাম") || lower.includes("প্রণোদনা")) {
    return `💰 **লাইভ কারেন্সি ও রেমিট্যান্স তথ্য:**\n\n- বৈধ ব্যাংকিং চ্যানেল ও অনুমোদিত রেমিট্যান্সের মাধ্যমে দেশে টাকা পাঠালে সরকার **২.৫% নগদ প্রণোদনা** প্রদান করে।\n- লাইভ এক্সচেঞ্জ রেট এবং আপনার টাকার বিপরীতে মোট কত পাবেন তা জানতে আমাদের সাইটের **'মুদ্রা ও রেমিট্যান্স'** ক্যালকুলেটর ব্যবহার করুন।`;
  }

  if (lower.includes("ডাক্তার") || lower.includes("doctor") || lower.includes("হাসপাতাল") || lower.includes("hospital") || lower.includes("চিকিৎসা") || lower.includes("অ্যাম্বুলেন্স") || lower.includes("ambulance") || lower.includes("অ্যাপয়েন্টমেন্ট") || lower.includes("appointment") || lower.includes("রোগী")) {
    return `🩺 **সৌদি আরব থেকে দেশে পরিবারের জন্য ডাক্তার ও জরুরি চিকিৎসা সেবা:**\n\n- **বিশেষজ্ঞ ডাক্তার অ্যাপয়েন্টমেন্ট:** স্কয়ার, এভারকেয়ার, ইউনাইটেড, পপুলার, ল্যাবএইড ও পিজি হাসপাতালের শীর্ষ প্রফেসর ও কনসালট্যান্টদের সিরিয়াল সৌদি আরবে বসেই বুক করতে পারবেন।\n- **৩-পক্ষীয় ভিডিও কল:** আপনি সৌদি থেকে, দেশে আপনার পিতা-মাতা এবং অভিজ্ঞ চিকিৎসক একসাথে ভিডিও কলে রিপোর্ট দেখে চিকিৎসা নিতে পারবেন।\n- **জরুরি অ্যাম্বুলেন্স:** ৬৪ জেলায় এসি ও লাইফ সাপোর্ট আইসিইউ (ICU) অ্যাম্বুলেন্স সেবা।\n- **সৌদি থেকে পেমেন্ট:** আল-রাজি, এসএনবি বা যেকোনো ব্যাংকের **MADA কার্ড / STC Pay / Tamara কিস্তিতে** সরাসরি রিয়ালে বিল পরিশোধের সুবিধা।\n- **তাৎক্ষণিক বুকিং:** বিস্তারিত জানাতে বা সরাসরি বুক করতে আমাদের মেডিকেল হেল্পডেস্কে WhatsApp করুন: **+966505762139**।`;
  }

  if (lower.includes("আকামা") || lower.includes("খুরুজ") || lower.includes("ভিসা") || lower.includes("iqama") || lower.includes("কিওয়া") || lower.includes("qiwa") || lower.includes("absher") || lower.includes("muqeem") || lower.includes("নাজিজ") || lower.includes("najiz") || lower.includes("sehhaty") || lower.includes("হুরুব") || lower.includes("huroob") || lower.includes("কাফালা") || lower.includes("transfer")) {
    return `📋 **সৌদি সরকারি সেবা ও স্ট্যাটাস:**\n\n- **Absher:** আকামা, এক্সিট/রি-এন্ট্রি ও ব্যক্তিগত সরকারি সেবার স্ট্যাটাস দেখুন।\n- **Qiwa:** চাকরি, কন্ট্রাক্ট ও কর্মী ট্রান্সফার-সংক্রান্ত অনুরোধের জন্য ব্যবহার করুন। **Muqeem** ভিসা/বাসিন্দা তথ্য যাচাইয়ে এবং **Najiz** বিচারবিষয়ক সেবায় ব্যবহৃত হয়।\n- **Sehhaty:** স্বাস্থ্যসেবা ও অ্যাপয়েন্টমেন্টের সরকারি অ্যাপ।\n- হুরুব, আকামা, ট্রান্সফার বা কাফালা বিষয়ে নিয়ম ও যোগ্যতা পরিবর্তিত হতে পারে—নিজের Absher/Qiwa অ্যাকাউন্ট, নিয়োগকর্তা বা অনুমোদিত পরামর্শক থেকে বর্তমান অবস্থা যাচাই করুন। জরুরি প্রবাসী সহায়তায় **১৬১৩৫**।`;
  }

  if (lower.includes("গাড়ি") || lower.includes("কার") || lower.includes("এয়ারপোর্ট") || lower.includes("হোটেল")) {
    return `🚗 **বিমানবন্দর কার রেন্টাল সেবা:**\n\n- ঢাকা হযরত শাহজালাল বা চট্টগ্রাম শাহ আমানত বিমানবন্দরে নেমে রাতে নিরাপদে সপরিবারে বাড়ি যাওয়ার জন্য আমাদের সাইট থেকে ভেরিফায়েড এসি প্রাইভেটকার বা হায়েস মাইক্রোবাস বুক করতে পারেন।\n- সরাসরি বুকিংয়ের জন্য আমাদের WhatsApp **+966505762139** এ ফ্লাইটের সময় জানিয়ে রাখুন।`;
  }

  if (lower.includes("embassy") || lower.includes("দূতাবাস") || lower.includes("কনস্যুলেট") || lower.includes("জরুরি") || lower.includes("emergency")) {
    return `🚨 **জরুরি প্রবাসী সহায়তা:**\n\n- বাংলাদেশ সরকারের প্রবাসী কল্যাণ হেল্পলাইন: **১৬১৩৫**।\n- রিয়াদে বাংলাদেশ দূতাবাস বা জেদ্দায় বাংলাদেশ কনস্যুলেটের অফিসিয়াল যোগাযোগ মাধ্যম ব্যবহার করুন।\n- জীবন-ঝুঁকির জরুরি অবস্থায় স্থানীয় সৌদি জরুরি সেবায় অবিলম্বে যোগাযোগ করুন। এই চ্যাট জরুরি সেবা নয়।`;
  }

  return `আসসালামু আলাইকুম! আমি **প্রবাসী এআই সহকারী**। 🇧🇩\n\nআমি আপনাকে নিম্নোক্ত বিষয়ে সাহায্য করতে পারি:\n1. ✈️ **সস্তা বিমান টিকিট, ৪৬ কেজি লাগেজ ও Tabby/Tamara কিস্তি**\n2. 🩺 **সৌদি থেকে দেশে পরিবারের জন্য ডাক্তার অ্যাপয়েন্টমেন্ট ও জরুরি অ্যাম্বুলেন্স**\n3. 🛒 **astaa.store থেকে দেশের বাড়িতে বাজার ও উপহার পাঠানো**\n4. 💱 **মুদ্রার লাইভ রেট ও ২.৫% সরকারি প্রণোদনা হিসাব**\n5. 📋 **আকামা, খুরুজ আওদা ও দূতাবাস হেল্পলাইন (১৬১৩৫)**\n6. 🚗 **এয়ারপোর্ট থেকে বাড়ি যাওয়ার নিরাপদ গাড়ি বুকিং**\n\nযেকোনো বিষয়ে জানতে নিচে আপনার প্রশ্নটি লিখুন, অথবা সরাসরি আমাদের WhatsApp এ নক দিন: **+966505762139**`;
}

// Vite middleware in dev mode, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
