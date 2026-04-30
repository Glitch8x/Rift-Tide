import React, { useState } from 'react';
import { Home, Compass, Banknote, PlusCircle, Settings, LogOut, User, Trophy, LayoutDashboard, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
    const auth = useAuth();
    const user = auth?.user;
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Compass, label: 'Marketplace', path: '/explore' },
        { icon: Banknote, label: 'Funding', path: '/grants' },
        { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const handleNavClick = () => {
        if (window.innerWidth < 1024) setIsOpen(false);
    };

    return (
        <React.Fragment>
            {/* Mobile Header Bar - Modern Rift Style */}
            <div className="rift-mobile-header mobile-only">
                <div className="branding-v4">
                    <div className="branding-icon-v4-wrap">
                        <img src="/rift-tide-final.png" alt="Rift Tide" style={{ width: 'auto', height: '40px' }} />
                    </div>
                </div>
                <button className="menu-toggle-v4" onClick={() => setIsOpen(!isOpen)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>
            </div>

            <aside className={`rift-sidebar ${isOpen ? 'show' : ''}`}>
                <div className="sidebar-inner-v4">
                    <div className="sidebar-branding-v4">
                        <div className="branding-hex-v4-final">
                            <img src="/rift-tide-final.png" alt="Rift Tide" style={{ width: '100%', height: 'auto' }} />
                        </div>
                    </div>

                    <nav className="sidebar-nav-v4">
                        <div className="nav-group-v4">
                            {navItems.map((item, i) => (
                                <NavLink
                                    key={item.label}
                                    to={item.path}
                                    className={({ isActive }) => `nav-link-v4 ${isActive ? 'active' : ''}`}
                                    onClick={handleNavClick}
                                >
                                    <div className="icon-wrap-v4">
                                        <item.icon size={20} />
                                    </div>
                                    <span className="label-v4">{item.label}</span>
                                    <ChevronRight className="arrow-v4" size={14} />
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    <footer className="sidebar-footer-v4">
                        <div className="user-profile-v4">
                            <div className="avatar-v4">
                                <div className="status-indicator"></div>
                                {user?.name?.charAt(0) || 'S'}
                            </div>
                            <div className="user-info-v4">
                                <span className="name-v4">{user?.name || 'Explorer'}</span>
                                <span className="role-v4">Contributor</span>
                            </div>
                        </div>
                        <button className="logout-btn-v4" onClick={() => auth.logout()}>
                            <LogOut size={16} /> Exit Session
                        </button>
                    </footer>
                </div>
            </aside>

            <style>{`
                .rift-sidebar {
                    position: fixed;
                    left: 24px;
                    top: 24px;
                    bottom: 24px;
                    width: 280px;
                    background: rgba(255, 255, 255, 0.8) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0 20px 50px rgba(0,0,0,0.05);
                    border-radius: 32px !important;
                    z-index: 1000;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .sidebar-inner-v4 { display: flex; flex-direction: column; height: 100%; padding: 12px; }

                .sidebar-branding-v4 {
                    width: 100%;
                    padding: 32px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .branding-icon-v4-wrap {
                    width: 52px;
                    height: 52px;
                    background: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0px;
                    overflow: visible;
                }
                .branding-icon-v4-wrap img { 
                    width: auto; 
                    height: 40px; 
                    object-fit: contain;
                }

                .branding-hex-v4-final {
                    width: 100%;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                }
                .branding-hex-v4-final img { 
                    width: 100%; 
                    max-width: 250px;
                    height: auto; 
                    object-fit: contain;
                    display: block;
                }
                .branding-text-stack h2 { font-size: 1.25rem; font-weight: 800; color: var(--color-text); margin: 0; line-height: 1; }
                .branding-text-stack h2 span { color: var(--color-primary); }
                .branding-text-stack p { font-size: 0.75rem; color: var(--color-text-muted); font-weight: 400; margin-top: 4px; }

                .sidebar-nav-v4 { flex: 1; padding: 20px 0; }
                .nav-group-v4 { display: flex; flex-direction: column; gap: 8px; }

                .nav-link-v4 {
                    display: flex;
                    align-items: center;
                    padding: 14px 16px;
                    border-radius: 18px !important;
                    color: var(--color-text-secondary);
                    font-weight: 700;
                    font-size: 0.95rem;
                    transition: all 0.3s;
                    position: relative;
                }
                .icon-wrap-v4 { margin-right: 14px; opacity: 0.6; transition: all 0.3s; }
                .arrow-v4 { margin-left: auto; opacity: 0; transform: translateX(-10px); transition: all 0.3s; }

                .nav-link-v4:hover {
                    background: var(--color-primary-soft);
                    color: var(--color-primary);
                    padding-left: 20px;
                }
                .nav-link-v4.active {
                    background: white;
                    color: var(--color-primary);
                    box-shadow: 0 10px 20px rgba(56, 193, 244, 0.1);
                }
                .nav-link-v4.active .icon-wrap-v4 { opacity: 1; color: var(--color-primary); }
                .nav-link-v4.active .arrow-v4 { opacity: 0.5; transform: translateX(0); }

                .sidebar-footer-v4 {
                    padding: 20px;
                    background: white;
                    border-radius: 24px !important;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .user-profile-v4 {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                    padding: 4px;
                }
                .avatar-v4 {
                    width: 40px;
                    height: 40px;
                    background: var(--color-primary);
                    color: white;
                    border-radius: 12px !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    position: relative;
                }
                .status-indicator {
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 10px;
                    height: 10px;
                    background: #10B981;
                    border: 2px solid white;
                    border-radius: 50% !important;
                }
                .user-info-v4 { display: flex; flex-direction: column; }
                .name-v4 { font-size: 0.9rem; font-weight: 800; color: var(--color-text); line-height: 1.2; }
                .role-v4 { font-size: 0.7rem; color: var(--color-text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }

                .logout-btn-v4 {
                    width: 100%;
                    height: 44px;
                    background: var(--color-bg-secondary);
                    border-radius: 14px !important;
                    color: #EF4444;
                    font-weight: 700;
                    font-size: 0.85rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.2s;
                }
                .logout-btn-v4:hover { background: #FEF2F2; transform: scale(0.98); }

                @media (max-width: 1024px) {
                    .rift-sidebar { left: -300px; transform: translateX(0); }
                    .rift-sidebar.show { left: 16px; top: 16px; bottom: 16px; width: 260px; }
                    .rift-mobile-header {
                        position: fixed; top: 0; left: 0; right: 0; height: 64px; background: white; border-bottom: 1px solid var(--color-border); padding: 0 24px; display: flex; align-items: center; justify-content: space-between; z-index: 999;
                    }
                    .branding-v4 { display: flex; align-items: center; gap: 10px; }
                    .branding-v4 h2 { font-size: 1.25rem; font-weight: 800; margin: 0; }
                    .branding-v4 h2 span { color: var(--color-primary); }
                    .branding-icon-v4 { color: var(--color-primary); }
                    .menu-toggle-v4 { color: var(--color-text); background: var(--color-bg-secondary); padding: 8px; border-radius: 10px !important; }
                }

                @media (min-width: 1025px) {
                    .mobile-only { display: none; }
                }
            `}</style>
        </React.Fragment>
    );
};

export default Sidebar;
