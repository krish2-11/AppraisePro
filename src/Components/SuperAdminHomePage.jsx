import React, { useState } from 'react';
import {
  Home,
  FileText,
  CheckCircle,
  Settings,
  Menu,
  LogOut,
  X
} from 'lucide-react';
import Footer from './Footer';
import Evaluation from './Evaluation';
import AdminList from './AdminList';
import AddStudent from './AddStudent';
import { useNavigate } from "react-router-dom";


const SuperAdminHomePage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navItems = [
    { icon: FileText, label: 'Admin', id: 'admin' },
    { icon: CheckCircle, label: 'Evaluation', id: 'evaluation' },
    { icon: Settings, label: 'Students', id: 'studentlist' }
  ];

  const logout = () => {
    localStorage.removeItem('adminEmail')
    navigate("/");
  }
  const renderPage = () => {
    switch (currentPage) {
      case 'admin' : return <AdminList />;
      case 'evaluation' : return <Evaluation />;
      case 'studentlist' :return <AddStudent />
      default: return <AdminList />;
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <div className={`${collapsed ? 'w-16' : 'w-64'} flex flex-col bg-gradient-to-b from-teal-800 via-teal-900 to-slate-900 shadow-xl transition-all duration-300 ease-in-out overflow-hidden`}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-teal-700/50">
            {!collapsed && (
              <div className="flex items-center">
                <span className="text-lg font-bold text-white ml-2">AppraisePro</span>
              </div>
            )}
            <button 
              className="p-2 rounded-md hover:bg-teal-700/50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-800 text-teal-100"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <Menu size={20} /> : <X size={10} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col py-6 space-y-2 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center px-4 py-3 rounded-md transition-all duration-200 ease-in-out ${
                  currentPage === item.id
                    ? 'bg-teal-600/50 text-white font-medium border-l-2 border-teal-400'
                    : 'text-teal-100 hover:bg-teal-700/30 hover:text-white'
                }`}
              >
                <item.icon size={20} className={currentPage === item.id ? "text-teal-200" : "text-teal-300"} />
                {!collapsed && <span className="ml-3 font-medium">{item.label}</span>}
              </button>
            ))}
              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-indigo-100 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <LogOut size={20} className="flex-shrink-0" />
                {!collapsed && <span className="ml-4">Logout</span>}
              </button>
          </nav>
          
          {/* Bottom section with version or profile info */}
          {!collapsed && (
            <div className="mt-auto p-4 border-t border-teal-700/50 bg-teal-800/30">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-teal-600 to-teal-500 flex items-center justify-center text-white font-semibold shadow-md">A</div>
                <div className="text-xs text-teal-100">
                  <div className="font-medium">Admin Portal</div>
                  <div className="text-teal-300 text-xs">Professional Edition</div>
                </div>
              </div>
            </div>
          )}
          
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SuperAdminHomePage;