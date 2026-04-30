import React from 'react';

const BrandLogo = ({ size = 32, showText = false, light = false, boxed = false }) => {
    // The Gemini logo is horizontal (emblem + text). 
    // 'size' will act as the height to maintain aspect ratio.
    const height = size;

    return (
        <div 
            className={`rift-logo-container ${light ? 'light' : ''} ${boxed ? 'boxed' : ''}`} 
            style={{ 
                display: 'flex',
                alignItems: 'center',
                height: `${height}px`,
                position: 'relative'
            }}
        >
            <img 
                src="/rift-tide-logo-v2.png" 
                alt="Rift Tide" 
                style={{ 
                    height: '100%',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    filter: light ? 'brightness(0) invert(1) contrast(1.2)' : 'drop-shadow(0 0 12px rgba(0, 209, 255, 0.2))',
                    transition: 'all 0.3s ease'
                }} 
            />
            
            {/* We don't add extra text here because the Gemini logo already includes "RIFT TIDE" */}
        </div>
    );
};

export default BrandLogo;
