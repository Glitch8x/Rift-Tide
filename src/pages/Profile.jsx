import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Settings, Shield, Zap, CheckCircle2, Award, MapPin, Copy, ExternalLink, TrendingUp, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Earned', value: '42.5K', unit: 'SUI', icon: Zap, color: '#38C1F4', bg: 'rgba(56, 193, 244, 0.08)' },
        { label: 'Quests Done', value: '45', unit: '', icon: CheckCircle2, color: '#10B981', bg: 'rgba(16,185,129,0.08)' },
        { label: 'Reputation', value: '98.4', unit: '%', icon: Award, color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
        { label: 'Streak', value: '12', unit: 'days', icon: TrendingUp, color: '#EC4899', bg: 'rgba(236,72,153,0.08)' },
    ];

    const recentActivity = [
        { title: 'Smart Contract Audit', reward: '2,400 SUI', status: 'completed', time: '2 days ago' },
        { title: 'UI/UX Design Sprint', reward: '800 SUI', status: 'completed', time: '5 days ago' },
        { title: 'Protocol Documentation', reward: '320 SUI', status: 'in-review', time: '1 week ago' },
    ];

    const copyAddress = () => {
        if (user?.walletAddress) navigator.clipboard.writeText(user.walletAddress);
    };

    return (
        <div className="profile-page">
            <div className="profile-glow-1" />
            <div className="profile-glow-2" />

            {/* Hero Card */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="profile-hero-card"
            >
                {/* Banner */}
                <div className="profile-banner">
                    <div className="banner-gradient" />
                </div>

                {/* Identity */}
                <div className="profile-identity">
                    <div className="profile-avatar">
                        {user?.name?.charAt(0) || 'S'}
                        <div className="avatar-online" />
                    </div>
                    <div className="profile-name-row">
                        <div className="profile-name-info">
                            <h1 className="profile-name">{user?.name || 'Sui Contributor'}</h1>
                            <div className="profile-badges">
                                <span className="profile-badge verified"><Shield size={11} /> Verified Builder</span>
                                <span className="profile-badge location"><MapPin size={11} /> Global</span>
                            </div>
                        </div>
                        <button className="profile-edit-btn" onClick={() => navigate('/settings')}>
                            <Settings size={16} /> Edit Profile
                        </button>
                    </div>
                    <p className="profile-bio">
                        Full-stack builder in the Sui ecosystem. Focused on high-yield missions and protocol governance.
                    </p>

                    {/* Wallet */}
                    {user?.walletAddress && (
                        <div className="profile-wallet">
                            <span className="wallet-addr">{user.walletAddress.substring(0, 8)}...{user.walletAddress.slice(-6)}</span>
                            <button className="wallet-copy-btn" onClick={copyAddress}><Copy size={13} /></button>
                            <button className="wallet-ext-btn"><ExternalLink size={13} /></button>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="profile-stats-grid">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.07 }}
                            className="profile-stat"
                        >
                            <div className="ps-icon" style={{ color: s.color, background: s.bg }}>
                                <s.icon size={20} />
                            </div>
                            <div className="ps-info">
                                <span className="ps-val">{s.value}<span className="ps-unit">{s.unit}</span></span>
                                <span className="ps-lbl">{s.label}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Content grid */}
            <div className="profile-content-grid">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="profile-section-card"
                >
                    <div className="section-header">
                        <h3><Clock size={18} /> Recent Activity</h3>
                    </div>
                    <div className="activity-list">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="activity-item">
                                <div className="activity-icon">
                                    <Star size={16} />
                                </div>
                                <div className="activity-info">
                                    <span className="activity-title">{a.title}</span>
                                    <span className="activity-time">{a.time}</span>
                                </div>
                                <div className="activity-right">
                                    <span className="activity-reward">{a.reward}</span>
                                    <span className={`activity-status ${a.status}`}>
                                        {a.status === 'completed' ? 'Completed' : 'In Review'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Info Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="profile-section-card"
                >
                    <div className="section-header">
                        <h3><Zap size={18} /> Account Details</h3>
                    </div>
                    <div className="info-list">
                        {[
                            { label: 'Member Since', value: 'March 2024' },
                            { label: 'Account Type', value: 'Contributor' },
                            { label: 'Total Submissions', value: '47' },
                            { label: 'Success Rate', value: '95.7%' },
                            { label: 'Preferred Category', value: 'Development' },
                        ].map(item => (
                            <div key={item.label} className="info-row">
                                <span className="info-label">{item.label}</span>
                                <span className="info-value">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style>{`
                .profile-page {
                    padding: 120px 32px 80px; max-width: 1100px;
                    margin: 0 auto; position: relative;
                }
                .profile-glow-1, .profile-glow-2 {
                    position: fixed; width: 500px; height: 500px;
                    border-radius: 50%; filter: blur(100px); opacity: 0.06; z-index: -1; pointer-events: none;
                }
                .profile-glow-1 { top: -80px; left: -80px; background: var(--color-primary); }
                .profile-glow-2 { bottom: -80px; right: -80px; background: var(--color-accent); }

                /* Hero card */
                .profile-hero-card {
                    background: white; border: 1px solid var(--color-border);
                    border-radius: 32px; overflow: hidden;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.05); margin-bottom: 28px;
                }
                .profile-banner {
                    height: 140px; position: relative; overflow: hidden;
                    background: linear-gradient(135deg, #38C1F4 0%, #00A3E0 100%);
                }
                .banner-gradient {
                    position: absolute; inset: 0;
                    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                }

                .profile-identity { padding: 0 36px 32px; }
                .profile-avatar {
                    width: 96px; height: 96px; border-radius: 24px;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                    color: white; font-size: 2.5rem; font-weight: 800;
                    display: flex; align-items: center; justify-content: center;
                    margin-top: -48px; border: 4px solid white; position: relative;
                    box-shadow: 0 8px 24px rgba(56, 193, 244, 0.25);
                }
                .avatar-online {
                    position: absolute; bottom: -2px; right: -2px; width: 18px; height: 18px;
                    background: #10B981; border: 3px solid white; border-radius: 50%;
                }

                .profile-name-row {
                    display: flex; align-items: flex-start; justify-content: space-between;
                    gap: 16px; margin-top: 16px; margin-bottom: 12px;
                }
                .profile-name { font-size: 2rem; font-weight: 800; color: var(--color-text); }
                .profile-badges { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
                .profile-badge {
                    display: flex; align-items: center; gap: 6px; padding: 5px 12px;
                    border-radius: 9999px; font-size: 0.78rem; font-weight: 800;
                }
                .profile-badge.verified { background: rgba(56, 193, 244, 0.08); color: var(--color-primary); }
                .profile-badge.location { background: rgba(16,185,129,0.08); color: #10B981; }

                .profile-edit-btn {
                    display: flex; align-items: center; gap: 8px; padding: 11px 22px;
                    border: 1.5px solid var(--color-border); border-radius: 14px;
                    font-weight: 700; font-size: 0.9rem; color: var(--color-text);
                    background: white; cursor: pointer; transition: all 0.2s; flex-shrink: 0;
                }
                .profile-edit-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

                .profile-bio {
                    font-size: 1rem; color: var(--color-text-secondary); font-weight: 400;
                    line-height: 1.6; margin-bottom: 20px;
                }
                .profile-wallet {
                    display: inline-flex; align-items: center; gap: 10px; padding: 10px 18px;
                    background: var(--color-bg-secondary); border: 1px solid var(--color-border);
                    border-radius: 12px;
                }
                .wallet-addr { font-family: var(--font-mono); font-size: 0.82rem; font-weight: 700; color: var(--color-text); }
                .wallet-copy-btn, .wallet-ext-btn {
                    color: var(--color-text-muted); cursor: pointer; transition: color 0.2s;
                    display: flex; align-items: center;
                }
                .wallet-copy-btn:hover, .wallet-ext-btn:hover { color: var(--color-primary); }

                .profile-stats-grid {
                    display: grid; grid-template-columns: repeat(4, 1fr);
                    gap: 1px; background: var(--color-border);
                    border-top: 1px solid var(--color-border);
                }
                .profile-stat {
                    display: flex; align-items: center; gap: 16px; padding: 24px 28px;
                    background: white; transition: background 0.2s;
                }
                .profile-stat:hover { background: var(--color-bg-secondary); }
                .ps-icon {
                    width: 48px; height: 48px; border-radius: 14px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                }
                .ps-info { display: flex; flex-direction: column; }
                .ps-val { font-size: 1.5rem; font-weight: 800; color: var(--color-text); line-height: 1; }
                .ps-unit { font-size: 0.85rem; color: var(--color-text-muted); margin-left: 4px; font-weight: 400; }
                .ps-lbl { font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.04em; }

                /* Content grid */
                .profile-content-grid { display: grid; grid-template-columns: 1fr 320px; gap: 24px; }
                .profile-section-card {
                    background: white; border: 1px solid var(--color-border);
                    border-radius: 24px; overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }
                .section-header {
                    padding: 24px 28px; border-bottom: 1px solid var(--color-border);
                }
                .section-header h3 {
                    display: flex; align-items: center; gap: 10px;
                    font-size: 1.05rem; font-weight: 800; color: var(--color-text); margin: 0;
                }

                /* Activity */
                .activity-list { padding: 8px 0; }
                .activity-item {
                    display: flex; align-items: center; gap: 16px;
                    padding: 16px 28px; border-bottom: 1px solid var(--color-border);
                    transition: background 0.15s;
                }
                .activity-item:last-child { border-bottom: none; }
                .activity-item:hover { background: var(--color-bg-secondary); }
                .activity-icon {
                    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
                    background: var(--color-primary-soft); color: var(--color-primary);
                    display: flex; align-items: center; justify-content: center;
                }
                .activity-info { flex: 1; min-width: 0; }
                .activity-title { display: block; font-size: 0.92rem; font-weight: 700; color: var(--color-text); }
                .activity-time { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 400; }
                .activity-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
                .activity-reward { font-size: 0.9rem; font-weight: 800; color: var(--color-primary); }
                .activity-status {
                    font-size: 0.72rem; font-weight: 800; padding: 3px 10px;
                    border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.04em;
                }
                .activity-status.completed { background: rgba(16,185,129,0.08); color: #10B981; }
                .activity-status.in-review { background: rgba(245,158,11,0.08); color: #D97706; }

                /* Info */
                .info-list { padding: 8px 0; }
                .info-row {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 14px 28px; border-bottom: 1px solid var(--color-border);
                }
                .info-row:last-child { border-bottom: none; }
                .info-label { font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted); }
                .info-value { font-size: 0.9rem; font-weight: 800; color: var(--color-text); }

                @media (max-width: 1024px) {
                    .profile-stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .profile-content-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 640px) {
                    .profile-page { padding: 100px 16px 60px; }
                    .profile-name-row { flex-direction: column; }
                    .profile-stats-grid { grid-template-columns: repeat(2, 1fr); }
                }
            `}</style>
        </div>
    );
};

export default Profile;
