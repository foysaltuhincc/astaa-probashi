import { GoogleGenAI } from '@google/genai';

type ChatMessage = {
  role?: unknown;
  content?: unknown;
};

type ChatRequest = {
  message?: unknown;
  history?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_MESSAGES = 6;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

const SYSTEM_PROMPT = `You are "প্রবাসী এআই সহকারী", the customer support assistant for প্রবাসী হাব.
Always reply in natural, polite Bengali. Give a direct answer followed by at most three practical bullets.
You can help with flight tickets, baggage rules, Tabby/Tamara installments, astaa.store shopping, remittance, airport transport, Bangladeshi healthcare bookings, and Saudi expatriate portals such as Absher, Qiwa, Muqeem, Najiz, and Sehhaty.
Do not invent current prices, ticket availability, exchange rates, legal eligibility, visa/iqama status, medical availability, or emergency response. Tell customers to confirm time-sensitive details with the relevant airline, provider, official portal, employer, embassy, or WhatsApp support.
For booking, shopping, and personal assistance, offer WhatsApp +966 50 576 2139. For urgent medical, legal, immigration, safety, or emergency matters, state that this chat is not emergency support and direct the user to the relevant official service or Bangladesh expatriate welfare helpline 16135.
Never ask for passwords, OTPs, card numbers, passport scans, or other sensitive information.`;

function getClientIp(req: { headers?: Record<string, string | string[] | undefined> }): string {
  const forwarded = req.headers?.['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(',')[0]?.trim() || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestsByIp.get(ip);

  if (!entry || entry.resetAt <= now) {
    requestsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function normalizeHistory(history: unknown): string {
  if (!Array.isArray(history)) return '';

  return history
    .slice(-MAX_HISTORY_MESSAGES)
    .filter((item): item is ChatMessage => Boolean(item) && typeof item === 'object')
    .map((item) => {
      const role = item.role === 'user' ? 'গ্রাহক' : 'সহকারী';
      const content = typeof item.content === 'string' ? item.content.trim().slice(0, MAX_MESSAGE_LENGTH) : '';
      return content ? `${role}: ${content}` : '';
    })
    .filter(Boolean)
    .join('\n');
}

// Keyword fallback — chat always answers, even without API key or when Gemini is down
function fallbackReply(msg: string): string {
  const lower = msg.toLowerCase();

  if (lower.includes('tabby') || lower.includes('tamara') || lower.includes('ট্যাবি') || lower.includes('তামারা') || lower.includes('কিস্তি') || lower.includes('installment')) {
    return `💳 **Tabby ও Tamara দিয়ে ৪ মাসের সহজ কিস্তি:**\n\n- সৌদি আরব ও ইউএই-তে **০% সুদে ৪টি মাসিক কিস্তিতে** টিকিট ও কেনাকাটা করা যায়।\n- বুকিংয়ের দিন মাত্র **২৫%** MADA কার্ডে দিন, বাকি ৭৫% পরের ৩ মাসে স্বয়ংক্রিয়ভাবে কাটবে।\n- লাগবে: বৈধ আকামা, সৌদি মোবাইল নম্বর ও MADA ডেবিট কার্ড। সহায়তায় WhatsApp: **+966505762139**।`;
  }

  if (lower.includes('ticket') || lower.includes('টিকিট') || lower.includes('বিমান') || lower.includes('flight') || lower.includes('ভাড়া')) {
    return `✈️ **বিমান টিকিট তথ্য:**\n\n- এজেন্সির ৩,০০০–৮,০০০ টাকা অতিরিক্ত চার্জ ছাড়াই সরাসরি টিকিট কাটুন।\n- Tabby/Tamara দিয়ে ০% সুদে ৪ কিস্তির সুবিধা আছে।\n- সৌদি–মধ্যপ্রাচ্য রুটে সাধারণত **৪৬ কেজি + ৭ কেজি হ্যান্ডব্যাগ + ৫ লিটার জমজম** থাকে।\n- দাম ও বুকিংয়ে WhatsApp করুন: **+966505762139**।`;
  }

  if (lower.includes('astaa') || lower.includes('শপিং') || lower.includes('বাজার') || lower.includes('তেল') || lower.includes('ঘি') || lower.includes('কেনাকাটা')) {
    return `🛒 **astaa.store প্রবাসী শপিং:**\n\n- প্রবাস থেকে দেশের বাড়িতে খাঁটি সরিষার তেল, মধু, ঘি ও গ্যাজেট পাঠান।\n- বাংলাদেশের **৬৪ জেলায়** হোম ডেলিভারি।\n- মেনু থেকে **'পরিবারের জন্য কেনাকাটা'** দেখুন অথবা WhatsApp: **+966505762139**।`;
  }

  if (lower.includes('টাকা') || lower.includes('রেট') || lower.includes('রিয়াল') || lower.includes('দিরহাম') || lower.includes('প্রণোদনা') || lower.includes('remittance')) {
    return `💰 **রেমিট্যান্স তথ্য:**\n\n- বৈধ চ্যানেলে টাকা পাঠালে সরকার **২.৫% নগদ প্রণোদনা** দেয়।\n- লাইভ রেট দেখতে সাইটের **'মুদ্রা ও রেমিট্যান্স'** ক্যালকুলেটর ব্যবহার করুন।`;
  }

  if (lower.includes('ডাক্তার') || lower.includes('doctor') || lower.includes('হাসপাতাল') || lower.includes('চিকিৎসা') || lower.includes('অ্যাম্বুলেন্স') || lower.includes('ambulance') || lower.includes('appointment')) {
    return `🩺 **দেশে পরিবারের চিকিৎসা সেবা:**\n\n- স্কয়ার, এভারকেয়ার, ইউনাইটেড, পপুলারের বিশেষজ্ঞ ডাক্তারের সিরিয়াল সৌদি থেকেই বুক করুন।\n- ৩-পক্ষীয় ভিডিও কল ও ৬৪ জেলায় অ্যাম্বুলেন্স সেবা।\n- MADA/STC Pay-এ পেমেন্ট। বুকিংয়ে WhatsApp: **+966505762139**।`;
  }

  if (lower.includes('আকামা') || lower.includes('ভিসা') || lower.includes('iqama') || lower.includes('কিওয়া') || lower.includes('qiwa') || lower.includes('absher') || lower.includes('কাফালা') || lower.includes('transfer')) {
    return `📋 **সৌদি সরকারি সেবা:**\n\n- **Absher:** আকামা ও এক্সিট/রি-এন্ট্রি স্ট্যাটাস। **Qiwa:** চাকরি ও ট্রান্সফার। **Muqeem/Najiz/Sehhaty** নিজ নিজ সেবায়।\n- নিয়ম বদলাতে পারে — নিজের অফিসিয়াল অ্যাকাউন্টে যাচাই করুন। জরুরি হেল্পলাইন: **১৬১৩৫**।`;
  }

  if (lower.includes('গাড়ি') || lower.includes('এয়ারপোর্ট') || lower.includes('airport') || lower.includes('হোটেল')) {
    return `🚗 **এয়ারপোর্ট গাড়ি সেবা:**\n\n- ঢাকা/চট্টগ্রাম বিমানবন্দর থেকে বাড়ি যেতে ভেরিফায়েড এসি গাড়ি বুক করুন।\n- ফ্লাইটের সময় জানিয়ে WhatsApp করুন: **+966505762139**।`;
  }

  if (lower.includes('umrah') || lower.includes('উমরাহ') || lower.includes('hajj') || lower.includes('হজ')) {
    return `🕋 **উমরাহ/হজ তথ্য:**\n\n- সৌদি থেকে উমরাহ: Nusuk অ্যাপে পারমিট নিয়ে মক্কা-মদিনা যান; আকামা বৈধ থাকতে হবে।\n- বাংলাদেশ থেকে হজ: শুধু সরকারি হজ প্যাকেজ/অনুমোদিত এজেন্সি দিয়ে — ভুয়া অফার থেকে সাবধান!\n- ভিসা, টিকিট ও হোটেল একসাথে লাগলে WhatsApp করুন: **+966505762139**।`;
  }

  if (lower.includes('job') || lower.includes('চাকরি') || lower.includes('salary') || lower.includes('বেতন') || lower.includes('কাজ')) {
    return `💼 **বিদেশে চাকরি ও বেতন:**\n\n- ভুয়া অফার থেকে সাবধান: আগে টাকা চাইলে ৯৯% প্রতারণা — BMET/BOESL যাচাই ছাড়া টাকা দেবেন না।\n- Qiwa-তে কন্ট্রাক্ট ও বেতন-ভাতা লেখা আছে কিনা চেক করুন।\n- নির্ভরযোগ্য পথ: BOESL, সরকারি বিজ্ঞপ্তি ও পরিচিত রেফারেন্স। পরামর্শে WhatsApp: **+966505762139**।`;
  }

  if (lower.includes('visit') || lower.includes('ভিজিট') || lower.includes('family visa') || lower.includes('ফ্যামিলি') || lower.includes('parents') || lower.includes('বাবা') || lower.includes('মা ')) {
    return `👨‍👩‍👧 **পরিবার আনা/ভিজিট ভিসা:**\n\n- সৌদিতে ফ্যামিলি ভিজিট ভিসা: Absher → ভিজিট ভিসা আবেদন → অনুমোদনের পর দেশে এমব্যাসি থেকে স্ট্যাম্পিং।\n- বাবা-মা একা এলে এয়ারপোর্ট পিকআপ + হোটেল আগেই বুক রাখুন।\n- সাহায্য লাগলে WhatsApp: **+966505762139**।`;
  }

  if (lower.includes('hotel') || lower.includes('হোটেল') || lower.includes('car') || lower.includes('গাড়ি') || lower.includes('pickup') || lower.includes('পিকআপ')) {
    return `🚗 **হোটেল ও গাড়ি:**\n\n- ঢাকা/চট্টগ্রাম এয়ারপোর্ট থেকে বাড়ি: ভেরিফায়েড এসি গাড়ি আগেই বুক করুন (ফ্লাইট নম্বর জানিয়ে রাখুন)।\n- লং লেওভারে এয়ারপোর্ট হোটেল সাশ্রয়ী।\n- বুকিংয়ে WhatsApp: **+966505762139**।`;
  }

  if (lower.includes('absher') || lower.includes('আবশের')) {
    return `📱 **Absher সেবা:**\n\n- আকামা স্ট্যাটাস, এক্সিট/রি-এন্ট্রি, ট্রাফিক ফাইন — সব Absher অ্যাপ/পোর্টালে।\n- OTP নিজের মোবাইলে আসতে হবে; কারো সাথে শেয়ার করবেন না।\n- আটকে গেলে WhatsApp-এ স্ক্রিনশটসহ জানান: **+966505762139**।`;
  }

  if (lower.includes('insurance') || lower.includes('ইনস্যুরেন্স') || lower.includes('বীমা')) {
    return `🛡️ **ইনস্যুরেন্স:**\n\n- সৌদিতে মেডিকেল ইনস্যুরেন্স (Tawuniya/Bupa) আকামা রিনিউয়ালে বাধ্যতামূলক — কোম্পানি দেয় কিনা চুক্তিতে দেখুন।\n- ট্রাভেল ইনস্যুরেন্স: টিকিটের সাথে নিলে জরুরি চিকিৎসা + ব্যাগেজ কভার পাবেন।`;
  }

  if (lower.includes('embassy') || lower.includes('দূতাবাস') || lower.includes('জরুরি') || lower.includes('emergency')) {    return `🚨 **জরুরি সহায়তা:**\n\n- প্রবাসী কল্যাণ হেল্পলাইন: **১৬১৩৫**।\n- জীবন-ঝুঁকিতে স্থানীয় জরুরি সেবায় যোগাযোগ করুন। এই চ্যাট জরুরি সেবা নয়।`;
  }

  return `আসসালামু আলাইকুম! আমি **প্রবাসী এআই সহকারী**। 🇧🇩\n\nআমি সাহায্য করতে পারি:\n1. ✈️ **সস্তা টিকিট, ৪৬ কেজি লাগেজ, Tabby/Tamara কিস্তি**\n2. 🩺 **দেশে ডাক্তার ও অ্যাম্বুলেন্স**\n3. 🛒 **astaa.store থেকে বাজার পাঠানো**\n4. 💱 **রেট ও ২.৫% প্রণোদনা**\n5. 📋 **আকামা ও দূতাবাস (১৬১৩৫)**\n\nপ্রশ্ন লিখুন অথবা WhatsApp করুন: **+966505762139**`;
}

export default async function handler(
  req: { method?: string; body?: ChatRequest; headers?: Record<string, string | string[] | undefined> },
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ error: `A message of up to ${MAX_MESSAGE_LENGTH} characters is required` });
    return;
  }

  if (isRateLimited(getClientIp(req))) {
    res.status(429).json({ error: 'অনুগ্রহ করে এক মিনিট পরে আবার চেষ্টা করুন।' });
    return;
  }

  const history = normalizeHistory(req.body?.history);
  const prompt = history ? `${history}\nগ্রাহক: ${message}` : `গ্রাহক: ${message}`;
  let diag = '';

  // 1) DeepSeek (primary) — OpenAI-compatible chat API
  if (process.env.DEEPSEEK_API_KEY) {
    try {
      const dsRes = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 700,
        }),
      });
      const dsData = await dsRes.json();
      const dsText: string | undefined = dsData?.choices?.[0]?.message?.content;
      if (dsText) {
        res.status(200).json({ reply: dsText, backend: 'deepseek' });
        return;
      }
      diag += `ds-empty:${dsRes.status};`;
      console.warn('DeepSeek empty reply, trying Gemini');
    } catch (err) {
      diag += `ds-err:${err instanceof Error ? err.message : err};`;
      console.warn('DeepSeek call failed, trying Gemini:', err instanceof Error ? err.message : err);
    }
  }

  // 2) Gemini (secondary)
  if (!process.env.GEMINI_API_KEY) {
    res.status(200).json({ reply: fallbackReply(message), isFallback: true, backend: 'fallback' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Pick live models dynamically (old names get retired) + static fallbacks
    let candidateModels: string[] = [];
    try {
      const pager = await ai.models.list();
      for await (const m of pager) {
        const acts: unknown = (m as { supportedActions?: unknown }).supportedActions;
        if (typeof m.name === 'string' && Array.isArray(acts) && acts.includes('generateContent')) {
          candidateModels.push(m.name.replace(/^models\//, ''));
          if (candidateModels.length >= 3) break;
        }
      }
    } catch (e) {
      diag += `modellist:${e instanceof Error ? e.message.slice(0, 80) : e};`;
    }
    candidateModels.push('gemini-2.0-flash', 'gemini-2.0-flash-lite');
    let replyText = '';

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.3, maxOutputTokens: 700 },
        });
        if (response.text) {
          replyText = response.text;
          break;
        }
      } catch (err) {
        const m = err instanceof Error ? err.message : String(err);
        diag += `${modelName}:${m.slice(0, 120)};`;
        console.warn(`Model ${modelName} failed, trying fallback:`, m);
      }
    }

    if (!replyText) {
      res.status(200).json({ reply: fallbackReply(message), isFallback: true, backend: 'fallback', diag: diag || 'gemini-no-text' });
      return;
    }

    res.status(200).json({ reply: replyText, backend: 'gemini' });
  } catch (error) {
    diag += `outer:${error instanceof Error ? error.message : String(error)};`;
    console.error('Gemini chat request failed:', error);
  }

  // 3) Keyword fallback — chat never goes silent
  // NOTE: free keyless AI backends (Pollinations, Duck.ai) were tested
  // Sep 2026 — both now require payment / block server calls.
  res.status(200).json({ reply: fallbackReply(message), isFallback: true, backend: 'fallback', diag: diag || 'no-keys' });
}
