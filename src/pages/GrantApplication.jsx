import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import SharpCard from '../components/UI/GlassCard'; // Now SharpCard
import { ArrowLeft, UploadCloud, Link as LinkIcon, Send, FileText, Globe } from 'lucide-react';

/**
 * GrantApplication Page - Redesigned for a formal, high-stakes funding entry.
 * Follows the First Dollar style with sharp layouts and clear verification steps.
 */
const GrantApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { grants, applyGrant } = useData();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        projectLink: '',
        details: '',
        cvFile: null
    });

    const grant = grants?.find(g => g.id.toString() === id);

    if (!grant) {
        return (
            <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '16px' }}>Funding program not found</h2>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>Return to Programs</button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({ ...prev, cvFile: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        applyGrant(grant.id, {
            ...formData,
            submittedAt: new Date().toISOString()
        });

        navigate('/grants');
    };

    return (
        <div className="application-wrapper animate-fade-in">
            <button className="breadcrumb-back" onClick={() => navigate(-1)} style={{ marginBottom: '32px' }}>
                <ArrowLeft size={16} /> Back to Funding Programs
            </button>

            <div className="application-content">
                <header className="application-header-sharp">
                    <span className="application-badge">GRANT APPLICATION</span>
                    <h1 className="application-title">Apply for Funding</h1>
                    <p className="application-subtitle">Program: <strong>{grant.title}</strong> • {grant.amount}</p>
                </header>

                <SharpCard className="application-form-sharp">
                    <form onSubmit={handleSubmit}>
                        {/* 1. Project Links */}
                        <div className="form-section">
                            <h3 className="section-h-small">1. PROJECT RESOURCES</h3>
                            <div className="field-group">
                                <label className="field-label">Portfolio or Project Repository</label>
                                <div className="input-with-icon">
                                    <Globe size={18} className="field-icon" />
                                    <input
                                        type="url"
                                        name="projectLink"
                                        placeholder="https://github.com/org/project"
                                        className="sharp-input"
                                        required
                                        value={formData.projectLink}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Documentation */}
                        <div className="form-section">
                            <h3 className="section-h-small">2. SUPPORTING DOCUMENTATION</h3>
                            <div className="field-group">
                                <label className="field-label">CV or Pitch Deck (PDF)</label>
                                <input
                                    type="file"
                                    id="cv-upload-sharp"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    hidden
                                />
                                <label htmlFor="cv-upload-sharp" className="sharp-upload-area">
                                    <UploadCloud size={24} className="upload-icon" />
                                    <div className="upload-text">
                                        <span className="upload-main">{formData.cvFile ? formData.cvFile.name : "Click to select file"}</span>
                                        <span className="upload-sub">Maximum file size: 10MB</span>
                                    </div>
                                </label>
                            </div>

                            <div className="field-group">
                                <label className="field-label">Proposal Executive Summary</label>
                                <div className="input-with-icon top">
                                    <FileText size={18} className="field-icon" />
                                    <textarea
                                        name="details"
                                        placeholder="Outline your project goals and how the funding will be utilized..."
                                        className="sharp-textarea"
                                        rows={6}
                                        value={formData.details}
                                        onChange={handleChange}
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
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>Processing Application...</>
                                ) : (
                                    <>Submit Final Application <Send size={16} /></>
                                )}
                            </button>
                            <p className="terms-text">
                                All grant applications are reviewed by the SUI Foundation committee. You will be notified of the decision via your registered account profile.
                            </p>
                        </div>
                    </form>
                </SharpCard>
            </div>

            <style>{`
                .application-wrapper {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .application-header-sharp {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .application-badge {
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    color: var(--color-primary);
                    background: var(--color-primary-soft);
                    padding: 4px 12px;
                    border-radius: 4px;
                    border: 1px solid rgba(37, 99, 235, 0.1);
                }

                .application-title {
                    font-size: 2.25rem;
                    font-weight: 800;
                    margin: 16px 0 8px;
                    letter-spacing: -0.02em;
                }

                .application-subtitle {
                    color: var(--color-text-secondary);
                    font-size: 1rem;
                }

                .application-form-sharp {
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

                .sharp-upload-area {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 24px;
                    border: 1px dashed var(--color-border);
                    border-radius: var(--radius-md);
                    background: #f8fafc;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .sharp-upload-area:hover {
                    background: #f1f5f9;
                    border-color: var(--color-text-muted);
                }

                .upload-icon { color: var(--color-primary); }
                .upload-main { display: block; font-weight: 700; font-size: 0.95rem; color: var(--color-text); }
                .upload-sub { font-size: 0.75rem; color: var(--color-text-muted); }

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
                    .application-form-sharp { padding: 32px 24px !important; }
                }
            `}</style>
        </div>
    );
};

export default GrantApplication;
