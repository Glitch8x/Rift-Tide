import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, Briefcase, Zap, DollarSign, CheckCircle, ArrowUpRight, TrendingUp, Clock, PlusCircle } from 'lucide-react';
import BountyCard from '../components/Bounties/BountyCard';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard
import CreateBountyModal from '../components/Modals/CreateBountyModal';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dataContext = useData();
  const { bounties, stats } = dataContext || { bounties: [], stats: { totalValueEarned: 0, opportunitiesListed: 0 } };
  const auth = useAuth();
  const user = auth?.user;

  const displayName = user?.name || user?.walletAddress?.substring(0, 10) || 'Explorer';

  // Filter logic
  const filteredBounties = bounties.filter(bounty => {
    if (activeTab === 'design' && bounty.type !== 'bounty') return false;
    if (activeTab === 'projects' && bounty.type !== 'project') return false;
    if (activeFilter === 'All' || activeFilter === 'For You') return true;
    return bounty.category === activeFilter;
  });

  return (
    <div className="home-container animate-fade-in">
      <header className="page-header">
        <div className="header-greeting">
          <h1 className="header-title">Good evening, {displayName}</h1>
          <p className="header-subtitle">Here is what's happening in your quest network today.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline">
             <Clock size={18} />
             Recently Viewed
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
             <PlusCircle size={18} />
             New Opportunity
          </button>
        </div>
      </header>

      {/* Stats Overview Grid */}
      <div className="stats-grid">
        <SharpCard className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Earnings</span>
            <div className="stat-icon-circle blue">
              <DollarSign size={18} />
            </div>
          </div>
          <div className="stat-value-large">
            ${stats.totalValueEarned.toLocaleString()} <span className="stat-unit">USD</span>
          </div>
          <div className="stat-footer">
            <TrendingUp size={14} className="text-success" />
            <span className="stat-trend text-success">+12.5%</span>
            <span className="stat-period">vs last month</span>
          </div>
        </SharpCard>

        <SharpCard className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Active Quests</span>
            <div className="stat-icon-circle green">
              <Zap size={18} />
            </div>
          </div>
          <div className="stat-value-large">
            {stats.opportunitiesListed}
          </div>
          <div className="stat-footer">
            <span className="stat-period">8 awaiting review</span>
          </div>
        </SharpCard>

        <SharpCard className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Reputation Score</span>
            <div className="stat-icon-circle purple">
              <Sparkles size={18} />
            </div>
          </div>
          <div className="stat-value-large">
            2,450 <span className="stat-unit">EXP</span>
          </div>
          <div className="stat-footer">
            <span className="stat-period">Top 5% of contributors</span>
          </div>
        </SharpCard>
      </div>

      <div className="dashboard-content">
        <div className="main-feed">
          <div className="feed-header">
            <h2 className="feed-title">Available Marketplace</h2>
            <div className="feed-tabs">
               {['all', 'design', 'projects'].map(tab => (
                 <button 
                  key={tab}
                  className={`feed-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                 >
                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
                 </button>
               ))}
            </div>
          </div>

          <div className="filter-scroll">
            {['For You', 'All', 'Content', 'Design', 'Development', 'Green Impact'].map(filter => (
              <button
                key={filter}
                className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="bounty-grid">
            <AnimatePresence mode="popLayout">
              {filteredBounties.map(bounty => (
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
              ))}
            </AnimatePresence>
          </div>
        </div>

        <aside className="secondary-feed">
          <SharpCard className="promo-card">
            <h3 className="promo-title">Slush Wallet</h3>
            <p className="promo-text">Enjoy the sharpest SUI experience with Slush wallet integration.</p>
            <button className="btn btn-outline full-width">Learn More</button>
          </SharpCard>

          <div className="activity-section">
             <h3 className="section-small-title">RECENT ACTIVITY</h3>
             <div className="activity-list">
                {[1, 2, 3].map(i => (
                  <div key={i} className="activity-item">
                    <div className="activity-indicator" />
                    <div className="activity-details">
                      <p className="activity-text"><strong>Payout received</strong> for "UI Design Quest"</p>
                      <p className="activity-time">2 hours ago</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </aside>
      </div>

      <CreateBountyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        .home-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
        }

        .header-title {
          font-size: 1.85rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
        }

        .header-subtitle {
          color: var(--color-text-secondary);
          font-size: 1.05rem;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .stat-card {
          padding: 24px;
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .stat-label {
          color: var(--color-text-secondary);
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .stat-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon-circle.blue { background: #dbeafe; color: #2563eb; }
        .stat-icon-circle.green { background: #dcfce7; color: #16a34a; }
        .stat-icon-circle.purple { background: #f3e8ff; color: #9333ea; }

        .stat-value-large {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .stat-unit {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .stat-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
        }

        .text-success { color: #16a34a; }

        .stat-trend {
          font-weight: 600;
        }

        .stat-period {
          color: var(--color-text-muted);
        }

        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 40px;
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .feed-title {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .feed-tabs {
          display: flex;
          background: #f3f4f6;
          padding: 4px;
          border-radius: var(--radius-sm);
        }

        .feed-tab {
          padding: 6px 16px;
          border-radius: calc(var(--radius-sm) - 2px);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          background: transparent;
          border: none;
          transition: all 0.2s;
        }

        .feed-tab.active {
          background: white;
          color: var(--color-text);
          box-shadow: var(--shadow-sm);
        }

        .filter-scroll {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .filter-pill {
          padding: 8px 16px;
          border-radius: var(--radius-full);
          background: white;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .filter-pill:hover {
          border-color: var(--color-text-muted);
        }

        .filter-pill.active {
          background: var(--color-text);
          color: white;
          border-color: var(--color-text);
        }

        .bounty-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .promo-card {
          background: linear-gradient(135deg, white, #eff6ff);
          border-color: #bfdbfe;
          padding: 24px;
          margin-bottom: 32px;
        }

        .promo-title {
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .promo-text {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .section-small-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .activity-item {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .activity-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary);
          margin-top: 6px;
          flex-shrink: 0;
        }

        .activity-text {
          font-size: 0.9rem;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .activity-time {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .full-width { width: 100%; }

        @media (max-width: 1280px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }
          .secondary-feed { display: none; }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
