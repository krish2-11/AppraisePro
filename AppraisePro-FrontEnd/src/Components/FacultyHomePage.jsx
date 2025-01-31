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
import '../Design/FacultyDashBoard.css';
import FacultyDashBoard from './FacultyDashBoard';
import PublicationPage from './PublicationPage'
import Header from './Header';
import Footer from './Footer';
import FacultyParticipation from './FacultyParticipation';

const CalendarPage = () => <div className="page"><h1>Calendar Page</h1></div>;
const Messages = () => <div className="page"><h1>Messages Page</h1></div>;
const SettingsPage = () => <div className="page"><h1>Settings Page</h1></div>;
const Help = () => <div className="page"><h1>Help & Support Page</h1></div>;

const FacultyHomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Publication', id: 'publication' },
    { icon: Calendar, label: 'Participation', id: 'participation' },
    { icon: MessageSquare, label: 'Messages', id: 'messages' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: HelpCircle, label: 'Help & Support', id: 'help' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <FacultyDashBoard />;
      case 'publication': return <PublicationPage />;
      case 'participation': return <FacultyParticipation />;
      case 'messages': return <Messages />;
      case 'settings': return <SettingsPage />;
      case 'help': return <Help />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
    <Header />
    <div className="app">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
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
};

export default FacultyHomePage;