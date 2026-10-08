import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route for RAAH AI Mentor
app.post('/api/chat', async (req, res) => {
  const { message, userProfile, chatHistory, mode } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Graceful fallback response if key is not configured in local environment
    return res.json({
      reply: null,
      useClientFallback: true,
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are "RAAH AI", the dedicated intelligent career mentor for Computer Science Engineering students on the RAAH platform ("Your Path to Career").
Student Profile:
- Name: ${userProfile?.fullName || 'Student'}
- Current Year: ${userProfile?.currentYear || '2nd Year'} (${userProfile?.currentSemester || 'Semester 4'})
- College: ${userProfile?.college || 'B.Tech CSE'}
- Target Career: ${userProfile?.targetCareer || 'Data Scientist'}
- Career Readiness: ${userProfile?.careerReadinessScore || 68}%
- Daily Study Time Available: ${userProfile?.dailyStudyTime || '2 hours'}
- Strong Skills: ${userProfile?.skills?.filter((s: any) => s.score >= 70).map((s: any) => `${s.name} (${s.score}%)`).join(', ') || 'Python (82%), DBMS (70%)'}
- Skill Gaps / Weak Skills: ${userProfile?.skills?.filter((s: any) => s.score < 60).map((s: any) => `${s.name} (${s.score}%)`).join(', ') || 'SQL (44%), Machine Learning (31%), Statistics (51%)'}
- Learning Streak: ${userProfile?.learningStreak || 7} days

Style & Guidelines:
1. Be encouraging, highly structured, practical, and mentor-like.
2. Personalize your recommendations referencing their exact target role (${userProfile?.targetCareer || 'Data Scientist'}), strengths, and skill gaps.
3. If the user writes in Hindi or Hinglish (e.g., "Mujhe SQL samajh nahi aa rahi", "Python kaha se start karu?"), reply warmly and naturally in the same language.
4. When suggesting study plans or topics, give specific time breakdowns and clear actionable steps.
5. Mode: ${mode || 'mentor'}. If mode is 'interview', ask one technical question, rate previous answers if any, and give concise actionable feedback.
6. Keep markdown formatting crisp with bullet points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question:\n${message}` }] }
      ],
    });

    const replyText = response.text || "I'm here to help guide your journey. Let's look at your roadmap!";
    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error?.message);
    return res.json({
      reply: null,
      useClientFallback: true,
    });
  }
});

// Vite middleware in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`RAAH server running on http://localhost:${PORT}`);
  });
}

startServer();
