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
} from 'lucide-react';

type UnitKey = 'bela-vista' | 'vila-bressani';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitKey>('bela-vista');
  const [selectedDay, setSelectedDay] = useState<string>('SEG');

  const whatsappLink =
    'https://wa.me/5519997014081?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20conhecer%20os%20planos%20da%20CT%20ZHN.';

  const units = {
    'bela-vista': {
      badge: 'Unidade Principal • Bela Vista',
      name: 'Av. Paulista, 609 – São Luiz / Bela Vista',
      cep: 'Paulínia – SP • CEP 13145-040',
      hoursWeek: 'Seg a Sex: 04h30 às 24h00',
      hoursWeekend: 'Sáb e Dom: 07h00 às 17h00',
      phone: '(19) 99701-4081',
      highlights: [
        '+2.000 m² de estrutura anunciada',
        'Complexo Aquático CT Acqua',
        'Sala de Pose & Lounge Recreativo',
        'Entrada e estacionamento PCD',
      ],
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Av.+Paulista,+609,+Paulinia+-+SP',
    },
    'vila-bressani': {
      badge: 'Unidade Paulínia • Vila Bressani',
      name: 'Av. Brasil, 428 – Vila Bressani',
      cep: 'Paulínia – SP',
      hoursWeek: 'Seg a Sex: Horário Estendido',
      hoursWeekend: 'Sáb e Dom: Consulte a unidade',
      phone: '(19) 99701-4081',
      highlights: [
        'Acesso integrado nas campanhas',
        'Musculação e treino funcional',
        'Aulas coletivas de alta energia',
        'Atendimento próximo à região central',
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
    'CT ZHN PAULÍNIA',
    '+2.000 M² DE ESTRUTURA',
    'COMPLEXO CT ACQUA',
    'JIU-JITSU & MUAY THAI',
    'SEG A SEX 04H30 ÀS 24H',
    'WELLHUB & TOTALPASS',
  ];

  const chamferCardStyle: React.CSSProperties = {
    clipPath:
      'polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% 100%, 0% 100%, 0% 24px)',
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans antialiased">
      {/* HEADER FIXO */}
      <header className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo-ctzhn.png"
              alt="CT ZHN Centro de Treinamento"
              className="h-12 w-auto object-contain"
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
              Unidades
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="#planos"
              className="px-4 py-2.5 rounded-full border border-white/20 hover:border-white/50 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Ver Planos
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#E11D24] hover:bg-[#c2151c] text-xs font-extrabold uppercase tracking-wider text-white inline-flex items-center gap-2 transition-colors shadow-[0_0_24px_rgba(225,29,36,0.35)]"
            >
              <MessageCircle className="w-4 h-4" />
              Matricular Agora
            </a>
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
              Unidades
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-[#E11D24] text-white font-extrabold py-3 rounded-full mt-2"
            >
              Falar no WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* HERO COM DEGRADÊ VERMELHO NO TOPO */}
      <section className="relative bg-gradient-to-b from-[#3b0608] via-[#140405] to-[#080808] pt-14 pb-20 lg:pt-20 lg:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-[#C8A96E]/40 text-[#C8A96E] text-xs font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-[#C8A96E]" />
                Avaliação 4,8 (177 avaliações) • Paulínia – SP
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.94] tracking-tight">
                Centro de Treinamento{' '}
                <span className="text-[#E11D24]">CT ZHN</span>
              </h1>

              <p className="text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Ampla estrutura com mais de <strong className="text-white">2.000 m²</strong>{' '}
                anunciados, musculação, Cross Training, artes marciais, complexo aquático{' '}
                <strong className="text-white">CT Acqua</strong> e funcionamento de segunda a sexta
                das <strong className="text-white">04h30 às 24h</strong>.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#planos"
                  className="px-7 py-3.5 rounded-full bg-[#E11D24] hover:bg-[#c5161d] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors"
                >
                  1º Mês por R$ 39,90
                </a>
                <a
                  href="#unidades"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  Endereços e Horários
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
                    alt="Fachada externa do CT ZHN em Paulínia"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-5 flex items-center justify-between gap-4 bg-[#111111] border-t border-white/10">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#E11D24]">
                      Unidade Principal • Bela Vista
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      Av. Paulista, 609 • Seg–Sex 04h30–24h
                    </p>
                  </div>
                  <img src="/logo-ctzhn.png" alt="Logo CT ZHN" className="h-11 w-auto" />
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

      {/* INFRAESTRUTURA + CARDS CHANFRADOS */}
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
              Espaços amplos com mais de 2.000 m² anunciados, áreas de musculação, sala de pose,
              lounge recreativo, complexo aquático CT Acqua e entrada e estacionamento acessíveis
              para cadeirantes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div
              style={chamferCardStyle}
              className="bg-gradient-to-b from-[#E11D24] to-[#69090d] p-8 flex flex-col justify-between min-h-[240px]"
            >
              <div className="text-5xl sm:text-6xl font-black tracking-tight">+2.000 m²</div>
              <div>
                <div className="h-px bg-white/30 my-4" />
                <p className="text-sm font-semibold text-white/95">
                  Ampla estrutura com musculação, sala de pose, lounge recreativo e acessibilidade.
                </p>
              </div>
            </div>

            <div
              style={chamferCardStyle}
              className="bg-gradient-to-b from-[#E11D24] to-[#69090d] p-8 flex flex-col justify-between min-h-[240px]"
            >
              <div className="text-5xl sm:text-6xl font-black tracking-tight">04h30–24h</div>
              <div>
                <div className="h-px bg-white/30 my-4" />
                <p className="text-sm font-semibold text-white/95">
                  Horário estendido de segunda a sexta e funcionamento aos sábados e domingos (07h às 17h).
                </p>
              </div>
            </div>

            <div
              style={chamferCardStyle}
              className="bg-gradient-to-b from-[#E11D24] to-[#69090d] p-8 flex flex-col justify-between min-h-[240px]"
            >
              <div className="text-5xl sm:text-6xl font-black tracking-tight">4,8 ★</div>
              <div>
                <div className="h-px bg-white/30 my-4" />
                <p className="text-sm font-semibold text-white/95">
                  177 avaliações na unidade principal em Paulínia e duas unidades integradas.
                </p>
              </div>
            </div>
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
              Treino e Aulas
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

      {/* GRADE DE AULAS COLETIVAS */}
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
                className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors ${
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

      {/* PLANOS */}
      <section id="planos" className="py-20 bg-[#080808] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D24]">
                Planos e Convênios
              </span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase leading-none">
                Escolha seu plano e comece a treinar.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Campanhas promocionais divulgadas, combos especiais e convênios Wellhub (Basic+ e
                Silver+) e TotalPass. Consulte as condições vigentes no site ou em{' '}
                <strong className="text-white">@ctzhnpaulinia</strong>.
              </p>
            </div>

            <div className="lg:col-span-8 grid md:grid-cols-3 gap-6">
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
                      Planos anuais/semestrais sob consulta
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/25">
                  <p className="text-[11px] uppercase font-bold tracking-wider">1º Mês</p>
                  <p className="text-4xl font-black">R$ 39,90</p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block text-center bg-black hover:bg-zinc-900 text-white text-xs font-extrabold uppercase tracking-wider py-3 rounded-lg transition-colors"
                  >
                    Consultar Condições
                  </a>
                </div>
              </div>

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
                      Consulte vagas e horários vigentes
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                    Combo Divulgado
                  </p>
                  <p className="text-4xl font-black text-white">R$ 399,90</p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block text-center bg-[#E11D24] hover:bg-[#c5161d] text-white text-xs font-extrabold uppercase tracking-wider py-3 rounded-lg transition-colors"
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </div>

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
                      Verifique regras da sua categoria no app
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
                    Check-in via App
                  </p>
                  <p className="text-2xl font-black text-white uppercase">Convênios</p>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block text-center bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider py-3 rounded-lg transition-colors"
                  >
                    Tirar Dúvidas
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIDADES E HORÁRIOS */}
      <section id="unidades" className="py-20 bg-[#0D0D0D] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E11D24]">
                Paulínia – SP
              </span>
              <h2 className="text-4xl sm:text-5xl font-black uppercase mt-1">
                Endereços e Horários
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSelectedUnit('bela-vista')}
                className={`px-4 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider ${
                  selectedUnit === 'bela-vista'
                    ? 'bg-[#E11D24] text-white'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Av. Paulista, 609
              </button>
              <button
                type="button"
                onClick={() => setSelectedUnit('vila-bressani')}
                className={`px-4 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider ${
                  selectedUnit === 'vila-bressani'
                    ? 'bg-[#E11D24] text-white'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Av. Brasil, 428
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-[#131313] border border-white/10 p-6 sm:p-10 grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#C8A96E]">
                {units[selectedUnit].badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase">
                {units[selectedUnit].name}
              </h3>

              <div className="space-y-3 text-sm text-zinc-300">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E11D24] shrink-0 mt-1" />
                  <span>{units[selectedUnit].cep}</span>
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
                  Ver no Mapa
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg bg-[#E11D24] hover:bg-[#c5161d] text-white text-xs font-extrabold uppercase tracking-wider"
                >
                  Ligar / WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-xl bg-black/60 border border-white/10 p-7 text-center space-y-3">
              <img src="/logo-ctzhn.png" alt="CT ZHN" className="h-20 w-auto mx-auto" />
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#C8A96E]">
                @ctzhnpaulinia
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                Confira campanhas, novidades das unidades e atualizações de planos no perfil oficial
                do CT ZHN.
              </p>
              <a
                href="https://www.instagram.com/ctzhnpaulinia/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-white/20 hover:border-[#E11D24] text-xs font-extrabold uppercase tracking-wider"
              >
                Abrir @ctzhnpaulinia
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-black border-t border-white/10 py-10 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo-ctzhn.png" alt="CT ZHN" className="h-9 w-auto" />
            <div>
              <p className="font-extrabold uppercase text-zinc-200">CT ZHN Paulínia</p>
              <p>Av. Paulista, 609 (Bela Vista) • Av. Brasil, 428 (Vila Bressani)</p>
            </div>
          </div>
          <p>Tel / WhatsApp: (19) 99701-4081</p>
        </div>
      </footer>
    </div>
  );
}

export default App;