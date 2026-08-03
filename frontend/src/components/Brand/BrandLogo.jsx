import React from 'react';
import './brand.css';

const BrandLogo = ({
    name = 'WARDA DABBAH',
    theme = 'light',
    size = 'md',
    tagline = true,
    className = '',
}) => {
    return (
        <div className={`brand-logo brand-logo--${theme} brand-logo--${size} ${className}`}>
            <span className="brand-logo__name">{name}</span>
            {tagline && (
                <span className="brand-logo__tagline">INTERIOR DESIGN</span>
            )}
        </div>
    );
};

export default BrandLogo;
