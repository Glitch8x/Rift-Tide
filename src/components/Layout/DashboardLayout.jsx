import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Compass, 
    Banknote, 
    Trophy, 
    User, 
    Settings, 
    LogOut, 
    Search, 
    Bell, 
    Menu,
    X,
    Briefcase,
    Calendar,
    Plus,
    ChevronDown,
    ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../Common/BrandLogo';

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const ADMIN_WALLET = '0xebdcab3f6b981a9b68a7b0d866c713a8fd486e9873f08b615207ca471601c189';
    const isAdmin = user?.walletAddress?.toLowerCase() === ADMIN_WALLET.toLowerCase();

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Compass, label: 'Bounties', path: '/explore' },
        { icon: Calendar, label: 'Events', path: '/hub' },
        { icon: Briefcase, label: 'Jobs', path: '/jobs' },
        { icon: Banknote, label: 'Grants', path: '/grants' },
    ];

    if (isAdmin) {
        navItems.push({ icon: ShieldCheck, label: 'Admin', path: '/admin/dashboard' });
    }

    return (
        <div className="rift-horizontal-layout">
            {/* Top Navigation Bar */}
            <nav className="rift-top-nav">
                <div className="nav-container">
                    {/* Left: Brand */}
                    <div className="nav-brand" onClick={() => navigate('/dashboard')}>
                        <BrandLogo size={80} showText={false} />
                    </div>

                    {/* Center: Main Nav Links (Desktop) */}
                    <div className="nav-center-links">
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.label} 
                                to={item.path} 
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    {/* Right: Actions & User */}
                    <div className="nav-right-actions">
                        
                        <button className="icon-btn">
                            <Bell size={20} />
                            <span className="dot" />
                        </button>
                        
                        {user && (
                            <div className="user-menu-wrap">
                                <div className="user-pill" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
                                    <div className="user-avatar">
                                        {user.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="wallet-addr">
                                        {user.walletAddress?.substring(0, 4)}...{user.walletAddress?.slice(-4)}
                                    </span>
                                    <ChevronDown size={16} />
                                </div>

                                {isUserMenuOpen && (
                                    <div className="user-dropdown">
                                        <div className="dropdown-header">
                                            <p className="user-name">{user.name || 'User'}</p>
                                            <p className="user-email">{user.email || 'No email'}</p>
                                        </div>
                                        <div className="dropdown-divider" />
                                        <button className="dropdown-item" onClick={() => { navigate('/profile'); setIsUserMenuOpen(false); }}>
                                            <User size={18} />
                                            <span>Profile</span>
                                        </button>
                                        <button className="dropdown-item" onClick={() => { navigate('/settings'); setIsUserMenuOpen(false); }}>
                                            <Settings size={18} />
                                            <span>Settings</span>
                                        </button>
                                        <div className="dropdown-divider" />
                                        <button className="dropdown-item logout" onClick={() => { logout(); setIsUserMenuOpen(false); }}>
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-nav-overlay" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="mobile-nav-content" onClick={e => e.stopPropagation()}>
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.label} 
                                to={item.path} 
                                className="mobile-nav-item"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                        <div className="dropdown-divider" style={{ margin: '8px 0' }} />
                        <button className="mobile-nav-item" onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }}>
                            <Settings size={20} />
                            <span>Settings</span>
                        </button>
                        <button className="mobile-nav-item logout" onClick={logout}>
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="rift-main-content">
                <div className="content-container">
                    {children}
                </div>
            </main>

            <style>{`
                .rift-horizontal-layout {
                    min-height: 100vh;
                    background: #F8FAFC;
                    display: flex;
                    flex-direction: column;
                }

                .rift-top-nav {
                    height: 80px;
                    background: white;
                    border-bottom: 1px solid #E2E8F0;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                .nav-container {
                    max-width: 1400px;
                    height: 100%;
                    margin: 0 auto;
                    padding: 0 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nav-brand {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                }

                .nav-center-links {
                    display: flex;
                    gap: 32px;
                    height: 100%;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    color: #475569;
                    font-weight: 700;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    position: relative;
                    height: 100%;
                    padding: 0 4px;
                    transition: all 0.2s;
                }

                .nav-item:hover {
                    color: var(--color-primary);
                }

                .nav-item.active {
                    color: var(--color-primary);
                }

                .nav-item.active::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: var(--color-primary);
                    border-radius: 3px 3px 0 0;
                }

                .nav-right-actions {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .header-search {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: #F1F5F9;
                    padding: 0 16px;
                    height: 44px;
                    border-radius: 12px;
                    width: 240px;
                }

                .header-search input {
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 0.9rem;
                    width: 100%;
                }

                .icon-btn {
                    position: relative;
                    color: #64748B;
                    padding: 8px;
                    border-radius: 10px;
                    transition: all 0.2s;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .icon-btn:hover {
                    background: #F1F5F9;
                    color: var(--color-primary);
                }

                .icon-btn .dot {
                    position: absolute;
                    top: 6px;
                    right: 6px;
                    width: 8px;
                    height: 8px;
                    background: #EF4444;
                    border: 2px solid white;
                    border-radius: 50%;
                }

                /* User Menu & Dropdown */
                .user-menu-wrap {
                    position: relative;
                }

                .user-pill {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 4px 16px 4px 4px;
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 99px;
                    cursor: pointer;
                    transition: all 0.2s;
                    height: 44px;
                }

                .user-pill:hover {
                    border-color: var(--color-primary);
                    background: var(--color-primary-soft);
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    background: var(--color-primary);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    font-weight: 800;
                }

                .wallet-addr {
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #1E293B;
                }

                .user-dropdown {
                    position: absolute;
                    top: calc(100% + 12px);
                    right: 0;
                    width: 240px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    border: 1px solid #E2E8F0;
                    padding: 8px;
                    z-index: 1001;
                    animation: slideUp 0.2s ease-out;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .dropdown-header {
                    padding: 12px 16px;
                }

                .user-name {
                    font-weight: 800;
                    color: #0F172A;
                    margin: 0;
                    font-size: 0.95rem;
                }

                .user-email {
                    color: #64748B;
                    font-size: 0.8rem;
                    margin: 2px 0 0;
                }

                .dropdown-divider {
                    height: 1px;
                    background: #F1F5F9;
                    margin: 8px;
                }

                .dropdown-item {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 16px;
                    border-radius: 10px;
                    border: none;
                    background: none;
                    color: #475569;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .dropdown-item:hover {
                    background: #F8FAFC;
                    color: var(--color-primary);
                }

                .dropdown-item.logout {
                    color: #EF4444;
                }

                .dropdown-item.logout:hover {
                    background: #FEF2F2;
                }

                .rift-main-content {
                    flex: 1;
                    padding: 40px 0;
                }

                .content-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 40px;
                }

                .mobile-toggle {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #475569;
                }

                /* Mobile Styles */
                @media (max-width: 1024px) {
                    .nav-center-links, .header-search {
                        display: none;
                    }

                    .mobile-toggle {
                        display: block;
                    }

                    .nav-container {
                        padding: 0 20px;
                    }

                    .mobile-nav-overlay {
                        position: fixed;
                        top: 80px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0,0,0,0.5);
                        z-index: 999;
                    }

                    .mobile-nav-content {
                        background: white;
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                    }

                    .mobile-nav-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 16px;
                        border-radius: 12px;
                        color: #475569;
                        font-weight: 700;
                        transition: all 0.2s;
                        border: none;
                        background: none;
                        width: 100%;
                        text-align: left;
                    }

                    .mobile-nav-item.active {
                        background: var(--color-primary-soft);
                        color: var(--color-primary);
                    }

                    .mobile-nav-item.logout {
                        color: #EF4444;
                    }
                }
            `}</style>
        </div>
    );
};

export default DashboardLayout;
