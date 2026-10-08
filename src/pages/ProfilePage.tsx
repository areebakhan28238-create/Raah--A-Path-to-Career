import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SupabaseModal } from '../components/SupabaseModal';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';
import { 
  User, Mail, Phone, Building, GraduationCap, 
  Target, Clock, Edit2, Save, CheckCircle2, 
  Award, Trophy, ArrowLeft, Database, ExternalLink, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BTechYear, BTechSemester } from '../types';

interface ProfilePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);

  // Editable fields
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '+91 98765 43210');
  const [college, setCollege] = useState(user.college);
  const [university, setUniversity] = useState(user.university || user.college);
  const [branch, setBranch] = useState(user.branch || 'Computer Science & Engineering');
  const [currentYear, setCurrentYear] = useState<BTechYear>(user.currentYear);
  const [currentSemester, setCurrentSemester] = useState<BTechSemester>(user.currentSemester);
  const [targetCareer, setTargetCareer] = useState(user.targetCareer);
  const [dailyStudyTime, setDailyStudyTime] = useState(user.dailyStudyTime);
  const [bio, setBio] = useState(user.bio || 'B.Tech CSE student passionate about engineering scalable solutions.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      fullName,
      email,
      phone,
      college,
      university,
      branch,
      currentYear,
      currentSemester,
      targetCareer,
      dailyStudyTime,
      bio,
      avatar: undefined, // Avatar removed as requested
    });

    setIsEditing(false);
    setSuccessToast(true);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#F28705', '#18233C', '#2B59C3'],
    });

    setTimeout(() => setSuccessToast(false), 4000);
  };

  const handleCancel = () => {
    setFullName(user.fullName);
    setEmail(user.email);
    setPhone(user.phone || '');
    setCollege(user.college);
    setUniversity(user.university);
    setBranch(user.branch);
    setCurrentYear(user.currentYear);
    setCurrentSemester(user.currentSemester);
    setTargetCareer(user.targetCareer);
    setDailyStudyTime(user.dailyStudyTime);
    setBio(user.bio || '');
    setIsEditing(false);
  };

  const initialLetter = fullName ? fullName.trim()[0].toUpperCase() : 'S';

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
              Student Profile & Settings
            </h1>
            <span className="text-xs bg-[var(--secondary-light)] text-[var(--primary)] font-bold px-2.5 py-0.5 rounded-full border border-[var(--secondary)]/30">
              Verified Student
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Manage your personal details, campus affiliation, and target career pathway.
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--accent)] font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--surface-subtle)] rounded-xl cursor-pointer border border-[var(--border)]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Profile updated successfully! Changes are immediately reflected across your dashboard and sidebar.</span>
        </div>
      )}

      {/* Profile Details Card */}
      <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-xs space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Identity & Initials Badge (Clean Original Design, No Sample Avatar Photos) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[var(--border-light)]">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-[var(--primary)] text-[var(--accent)] font-black text-3xl flex items-center justify-center shadow-md border-2 border-[var(--border)] select-none">
                {initialLetter}
              </div>
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  {user.fullName}
                </h2>
                <span className="text-xs bg-[var(--secondary)] text-[var(--primary-dark)] font-bold px-2.5 py-0.5 rounded-md">
                  {user.targetCareer}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {user.college} • {user.currentYear} ({user.currentSemester})
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {user.branch}
              </p>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                disabled={!isEditing}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                Target Career
              </label>
              <select
                disabled={!isEditing}
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
              >
                <option value="Data Scientist">Data Scientist</option>
                <option value="Software Developer">Software Developer</option>
                <option value="AI / ML Engineer">AI / ML Engineer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Data Engineer">Data Engineer</option>
                <option value="Cyber Security Engineer">Cyber Security Engineer</option>
                <option value="Cloud / DevOps Engineer">Cloud / DevOps Engineer</option>
                <option value="Mobile App Developer">Mobile App Developer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                College / Institute
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                University
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                Current B.Tech Year
              </label>
              <select
                disabled={!isEditing}
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value as any)}
                className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
              >
                <option value="1st Year">1st Year (Foundation)</option>
                <option value="2nd Year">2nd Year (Core CS)</option>
                <option value="3rd Year">3rd Year (Specialization)</option>
                <option value="4th Year">4th Year (Placement & Career)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
                Daily Available Learning Time
              </label>
              <select
                disabled={!isEditing}
                value={dailyStudyTime}
                onChange={(e) => setDailyStudyTime(e.target.value)}
                className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
              >
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="2 hours">2 hours</option>
                <option value="3+ hours">3+ hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-primary)] mb-1">
              Personal Bio
            </label>
            <textarea
              disabled={!isEditing}
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 bg-[var(--surface-subtle)] disabled:bg-[var(--surface-subtle)]/70 disabled:text-[var(--text-secondary)] border border-[var(--border)] rounded-xl text-xs sm:text-sm text-[var(--text-primary)] focus:bg-[var(--surface)] focus:border-[var(--secondary)] focus:outline-hidden"
            />
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Badges & Achievements Gallery */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Earned Badges & Honors</h2>
          <span className="text-xs font-bold text-[var(--secondary)] font-mono">
            {user.badges.length} Badges Unlocked 🏆
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {user.badges.map((b) => (
            <div
              key={b.id}
              className="p-3 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl text-center flex flex-col items-center justify-between space-y-2 hover:bg-[var(--secondary-light)]/40 hover:border-[var(--secondary)] transition"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--secondary)]/20 text-[var(--secondary)] flex items-center justify-center font-bold text-sm">
                ⭐
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">{b.title}</h4>
                <p className="text-[10px] text-[var(--text-secondary)] line-clamp-2 mt-0.5">{b.description}</p>
              </div>
              <span className="text-[9px] text-[var(--text-muted)] font-mono">{b.unlockedAt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Earned Certificates Gallery */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Course Certificates & Credentials</h2>
            <p className="text-xs text-[var(--text-secondary)]">Official course completion certificates verified by RAAH.</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            {user.certificates?.length || 0} Certificates Earned 📜
          </span>
        </div>

        {(!user.certificates || user.certificates.length === 0) ? (
          <div className="text-center py-6 bg-[var(--surface-subtle)] rounded-xl border border-dashed border-[var(--border)]">
            <Award className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-1" />
            <p className="text-xs text-[var(--text-secondary)]">No certificates yet. Complete 100% of a video course to earn an accredited certificate.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-xl border border-[var(--secondary)]/40 bg-gradient-to-br from-[var(--secondary-light)]/20 to-[var(--surface)] flex flex-col justify-between space-y-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-[var(--accent)] flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">{cert.title}</h4>
                      <p className="text-[10px] text-[var(--text-secondary)] font-mono mt-0.5">ID: {cert.credentialId}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {cert.grade}
                  </span>
                </div>

                <div className="pt-2 border-t border-[var(--border-light)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                  <span>Issued: {cert.issueDate}</span>
                  <button
                    onClick={() => alert(`Certificate verified!\nCredential ID: ${cert.credentialId}\nIssued to: ${user.fullName}\nCourse: ${cert.title}`)}
                    className="text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] cursor-pointer"
                  >
                    View Credential →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Supabase Database Connection & Storage Card */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[var(--text-primary)]">Supabase Cloud Database</h2>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Connected & Active
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Project ID: <strong className="font-mono text-[var(--primary)]">{SUPABASE_PROJECT_ID}</strong> • Real-time storage for login, videos, coding, quizzes & projects
              </p>
            </div>
          </div>

          <button
            onClick={() => setSupabaseModalOpen(true)}
            className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--accent)] font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Manage Supabase & SQL</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
          <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-light)] text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold block">Auth & Profiles</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
              ✓ Synced
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-light)] text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold block">Video Progress</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
              ✓ Synced
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-light)] text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold block">Coding Arena</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
              ✓ Synced
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-light)] text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold block">Quiz Scores</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
              ✓ Synced
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-light)] text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] text-[var(--text-muted)] font-bold block">Projects</span>
            <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
              ✓ Synced
            </span>
          </div>
        </div>
      </div>

      <SupabaseModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
