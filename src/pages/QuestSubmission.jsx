import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCurrentAccount } from '@mysten/dapp-kit';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard
import { ArrowLeft, Link as LinkIcon, Send, Wallet, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

/**
 * QuestSubmission Page - Redesigned for a formal, professional FinTech entry.
 * Follows the First Dollar style with sharp layouts and clear verification steps.
 */
const QuestSubmission = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { bounties, joinBounty } = useData();
    const currentAccount = useCurrentAccount();
    const walletAddress = currentAccount?.address;
    const isConnected = !!currentAccount;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionLink, setSubmissionLink] = useState('');
    const [summary, setSummary] = useState('');

    const quest = bounties?.find(b => b.id.toString() === id);

    if (!quest) {
        return (
            <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '16px' }}>Quest not found</h2>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>Return to Gallery</button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isConnected) {
            alert("Please connect your Sui wallet (Slush) to proceed with submission.");
            return;
        }

        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        joinBounty(quest.id, {
            submissionLink,
            summary,
            walletAddress: walletAddress || '0x...',
            submittedAt: new Date().toISOString()
        });

        navigate('/quest/' + id);
    };

    return (
        <div className="submission-wrapper animate-fade-in">
            <button className="breadcrumb-back" onClick={() => navigate(-1)} style={{ marginBottom: '32px' }}>
                <ArrowLeft size={16} /> Back to Asset Details
            </button>

            <div className="submission-content">
                <header className="submission-header-sharp">
                    <span className="submission-badge">FORMAL SUBMISSION</span>
                    <h1 className="submission-title">Submit Contribution</h1>
                    <p className="submission-subtitle">Project: <strong>{quest.title}</strong></p>
                </header>

                <SharpCard className="submission-form-sharp">
                    <form onSubmit={handleSubmit}>
                        {/* 1. Network Identity */}
                        <div className="form-section">
                            <h3 className="section-h-small">1. VERIFY IDENTITY</h3>
                            <div className={`identity-display-box ${isConnected ? 'verified' : 'unverified'}`}>
                                <div className="identity-icon">
                                    {isConnected ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                </div>
                                <div className="identity-text">
                                    <p className="id-label">{isConnected ? 'SUI WALLET CONNECTED' : 'WALLET DISCONNECTED'}</p>
                                    <p className="id-val monospaced">
                                        {isConnected 
                                            ? `${walletAddress.substring(0, 16)}...${walletAddress.substring(walletAddress.length - 12)}`
                                            : 'Please connect via Slush Wallet'}
                                    </p>
                                </div>
                            </div>
                            <p className="form-help">Your wallet address will be used for reward distribution upon approval.</p>
                        </div>

                        {/* 2. Asset Link */}
                        <div className="form-section">
                            <h3 className="section-h-small">2. CONTRIBUTION ASSETS</h3>
                            <div className="field-group">
                                <label className="field-label">Reference URL (GitHub, Doc, Design)</label>
                                <div className="input-with-icon">
                                    <LinkIcon size={18} className="field-icon" />
                                    <input
                                        type="url"
                                        placeholder="https://github.com/org/repo/pull/1"
                                        className="sharp-input"
                                        required
                                        value={submissionLink}
                                        onChange={(e) => setSubmissionLink(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="field-group">
                                <label className="field-label">Executive Summary</label>
                                <div className="input-with-icon top">
                                    <FileText size={18} className="field-icon" />
                                    <textarea
                                        placeholder="Briefly describe your contribution and key outcomes..."
                                        className="sharp-textarea"
                                        rows={4}
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Execution */}
                        <div className="form-action-area">
                            <button
                                type="submit"
                                className="btn btn-primary full-width large-btn"
                                disabled={isSubmitting || !isConnected}
                            >
                                {isSubmitting ? (
                                    <>Processing Submission...</>
                                ) : (
                                    <>Finalize Submission <Send size={16} /></>
                                )}
                            </button>
                            <p className="terms-text">
                                By submitting, you agree to the Sui-gig contribution guidelines and authorize the network to verify your work.
                            </p>
                        </div>
                    </form>
                </SharpCard>
            </div>

            <style>{`
                .submission-wrapper {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .submission-header-sharp {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .submission-badge {
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    color: var(--color-primary);
                    background: var(--color-primary-soft);
                    padding: 4px 12px;
                    border-radius: 4px;
                    border: 1px solid rgba(37, 99, 235, 0.1);
                }

                .submission-title {
                    font-size: 2.25rem;
                    font-weight: 800;
                    margin: 16px 0 8px;
                    letter-spacing: -0.02em;
                }

                .submission-subtitle {
                    color: var(--color-text-secondary);
                    font-size: 1rem;
                }

                .submission-form-sharp {
                    padding: 48px !important;
                }

                .form-section {
                    margin-bottom: 40px;
                }

                .section-h-small {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--color-text-muted);
                    margin-bottom: 16px;
                    letter-spacing: 0.05em;
                }

                .identity-display-box {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 16px 20px;
                    border-radius: var(--radius-md);
                    border: 1px solid var(--color-border);
                    background: #f8fafc;
                }

                .identity-display-box.verified {
                    border-color: #bbf7d0;
                    background: #f0fdf4;
                }

                .identity-display-box.verified .identity-icon { color: #16a34a; }
                .identity-display-box.unverified .identity-icon { color: #ef4444; }

                .id-label { font-size: 0.7rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 4px; }
                .id-val { font-size: 0.9rem; font-weight: 700; color: var(--color-text); }
                .monospaced { font-family: monospace; }

                .form-help { font-size: 0.8rem; color: var(--color-text-muted); margin-top: 12px; }

                .field-group { margin-bottom: 24px; }

                .field-label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--color-text-secondary);
                    margin-bottom: 10px;
                }

                .input-with-icon {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius-md);
                    padding: 0 16px;
                    transition: all 0.2s;
                }

                .input-with-icon.top { align-items: flex-start; padding-top: 14px; }

                .input-with-icon:focus-within {
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 4px var(--color-primary-soft);
                }

                .field-icon { color: var(--color-text-muted); }

                .sharp-input, .sharp-textarea {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    padding: 14px 0;
                    font-size: 1rem;
                    color: var(--color-text);
                    font-family: inherit;
                }

                .large-btn { padding: 18px !important; font-size: 1.1rem !important; }

                .terms-text {
                    text-align: center;
                    font-size: 0.75rem;
                    line-height: 1.5;
                    color: var(--color-text-muted);
                    margin-top: 24px;
                    max-width: 480px;
                    margin-left: auto;
                    margin-right: auto;
                }

                @media (max-width: 640px) {
                    .submission-form-sharp { padding: 32px 24px !important; }
                }
            `}</style>
        </div>
    );
};

export default QuestSubmission;
