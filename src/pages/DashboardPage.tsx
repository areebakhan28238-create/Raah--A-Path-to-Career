import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Target, Flame, BookOpen, Code, 
  HelpCircle, FolderGit2, Play, 
  Sparkles, ChevronRight, TrendingUp, Clock
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenAI?: (prompt?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenAI,
}) => {
  const { user } = useAuth();

  const yearCards = [
    {
      year: 'Year 1',
      title: 'Foundation',
      progress: 100,
      status: 'Completed',
      color: 'bg-emerald-500',
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/50',
    },
    {
      year: 'Year 2',
      title: 'Core CS',
      progress: 80,
      status: 'In Progress',
      color: 'bg-[var(--primary)]',
      border: 'border-[var(--primary)]/20',
      bg: 'bg-[var(--primary)]/5',
    },
    {
      year: 'Year 3',
      title: 'Specialization',
      progress: 45,
      status: 'Active Track',
      color: 'bg-[var(--secondary)]',
      border: 'border-[var(--secondary)]/30',
      bg: 'bg-[var(--secondary-light)]/40',
    },
    {
      year: 'Year 4',
      title: 'Placement',
      progress: 10,
      status: 'Upcoming',
      color: 'bg-[var(--text-muted)]',
      border: 'border-[var(--border)]',
      bg: 'bg-[var(--surface-subtle)]',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              Hello {user.fullName ? user.fullName.split(' ')[0] : 'Student'} 👋
            </h1>
            <span className="text-xs bg-[var(--secondary-light)] text-[var(--secondary)] font-bold px-2.5 py-0.5 rounded-full border border-[var(--secondary)]/30">
              {user.currentYear} • {user.currentSemester}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Here's your complete journey. Keep going—you're building your future every day.
          </p>
        </div>

        {/* Target Career Badge */}
        <div className="bg-[var(--primary)] text-white px-4 py-2.5 rounded-xl border border-[var(--primary-light)] flex items-center gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-bold">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-[var(--accent)] font-bold uppercase tracking-wider block">
              Target Career Goal
            </span>
            <span className="text-xs font-bold text-white">{user.targetCareer}</span>
          </div>
        </div>
      </div>

      {/* Main KPI Row: Career Readiness, Skill Overview, Learning Streak */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 1. Career Readiness Score Card */}
        <div className="md:col-span-4 bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Career Readiness Score
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+8% this month</span>
            </span>
          </div>

          {/* Meter visual */}
          <div className="my-4 flex items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="var(--surface-subtle)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="var(--secondary)"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * user.careerReadinessScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  {user.careerReadinessScore}%
                </span>
                <span className="text-[10px] text-[var(--secondary)] font-bold uppercase">
                  {user.targetCareer}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2 border-t border-[var(--border-light)]">
            <p className="text-xs text-[var(--text-secondary)]">
              Good Progress! You are on the right track. Keep learning and building projects.
            </p>
            <button
              onClick={() => onNavigate('skills')}
              className="mt-2 text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View Readiness Breakdown</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Skill Overview Card */}
        <div className="md:col-span-5 bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Skill Overview
            </span>
            <button
              onClick={() => onNavigate('skills')}
              className="text-xs text-[var(--secondary)] hover:text-[var(--accent)] font-semibold cursor-pointer"
            >
              View All Skills →
            </button>
          </div>

          <div className="space-y-3 my-1">
            {user.skills.slice(0, 5).map((sk) => (
              <div key={sk.name}>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-[var(--text-primary)]">{sk.name}</span>
                  <span className="text-[var(--text-secondary)] font-mono text-[11px]">{sk.score}%</span>
                </div>
                <div className="w-full h-2 bg-[var(--surface-subtle)] rounded-full overflow-hidden border border-[var(--border-light)]">
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

          <div className="pt-3 border-t border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Strongest: <strong>Python ({user.skills.find(s=>s.name==='Python')?.score || 82}%)</strong></span>
            <span>Focus Area: <strong className="text-[var(--secondary)]">SQL ({user.skills.find(s=>s.name==='SQL')?.score || 44}%)</strong></span>
          </div>
        </div>

        {/* 3. Learning Streak & Gamification */}
        <div className="md:col-span-3 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                Learning Streak
              </span>
              <span className="p-1.5 bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg">
                <Flame className="w-4 h-4 fill-[var(--accent)]" />
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl font-black text-[var(--accent)] tracking-tight">
                {user.learningStreak} Days
              </span>
              <p className="text-xs text-slate-300 mt-1">Keep it up! Momentum is key.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--primary-light)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Total Experience</span>
              <span className="font-bold text-[var(--accent)] font-mono">{user.xp} XP</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Unlocked Badges</span>
              <span className="font-bold text-white">{user.badges.length} Badges 🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Year Academic Journey Timeline */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">Current 4-Year Journey</h3>
            <p className="text-xs text-[var(--text-secondary)]">Structured progress from college entry to placement.</p>
          </div>
          <button
            onClick={() => onNavigate('roadmap')}
            className="text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] flex items-center gap-1 cursor-pointer"
          >
            <span>Open Detailed Timeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {yearCards.map((yc) => (
            <div
              key={yc.year}
              onClick={() => onNavigate('roadmap')}
              className={`p-4 rounded-xl border ${yc.border} ${yc.bg} transition hover:shadow-md cursor-pointer flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[var(--text-primary)]">{yc.year}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]">
                    {yc.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">{yc.title}</h4>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] mb-1">
                  <span>Progress</span>
                  <span>{yc.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div className={`h-full ${yc.color}`} style={{ width: `${yc.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Current Focus & Quick Actions & AI Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Focus Course Module with Automatic Resume */}
        <div className="lg:col-span-7 bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
              Current Focus • Resume Learning
            </span>
            <span className="text-xs text-[var(--text-muted)] font-medium">
              {user.resumeLearning?.chapterTitle ? 'Active Lesson' : 'Chapter 3 of 7'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)]">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-[var(--accent)] flex items-center justify-center shrink-0 shadow-xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                  {user.resumeLearning?.courseTitle || 'Machine Learning Fundamentals'}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                  {user.resumeLearning?.chapterTitle || 'Chapter 3: Regression & Cost Functions'}
                </h4>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    Resumes from {Math.floor((user.resumeLearning?.timestampSeconds || 459) / 60)}:
                    {((user.resumeLearning?.timestampSeconds || 459) % 60 < 10 ? '0' : '')}
                    {(user.resumeLearning?.timestampSeconds || 459) % 60} • {user.resumeLearning?.percentageWatched || 60}% Watched
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('course', user.resumeLearning?.courseId || 'course-ml')}
              className="w-full sm:w-auto px-4 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--accent)] font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Continue Learning</span>
              <Play className="w-3 h-3 fill-current" />
            </button>
          </div>

          {/* Recommendation Banner */}
          <div className="p-4 rounded-xl bg-[var(--secondary-light)] border border-[var(--secondary)]/30 text-xs text-[var(--text-primary)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 max-w-xl">
              <Sparkles className="w-4 h-4 text-[var(--secondary)] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[var(--primary)] font-bold">Why are we recommending this?</strong>
                <span>
                  "Machine Learning is a core requirement for your target <strong>{user.targetCareer}</strong> role. Finishing this chapter will increase your technical readiness."
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('course', user.resumeLearning?.courseId || 'course-ml')}
              className="px-3.5 py-1.5 bg-[var(--accent)] hover:bg-[#FBBF24] text-[var(--primary-dark)] font-bold rounded-lg transition cursor-pointer"
            >
              Go to Learning →
            </button>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-5 bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] block">
            Quick Actions
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigate('quiz', 'quiz-dsa-arrays')}
              className="p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--surface-subtle)] text-left transition cursor-pointer flex flex-col justify-between"
            >
              <HelpCircle className="w-5 h-5 text-[var(--secondary)] mb-2" />
              <div>
                <div className="text-xs font-bold text-[var(--text-primary)]">Take Quiz</div>
                <div className="text-[10px] text-[var(--text-secondary)]">DSA Arrays • 10 Questions</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('coding', 'prob-two-sum')}
              className="p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--surface-subtle)] text-left transition cursor-pointer flex flex-col justify-between"
            >
              <Code className="w-5 h-5 text-[var(--primary)] mb-2" />
              <div>
                <div className="text-xs font-bold text-[var(--text-primary)]">Start Coding</div>
                <div className="text-[10px] text-[var(--text-secondary)]">Two Sum & Array Hashing</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--surface-subtle)] text-left transition cursor-pointer flex flex-col justify-between"
            >
              <FolderGit2 className="w-5 h-5 text-emerald-600 mb-2" />
              <div>
                <div className="text-xs font-bold text-[var(--text-primary)]">View Projects</div>
                <div className="text-[10px] text-[var(--text-secondary)]">Customer Churn Engine</div>
              </div>
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="p-3.5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--surface-subtle)] text-left transition cursor-pointer flex flex-col justify-between"
            >
              <Target className="w-5 h-5 text-[var(--secondary)] mb-2" />
              <div>
                <div className="text-xs font-bold text-[var(--text-primary)]">Update Profile</div>
                <div className="text-[10px] text-[var(--text-secondary)]">Edit Year & Target Role</div>
              </div>
            </button>
          </div>

          <button
            onClick={() => onOpenAI && onOpenAI('Create a 2 hour study plan for me today')}
            className="w-full mt-2 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--accent)] font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Today's AI Study Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
