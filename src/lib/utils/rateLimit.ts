const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const LIMIT = 30; // 30 requests per minute
const WINDOW = 60 * 1000; // 1 minute window

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
    rateLimitMap.set(ip, userData);
    return true;
  }

  if (userData.count >= LIMIT) {
    return false;
  }

  userData.count += 1;
  rateLimitMap.set(ip, userData);
  return true;
}
