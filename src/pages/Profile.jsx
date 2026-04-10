import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard
import { User, Mail, Award, LogOut, Shield, DollarSign, Wallet, CheckCircle, ExternalLink } from 'lucide-react';

/**
 * Profile Page - Redesigned for a professional contributor account view.
 * inspired by First Dollar's personal account dashboard.
 */
const Profile = () => {
  const { user, logout } = useAuth();
  const { stats } = useData();

  if (!user) return null;

  return (
    <div className="profile-container animate-fade-in">
      <header className="page-header">
        <div className="header-info">
          <h1 className="header-title">Account Settings</h1>
          <p className="header-subtitle">Manage your contributor profile and view your network impact.</p>
        </div>
        <div className="header-actions">
           <button onClick={logout} className="btn btn-outline text-danger">
              <LogOut size={18} />
              Sign Out
           </button>
        </div>
      </header>

      <div className="profile-main-grid">
        <div className="profile-details-column">
          <SharpCard className="account-card">
            <div className="account-card-header">
              <div className="account-avatar-large">
                <img src={user.avatar} alt="" />
              </div>
              <div className="account-identity">
                <h2 className="identity-name">{user.name}</h2>
                <div className="identity-status">
                  <Shield size={14} /> <span>Verified Contributor</span>
                </div>
              </div>
            </div>

            <div className="account-info-list">
               <div className="info-item">
                  <span className="info-label">EMAIL ADDRESS</span>
                  <div className="info-value-row">
                    <span className="info-value">{user.email || 'Not provided'}</span>
                    <button className="text-btn">Change</button>
                  </div>
               </div>
               <div className="info-item">
                  <span className="info-label">CONNECTED WALLET</span>
                  <div className="info-value-row">
                    <span className="info-value monospaced">
                       {user.walletAddress 
                         ? `${user.walletAddress.substring(0, 12)}...${user.walletAddress.substring(user.walletAddress.length - 8)}`
                         : 'No wallet connected'}
                    </span>
                    <button className="text-btn"><ExternalLink size={14} /></button>
                  </div>
               </div>
            </div>
          </SharpCard>

          <h3 className="section-title-small">ACTIVE CONTRIBUTIONS</h3>
          <SharpCard className="empty-activity-card">
             <div className="empty-state-content">
                <p className="empty-text">You don't have any active quest submissions currently under review.</p>
                <button className="btn btn-primary">Browse Marketplace</button>
             </div>
          </SharpCard>
        </div>

        <div className="profile-stats-column">
          <SharpCard className="impact-card">
            <h3 className="impact-title">Your Network Impact</h3>
            <div className="impact-stats-list">
              <div className="impact-stat">
                <div className="impact-icon-circle blue">
                  <DollarSign size={20} />
                </div>
                <div className="impact-text">
                  <p className="impact-val">${(user.earnings || 0).toLocaleString()}</p>
                  <p className="impact-lab">Total Earned</p>
                </div>
              </div>
              <div className="impact-stat">
                <div className="impact-icon-circle green">
                  <CheckCircle size={20} />
                </div>
                <div className="impact-text">
                  <p className="impact-val">{user.completedQuests || 0}</p>
                  <p className="impact-lab">Quests Completed</p>
                </div>
              </div>
              <div className="impact-stat">
                <div className="impact-icon-circle purple">
                  <Award size={20} />
                </div>
                <div className="impact-text">
                  <p className="impact-val">4.9 / 5.0</p>
                  <p className="impact-lab">Contributor Rating</p>
                </div>
              </div>
            </div>
          </SharpCard>

          <SharpCard className="security-card">
             <h3 className="security-title">Security & Privacy</h3>
             <p className="security-text">Two-factor authentication is active for your account.</p>
             <button className="btn btn-outline full-width">Security Settings</button>
          </SharpCard>
        </div>
      </div>

      <style>{`
        .profile-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .text-danger {
          color: #ef4444 !important;
          border-color: #fecaca !important;
        }

        .text-danger:hover {
          background: #fef2f2 !important;
        }

        .profile-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 32px;
        }

        .account-card {
          padding: 32px !important;
          margin-bottom: 32px;
        }

        .account-card-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 40px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--color-border);
        }

        .account-avatar-large {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: var(--color-primary);
          overflow: hidden;
        }

        .account-avatar-large img { width: 100%; height: 100%; object-fit: cover; }

        .identity-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .identity-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .info-item {
          margin-bottom: 24px;
        }

        .info-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .info-value-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .info-value {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text);
        }

        .monospaced { font-family: monospace; font-size: 0.9rem; }

        .text-btn {
          background: none;
          border: none;
          color: var(--color-primary);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .section-title-small {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .empty-activity-card {
          padding: 60px 40px !important;
          text-align: center;
        }

        .empty-text {
          color: var(--color-text-secondary);
          margin-bottom: 20px;
          max-width: 320px;
          margin-left: auto;
          margin-right: auto;
        }

        .impact-card {
           padding: 24px !important;
           margin-bottom: 24px;
        }

        .impact-title { font-size: 1.1rem; margin-bottom: 24px; }

        .impact-stats-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .impact-stat {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .impact-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .impact-icon-circle.blue { background: #eff6ff; color: #2563eb; }
        .impact-icon-circle.green { background: #f0fdf4; color: #16a34a; }
        .impact-icon-circle.purple { background: #f3e8ff; color: #9333ea; }

        .impact-val { font-size: 1.15rem; font-weight: 700; }
        .impact-lab { font-size: 0.85rem; color: var(--color-text-muted); }

        .security-card {
          padding: 24px !important;
        }

        .security-title { font-size: 1.1rem; margin-bottom: 12px; }
        .security-text { font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 20px; }

        @media (max-width: 1024px) {
          .profile-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
