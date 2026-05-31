import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Flag, Zap, Clock, CheckCircle, XCircle, ChevronRight, Home, Trophy, Target, TrendingUp, RotateCcw, AlertTriangle } from 'lucide-react';
import type { QuizQuestion, QuestionResult } from '../data/quizData';
import { mockQuizQuestions, calculateXP, formatXP, formatTime } from '../data/quizData';

type Screen = 'loading' | 'question' | 'intermission' | 'completed';

interface Props {
  onExit: () => void;
}

export default function DailyQuiz({ onExit }: Props) {
  const [screen, setScreen] = useState<Screen>('loading');
  const [questions] = useState<QuizQuestion[]>(mockQuizQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [timerMs, setTimerMs] = useState(15000);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionStartTimeRef = useRef<number>(0);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Start the quiz
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('question');
      questionStartTimeRef.current = Date.now();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Timer logic
  useEffect(() => {
    if (screen !== 'question' || showValidation) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimerMs((prev) => {
        if (prev <= 100) {
          // Timeout!
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prev - 50;
      });
    }, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [screen, showValidation]);

  const handleTimeout = useCallback(() => {
    const result: QuestionResult = {
      questionId: currentQuestion.id,
      selectedIndex: null,
      isCorrect: false,
      timeRemainingMs: 0,
      xpEarned: 0,
    };
    setResults((prev) => [...prev, result]);
    setSelectedAnswer(null);
    setShowValidation(true);

    setTimeout(() => {
      setShowValidation(false);
      if (currentIndex >= totalQuestions - 1) {
        setScreen('completed');
      } else {
        setScreen('intermission');
      }
    }, 1000);
  }, [currentQuestion, currentIndex, totalQuestions]);

  const handleAnswerSelect = useCallback((index: number) => {
    if (showValidation) return;

    // Freeze timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const isCorrect = index === currentQuestion.correctIndex;
    const timeRemaining = timerMs;

    const result: QuestionResult = {
      questionId: currentQuestion.id,
      selectedIndex: index,
      isCorrect,
      timeRemainingMs: timeRemaining,
      xpEarned: calculateXP(isCorrect, timeRemaining),
    };

    setResults((prev) => [...prev, result]);
    setSelectedAnswer(index);
    setShowValidation(true);

    setTimeout(() => {
      setShowValidation(false);
      setSelectedAnswer(null);
      setTimerMs(15000);
      if (currentIndex >= totalQuestions - 1) {
        setScreen('completed');
      } else {
        setScreen('intermission');
      }
    }, 1000);
  }, [showValidation, currentQuestion, timerMs, currentIndex, totalQuestions]);

  const handleNextQuestion = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
    setTimerMs(15000);
    setScreen('question');
    questionStartTimeRef.current = Date.now();
  }, []);

  const handleReportQuestion = useCallback(() => {
    setIsReporting(true);
    setTimeout(() => {
      setIsReporting(false);
    }, 1500);
  }, []);

  // Calculate totals for completion screen
  const totalXP = results.reduce((sum, r) => sum + r.xpEarned, 0);
  const correctCount = results.filter((r) => r.isCorrect).length;
  const avgTimeMs = results.length > 0
    ? results.reduce((sum, r) => sum + (15000 - r.timeRemainingMs), 0) / results.length
    : 0;

  return (
    <div className="min-h-screen pb-safe" style={{ background: '#0D1117' }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'rgba(13, 17, 23, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1 text-sm text-slate-muted hover:text-slate-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-white">{formatXP(totalXP)} XP</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-[11px] text-slate-dim mb-1.5">
            <span>Question {Math.min(currentIndex + 1, totalQuestions)} of {totalQuestions}</span>
            <span>{Math.round((currentIndex / totalQuestions) * 100)}% complete</span>
          </div>
          <div className="flex items-center gap-0.5">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: idx < currentIndex
                    ? results[idx]?.isCorrect
                      ? 'linear-gradient(90deg, #10B981, #34D399)'
                      : 'linear-gradient(90deg, #EF4444, #F87171)'
                    : idx === currentIndex
                    ? 'rgba(0, 229, 255, 0.3)'
                    : 'rgba(255,255,255,0.08)',
                }}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Loading Screen */}
        {screen === 'loading' && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.2)' }}
            >
              <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-sm text-slate-muted">Preparing your quiz...</p>
          </div>
        )}

        {/* Question Screen */}
        {screen === 'question' && currentQuestion && (
          <div className="animate-fade-in">
            {/* Timer */}
            <div
              className="rounded-xl p-4 mb-5"
              style={{
                background: 'linear-gradient(135deg, #161B26 0%, #12141C 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-dim" />
                  <span className="text-sm font-bold text-slate-text">Time Remaining</span>
                </div>
                <span
                  className="text-xl font-extrabold tabular-nums"
                  style={{
                    color: timerMs <= 3000 ? '#EF4444' : '#E2E8F0',
                    textShadow: timerMs <= 3000 ? '0 0 8px rgba(239,68,68,0.5)' : 'none',
                  }}
                >
                  {(timerMs / 1000).toFixed(2)}s
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${(timerMs / 15000) * 100}%`,
                    background: timerMs <= 3000
                      ? 'linear-gradient(90deg, #EF4444, #F87171)'
                      : timerMs <= 7000
                      ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                      : 'linear-gradient(90deg, #06B6D4, #22D3EE)',
                    boxShadow: timerMs <= 3000 ? '0 0 10px rgba(239,68,68,0.4)' : '0 0 6px rgba(6,182,212,0.3)',
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div
              className="rounded-2xl p-5 mb-5"
              style={{
                background: 'linear-gradient(135deg, #1E293B 0%, #1A2235 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(0, 229, 255, 0.1)',
                    color: '#00E5FF',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                  }}
                >
                  {currentQuestion.category}
                </span>
                <span className="text-[10px] text-slate-dim font-medium">{currentQuestion.difficulty}</span>
              </div>
              <h2 className="text-lg font-bold text-white leading-relaxed">{currentQuestion.question}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                const showCorrect = showValidation && isCorrect;
                const showIncorrect = showValidation && isSelected && !isCorrect;

                let borderColor = 'rgba(255,255,255,0.08)';
                let bgColor = 'rgba(26, 34, 53, 0.7)';
                let textColor = '#E2E8F0';
                let icon = null;

                if (showCorrect) {
                  borderColor = 'rgba(16, 185, 129, 0.5)';
                  bgColor = 'rgba(16, 185, 129, 0.15)';
                  textColor = '#10B981';
                  icon = <CheckCircle className="w-5 h-5" />;
                } else if (showIncorrect) {
                  borderColor = 'rgba(239, 68, 68, 0.5)';
                  bgColor = 'rgba(239, 68, 68, 0.15)';
                  textColor = '#EF4444';
                  icon = <XCircle className="w-5 h-5" />;
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showValidation}
                    className="btn-press w-full rounded-xl p-4 flex items-center justify-between transition-all duration-200"
                    style={{
                      background: bgColor,
                      border: `1px solid ${borderColor}`,
                      opacity: showValidation && !isSelected && !isCorrect ? 0.5 : 1,
                    }}
                  >
                    <span className="text-sm font-semibold" style={{ color: textColor }}>
                      {option}
                    </span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Intermission Screen */}
        {screen === 'intermission' && (
          <div className="animate-fade-in py-12">
            <div className="text-center mb-6">
              <p className="text-xs text-slate-dim uppercase tracking-widest mb-2">Question {currentIndex + 1} of {totalQuestions}</p>
              {results[currentIndex] && (
                <div className="flex items-center justify-center gap-2">
                  {results[currentIndex].isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span className="text-lg font-bold text-emerald-400">Correct!</span>
                    </>
                  ) : results[currentIndex].selectedIndex === null ? (
                    <>
                      <Clock className="w-5 h-5 text-rose-400" />
                      <span className="text-lg font-bold text-rose-400">Time's Up!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span className="text-lg font-bold text-rose-400">Incorrect</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* XP earned for this question */}
            {results[currentIndex] && (
              <div
                className="rounded-xl p-4 mb-6 text-center"
                style={{
                  background: 'rgba(0, 229, 255, 0.08)',
                  border: '1px solid rgba(0, 229, 255, 0.15)',
                }}
              >
                <p className="text-xs text-slate-dim mb-1">XP Earned</p>
                <p className="text-2xl font-extrabold text-cyan-400">
                  +{formatXP(results[currentIndex].xpEarned)} XP
                </p>
                {results[currentIndex].isCorrect && (
                  <p className="text-[11px] text-slate-muted mt-1">
                    Answered in {formatTime(15000 - results[currentIndex].timeRemainingMs)}
                  </p>
                )}
              </div>
            )}

            {/* Ready prompt */}
            <div
              className="rounded-2xl p-6 mb-4"
              style={{
                background: 'linear-gradient(135deg, #1A2235 0%, #161B26 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <h3 className="text-lg font-bold text-white text-center mb-2">Ready for the next question?</h3>
              <p className="text-sm text-slate-muted text-center mb-5">Take a breath. Proceed when you're ready.</p>
              <button
                onClick={handleNextQuestion}
                className="btn-press w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #00C8E8 0%, #0099CC 100%)',
                  boxShadow: '0 0 20px rgba(0, 229, 255, 0.25)',
                  color: '#000D14',
                }}
              >
                Next Question
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Report button */}
            <button
              onClick={handleReportQuestion}
              disabled={isReporting}
              className="w-full py-3 rounded-xl text-xs font-semibold text-slate-dim border border-slate-400/10 flex items-center justify-center gap-2 hover:border-slate-400/20 transition-colors"
            >
              {isReporting ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Report submitted</span>
                </>
              ) : (
                <>
                  <Flag className="w-3.5 h-3.5" />
                  Report previous question
                </>
              )}
            </button>
          </div>
        )}

        {/* Completion Screen */}
        {screen === 'completed' && (
          <div className="animate-fade-in py-8">
            {/* Trophy header */}
            <div className="text-center mb-6">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                }}
              >
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1">Daily Blitz Completed!</h2>
              <p className="text-sm text-slate-muted">Great effort! Here's your summary:</p>
            </div>

            {/* Score card */}
            <div
              className="rounded-2xl p-5 mb-4"
              style={{
                background: 'linear-gradient(135deg, #0F2A3F 0%, #091525 100%)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                boxShadow: '0 0 24px rgba(0, 229, 255, 0.08)',
              }}
            >
              <div className="text-center mb-5">
                <p className="text-xs text-slate-dim uppercase tracking-widest mb-2">Final Score</p>
                <p className="text-5xl font-extrabold mb-1" style={{ color: correctCount >= 8 ? '#10B981' : correctCount >= 5 ? '#F59E0B' : '#EF4444' }}>
                  {correctCount}/{totalQuestions}
                </p>
                <p className="text-sm text-slate-muted">questions correct</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(0, 229, 255, 0.08)' }}>
                  <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <p className="text-lg font-extrabold text-white">{formatXP(totalXP)}</p>
                  <p className="text-[10px] text-slate-dim">Total XP</p>
                </div>
                <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(251, 191, 36, 0.08)' }}>
                  <Target className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <p className="text-lg font-extrabold text-white">{Math.round((correctCount / totalQuestions) * 100)}%</p>
                  <p className="text-[10px] text-slate-dim">Accuracy</p>
                </div>
                <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.08)' }}>
                  <TrendingUp className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-lg font-extrabold text-white">{formatTime(avgTimeMs)}</p>
                  <p className="text-[10px] text-slate-dim">Avg. Speed</p>
                </div>
              </div>

              {/* XP breakdown */}
              <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <p className="text-xs text-slate-dim mb-2 font-semibold">XP Breakdown</p>
                <div className="space-y-1.5">
                  {results.map((r, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-slate-muted">Q{r.questionId}</span>
                      <span className={r.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                        {r.isCorrect ? '+' + formatXP(r.xpEarned) : '0'} XP
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm font-bold mt-3 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-slate-text">Total</span>
                  <span className="text-cyan-400">+{formatXP(totalXP)} XP</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                onClick={onExit}
                className="btn-press w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #00C8E8 0%, #0099CC 100%)',
                  boxShadow: '0 0 20px rgba(0, 229, 255, 0.25)',
                  color: '#000D14',
                }}
              >
                <Home className="w-4 h-4" />
                Return to Dashboard
              </button>
              <button
                onClick={onExit}
                className="w-full py-3 rounded-xl text-xs font-semibold text-slate-dim border border-slate-400/10 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Review Answers (Coming Soon)
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
