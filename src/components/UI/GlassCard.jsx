import React from 'react';

const WizzCard = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`wizz-card-v4 elevated-card ${className}`}
      {...props}
    >
      {children}
      <style>{`
        .wizz-card-v4 {
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 24px !important;
          padding: 24px;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .wizz-card-v4.elevated-card {
          box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05);
        }
        .wizz-card-v4:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -20px rgba(56, 193, 244, 0.15);
          border-color: var(--color-primary-soft);
        }
      `}</style>
    </div>
  );
};

export default WizzCard;

