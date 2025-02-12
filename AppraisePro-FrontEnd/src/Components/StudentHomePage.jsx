import React, { useState } from 'react';
import { 
    BookOpen  , 
    MessageCircle , 
  Settings, 
  HelpCircle,
  Menu,
} from 'lucide-react';
import Footer from './Footer'
import '../Design/temp.css';
import Resource from './Resource';

const FeedbackForm = () => <div className="page"><h1>FeedbackForm Page</h1></div>;
const SettingsPage = () => <div className="page"><h1>Settings Page</h1></div>;
const Help = () => <div className="page"><h1>Help & Support Page</h1></div>;

const StudentHomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
  
    const navItems = [
      { icon: BookOpen  , label: 'Resource', id: 'resource' },
      { icon: MessageCircle , label: 'FeedbackForm', id: 'feedbackform' },
      { icon: Settings, label: 'Settings', id: 'settings' },
      { icon: HelpCircle, label: 'Help & Support', id: 'help' },
    ];
  
    const renderPage = () => {
      switch (currentPage) {
        case 'resource': return <Resource />;
        case 'feedbackform': return <FeedbackForm />;
        case 'settings': return <SettingsPage />;
        case 'help': return <Help />;
        default: return <Resource />;
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

export default StudentHomePage