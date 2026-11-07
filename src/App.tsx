import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Landing } from './pages/Landing';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Explorer } from './pages/Explorer';
import { Recommendations } from './pages/Recommendations';
import { Saved } from './pages/Saved';
import { Applications } from './pages/Applications';
import { Profile } from './pages/Profile';

const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useApp();
  
  // Track whether we are in the landing view or inside the authenticated app shell
  const [inApp, setInApp] = useState<boolean>(() => {
    return localStorage.getItem('grantly_in_app') === 'true';
  });
  
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  const handleEnterApp = () => {
    setInApp(true);
    localStorage.setItem('grantly_in_app', 'true');
  };

  const handleGoHome = () => {
    setInApp(false);
    localStorage.setItem('grantly_in_app', 'false');
  };

  if (!inApp) {
    return <Landing onEnterApp={handleEnterApp} />;
  }

  return (
    <AppShell
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      onGoHome={handleGoHome}
    >
      {currentTab === 'dashboard' && <Dashboard onNavigateTab={setCurrentTab} />}
      {currentTab === 'explorer' && <Explorer />}
      {currentTab === 'recommendations' && <Recommendations />}
      {currentTab === 'saved' && <Saved onExplore={() => setCurrentTab('explorer')} />}
      {currentTab === 'applications' && <Applications onExplore={() => setCurrentTab('explorer')} />}
      {currentTab === 'profile' && <Profile />}
    </AppShell>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
