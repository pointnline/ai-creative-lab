import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    return NextResponse.json(
      { error: 'Gemini API 키가 설정되지 않았습니다. .env.local 파일을 확인하세요.' },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: '프롬프트가 필요합니다.' }, { status: 400 });
    }

    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errData);
      return NextResponse.json(
        { error: errData?.error?.message || 'Gemini API 오류' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Gemini route error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
