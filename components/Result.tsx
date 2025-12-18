
import React, { useState } from 'react';
import { ScriptResult, ScriptVariant } from '../types';

interface ResultProps {
  script: ScriptResult;
  onReset: () => void;
  onGenerateVariant?: (variant: ScriptVariant) => void;
  isGeneratingVariant?: boolean;
}

const WhatsAppBubble: React.FC<{ content: string; label: string }> = ({ content, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col mb-4 items-start max-w-[95%]">
      <span className="text-[10px] uppercase font-bold text-gray-400 ml-3 mb-1">{label}</span>
      <div className="relative group bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm w-full">
        <p className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleCopy}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
              copied ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            {copied ? (
              <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg><span>Copiado!</span></>
            ) : (
              <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg><span>Copiar</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Result: React.FC<ResultProps> = ({ script, onReset, onGenerateVariant, isGeneratingVariant }) => {
  return (
    <div className="max-w-2xl mx-auto pb-16 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Atendimento Otimizado</h2>
          <div className="flex items-center space-x-2 mt-1">
             <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">
               Conversão: {script.qualityIndicator}
             </span>
          </div>
        </div>
        <button onClick={onReset} className="text-blue-600 text-sm font-bold hover:underline">Novo</button>
      </div>

      {/* Variações */}
      <div className="bg-gray-100 p-1 rounded-xl flex">
        {(['short', 'direct', 'persuasive'] as ScriptVariant[]).map((v) => (
          <button
            key={v}
            disabled={isGeneratingVariant}
            onClick={() => onGenerateVariant?.(v)}
            className="flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all hover:bg-white/50 active:bg-white"
          >
            {v === 'short' ? 'Curto' : v === 'direct' ? 'Direto' : 'Persuasivo'}
          </button>
        ))}
      </div>

      {/* Chat Simulado */}
      <div className="bg-[#e5ddd5] p-4 sm:p-6 rounded-3xl border border-gray-200 min-h-[500px] shadow-inner relative overflow-hidden">
        {isGeneratingVariant && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3">
               <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
               <span className="text-xs font-bold text-gray-700 uppercase">Ajustando tom...</span>
            </div>
          </div>
        )}
        <WhatsAppBubble label="Abertura Amigável" content={script.opening} />
        <WhatsAppBubble label="Sondagem / Qualificação" content={script.qualification} />
        <WhatsAppBubble label="Apresentação do Produto" content={script.pitch} />
        <WhatsAppBubble label="Tratando Dúvidas" content={script.objections} />
        <WhatsAppBubble label="Fechamento CoD" content={script.closing} />
      </div>

      {/* Checklist de Fechamento */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Checklist de Fechamento
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {script.checklist.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 text-xs text-gray-600 p-2 bg-gray-50 rounded-lg">
              <div className="h-4 w-4 border-2 border-blue-200 rounded flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
