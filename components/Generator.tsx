
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
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurar Atendimento</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-blue-600 uppercase">1. Nicho & Produto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Escolha o Nicho</label>
                <select 
                  name="nicheTemplate" 
                  value={formData.nicheTemplate} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="physical">Produtos Físicos</option>
                  <option value="cosmetics">Cosméticos/Beleza</option>
                  <option value="affiliate">Afiliados</option>
                  <option value="infoproduct">Infoprodutos</option>
                  <option value="cod_special">Especial CoD</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Nome do Produto</label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Super Slim Caps"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Preço Sugerido</label>
              <input
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ex: R$ 147,90"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-blue-600 uppercase">2. Inteligência de Venda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Momento da Conversa</label>
                <select 
                  name="mode" 
                  value={formData.mode} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm"
                >
                  <option value="initial">Atendimento Inicial</option>
                  <option value="objections">Quebrar Objeções</option>
                  <option value="recovery">Recuperar Sumido</option>
                  <option value="closing">Fechamento Final</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Tom de Voz</label>
                <select 
                  name="tone" 
                  value={formData.tone} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm"
                >
                  <option value="neutral">Conversa Natural</option>
                  <option value="persuasive">Foco em Persuasão</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Destaque os Benefícios (Breve)</label>
              <textarea
                required
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={2}
                placeholder="Ex: Entrega em 3 dias, Resolve a dor X..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-5 rounded-2xl font-bold text-lg text-white shadow-xl transition-all flex items-center justify-center space-x-2
              ${isLoading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 active:scale-95 hover:shadow-2xl'}`}
          >
            {isLoading ? "Otimizando Inteligência..." : "Criar Atendimento Inteligente"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Generator;
