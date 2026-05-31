import { Home, Trophy, User } from 'lucide-react';

export type Tab = 'dashboard' | 'leaderboard' | 'profile';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; Icon: typeof Home }[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: Home },
  { id: 'leaderboard', label: 'Leaderboard', Icon: Trophy },
  { id: 'profile', label: 'Profile', Icon: User },
];

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50"
      style={{
        background: 'rgba(13, 17, 23, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center px-2 pb-safe">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex-1 flex flex-col items-center gap-1 py-3 relative tab-transition"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Active background blob */}
              {isActive && (
                <div
                  className="absolute inset-1 rounded-xl"
                  style={{ background: 'rgba(0, 229, 255, 0.06)' }}
                />
              )}

              <div className="relative">
                <Icon
                  className="w-5 h-5 tab-transition"
                  style={{
                    color: isActive ? '#00E5FF' : '#64748B',
                    filter: isActive ? 'drop-shadow(0 0 6px rgba(0,229,255,0.6))' : 'none',
                  }}
                  fill={isActive ? 'rgba(0,229,255,0.2)' : 'none'}
                />
                {/* Active dot */}
                {isActive && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#00E5FF', boxShadow: '0 0 6px rgba(0,229,255,0.8)' }}
                  />
                )}
              </div>

              <span
                className="text-[10px] font-semibold tab-transition relative"
                style={{
                  color: isActive ? '#00E5FF' : '#64748B',
                  textShadow: isActive ? '0 0 8px rgba(0,229,255,0.4)' : 'none',
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
