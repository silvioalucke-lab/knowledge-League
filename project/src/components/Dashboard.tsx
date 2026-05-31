import { Flame, Zap, Shield, Clock, ChevronRight, Star, Trophy, Target, BookOpen } from 'lucide-react';

const recentCategories = [
  { name: 'Science', icon: '⚗️', color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  { name: 'History', icon: '📜', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/20', text: 'text-amber-400' },
  { name: 'Sports', icon: '⚽', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20', text: 'text-blue-400' },
  { name: 'Tech', icon: '💻', color: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
];

interface Props {
  onPlayQuiz?: () => void;
}

export default function Dashboard({ onPlayQuiz }: Props) {
  return (
    <div className="animate-fade-in">
      {/* Header Greeting */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                P
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0D1117]" />
            </div>
            <div>
              <p className="text-xs text-slate-muted font-medium tracking-wide uppercase">Welcome back</p>
              <h2 className="text-lg font-bold text-slate-text leading-tight">PlayerOne</h2>
            </div>
          </div>

          {/* League Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full badge-bronze">
            <Shield className="w-3.5 h-3.5 text-white" fill="rgba(255,255,255,0.3)" />
            <span className="text-xs font-bold text-white tracking-wide">Bronze III</span>
          </div>
        </div>
      </div>

      {/* Daily Challenge Card */}
      <div className="px-4 mb-5">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0F2A3F 0%, #0D1F35 40%, #091525 100%)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(0, 229, 255, 0.04)',
          }}
        >
          {/* Decorative glow orb */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0, 180, 255, 0.08) 0%, transparent 70%)' }}
          />

          <div className="relative p-5">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(0, 229, 255, 0.15)', border: '1px solid rgba(0, 229, 255, 0.3)' }}
                >
                  <Star className="w-4 h-4 text-cyan-400" fill="rgba(0,229,255,0.4)" />
                </div>
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: '#00E5FF', textShadow: '0 0 10px rgba(0,229,255,0.5)' }}
                >
                  Daily Challenge
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                Available
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-1 leading-tight">
              Today's<br />
              <span style={{ color: '#00E5FF', textShadow: '0 0 16px rgba(0,229,255,0.4)' }}>
                Knowledge Test
              </span>
            </h3>
            <p className="text-slate-muted text-sm mb-5">Prove your expertise. Earn XP. Climb the ranks.</p>

            {/* Meta info row */}
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-dim" />
                <span className="text-xs text-slate-muted font-medium">10 Questions</span>
              </div>
              <div className="w-px h-3.5 bg-slate-dim/40" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-dim" />
                <span className="text-xs text-slate-muted font-medium">15s Timer</span>
              </div>
              <div className="w-px h-3.5 bg-slate-dim/40" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs text-amber-400 font-medium">+250 XP</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onPlayQuiz}
              className="btn-press w-full py-3.5 rounded-xl font-bold text-sm tracking-wide relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #00C8E8 0%, #0099CC 100%)',
                boxShadow: '0 0 24px rgba(0, 229, 255, 0.35), 0 4px 12px rgba(0, 0, 0, 0.3)',
                color: '#000D14',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" fill="currentColor" />
                START DAILY QUIZ
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-2 gap-3">
          {/* Daily Streak */}
          <div
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1A2235 0%, #161B26 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)' }}
            />
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-orange-500/15 border border-orange-500/25">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <span className="text-xs font-semibold text-slate-dim uppercase tracking-wide">Streak</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white">5</span>
              <span className="text-sm font-semibold text-orange-400">Days</span>
            </div>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <div
                  key={d}
                  className="flex-1 h-1.5 rounded-full"
                  style={{
                    background: d <= 5
                      ? 'linear-gradient(90deg, #FF6B35, #FF8C5A)'
                      : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-slate-dim mt-1.5">Daily Streak</p>
          </div>

          {/* Total XP */}
          <div
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1A2235 0%, #161B26 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            <div
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, transparent 70%)' }}
            />
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-cyan-500/15 border border-cyan-500/25">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span className="text-xs font-semibold text-slate-dim uppercase tracking-wide">Total XP</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white">1,250</span>
            </div>
            <div
              className="mt-2 h-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: '62%',
                  background: 'linear-gradient(90deg, #00C8E8, #0066FF)',
                  boxShadow: '0 0 8px rgba(0, 200, 232, 0.4)',
                }}
              />
            </div>
            <p className="text-xs text-slate-dim mt-1.5">1,250 / 2,000 XP</p>
          </div>
        </div>
      </div>

      {/* Quick Play Categories */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-text">Quick Play</h3>
          <button className="flex items-center gap-1 text-xs text-cyan-400 font-semibold">
            See all <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {recentCategories.map((cat) => (
            <button
              key={cat.name}
              className={`btn-press rounded-xl p-3 flex flex-col items-center gap-1.5 bg-gradient-to-b ${cat.color} border ${cat.border}`}
            >
              <span className="text-xl">{cat.icon}</span>
              <span className={`text-xs font-semibold ${cat.text}`}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-text">Recent Activity</h3>
        </div>
        <div className="space-y-2">
          {[
            { label: 'Science Quiz', score: '8/10', xp: '+180 XP', time: '2h ago', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/15' },
            { label: 'History Challenge', score: '6/10', xp: '+120 XP', time: '1d ago', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/15' },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl border ${item.border}`}
              style={{ background: 'rgba(26, 34, 53, 0.7)' }}
            >
              <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-text truncate">{item.label}</p>
                <p className="text-xs text-slate-dim">{item.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{item.score}</p>
                <p className={`text-xs font-semibold ${item.color}`}>{item.xp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
