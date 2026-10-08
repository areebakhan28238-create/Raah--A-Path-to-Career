import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RaahLogo } from './RaahLogo';
import { SupabaseModal } from './SupabaseModal';
import { 
  LayoutDashboard, Map, BookOpen, Code, 
  HelpCircle, FolderGit2, Award, User, 
  Settings, LogOut, Flame, Target, Sparkles, ChevronRight, Database
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenAuth: (mode: 'login' | 'signup' | 'forgot' | 'logout') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth,
}) => {
  const { user } = useAuth();
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'My Roadmap', icon: Map },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'coding', label: 'Coding Practice', icon: Code },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills & Readiness', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[var(--surface)] border-r border-[var(--border)] min-h-screen flex flex-col justify-between shrink-0 select-none shadow-xs">
      {/* Top Branding Section */}
      <div>
        <div className="p-5 border-b border-[var(--border-light)] flex items-center justify-between">
          <div onClick={() => onNavigate('dashboard')} className="cursor-pointer">
            <RaahLogo variant="horizontal" size="sm" />
          </div>
        </div>

        {/* Dynamic Logged-in User Profile Card in Sidebar */}
        <div className="p-4 mx-3 my-3 bg-gradient-to-br from-[var(--surface)] to-[var(--secondary-light)]/30 rounded-2xl border border-[var(--border)] shadow-xs">
          <div className="flex items-center gap-3">
            {/* User Initials Badge (Clean Original Brand Design) */}
            <div className="w-11 h-11 rounded-xl bg-[var(--primary)] text-[var(--accent)] font-black text-base flex items-center justify-center shadow-xs overflow-hidden shrink-0 border border-[var(--border)] select-none">
              {user.fullName ? user.fullName.trim()[0].toUpperCase() : 'U'}
            </div>

            {/* Dynamic User Details - Instantly reacts to profile updates */}
            <div className="overflow-hidden flex-1">
              <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)] truncate" title={user.fullName}>
                {user.fullName || 'Student'}
              </h3>
              <p className="text-[11px] font-semibold text-[var(--secondary)] truncate" title={user.targetCareer}>
                {user.targetCareer || 'Career Goal'}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] font-medium truncate">
                B.Tech CSE • {user.currentYear || '1st Year'}
              </p>
            </div>
          </div>

          {/* Quick Streak, XP & Badges indicators */}
          <div className="mt-3 pt-2.5 border-t border-[var(--border-light)] space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-semibold text-[var(--secondary)]">
                <Flame className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />
                <span>{user.learningStreak} Days Streak</span>
              </span>
              <span className="font-bold text-[var(--secondary)] font-mono">
                {user.xp} XP
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
              <span>Readiness: <strong className="text-[var(--text-primary)]">{user.careerReadinessScore}%</strong></span>
              <span className="font-semibold text-[var(--text-primary)]">🏆 {user.badges.length} Badges</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-2 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--accent)] shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-4 border-t border-[var(--border-light)] space-y-2">
        <button
          onClick={() => setSupabaseModalOpen(true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition cursor-pointer"
          title="Supabase Database: dtvtwrwxxttfhyurjvgy"
        >
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supabase Cloud</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full bg-[var(--secondary-light)] hover:bg-[#FCD8A2] text-[var(--text-primary)] border border-[var(--secondary)]/30 p-3 rounded-xl flex items-center justify-between text-xs transition cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--secondary)]" />
            <div className="text-left">
              <div className="font-bold text-[11px] leading-none text-[var(--primary)]">RAAH AI Mentor</div>
              <div className="text-[10px] text-[var(--secondary)] mt-0.5">Need help today?</div>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--secondary)]" />
        </button>

        <button
          onClick={() => onOpenAuth('logout')}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>Logout</span>
        </button>
      </div>

      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />
    </aside>
  );
};

export default Sidebar;
