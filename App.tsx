
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Generator from './components/Generator';
import Result from './components/Result';
import QuickReply from './components/QuickReply';
import { generateScript } from './services/geminiService';
import { User, ProductData, ScriptResult, View, HistoryItem, ScriptVariant } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingVariant, setIsGeneratingVariant] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<ScriptResult | null>(null);
  const [lastProductData, setLastProductData] = useState<ProductData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeHistoryItem, setActiveHistoryItem] = useState<HistoryItem | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('zapSellerUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('DASHBOARD');
    }
    const savedHistory = localStorage.getItem('zapSellerHistory');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleLogin = (email: string) => {
    const newUser = { email, isLoggedIn: true };
    setUser(newUser);
    localStorage.setItem('zapSellerUser', JSON.stringify(newUser));
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('zapSellerUser');
    setCurrentView('LOGIN');
  };

  const handleGenerateScript = async (data: ProductData, variant: ScriptVariant = 'persuasive') => {
    if (variant === 'persuasive') setIsLoading(true);
    else setIsGeneratingVariant(true);
    
    try {
      const script = await generateScript(data, variant);
      setLastProductData(data);
      
      if (variant === 'persuasive') {
        const newItem: HistoryItem = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
          productData: data,
          result: script
        };
        const updatedHistory = [newItem, ...history].slice(0, 20);
        setHistory(updatedHistory);
        localStorage.setItem('zapSellerHistory', JSON.stringify(updatedHistory));
      }
      
      setGeneratedScript(script);
      setCurrentView('RESULT');
    } catch (error) {
      alert("Erro ao processar atendimento inteligente.");
    } finally {
      setIsLoading(false);
      setIsGeneratingVariant(false);
    }
  };

  const renderView = () => {
    if (!user && currentView !== 'LOGIN') return <Auth onLogin={handleLogin} />;

    switch (currentView) {
      case 'LOGIN': return <Auth onLogin={handleLogin} />;
      case 'DASHBOARD':
        return (
          <Dashboard 
            onStartGenerator={() => setCurrentView('GENERATOR')} 
            onOpenQuickReply={() => setCurrentView('QUICK_REPLY')}
            history={history}
            onViewHistory={(item) => {
              setActiveHistoryItem(item);
              setCurrentView('HISTORY_DETAIL');
            }}
          />
        );
      case 'GENERATOR': return <Generator onGenerate={handleGenerateScript} isLoading={isLoading} />;
      case 'QUICK_REPLY': return <QuickReply onBack={() => setCurrentView('DASHBOARD')} />;
      case 'RESULT':
        return generatedScript ? (
          <Result 
            script={generatedScript} 
            onReset={() => setCurrentView('DASHBOARD')}
            isGeneratingVariant={isGeneratingVariant}
            onGenerateVariant={(v) => lastProductData && handleGenerateScript(lastProductData, v)}
          />
        ) : <Dashboard onStartGenerator={() => setCurrentView('GENERATOR')} onOpenQuickReply={() => setCurrentView('QUICK_REPLY')} history={history} onViewHistory={() => {}} />;
      case 'HISTORY_DETAIL':
        return activeHistoryItem ? (
          <Result 
            script={activeHistoryItem.result} 
            onReset={() => setCurrentView('DASHBOARD')} 
          />
        ) : <Dashboard onStartGenerator={() => setCurrentView('GENERATOR')} onOpenQuickReply={() => setCurrentView('QUICK_REPLY')} history={history} onViewHistory={() => {}} />;
      default: return <Dashboard onStartGenerator={() => setCurrentView('GENERATOR')} onOpenQuickReply={() => setCurrentView('QUICK_REPLY')} history={history} onViewHistory={() => {}} />;
    }
  };

  return (
    <Layout userEmail={user?.email} onLogout={handleLogout} onNavigateHome={() => user && setCurrentView('DASHBOARD')}>
      {renderView()}
    </Layout>
  );
};

export default App;
