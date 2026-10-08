import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RaahLogo } from '../components/RaahLogo';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, 
  Sparkles, Target, Compass, Award, BookOpen, Brain, 
  HelpCircle, ChevronRight, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BTechYear, BTechSemester } from '../types';

interface OnboardingPageProps {
  onComplete: () => void;
  onNavigate: (page: string, params?: any) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({
  onComplete,
  onNavigate,
}) => {
  const { user, signup, updateProfile } = useAuth();

  // Onboarding phase: 'questions' | 'assessment' | 'analysis'
  const [phase, setPhase] = useState<'questions' | 'assessment' | 'analysis'>('questions');
  const [step, setStep] = useState(1);

  // Form responses
  const [name, setName] = useState(user.fullName || 'Areeba Khan');
  const [college, setCollege] = useState(user.college || 'Delhi Technological University');
  const [year, setYear] = useState<BTechYear>(user.currentYear || '2nd Year');
  const [semester, setSemester] = useState<BTechSemester>(user.currentSemester || 'Semester 4');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Python', 'C++', 'DSA', 'SQL']);
  const [careerGoal, setCareerGoal] = useState(user.targetCareer || 'Data Scientist');
  const [dailyTime, setDailyTime] = useState(user.dailyStudyTime || '2 hours');
  const [confidence, setConfidence] = useState('Intermediate (6/10)');

  // Skill Assessment Quiz questions (realistic MCQs)
  const assessmentQuestions = [
    {
      id: 'aq1',
      category: 'Programming & Logic',
      question: 'What is the space complexity of storing a binary tree with N nodes using standard pointer representation?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      correctIndex: 2,
    },
    {
      id: 'aq2',
      category: 'SQL & DBMS',
      question: 'Which SQL operator is used to filter query results based on a list of specified values?',
      options: ['BETWEEN', 'IN', 'LIKE', 'EXISTS'],
      correctIndex: 1,
    },
    {
      id: 'aq3',
      category: 'Machine Learning',
      question: 'Which problem occurs when a model performs exceptionally on training data but poorly on unseen test data?',
      options: ['Underfitting', 'Data Drift', 'Overfitting', 'Underflow'],
      correctIndex: 2,
    },
    {
      id: 'aq4',
      category: 'Data Structures',
      question: 'Which data structure is primarily utilized to implement Breadth First Search (BFS) in a graph?',
      options: ['Stack', 'Priority Queue', 'Queue', 'Array'],
      correctIndex: 2,
    },
    {
      id: 'aq5',
      category: 'Python Fundamentals',
      question: 'In Python, which built-in data type is immutable?',
      options: ['List', 'Dictionary', 'Set', 'Tuple'],
      correctIndex: 3,
    },
  ];

  const [assessmentStep, setAssessmentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const toggleSkill = (sk: string) => {
    setSelectedSkills((prev) =>
      prev.includes(sk) ? prev.filter((s) => s !== sk) : [...prev, sk]
    );
  };

  const handleNextStep = () => {
    if (step < 8) {
      setStep(step + 1);
    } else {
      // Transition to Skill Assessment
      setPhase('assessment');
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAnswerSelect = (optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [assessmentStep]: optionIdx,
    }));
  };

  const finishAssessment = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F28705', '#18233C', '#2B59C3'],
    });

    // Save profile to context
    updateProfile({
      fullName: name,
      college,
      currentYear: year,
      currentSemester: semester,
      targetCareer: careerGoal,
      dailyStudyTime: dailyTime,
    });

    setPhase('analysis');
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 sm:py-12 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl bg-[var(--surface)] rounded-3xl shadow-xl border border-[var(--border)] overflow-hidden">
        {/* Header Branding */}
        <div className="bg-[var(--primary)] text-white p-6 flex items-center justify-between border-b border-[var(--primary-dark)]">
          <RaahLogo variant="horizontal" size="sm" theme="light" />
          <div className="text-right">
            <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider block">
              Career Roadmap Engine
            </span>
            <span className="text-xs text-slate-300">
              {phase === 'questions' && `Step ${step} of 8`}
              {phase === 'assessment' && `Assessment: ${assessmentStep + 1} of ${assessmentQuestions.length}`}
              {phase === 'analysis' && 'Personalized Analysis'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[var(--surface-subtle)]">
          <div
            className="h-full bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] transition-all duration-300"
            style={{
              width:
                phase === 'questions'
                  ? `${(step / 8) * 100}%`
                  : phase === 'assessment'
                  ? `${((assessmentStep + 1) / assessmentQuestions.length) * 100}%`
                  : '100%',
            }}
          />
        </div>

        {/* 1. ONBOARDING QUESTIONS (Step 1-8) */}
        {phase === 'questions' && (
          <div className="p-6 sm:p-8 space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Step 1: Your Identity</span>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">What is your full name?</h2>
                <p className="text-xs text-[var(--text-secondary)]">We'll use this across your personalized dashboard, portfolio, and career roadmap.</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Areeba Khan"
                  className="w-full px-4 py-3 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl text-base text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
                  autoFocus
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Step 2: Campus</span>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">Which college or university do you attend?</h2>
                <p className="text-xs text-[var(--text-secondary)]">Helps calibrate average placement patterns, hiring timelines, and campus recruiter bars.</p>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="e.g. Delhi Technological University (DTU)"
                  className="w-full px-4 py-3 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl text-base text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
                  autoFocus
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Step 3: Academic Timeline</span>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">Which B.Tech year are you currently in?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {(['1st Year', '2nd Year', '3rd Year', '4th Year'] as BTechYear[]).map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setYear(yr)}
                      className={`p-4 rounded-xl border text-left font-bold text-sm transition cursor-pointer ${
                        year === yr ? 'bg-[var(--primary)] text-[var(--accent)] border-[var(--primary-dark)] shadow-xs' : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[#EFE8DD]'
                      }`}
                    >
                      {yr}
                      <span className="text-[11px] block font-normal opacity-80 mt-0.5">
                        {yr === '1st Year' ? 'Foundation' : yr === '2nd Year' ? 'Core CS' : yr === '3rd Year' ? 'Specialization' : 'Placements'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Step 4: Semester</span>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">Select your current semester</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'] as BTechSemester[]).map((sem) => (
                    <button
                      key={sem}
                      onClick={() => setSemester(sem)}
                      className={`p-3 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                        semester === sem ? 'bg-[var(--primary)] text-[var(--accent)] border-[var(--primary-dark)]' : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[#EFE8DD]'
                      }`}
                    >
                      {sem}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Step 5: Prior Knowledge</span>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">Which programming skills have you touched?</h2>
                <p className="text-xs text-[var(--text-secondary)]">Select any that you have practiced at least once.</p>
                <div className="flex flex-wrap gap-2">
                  {['C', 'C++', 'Java', 'Python', 'JavaScript', 'HTML/CSS', 'SQL', 'DSA', 'Git', 'Linux'].map((sk) => {
                    const isSelected = selectedSkills.includes(sk);
                    return (
                      <button
                        key={sk}
                        onClick={() => toggleSkill(sk)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                          isSelected ? 'bg-[var(--secondary)] text-[var(--primary-dark)] border-[var(--secondary)] shadow-xs' : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[#EFE8DD]'
                        }`}
                      >
                        {isSelected ? `✓ ${sk}` : `+ ${sk}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Step 6: Career Goal</span>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">What is your dream career destination?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'Data Scientist', desc: 'Predictive models & statistics' },
                    { id: 'Software Developer', desc: 'Core algorithms & systems' },
                    { id: 'AI / ML Engineer', desc: 'Neural nets & deep learning' },
                    { id: 'Full Stack Developer', desc: 'Frontend, backend & cloud' },
                    { id: 'Data Engineer', desc: 'Pipelines, ETL & Big Data' },
                    { id: 'Cyber Security Engineer', desc: 'Defense & vulnerability pentest' },
                  ].map((cg) => (
                    <button
                      key={cg.id}
                      onClick={() => setCareerGoal(cg.id)}
                      className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                        careerGoal === cg.id ? 'bg-[var(--primary)] text-[var(--accent)] border-[var(--primary-dark)] shadow-xs' : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[#EFE8DD]'
                      }`}
                    >
                      <div className="text-xs font-bold">{cg.id}</div>
                      <div className="text-[10px] opacity-80">{cg.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Step 7: Daily Commitment</span>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">How much study time can you commit daily?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['30 minutes', '1 hour', '2 hours', '3+ hours'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setDailyTime(t)}
                      className={`p-4 rounded-xl border text-center font-bold text-sm transition cursor-pointer ${
                        dailyTime === t ? 'bg-[var(--primary)] text-[var(--accent)] border-[var(--primary-dark)]' : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[#EFE8DD]'
                      }`}
                    >
                      ⏱ {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-4">
                <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">Step 8: Self Confidence</span>
                <h2 className="text-2xl font-black text-[var(--text-primary)]">How confident do you feel in your coding today?</h2>
                <div className="space-y-2">
                  {[
                    { label: 'Total Beginner (1-3/10)', desc: 'Just starting out with basic syntax and loops.' },
                    { label: 'Intermediate (4-7/10)', desc: 'Comfortable writing functions and standard logic.' },
                    { label: 'Advanced (8-10/10)', desc: 'Have solved multiple LeetCode problems and built apps.' },
                  ].map((c) => (
                    <button
                      key={c.label}
                      onClick={() => setConfidence(c.label)}
                      className={`w-full p-3.5 rounded-xl border text-left transition cursor-pointer ${
                        confidence === c.label ? 'bg-[var(--primary)] text-[var(--accent)] border-[var(--primary-dark)]' : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[#EFE8DD]'
                      }`}
                    >
                      <div className="text-xs font-bold">{c.label}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
              <button
                onClick={handlePrevStep}
                disabled={step === 1}
                className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--accent)] font-bold text-xs rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>{step === 8 ? 'Start Skill Assessment →' : 'Continue'}</span>
                {step !== 8 && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* 2. SKILL ASSESSMENT QUIZ */}
        {phase === 'assessment' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--secondary)] uppercase tracking-wider">
                Diagnostic Assessment • {assessmentQuestions[assessmentStep].category}
              </span>
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                Question {assessmentStep + 1} / {assessmentQuestions.length}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-snug">
              {assessmentQuestions[assessmentStep].question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {assessmentQuestions[assessmentStep].options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[assessmentStep] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerSelect(oIdx)}
                    className={`w-full p-4 rounded-xl border text-left font-medium text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--primary)] text-[var(--accent)] border-[var(--primary-dark)] shadow-xs'
                        : 'bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] text-[var(--text-primary)] border-[var(--border)]'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'border-[var(--secondary)] bg-[var(--secondary)] text-[var(--primary-dark)] font-bold' : 'border-[var(--border)] text-[var(--text-secondary)]'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Assessment Nav */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
              <button
                onClick={() => setAssessmentStep((prev) => Math.max(0, prev - 1))}
                disabled={assessmentStep === 0}
                className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {assessmentStep === assessmentQuestions.length - 1 ? (
                <button
                  onClick={finishAssessment}
                  className="px-6 py-2.5 bg-gradient-to-r from-[var(--secondary)] to-[#E67800] hover:brightness-105 text-[var(--primary-dark)] font-black text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze My Skills & Generate Roadmap</span>
                </button>
              ) : (
                <button
                  onClick={() => setAssessmentStep((prev) => prev + 1)}
                  className="px-6 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--accent)] font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 3. PERSONALIZED ANALYSIS SCREEN */}
        {phase === 'analysis' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                Personalized Assessment Results
              </span>
              <h2 className="text-2xl font-black text-[var(--text-primary)]">
                Your Career Profile & Diagnostic
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Target Career Goal: <strong className="text-[var(--text-primary)]">{careerGoal}</strong>
              </p>
            </div>

            {/* Circular Readiness Gauge */}
            <div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-around gap-6 border border-[var(--primary-dark)]">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#2A3B5E"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#F28705"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="80"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-white">68%</span>
                  <span className="text-[10px] text-[var(--accent)] font-bold uppercase">Readiness</span>
                </div>
              </div>

              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-xs bg-[var(--secondary)]/20 text-[var(--accent)] border border-[var(--secondary)]/30 px-2.5 py-0.5 rounded-full font-bold">
                  Good Baseline Foundation
                </span>
                <h3 className="text-base font-bold text-white">You're on track for {careerGoal}!</h3>
                <p className="text-xs text-slate-300 max-w-xs">
                  Your programming intuition is solid. Closing your SQL and Machine Learning gaps will push your readiness beyond 80%.
                </p>
              </div>
            </div>

            {/* Skill Bars Analysis */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Skill Diagnostic Scores
              </h4>

              <div className="space-y-2">
                {[
                  { name: 'Python', score: 82, color: 'bg-emerald-500' },
                  { name: 'DBMS Fundamentals', score: 70, color: 'bg-emerald-500' },
                  { name: 'DSA', score: 63, color: 'bg-sky-500' },
                  { name: 'Statistics & Probability', score: 51, color: 'bg-[var(--secondary)]' },
                  { name: 'SQL', score: 44, color: 'bg-[var(--secondary)]' },
                  { name: 'Machine Learning', score: 31, color: 'bg-rose-500' },
                ].map((sk) => (
                  <div key={sk.name}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-[var(--text-primary)]">{sk.name}</span>
                      <span className="text-[var(--text-secondary)] font-mono">{sk.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--surface-subtle)] rounded-full overflow-hidden border border-[var(--border-light)]">
                      <div
                        className={`h-full ${sk.color} rounded-full transition-all duration-700`}
                        style={{ width: `${sk.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Skill Gaps Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Your Strengths</span>
                </h5>
                <ul className="text-xs text-emerald-800 space-y-1 font-medium">
                  <li>✓ Python (82%) — Syntax & collections</li>
                  <li>✓ DBMS (70%) — Relational schemas</li>
                  <li>✓ Programming Fundamentals</li>
                </ul>
              </div>

              <div className="bg-[var(--secondary-light)]/40 border border-[var(--secondary)]/30 p-4 rounded-xl">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[var(--secondary)]" />
                  <span>Skill Gaps</span>
                </h5>
                <ul className="text-xs text-[var(--text-primary)] space-y-1 font-medium">
                  <li>⚠ Machine Learning (31%) — Regression & trees</li>
                  <li>⚠ SQL (44%) — Aggregations & window funcs</li>
                  <li>⚠ Statistics (51%) — Hypothesis testing</li>
                </ul>
              </div>
            </div>

            {/* Recommended Next Step Callout */}
            <div className="bg-[var(--primary)] text-white p-4 rounded-xl border border-[var(--primary-dark)] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider block">
                  Recommended Next Step
                </span>
                <h5 className="text-sm font-bold text-white">Start with SQL Fundamentals & JOINs</h5>
                <p className="text-[11px] text-slate-300">
                  Boost your SQL from 44% to 75% through video lessons and interactive exercises.
                </p>
              </div>

              <button
                onClick={() => {
                  onComplete();
                  onNavigate('dashboard');
                }}
                className="px-5 py-2.5 bg-[var(--secondary)] hover:brightness-110 text-[var(--primary-dark)] font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Launch My Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
