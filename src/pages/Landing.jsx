import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../components/Common/BrandLogo';
import { ArrowRight, Compass, Briefcase, Calendar, Zap, Shield, Rocket, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container" style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: 'var(--font-main)' }}>
            {/* Top Navbar - Clean & Floating Style */}
            <nav style={{ 
                height: '80px', 
                background: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 5%',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <div className="nav-left" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <BrandLogo size={150} showText={false} />
                </div>

                <div className="nav-center" style={{ display: 'flex', gap: '40px' }}>
                    <a href="#bounties" style={{ color: '#0F172A', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Bounties</a>
                    <a href="#jobs" style={{ color: '#0F172A', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Jobs</a>
                    <a href="#events" style={{ color: '#0F172A', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>Events</a>
                </div>

                <div className="nav-right">
                    <button 
                        onClick={() => navigate('/login')}
                        style={{ 
                            background: '#0F172A', 
                            color: 'white', 
                            padding: '12px 32px', 
                            borderRadius: '14px', 
                            fontWeight: '800',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Login <ArrowRight size={18} />
                    </button>
                </div>
            </nav>

            {/* Hero Section - High Fidelity */}
            <header style={{ 
                padding: '120px 5%', 
                textAlign: 'center', 
                background: 'radial-gradient(circle at 50% -20%, rgba(0, 209, 255, 0.1) 0%, transparent 50%)',
                position: 'relative'
            }}>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        padding: '8px 16px', 
                        background: 'rgba(0, 209, 255, 0.05)', 
                        borderRadius: '99px',
                        color: 'var(--color-primary)',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        marginBottom: '32px',
                        border: '1px solid rgba(0, 209, 255, 0.1)'
                    }}>
                        <CheckCircle2 size={16} />
                        THE PREMIER SUI ECOSYSTEM HUB
                    </div>
                    
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '900', color: '#0B1120', marginBottom: '24px', lineHeight: '1.05', letterSpacing: '-0.04em' }}>
                        Your Skills are the Currency, <br />
                        <span style={{ color: 'var(--color-primary)' }}>Pick Your Bounty.</span>
                    </h1>
                    <p style={{ fontSize: '1.35rem', color: '#475569', maxWidth: '800px', margin: '0 auto 48px', lineHeight: '1.6', fontWeight: '500' }}>
                        Rift Tide is where the best builders on Sui meet the top projects. <br /> 
                        Work on what matters, earn what you deserve.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button 
                            onClick={() => navigate('/signup')}
                            style={{ 
                                padding: '18px 48px', 
                                background: 'var(--color-primary)', 
                                color: 'white', 
                                borderRadius: '18px', 
                                fontWeight: '800', 
                                fontSize: '1.1rem',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 20px 40px -10px rgba(0, 209, 255, 0.3)'
                            }}
                        >
                            Join the Tribe
                        </button>
                        <button 
                            style={{ 
                                padding: '18px 48px', 
                                background: 'white', 
                                color: '#0F172A', 
                                borderRadius: '18px', 
                                fontWeight: '800', 
                                fontSize: '1.1rem',
                                border: '1px solid #E2E8F0',
                                cursor: 'pointer'
                            }}
                        >
                            Explore Roles
                        </button>
                    </div>
                </motion.div>
                
                {/* Visual Decorative Element */}
                <div style={{ marginTop: '80px', position: 'relative' }}>
                    <div style={{ 
                        width: '1000px', 
                        height: '600px', 
                        background: '#FFFFFF', 
                        borderRadius: '40px', 
                        margin: '0 auto',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <img 
                            src="/dashboard-preview.png" 
                            alt="Dashboard Preview" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>
                </div>
            </header>

            {/* Final Footer */}
            <footer style={{ padding: '100px 5%', background: '#FFFFFF', borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
                <p style={{ color: '#64748B', fontWeight: '500' }}>© 2026 RIFT TIDE PROTOCOL. EMPOWERING BUILDERS ON SUI.</p>
                <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '32px' }}>
                    <a href="#" style={{ color: '#0F172A', fontWeight: '700', fontSize: '0.85rem' }}>TWITTER</a>
                    <a href="#" style={{ color: '#0F172A', fontWeight: '700', fontSize: '0.85rem' }}>DISCORD</a>
                    <a href="#" style={{ color: '#0F172A', fontWeight: '700', fontSize: '0.85rem' }}>GITHUB</a>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
