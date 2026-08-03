import React from 'react';
import BrandLogo from '../Brand/BrandLogo';

const Logo = () => {
    return (
        <div className='relative z-50'>
            <div className="absolute top-4 md:top-[2vw] right-5 md:right-7">
                <BrandLogo name="WARDA DABBAH" size="sm" />
            </div>
        </div>
    );
};

export default Logo;
