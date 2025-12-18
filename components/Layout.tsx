
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  onLogout?: () => void;
  onNavigateHome?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userEmail, onLogout, onNavigateHome }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button 
            onClick={onNavigateHome}
            className="flex items-center space-x-2 focus:outline-none group"
          >
            {/* Logotipo 'ZS' estilizado */}
            <div className="bg-[#16A34A] w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transform group-hover:scale-105 transition-transform">
              <span className="text-white font-black italic text-xl tracking-tighter">ZS</span>
            </div>
            <div className="flex items-center space-x-1 uppercase tracking-tight">
              <span className="text-xl font-black text-[#111827]">ZapSeller</span>
              <span className="text-xl font-black text-[#16A34A]">AI</span>
            </div>
          </button>
          
          {userEmail && (
            <div className="flex items-center space-x-2">
              {/* Badge de Usuário - Contraste Máximo (Preto no Branco) */}
              <div className="hidden sm:flex items-center bg-white border-2 border-[#16A34A] px-3 py-1.5 rounded-xl shadow-sm">
                <span className="text-sm font-black text-[#000000] truncate max-w-[220px]">
                  {userEmail}
                </span>
              </div>
              
              <button 
                onClick={onLogout}
                className="text-xs font-black text-[#111827] uppercase tracking-widest bg-[#F3F4F6] hover:bg-red-50 hover:text-red-600 transition-all px-3 py-2 rounded-xl border border-[#E5E7EB]"
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
      <footer className="bg-white border-t border-[#E5E7EB] py-10 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all opacity-80">
             <div className="bg-[#16A34A] w-6 h-6 rounded-md flex items-center justify-center">
              <span className="text-white font-black italic text-[10px]">ZS</span>
            </div>
            <span className="text-sm font-black text-[#111827] tracking-widest uppercase">ZAPSELLER AI</span>
          </div>
          <p className="text-xs font-bold text-[#6B7280] uppercase tracking-tighter">
            &copy; 2024 ZapSeller AI - Tecnologia para Vendedores CoD.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
