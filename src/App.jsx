import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectionProvider } from './context/ProtectionContext';
import MobileLayout from './layouts/MobileLayout';
import WebLayout from './layouts/WebLayout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import ProtectionPage from './pages/ProtectionPage';
import InsightsPage from './pages/InsightsPage';
import ProfilePage from './pages/ProfilePage';
import ClaimsPage from './pages/ClaimsPage';
import FamilyPage from './pages/FamilyPage';
import SettingsPage from './pages/SettingsPage';
import DetailsPage from './pages/DetailsPage';

export default function App() {
  return (
    <ProtectionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mobile" element={<MobileLayout />}>
            <Route index element={<HomePage basePath="/mobile" variant="mobile" />} />
            <Route path="activity" element={<ActivityPage variant="mobile" />} />
            <Route path="protection" element={<ProtectionPage variant="mobile" />} />
            <Route path="insights" element={<InsightsPage variant="mobile" />} />
            <Route path="profile" element={<ProfilePage basePath="/mobile" variant="mobile" />} />
            <Route path="claims" element={<ClaimsPage basePath="/mobile" />} />
            <Route path="family" element={<FamilyPage basePath="/mobile" />} />
            <Route path="settings" element={<SettingsPage basePath="/mobile" />} />
            <Route path="details" element={<DetailsPage basePath="/mobile" />} />
          </Route>
          <Route path="/web" element={<WebLayout />}>
            <Route index element={<HomePage basePath="/web" variant="web" />} />
            <Route path="activity" element={<ActivityPage variant="web" />} />
            <Route path="protection" element={<ProtectionPage variant="web" />} />
            <Route path="insights" element={<InsightsPage variant="web" />} />
            <Route path="profile" element={<ProfilePage basePath="/web" variant="web" />} />
            <Route path="claims" element={<ClaimsPage basePath="/web" wide />} />
            <Route path="family" element={<FamilyPage basePath="/web" wide />} />
            <Route path="settings" element={<SettingsPage basePath="/web" wide />} />
            <Route path="details" element={<DetailsPage basePath="/web" wide />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ProtectionProvider>
  );
}
