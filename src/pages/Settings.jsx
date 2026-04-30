import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Wallet, ChevronRight, Save, AlertCircle, CheckCircle, Moon, Sun, Globe, Lock, Mail, Zap, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TABS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
];

const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: '',
        website: '',
        notifications_quests: true,
        notifications_updates: true,
        notifications_marketing: false,
        two_factor: false,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const toggle = (key) => setForm(f => ({ ...f, [key]: !f[key] }));

    return (
        <div className="settings-page">
            <div className="settings-glow-1" />
            <div className="settings-glow-2" />

            {/* Page header */}
            <header className="settings-header">
                <h1 className="settings-title">Settings</h1>
                <p className="settings-sub">Manage your account, preferences, and security.</p>
            </header>

            <div className="settings-layout">
                {/* Sidebar nav */}
                <nav className="settings-nav">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            className={`settings-nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                            <ChevronRight size={14} className="nav-arrow" />
                        </button>
                    ))}
                </nav>

                {/* Content panel */}
                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="settings-panel">
                            <div className="panel-header">
                                <h2>Profile Information</h2>
                                <p>Update your public profile details</p>
                            </div>

                            {/* Avatar */}
                            <div className="avatar-section">
                                <div className="settings-avatar">
                                    {user?.name?.charAt(0) || 'S'}
                                </div>
                                <div className="avatar-actions">
                                    <button className="ava-upload-btn"><Zap size={15} /> Change Avatar</button>
                                    <span className="ava-hint">JPG, PNG or GIF. Max 2MB.</span>
                                </div>
                            </div>

                            <div className="settings-form">
                                <div className="form-row-2">
                                    <div className="form-field">
                                        <label>Display Name</label>
                                        <div className="settings-input-wrap">
                                            <input
                                                value={form.name}
                                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                placeholder="Your display name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label>Email Address</label>
                                        <div className="settings-input-wrap">
                                            <Mail size={16} className="field-icon" />
                                            <input
                                                value={form.email}
                                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                                placeholder="your@email.com"
                                                type="email"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Bio</label>
                                    <div className="settings-textarea-wrap">
                                        <textarea
                                            value={form.bio}
                                            onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                                            placeholder="Tell the community about yourself..."
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Website</label>
                                    <div className="settings-input-wrap">
                                        <Globe size={16} className="field-icon" />
                                        <input
                                            value={form.website}
                                            onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                                            placeholder="https://yoursite.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'notifications' && (
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="settings-panel">
                            <div className="panel-header">
                                <h2>Notifications</h2>
                                <p>Control what alerts you receive</p>
                            </div>
                            <div className="toggle-list">
                                {[
                                    { key: 'notifications_quests', label: 'New Quests', desc: 'Get notified when new missions match your skills' },
                                    { key: 'notifications_updates', label: 'Status Updates', desc: 'Receive updates on your quest submissions' },
                                    { key: 'notifications_marketing', label: 'Announcements', desc: 'Platform news and ecosystem updates' },
                                ].map(item => (
                                    <div key={item.key} className="toggle-row">
                                        <div className="toggle-info">
                                            <span className="toggle-label">{item.label}</span>
                                            <span className="toggle-desc">{item.desc}</span>
                                        </div>
                                        <button
                                            className={`toggle-switch ${form[item.key] ? 'on' : ''}`}
                                            onClick={() => toggle(item.key)}
                                        >
                                            <span className="toggle-knob" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'security' && (
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="settings-panel">
                            <div className="panel-header">
                                <h2>Security</h2>
                                <p>Protect your account and assets</p>
                            </div>
                            <div className="toggle-list">
                                <div className="toggle-row">
                                    <div className="toggle-info">
                                        <span className="toggle-label">Two-Factor Authentication</span>
                                        <span className="toggle-desc">Add an extra layer of security to your account</span>
                                    </div>
                                    <button
                                        className={`toggle-switch ${form.two_factor ? 'on' : ''}`}
                                        onClick={() => toggle('two_factor')}
                                    >
                                        <span className="toggle-knob" />
                                    </button>
                                </div>
                            </div>
                            <div className="security-info">
                                <Lock size={16} />
                                <span>Your wallet keys are never stored on our servers. All signing happens client-side.</span>
                            </div>

                            <div className="danger-zone">
                                <h3 className="dz-title"><AlertCircle size={16} /> Danger Zone</h3>
                                <div className="dz-row">
                                    <div>
                                        <span className="dz-label">Delete Account</span>
                                        <span className="dz-desc">Permanently remove your account and all data</span>
                                    </div>
                                    <button className="dz-btn"><Trash2 size={15} /> Delete</button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'wallet' && (
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="settings-panel">
                            <div className="panel-header">
                                <h2>Wallet</h2>
                                <p>Manage your connected wallets</p>
                            </div>
                            {user?.walletAddress ? (
                                <div className="wallet-connected-card">
                                    <div className="wcc-icon"><Wallet size={24} /></div>
                                    <div className="wcc-info">
                                        <span className="wcc-label">Connected Wallet</span>
                                        <span className="wcc-addr">{user.walletAddress}</span>
                                    </div>
                                    <span className="wcc-badge"><CheckCircle size={14} /> Active</span>
                                </div>
                            ) : (
                                <div className="wallet-empty">
                                    <Wallet size={40} />
                                    <h3>No wallet connected</h3>
                                    <p>Connect a Sui-compatible wallet to start earning.</p>
                                    <button className="wallet-connect-cta">Connect Wallet</button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Save button */}
                    <div className="settings-save-row">
                        <button className={`settings-save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
                            {saved ? (<><CheckCircle size={16} /> Saved!</>) : (<><Save size={16} /> Save Changes</>)}
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .settings-page {
                    padding: 120px 32px 80px; max-width: 1100px;
                    margin: 0 auto; position: relative;
                }
                .settings-glow-1, .settings-glow-2 {
                    position: fixed; width: 500px; height: 500px;
                    border-radius: 50%; filter: blur(100px); opacity: 0.05; z-index: -1; pointer-events: none;
                }
                .settings-glow-1 { top: -80px; right: -80px; background: var(--color-primary); }
                .settings-glow-2 { bottom: -80px; left: -80px; background: var(--color-accent); }

                /* Header */
                .settings-header { margin-bottom: 40px; }
                .settings-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 8px; }
                .settings-sub { font-size: 1rem; color: var(--color-text-secondary); font-weight: 400; }

                /* Layout */
                .settings-layout { display: grid; grid-template-columns: 240px 1fr; gap: 28px; }

                /* Nav */
                .settings-nav {
                    background: white; border: 1px solid var(--color-border);
                    border-radius: 24px; padding: 12px; display: flex; flex-direction: column;
                    gap: 4px; height: fit-content; box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }
                .settings-nav-btn {
                    display: flex; align-items: center; gap: 12px; padding: 13px 16px;
                    border-radius: 14px; font-size: 0.9rem; font-weight: 700;
                    color: var(--color-text-secondary); cursor: pointer; transition: all 0.2s;
                    text-align: left; width: 100%;
                }
                .settings-nav-btn:hover { background: var(--color-primary-soft); color: var(--color-primary); }
                .settings-nav-btn.active { background: var(--color-primary); color: white; }
                .nav-arrow { margin-left: auto; opacity: 0.4; }
                .settings-nav-btn.active .nav-arrow { opacity: 0.7; }

                /* Panel */
                .settings-content { display: flex; flex-direction: column; gap: 20px; }
                .settings-panel {
                    background: white; border: 1px solid var(--color-border); border-radius: 28px;
                    overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                }
                .panel-header { padding: 32px 36px 24px; border-bottom: 1px solid var(--color-border); }
                .panel-header h2 { font-size: 1.3rem; font-weight: 800; margin-bottom: 4px; }
                .panel-header p { font-size: 0.9rem; color: var(--color-text-secondary); font-weight: 400; }

                /* Avatar */
                .avatar-section {
                    display: flex; align-items: center; gap: 24px;
                    padding: 28px 36px; border-bottom: 1px solid var(--color-border);
                }
                .settings-avatar {
                    width: 80px; height: 80px; border-radius: 20px; flex-shrink: 0;
                    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                    color: white; font-size: 2rem; font-weight: 800;
                    display: flex; align-items: center; justify-content: center;
                }
                .ava-upload-btn {
                    display: flex; align-items: center; gap: 8px; padding: 10px 20px;
                    border: 1.5px solid var(--color-border); border-radius: 12px;
                    font-weight: 700; font-size: 0.88rem; cursor: pointer; transition: all 0.2s;
                }
                .ava-upload-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
                .ava-hint { display: block; font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; margin-top: 6px; }

                /* Form */
                .settings-form { padding: 28px 36px; display: flex; flex-direction: column; gap: 20px; }
                .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .form-field { display: flex; flex-direction: column; gap: 8px; }
                .form-field label { font-size: 0.85rem; font-weight: 800; color: var(--color-text); }
                .settings-input-wrap {
                    display: flex; align-items: center; gap: 10px; padding: 0 16px; height: 52px;
                    background: var(--color-bg-secondary); border: 2px solid transparent;
                    border-radius: 14px; transition: all 0.2s;
                }
                .settings-input-wrap:focus-within {
                    border-color: var(--color-primary); background: white;
                    box-shadow: 0 0 0 4px var(--color-primary-soft);
                }
                .settings-input-wrap input {
                    flex: 1; border: none; background: transparent; outline: none;
                    font-size: 0.95rem; font-weight: 400; color: var(--color-text);
                    font-family: var(--font-main);
                }
                .field-icon { color: var(--color-text-muted); flex-shrink: 0; }
                .settings-textarea-wrap {
                    background: var(--color-bg-secondary); border: 2px solid transparent;
                    border-radius: 14px; overflow: hidden; transition: all 0.2s;
                }
                .settings-textarea-wrap:focus-within {
                    border-color: var(--color-primary); background: white;
                    box-shadow: 0 0 0 4px var(--color-primary-soft);
                }
                .settings-textarea-wrap textarea {
                    width: 100%; padding: 14px 16px; border: none; background: transparent;
                    outline: none; resize: none; font-size: 0.95rem; font-weight: 400;
                    color: var(--color-text); font-family: var(--font-main); line-height: 1.6;
                }

                /* Toggles */
                .toggle-list { padding: 8px 0; }
                .toggle-row {
                    display: flex; align-items: center; justify-content: space-between;
                    gap: 24px; padding: 20px 36px; border-bottom: 1px solid var(--color-border);
                    transition: background 0.15s;
                }
                .toggle-row:last-child { border-bottom: none; }
                .toggle-row:hover { background: var(--color-bg-secondary); }
                .toggle-info { flex: 1; }
                .toggle-label { display: block; font-size: 0.95rem; font-weight: 800; color: var(--color-text); margin-bottom: 4px; }
                .toggle-desc { font-size: 0.82rem; color: var(--color-text-muted); font-weight: 400; }

                .toggle-switch {
                    width: 52px; height: 28px; border-radius: 9999px;
                    background: var(--color-border); position: relative;
                    cursor: pointer; transition: background 0.25s; flex-shrink: 0;
                }
                .toggle-switch.on { background: var(--color-primary); }
                .toggle-knob {
                    position: absolute; top: 3px; left: 3px;
                    width: 22px; height: 22px; border-radius: 50%;
                    background: white; transition: transform 0.25s;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                }
                .toggle-switch.on .toggle-knob { transform: translateX(24px); }

                /* Security */
                .security-info {
                    display: flex; align-items: center; gap: 10px; padding: 16px 36px 24px;
                    font-size: 0.82rem; font-weight: 700; color: #10B981;
                }
                .danger-zone {
                    margin: 0 36px 32px; padding: 24px; background: #FEF2F2;
                    border: 1px solid #FEE2E2; border-radius: 16px;
                }
                .dz-title {
                    display: flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 800;
                    color: #DC2626; margin-bottom: 20px;
                }
                .dz-row { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
                .dz-label { display: block; font-size: 0.92rem; font-weight: 800; color: #DC2626; margin-bottom: 4px; }
                .dz-desc { font-size: 0.8rem; color: #EF4444; font-weight: 400; }
                .dz-btn {
                    display: flex; align-items: center; gap: 8px; padding: 10px 20px;
                    background: #DC2626; color: white; border-radius: 10px;
                    font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s; flex-shrink: 0;
                }
                .dz-btn:hover { background: #B91C1C; }

                /* Wallet */
                .wallet-connected-card {
                    display: flex; align-items: center; gap: 16px; padding: 28px 36px;
                }
                .wcc-icon {
                    width: 52px; height: 52px; border-radius: 14px;
                    background: var(--color-primary-soft); color: var(--color-primary);
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .wcc-info { flex: 1; min-width: 0; }
                .wcc-label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em; }
                .wcc-addr { font-family: var(--font-mono); font-size: 0.85rem; font-weight: 400; color: var(--color-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block; }
                .wcc-badge {
                    display: flex; align-items: center; gap: 6px; padding: 6px 14px;
                    background: rgba(16,185,129,0.08); color: #10B981;
                    border-radius: 9999px; font-size: 0.8rem; font-weight: 800; flex-shrink: 0;
                }
                .wallet-empty {
                    display: flex; flex-direction: column; align-items: center; padding: 60px 40px;
                    text-align: center; color: var(--color-text-muted);
                }
                .wallet-empty h3 { font-size: 1.3rem; font-weight: 800; color: var(--color-text); margin: 20px 0 8px; }
                .wallet-connect-cta {
                    margin-top: 24px; padding: 14px 32px; background: var(--color-primary); color: white;
                    border-radius: 14px; font-weight: 700; cursor: pointer;
                }

                /* Save */
                .settings-save-row { display: flex; justify-content: flex-end; }
                .settings-save-btn {
                    display: flex; align-items: center; gap: 10px; padding: 14px 32px;
                    background: var(--color-primary); color: white; border-radius: 14px;
                    font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s;
                    box-shadow: 0 6px 20px rgba(99,102,241,0.25);
                }
                .settings-save-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(99,102,241,0.35); }
                .settings-save-btn.saved { background: #10B981; box-shadow: 0 6px 20px rgba(16,185,129,0.25); }

                @media (max-width: 900px) {
                    .settings-layout { grid-template-columns: 1fr; }
                    .settings-nav { flex-direction: row; flex-wrap: wrap; border-radius: 20px; }
                    .settings-nav-btn { flex: 1; min-width: 120px; justify-content: center; }
                    .nav-arrow { display: none; }
                }
                @media (max-width: 640px) {
                    .settings-page { padding: 100px 16px 60px; }
                    .form-row-2 { grid-template-columns: 1fr; }
                    .settings-form, .toggle-row, .wallet-connected-card { padding-left: 20px; padding-right: 20px; }
                }
            `}</style>
        </div>
    );
};

export default Settings;
