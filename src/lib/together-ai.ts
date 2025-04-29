import { convertCssToTailwind as convertWithRules } from './converter';

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
const API_URL = 'https://api.together.xyz/inference';

async function convertWithAI(css: string): Promise<string> {
  if (!TOGETHER_API_KEY) {
    throw new Error('Together AI API key is not configured');
  }

  try {
    const prompt = `Convert this CSS to Tailwind CSS classes. Only return the Tailwind classes, no explanation:

${css}`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'codellama/CodeLlama-34b-instruct',
        prompt,
        temperature: 0.1,
        max_tokens: 512,
        stop: ['\n\n'],
      }),
    });

    if (!response.ok) {
      throw new Error('AI conversion failed');
    }

    const data = await response.json();
    return data.output.choices[0].text.trim();
  } catch (error) {
    console.error('AI conversion error:', error);
    return '';
  }
}

export async function convertCssToTailwind(css: string): Promise<string> {
  // First try rule-based conversion
  const ruleBasedResult = await convertWithRules(css);
  
  // If rule-based conversion failed or produced no results, try AI
  if (!ruleBasedResult || ruleBasedResult.includes('Error:')) {
    const aiResult = await convertWithAI(css);
    if (aiResult) {
      return `className="${aiResult}"`;
    }
  }
  
  return ruleBasedResult;
}