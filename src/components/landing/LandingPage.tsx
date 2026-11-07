import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { AuthModal } from '../auth/AuthModal';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { ScholarshipShowcase } from './ScholarshipShowcase';
import { FeatureCards } from './FeatureCards';
import { StatsBanner } from './StatsBanner';
import { Footer } from './Footer';
import { IntroOverlay } from './IntroOverlay';
import { useScrollAnimations } from './useScrollAnimations';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { isDark, toggleTheme, isAuthenticated, user } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);

  const [showIntro, setShowIntro] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  useScrollAnimations(rootRef);

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleLogoPortalClick = () => {
    if (isAuthenticated) {
      onEnterApp();
    } else {
      handleOpenAuth('signin');
    }
  };

  const handleCheckEligibilityClick = () => {
    if (isAuthenticated) {
      onEnterApp();
    } else {
      handleOpenAuth('signup');
    }
  };

  return (
    <div 
      ref={rootRef}
      className="landing-page-root min-h-screen bg-[#F5F7FB] dark:bg-[#0B1423] text-[#172033] dark:text-[#F4F7FC] transition-colors duration-300 relative overflow-x-hidden font-sans selection:bg-[#3985FF] selection:text-white"
    >
      {/* 0. Cinematic Intro Animation */}
      <IntroOverlay
        show={showIntro}
        onFinish={() => setShowIntro(false)}
      />

      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#3985FF]/15 via-[#3985FF]/5 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#3985FF]/10 blur-[130px] pointer-events-none -z-0" />

      {/* 1. Minimal Fixed Navbar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        onEnterApp={onEnterApp}
        onOpenAuth={handleOpenAuth}
      />

      {/* 2. Hero Section with Full Circle Logo */}
      <div className="hero-section-wrapper">
        <HeroSection
          onLogoClick={handleLogoPortalClick}
          onOpenAuth={handleOpenAuth}
        />
      </div>

      {/* 3. Pinned Scroll-Expanding Image Showcase (Exact dozfx.com Behavior) */}
      <div className="showcase-section-wrapper min-h-screen w-full flex items-center justify-center py-4">
        <ScholarshipShowcase
          onCheckEligibility={handleCheckEligibilityClick}
        />
      </div>

      {/* 4. Feature Cards Grid (Smoothly reveals right after image expansion unpins) */}
      <div className="feature-cards-wrapper py-10">
        <FeatureCards />
      </div>

      {/* 5. Dark Statistics Banner */}
      <div className="stats-banner-wrapper py-6">
        <StatsBanner />
      </div>

      {/* 6. Footer */}
      <Footer />

      {/* Auth Modal with Single Working Google Auth */}
      <AuthModal
        isOpen={authOpen}
        initialMode={authMode}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => {
          setAuthOpen(false);
          onEnterApp();
        }}
      />
    </div>
  );
};
