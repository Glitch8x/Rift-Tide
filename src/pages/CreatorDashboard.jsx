import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard
import { ExternalLink, Wallet, FileText, CheckCircle, Clock, Trophy, ChevronRight, Gift, Layers, Inbox, ArrowUpRight } from 'lucide-react';

/**
 * CreatorDashboard - Redesigned for a professional SUI Project Owner view.
 * Follows the First Dollar style with sharp layouts and clear submission management.
 */
const CreatorDashboard = () => {
    const { bounties, submissions, selectWinner } = useData();
    const [selectedBountyId, setSelectedBountyId] = useState(null);

    if (!bounties) return <div className="loading-state">Syncing project data...</div>;

    // Group submissions by Bounty ID
    const submissionsByBounty = (submissions || []).reduce((acc, sub) => {
        if (!acc[sub.itemId]) acc[sub.itemId] = [];
        acc[sub.itemId].push(sub);
        return acc;
    }, {});

    const selectedBounty = bounties.find(b => b.id === selectedBountyId);
    const selectedSubmissions = selectedBountyId ? (submissionsByBounty[selectedBountyId] || []) : [];

    const handleSelectWinner = (wallet) => {
        if (!window.confirm("Acknowledge: Selecting this submission as the primary winner will initiate the payout process. Proceed?")) return;
        selectWinner(selectedBountyId, wallet);
    };

    return (
        <div className="creator-container animate-fade-in">
            <header className="page-header">
                <div className="header-info">
                    <h1 className="header-title">Creator Console</h1>
                    <p className="header-subtitle">Review contributions and manage distributions for your SUI projects.</p>
                </div>
            </header>

            <div className="creator-split-layout">
                {/* Side Navigation: Active and Past Quests */}
                <aside className="creator-sidebar">
                    <h3 className="sidebar-h">Your Pipeline</h3>
                    <div className="sidebar-list">
                        {bounties.filter(b => b.type === 'bounty' || b.type === 'project').map(bounty => (
                            <div
                                key={bounty.id}
                                className={`sidebar-item ${selectedBountyId === bounty.id ? 'active' : ''}`}
                                onClick={() => setSelectedBountyId(bounty.id)}
                            >
                                <div className="item-txt">
                                    <h4 className="item-title">{bounty.title}</h4>
                                    <div className="item-meta-row">
                                        <span className={`status-pill-small ${bounty.status}`}>
                                            {bounty.status.toUpperCase()}
                                        </span>
                                        <span className="sub-count">{submissionsByBounty[bounty.id]?.length || 0} Submissions</span>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="item-chev" />
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Action Area: Detail and Submission Review */}
                <main className="creator-main-view">
                    {selectedBounty ? (
                        <div className="bounty-management-view animate-fade-in">
                            <SharpCard className="management-header-card">
                                <div className="header-row">
                                    <h2 className="header-h-text">{selectedBounty.title}</h2>
                                    <div className="header-reward">{selectedBounty.reward} SUI</div>
                                </div>
                                <div className="header-status-msg">
                                    {selectedBounty.status === 'completed'
                                        ? <div className="msg-box success"><CheckCircle size={14} /> Winner assigned: {selectedBounty.winner}</div>
                                        : <div className="msg-box pending"><Clock size={14} /> Reviewing {selectedSubmissions.length} active contributions</div>
                                    }
                                </div>
                            </SharpCard>

                            <div className="submissions-section">
                                <h3 className="section-h-label">SUBMISSION QUEUE</h3>

                                {selectedSubmissions.length === 0 ? (
                                    <div className="empty-submissions-box">
                                        <Inbox size={32} />
                                        <p>No contributions received for this quest yet.</p>
                                    </div>
                                ) : (
                                    <div className="submissions-grid-sharp">
                                        {selectedSubmissions.map((sub, idx) => {
                                            const isWinner = selectedBounty.winner === sub.walletAddress;
                                            return (
                                                <SharpCard key={idx} className={`submission-row-card ${isWinner ? 'winner' : ''}`}>
                                                    <div className="sub-header-row">
                                                        <div className="sub-identity">
                                                            <div className="sub-avatar-circle">
                                                                <Wallet size={16} />
                                                            </div>
                                                            <div className="sub-identity-txt">
                                                                <span className="sub-wallet-addr monospaced">{sub.walletAddress}</span>
                                                                <span className="sub-date-txt">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="sub-action-btn">
                                                          {isWinner ? (
                                                              <div className="winner-pill">
                                                                  <Trophy size={14} /> WINNER
                                                              </div>
                                                          ) : (
                                                              selectedBounty.status !== 'completed' && (
                                                                  <button
                                                                      className="btn btn-outline small-btn"
                                                                      onClick={() => handleSelectWinner(sub.walletAddress)}
                                                                  >
                                                                      Select Winner
                                                                  </button>
                                                              )
                                                          )}
                                                        </div>
                                                    </div>

                                                    <div className="sub-asset-preview">
                                                        <a href={sub.submissionLink} target="_blank" rel="noopener noreferrer" className="asset-link-box">
                                                            <ExternalLink size={16} />
                                                            <span>View Submitted Assets</span>
                                                            <ArrowUpRight size={14} className="jump-icon" />
                                                        </a>
                                                    </div>
                                                </SharpCard>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="empty-dashboard-state">
                            <Layers size={48} className="empty-icon-main" />
                            <h3 className="empty-dash-h">Project Overview</h3>
                            <p className="empty-dash-p">Select an active quest from the left pipeline to manage submissions and verify work.</p>
                        </div>
                    )}
                </main>
            </div>

            <style>{`
                .creator-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .creator-split-layout {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 32px;
                    height: calc(100vh - 200px);
                }

                .creator-sidebar {
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-lg);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                }

                .sidebar-h {
                    padding: 20px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--color-text-muted);
                    background: #f8fafc;
                    border-bottom: 1px solid var(--color-border);
                    letter-spacing: 0.05em;
                }

                .sidebar-list { flex: 1; overflow-y: auto; }

                .sidebar-item {
                    padding: 20px;
                    border-bottom: 1px solid #f1f5f9;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: all 0.2s;
                }

                .sidebar-item:hover { background: #f8fafc; }
                .sidebar-item.active { background: #eff6ff; border-right: 3px solid var(--color-primary); }

                .item-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 6px; color: var(--color-text); }
                .item-meta-row { display: flex; align-items: center; gap: 10px; }
                .status-pill-small { font-size: 0.65rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; }
                .status-pill-small.active { color: #16a34a; background: #f0fdf4; }
                .status-pill-small.completed { color: #64748b; background: #f1f5f9; }
                .sub-count { font-size: 0.75rem; color: var(--color-text-secondary); font-weight: 600; }
                .item-chev { color: #cbd5e1; opacity: 0; }
                .sidebar-item.active .item-chev { opacity: 1; color: var(--color-primary); }

                .creator-main-view { flex: 1; overflow-y: auto; padding-right: 4px; }

                .management-header-card { padding: 32px !important; margin-bottom: 32px; }
                .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
                .header-h-text { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; }
                .header-reward { font-size: 1.25rem; font-weight: 800; color: var(--color-primary); }

                .msg-box { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; }
                .msg-box.success { color: #16a34a; }
                .msg-box.pending { color: var(--color-primary); }

                .section-h-label { font-size: 0.75rem; font-weight: 800; color: var(--color-text-muted); letter-spacing: 0.05em; margin-bottom: 16px; }

                .empty-submissions-box { text-align: center; padding: 60px; background: #f8fafc; border-radius: var(--radius-lg); border: 1px dashed var(--color-border); color: var(--color-text-muted); }

                .submissions-grid-sharp { display: flex; flex-direction: column; gap: 16px; }
                .submission-row-card { padding: 24px !important; }
                .submission-row-card.winner { border-color: #bbf7d0 !important; background: #f0fdf4 !important; }

                .sub-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
                .sub-identity { display: flex; align-items: center; gap: 12px; }
                .sub-avatar-circle { width: 36px; height: 36px; border-radius: 50%; background: white; border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); }
                .sub-identity-txt { display: flex; flex-direction: column; }
                .sub-wallet-addr { font-size: 0.9rem; font-weight: 700; color: var(--color-text); }
                .sub-date-txt { font-size: 0.75rem; color: var(--color-text-muted); }
                .monospaced { font-family: monospace; }

                .winner-pill { display: flex; align-items: center; gap: 6px; background: #16a34a; color: white; padding: 4px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; }

                .asset-link-box { display: flex; align-items: center; gap: 10px; background: white; border: 1px solid var(--color-border); padding: 12px 16px; border-radius: var(--radius-sm); color: var(--color-text); font-weight: 600; font-size: 0.9rem; transition: all 0.2s; }
                .asset-link-box:hover { border-color: var(--color-primary); color: var(--color-primary); }
                .jump-icon { margin-left: auto; opacity: 0.5; }

                .empty-dashboard-state { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; border: 1px dashed var(--color-border); border-radius: var(--radius-lg); text-align: center; padding: 40px; }
                .empty-icon-main { color: var(--color-text-muted); margin-bottom: 24px; }
                .empty-dash-h { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
                .empty-dash-p { color: var(--color-text-muted); max-width: 320px; line-height: 1.5; }

                .loading-state { padding: 100px; text-align: center; color: var(--color-text-muted); font-weight: 600; }

                .small-btn { padding: 6px 12px !important; font-size: 0.8rem !important; }

                @media (max-width: 1024px) {
                    .creator-split-layout { grid-template-columns: 1fr; height: auto; }
                    .creator-sidebar { max-height: 300px; }
                }
            `}</style>
        </div>
    );
};

export default CreatorDashboard;
