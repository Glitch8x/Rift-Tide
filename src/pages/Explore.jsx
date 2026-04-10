import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Compass, TrendingUp, Clock, Award, LayoutGrid, List } from 'lucide-react';
import BountyCard from '../components/Bounties/BountyCard';
import { useData } from '../context/DataContext';

/**
 * Explore Page - Redesigned for a clean, professional FinTech Marketplace look.
 * Follows the First Dollar style with sharp layouts and clear filtering.
 */
const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const { bounties } = useData();

  if (!bounties) return <div className="loading-state">Syncing marketplace data...</div>;

  const categories = ['All', 'Design', 'Development', 'Content', 'Community', 'Green Impact'];

  const filteredBounties = bounties.filter(bounty => {
    const matchesCategory = activeCategory === 'All' || bounty.category === activeCategory;
    const matchesSearch = bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'Highest Reward') return b.reward - a.reward;
    if (sortBy === 'Most Active') return (b.participants || 0) - (a.participants || 0);
    return b.id - a.id;
  });

  return (
    <div className="explore-container animate-fade-in">
      <header className="page-header">
        <div className="header-info">
          <h1 className="header-title">Marketplace</h1>
          <p className="header-subtitle">Find high-value opportunities to build and earn on Sui.</p>
        </div>
        <div className="view-toggle desktop-only">
           <button className="view-btn active"><LayoutGrid size={18} /></button>
           <button className="view-btn"><List size={18} /></button>
        </div>
      </header>

      <section className="search-filter-section">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by title, tag, or project..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <div className="category-scroll">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tag ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="sort-dropdown">
            <span className="sort-label">Sort by:</span>
            <select
              className="ui-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Newest">Recently Added</option>
              <option value="Highest Reward">Highest Payout</option>
              <option value="Most Active">Most Popular</option>
            </select>
          </div>
        </div>
      </section>

      <div className="results-info">
        <p className="results-text">Showing <strong>{filteredBounties.length}</strong> active opportunities</p>
      </div>

      <div className="marketplace-grid">
        <AnimatePresence mode="popLayout">
          {filteredBounties.length > 0 ? (
            filteredBounties.map(bounty => (
              <motion.div
                key={bounty.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <BountyCard {...bounty} />
              </motion.div>
            ))
          ) : (
            <div className="empty-results">
              <div className="empty-icon-box">
                 <Search size={32} />
              </div>
              <h3 className="empty-h">No quests found</h3>
              <p className="empty-p">Try adjusting your filters or search keywords.</p>
              <button className="btn btn-outline" onClick={() => {setActiveCategory('All'); setSearchQuery('');}}>
                Clear all filters
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .explore-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-info {
          margin-bottom: 32px;
        }

        .view-toggle {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: var(--radius-sm);
          height: fit-content;
        }

        .view-btn {
          padding: 6px 10px;
          border-radius: 4px;
          border: none;
          background: transparent;
          color: var(--color-text-muted);
          transition: all 0.2s;
        }

        .view-btn.active {
          background: white;
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .search-filter-section {
          background: white;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 32px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          padding: 12px 20px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-bar:focus-within {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px var(--color-primary-soft);
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 1rem;
          color: var(--color-text);
        }

        .filter-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .category-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          white-space: nowrap;
          padding-bottom: 4px;
        }

        .category-tag {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s;
        }

        .category-tag:hover {
          border-color: var(--color-text-muted);
        }

        .category-tag.active {
          background: var(--color-text);
          color: white;
          border-color: var(--color-text);
        }

        .sort-dropdown {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        .sort-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-muted);
        }

        .ui-select {
          background: white;
          border: 1px solid var(--color-border);
          padding: 8px 12px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-text);
          outline: none;
          cursor: pointer;
        }

        .results-info {
          margin-bottom: 24px;
          padding-left: 4px;
        }

        .results-text {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
        }

        .marketplace-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }

        .empty-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 40px;
          background: white;
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-lg);
        }

        .empty-icon-box {
          width: 64px;
          height: 64px;
          background: #f1f5f9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: var(--color-text-muted);
        }

        .empty-h {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .empty-p {
          color: var(--color-text-secondary);
          margin-bottom: 24px;
        }

        .loading-state {
          padding: 100px;
          text-align: center;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .filter-controls {
            flex-direction: column;
            align-items: flex-start;
          }
          .sort-dropdown { width: 100%; justify-content: space-between; }
        }
      `}</style>
    </div>
  );
};

export default Explore;
