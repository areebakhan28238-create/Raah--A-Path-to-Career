import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RaahLogo, RaahLogoMark } from './RaahLogo';
import { SupabaseModal } from './SupabaseModal';
import { 
  Bell, ChevronDown, User, LogOut, Settings, 
  Map, Award, BookOpen, Menu, X, Sparkles, FolderGit2,
  CheckCircle, ArrowRight, Database
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  onOpenAuth: (mode: 'login' | 'signup' | 'forgot' | 'logout') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth,
}) => {
  const { isLoggedIn, user, notifications, unreadNotificationCount, markNotificationAsRead } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Main navigation items
  const navItems = [
    { id: 'landing', label: 'Home' },
    { id: 'roadmap', label: '4-Year Roadmap' },
    { id: 'careers', label: 'Careers' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'features', label: 'Features' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Official RAAH Logo */}
        <div 
          onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'landing')}
          className="cursor-pointer flex items-center"
        >
          <RaahLogo variant="horizontal" size="md" />
        </div>

        {/* Center: Interactive Nav Buttons with active state */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--primary)] text-[var(--accent)] shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          {isLoggedIn && (
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all duration-200 cursor-pointer ${
                currentPage === 'dashboard'
                  ? 'bg-[var(--primary)] text-[var(--accent)] shadow-xs'
                  : 'text-[var(--secondary)] bg-[var(--secondary-light)] hover:bg-[#FCD8A2]'
              }`}
            >
              My Dashboard
            </button>
          )}
        </nav>

        {/* Right side: Authenticated controls or Login/Get Started */}
        <div className="hidden md:flex items-center gap-3">
          {/* Supabase Database Connection Status Indicator */}
          <button
            onClick={() => setSupabaseModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 border border-emerald-500/30 text-xs font-bold transition cursor-pointer"
            title="Supabase Database: Connected (Project: dtvtwrwxxttfhyurjvgy)"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden lg:inline text-[11px]">Supabase</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifDropdownOpen(!notifDropdownOpen);
                    setProfileDropdownOpen(false);
                  }}
                  className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-xl relative transition cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[var(--accent)] rounded-full ring-2 ring-white animate-pulse" />
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] p-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-[var(--border-light)] px-1">
                      <span className="font-bold text-xs text-[var(--text-primary)]">Notifications</span>
                      <span className="text-[10px] text-[var(--secondary)] font-semibold">
                        {unreadNotificationCount} unread
                      </span>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-2 py-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-[var(--text-muted)] text-center py-4">No notifications yet</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationAsRead(n.id)}
                            className={`p-2 rounded-xl text-xs cursor-pointer transition ${
                              n.read ? 'bg-[var(--surface-subtle)] text-[var(--text-secondary)]' : 'bg-[var(--secondary-light)] border border-[var(--secondary)]/30 text-[var(--text-primary)]'
                            }`}
                          >
                            <p className="font-bold text-xs text-[var(--primary)]">{n.title}</p>
                            <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{n.message}</p>
                            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">{n.time}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotifDropdownOpen(false);
                  }}
                  className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-3 bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] rounded-xl border border-[var(--border)] transition cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-[var(--primary)] text-[var(--accent)] font-bold flex items-center justify-center text-sm shadow-xs shrink-0 select-none">
                    {user.fullName ? user.fullName.trim()[0].toUpperCase() : 'A'}
                  </div>
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-bold text-[var(--text-primary)] leading-none">
                      {user.fullName}
                    </div>
                    <div className="text-[10px] text-[var(--secondary)] font-medium leading-none mt-1">
                      {user.targetCareer}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[var(--surface)] rounded-2xl shadow-xl border border-[var(--border)] p-2 z-50 animate-fadeIn divide-y divide-[var(--border-light)]">
                    <div className="p-2.5">
                      <p className="text-xs font-bold text-[var(--text-primary)]">{user.fullName}</p>
                      <p className="text-[11px] text-[var(--text-secondary)] truncate">{user.email}</p>
                      <p className="text-[10px] text-[var(--secondary)] font-semibold mt-1">
                        🎯 {user.targetCareer} • {user.currentYear}
                      </p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigate('profile');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-[var(--text-secondary)]" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigate('dashboard');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4 text-[var(--text-secondary)]" />
                        <span>Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigate('roadmap');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <Map className="w-4 h-4 text-[var(--text-secondary)]" />
                        <span>My 4-Year Roadmap</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigate('projects');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <FolderGit2 className="w-4 h-4 text-[var(--text-secondary)]" />
                        <span>My Projects</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigate('skills');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-[var(--text-secondary)]" />
                        <span>Career Readiness</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setSupabaseModalOpen(true);
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded-xl flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-emerald-600" />
                          <span>Supabase Database</span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onNavigate('profile');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-[var(--text-secondary)]" />
                        <span>Settings</span>
                      </button>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onOpenAuth('logout');
                        }}
                        className="w-full px-3 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] transition cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--accent)] shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {isLoggedIn && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="w-8 h-8 rounded-lg overflow-hidden bg-[var(--primary)] text-[var(--accent)] font-bold flex items-center justify-center text-xs"
            >
              {user.fullName ? user.fullName[0].toUpperCase() : 'A'}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-xl"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--border)] px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                currentPage === item.id
                  ? 'bg-[var(--primary)] text-[var(--accent)]'
                  : 'text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]'
              }`}
            >
              {item.label}
            </button>
          ))}

          {isLoggedIn ? (
            <div className="pt-2 border-t border-[var(--border-light)] space-y-1">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-[var(--secondary)] bg-[var(--secondary-light)] cursor-pointer"
              >
                Dashboard ({user.fullName})
              </button>
              <button
                onClick={() => handleNavClick('profile')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                My Profile & Settings
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('logout');
                }}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-[var(--border-light)] flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="flex-1 py-2 text-center text-xs font-bold text-[var(--text-primary)] bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] rounded-xl"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="flex-1 py-2 text-center text-xs font-bold text-[var(--accent)] bg-[var(--primary)] hover:bg-[var(--primary-light)] rounded-xl"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}

      {/* Supabase Database Connection Modal */}
      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
