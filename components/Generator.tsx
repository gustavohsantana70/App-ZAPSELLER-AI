
import React, { useState } from 'react';
import { ProductData, AttendanceMode, SellerType, Tone, NicheTemplate } from '../types';

interface GeneratorProps {
  onGenerate: (data: ProductData) => void;
  isLoading: boolean;
}

const Generator: React.FC<GeneratorProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    price: '',
    nicheTemplate: 'physical',
    benefits: '',
    mode: 'initial',
    sellerType: 'professional',
    tone: 'persuasive'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-[#E5E7EB] p-6 md:p-8">
        <h2 className="text-2xl font-black text-[#111827] mb-6 uppercase tracking-tight">Configurar Atendimento</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-[#16A34A] uppercase tracking-[0.2em]">1. Nicho & Produto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#6B7280] mb-1 uppercase">Escolha o Nicho</label>
                <select 
                  name="nicheTemplate" 
                  value={formData.nicheTemplate} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl bg-white text-sm focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none text-[#000000] font-black"
                >
                  <option value="physical">Produtos Físicos</option>
                  <option value="cosmetics">Cosméticos/Beleza</option>
                  <option value="affiliate">Afiliados</option>
                  <option value="infoproduct">Infoprodutos</option>
                  <option value="cod_special">Especial CoD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6B7280] mb-1 uppercase">Nome do Produto</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Super Slim Caps"
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none text-sm text-[#000000] bg-white font-black placeholder:text-[#6B7280]/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#6B7280] mb-1 uppercase">Preço Sugerido</label>
              <input
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ex: R$ 147,90"
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none text-sm text-[#000000] bg-white font-black placeholder:text-[#6B7280]/30"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-[#16A34A] uppercase tracking-[0.2em]">2. Inteligência de Venda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#6B7280] mb-1 uppercase">Momento da Conversa</label>
                <select 
                  name="mode" 
                  value={formData.mode} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl bg-white text-sm focus:ring-2 focus:ring-[#16A34A] outline-none text-[#000000] font-black"
                >
                  <option value="initial">Atendimento Inicial</option>
                  <option value="objections">Quebrar Objeções</option>
                  <option value="recovery">Recuperar Sumido</option>
                  <option value="closing">Fechamento Final</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6B7280] mb-1 uppercase">Tom de Voz</label>
                <select 
                  name="tone" 
                  value={formData.tone} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl bg-white text-sm focus:ring-2 focus:ring-[#16A34A] outline-none text-[#000000] font-black"
                >
                  <option value="neutral">Conversa Natural</option>
                  <option value="persuasive">Foco em Persuasão</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#6B7280] mb-1 uppercase">Destaque os Benefícios</label>
              <textarea
                required
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={2}
                placeholder="Ex: Entrega em 3 dias, Resolve a dor X..."
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#16A34A] outline-none resize-none text-sm text-[#000000] bg-white font-black placeholder:text-[#6B7280]/30"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-md transition-all flex items-center justify-center space-x-2 uppercase tracking-widest
              ${isLoading ? 'bg-green-400 cursor-wait' : 'bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.98] hover:shadow-lg'}`}
          >
            {isLoading ? "Otimizando Inteligência..." : "Gerar Script Pro"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Generator;
