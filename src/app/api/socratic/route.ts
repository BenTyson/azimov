import { NextRequest, NextResponse } from 'next/server';
import { generateSocraticQuestions, SocraticRequest } from '@/lib/ai/socratic';

export async function POST(request: NextRequest) {
  try {
    const body: SocraticRequest = await request.json();

    if (!body.content || body.content.trim().length < 20) {
      return NextResponse.json(
        { error: 'Content must be at least 20 characters' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'AI features not configured. Add ANTHROPIC_API_KEY to enable.' },
        { status: 503 }
      );
    }

    const response = await generateSocraticQuestions(body, apiKey);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Socratic API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate questions' },
      { status: 500 }
    );
  }
}
