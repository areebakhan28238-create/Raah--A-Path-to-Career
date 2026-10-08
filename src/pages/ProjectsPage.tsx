import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PROJECTS_DATA } from '../data/mockData';
import { ProjectItem } from '../types';
import { ProjectGuide } from '../components/ProjectGuide';
import { 
  FolderGit2, Sparkles, Filter, ChevronRight, 
  ArrowRight, CheckCircle2, Clock, Award, ArrowLeft
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (page: string, params?: any) => void;
  onAskAI?: (prompt: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onAskAI,
}) => {
  const { user, toggleProjectStep } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Data Science', 'AI/ML', 'Full Stack', 'Cyber Security', 'Cloud'];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.careerCategory.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  if (activeProject) {
    return (
      <ProjectGuide
        project={activeProject}
        onBack={() => setActiveProject(null)}
        onAskAI={onAskAI}
        onStepToggled={(pId, sId) => toggleProjectStep(pId, sId)}
      />
    );
  }

  return (
    <div className="space-y-6">
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
              Recommended Capstone Projects
            </h1>
            <span className="text-xs bg-[var(--secondary-light)] text-[var(--primary)] font-bold px-2.5 py-0.5 rounded-full border border-[var(--secondary)]/30">
              Portfolio Ready
            </span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Build real-world projects tailored to your target role: <strong className="text-[var(--text-primary)]">{user.targetCareer}</strong>.
          </p>
        </div>

        {/* AI Recommendation callout */}
        <div className="bg-[var(--secondary-light)]/40 border border-[var(--secondary)]/30 p-3 rounded-xl flex items-center gap-2 text-xs text-[var(--primary)]">
          <Sparkles className="w-4 h-4 text-[var(--secondary)] shrink-0" />
          <span>
            Matched to your skill gaps: <strong>SQL</strong> and <strong>Machine Learning</strong>.
          </span>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              selectedCategory === cat
                ? 'bg-[var(--primary)] text-[var(--accent)] shadow-xs'
                : 'bg-[var(--surface)] hover:bg-[var(--surface-subtle)] text-[var(--text-secondary)] border border-[var(--border)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const completedStepsCount = project.steps.filter((s) => s.completed).length;
          const pct = Math.round((completedStepsCount / project.steps.length) * 100);

          return (
            <div
              key={project.id}
              className="bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--secondary)] transition-all duration-200 hover:shadow-md flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    project.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800' :
                    project.difficulty === 'Intermediate' ? 'bg-[var(--secondary-light)] text-[var(--primary)]' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {project.difficulty}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium">
                    {project.steps.length} Steps Roadmap
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--secondary)] transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed mt-1">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1.5">
                    Tech Stack & Tools
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[var(--surface-subtle)] text-[var(--text-secondary)] font-medium px-2 py-0.5 rounded-md border border-[var(--border-light)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-secondary)] mb-1">
                    <span>Milestones</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--surface-subtle)] rounded-full overflow-hidden border border-[var(--border-light)]">
                    <div
                      className="h-full bg-[var(--secondary)] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)] font-medium">
                  {project.careerCategory}
                </span>

                <button
                  onClick={() => setActiveProject(project)}
                  className="px-4 py-2 bg-[var(--primary)] group-hover:bg-[var(--secondary)] group-hover:text-[var(--primary-dark)] text-[var(--accent)] font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>View Project</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;
