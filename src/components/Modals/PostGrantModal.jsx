import React, { useState } from 'react';
import { X, Send, Banknote, Tag, FileText, Zap, Globe, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PostGrantModal = ({ isOpen, onClose, onPost }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        description: '',
        tags: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newGrant = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t)
        };
        onPost(newGrant);
        onClose();
        setFormData({ title: '', amount: '', description: '', tags: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="wizz-modal-overlay">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="wizz-modal-card glass-pill-v4"
                >
                    <header className="modal-header-v4">
                        <div className="header-icon-v4 logo-wrap">
                            <img src="/sui-gig-logo.png?v=sui1" alt="Logo" />
                        </div>
                        <div className="header-text-v4">
                            <h2>Initialize <span>Funding</span></h2>
                            <p>Configure ecosystem capital allocation and project requirements.</p>
                        </div>
                        <button className="modal-close-v4" onClick={onClose}>
                            <X size={20} />
                        </button>
                    </header>

                    <form onSubmit={handleSubmit} className="modal-form-v4">
                        <div className="form-row-v4">
                            <div className="form-group-v4 full">
                                <label>Program Title</label>
                                <div className="input-wrap-v4 with-icon">
                                    <Globe size={18} />
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="E.g. DeFi Innovation Fund Q3"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row-v4">
                            <div className="form-group-v4 full">
                                <label>Capital Allocation (SUI / USD)</label>
                                <div className="input-wrap-v4 with-icon">
                                    <Zap size={18} />
                                    <input
                                        type="text"
                                        name="amount"
                                        placeholder="E.g. 50,000 SUI"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row-v4">
                            <div className="form-group-v4 full">
                                <label>Strategic Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Outline the mission, requirements, and evaluation criteria..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="wizz-textarea-v4"
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="form-row-v4">
                            <div className="form-group-v4 full">
                                <label>Metadata Tags (Comma Separated)</label>
                                <div className="input-wrap-v4 with-icon">
                                    <Tag size={18} />
                                    <input
                                        type="text"
                                        name="tags"
                                        placeholder="Infrastructure, Art, DeFi"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <footer className="modal-footer-v4">
                            <button type="button" className="wizz-btn-outline" onClick={onClose}>Discard</button>
                            <button type="submit" className="wizz-btn-primary">
                                <Send size={18} /> Deploy Funding
                            </button>
                        </footer>
                    </form>
                </motion.div>

                <style>{`
                    .wizz-modal-overlay {
                        position: fixed;
                        inset: 0;
                        background: rgba(15, 23, 42, 0.4);
                        backdrop-filter: blur(12px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                        padding: 24px;
                    }

                    .wizz-modal-card {
                        width: 100%;
                        max-width: 640px;
                        padding: 40px !important;
                        position: relative;
                        background: white !important;
                    }

                    .modal-header-v4 {
                        display: flex;
                        align-items: flex-start;
                        gap: 20px;
                        margin-bottom: 40px;
                        position: relative;
                    }
                    .header-icon-v4 {
                        width: 80px;
                        height: 80px;
                        background: transparent;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                        padding: 0;
                        overflow: visible;
                    }
                    .header-icon-v4 img { 
                        width: 100%; 
                        height: 100%; 
                        object-fit: contain;
                        transform: scale(4.0) translate(3%, 3%);
                        mix-blend-mode: multiply;
                    }
                    .header-text-v4 h2 { font-size: 1.75rem; font-weight: 800; color: var(--color-text); line-height: 1.2; margin-bottom: 8px; }
                    .header-text-v4 h2 span { color: var(--color-primary); }
                    .header-text-v4 p { font-size: 0.95rem; color: var(--color-text-muted); font-weight: 400; }

                    .modal-close-v4 {
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        width: 32px;
                        height: 32px;
                        border-radius: 50% !important;
                        background: var(--color-surface);
                        border: 1px solid var(--color-border);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        color: var(--color-text-muted);
                        transition: all 0.2s;
                    }
                    .modal-close-v4:hover { background: white; color: var(--color-primary); transform: rotate(90deg); }

                    .modal-form-v4 { display: flex; flex-direction: column; gap: 32px; }
                    .form-row-v4 { display: flex; gap: 24px; }
                    .form-group-v4 { flex: 1; display: flex; flex-direction: column; gap: 10px; }
                    .form-group-v4.full { flex: 0 0 100%; }
                    .form-group-v4 label { font-size: 0.9rem; font-weight: 700; color: var(--color-text); }

                    .input-wrap-v4 {
                        background: var(--color-surface);
                        border: 2px solid var(--color-border);
                        border-radius: 14px !important;
                        transition: all 0.2s;
                    }
                    .input-wrap-v4:focus-within { border-color: var(--color-primary); background: white; }
                    .input-wrap-v4 input {
                        width: 100%;
                        padding: 14px 18px;
                        border: none;
                        background: transparent;
                        outline: none;
                        font-size: 0.95rem;
                        color: var(--color-text);
                        font-weight: 400;
                    }
                    .input-wrap-v4.with-icon { display: flex; align-items: center; padding-left: 18px; }
                    .input-wrap-v4.with-icon input { padding-left: 10px; }
                    .input-wrap-v4.with-icon svg { color: var(--color-primary); opacity: 0.6; }

                    .wizz-textarea-v4 {
                        width: 100%;
                        padding: 18px;
                        background: var(--color-surface);
                        border: 2px solid var(--color-border);
                        border-radius: 14px !important;
                        outline: none;
                        font-size: 0.95rem;
                        color: var(--color-text);
                        font-weight: 400;
                        transition: all 0.2s;
                    }
                    .wizz-textarea-v4:focus { border-color: var(--color-primary); background: white; }

                    .modal-footer-v4 {
                        display: flex;
                        justify-content: flex-end;
                        gap: 16px;
                        margin-top: 16px;
                        padding-top: 32px;
                        border-top: 1px solid var(--color-border);
                    }

                    @media (max-width: 640px) {
                        .wizz-modal-card { padding: 32px 20px !important; }
                    }
                `}</style>
            </div>
        </AnimatePresence>
    );
};

export default PostGrantModal;
