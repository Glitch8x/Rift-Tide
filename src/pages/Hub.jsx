import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, ExternalLink, Mail, Bell, Sparkles, Clock, Globe } from 'lucide-react';

const Hub = () => {
    const [activeFilter, setActiveFilter] = useState('All Events');

    const filters = ['All Events', 'Hackathons', 'Workshops', 'Conferences', 'Meetups'];

    const events = [
        {
            id: 1,
            type: 'Hackathon',
            date: 'MAY 20 - 22, 2026',
            title: 'Sui Basecamp Hackathon',
            desc: 'Builders gathering in Europe for high-intensity Sui Move development and networking.',
            location: 'Lisbon, Portugal',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
        },
        {
            id: 2,
            type: 'Workshop',
            date: 'JUNE 15, 2026',
            title: 'Move Language Deep Dive',
            desc: 'Master the fundamentals of Move and advanced smart contract patterns with core contributors.',
            location: 'Virtual / Global',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
        },
        {
            id: 3,
            type: 'Meetup',
            date: 'JULY 2, 2026',
            title: 'Web3 Gaming Night',
            desc: 'A night of networking and gameplay with the top studios building on the Sui network.',
            location: 'Seoul, South Korea',
            image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
        },
    ];

    return (
        <div className="events-rift">
            {/* ─── FEATURED BANNER ─── */}
            <section className="featured-event-banner">
                <div className="featured-overlay" />
                <div className="featured-content">
                    <div className="featured-badge">
                        <Sparkles size={14} />
                        <span>FEATURED HACKATHON</span>
                    </div>
                    <h1 className="featured-title">Sui Overflow 2026</h1>
                    <p className="featured-desc">
                        The flagship global virtual hackathon for the Sui ecosystem. $1,000,000+ in prizes across DeFi, AI, and Gaming tracks.
                    </p>
                    <div className="featured-meta">
                        <div className="f-meta-item">
                            <Calendar size={18} />
                            <span>April 1 - May 15, 2026</span>
                        </div>
                        <div className="f-meta-item">
                            <Globe size={18} />
                            <span>Global / Virtual</span>
                        </div>
                    </div>
                    <div className="featured-actions">
                        <button className="register-btn">REGISTER NOW</button>
                        <button className="details-btn">VIEW DETAILS</button>
                    </div>
                </div>
            </section>

            {/* ─── FILTERS ─── */}
            <div className="events-filters">
                {filters.map(f => (
                    <button 
                        key={f} 
                        className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f)}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* ─── MAIN GRID ─── */}
            <div className="events-main">
                <div className="events-grid">
                    {events.map(event => (
                        <motion.div 
                            key={event.id}
                            whileHover={{ y: -8 }}
                            className="event-card"
                        >
                            <div className="event-img">
                                <img src={event.image} alt={event.title} />
                                <span className="event-type-label">{event.type}</span>
                            </div>
                            <div className="event-info">
                                <span className="event-date">{event.date}</span>
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-desc">{event.desc}</p>
                                <div className="event-footer">
                                    <div className="e-location">
                                        <MapPin size={16} />
                                        <span>{event.location}</span>
                                    </div>
                                    <button className="e-register-link">
                                        REGISTER <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sidebar */}
                <aside className="events-sidebar">
                    <div className="sidebar-card anticipated">
                        <h4>MOST ANTICIPATED</h4>
                        <div className="anticipated-card">
                            <div className="a-img">
                                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" alt="" />
                            </div>
                            <div className="a-content">
                                <h5>Sui Speed Hack</h5>
                                <p>Building high-performance DeFi primitives in under 48 hours.</p>
                                <div className="a-meta">
                                    <span>$50,000 PRIZE</span>
                                    <span>•</span>
                                    <span>JULY 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar-card updates">
                        <div className="bell-icon">
                            <Bell size={24} />
                        </div>
                        <h4>NEVER MISS A WAVE</h4>
                        <p>Get the latest events and hackathons delivered to your inbox.</p>
                        <div className="subscribe-box">
                            <input type="email" placeholder="email@address.com" />
                            <button><ArrowRight size={18} /></button>
                        </div>
                    </div>
                </aside>
            </div>

            <style>{`
                .events-rift {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* Featured Banner */
                .featured-event-banner {
                    position: relative;
                    height: 480px;
                    background: url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000') center/cover;
                    border-radius: 32px;
                    overflow: hidden;
                    margin-bottom: 56px;
                    display: flex;
                    align-items: center;
                    padding: 0 64px;
                }

                .featured-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 100%);
                }

                .featured-content {
                    position: relative;
                    z-index: 1;
                    max-width: 600px;
                    color: white;
                }

                .featured-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: rgba(0, 209, 255, 0.2);
                    border: 1px solid rgba(0, 209, 255, 0.4);
                    border-radius: 8px;
                    color: #00D1FF;
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                    margin-bottom: 24px;
                }

                .featured-title {
                    font-size: 4rem;
                    font-weight: 800;
                    letter-spacing: -0.04em;
                    margin-bottom: 20px;
                    line-height: 1;
                }

                .featured-desc {
                    font-size: 1.15rem;
                    color: rgba(255,255,255,0.8);
                    margin-bottom: 32px;
                    line-height: 1.6;
                }

                .featured-meta {
                    display: flex;
                    gap: 32px;
                    margin-bottom: 40px;
                }

                .f-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    color: white;
                }

                .featured-actions {
                    display: flex;
                    gap: 16px;
                }

                .register-btn {
                    padding: 16px 32px;
                    background: #00D1FF;
                    color: #0F172A;
                    border-radius: 14px;
                    font-weight: 800;
                    font-size: 0.95rem;
                }

                .details-btn {
                    padding: 16px 32px;
                    background: rgba(255,255,255,0.1);
                    color: white;
                    border-radius: 14px;
                    font-weight: 800;
                    font-size: 0.95rem;
                    border: 1px solid rgba(255,255,255,0.2);
                }

                /* Filters */
                .events-filters {
                    display: flex;
                    gap: 12px;
                    margin-bottom: 48px;
                    flex-wrap: wrap;
                }

                .filter-btn {
                    padding: 10px 24px;
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: var(--color-text-secondary);
                    transition: all 0.2s;
                }

                .filter-btn:hover {
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                }

                .filter-btn.active {
                    background: #0F172A;
                    color: white;
                    border-color: #0F172A;
                }

                /* Main Content Grid */
                .events-main {
                    display: grid;
                    grid-template-columns: 1fr 340px;
                    gap: 40px;
                }

                .events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 32px;
                }

                .event-card {
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 24px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .event-img {
                    position: relative;
                    height: 200px;
                }

                .event-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .event-type-label {
                    position: absolute;
                    top: 16px;
                    left: 16px;
                    padding: 4px 12px;
                    background: white;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: var(--color-text);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .event-info {
                    padding: 24px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .event-date {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    letter-spacing: 0.05em;
                    margin-bottom: 12px;
                }

                .event-title {
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--color-text);
                    margin-bottom: 12px;
                    line-height: 1.3;
                }

                .event-desc {
                    font-size: 0.95rem;
                    color: var(--color-text-secondary);
                    line-height: 1.6;
                    margin-bottom: 24px;
                    flex: 1;
                }

                .event-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 20px;
                    border-top: 1px solid var(--color-border);
                }

                .e-location {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--color-text-secondary);
                }

                .e-register-link {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.85rem;
                    font-weight: 800;
                    color: var(--color-primary);
                }

                /* Sidebar */
                .events-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                .sidebar-card {
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 24px;
                    padding: 24px;
                }

                .sidebar-card h4 {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--color-text-muted);
                    letter-spacing: 0.1em;
                    margin-bottom: 20px;
                }

                .anticipated-card {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .a-img {
                    height: 140px;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .a-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .a-content h5 {
                    font-size: 1.1rem;
                    font-weight: 800;
                    margin-bottom: 8px;
                }

                .a-content p {
                    font-size: 0.85rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 12px;
                    line-height: 1.5;
                }

                .a-meta {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: var(--color-primary);
                }

                .updates {
                    background: #F8FAFC;
                    text-align: center;
                }

                .bell-icon {
                    width: 56px;
                    height: 56px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    color: var(--color-primary);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }

                .updates p {
                    font-size: 0.9rem;
                    color: var(--color-text-secondary);
                    margin-bottom: 24px;
                    line-height: 1.5;
                }

                .subscribe-box {
                    display: flex;
                    background: white;
                    border: 1px solid var(--color-border);
                    border-radius: 12px;
                    padding: 4px;
                }

                .subscribe-box input {
                    flex: 1;
                    border: none;
                    padding: 10px 12px;
                    font-size: 0.85rem;
                    outline: none;
                }

                .subscribe-box button {
                    width: 40px;
                    height: 40px;
                    background: #0F172A;
                    color: white;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @media (max-width: 1024px) {
                    .events-main {
                        grid-template-columns: 1fr;
                    }
                    .featured-title {
                        font-size: 2.5rem;
                    }
                    .featured-event-banner {
                        height: auto;
                        padding: 64px 32px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Hub;
