import React, { useState } from 'react';
import { Home, Compass, Banknote, PlusCircle, Settings, LogOut, User, Trophy, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import PostBountyModal from '../Modals/PostBountyModal';

/**
 * Sidebar component - Redesigned for a professional FinTech aesthetic
 * inspired by First Dollar.
 */
const Sidebar = () => {
  const dataContext = useData();
  const { postBounty, notifications } = dataContext || { postBounty: () => { }, notifications: [] };
  const auth = useAuth();
  const user = auth?.user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Compass, label: 'Marketplace', path: '/explore' },
    { icon: Banknote, label: 'Staking & Grants', path: '/grants' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: User, label: 'My Profile', path: '/profile' },
  ];

  const handlePostBounty = (newBounty) => {
    postBounty(newBounty);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="mobile-header mobile-only">
        <h1 className="logo-text">Sui-<span className="logo-accent">gig</span></h1>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <aside className={`sidebar-container ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-inner">
          <div className="sidebar-header">
            <h1 className="logo-text">Sui-<span className="logo-accent">gig</span></h1>
          </div>

          <nav className="sidebar-nav">
            <p className="nav-group-title">MAIN MENU</p>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                <item.icon size={20} className="link-icon" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar-small">
                 {user?.name?.charAt(0) || 'Y'}
              </div>
              <div className="user-details">
                <p className="user-name-text">{user?.name || 'Yeti'}</p>
                <p className="user-wallet-text">
                  {user?.walletAddress 
                    ? `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`
                    : 'Not Connected'
                  }
                </p>
              </div>
              <button className="settings-btn" onClick={() => auth.logout()} title="Sign Out">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>

        <PostBountyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPost={handlePostBounty}
        />

        <style>{`
          .sidebar-container {
            width: 280px;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background: var(--color-surface);
            border-right: 1px solid var(--color-border);
            z-index: 1000;
            transition: transform 0.3s ease;
          }

          .sidebar-inner {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 32px 20px;
          }

          .sidebar-header {
            margin-bottom: 48px;
            padding-left: 12px;
          }

          .logo-text {
            font-size: 1.25rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: var(--color-text);
          }

          .logo-accent {
            color: var(--color-primary);
          }

          .nav-group-title {
            font-size: 0.7rem;
            font-weight: 700;
            color: var(--color-text-muted);
            letter-spacing: 0.05em;
            margin-bottom: 16px;
            padding-left: 12px;
          }

          .sidebar-nav {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .sidebar-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            border-radius: var(--radius-sm);
            color: var(--color-text-secondary);
            font-weight: 500;
            font-size: 0.95rem;
            transition: all 0.2s;
          }

          .sidebar-link:hover {
            background: var(--color-bg);
            color: var(--color-text);
          }

          .sidebar-link.active {
            background: var(--color-primary-soft);
            color: var(--color-primary);
          }

          .link-icon {
            transition: transform 0.2s;
          }

          .sidebar-link.active .link-icon {
            transform: scale(1.1);
          }

          .sidebar-footer {
            margin-top: auto;
            padding-top: 24px;
            border-top: 1px solid var(--color-border);
          }

          .user-card {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: var(--color-bg);
            border-radius: var(--radius-md);
            border: 1px solid var(--color-border);
          }

          .user-avatar-small {
            width: 32px;
            height: 32px;
            background: var(--color-primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.8rem;
          }

          .user-details {
            flex: 1;
            min-width: 0;
          }

          .user-name-text {
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .user-wallet-text {
            font-size: 0.75rem;
            color: var(--color-text-muted);
            font-family: monospace;
          }

          .settings-btn {
            background: none;
            border: none;
            color: var(--color-text-muted);
            padding: 4px;
            transition: color 0.2s;
          }

          .settings-btn:hover {
            color: #ef4444;
          }

          /* Mobile Styles */
          .mobile-header {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 64px;
            background: var(--color-surface);
            border-bottom: 1px solid var(--color-border);
            padding: 0 20px;
            align-items: center;
            justify-content: space-between;
            z-index: 900;
          }

          .menu-toggle {
            background: none;
            border: none;
            color: var(--color-text);
          }

          @media (max-width: 1024px) {
            .mobile-header { display: flex; }
            .sidebar-container {
              transform: translateX(-100%);
            }
            .sidebar-container.show {
              transform: translateX(0);
            }
          }
        `}</style>
      </aside>
    </>
  );
};

export default Sidebar;
