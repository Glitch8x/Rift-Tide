import React from 'react';
import { Banknote, ArrowRight, CheckCircle, ShieldCheck, Heart } from 'lucide-react';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

/**
 * Grants Page - Redesigned for a professional SUI Foundation / FinTech aesthetic.
 * Follows the First Dollar style with sharp layouts and clear funding info.
 */
const Grants = () => {
  const { grants } = useData();
  const navigate = useNavigate();

  if (!grants) return <div className="loading-state">Syncing foundation grants...</div>;

  const handleApplyClick = (id) => {
    navigate(`/grants/apply/${id}`);
  };

  return (
    <div className="grants-container animate-fade-in">
      <header className="page-header">
        <div className="header-info">
          <h1 className="header-title">Foundation Grants</h1>
          <p className="header-subtitle">Direct funding from the SUI network for high-impact social and technical projects.</p>
        </div>
        <div className="header-badge">
           <ShieldCheck size={18} /> Verified Projects Only
        </div>
      </header>

      <div className="grants-summary-grid">
         <SharpCard className="summary-pill">
            <span className="summary-label">TOTAL AVAILBLE</span>
            <span className="summary-value">$2,500,000</span>
         </SharpCard>
         <SharpCard className="summary-pill">
            <span className="summary-label">AVG. GRANT SIZE</span>
            <span className="summary-value">$15,000</span>
         </SharpCard>
         <SharpCard className="summary-pill">
            <span className="summary-label">ACTIVE APPLICANTS</span>
            <span className="summary-value">142</span>
         </SharpCard>
      </div>

      <div className="grants-list-view">
        {grants.map(grant => {
          return (
            <SharpCard key={grant.id} hoverEffect className="grant-card-sharp">
              <div className="grant-card-body">
                <div className="grant-meta-row">
                   <div className="grant-payout-pill">
                      {grant.amount}
                   </div>
                   <div className="grant-tags-row">
                    {grant.tags.map(tag => (
                      <span key={tag} className="grant-tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>

                <h3 className="grant-title-text">{grant.title}</h3>
                <p className="grant-description-text">{grant.description}</p>

                <div className="grant-stats-footer">
                  <div className="grant-stat-item">
                    <Heart size={14} /> <span>{grant.applicants} interested</span>
                  </div>
                  <div className="grant-stat-item">
                    <CheckCircle size={14} className="text-success" /> <span>Open for proposals</span>
                  </div>
                </div>
              </div>
              
              <div className="grant-card-action">
                <button
                  className="btn btn-primary"
                  onClick={() => handleApplyClick(grant.id)}
                >
                  Apply for Funding <ArrowRight size={16} />
                </button>
              </div>
            </SharpCard>
          )
        })}
      </div>

      <style>{`
        .grants-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f0fdf4;
          color: #16a34a;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid #dcfce7;
        }

        .grants-summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }

        .summary-pill {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .summary-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        }

        .summary-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-text);
        }

        .grants-list-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .grant-card-sharp {
          display: grid;
          grid-template-columns: 1fr 240px;
          gap: 32px;
          padding: 32px !important;
          align-items: center;
        }

        .grant-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .grant-payout-pill {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-text);
        }

        .grant-tags-row {
          display: flex;
          gap: 8px;
        }

        .grant-tag-pill {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          background: #f3f4f6;
          color: #4b5563;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
        }

        .grant-title-text {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .grant-description-text {
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 800px;
        }

        .grant-stats-footer {
          display: flex;
          gap: 24px;
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .grant-stat-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .grant-card-action button {
          width: 100%;
        }

        .loading-state {
          padding: 100px;
          text-align: center;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .grant-card-sharp {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .grants-summary-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Grants;
