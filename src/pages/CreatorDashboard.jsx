import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PlusCircle, Trophy, Banknote, RefreshCw, Layers, ShieldCheck, UserCheck, Inbox, ArrowRight, CheckCircle2, Clock, Zap, LayoutDashboard, Settings as SettingsIcon, Flag } from 'lucide-react';
import PostBountyModal from '../components/Modals/PostBountyModal';
import { motion, AnimatePresence } from 'framer-motion';

const CreatorDashboard = () => {
    const { bounties, submissions, selectRankedWinner, postBounty } = useData();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [activeView, setActiveView] = useState('active'); // 'active' or 'queue'

    const creatorSubmissions = submissions || [];

    const stats = [
        { label: 'Active Quests', value: '04', icon: <Flag size={20} />, color: '#6366F1' },
        { label: 'Pending Reviews', value: '07', icon: <Clock size={20} />, color: '#F59E0B' },
        { label: 'Trust Rating', value: '99%', icon: <ShieldCheck size={20} />, color: '#10B981' },
    ];

    return (
        <div className="rift-creator-page animate-fade-in">
            <div className="bg-blur-blob blob-dash-1"></div>
            <div className="bg-blur-blob blob-dash-2"></div>

            <header className="dash-header-v4">
                <div className="header-left-v4">
                    <div className="dash-badge-v4">
                        <LayoutDashboard size={14} /> Mission Curator
                    </div>
                    <h1 className="dash-title-v4">Mission <span>Control</span></h1>
                    <p className="dash-subtitle-v4">Manage your active quest pipeline and verify ecosystem contributions.</p>
                </div>
                <div className="header-right-v4">
                    <button className="rift-btn-primary" onClick={() => setIsPostModalOpen(true)}>
                        <PlusCircle size={20} /> Initialize New Quest
                    </button>
                </div>
            </header>

            <div className="dash-stats-grid-v4">
                {stats.map((s, i) => (
                    <div key={i} className="stat-card-v4 elevated-card">
                        <div className="stat-icon-v4" style={{ color: s.color, background: `${s.color}15` }}>
                            {s.icon}
                        </div>
                        <div className="stat-info-v4">
                            <span className="stat-label-v4">{s.label}</span>
                            <span className="stat-val-v4">{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dash-tabs-v4">
                <button 
                    className={`dash-tab-v4 ${activeView === 'active' ? 'active' : ''}`} 
                    onClick={() => setActiveView('active')}
                >
                    Active Missions
                </button>
                <button 
                    className={`dash-tab-v4 ${activeView === 'queue' ? 'active' : ''}`} 
                    onClick={() => setActiveView('queue')}
                >
                    Review Queue <span className="tab-count-v4">07</span>
                </button>
            </div>

            <div className="dash-content-v4">
                <AnimatePresence mode="wait">
                    {activeView === 'active' ? (
                        <motion.div 
                            key="active"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="active-quests-v4"
                        >
                            {bounties.slice(0, 3).map((bounty, idx) => (
                                <div key={bounty.id} className="glass-pill-v4 quest-item-v4">
                                    <div className="quest-brand-v4">
                                        <div className="quest-logo-v4">
                                            {bounty.title.charAt(0)}
                                        </div>
                                        <div className="quest-meta-v4">
                                            <h4>{bounty.title}</h4>
                                            <div className="meta-pills-v4">
                                                <span className="meta-pill-v4"><Zap size={12} /> {bounty.reward} SUI</span>
                                                <span className="meta-pill-v4"><Inbox size={12} /> {bounty.participants} Participants</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="quest-actions-v4">
                                        <button className="rift-btn-outline small">Manage Pipeline</button>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="queue"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="queue-view-v4"
                        >
                            <div className="glass-pill-v4 table-container-v4">
                                <table className="rift-table-v4">
                                    <thead>
                                        <tr>
                                            <th>Contributor</th>
                                            <th>Evidence</th>
                                            <th>Status</th>
                                            <th className="text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {creatorSubmissions.map((sub, i) => (
                                            <tr key={i}>
                                                <td className="user-td-v4">
                                                    <div className="user-avatar-v4">{sub.user.charAt(0)}</div>
                                                    <span className="user-name-v4">{sub.user}</span>
                                                </td>
                                                <td>
                                                    <span className="evidence-title-v4">{sub.bountyTitle}</span>
                                                </td>
                                                <td>
                                                    <span className="status-tag-v4 pending">
                                                        <Clock size={12} /> Pending Review
                                                    </span>
                                                </td>
                                                <td className="text-right">
                                                    <button className="rift-btn-primary small">Verify Evidence</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <PostBountyModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} onPost={postBounty} />

            <style>{`
                .rift-creator-page {
                    padding: 80px 24px 120px;
                    max-width: 1100px;
                    margin: 0 auto;
                    position: relative;
                }

                .bg-blur-blob {
                    position: fixed;
                    width: 600px;
                    height: 600px;
                    border-radius: 50% !important;
                    filter: blur(100px);
                    opacity: 0.08;
                    z-index: -1;
                }
                .blob-dash-1 { top: 10%; right: -5%; background: var(--color-primary); }
                .blob-dash-2 { bottom: 10%; left: -5%; background: var(--color-accent); }

                .dash-header-v4 {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 60px;
                }

                .dash-badge-v4 {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: var(--color-primary-soft);
                    color: var(--color-primary);
                    border-radius: 9999px;
                    font-size: 0.8rem;
                    font-weight: 800;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                }
                .dash-title-v4 { font-size: 3.5rem; font-weight: 800; color: var(--color-text); line-height: 1; margin-bottom: 20px; }
                .dash-title-v4 span { color: var(--color-primary); }
                .dash-subtitle-v4 { font-size: 1.15rem; color: var(--color-text-muted); font-weight: 400; }

                .dash-stats-grid-v4 {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-bottom: 60px;
                }

                .stat-card-v4 {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 24px !important;
                }
                .stat-icon-v4 {
                    width: 50px;
                    height: 50px;
                    border-radius: 14px !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .stat-info-v4 { display: flex; flex-direction: column; }
                .stat-label-v4 { font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted); }
                .stat-val-v4 { font-size: 1.5rem; font-weight: 800; color: var(--color-text); }

                .dash-tabs-v4 {
                    display: flex;
                    gap: 32px;
                    border-bottom: 1px solid var(--color-border);
                    margin-bottom: 40px;
                }
                .dash-tab-v4 {
                    padding: 16px 8px;
                    background: transparent;
                    border: none;
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                }
                .dash-tab-v4.active { color: var(--color-primary); }
                .dash-tab-v4.active::after {
                    content: "";
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: var(--color-primary);
                    border-radius: 9999px !important;
                }
                .tab-count-v4 {
                    padding: 2px 8px;
                    background: var(--color-surface);
                    color: var(--color-text-muted);
                    border-radius: 9999px !important;
                    font-size: 0.75rem;
                }
                .dash-tab-v4.active .tab-count-v4 { background: var(--color-primary-soft); color: var(--color-primary); }

                .active-quests-v4 { display: flex; flex-direction: column; gap: 20px; }
                .quest-item-v4 {
                    padding: 24px 32px !important;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .quest-brand-v4 { display: flex; align-items: center; gap: 20px; }
                .quest-logo-v4 {
                    width: 50px;
                    height: 50px;
                    background: var(--color-primary-soft);
                    color: var(--color-primary);
                    border-radius: 14px !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: 800;
                }
                .quest-meta-v4 h4 { font-size: 1.15rem; font-weight: 800; color: var(--color-text); margin-bottom: 6px; }
                .meta-pills-v4 { display: flex; gap: 12px; }
                .meta-pill-v4 {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--color-text-muted);
                }

                .table-container-v4 { padding: 0 !important; overflow: hidden; }
                .rift-table-v4 { width: 100%; border-collapse: collapse; }
                .rift-table-v4 th {
                    text-align: left;
                    padding: 20px 32px;
                    background: var(--color-surface);
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: var(--color-text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .rift-table-v4 td { padding: 20px 32px; border-bottom: 1px solid var(--color-border); }
                .user-td-v4 { display: flex; align-items: center; gap: 14px; }
                .user-avatar-v4 { width: 36px; height: 36px; background: var(--color-primary-soft); color: var(--color-primary); border-radius: 50% !important; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem; }
                .user-name-v4 { font-weight: 700; color: var(--color-text); }
                .evidence-title-v4 { font-weight: 400; color: var(--color-text-muted); }
                .status-tag-v4 {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    border-radius: 9999px !important;
                    font-size: 0.8rem;
                    font-weight: 700;
                }
                .status-tag-v4.pending { background: #FFFBEB; color: #D97706; }

                .text-right { text-align: right; }

                @media (max-width: 1024px) {
                    .dash-header-v4 { flex-direction: column; align-items: flex-start; gap: 32px; }
                    .dash-stats-grid-v4 { grid-template-columns: 1fr; }
                    .quest-item-v4 { flex-direction: column; align-items: flex-start; gap: 24px; }
                    .rift-btn-primary.small { width: 100%; text-align: center; }
                    .dash-title-v4 { font-size: 2.5rem; }
                }
            `}</style>
        </div>
    );
};

export default CreatorDashboard;
