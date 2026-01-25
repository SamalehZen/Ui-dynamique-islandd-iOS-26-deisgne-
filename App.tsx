import React, { useState, useCallback } from 'react';
import { DynamicNotch } from './components/DynamicNotch';
import { UIState } from './types';
import { Mic, Sparkles, Power, Sun, Moon, LayoutGrid, RotateCcw } from 'lucide-react';

export default function App() {
  const [uiState, setUiState] = useState<UIState>(UIState.IDLE);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const handleModeSelect = useCallback((mode: string) => {
    console.log("Selected mode:", mode);
    setSelectedMode(mode); 
    setUiState(UIState.LISTENING); 
  }, []);

  const resetDemo = useCallback(() => {
    setUiState(UIState.IDLE);
    setSelectedMode(null); 
  }, []);

  const handleSetState = useCallback((state: UIState) => {
      setUiState(state);
  }, []);

  const toggleTheme = useCallback((newTheme: 'light' | 'dark') => {
      setTheme(newTheme);
  }, []);

  const isLight = theme === 'light';

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)]
      ${isLight ? 'bg-[#F5F5F7] text-[#1D1D1F]' : 'bg-[#000000] text-[#F5F5F7]'}`}>
      
      {/* --- Premium Background (GPU Optimized) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Main Ambient Glow - Added transform-gpu for hardware acceleration */}
        <div 
            className={`absolute top-[-20%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vh] rounded-full blur-[120px] opacity-40 transition-colors duration-1000 transform-gpu
            ${isLight ? 'bg-gradient-to-b from-blue-200/40 to-transparent' : 'bg-gradient-to-b from-[#1c1c1e]/80 to-transparent'}`}
            style={{ transform: 'translate3d(-50%, 0, 0)' }} 
        />
        
        {/* Subtle Accent Glows */}
        <div 
            className={`absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full blur-[90px] opacity-20 transition-all duration-1000 transform-gpu
            ${isLight ? 'bg-[#007AFF]' : 'bg-[#2C2C2E]'}`}
            style={{ transform: 'translate3d(0, 0, 0)' }}
        />
        <div 
            className={`absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 transition-all duration-1000 transform-gpu
            ${isLight ? 'bg-purple-300' : 'bg-[#1a1a1a]'}`}
            style={{ transform: 'translate3d(0, 0, 0)' }}
        />
      </div>

      <DynamicNotch 
        uiState={uiState} 
        theme={theme} 
        selectedMode={selectedMode}
        onModeSelect={handleModeSelect}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pb-24">
        
        {/* --- Hero Typography --- */}
        <div className="text-center space-y-4 max-w-2xl px-6 mb-16 select-none">
            <h1 className={`text-6xl md:text-8xl font-medium tracking-tight bg-gradient-to-b bg-clip-text text-transparent transition-all duration-700
              ${isLight 
                ? 'from-black via-black/80 to-black/50 drop-shadow-sm' 
                : 'from-white via-white/90 to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}>
              Intelligence
            </h1>
            <p className={`text-lg md:text-xl font-normal tracking-wide transition-colors duration-700
              ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              The next generation interface.
            </p>
        </div>

        {/* --- Premium Control Dock --- */}
        {/* "Light Effect" Implementation: A subtle border gradient and inner glow */}
        <div className="fixed bottom-12 flex flex-col gap-6 items-center">
            
            <div className="relative group">
                {/* The Glow Effect Layer */}
                <div className={`absolute -inset-[1px] rounded-[32px] opacity-50 blur-[2px] transition-all duration-500
                    ${isLight 
                        ? 'bg-gradient-to-b from-white to-transparent' 
                        : 'bg-gradient-to-b from-white/20 to-white/0'}`} 
                />
                
                {/* Main Dock Container */}
                <div className={`relative flex items-center gap-1 p-2 rounded-[30px] backdrop-blur-3xl saturate-150 transition-all duration-500 border
                   ${isLight 
                      ? 'bg-white/60 border-white/40 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]' 
                      : 'bg-[#161616]/70 border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]'}`}>
                  
                  <ControlButton 
                     active={uiState === UIState.IDLE}
                     onClick={() => handleSetState(UIState.IDLE)}
                     icon={Power}
                     label="Idle"
                     theme={theme}
                  />
                  
                  {/* Subtle Divider */}
                  <div className={`w-[1px] h-8 mx-1 ${isLight ? 'bg-black/5' : 'bg-white/5'}`} />

                  <ControlButton 
                     active={uiState === UIState.MODE_SELECT}
                     onClick={() => handleSetState(UIState.MODE_SELECT)}
                     icon={LayoutGrid}
                     label="Menu"
                     theme={theme}
                  />

                  <ControlButton 
                     active={uiState === UIState.LISTENING}
                     onClick={() => handleSetState(UIState.LISTENING)}
                     icon={Mic}
                     label="Listen"
                     theme={theme}
                  />

                  <ControlButton 
                     active={uiState === UIState.THINKING}
                     onClick={() => handleSetState(UIState.THINKING)}
                     icon={Sparkles}
                     label="Think"
                     theme={theme}
                     highlightColor="text-[#007AFF]"
                  />
                </div>
            </div>

            {/* Utility Pills - Floating separately below */}
             <div className={`flex items-center gap-2 p-1.5 rounded-full backdrop-blur-xl border transition-colors duration-500
                ${isLight 
                    ? 'bg-white/40 border-white/40 shadow-sm' 
                    : 'bg-[#1c1c1e]/60 border-white/5 shadow-lg'}`}>
                
                <UtilityButton 
                  onClick={() => toggleTheme('dark')}
                  active={theme === 'dark'}
                  icon={Moon}
                  theme={theme}
                />
                
                <UtilityButton 
                  onClick={() => toggleTheme('light')}
                  active={theme === 'light'}
                  icon={Sun}
                  theme={theme}
                />

                <div className={`w-[1px] h-4 mx-0.5 ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />

                <UtilityButton 
                  onClick={resetDemo}
                  active={false}
                  icon={RotateCcw}
                  theme={theme}
                  isDestructive
                />
             </div>
        </div>
      </div>
    </div>
  );
}

