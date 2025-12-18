
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
        <button onClick={onBack} className="text-gray-400 hover:text-gray-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-lg font-bold text-gray-900">Resposta Rápida</h2>
        <div className="w-6"></div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Qual o seu produto?</label>
          <input 
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            placeholder="Ex: Creme Anti-Rugas"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">O que o cliente disse?</label>
          <textarea 
            value={clientMsg}
            onChange={(e) => setClientMsg(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
            placeholder="Cole aqui a mensagem do cliente..."
            rows={3}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !clientMsg}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? "Pensando..." : "Gerar Resposta de Fechamento"}
        </button>
      </div>

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
            <span className="text-[10px] font-bold text-green-600 uppercase mb-2 block">Dica do Especialista</span>
            <p className="text-green-800 text-sm italic">"{result.tip}"</p>
          </div>
          <div className="bg-[#e5ddd5] p-6 rounded-3xl border border-gray-200 relative group">
            <span className="text-[10px] font-bold text-gray-400 uppercase mb-2 block tracking-widest">Resposta Sugerida</span>
            <p className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed italic">"{result.message}"</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(result.message);
                alert("Copiado!");
              }}
              className="mt-4 bg-white px-4 py-2 rounded-lg text-xs font-bold text-blue-600 border border-gray-200 shadow-sm hover:bg-blue-50"
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
