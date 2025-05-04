import React, { useState } from 'react';
import { 
    BookOpen  , 
    MessageCircle ,
  Menu,
} from 'lucide-react';
import Resource from './Resource';


const StudentHomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState('resource');
  
    const navItems = [
      { icon: BookOpen  , label: 'Resource', id: 'resource' }
    ];
  
    const renderPage = () => {
      switch (currentPage) {
        case 'resource': return <Resource />;
        default: return <Resource />;
      }
    };
  
    return (
      <div className="flex h-screen bg-sky-50">
      <div className={`bg-indigo-800 text-white transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'} flex flex-col shadow-lg`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-indigo-700">
          {!collapsed && <span className="font-bold text-xl tracking-tight">AppraisePro</span>}
          <button 
            className="p-1.5 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 pt-4 pb-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center px-4 py-3 transition-colors duration-200 ${
                currentPage === item.id 
                  ? 'bg-indigo-900 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-700'
              } ${collapsed ? 'justify-center' : 'justify-start'}`}
            >
              <item.icon size={20} className={collapsed ? '' : 'mr-3'} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {renderPage()}
        </div>
      </main>
    </div>
    );
}

export default StudentHomePage