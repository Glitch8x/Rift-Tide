import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Key, Wallet, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');

    // Restricted Admin Wallet Address
    const ADMIN_WALLET = '0xebdcab3f6b981a9b68a7b0d866c713a8fd486e9873f08b615207ca471601c189';

    const checkAccess = () => {
        setIsVerifying(true);
        setTimeout(() => {
            if (user?.walletAddress?.toLowerCase() === ADMIN_WALLET.toLowerCase()) {
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Access Denied: Your wallet address is not authorized for administrative access.');
                setIsVerifying(false);
            }
        }, 1500);
    };

    useEffect(() => {
        if (user) {
            checkAccess();
        }
    }, [user]);

    return (
        <div className="admin-gate-page">
            <div className="bg-blur-blob blob-adm-1"></div>
            <div className="bg-blur-blob blob-adm-2"></div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="gate-container"
            >
                <div className="gate-card">
                    <div className="gate-icon">
                        {error ? <ShieldAlert size={48} /> : <ShieldCheck size={48} />}
                    </div>
                    <h1>Admin <span>Gate</span></h1>
                    <p className="gate-subtitle">
                        Identity verification in progress. This area is restricted to authorized ecosystem roots.
                    </p>

                    {!user ? (
                        <div className="gate-state">
                            <div className="status-pill pending">
                                <Wallet size={16} /> Wallet Not Connected
                            </div>
                            <button className="wizz-btn-primary full-width" onClick={() => navigate('/login')}>
                                Connect Authorized Wallet
                            </button>
                        </div>
                    ) : isVerifying ? (
                        <div className="gate-state">
                            <div className="status-pill verifying">
                                <div className="loader-mini" /> Verifying Identity...
                            </div>
                            <p className="wallet-ref">{user.walletAddress}</p>
                        </div>
                    ) : error ? (
                        <div className="gate-state">
                            <div className="error-box">
                                <p>{error}</p>
                            </div>
                            <button className="wizz-btn-outline full-width" onClick={() => navigate('/dashboard')}>
                                Return to User Dashboard
                            </button>
                        </div>
                    ) : null}

                    <footer className="gate-footer">
                        <p>© 2026 Rift Tide Protocol • Command & Control v2.4</p>
                    </footer>
                </div>
            </motion.div>

            <style>{`
                .admin-gate-page {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px;
                }

                .gate-container {
                    width: 100%;
                    max-width: 500px;
                }

                .gate-card {
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 32px;
                    padding: 60px;
                    text-align: center;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.03);
                }

                .gate-icon {
                    width: 80px;
                    height: 80px;
                    background: #F8FAFC;
                    color: var(--color-primary);
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 32px;
                }

                .gate-card h1 {
                    font-size: 2.5rem;
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    margin-bottom: 12px;
                }

                .gate-card h1 span {
                    color: var(--color-primary);
                }

                .gate-subtitle {
                    color: #64748B;
                    font-weight: 500;
                    line-height: 1.6;
                    margin-bottom: 40px;
                }

                .gate-state {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .status-pill {
                    padding: 10px 20px;
                    border-radius: 99px;
                    font-size: 0.85rem;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .status-pill.pending { background: #F1F5F9; color: #64748B; }
                .status-pill.verifying { background: var(--color-primary-soft); color: var(--color-primary); }

                .wallet-ref {
                    font-family: monospace;
                    font-size: 0.75rem;
                    color: #94A3B8;
                    word-break: break-all;
                }

                .error-box {
                    padding: 20px;
                    background: #FEF2F2;
                    border: 1px solid #FEE2E2;
                    border-radius: 16px;
                    color: #DC2626;
                    font-size: 0.9rem;
                    font-weight: 600;
                    line-height: 1.5;
                }

                .gate-footer {
                    margin-top: 48px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #94A3B8;
                }

                .loader-mini {
                    width: 16px;
                    height: 16px;
                    border: 2px solid var(--color-primary);
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default AdminLogin;
