import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectionProvider } from './context/ProtectionContext';
import MobileLayout from './layouts/MobileLayout';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import ProtectionPage from './pages/ProtectionPage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';
import ClaimsPage from './pages/ClaimsPage';
import FamilyPage from './pages/FamilyPage';
import SettingsPage from './pages/SettingsPage';
import DetailsPage from './pages/DetailsPage';
import './index.css';

const BASE = '';

export default function MobileApp() {
  return (
    <ProtectionProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MobileLayout />}>
            <Route index element={<HomePage basePath={BASE} variant="mobile" />} />
            <Route path="activity" element={<ActivityPage variant="mobile" />} />
            <Route path="protection" element={<ProtectionPage variant="mobile" />} />
            <Route path="insights" element={<InsightsPage variant="mobile" />} />
            <Route path="profile" element={<ProfilePage basePath={BASE} variant="mobile" />} />
            <Route path="claims" element={<ClaimsPage basePath={BASE} />} />
            <Route path="family" element={<FamilyPage basePath={BASE} />} />
            <Route path="settings" element={<SettingsPage basePath={BASE} />} />
            <Route path="details" element={<DetailsPage basePath={BASE} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ProtectionProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MobileApp />
  </StrictMode>,
);
