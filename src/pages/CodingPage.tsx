import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CODING_PROBLEMS } from '../data/mockData';
import { CodingProblem } from '../types';
import { CodeEditor } from '../components/CodeEditor';
import { 
  Code, Search, Filter, CheckCircle2, 
  Sparkles, ArrowRight, Lightbulb, Zap, HelpCircle,
  Clock, Database, Award, ArrowLeft
} from 'lucide-react';

interface CodingPageProps {
  initialProblemId?: string;
  onNavigate: (page: string, params?: any) => void;
  onAskAI?: (prompt: string) => void;
}

export const CodingPage: React.FC<CodingPageProps> = ({
  initialProblemId,
  onNavigate,
  onAskAI,
}) => {
  const { user, recordProblemSolved } = useAuth();

  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    initialProblemId || CODING_PROBLEMS[0].id
  );
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentProblem: CodingProblem =
    CODING_PROBLEMS.find((p) => p.id === selectedProblemId) || CODING_PROBLEMS[0];

  const filteredProblems = CODING_PROBLEMS.filter((p) => {
    if (filterDifficulty !== 'All' && p.difficulty !== filterDifficulty) return false;
    if (filterCategory !== 'All' && p.category !== filterCategory) return false;
    if (searchQuery.trim() && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const categories = ['All', 'Arrays', 'Stack & Queue', 'Dynamic Programming', 'SQL'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const handleNextProblem = () => {
    const nextIdx = (CODING_PROBLEMS.findIndex((p) => p.id === currentProblem.id) + 1) % CODING_PROBLEMS.length;
    setSelectedProblemId(CODING_PROBLEMS[nextIdx].id);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs flex flex-wrap items-center justify-between gap-4">
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
              Coding Practice Arena
            </h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              LeetCode Standard
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Solve problems, improve algorithms, and prepare for technical coding rounds.
          </p>
        </div>

        {/* User Coding Stats */}
        <div className="flex items-center gap-3">
          <div className="bg-[var(--surface-subtle)] border border-[var(--border)] px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">Solved</span>
            <span className="text-sm font-black text-[var(--text-primary)] font-mono">
              {user.solvedProblems.length} / {CODING_PROBLEMS.length}
            </span>
          </div>
          <div className="bg-[var(--secondary-light)]/40 border border-[var(--secondary)]/30 px-3.5 py-2 rounded-xl text-center">
            <span className="text-[10px] text-[var(--primary)] font-bold uppercase block">Coding XP</span>
            <span className="text-sm font-black text-[var(--secondary)] font-mono">
              +{user.solvedProblems.length * 50} XP
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Problem List + Right Problem Statement & Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem List & Filters (4 cols) */}
        <div className="lg:col-span-4 bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems..."
              className="w-full pl-9 pr-3 py-2 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl text-xs text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
            />
          </div>

          {/* Difficulty Filter Chips */}
          <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition cursor-pointer shrink-0 ${
                  filterDifficulty === diff
                    ? 'bg-[var(--primary)] text-[var(--accent)]'
                    : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:bg-[#EFE8DD]'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition cursor-pointer shrink-0 ${
                  filterCategory === cat
                    ? 'bg-[var(--secondary)] text-[var(--primary-dark)] font-bold'
                    : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:bg-[#EFE8DD] border border-[var(--border)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Problems List */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredProblems.map((p, idx) => {
              const isSelected = p.id === currentProblem.id;
              const isSolved = user.solvedProblems.includes(p.id);

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProblemId(p.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[var(--primary)] text-white border-[var(--primary-dark)] shadow-xs'
                      : 'bg-[var(--surface-subtle)] hover:bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                        0{idx + 1}.
                      </span>
                      <h4 className="text-xs font-bold truncate max-w-[170px]">
                        {p.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        p.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                        p.difficulty === 'Medium' ? 'bg-[var(--secondary-light)] text-[var(--primary)]' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {p.difficulty}
                      </span>
                      <span className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-[var(--text-secondary)]'}`}>
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSolved && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    <span className={`text-xs ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Problem Statement & Interactive Code Editor (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Problem Statement Card */}
          <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-light)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                    {currentProblem.title}
                  </h2>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    currentProblem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                    currentProblem.difficulty === 'Medium' ? 'bg-[var(--secondary-light)] text-[var(--primary)]' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {currentProblem.difficulty}
                  </span>
                  <span className="text-xs bg-[var(--surface-subtle)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full border border-[var(--border-light)]">
                    Acceptance: {currentProblem.acceptance}
                  </span>
                </div>
              </div>

              {/* Ask RAAH AI Toolbar */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onAskAI && onAskAI(`I need a hint for "${currentProblem.title}". What is the core data structure intuition?`)}
                  className="text-xs bg-[var(--secondary-light)]/40 hover:bg-[var(--secondary-light)] text-[var(--primary)] border border-[var(--secondary)]/30 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-[var(--secondary)]" />
                  <span>AI Hint</span>
                </button>
                <button
                  onClick={() => onAskAI && onAskAI(`What is the optimal time and space complexity solution for "${currentProblem.title}"?`)}
                  className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition hidden sm:flex"
                >
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Explain Logic</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
              {currentProblem.description}
            </div>

            {/* Examples */}
            <div className="space-y-3">
              {currentProblem.examples.map((ex, idx) => (
                <div key={idx} className="bg-[var(--surface-subtle)] p-3 rounded-xl border border-[var(--border)] text-xs font-mono">
                  <span className="text-[10px] font-sans font-bold text-[var(--text-muted)] uppercase block mb-1">
                    Example {idx + 1}:
                  </span>
                  <div>
                    <span className="text-[var(--text-muted)]">Input: </span>
                    <span className="text-[var(--text-primary)] font-semibold">{ex.input}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)]">Output: </span>
                    <span className="text-emerald-700 font-semibold">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="text-[var(--text-secondary)] font-sans text-[11px] mt-1">
                      Explanation: {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div>
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Constraints
              </span>
              <ul className="list-disc list-inside text-xs text-[var(--text-secondary)] space-y-0.5 font-mono">
                {currentProblem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real Code Editor Canvas */}
          <CodeEditor
            problem={currentProblem}
            onProblemSolved={(pId, xp) => recordProblemSolved(pId, xp)}
            onNextProblem={handleNextProblem}
            onAskAI={(prompt) => onAskAI && onAskAI(prompt)}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingPage;
