
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  onLogout?: () => void;
  onNavigateHome?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userEmail, onLogout, onNavigateHome }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onNavigateHome}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              ZapSeller AI
            </span>
          </button>
          
          {userEmail && (
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline text-sm text-gray-500">{userEmail}</span>
              <button 
                onClick={onLogout}
                className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl w-full mx-auto p-4 sm:p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center">
        <p className="text-sm text-gray-500">
          &copy; 2024 ZapSeller AI - Versão Beta. Feito para vendedores de elite.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
