import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
    Clock, Users, ArrowRight, Share2, ShieldCheck, 
    Briefcase, ChevronLeft, CheckCircle2, Activity, 
    Database, Zap, Info, Target, FileText, Globe 
} from 'lucide-react';
import { motion } from 'framer-motion';

const QuestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { bounties } = useData();
    const quest = bounties.find(b => b.id === parseInt(id));

    if (!quest) return (
        <div className="empty-detail-v4">
            <Database size={60} />
            <h2>Mission Not Found</h2>
            <button className="rift-btn-primary" onClick={() => navigate('/explore')}>Go Back</button>
        </div>
    );

    return (
        <div className="rift-quest-detail animate-fade-in">
            <div className="bg-blur-blob blob-detail-1"></div>

            <nav className="detail-nav-v4">
                <button onClick={() => navigate(-1)} className="back-pill-v4">
                    <ChevronLeft size={18} /> Back to Hub
                </button>
            </nav>

            <header className="detail-header-v4">
                <div className="header-top-v4">
                    <div className="quest-org-v4">
                        <img src={quest.communityImg} alt="" className="org-icon-v4" />
                        <span className="org-name-v4">{quest.community}</span>
                        <div className="v-divider"></div>
                        <span className="cat-tag-v4">{quest.category}</span>
                    </div>
                    <div className="header-chips-v4">
                        <div className="chip-v4"><Users size={14} /> {quest.participants} spots left</div>
                        <div className="chip-v4"><Clock size={14} /> 4 days left</div>
                    </div>
                </div>
                <h1 className="quest-title-v4">{quest.title}</h1>
            </header>

            <div className="detail-grid-v4">
                <div className="detail-main-v4">
                    <section className="detail-section-v4 glass-pill-v4">
                        <div className="section-title-wrap-v4">
                            <Info size={20} className="text-primary" />
                            <h3>Overview</h3>
                        </div>
                        <div className="section-content-v4">
                            <p>Join {quest.community} in this high-impact mission to enhance the Sui ecosystem. This mission is part of our strategic growth protocol, designed to reward heavy contributors for their technical and creative expertise.</p>
                            <p>Successful completion will grant you immediate yield in SUI and boosted reputation across the network.</p>
                        </div>
                    </section>

                    <section className="detail-section-v4 glass-pill-v4">
                        <div className="section-title-wrap-v4">
                            <Target size={20} className="text-primary" />
                            <h3>Deliverables</h3>
                        </div>
                        <div className="deliv-list-v4">
                            {[
                                "Complete technical integration with the core protocol.",
                                "Submit a detailed case study or documentation of your work.",
                                "Participate in the final verification handshake with our core team.",
                                "Ensure all code/assets are uploaded to the verified repository."
                            ].map((item, i) => (
                                <div key={i} className="deliv-item-v4">
                                    <CheckCircle2 size={18} className="text-success" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="detail-section-v4 glass-pill-v4">
                        <div className="section-title-wrap-v4">
                            <ShieldCheck size={20} className="text-primary" />
                            <h3>Rules & Requirements</h3>
                        </div>
                        <div className="rules-content-v4">
                            <ul className="rift-bullets">
                                <li>One submission per participant.</li>
                                <li>All contributions must be original and verified.</li>
                                <li>High-quality assets Only. Plagiarism results in permanent ban.</li>
                                <li>Rewards are distributed automatically upon verification.</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <aside className="detail-sidebar-v4">
                    <div className="sticky-sidebar-v4">
                        <div className="reward-card-v4 elevated-card">
                            <div className="reward-top-label-v4">
                                <Zap size={14} /> MISSION REWARD
                            </div>
                            <div className="reward-value-v4">
                                <span className="amount">{quest.reward}</span>
                                <span className="unit">SUI</span>
                            </div>
                            <div className="reward-stats-v4">
                                <div className="r-stat-v4">
                                    <span className="r-label">Status</span>
                                    <span className="r-val status-active">Active</span>
                                </div>
                                <div className="r-stat-v4">
                                    <span className="r-label">Network</span>
                                    <span className="r-val">Sui Mainnet</span>
                                </div>
                            </div>
                            <button 
                                className="rift-btn-primary full-width"
                                onClick={() => navigate(`/quest/submit/${quest.id}`)}
                            >
                                Start Mission <ArrowRight size={18} />
                            </button>
                        </div>

                        <div className="share-card-v4 glass-pill-v4">
                            <h4>Spread the word</h4>
                            <p>Share this mission with your network and build together.</p>
                            <div className="share-actions-v4">
                                <button className="social-btn-mini-v4"><Share2 size={18} /></button>
                                <button className="social-btn-mini-v4"><Globe size={18} /></button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            <style>{`
                .rift-quest-detail {
                    padding: 40px 24px 100px;
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                }

                .bg-blur-blob {
                    position: fixed;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(56, 193, 244, 0.08) 0%, transparent 70%);
                    z-index: -1;
                    filter: blur(100px);
                }
                .blob-detail-1 { top: -10%; right: -5%; }

                .detail-nav-v4 { margin-bottom: 40px; }
                .back-pill-v4 {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 9999px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .back-pill-v4:hover { border-color: var(--color-primary); color: var(--color-primary); transform: translateX(-4px); }

                .detail-header-v4 { margin-bottom: 48px; }
                .header-top-v4 { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
                .quest-org-v4 { display: flex; align-items: center; gap: 12px; }
                .org-icon-v4 { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--color-border); }
                .org-name-v4 { font-weight: 800; font-size: 1rem; color: var(--color-text); }
                .v-divider { width: 1px; height: 20px; background: var(--color-border); }
                .cat-tag-v4 { font-weight: 700; font-size: 0.85rem; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; }

                .header-chips-v4 { display: flex; gap: 12px; }
                .chip-v4 {
                    padding: 6px 14px;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    border-radius: 9999px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--color-text-muted);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .quest-title-v4 { font-size: 3.5rem; font-weight: 800; color: var(--color-text); line-height: 1.1; letter-spacing: -0.02em; }

                .detail-grid-v4 { display: grid; grid-template-columns: 1fr 380px; gap: 40px; }
                .detail-main-v4 { display: flex; flex-direction: column; gap: 32px; }

                .detail-section-v4 { padding: 40px !important; }
                .section-title-wrap-v4 { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
                .section-title-wrap-v4 h3 { font-size: 1.5rem; font-weight: 800; color: var(--color-text); margin: 0; }
                
                .section-content-v4 p { font-size: 1.1rem; line-height: 1.6; color: var(--color-text-muted); margin-bottom: 20px; font-weight: 400; }
                
                .deliv-list-v4 { display: flex; flex-direction: column; gap: 16px; }
                .deliv-item-v4 { display: flex; gap: 12px; align-items: flex-start; font-size: 1.05rem; font-weight: 500; color: var(--color-text); }
                .deliv-item-v4 svg { flex-shrink: 0; margin-top: 3px; }

                .rift-bullets { padding-left: 20px; }
                .rift-bullets li { font-size: 1.05rem; color: var(--color-text-muted); margin-bottom: 12px; font-weight: 400; }

                .sticky-sidebar-v4 {
                    position: sticky;
                    top: 100px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }

                .reward-card-v4 { padding: 40px !important; background: white !important; border-top: 4px solid var(--color-primary) !important; }
                .reward-top-label-v4 { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 800; color: var(--color-primary); margin-bottom: 20px; letter-spacing: 0.05em; }
                .reward-value-v4 { display: flex; align-items: baseline; gap: 8px; margin-bottom: 32px; }
                .reward-value-v4 .amount { font-size: 4rem; font-weight: 800; color: var(--color-text); line-height: 1; letter-spacing: -0.05em; }
                .reward-value-v4 .unit { font-size: 1.5rem; font-weight: 800; color: var(--color-primary); }

                .reward-stats-v4 { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; padding-top: 24px; border-top: 1px solid var(--color-border); }
                .r-stat-v4 { display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 700; }
                .r-label { color: var(--color-text-muted); }
                .r-val { color: var(--color-text); }
                .status-active { color: #10B981; }

                .share-card-v4 { padding: 32px !important; margin-top: 24px; text-align: center; }
                .share-card-v4 h4 { font-size: 1rem; font-weight: 800; margin-bottom: 8px; }
                .share-card-v4 p { font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 20px; font-weight: 600; }
                .share-actions-v4 { display: flex; gap: 12px; justify-content: center; }
                .social-btn-mini-v4 { width: 44px; height: 44px; border-radius: 50% !important; background: white; border: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); cursor: pointer; transition: all 0.2s; }
                .social-btn-mini-v4:hover { color: var(--color-primary); border-color: var(--color-primary); }

                .empty-detail-v4 { padding: 100px; text-align: center; color: var(--color-text-muted); }
                .empty-detail-v4 h2 { margin: 24px 0; color: var(--color-text); }

                @media (max-width: 1024px) {
                    .detail-grid-v4 { grid-template-columns: 1fr; }
                    .quest-title-v4 { font-size: 2.5rem; }
                    .reward-card-v4 { position: relative; top: 0; }
                }
            `}</style>
        </div>
    );
};

export default QuestDetail;
