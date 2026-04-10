import React, { useState } from 'react';
import { ConnectButton } from '@mysten/dapp-kit';
import { Sparkles, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard

/**
 * Login Page - Redesigned for a professional, secure FinTech entry
 * inspired by First Dollar and modern Web3 interfaces.
 */
const Login = () => {
  const [manualAddress, setManualAddress] = useState('');
  const { manualLogin, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualAddress.trim()) {
      manualLogin(manualAddress.trim());
    }
  };

  return (
    <div className="login-wrapper animate-fade-in">
      <div className="login-left">
        <div className="login-branding">
          <div className="logo-badge">
             <Sparkles size={24} color="white" />
          </div>
          <h1 className="branding-title">Sui-gig</h1>
          <p className="branding-tagline">The premium contribution network for the Sui ecosystem.</p>
        </div>

        <div className="login-features">
          <div className="feature-row">
            <div className="feature-icon-box">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="feature-h">Secure by Design</p>
              <p className="feature-p">Integrate directly with Slush and Mysten Labs SDK.</p>
            </div>
          </div>
          <div className="feature-row">
            <div className="feature-icon-box">
              <Zap size={20} />
            </div>
            <div>
              <p className="feature-h">Instant Rewards</p>
              <p className="feature-p">Get paid instantly in stablecoins or SUI upon approval.</p>
            </div>
          </div>
          <div className="feature-row">
             <div className="feature-icon-box">
              <Globe size={20} />
            </div>
            <div>
              <p className="feature-h">Global Opportunities</p>
              <p className="feature-p">Access the best projects across the entire Sui network.</p>
            </div>
          </div>
        </div>

        <div className="login-footer-text">
          © 2026 Sui-gig. All rights reserved.
        </div>
      </div>

      <div className="login-right">
        <SharpCard className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Connect your wallet to access your health and quest assets.</p>
          </div>

          <div className="wallet-connect-area">
             <div className="connect-btn-container">
                <ConnectButton />
             </div>
             <p className="wallet-hint">We recommend using <strong>Slush Wallet</strong> for the best experience.</p>
          </div>

          <div className="divider-container">
             <div className="divider-line" />
             <span className="divider-label">OR ACCESS VIA ADDRESS</span>
             <div className="divider-line" />
          </div>

          <form onSubmit={handleManualSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">Wallet Address</label>
              <input
                type="text"
                placeholder="0x..."
                className="auth-input"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary full-width">
              Continue to Dashboard
            </button>
          </form>

          <p className="auth-footer-help">
            Need help? <a href="#">Visit our support center</a>
          </p>
        </SharpCard>
      </div>

      <style>{`
        .login-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          min-height: 100vh;
          background: white;
        }

        .login-left {
          background: #0f172a; /* Deep Navy */
          color: white;
          padding: 80px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .login-left::after {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: radial-gradient(circle at 10% 10%, rgba(37, 99, 235, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .logo-badge {
          width: 48px;
          height: 48px;
          background: var(--color-primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
        }

        .branding-title {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 12px;
        }

        .branding-tagline {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 360px;
          line-height: 1.6;
        }

        .login-features {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin: 60px 0;
        }

        .feature-row {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .feature-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          flex-shrink: 0;
        }

        .feature-h {
          font-weight: 600;
          font-size: 1.05rem;
          margin-bottom: 4px;
        }

        .feature-p {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.5;
        }

        .login-footer-text {
          font-size: 0.85rem;
          color: #64748b;
        }

        .login-right {
          background: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .auth-card {
          width: 100%;
          max-width: 480px;
          padding: 48px !important;
          background: white !important;
          border: 1px solid #e2e8f0 !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02) !important;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: #1e293b;
        }

        .auth-subtitle {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.5;
        }

        .wallet-connect-area {
          margin-bottom: 32px;
        }

        .connect-btn-container {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .connect-btn-container button {
          width: 100% !important;
          padding: 12px !important;
          font-size: 1rem !important;
          border-radius: var(--radius-sm) !important;
          background: #1e293b !important;
          color: white !important;
          font-weight: 600 !important;
          transition: transform 0.2s !important;
        }

        .connect-btn-container button:hover {
          transform: translateY(-1px);
          background: #0f172a !important;
        }

        .wallet-hint {
          font-size: 0.8rem;
          color: #94a3b8;
          text-align: center;
        }

        .divider-container {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .divider-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }

        .input-group {
          margin-bottom: 24px;
        }

        .input-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }

        .auth-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          border: 1px solid #cbd5e1;
          background: #fff;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .auth-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }

        .auth-footer-help {
          text-align: center;
          margin-top: 32px;
          font-size: 0.9rem;
          color: #64748b;
        }

        .auth-footer-help a {
          color: var(--color-primary);
          font-weight: 600;
        }

        .full-width { width: 100%; }

        @media (max-width: 1024px) {
          .login-wrapper {
            grid-template-columns: 1fr;
          }
          .login-left { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Login;
