import React, { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, Check, ChevronDown } from 'lucide-react';

const Jobs = () => {
    const [selectedRoles, setSelectedRoles] = useState(['Design & UX']);
    const [selectedTypes, setSelectedTypes] = useState(['Full-time']);
    const [selectedExperience, setSelectedExperience] = useState(['Mid-Senior (3-5y)']);

    const toggleFilter = (state, setState, val) => {
        if (state.includes(val)) {
            setState(state.filter(s => s !== val));
        } else {
            setState([...state, val]);
        }
    };

    const jobs = [
        {
            id: 1,
            title: 'Full Stack Developer',
            company: 'Rift Tide Labs',
            location: 'Remote (Global)',
            type: 'Full-time',
            salary: '$120k - $180k',
            posted: '2 days ago',
            tags: ['React', 'Rust', 'Sui']
        },
        {
            id: 2,
            title: 'Smart Contract Auditor',
            company: 'Shield Pulse',
            location: 'New York, US',
            type: 'Contract',
            salary: '$800 - $1200 / day',
            posted: '5h ago',
            tags: ['Move', 'Security', 'Audit']
        },
        {
            id: 3,
            title: 'Lead Product Designer',
            company: 'Rift Network',
            location: 'Remote (Global)',
            type: 'Full-time',
            salary: '$140k - $200k',
            posted: '1 day ago',
            tags: ['UI/UX', 'Figma', 'Web3']
        }
    ];

    return (
        <div className="jobs-page-rift">
            <div className="page-header-rift">
                <div className="header-text">
                    <h1>Active <span>Roles</span></h1>
                    <p>Connect with top protocols and build the future of Web3.</p>
                </div>
                <div className="job-stats">
                    <div className="stat-pill">
                        <span className="dot" />
                        1,248 Openings
                    </div>
                </div>
            </div>

            <div className="jobs-main-layout">
                {/* Filters Sidebar */}
                <aside className="filters-sidebar">
                    <div className="filter-group-header">
                        <h3>Filters</h3>
                        <button className="clear-btn" onClick={() => { setSelectedRoles([]); setSelectedTypes([]); setSelectedExperience([]); }}>Clear all</button>
                    </div>

                    <div className="filter-section">
                        <h4>ROLE TYPE</h4>
                        <div className="filter-options">
                            {['Engineering (Dev)', 'Design & UX', 'Marketing & Growth'].map(role => (
                                <label key={role} className="filter-label">
                                    <div className={`checkbox ${selectedRoles.includes(role) ? 'checked' : ''}`} onClick={() => toggleFilter(selectedRoles, setSelectedRoles, role)}>
                                        {selectedRoles.includes(role) && <Check size={12} />}
                                    </div>
                                    <span>{role}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>JOB TYPE</h4>
                        <div className="filter-options">
                            {['Full-time', 'Contract / Project'].map(type => (
                                <label key={type} className="filter-label">
                                    <div className={`radio ${selectedTypes.includes(type) ? 'checked' : ''}`} onClick={() => setSelectedTypes([type])}>
                                        <div className="radio-inner" />
                                    </div>
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h4>EXPERIENCE</h4>
                        <div className="filter-options">
                            {['Junior (1-2y)', 'Mid-Senior (3-5y)', 'Lead / Principal (6y+)'].map(exp => (
                                <label key={exp} className="filter-label">
                                    <div className={`checkbox ${selectedExperience.includes(exp) ? 'checked' : ''}`} onClick={() => toggleFilter(selectedExperience, setSelectedExperience, exp)}>
                                        {selectedExperience.includes(exp) && <Check size={12} />}
                                    </div>
                                    <span>{exp}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="jobs-content-area">
                    <div className="search-box-rift">
                        <Search size={20} />
                        <input type="text" placeholder="Search roles, skills, or companies..." />
                        <button className="search-btn">Search</button>
                    </div>

                    <div className="jobs-list">
                        {jobs.map(job => (
                            <div key={job.id} className="job-card-rift">
                                <div className="job-main-info">
                                    <div className="company-logo">
                                        <Briefcase size={28} />
                                    </div>
                                    <div className="job-details">
                                        <h3>{job.title}</h3>
                                        <p className="company-name">{job.company} <Check size={14} className="verified" /></p>
                                        <div className="job-meta">
                                            <span><MapPin size={14} /> {job.location}</span>
                                            <span><DollarSign size={14} /> {job.salary}</span>
                                            <span><Clock size={14} /> {job.posted}</span>
                                        </div>
                                        <div className="job-tags-rift">
                                            {job.tags.map(tag => (
                                                <span key={tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button className="apply-btn-rift">Apply Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .jobs-page-rift {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .page-header-rift {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 48px;
                }

                .header-text h1 {
                    font-size: 3rem;
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    margin-bottom: 8px;
                }

                .header-text h1 span {
                    color: var(--color-primary);
                }

                .header-text p {
                    color: #64748B;
                    font-size: 1.1rem;
                    font-weight: 500;
                }

                .stat-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    font-weight: 800;
                }

                .stat-pill .dot {
                    width: 8px;
                    height: 8px;
                    background: #10B981;
                    border-radius: 50%;
                }

                .jobs-main-layout {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 40px;
                }

                /* Sidebar */
                .filters-sidebar {
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 24px;
                    padding: 24px;
                    height: fit-content;
                    position: sticky;
                    top: 100px;
                }

                .filter-group-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 32px;
                }

                .filter-group-header h3 {
                    font-size: 1rem;
                    font-weight: 800;
                }

                .clear-btn {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .filter-section {
                    margin-bottom: 32px;
                }

                .filter-section h4 {
                    font-size: 0.7rem;
                    font-weight: 800;
                    color: #94A3B8;
                    letter-spacing: 0.1em;
                    margin-bottom: 16px;
                    text-transform: uppercase;
                }

                .filter-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .filter-label {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #475569;
                    transition: all 0.2s;
                }

                .filter-label:hover {
                    color: #0F172A;
                }

                .checkbox {
                    width: 20px;
                    height: 20px;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .checkbox.checked {
                    background: var(--color-primary);
                    border-color: var(--color-primary);
                    color: white;
                }

                .radio {
                    width: 20px;
                    height: 20px;
                    border: 1.5px solid #E2E8F0;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }

                .radio.checked {
                    border-color: var(--color-primary);
                }

                .radio-inner {
                    width: 10px;
                    height: 10px;
                    background: var(--color-primary);
                    border-radius: 50%;
                    opacity: 0;
                    transform: scale(0.5);
                    transition: all 0.2s;
                }

                .radio.checked .radio-inner {
                    opacity: 1;
                    transform: scale(1);
                }

                /* Content Area */
                .search-box-rift {
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 20px;
                    padding: 8px 8px 8px 24px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 32px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }

                .search-box-rift input {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    font-weight: 500;
                }

                .search-btn {
                    padding: 12px 24px;
                    background: #0F172A;
                    color: white;
                    border: none;
                    border-radius: 14px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .jobs-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .job-card-rift {
                    background: white;
                    border: 1px solid #E2E8F0;
                    border-radius: 24px;
                    padding: 32px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.3s;
                }

                .job-card-rift:hover {
                    border-color: var(--color-primary);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.04);
                    transform: translateY(-2px);
                }

                .job-main-info {
                    display: flex;
                    gap: 24px;
                }

                .company-logo {
                    width: 64px;
                    height: 64px;
                    background: #F8FAFC;
                    border-radius: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--color-primary);
                }

                .job-details h3 {
                    font-size: 1.35rem;
                    font-weight: 800;
                    margin-bottom: 4px;
                }

                .company-name {
                    font-weight: 700;
                    color: #475569;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 16px;
                }

                .verified {
                    color: var(--color-primary);
                }

                .job-meta {
                    display: flex;
                    gap: 24px;
                    color: #64748B;
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                .job-meta span {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .job-tags-rift {
                    display: flex;
                    gap: 10px;
                }

                .job-tags-rift span {
                    padding: 6px 14px;
                    background: #F1F5F9;
                    border-radius: 99px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #475569;
                }

                .apply-btn-rift {
                    padding: 16px 32px;
                    background: var(--color-primary);
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-weight: 800;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .apply-btn-rift:hover {
                    box-shadow: 0 10px 20px -5px rgba(0, 209, 255, 0.4);
                    transform: scale(1.02);
                }

                @media (max-width: 1024px) {
                    .jobs-main-layout {
                        grid-template-columns: 1fr;
                    }
                    .filters-sidebar {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Jobs;
