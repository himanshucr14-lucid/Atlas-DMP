import { NextResponse } from 'next/server';
import { AIEngine } from '@/lib/engine/AIEngine';
import { rateLimit } from '@/lib/utils/rateLimit';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    // 1. Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // 2. Parse payload
    const body = await request.json();
    const { urlOrId } = body;

    if (!urlOrId || typeof urlOrId !== 'string' || urlOrId.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid App URL, Package Name, or App Store ID is required.' },
        { status: 400 }
      );
    }

    const cleanedUrl = urlOrId.trim();

    // 3. Run Analysis Pipeline (Fresh every time)
    const engine = new AIEngine();
    const result = await engine.runAnalysis(cleanedUrl);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Analyze Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during campaign intelligence compilation.' },
      { status: 500 }
    );
  }
}
