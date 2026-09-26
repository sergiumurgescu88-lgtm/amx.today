const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'De ce să aleg Trinity Fund în loc de alți boți de trading?',
    answer: 'Pentru transparență radicală și onestitate. Nu promitem "profit garantat" sau Win Rate de 90% (care ascund strategii toxice de tip Martingale). Oferim un sistem verificabil, cu gestionare profesională a riscului și track record real, unde protecția capitalului este prioritatea nr. 1.'
  },
  {
    id: 'faq-2',
    question: 'Care este diferența reală între cele 3 planuri (Starter, Pro, Institutional)?',
    answer: 'Scalabilitatea și controlul. Planul Starter este perfect pentru testare cu risc minim. Pro deblochează accesul la toți algoritmii necorelați (Alpha, Beta, Gamma) pentru diversificare. Institutional oferă loturi scalate dinamic, suport prioritar 1-la-1 și configurare personalizată a parametrilor de risc.'
  },
  {
    id: 'faq-3',
    question: 'Am un cont mic (ex: 1.000$). Este acest sistem potrivit pentru mine?',
    answer: 'Absolut. Datorită sistemului nostru de Dynamic Lot Sizing, mărimea tranzacției se calculează automat proporțional cu soldul tău. Începi cu 0.01 loturi, menținând riscul per trade sub 1%, exact ca un fond de investiții mare, dar adaptat capitalului tău.'
  },
  {
    id: 'faq-4',
    question: 'De ce aveți un Win Rate de ~60% și nu 90%+?',
    answer: 'Pentru că matematica nu minte. Un Win Rate de 90% este obținut de obicei prin strategii care măresc lotul după fiecare pierdere, ducând inevitabil la arderea contului (Margin Call). Noi avem un Win Rate realist de ~60%, dar cu un Risk/Reward asimetric: câștigăm mult mai mult când avem dreptate decât pierdem când greșim.'
  },
  {
    id: 'faq-5',
    question: 'Ce se întâmplă dacă piața este extrem de volatilă sau apare un Drawdown?',
    answer: 'Sentinelele noastre de risc (Chronos & Hades) intră în acțiune. Chronos oprește trading-ul înaintea știrilor macroeconomice majore (NFP, FOMC). Hades reduce automat expunerea (Lot Sizing) cu 50% dacă detectează o anomalie de lichiditate. Nu folosim Martingale pentru a "recupera rapid", ci lăsăm probabilitatea matematică să își facă treaba.'
  },
  {
    id: 'faq-6',
    question: 'Pot să opresc botul sau să îmi retrag banii oricând?',
    answer: '100% DA. Folosim o arhitectură Non-Custodial. Noi nu avem niciodată acces la fondurile tale și nu îți cerem parola de la broker. Conexiunea se face prin cTrader Copy/API, unde TU deții controlul total. Poți opri copierea sau retrage fondurile în orice secundă, direct din platforma brokerului.'
  },
  {
    id: 'faq-7',
    question: 'Cât durează până văd rezultate după activare?',
    answer: 'Procesul de Onboarding durează mai puțin de 5 minute. Odată ce ai activat licența și ai conectat contul cTrader, sistemul începe să scaneze piața și să execute tranzacții în timp real, 24/5 (Luni - Vineri), complet autonom.'
  },
  {
    id: 'faq-8',
    question: 'De ce tranzacționați preponderent pe XAUUSD (Aur)?',
    answer: 'Specializarea este cheia excelenței instituționale. XAUUSD oferă cea mai mare lichiditate, volatilitate constantă și respectă cel mai bine analiza tehnică. În loc să fim "mediocri" pe 20 de instrumente, suntem "elițiști" pe cel mai profitabil instrument din lume.'
  },
  {
    id: 'faq-9',
    question: 'Există taxe ascunse sau comisioane de performanță?',
    answer: 'Transparență totală: Nu avem taxe ascunse. Modelul nostru este SaaS (un abonament lunar fix pentru licența botului). Nu luăm procent din profitul tău (Performance Fee), spre deosebire de fondurile tradiționale care iau 20-30%. 100% din profit este al tău.'
  },
  {
    id: 'faq-10',
    question: 'De ce să aleg planul Institutional în loc de Starter?',
    answer: 'Dacă ai un capital mai mare și vrei optimizare maximă, planul Institutional deblochează accesul la toți cei 10 noduri ale Bot Matrix, permite scalarea inteligentă a loturilor și include sesiuni lunare de review 1-la-1 cu echipa noastră de dezvoltare pentru a ajusta parametrii la profilul tău de risc.'
  },
  {
    id: 'faq-11',
    question: 'Trebuie să țin calculatorul meu pornit non-stop?',
    answer: 'Nu. Toți algoritmii Trinity rulează pe servere cloud dedicate (VPS) cu latență ultra-mică (sub 15ms către broker). Odată activat, sistemul rulează complet autonom, indiferent dacă calculatorul tău este deschis sau nu.'
  },
  {
    id: 'faq-12',
    question: 'Cum funcționează suportul tehnic dacă întâmpin o problemă?',
    answer: 'Nu folosim tichete de suport care răspund în 48 de ore. Clienții Trinity au acces la un canal dedicat (Discord/Telegram privat) unde primesc răspunsuri directe și rapide de la echipa de dezvoltare. Pentru licențele Pro și Institutional, oferim suport prioritar absolut.'
  }
];

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Send, 
  MessageSquare, 
  Server, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ArrowRight, 
  CreditCard,
  Building2,
  Lock,
  ExternalLink,
  X,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { UserProfile, SubscriptionTier } from '../../hooks/useUserProfile';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaLabel: string;
  ctaAction: string;
  tagline: string;
}

