'use client';

import { useState, useEffect } from 'react';
import {
  Crown, Lock, Users, TrendingUp, Coins, Gift, Trophy, Shield, ChevronDown,
  Calculator, Newspaper, MessageCircle, Instagram, Send, Check, Zap,
  Target, Award, Flame, ArrowRight, Menu, X, Sparkles, Dice5,
} from 'lucide-react';

// ──────────────────────────────────────────────
// FORTREX Crest (SVG)
// ──────────────────────────────────────────────
function FortrexCrest({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" className="crest-glow">
      {/* Outer shield */}
      <path d="M60 8 L104 24 V58 C104 86 85 102 60 112 C35 102 16 86 16 58 V24 Z"
        stroke="url(#gold-grad)" strokeWidth="2.5" fill="rgba(212,175,55,0.05)" />
      {/* Inner shield */}
      <path d="M60 18 L94 30 V56 C94 78 80 92 60 100 C40 92 26 78 26 56 V30 Z"
        stroke="url(#gold-grad)" strokeWidth="1.5" fill="rgba(212,175,55,0.03)" />
      {/* Crown */}
      <path d="M42 42 L48 32 L54 40 L60 28 L66 40 L72 32 L78 42 L78 48 L42 48 Z"
        fill="url(#gold-grad)" stroke="#E8D58F" strokeWidth="0.5" />
      {/* F monogram */}
      <text x="60" y="76" textAnchor="middle" fontSize="32" fontWeight="700"
        fill="url(#gold-grad)" fontFamily="serif">F</text>
      {/* Base line */}
      <line x1="35" y1="88" x2="85" y2="88" stroke="url(#gold-grad)" strokeWidth="1" />
      <text x="60" y="96" textAnchor="middle" fontSize="8" fill="#D4AF37"
        letterSpacing="3" fontFamily="sans-serif">FORTREX</text>
      <defs>
        <linearGradient id="gold-grad" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="#F5EBC8" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A7209" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ──────────────────────────────────────────────
// Live Counter (animated)
// ──────────────────────────────────────────────
function LiveCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient tabular-nums">
        {count.toLocaleString()}
      </div>
      <div className="text-xs md:text-sm text-royal-300/70 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Countdown Timer
// ──────────────────────────────────────────────
function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calculate());
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex gap-4 justify-center">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Sec', value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-2xl md:text-3xl font-serif font-bold text-royal-300 tabular-nums
            bg-midnight-300/50 border border-royal-300/20 rounded-lg px-3 py-2 min-w-[60px] royal-glow">
            {pad(item.value)}
          </div>
          <div className="text-xs text-royal-300/50 uppercase tracking-wider mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────
// Navbar
// ──────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Tournaments', href: '#tournaments' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Forts', href: '#forts' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Resources', href: '#resources' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled ? 'bg-midnight-500/90 backdrop-blur-lg border-b border-royal-300/20 py-3'
                 : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <FortrexCrest size={40} />
          <span className="text-2xl font-serif font-bold tracking-widest text-gold-gradient">FORTREX</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm text-royal-100/70 hover:text-royal-300 transition-colors uppercase tracking-wide font-medium">
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#login" className="text-sm text-royal-300 hover:text-royal-100 transition-colors font-medium">
            Login
          </a>
          <a href="#register" className="btn-royal px-6 py-2.5 rounded-lg text-sm">
            Join Now
          </a>
        </div>

        {/* Mobile Menu */}
        <button className="lg:hidden text-royal-300" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-midnight-400/95 backdrop-blur-lg border-t border-royal-300/20 mt-3 py-6 px-4">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="block py-3 text-royal-100/70 hover:text-royal-300 transition-colors uppercase tracking-wide">
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 mt-4">
            <a href="#login" className="btn-ghost-royal flex-1 text-center py-2.5 rounded-lg text-sm">Login</a>
            <a href="#register" className="btn-royal flex-1 text-center py-2.5 rounded-lg text-sm">Join Now</a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ──────────────────────────────────────────────
// Hero Section
// ──────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pattern-overlay">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-300/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-royal-500/5 rounded-full blur-[100px] animate-float"
        style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
        {/* Crest */}
        <div className="flex justify-center mb-8 animate-scale-in">
          <FortrexCrest size={140} />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 badge-royal px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 animate-fade-in-up">
          <span className="w-2 h-2 bg-emerald-400 rounded-full live-pulse" />
          Season 1 — Now Open
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-gold-gradient mb-4 animate-fade-in-up"
          style={{ animationDelay: '0.1s', opacity: 0 }}>
          The Fortress of
          <br />
          Trading Champions
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-royal-100/60 max-w-2xl mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: '0.2s', opacity: 0 }}>
          Compete in elite trading tournaments. Earn Forts through skill and consistency.
          Win funded accounts. Join a community where champions are forged.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up"
          style={{ animationDelay: '0.3s', opacity: 0 }}>
          <a href="#register" className="btn-royal px-10 py-4 rounded-lg text-base">
            Enter the Arena
          </a>
          <a href="#tournaments" className="btn-ghost-royal px-10 py-4 rounded-lg text-base">
            View Tournaments
          </a>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto glass-card rounded-2xl border border-royal-300/15 p-8 royal-glow animate-fade-in-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}>
          <LiveCounter target={8247} label="Traders Joined" />
          <LiveCounter target={156} label="Accounts Won" />
          <LiveCounter target={420000} label="Forts Earned" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="text-royal-300/40" size={32} />
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Tournaments Section
// ──────────────────────────────────────────────
function Tournaments() {
  const activeContest = {
    name: 'Season 1 — The Golden Cup',
    prize: '50 Funded Accounts',
    prizeValue: '$250,000',
    endDate: '2026-09-30T23:59:59',
    spots: 500,
    filled: 342,
    brackets: [
      { name: 'Lightweight', range: '$10K – $25K', slots: 200, filled: 156 },
      { name: 'Middleweight', range: '$50K – $100K', slots: 200, filled: 128 },
      { name: 'Heavyweight', range: '$200K+', slots: 100, filled: 58 },
    ],
  };

  const lockedContests = [
    { name: 'The Royal Rumble', unlockAt: 10000, current: 8247, prize: '100 Funded Accounts' },
    { name: 'Fortress Championship', unlockAt: 15000, current: 8247, prize: '200 Funded Accounts' },
  ];

  return (
    <section id="tournaments" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-royal px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
            <Trophy size={14} /> Tournaments
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-4">
            Compete for Glory
          </h2>
          <p className="text-royal-100/50 max-w-2xl mx-auto">
            Three weight classes. One composite score. Monthly seasons. Fair, transparent, and built for serious traders.
          </p>
        </div>

        {/* Active Contest Card */}
        <div className="glass-card rounded-3xl border border-royal-300/20 p-8 md:p-12 royal-glow-strong mb-8 hover-lift">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Contest Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-royal-300/10 border border-royal-300/30 flex items-center justify-center">
                  <Trophy className="text-royal-300" size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-royal-300/60">Active Tournament</div>
                  <h3 className="text-2xl font-serif font-bold text-royal-300">{activeContest.name}</h3>
                </div>
              </div>

              {/* Prize */}
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-royal-300/50">Prize Pool</div>
                  <div className="text-3xl font-serif font-bold text-gold-gradient">{activeContest.prize}</div>
                  <div className="text-sm text-royal-300/60">Worth {activeContest.prizeValue}</div>
                </div>
              </div>

              {/* Countdown */}
              <div className="mb-8">
                <div className="text-xs uppercase tracking-widest text-royal-300/50 mb-3">Season Ends In</div>
                <CountdownTimer targetDate={activeContest.endDate} />
              </div>

              {/* Brackets */}
              <div className="space-y-3">
                <div className="text-xs uppercase tracking-widest text-royal-300/50 mb-2">Weight Brackets</div>
                {activeContest.brackets.map((bracket) => (
                  <div key={bracket.name} className="flex items-center justify-between bg-midnight-300/40 rounded-lg p-3 border border-royal-300/10">
                    <div>
                      <span className="text-royal-100 font-medium">{bracket.name}</span>
                      <span className="text-royal-300/40 text-sm ml-2">{bracket.range}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-midnight-600 rounded-full overflow-hidden">
                        <div className="h-full progress-gold rounded-full"
                          style={{ width: `${(bracket.filled / bracket.slots) * 100}%` }} />
                      </div>
                      <span className="text-sm text-royal-300/60 tabular-nums">{bracket.filled}/{bracket.slots}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-royal px-8 py-3 rounded-lg text-sm mt-6 w-full sm:w-auto">
                Register for Season 1
              </button>
            </div>

            {/* Right: Scoring Info */}
            <div className="lg:w-80 glass-card rounded-2xl border border-royal-300/15 p-6">
              <div className="text-xs uppercase tracking-widest text-royal-300/50 mb-4">Composite Scoring</div>
              <div className="space-y-4">
                {[
                  { label: 'ROI %', weight: '40%', desc: 'Normalized across all account sizes' },
                  { label: 'Consistency', weight: '30%', desc: 'Daily returns, profit factor, win rate' },
                  { label: 'Risk Management', weight: '30%', desc: 'Drawdown adherence, lot discipline' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-royal-100 font-medium">{item.label}</span>
                      <span className="text-royal-300 font-bold text-sm">{item.weight}</span>
                    </div>
                    <div className="text-xs text-royal-300/40">{item.desc}</div>
                    <div className="w-full h-1.5 bg-midnight-600 rounded-full mt-2 overflow-hidden">
                      <div className="h-full progress-gold rounded-full"
                        style={{ width: item.weight }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="divider-gold my-5" />
              <div className="text-xs text-royal-300/50 leading-relaxed">
                <Shield size={12} className="inline mr-1 text-royal-300" />
                API-verified trades. AI fraud detection. Min 5 trading days. 5% daily loss / 10% max drawdown rules apply.
              </div>
            </div>
          </div>
        </div>

        {/* Locked Contests */}
        <div className="grid md:grid-cols-2 gap-6">
          {lockedContests.map((contest) => {
            const progress = (contest.current / contest.unlockAt) * 100;
            const remaining = contest.unlockAt - contest.current;
            return (
              <div key={contest.name} className="relative glass-card rounded-2xl border border-royal-300/15 p-6 overflow-hidden">
                {/* Locked overlay */}
                <div className="absolute inset-0 locked-overlay flex flex-col items-center justify-center z-10">
                  <Lock className="text-royal-300/60 mb-3" size={32} />
                  <div className="text-royal-300/70 font-medium">Unlocks at {contest.unlockAt.toLocaleString()} registrations</div>
                  <div className="text-royal-300/40 text-sm mt-1">{remaining.toLocaleString()} more traders needed</div>
                </div>

                {/* Blurred content */}
                <div className="filter blur-sm opacity-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-royal-300/10 border border-royal-300/30 flex items-center justify-center">
                      <Crown className="text-royal-300" size={20} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-royal-300/50">Locked Tournament</div>
                      <h3 className="text-xl font-serif font-bold text-royal-300">{contest.name}</h3>
                    </div>
                  </div>
                  <div className="text-2xl font-serif text-gold-gradient mb-4">{contest.prize}</div>
                </div>

                {/* Progress bar (visible) */}
                <div className="relative z-20 mt-2">
                  <div className="flex justify-between text-xs text-royal-300/50 mb-2">
                    <span>Registration Progress</span>
                    <span>{contest.current.toLocaleString()} / {contest.unlockAt.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-midnight-600 rounded-full overflow-hidden border border-royal-300/20">
                    <div className="h-full progress-gold rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// How It Works Section
// ──────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      icon: <Users className="text-royal-300" size={28} />,
      step: '01',
      title: 'Register',
      desc: 'Create your FORTREX account with phone verification. Connect your Instagram. Get your personal invite link instantly.',
    },
    {
      icon: <TrendingUp className="text-royal-300" size={28} />,
      step: '02',
      title: 'Buy Funded Account',
      desc: 'Purchase a prop firm account using FORTREX partner codes. Choose your size — $10K to $200K+. Your trading journey begins.',
    },
    {
      icon: <Trophy className="text-royal-300" size={28} />,
      step: '03',
      title: 'Compete & Win',
      desc: 'Trade throughout the season. Your composite score is auto-calculated. Top performers win free accounts, Forts, and glory.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-royal px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
            <Zap size={14} /> Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-4">
            Three Steps to Victory
          </h2>
          <p className="text-royal-100/50 max-w-2xl mx-auto">
            No complexity. No confusion. Register, trade, win. That&apos;s the FORTREX way.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className="relative group">
              {/* Connection line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-royal-300/30 to-transparent" />
              )}

              <div className="glass-card rounded-2xl border border-royal-300/15 p-8 hover-lift text-center">
                <div className="text-6xl font-serif font-bold text-royal-300/10 absolute top-4 right-6">{step.step}</div>
                <div className="relative w-16 h-16 mx-auto mb-6 rounded-full bg-midnight-300/50 border border-royal-300/30 flex items-center justify-center royal-glow group-hover:royal-glow-strong transition-all">
                  {step.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-royal-300 mb-3">{step.title}</h3>
                <p className="text-sm text-royal-100/50 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Forts Currency Section
// ──────────────────────────────────────────────
function FortsSection() {
  const earnTasks = [
    { icon: <Flame size={18} />, label: 'Daily Login Streak', amount: '50 – 500 ₣', desc: 'Exponential escalation. Miss a day, lose your streak.' },
    { icon: <Users size={18} />, label: 'Valid Invite', amount: '200 ₣', desc: 'When your invite registers AND joins a competition.' },
    { icon: <Target size={18} />, label: 'Trading Milestone', amount: '100 – 1000 ₣', desc: 'Volume-based rewards. The more you trade, the more you earn.' },
    { icon: <Check size={18} />, label: 'Social Follow', amount: '100 ₣', desc: 'Follow FORTREX on Instagram, X, YouTube, Telegram.' },
    { icon: <Award size={18} />, label: 'Quiz Completion', amount: '50 – 200 ₣', desc: 'Test your trading knowledge. Learn and earn.' },
  ];

  const redeemOptions = [
    { icon: <Trophy size={20} />, label: 'Free Funded Account', cost: '5,000 ₣' },
    { icon: <Dice5 size={20} />, label: 'Lucky Draw Ticket', cost: '500 ₣' },
    { icon: <Crown size={20} />, label: 'Premium Discord Role', cost: '1,500 ₣' },
    { icon: <Sparkles size={20} />, label: 'Contest Entry Pass', cost: '1,000 ₣' },
  ];

  return (
    <section id="forts" className="relative py-24 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-royal-300/3 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-royal px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
            <Coins size={14} /> Currency System
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-4">
            The Fort Economy
          </h2>
          <p className="text-royal-100/50 max-w-2xl mx-auto">
            Earn Forts (₣) through tasks, invites, and trading. Redeem for accounts, lucky draws, and premium perks.
            Provably fair. Transparent. Yours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Earn Forts */}
          <div className="glass-card rounded-2xl border border-royal-300/15 p-8">
            <h3 className="text-xl font-serif font-bold text-royal-300 mb-6 flex items-center gap-2">
              <Coins size={20} /> Earn Forts
            </h3>
            <div className="space-y-4">
              {earnTasks.map((task) => (
                <div key={task.label} className="flex items-start gap-4 bg-midnight-300/30 rounded-xl p-4 border border-royal-300/10 hover-lift">
                  <div className="w-10 h-10 rounded-lg bg-royal-300/10 border border-royal-300/20 flex items-center justify-center text-royal-300 shrink-0">
                    {task.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-royal-100 font-medium">{task.label}</span>
                      <span className="text-royal-300 font-bold text-sm">{task.amount}</span>
                    </div>
                    <div className="text-xs text-royal-300/40 mt-1">{task.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Redeem Forts */}
          <div className="glass-card rounded-2xl border border-royal-300/15 p-8">
            <h3 className="text-xl font-serif font-bold text-royal-300 mb-6 flex items-center gap-2">
              <Gift size={20} /> Redeem Forts
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {redeemOptions.map((option) => (
                <div key={option.label} className="glass-card rounded-xl border border-royal-300/15 p-6 text-center hover-lift">
                  <div className="w-12 h-12 mx-auto rounded-full bg-royal-300/10 border border-royal-300/30 flex items-center justify-center text-royal-300 mb-3 royal-glow">
                    {option.icon}
                  </div>
                  <div className="text-sm font-medium text-royal-100 mb-1">{option.label}</div>
                  <div className="text-royal-300 font-bold text-sm">{option.cost}</div>
                </div>
              ))}
            </div>

            {/* Lucky Draw Info */}
            <div className="mt-6 glass-card rounded-xl border border-royal-300/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Dice5 size={16} className="text-royal-300" />
                <span className="text-sm font-medium text-royal-300">Provably Fair Lucky Draw</span>
              </div>
              <div className="text-xs text-royal-300/40">
                HMAC-SHA256 server/client seed system. Every ticket has an equal chance. Winners are verifiable. No manipulation. Ever.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Leaderboard Section
// ──────────────────────────────────────────────
function Leaderboard() {
  const [bracket, setBracket] = useState('Lightweight');
  const brackets = ['Lightweight', 'Middleweight', 'Heavyweight'];

  const leaderboard = [
    { rank: 1, name: 'GoldSeeker_92', score: 94.8, roi: 18.2, consistency: 92, risk: 88, account: '$25K' },
    { rank: 2, name: 'PipWhisperer', score: 91.3, roi: 15.7, consistency: 89, risk: 85, account: '$25K' },
    { rank: 3, name: 'TrendRider_X', score: 88.6, roi: 14.1, consistency: 86, risk: 82, account: '$10K' },
    { rank: 4, name: 'FortBuilder', score: 85.2, roi: 12.8, consistency: 83, risk: 80, account: '$25K' },
    { rank: 5, name: 'CrownHunter', score: 82.7, roi: 11.5, consistency: 81, risk: 77, account: '$10K' },
  ];

  const rankColor = (rank: number) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return 'text-royal-100/50';
  };

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-300" size={16} />;
    if (rank === 2) return <Award className="text-gray-300" size={16} />;
    if (rank === 3) return <Award className="text-orange-400" size={16} />;
    return <span className="text-xs text-royal-300/40">{rank}</span>;
  };

  return (
    <section id="leaderboard" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-royal px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
            <Trophy size={14} /> Season 1 Rankings
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-4">
            Hall of Champions
          </h2>
          <p className="text-royal-100/50 max-w-2xl mx-auto">
            Live leaderboard. Updated in real-time. Your rank is just one good trade away.
          </p>
        </div>

        {/* Bracket Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {brackets.map((b) => (
            <button key={b} onClick={() => setBracket(b)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${bracket === b ? 'tab-active' : 'text-royal-300/40 hover:text-royal-300/70'}`}>
              {b}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="glass-card rounded-2xl border border-royal-300/15 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-4 md:px-6 py-4 border-b border-royal-300/15 text-xs uppercase tracking-widest text-royal-300/50">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-3">Trader</div>
            <div className="col-span-2 text-right">Score</div>
            <div className="col-span-2 text-right hidden md:block">ROI %</div>
            <div className="col-span-2 text-right hidden md:block">Consistency</div>
            <div className="col-span-2 text-right hidden lg:block">Risk</div>
          </div>

          {/* Rows */}
          {leaderboard.map((entry) => (
            <div key={entry.rank}
              className="grid grid-cols-12 gap-2 px-4 md:px-6 py-4 border-b border-royal-300/5 hover:bg-royal-300/5 transition-colors items-center">
              <div className="col-span-1 flex justify-center">
                <div className="w-8 h-8 rounded-full bg-midnight-300/50 border border-royal-300/20 flex items-center justify-center">
                  {rankIcon(entry.rank)}
                </div>
              </div>
              <div className="col-span-3">
                <div className="text-royal-100 font-medium text-sm">{entry.name}</div>
                <div className="text-xs text-royal-300/40">{entry.account} account</div>
              </div>
              <div className="col-span-2 text-right">
                <span className={`font-bold ${rankColor(entry.rank)}`}>{entry.score}</span>
              </div>
              <div className="col-span-2 text-right hidden md:block">
                <span className="text-royal-100/70">+{entry.roi}%</span>
              </div>
              <div className="col-span-2 text-right hidden md:block">
                <span className="text-royal-100/70">{entry.consistency}</span>
              </div>
              <div className="col-span-2 text-right hidden lg:block">
                <span className="text-royal-100/70">{entry.risk}</span>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="px-6 py-4 text-center">
            <a href="#register" className="text-sm text-royal-300 hover:text-royal-100 transition-colors inline-flex items-center gap-2">
              View Full Leaderboard <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Resources / Calculators Section
// ──────────────────────────────────────────────
function Resources() {
  const [calcType, setCalcType] = useState('lot-size');
  const calculators = [
    { id: 'lot-size', label: 'Lot Size', icon: <Calculator size={16} /> },
    { id: 'profit', label: 'Profit', icon: <TrendingUp size={16} /> },
    { id: 'consistency', label: 'Consistency', icon: <Target size={16} /> },
  ];

  // Lot Size Calculator State
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1);
  const [stopPips, setStopPips] = useState(50);
  const [pair, setPair] = useState('EUR/USD');

  const pipValues: Record<string, number> = {
    'EUR/USD': 10, 'GBP/USD': 10, 'USD/JPY': 9.1, 'AUD/USD': 10,
    'XAU/USD': 10, 'BTC/USD': 1, 'ETH/USD': 1,
  };

  const riskAmount = accountSize * (riskPercent / 100);
  const lotSize = stopPips > 0 ? (riskAmount / (stopPips * (pipValues[pair] || 10))).toFixed(2) : '0.00';

  return (
    <section id="resources" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-royal px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
            <Calculator size={14} /> Trading Tools
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-4">
            Your Trading Arsenal
          </h2>
          <p className="text-royal-100/50 max-w-2xl mx-auto">
            Professional-grade calculators. Real-time market news. Everything you need to trade like a champion.
          </p>
        </div>

        {/* Calculator Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {calculators.map((calc) => (
            <button key={calc.id} onClick={() => setCalcType(calc.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all
                ${calcType === calc.id ? 'btn-royal' : 'btn-ghost-royal'}`}>
              {calc.icon} {calc.label}
            </button>
          ))}
        </div>

        {/* Calculator Display */}
        <div className="glass-card rounded-2xl border border-royal-300/15 p-8 royal-glow">
          {calcType === 'lot-size' && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-royal-300/50 mb-2 block">Trading Pair</label>
                  <select value={pair} onChange={(e) => setPair(e.target.value)}
                    className="input-royal w-full px-4 py-3 rounded-lg text-sm">
                    {Object.keys(pipValues).map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-royal-300/50 mb-2 block">
                    Account Size: <span className="text-royal-300">${accountSize.toLocaleString()}</span>
                  </label>
                  <input type="range" min="5000" max="200000" step="5000"
                    value={accountSize} onChange={(e) => setAccountSize(Number(e.target.value))}
                    className="w-full accent-royal-300" />
                  <div className="flex justify-between text-xs text-royal-300/30 mt-1">
                    <span>$5K</span><span>$50K</span><span>$100K</span><span>$200K</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-royal-300/50 mb-2 block">
                    Risk Per Trade: <span className="text-royal-300">{riskPercent}%</span>
                  </label>
                  <input type="range" min="0.5" max="5" step="0.5"
                    value={riskPercent} onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full accent-royal-300" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-royal-300/50 mb-2 block">
                    Stop Loss (pips): <span className="text-royal-300">{stopPips}</span>
                  </label>
                  <input type="range" min="5" max="200" step="5"
                    value={stopPips} onChange={(e) => setStopPips(Number(e.target.value))}
                    className="w-full accent-royal-300" />
                </div>
              </div>

              {/* Output */}
              <div className="flex flex-col justify-center glass-card rounded-xl border border-royal-300/20 p-8 royal-glow-strong text-center">
                <div className="text-xs uppercase tracking-widest text-royal-300/50 mb-3">Recommended Lot Size</div>
                <div className="text-5xl font-serif font-bold text-gold-gradient mb-4">{lotSize}</div>
                <div className="text-sm text-royal-300/60">lots for {pair}</div>
                <div className="divider-gold my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-royal-300/50">Risk Amount</span>
                    <span className="text-royal-100">${riskAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-300/50">Pip Value</span>
                    <span className="text-royal-100">${(pipValues[pair] || 10).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-300/50">Potential Loss</span>
                    <span className="text-red-400/80">${(stopPips * (pipValues[pair] || 10) * Number(lotSize)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {calcType === 'profit' && (
            <div className="text-center py-12">
              <TrendingUp className="text-royal-300/30 mx-auto mb-4" size={48} />
              <p className="text-royal-100/50">Profit Calculator — Enter position size, entry/exit prices, and pair to calculate P/L.</p>
              <div className="text-xs text-royal-300/30 mt-2">Full interactive calculator in production build</div>
            </div>
          )}

          {calcType === 'consistency' && (
            <div className="text-center py-12">
              <Target className="text-royal-300/30 mx-auto mb-4" size={48} />
              <p className="text-royal-100/50">Consistency Calculator — Input your daily returns to get profit factor, Sharpe ratio, and consistency score.</p>
              <div className="text-xs text-royal-300/30 mt-2">Full interactive calculator in production build</div>
            </div>
          )}
        </div>

        {/* News Section Preview */}
        <div className="mt-8 glass-card rounded-2xl border border-royal-300/15 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="text-royal-300" size={20} />
            <h3 className="text-lg font-serif font-bold text-royal-300">Market News</h3>
            <span className="ml-2 text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full live-pulse" /> LIVE
            </span>
          </div>
          <div className="space-y-3">
            {[
              { title: 'FOMC Meeting Minutes — Rate Decision Impact on USD Pairs', time: '2h ago', tag: 'Fundamental' },
              { title: 'Gold Breaks Key Resistance at $2,400 — What It Means for Traders', time: '4h ago', tag: 'Technical' },
              { title: 'Non-Farm Payrolls Preview — Consensus Estimates & Market Positioning', time: '6h ago', tag: 'Economic' },
            ].map((news) => (
              <div key={news.title} className="flex items-center justify-between bg-midnight-300/30 rounded-lg p-3 border border-royal-300/10 hover-lift">
                <div>
                  <div className="text-sm text-royal-100/80">{news.title}</div>
                  <div className="text-xs text-royal-300/40 mt-1">{news.time} • {news.tag}</div>
                </div>
                <ArrowRight className="text-royal-300/30" size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Social Proof / Discord CTA
// ──────────────────────────────────────────────
function SocialCTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-royal-300/5 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 badge-royal px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6">
          <MessageCircle size={14} /> Join the Community
        </div>

        <h2 className="text-4xl md:text-6xl font-serif font-bold text-gold-gradient mb-6">
          The Citadel Awaits
        </h2>

        <p className="text-lg text-royal-100/50 max-w-2xl mx-auto mb-10">
          FORTREX Discord is where champions gather. Real-time signals, live tournament updates,
          direct access to mentors, and a community that pushes you to trade better.
          Your Forts balance, rank, and identity sync automatically.
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <a href="#" className="flex items-center gap-2 glass-card border border-royal-300/20 rounded-xl px-6 py-3 hover-lift">
            <MessageCircle className="text-royal-300" size={20} />
            <span className="text-sm font-medium text-royal-100">Discord — FORTREX Citadel</span>
          </a>
          <a href="#" className="flex items-center gap-2 glass-card border border-royal-300/20 rounded-xl px-6 py-3 hover-lift">
            <Send className="text-royal-300" size={20} />
            <span className="text-sm font-medium text-royal-100">Telegram — FORTREX Signal</span>
          </a>
          <a href="#" className="flex items-center gap-2 glass-card border border-royal-300/20 rounded-xl px-6 py-3 hover-lift">
            <Instagram className="text-royal-300" size={20} />
            <span className="text-sm font-medium text-royal-100">Instagram — @fortrex</span>
          </a>
        </div>

        {/* Big CTA */}
        <a href="#" className="btn-royal inline-flex items-center gap-2 px-12 py-4 rounded-lg text-base">
          Enter the Citadel <ArrowRight size={18} />
        </a>

        <div className="mt-6 text-xs text-royal-300/40">
          One account. One identity. One currency. Synced across website, Discord, and Telegram.
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// FAQ Section
// ──────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    {
      q: 'How do I join a FORTREX tournament?',
      a: 'Register on the website with phone verification, connect your Instagram, and follow our socials. Then purchase a prop firm account using FORTREX partner codes. Once verified, you\'re automatically entered into the active season in your weight bracket.',
    },
    {
      q: 'How are winners determined?',
      a: 'We use a composite scoring system: 40% ROI (normalized by percentage, not raw dollars), 30% consistency (daily returns, profit factor, win rate), and 30% risk management (drawdown adherence, lot size discipline). This ensures fair comparison across all account sizes.',
    },
    {
      q: 'What are Forts (₣) and how do I earn them?',
      a: 'Forts are FORTREX\'s virtual currency. Earn them through daily login streaks, valid invites (when your referral registers AND joins a competition), trading volume milestones, following our socials, and completing trading quizzes. Redeem Forts for free accounts, lucky draw tickets, and premium Discord roles.',
    },
    {
      q: 'Is the lucky draw really fair?',
      a: 'Absolutely. We use an HMAC-SHA256 server/client seed system — the same provably fair technology used by major crypto platforms. Every ticket has an equal mathematical chance, and winners are verifiable. No manipulation, ever.',
    },
    {
      q: 'How does FORTREX prevent fraud and fake invites?',
      a: 'Multiple layers: device fingerprinting, IP reputation checks (VPN/datacenter blocking), phone OTP verification, Instagram follow verification, trade timestamp correlation, self-referral prevention via wallet/device hash matching, and behavioral analysis. Fake invites (j4j, bots) are automatically detected and voided.',
    },
    {
      q: 'Can I compete with any prop firm account?',
      a: 'Yes, as long as you purchased it using a FORTREX partner code. We support multiple prop firms. Your account size determines your weight bracket (Lightweight $10K-$25K, Middleweight $50K-$100K, Heavyweight $200K+).',
    },
    {
      q: 'Do I need to use the same username on Discord?',
      a: 'Your FORTREX identity (username, Forts balance, rank) automatically syncs to Discord when you join via your personal invite link. One account, one identity, everywhere.',
    },
    {
      q: 'What happens if I miss a season?',
      a: 'Seasons are monthly. Missing one doesn\'t affect your Forts balance or rank. New seasons bring new opportunities. Your earned Forts carry over indefinitely.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-royal px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-4">
            <ChevronDown size={14} /> Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-4">
            Frequently Asked
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-xl border border-royal-300/15 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-royal-300/5 transition-colors">
                <span className="text-royal-100 font-medium text-sm md:text-base">{faq.q}</span>
                <ChevronDown className={`text-royal-300 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} size={18} />
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-sm text-royal-100/50 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-royal-300/15">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <FortrexCrest size={40} />
            <div>
              <div className="text-xl font-serif font-bold text-gold-gradient">FORTREX</div>
              <div className="text-xs text-royal-300/40">The Fortress of Trading Champions</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-royal-300/50 hover:text-royal-300 transition-colors">Terms & Conditions</a>
            <a href="#" className="text-royal-300/50 hover:text-royal-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-royal-300/50 hover:text-royal-300 transition-colors">Refund Policy</a>
            <a href="#" className="text-royal-300/50 hover:text-royal-300 transition-colors">Contact</a>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass-card border border-royal-300/20 flex items-center justify-center text-royal-300 hover-lift">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card border border-royal-300/20 flex items-center justify-center text-royal-300 hover-lift">
              <MessageCircle size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card border border-royal-300/20 flex items-center justify-center text-royal-300 hover-lift">
              <Send size={18} />
            </a>
          </div>
        </div>

        <div className="divider-gold my-6" />

        <div className="text-center text-xs text-royal-300/30">
          © 2026 FORTREX. All rights reserved. Trading involves risk. Past performance is not indicative of future results.
          <br />
          FORTREX is not a financial advisor. All tournaments are skill-based competitions.
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <Tournaments />
      <HowItWorks />
      <FortsSection />
      <Leaderboard />
      <Resources />
      <SocialCTA />
      <FAQ />
      <Footer />
    </main>
  );
}
