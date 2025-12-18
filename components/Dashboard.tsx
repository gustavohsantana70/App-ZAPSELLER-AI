
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
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-[#111827] uppercase tracking-tight">
            Atendimento <span className="text-[#16A34A]">Inteligente</span>
          </h1>
          <p className="text-[#6B7280] text-sm font-medium">Escalando suas vendas via WhatsApp</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onStartGenerator}
          className="bg-[#16A34A] p-6 rounded-2xl text-left shadow-md hover:shadow-lg transition-all border border-[#16A34A]/20 group"
        >
          <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-white font-black text-lg uppercase tracking-tight">Criar Script</h3>
          <p className="text-green-100 text-xs mt-1 font-medium">IA focada em fechamento e CoD.</p>
        </button>

        <button
          onClick={onOpenQuickReply}
          className="bg-white p-6 rounded-2xl text-left shadow-sm hover:shadow-md transition-all border border-[#E5E7EB] group"
        >
          <div className="bg-[#DCFCE7] w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <svg className="w-6 h-6 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-[#111827] font-black text-lg uppercase tracking-tight">Resposta Rápida</h3>
          <p className="text-[#6B7280] text-xs mt-1 font-medium">Contorne objeções em tempo real.</p>
        </button>
      </div>

      {/* Status da Assinatura - Agora exibindo ATIVADO conforme solicitado */}
      <div className="bg-[#DCFCE7] rounded-2xl p-4 border border-[#16A34A]/20 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg shadow-inner">
             <div className="bg-[#16A34A] h-2 w-2 rounded-full animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#15803D] text-[11px] font-black uppercase tracking-widest leading-none">Status da Assinatura</span>
            <span className="text-[#16A34A] text-sm font-black uppercase tracking-tighter">Plano Pro: Ativado</span>
          </div>
        </div>
        <div className="flex items-center bg-white/50 px-3 py-1 rounded-full border border-[#16A34A]/10">
          <span className="text-[#15803D] text-[10px] font-black uppercase">Membro VIP</span>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-[11px] font-black text-[#6B7280] uppercase tracking-[0.2em] flex items-center">
          <span className="w-8 h-[1px] bg-[#E5E7EB] mr-2"></span>
          Histórico de Atendimentos
        </h2>
        {history.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-[#E5E7EB] rounded-2xl p-10 text-center">
             <p className="text-[#6B7280]/40 italic text-sm font-medium">Inicie um atendimento para ver o histórico...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 5).map((item) => (
              <div 
                key={item.id} 
                onClick={() => onViewHistory(item)}
                className="bg-white border border-[#E5E7EB] p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:border-[#16A34A]/40 transition-all hover:shadow-md group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F9FAFB] flex items-center justify-center text-[#16A34A] group-hover:bg-[#DCFCE7] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-black text-[#111827] text-sm uppercase tracking-tight">{item.productData.name}</h4>
                    <p className="text-[10px] text-[#6B7280] font-bold uppercase tracking-wider">{item.productData.nicheTemplate} • {new Date(item.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-[#F9FAFB] p-2 rounded-lg group-hover:bg-[#DCFCE7] transition-colors">
                  <svg className="w-4 h-4 text-[#6B7280] group-hover:text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
