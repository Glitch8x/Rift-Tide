import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, Banknote, Trophy, User, LogOut, LayoutDashboard, ArrowRight, Radio, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Restricted Admin Wallet Address
    const ADMIN_WALLET = '0xebdcab3f6b981a9b68a7b0d866c713a8fd486e9873f08b615207ca471601c189';
    const isAdmin = user?.walletAddress?.toLowerCase() === ADMIN_WALLET.toLowerCase();

    const navItems = [
        { icon: LayoutDashboard, label: 'Home', path: '/' },
        { icon: Compass, label: 'Explore', path: '/explore' },
        { icon: Banknote, label: 'Grants', path: '/grants' },
        { icon: Radio, label: 'Hub', path: '/hub' },
        { icon: Trophy, label: 'Ranks', path: '/leaderboard' },
    ];

    if (isAdmin) {
        navItems.push({ icon: ShieldCheck, label: 'Admin', path: '/admin/dashboard' });
    }

    return (
        <div className="navbar-wrapper">
            <nav className="navbar-pill">
                {/* Brand */}
                <div className="nav-brand" onClick={() => navigate('/')}>
                    <BrandLogo size={40} showText={false} />
                </div>

                {/* Navigation Links */}
                <div className="nav-links">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon size={16} strokeWidth={2.5} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>

                {/* Actions */}
                <div className="nav-actions">
                    {user?.walletAddress ? (
                        <div className="nav-profile-group">
                            <div className="nav-user-chip" onClick={() => navigate('/profile')}>
                                <div className="avatar-preview">
                                    {user.name?.charAt(0) || 'U'}
                                </div>
                                <span className="wallet-mini">
                                    {user.walletAddress.substring(0, 4)}...{user.walletAddress.substring(user.walletAddress.length - 4)}
                                </span>
                            </div>
                            <button className="nav-logout-btn" onClick={logout}>
                                <LogOut size={15} strokeWidth={2.5} />
                            </button>
                        </div>
                    ) : (
                        <button className="nav-connect-btn" onClick={() => navigate('/login')}>
                            Join Now <ArrowRight size={15} strokeWidth={2.5} />
                        </button>
                    )}
                </div>
            </nav>

            <style>{`
                .navbar-wrapper {
                    position: fixed;
                    top: 20px;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    display: flex;
                    justify-content: center;
                    padding: 0 20px;
                }

                .navbar-pill {
                    width: 100%;
                    max-width: 1100px;
                    height: 68px;
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    border-radius: 22px;
                    box-shadow:
                        0 1px 0 rgba(255,255,255,0.8) inset,
                        0 8px 32px rgba(0, 0, 0, 0.06);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 10px 0 20px;
                }

                /* ── Brand ── */
                .nav-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    user-select: none;
                    flex-shrink: 0;
                }

                    .brand-icon-wrap-final {
                        width: 52px;
                        height: 52px;
                        background: transparent;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0px;
                        overflow: visible;
                    }
                    .brand-icon-wrap-final img { 
                        width: 100%; 
                        height: 100%; 
                        object-fit: contain;
                        transform: scale(3.5) translate(3%, 3%); /* Nudge to center */
                        mix-blend-mode: multiply;
                        filter: contrast(1.1);
                    }
                .nav-brand:hover .brand-icon-wrap {
                    transform: rotate(-8deg) scale(1.08);
                    box-shadow: 0 6px 20px rgba(56, 193, 244, 0.5);
                }

                .brand-name {
                    font-size: 1.15rem;
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    color: var(--color-primary);
                    display: flex;
                    align-items: center;
                }
                .brand-name span {
                    color: var(--color-text);
                }

                /* ── Nav links ── */
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 9px 18px;
                    border-radius: 12px;
                    color: var(--color-text-secondary);
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 0.9rem;
                    transition: all 0.18s ease;
                    letter-spacing: -0.01em;
                }

                .nav-item:hover {
                    color: var(--color-primary);
                    background: var(--color-primary-soft);
                }

                .nav-item.active {
                    color: var(--color-text);
                    background: white;
                    box-shadow:
                        0 1px 0 rgba(255,255,255,1) inset,
                        0 2px 8px rgba(0,0,0,0.08);
                    border: 1px solid rgba(0,0,0,0.06);
                }

                /* ── Actions ── */
                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-shrink: 0;
                }

                .nav-connect-btn {
                    height: 48px;
                    padding: 0 22px;
                    background: var(--color-text);
                    color: white;
                    border-radius: 14px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    transition: all 0.18s;
                    letter-spacing: -0.01em;
                }
                .nav-connect-btn:hover {
                    background: var(--color-primary);
                    transform: scale(1.02);
                    box-shadow: 0 6px 20px rgba(56, 193, 244, 0.3);
                }

                .nav-profile-group {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .nav-user-chip {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 16px 6px 6px;
                    background: white;
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.18s;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                }
                .nav-user-chip:hover {
                    border-color: var(--color-primary);
                    box-shadow: 0 4px 16px rgba(56, 193, 244, 0.1);
                }

                .avatar-preview {
                    width: 34px;
                    height: 34px;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: 0.9rem;
                    border-radius: 8px;
                }

                .wallet-mini {
                    font-family: var(--font-mono);
                    font-size: 0.72rem;
                    font-weight: 400;
                    color: var(--color-text);
                    letter-spacing: 0.02em;
                }

                .nav-logout-btn {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(0,0,0,0.08);
                    border-radius: 12px;
                    background: white;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    transition: all 0.18s;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                }
                .nav-logout-btn:hover {
                    color: #EF4444;
                    background: #FEF2F2;
                    border-color: #FEE2E2;
                }

                @media (max-width: 900px) {
                    .nav-item span { display: none; }
                    .nav-links { gap: 2px; }
                    .nav-item { padding: 9px 12px; }
                }
                @media (max-width: 600px) {
                    .brand-name { display: none; }
                    .navbar-pill { padding: 0 8px 0 12px; }
                }
            `}</style>
        </div>
    );
};

export default Navbar;
