import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    Upload, 
    Link, 
    Users, 
    Target, 
    ChevronRight, 
    CheckCircle2, 
    AlertCircle,
    Info,
    FileText,
    DollarSign
} from 'lucide-react';

const GrantApplyModal = ({ grant, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        projectName: '',
        tagline: '',
        category: grant?.category || 'DeFi',
        vision: '',
        fundingRequested: '',
        timeline: '',
        teamSize: '1-3',
        document: null,
        links: ''
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="modal-step"
                    >
                        <div className="step-header">
                            <h3>Project Foundation</h3>
                            <p>Tell us the basics of what you're building.</p>
                        </div>
                        
                        <div className="form-grid">
                            <div className="form-field">
                                <label>Project Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Rift Protocol" 
                                    value={formData.projectName}
                                    onChange={e => setFormData({...formData, projectName: e.target.value})}
                                />
                            </div>
                            <div className="form-field">
                                <label>Tagline</label>
                                <input 
                                    type="text" 
                                    placeholder="One sentence description" 
                                    value={formData.tagline}
                                    onChange={e => setFormData({...formData, tagline: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label>The Vision</label>
                            <textarea 
                                placeholder="What problem are you solving on Sui?" 
                                rows={4}
                                value={formData.vision}
                                onChange={e => setFormData({...formData, vision: e.target.value})}
                            />
                        </div>

                        <button className="step-btn primary" onClick={handleNext} disabled={!formData.projectName}>
                            Continue <ChevronRight size={18} />
                        </button>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="modal-step"
                    >
                        <div className="step-header">
                            <h3>Scope & Logistics</h3>
                            <p>Define the resources you need to succeed.</p>
                        </div>

                        <div className="form-grid">
                            <div className="form-field">
                                <label>Funding Requested (USDC)</label>
                                <div className="input-with-icon">
                                    <DollarSign size={16} />
                                    <input 
                                        type="number" 
                                        placeholder="5000" 
                                        value={formData.fundingRequested}
                                        onChange={e => setFormData({...formData, fundingRequested: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Team Size</label>
                                <select 
                                    value={formData.teamSize}
                                    onChange={e => setFormData({...formData, teamSize: e.target.value})}
                                >
                                    <option>Solo Builder</option>
                                    <option>2-5 People</option>
                                    <option>5-10 People</option>
                                    <option>10+ People</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-field">
                            <label>Implementation Timeline</label>
                            <input 
                                type="text" 
                                placeholder="e.g. 3 Months to MVP" 
                                value={formData.timeline}
                                onChange={e => setFormData({...formData, timeline: e.target.value})}
                            />
                        </div>

                        <div className="form-actions">
                            <button className="step-btn secondary" onClick={handleBack}>Back</button>
                            <button className="step-btn primary" onClick={handleNext}>Continue <ChevronRight size={18} /></button>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="modal-step"
                    >
                        <div className="step-header">
                            <h3>Evidence & Assets</h3>
                            <p>Upload your pitch deck or whitepaper.</p>
                        </div>

                        <div className="upload-area" onClick={() => document.getElementById('file-upload').click()}>
                            <input 
                                type="file" 
                                id="file-upload" 
                                hidden 
                                onChange={e => setFormData({...formData, document: e.target.files[0]})}
                            />
                            {formData.document ? (
                                <div className="file-preview">
                                    <FileText size={40} />
                                    <span>{formData.document.name}</span>
                                    <button onClick={(e) => { e.stopPropagation(); setFormData({...formData, document: null}); }}>Remove</button>
                                </div>
                            ) : (
                                <>
                                    <Upload size={32} />
                                    <h4>Drop your files here</h4>
                                    <p>Support PDF, DOCX up to 10MB</p>
                                </>
                            )}
                        </div>

                        <div className="form-field">
                            <label>Social / GitHub Links</label>
                            <textarea 
                                placeholder="Paste links to your proof of work..." 
                                rows={3}
                                value={formData.links}
                                onChange={e => setFormData({...formData, links: e.target.value})}
                            />
                        </div>

                        <div className="form-actions">
                            <button className="step-btn secondary" onClick={handleBack}>Back</button>
                            <button 
                                className={`step-btn primary ${isSubmitting ? 'loading' : ''}`} 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="grant-modal-overlay">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="grant-modal-card"
            >
                <button className="close-modal-btn" onClick={onClose}><X size={20} /></button>

                <div className="modal-sidebar-rift">
                    <div className="grant-mini-info">
                        <div className="g-mini-logo">{grant?.title?.charAt(0)}</div>
                        <div className="g-mini-text">
                            <p className="g-program">Applying For</p>
                            <h4 className="g-name">{grant?.title}</h4>
                        </div>
                    </div>

                    <div className="stepper-rift">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`step-item ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}>
                                <div className="step-num">{s}</div>
                                <span>{s === 1 ? 'Foundation' : s === 2 ? 'Logistics' : 'Assets'}</span>
                            </div>
                        ))}
                    </div>

                    <div className="sidebar-footer-tip">
                        <Info size={16} />
                        <p>Tip: Clear project milestones increase funding approval rates.</p>
                    </div>
                </div>

                <div className="modal-content-rift">
                    {isSuccess ? (
                        <div className="success-view-rift">
                            <div className="success-icon-wrap">
                                <CheckCircle2 size={64} />
                            </div>
                            <h2>Application Received!</h2>
                            <p>Your proposal for <strong>{grant?.title}</strong> has been submitted to the committee. We'll reach out via your connected wallet/email within 5-7 business days.</p>
                            <button className="done-btn" onClick={onClose}>Back to Grants</button>
                        </div>
                    ) : (
                        renderStep()
                    )}
                </div>
            </motion.div>

            <style>{`
                .grant-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.85);
                    backdrop-filter: blur(12px);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                }

                .grant-modal-card {
                    width: 100%;
                    max-width: 900px;
                    height: 600px;
                    background: white;
                    border-radius: 32px;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .close-modal-btn {
                    position: absolute;
                    top: 24px;
                    right: 24px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #F1F5F9;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #64748B;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.2s;
                }

                .close-modal-btn:hover {
                    background: #EF4444;
                    color: white;
                    transform: rotate(90deg);
                }

                /* Sidebar */
                .modal-sidebar-rift {
                    width: 280px;
                    background: #F8FAFC;
                    border-right: 1px solid #E2E8F0;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                }

                .grant-mini-info {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 48px;
                }

                .g-mini-logo {
                    width: 48px;
                    height: 48px;
                    background: var(--color-primary);
                    color: white;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 1.2rem;
                }

                .g-program {
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: #94A3B8;
                    text-transform: uppercase;
                    margin: 0;
                }

                .g-name {
                    font-size: 0.9rem;
                    font-weight: 800;
                    color: #0F172A;
                    margin: 2px 0 0;
                    line-height: 1.2;
                }

                .stepper-rift {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    flex: 1;
                }

                .step-item {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    opacity: 0.4;
                    transition: all 0.3s;
                }

                .step-item.active { opacity: 1; }

                .step-num {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 2px solid #CBD5E1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #94A3B8;
                }

                .step-item.active .step-num {
                    background: var(--color-primary);
                    border-color: var(--color-primary);
                    color: white;
                }

                .step-item span {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: #64748B;
                }

                .step-item.current span {
                    color: #0F172A;
                }

                .sidebar-footer-tip {
                    background: rgba(0, 209, 255, 0.1);
                    border: 1px solid rgba(0, 209, 255, 0.2);
                    padding: 16px;
                    border-radius: 16px;
                    display: flex;
                    gap: 12px;
                }

                .sidebar-footer-tip svg { color: var(--color-primary); flex-shrink: 0; }
                .sidebar-footer-tip p { font-size: 0.75rem; color: #475569; line-height: 1.4; margin: 0; font-weight: 500; }

                /* Content */
                .modal-content-rift {
                    flex: 1;
                    padding: 60px;
                    overflow-y: auto;
                }

                .step-header { margin-bottom: 32px; }
                .step-header h3 { font-size: 1.75rem; font-weight: 800; margin-bottom: 8px; color: #0F172A; }
                .step-header p { color: #64748B; font-weight: 500; }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 24px;
                }

                .form-field { margin-bottom: 24px; }
                .form-field label { display: block; font-size: 0.85rem; font-weight: 800; color: #475569; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
                .form-field input, .form-field select, .form-field textarea {
                    width: 100%;
                    background: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 12px;
                    padding: 12px 16px;
                    font-size: 0.95rem;
                    color: #0F172A;
                    outline: none;
                    transition: all 0.2s;
                }

                .form-field input:focus, .form-field textarea:focus {
                    border-color: var(--color-primary);
                    background: white;
                    box-shadow: 0 0 0 4px rgba(0, 209, 255, 0.1);
                }

                .input-with-icon { position: relative; }
                .input-with-icon svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94A3B8; }
                .input-with-icon input { padding-left: 40px; }

                .upload-area {
                    border: 2px dashed #E2E8F0;
                    border-radius: 20px;
                    padding: 40px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin-bottom: 24px;
                }

                .upload-area:hover { border-color: var(--color-primary); background: #F0F9FF; }
                .upload-area svg { color: var(--color-primary); margin-bottom: 12px; }
                .upload-area h4 { font-size: 1.1rem; font-weight: 800; margin-bottom: 4px; }
                .upload-area p { color: #94A3B8; font-size: 0.85rem; }

                .file-preview { display: flex; flex-direction: column; align-items: center; gap: 8px; }
                .file-preview span { font-weight: 700; font-size: 0.9rem; }
                .file-preview button { background: none; border: none; color: #EF4444; font-weight: 700; cursor: pointer; }

                .form-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 40px; }

                .step-btn {
                    padding: 12px 28px;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 0.95rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .step-btn.primary { background: #0F172A; color: white; border: none; }
                .step-btn.primary:hover { background: var(--color-primary); transform: translateY(-2px); }
                .step-btn.primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

                .step-btn.secondary { background: white; border: 1px solid #E2E8F0; color: #64748B; }
                .step-btn.secondary:hover { background: #F8FAFC; color: #0F172A; }

                /* Success View */
                .success-view-rift {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .success-icon-wrap {
                    width: 100px;
                    height: 100px;
                    background: #ECFDF5;
                    color: #10B981;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 32px;
                }

                .success-view-rift h2 { font-size: 2rem; font-weight: 800; margin-bottom: 16px; }
                .success-view-rift p { color: #64748B; max-width: 400px; line-height: 1.6; margin-bottom: 32px; font-weight: 500; }

                .done-btn {
                    padding: 14px 40px;
                    background: #10B981;
                    color: white;
                    border-radius: 14px;
                    font-weight: 800;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .done-btn:hover { background: #059669; transform: scale(1.05); }

                @media (max-width: 800px) {
                    .grant-modal-card { flex-direction: column; height: auto; max-height: 90vh; }
                    .modal-sidebar-rift { width: 100%; padding: 24px; border-right: none; border-bottom: 1px solid #E2E8F0; }
                    .stepper-rift { flex-direction: row; gap: 20px; }
                    .step-item span { display: none; }
                    .modal-content-rift { padding: 32px; }
                }
            `}</style>
        </div>
    );
};

export default GrantApplyModal;
