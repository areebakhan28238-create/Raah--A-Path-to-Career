import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RaahAI from './components/RaahAI';
import AuthModals from './components/AuthModals';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import RoadmapPage from './pages/RoadmapPage';
import CoursePage from './pages/CoursePage';
import CodingPage from './pages/CodingPage';
import QuizPage from './pages/QuizPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ProfilePage from './pages/ProfilePage';
import OnboardingPage from './pages/OnboardingPage';
import { CAREER_PATHS, COURSES_DATA, QUIZZES_DATA } from './data/mockData';
import { ArrowLeft, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';

function AppContent() {
  const { isLoggedIn } = useAuth();

  // Navigation state
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [pageParams, setPageParams] = useState<any>(null);

  // Auth modal state
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot' | 'logout' | null>(null);

  // RAAH AI drawer state
  const [isAIOpen, setIsAIOpen] = useState(false);

  const [pendingRoute, setPendingRoute] = useState<{ page: string; params?: any } | null>(null);

  const navigateTo = (page: string, params?: any) => {
    // Check protected routes
    const protectedRoutes = [
      'dashboard', 'courses', 'course', 'coding', 
      'quizzes', 'quiz', 'projects', 'skills', 'profile', 'settings'
    ];
    if (protectedRoutes.includes(page) && !isLoggedIn) {
      setPendingRoute({ page, params });
      setAuthModalMode('login');
      return;
    }

    setCurrentPage(page);
    setPageParams(params || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup' | 'forgot' | 'logout') => {
    setAuthModalMode(mode);
  };

  const handleAskAI = (prompt?: string) => {
    setIsAIOpen(true);
  };

  // Determine if sidebar should be shown (in dashboard & learning workbench modes)
  const isDashboardLayout = isLoggedIn && [
    'dashboard', 'courses', 'course', 'coding', 
    'quizzes', 'quiz', 'projects', 'skills', 'profile', 'settings'
  ].includes(currentPage);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col text-[var(--text-primary)] font-sans selection:bg-[var(--secondary-light)] selection:text-[var(--primary)]">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex w-full">
        {/* Persistent Dashboard Sidebar when logged in */}
        {isDashboardLayout && (
          <div className="hidden lg:block shrink-0">
            <Sidebar
              currentPage={currentPage}
              onNavigate={navigateTo}
              onOpenAuth={handleOpenAuth}
            />
          </div>
        )}

        {/* Content Area */}
        <main className={`flex-1 w-full overflow-x-hidden ${isDashboardLayout ? 'p-4 sm:p-6 lg:p-8 max-w-7xl' : ''}`}>
          {/* 1. Landing Page */}
          {currentPage === 'landing' && (
            <LandingPage
              onNavigate={navigateTo}
              onOpenAuth={handleOpenAuth}
            />
          )}

          {/* 2. Onboarding & Skill Assessment */}
          {currentPage === 'onboarding' && (
            <OnboardingPage
              onComplete={() => navigateTo('dashboard')}
              onNavigate={navigateTo}
            />
          )}

          {/* 3. Main Dashboard */}
          {currentPage === 'dashboard' && (
            <DashboardPage
              onNavigate={navigateTo}
              onOpenAI={handleAskAI}
            />
          )}

          {/* 4. 4-Year Roadmap */}
          {currentPage === 'roadmap' && (
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              <RoadmapPage
                onNavigate={navigateTo}
                onAskAI={handleAskAI}
              />
            </div>
          )}

          {/* 5. Careers Exploration Page */}
          {currentPage === 'careers' && (
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
              <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs">
                <button
                  onClick={() => navigateTo('landing')}
                  className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition cursor-pointer mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  Top B.Tech Computer Science Careers
                </h1>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  Explore required skills, market demand, compensation packages, and curated 4-year roadmaps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CAREER_PATHS.map((career) => (
                  <div
                    key={career.id}
                    className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[var(--secondary)] bg-[var(--secondary-light)] border border-[var(--secondary)]/30 px-2.5 py-1 rounded-md">
                          {career.averageSalary}
                        </span>
                        <span className="text-xs font-bold text-[var(--text-secondary)] bg-[var(--surface-subtle)] px-2 py-0.5 rounded-full">
                          {career.difficulty}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-[var(--text-primary)]">{career.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                          {career.overview}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                          Key Technical Skills
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {career.requiredSkills.map((sk, idx) => (
                            <span key={idx} className="text-[10px] bg-[var(--surface-subtle)] text-[var(--text-primary)] px-2 py-0.5 rounded-md font-medium border border-[var(--border-light)]">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-[var(--surface-subtle)] p-3 rounded-xl border border-[var(--border-light)]">
                        <span className="text-[10px] font-bold uppercase text-[var(--text-secondary)] block mb-1">
                          Industry Requirements:
                        </span>
                        <ul className="text-xs text-[var(--text-secondary)] space-y-1">
                          {career.requirements.slice(0, 2).map((req, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[var(--accent)] font-bold">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                      <span className="text-xs text-[var(--text-secondary)] font-semibold">
                        Demand: <strong>{career.demandLevel}</strong>
                      </span>
                      <button
                        onClick={() => navigateTo('roadmap')}
                        className="px-3.5 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--accent)] font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs"
                      >
                        <span>View 4-Yr Path</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Courses Catalog Page */}
          {currentPage === 'courses' && (
            <div className="space-y-6">
              <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs">
                <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
                  Video Course Modules
                </h1>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  Structured video lecture masterclasses with integrated notes, code snippets, and quizzes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COURSES_DATA.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => navigateTo('course', course.id)}
                    className="bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 hover:shadow-lg cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-video w-full overflow-hidden bg-[var(--primary-dark)] relative">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-[var(--primary)]/90 text-[var(--accent)] text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                          {course.level}
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)]">
                          {course.category}
                        </span>
                        <h3 className="font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--secondary)] transition">
                          {course.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between text-xs text-[var(--text-secondary)] border-t border-[var(--border-light)] pt-3">
                      <span>{course.chapters.length} Chapters • ~{course.estimatedHours} hrs</span>
                      <span className="font-bold text-[var(--primary)] group-hover:text-[var(--secondary)] flex items-center gap-1">
                        <span>Start Learning</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Working Video Lesson Page */}
          {currentPage === 'course' && (
            <CoursePage
              courseId={pageParams || 'course-ml'}
              onNavigate={navigateTo}
              onAskAI={handleAskAI}
            />
          )}

          {/* 8. Coding Practice Page */}
          {currentPage === 'coding' && (
            <CodingPage
              initialProblemId={pageParams || 'prob-two-sum'}
              onNavigate={navigateTo}
              onAskAI={handleAskAI}
            />
          )}

          {/* 9. Quizzes Hub */}
          {currentPage === 'quizzes' && (
            <div className="space-y-6">
              <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs">
                <h1 className="text-2xl font-black text-[var(--text-primary)] tracking-tight">
                  Skill Quizzes & Knowledge Checks
                </h1>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                  Timed multiple-choice assessments that calibrate your skill tree ratings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {QUIZZES_DATA.map((quiz) => (
                  <div
                    key={quiz.id}
                    onClick={() => navigateTo('quiz', quiz.id)}
                    className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 hover:shadow-lg cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--secondary)] bg-[var(--secondary-light)] px-2.5 py-0.5 rounded-full border border-[var(--secondary)]/30">
                        {quiz.category}
                      </span>
                      <h3 className="font-bold text-base text-[var(--text-primary)]">{quiz.title}</h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {quiz.questions.length} Questions • {quiz.durationMinutes} Minutes • Passing: {quiz.passingScore}%
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs">
                      <span className="text-[var(--text-secondary)] font-medium">Earn +40 XP</span>
                      <span className="font-bold text-[var(--primary)] flex items-center gap-1">
                        <span>Take Quiz</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. Active Quiz Page */}
          {currentPage === 'quiz' && (
            <QuizPage
              quizId={pageParams || 'quiz-dsa-arrays'}
              onNavigate={navigateTo}
              onAskAI={handleAskAI}
            />
          )}

          {/* 11. Recommended Projects Page */}
          {currentPage === 'projects' && (
            <ProjectsPage
              onNavigate={navigateTo}
              onAskAI={handleAskAI}
            />
          )}

          {/* 12. Skills & Readiness Page */}
          {currentPage === 'skills' && (
            <SkillsPage
              onNavigate={navigateTo}
              onAskAI={handleAskAI}
            />
          )}

          {/* 13. Profile & Settings Page */}
          {(currentPage === 'profile' || currentPage === 'settings') && (
            <ProfilePage onNavigate={navigateTo} />
          )}

          {/* How It Works Full View */}
          {currentPage === 'how-it-works' && (
            <LandingPage onNavigate={navigateTo} onOpenAuth={handleOpenAuth} />
          )}

          {/* Features Full View */}
          {currentPage === 'features' && (
            <LandingPage onNavigate={navigateTo} onOpenAuth={handleOpenAuth} />
          )}
        </main>
      </div>

      {/* Floating RAAH AI Career Mentor Button & Drawer */}
      <RaahAI
        onNavigate={navigateTo}
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />

      {/* Authentication Modals (Login, Signup, Forgot, Logout) */}
      <AuthModals
        mode={authModalMode}
        onClose={() => setAuthModalMode(null)}
        onSwitchMode={(mode) => setAuthModalMode(mode)}
        onSuccessRedirect={() => {
          if (authModalMode === 'logout') {
            setCurrentPage('landing');
          } else if (pendingRoute) {
            setCurrentPage(pendingRoute.page);
            setPageParams(pendingRoute.params || null);
            setPendingRoute(null);
          } else {
            setCurrentPage('dashboard');
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
