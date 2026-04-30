import React from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, 
    TrendingUp, 
    Users, 
    ArrowRight, 
    Clock, 
    CheckCircle, 
    Wallet,
    Award,
    Star,
    LayoutGrid,
    Inbox,
    Trophy
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import BountyCard from '../components/Bounties/BountyCard';

const Home = () => {
    const { user } = useAuth();
    const { bounties, winners } = useData();

    const stats = [
        { label: 'Total Earned', val: '$0.00', icon: Wallet, color: '#00D1FF', trend: '0%' },
        { label: 'Quests Completed', val: '0', icon: CheckCircle, color: '#10B981', trend: '0%' },
        { label: 'Current Rank', val: '---', icon: Award, color: '#F59E0B', trend: '0%' },
        { label: 'Active Quests', val: '0', icon: Zap, color: '#8B5CF6', trend: '0%' },
    ];

    return (
        <div className="dashboard-rift">
            {/* ─── WELCOME ─── */}
            <header className="dash-header">
                <div className="welcome-text">
                    <h1>Welcome back, <span>{user?.name || 'Explorer'}</span></h1>
                    <p>Start your journey by picking your first bounty below.</p>
                </div>
                <div className="header-date">
                    <Clock size={16} />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </header>

            {/* ─── STATS GRID ─── */}
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <motion.div 
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="stat-card"
                    >
                        <div className="stat-icon" style={{ background: `${s.color}15`, color: s.color }}>
                            <s.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">{s.label}</span>
                            <h2 className="stat-val">{s.val}</h2>
                        </div>
                        <div className="stat-trend">
                            <span>{s.trend}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ─── MAIN CONTENT AREA ─── */}
            <div className="dash-main">
                {/* Left: Recommended */}
                <div className="dash-column">
                    <div className="section-header">
                        <h3>Recommended for You</h3>
                        <button className="view-all" onClick={() => window.location.href='/explore'}>View all <ArrowRight size={14} /></button>
                    </div>
                    <div className="recom-list">
                        {(bounties || []).slice(0, 3).map(b => (
                            <BountyCard key={b.id} bounty={b} />
                        ))}
                    </div>
                </div>

                {/* Right: Activity & Skills */}
                <aside className="dash-sidebar">
                    <div className="side-section">
                        <h3>Recent Activity</h3>
                        <div className="activity-list empty">
                            <div className="empty-state">
                                <Inbox size={32} />
                                <p>No activity yet</p>
                                <span>Complete a quest to see updates here.</span>
                            </div>
                        </div>
                    </div>

                    <div className="side-section hall-of-fame">
                        <div className="section-header">
                            <h3>Hall of Fame</h3>
                            <Trophy size={18} style={{ color: '#F59E0B' }} />
                        </div>
                        <div className="winners-mini-list">
                            {(winners || []).slice(0, 5).map((win, idx) => (
                                <div key={idx} className="winner-row">
                                    <div className={`rank-dot v${win.rank}`}>
                                        {win.rank}
                                    </div>
                                    <div className="win-info">
                                        <span className="win-name">{win.user}</span>
                                        <span className="win-task">{win.itemTitle}</span>
                                    </div>
                                    <div className="win-prize">
                                        +{win.prizeAmount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="side-section skills-card">
                        <div className="skills-header">
                            <Star size={20} className="star-icon" />
                            <h3>Builder Profile</h3>
                        </div>
                        <div className="skill-tags">
                            <p className="empty-tags-msg">No skills identified yet.</p>
                        </div>
                        <div className="profile-progress">
                            <div className="prog-header">
                                <span>Profile Completion</span>
                                <span>10%</span>
                            </div>
                            <div className="prog-bar">
                                <div className="prog-fill" style={{ width: '10%' }} />
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            <style>{`
                .dashboard-rift {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .dash-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 48px;
                }

                .welcome-text h1 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #0F172A;
                    margin-bottom: 8px;
                    letter-spacing: -0.02em;
                }

                .welcome-text h1 span {
                    color: var(--color-primary);
                }

                .welcome-text p {
                    font-size: 1.1rem;
                    color: #64748B;
                    font-weight: 500;
                }

                .header-date {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #94A3B8;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 12px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin-bottom: 48px;
                }

                .stat-card {
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 20px;
                    padding: 24px;
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    position: relative;
                }

                .stat-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #94A3B8;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 4px;
                }

                .stat-val {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: #0F172A;
                    margin: 0;
                }

                .stat-trend {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #94A3B8;
                }

                .dash-main {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 40px;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .section-header h3 {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #0F172A;
                }

                .view-all {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .recom-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .activity-list.empty {
                    padding: 40px 20px;
                    background: #F8FAFC;
                    border-radius: 20px;
                    border: 1px dashed #E2E8F0;
                    text-align: center;
                }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #94A3B8;
                }

                .empty-state p {
                    font-weight: 700;
                    color: #64748B;
                    margin: 12px 0 4px;
                }

                .empty-state span {
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                .skills-card {
                    background: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 24px;
                    padding: 24px;
                }

                .empty-tags-msg {
                    color: #94A3B8;
                    font-size: 0.85rem;
                    font-weight: 500;
                    font-style: italic;
                }

                .prog-bar {
                    height: 8px;
                    background: #E2E8F0;
                    border-radius: 4px;
                    overflow: hidden;
                }

                .prog-fill {
                    height: 100%;
                    background: var(--color-primary);
                    border-radius: 4px;
                }

                /* Hall of Fame Styles */
                .winners-mini-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .winner-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .rank-dot {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 900;
                    flex-shrink: 0;
                }

                .rank-dot.v1 { background: #F59E0B; color: white; }
                .rank-dot.v2 { background: #94A3B8; color: white; }
                .rank-dot.v3 { background: #D97706; color: white; }

                .win-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .win-name {
                    font-size: 0.9rem;
                    font-weight: 800;
                    color: #1E293B;
                }

                .win-task {
                    font-size: 0.75rem;
                    color: #94A3B8;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .win-prize {
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: var(--color-primary);
                }

                @media (max-width: 1024px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .dash-main { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Home;
