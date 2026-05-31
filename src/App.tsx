import { useState } from 'react';
import BottomNav, { type Tab } from './components/BottomNav';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import DailyQuiz from './components/DailyQuiz';

const tabContent: Record<Tab, React.ComponentType<{ onPlayQuiz?: () => void }>> = {
  dashboard: Dashboard,
  leaderboard: Leaderboard,
  profile: Profile,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showQuiz, setShowQuiz] = useState(false);

  const handlePlayQuiz = () => {
    setShowQuiz(true);
  };

  const handleExitQuiz = () => {
    setShowQuiz(false);
  };

  // Quiz screen takes over the entire view
  if (showQuiz) {
    return <DailyQuiz onExit={handleExitQuiz} />;
  }

  const Content = tabContent[activeTab];

  return (
    <div className="min-h-screen" style={{ background: '#0D1117' }}>
      {/* Mobile-centered container */}
      <div className="mx-auto max-w-md min-h-screen relative flex flex-col" style={{ background: '#0D1117' }}>
        {/* Subtle top gradient accent */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px z-40 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.3) 50%, transparent 100%)' }}
        />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto pb-20" style={{ scrollbarWidth: 'thin' }}>
          <Content onPlayQuiz={handlePlayQuiz} />
        </main>

        {/* Bottom Navigation */}
        <BottomNav active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Desktop side decoration */}
      <style>{`
        @media (min-width: 768px) {
          body::before {
            content: '';
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse at 20% 50%, rgba(0,50,80,0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 50%, rgba(0,30,60,0.2) 0%, transparent 50%);
            pointer-events: none;
            z-index: 0;
          }
        }
      `}</style>
    </div>
  );
}
