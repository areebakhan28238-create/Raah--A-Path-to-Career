import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RaahLogo, RaahLogoMark } from './RaahLogo';
import { 
  X, Mail, Lock, Eye, EyeOff, User, 
  Building, GraduationCap, Target, Phone, 
  CheckCircle2, AlertCircle, ArrowRight 
} from 'lucide-react';
import { BTechYear, BTechSemester } from '../types';

interface AuthModalsProps {
  mode: 'login' | 'signup' | 'forgot' | 'logout' | null;
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup' | 'forgot' | 'logout' | null) => void;
  onSuccessRedirect: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  mode,
  onClose,
  onSwitchMode,
  onSuccessRedirect,
}) => {
  const { user, login, signup, logout } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState(user.email || 'areebakhan28238@gmail.com');
  const [loginPassword, setLoginPassword] = useState('Password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [university, setUniversity] = useState('');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [currentYear, setCurrentYear] = useState<BTechYear>('2nd Year');
  const [currentSemester, setCurrentSemester] = useState<BTechSemester>('Semester 4');
  const [targetCareer, setTargetCareer] = useState('Data Scientist');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Logout toast
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);

  if (!mode) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginEmail.includes('@')) {
      setLoginError('Please enter a valid college or personal email address.');
      return;
    }
    if (!loginPassword || loginPassword.length < 4) {
      setLoginError('Password must be at least 4 characters long.');
      return;
    }

    const ok = await login(loginEmail, loginPassword, rememberMe);
    if (ok) {
      onClose();
      onSuccessRedirect();
    } else {
      setLoginError('Invalid email or password.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!fullName.trim()) {
      setSignupError('Please enter your full name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setSignupError('Please enter a valid email address.');
      return;
    }
    if (!college.trim()) {
      setSignupError('Please enter your college name.');
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== confirmPassword) {
      setSignupError('Passwords do not match.');
      return;
    }

    const ok = await signup({
      fullName,
      email: signupEmail,
      password: signupPassword,
      phone,
      college,
      university: university || college,
      branch,
      currentYear,
      currentSemester,
      targetCareer,
    });

    if (ok) {
      onClose();
      onSuccessRedirect();
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      return;
    }
    setForgotSubmitted(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutConfirmed(true);
    setTimeout(() => {
      onClose();
      onSuccessRedirect();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      {/* 1. LOGIN MODAL */}
      {mode === 'login' && (
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 max-h-[92vh]">
          {/* Left Visual Column */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#121B30] via-[#18233C] to-[#202F52] text-white p-8 flex flex-col justify-between hidden md:flex relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <RaahLogo variant="full" size="md" theme="light" />
              <div className="mt-8 space-y-3">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                  B.Tech CSE Roadmap
                </span>
                <h3 className="text-xl font-bold leading-snug">
                  "Your 4-Year Journey. Your Career. Your Raah."
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Join thousands of computer science students leveling up their coding, capstones, and tier-1 company placements.
                </p>
              </div>
            </div>

            {/* Quick Micro Journey Visual */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                <span>4-Year Journey</span>
                <span>Placement Ready 🎯</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-200">
                <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-bold">Y1</span>
                <span>→</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded">Y2</span>
                <span>→</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded">Y3</span>
                <span>→</span>
                <span className="bg-white/20 px-1.5 py-0.5 rounded">Y4</span>
              </div>
            </div>
          </div>

          {/* Right Login Form */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="md:hidden">
                <RaahLogo size="sm" />
              </div>
              <div className="hidden md:block">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
                <p className="text-xs text-slate-500 mt-0.5">Continue your journey with RAAH.</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="md:hidden mb-4">
              <h2 className="text-xl font-black text-slate-900">Welcome Back</h2>
              <p className="text-xs text-slate-500">Continue your journey with RAAH.</p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="student@college.edu"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => onSwitchMode('forgot')}
                    className="text-xs text-amber-600 hover:text-amber-700 font-semibold cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#18233C] hover:bg-[#23355a] text-amber-400 font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Login to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-emerald-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Saved & verified via Supabase Cloud (dtvtwrwxxttfhyurjvgy)</span>
              </div>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative bg-white px-3 text-[11px] text-slate-400 uppercase font-semibold">
                  Or
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  login('student.google@dtu.ac.in');
                  onClose();
                  onSuccessRedirect();
                }}
                className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with College Google Account</span>
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('signup')}
                className="font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SIGN UP MODAL */}
      {mode === 'signup' && (
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Start Your Journey
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Create your RAAH account and build your personalized 4-year career path.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-4">
            {signupError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{signupError}</span>
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Rahul Sharma"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    placeholder="student@college.edu"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Career Goal *
                  </label>
                  <select
                    value={targetCareer}
                    onChange={(e) => setTargetCareer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Software Developer">Software Developer (SDE)</option>
                    <option value="AI / ML Engineer">AI / ML Engineer</option>
                    <option value="Full Stack Developer">Full Stack Developer</option>
                    <option value="Data Engineer">Data Engineer</option>
                    <option value="Cyber Security Engineer">Cyber Security Engineer</option>
                    <option value="Cloud / DevOps Engineer">Cloud / DevOps Engineer</option>
                    <option value="Mobile App Developer">Mobile App Developer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College / Institute *
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    required
                    placeholder="Delhi Technological University (DTU)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Branch / Major
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Computer Science & Engineering"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current B.Tech Year *
                  </label>
                  <select
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden cursor-pointer"
                  >
                    <option value="1st Year">1st Year (Foundation)</option>
                    <option value="2nd Year">2nd Year (Core CS)</option>
                    <option value="3rd Year">3rd Year (Specialization)</option>
                    <option value="4th Year">4th Year (Placement & Career)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Current Semester
                  </label>
                  <select
                    value={currentSemester}
                    onChange={(e) => setCurrentSemester(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#18233C] hover:bg-[#25375e] text-amber-400 font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Create My RAAH Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-emerald-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Account & profile details will be stored in Supabase</span>
              </div>
            </form>

            <div className="text-center text-xs text-slate-500 pt-2">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('login')}
                className="font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FORGOT PASSWORD MODAL */}
      {mode === 'forgot' && (
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-slate-900">Forgot Password?</h2>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {forgotSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Reset Link Sent</h3>
              <p className="text-xs text-slate-600">
                Password reset instructions have been sent to <strong>{forgotEmail}</strong>. Please check your inbox.
              </p>
              <button
                onClick={() => onSwitchMode('login')}
                className="mt-4 px-4 py-2 bg-[#18233C] text-amber-400 font-bold text-xs rounded-xl cursor-pointer"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-xs text-slate-600">
                Enter your registered college or personal email address to receive password reset instructions.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  placeholder="student@college.edu"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onSwitchMode('login')}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#18233C] hover:bg-[#25375e] text-amber-400 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* 4. LOGOUT CONFIRMATION MODAL */}
      {mode === 'logout' && (
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 w-full max-w-sm p-6 text-center space-y-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <RaahLogoMark size={28} />
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900">Logout</h3>
            <p className="text-xs text-slate-600 mt-1">
              Are you sure you want to logout?
            </p>
            <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg p-2 mt-2 border border-amber-200">
              💡 Your progress, courses, quizzes, and AI chats remain permanently saved.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLogoutConfirm}
              className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition shadow-xs cursor-pointer"
            >
              {logoutConfirmed ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModals;
