import React, { Profiler, useState } from 'react';
import { 
  Home, 
  FileText,
  Users, 
  CheckCircle,
  Settings, 
  HelpCircle,
  Menu,
  School,
} from 'lucide-react';
import Footer from './Footer'
import '../Design/temp.css';
import Request from './Request';
import FacultyList from './FacultyList'
import FacultyScholarProfile from './FacultyScholarProfile';

const Evaluation = () => <div className="page"><h1>Evaluation Page</h1></div>;
const SettingsPage = () => <div className="page"><h1>Settings Page</h1></div>;
const Help = () => <div className="page"><h1>Help & Support Page</h1></div>;
const AdminDashBoard = () => <div className="page"><h1>DashBoard Page</h1></div>;

const AdminHomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
  
    const navItems = [
      { icon: Home, label: 'Dashboard', id: 'dashboard' },
      { icon: Users, label: 'FacultyList', id: 'faculties' },
      { icon: School, label: 'ScholarProfile', id: 'scholarprofile' },
      { icon: FileText, label: 'Request', id: 'requests' },
      { icon: CheckCircle, label: 'Evaluation', id: 'evaluation' },
      { icon: Settings, label: 'Settings', id: 'settings' },
      { icon: HelpCircle, label: 'Help & Support', id: 'help' },
    ];
  
    const renderPage = () => {
      switch (currentPage) {
        case 'dashboard': return <AdminDashBoard />;
        case 'faculties': return <FacultyList />;
        case 'scholarprofile': return <FacultyScholarProfile />;
        case 'requests': return <Request />;
        case 'evaluation': return <Evaluation />;
        case 'settings': return <SettingsPage />;
        case 'help': return <Help />;
        default: return <AdminDashBoard />;
      }
    };
  
    return (
      <>
      <div className="app">
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          {/* Header */}
          <div className="sidebar-header">
            {!collapsed && <span className="company-name">AppraisePro</span>}
            <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
              <Menu size={20} />
            </button>
          </div>
  
          {/* Navigation */}
          <nav className="nav-items">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
  
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
      <Footer />
      </>
    );
}

export default AdminHomePage