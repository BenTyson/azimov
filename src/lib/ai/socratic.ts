/**
 * AI-powered Socratic questioning
 *
 * Uses Claude to generate thoughtful questions that help users
 * examine their thinking more deeply.
 */

export interface SocraticRequest {
  content: string;
  assumptions?: string[];
  uncertainties?: string[];
  context?: string;
}

export interface SocraticResponse {
  questions: string[];
  blindSpots?: string[];
  suggestedAssumptions?: string[];
}

const SOCRATIC_PROMPT = `You are a thoughtful Socratic questioner helping someone examine their thinking more deeply. Your goal is NOT to challenge or debate, but to help them:
1. Surface hidden assumptions they may not have noticed
2. Identify areas of uncertainty
3. Consider perspectives they may have missed
4. Deepen their understanding of their own position

Given the following journal entry, generate 2-3 thought-provoking questions that would help the author think more deeply. The questions should be:
- Genuinely curious, not leading or judgmental
- Focused on understanding, not winning an argument
- Designed to help the author, not to show how smart you are

Also identify 1-2 potential blind spots or unconsidered angles.

IMPORTANT: Be respectful and assume the author has thought carefully about their position. Your questions should open up thinking, not shut it down.`;

export async function generateSocraticQuestions(
  request: SocraticRequest,
  apiKey: string
): Promise<SocraticResponse> {
  const userMessage = `
## Journal Entry:
${request.content}

${request.assumptions?.length ? `## Stated Assumptions:\n${request.assumptions.map(a => `- ${a}`).join('\n')}` : ''}

${request.uncertainties?.length ? `## Stated Uncertainties:\n${request.uncertainties.map(u => `- ${u}`).join('\n')}` : ''}

${request.context ? `## Additional Context:\n${request.context}` : ''}

Please generate thoughtful Socratic questions to help me examine my thinking.
`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 1024,
      system: SOCRATIC_PROMPT,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API request failed: ${error}`);
  }

  const data = await response.json();
  const content = data.content[0]?.text || '';

  // Parse the response
  return parseResponse(content);
}

function parseResponse(content: string): SocraticResponse {
  const questions: string[] = [];
  const blindSpots: string[] = [];

  // Simple parsing - look for questions and blind spots
  const lines = content.split('\n').filter(line => line.trim());

  let inQuestions = false;
  let inBlindSpots = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.toLowerCase().includes('question') || trimmed.match(/^\d+\./)) {
      inQuestions = true;
      inBlindSpots = false;
    }

    if (trimmed.toLowerCase().includes('blind spot') || trimmed.toLowerCase().includes('unconsidered')) {
      inQuestions = false;
      inBlindSpots = true;
    }

    // Extract numbered items or bullet points
    const itemMatch = trimmed.match(/^(?:\d+\.|[-•*])\s*(.+)/);
    if (itemMatch) {
      const item = itemMatch[1].trim();
      if (item.endsWith('?')) {
        questions.push(item);
      } else if (inBlindSpots) {
        blindSpots.push(item);
      } else if (inQuestions && item.length > 10) {
        // Might be a question without a question mark
        questions.push(item);
      }
    }
  }

  // Fallback: if no questions found, look for any sentences ending with ?
  if (questions.length === 0) {
    const questionMatches = content.match(/[^.!?]*\?/g);
    if (questionMatches) {
      questions.push(...questionMatches.slice(0, 3).map(q => q.trim()));
    }
  }

  return {
    questions: questions.slice(0, 4),
    blindSpots: blindSpots.length > 0 ? blindSpots.slice(0, 2) : undefined,
  };
}