interface PricingProps {
  userProfile?: UserProfile | null;
  onNavigateToCommandCenter?: () => void;
  onUpgradeTier?: (tier: SubscriptionTier) => void;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'signals-vip',
    name: 'Signals VIP',
    price: '49€',
    period: '/lună',
    description: 'Acces la semnalele brute în timp real pentru traderii independenți care doresc execuție manuală.',
    tagline: 'Ideal pentru conturi începătoare sau învățare',
    features: [
      'Alerte Telegram în timp real (execuție < 1 secundă)',
      'Analiză macro zilnică și sinteză știri COT & DXY',
      'Acces exclusiv în comunitatea privată Discord / Telegram',
      'Configurații detaliate de Stop Loss și Take Profit pe pips',
      'Rapoarte săptămânale de performanță'
    ],
    ctaLabel: 'Join VIP',
    ctaAction: 'signals'
  },
  {
    id: 'copy-trading-pro',
    name: 'Copy Trading Pro',
    price: '199€',
    period: '/lună SAU 25% din Profit',
    description: 'Soluția complet automatizată. Contul tău cTrader replică instant fiecare ordin trimis de cei 10 boți.',
    tagline: 'Soluția recomandată de fond (Zero stres tehnic)',
    badge: 'MOST POPULAR',
    isPopular: true,
    features: [
      'Execuție 100% automată prin cTrader Copy Protocol',
      'Dynamic Lot Sizing (ajustare automată pentru protecția conturilor mici)',
      'Protecție VETO activă împotriva spread-urilor de rollover (Chronos & Hades)',
      'Fără VPS necesar – rulează direct pe infrastructura noastră cloud',
      'Suport tehnic prioritar 1-la-1 prin Telegram / WhatsApp',
      'Opțiune flexibilă: Taxă fixă sau High-Water Mark (25% din profit net)'
    ],
    ctaLabel: 'Start Copying',
    ctaAction: 'copy'
  },
  {
    id: 'institutional-license',
    name: 'Institutional License',
    price: 'Custom',
    period: '/ de la 2.000€+',
    description: 'Licențiere completă pentru prop firms, family offices, administratori de fond sau traderi cu capital mare.',
    tagline: 'Pentru prop firms și capital instituțional',
    features: [
      'Acces direct la Open API & Gateway Service (Protobuf / FIX)',
      'Soluție completă White-Label cu branding propriu',
      'Server dedicat dedicat la Frankfurt LD4 (latență < 1.5ms)',
      'Strategii customizate & calibrare parametri de risc personalizați',
      'Manager de cont dedicat & asistență pentru auditare reglementară',
      'SLA garantat de disponibilitate 99.9%'
    ],
    ctaLabel: 'Contact Sales',
    ctaAction: 'institutional'
  }
];

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}



