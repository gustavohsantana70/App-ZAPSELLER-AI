
import React from 'react';
import { HistoryItem } from '../types';

interface DashboardProps {
  onStartGenerator: () => void;
  onOpenQuickReply: () => void;
  history: HistoryItem[];
  onViewHistory: (item: HistoryItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartGenerator, onOpenQuickReply, history, onViewHistory }) => {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
          Sistema de Atendimento <span className="text-blue-600">Inteligente</span>
        </h1>
        <p className="text-gray-500 text-sm">Versão Beta - Otimizado para conversão via WhatsApp</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onStartGenerator}
          className="bg-blue-600 p-6 rounded-2xl text-left shadow-lg hover:shadow-xl transition-all border border-blue-500 group"
        >
          <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          </div>
          <h3 className="text-white font-bold text-lg">Criar Atendimento</h3>
          <p className="text-blue-100 text-xs mt-1">Gere scripts completos baseados em nichos e CoD.</p>
        </button>

        <button
          onClick={onOpenQuickReply}
          className="bg-white p-6 rounded-2xl text-left shadow-md hover:shadow-lg transition-all border border-gray-100 group"
        >
          <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          </div>
          <h3 className="text-gray-900 font-bold text-lg">Resposta Rápida</h3>
          <p className="text-gray-500 text-xs mt-1">O cliente disse algo difícil? A IA resolve agora.</p>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 h-2 w-2 rounded-full animate-pulse"></div>
          <span className="text-blue-800 text-xs font-bold uppercase tracking-widest">Nível Pro Ativado</span>
        </div>
        <span className="text-blue-600 text-[10px] font-bold">R$ 19,90/mês</span>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Histórico Recente</h2>
        {history.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-100 rounded-2xl p-10 text-center text-gray-300 italic text-sm">
            Seus atendimentos aparecerão aqui...
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((item) => (
              <div 
                key={item.id} 
                onClick={() => onViewHistory(item)}
                className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-blue-200"
              >
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{item.productData.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{item.productData.nicheTemplate} • {new Date(item.timestamp).toLocaleDateString()}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
