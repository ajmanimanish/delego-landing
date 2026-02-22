import React from 'react';

const Logo = ({ variant = 'dark', className = '' }) => {
    // Variant 'dark' is for dark backgrounds (White Text)
    // Variant 'light' is for light backgrounds (Black Text)

    const mainColor = variant === 'dark' ? '#FFFFFF' : '#0F172A'; // White or Slate-900
    const accentColor = '#FFEB3B'; // The brand yellow

    return (
        <div className={`flex items-center gap-3 select-none ${className}`}>
            {/* Radar Icon */}
            <div className="relative w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Defs for Masking if needed, but simple paths work best for React */}

                    {/* Vertical Spine (The back of the D) */}
                    <line x1="28" y1="15" x2="28" y2="85"
                        stroke={mainColor} strokeWidth="6" strokeLinecap="round" />

                    {/* Outer Arc (The curve of the D) */}
                    <path d="M28 15 C 75 15, 90 30, 90 50 C 90 70, 75 85, 28 85"
                        stroke={mainColor} strokeWidth="5" strokeLinecap="round" />

                    {/* Inner Arc (Echo) */}
                    <path d="M28 28 C 60 28, 70 38, 70 50 C 70 62, 60 72, 28 72"
                        stroke={mainColor} strokeWidth="4" strokeOpacity="0.6" strokeLinecap="round" />

                    {/* Central Core (The Eye/Target) */}
                    <circle cx="45" cy="50" r="10" fill={accentColor} />

                    {/* Satellite Dot (Orbiting) */}
                    <circle cx="90" cy="50" r="4" fill={accentColor} stroke={variant === 'dark' ? 'black' : 'white'} strokeWidth="1" />
                </svg>
            </div>

            {/* Text Brand */}
            <div className={`font-bold text-2xl tracking-tighter leading-none ${variant === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Delego<span style={{ color: accentColor }}>.life</span>
            </div>
        </div>
    );
};

export default Logo;
