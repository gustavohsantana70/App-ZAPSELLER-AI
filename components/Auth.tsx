
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {isRegistering ? 'Crie sua conta' : 'Acesse o ZapSeller'}
        </h2>
        <p className="text-gray-500 mt-2">
          Gere scripts profissionais em segundos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="exemplo@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all"
        >
          {isRegistering ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          {isRegistering ? 'Já tem conta? Faça login' : 'Ainda não tem conta? Cadastre-se'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
