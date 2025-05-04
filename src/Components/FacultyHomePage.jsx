import React, { useState } from 'react';
import { Home, FileText, Users, Menu, LogOut } from 'lucide-react';
import FacultyDashBoard from './FacultyDashBoard';
import FacultyParticipation from './FacultyParticipation';
import PublicationPage from './PublicationPage';
import { useNavigate } from "react-router-dom";

const FacultyHomePage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Publication', id: 'publication' },
    { icon: Users, label: 'Participation', id: 'participation' }
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <FacultyDashBoard />;
      case 'publication': return <PublicationPage />;
      case 'participation': return <FacultyParticipation />;
      default: return <FacultyDashBoard />;
    }
  };

  const logOut = () => {
    localStorage.removeItem('email');
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${
            collapsed ? 'w-16' : 'w-64'
          } fixed h-full z-10`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-700">
            {!collapsed && (
              <h1 className="text-xl font-bold text-white">AppraisePro</h1>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-2">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-indigo-900 text-white'
                      : 'text-indigo-100 hover:bg-indigo-700'
                  }`}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && (
                    <span className="ml-4 text-sm font-medium">{item.label}</span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Logout at bottom */}
            <div className={`absolute bottom-8 w-full px-2 ${collapsed ? 'pr-2' : 'pr-4'}`}>
              <button
                onClick={logOut}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-indigo-100 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <LogOut size={20} className="flex-shrink-0" />
                {!collapsed && <span className="ml-4">Logout</span>}
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          className={`flex-1 transition-all duration-300 ease-in-out ${
            collapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <div className="p-6">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <div className={`transition-all duration-300 ease-in-out ${
        collapsed ? 'ml-16' : 'ml-64'
      }`}>
      </div>
    </div>
  );
};

export default FacultyHomePage;