import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ROADMAP_TOPICS } from '../data/mockData';
import { RoadmapTopic } from '../types';
import { 
  CheckCircle2, Clock, BookOpen, HelpCircle, 
  Code, ChevronRight, X, Sparkles, Filter
} from 'lucide-react';

interface RoadmapPageProps {
  onNavigate: (page: string, params?: any) => void;
  onAskAI?: (prompt: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  onNavigate,
  onAskAI,
}) => {
  const { user } = useAuth();
  const [selectedYear, setSelectedYear] = useState<number>(user.currentYear.includes('1') ? 1 : user.currentYear.includes('2') ? 2 : user.currentYear.includes('3') ? 3 : 4);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>(user.targetCareer || 'Data Scientist');
  const [activeTopic, setActiveTopic] = useState<RoadmapTopic | null>(null);

  const years = [
    { num: 1, label: 'Year 1', subtitle: 'Foundation', desc: 'Programming in C/C++, Math, OOP, Git' },
    { num: 2, label: 'Year 2', subtitle: 'Core CS', desc: 'DSA, DBMS, Operating Systems, Networks' },
    { num: 3, label: 'Year 3', subtitle: 'Specialization', desc: 'Machine Learning, Statistics, Cloud APIs' },
    { num: 4, label: 'Year 4', subtitle: 'Placement & Career', desc: 'System Design, Capstones, Mock Interviews' },
  ];

  const filteredTopics = ROADMAP_TOPICS.filter((t) => t.year === selectedYear);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)] block">
            4-Year Academic & Career Blueprint
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mt-0.5">
            B.Tech CSE Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            Engineered sequence guiding you semester-by-semester from freshman year to tier-1 company offers.
          </p>
        </div>

        {/* Specialization Filter Dropdown */}
        <div className="flex items-center gap-2 bg-[var(--surface-subtle)] p-2 rounded-xl border border-[var(--border)]">
          <Filter className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="text-xs font-bold text-[var(--text-primary)]">Track:</span>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="bg-transparent text-xs font-bold text-[var(--primary)] focus:outline-hidden cursor-pointer"
          >
            <option value="Data Scientist">Data Science Track</option>
            <option value="Software Developer">Software Engineering Track</option>
            <option value="AI / ML Engineer">AI / ML Track</option>
            <option value="Full Stack Developer">Full Stack Track</option>
            <option value="Cyber Security Engineer">Cyber Security Track</option>
            <option value="Cloud / DevOps Engineer">Cloud & DevOps Track</option>
          </select>
        </div>
      </div>

      {/* Year Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {years.map((y) => {
          const isActive = selectedYear === y.num;
          return (
            <button
              key={y.num}
              onClick={() => setSelectedYear(y.num)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-[var(--primary)] text-white border-[var(--primary-dark)] shadow-md transform -translate-y-0.5'
                  : 'bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--text-primary)] border-[var(--border)] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold uppercase ${isActive ? 'text-[var(--accent)]' : 'text-[var(--secondary)]'}`}>
                    {y.label}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[var(--accent)]/20 text-[var(--accent)]' : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-light)]'
                  }`}>
                    Sem {y.num * 2 - 1} & {y.num * 2}
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base">{y.subtitle}</h3>
                <p className={`text-[11px] mt-1 ${isActive ? 'text-slate-300' : 'text-[var(--text-secondary)]'}`}>
                  {y.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[var(--border-light)]/40 flex items-center justify-between text-[11px]">
                <span className={isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}>
                  {y.num <= 2 ? 'Foundation' : y.num === 3 ? 'Active Specialization' : 'Placement Bar'}
                </span>
                <span className="font-bold">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Topics Timeline for Selected Year */}
      <div className="bg-[var(--surface)] p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
              Curriculum Sequence
            </span>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {years.find((y) => y.num === selectedYear)?.subtitle} Subjects & Milestones
            </h2>
          </div>

          <span className="text-xs text-[var(--text-secondary)]">
            {filteredTopics.length} Core Modules
          </span>
        </div>

        {/* Topic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setActiveTopic(topic)}
              className="bg-[var(--surface-subtle)] hover:bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-[var(--surface)] text-[var(--text-secondary)] px-2 py-0.5 rounded-md border border-[var(--border-light)]">
                    Semester {topic.semester}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    topic.skillLevel === 'Beginner' ? 'bg-emerald-100 text-emerald-800' :
                    topic.skillLevel === 'Intermediate' ? 'bg-[var(--secondary-light)] text-[var(--secondary)]' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {topic.skillLevel}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--secondary)] transition">
                  {topic.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {topic.description}
                </p>

                {/* Key Concepts Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {topic.keyConcepts.slice(0, 3).map((concept, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] px-2 py-0.5 rounded-md"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Bar */}
              <div className="mt-4 pt-3 border-t border-[var(--border-light)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  <span>{topic.estimatedHours} hrs</span>
                </span>
                <span className="font-bold text-[var(--primary)] group-hover:text-[var(--secondary)] flex items-center gap-1">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Drawer for Active Topic Details */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[var(--surface)] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[var(--border)]">
            <div className="flex items-center justify-between border-b border-[var(--border-light)] pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--secondary)]">
                  Year {activeTopic.year} • Semester {activeTopic.semester}
                </span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
                  {activeTopic.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTopic(null)}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)]">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Subject Overview
                </h4>
                <p className="leading-relaxed bg-[var(--surface-subtle)] p-3.5 rounded-xl border border-[var(--border)] text-[var(--text-primary)]">
                  {activeTopic.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Key Concepts To Master
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeTopic.keyConcepts.map((kc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-[var(--surface-subtle)] rounded-lg text-xs font-medium text-[var(--text-primary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{kc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[var(--surface-subtle)] p-3 rounded-xl border border-[var(--border)]">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Estimated Effort</span>
                  <span className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">⏱ {activeTopic.estimatedHours} Hours Study</span>
                </div>
                <div className="bg-[var(--surface-subtle)] p-3 rounded-xl border border-[var(--border)]">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold block">Skill Level</span>
                  <span className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">🎯 {activeTopic.skillLevel}</span>
                </div>
              </div>
            </div>

            {/* Direct Connected Action Links */}
            <div className="pt-2 border-t border-[var(--border-light)] flex flex-wrap gap-2">
              {activeTopic.linkedCourseId && (
                <button
                  onClick={() => {
                    const cid = activeTopic.linkedCourseId;
                    setActiveTopic(null);
                    onNavigate('course', cid);
                  }}
                  className="flex-1 py-2.5 px-3 bg-[var(--primary)] hover:bg-[var(--primary-light)] text-[var(--accent)] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Start Course Video</span>
                </button>
              )}

              {activeTopic.linkedQuizId && (
                <button
                  onClick={() => {
                    const qid = activeTopic.linkedQuizId;
                    setActiveTopic(null);
                    onNavigate('quiz', qid);
                  }}
                  className="py-2.5 px-3.5 bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] text-[var(--text-primary)] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer border border-[var(--border)]"
                >
                  <HelpCircle className="w-4 h-4 text-[var(--secondary)]" />
                  <span>Take Quiz</span>
                </button>
              )}

              {activeTopic.linkedProblemId && (
                <button
                  onClick={() => {
                    const pid = activeTopic.linkedProblemId;
                    setActiveTopic(null);
                    onNavigate('coding', pid);
                  }}
                  className="py-2.5 px-3.5 bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] text-[var(--text-primary)] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer border border-[var(--border)]"
                >
                  <Code className="w-4 h-4 text-[var(--primary)]" />
                  <span>Coding Problem</span>
                </button>
              )}

              <button
                onClick={() => {
                  const title = activeTopic.title;
                  setActiveTopic(null);
                  onAskAI && onAskAI(`Explain the importance of "${title}" in the 4-year B.Tech CSE curriculum and give me study tips.`);
                }}
                className="py-2.5 px-3 bg-[var(--secondary-light)] hover:bg-[#FCD8A2] text-[var(--primary)] border border-[var(--secondary)]/30 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[var(--secondary)]" />
                <span>Ask RAAH AI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
