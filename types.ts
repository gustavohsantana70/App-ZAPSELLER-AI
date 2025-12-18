
export type AttendanceMode = 'initial' | 'recovery' | 'objections' | 'closing';
export type SellerType = 'beginner' | 'professional';
export type Tone = 'neutral' | 'persuasive';
export type NicheTemplate = 'physical' | 'cosmetics' | 'affiliate' | 'infoproduct' | 'cod_special';
export type ScriptVariant = 'short' | 'direct' | 'persuasive';

export interface User {
  email: string;
  isLoggedIn: boolean;
}

export interface ProductData {
  name: string;
  price: string;
  nicheTemplate: NicheTemplate;
  benefits: string;
  mode: AttendanceMode;
  sellerType: SellerType;
  tone: Tone;
}

export interface ScriptResult {
  opening: string;
  qualification: string;
  pitch: string;
  objections: string;
  closing: string;
  qualityIndicator: 'Alto' | 'Médio';
  checklist: string[];
}

export interface QuickResponseResult {
  message: string;
  tip: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  productData: ProductData;
  result: ScriptResult;
}

export type View = 'LOGIN' | 'DASHBOARD' | 'GENERATOR' | 'RESULT' | 'HISTORY_DETAIL' | 'QUICK_REPLY';
