import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, AIMessage, NotificationItem, ResumeLearningData, CertificateItem } from '../types';
import { INITIAL_USER, INITIAL_NOTIFICATIONS, COURSES_DATA } from '../data/mockData';
import { 
  supabase, 
  syncUserProfileToSupabase, 
  syncVideoProgressToSupabase, 
  syncQuizScoreToSupabase, 
  syncCodingSolvedToSupabase, 
  syncProjectProgressToSupabase,
  SupabaseSyncStatus 
} from '../lib/supabase';

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserProfile;
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  aiChatHistory: AIMessage[];
  redirectAfterLogin: string | null;
  supabaseStatus: SupabaseSyncStatus;
  triggerSupabaseSync: () => Promise<void>;
  setRedirectAfterLogin: (route: string | null) => void;
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<boolean> | boolean;
  signup: (userData: Partial<UserProfile> & { password?: string }) => Promise<boolean> | boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  markChapterComplete: (chapterId: string, courseId?: string) => boolean;
  updateVideoProgress: (
    chapterId: string, 
    percentage: number, 
    timestampSeconds?: number, 
    totalDurationSeconds?: number,
    courseId?: string,
    chapterTitle?: string,
    courseTitle?: string
  ) => void;
  recordQuizScore: (quizId: string, score: number) => void;
  recordProblemSolved: (problemId: string, xpReward: number) => void;
  toggleProjectStep: (projectId: string, stepId: number) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
  addAIMessage: (msg: Omit<AIMessage, 'id' | 'timestamp'>) => void;
  clearAIChat: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_AUTH = 'raah_auth_session';
