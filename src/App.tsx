import React, { useState, Suspense, lazy } from 'react';
import { AppProvider } from './context/AppContext';
import { Landing } from './pages/Landing';
import { AppShell } from './components/layout/AppShell';

// Route-level code splitting for fast initial page load and optimal performance
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Explorer = lazy(() => import('./pages/Explorer').then(m => ({ default: m.Explorer })));
const Recommendations = lazy(() => import('./pages/Recommendations').then(m => ({ default: m.Recommendations })));
const Saved = lazy(() => import('./pages/Saved').then(m => ({ default: m.Saved })));
const Applications = lazy(() => import('./pages/Applications').then(m => ({ default: m.Applications })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));

const ViewLoadingFallback: React.FC = () => (
  <div className="flex items-center justify-center min-h-[350px] w-full" role="status" aria-live="polite">
    <div className="w-8 h-8 rounded-full border-2 border-[#3985FF] border-t-transparent animate-spin" />
    <span className="sr-only">Loading content...</span>
  </div>
);

const MainAppContent: React.FC = () => {
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
      <Suspense fallback={<ViewLoadingFallback />}>
        {currentTab === 'dashboard' && <Dashboard onNavigateTab={setCurrentTab} />}
        {currentTab === 'explorer' && <Explorer />}
        {currentTab === 'recommendations' && <Recommendations />}
        {currentTab === 'saved' && <Saved onExplore={() => setCurrentTab('explorer')} />}
        {currentTab === 'applications' && <Applications onExplore={() => setCurrentTab('explorer')} />}
        {currentTab === 'profile' && <Profile />}
      </Suspense>
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
