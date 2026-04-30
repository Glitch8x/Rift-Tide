import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import '@mysten/dapp-kit/dist/index.css';

import DashboardLayout from './components/Layout/DashboardLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Grants from './pages/Grants';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import QuestDetail from './pages/QuestDetail';
import GrantApplication from './pages/GrantApplication';
import Hub from './pages/Hub';
import QuestSubmission from './pages/QuestSubmission';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import Jobs from './pages/Jobs';
import Landing from './pages/Landing';

import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Create a query client for React Query
const queryClient = new QueryClient();

// Sui network configuration
const networks = {
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  devnet: { url: getFullnodeUrl('devnet') },
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const user = auth?.user;
  const loading = auth?.loading;

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>Loading Quests...</div>;
  }

  if (!auth) {
    console.error("ProtectedRoute: AuthContext is missing!");
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Simple Admin Guard
const ProtectedAdminRoute = ({ children }) => {
  const { user } = useAuth();
  
  // Restricted Admin Wallet Address
  const ADMIN_WALLET = '0xebdcab3f6b981a9b68a7b0d866c713a8fd486e9873f08b615207ca471601c189'; 
  
  if (!user || user.walletAddress?.toLowerCase() !== ADMIN_WALLET.toLowerCase()) {
    console.warn("Unauthorized Admin Access attempt from:", user?.walletAddress);
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider
          autoConnect={false}
          preferredWallets={['Slush', 'Sui Wallet']}
        >
          <Router>
            <AuthProvider>
              <DataProvider>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  <Route path="/" element={<Landing />} />

                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Home />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/explore" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Explore />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/jobs" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Jobs />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/grants" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Grants />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/leaderboard" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Leaderboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/grants/apply/:id" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <GrantApplication />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/hub" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Hub />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Profile />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <Settings />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/quest/submit/:id" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <QuestSubmission />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />

                  <Route path="/admin" element={
                    <DashboardLayout>
                      <AdminLogin />
                    </DashboardLayout>
                  } />

                  <Route path="/admin/dashboard" element={
                    <ProtectedAdminRoute>
                      <DashboardLayout>
                        <AdminDashboard />
                      </DashboardLayout>
                    </ProtectedAdminRoute>
                  } />

                  <Route path="/quest/:id" element={
                    <ProtectedRoute>
                      <DashboardLayout>
                        <QuestDetail />
                      </DashboardLayout>
                    </ProtectedRoute>
                  } />
                </Routes>
              </DataProvider>
            </AuthProvider>
          </Router>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
