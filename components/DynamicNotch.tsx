import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UIState } from '../types';
import { ChromeIcon, WaveformIcon } from './Icons';
import { 
  Sparkles, Monitor, Mail, Wand2, 
  MessageCircle, StickyNote, Clipboard, 
  FileText, Calendar, CloudSun 
} from 'lucide-react';

interface DynamicNotchProps {
  uiState: UIState;
  selectedMode: string | null;
  theme?: 'light' | 'dark';
  onModeSelect?: (mode: string) => void;
}

// Mode Configuration
export const MODES = [
  { id: 'auto', label: 'Auto', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 'email', label: 'Email', icon: Mail, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'prompt', label: 'Prompt', icon: Wand2, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'message', label: 'Message', icon: MessageCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 'note', label: 'To do lister', icon: StickyNote, color: 'text-yellow-400', bg: 'bg-orange-400/10' },
  { id: 'brut', label: 'Brut', icon: Clipboard, color: 'text-zinc-400', bg: 'bg-zinc-400/10' },
  { id: 'doc', label: 'Doc', icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { id: 'planning', label: 'Planning', icon: Calendar, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { id: 'weather', label: 'Weather', icon: CloudSun, color: 'text-sky-400', bg: 'bg-sky-400/10' },
];

// PERF: Optimized fluid physics - SNAPPY CONFIGURATION
const springTransition = {
  type: "spring" as const,
  stiffness: 400, // Was 180 - Much faster tension
  damping: 30,    // Was 24 - Absorbs energy quickly (no wobble)
  mass: 0.5,      // Was 0.8 - Lighter feel
  restDelta: 0.001
};

export const DynamicNotch: React.FC<DynamicNotchProps> = React.memo(({ uiState, selectedMode, theme = 'dark', onModeSelect }) => {
  const isLight = theme === 'light';
  const isMenuOpen = uiState === UIState.MODE_SELECT;

  // Active Icon Logic
  const activeMode = useMemo(() => {
    return MODES.find(m => m.id === selectedMode);
  }, [selectedMode]);

  const ActiveIconComponent = activeMode ? activeMode.icon : ChromeIcon;
  const activeModeColor = activeMode ? activeMode.color : null;
  const activeLabel = activeMode ? activeMode.label : 'Intelligence';

  // Layout Logic - Attached Notch Dimensions
  const { width, height, borderBottomRadius } = useMemo(() => {
    if (uiState === UIState.MODE_SELECT) {
      // Large Menu attached to top (Height increased for 3 rows)
      return { width: 480, height: 360, borderBottomRadius: 32 }; 
    } else if (uiState === UIState.LISTENING || uiState === UIState.THINKING) {
      // Wide enough for text on both sides
      return { width: 360, height: 46, borderBottomRadius: 20 }; 
    }
    // Idle state - compact but wide enough for label
    return { width: 200, height: 46, borderBottomRadius: 20 };
  }, [uiState]);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none">
      <motion.div
        layout="preserve-aspect"
        initial={false}
        animate={{ 
          width, 
          height, 
          borderBottomLeftRadius: borderBottomRadius,
          borderBottomRightRadius: borderBottomRadius,
        }}
        transition={springTransition}
        // STYLE: Soft Bevel Illusion & Attached Top
        className={`relative flex flex-col items-center pointer-events-auto backdrop-blur-[40px] saturate-150 overflow-hidden transition-all duration-500 rounded-t-none border-t-0
          ${isLight 
            ? 'bg-gradient-to-b from-white to-[#F0F2F5] shadow-[0_4px_20px_rgba(0,0,0,0.1),inset_0_-1px_1px_rgba(0,0,0,0.05)] border-x border-b border-white/40 ring-1 ring-black/5' 
            : 'bg-gradient-to-b from-black to-[#141414] shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(255,255,255,0.15),inset_0_-8px_12px_rgba(255,255,255,0.02)] border-x border-b border-white/5 ring-1 ring-white/5' 
          }`}
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'width, height',
          backfaceVisibility: 'hidden'
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          
          {/* --- MODE SELECTION GRID --- */}
          {isMenuOpen ? (
            <motion.div
              key="mode-grid"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)', transition: { duration: 0.1 } }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 w-full h-full p-6 pt-8 grid grid-cols-3 gap-4 place-items-center"
            >
              {MODES.map((mode, i) => (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.015, type: 'spring', stiffness: 300, damping: 20 }}
                  onClick={() => onModeSelect && onModeSelect(mode.id)}
                  className="flex flex-col items-center justify-center gap-2 w-full h-full group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-active:scale-95
                    ${isLight 
                       ? 'bg-gradient-to-br from-zinc-50 to-zinc-100 shadow-sm border border-white/50' 
                       : 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-inner'}`}>
                    <mode.icon 
                      className={`w-5 h-5 transition-colors ${isLight ? mode.color.replace('text-', 'text-zinc-700') : mode.color}`} 
                      strokeWidth={2}
                    />
                  </div>
                  <span className={`text-[11px] font-medium tracking-wide transition-colors ${isLight ? 'text-zinc-500 group-hover:text-zinc-900' : 'text-zinc-400 group-hover:text-white'}`}>
                    {mode.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            
            /* --- NOTCH BAR STATE --- */
            <motion.div 
              key="compact-row"
              className="absolute inset-0 w-full h-full flex items-center justify-between px-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.2 }}
            >
              {/* Left Side: Icon + Label (Always visible like screenshot) */}
              <div className="flex items-center gap-3 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={selectedMode || 'default'}
                    initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="relative z-10 flex items-center justify-center w-6 h-6"
                  >
                     {ActiveIconComponent === ChromeIcon ? (
                        <ChromeIcon className="w-6 h-6" />
                     ) : (
                        <ActiveIconComponent 
                           className={`w-5 h-5 ${isLight ? activeModeColor?.replace('text-', 'text-zinc-800') : activeModeColor}`} 
                           strokeWidth={2.5}
                        />
                     )}
                  </motion.div>
                </AnimatePresence>
                
                {/* Permanent Label (e.g. "To do lister") */}
                <motion.span
                  layout
                  className={`text-[14px] font-semibold tracking-wide whitespace-nowrap overflow-hidden
                    ${isLight ? 'text-zinc-800' : 'text-white'}`}
                >
                  {activeLabel}
                </motion.span>
              </div>

              {/* Right Side: Status Indicators */}
              <div className="flex items-center justify-end h-full">
                <AnimatePresence mode="wait">
                  
                  {/* IDLE: Empty right side or subtle indicator? Screenshot shows nothing for left part, but logic suggests simple view */}
                  {uiState === UIState.IDLE && (
                    <motion.div
                       key="idle-dot"
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: 0, opacity: 0 }}
                       className="relative w-2 h-2 mr-1"
                    >
                       {/* Subtle idling dot */}
                       <div className={`w-full h-full rounded-full ${isLight ? 'bg-zinc-300' : 'bg-white/20'}`} />
                    </motion.div>
                  )}

                  {uiState === UIState.LISTENING && (
                    <motion.div
                      key="listening"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="h-full flex items-center"
                    >
                      <WaveformIcon isLight={isLight} />
                    </motion.div>
                  )}

                  {uiState === UIState.THINKING && (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-2"
                    >
                       <motion.div
                            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                            transition={{ rotate: { repeat: Infinity, duration: 3, ease: "linear" }, scale: { repeat: Infinity, duration: 2 } }}
                        >
                            <Sparkles className="w-4 h-4 text-[#007AFF]" fill="currentColor" />
                        </motion.div>
                        <span className="text-[14px] font-medium text-[#007AFF]">
                           Thinking
                         </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});