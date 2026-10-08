import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { 
  ArrowLeft, CheckCircle2, Circle, Clock, 
  FolderTree, Database, ExternalLink, Play, 
  Sparkles, FileText, CheckSquare, Layers, Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProjectGuideProps {
  project: ProjectItem;
  onBack: () => void;
  onAskAI?: (prompt: string) => void;
  onStepToggled?: (projectId: string, stepId: number) => void;
}

export const ProjectGuide: React.FC<ProjectGuideProps> = ({
  project,
  onBack,
  onAskAI,
  onStepToggled,
}) => {
  const [activeStepId, setActiveStepId] = useState<number>(project.steps[0]?.id || 1);
  const [stepsState, setStepsState] = useState(project.steps);
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'dataset' | 'structure'>('steps');

  const completedCount = stepsState.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / stepsState.length) * 100);

  const toggleStep = (stepId: number) => {
    setStepsState((prev) =>
      prev.map((s) => {
        if (s.id === stepId) {
          const nextState = !s.completed;
          if (nextState) {
            confetti({
              particleCount: 50,
              spread: 50,
              origin: { y: 0.7 },
              colors: ['#F59E0B', '#10B981'],
            });
          }
          return { ...s, completed: nextState };
        }
        return s;
      })
    );
    if (onStepToggled) {
      onStepToggled(project.id, stepId);
    }
  };

  const currentStep = stepsState.find((s) => s.id === activeStepId) || stepsState[0];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition cursor-pointer mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Recommended Projects</span>
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {project.title}
            </h1>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              project.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
              project.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
              'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {project.difficulty}
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
              {project.careerCategory}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Progress Badge */}
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl min-w-[200px] text-right">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-slate-700">
            <span>Project Milestones</span>
            <span className="text-amber-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {completedCount} of {stepsState.length} steps completed
          </span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('steps')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'steps'
              ? 'bg-[#18233C] text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Step-by-Step Roadmap ({stepsState.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#18233C] text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Problem Statement & Stack</span>
        </button>

        <button
          onClick={() => setActiveTab('dataset')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'dataset'
              ? 'bg-[#18233C] text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Dataset & Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('structure')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'structure'
              ? 'bg-[#18233C] text-amber-400 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Folder Structure</span>
        </button>
      </div>

      {/* Tab 1: Step-by-Step Interactive Implementation Roadmap */}
      {activeTab === 'steps' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Step Navigator */}
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1 mb-2">
              Implementation Timeline
            </h3>
            {stepsState.map((step) => {
              const isActive = step.id === activeStepId;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#18233C] text-white border-slate-700 shadow-md'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStep(step.id);
                      }}
                      className="cursor-pointer"
                      title={step.completed ? 'Mark incomplete' : 'Mark completed'}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className={`w-5 h-5 ${isActive ? 'text-slate-400' : 'text-slate-300'}`} />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-amber-400' : 'text-slate-500'}`}>
                          Step 0{step.id}
                        </span>
                        {step.completed && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                            Done
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold line-clamp-1">
                        {step.title}
                      </h4>
                    </div>
                  </div>

                  <span className={`text-xs ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                    →
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Active Step Detailed Workbench */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Active Milestone • Step 0{currentStep.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {currentStep.title}
                </h3>
              </div>
              <button
                onClick={() => toggleStep(currentStep.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  currentStep.completed
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
                    : 'bg-[#18233C] text-amber-400 hover:bg-[#25375e]'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>{currentStep.completed ? 'Completed ✓' : 'Mark as Complete'}</span>
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Overview & Explanation
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Checklist */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-amber-600" />
                <span>Task Checklist</span>
              </h4>
              <div className="space-y-2">
                {currentStep.checklist.map((item, idx) => (
                  <label key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={currentStep.completed}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Resources & Docs */}
            {currentStep.resources && currentStep.resources.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Recommended Documentation & Guides
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentStep.resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center gap-1.5 text-xs text-[#18233C] hover:text-amber-600 bg-slate-100 hover:bg-amber-50 px-3 py-1.5 rounded-lg border border-slate-200 transition"
                    >
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                      <span>{res.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Ask AI Mentor Support */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Stuck on this step? Let RAAH AI generate the code or clarify logic.</span>
              </div>
              <button
                onClick={() => onAskAI && onAskAI(`How do I complete Step ${currentStep.id}: "${currentStep.title}" for the project "${project.title}"? Give me a code example and architecture tips.`)}
                className="text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Ask RAAH AI For Code</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Overview & Tech Stack */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                {project.problemStatement}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                Project Key Objectives
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-slate-100 text-slate-800 font-semibold text-xs px-3 py-1.5 rounded-lg border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                Required Prerequisites & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.requiredSkills.map((sk, i) => (
                  <span
                    key={i}
                    className="bg-amber-50 text-amber-900 font-semibold text-xs px-3 py-1.5 rounded-lg border border-amber-200"
                  >
                    ✓ {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold text-slate-800">Masterclass Video Guide</h4>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                {project.videoTutorialTitle} ({project.videoTutorialDuration})
              </p>
              <button
                onClick={() => onAskAI && onAskAI(`Explain the end-to-end architecture and implementation steps for "${project.title}".`)}
                className="text-xs bg-[#18233C] text-amber-400 px-3 py-1.5 rounded-lg font-bold hover:bg-slate-800 transition"
              >
                Watch Architecture Breakdown
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dataset Preview */}
      {activeTab === 'dataset' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sample Dataset: {project.sampleDataset.name}
              </h3>
              <p className="text-xs text-slate-500">
                File size: {project.sampleDataset.size} • Includes standard columns for feature extraction
              </p>
            </div>
            <button
              onClick={() => {
                alert(`Downloaded sample dataset preview for ${project.sampleDataset.name}`);
              }}
              className="text-xs bg-[#18233C] text-white hover:bg-slate-800 px-3.5 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Raw Dataset CSV</span>
            </button>
          </div>

          {/* Interactive Preview Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  {project.sampleDataset.columns.map((col, idx) => (
                    <th key={idx} className="p-3">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-600">
                {project.sampleDataset.sampleRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/70 transition">
                    {project.sampleDataset.columns.map((col, cIdx) => (
                      <td key={cIdx} className="p-3">
                        {String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Clean Folder Structure */}
      {activeTab === 'structure' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Recommended Production Project Structure
          </h3>
          <p className="text-xs text-slate-600">
            Maintain clean separation of concerns between exploratory notebooks, data pipelines, model artifacts, and API services.
          </p>
          <pre className="bg-[#0D1527] text-amber-300/90 font-mono text-xs p-4 rounded-xl overflow-x-auto border border-slate-800 leading-relaxed">
            {project.folderStructure}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ProjectGuide;
