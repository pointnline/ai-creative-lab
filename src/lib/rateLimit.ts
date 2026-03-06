// 간단한 인메모리 Rate Limiter (IP 기반)
const requests = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1분
const MAX_REQUESTS = 10; // 1분당 10회

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requests.get(ip);

  // 오래된 기록 정리 (메모리 누수 방지)
  if (requests.size > 10000) {
    for (const [key, val] of requests) {
      if (now > val.resetTime) requests.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    requests.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}
