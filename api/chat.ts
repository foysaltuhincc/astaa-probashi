import { generateText } from 'ai';

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

  if (!process.env.AI_GATEWAY_API_KEY) {
    res.status(503).json({ error: 'AI Gateway key এখনও সেট করা হয়নি। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।' });
    return;
  }

  try {
    const history = normalizeHistory(req.body?.history);
    const prompt = history ? `${history}\nগ্রাহক: ${message}` : `গ্রাহক: ${message}`;
    const { text } = await generateText({
      model: 'google/gemini-3-flash',
      system: SYSTEM_PROMPT,
      prompt,
      temperature: 0.3,
      maxOutputTokens: 700,
    });

    res.status(200).json({ reply: text || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।' });
  } catch (error) {
    console.error('AI Gateway chat request failed:', error);
    res.status(503).json({ error: 'এখন এআই সহকারী উত্তর দিতে পারছে না। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন বা WhatsApp-এ যোগাযোগ করুন।' });
  }
}
