import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Upload, Link as LinkIcon, FileText, CheckCircle2, ChevronLeft, ShieldCheck, AlertCircle, Zap, Send, Trophy, Info, Twitter, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuestSubmission = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { bounties } = useData();
    const quest = bounties.find(b => b.id === parseInt(id));

    const [form, setForm] = useState({
        twitterLink: '',
        videoLink: '',
        briefTelling: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => navigate('/profile'), 4000);
    };

    if (!quest) return (
        <div className="empty-submission-v4">
            <Info size={60} />
            <h2>Mission Not Found</h2>
            <button className="wizz-btn-primary" onClick={() => navigate('/explore')}>Go to Explore</button>
        </div>
    );

    return (
        <div className="wizz-submission-page animate-fade-in">
            <div className="bg-blur-blob blob-sub-1"></div>
            <div className="bg-blur-blob blob-sub-2"></div>

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="success-container-v4"
                    >
                        <div className="success-card-v4 elevated-card">
                            <div className="success-icon-v4">
                                <Trophy size={64} />
                            </div>
                            <h2>Mission Completed!</h2>
                            <p className="success-sub">TX: 0x82...F9A2</p>
                            <div className="success-body-v4">
                                <p>Your contribution has been successfully transmitted to the {quest.community} network. Verification nodes are now processing your evidence.</p>
                            </div>
                            <div className="success-reward-badge-v4">
                                <Zap size={18} /> +{quest.reward} SUI Pending
                            </div>
                            <div className="success-loader">
                                <div className="loader-fill"></div>
                            </div>
                            <span className="redirect-text">Returning to your Profile...</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="submission-container-v4"
                    >
                        <nav className="back-nav-v4">
                            <button onClick={() => navigate(-1)} className="back-pill-v4">
                                <ChevronLeft size={18} /> Cancel Submission
                            </button>
                        </nav>

                        <header className="sub-header-v4">
                            <div className="sub-badge-v4">
                                <Send size={14} /> Mission Filing
                            </div>
                            <h1 className="sub-title-v4">Submit <span>Evidence</span></h1>
                            <p className="sub-subtitle-v4">Finalize your work for <strong>{quest.title}</strong> and claim your reward.</p>
                        </header>

                        <div className="sub-grid-v4">
                            <main className="sub-main-v4">
                                <div className="glass-pill-v4 form-card-v4">
                                    <form onSubmit={handleSubmit} className="wizz-form-v4">
                                        
                                        <div className="form-group-v4 full-width">
                                            <label>Twitter Link (Optional)</label>
                                            <div className="input-wrap-v4 with-icon">
                                                <Twitter size={18} />
                                                <input 
                                                    type="url" 
                                                    placeholder="https://x.com/your-tweet..." 
                                                    value={form.twitterLink}
                                                    onChange={(e) => setForm({...form, twitterLink: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-v4 full-width">
                                            <label>Video Link (Optional)</label>
                                            <div className="input-wrap-v4 with-icon">
                                                <Video size={18} />
                                                <input 
                                                    type="url" 
                                                    placeholder="https://youtube.com/... or Loom link" 
                                                    value={form.videoLink}
                                                    onChange={(e) => setForm({...form, videoLink: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-v4 full-width">
                                            <label>Brief Telling (Description)</label>
                                            <div className="textarea-wrap-v4">
                                                <textarea 
                                                    placeholder="Briefly explain what you've accomplished and any key details we should know..." 
                                                    required
                                                    rows={8}
                                                    value={form.briefTelling}
                                                    onChange={(e) => setForm({...form, briefTelling: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-footer-v4">
                                            <button type="submit" className="wizz-btn-primary full-width large" disabled={isSubmitting}>
                                                {isSubmitting ? "Processing..." : "Submit Mission Evidence"}
                                            </button>
                                            <p className="legal-info-v4">
                                                Submissions are final and will be archived on the Sui blockchain for verification.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </main>

                            <aside className="sub-sidebar-v4">
                                <div className="glass-pill-v4 side-card-v4">
                                    <h3>Mission Reward</h3>
                                    <div className="reward-pill-v4">
                                        <span className="reward-amt">{quest.reward} SUI</span>
                                        <span className="reward-status">Verified Base Pay</span>
                                    </div>
                                </div>

                                <div className="glass-pill-v4 side-card-v4">
                                    <h3>Verification Status</h3>
                                    <ul className="guideline-list-v4">
                                        <li><ShieldCheck size={16} /> Wallet Pre-Signed</li>
                                        <li><ShieldCheck size={16} /> Anti-spam active</li>
                                        <li><ShieldCheck size={16} /> Audit queue: Low</li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .wizz-submission-page {
                    padding: 40px 24px 120px;
                    max-width: 1200px;
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
                .blob-sub-1 { top: 10%; right: -5%; background: var(--color-primary); }
                .blob-sub-2 { bottom: 10%; left: -5%; background: var(--color-accent); }

                .back-nav-v4 { margin-bottom: 32px; }
                .back-pill-v4 {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 9999px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #64748B;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .back-pill-v4:hover { border-color: var(--color-primary); color: var(--color-primary); }

                .sub-header-v4 { margin-bottom: 48px; }
                .sub-badge-v4 {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: var(--color-primary-soft);
                    color: var(--color-primary);
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    margin-bottom: 16px;
                    text-transform: uppercase;
                }
                .sub-title-v4 { font-size: 3rem; font-weight: 800; color: #0F172A; line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.04em; }
                .sub-title-v4 span { color: var(--color-primary); }
                .sub-subtitle-v4 { font-size: 1.1rem; color: #64748B; font-weight: 500; }

                .sub-grid-v4 { display: grid; grid-template-columns: 1fr 340px; gap: 40px; }
                
                .form-card-v4 { 
                    padding: 40px !important; 
                    background: white; 
                    border: 1px solid #E2E8F0; 
                    border-radius: 24px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.02);
                }
                .wizz-form-v4 { display: flex; flex-direction: column; gap: 28px; }

                .form-group-v4 { display: flex; flex-direction: column; gap: 8px; }
                .form-group-v4 label { font-size: 0.85rem; font-weight: 800; color: #0F172A; }

                .input-wrap-v4, .textarea-wrap-v4 {
                    background: #F8FAFC;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 14px !important;
                    transition: all 0.2s;
                }
                .input-wrap-v4:focus-within, .textarea-wrap-v4:focus-within {
                    border-color: var(--color-primary);
                    background: white;
                    box-shadow: 0 0 0 4px var(--color-primary-soft);
                }

                .input-wrap-v4 input, .textarea-wrap-v4 textarea {
                    width: 100%;
                    padding: 14px 16px;
                    border: none;
                    background: transparent;
                    outline: none;
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #0F172A;
                }
                .input-wrap-v4.with-icon { display: flex; align-items: center; padding-left: 16px; }
                .input-wrap-v4.with-icon input { padding-left: 12px; }
                .input-wrap-v4.with-icon svg { color: var(--color-primary); opacity: 0.8; }

                .form-footer-v4 { text-align: center; border-top: 1px solid #F1F5F9; padding-top: 32px; }
                .large { height: 56px; font-size: 1.05rem; }
                .legal-info-v4 { font-size: 0.75rem; color: #94A3B8; margin-top: 16px; font-weight: 600; }

                .side-card-v4 { 
                    padding: 24px !important; 
                    background: white; 
                    border: 1px solid #E2E8F0; 
                    border-radius: 20px;
                    margin-bottom: 24px; 
                }
                .side-card-v4 h3 { font-size: 0.95rem; font-weight: 800; margin-bottom: 20px; }
                
                .reward-pill-v4 {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 20px;
                    background: var(--color-primary-soft);
                    border-radius: 16px !important;
                    text-align: center;
                }
                .reward-amt { font-size: 1.5rem; font-weight: 900; color: var(--color-primary); }
                .reward-status { font-size: 0.75rem; font-weight: 800; color: var(--color-primary); opacity: 0.8; }

                .guideline-list-v4 { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
                .guideline-list-v4 li { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600; color: #475569; }
                .guideline-list-v4 li svg { color: var(--color-primary); }

                /* Success State */
                .success-container-v4 { display: flex; align-items: center; justify-content: center; min-height: 60vh; }
                .success-card-v4 { padding: 60px !important; text-align: center; max-width: 500px; border-top: 8px solid #10B981 !important; }
                .success-icon-v4 { width: 100px; height: 100px; background: #10B98115; color: #10B981; border-radius: 50% !important; display: flex; align-items: center; justify-content: center; margin: 0 auto 32px; }
                .success-card-v4 h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
                .success-sub { font-family: monospace; font-size: 0.9rem; font-weight: 700; color: #10B981; background: #10B98115; padding: 4px 12px; border-radius: 6px !important; display: inline-block; margin-bottom: 32px; }
                .success-body-v4 p { font-size: 1.1rem; color: #64748B; font-weight: 400; line-height: 1.6; }

                .success-reward-badge-v4 { display: inline-flex; align-items: center; gap: 10px; padding: 12px 24px; background: var(--color-primary-soft); color: var(--color-primary); border-radius: 12px !important; font-weight: 800; margin-top: 32px; }

                .success-loader { width: 100%; height: 6px; background: #F1F5F9; border-radius: 10px !important; margin: 40px 0 16px; overflow: hidden; }
                .loader-fill { height: 100%; background: #10B981; border-radius: 10px !important; animation: fill-progress 4s linear; width: 0; }
                .redirect-text { font-size: 0.85rem; font-weight: 700; color: #94A3B8; }

                @keyframes fill-progress { from { width: 0; } to { width: 100%; } }

                @media (max-width: 1024px) {
                    .sub-grid-v4 { grid-template-columns: 1fr; }
                    .sub-title-v4 { font-size: 2.5rem; }
                }
            `}</style>
        </div>
    );
};

export default QuestSubmission;
