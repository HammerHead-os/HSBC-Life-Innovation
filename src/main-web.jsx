import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectionProvider } from './context/ProtectionContext';
import WebLayout from './layouts/WebLayout';
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

export default function WebApp() {
  return (
    <ProtectionProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<WebLayout />}>
            <Route index element={<HomePage basePath={BASE} variant="web" />} />
            <Route path="activity" element={<ActivityPage variant="web" />} />
            <Route path="protection" element={<ProtectionPage variant="web" />} />
            <Route path="insights" element={<InsightsPage variant="web" />} />
            <Route path="profile" element={<ProfilePage basePath={BASE} variant="web" />} />
            <Route path="claims" element={<ClaimsPage basePath={BASE} wide />} />
            <Route path="family" element={<FamilyPage basePath={BASE} wide />} />
            <Route path="settings" element={<SettingsPage basePath={BASE} wide />} />
            <Route path="details" element={<DetailsPage basePath={BASE} wide />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ProtectionProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebApp />
  </StrictMode>,
);
