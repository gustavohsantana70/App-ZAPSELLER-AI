
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
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8 mt-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#111827]">
          {isRegistering ? 'Crie sua conta' : 'Acesse o ZapSeller'}
        </h2>
        <p className="text-[#6B7280] mt-2">
          Gere scripts profissionais em segundos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none transition-all text-[#16A34A] font-medium bg-white"
            placeholder="exemplo@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#16A34A] focus:border-[#16A34A] outline-none transition-all text-[#16A34A] font-medium bg-white"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold py-3 rounded-lg shadow-sm hover:shadow-md transform active:scale-[0.98] transition-all"
        >
          {isRegistering ? 'Cadastrar' : 'Entrar'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-sm text-[#16A34A] hover:underline font-medium"
        >
          {isRegistering ? 'Já tem conta? Faça login' : 'Ainda não tem conta? Cadastre-se'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
