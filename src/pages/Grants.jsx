import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, 
    Banknote, 
    Globe, 
    ArrowRight, 
    ShieldCheck, 
    Clock, 
    Search,
    Filter,
    ChevronDown,
    MapPin,
    DollarSign
} from 'lucide-react';
import { useData } from '../context/DataContext';

const Grants = () => {
    const { grants } = useData();
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['Infrastructure', 'DeFi', 'Gaming', 'AI', 'Content'];
    const fundingTiers = ['$0 - $10k', '$10k - $50k', '$50k+'];

    return (
        <div className="grants-rift">
            {/* ─── HERO SECTION ─── */}
            <section className="grants-hero-rift">
                <div className="hero-content">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-badge"
                    >
                        <Zap size={14} />
                        <span>ECOSYSTEM FUNDING</span>
                    </motion.div>
                    <h1 className="hero-title">Fueling the <span>Future</span> of Sui.</h1>
                    <p className="hero-desc">
                        Direct financial support for builders, creators, and protocols scaling on the fastest growing L1.
                    </p>
                </div>
                <div className="hero-stats-rift">
                    <div className="h-stat">
                        <span className="h-stat-val">$25M+</span>
                        <span className="h-stat-lbl">TOTAL FUNDING</span>
                    </div>
                    <div className="h-stat">
                        <span className="h-stat-val">120+</span>
                        <span className="h-stat-lbl">GRANTEES</span>
                    </div>
                </div>
            </section>

            {/* ─── SEARCH & FILTERS ─── */}
            <div className="grants-controls">
                <div className="search-wrap">
                    <Search size={20} />
                    <input 
                        type="text" 
                        placeholder="Search grant programs..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-chips">
                    <button className="filter-chip active">All Programs</button>
                    <button className="filter-chip">Active</button>
                    <button className="filter-chip">Upcoming</button>
                </div>
            </div>

            <div className="grants-layout">
                {/* ─── SIDEBAR FILTERS ─── */}
                <aside className="grants-sidebar">
                    <div className="filter-group">
                        <div className="f-header">
                            <h4>CATEGORIES</h4>
                            <ChevronDown size={16} />
                        </div>
                        <div className="f-options">
                            {categories.map(c => (
                                <label key={c} className="f-option">
                                    <input type="checkbox" />
                                    <span>{c}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <div className="f-header">
                            <h4>FUNDING SIZE</h4>
                            <ChevronDown size={16} />
                        </div>
                        <div className="f-options">
                            {fundingTiers.map(t => (
                                <label key={t} className="f-option">
                                    <input type="checkbox" />
                                    <span>{t}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-promo">
                        <ShieldCheck size={24} />
                        <h4>Verified Program</h4>
                        <p>All grants are vetted by the Sui Foundation core committee.</p>
                    </div>
                </aside>

                {/* ─── GRANTS LIST ─── */}
                <div className="grants-list-rift">
                    {(grants || []).map((grant, i) => (
                        <motion.div 
                            key={grant.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="grant-card-rift"
                        >
                            <div className="g-logo">
                                {grant.title.charAt(0)}
                            </div>
                            <div className="g-main">
                                <div className="g-top">
                                    <h3 className="g-title">{grant.title}</h3>
                                    <div className="g-badge">ACTIVE</div>
                                </div>
                                <p className="g-desc">{grant.description || 'Verified initiative for the expansion of the Sui operational network.'}</p>
                                <div className="g-meta">
                                    <div className="gm-item">
                                        <Banknote size={16} />
                                        <span>{grant.amount} Pool</span>
                                    </div>
                                    <div className="gm-item">
                                        <MapPin size={16} />
                                        <span>Global / Remote</span>
                                    </div>
                                    <div className="gm-item">
                                        <Clock size={16} />
                                        <span>Deadline: May 30</span>
                                    </div>
                                </div>
                            </div>
                            <div className="g-actions">
                                <button className="apply-btn">
                                    APPLY NOW <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                .grants-rift {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Hero */
                .grants-hero-rift {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 64px;
                    background: #0F172A;
                    border-radius: 32px;
                    color: white;
                    margin-bottom: 48px;
                    position: relative;
                    overflow: hidden;
                }

                .grants-hero-rift::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -10%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(0, 209, 255, 0.15) 0%, transparent 70%);
                    pointer-events: none;
                }

                .hero-content {
                    max-width: 600px;
                    position: relative;
                    z-index: 1;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: rgba(0, 209, 255, 0.2);
                    border: 1px solid rgba(0, 209, 255, 0.4);
                    border-radius: 8px;
                    color: #00D1FF;
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                    margin-bottom: 24px;
                }

                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    margin-bottom: 16px;
                    line-height: 1.1;
                }

                .hero-title span {
                    color: #00D1FF;
                }

                .hero-desc {
                    font-size: 1.15rem;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.6;
                }

                .hero-stats-rift {
                    display: flex;
                    gap: 48px;
                    position: relative;
                    z-index: 1;
                }

                .h-stat {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .h-stat-val {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: white;
                }

                .h-stat-lbl {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: #00D1FF;
                    letter-spacing: 0.05em;
                }

                /* Controls */
                .grants-controls {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                }

                .search-wrap {
                    position: relative;
                    width: 400px;
                    display: flex;
                    align-items: center;
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    padding: 0 16px;
                }

                .search-wrap input {
                    width: 100%;
                    height: 48px;
                    border: none;
                    outline: none;
                    padding-left: 12px;
                    font-size: 0.95rem;
                }

                .search-wrap svg {
                    color: var(--color-text-muted);
                }

                .filter-chips {
                    display: flex;
                    gap: 12px;
                }

                .filter-chip {
                    padding: 8px 20px;
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 99px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--color-text-secondary);
                }

                .filter-chip.active {
                    background: #0F172A;
                    color: white;
                    border-color: #0F172A;
                }

                /* Layout */
                .grants-layout {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 40px;
                }

                .grants-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                .filter-group {
                    border-bottom: 1px solid var(--color-border);
                    padding-bottom: 24px;
                }

                .f-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .f-header h4 {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--color-text-muted);
                    letter-spacing: 0.1em;
                }

                .f-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .f-option {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }

                .f-option input {
                    width: 18px;
                    height: 18px;
                    accent-color: var(--color-primary);
                }

                .f-option span {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--color-text);
                }

                .sidebar-promo {
                    background: #F8FAFC;
                    border-radius: 20px;
                    padding: 24px;
                    text-align: center;
                }

                .sidebar-promo svg {
                    color: #10B981;
                    margin-bottom: 16px;
                }

                .sidebar-promo h4 {
                    font-size: 1rem;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .sidebar-promo p {
                    font-size: 0.85rem;
                    color: var(--color-text-secondary);
                    line-height: 1.5;
                }

                /* List */
                .grants-list-rift {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .grant-card-rift {
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 20px;
                    padding: 24px;
                    display: flex;
                    gap: 24px;
                    align-items: center;
                }

                .g-logo {
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, #00D1FF, #00A3FF);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: white;
                    flex-shrink: 0;
                }

                .g-main {
                    flex: 1;
                }

                .g-top {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                }

                .g-title {
                    font-size: 1.25rem;
                    font-weight: 800;
                    margin: 0;
                }

                .g-badge {
                    padding: 4px 10px;
                    background: #ECFDF5;
                    color: #10B981;
                    border-radius: 6px;
                    font-size: 0.65rem;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                }

                .g-desc {
                    font-size: 0.95rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 16px;
                    line-height: 1.5;
                }

                .g-meta {
                    display: flex;
                    gap: 24px;
                }

                .gm-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--color-text-muted);
                }

                .gm-item svg {
                    color: var(--color-primary);
                }

                .apply-btn {
                    padding: 12px 24px;
                    background: #0F172A;
                    color: white;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 0.85rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.2s;
                }

                .apply-btn:hover {
                    background: var(--color-primary);
                    transform: translateX(4px);
                }

                @media (max-width: 1024px) {
                    .grants-layout { grid-template-columns: 1fr; }
                    .grants-sidebar { order: 2; }
                    .grants-hero-rift { flex-direction: column; align-items: flex-start; gap: 40px; padding: 40px; }
                }
            `}</style>
        </div>
    );
};

export default Grants;
