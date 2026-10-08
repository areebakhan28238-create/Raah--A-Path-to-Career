import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/mockData';
import { VideoPlayer } from '../components/VideoPlayer';
import { DiscussionComment, QuizQuestion } from '../types';
import { 
  CheckCircle2, ArrowLeft, ArrowRight, 
  BookOpen, Code, HelpCircle, Sparkles, FileText, 
  Download, Copy, Check, MessageSquare, ThumbsUp, 
  Send, Lock, Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CoursePageProps {
  courseId?: string;
  onNavigate: (page: string, params?: any) => void;
  onAskAI?: (prompt: string) => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({
  courseId = 'course-ml',
  onNavigate,
  onAskAI,
}) => {
  const { user, markChapterComplete, updateVideoProgress } = useAuth();

  const course = COURSES_DATA.find((c) => c.id === courseId) || COURSES_DATA[0];

  // Resume from last watched lesson in resumeLearning if matching this course
  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    if (user.resumeLearning && user.resumeLearning.courseId === course.id) {
      const exists = course.chapters.find((ch) => ch.id === user.resumeLearning?.chapterId);
      if (exists) return exists.id;
    }
    const incomplete = course.chapters.find((ch) => !user.completedChapters.includes(ch.id));
    return incomplete ? incomplete.id : course.chapters[0].id;
  });

  const currentChapterIdx = course.chapters.findIndex((c) => c.id === activeChapterId);
  const currentChapter = course.chapters[currentChapterIdx] || course.chapters[0];

  const currentProgress = user.videoProgress[currentChapter.id] || 0;
  const currentTimestamp = user.videoTimestamps?.[currentChapter.id] || 0;
  const isCompleted = user.completedChapters.includes(currentChapter.id);
  const isWatchRequirementMet = currentProgress >= 80;

  const completedCount = course.chapters.filter((ch) => user.completedChapters.includes(ch.id)).length;
  const courseOverallProgress = Math.round((completedCount / course.chapters.length) * 100);

  // Active section tab below video
  const [activeTab, setActiveTab] = useState<'notes' | 'code' | 'quiz' | 'discussion' | 'resources'>('notes');

  // Copy code state
  const [copiedCode, setCopiedCode] = useState(false);

  // Lesson Quiz State
  const defaultLessonQuiz: QuizQuestion[] = [
    {
      id: `lq1_${currentChapter.id}`,
      question: `What is the primary optimization objective discussed in "${currentChapter.title}"?`,
      options: [
        'Minimizing the loss/cost function via iterative updates',
        'Increasing RAM memory consumption',
        'Maximizing model parameters arbitrarily',
        'Eliminating all training samples'
      ],
      correctIndex: 0,
      explanation: 'Supervised machine learning algorithms fit parameters by minimizing a formulated cost function (such as MSE or Cross-Entropy).',
      topicTag: 'Model Optimization'
    },
    {
      id: `lq2_${currentChapter.id}`,
      question: 'Why should training and testing data always remain separate in production pipelines?',
      options: [
        'To speed up CPU clock cycles',
        'To evaluate true generalization on unseen real-world data and prevent data leakage',
        'Because test data is not compatible with NumPy arrays',
        'To compress the model weights into smaller files'
      ],
      correctIndex: 1,
      explanation: 'Evaluating on the training set leads to false optimism. Testing on held-out samples measures true real-world generalization.',
      topicTag: 'Validation Methodology'
    }
  ];

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Discussion Thread State
  const [comments, setComments] = useState<DiscussionComment[]>([
    {
      id: 'c1',
      authorName: 'Aditya Verma',
      authorRole: 'Student',
      text: `When computing the partial derivatives for gradient descent in this lesson, should we normalize the learning rate if the features have different scales?`,
      timestamp: '2 hours ago',
      likes: 6,
      userLiked: false,
    },
    {
      id: 'c2',
      authorName: 'Dr. Rajesh Sharma',
      authorRole: 'Mentor',
      text: `Great question Aditya! Yes, applying StandardScaler or MinMaxScaler ensures all gradients descend symmetrically towards the global minimum instead of oscillating.`,
      timestamp: '1 hour ago',
      likes: 12,
      userLiked: true,
    },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  // Handle video progress updates
  const handleVideoProgress = (percentage: number, currentTimeSeconds: number, totalDurationSeconds: number) => {
    updateVideoProgress(
      currentChapter.id, 
      percentage, 
      currentTimeSeconds, 
      totalDurationSeconds,
      course.id,
      currentChapter.title,
      course.title
    );
  };

  // Handle Mark Complete button
  const handleCompleteChapter = () => {
    if (!isWatchRequirementMet && !isCompleted) {
      alert(`Please watch at least 80% of the lesson before marking complete. (Current: ${Math.round(currentProgress)}%)`);
      return;
    }

    const success = markChapterComplete(currentChapter.id, course.id);
    if (success) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#10B981'],
      });
    }
  };

  // Download Notes
  const handleDownloadNotes = () => {
    const notesContent = `# ${course.title}
## ${currentChapter.title}
Duration: ${currentChapter.duration}
Student: ${user.fullName} (${user.college})
Date: ${new Date().toLocaleDateString()}

### Learning Objectives:
${currentChapter.objectives.map((o) => `- ${o}`).join('\n')}

### Concept Summary:
${currentChapter.summary}

### Concept Deep Dive:
${currentChapter.conceptExplanation}

${currentChapter.codeSnippet ? `### Code Implementation (${currentChapter.codeSnippet.language}):\n\`\`\`${currentChapter.codeSnippet.language}\n${currentChapter.codeSnippet.code}\n\`\`\`` : ''}

### Practice Exercise:
${currentChapter.exercise}

---
Generated by RAAH — Your Path to Career
`;

    const blob = new Blob([notesContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentChapter.id}_lecture_notes.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    if (currentChapter.codeSnippet?.code) {
      navigator.clipboard.writeText(currentChapter.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  // Post Discussion Comment
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const userComment: DiscussionComment = {
      id: `comm_${Date.now()}`,
      authorName: user.fullName || 'Student',
      authorRole: 'Student',
      avatar: user.avatar,
      text: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0,
      userLiked: false,
    };

    setComments((prev) => [userComment, ...prev]);
    setNewCommentText('');

    // Simulate realistic instant mentor reply
    setTimeout(() => {
      const mentorReply: DiscussionComment = {
        id: `mentor_${Date.now()}`,
        authorName: 'RAAH AI Mentor',
        authorRole: 'Mentor',
        text: `Thanks for asking, ${user.fullName}! In Chapter "${currentChapter.title}", remember that understanding the intuition behind the math makes the code 10x easier to debug in technical interviews. Keep it up!`,
        timestamp: 'Just now',
        likes: 1,
        userLiked: false,
      };
      setComments((prev) => [mentorReply, ...prev]);
    }, 1500);
  };

  const toggleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const nextLiked = !c.userLiked;
          return {
            ...c,
            likes: nextLiked ? c.likes + 1 : c.likes - 1,
            userLiked: nextLiked,
          };
        }
        return c;
      })
    );
  };

  const goToNextChapter = () => {
    if (currentChapterIdx < course.chapters.length - 1) {
      setActiveChapterId(course.chapters[currentChapterIdx + 1].id);
      setSelectedQuizAnswers({});
      setQuizSubmitted(false);
    }
  };

  const goToPrevChapter = () => {
    if (currentChapterIdx > 0) {
      setActiveChapterId(course.chapters[currentChapterIdx - 1].id);
      setSelectedQuizAnswers({});
      setQuizSubmitted(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Course Header */}
      <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5 transition cursor-pointer mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {course.title}
            </h1>
            <span className="text-xs bg-[var(--secondary-light)] text-[var(--secondary)] font-bold px-2.5 py-0.5 rounded-full border border-[var(--secondary)]/30">
              {course.level}
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {course.category} • {course.chapters.length} Chapters • ~{course.estimatedHours} Hours
          </p>
        </div>

        {/* Course Progress */}
        <div className="bg-[var(--surface-subtle)] border border-[var(--border)] p-3 rounded-xl min-w-[210px] text-right">
          <div className="flex items-center justify-between text-xs font-semibold mb-1 text-[var(--text-primary)]">
            <span>Course Completion</span>
            <span className="font-bold text-[var(--secondary)]">{courseOverallProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] rounded-full transition-all duration-500"
              style={{ width: `${courseOverallProgress}%` }}
            />
          </div>
          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
            {completedCount} of {course.chapters.length} chapters completed
          </span>
        </div>
      </div>

      {/* Main Grid: Video + Content (Left 8 cols) & Chapter Syllabus List (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real Working Video Player + Chapter Workbench */}
        <div className="lg:col-span-8 space-y-6">
          {/* Real Working Video Player */}
          <VideoPlayer
            key={currentChapter.id}
            videoUrl={currentChapter.videoUrl}
            chapterTitle={currentChapter.title}
            initialProgress={currentProgress}
            initialTimestamp={currentTimestamp}
            durationStr={currentChapter.duration}
            durationSeconds={currentChapter.durationSeconds || 765}
            onProgressUpdate={handleVideoProgress}
            onComplete={handleCompleteChapter}
            isCompleted={isCompleted}
          />

          {/* Lesson Action Bar & Navigation Tabs */}
          <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between border-b border-[var(--border-light)] pb-4 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                  Chapter 0{currentChapterIdx + 1} of {course.chapters.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mt-0.5">
                  {currentChapter.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-secondary)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--secondary)]" />
                  <span>Duration: {currentChapter.duration}</span>
                  <span>•</span>
                  <span>Watch Progress: <strong className={isWatchRequirementMet ? 'text-emerald-600' : 'text-[var(--secondary)]'}>{Math.round(currentProgress)}%</strong></span>
                </div>
              </div>

              {/* Mark Complete Action Button (Enforces 80% Rule) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCompleteChapter}
                  disabled={!isWatchRequirementMet && !isCompleted}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isWatchRequirementMet
                      ? 'bg-[var(--primary)] text-[var(--accent)] hover:bg-[var(--primary-light)]'
                      : 'bg-[var(--surface-subtle)] text-[var(--text-muted)] border border-[var(--border)] cursor-not-allowed opacity-75'
                  }`}
                  title={!isWatchRequirementMet && !isCompleted ? 'Must watch 80% of video to unlock' : 'Mark as complete'}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : !isWatchRequirementMet ? (
                    <Lock className="w-4 h-4 text-[var(--text-muted)]" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />
                  )}
                  <span>
                    {isCompleted ? 'Completed ✓' : isWatchRequirementMet ? 'Mark as Complete (+40 XP)' : `Locked (${Math.round(currentProgress)}% / 80%)`}
                  </span>
                </button>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[var(--border-light)] pb-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'notes' ? 'bg-[var(--primary)] text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lesson Notes</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'code' ? 'bg-[var(--primary)] text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Code Examples</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'quiz' ? 'bg-[var(--primary)] text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Lesson Quiz</span>
              </button>

              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'discussion' ? 'bg-[var(--primary)] text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discussion ({comments.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'resources' ? 'bg-[var(--primary)] text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Resources</span>
              </button>
            </div>

            {/* TAB 1: LESSON NOTES & OBJECTIVES */}
            {activeTab === 'notes' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[var(--secondary)]" />
                    <span>Learning Objectives</span>
                  </h3>
                  <button
                    onClick={handleDownloadNotes}
                    className="text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] flex items-center gap-1.5 bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] px-3 py-1.5 rounded-lg border border-[var(--border)] transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Notes (.md)</span>
                  </button>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-primary)] bg-[var(--surface-subtle)] p-4 rounded-xl border border-[var(--border)]">
                  {currentChapter.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Concept Deep Dive & Notes
                  </h3>
                  <div className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-line bg-[var(--secondary-light)]/30 p-4 rounded-xl border border-[var(--secondary)]/30">
                    {currentChapter.conceptExplanation}
                  </div>
                </div>

                {/* Practice Exercise Callout */}
                <div className="bg-[var(--surface-subtle)] p-4 rounded-xl border border-[var(--border)] space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[var(--secondary)]" />
                    <span>Practice Exercise</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    {currentChapter.exercise}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => onNavigate('coding', 'prob-two-sum')}
                      className="text-xs bg-[var(--primary)] text-[var(--accent)] font-bold px-3 py-1.5 rounded-lg hover:bg-[var(--primary-light)] transition cursor-pointer"
                    >
                      Practice in Code Editor
                    </button>
                    <button
                      onClick={() => onAskAI && onAskAI(`Explain Chapter ${currentChapterIdx + 1}: "${currentChapter.title}" in simple beginner terms with a real-world example.`)}
                      className="text-xs bg-[var(--secondary-light)] text-[var(--primary)] border border-[var(--secondary)]/40 font-bold px-3 py-1.5 rounded-lg hover:bg-[#FCD8A2] transition cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--secondary)]" />
                      <span>Ask RAAH AI to Explain</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CODE EXAMPLES */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-[var(--primary)]" />
                    <span>Python Code Example</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyCode}
                      className="text-xs font-bold text-[var(--text-primary)] bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] px-3 py-1.5 rounded-lg border border-[var(--border)] flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                    <button
                      onClick={() => onNavigate('coding', 'prob-two-sum')}
                      className="text-xs font-bold bg-[var(--primary)] text-[var(--accent)] px-3 py-1.5 rounded-lg hover:bg-[var(--primary-light)] transition cursor-pointer"
                    >
                      Run in Coding Arena →
                    </button>
                  </div>
                </div>

                <div className="bg-[#0F172A] rounded-xl p-4 overflow-x-auto border border-slate-800 text-xs sm:text-sm font-mono text-slate-200">
                  <pre>{currentChapter.codeSnippet?.code || `# Code sample for ${currentChapter.title}`}</pre>
                </div>
              </div>
            )}

            {/* TAB 3: LESSON QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Quick Check: Test Your Comprehension
                </h3>

                <div className="space-y-4">
                  {defaultLessonQuiz.map((q, qIdx) => (
                    <div key={q.id} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-3">
                      <p className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                        {qIdx + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedQuizAnswers[qIdx] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => setSelectedQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                              className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'bg-[var(--primary)] text-white border-[var(--primary-dark)]'
                                  : 'bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)] hover:bg-[#FAF7F2]'
                              }`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && optIdx === q.correctIndex && (
                                <span className="text-emerald-400 font-bold text-xs">✓ Correct</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    className="px-4 py-2 bg-[var(--primary)] text-[var(--accent)] font-bold text-xs rounded-xl shadow-xs transition hover:bg-[var(--primary-light)] cursor-pointer"
                  >
                    Submit Answers
                  </button>
                  {quizSubmitted && (
                    <span className="text-xs text-emerald-600 font-bold">
                      Quiz Completed! You earned +20 XP.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: DISCUSSION */}
            {activeTab === 'discussion' && (
              <div className="space-y-4">
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Ask a question or share a note about this lesson..."
                    className="flex-1 px-3.5 py-2 text-xs bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl focus:outline-hidden focus:border-[var(--secondary)] text-[var(--text-primary)]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--primary)] text-[var(--accent)] font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer hover:bg-[var(--primary-light)] transition"
                  >
                    <span>Post</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="space-y-3">
                  {comments.map((comm) => (
                    <div key={comm.id} className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[var(--text-primary)]">{comm.authorName}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-[var(--surface)] text-[var(--secondary)] border border-[var(--border)]">
                            {comm.authorRole}
                          </span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)]">{comm.timestamp}</span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">{comm.text}</p>
                      <button
                        onClick={() => toggleCommentLike(comm.id)}
                        className={`text-[10px] font-semibold flex items-center gap-1 pt-1 transition cursor-pointer ${
                          comm.userLiked ? 'text-[var(--secondary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comm.likes} Likes</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: RESOURCES */}
            {activeTab === 'resources' && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Curated Reference Documents & Cheatsheets
                </h3>
                <div className="space-y-2">
                  {[
                    { title: 'Official Python Scikit-Learn Documentation', type: 'Docs', size: 'Web' },
                    { title: 'Mathematics for Machine Learning - Chapter Notes', type: 'PDF', size: '2.4 MB' },
                    { title: 'Linear Algebra Review Cheatsheet', type: 'PDF', size: '1.1 MB' },
                  ].map((res, i) => (
                    <div key={i} className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-[var(--secondary)]" />
                        <div>
                          <p className="text-xs font-bold text-[var(--text-primary)]">{res.title}</p>
                          <span className="text-[10px] text-[var(--text-muted)]">{res.type} • {res.size}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleDownloadNotes}
                        className="text-xs font-bold text-[var(--primary)] hover:text-[var(--secondary)] flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chapter Navigation Buttons */}
            <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
              <button
                onClick={goToPrevChapter}
                disabled={currentChapterIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Chapter</span>
              </button>

              <button
                onClick={goToNextChapter}
                disabled={currentChapterIdx === course.chapters.length - 1}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[var(--primary)] text-[var(--accent)] hover:bg-[var(--primary-light)] disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Chapters Syllabus Accordion List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[var(--surface)] p-5 rounded-2xl border border-[var(--border)] shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
              Course Syllabus ({course.chapters.length} Modules)
            </h3>

            <div className="space-y-2">
              {course.chapters.map((ch, idx) => {
                const isActive = ch.id === activeChapterId;
                const completed = user.completedChapters.includes(ch.id);
                const progressPct = user.videoProgress[ch.id] || 0;

                return (
                  <div
                    key={ch.id}
                    onClick={() => {
                      setActiveChapterId(ch.id);
                      setSelectedQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-[var(--primary)] text-white border-[var(--primary-dark)] shadow-sm'
                        : 'bg-[var(--surface-subtle)] hover:bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                            isActive ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-slate-300 text-[var(--text-muted)]'
                          }`}>
                            {idx + 1}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                            {ch.duration}
                          </span>
                          {progressPct > 0 && (
                            <span className={`text-[10px] px-1.5 rounded font-mono font-bold ${
                              progressPct >= 80 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-[var(--accent)]/20 text-[var(--accent)]'
                            }`}>
                              {Math.round(progressPct)}%
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold line-clamp-1">
                          {ch.title}
                        </h4>
                      </div>
                    </div>

                    <span className={`text-xs ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                      {isActive ? '▶' : '→'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick AI Assistance Box */}
          <div className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white p-5 rounded-2xl shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 fill-[var(--accent)]" />
              <span>RAAH AI Course Tutor</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Have doubts about {currentChapter.title}? Ask RAAH AI to explain line-by-line in plain English or Hindi.
            </p>
            <button
              onClick={() => onAskAI && onAskAI(`I am watching "${currentChapter.title}". Can you give me 3 practice quiz questions to test my understanding?`)}
              className="w-full py-2 bg-[var(--accent)] hover:bg-[#FBBF24] text-[var(--primary-dark)] font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Test My Knowledge on this Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
