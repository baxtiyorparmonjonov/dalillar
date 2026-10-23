import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './components/pages/Dashboard';
import { Archive } from './components/pages/Archive';
import { AddEvidence } from './components/pages/AddEvidence';
import { EvidenceDetail } from './components/pages/EvidenceDetail';
import { Settings } from './components/pages/Settings';
import { Login } from './components/pages/Login';
import { Register } from './components/pages/Register';
import { Cases } from './components/pages/Cases';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Yuklanmoqda...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  useEffect(() => {
    document.title = 'Dalillar';
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="cases" element={<Cases />} />
            <Route path="archive" element={<Archive />} />
            <Route path="add" element={<AddEvidence />} />
            <Route path="evidence/:id" element={<EvidenceDetail />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}