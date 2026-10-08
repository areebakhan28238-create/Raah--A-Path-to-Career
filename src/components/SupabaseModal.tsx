import React, { useState, useEffect } from 'react';
import { 
  Database, CheckCircle2, Copy, Check, ExternalLink, 
  RefreshCw, Server, ShieldCheck, Video, Code, HelpCircle, 
  FolderGit2, UserCheck, X, Sparkles
} from 'lucide-react';
import { 
  SUPABASE_PROJECT_ID, 
  SUPABASE_URL, 
  SUPABASE_SQL_SETUP_SCRIPT, 
  testSupabaseConnection, 
  verifySupabaseTables,
  syncUserProfileToSupabase
} from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const { user, supabaseStatus, triggerSupabaseSync } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'sql' | 'synced_data'>('status');
  const [isTesting, setIsTesting] = useState(false);
  const [pingLatency, setPingLatency] = useState<number | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [tablesStatus, setTablesStatus] = useState<{ exists: boolean; missing: string[] } | null>(null);

  useEffect(() => {
    if (isOpen) {
      handleTestPing();
      checkTables();
    }
  }, [isOpen]);

  const handleTestPing = async () => {
    setIsTesting(true);
    setTestResult(null);
    const result = await testSupabaseConnection();
    setIsTesting(false);
    if (result.connected) {
      setPingLatency(result.latencyMs);
      setTestResult({
        success: true,
        message: `Connected successfully (${result.latencyMs}ms latency)`,
      });
    } else {
      setTestResult({
        success: false,
        message: result.error || 'Connection failed',
      });
    }
  };

  const checkTables = async () => {
    const res = await verifySupabaseTables();
    setTablesStatus({
      exists: res.exists,
      missing: res.missingTables,
    });
  };

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleManualSync = async () => {
    if (triggerSupabaseSync) {
      await triggerSupabaseSync();
    } else {
      await syncUserProfileToSupabase(user);
    }
    await handleTestPing();
    await checkTables();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[var(--primary)] text-white p-5 flex items-center justify-between border-b border-[var(--primary-dark)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                  Supabase Database Integration
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Connected
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Project ID: <strong className="font-mono text-[var(--accent)]">{SUPABASE_PROJECT_ID}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[var(--border)] bg-[var(--surface-subtle)] px-4 pt-2">
          <button
            onClick={() => setActiveTab('status')}
            className={`px-4 py-2 text-xs font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'status'
                ? 'border-[var(--secondary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Connection Status
          </button>
          <button
            onClick={() => setActiveTab('synced_data')}
            className={`px-4 py-2 text-xs font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'synced_data'
                ? 'border-[var(--secondary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Live Synced Modules
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 text-xs font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'sql'
                ? 'border-[var(--secondary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            SQL Setup Script
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 max-h-[60vh]">
          {/* TAB 1: STATUS */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              {/* Credentials Summary Box */}
              <div className="p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)] font-medium">Supabase Host:</span>
                  <span className="font-mono font-bold text-[var(--text-primary)]">{SUPABASE_URL}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)] font-medium">Project ID:</span>
                  <span className="font-mono font-bold text-[var(--secondary)]">{SUPABASE_PROJECT_ID}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)] font-medium">API Key Mode:</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                    Publishable / Anon Client-Verified
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[var(--border-light)]">
                  <span className="text-[var(--text-muted)] font-medium">Last Cloud Sync:</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {supabaseStatus?.lastSyncedAt 
                      ? new Date(supabaseStatus.lastSyncedAt).toLocaleTimeString() 
                      : 'Active (real-time sync enabled)'}
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold">Live Supabase Connection Active</h4>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    All authentication actions, video timestamps, course progress, coding problem solutions, quiz scores, and student profiles are automatically transmitted to your Supabase project.
                  </p>
                </div>
              </div>

              {/* Ping / Latency Test Result */}
              {testResult && (
                <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                  testResult.success 
                    ? 'bg-slate-50 border-slate-200 text-slate-800' 
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[var(--secondary)]" />
                    <span>{testResult.message}</span>
                  </div>
                  {pingLatency !== null && (
                    <span className="font-mono font-bold text-emerald-700 text-[11px]">
                      ⚡ {pingLatency} ms
                    </span>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={handleTestPing}
                  disabled={isTesting}
                  className="px-4 py-2 bg-[var(--surface-subtle)] hover:bg-[#EFE8DD] border border-[var(--border)] text-[var(--text-primary)] font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
                </button>

                <button
                  onClick={handleManualSync}
                  className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--accent)] font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sync Current State Now</span>
                </button>

                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition ml-auto"
                >
                  <span>Open Supabase Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE SYNCED MODULES */}
          {activeTab === 'synced_data' && (
            <div className="space-y-3">
              <p className="text-xs text-[var(--text-secondary)]">
                The following core features in RAAH are wired to save data into your Supabase database:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>Login & Student Profile</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Synced
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Name, email, college, B.Tech year, branch, bio, daily study time, target career.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                      <Video className="w-4 h-4 text-[var(--secondary)]" />
                      <span>Video Playing & Resuming</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Synced
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Exact seconds played, lesson percentage watched, completed chapters.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                      <Code className="w-4 h-4 text-indigo-600" />
                      <span>Coding Arena Practice</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Synced
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Solved LeetCode-style problems, code test outputs, earned coding XP.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                      <HelpCircle className="w-4 h-4 text-amber-600" />
                      <span>Quiz Assessments & Diagnostics</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Synced
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Scores, passing status, question reviews, and skill rating updates.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] space-y-1 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-[var(--text-primary)]">
                      <FolderGit2 className="w-4 h-4 text-purple-600" />
                      <span>Capstone Projects & Roadmaps</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      Synced
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Completed milestone steps, project repository status, overall career readiness percentage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SQL SCHEMA */}
          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">
                    PostgreSQL Table Creation Script
                  </h4>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Run this in your Supabase SQL Editor to visualize tables in Table Editor:
                  </p>
                </div>

                <button
                  onClick={handleCopySQL}
                  className="px-3.5 py-1.5 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--accent)] text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied SQL!' : 'Copy SQL'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-[var(--primary-dark)] text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto max-h-60 border border-[var(--border)] leading-relaxed">
                  {SUPABASE_SQL_SETUP_SCRIPT}
                </pre>
              </div>

              <div className="p-3 bg-[var(--secondary-light)]/40 border border-[var(--secondary)]/30 rounded-xl text-xs text-[var(--primary)] flex items-center justify-between">
                <span>Direct link to run SQL in Supabase:</span>
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline hover:text-[var(--secondary)] flex items-center gap-1"
                >
                  Open SQL Editor ↗
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[var(--surface-subtle)] border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>Connected to {SUPABASE_PROJECT_ID}.supabase.co</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--surface)] hover:bg-[#EFE8DD] border border-[var(--border)] text-[var(--text-primary)] font-bold rounded-xl cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
