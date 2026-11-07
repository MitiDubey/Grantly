import React from 'react';
import grantlyLogo from '../../assets/grantly-logo.png';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroOverlayProps {
  show: boolean;
  onFinish: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ show, onFinish }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#101B2D] text-white px-6 select-none overflow-hidden"
        >
          {/* Subtle background radial grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3985FF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          {/* Glowing Circular Logo Emblem */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white p-3 shadow-2xl shadow-blue-500/30 flex items-center justify-center mb-6 border-4 border-[#3985FF]/80"
          >
            <img 
              src={grantlyLogo} 
              alt="GRANTLY Official Emblem" 
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Brand Title: GRANTLY with SINCE 2026 (Replacing seit 1981 from reference) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-black font-display tracking-widest text-white uppercase">
              GRANTLY
            </h1>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="h-[1px] w-8 bg-[#3985FF]" />
              <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.3em] text-[#3985FF]">
                SINCE 2026
              </span>
              <span className="h-[1px] w-8 bg-[#3985FF]" />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 tracking-wider">
              YOUR FUTURE, FUNDED.
            </p>
          </motion.div>

          {/* Loading line */}
          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full mt-10 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.1, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#3985FF] to-blue-300"
            />
          </div>

          <button
            type="button"
            onClick={onFinish}
            className="mt-6 text-[11px] text-slate-500 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

