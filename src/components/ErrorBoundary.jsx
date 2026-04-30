import React from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="wizz-error-viewport">
                    <div className="error-card-v4 glass-pill-v4 animate-scale-up">
                        <div className="error-icon-v4">
                            <AlertCircle size={48} />
                        </div>
                        <h2>System <span>Disruption</span></h2>
                        <p>We've encountered an unexpected operational anomaly. Our engineers have been alerted.</p>
                        
                        <div className="error-details-v4">
                            <code>{this.state.error && this.state.error.toString()}</code>
                        </div>

                        <div className="error-actions-v4">
                            <button className="wizz-btn-primary" onClick={() => window.location.reload()}>
                                <RotateCcw size={18} /> Restore Engine
                            </button>
                            <button className="wizz-btn-outline" onClick={() => window.location.href = '/'}>
                                <Home size={18} /> Return Home
                            </button>
                        </div>
                    </div>

                    <style>{`
                        .wizz-error-viewport {
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: var(--color-bg);
                            padding: 24px;
                            background-image: radial-gradient(at 50% 50%, rgba(99, 102, 241, 0.05) 0px, transparent 50%);
                        }
                        .error-card-v4 {
                            max-width: 500px;
                            width: 100%;
                            padding: 48px !important;
                            text-align: center;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            background: white !important;
                        }
                        .error-icon-v4 {
                            width: 80px;
                            height: 80px;
                            background: #FEF2F2;
                            color: #EF4444;
                            border-radius: 24px !important;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            margin-bottom: 24px;
                        }
                        .error-card-v4 h2 { font-size: 2rem; font-weight: 800; margin-bottom: 12px; }
                        .error-card-v4 h2 span { color: var(--color-primary); }
                        .error-card-v4 p { color: var(--color-text-secondary); margin-bottom: 32px; font-weight: 400; }
                        
                        .error-details-v4 {
                            width: 100%;
                            background: var(--color-bg-secondary);
                            padding: 16px;
                            border-radius: 12px !important;
                            margin-bottom: 32px;
                            text-align: left;
                            font-size: 0.8rem;
                            overflow-x: auto;
                        }
                        .error-details-v4 code { color: #f43f5e; font-family: var(--font-mono); font-weight: 400; }

                        .error-actions-v4 { display: flex; gap: 16px; width: 100%; }
                        .error-actions-v4 button { flex: 1; }
                    `}</style>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
