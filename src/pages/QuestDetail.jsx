import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard
import { ArrowLeft, Clock, Users, Share2, Award, CheckCircle, Trophy, ShieldCheck, ChevronRight } from 'lucide-react';

/**
 * QuestDetail Page - Redesigned for a high-end "First Dollar" FinTech look.
 * Focuses on deep clarity, professional typography, and a structured layout.
 */
const QuestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { bounties } = useData();

    const quest = bounties?.find(b => b.id.toString() === id);

    if (!quest) {
        return (
            <div className="quest-detail-container">
                <div className="not-found">
                    <h2>Asset not found</h2>
                    <p>The quest you are looking for may have expired or been moved.</p>
                    <button className="btn btn-primary" onClick={() => navigate(-1)}>Return to Marketplace</button>
                </div>
            </div>
        );
    }

    const handleJoin = () => {
        navigate(`/quest/submit/${quest.id}`);
    };

    return (
        <div className="quest-detail-wrapper animate-fade-in">
            <nav className="breadcrumb-nav">
                <button className="breadcrumb-back" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Marketplace
                </button>
                <ChevronRight size={14} className="breadcrumb-sep" />
                <span className="breadcrumb-current">{quest.title}</span>
            </nav>

            <header className="quest-detail-header">
                <div className="header-main-info">
                    <div className="org-identity">
                        <img src={quest.communityImg} alt="" className="org-logo-large" />
                        <span className="org-name-header">{quest.community}</span>
                        <div className="verified-badge">
                            <ShieldCheck size={14} /> Verified
                        </div>
                    </div>
                    <h1 className="quest-detail-title">{quest.title}</h1>
                    <div className="quest-detail-meta">
                        <div className="meta-tag"><Clock size={16} /> Ends {quest.deadline}</div>
                        <div className="meta-tag"><Users size={16} /> {quest.participants} Active Raiders</div>
                        <div className="meta-tag category-badge">{quest.category}</div>
                    </div>
                </div>

                <div className="header-payout-panel">
                    <SharpCard className="payout-card-sharp">
                        <div className="payout-label">ESTIMATED REWARD</div>
                        <div className="payout-value">{quest.reward} <span className="payout-token">SUI</span></div>
                        
                        {quest.winner ? (
                            <div className="status-banner winner">
                                <Trophy size={18} />
                                <div>
                                    <span className="status-h">Closed</span>
                                    <span className="status-p">Distributed to {quest.winner.substring(0, 8)}...</span>
                                </div>
                            </div>
                        ) : (
                            <button className="btn btn-primary full-width large-btn" onClick={handleJoin}>
                                Submit Contribution
                            </button>
                        )}
                        <p className="payout-disclaimer">Payouts are distributed via Slush Wallet upon verification.</p>
                    </SharpCard>
                </div>
            </header>

            <div className="quest-content-layout">
                <div className="content-main-col">
                    <SharpCard className="detail-section-card">
                        <h2 className="section-h">Objective & Description</h2>
                        <div className="section-body">
                            <p>
                                This contribution request is aimed at enhancing the Sui ecosystem through high-quality development or design work. 
                                We are looking for contributors who can deliver professional results that align with the community's standards.
                            </p>
                            <h3>Key Requirements</h3>
                            <ul className="requirements-list">
                                <li><strong>Professional Execution:</strong> Submissions must be polished and ready for production or public display.</li>
                                <li><strong>Original Work:</strong> All contributions must be your own and appropriately documented.</li>
                                <li><strong>Sui Integration:</strong> Where applicable, leverage Sui-specific features or Slush wallet connectivity.</li>
                            </ul>
                        </div>
                    </SharpCard>

                    <SharpCard className="detail-section-card">
                        <h2 className="section-h">Submission Protocol</h2>
                        <div className="section-body">
                            <p>To ensure a smooth payout process, please follow the formal submission protocol:</p>
                            <ol className="protocol-list">
                                <li>Initialize the contribution via the "Submit Contribution" button.</li>
                                <li>Provide a link to a public repository or hosted document.</li>
                                <li>Include a brief executive summary of your work.</li>
                                <li>Sign the submission using your connected Sui Wallet.</li>
                            </ol>
                        </div>
                    </SharpCard>
                </div>

                <aside className="content-side-col">
                    <SharpCard className="side-card-sharp">
                        <h3 className="side-h">About Organization</h3>
                        <p className="side-p">A verified contributor to the Sui-gig network specializing in {quest.category.toLowerCase()} initiatives.</p>
                        <button className="btn btn-outline full-width">View Organization</button>
                    </SharpCard>

                    <SharpCard className="side-card-sharp">
                        <h3 className="side-h">Network Share</h3>
                        <p className="side-p">Help grow the network by sharing this opportunity with your professional circle.</p>
                        <button className="btn btn-outline full-width">
                            <Share2 size={16} /> Copy Reference URL
                        </button>
                    </SharpCard>
                </aside>
            </div>

            <style>{`
                .quest-detail-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .breadcrumb-nav {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 32px;
                    color: var(--color-text-muted);
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .breadcrumb-back {
                    background: none;
                    border: none;
                    color: var(--color-text-secondary);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    padding: 0;
                }
                .breadcrumb-back:hover { color: var(--color-primary); }

                .breadcrumb-sep { color: #cbd5e1; }
                .breadcrumb-current { color: var(--color-text-muted); }

                .quest-detail-header {
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 48px;
                    margin-bottom: 48px;
                    align-items: flex-start;
                }

                .org-identity {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 24px;
                }

                .org-logo-large {
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                }

                .org-name-header {
                    font-weight: 700;
                    font-size: 1rem;
                    color: var(--color-text-secondary);
                }

                .verified-badge {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #16a34a;
                    background: #f0fdf4;
                    padding: 2px 8px;
                    border-radius: 4px;
                    border: 1px solid #dcfce7;
                }

                .quest-detail-title {
                    font-size: 2.75rem;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                    margin-bottom: 24px;
                    color: var(--color-text);
                }

                .quest-detail-meta {
                    display: flex;
                    gap: 24px;
                    color: var(--color-text-secondary);
                    font-size: 0.95rem;
                    font-weight: 500;
                }

                .meta-tag {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .category-badge {
                    background: #f1f5f9;
                    padding: 2px 10px;
                    border-radius: 4px;
                    font-weight: 700;
                    color: #475569;
                    font-size: 0.8rem;
                }

                .payout-card-sharp {
                    padding: 32px !important;
                }

                .payout-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--color-text-muted);
                    letter-spacing: 0.05em;
                    margin-bottom: 12px;
                }

                .payout-value {
                    font-size: 2.25rem;
                    font-weight: 800;
                    line-height: 1;
                    margin-bottom: 24px;
                }

                .payout-token {
                    font-size: 1.25rem;
                    color: var(--color-text-muted);
                    font-weight: 500;
                }

                .large-btn { padding: 16px !important; font-size: 1.1rem !important; }

                .payout-disclaimer {
                    font-size: 0.8rem;
                    color: var(--color-text-muted);
                    margin-top: 16px;
                    line-height: 1.4;
                    text-align: center;
                }

                .status-banner {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    border-radius: var(--radius-md);
                    font-size: 0.9rem;
                }

                .status-banner.winner {
                    background: #fff8eb;
                    color: #b45309;
                    border: 1px solid #fde68a;
                }

                .status-h { font-weight: 700; display: block; }
                .status-p { font-size: 0.8rem; opacity: 0.8; }

                .quest-content-layout {
                    display: grid;
                    grid-template-columns: 1fr 320px;
                    gap: 40px;
                }

                .detail-section-card {
                    padding: 40px !important;
                    margin-bottom: 32px;
                }

                .section-h {
                    font-size: 1.25rem;
                    font-weight: 700;
                    padding-bottom: 16px;
                    border-bottom: 1px solid var(--color-border);
                    margin-bottom: 24px;
                }

                .section-body h3 { font-size: 1.1rem; margin: 32px 0 16px; }
                .section-body p { color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 16px; font-size: 1.05rem; }

                .requirements-list, .protocol-list {
                    color: var(--color-text-secondary);
                    line-height: 1.8;
                    margin-left: 20px;
                    font-size: 1.05rem;
                }

                .side-card-sharp { padding: 24px !important; margin-bottom: 24px; }
                .side-h { font-size: 1rem; font-weight: 700; margin-bottom: 12px; }
                .side-p { font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 20px; }

                .full-width { width: 100%; }

                @media (max-width: 1024px) {
                    .quest-detail-header { grid-template-columns: 1fr; gap: 32px; }
                    .header-payout-panel { max-width: 400px; }
                    .quest-content-layout { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default QuestDetail;
