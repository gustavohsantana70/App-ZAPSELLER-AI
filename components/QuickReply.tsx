
import React, { useState } from 'react';
import { generateQuickReply } from '../services/geminiService';
import { QuickResponseResult } from '../types';

interface QuickReplyProps {
  onBack: () => void;
}

const QuickReply: React.FC<QuickReplyProps> = ({ onBack }) => {
  const [clientMsg, setClientMsg] = useState('');
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuickResponseResult | null>(null);

  const handleGenerate = async () => {
    if (!clientMsg || !product) return;
    setLoading(true);
    try {
      const res = await generateQuickReply(clientMsg, product);
      setResult(res);
    } catch (e) {
      alert("Erro ao processar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-[#6B7280] hover:text-[#111827] transition-colors p-2 hover:bg-[#E5E7EB] rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-lg font-bold text-[#111827]">Resposta Rápida</h2>
        <div className="w-10"></div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1 tracking-widest">Qual o seu produto?</label>
          <input 
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#16A34A] outline-none text-sm text-[#16A34A] bg-white font-medium placeholder:text-[#6B7280]/40"
            placeholder="Ex: Creme Anti-Rugas"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-[#6B7280] mb-1 tracking-widest">O que o cliente disse?</label>
          <textarea 
            value={clientMsg}
            onChange={(e) => setClientMsg(e.target.value)}
            className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#16A34A] outline-none text-sm resize-none text-[#16A34A] bg-white font-medium placeholder:text-[#6B7280]/40"
            placeholder="Cole aqui a mensagem do cliente..."
            rows={3}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !clientMsg}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-md transition-all ${loading ? 'bg-green-400 cursor-wait' : 'bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] hover:shadow-lg'}`}
        >
          {loading ? "Pensando..." : "Gerar Resposta de Fechamento"}
        </button>
      </div>

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
          <div className="bg-[#DCFCE7]/50 p-6 rounded-3xl border border-[#DCFCE7]">
            <span className="text-[10px] font-bold text-[#15803D] uppercase mb-2 block tracking-widest">Dica do Especialista</span>
            <p className="text-[#15803D] text-sm italic">"{result.tip}"</p>
          </div>
          <div className="bg-[#e5ddd5] p-6 rounded-3xl border border-[#E5E7EB] relative group shadow-inner">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase mb-2 block tracking-[0.2em]">Resposta Sugerida</span>
            <p className="text-[#111827] text-sm whitespace-pre-wrap leading-relaxed italic">"{result.message}"</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result.message);
                alert("Copiado!");
              }}
              className="mt-6 bg-white px-6 py-2 rounded-xl text-xs font-bold text-[#16A34A] border border-[#E5E7EB] shadow-sm hover:bg-[#DCFCE7] transition-all"
            >
              Copiar Resposta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickReply;
