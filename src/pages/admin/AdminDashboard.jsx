import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import SharpCard from '../../components/UI/GlassCard'; // Now SharpCard
import { PlusCircle, Trophy, Banknote, RefreshCw, Layers, ShieldCheck, UserCheck, Inbox, ArrowUpRight } from 'lucide-react';
import PostBountyModal from '../../components/Modals/PostBountyModal';
import PostGrantModal from '../../components/Modals/PostGrantModal';

/**
 * AdminDashboard - Redesigned for a professional SUI network command center.
 * Focuses on high-density data, sharp borders, and FinTech-style management tools.
 */
const AdminDashboard = () => {
    const { bounties, grants, submissions, selectRankedWinner, postBounty, postGrant, syncTelegram } = useData();
    const [activeTab, setActiveTab] = useState('bounties');
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSelectWinner = (bountyId, name, rank) => {
        if (window.confirm(`Finalize selection: ${name} as ${rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'} Place?`)) {
            selectRankedWinner(bountyId, name, rank);
        }
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            syncTelegram();
            setIsSyncing(false);
        }, 1500);
    };

    return (
        <div className="admin-container animate-fade-in">
            <header className="admin-top-bar">
                <div className="admin-intro">
                    <h1 className="admin-title">Network Command</h1>
                    <p className="admin-subtitle">Managing the Sui-gig contribution engine.</p>
                </div>
                <div className="admin-actions">
                    <button className="btn btn-outline" onClick={handleSync} disabled={isSyncing}>
                        <RefreshCw size={18} className={isSyncing ? 'spin' : ''} />
                        {isSyncing ? 'Syncing Raids...' : 'Sync Pipeline'}
                    </button>
                    <button className="btn btn-primary" onClick={() => setIsPostModalOpen(true)}>
                        <PlusCircle size={18} /> New Quest
                    </button>
                    <button className="btn btn-primary" onClick={() => setIsGrantModalOpen(true)}>
                        <Banknote size={18} /> New Grant
                    </button>
                </div>
            </header>

            <div className="admin-nav-tabs">
                <button 
                    className={`nav-tab ${activeTab === 'bounties' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bounties')}
                >
                    <Layers size={18} /> Active Quests
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'grants' ? 'active' : ''}`}
                    onClick={() => setActiveTab('grants')}
                >
                    <ShieldCheck size={18} /> Grant Programs
                </button>
                <button 
                    className={`nav-tab ${activeTab === 'submissions' ? 'active' : ''}`}
                    onClick={() => setActiveTab('submissions')}
                >
                    <Inbox size={18} /> Review Queue
                </button>
            </div>

            <div className="admin-data-view">
                {activeTab === 'bounties' && (
                    <div className="data-list">
                        {bounties.map(bounty => (
                            <SharpCard key={bounty.id} className="admin-item-card">
                                <div className="item-main">
                                    <div className="item-header">
                                        <h3 className="item-name">{bounty.title}</h3>
                                        <div className="item-pill-row">
                                            <span className="payout-pill">{bounty.reward} SUI</span>
                                            <span className={`status-pill ${bounty.status}`}>
                                                {bounty.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="item-meta">
                                        <span>{bounty.category || 'General'}</span>
                                        <span className="dot">•</span>
                                        <span>{bounty.participants} Contributors</span>
                                    </div>
                                    
                                    {bounty.status !== 'completed' && bounty.participantsList && (
                                        <div className="management-tray">
                                            <p className="tray-h">PENDING APPROVALS</p>
                                            <div className="participant-scroller">
                                                {bounty.participantsList.map((p, idx) => (
                                                    <div key={idx} className="p-row-sharp">
                                                        <div className="p-id">
                                                            <img src={p.avatar} alt="" className="p-img-tiny" />
                                                            <span className="p-name-bold">{p.name}</span>
                                                        </div>
                                                        <div className="p-rank-btns">
                                                            <button className="rank-btn gold" onClick={() => handleSelectWinner(bounty.id, p.name, 1)}>1ST</button>
                                                            <button className="rank-btn silver" onClick={() => handleSelectWinner(bounty.id, p.name, 2)}>2ND</button>
                                                            <button className="rank-btn bronze" onClick={() => handleSelectWinner(bounty.id, p.name, 3)}>3RD</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {bounty.status === 'completed' && (
                                        <div className="completed-tray">
                                            <UserCheck size={14} /> <span>Winner: <strong>{bounty.winner}</strong></span>
                                        </div>
                                    )}
                                </div>
                            </SharpCard>
                        ))}
                    </div>
                )}

                {activeTab === 'grants' && (
                    <div className="data-list">
                        {grants.map(grant => (
                            <SharpCard key={grant.id} className="admin-item-card">
                                <div className="item-header">
                                    <h3 className="item-name">{grant.title}</h3>
                                    <span className="payout-pill">{grant.amount}</span>
                                </div>
                                <div className="item-meta">
                                    <span>{grant.applicants} Applicants Joined</span>
                                    <span className="dot">•</span>
                                    <span className="text-success">Funded by SUI Foundation</span>
                                </div>
                                <div className="grant-admin-actions">
                                   <button className="btn btn-outline small-btn">Review Proposals <ArrowUpRight size={14} /></button>
                                </div>
                            </SharpCard>
                        ))}
                    </div>
                )}

                {activeTab === 'submissions' && (
                    <div className="data-list">
                        {submissions.length === 0 ? (
                            <div className="empty-command-state">
                                <Inbox size={48} />
                                <p>The review queue is currently empty.</p>
                            </div>
                        ) : (
                            submissions.map((sub, index) => (
                                <SharpCard key={index} className="admin-item-card">
                                    <div className="item-header">
                                        <span className="type-tab-pill">{sub.type}</span>
                                        <span className="date-text">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                                    </div>
                                    <h4 className="sub-title-main">{sub.itemTitle}</h4>
                                    <div className="sub-action-footer">
                                        {sub.projectLink && <a href={sub.projectLink} target="_blank" rel="noreferrer" className="btn btn-outline small-btn">View Asset</a>}
                                        <button className="btn btn-primary small-btn">Approve Payout</button>
                                    </div>
                                </SharpCard>
                            ))
                        )}
                    </div>
                )}
            </div>

            <PostBountyModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} onPost={postBounty} />
            <PostGrantModal isOpen={isGrantModalOpen} onClose={() => setIsGrantModalOpen(false)} onPost={postGrant} />

            <style>{`
                .admin-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .admin-top-bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 48px;
                }

                .admin-title { font-size: 2.25rem; font-weight: 800; margin-bottom: 8px; }
                .admin-subtitle { color: var(--color-text-muted); font-size: 1rem; }

                .admin-actions { display: flex; gap: 16px; }

                .admin-nav-tabs {
                    display: flex;
                    gap: 32px;
                    margin-bottom: 32px;
                    border-bottom: 1px solid var(--color-border);
                }

                .nav-tab {
                    background: none;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 0;
                    color: var(--color-text-muted);
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s;
                }

                .nav-tab.active {
                    color: var(--color-primary);
                    border-bottom-color: var(--color-primary);
                }

                .data-list { display: flex; flex-direction: column; gap: 16px; }

                .admin-item-card { padding: 24px !important; }

                .item-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
                .item-name { font-size: 1.15rem; font-weight: 700; color: var(--color-text); }

                .item-pill-row { display: flex; gap: 12px; }
                .payout-pill { font-size: 0.85rem; font-weight: 800; color: var(--color-primary); }
                .status-pill { font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; background: #f1f5f9; }
                .status-pill.active { color: #16a34a; background: #f0fdf4; }

                .item-meta { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 16px; }
                .dot { opacity: 0.5; }

                .management-tray { margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--color-border); }
                .tray-h { font-size: 0.7rem; font-weight: 800; color: var(--color-text-muted); letter-spacing: 0.05em; margin-bottom: 16px; }

                .participant-scroller { display: flex; flex-direction: column; gap: 8px; }
                .p-row-sharp { display: flex; justify-content: space-between; align-items: center; padding: 10px 16px; background: #f8fafc; border-radius: var(--radius-sm); border: 1px solid var(--color-border); }
                .p-id { display: flex; align-items: center; gap: 10px; }
                .p-img-tiny { width: 24px; height: 24px; border-radius: 50%; }
                .p-name-bold { font-weight: 700; font-size: 0.9rem; }

                .p-rank-btns { display: flex; gap: 8px; }
                .rank-btn { border: none; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: opacity 0.2s; }
                .rank-btn.gold { background: #fefce8; color: #854d0e; border: 1px solid #fde68a; }
                .rank-btn.silver { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }
                .rank-btn.bronze { background: #fff7ed; color: #9a3412; border: 1px solid #fed7aa; }
                .rank-btn:hover { opacity: 0.8; }

                .completed-tray { display: flex; align-items: center; gap: 8px; color: var(--color-text-muted); font-size: 0.9rem; }

                .empty-command-state { text-align: center; padding: 80px; color: var(--color-text-muted); }

                .sub-title-main { font-size: 1.1rem; font-weight: 700; margin-bottom: 24px; }
                .type-tab-pill { font-size: 0.7rem; font-weight: 800; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
                .sub-action-footer { display: flex; gap: 12px; }

                .small-btn { padding: 8px 16px !important; font-size: 0.85rem !important; height: auto !important; }

                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
