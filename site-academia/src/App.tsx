import React, { useState } from 'react';
import {
  Dumbbell,
  Flame,
  Waves,
  ShieldAlert,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  Star,
  ArrowUpRight,
  Menu,
  X,
  MessageCircle,
  Accessibility,
  Sparkles,
  Users,
  CreditCard,
  QrCode,
  ShieldCheck,
  Copy,
  Check,
  Lock,
  Loader2,
} from 'lucide-react';
import PixelCard from './components/PixelCard';

type UnitKey = 'bela-vista' | 'vila-bressani';
type PaymentMethod = 'pix' | 'cartao' | 'convenio';
type CheckoutStep = 'form' | 'pix-qrcode' | 'success';

interface PlanOption {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  subtitle: string;
}

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitKey>('bela-vista');
  const [selectedDay, setSelectedDay] = useState<string>('SEG');

  const plansList: PlanOption[] = [
    {
      id: 'promo-39',
      name: '1º Mês Promocional (Fidelidade 5 meses)',
      price: 'R$ 39,90',
      numericPrice: 39.9,
      subtitle: 'Passa a R$ 159,90/mês após o 1º mês',
    },
    {
      id: 'combo-kids',
      name: 'Combo Natação + Jiu-Jitsu Kids',
      price: 'R$ 399,90',
      numericPrice: 399.9,
      subtitle: 'Complexo CT Acqua + Tatame Infantil',
    },
    {
      id: 'convenio',
      name: 'Convênio Wellhub / TotalPass',
      price: 'Check-in App',
      numericPrice: 0,
      subtitle: 'Wellhub Basic+ / Silver+ ou TotalPass',
    },
  ];

  // Estados do Checkout Transparente
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('form');
  const [selectedPlan, setSelectedPlan] = useState<PlanOption>(plansList[0]);
  const [checkoutUnit, setCheckoutUnit] = useState(
    'Unidade Principal – Av. Paulista, 609 (Paulínia)'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');

  // Dados do Aluno
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCpf, setCustomerCpf] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Dados do Cartão
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState('1');

  // Estados de Processamento / PIX
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [protocolCode, setProtocolCode] = useState('');

  const whatsappBase = 'https://wa.me/5519997014081';
  const whatsappLink = `${whatsappBase}?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20a%20CT%20ZHN%20Paul%C3%ADnia.`;

  const generatedPixPayload = `00020126580014BR.GOV.BCB.PIX0136ctzhn-paulinia-checkout@ctzhn.com.br5204000053039865405${selectedPlan.numericPrice.toFixed(
    2
  )}5802BR5915CT ZHN PAULINIA6008PAULINIA62140510${protocolCode || 'CTZHN2026'}6304E2A1`;

  const openCheckoutWithPlan = (plan: PlanOption) => {
    setSelectedPlan(plan);
    setCheckoutStep('form');
    setIsProcessing(false);
    setPixCopied(false);
    if (plan.id === 'convenio') {
      setPaymentMethod('convenio');
    } else if (paymentMethod === 'convenio') {
      setPaymentMethod('pix');
    }
    setCheckoutOpen(true);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(generatedPixPayload);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const newProtocol = `ZHN-${Math.floor(100000 + Math.random() * 900000)}`;
    setProtocolCode(newProtocol);

    setTimeout(() => {
      setIsProcessing(false);
      if (paymentMethod === 'pix') {
        setCheckoutStep('pix-qrcode');
      } else {
        setCheckoutStep('success');
      }
    }, 800);
  };

  const handleSendReceiptToWhatsApp = () => {
    const paymentLabel =
      paymentMethod === 'pix'
        ? 'PIX (Pagamento Confirmado)'
        : paymentMethod === 'cartao'
        ? `Cartão de Crédito (${installments}x)`
        : 'Convênio (Wellhub / TotalPass)';

    const summaryMessage = [
      `*MATRÍCULA CONFIRMADA — CT ZHN PAULÍNIA*`,
      `• *Protocolo:* ${protocolCode}`,
      `• *Plano:* ${selectedPlan.name} (${selectedPlan.price})`,
      `• *Unidade:* ${checkoutUnit}`,
      `• *Aluno:* ${customerName}`,
      `• *CPF:* ${customerCpf}`,
      `• *WhatsApp:* ${customerPhone}`,
      `• *Pagamento:* ${paymentLabel}`,
    ].join('\n');

    window.open(
      `${whatsappBase}?text=${encodeURIComponent(summaryMessage)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const units = {
    'bela-vista': {
      badge: 'Unidade Principal • Paulínia – SP',
      title: 'Unidade Principal — Paulínia',
      address: 'Av. Paulista, 609 – São Luiz / Bela Vista, Paulínia – SP',
      cep: 'CEP 13145-040 • Paulínia – SP',
      hoursWeek: 'Seg a Sex: 04h30 às 24h00',
      hoursWeekend: 'Sáb e Dom: 07h00 às 17h00',
      phone: '(19) 99701-4081',
      image: '/Modern CT ZHF Gym Exterior.png',
      highlights: [
        '+2.000 m² de estrutura anunciada em Paulínia',
        'Complexo Aquático CT Acqua',
        'Sala de Pose & Lounge Recreativo',
        'Entrada e estacionamento acessíveis PCD',
      ],
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Av.+Paulista,+609,+Paulinia+-+SP',
    },
    'vila-bressani': {
      badge: 'Unidade Paulínia – SP • Vila Bressani',
      title: 'Unidade Vila Bressani — Paulínia',
      address: 'Av. Brasil, 428 – Vila Bressani, Paulínia – SP',
      cep: 'Paulínia – SP',
      hoursWeek: 'Seg a Sex: Horário Estendido',
      hoursWeekend: 'Sáb e Dom: Consulte a unidade',
      phone: '(19) 99701-4081',
      image: '/Modern CT ZHF Gym Exterior.png',
      highlights: [
        'Acesso integrado em Paulínia',
        'Musculação e treino funcional',
        'Aulas coletivas de alta energia',
        'Atendimento na Vila Bressani',
      ],
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Av.+Brasil,+428,+Vila+Bressani,+Paulinia+-+SP',
    },
  };

  const schedule: Record<string, { time: string; activity: string; tag: string }[]> = {
    SEG: [
      { time: '07:00', activity: 'Bike Indoor', tag: 'Cardio' },
      { time: '08:00', activity: 'FitDance', tag: 'Coletiva' },
      { time: '17:00', activity: 'FitDance', tag: 'Coletiva' },
      { time: '18:00', activity: 'Bike Indoor', tag: 'Cardio' },
      { time: '19:00', activity: 'FitDance', tag: 'Coletiva' },
      { time: '20:00', activity: 'Jiu-Jitsu', tag: 'Artes Marciais' },
    ],
    TER: [
      { time: '18:00', activity: 'Ritbox', tag: 'Coletiva' },
      { time: '19:00', activity: 'Jiu-Jitsu Kids', tag: 'Infantil' },
      { time: '20:00', activity: 'Muay Thai', tag: 'Artes Marciais' },
    ],
    QUA: [
      { time: '07:00', activity: 'Bike Indoor', tag: 'Cardio' },
      { time: '08:00', activity: 'FitDance', tag: 'Coletiva' },
      { time: '17:00', activity: 'FitDance', tag: 'Coletiva' },
      { time: '18:00', activity: 'Bike Indoor', tag: 'Cardio' },
      { time: '19:00', activity: 'FitDance', tag: 'Coletiva' },
      { time: '20:00', activity: 'Jiu-Jitsu', tag: 'Artes Marciais' },
    ],
    QUI: [
      { time: '18:00', activity: 'Ritbox', tag: 'Coletiva' },
      { time: '19:00', activity: 'Jiu-Jitsu Kids', tag: 'Infantil' },
      { time: '20:00', activity: 'Muay Thai', tag: 'Artes Marciais' },
    ],
    SEX: [{ time: '20:00', activity: 'Jiu-Jitsu', tag: 'Artes Marciais' }],
    SAB: [
      { time: '07:00', activity: 'Bike Indoor', tag: 'Cardio' },
      { time: '08:00', activity: 'FitDance', tag: 'Coletiva' },
      { time: '10:00', activity: 'Muay Thai', tag: 'Artes Marciais' },
    ],
  };

  const marqueeItems = [
    'CT ZHN PAULÍNIA – SP',
    '+2.000 M² DE ESTRUTURA',
    'COMPLEXO CT ACQUA',
    'JIU-JITSU & MUAY THAI',
    'SEG A SEX 04H30 ÀS 24H',
    'WELLHUB & TOTALPASS',
  ];

  const infraHighlights = [
    {
      metric: '+2.000 m²',
      description:
        'Ampla estrutura em Paulínia com musculação, sala de pose, lounge recreativo e acessibilidade.',
      colors: ['#fecdd3', '#f87171', '#e11d24'],
      glowColor: '#e11d24',
      delay: 0,
    },
    {
      metric: '04h30–24h',
      description:
        'Horário estendido de segunda a sexta e funcionamento aos sábados e domingos (07h às 17h).',
      colors: ['#fef08a', '#f87171', '#e11d24'],
      glowColor: '#e11d24',
      delay: 120,
    },
    {
      metric: '4,8 ★',
      description:
        '177 avaliações na unidade principal em Paulínia e duas unidades integradas.',
      colors: ['#f8fafc', '#fca5a5', '#e11d24'],
      glowColor: '#e11d24',
      delay: 240,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans antialiased">
      {/* HEADER FIXO */}
      <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <img
              src="/Muscular Doberman Gym Emblem.png"
              alt="CT ZHN Centro de Treinamento Paulínia"
              className="h-14 w-auto object-contain drop-shadow-[0_2px_10px_rgba(225,29,36,0.35)]"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-extrabold uppercase tracking-wider text-zinc-300">
            <a href="#infraestrutura" className="hover:text-[#E11D24] transition-colors">
              Infraestrutura
            </a>
            <a href="#modalidades" className="hover:text-[#E11D24] transition-colors">
              Modalidades
            </a>
            <a href="#horarios" className="hover:text-[#E11D24] transition-colors">
              Aulas Coletivas
            </a>
            <a href="#planos" className="hover:text-[#E11D24] transition-colors">
              Planos
            </a>
            <a href="#unidades" className="hover:text-[#E11D24] transition-colors">
              Paulínia
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#planos"
              className="px-4 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Ver Planos
            </a>
            <button
              type="button"
              onClick={() => openCheckoutWithPlan(plansList[0])}
              className="px-5 py-2.5 rounded-full bg-[#E11D24] hover:bg-[#c2151c] text-xs font-extrabold uppercase tracking-wider text-white inline-flex items-center gap-2 transition-colors shadow-[0_0_24px_rgba(225,29,36,0.35)] cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              Matricular Agora
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-200 hover:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0E0E0E] border-b border-white/10 px-4 py-5 space-y-3 text-xs font-bold uppercase tracking-wider">
            <a
              href="#infraestrutura"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-zinc-200 hover:text-[#E11D24]"
            >
              Infraestrutura
            </a>
            <a
              href="#modalidades"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-zinc-200 hover:text-[#E11D24]"
            >
              Modalidades
            </a>
            <a
              href="#horarios"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-zinc-200 hover:text-[#E11D24]"
            >
              Aulas Coletivas
            </a>
            <a
              href="#planos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-zinc-200 hover:text-[#E11D24]"
            >
              Planos
            </a>
            <a
              href="#unidades"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-zinc-200 hover:text-[#E11D24]"
            >
              Paulínia
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openCheckoutWithPlan(plansList[0]);
              }}
              className="w-full text-center bg-[#E11D24] text-white font-extrabold py-3 rounded-full mt-2 cursor-pointer"
            >
              Matricular Online
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-[#3b0608] via-[#140405] to-[#080808] pt-14 pb-20 lg:pt-20 lg:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-[#C8A96E]/40 text-[#C8A96E] text-xs font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-[#C8A96E]" />
                Paulínia – SP • Nota 4,8 (177 avaliações)
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.94] tracking-tight">
                Centro de Treinamento{' '}
                <span className="text-[#E11D24]">CT ZHN Paulínia</span>
              </h1>

              <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Ampla estrutura em <strong className="text-white">Paulínia</strong> com mais de{' '}
                <strong className="text-white">2.000 m²</strong> anunciados, musculação, Cross
                Training, artes marciais, complexo aquático{' '}
                <strong className="text-white">CT Acqua</strong> e funcionamento de segunda a sexta
                das <strong className="text-white">04h30 às 24h</strong>.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openCheckoutWithPlan(plansList[0])}
                  className="px-7 py-3.5 rounded-full bg-[#E11D24] hover:bg-[#c5161d] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  1º Mês por R$ 39,90
                </button>
                <a
                  href="#unidades"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  Unidade Principal • Paulínia
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                <span className="uppercase tracking-wider font-semibold">Convênios:</span>
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-zinc-200 font-bold">
                  Wellhub (Basic+ e Silver+)
                </span>
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-zinc-200 font-bold">
                  TotalPass
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#121212] shadow-2xl">
                <div className="aspect-[16/10] w-full bg-zinc-900 relative">
                  <img
                    src="/Modern CT ZHF Gym Exterior.png"
                    alt="Unidade Principal CT ZHN em Paulínia – SP"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex items-center justify-between gap-4 bg-[#111111] border-t border-white/10">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#E11D24]">
                      Unidade Principal • Paulínia – SP
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Av. Paulista, 609 • Seg–Sex 04h30–24h
                    </p>
                  </div>
                  <img
                    src="/Muscular Doberman Gym Emblem.png"
                    alt="Logo CT ZHN"
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAIXA MARQUEE */}
      <div className="bg-[#120405] border-y border-[#E11D24]/30 py-3.5 overflow-hidden">
        <div className="animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((label, idx) => (
            <div key={idx} className="flex items-center">
              <span className="px-6 text-xs sm:text-sm font-black uppercase tracking-widest text-zinc-200 whitespace-nowrap">
                {label}
              </span>
              <span className="text-[#E11D24] font-black">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* INFRAESTRUTURA COM PIXELCARD */}
      <section
        id="infraestrutura"
        className="py-20 bg-gradient-to-b from-[#2a0507] via-[#110304] to-[#080808]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
              Infraestrutura
            </h2>
            <p className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-zinc-200 mt-2">
              De ponta para um treino de verdade em Paulínia
            </p>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 leading-relaxed">
              Espaços amplos com mais de 2.000 m² anunciados em Paulínia, áreas de musculação, sala
              de pose, lounge recreativo, complexo aquático CT Acqua e entrada e estacionamento
              acessíveis para cadeirantes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {infraHighlights.map((item) => (
              <PixelCard
                key={item.metric}
                colors={item.colors}
                glowColor={item.glowColor}
                shape="square"
                origin="pointer"
                gap={5}
                pixelSize={2.5}
                speed={40}
                revealDuration={600}
                spotlight={0.6}
                glow={0.55}
                opacity={0.45}
                fade={0.35}
                trigger="hover"
                radius={24}
                clickPulse
                intro
                introDelay={item.delay}
                theme="dark"
                className="w-full min-h-[240px]"
              >
                <div className="w-full h-full p-8 flex flex-col justify-between text-left bg-gradient-to-b from-[#E11D24]/35 to-[#69090d]/45">
                  <div className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                    {item.metric}
                  </div>
                  <div>
                    <div className="h-px bg-white/30 my-4" />
                    <p className="text-sm font-semibold text-white/95 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="rounded-xl bg-[#111111] border border-white/10 p-5 flex items-start gap-3.5">
              <Sparkles className="w-5 h-5 text-[#C8A96E] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-extrabold uppercase">Sala de Pose & Lounge</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Espaço de convivência recreativo e área para poses e registro de evolução.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[#111111] border border-white/10 p-5 flex items-start gap-3.5">
              <Accessibility className="w-5 h-5 text-[#C8A96E] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-extrabold uppercase">Acessibilidade Completa</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Entrada e estacionamento acessíveis para cadeirantes na unidade.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[#111111] border border-white/10 p-5 flex items-start gap-3.5">
              <Users className="w-5 h-5 text-[#C8A96E] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-extrabold uppercase">Todas as Idades</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Atividades aquáticas para crianças, adultos e idosos, além de Jiu-Jitsu Kids.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section id="modalidades" className="py-20 bg-[#080808] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D24]">
              Treino e Aulas • Paulínia
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase mt-1">Modalidades</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl bg-[#121212] border border-white/10 p-6 space-y-3">
              <Dumbbell className="w-7 h-7 text-[#E11D24]" />
              <h3 className="text-xl font-black uppercase">Musculação & Cross</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Musculação, Cross Training, Spinning e Bike Indoor para força e condicionamento.
              </p>
            </div>

            <div className="rounded-xl bg-[#121212] border border-white/10 p-6 space-y-3">
              <Flame className="w-7 h-7 text-[#E11D24]" />
              <h3 className="text-xl font-black uppercase">Aulas Coletivas</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Aulas energéticas como FitDance e Ritbox em horários variados ao longo da semana.
              </p>
            </div>

            <div className="rounded-xl bg-[#121212] border border-white/10 p-6 space-y-3">
              <ShieldAlert className="w-7 h-7 text-[#E11D24]" />
              <h3 className="text-xl font-black uppercase">Artes Marciais</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Jiu-Jitsu, Jiu-Jitsu Kids e Muay Thai com foco em técnica, disciplina e defesa.
              </p>
            </div>

            <div className="rounded-xl bg-[#121212] border border-white/10 p-6 space-y-3">
              <Waves className="w-7 h-7 text-[#E11D24]" />
              <h3 className="text-xl font-black uppercase">Complexo CT Acqua</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Atividades aquáticas voltadas para crianças, adultos e idosos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AULAS COLETIVAS */}
      <section id="horarios" className="py-20 bg-[#0D0D0D] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D24]">
              Grade Semanal
            </span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase mt-1">Aulas Coletivas</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(schedule).map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedDay === day
                    ? 'bg-[#E11D24] text-white'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {schedule[selectedDay].map((slot, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#151515] border border-white/10 p-4 flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E11D24]">
                    {slot.tag}
                  </span>
                  <h3 className="text-lg font-black uppercase mt-0.5">{slot.activity}</h3>
                </div>
                <span className="px-3 py-1 rounded bg-black border border-white/15 font-mono text-sm font-bold text-[#C8A96E]">
                  {slot.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS — TODOS ABREM O CHECKOUT TRANSPARENTE */}
      <section id="planos" className="py-20 bg-[#080808] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D24]">
                Planos e Convênios • Paulínia
              </span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase leading-none">
                Escolha seu plano e finalize no site.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Clique em qualquer plano para abrir o <strong className="text-white">Checkout Online</strong> com geração instantânea de{' '}
                <strong className="text-white">QR Code PIX</strong> ou pagamento via{' '}
                <strong className="text-white">Cartão de Crédito</strong>.
              </p>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-3 gap-6">
              {/* Card Plano 1 */}
              <div className="rounded-2xl bg-[#E11D24] text-white p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-black text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded mb-3">
                    Campanha Divulgada
                  </span>
                  <h3 className="text-2xl font-black uppercase">1º Mês Promocional</h3>
                  <p className="text-xs text-white/90 mt-1">
                    Fidelidade mínima de 5 meses • Passa a R$ 159,90 depois
                  </p>
                  <ul className="mt-5 space-y-2.5 text-xs font-semibold text-white/95">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      1º mês a R$ 39,90 em plano com fidelidade mínima de 5 meses
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      Mensalidade de R$ 159,90 após o período promocional
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      Acesso completo em Paulínia
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/25">
                  <p className="text-[11px] uppercase font-bold tracking-wider">1º Mês</p>
                  <p className="text-4xl font-black">R$ 39,90</p>
                  <button
                    type="button"
                    onClick={() => openCheckoutWithPlan(plansList[0])}
                    className="mt-4 w-full text-center bg-black hover:bg-zinc-900 text-white text-xs font-extrabold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Pagar com PIX ou Cartão
                  </button>
                </div>
              </div>

              {/* Card Plano 2 */}
              <div className="rounded-2xl bg-[#180506] border border-[#E11D24]/40 text-white p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-white/10 text-[#C8A96E] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded mb-3">
                    Combo Especial
                  </span>
                  <h3 className="text-2xl font-black uppercase">Natação + Jiu-Jitsu Kids</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Desenvolvimento aquático e marcial infantil
                  </p>
                  <ul className="mt-5 space-y-2.5 text-xs text-zinc-200">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E11D24] shrink-0 mt-0.5" />
                      Aulas de Natação no complexo CT Acqua
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E11D24] shrink-0 mt-0.5" />
                      Aulas de Jiu-Jitsu Kids
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E11D24] shrink-0 mt-0.5" />
                      Consulte turmas e horários vigentes
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                    Combo Divulgado
                  </p>
                  <p className="text-4xl font-black text-white">R$ 399,90</p>
                  <button
                    type="button"
                    onClick={() => openCheckoutWithPlan(plansList[1])}
                    className="mt-4 w-full text-center bg-[#E11D24] hover:bg-[#c5161d] text-white text-xs font-extrabold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Assinar Combo Kids
                  </button>
                </div>
              </div>

              {/* Card Plano 3 */}
              <div className="rounded-2xl bg-[#121212] border border-white/10 text-white p-6 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-white/10 text-zinc-300 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded mb-3">
                    Parceiros
                  </span>
                  <h3 className="text-2xl font-black uppercase">Wellhub & TotalPass</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Treine com o benefício da sua empresa
                  </p>
                  <ul className="mt-5 space-y-2.5 text-xs text-zinc-200">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                      Wellhub a partir dos planos Basic+ e Silver+
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                      Também consta na rede TotalPass
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C8A96E] shrink-0 mt-0.5" />
                      Liberação rápida na recepção
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                    Check-in via App
                  </p>
                  <p className="text-2xl font-black text-white uppercase">Convênios</p>
                  <button
                    type="button"
                    onClick={() => openCheckoutWithPlan(plansList[2])}
                    className="mt-4 w-full text-center bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Validar Convênio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIDADES */}
      <section id="unidades" className="py-20 bg-[#0D0D0D] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D24]">
                Paulínia – SP
              </span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase mt-1">
                Unidade Principal — Paulínia
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedUnit('bela-vista')}
                className={`px-4 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider cursor-pointer ${
                  selectedUnit === 'bela-vista'
                    ? 'bg-[#E11D24] text-white'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Unidade Principal (Paulínia)
              </button>
              <button
                type="button"
                onClick={() => setSelectedUnit('vila-bressani')}
                className={`px-4 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider cursor-pointer ${
                  selectedUnit === 'vila-bressani'
                    ? 'bg-[#E11D24] text-white'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Vila Bressani (Paulínia)
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-[#131313] border border-white/10 p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#C8A96E]">
                {units[selectedUnit].badge}
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase">
                {units[selectedUnit].title}
              </h3>

              <div className="space-y-3 text-sm text-zinc-300">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E11D24] shrink-0 mt-1" />
                  <span>
                    {units[selectedUnit].address} • {units[selectedUnit].cep}
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#E11D24] shrink-0 mt-1" />
                  <span>
                    {units[selectedUnit].hoursWeek} • {units[selectedUnit].hoursWeekend}
                  </span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#E11D24] shrink-0" />
                  <span>Telefone: {units[selectedUnit].phone}</span>
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                {units[selectedUnit].highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#E11D24] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={units[selectedUnit].mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  Ver no Mapa • Paulínia
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg bg-[#E11D24] hover:bg-[#c5161d] text-white text-xs font-extrabold uppercase tracking-wider"
                >
                  Falar com a Recepção
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl overflow-hidden border border-white/15 bg-black">
                <img
                  src={units[selectedUnit].image}
                  alt={units[selectedUnit].title}
                  className="w-full aspect-[16/10] object-cover"
                />
              </div>

              <div className="rounded-xl bg-black/60 border border-white/10 p-5 flex items-center justify-between gap-4">
                <img
                  src="/Muscular Doberman Gym Emblem.png"
                  alt="CT ZHN Paulínia"
                  className="h-14 w-auto object-contain shrink-0"
                />
                <div className="text-left">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-[#C8A96E]">
                    Paulínia – SP • @ctzhnpaulinia
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Unidade Principal na Av. Paulista, 609 e unidade na Av. Brasil, 428.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-black border-t border-white/10 py-10 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/Muscular Doberman Gym Emblem.png"
              alt="CT ZHN Paulínia"
              className="h-11 w-auto object-contain"
            />
            <div>
              <p className="font-extrabold uppercase text-zinc-200">CT ZHN Paulínia – SP</p>
              <p>
                Unidade Principal: Av. Paulista, 609 (Bela Vista) • Av. Brasil, 428 (Vila Bressani)
              </p>
            </div>
          </div>
          <p>Tel / WhatsApp: (19) 99701-4081 • Paulínia – SP</p>
        </div>
      </footer>

      {/* MODAL DE CHECKOUT TRANSPARENTE (PIX + CARTÃO + CONVÊNIO) */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-[#111111] border border-white/15 shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-[#181818] border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#E11D24]" />
                <span className="text-sm font-black uppercase tracking-wider">
                  Checkout Transparente • CT ZHN Paulínia
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Fechar checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutStep === 'form' && (
              <form onSubmit={handleProcessPayment} className="p-6 space-y-5">
                <div className="rounded-xl bg-black/60 border border-[#E11D24]/40 p-4 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#C8A96E] mb-1">
                      Plano Escolhido
                    </label>
                    <select
                      value={selectedPlan.id}
                      onChange={(e) => {
                        const found = plansList.find((p) => p.id === e.target.value);
                        if (found) openCheckoutWithPlan(found);
                      }}
                      className="w-full rounded bg-[#181818] border border-white/10 px-2.5 py-1.5 text-sm font-black uppercase text-white focus:outline-none focus:border-[#E11D24]"
                    >
                      {plansList.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-zinc-400 mt-1">{selectedPlan.subtitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-black text-[#E11D24]">{selectedPlan.price}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-1.5">
                    Unidade em Paulínia
                  </label>
                  <select
                    value={checkoutUnit}
                    onChange={(e) => setCheckoutUnit(e.target.value)}
                    className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E11D24]"
                  >
                    <option value="Unidade Principal – Av. Paulista, 609 (Paulínia)">
                      Unidade Principal – Av. Paulista, 609 (Bela Vista)
                    </option>
                    <option value="Unidade Vila Bressani – Av. Brasil, 428 (Paulínia)">
                      Unidade Vila Bressani – Av. Brasil, 428
                    </option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex.: Lucas Almeida"
                      className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E11D24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="aluno@email.com"
                      className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E11D24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-1">
                      CPF
                    </label>
                    <input
                      type="text"
                      required
                      value={customerCpf}
                      onChange={(e) => setCustomerCpf(e.target.value)}
                      placeholder="000.000.000-00"
                      className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E11D24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-1">
                      WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="(19) 99999-9999"
                      className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E11D24]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-300 mb-2">
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-3 rounded-xl border text-xs font-extrabold uppercase flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                        paymentMethod === 'pix'
                          ? 'bg-[#E11D24]/20 border-[#E11D24] text-white'
                          : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-4 h-4 text-[#E11D24]" />
                      PIX Instantâneo
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cartao')}
                      className={`p-3 rounded-xl border text-xs font-extrabold uppercase flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                        paymentMethod === 'cartao'
                          ? 'bg-[#E11D24]/20 border-[#E11D24] text-white'
                          : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-[#E11D24]" />
                      Cartão Crédito
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('convenio')}
                      className={`p-3 rounded-xl border text-xs font-extrabold uppercase flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
                        paymentMethod === 'convenio'
                          ? 'bg-[#E11D24]/20 border-[#E11D24] text-white'
                          : 'bg-[#1A1A1A] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C8A96E]" />
                      Convênio
                    </button>
                  </div>
                </div>

                {paymentMethod === 'cartao' && (
                  <div className="rounded-xl bg-black/70 border border-white/10 p-4 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      <span>Dados do Cartão</span>
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Lock className="w-3 h-3" /> Ambiente Criptografado
                      </span>
                    </div>

                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#E11D24]"
                    />

                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Nome impresso no cartão"
                      className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#E11D24]"
                    />

                    <div className="grid grid-cols-3 gap-2.5">
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/AA"
                        className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3 py-2 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#E11D24]"
                      />
                      <input
                        type="text"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="CVV"
                        className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3 py-2 text-sm font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#E11D24]"
                      />
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-2.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#E11D24]"
                      >
                        <option value="1">1x sem juros</option>
                        <option value="2">2x</option>
                        <option value="3">3x</option>
                        <option value="6">6x</option>
                      </select>
                    </div>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="rounded-xl bg-black/70 border border-white/10 p-4 text-xs text-zinc-300">
                    O QR Code e o código <strong>PIX Copia e Cola</strong> serão gerados na próxima
                    tela com liberação automática da matrícula.
                  </div>
                )}

                {paymentMethod === 'convenio' && (
                  <div className="rounded-xl bg-black/70 border border-white/10 p-4 text-xs text-zinc-300">
                    Para <strong>Wellhub (Basic+ / Silver+)</strong> e <strong>TotalPass</strong>,
                    geramos seu protocolo de validação na recepção.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-[#E11D24] hover:bg-[#c5161d] disabled:opacity-60 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processando Checkout...
                    </>
                  ) : paymentMethod === 'pix' ? (
                    <>
                      <QrCode className="w-4 h-4" />
                      Gerar QR Code PIX ({selectedPlan.price})
                    </>
                  ) : paymentMethod === 'cartao' ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Finalizar Pagamento ({selectedPlan.price})
                    </>
                  ) : (
                    'Gerar Protocolo de Convênio'
                  )}
                </button>
              </form>
            )}

            {checkoutStep === 'pix-qrcode' && (
              <div className="p-6 space-y-5 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/40 text-[#C8A96E] text-xs font-extrabold uppercase tracking-wider">
                  Protocolo {protocolCode} • Aguardando PIX
                </div>

                <div>
                  <h4 className="text-2xl font-black uppercase">Escaneie o QR Code para Pagar</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Valor: <strong className="text-white">{selectedPlan.price}</strong> •{' '}
                    {selectedPlan.name}
                  </p>
                </div>

                <div className="mx-auto w-48 h-48 rounded-2xl bg-white p-3.5 flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                    <rect x="6" y="6" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="13" y="13" width="12" height="12" fill="currentColor" />
                    <rect x="68" y="6" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="75" y="13" width="12" height="12" fill="currentColor" />
                    <rect x="6" y="68" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="13" y="75" width="12" height="12" fill="currentColor" />
                    <rect x="42" y="10" width="8" height="8" fill="currentColor" />
                    <rect x="52" y="18" width="8" height="14" fill="currentColor" />
                    <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                    <rect x="10" y="44" width="16" height="8" fill="currentColor" />
                    <rect x="72" y="42" width="18" height="10" fill="currentColor" />
                    <rect x="44" y="70" width="12" height="20" fill="currentColor" />
                    <rect x="68" y="68" width="10" height="10" fill="currentColor" />
                    <rect x="82" y="80" width="12" height="14" fill="currentColor" />
                  </svg>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-zinc-400">
                    PIX Copia e Cola
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedPixPayload}
                      className="w-full rounded-lg bg-[#1A1A1A] border border-white/15 px-3 py-2.5 text-xs font-mono text-zinc-300"
                    />
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-4 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-extrabold uppercase inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {pixCopied ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('success')}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Simular Pagamento Confirmado
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('form')}
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Voltar
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="p-7 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                    Protocolo {protocolCode}
                  </span>
                  <h4 className="text-3xl font-black uppercase mt-1">Matrícula Confirmada!</h4>
                  <p className="text-sm text-zinc-300 mt-2">
                    Bem-vindo(a) à <strong>CT ZHN Paulínia</strong>, {customerName || 'Aluno(a)'}!
                    Seu plano <strong>{selectedPlan.name}</strong> já está registrado na{' '}
                    <strong>{checkoutUnit}</strong>.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleSendReceiptToWhatsApp}
                    className="w-full py-3.5 rounded-xl bg-[#E11D24] hover:bg-[#c5161d] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar Comprovante para Recepção (WhatsApp)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(false)}
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;