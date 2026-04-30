import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ChevronLeft, ShieldCheck, Wallet, ArrowRight, FileText, Globe, CheckCircle2, Zap, Send, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GrantApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { grants } = useData();
    const grant = grants.find(g => g.id === parseInt(id));

    const [form, setForm] = useState({
        projectName: '',
        projectDescription: '',
        budgetRequest: '',
        website: '',
        resumeLink: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => navigate('/grants'), 4000);
        }, 2000);
    };

    if (!grant) return (
        <div className="empty-application-v4">
            <Info size={60} />
            <h2>Grant Program Not Found</h2>
            <button className="rift-btn-primary" onClick={() => navigate('/grants')}>Go Back</button>
        </div>
    );

    return (
        <div className="rift-application-page animate-fade-in">
            <div className="bg-blur-blob blob-app-1"></div>
            <div className="bg-blur-blob blob-app-2"></div>

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
                                <CheckCircle2 size={64} />
                            </div>
                            <h2>Proposal Transmitted!</h2>
                            <p className="success-sub">ID: GR-2026-X842</p>
                            <div className="success-body-v4">
                                <p>The {grant.title} committee has received your proposal. Our review engine will process your submission within 10-15 cycles.</p>
                            </div>
                            <div className="success-loader">
                                <div className="loader-fill"></div>
                            </div>
                            <span className="redirect-text">Redirecting to Grants Hub...</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="application-container-v4"
                    >
                        <nav className="back-nav-v4">
                            <button onClick={() => navigate(-1)} className="back-pill-v4">
                                <ChevronLeft size={18} /> Cancel Application
                            </button>
                        </nav>

                        <header className="app-header-v4">
                            <div className="app-badge-v4">
                                <Send size={14} /> Official Application
                            </div>
                            <h1 className="app-title-v4">Funding <span>Proposal</span></h1>
                            <p className="app-subtitle-v4">Applying for the <strong>{grant.title}</strong> program. Your vision, backed by the Sui ecosystem.</p>
                        </header>

                        <div className="app-grid-v4">
                            <main className="app-main-v4">
                                <div className="glass-pill-v4 form-card-v4">
                                    <form onSubmit={handleSubmit} className="rift-form-v4">
                                        <div className="form-row-v4">
                                            <div className="form-group-v4">
                                                <label>Project Name</label>
                                                <div className="input-wrap-v4">
                                                    <input 
                                                        type="text" 
                                                        placeholder="e.g. Sui Commerce Engine" 
                                                        required
                                                        value={form.projectName}
                                                        onChange={(e) => setForm({...form, projectName: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group-v4">
                                                <label>Capital Requested (USD)</label>
                                                <div className="input-wrap-v4">
                                                    <input 
                                                        type="text" 
                                                        placeholder="50,000" 
                                                        required
                                                        value={form.budgetRequest}
                                                        onChange={(e) => setForm({...form, budgetRequest: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group-v4 full-width">
                                            <label>Mission Strategy</label>
                                            <div className="textarea-wrap-v4">
                                                <textarea 
                                                    placeholder="Describe your project, roadmap, and how you will impact the Sui ecosystem..." 
                                                    required
                                                    rows={8}
                                                    value={form.projectDescription}
                                                    onChange={(e) => setForm({...form, projectDescription: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-v4 full-width">
                                            <label>External Resources</label>
                                            <div className="input-wrap-v4 with-icon">
                                                <Globe size={18} />
                                                <input 
                                                    type="url" 
                                                    placeholder="Website or Social Link" 
                                                    value={form.website}
                                                    onChange={(e) => setForm({...form, website: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group-v4 full-width">
                                            <label>Resume / Project Portfolio Link</label>
                                            <div className="input-wrap-v4 with-icon">
                                                <FileText size={18} />
                                                <input 
                                                    type="url" 
                                                    placeholder="Link to your resume or portfolio (GitHub / LinkedIn)" 
                                                    required
                                                    value={form.resumeLink}
                                                    onChange={(e) => setForm({...form, resumeLink: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-footer-v4">
                                            <button type="submit" className="rift-btn-primary full-width large" disabled={isSubmitting}>
                                                {isSubmitting ? (
                                                    "Transmitting..."
                                                ) : (
                                                    <>Submit Application <ArrowRight size={20} /></>
                                                )}
                                            </button>
                                            <p className="legal-info-v4">
                                                By submitting, you agree to our ecosystem contribution terms and project verification standards.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </main>

                            <aside className="app-sidebar-v4">
                                <div className="glass-pill-v4 side-card-v4">
                                    <h3>Program Details</h3>
                                    <div className="side-stats-v4">
                                        <div className="side-stat-item">
                                            <span className="label">Available Pool</span>
                                            <span className="val highlight">{grant.amount}</span>
                                        </div>
                                        <div className="side-stat-item">
                                            <span className="label">Filing Cycle</span>
                                            <span className="val">Q2 2024</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-pill-v4 side-card-v4">
                                    <h3>Guidelines</h3>
                                    <ul className="guideline-list-v4">
                                        <li><ShieldCheck size={16} /> Open ecosystem standards</li>
                                        <li><ShieldCheck size={16} /> Scalable architecture</li>
                                        <li><ShieldCheck size={16} /> Verified identity required</li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .rift-application-page {
                    padding: 80px 24px 120px;
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
                .blob-app-1 { top: 10%; right: -5%; background: var(--color-primary); }
                .blob-app-2 { bottom: 10%; left: -5%; background: var(--color-accent); }

                .back-nav-v4 { margin-bottom: 40px; }
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
                .back-pill-v4:hover { border-color: var(--color-primary); color: var(--color-primary); }

                .app-header-v4 { margin-bottom: 60px; }
                .app-badge-v4 {
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
                .app-title-v4 { font-size: 3.5rem; font-weight: 800; color: var(--color-text); line-height: 1; margin-bottom: 20px; }
                .app-title-v4 span { color: var(--color-primary); }
                .app-subtitle-v4 { font-size: 1.15rem; color: var(--color-text-muted); font-weight: 400; }

                .app-grid-v4 { display: grid; grid-template-columns: 1fr 340px; gap: 40px; }
                
                .form-card-v4 { padding: 48px !important; }
                .rift-form-v4 { display: flex; flex-direction: column; gap: 32px; }

                .form-row-v4 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
                .form-group-v4 { display: flex; flex-direction: column; gap: 10px; }
                .form-group-v4 label { font-size: 0.9rem; font-weight: 700; color: var(--color-text); }

                .input-wrap-v4, .textarea-wrap-v4 {
                    background: rgba(0,0,0,0.04);
                    border: 2.5px solid rgba(0,0,0,0.08);
                    border-radius: 16px !important;
                    transition: all 0.2s;
                }
                .input-wrap-v4:focus-within, .textarea-wrap-v4:focus-within {
                    border-color: var(--color-primary);
                    background: white;
                    box-shadow: 0 8px 24px -10px rgba(56, 193, 244, 0.2);
                }

                .input-wrap-v4 input, .textarea-wrap-v4 textarea {
                    width: 100%;
                    padding: 16px 20px;
                    border: none;
                    background: transparent;
                    outline: none;
                    font-size: 1rem;
                    font-weight: 400;
                    color: var(--color-text);
                }
                .input-wrap-v4 input::placeholder, .textarea-wrap-v4 textarea::placeholder {
                    color: #94A3B8;
                    font-weight: 400;
                }
                .input-wrap-v4.with-icon { display: flex; align-items: center; padding-left: 20px; }
                .input-wrap-v4.with-icon input { padding-left: 12px; }
                .input-wrap-v4.with-icon svg { color: var(--color-primary); opacity: 0.6; }

                .form-footer-v4 { text-align: center; border-top: 1px solid var(--color-border); padding-top: 40px; }
                .large { height: 64px; font-size: 1.1rem; }
                .legal-info-v4 { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 20px; font-weight: 500; max-width: 400px; margin-left: auto; margin-right: auto; }

                .side-card-v4 { padding: 32px !important; margin-bottom: 24px; }
                .side-card-v4 h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 24px; }
                
                .side-stats-v4 { display: flex; flex-direction: column; gap: 20px; }
                .side-stat-item { display: flex; justify-content: space-between; }
                .side-stat-item .label { font-size: 0.9rem; font-weight: 700; color: var(--color-text-muted); }
                .side-stat-item .val { font-size: 0.95rem; font-weight: 800; color: var(--color-text); }
                .side-stat-item .highlight { color: var(--color-primary); }

                .guideline-list-v4 { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 16px; }
                .guideline-list-v4 li { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; font-weight: 400; color: var(--color-text); }
                .guideline-list-v4 li svg { color: var(--color-primary); }

                /* Success State */
                .success-container-v4 { display: flex; align-items: center; justify-content: center; min-height: 60vh; }
                .success-card-v4 { padding: 60px !important; text-align: center; max-width: 500px; }
                .success-icon-v4 { width: 100px; height: 100px; background: #10B98115; color: #10B981; border-radius: 50% !important; display: flex; align-items: center; justify-content: center; margin: 0 auto 32px; }
                .success-card-v4 h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
                .success-sub { font-family: monospace; font-size: 0.9rem; font-weight: 700; color: var(--color-primary); background: var(--color-primary-soft); padding: 4px 12px; border-radius: 6px !important; display: inline-block; margin-bottom: 32px; }
                .success-body-v4 p { font-size: 1.1rem; color: var(--color-text-muted); font-weight: 400; line-height: 1.6; }

                .success-loader { width: 100%; height: 6px; background: var(--color-surface); border-radius: 10px !important; margin: 40px 0 16px; overflow: hidden; }
                .loader-fill { height: 100%; background: #10B981; border-radius: 10px !important; animation: fill-progress 4s linear; width: 0; }
                .redirect-text { font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted); }

                @keyframes fill-progress { from { width: 0; } to { width: 100%; } }

                @media (max-width: 1024px) {
                    .app-grid-v4 { grid-template-columns: 1fr; }
                    .form-row-v4 { grid-template-columns: 1fr; }
                    .app-title-v4 { font-size: 2.5rem; }
                }
            `}</style>
        </div>
    );
};

export default GrantApplication;
