import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY || OPENAI_KEY === "sk-REPLACE_ME") {
  console.warn("OPENAI_API_KEY is not set or is a placeholder. Set it in backend/.env.");
}

/**
 * Build a prompt for the model that requests structured output:
 * - high-level summary
 * - issues (security, performance, style)
 * - suggested code diffs (unified diff)
 * - example fixes
 */
function buildPrompt({ language, code, context }: { language: string; code: string; context?: string }) {
  return `
You are a senior software engineer and code reviewer. The user provides source code and the language. Produce a JSON response with keys:
- summary: a 1-2 sentence high-level summary of what the code does.
- issues: an array of { type: "bug"|"security"|"performance"|"style"|"readability", line?: number, message: string }
- suggestions: an array of short recommended actions, each with priority ("P0","P1","P2")
- patch: a unified-diff style suggested patch (if appropriate) or a minimal code snippet showing the fix.
- tests: 1-2 suggested unit tests (title and short description).

Respond only with valid JSON.

Language: ${language}
Context: ${context || "none"}

CODE:
\`\`\`${language}
${code}
\`\`\`
`;
}

export async function getCodeReview({ language, code, context }: { language: string; code: string; context?: string }) {
  const prompt = buildPrompt({ language, code, context });
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_KEY}`,
  };
  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful code reviewer that outputs JSON." },
      { role: "user", content: prompt }
    ],
    max_tokens: 800,
    temperature: 0.0
  };

  const resp = await axios.post(url, body, { headers });
  const text = resp.data?.choices?.[0]?.message?.content;
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (e) {
    return { raw: text };
  }
}
