import React from 'react';

export const LogoIcon = ({ className = "w-8 h-8", classNamePath = "" }) => (
    <div className={`relative group ${className}`}>
        <style>
            {`
                @keyframes draw {
                    from { stroke-dashoffset: 300; fill-opacity: 0; }
                    to { stroke-dashoffset: 0; fill-opacity: 1; }
                }
                .animate-draw {
                    stroke-dasharray: 300;
                    animation: draw 1.5s ease-out forwards;
                }
            `}
        </style>
        <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        >
            {/* Abstract "T" formed by weaving shapes */}
            <path 
                d="M20 20 H80 V40 H60 V80 H40 V40 H20 V20Z" 
                className={`fill-primary stroke-primary-600 stroke-[2] animate-draw ${classNamePath}`}
                style={{ strokeLinejoin: 'round' }}
            />
            
            {/* Secondary accent - animated arrow/fold */}
            <path 
                d="M60 40 L80 40 L60 60 V40Z" 
                className="fill-secondary opacity-90 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:brightness-110"
            />
            
            {/* Shadow fold */}
            <path 
                d="M40 40 L20 40 L40 60 V40Z" 
                className="fill-primary-700 opacity-20 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
        </svg>
    </div>
);

export const LogoFull = ({ className = "h-8", iconClassName = "w-8 h-8" }) => (
    <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
        <LogoIcon className={iconClassName} />
        <span className="text-2xl font-bold tracking-tight relative overflow-hidden">
            <span className="text-primary inline-block transition-transform duration-300 group-hover:-translate-y-0.5">Tex</span>
            <span className="text-secondary inline-block transition-transform duration-300 group-hover:-translate-y-0.5 delay-75">Port</span>
            
            {/* Shine effect */}
            <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-all duration-700 group-hover:left-[100%]"></span>
        </span>
    </div>
);

export const Logo3D = ({ className = "w-12 h-12" }) => (
    <div className={`relative group [perspective:500px] ${className}`}>
        {/* Shadow layer */}
        <div className="absolute inset-0 bg-primary-700/30 rounded-lg transform translate-x-1 translate-y-1 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300 ease-out"></div>
        
        {/* Main layer */}
        <div className="relative bg-white p-2 rounded-lg border border-gray-100 shadow-xl transform transition-transform duration-300 ease-out group-hover:-translate-y-2 group-hover:[transform:rotateX(-12deg)_rotateY(12deg)] [transform-style:preserve-3d]">
             <LogoIcon className="w-full h-full drop-shadow-md" />
             
             {/* Gloss effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    </div>
);

export default LogoFull;
