import React from 'react';

export const ChromeIcon = React.memo(({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`shrink-0 drop-shadow-sm will-change-transform ${className}`}>
    <circle cx="12" cy="12" r="11" fill="white" />
    <path d="M12 12L12 2L20.66 7L12 12Z" fill="#EA4335" />
    <path d="M12 12L20.66 7L20.66 17L12 12Z" fill="#FBBC04" />
    <path d="M12 12L20.66 17L12 22L3.34 17L12 12Z" fill="#34A853" />
    <path d="M12 12L3.34 17L3.34 7L12 2L12 12Z" fill="#4285F4" />
    <circle cx="12" cy="12" r="4.5" fill="white" />
    <circle cx="12" cy="12" r="3.5" fill="#4285F4" />
  </svg>
));

export const WaveformIcon = React.memo(({ isLight = false }: { isLight?: boolean }) => {
  return (
    <div className="flex items-center gap-[4px] h-full justify-center px-2">
       {[0.5, 1.2, 0.8, 1.1, 0.6].map((speed, i) => (
         <div 
            key={i}
            className={`w-[4px] rounded-full ${isLight ? 'bg-zinc-900' : 'bg-white'}`}
            style={{
                height: i === 2 ? '24px' : i === 1 || i === 3 ? '16px' : '8px',
                animation: `wave ${0.8 + (i * 0.1)}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.15}s`,
                opacity: 0.9,
                willChange: 'transform, height'
            }}
         />
       ))}
       <style>{`
         @keyframes wave {
           0% { transform: scaleY(0.6); opacity: 0.6; }
           100% { transform: scaleY(1.4); opacity: 1; }
         }
       `}</style>
    </div>
  );
});