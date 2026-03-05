import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Jobs } from './components/Jobs';
import { Candidates } from './components/Candidates';
import { Pipeline } from './components/Pipeline';
import { PsychometricTests } from './components/PsychometricTests';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { getToken, removeToken } from './api/auth';
import { api, isApiEnabled, setAuthInvalidateCallback } from './api/client';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(!isApiEnabled());

  useEffect(() => {
    setAuthInvalidateCallback(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    if (!isApiEnabled() || authChecked) return;
    const token = getToken();
    if (!token) {
      setAuthChecked(true);
      return;
    }
    api
      .get<{ id: number; name: string; email: string }>('/user')
      .then(() => setIsAuthenticated(true))
      .finally(() => setAuthChecked(true));
  }, [authChecked]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <Jobs />;
      case 'candidates':
        return <Candidates />;
      case 'pipeline':
        return <Pipeline />;
      case 'tests':
        return <PsychometricTests />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Comprobando sesión...</p>
      </div>
    );
  }

  const handleLogout = () => {
    if (isApiEnabled()) {
      api.post('/logout', {}).catch(() => {}).finally(() => {
        removeToken();
        setIsAuthenticated(false);
      });
    } else {
      setIsAuthenticated(false);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <Header 
        sidebarCollapsed={sidebarCollapsed} 
        onLogout={handleLogout}
      />
      
      <main
        className={`transition-all duration-300 pt-16 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
