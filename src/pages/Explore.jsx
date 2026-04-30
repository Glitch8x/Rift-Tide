import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import BountyCard from '../components/Bounties/BountyCard';
import { Search, ChevronDown, SlidersHorizontal, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Explore = () => {
    const { bounties } = useData();
    const [activeSubTab, setActiveSubTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredBounties = useMemo(() => {
        return (bounties || []).filter(bounty => {
            const matchesSearch = !searchQuery ||
                bounty.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bounty.community?.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesTab = activeSubTab === 'All' || 
                (activeSubTab === 'Development' && bounty.tags?.some(t => t.toLowerCase().includes('dev') || t.toLowerCase().includes('rust') || t.toLowerCase().includes('move'))) ||
                (activeSubTab === 'Design' && bounty.tags?.some(t => t.toLowerCase().includes('design') || t.toLowerCase().includes('ux'))) ||
                (activeSubTab === 'Content' && bounty.tags?.some(t => t.toLowerCase().includes('content') || t.toLowerCase().includes('video'))) ||
                (activeSubTab === 'Other' && !['Development', 'Design', 'Content'].includes(activeSubTab));

            return matchesSearch && matchesTab;
        });
    }, [bounties, searchQuery, activeSubTab]);

    const subTabs = ['All', 'Content', 'Design', 'Development', 'Other'];

    return (
        <div className="explore-rift">
            {/* ─── HERO ─── */}
            <section className="explore-header">
                <div className="header-text">
                    <h1 className="explore-title">Browse <span>Opportunities.</span></h1>
                    <p className="explore-sub">
                        Explore high-stakes bounties, technical quests, and ecosystem grants.
                    </p>
                </div>
                <div className="active-badge">
                    <span className="dot" />
                    <span className="count">2,835 Opportunities Listed</span>
                </div>
            </section>

            {/* Sub-Tabs Navigation */}
            <div className="explore-sub-tabs">
                {subTabs.map(tab => (
                    <button 
                        key={tab} 
                        className={`sub-tab-btn ${activeSubTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveSubTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ─── MAIN CONTENT ─── */}
            <div className="explore-main full-width">
                {/* Grid */}
                <main className="explore-grid-area">
                    <div className="grid-list">
                        {filteredBounties.map((bounty, i) => (
                            <BountyCard key={bounty.id} bounty={{...bounty, isFeatured: i === 0}} />
                        ))}
                    </div>
                    
                    <div className="load-more">
                        <button className="load-more-btn" onClick={() => {}}>
                            Load More Roles <ChevronDown size={18} />
                        </button>
                    </div>
                </main>
            </div>

            <style>{`
                .explore-rift {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Header */
                .explore-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 48px;
                }

                .header-text {
                    max-width: 700px;
                }

                .explore-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    line-height: 1.1;
                    letter-spacing: -0.04em;
                    color: #0F172A;
                    margin-bottom: 16px;
                }

                .explore-title span {
                    color: var(--color-primary);
                }

                .explore-sub {
                    font-size: 1.15rem;
                    color: #64748B;
                    line-height: 1.6;
                    font-weight: 500;
                }

                .active-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                    flex-shrink: 0;
                    margin-top: 12px;
                }

                .active-badge .dot {
                    width: 8px;
                    height: 8px;
                    background: #10B981;
                    border-radius: 50%;
                }

                .active-badge .count {
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: #0F172A;
                }

                /* Sub Tabs */
                .explore-sub-tabs {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 40px;
                    background: #F1F5F9;
                    padding: 6px;
                    border-radius: 14px;
                    width: fit-content;
                }

                .sub-tab-btn {
                    padding: 8px 24px;
                    border-radius: 10px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #64748B;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .sub-tab-btn:hover {
                    color: #0F172A;
                }

                .sub-tab-btn.active {
                    background: white;
                    color: #0F172A;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                /* Main */
                .explore-main.full-width {
                    width: 100%;
                }

                .grid-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .load-more {
                    display: flex;
                    justify-content: center;
                    margin-top: 40px;
                }

                .load-more-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: #475569;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .load-more-btn:hover {
                    color: var(--color-primary);
                }

                @media (max-width: 1024px) {
                    .explore-title {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Explore;
