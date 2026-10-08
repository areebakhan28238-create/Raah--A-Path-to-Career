import React, { useState } from 'react';
import { 
  Play, Send, RotateCcw, Lightbulb, Zap, 
  CheckCircle, Clock, Database, Sparkles, 
  ChevronRight, Award 
} from 'lucide-react';
import { CodingProblem } from '../types';
import confetti from 'canvas-confetti';

interface CodeEditorProps {
  problem: CodingProblem;
  onProblemSolved?: (problemId: string, xp: number) => void;
  onNextProblem?: () => void;
  onAskAI?: (prompt: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  problem,
  onProblemSolved,
  onNextProblem,
  onAskAI,
}) => {
  const [language, setLanguage] = useState<'python' | 'cpp' | 'java' | 'javascript'>('python');
  const [code, setCode] = useState(problem.starterCode.python);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'testcases' | 'result'>('testcases');
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [activeHintIdx, setActiveHintIdx] = useState(0);

  // Results state
  const [submissionResult, setSubmissionResult] = useState<{
    status: 'ACCEPTED' | 'WRONG_ANSWER' | 'COMPILATION_ERROR' | null;
    passedCases: number;
    totalCases: number;
    runtime: string;
    memory: string;
    accuracy: string;
    xpEarned: number;
    message: string;
  }>({
    status: null,
    passedCases: 0,
    totalCases: problem.testCases.length,
    runtime: '',
    memory: '',
    accuracy: '',
    xpEarned: 0,
    message: '',
  });

  const [runResult, setRunResult] = useState<{
    compiled: boolean;
    message: string;
    cases: { input: string; expected: string; actual: string; passed: boolean }[];
  } | null>(null);

  // Sync starter code when language changes
  const handleLanguageChange = (lang: 'python' | 'cpp' | 'java' | 'javascript') => {
    setLanguage(lang);
    setCode(problem.starterCode[lang] || problem.starterCode.python);
  };

  const handleReset = () => {
    setCode(problem.starterCode[language] || problem.starterCode.python);
    setRunResult(null);
    setSubmissionResult((prev) => ({ ...prev, status: null }));
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setActiveTab('result');

    setTimeout(() => {
      setIsRunning(false);
      setRunResult({
        compiled: true,
        message: 'Compilation Successful',
        cases: problem.testCases.map((tc) => ({
          input: tc.input,
          expected: tc.expectedOutput,
          actual: tc.expectedOutput,
          passed: true,
        })),
      });
    }, 700);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setActiveTab('result');

    setTimeout(() => {
      setIsSubmitting(false);

      const totalCases = problem.testCases.length + 2;
      const passedCases = totalCases;
      const xp = problem.xpReward || 50;

      setSubmissionResult({
        status: 'ACCEPTED',
        passedCases,
        totalCases,
        runtime: '48 ms (Beats 89.4% Python3)',
        memory: '17.2 MB (Beats 92.1% Python3)',
        accuracy: '100%',
        xpEarned: xp,
        message: 'All Test Cases Passed Successfully!',
      });

      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#18233C'],
      });

      if (onProblemSolved) {
        onProblemSolved(problem.id, xp);
      }
    }, 1100);
  };

  const lines = code.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#0E1626] text-slate-100 rounded-xl overflow-hidden border border-[var(--border)]/40 shadow-2xl">
      {/* Top Toolbar */}
      <div className="bg-[var(--primary)] px-4 py-2.5 flex flex-wrap items-center justify-between border-b border-[var(--primary-dark)] gap-2">
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as any)}
              className="bg-[var(--primary-dark)] text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[var(--primary-light)] hover:border-[var(--accent)] focus:outline-hidden cursor-pointer"
            >
              <option value="python">Python 3.12</option>
              <option value="cpp">C++ 20 (GCC)</option>
              <option value="java">Java 17 (OpenJDK)</option>
              <option value="javascript">JavaScript (Node 20)</option>
            </select>
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-[var(--primary-light)] transition cursor-pointer"
            title="Reset code to starter template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* AI Helper Quick Triggers */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setShowHint(!showHint);
              if (onAskAI && !showHint) {
                onAskAI(`Give me a conceptual hint for solving "${problem.title}" without spoiling the full solution.`);
              }
            }}
            className="text-xs text-[var(--accent)] bg-[var(--accent)]/15 hover:bg-[var(--accent)]/25 border border-[var(--accent)]/30 px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Hint</span>
          </button>

          <button
            onClick={() => onAskAI && onAskAI(`Analyze my code for "${problem.title}" and suggest complexity optimizations:\n\n${code}`)}
            className="text-xs text-amber-200 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer hidden md:flex"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Optimize</span>
          </button>

          <button
            onClick={() => onAskAI && onAskAI(`Explain the intuition behind the optimal solution for "${problem.title}".`)}
            className="text-xs text-[var(--accent)] bg-[var(--primary-light)] hover:bg-[var(--primary-dark)] border border-[var(--accent)]/30 px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer hidden sm:flex"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>

      {/* Hints Drawer if toggled */}
      {showHint && problem.hints && problem.hints.length > 0 && (
        <div className="bg-[var(--primary-dark)] border-b border-[var(--accent)]/30 p-3 text-xs text-[var(--accent)] flex items-start gap-2.5 animate-fadeIn">
          <Lightbulb className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
          <div className="flex-1 text-slate-200">
            <span className="font-bold text-[var(--accent)]">
              Hint {activeHintIdx + 1} of {problem.hints.length}:
            </span>{' '}
            {problem.hints[activeHintIdx]}
          </div>
          {problem.hints.length > 1 && (
            <button
              onClick={() => setActiveHintIdx((prev) => (prev + 1) % problem.hints.length)}
              className="text-[11px] underline text-[var(--accent)] hover:text-amber-300 shrink-0 cursor-pointer"
            >
              Next Hint
            </button>
          )}
        </div>
      )}

      {/* Real Code Editor Body with Line Numbers & Monospace Canvas */}
      <div className="relative flex-1 flex bg-[#0A101D] overflow-hidden min-h-[280px]">
        {/* Line Numbers column */}
        <div className="w-12 py-3 bg-[#070B14] text-slate-500 font-mono text-xs select-none text-right pr-3 shrink-0 border-r border-slate-800/80">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea Code Canvas */}
        <div className="relative flex-1 h-full overflow-auto">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-full bg-transparent text-slate-100 font-mono text-xs sm:text-[13px] leading-6 p-3 resize-none focus:outline-hidden whitespace-pre tab-4"
            style={{ tabSize: 4 }}
          />
        </div>
      </div>

      {/* Bottom Panel: Testcases & Execution Results */}
      <div className="border-t border-slate-800 bg-[#0E1626] flex flex-col shrink-0">
        {/* Tabs Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('testcases')}
              className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                activeTab === 'testcases' ? 'bg-[var(--primary)] text-[var(--accent)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Test Cases ({problem.testCases.length})
            </button>

            <button
              onClick={() => setActiveTab('result')}
              className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                activeTab === 'result' ? 'bg-[var(--primary)] text-[var(--accent)]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Execution Result
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 border border-slate-700"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={isRunning || isSubmitting}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[var(--primary)] text-[var(--accent)] hover:bg-[var(--primary-light)] flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50 shadow-xs border border-[var(--accent)]/30"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
            </button>
          </div>
        </div>

        {/* Content Pane */}
        <div className="p-4 max-h-56 overflow-y-auto text-xs font-mono">
          {activeTab === 'testcases' ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                {problem.testCases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestCaseIdx(i)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                      activeTestCaseIdx === i
                        ? 'bg-[var(--primary)] text-[var(--accent)]'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    Case {i + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-2 bg-[#070B14] p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">Input:</span>
                  <span className="text-slate-200">{problem.testCases[activeTestCaseIdx]?.input}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] font-sans">Expected Output:</span>
                  <span className="text-emerald-400">{problem.testCases[activeTestCaseIdx]?.expectedOutput}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {submissionResult.status ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-sm font-bold text-emerald-400 font-sans">
                        Accepted! (+{submissionResult.xpEarned} XP)
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        {submissionResult.message}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#070B14] p-2 rounded border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--accent)]" />
                        <span>Runtime</span>
                      </div>
                      <div className="font-mono text-emerald-400 font-bold mt-1 text-[11px]">
                        {submissionResult.runtime}
                      </div>
                    </div>

                    <div className="bg-[#070B14] p-2 rounded border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                        <Database className="w-3 h-3 text-[var(--accent)]" />
                        <span>Memory</span>
                      </div>
                      <div className="font-mono text-emerald-400 font-bold mt-1 text-[11px]">
                        {submissionResult.memory}
                      </div>
                    </div>

                    <div className="bg-[#070B14] p-2 rounded border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400">Test Cases</div>
                      <div className="font-mono text-slate-200 font-bold mt-1 text-[11px]">
                        {submissionResult.passedCases} / {submissionResult.totalCases} Passed
                      </div>
                    </div>
                  </div>

                  {onNextProblem && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={onNextProblem}
                        className="text-xs bg-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--accent)] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer border border-[var(--accent)]/30"
                      >
                        <span>Next Recommended Problem</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ) : runResult ? (
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{runResult.message}</span>
                  </div>
                  <div className="space-y-1.5">
                    {runResult.cases.map((c, i) => (
                      <div key={i} className="bg-[#070B14] p-2 rounded border border-slate-800 flex items-center justify-between font-mono text-[11px]">
                        <div>
                          <span className="text-slate-400">Case {i + 1}: </span>
                          <span className="text-slate-300">{c.input}</span>
                        </div>
                        <span className="text-emerald-400 font-semibold">Passed</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500">
                  <Play className="w-6 h-6 mx-auto mb-1 opacity-50" />
                  <p>Click "Run Code" or "Submit" to evaluate your solution.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
