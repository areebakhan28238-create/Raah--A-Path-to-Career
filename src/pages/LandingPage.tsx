import React from 'react';
import { RaahLogo } from '../components/RaahLogo';
import { CAREER_PATHS } from '../data/mockData';
import { 
  ArrowRight, BookOpen, Code, 
  Award, Sparkles, 
  Compass, Trophy, ChevronRight, Play
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string, params?: any) => void;
  onOpenAuth: (mode: 'login' | 'signup' | 'forgot' | 'logout') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenAuth,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Know Yourself',
      description: 'Take our intelligent diagnostic skill assessment to uncover your current programming baseline and knowledge gaps.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Choose Your Career',
      description: 'Select your target path—from Data Scientist to AI/ML or SDE—with real industry role expectations and salary insights.',
      icon: Trophy,
    },
    {
      num: '03',
      title: 'Build Your Skills',
      description: 'Follow a curated semester-by-semester 4-year roadmap with modular video lectures, conceptual notes, and quizzes.',
      icon: BookOpen,
    },
    {
      num: '04',
      title: 'Practice & Build Projects',
      description: 'Master algorithm patterns in our coding sandbox and assemble production-grade capstone projects with full checklists.',
      icon: Code,
    },
    {
      num: '05',
      title: 'Become Career Ready',
      description: 'Track your Career Readiness score, build an ATS-proof resume, and practice live mock technical interviews with RAAH AI.',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Soft Brand Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-[var(--secondary)]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--secondary-light)] border border-[var(--secondary)]/30 text-[var(--secondary)] text-xs font-bold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />
                <span>The 4-Year B.Tech Computer Science Career Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.12]">
                Your 4-Year Journey.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] via-[var(--accent)] to-[var(--secondary)]">
                  Your Career. Your Raah.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                RAAH guides Computer Science students from their first year to career readiness with personalized learning paths, video courses, skill assessments, coding practice, projects, and AI mentoring.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('onboarding')}
                  className="px-6 py-3.5 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--accent)] font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('roadmap')}
                  className="px-6 py-3.5 bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--text-primary)] font-bold text-sm sm:text-base rounded-2xl border border-[var(--border)] shadow-xs transition hover:border-[var(--accent)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore 4-Year Roadmap</span>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                </button>
              </div>

              {/* Quick Feature Badges Row */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0 text-left">
                {[
                  { label: '4-Year Roadmap', desc: 'Semester by semester' },
                  { label: 'RAAH AI Mentor', desc: 'Personal guidance' },
                  { label: 'Code Practice', desc: 'LeetCode sandbox' },
                  { label: 'Real Projects', desc: 'Portfolio ready' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)] shadow-xs">
                    <div className="text-xs font-bold text-[var(--text-primary)]">{item.label}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Visual: Interactive 4-Year Career Journey */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[var(--surface)] rounded-3xl p-6 sm:p-8 shadow-xl border border-[var(--border)] relative">
                {/* Floating Stamp */}
                <div className="absolute -top-3 -right-3 bg-[var(--accent)] text-[var(--primary-dark)] font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span>Learn • Build • Grow</span>
                </div>

                <div className="text-center mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--secondary)]">
                    Engineered for Engineering Students
                  </span>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mt-0.5">
                    Structured 4-Year Career Pathway
                  </h3>
                </div>

                {/* Timeline Journey Cards */}
                <div className="space-y-3 relative">
                  <div className="absolute left-4.5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[var(--accent)] via-[var(--secondary)] to-[var(--primary)] -z-0" />

                  {[
                    { year: 'Year 1', title: 'Foundation', status: 'C/C++, Math, OOP, Git', progress: '100%', color: 'border-emerald-200 bg-emerald-50/50' },
                    { year: 'Year 2', title: 'Core Computer Science', status: 'DSA, DBMS, OS, Networks', progress: '80%', color: 'border-sky-200 bg-sky-50/50' },
                    { year: 'Year 3', title: 'Specialization Track', status: 'Machine Learning, Statistics, APIs', progress: '45%', color: 'border-[var(--secondary)]/30 bg-[var(--secondary-light)]/50' },
                    { year: 'Year 4', title: 'Placement & Industry', status: 'System Design, Capstones, Mock HR', progress: '10%', color: 'border-[var(--border)] bg-[var(--surface-subtle)]' },
                  ].map((node, idx) => (
                    <div
                      key={idx}
                      className={`relative z-10 flex items-center justify-between p-3.5 rounded-2xl border ${node.color} transition hover:scale-[1.02] shadow-xs`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-[var(--accent)] font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[var(--text-primary)]">{node.year}: {node.title}</span>
                          </div>
                          <span className="text-[11px] text-[var(--text-secondary)] block">{node.status}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[var(--primary)] bg-[var(--surface)] px-2 py-0.5 rounded-md border border-[var(--border)]">
                        {node.progress}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Target Career Destination Card */}
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/30">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[var(--accent)] uppercase font-bold tracking-wider">
                        Destination
                      </div>
                      <div className="text-sm font-bold text-white">Tier-1 Company Placement 🎯</div>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('careers')}
                    className="text-xs bg-[var(--accent)] text-[var(--primary-dark)] font-bold px-3 py-1.5 rounded-lg hover:bg-[var(--secondary)] transition cursor-pointer"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION (5 Steps) */}
      <section id="how-it-works" className="py-20 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[var(--secondary)] font-bold">
              Step-by-Step Blueprint
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              How RAAH Works
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              A comprehensive system crafted to take you from a confused college fresher to an industry-ready engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="bg-[var(--surface-subtle)] hover:bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 hover:shadow-lg flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-[var(--text-muted)] group-hover:text-[var(--secondary)] transition">
                        {st.num}
                      </span>
                      <div className="p-2.5 bg-[var(--surface)] group-hover:bg-[var(--primary)] rounded-xl border border-[var(--border)] group-hover:border-[var(--primary)] transition text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">
                      {st.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CAREER PATHS SECTION */}
      <section id="careers" className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--secondary)] font-bold">
                Specializations & In-Demand Tracks
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
                Explore Top 8 Engineering Careers
              </h2>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl">
                Every career has a tailored 4-year subject sequence, real project milestones, and LeetCode problem recommendations.
              </p>
            </div>
            <button
              onClick={() => onNavigate('careers')}
              className="text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>View All Careers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_PATHS.slice(0, 8).map((career) => (
              <div
                key={career.id}
                className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 hover:shadow-lg flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--secondary)] bg-[var(--secondary-light)] border border-[var(--secondary)]/30 px-2 py-0.5 rounded-md">
                      {career.averageSalary}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      career.difficulty === 'Moderate' ? 'bg-emerald-100 text-emerald-800' :
                      career.difficulty === 'Challenging' ? 'bg-amber-100 text-amber-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {career.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--secondary)] transition">
                    {career.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {career.shortDescription}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                      Key Skills Required
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {career.requiredSkills.slice(0, 4).map((sk, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[var(--surface-subtle)] text-[var(--text-primary)] px-2 py-0.5 rounded-md font-medium border border-[var(--border-light)]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--text-muted)] font-semibold">
                    {career.demandLevel} Demand
                  </span>
                  <button
                    onClick={() => onNavigate('roadmap')}
                    className="text-xs font-bold text-[var(--primary)] group-hover:text-[var(--secondary)] flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Roadmap</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM FEATURES WORKBENCH */}
      <section id="features" className="py-20 bg-[var(--surface)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[var(--secondary)] font-bold">
              All-In-One Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              Everything You Need in One Place
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              No more bouncing between 10 different tabs, outdated YouTube playlists, and confusing forums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[var(--surface-subtle)] p-6 rounded-2xl border border-[var(--border)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--secondary-light)] text-[var(--secondary)] flex items-center justify-center">
                <Play className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[var(--text-primary)]">Interactive Video Lectures</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Working video lectures with resume playback, variable playback speed, chapter markers, integrated downloadable notes, and instant quizzes.
              </p>
            </div>

            <div className="bg-[var(--surface-subtle)] p-6 rounded-2xl border border-[var(--border)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[var(--text-primary)]">Developer Coding Sandbox</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                LeetCode-style editor supporting Python, C++, Java, and JavaScript. Compilation evaluation, hidden test cases, runtime analysis, and XP.
              </p>
            </div>

            <div className="bg-[var(--surface-subtle)] p-6 rounded-2xl border border-[var(--border)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-[var(--accent)] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[var(--text-primary)]">RAAH AI Career Mentor</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Context-aware mentor that analyzes your quiz scores, generates daily study plans, clarifies tricky syntax in English or Hindi, and conducts mock interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-[var(--primary-dark)] via-[var(--primary)] to-[var(--primary-light)] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <RaahLogo variant="full" size="lg" theme="light" />
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Build Your Engineering Career?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Get your personalized 4-year roadmap and join thousands of students preparing for top product companies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('onboarding')}
              className="px-8 py-3.5 bg-[var(--accent)] hover:bg-[#FBBF24] text-[var(--primary-dark)] font-black text-sm sm:text-base rounded-2xl shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              Get Started for Free
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-2xl border border-white/20 transition cursor-pointer"
            >
              Sign In to Account
            </button>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[var(--surface)] border-t border-[var(--border)] py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-[var(--border-light)]">
            <div>
              <RaahLogo variant="horizontal" size="md" />
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                Personalized 4-year career guidance & learning ecosystem for B.Tech CSE.
              </p>
            </div>

            <div className="text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-6">
              <span>Learn</span>
              <span>•</span>
              <span>Practice</span>
              <span>•</span>
              <span>Build</span>
              <span>•</span>
              <span>Grow</span>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
            <p>© {new Date().getFullYear()} RAAH. "Because Your Future Deserves a Plan". All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('roadmap')} className="hover:text-[var(--text-primary)] cursor-pointer">Roadmap</button>
              <button onClick={() => onNavigate('careers')} className="hover:text-[var(--text-primary)] cursor-pointer">Careers</button>
              <button onClick={() => onNavigate('privacy')} className="hover:text-[var(--text-primary)] cursor-pointer">Privacy</button>
              <button onClick={() => onNavigate('terms')} className="hover:text-[var(--text-primary)] cursor-pointer">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
