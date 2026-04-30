import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, Search, Crown, TrendingUp, Zap, Shield } from 'lucide-react';
import { useData } from '../context/DataContext';

const Leaderboard = () => {
    const { leaderboardData = [] } = useData();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');

    const filtered = (leaderboardData || []).filter(u =>
        u?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u?.walletAddress?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const topThree = filtered.slice(0, 3);
    const rest = filtered.slice(3);

    const podiumOrder = topThree.length === 3 ? [topThree[1], topThree[0], topThree[2]] : topThree;
    const podiumConfig = [
        { height: 120, place: 2, label: '2nd', color: '#94A3B8', glow: 'rgba(148,163,184,0.3)' },
        { height: 160, place: 1, label: '1st', color: '#F59E0B', glow: 'rgba(245,158,11,0.4)' },
        { height: 96,  place: 3, label: '3rd', color: '#CB7148', glow: 'rgba(203,113,72,0.3)' },
    ];

    const getRankBadge = (i) => {
        if (i === 0) return { icon: Crown, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: '1st' };
        if (i === 1) return { icon: Medal, color: '#94A3B8', bg: 'rgba(148,163,184,0.1)', label: '2nd' };
        if (i === 2) return { icon: Star,  color: '#CB7148', bg: 'rgba(203,113,72,0.1)',  label: '3rd' };
        return null;
    };

    return (
        <div className="lb-page">
            <div className="lb-glow lb-glow-1" />
            <div className="lb-glow lb-glow-2" />

            {/* Hero */}
            <header className="lb-hero">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lb-badge">
                    <Trophy size={13} /> <span>EPOCH 04 STANDINGS</span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lb-title">
                    Top <span>Builders</span>.
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lb-sub">
                    The elite contributors driving the Sui ecosystem forward.
                </motion.p>
            </header>

            {/* Podium */}
            {topThree.length === 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lb-podium-wrap"
                >
                    {podiumOrder.map((user, i) => {
                        const cfg = podiumConfig[i];
                        return (
                            <div key={user.walletAddress} className="podium-col">
                                <div className="podium-avatar-wrap">
                                    <div className="podium-avatar" style={{ boxShadow: `0 0 0 4px ${cfg.color}40` }}>
                                        {user.name?.charAt(0) || '?'}
                                    </div>
                                    <div className="podium-rank-badge" style={{ background: cfg.color }}>
                                        {cfg.label}
                                    </div>
                                </div>
                                <div className="podium-name">{user.name || 'Unknown'}</div>
                                <div className="podium-score">{user.totalEarned?.toFixed(2) || '0'} <span>SUI</span></div>
                                <div className="podium-stand" style={{ height: cfg.height, background: `linear-gradient(180deg, ${cfg.color}22, ${cfg.color}08)`, borderColor: `${cfg.color}33` }}>
                                    <span className="podium-stand-number" style={{ color: cfg.color }}>{cfg.place}</span>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>
            )}

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lb-search-bar"
            >
                <Search size={18} className="lb-search-icon" />
                <input
                    placeholder="Search contributors..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <span className="lb-count">{filtered.length} contributors</span>
            </motion.div>

            {/* Rankings list */}
            <div className="lb-list">
                {filtered.map((user, i) => {
                    const badge = getRankBadge(i);
                    return (
                        <motion.div
                            key={user.walletAddress}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: Math.min(i * 0.04, 0.4) }}
                            className={`lb-row ${i < 3 ? 'lb-row-top' : ''}`}
                        >
                            {/* Rank */}
                            <div className="lb-rank">
                                {badge ? (
                                    <div className="lb-rank-badge" style={{ background: badge.bg, color: badge.color }}>
                                        <badge.icon size={16} />
                                    </div>
                                ) : (
                                    <span className="lb-rank-num">#{i + 1}</span>
                                )}
                            </div>

                            {/* User */}
                            <div className="lb-user">
                                <div className="lb-avatar" style={{ background: i < 3 ? `linear-gradient(135deg, var(--color-primary), var(--color-accent))` : 'var(--color-bg-secondary)' }}>
                                    {user.name?.charAt(0) || '?'}
                                </div>
                                <div className="lb-user-info">
                                    <span className="lb-name">{user.name || 'Anonymous'}</span>
                                    <span className="lb-wallet">{user.walletAddress?.substring(0, 6)}...{user.walletAddress?.slice(-4)}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="lb-stats">
                                <div className="lb-stat">
                                    <span className="lb-stat-val">{user.completedBounties || 0}</span>
                                    <span className="lb-stat-lbl">Quests</span>
                                </div>
                                <div className="lb-stat">
                                    <span className="lb-stat-val accent">{user.totalEarned?.toFixed(1) || '0'}</span>
                                    <span className="lb-stat-lbl">SUI Earned</span>
                                </div>
                                <div className="lb-stat">
                                    <span className="lb-stat-val">{user.reputation || 0}</span>
                                    <span className="lb-stat-lbl">Rep Score</span>
                                </div>
                            </div>

                            {/* Tier */}
                            <div className="lb-tier-chip" style={i < 3 ? { background: 'var(--color-primary-soft)', color: 'var(--color-primary)' } : {}}>
                                <Shield size={12} />
                                {i === 0 ? 'Elite' : i < 3 ? 'Pro' : 'Builder'}
                            </div>
                        </motion.div>
                    );
                })}

                {filtered.length === 0 && (
                    <div className="lb-empty">
                        <Trophy size={40} />
                        <h3>No results found</h3>
                        <p>Try adjusting your search query.</p>
                    </div>
                )}
            </div>

            <style>{`
                .lb-page {
                    padding: 120px 32px 80px; max-width: 1000px;
                    margin: 0 auto; position: relative;
                }
                .lb-glow {
                    position: fixed; width: 500px; height: 500px;
                    border-radius: 50%; filter: blur(100px); opacity: 0.06;
                    z-index: -1; pointer-events: none;
                }
                .lb-glow-1 { top: -80px; left: -80px; background: #F59E0B; }
                .lb-glow-2 { bottom: -80px; right: -80px; background: var(--color-primary); }

                /* Hero */
                .lb-hero { text-align: center; padding: 40px 0 56px; }
                .lb-badge {
                    display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px;
                    border-radius: 9999px; background: rgba(245,158,11,0.1); color: #D97706;
                    font-size: 0.72rem; font-weight: 800; letter-spacing: 0.07em;
                    text-transform: uppercase; margin-bottom: 28px; border: 1px solid rgba(245,158,11,0.2);
                }
                .lb-title {
                    font-size: clamp(3rem, 5vw, 5rem); font-weight: 800;
                    letter-spacing: -0.04em; line-height: 1; margin-bottom: 20px;
                }
                .lb-title span {
                    background: linear-gradient(135deg, #F59E0B, #EF4444);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }
                .lb-sub { font-size: 1.1rem; color: var(--color-text-secondary); font-weight: 400; }

                /* Podium */
                .lb-podium-wrap {
                    display: flex; align-items: flex-end; justify-content: center;
                    gap: 24px; margin-bottom: 56px; padding: 0 40px;
                }
                .podium-col { display: flex; flex-direction: column; align-items: center; gap: 0; }
                .podium-avatar-wrap { position: relative; margin-bottom: 12px; }
                .podium-avatar {
                    width: 72px; height: 72px; border-radius: 50%;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.8rem; font-weight: 800; color: white;
                }
                .podium-rank-badge {
                    position: absolute; bottom: -6px; right: -6px;
                    padding: 2px 8px; border-radius: 9999px; color: white;
                    font-size: 0.65rem; font-weight: 800; letter-spacing: 0.04em;
                }
                .podium-name { font-size: 0.9rem; font-weight: 800; color: var(--color-text); margin-bottom: 4px; }
                .podium-score { font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); margin-bottom: 12px; }
                .podium-score span { color: var(--color-primary); }
                .podium-stand {
                    width: 120px; border-radius: 16px 16px 0 0; border: 1px solid;
                    display: flex; align-items: flex-start; justify-content: center; padding-top: 14px;
                }
                .podium-stand-number { font-size: 2rem; font-weight: 800; opacity: 0.5; }

                /* Search */
                .lb-search-bar {
                    display: flex; align-items: center; gap: 14px; padding: 0 24px; height: 60px;
                    background: rgba(255,255,255,0.9); backdrop-filter: blur(20px);
                    border: 2px solid var(--color-border); border-radius: 9999px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.04); margin-bottom: 32px;
                    transition: border-color 0.2s;
                }
                .lb-search-bar:focus-within { border-color: var(--color-primary); }
                .lb-search-icon { color: var(--color-text-muted); flex-shrink: 0; }
                .lb-search-bar input {
                    flex: 1; border: none; background: transparent; outline: none;
                    font-size: 1rem; font-weight: 600; color: var(--color-text);
                    font-family: var(--font-main);
                }
                .lb-count {
                    font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted);
                    padding: 7px 16px; background: var(--color-bg-secondary); border-radius: 9999px; flex-shrink: 0;
                }

                /* List */
                .lb-list { display: flex; flex-direction: column; gap: 12px; }
                .lb-row {
                    display: flex; align-items: center; gap: 20px; padding: 20px 28px;
                    background: white; border: 1px solid var(--color-border); border-radius: 20px;
                    transition: all 0.2s;
                }
                .lb-row:hover { border-color: rgba(56, 193, 244, 0.2); box-shadow: 0 8px 24px rgba(0,0,0,0.05); }
                .lb-row-top { border-color: rgba(56, 193, 244, 0.15); background: linear-gradient(135deg, rgba(56, 193, 244, 0.02), rgba(0, 163, 224, 0.02)); }

                .lb-rank { width: 40px; display: flex; justify-content: center; }
                .lb-rank-badge {
                    width: 36px; height: 36px; border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                }
                .lb-rank-num { font-size: 0.9rem; font-weight: 800; color: var(--color-text-muted); }

                .lb-user { display: flex; align-items: center; gap: 14px; flex: 1; min-width: 0; }
                .lb-avatar {
                    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
                    color: white; display: flex; align-items: center; justify-content: center;
                    font-weight: 800; font-size: 1rem;
                }
                .lb-user-info { display: flex; flex-direction: column; min-width: 0; }
                .lb-name { font-size: 0.95rem; font-weight: 800; color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .lb-wallet { font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-text-muted); }

                .lb-stats { display: flex; gap: 40px; }
                .lb-stat { display: flex; flex-direction: column; align-items: center; }
                .lb-stat-val { font-size: 1rem; font-weight: 800; color: var(--color-text); }
                .lb-stat-val.accent { color: var(--color-primary); }
                .lb-stat-lbl { font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.03em; }

                .lb-tier-chip {
                    display: flex; align-items: center; gap: 6px; padding: 6px 14px;
                    border-radius: 9999px; font-size: 0.78rem; font-weight: 800;
                    background: var(--color-bg-secondary); color: var(--color-text-muted);
                    flex-shrink: 0;
                }

                .lb-empty {
                    display: flex; flex-direction: column; align-items: center;
                    padding: 100px 40px; text-align: center; color: var(--color-text-muted);
                }
                .lb-empty h3 { font-size: 1.5rem; font-weight: 800; color: var(--color-text); margin: 20px 0 8px; }

                @media (max-width: 768px) {
                    .lb-page { padding: 100px 16px 60px; }
                    .lb-podium-wrap { display: none; }
                    .lb-stats { gap: 20px; }
                    .lb-row { padding: 16px 20px; gap: 12px; }
                }
            `}</style>
        </div>
    );
};

export default Leaderboard;