export const Pricing: React.FC<PricingProps> = ({
  userProfile,
  onNavigateToCommandCenter,
  onUpgradeTier
}) => {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [modalTier, setModalTier] = useState<PricingTier | null>(null);

  const isCopyTradingActive = userProfile?.subscriptionTier === 'COPY_TRADING_PRO';

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INSTITUTIONAL QUANT ACCESS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          Alege Nivelul Tău de Acces la Flota Trinity Fund
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Execuție algoritmică de mare viteză pe XAUUSD. Fie că alegi copiere automată sau licență instituțională dedicată, capitalul tău este protejat de aceleași sentinele de risc.
        </p>
      </div>

      {/* User Connected Status & Firestore Tier Selector */}
      {userProfile && (
        <div className="bg-[#121822]/90 border border-slate-700/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono shadow-md">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
            <span className="text-slate-300">
              Cont Conectat: <strong className="text-white">{userProfile.email}</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30 font-bold text-[11px]">
              {userProfile.subscriptionTier}
            </span>
            {isCopyTradingActive && (
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 text-[10px] font-bold">
                cTrader Sync ACTIV
              </span>
            )}
          </div>
          {onUpgradeTier && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 text-[11px]">Schimbă Plan (Mock Auth):</span>
              {(['FREE', 'VIP_SIGNALS', 'COPY_TRADING_PRO'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => onUpgradeTier(tier)}
                  className={`min-h-[32px] px-2.5 py-1 rounded text-[10px] font-mono transition-all ${
                    userProfile.subscriptionTier === tier
                      ? 'bg-[#10B981] text-black font-bold shadow-sm shadow-[#10B981]/30'
                      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                  }`}
                >
                  {tier === 'COPY_TRADING_PRO' ? 'COPY TRADING' : tier === 'VIP_SIGNALS' ? 'VIP SIGNALS' : 'FREE'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Three Horizontal Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2">
        {PRICING_TIERS.map((tier) => {
          const isPopular = tier.isPopular;

          return (
            <motion.div
              key={tier.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md transition-all duration-300 ${
                isPopular
                  ? 'bg-gradient-to-b from-[#1F2833]/95 via-[#16212e]/95 to-[#0d141f]/95 border-2 border-[#66FCF1] shadow-2xl shadow-[#66FCF1]/15 md:scale-105 z-10'
                  : 'bg-[#1F2833]/70 border border-slate-700/60 shadow-xl hover:border-slate-600'
              }`}
            >
              {/* Badge for Popular Card */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#66FCF1] text-black text-[11px] font-mono font-bold tracking-wider uppercase shadow-lg shadow-[#66FCF1]/30">
                  {tier.badge}
                </div>
              )}

              <div>
                {/* Header of Card */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className={`text-xl font-bold font-mono ${isPopular ? 'text-[#66FCF1]' : 'text-white'}`}>
                    {tier.name}
                  </h3>
                  {isPopular && (
                    <span className="p-1 rounded-full bg-[#66FCF1]/20 text-[#66FCF1]">
                      <Zap className="w-4 h-4 fill-[#66FCF1]" />
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 mb-4 font-mono">
                  {tier.tagline}
                </div>

                {/* Price Display */}
                <div className="mb-4 pb-4 border-b border-slate-700/60">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                      {tier.price}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {tier.period}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Feature List */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Ce primești inclus:
                  </div>
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E2E8F0] font-sans">
                      <div className={`p-0.5 rounded-full mt-0.5 shrink-0 ${
                        isPopular ? 'bg-[#66FCF1]/20 text-[#66FCF1]' : 'bg-[#10B981]/20 text-[#10B981]'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {tier.id === 'copy-trading-pro' && isCopyTradingActive ? (
                  <button
                    onClick={() => {
                      if (onNavigateToCommandCenter) {
                        onNavigateToCommandCenter();
                      } else {
                        setModalTier(tier);
                      }
                    }}
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg bg-[#10B981] hover:bg-[#0ea571] text-black shadow-[#10B981]/25 hover:shadow-[#10B981]/40"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✅ Activ - Accesează Panoul de Control</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setModalTier(tier)}
                    className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                      isPopular
                        ? 'bg-[#66FCF1] hover:bg-[#52e5d9] text-black shadow-[#66FCF1]/25 hover:shadow-lg hover:shadow-[#66FCF1]/35'
                        : 'bg-[#121822] hover:bg-[#1A2330] text-[#E2E8F0] border border-slate-700/80 hover:border-[#66FCF1]/40'
                    }`}
                  >
                    <span>{tier.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Safety & Trust Highlights Strip */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#121822]/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#94A3B8]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#10B981]/15 text-[#10B981]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-bold">Fonduri Non-Custodiale</div>
            <div className="text-[11px] text-slate-400">Banii rămân în contul tău cTrader</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#66FCF1]/15 text-[#66FCF1]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-bold">Latență Sub-15ms</div>
            <div className="text-[11px] text-slate-400">Execuție directă Frankfurt Equinix LD4</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-bold">Circuit Breaker Integrat</div>
            <div className="text-[11px] text-slate-400">Stop loss automat la nivel de flotă</div>
          </div>
        </div>
      </div>

      {/* 4. Frequently Asked Questions (FAQ Accordions) */}
      <div className="bg-[#1F2833]/80 backdrop-blur-md rounded-xl border border-slate-700/60 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-700/60">
          <HelpCircle className="w-5 h-5 text-[#66FCF1]" />
          <div>
            <h3 className="text-base font-bold font-mono text-white">
              Întrebări Frecvente (FAQ)
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Tot ce trebuie să știi înainte de conectarea contului la sistemul Trinity Fund.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openFaq === faq.id;

            return (
              <div 
                key={faq.id}
                className="rounded-lg bg-[#121822]/80 border border-slate-700/60 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full min-h-[48px] px-4 py-3 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-mono font-medium text-white hover:text-[#66FCF1] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#66FCF1]">Q:</span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#66FCF1] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                <div 
                  className={`px-4 pb-4 pt-1 text-xs text-[#94A3B8] leading-relaxed font-sans border-t border-slate-800 transition-all ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Direct Connect / Sales Modal */}
      <AnimatePresence>
        {modalTier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#121822] border border-[#66FCF1]/50 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#66FCF1]/20 text-[#66FCF1]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold font-mono text-white">
                    Activează {modalTier.name}
                  </h4>
                </div>
                <button
                  onClick={() => setModalTier(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#0B0C10] border border-slate-800 space-y-1.5">
                  <div className="text-slate-400">Plan Selectat:</div>
                  <div className="text-lg font-bold text-[#66FCF1]">{modalTier.name} ({modalTier.price})</div>
                  <div className="text-slate-500 text-[11px]">{modalTier.tagline}</div>
                </div>

                <p className="text-slate-300 font-sans leading-relaxed">
                  Pentru activare instantanee sau configurarea contului tău cTrader Copy, contactează direct biroul de trading Trinity Fund:
                </p>

                <div className="space-y-2 pt-1">
                  <a
                    href="https://t.me/TrinityFundQuant"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#0088cc] hover:bg-[#0077b5] text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Contact Telegram VIP Desk (@TrinityFundQuant)</span>
                  </a>

                  <a
                    href="mailto:sergiu.murgescu88@gmail.com?subject=Trinity%20Fund%20Access%20Request"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-lg bg-[#1F2833] hover:bg-slate-700 text-[#66FCF1] border border-[#66FCF1]/40 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Solicită Integrare cTrader prin Email</span>
                  </a>
                </div>

                <div className="text-[10px] text-slate-500 text-center pt-2">
                  Timp mediu de răspuns: &lt; 15 minute • Conexiune sigură cTrader Open API
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
