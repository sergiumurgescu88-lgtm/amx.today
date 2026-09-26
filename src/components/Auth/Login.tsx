import React, { useState } from 'react';
import { Lock, Mail, AlertTriangle, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulăm un delay de rețea pentru realism (800ms)
    setTimeout(() => {
      // ⚠️ REGULA 4 WARNING: Verificare frontend STRICT PENTRU TEST.
      // În producție, această logică trebuie mutată pe un backend securizat sau Firebase Auth.
      if (email === 'sergiu.murgescu88@gmail.com' && password === 'Nuamparola123@') {
        localStorage.setItem('trinity_auth_token', 'mock_secure_jwt_token_v1');
        localStorage.setItem('trinity_user_email', email);
        localStorage.setItem('trinity_user_tier', 'COPY_TRADING_PRO');
        onLogin(true);
      } else {
        setError('Email sau parolă incorecte. Vă rugăm să încercați din nou.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-[#0B0C10] border border-[#66FCF1]/30 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-[#66FCF1]/10">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-[#66FCF1]/10 flex items-center justify-center border border-[#66FCF1]/30">
              <ShieldCheck className="w-6 h-6 text-[#66FCF1]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">TRINITY FUND • SAAS GATEWAY</h2>
          <p className="text-slate-400 text-sm">
            Conectează-te pentru a accesa datele live și auditul de performanță.
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200 leading-relaxed">
            <strong>MOD TEST:</strong> Acest formular utilizează validare locală pentru demonstrație. 
            Credențialele nu sunt transmise către niciun server în această versiune.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">ADRESĂ EMAIL</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1F2833] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#66FCF1] focus:ring-1 focus:ring-[#66FCF1]/50 transition-all"
                placeholder="sergiu.murgescu88@gmail.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">PAROLĂ</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1F2833] border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#66FCF1] focus:ring-1 focus:ring-[#66FCF1]/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
              <p className="text-red-400 text-xs font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#66FCF1] hover:bg-[#45d9d0] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B0C10] font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? (
              <span className="animate-pulse">Se verifică credențialele...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Autentificare Securizată
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            Raportul complet Myfxbook, detaliile tranzacțiilor pe secundă și curba de capital sunt accesibile doar utilizatorilor înregistrați.
          </p>
        </div>
      </div>
    </div>
  );
}
