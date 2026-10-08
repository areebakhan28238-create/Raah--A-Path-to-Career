import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { QUIZZES_DATA } from '../data/mockData';
import { Quiz } from '../types';
import { 
  CheckCircle2, XCircle, ArrowLeft, ArrowRight, 
  RotateCcw, Sparkles, Clock, Award, HelpCircle, 
  BookOpen, ChevronRight, AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizPageProps {
  quizId?: string;
  onNavigate: (page: string, params?: any) => void;
  onAskAI?: (prompt: string) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  quizId = 'quiz-dsa-arrays',
  onNavigate,
  onAskAI,
}) => {
  const { recordQuizScore } = useAuth();

  const quiz: Quiz = QUIZZES_DATA.find((q) => q.id === quizId) || QUIZZES_DATA[0];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.durationMinutes * 60);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = quiz.questions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    // Calculate score
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / quiz.questions.length) * 100);
    recordQuizScore(quiz.id, scorePct);

    if (scorePct >= 70) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F28705', '#18233C', '#2B59C3'],
      });
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
    setTimeLeft(quiz.durationMinutes * 60);
  };

  // Calculations for results view
  let correctCount = 0;
  let incorrectCount = 0;
  const incorrectTopics: string[] = [];

  quiz.questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.correctIndex) {
      correctCount++;
    } else {
      incorrectCount++;
      if (!incorrectTopics.includes(q.topicTag)) {
        incorrectTopics.push(q.topicTag);
      }
    }
  });

  const finalScorePct = Math.round((correctCount / quiz.questions.length) * 100);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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
              {quiz.title}
            </h1>
            <span className="text-xs bg-[var(--secondary-light)] text-[var(--primary)] font-bold px-2.5 py-0.5 rounded-full border border-[var(--secondary)]/30">
              {quiz.category}
            </span>
          </div>
        </div>

        {/* Timer Badge */}
        {!isSubmitted && (
          <div className="flex items-center gap-2 bg-[var(--primary)] text-white px-3.5 py-1.5 rounded-xl border border-[var(--primary-dark)]">
            <Clock className="w-4 h-4 text-[var(--secondary)]" />
            <span className="font-mono font-bold text-sm text-[var(--accent)]">
              {formatTimer(timeLeft)}
            </span>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        /* QUIZ ACTIVE TAKING VIEW */
        <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-xs space-y-6">
          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
              <span>Question {currentIdx + 1} of {quiz.questions.length}</span>
              <span>{Math.round(((currentIdx + 1) / quiz.questions.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-[var(--surface-subtle)] rounded-full overflow-hidden border border-[var(--border-light)]">
              <div
                className="h-full bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)]">
              Topic: {currentQ.topicTag}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentIdx] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--primary)] text-[var(--accent)] border-[var(--primary-dark)] shadow-sm'
                      : 'bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] text-[var(--text-primary)] border-[var(--border)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'border-[var(--secondary)] bg-[var(--secondary)] text-[var(--primary-dark)]' : 'border-[var(--border)] text-[var(--text-secondary)] bg-[var(--surface)]'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
            <button
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentIdx === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2.5 bg-gradient-to-r from-[var(--secondary)] to-[#E67800] hover:brightness-105 text-[var(--primary-dark)] font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Submit Quiz</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentIdx((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
                className="px-6 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--accent)] font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ SUMMARY & SCORE REPORT */
        <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
              Assessment Report
            </span>
            <h2 className="text-2xl font-black text-[var(--text-primary)]">
              Quiz Completed!
            </h2>
          </div>

          {/* Big Score Card */}
          <div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-around gap-6 border border-[var(--border)]">
            <div className="text-center">
              <span className="text-5xl font-black text-[var(--accent)] font-mono">
                {finalScorePct}%
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Score: {correctCount} / {quiz.questions.length} Correct
              </p>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                finalScorePct >= 70 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
              }`}>
                {finalScorePct >= 70 ? '✓ Passed Assessment (+40 XP)' : 'Needs Revision'}
              </span>
              <p className="text-xs text-slate-300 max-w-xs">
                Your performance has automatically updated your profile skill rating in the RAAH database.
              </p>
            </div>
          </div>

          {/* Topics to Revise */}
          {incorrectTopics.length > 0 && (
            <div className="bg-[var(--secondary-light)]/40 border border-[var(--secondary)]/30 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[var(--secondary)]" />
                <span>Recommended Action & Topics to Revise</span>
              </h4>
              <p className="text-xs text-[var(--text-primary)]">
                You missed questions related to: <strong>{incorrectTopics.join(', ')}</strong>.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => onNavigate('course', 'course-ml')}
                  className="text-xs bg-[var(--primary)] text-[var(--accent)] font-bold px-3 py-1.5 rounded-lg hover:bg-[var(--primary-dark)] transition cursor-pointer"
                >
                  Review Lecture Notes
                </button>
                <button
                  onClick={() => onAskAI && onAskAI(`Explain the key concepts of ${incorrectTopics.join(' and ')} in simple terms with examples.`)}
                  className="text-xs bg-[var(--secondary)] text-[var(--primary-dark)] font-bold px-3 py-1.5 rounded-lg hover:brightness-105 transition cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask RAAH AI to Explain</span>
                </button>
              </div>
            </div>
          )}

          {/* Detailed Question Review */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Question Breakdown
            </h4>

            {quiz.questions.map((q, i) => {
              const isCorrect = selectedAnswers[i] === q.correctIndex;
              return (
                <div key={q.id} className="p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] text-xs space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-[var(--text-primary)]">
                      0{i + 1}. {q.question}
                    </span>
                    {isCorrect ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-600 font-bold flex items-center gap-1 shrink-0">
                        <XCircle className="w-4 h-4" /> Missed
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-[var(--text-secondary)] bg-[var(--surface)] p-2.5 rounded-lg border border-[var(--border-light)]">
                    <strong className="text-[var(--text-primary)]">Explanation: </strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 text-xs font-bold text-[var(--text-secondary)] bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] border border-[var(--border)] rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2 bg-[var(--primary)] text-[var(--accent)] font-bold text-xs rounded-xl hover:bg-[var(--primary-dark)] transition cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
