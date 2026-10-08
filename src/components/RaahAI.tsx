import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Bot, Send, X, Sparkles, Mic, Paperclip, 
  RotateCcw, ArrowRight, User, BookOpen, 
  Code, Award, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { RaahLogoMark } from './RaahLogo';

interface RaahAIProps {
  onNavigate: (page: string, params?: any) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const RaahAI: React.FC<RaahAIProps> = ({ onNavigate, isOpen: propIsOpen, onClose: propOnClose }) => {
  const { user, aiChatHistory, addAIMessage, clearAIChat } = useAuth();
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interviewMode, setInterviewMode] = useState(false);
  const [interviewStep, setInterviewStep] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, aiChatHistory, isTyping]);

  const toggleOpen = () => {
    if (propOnClose && isOpen) {
      propOnClose();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  const quickChips = [
    { label: '🎯 What should I learn next?', prompt: 'What should I learn next based on my profile?' },
    { label: '📅 Today\'s study plan', prompt: 'Create a 2 hour study plan for me today' },
    { label: '📊 Analyze my skills', prompt: 'Analyze my skills and tell me where my gaps are' },
    { label: '💻 Help me with code', prompt: 'Give me guidance on Two Sum and time complexity' },
    { label: '📚 Explain SQL JOINs', prompt: 'Explain SQL JOIN in simple words with examples' },
    { label: '🚀 Recommend a project', prompt: 'Suggest a project based on my skills' },
    { label: '🎤 Mock Interview', prompt: 'Start a mock interview for Data Science' },
    { label: '💼 Placement Guidance', prompt: 'What should I prepare for 3rd/4th year campus placements?' },
  ];

  // Smart local personalized response generator
  const generatePersonalizedResponse = (query: string): { 
    text: string; 
    actionButtons?: { label: string; action: string; payload?: string }[] 
  } => {
    const q = query.toLowerCase();
    const name = user.fullName || 'Student';
    const career = user.targetCareer || 'Data Scientist';
    const readiness = user.careerReadinessScore || 68;
    const studyTime = user.dailyStudyTime || '2 hours';

    // Hinglish detection
    const isHinglish = 
      q.includes('samajh') || q.includes('nahi') || q.includes('kaha') || 
      q.includes('kaise') || q.includes('banna') || q.includes('mujhe') || 
      q.includes('batao') || q.includes('padhu');

    if (isHinglish) {
      if (q.includes('sql')) {
        return {
          text: `Namaste ${name}! 🌟 Fret mat karo, SQL bohot logical aur visual language hai.\n\nAbhi tumhara SQL score **44%** hai. Data Scientist banne ke liye SQL query writing daily kaam aati hai.\n\n**Best roadmap to master SQL:**\n1. **SELECT & WHERE**: Rows ko filter karna seekho (20 mins)\n2. **GROUP BY & HAVING**: Aggregate functions jaise COUNT, AVG, SUM (25 mins)\n3. **JOINs (INNER, LEFT, RIGHT)**: Do alag tables ko common keys se connect karna (30 mins)\n4. **Window Functions**: ROW_NUMBER(), RANK(), DENSE_RANK() (40 mins)\n\nMai recommend karta hoon ki pehle hamare "SQL Fundamentals" video module se start karo!`,
          actionButtons: [
            { label: '▶ Start SQL Course', action: 'course', payload: 'course-dbms-sql' },
            { label: '✍ Take SQL Quiz', action: 'quiz', payload: 'quiz-sql-dbms' }
          ]
        };
      }
      return {
        text: `Namaste ${name}! 🚀 Main tumhara personal 4-year CSE career mentor hoon.\n\nTumhara target career **${career}** hai aur abhi Career Readiness Score **${readiness}%** hai. Python tumhari strength hai, par SQL aur ML fundamentals improve karne honge.\n\nBatao aaj kisme help chahiye? Concept explanation, study plan, ya coding help?`,
        actionButtons: [
          { label: '📅 Aaj Ka Study Plan', action: 'study_plan' },
          { label: '🗺 Open Roadmap', action: 'roadmap' }
        ]
      };
    }

    // Interview mode
    if (q.includes('mock interview') || q.includes('interview')) {
      setInterviewMode(true);
      setInterviewStep(1);
      return {
        text: `🎯 **Starting Technical Mock Interview: ${career}**\n\nWelcome ${name}! I'll ask you real questions asked by top tech companies. Answer as you would in an interview.\n\n**Question 1:**\n"Can you explain the difference between Supervised and Unsupervised Learning, and give an example of where you would use each?"`,
        actionButtons: [
          { label: '💡 Need a Hint', action: 'hint' },
          { label: '🛑 Exit Interview', action: 'exit_interview' }
        ]
      };
    }

    // Study plan
    if (q.includes('study plan') || q.includes('today') || q.includes('schedule') || q.includes('2 hour')) {
      return {
        text: `Based on your current profile, your strongest skill is **Python (${user.skills.find(s=>s.name==='Python')?.score || 82}%)**.\n\nYour prime growth areas are **SQL (44%)** and **Machine Learning (31%)**.\n\nSince you have **${studyTime}** available today, here is your customized plan:\n\n• **SQL JOINs & Aggregations** (35 mins) — Chapter 1 in DBMS\n• **Linear Regression Intuition** (35 mins) — Chapter 3 in Machine Learning\n• **Solve 1 Coding Problem** (30 mins) — Two Sum / Array hashing\n• **Quick Assessment Quiz** (20 mins) — SQL Queries Quiz\n\nCompleting this plan will push your Career Readiness score by **+4%**!`,
        actionButtons: [
          { label: '▶ Continue ML Video', action: 'course', payload: 'course-ml' },
          { label: '💻 Practice Coding', action: 'coding', payload: 'prob-two-sum' },
          { label: '✍ Take Quiz', action: 'quiz', payload: 'quiz-sql-dbms' }
        ]
      };
    }

    // What to learn next
    if (q.includes('what should i learn next') || q.includes('next topic') || q.includes('learn next') || q.includes('next skill')) {
      return {
        text: `🎯 **Personalized Recommendation for ${name}:**\n\n**Recommended Topic:** **SQL Query Optimization & Normalization**\n\n**Why are we recommending this?**\n"Your current SQL assessment score is **44%**, while your target **${career}** role requires strong relational data wrangling. Mastering JOINs and Window functions is the fastest lever to elevate your readiness from ${readiness}% to 75%+."\n\nAfter SQL, proceed immediately to **Feature Engineering** in Machine Learning!`,
        actionButtons: [
          { label: '📚 Open DBMS Course', action: 'course', payload: 'course-dbms-sql' },
          { label: '🗺 View 4-Year Roadmap', action: 'roadmap' }
        ]
      };
    }

    // Skills analysis
    if (q.includes('analyze') || q.includes('weak') || q.includes('skill') || q.includes('gap')) {
      return {
        text: `📊 **Skill Assessment & Gap Analysis for ${name}**\n\nTarget Goal: **${career}** | Overall Readiness: **${readiness}%**\n\n✅ **YOUR KEY STRENGTHS:**\n• Python (82%) — Excellent syntax & collections proficiency\n• DBMS Fundamentals (70%) — Good relational understanding\n• Git & GitHub (75%) — Good version control awareness\n\n⚠️ **CRITICAL SKILL GAPS:**\n• Machine Learning (31%) — Needs regression & classification depth\n• SQL Advanced (44%) — Needs window functions and complex joins\n• Statistics & Probability (51%) — Hypothesis testing & distributions\n\n**Immediate Milestone:** Complete the *Customer Churn Prediction* capstone project to practice both SQL and ML simultaneously!`,
        actionButtons: [
          { label: '🚀 View Project Guide', action: 'project', payload: 'proj-customer-churn' },
          { label: '📈 View Detailed Skills Page', action: 'skills' }
        ]
      };
    }

    // Explain Python Functions
    if (q.includes('python function') || q.includes('function')) {
      return {
        text: `### 🐍 Python Functions Explained in Simple Words\n\nThink of a **function** like a **kitchen blender**:\n1. **Input (Arguments):** You put in fruits and milk.\n2. **Processing:** The blender chops and mixes them according to predefined rules.\n3. **Output (Return value):** You get a delicious smoothie.\n\n\`\`\`python\ndef calculate_roi(investment: float, returns: float) -> float:\n    \"\"\"Calculates Return on Investment percentage.\"\"\"\n    gain = returns - investment\n    roi_percentage = (gain / investment) * 100\n    return round(roi_percentage, 2)\n\n# Calling the function:\nprofit_pct = calculate_roi(1000, 1450)\nprint(f"ROI: {profit_pct}%")  # Outputs: ROI: 45.0%\n\`\`\`\n\n**Why use functions?**\n• **Reusability:** Write once, use 1,000 times.\n• **Modularity:** Breaks complex software into bite-sized, testable logic blocks.`,
        actionButtons: [
          { label: '▶ Open Python Course', action: 'course', payload: 'course-python' },
          { label: '💻 Practice in Code Editor', action: 'coding', payload: 'prob-two-sum' }
        ]
      };
    }

    // Difference between AI and ML
    if (q.includes('difference between ai and ml') || q.includes('ai vs ml')) {
      return {
        text: `### 🤖 Difference Between AI and Machine Learning (ML)\n\nHere is the cleanest visual hierarchy:\n\n**1. Artificial Intelligence (The Broad Vision):**\nThe broad science of creating machines capable of mimicking human intelligence, reasoning, problem solving, and decision-making.\n*Examples: Chess engines (Stockfish), Siri, autonomous self-driving cars, robotics.*\n\n**2. Machine Learning (The Core Engine):**\nA specific subset of AI where systems automatically learn patterns from historical datasets rather than following hardcoded if-else rules.\n*Examples: Recommendation systems on Netflix, spam filters in Gmail, fraud detectors.*\n\n**3. Deep Learning (The Neural Frontier):**\nA subset of ML based on artificial neural networks with multiple layers inspired by the human brain (used in ChatGPT, Midjourney, FaceID).\n\n💡 **Analogy:** AI is the universe; Machine Learning is our solar system; Deep Learning is planet Earth!`,
        actionButtons: [
          { label: '▶ Explore Machine Learning Course', action: 'course', payload: 'course-ml' }
        ]
      };
    }

    // Project recommendations
    if (q.includes('project') || q.includes('suggest a project')) {
      return {
        text: `🚀 **Top Project Recommended for Your Profile:**\n\n**Project: Customer Churn Prediction & Retention Engine**\n• **Difficulty:** Intermediate\n• **Tech Stack:** Python, Pandas, XGBoost, Scikit-Learn, FastAPI\n• **Why it's perfect for you:**\nIt addresses your two primary skill gaps (**SQL** and **Machine Learning**) while leveraging your strength in **Python (82%)**.\n\nRecruiters love this project because it solves an actual business profit problem, not just an academic toy problem!`,
        actionButtons: [
          { label: '🚀 Open Step-by-Step Guide', action: 'project', payload: 'proj-customer-churn' },
          { label: '📂 View All Projects', action: 'projects' }
        ]
      };
    }

    // Default intelligent mentor response
    return {
      text: `Hello ${name}! ✨ As your career mentor for **${career}**, I'm tracking your roadmap progress in **${user.currentYear} (${user.currentSemester})**.\n\nYour current readiness score is **${readiness}%**.\n\nTo move closer to your placement goals, I recommend balancing:\n1. 40 minutes of concept theory (Video courses)\n2. 30 minutes of hands-on coding (DSA / Algorithms)\n3. 1 capstone project milestone every week\n\nWhat would you like to dive into right now?`,
      actionButtons: [
        { label: '🗺 My 4-Year Roadmap', action: 'roadmap' },
        { label: '💻 Practice Coding', action: 'coding', payload: 'prob-two-sum' },
        { label: '📚 Continue Video Course', action: 'course', payload: 'course-ml' }
      ]
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    // Add user message
    addAIMessage({
      sender: 'user',
      text,
    });
    setInputMessage('');
    setIsTyping(true);

    try {
      // Check if server endpoint is available
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userProfile: user,
          mode: interviewMode ? 'interview' : 'mentor',
        }),
      });

      const data = await response.json();

      if (data && data.reply && !data.useClientFallback) {
        addAIMessage({
          sender: 'assistant',
          text: data.reply,
          actionButtons: [
            { label: '🗺 Open Roadmap', action: 'roadmap' },
            { label: '💻 Coding Practice', action: 'coding', payload: 'prob-two-sum' },
            { label: '🚀 Projects', action: 'projects' }
          ]
        });
      } else {
        // Use smart domain mentor generator
        const localResp = generatePersonalizedResponse(text);
        addAIMessage({
          sender: 'assistant',
          text: localResp.text,
          actionButtons: localResp.actionButtons,
        });
      }
    } catch {
      // Fallback
      const localResp = generatePersonalizedResponse(text);
      addAIMessage({
        sender: 'assistant',
        text: localResp.text,
        actionButtons: localResp.actionButtons,
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: string, payload?: string) => {
    if (action === 'roadmap') onNavigate('roadmap');
    else if (action === 'course') onNavigate('course', payload || 'course-ml');
    else if (action === 'quiz') onNavigate('quiz', payload || 'quiz-sql-dbms');
    else if (action === 'coding') onNavigate('coding', payload || 'prob-two-sum');
    else if (action === 'project') onNavigate('project', payload || 'proj-customer-churn');
    else if (action === 'projects') onNavigate('projects');
    else if (action === 'skills') onNavigate('skills');
    else if (action === 'study_plan') handleSendMessage('Create a 2 hour study plan for me today');
    else if (action === 'skill_analysis') handleSendMessage('Analyze my skills and tell me where my gaps are');
    else if (action === 'mock_interview') handleSendMessage('Start a mock interview for Data Science');
    else if (action === 'exit_interview') {
      setInterviewMode(false);
      addAIMessage({ sender: 'assistant', text: 'Mock interview paused. You can return to normal mentoring anytime!' });
    }
  };

  return (
    <>
      {/* Floating RAAH AI Button in Bottom-Right Corner */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#18233C] text-white rounded-full shadow-2xl hover:bg-[#233355] transition-all transform hover:scale-105 active:scale-95 border-2 border-amber-400 group cursor-pointer"
        aria-label="Open RAAH AI Career Mentor"
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400"></span>
        </span>
        <div className="w-6 h-6 flex items-center justify-center">
          <RaahLogoMark size={24} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-black tracking-wider text-amber-300">RAAH AI</span>
          <span className="text-[10px] text-slate-300 font-medium leading-none hidden sm:inline">Career Mentor</span>
        </div>
      </button>

      {/* Slide-out / Drawer Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[460px] sm:h-[650px] z-50 flex flex-col bg-white sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-[#18233C] text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-400/20 rounded-lg border border-amber-400/40">
                <RaahLogoMark size={28} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-wide text-white">RAAH AI</h3>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-medium border border-amber-400/30">
                    B.Tech Mentor
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Target: <strong className="text-amber-300">{user.targetCareer}</strong> ({user.careerReadinessScore}% Ready)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearAIChat}
                title="Clear conversation"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleOpen}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Student Profile Quick Banner */}
          <div className="bg-amber-50/80 border-b border-amber-100 px-4 py-2 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-medium">
              <span>👤 {user.fullName}</span>
              <span className="text-amber-500">•</span>
              <span>{user.currentYear}</span>
            </div>
            <div className="text-[11px] font-semibold text-amber-700">
              🔥 {user.learningStreak} Day Streak
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 text-sm">
            {aiChatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#18233C] text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-3.5 rounded-2xl shadow-xs whitespace-pre-line text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#18233C] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Action buttons returned by AI */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.actionButtons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(btn.action, btn.payload)}
                          className="text-xs bg-white text-[#18233C] hover:bg-amber-50 hover:text-amber-700 border border-slate-300 hover:border-amber-400 font-semibold px-2.5 py-1 rounded-full shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <span>{btn.label}</span>
                          <ChevronRight className="w-3 h-3 text-amber-500" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-600 mt-1 block px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5 overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-3.5 h-3.5" />
                    )}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-600 text-xs pl-2">
                <div className="w-6 h-6 rounded-full bg-[#18233C] text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 animate-spin" />
                </div>
                <span>RAAH AI is analyzing your learning profile...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.prompt)}
                className="whitespace-nowrap text-[11px] bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 transition shrink-0 cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5 bg-slate-100 rounded-xl px-2.5 py-1.5 border border-slate-200 focus-within:border-amber-500 focus-within:bg-white transition"
            >
              <button
                type="button"
                onClick={() => setIsListening(!isListening)}
                className={`p-1.5 rounded-lg transition ${
                  isListening ? 'text-red-500 bg-red-100' : 'text-slate-600 hover:text-slate-700'
                }`}
                title="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={isListening ? 'Listening... Speak now' : 'Ask about your roadmap, code, projects...'}
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 focus:outline-hidden px-1"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-1.5 bg-[#18233C] hover:bg-[#27385e] disabled:opacity-40 text-amber-400 rounded-lg transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-600 mt-1.5">
              Personalized mentor for B.Tech CSE • English & Hindi / Hinglish supported
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RaahAI;
