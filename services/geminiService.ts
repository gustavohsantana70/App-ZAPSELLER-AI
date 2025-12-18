
import { GoogleGenAI, Type } from "@google/genai";
import { ProductData, ScriptResult, QuickResponseResult, ScriptVariant } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScript = async (data: ProductData, variant: ScriptVariant = 'persuasive'): Promise<ScriptResult> => {
  const nicheLabels = {
    physical: "Produtos Físicos (Geral)",
    cosmetics: "Beleza e Cosméticos (Foco em autoestima/resultado)",
    affiliate: "Afiliados (Foco em prova social e indicação)",
    infoproduct: "Infoprodutos (Foco em transformação e facilidade)",
    cod_special: "Especial CoD (Foco total na segurança da entrega)"
  };

  const variantInstructions = {
    short: "Mensagens ultra curtas, quase telegráficas, direto ao ponto.",
    direct: "Linguagem clara, sem rodeios, focada em resolver o problema logo.",
    persuasive: "Uso moderado de gatilhos como urgência, escassez e muitos benefícios."
  };

  const prompt = `
    Você é um SISTEMA DE ATENDIMENTO INTELIGENTE especializado em WhatsApp.
    Contexto:
    - Nicho: ${nicheLabels[data.nicheTemplate]}
    - Modo: ${data.mode}
    - Estilo: ${variantInstructions[variant]}
    - Produto: ${data.name}
    - Preço: ${data.price}
    - Benefícios: ${data.benefits}

    Regras de Ouro:
    1. Pagamento somente na entrega (CoD) deve ser o argumento central de fechamento.
    2. Linguagem 100% humana, sem "Prezado" ou termos formais. Use "Oi", "Tudo bem?", etc.
    3. Retorne no formato JSON com abertura, qualificação, pitch, objeções, fechamento, indicador de qualidade e um checklist de 4 itens para o vendedor conferir.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          opening: { type: Type.STRING },
          qualification: { type: Type.STRING },
          pitch: { type: Type.STRING },
          objections: { type: Type.STRING },
          closing: { type: Type.STRING },
          qualityIndicator: { type: Type.STRING, enum: ['Alto', 'Médio'] },
          checklist: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Checklist de fechamento (ex: 'Preço reforçado', 'Urgência criada')"
          }
        },
        required: ["opening", "qualification", "pitch", "objections", "closing", "qualityIndicator", "checklist"]
      }
    }
  });

  return JSON.parse(response.text) as ScriptResult;
};

export const generateQuickReply = async (clientMessage: string, product: string): Promise<QuickResponseResult> => {
  const prompt = `O cliente no WhatsApp disse: "${clientMessage}". O produto é: "${product}". Gere uma resposta curta, natural e persuasiva para continuar a venda e levar para o fechamento com pagamento na entrega. Dê também uma dica rápida de como agir.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          message: { type: Type.STRING, description: "A resposta para o cliente" },
          tip: { type: Type.STRING, description: "Dica curta para o vendedor" }
        },
        required: ["message", "tip"]
      }
    }
  });

  return JSON.parse(response.text) as QuickResponseResult;
};
