import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard
import { Trophy, Medal, Star, Flame, Crown, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Leaderboard Page - Redesigned for a high-performance FinTech aesthetic.
 * Showcases top contributors with a clean, row-based ranking system
 * inspired by First Dollar and professional trading dashboards.
 */
const Leaderboard = () => {
    const { leaderboard } = useData();
    const [activeTab, setActiveTab] = useState('weekly');

    if (!leaderboard) return <div className="loading-state">Evaluating contributor rankings...</div>;

    // Rank sorting logic
    const sortedUsers = [...leaderboard].sort((a, b) => {
        if (activeTab === 'weekly') return b.quests - a.quests;
        return b.xp - a.xp;
    });

    const topUser = sortedUsers[0];

    return (
        <div className="leaderboard-container animate-fade-in">
            <header className="page-header">
                <div className="header-info">
                    <h1 className="header-title">Network Rankings</h1>
                    <p className="header-subtitle">Recognizing the most active contributors across the Sui-gig network.</p>
                </div>
                <div className="tab-switcher">
                    <button 
                        className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
                        onClick={() => setActiveTab('weekly')}
                    >
                        Weekly Raider
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'allTime' ? 'active' : ''}`}
                        onClick={() => setActiveTab('allTime')}
                    >
                        Legacy Leaders
                    </button>
                </div>
            </header>

            {/* Featured Top Performer (The "Leader") */}
            <div className="top-performer-section">
                <SharpCard className="leader-card">
                    <div className="leader-badge">
                        <Crown size={16} /> TOP PERFORMER
                    </div>
                    <div className="leader-details">
                        <div className="leader-avatar-box">
                             <img src={topUser?.avatar} alt={topUser?.name} className="leader-img" />
                        </div>
                        <div className="leader-text">
                            <h2 className="leader-name">{topUser?.name}</h2>
                            <p className="leader-rank-text">Rank #1 • {topUser?.xp.toLocaleString()} XP</p>
                        </div>
                        <div className="leader-stats-pill">
                            <div className="pill-item">
                                <span className="p-label">WEEKLY EARNINGS</span>
                                <span className="p-value text-success">${topUser?.earnings.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </SharpCard>
            </div>

            {/* List of Contributors */}
            <div className="ranking-table-container">
                <div className="table-header">
                    <span className="col-rank">RANK</span>
                    <span className="col-user">CONTRIBUTOR</span>
                    <span className="col-val">{activeTab === 'weekly' ? 'QUESTS' : 'TOTAL XP'}</span>
                    <span className="col-action"></span>
                </div>

                <div className="ranking-rows">
                    {sortedUsers.slice(0, 15).map((user, index) => (
                        <motion.div 
                            key={user.id} 
                            className="rank-entry"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                        >
                            <div className="col-rank">
                               {index === 0 ? <Crown size={18} className="gold" /> : 
                                index === 1 ? <Medal size={18} className="silver" /> :
                                index === 2 ? <Medal size={18} className="bronze" /> :
                                <span className="rank-num">#{index + 1}</span>}
                            </div>
                            <div className="col-user">
                                <img src={user.avatar} alt="" className="user-avatar-tiny" />
                                <div className="user-meta">
                                    <span className="user-name-bold">{user.name}</span>
                                    <span className="user-level-tag">LVL {user.level}</span>
                                </div>
                            </div>
                            <div className="col-val">
                                <span className="val-text">
                                    {activeTab === 'weekly' ? user.quests : user.xp.toLocaleString()}
                                </span>
                            </div>
                            <div className="col-action">
                                <div className="trend-indicator up">
                                    <TrendingUp size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .leaderboard-container {
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .tab-switcher {
                    display: flex;
                    background: #f1f5f9;
                    padding: 4px;
                    border-radius: var(--radius-sm);
                    height: fit-content;
                }

                .tab-btn {
                    padding: 8px 16px;
                    border-radius: 4px;
                    border: none;
                    background: transparent;
                    color: var(--color-text-muted);
                    font-size: 0.85rem;
                    font-weight: 700;
                    transition: all 0.2s;
                }

                .tab-btn.active {
                    background: white;
                    color: var(--color-primary);
                    box-shadow: var(--shadow-sm);
                }

                .top-performer-section {
                    margin-bottom: 40px;
                }

                .leader-card {
                    padding: 32px !important;
                    background: linear-gradient(to right, #ffffff, #eff6ff) !important;
                    border-color: #bfdbfe !important;
                    position: relative;
                }

                .leader-badge {
                    position: absolute;
                    top: -12px;
                    left: 32px;
                    background: #1e293b;
                    color: white;
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                    font-size: 0.75rem;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .leader-details {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .leader-avatar-box {
                    width: 80px;
                    height: 80px;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 4px solid white;
                    box-shadow: var(--shadow-md);
                }

                .leader-img { width: 100%; height: 100%; object-fit: cover; }

                .leader-text { flex: 1; }

                .leader-name {
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin-bottom: 4px;
                }

                .leader-rank-text {
                    font-size: 0.95rem;
                    color: var(--color-text-secondary);
                    font-weight: 600;
                }

                .leader-stats-pill {
                    background: white;
                    padding: 12px 24px;
                    border-radius: var(--radius-md);
                    border: 1px solid #e2e8f0;
                }

                .pill-item {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .p-label { font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); }
                .p-value { font-size: 1.25rem; font-weight: 800; }

                .ranking-table-container {
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                }

                .table-header {
                    display: grid;
                    grid-template-columns: 100px 1fr 150px 80px;
                    padding: 16px 24px;
                    background: #f8fafc;
                    border-bottom: 1px solid var(--color-border);
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--color-text-muted);
                    letter-spacing: 0.05em;
                }

                .rank-entry {
                    display: grid;
                    grid-template-columns: 100px 1fr 150px 80px;
                    padding: 20px 24px;
                    align-items: center;
                    border-bottom: 1px solid #f1f5f9;
                    transition: background 0.1s;
                }

                .rank-entry:last-child { border: none; }
                .rank-entry:hover { background: #f8fafc; }

                .col-rank { padding-left: 12px; }
                .rank-num { font-weight: 700; color: var(--color-text-muted); font-size: 0.9rem; }

                .col-user { display: flex; align-items: center; gap: 12px; }
                .user-avatar-tiny { width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; }
                .user-meta { display: flex; flex-direction: column; gap: 2px; }
                .user-name-bold { font-weight: 700; font-size: 0.95rem; }
                .user-level-tag { font-size: 0.7rem; font-weight: 800; color: var(--color-primary); }

                .val-text { font-weight: 800; font-size: 1rem; }

                .trend-indicator {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                }
                .trend-indicator.up { background: #f0fdf4; color: #16a34a; }

                .gold { color: #eab308; }
                .silver { color: #94a3b8; }
                .bronze { color: #9a3412; }

                .loading-state { padding: 100px; text-align: center; font-weight: 600; color: var(--color-text-muted); }

                @media (max-width: 768px) {
                   .table-header, .rank-entry {
                      grid-template-columns: 60px 1fr 100px;
                   }
                   .col-action { display: none; }
                }
            `}</style>
        </div>
    );
};

export default Leaderboard;
