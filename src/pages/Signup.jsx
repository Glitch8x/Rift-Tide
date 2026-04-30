import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Shield, Zap, Lock, Mail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ConnectButton } from '@mysten/dapp-kit';

import BrandLogo from '../components/Common/BrandLogo';

const Signup = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Mock signup logic or actual if available
            await login({ email, password, name }); 
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rift-signup-page">
            {/* Top Navigation */}
            <nav className="auth-nav">
                <div className="auth-nav-logo">
                    <BrandLogo size={32} showText={false} />
                </div>
                <div className="auth-nav-right">
                    <span>Already have an account?</span>
                    <Link to="/login" className="sign-in-link">SIGN IN</Link>
                </div>
            </nav>

            <div className="signup-layout">
                {/* Left Side Content */}
                <div className="signup-info">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="info-badge"
                    >
                        <Zap size={14} />
                        <span>WEB3 REWARDS PROTOCOL</span>
                    </motion.div>

                    <h1 className="info-title">
                        Start Your <br />
                        <span className="journey-box">Journey</span>
                    </h1>

                    <p className="info-desc">
                        Join the premier decentralized platform for high-stakes bounties and technical quests. Harness the power of Sui for instant payouts.
                    </p>

                    <div className="info-cards">
                        <div className="info-card">
                            <div className="ic-icon"><Wallet size={18} /></div>
                            <div className="ic-text">
                                <h3>Secure Assets</h3>
                                <p>Fully non-custodial smart contracts.</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="ic-icon"><Zap size={18} /></div>
                            <div className="ic-text">
                                <h3>Fast Bounties</h3>
                                <p>Real-time reward distribution.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Form Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="signup-card-wrap"
                >
                    <div className="signup-card">
                        <h2 className="card-title">Create Account</h2>
                        <p className="card-subtitle">Enter your details to begin your questing experience.</p>

                        <form className="signup-form" onSubmit={handleSignup}>
                            <div className="input-group">
                                <label>FULL NAME</label>
                                <div className="input-wrap">
                                    <input 
                                        type="text" 
                                        placeholder="Alex Rivers" 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>EMAIL ADDRESS</label>
                                <div className="input-wrap">
                                    <input 
                                        type="email" 
                                        placeholder="alex@protocol.io" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>PASSWORD</label>
                                <div className="input-wrap">
                                    <input 
                                        type="password" 
                                        placeholder="••••••••" 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {error && <div className="auth-error">{error}</div>}

                            <button type="submit" className="create-btn" disabled={loading}>
                                {loading ? 'Creating Account...' : (
                                    <>
                                        <span>CREATE ACCOUNT</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <div className="card-separator">
                                <span>OR</span>
                            </div>

                            <div className="sui-connect-wrap">
                                <ConnectButton 
                                    connectText={
                                        <div className="sui-btn-inner">
                                            <Wallet size={18} />
                                            <span>CONNECT SUI WALLET</span>
                                        </div>
                                    }
                                />
                            </div>

                            <p className="legal-text">
                                By proceeding, you agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
                            </p>
                        </form>
                    </div>

                    {/* Transparent Tech Decoration Overlapping */}
                    <div className="tech-decoration-v2">
                         <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" alt="Tech" />
                    </div>
                </motion.div>
            </div>

            <footer className="signup-footer">
                <div className="footer-left">© 2024 BOUNTYQUEST PROTOCOL</div>
                <div className="footer-links">
                    <Link to="/governance">GOVERNANCE</Link>
                    <Link to="/whitepaper">WHITEPAPER</Link>
                    <Link to="/github">GITHUB</Link>
                    <Link to="/support">SUPPORT</Link>
                </div>
            </footer>

            <style>{`
                .rift-signup-page {
                    min-height: 100vh;
                    background-color: #F9FBFC;
                    display: flex;
                    flex-direction: column;
                    padding: 0 40px;
                    font-family: var(--font-body);
                    background-image: radial-gradient(circle at 10% 10%, rgba(0, 209, 255, 0.03) 0%, transparent 40%),
                                      radial-gradient(circle at 90% 90%, rgba(0, 209, 255, 0.03) 0%, transparent 40%);
                }

                .auth-nav {
                    height: 100px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .auth-nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .auth-nav-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    font-size: 0.875rem;
                    color: #64748B;
                    font-weight: 600;
                }

                .sign-in-link {
                    color: #0B1120 !important;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                }

                .signup-layout {
                    flex: 1;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 80px;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
                    padding-bottom: 60px;
                }

                .signup-info {
                    max-width: 480px;
                }

                .info-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: #E0F2FE;
                    color: #0EA5E9;
                    border-radius: 99px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    margin-bottom: 24px;
                }

                .info-title {
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 3.5rem;
                    line-height: 1.1;
                    margin-bottom: 24px;
                    color: #0B1120;
                }

                .journey-box {
                    background: #0B1120;
                    color: #00D1FF;
                    padding: 4px 12px;
                    border-radius: 4px;
                    display: inline-block;
                    margin-top: 8px;
                }

                .info-desc {
                    font-size: 1.125rem;
                    color: #64748B;
                    line-height: 1.6;
                    margin-bottom: 40px;
                }

                .info-cards {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .info-card {
                    background: #F1F5F9;
                    padding: 24px;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .ic-icon {
                    width: 36px;
                    height: 36px;
                    background: #FFFFFF;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #0EA5E9;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }

                .ic-text h3 {
                    font-size: 1rem;
                    font-weight: 800;
                    margin-bottom: 4px;
                    color: #0B1120;
                }

                .ic-text p {
                    font-size: 0.8125rem;
                    color: #64748B;
                    line-height: 1.4;
                }

                /* Card Wrap */
                .signup-card-wrap {
                    position: relative;
                }

                .signup-card {
                    background: #FFFFFF;
                    padding: 48px;
                    border-radius: 24px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.04);
                    border: 1px solid #F1F5F9;
                    position: relative;
                    z-index: 2;
                }

                .tech-decoration-v2 {
                    position: absolute;
                    bottom: -40px;
                    right: -40px;
                    width: 320px;
                    height: 320px;
                    z-index: 3; /* Overlaps bottom right */
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.1);
                    opacity: 0.9;
                    pointer-events: none;
                }

                .tech-decoration-v2 img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-title {
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 1.5rem;
                    margin-bottom: 8px;
                    color: #0B1120;
                }

                .card-subtitle {
                    font-size: 0.9375rem;
                    color: #64748B;
                    margin-bottom: 32px;
                }

                .input-group {
                    margin-bottom: 20px;
                }

                .input-group label {
                    display: block;
                    font-size: 0.6875rem;
                    font-weight: 800;
                    color: #94A3B8;
                    letter-spacing: 0.05em;
                    margin-bottom: 8px;
                }

                .input-wrap input {
                    width: 100%;
                    height: 52px;
                    padding: 0 20px;
                    background: #F8FAFC;
                    border: 1px solid #E2E8F0;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-family: 'Inter', sans-serif;
                    outline: none;
                    transition: all 0.2s;
                }

                .input-wrap input:focus {
                    border-color: var(--color-primary);
                    background: #FFFFFF;
                    box-shadow: 0 0 0 4px rgba(0, 209, 255, 0.08);
                }

                .create-btn {
                    width: 100%;
                    height: 56px;
                    background: var(--color-primary);
                    color: #FFFFFF;
                    border-radius: 12px;
                    font-weight: 800;
                    font-size: 0.9375rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin: 32px 0 20px;
                    box-shadow: 0 4px 12px rgba(0, 209, 255, 0.2);
                }

                .card-separator {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .card-separator::before,
                .card-separator::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #E2E8F0;
                }

                .card-separator span {
                    font-size: 0.6875rem;
                    font-weight: 800;
                    color: #94A3B8;
                }

                .sui-connect-wrap button {
                    width: 100% !important;
                    height: 56px !important;
                    background: #FFFFFF !important;
                    border: 2px solid #0B1120 !important;
                    border-radius: 12px !important;
                    padding: 0 !important;
                }

                .sui-btn-inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    color: #0B1120;
                    font-weight: 800;
                    font-size: 0.875rem;
                    letter-spacing: 0.02em;
                }

                .legal-text {
                    margin-top: 24px;
                    text-align: center;
                    font-size: 0.75rem;
                    color: #94A3B8;
                    line-height: 1.6;
                }

                .legal-text a {
                    color: #475569;
                    font-weight: 700;
                }

                /* Footer */
                .signup-footer {
                    height: 100px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #94A3B8;
                    letter-spacing: 0.05em;
                }

                .footer-links {
                    display: flex;
                    gap: 24px;
                }

                .footer-links a {
                    color: #94A3B8;
                }

                @media (max-width: 1024px) {
                    .signup-layout {
                        grid-template-columns: 1fr;
                        gap: 60px;
                        padding-top: 40px;
                    }
                    .signup-info {
                        max-width: 100%;
                        text-align: center;
                    }
                    .info-badge { justify-content: center; }
                    .info-cards { max-width: 600px; margin: 0 auto; }
                    .signup-card-wrap { max-width: 500px; margin: 0 auto; width: 100%; }
                }

                @media (max-width: 640px) {
                    .rift-signup-page { padding: 0 20px; }
                    .info-title { font-size: 2.5rem; }
                    .info-cards { grid-template-columns: 1fr; }
                    .signup-card { padding: 32px 24px; }
                    .signup-footer { flex-direction: column; gap: 20px; text-align: center; height: auto; padding-bottom: 40px; }
                    .footer-links { flex-wrap: wrap; justify-content: center; }
                }
            `}</style>
        </div>
    );
};

export default Signup;