// --- Components ---

const ControlButton = React.memo(({ active, onClick, icon: Icon, label, theme, highlightColor }: any) => {
  const isLight = theme === 'light';
  return (
     <button 
       onClick={onClick}
       className={`relative flex flex-col items-center justify-center gap-1.5 w-16 h-14 rounded-[22px] transition-all duration-300 ease-out overflow-hidden
         ${active 
           ? (isLight 
               ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] scale-100' 
               : 'bg-[#2C2C2E] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] scale-100') 
           : 'hover:bg-black/5 dark:hover:bg-white/5 scale-[0.98] hover:scale-100'
         }`}
     >
       <Icon 
         size={22} 
         strokeWidth={active ? 2.5 : 2}
         className={`transition-colors duration-300 z-10
           ${active 
             ? (highlightColor || (isLight ? 'text-black' : 'text-white')) 
             : (isLight ? 'text-zinc-400' : 'text-zinc-500')
           }`}
       />
       {active && (
         <span className={`text-[10px] font-semibold tracking-wide transition-opacity duration-300 z-10
            ${isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>
           {label}
         </span>
       )}
     </button>
  );
});

const UtilityButton = React.memo(({ active, onClick, icon: Icon, theme, isDestructive }: any) => {
  const isLight = theme === 'light';
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300
        ${active 
          ? (isLight ? 'bg-white text-black shadow-sm' : 'bg-[#3A3A3C] text-white shadow-inner')
          : (isDestructive 
              ? 'text-zinc-400 hover:text-red-500 hover:bg-red-500/10' 
              : (isLight ? 'text-zinc-500 hover:bg-white/80 hover:text-black' : 'text-zinc-500 hover:bg-white/10 hover:text-white')
            )
        }`}
    >
      <Icon size={15} strokeWidth={2} />
    </button>
  );
});