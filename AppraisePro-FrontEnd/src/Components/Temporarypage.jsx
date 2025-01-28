import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Calendar, 
  Settings, 
  HelpCircle,
  Menu,
  MessageSquare
} from 'lucide-react';
import '../Design/temp.css';
import FacultyDashBoard from './FacultyDashBoard';

const Dashboard = () => <FacultyDashBoard />
const Publication = () => <div className="page"><h1>Publication Page</h1></div>;
const CalendarPage = () => <div className="page"><h1>Calendar Page</h1></div>;
const Messages = () => <div className="page"><h1>Messages Page</h1></div>;
const SettingsPage = () => <div className="page"><h1>Settings Page</h1></div>;
const Help = () => <div className="page"><h1>Help & Support Page</h1></div>;

const Temporarypage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Publication', id: 'publication' },
    { icon: Calendar, label: 'Calendar', id: 'calendar' },
    { icon: MessageSquare, label: 'Messages', id: 'messages' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: HelpCircle, label: 'Help & Support', id: 'help' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'publication': return <Publication />;
      case 'calendar': return <CalendarPage />;
      case 'messages': return <Messages />;
      case 'settings': return <SettingsPage />;
      case 'help': return <Help />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          {!collapsed && <span className="company-name">Company Name</span>}
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
  );
};

export default Temporarypage;