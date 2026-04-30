import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowRight, Shield, Lock, Mail, Github, Chrome, Smartphone, Gamepad2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ConnectButton } from '@mysten/dapp-kit';

import BrandLogo from '../components/Common/BrandLogo';

const Login = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="rift-login-container">
            {/* Main Login Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rift-auth-card"
            >
                <div className="logo-box">
                    <img src="/Gemini_Generated_Image_ldq5hsldq5hsldq5__1_-removebg-preview.png" alt="Rift Tide" style={{ width: '360px', height: 'auto' }} />
                </div>
                
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to Rift Tide to continue your journey.</p>

                {/* Sui Wallet Connect */}
                <div className="sui-wallet-wrap">
                    <ConnectButton 
                        connectText={
                            <div className="sui-connect-btn">
                                <Wallet size={18} />
                                <span>Connect Sui Wallet</span>
                            </div>
                        }
                    />
                </div>

                {/* Google Login */}
                <div className="google-login-wrap" style={{ marginBottom: '16px' }}>
                    <button type="button" className="social-btn" style={{ width: '100%', background: '#FFFFFF', border: '1px solid #E2E8F0', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', borderRadius: '12px', cursor: 'pointer' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.35 11.1H12V13.9H17.85C17.65 15 16.25 17.1 12 17.1C8.45 17.1 5.7 14.6 5.7 11.5C5.7 8.4 8.45 5.9 12 5.9C13.6 5.9 14.9 6.5 15.75 7.3L18 5.05C16.5 3.7 14.4 3 12 3C6.48 3 2 7.48 2 13C2 18.52 6.48 23 12 23C18 23 22 18.5 22 13.5C22 12.5 21.85 11.8 21.35 11.1Z" fill="#4285F4"/></svg>
                        <span style={{ marginLeft: '8px', fontWeight: '600' }}>Continue with Google</span>
                    </button>
                </div>

                <div className="auth-footer-link" style={{ marginTop: '24px' }}>
                    New to Rift Tide? <Link to="/signup">Join the Tribe</Link>
                </div>
            </motion.div>

            <style>{`
                .rift-login-container {
                    min-height: 100vh;
                    background-color: #F9FBFC;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 64px 24px;
                    font-family: var(--font-body);
                }

                .logo-box {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 32px;
                }

                .rift-auth-card {
                    background: #FFFFFF;
                    width: 100%;
                    max-width: 480px;
                    padding: 48px;
                    border-radius: 24px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04);
                    border: 1px solid #F1F5F9;
                    text-align: center;
                }

                .auth-title {
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 2.25rem;
                    margin-bottom: 12px;
                    color: #0B1120;
                }

                .auth-subtitle {
                    color: #64748B;
                    font-size: 1rem;
                    margin-bottom: 32px;
                }

                .sui-wallet-wrap {
                    margin-bottom: 16px;
                }

                .sui-wallet-wrap button {
                    width: 100% !important;
                    height: 52px !important;
                    background: #FFFFFF !important;
                    border: 1px solid #E2E8F0 !important;
                    border-radius: 12px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    padding: 0 !important;
                }

                .sui-connect-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #475569;
                    font-weight: 600;
                    font-family: 'Inter', sans-serif;
                }

                .auth-footer-link {
                    font-size: 0.95rem;
                    color: #64748B;
                    font-weight: 500;
                }

                .auth-footer-link a {
                    color: var(--color-primary);
                    font-weight: 700;
                    text-decoration: none;
                    margin-left: 4px;
                }
            `}</style>
        </div>
    );
};

export default Login;
