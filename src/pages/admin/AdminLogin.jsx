import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import SharpCard from '../../components/UI/GlassCard'; // Now SharpCard

/**
 * AdminLogin Page - Redesigned for a high-security, professional entry.
 * Follows the "First Dollar" style with sharp borders and clean typography.
 */
const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'Daniel@2007') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('The password you entered is incorrect. Access denied.');
        }
    };

    return (
        <div className="admin-login-container animate-fade-in">
            <SharpCard className="admin-auth-card">
                <header className="auth-header">
                    <div className="auth-lock-icon">
                        <Lock size={24} />
                    </div>
                    <h1 className="auth-title">Administrator Terminal</h1>
                    <p className="auth-subtitle">Unauthorized access is strictly prohibited and logged.</p>
                </header>

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="field-group">
                        <label className="field-label">Access Password</label>
                        <div className={`input-wrapper-sharp ${error ? 'error' : ''}`}>
                             <input
                                type="password"
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value); setError('');}}
                                className="sharp-input-field"
                                required
                            />
                        </div>
                    </div>
                    
                    {error && (
                        <div className="error-alert">
                            <ShieldCheck size={16} /> {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary full-width large-btn">
                        Enter Secure Dashboard <ArrowRight size={18} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p>© 2026 Sui-gig Management Console</p>
                </div>
            </SharpCard>

            <style>{`
                .admin-login-container {
                    min-height: calc(100vh - 200px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                }

                .admin-auth-card {
                    width: 100%;
                    max-width: 440px;
                    padding: 48px !important;
                }

                .auth-header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .auth-lock-icon {
                    width: 56px;
                    height: 56px;
                    background: #f8fafc;
                    border: 1px solid var(--color-border);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                    color: var(--color-text-muted);
                }

                .auth-title {
                    font-size: 1.5rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    margin-bottom: 8px;
                }

                .auth-subtitle {
                    color: var(--color-text-muted);
                    font-size: 0.85rem;
                    line-height: 1.5;
                }

                .field-group { margin-bottom: 24px; }

                .field-label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--color-text-muted);
                    margin-bottom: 8px;
                    letter-spacing: 0.05em;
                }

                .input-wrapper-sharp {
                    background: #f8fafc;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-sm);
                    padding: 2px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                }

                .input-wrapper-sharp.error {
                    border-color: #ef4444;
                    background: #fef2f2;
                }

                .input-wrapper-sharp:focus-within {
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px var(--color-primary-soft);
                    background: white;
                }

                .sharp-input-field {
                    width: 100%;
                    padding: 12px 14px;
                    background: transparent;
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    color: var(--color-text);
                    text-align: center;
                    letter-spacing: 0.2rem;
                }

                .error-alert {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #fef2f2;
                    color: #ef4444;
                    padding: 12px;
                    border-radius: var(--radius-sm);
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 24px;
                    border: 1px solid #fee2e2;
                }

                .large-btn { padding: 14px !important; font-size: 1rem !important; }

                .auth-footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                }

                .full-width { width: 100%; }
            `}</style>
        </div>
    );
};

export default AdminLogin;
