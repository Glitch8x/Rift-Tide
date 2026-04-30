import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { PlusCircle, Trophy, Banknote, RefreshCw, Layers, ShieldCheck, UserCheck, Inbox, ArrowUpRight, Activity, Terminal, Database, Sliders, Zap, Users, Globe, Flag, Shield, ExternalLink, Twitter, Video, Mail, Search, CheckCircle, Medal, Star } from 'lucide-react';
import PostBountyModal from '../../components/Modals/PostBountyModal';
import PostGrantModal from '../../components/Modals/PostGrantModal';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const { bounties, grants, submissions, winners, postBounty, postGrant, syncTelegram, selectRankedWinner } = useData();
    const [activeTab, setActiveTab] = useState('submissions');
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [rankingSelection, setRankingSelection] = useState(null); 

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            syncTelegram();
            setIsSyncing(false);
        }, 1500);
    };

    const confirmWinner = (sub, rank) => {
        selectRankedWinner(sub.itemId, sub.walletAddress, rank, sub);
    };

    const filteredSubmissions = useMemo(() => {
        return submissions.filter(s => 
            !winners.some(w => w.walletAddress === s.walletAddress && w.itemId === s.itemId) &&
            (s.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
             s.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
             s.walletAddress.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [submissions, searchQuery, winners]);

    const stats = [
        { label: 'Ecosystem TVL', value: '128K SUI', icon: <Banknote size={20} />, color: '#00D1FF' },
        { label: 'Total Builders', value: '2,840', icon: <Users size={20} />, color: '#10B981' },
        { label: 'Ranked Winners', value: winners.length, icon: <Trophy size={20} />, color: '#F59E0B' },
        { label: 'Pending Review', value: filteredSubmissions.length, icon: <Inbox size={20} />, color: '#EC4899' },
    ];

    return (
        <div className="admin-rift-v4">
            <div className="bg-blur-blob blob-adm-1"></div>
            <div className="bg-blur-blob blob-adm-2"></div>

            <header className="admin-header-v2">
                <div className="header-left">
                    <div className="admin-badge">
                        <Shield size={14} /> Administrator Panel
                    </div>
                    <h1>Control <span>Center</span></h1>
                    <p>Rank contributors (1st, 2nd, 3rd) and dispatch ecosystem rewards.</p>
                </div>
                <div className="header-right">
                    <button className="sync-btn" onClick={handleSync} disabled={isSyncing}>
                        <RefreshCw size={18} className={isSyncing ? 'spin' : ''} />
                    </button>
                    <button className="launch-btn" onClick={() => setIsPostModalOpen(true)}>
                        <PlusCircle size={20} /> Launch Bounty
                    </button>
                    <button className="launch-btn grant" onClick={() => setIsGrantModalOpen(true)}>
                        <PlusCircle size={20} /> New Grant
                    </button>
                </div>
            </header>

            <div className="admin-stats-v2">
                {stats.map((s, i) => (
                    <div key={i} className="stat-card-v2">
                        <div className="stat-icon" style={{ color: s.color, background: `${s.color}15` }}>
                            {s.icon}
                        </div>
                        <div className="stat-info">
                            <span className="label">{s.label}</span>
                            <span className="value">{s.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-tabs-v2">
                {[
                    { id: 'submissions', label: 'Review Queue', count: filteredSubmissions.length },
                    { id: 'winners', label: 'Ranked Archive', count: winners.length },
                    { id: 'bounties', label: 'Active Missions', count: bounties.length },
                ].map(tab => (
                    <button 
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`} 
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                        {tab.count > 0 && <span className="count">{tab.count}</span>}
                    </button>
                ))}
            </div>

            <div className="admin-main-v2">
                <AnimatePresence mode="wait">
                    {activeTab === 'submissions' && (
                        <motion.div 
                            key="queue"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="queue-card"
                        >
                            <div className="admin-filter-bar">
                                <div className="search-wrap-v4">
                                    <Search size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Search by name, mission, or wallet..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="filter-stats">
                                    {filteredSubmissions.length} entries awaiting review
                                </div>
                            </div>

                            <div className="table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Contributor</th>
                                            <th>Mission</th>
                                            <th>Evidence</th>
                                            <th className="text-right">Select Placement</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSubmissions.map((sub, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <div className="contributor-cell">
                                                        <div className="avatar">{sub.user?.charAt(0)}</div>
                                                        <div className="details">
                                                            <span className="name">{sub.user}</span>
                                                            <span className="wallet">{sub.walletAddress}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><span className="mission-name">{sub.itemTitle}</span></td>
                                                <td>
                                                    <div className="evidence-links">
                                                        {sub.twitterLink && <a href={sub.twitterLink} target="_blank" rel="noreferrer"><Twitter size={16} /></a>}
                                                        {sub.videoLink && <a href={sub.videoLink} target="_blank" rel="noreferrer"><Video size={16} /></a>}
                                                        {sub.assetLink && <a href={sub.assetLink} target="_blank" rel="noreferrer"><ExternalLink size={16} /></a>}
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <div className="rank-actions">
                                                        <button className="rank-btn r1" onClick={() => confirmWinner(sub, 1)}>1st</button>
                                                        <button className="rank-btn r2" onClick={() => confirmWinner(sub, 2)}>2nd</button>
                                                        <button className="rank-btn r3" onClick={() => confirmWinner(sub, 3)}>3rd</button>
                                                        <button className="dm-btn-v4" onClick={() => alert(`Messaging ${sub.user}...`)}><Mail size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'winners' && (
                        <motion.div 
                            key="winners"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="queue-card winners-card"
                        >
                            <div className="table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Placement</th>
                                            <th>Winner</th>
                                            <th>Mission</th>
                                            <th>Prize Tier</th>
                                            <th className="text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {winners.map((win, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <div className={`rank-badge v${win.rank}`}>
                                                        {win.rank === 1 ? <Medal size={14} /> : win.rank === 2 ? <Trophy size={14} /> : <Star size={14} />}
                                                        <span>{win.rank === 1 ? '1st Place' : win.rank === 2 ? '2nd Place' : '3rd Place'}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="contributor-cell">
                                                        <div className="details">
                                                            <span className="name">{win.user}</span>
                                                            <span className="wallet">{win.walletAddress}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><span className="mission-name">{win.itemTitle}</span></td>
                                                <td><span className="prize-info">+{win.prizeAmount} SUI</span></td>
                                                <td className="text-right">
                                                    <span className="status-badge paid">
                                                        <CheckCircle size={14} /> DISPATCHED
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'bounties' && (
                        <motion.div 
                            key="bounties"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="module-card"
                        >
                            <div className="module-empty">
                                <Activity size={48} />
                                <h3>Module Operational</h3>
                                <p>Active ecosystem missions are currently synced.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <PostBountyModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} onPost={postBounty} />
            <PostGrantModal isOpen={isGrantModalOpen} onClose={() => setIsGrantModalOpen(false)} onPost={postGrant} />

            <style>{`
                .admin-rift-v4 { max-width: 1300px; margin: 0 auto; padding: 40px 0; }
                .admin-header-v2 { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
                .header-left h1 { font-size: 3.5rem; font-weight: 900; letter-spacing: -0.04em; margin: 8px 0; }
                .header-left h1 span { color: var(--color-primary); }
                .admin-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; background: #F1F5F9; border-radius: 99px; font-size: 0.75rem; font-weight: 800; color: #475569; text-transform: uppercase; }
                .header-right { display: flex; gap: 16px; }
                .launch-btn { padding: 14px 24px; background: #0F172A; color: white; border: none; border-radius: 16px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.2s; }
                .launch-btn.grant { background: var(--color-primary); }
                .sync-btn { width: 52px; height: 52px; background: white; border: 1px solid #E2E8F0; border-radius: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748B; }

                .admin-stats-v2 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 48px; }
                .stat-card-v2 { background: white; border: 1px solid #E2E8F0; border-radius: 24px; padding: 24px; display: flex; align-items: center; gap: 20px; }
                .stat-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
                .stat-info .label { font-size: 0.8rem; font-weight: 700; color: #94A3B8; text-transform: uppercase; }
                .stat-info .value { font-size: 1.5rem; font-weight: 900; color: #0F172A; }

                .admin-tabs-v2 { display: flex; gap: 40px; border-bottom: 1px solid #E2E8F0; margin-bottom: 40px; }
                .tab-btn { padding: 16px 0; background: transparent; border: none; font-size: 1rem; font-weight: 700; color: #94A3B8; cursor: pointer; position: relative; display: flex; align-items: center; gap: 12px; }
                .tab-btn.active { color: var(--color-primary); }
                .tab-btn.active::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 3px; background: var(--color-primary); border-radius: 99px; }
                .tab-btn .count { padding: 2px 10px; background: #F1F5F9; border-radius: 99px; font-size: 0.75rem; color: #64748B; }

                .queue-card { background: white; border: 1px solid #E2E8F0; border-radius: 32px; overflow: hidden; box-shadow: 0 4px 30px rgba(0,0,0,0.02); }
                .admin-filter-bar { padding: 24px 32px; background: #F8FAFC; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F5F9; }
                .search-wrap-v4 { display: flex; align-items: center; gap: 14px; background: white; padding: 0 20px; height: 48px; border-radius: 14px; border: 1px solid #E2E8F0; width: 400px; }
                .search-wrap-v4 input { border: none; outline: none; font-size: 0.9rem; font-weight: 500; width: 100%; }

                .admin-table { width: 100%; border-collapse: collapse; }
                .admin-table th { background: #F8FAFC; padding: 20px 32px; text-align: left; font-size: 0.75rem; font-weight: 800; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.05em; }
                .admin-table td { padding: 24px 32px; border-bottom: 1px solid #F1F5F9; }

                .contributor-cell { display: flex; align-items: center; gap: 16px; }
                .avatar { width: 44px; height: 44px; background: #F1F5F9; color: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; }
                .details { display: flex; flex-direction: column; }
                .details .name { font-weight: 800; color: #0F172A; }
                .details .wallet { font-size: 0.75rem; font-family: monospace; color: #94A3B8; }

                .rank-actions { display: flex; gap: 8px; justify-content: flex-end; align-items: center; }
                .rank-btn { padding: 8px 14px; border-radius: 10px; border: none; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
                .rank-btn.r1 { background: #F59E0B20; color: #F59E0B; border: 1px solid #F59E0B30; }
                .rank-btn.r2 { background: #94A3B820; color: #64748B; border: 1px solid #94A3B830; }
                .rank-btn.r3 { background: #D9770620; color: #B45309; border: 1px solid #D9770630; }
                .rank-btn:hover { transform: scale(1.05); }

                .dm-btn-v4 { width: 36px; height: 36px; background: #F1F5F9; border: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #64748B; cursor: pointer; margin-left: 8px; }

                .rank-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 99px; font-weight: 800; font-size: 0.8rem; }
                .rank-badge.v1 { background: #F59E0B15; color: #F59E0B; }
                .rank-badge.v2 { background: #94A3B815; color: #64748B; }
                .rank-badge.v3 { background: #D9770615; color: #B45309; }

                .prize-info { font-weight: 700; color: var(--color-primary); }
                .status-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 99px; font-size: 0.75rem; font-weight: 800; }
                .status-badge.paid { background: #10B98115; color: #10B981; }

                .module-card { padding: 60px; background: white; border: 1px solid #E2E8F0; border-radius: 32px; text-align: center; }
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .text-right { text-align: right; }

                @media (max-width: 1024px) { .admin-stats-v2 { grid-template-columns: repeat(2, 1fr); } }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
