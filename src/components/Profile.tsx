import { Shield, Zap, Flame, Target, Trophy, Star, ChevronRight, Award, TrendingUp } from 'lucide-react';

const achievements = [
  { label: 'First Win', desc: 'Complete your first quiz', earned: true, icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  { label: 'Hot Streak', desc: '5-day login streak', earned: true, icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
  { label: 'Sharp Mind', desc: 'Score 100% on any quiz', earned: false, icon: Star, color: 'text-slate-dim', bg: 'bg-slate-400/05', border: 'border-slate-400/10' },
  { label: 'League Hero', desc: 'Reach Gold tier', earned: false, icon: Award, color: 'text-slate-dim', bg: 'bg-slate-400/05', border: 'border-slate-400/10' },
];

const statItems = [
  { label: 'Quizzes Taken', value: '47', icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { label: 'Avg. Score', value: '72%', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { label: 'Best Streak', value: '7', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Rank', value: '#6', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-400/10' },
];

export default function Profile() {
  const xpCurrent = 1250;
  const xpNext = 2000;
  const xpPct = (xpCurrent / xpNext) * 100;

  return (
    <div className="animate-fade-in">
      {/* Profile Header */}
      <div className="relative">
        {/* Banner */}
        <div
          className="h-28 w-full"
          style={{
            background: 'linear-gradient(135deg, #0A2540 0%, #0D1F35 50%, #0A1A2A 100%)',
            borderBottom: '1px solid rgba(0,229,255,0.1)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(0,229,255,0.08) 0%, transparent 60%)' }}
          />
        </div>

        {/* Avatar */}
        <div className="px-4">
          <div className="relative -mt-8 mb-3 flex items-end justify-between">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-extrabold text-white"
                style={{ boxShadow: '0 0 24px rgba(0,229,255,0.35), 0 4px 16px rgba(0,0,0,0.5)', border: '3px solid #0D1117' }}
              >
                P
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#0D1117]" />
            </div>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 border border-cyan-400/30 bg-cyan-400/8 hover:bg-cyan-400/15 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <h2 className="text-xl font-extrabold text-white">PlayerOne</h2>
          <p className="text-xs text-slate-muted mb-2">Trivia enthusiast · Joined May 2026</p>

          {/* League Badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full badge-bronze">
              <Shield className="w-3 h-3 text-white" fill="rgba(255,255,255,0.3)" />
              <span className="text-[11px] font-bold text-white">Bronze III</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-muted">
              <span>→</span>
              <span className="text-amber-400 font-semibold">Bronze II</span>
              <span className="text-slate-dim">next tier</span>
            </div>
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="px-4 mb-5">
        <div
          className="rounded-xl p-4"
          style={{
            background: 'linear-gradient(135deg, #1A2235 0%, #161B26 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white">XP Progress</span>
            </div>
            <span className="text-xs text-slate-muted font-medium">{xpCurrent.toLocaleString()} / {xpNext.toLocaleString()}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden mb-1.5" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${xpPct}%`,
                background: 'linear-gradient(90deg, #00C8E8 0%, #0066FF 100%)',
                boxShadow: '0 0 10px rgba(0, 200, 232, 0.5)',
              }}
            />
          </div>
          <p className="text-xs text-slate-dim">{(xpNext - xpCurrent).toLocaleString()} XP until Bronze II</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-5">
        <h3 className="text-sm font-bold text-slate-text mb-3">Statistics</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {statItems.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3.5 flex items-center gap-3"
              style={{
                background: 'rgba(26, 34, 53, 0.8)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-lg font-extrabold text-white leading-tight">{s.value}</p>
                <p className="text-[11px] text-slate-dim font-medium">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-text">Achievements</h3>
          <button className="flex items-center gap-1 text-xs text-cyan-400 font-semibold">
            All <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {achievements.map((a) => (
            <div
              key={a.label}
              className={`rounded-xl p-3.5 border ${a.border} ${a.bg} relative overflow-hidden`}
              style={{ opacity: a.earned ? 1 : 0.5 }}
            >
              {!a.earned && (
                <div className="absolute top-2 right-2">
                  <div className="w-4 h-4 rounded-full bg-slate-400/20 flex items-center justify-center">
                    <span className="text-[8px] text-slate-dim font-bold">🔒</span>
                  </div>
                </div>
              )}
              <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center mb-2`}>
                <a.icon className={`w-4 h-4 ${a.color}`} />
              </div>
              <p className="text-xs font-bold text-slate-text">{a.label}</p>
              <p className="text-[11px] text-slate-dim mt-0.5">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
