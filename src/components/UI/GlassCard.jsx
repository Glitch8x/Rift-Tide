import React from 'react';

/**
 * SharpCard component - replaces the old GlassCard with a crisp, 
 * professional "First Dollar" style card.
 */
const SharpCard = ({ children, className = '', hoverEffect = false, ...props }) => {
    return (
        <div
            className={`sharp-card ${hoverEffect ? 'hoverable' : ''} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default SharpCard;
