import React, { useState } from 'react';
import { X, DollarSign, Tag, Type, Layers, Zap, Flag, Target, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PostBountyModal = ({ isOpen, onClose, onPost }) => {
    const [formData, setFormData] = useState({
        title: '',
        reward: '',
        category: 'Community',
        deadline: '7 days',
        tags: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.reward) return;

        onPost({
            ...formData,
            reward: parseInt(formData.reward),
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            community: 'Network Contributor',
            communityImg: 'https://ui-avatars.com/api/?name=User&background=38C1F4&color=FFFFFF',
            type: 'bounty',
            featured: false
        });

        onClose();
        setFormData({
            title: '',
            reward: '',
            category: 'Community',
            deadline: '7 days',
            tags: ''
        });
    };

    return (
        <AnimatePresence>
            <div className="rift-modal-overlay">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="rift-modal-card glass-pill-v4"
                >
                    <header className="modal-header-v4">
                        <div className="header-icon-v4 logo-wrap">
                            <img src="/rift-tide-logo.png?v=sui1" alt="Logo" />
                        </div>
                        <div className="header-text-v4">
                            <h2>Initialize <span>Mission</span></h2>
                            <p>Define objectives and reward parameters for the new community quest.</p>
                        </div>
                        <button className="modal-close-v4" onClick={onClose}>
                            <X size={20} />
                        </button>
                    </header>

                    <form onSubmit={handleSubmit} className="modal-form-v4">
                        <div className="form-row-v4">
                            <div className="form-group-v4 full">
                                <label>Mission Title</label>
                                <div className="input-wrap-v4 with-icon">
                                    <Target size={18} />
                                    <input
                                        type="text"
                                        placeholder="E.g. Technical SEO Audit for Mainnet"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row-v4">
                            <div className="form-group-v4">
                                <label>Reward Amount (SUI)</label>
                                <div className="input-wrap-v4 with-icon">
                                    <Zap size={18} />
                                    <input
                                        type="number"
                                        placeholder="500"
                                        value={formData.reward}
                                        onChange={e => setFormData({ ...formData, reward: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group-v4">
                                <label>Category</label>
                                <div className="input-wrap-v4">
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Community">Community</option>
                                        <option value="Design">Design</option>
                                        <option value="Development">Development</option>
                                        <option value="Content">Content</option>
                                        <option value="Green Impact">Impact</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-row-v4">
                            <div className="form-group-v4 full">
                                <label>Tags (Comma Separated)</label>
                                <div className="input-wrap-v4 with-icon">
                                    <Tag size={18} />
                                    <input
                                        type="text"
                                        placeholder="Security, Rust, Core"
                                        value={formData.tags}
                                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    />
                                </div>
                                <span className="input-hint-v4">These help contributors find your mission easily.</span>
                            </div>
                        </div>

                        <footer className="modal-footer-v4">
                            <button type="button" className="rift-btn-outline" onClick={onClose}>Discard</button>
                            <button type="submit" className="rift-btn-primary">
                                <Flag size={18} /> Launch Mission
                            </button>
                        </footer>
                    </form>
                </motion.div>

                <style>{`
                    .rift-modal-overlay {
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

                    .rift-modal-card {
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
                    .input-wrap-v4 input, .input-wrap-v4 select {
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

                    .input-hint-v4 { font-size: 0.75rem; color: var(--color-text-muted); font-weight: 400; margin-top: 4px; }

                    .modal-footer-v4 {
                        display: flex;
                        justify-content: flex-end;
                        gap: 16px;
                        margin-top: 16px;
                        padding-top: 32px;
                        border-top: 1px solid var(--color-border);
                    }

                    @media (max-width: 640px) {
                        .form-row-v4 { flex-direction: column; }
                        .rift-modal-card { padding: 32px 20px !important; }
                    }
                `}</style>
            </div>
        </AnimatePresence>
    );
};

export default PostBountyModal;
