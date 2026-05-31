import { Crown, Shield, ChevronUp, ChevronDown, Minus, Zap } from 'lucide-react';

const players = [
  { rank: 1, name: 'TriviaMaster', tier: 'Diamond I', xp: 12450, change: 0, avatar: 'T', color: 'from-cyan-400 to-blue-500', badge: 'Diamond', streak: 18 },
  { rank: 2, name: 'QuizKing99', tier: 'Platinum II', xp: 10830, change: 1, avatar: 'Q', color: 'from-emerald-400 to-teal-600', badge: 'Platinum', streak: 12 },
  { rank: 3, name: 'BrainStorm', tier: 'Platinum III', xp: 9760, change: -1, avatar: 'B', color: 'from-amber-400 to-orange-600', badge: 'Platinum', streak: 9 },
  { rank: 4, name: 'NerdAlert', tier: 'Gold I', xp: 7210, change: 2, avatar: 'N', color: 'from-rose-400 to-pink-600', badge: 'Gold', streak: 7 },
  { rank: 5, name: 'SmartCookie', tier: 'Gold II', xp: 6540, change: 0, avatar: 'S', color: 'from-violet-400 to-purple-600', badge: 'Gold', streak: 6 },
  { rank: 6, name: 'PlayerOne', tier: 'Bronze III', xp: 1250, change: 3, avatar: 'P', color: 'from-cyan-400 to-blue-600', badge: 'Bronze', streak: 5, isMe: true },
  { rank: 7, name: 'Riddler42', tier: 'Bronze III', xp: 1180, change: -2, avatar: 'R', color: 'from-slate-400 to-slate-600', badge: 'Bronze', streak: 3 },
  { rank: 8, name: 'KnowItAll', tier: 'Bronze IV', xp: 990, change: 0, avatar: 'K', color: 'from-orange-400 to-red-600', badge: 'Bronze', streak: 2 },
];

const tierColors: Record<string, { glow: string; text: string; bg: string }> = {
  Diamond: { glow: 'rgba(0,229,255,0.3)', text: 'text-cyan-300', bg: 'bg-cyan-400/10' },
  Platinum: { glow: 'rgba(52,211,153,0.3)', text: 'text-emerald-300', bg: 'bg-emerald-400/10' },
  Gold: { glow: 'rgba(251,191,36,0.3)', text: 'text-amber-300', bg: 'bg-amber-400/10' },
  Bronze: { glow: 'rgba(205,127,50,0.3)', text: 'text-orange-300', bg: 'bg-orange-400/10' },
};

const rankMedal = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};

export default function Leaderboard() {
  const top3 = players.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Crown className="w-5 h-5 text-amber-400" fill="rgba(251,191,36,0.4)" />
          <h2 className="text-xl font-extrabold text-white">Leaderboard</h2>
        </div>
        <p className="text-xs text-slate-muted">Season 4 — Resets in 12 days</p>
      </div>

      {/* Podium */}
      <div className="px-4 mb-5">
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #111827 0%, #0D1520 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(251,191,36,0.08) 0%, transparent 60%)' }}
          />
          <div className="flex items-end justify-center gap-3 relative">
            {/* 2nd place */}
            <div className="flex flex-col items-center gap-2 pb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                {top3[1].avatar}
              </div>
              <span className="text-xs font-bold text-slate-muted truncate max-w-[60px] text-center">{top3[1].name}</span>
              <div className="w-14 h-12 rounded-t-lg flex flex-col items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="text-lg">🥈</span>
                <span className="text-[10px] text-slate-dim font-semibold">2nd</span>
              </div>
            </div>
            {/* 1st place */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-3 h-3 rounded-full mb-0.5"
                style={{ background: '#FFD700', boxShadow: '0 0 12px rgba(255,215,0,0.6)' }}
              />
              <div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white text-base shadow-lg"
                style={{ boxShadow: '0 0 20px rgba(0,229,255,0.4)' }}
              >
                {top3[0].avatar}
              </div>
              <span className="text-xs font-bold text-white truncate max-w-[70px] text-center">{top3[0].name}</span>
              <div className="w-16 h-16 rounded-t-lg flex flex-col items-center justify-center" style={{ background: 'linear-gradient(180deg, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0.05) 100%)', border: '1px solid rgba(0,229,255,0.2)', borderBottom: 'none' }}>
                <span className="text-xl">🥇</span>
                <span className="text-[10px] text-cyan-400 font-bold">1st</span>
              </div>
            </div>
            {/* 3rd place */}
            <div className="flex flex-col items-center gap-2 pb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center font-bold text-white text-sm shadow-lg">
                {top3[2].avatar}
              </div>
              <span className="text-xs font-bold text-slate-muted truncate max-w-[60px] text-center">{top3[2].name}</span>
              <div className="w-14 h-10 rounded-t-lg flex flex-col items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="text-lg">🥉</span>
                <span className="text-[10px] text-slate-dim font-semibold">3rd</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rankings List */}
      <div className="px-4 mb-6">
        <div className="space-y-2">
          {players.map((p) => {
            const tier = tierColors[p.badge] ?? tierColors.Bronze;
            const medal = rankMedal(p.rank);
            return (
              <div
                key={p.name}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: p.isMe
                    ? 'linear-gradient(135deg, rgba(0,200,232,0.12) 0%, rgba(0,100,200,0.08) 100%)'
                    : 'rgba(26, 34, 53, 0.7)',
                  border: p.isMe
                    ? '1px solid rgba(0, 229, 255, 0.25)'
                    : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: p.isMe ? '0 0 16px rgba(0,229,255,0.1)' : 'none',
                }}
              >
                {/* Rank */}
                <div className="w-7 text-center">
                  {medal ? (
                    <span className="text-base">{medal}</span>
                  ) : (
                    <span className={`text-sm font-bold ${p.isMe ? 'text-cyan-400' : 'text-slate-dim'}`}>
                      {p.rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                  {p.avatar}
                </div>

                {/* Name & Tier */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className={`text-sm font-bold truncate ${p.isMe ? 'text-cyan-300' : 'text-slate-text'}`}>{p.name}</p>
                    {p.isMe && <span className="text-[9px] font-bold text-cyan-400 bg-cyan-400/15 px-1.5 py-0.5 rounded-full">YOU</span>}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-2.5 h-2.5 text-slate-dim" />
                    <p className={`text-[11px] font-semibold ${tier.text}`}>{p.tier}</p>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Zap className="w-3 h-3 text-amber-400" fill="rgba(251,191,36,0.6)" />
                    <span className="text-sm font-bold text-white">{p.xp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-0.5 justify-end">
                    {p.change > 0 ? (
                      <>
                        <ChevronUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400 font-semibold">{p.change}</span>
                      </>
                    ) : p.change < 0 ? (
                      <>
                        <ChevronDown className="w-3 h-3 text-rose-400" />
                        <span className="text-[10px] text-rose-400 font-semibold">{Math.abs(p.change)}</span>
                      </>
                    ) : (
                      <>
                        <Minus className="w-3 h-3 text-slate-dim" />
                        <span className="text-[10px] text-slate-dim font-semibold">—</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
