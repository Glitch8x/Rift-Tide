import React from 'react';

const BrandLogo = ({ size = 32, showText = false, light = false, boxed = false }) => {
    // The logo image is horizontal (emblem + text). 
    // We'll treat 'size' as the height to ensure it fits the nav/sidebar rows.
    const height = size;

    return (
        <div 
            className={`rift-logo-container ${light ? 'light' : ''} ${boxed ? 'boxed' : ''}`} 
            style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                height: `${height}px`
            }}
        >
            <img 
                src="/rift-tide-logo.png" 
                alt="Rift Tide" 
                style={{ 
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 0 10px rgba(0, 209, 255, 0.4))'
                }} 
            />
            
            {showText && (
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                    <span style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontWeight: '900',
                        fontSize: `${height * 0.5}px`,
                        color: light ? 'white' : '#0B1120',
                        letterSpacing: '-0.02em',
                        whiteSpace: 'nowrap'
                    }}>RIFT TIDE</span>
                    {!boxed && <span style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontWeight: '800',
                        fontSize: `${height * 0.18}px`,
                        color: '#00D1FF',
                        letterSpacing: '0.1em',
                        whiteSpace: 'nowrap'
                    }}>BUILD. EARN. LEAD.</span>}
                </div>
            )}
        </div>
    );
};

export default BrandLogo;