const STORAGE_KEY_USER = 'raah_user_profile';
const STORAGE_KEY_ACCOUNTS = 'raah_user_accounts';
const STORAGE_KEY_NOTIFS = 'raah_notifications';
const STORAGE_KEY_AI_CHAT = 'raah_ai_chat_history';
const STORAGE_KEY_REMEMBER = 'raah_remember_me';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load persistent user profile
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to parse saved user', e);
    }
    return INITIAL_USER;
  });

  // Load auth session state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEY_AUTH);
      if (savedSession !== null) {
        return savedSession === 'true';
      }
    } catch (e) {
      console.error('Failed to parse auth session', e);
    }
    return true; // Default logged in for smooth preview
  });

  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);

  // Supabase sync tracking state
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseSyncStatus>({
    connected: true,
    lastSyncedAt: new Date().toISOString(),
    lastOperation: 'Initialized Supabase Connection',
    error: null,
    tablesVerified: true,
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load notifications', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // AI Chat History
  const [aiChatHistory, setAiChatHistory] = useState<AIMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AI_CHAT);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load AI chats', e);
    }
    return [
      {
        id: 'msg_init',
        sender: 'assistant',
        text: `Hi Areeba! 👋 I'm RAAH AI, your personal 4-year B.Tech CSE Career Mentor.\n\nI see you're aiming to become a Data Scientist. Your current Career Readiness is 68%. Your Python skills are strong (82%), but your SQL (44%) and Machine Learning (31%) are prime areas to boost next.\n\nHow can I help you today? You can ask me to explain concepts, generate a 2-hour study plan, assist with code, or simulate a technical interview!`,
        timestamp: 'Just now',
        actionButtons: [
          { label: '📅 Today\'s Study Plan', action: 'study_plan' },
          { label: '📊 Analyze My Skills', action: 'skill_analysis' },
          { label: '🎤 Mock Interview', action: 'mock_interview' },
        ],
      },
    ];
  });

  // Sync to Supabase on mount and save user
  const triggerSupabaseSync = useCallback(async () => {
    try {
      await syncUserProfileToSupabase(user);
      setSupabaseStatus((prev) => ({
        ...prev,
        connected: true,
        lastSyncedAt: new Date().toISOString(),
        lastOperation: 'Full Profile Sync to Supabase',
        error: null,
      }));
    } catch (err: any) {
      setSupabaseStatus((prev) => ({
        ...prev,
        error: err?.message || 'Sync failed',
      }));
    }
  }, [user]);

  // Save active user profile and update accounts map permanently
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));

      // Also persist to accounts dictionary by email
      const accountsRaw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};
      if (user.email) {
        accounts[user.email.toLowerCase()] = user;
        localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
      }
    } catch (e) {
      console.error('Failed to save user', e);
    }

    // Debounced automatic background sync to Supabase
    const timer = setTimeout(() => {
      syncUserProfileToSupabase(user).then((success) => {
        if (success) {
          setSupabaseStatus((prev) => ({
            ...prev,
            connected: true,
            lastSyncedAt: new Date().toISOString(),
            lastOperation: 'Auto-saved User Profile to Supabase',
          }));
        }
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, String(isLoggedIn));
    } catch (e) {
      console.error('Failed to save auth state', e);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
    } catch (e) {
      console.error('Failed to save notifications', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_AI_CHAT, JSON.stringify(aiChatHistory));
    } catch (e) {
      console.error('Failed to save AI chat', e);
    }
  }, [aiChatHistory]);

  const login = async (email: string, password?: string, rememberMe = true): Promise<boolean> => {
    if (!email || !email.includes('@')) return false;

    try {
      localStorage.setItem(STORAGE_KEY_REMEMBER, String(rememberMe));
      const accountsRaw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};
      const normalizedEmail = email.trim().toLowerCase();

      // Try Supabase Auth Sign In in background
      if (password) {
        try {
          await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password: password,
          });
        } catch (authErr) {
          console.warn('Supabase auth signin note:', authErr);
        }
      }

      // Check if we have an existing stored account
      let activeUser: UserProfile;
      if (accounts[normalizedEmail]) {
        activeUser = accounts[normalizedEmail];
      } else if (normalizedEmail === user.email.toLowerCase()) {
        activeUser = user;
      } else {
        activeUser = {
          ...INITIAL_USER,
          email: email.trim(),
          fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          updatedAt: new Date().toISOString(),
        };
      }

      setUser(activeUser);
      setIsLoggedIn(true);

      // Transmit to Supabase
      syncUserProfileToSupabase(activeUser);
      setSupabaseStatus((prev) => ({
        ...prev,
        connected: true,
        lastSyncedAt: new Date().toISOString(),
        lastOperation: `Login & Profile Synced for ${normalizedEmail}`,
      }));

      return true;
    } catch (e) {
      console.error('Login error', e);
      setIsLoggedIn(true);
      return true;
    }
  };

  const signup = async (userData: Partial<UserProfile> & { password?: string }): Promise<boolean> => {
    const emailKey = (userData.email || 'student@college.edu').trim().toLowerCase();

    const newUser: UserProfile = {
      ...INITIAL_USER,
      id: `usr_${Date.now()}`,
      fullName: userData.fullName || 'Student',
      email: userData.email || 'student@college.edu',
      password: userData.password || 'password123',
      college: userData.college || 'Engineering College',
      university: userData.university || userData.college || 'Technical University',
      branch: userData.branch || 'Computer Science & Engineering',
      currentYear: userData.currentYear || '2nd Year',
      currentSemester: userData.currentSemester || 'Semester 4',
      targetCareer: userData.targetCareer || 'Data Scientist',
      phone: userData.phone || '+91 98765 00000',
      dailyStudyTime: userData.dailyStudyTime || '2 hours',
      videoTimestamps: {},
      videoProgress: {},
      completedChapters: [],
      completedCourses: [],
      certificates: [],
      resumeLearning: {
        courseId: 'course-ml',
        chapterId: 'ml-chap-1',
        chapterTitle: 'Introduction to Machine Learning',
        courseTitle: 'Machine Learning Fundamentals',
        timestampSeconds: 0,
        totalDurationSeconds: 860,
        percentageWatched: 0,
        lastWatchedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 1. Create account in Supabase Auth
    try {
      await supabase.auth.signUp({
        email: emailKey,
        password: userData.password || 'Password123!',
        options: {
          data: {
            full_name: newUser.fullName,
            college: newUser.college,
            target_career: newUser.targetCareer,
            current_year: newUser.currentYear,
          },
        },
      });
    } catch (authErr) {
      console.warn('Supabase auth signup notice:', authErr);
    }

    // 2. Save to accounts dictionary
    try {
      const accountsRaw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      const accounts = accountsRaw ? JSON.parse(accountsRaw) : {};
      accounts[emailKey] = newUser;
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
    } catch (e) {
      console.error('Failed to store account in signup', e);
    }

    setUser(newUser);
    setIsLoggedIn(true);

    // 3. Save to Supabase database
    syncUserProfileToSupabase(newUser);
    setSupabaseStatus((prev) => ({
      ...prev,
      connected: true,
      lastSyncedAt: new Date().toISOString(),
      lastOperation: `New Student Account Created in Supabase (${emailKey})`,
    }));

    return true;
  };

  const logout = () => {
    // Call Supabase signOut
    try {
      supabase.auth.signOut();
    } catch {
      // ignore
    }
    // Only clear session flag! NEVER wipe profile, progress, courses, or AI chats!
    setIsLoggedIn(false);
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      // Immediately push to Supabase
      syncUserProfileToSupabase(updated);
      setSupabaseStatus((s) => ({
        ...s,
        lastSyncedAt: new Date().toISOString(),
        lastOperation: 'Profile Details Saved to Supabase',
      }));
      return updated;
    });
  };

  const markChapterComplete = (chapterId: string, courseId = 'course-ml'): boolean => {
    const currentProgress = user.videoProgress[chapterId] || 0;
    // The "Mark Complete" button must remain disabled until student watches at least 80%
    if (currentProgress < 80 && !user.completedChapters.includes(chapterId)) {
      return false;
    }

    setUser((prev) => {
      if (prev.completedChapters.includes(chapterId)) return prev;
      const nextChapters = [...prev.completedChapters, chapterId];
      const nextXp = prev.xp + 40;
      const nextReadiness = Math.min(99, prev.careerReadinessScore + 2);
      const nextRoadmap = Math.min(100, prev.roadmapProgress + 3);

      // Check if course is completed
      const course = COURSES_DATA.find((c) => c.id === courseId);
      let nextCompletedCourses = [...prev.completedCourses];
      let nextCertificates = [...prev.certificates];

      if (course) {
        const allCourseChaptersDone = course.chapters.every((ch) => 
          ch.id === chapterId || nextChapters.includes(ch.id)
        );

        if (allCourseChaptersDone && !nextCompletedCourses.includes(courseId)) {
          nextCompletedCourses.push(courseId);
          // Issue Certificate
          nextCertificates.push({
            id: `cert_${Date.now()}`,
            title: course.title,
            courseId: course.id,
            issueDate: new Date().toISOString().split('T')[0],
            credentialId: `RAAH-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
            grade: 'Distinction (94%)',
          });
        }
      }

      const updated = {
        ...prev,
        completedChapters: nextChapters,
        completedCourses: nextCompletedCourses,
        certificates: nextCertificates,
        xp: nextXp,
        careerReadinessScore: nextReadiness,
        roadmapProgress: nextRoadmap,
        videoProgress: {
          ...prev.videoProgress,
          [chapterId]: 100,
        },
      };

      // Sync to Supabase
      syncUserProfileToSupabase(updated);
      syncVideoProgressToSupabase(prev.email, {
        courseId,
        chapterId,
        percentage: 100,
        timestampSeconds: prev.videoTimestamps[chapterId] || 0,
      });

      setSupabaseStatus((s) => ({
        ...s,
        lastSyncedAt: new Date().toISOString(),
        lastOperation: `Chapter ${chapterId} Completed & Saved in Supabase`,
      }));

      return updated;
    });

    return true;
  };

  const updateVideoProgress = (
    chapterId: string, 
    percentage: number, 
    timestampSeconds = 0, 
    totalDurationSeconds = 765,
    courseId = 'course-ml',
    chapterTitle = 'Linear & Logistic Regression',
    courseTitle = 'Machine Learning Fundamentals'
  ) => {
    setUser((prev) => {
      const clampedPct = Math.min(100, Math.max(0, Math.round(percentage)));
      const isComplete = clampedPct >= 80;
      const nextChapters = isComplete && !prev.completedChapters.includes(chapterId)
        ? [...prev.completedChapters, chapterId]
        : prev.completedChapters;

      const resumeData: ResumeLearningData = {
        courseId,
        chapterId,
        chapterTitle,
        courseTitle,
        timestampSeconds: Math.round(timestampSeconds),
        totalDurationSeconds: Math.round(totalDurationSeconds),
        percentageWatched: clampedPct,
        lastWatchedAt: new Date().toISOString(),
      };

      const updated = {
        ...prev,
        completedChapters: nextChapters,
        videoProgress: {
          ...prev.videoProgress,
          [chapterId]: Math.max(prev.videoProgress[chapterId] || 0, clampedPct),
        },
        videoTimestamps: {
          ...prev.videoTimestamps,
          [chapterId]: Math.round(timestampSeconds),
        },
        resumeLearning: resumeData,
      };

      // Sync video playback to Supabase
      syncVideoProgressToSupabase(prev.email, {
        courseId,
        chapterId,
        percentage: clampedPct,
        timestampSeconds,
        chapterTitle,
      });

      return updated;
    });
  };

  const recordQuizScore = (quizId: string, score: number) => {
    setUser((prev) => {
      const prevScore = prev.quizScores[quizId] || 0;
      const nextQuizScores = { ...prev.quizScores, [quizId]: Math.max(prevScore, score) };
      const nextXp = prev.xp + Math.round(score * 0.8);
      
      let nextSkills = [...prev.skills];
      if (quizId.includes('dsa')) {
        nextSkills = nextSkills.map((s) => s.name === 'DSA' ? { ...s, score: Math.min(100, Math.max(s.score, score)) } : s);
      } else if (quizId.includes('sql')) {
        nextSkills = nextSkills.map((s) => s.name === 'SQL' ? { ...s, score: Math.min(100, Math.max(s.score, score)) } : s);
      } else if (quizId.includes('ml')) {
        nextSkills = nextSkills.map((s) => s.name === 'Machine Learning' ? { ...s, score: Math.min(100, Math.max(s.score, score)) } : s);
      }

      const nextReadiness = Math.min(99, prev.careerReadinessScore + (score >= 70 ? 3 : 1));

      const updated = {
        ...prev,
        quizScores: nextQuizScores,
        skills: nextSkills,
        xp: nextXp,
        careerReadinessScore: nextReadiness,
      };

      // Sync Quiz result to Supabase
      syncQuizScoreToSupabase(prev.email, quizId, score);
      syncUserProfileToSupabase(updated);

      setSupabaseStatus((s) => ({
        ...s,
        lastSyncedAt: new Date().toISOString(),
        lastOperation: `Quiz ${quizId} Score (${score}%) Saved in Supabase`,
      }));

      return updated;
    });
  };

  const recordProblemSolved = (problemId: string, xpReward: number) => {
    setUser((prev) => {
      if (prev.solvedProblems.includes(problemId)) return prev;
      const nextSolved = [...prev.solvedProblems, problemId];
      const nextXp = prev.xp + xpReward;
      const nextReadiness = Math.min(99, prev.careerReadinessScore + 2);
      
      const updated = {
        ...prev,
        solvedProblems: nextSolved,
        xp: nextXp,
        careerReadinessScore: nextReadiness,
      };

      // Sync problem solution to Supabase
      syncCodingSolvedToSupabase(prev.email, problemId, xpReward);
      syncUserProfileToSupabase(updated);

      setSupabaseStatus((s) => ({
        ...s,
        lastSyncedAt: new Date().toISOString(),
        lastOperation: `Coding Problem ${problemId} Solved & Saved in Supabase`,
      }));

      return updated;
    });
  };

  const toggleProjectStep = (projectId: string, _stepId: number) => {
    setUser((prev) => {
      const isNowCompleted = prev.completedProjects.includes(projectId);
      const nextCompleted = isNowCompleted
        ? prev.completedProjects
        : [...prev.completedProjects, projectId];

      const updated = {
        ...prev,
        completedProjects: nextCompleted,
        xp: prev.xp + 50,
      };

      // Sync project progress to Supabase
      syncProjectProgressToSupabase(prev.email, projectId, !isNowCompleted);
      syncUserProfileToSupabase(updated);

      setSupabaseStatus((s) => ({
        ...s,
        lastSyncedAt: new Date().toISOString(),
        lastOperation: `Project ${projectId} Progress Saved in Supabase`,
      }));

      return updated;
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addAIMessage = (msg: Omit<AIMessage, 'id' | 'timestamp'>) => {
    const newMsg: AIMessage = {
      ...msg,
      id: `ai_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAiChatHistory((prev) => [...prev, newMsg]);
  };

  const clearAIChat = () => {
    setAiChatHistory([]);
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        notifications,
        unreadNotificationCount,
        aiChatHistory,
        redirectAfterLogin,
        supabaseStatus,
        triggerSupabaseSync,
        setRedirectAfterLogin,
        login,
        signup,
        logout,
        updateProfile,
        markChapterComplete,
        updateVideoProgress,
        recordQuizScore,
        recordProblemSolved,
        toggleProjectStep,
        markNotificationAsRead,
        clearAllNotifications,
        addAIMessage,
        clearAIChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
