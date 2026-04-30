import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Target, Users, Clock, MapPin, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const BountyCard = ({ bounty }) => {
    const navigate = useNavigate();

    return (
        <motion.div 
            whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }}
            className="rift-bounty-card"
            onClick={() => navigate(`/quest/${bounty.id}`)}
        >
            <div className="rift-card-content">
                {/* Logo Section */}
                <div className="rift-logo-section">
                    <div className="rift-org-logo">
                        <img src={bounty.communityImg || '/rift-tide-logo.png'} alt={bounty.community} />
                    </div>
                </div>

                {/* Main Info Section */}
                <div className="rift-info-section">
                    <div className="rift-top-row">
                        <h3 className="rift-title">{bounty.title}</h3>
                        <span className="rift-separator">•</span>
                        <span className="rift-org-name">{bounty.community}</span>
                    </div>

                    <div className="rift-meta-row">
                        <div className="rift-meta-item">
                            <Zap size={16} className="cyan-icon" />
                            <span>{bounty.reward} USDC</span>
                        </div>
                    </div>

                    <p className="rift-description">
                        {bounty.description || 'Contribute to this mission and earn rewards for your impact.'}
                    </p>

                    <div className="rift-tags-row">
                        {bounty.tags?.map(tag => (
                            <span key={tag} className="rift-tag">{tag.toUpperCase()}</span>
                        ))}
                        {!bounty.tags?.length && (
                            <>
                                <span className="rift-tag">RUST</span>
                                <span className="rift-tag">SOLANA</span>
                                <span className="rift-tag">INFRASTRUCTURE</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Action Section */}
                <div className="rift-action-section">
                    {bounty.isFeatured && <span className="featured-badge">FEATURED</span>}
                    <div className="action-buttons">
                        <button className="apply-btn">Apply Now</button>
                        <button className="bookmark-btn">
                            <Bookmark size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .rift-bounty-card {
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 20px;
                    padding: 32px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                    margin-bottom: 20px;
                }

                .rift-card-content {
                    display: flex;
                    gap: 28px;
                }

                /* Logo */
                .rift-logo-section {
                    flex-shrink: 0;
                }

                .rift-org-logo {
                    width: 64px;
                    height: 64px;
                    background: #F1F5F9;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    border: 1px solid var(--color-border);
                }

                .rift-org-logo img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* Info */
                .rift-info-section {
                    flex: 1;
                    min-width: 0;
                }

                .rift-top-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 8px;
                }

                .rift-title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--color-text);
                    margin: 0;
                    letter-spacing: -0.02em;
                }

                .rift-separator {
                    color: var(--color-text-muted);
                    font-size: 1.2rem;
                }

                .rift-org-name {
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: var(--color-text-secondary);
                }

                .rift-meta-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;
                    margin-bottom: 24px;
                }

                .rift-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--color-text-secondary);
                    font-size: 0.9rem;
                    font-weight: 700;
                }

                .cyan-icon {
                    color: var(--color-primary);
                }

                .rift-description {
                    font-size: 1rem;
                    color: var(--color-text-secondary);
                    line-height: 1.6;
                    margin-bottom: 24px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .rift-tags-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .rift-tag {
                    padding: 6px 14px;
                    background: #F8FAFC;
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: var(--color-text-secondary);
                    letter-spacing: 0.05em;
                }

                /* Action */
                .rift-action-section {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-end;
                    flex-shrink: 0;
                }

                .featured-badge {
                    font-size: 0.65rem;
                    font-weight: 800;
                    color: #0369A1;
                    background: #F0F9FF;
                    padding: 4px 10px;
                    border-radius: 6px;
                    letter-spacing: 0.08em;
                }

                .action-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    align-items: center;
                }

                .apply-btn {
                    padding: 12px 32px;
                    background: var(--color-primary);
                    color: white;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                }

                .apply-btn:hover {
                    background: var(--color-primary-hover);
                    transform: translateY(-1px);
                }

                .bookmark-btn {
                    width: 48px;
                    height: 48px;
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-text-secondary);
                    transition: all 0.2s;
                }

                .bookmark-btn:hover {
                    background: #F8FAFC;
                    color: var(--color-text);
                }

                @media (max-width: 768px) {
                    .rift-card-content {
                        flex-direction: column;
                        gap: 20px;
                    }
                    .rift-action-section {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 10px;
                    }
                    .action-buttons {
                        flex-direction: row;
                    }
                    .rift-title {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default BountyCard;
