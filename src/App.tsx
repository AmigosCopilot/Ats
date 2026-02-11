import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Jobs } from './components/Jobs';
import { Candidates } from './components/Candidates';
import { Pipeline } from './components/Pipeline';
import { PsychometricTests } from './components/PsychometricTests';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
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
