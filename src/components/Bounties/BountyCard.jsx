import React from 'react';
import { useNavigate } from 'react-router-dom';
import SharpCard from '../UI/GlassCard'; // Now SharpCard
import { Clock, Users, ArrowRight } from 'lucide-react';

/**
 * BountyCard component - Redesigned for a professional "First Dollar" aesthetic.
 * Focuses on clarity, sharp borders, and FinTech-style rewarding badges.
 */
const BountyCard = ({
  id,
  title,
  community,
  communityImg,
  reward,
  deadline,
  tags = [],
  participants = 0
}) => {
  const navigate = useNavigate();

  return (
    <SharpCard 
      hoverEffect 
      className="bounty-card" 
      onClick={() => navigate(`/quest/${id}`)}
    >
      <div className="card-top">
        <div className="org-mention">
          <img src={communityImg || 'https://via.placeholder.com/20'} alt={community} className="org-img" />
          <span className="org-name">{community}</span>
        </div>
        <div className="payout-badge">
          {reward} SUI
        </div>
      </div>

      <div className="card-body">
        <h3 className="bounty-title-text">{title}</h3>
        <div className="tag-row">
          {tags.map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
      </div>

      <div className="card-footer-info">
        <div className="meta-pair">
          <Clock size={14} className="meta-icon" />
          <span>Ends {deadline}</span>
        </div>
        <div className="meta-pair">
          <Users size={14} className="meta-icon" />
          <span>{participants} joined</span>
        </div>
        <div className="view-arrow">
          <ArrowRight size={16} />
        </div>
      </div>

      <style>{`
        .bounty-card {
          padding: 24px !important;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          cursor: pointer;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .org-mention {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .org-img {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          object-fit: cover;
        }

        .org-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .payout-badge {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-primary);
          background: var(--color-primary-soft);
          padding: 4px 12px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(37, 99, 235, 0.1);
        }

        .bounty-title-text {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.5;
          margin-bottom: 12px;
          color: var(--color-text);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-pill {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 10px;
          background: #f3f4f6;
          color: #4b5563;
          border-radius: 4px;
        }

        .card-footer-info {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--color-border);
          color: var(--color-text-muted);
          font-size: 0.85rem;
          position: relative;
        }

        .meta-pair {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-icon {
          color: var(--color-text-muted);
        }

        .view-arrow {
          margin-left: auto;
          color: var(--color-text-muted);
          transition: transform 0.2s, color 0.2s;
        }

        .bounty-card:hover .view-arrow {
          transform: translateX(4px);
          color: var(--color-primary);
        }
      `}</style>
    </SharpCard>
  );
};

export default BountyCard;
