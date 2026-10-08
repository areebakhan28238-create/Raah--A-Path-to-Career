import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Award, TrendingUp, CheckCircle2, AlertTriangle, 
  Sparkles, Target, ArrowRight, ArrowLeft, BarChart3, 
  Briefcase, FileText, MessagesSquare, Code, BookOpen 
} from 'lucide-react';

interface SkillsPageProps {
  onNavigate: (page: string, params?: any) => void;
  onAskAI?: (prompt: string) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({
  onNavigate,
  onAskAI,
}) => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const readinessBreakdown = [
    { title: 'Technical Skills', score: 72, icon: BookOpen, desc: 'Languages, frameworks & libraries' },
    { title: 'Coding & DSA', score: 61, icon: Code, desc: 'Problem solving on LeetCode' },
    { title: 'Projects & Capstones', score: 55, icon: Briefcase, desc: 'Deployed full-stack/ML repos' },
    { title: 'CS Fundamentals', score: 78, icon: BarChart3, desc: 'DBMS, OS, Computer Networks' },
    { title: 'Communication & Soft Skills', score: 64, icon: MessagesSquare, desc: 'Presentation & teamwork' },
    { title: 'Resume & Portfolio', score: 40, icon: FileText, desc: 'ATS compliance & GitHub proof' },
    { title: 'Interview Preparation', score: 25, icon: Award, desc: 'Mock HR & technical rounds' },
  ];

  const priorities = [
    { step: 1, title: 'Improve Machine Learning', desc: 'Complete Chapter 3 to 5 on regression, classification, and metrics.', action: 'course', payload: 'course-ml' },
    { step: 2, title: 'Complete Customer Churn Project', desc: 'Finish SMOTE imbalance handling and FastAPI microservice.', action: 'project', payload: 'proj-customer-churn' },
    { step: 3, title: 'Solve 15 DSA Problems', desc: 'Focus on Two-Pointer patterns and Tree traversals.', action: 'coding', payload: 'prob-two-sum' },
    { step: 4, title: 'Schedule AI Mock Interview', desc: 'Test technical confidence with RAAH AI.', action: 'ai', payload: 'Start a mock interview for Data Science' },
  ];

  const filteredSkills = activeCategory === 'All'
    ? user.skills
    : user.skills.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition cursor-pointer mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Career Readiness & Skill Diagnostic
            </h1>
            <span className="text-xs bg-[var(--secondary-light)] text-[var(--primary)] font-bold px-2.5 py-0.5 rounded-full border border-[var(--secondary)]/30">
              Target: {user.targetCareer}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Holistic benchmarking of technical capabilities, portfolio weight, and placement metrics.
          </p>
        </div>

        {/* Big Overall Gauge */}
        <div className="flex items-center gap-4 bg-[var(--primary)] text-white p-4 rounded-2xl border border-[var(--primary-dark)]">
          <div className="text-right">
            <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider block">
              Overall Readiness
            </span>
            <span className="text-3xl font-black text-white font-mono">
              {user.careerReadinessScore}%
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[var(--secondary)]/20 text-[var(--accent)] flex items-center justify-center font-bold">
            <Award className="w-6 h-6 text-[var(--accent)]" />
          </div>
        </div>
      </div>

      {/* Readiness Breakdown Dimensions */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Comprehensive Readiness Dimensions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {readinessBreakdown.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-2 bg-[var(--surface)] rounded-lg text-[var(--primary)] shadow-2xs border border-[var(--border-light)]">
                      <Icon className="w-4 h-4 text-[var(--secondary)]" />
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                      {item.score}%
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-[var(--text-primary)]">{item.title}</h3>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{item.desc}</p>
                </div>

                <div className="w-full h-1.5 bg-[var(--border-light)] rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full ${
                      item.score >= 70 ? 'bg-emerald-500' :
                      item.score >= 50 ? 'bg-[var(--secondary)]' : 'bg-rose-400'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Priorities List */}
      <div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white p-6 sm:p-8 rounded-2xl shadow-xs space-y-4 border border-[var(--primary-dark)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
            <h2 className="text-lg font-bold text-white">Your High-Impact Priorities</h2>
          </div>
          <span className="text-xs text-slate-300">
            Calculated by RAAH Placement AI
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {priorities.map((pri) => (
            <div
              key={pri.step}
              className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[var(--secondary)] text-[var(--primary-dark)] font-black text-xs flex items-center justify-center shrink-0">
                  {pri.step}
                </span>
                <div>
                  <h3 className="font-bold text-xs text-white">{pri.title}</h3>
                  <p className="text-[11px] text-slate-300">{pri.desc}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (pri.action === 'course') onNavigate('course', pri.payload);
                  else if (pri.action === 'project') onNavigate('projects');
                  else if (pri.action === 'coding') onNavigate('coding', pri.payload);
                  else if (pri.action === 'ai' && onAskAI) onAskAI(pri.payload);
                }}
                className="text-xs bg-[var(--secondary)] hover:brightness-110 text-[var(--primary-dark)] font-bold px-3 py-1.5 rounded-lg transition shrink-0 cursor-pointer"
              >
                Go →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Matrix & Level Badges */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-light)] pb-3">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Technical Skill Inventory</h2>
            <p className="text-xs text-[var(--text-secondary)]">Live ratings updated by course completions and quiz scores.</p>
          </div>

          <div className="flex items-center gap-1">
            {['All', 'Programming', 'Database', 'DSA', 'AI/ML'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
                  activeCategory === cat ? 'bg-[var(--primary)] text-[var(--accent)]' : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:bg-[#EFE8DD]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((sk) => (
            <div
              key={sk.name}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[var(--text-primary)]">{sk.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  sk.level === 'Mastered' ? 'bg-indigo-100 text-indigo-800' :
                  sk.level === 'Advanced' ? 'bg-emerald-100 text-emerald-800' :
                  sk.level === 'Intermediate' ? 'bg-[var(--secondary-light)] text-[var(--primary)]' :
                  'bg-slate-200 text-slate-700'
                }`}>
                  {sk.level}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
                <span>Rating</span>
                <span className="font-bold text-[var(--text-primary)]">{sk.score}%</span>
              </div>

              <div className="w-full h-2 bg-[var(--border-light)] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    sk.score >= 75 ? 'bg-emerald-500' :
                    sk.score >= 50 ? 'bg-[var(--secondary)]' : 'bg-rose-400'
                  }`}
                  style={{ width: `${sk.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
