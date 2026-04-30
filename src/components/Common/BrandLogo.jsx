import React from 'react';

const BrandLogo = ({ size = 32, showText = false, light = false, boxed = false }) => {
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
                    borderRadius: boxed ? '8px' : '0'
                }} 
            />
            
            {showText && !boxed && (
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                    <span style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontWeight: '900',
                        fontSize: `${height * 0.4}px`,
                        color: light ? 'white' : '#0B1120',
                        letterSpacing: '-0.02em',
                        whiteSpace: 'nowrap'
                    }}>RIFT TIDE</span>
                </div>
            )}
        </div>
    );
};

export default BrandLogo;
