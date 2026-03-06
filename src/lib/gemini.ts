export async function callGemini(prompt: string): Promise<string> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'API 호출 실패' }));
    throw new Error(err.error || 'Gemini API 오류');
  }

  const data = await res.json();
  return data.text;
}
