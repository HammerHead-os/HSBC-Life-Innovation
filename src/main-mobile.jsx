import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectionProvider } from './context/ProtectionContext';
import RequireAuth from './components/RequireAuth';
import MobileLayout from './layouts/MobileLayout';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import ProtectionPage from './pages/ProtectionPage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';
import ClaimsPage from './pages/ClaimsPage';
import FamilyPage from './pages/FamilyPage';
import SettingsPage from './pages/SettingsPage';
import DetailsPage from './pages/DetailsPage';
import FAQPage from './pages/FAQPage';
import './index.css';

const BASE = '';

export default function MobileApp() {
  return (
    <AuthProvider>
      <ProtectionProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <MobileLayout />
                </RequireAuth>
              }
            >
              <Route index element={<HomePage variant="mobile" />} />
              <Route path="activity" element={<ActivityPage variant="mobile" />} />
              <Route path="protection" element={<ProtectionPage variant="mobile" />} />
              <Route path="insights" element={<InsightsPage variant="mobile" />} />
              <Route path="profile" element={<ProfilePage variant="mobile" />} />
              <Route path="claims" element={<ClaimsPage />} />
              <Route path="family" element={<FamilyPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="details" element={<DetailsPage />} />
              <Route path="faq" element={<FAQPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </ProtectionProvider>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MobileApp />
  </StrictMode>,
);
