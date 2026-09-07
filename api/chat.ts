export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel-এর GEMINI_API_KEY চেক করা
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ 
      error: 'GEMINI_API_KEY সেট করা হয়নি। অনুগ্রহ করে Vercel Settings চেক করুন।' 
    });
  }

  const message = req.body?.message || '';
  const history = typeof normalizeHistory === 'function' ? normalizeHistory(req.body?.history) : '';
  const prompt = history ? `${history}\nগ্রাহক: ${message}` : `গ্রাহক: ${message}`;

  try {
    // সরাসরি Google Gemini 1.5 Flash API কল (কোনো থার্ড-পার্টি গেটওয়ে ছাড়া)
    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: typeof SYSTEM_PROMPT !== 'undefined' ? { parts: [{ text: SYSTEM_PROMPT }] } : undefined,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800,
          },
        }),
      }
    );

    const data = await apiResponse.json();

    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return res.status(500).json({ error: data.error.message || 'গুগল এপিআই থেকে ত্রুটি এসেছে' });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।';

    // আপনার সাইটের ফ্রন্টএন্ডে উত্তর পাঠানো
    return res.status(200).json({ reply: reply });

  } catch (error: any) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'সার্ভার সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।' });
  }
}
