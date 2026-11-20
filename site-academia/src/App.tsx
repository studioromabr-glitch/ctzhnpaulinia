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
  Users,
  Accessibility,
  Sparkles,
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
      name: 'Unidade Bela Vista (Matriz)',
      address: 'Av. Paulista, 609 – São Luiz / Bela Vista, Paulínia – SP',
      cep: '13145-040',
      hoursWeek: 'Segunda a Sexta: 04h30 às 24h00',
      hoursWeekend: 'Sábado e Domingo: 07h00 às 17h00',
      phone: '(19) 99701-4081',
      highlights: [
        'Mais de 2.000 m² de estrutura',
        'Complexo Aquático (CT Acqua)',
        'Sala de Pose & Lounge Recreativo',
        'Estacionamento e acesso PCD',
      ],
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Av.+Paulista,+609,+Paulinia+-+SP',
    },
    'vila-bressani': {
      name: 'Unidade Vila Bressani',
      address: 'Av. Brasil, 428 – Vila Bressani, Paulínia – SP',
      cep: 'Paulínia – SP',
      hoursWeek: 'Segunda a Sexta: Horário Estendido',
      hoursWeekend: 'Finais de Semana: Consulte grade',
      phone: '(19) 99701-4081',
      highlights: [
        'Acesso integrado nos planos',
        'Musculação de alta performance',
        'Aulas coletivas inclusas',
        'Equipamentos linha profissional',
      ],
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Av.+Brasil,+428,+Vila+Bressani,+Paulinia+-+SP',
    },
  };

  const schedule: Record<string, { time: string; activity: string; category: string }[]> = {
    SEG: [
      { time: '07:00', activity: 'Bike Indoor', category: 'Cardio' },
      { time: '08:00', activity: 'FitDance', category: 'Coletiva' },
      { time: '17:00', activity: 'FitDance', category: 'Coletiva' },
      { time: '18:00', activity: 'Bike Indoor', category: 'Cardio' },
      { time: '19:00', activity: 'FitDance', category: 'Coletiva' },
      { time: '20:00', activity: 'Jiu-Jitsu', category: 'Lutas' },
    ],
    TER: [
      { time: '18:00', activity: 'Ritbox', category: 'Coletiva' },
      { time: '19:00', activity: 'Jiu-Jitsu Kids', category: 'Kids' },
      { time: '20:00', activity: 'Muay Thai', category: 'Lutas' },
    ],
    QUA: [
      { time: '07:00', activity: 'Bike Indoor', category: 'Cardio' },
      { time: '08:00', activity: 'FitDance', category: 'Coletiva' },
      { time: '17:00', activity: 'FitDance', category: 'Coletiva' },
      { time: '18:00', activity: 'Bike Indoor', category: 'Cardio' },
      { time: '19:00', activity: 'FitDance', category: 'Coletiva' },
      { time: '20:00', activity: 'Jiu-Jitsu', category: 'Lutas' },
    ],
    QUI: [
      { time: '18:00', activity: 'Ritbox', category: 'Coletiva' },
      { time: '19:00', activity: 'Jiu-Jitsu Kids', category: 'Kids' },
      { time: '20:00', activity: 'Muay Thai', category: 'Lutas' },
    ],
    SEX: [
      { time: '20:00', activity: 'Jiu-Jitsu (Treino Livre)', category: 'Lutas' },
    ],
    SAB: [
      { time: '07:00', activity: 'Bike Indoor', category: 'Cardio' },
      { time: '08:00', activity: 'FitDance', category: 'Coletiva' },
      { time: '10:00', activity: 'Muay Thai', category: 'Lutas' },
    ],
  };

  const chamferCardStyle: React.CSSProperties = {
    clipPath:
      'polygon(28px 0%, calc(100% - 28px) 0%, 100% 28px, 100% 100%, 0% 100%, 0% 28px)',
  };

  const chamferButtonStyle: React.CSSProperties = {
    clipPath:
      'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 0% 100%, 0% 12px)',
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#E11D24] selection:text-white">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/logo-ctzhn.png"
              alt="CT ZHN Centro de Treinamento"
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wider uppercase">
            <a href="#estrutura" className="text-zinc-300 hover:text-[#E11D24] transition-colors">
              A Estrutura
            </a>
            <a href="#modalidades" className="text-zinc-300 hover:text-[#E11D24] transition-colors">
              Modalidades
            </a>
            <a href="#horarios" className="text-zinc-300 hover:text-[#E11D24] transition-colors">
              Aulas Coletivas
            </a>
            <a href="#planos" className="text-zinc-300 hover:text-[#E11D24] transition-colors">
              Planos
            </a>
            <a href="#unidades" className="text-zinc-300 hover:text-[#E11D24] transition-colors">
              Unidades
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              style={chamferButtonStyle}
              className="bg-[#E11D24] hover:bg-[#b9151b] text-white font-black uppercase tracking-wider text-xs px-6 py-3.5 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(225,29,36,0.4)]"
            >
              Começar Agora
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0F0F0F] border-b border-white/10 px-6 py-6 space-y-4">
            <a
              href="#estrutura"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-[#E11D24]"
            >
              A Estrutura
            </a>
            <a
              href="#modalidades"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-[#E11D24]"
            >
              Modalidades
            </a>
            <a
              href="#horarios"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-[#E11D24]"
            >
              Aulas Coletivas
            </a>
            <a
              href="#planos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-[#E11D24]"
            >
              Planos
            </a>
            <a
              href="#unidades"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-[#E11D24]"
            >
              Unidades
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-[#E11D24] text-white font-black uppercase tracking-wider text-xs py-3.5 rounded"
            >
              Matricule-se pelo WhatsApp
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,36,0.22),transparent_55%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#C8A96E]/40 text-[#C8A96E] text-xs font-bold uppercase tracking-widest">
                <Star className="w-3.5 h-3.5 fill-[#C8A96E]" />
                Nota 4,8 no Google • 2 Unidades em Paulínia
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95]">
                Força, Estrutura e{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D24] to-[#ff4d54]">
                  Alta Performance
                </span>
              </h1>

              <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
                Mais de <strong className="text-white">2.000 m²</strong> equipados para sua evolução:
                musculação de ponta, complexo aquático <strong className="text-white">CT Acqua</strong>,
                artes marciais e horários estendidos das <strong className="text-white">04h30 às 24h</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#planos"
                  style={chamferButtonStyle}
                  className="bg-[#E11D24] hover:bg-[#c5161d] text-white font-black uppercase tracking-wider text-sm px-8 py-4 text-center transition-all shadow-[0_10px_30px_rgba(225,29,36,0.35)]"
                >
                  Treine por R$ 39,90 no 1º Mês
                </a>
                <a
                  href="#unidades"
                  style={chamferButtonStyle}
                  className="bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 text-center transition-all"
                >
                  Conhecer Unidades
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest text-zinc-400">
                <span>Aceitamos:</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded font-bold text-white">
                  WELLHUB (Basic+ / Silver+)
                </span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded font-bold text-white">
                  TOTALPASS
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div
                style={chamferCardStyle}
                className="relative bg-gradient-to-b from-[#1a0506] to-[#0d0d0d] border border-[#E11D24]/30 p-3 shadow-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                  <img
                    src="/ctzhn-foto-01.webp"
                    alt="Estrutura interna CT ZHN Paulínia"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#E11D24]">
                        Unidade Bela Vista
                      </p>
                      <p className="text-xl font-black uppercase">Equipamentos Kikos Pro</p>
                    </div>
                    <img
                      src="/logo-ctzhn.png"
                      alt="Logo CT ZHN"
                      className="h-12 w-auto drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS & IMPACTO */}
      <section
        id="estrutura"
        className="py-20 bg-gradient-to-b from-[#1f0406] via-[#120304] to-[#080808] border-y border-[#E11D24]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
              Uma estrutura feita de <span className="text-[#E11D24]">força e resultado.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              style={chamferCardStyle}
              className="bg-gradient-to-b from-[#E11D24] to-[#68090d] p-8 sm:p-10 flex flex-col justify-between min-h-[290px] shadow-xl"
            >
              <div className="text-5xl sm:text-6xl font-black tracking-tighter">+2.000m²</div>
              <div>
                <div className="h-[1px] w-full bg-white/30 my-5" />
                <p className="text-lg font-semibold leading-snug text-white/95">
                  Ampla área de musculação, sala de pose, lounge recreativo e acessibilidade completa.
                </p>
              </div>
            </div>

            <div
              style={chamferCardStyle}
              className="bg-gradient-to-b from-[#E11D24] to-[#68090d] p-8 sm:p-10 flex flex-col justify-between min-h-[290px] shadow-xl"
            >
              <div className="text-5xl sm:text-6xl font-black tracking-tighter">19h30</div>
              <div>
                <div className="h-[1px] w-full bg-white/30 my-5" />
                <p className="text-lg font-semibold leading-snug text-white/95">
                  Horas por dia de portas abertas de segunda a sexta (04h30 às 24h) para você treinar sem desculpas.
                </p>
              </div>
            </div>

            <div
              style={chamferCardStyle}
              className="bg-gradient-to-b from-[#E11D24] to-[#68090d] p-8 sm:p-10 flex flex-col justify-between min-h-[290px] shadow-xl"
            >
              <div className="text-5xl sm:text-6xl font-black tracking-tighter flex items-center gap-3">
                4.8 <Star className="w-10 h-10 fill-[#C8A96E] text-[#C8A96E]" />
              </div>
              <div>
                <div className="h-[1px] w-full bg-white/30 my-5" />
                <p className="text-lg font-semibold leading-snug text-white/95">
                  Nota máxima de satisfação avaliada por centenas de alunos em Paulínia.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/[0.03] border border-white/10 p-6 flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-[#C8A96E] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wider">Sala de Pose & Lounge</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Iluminação dedicada para atletas e espaço de convivência para descanso pós-treino.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-6 flex items-start gap-4">
              <Accessibility className="w-6 h-6 text-[#C8A96E] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wider">100% Acessível</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Entrada e estacionamento adaptados para cadeirantes com total conforto e segurança.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 p-6 flex items-start gap-4">
              <Users className="w-6 h-6 text-[#C8A96E] shrink-0 mt-1" />
              <div>
                <h3 className="font-bold uppercase text-sm tracking-wider">Para Toda a Família</h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Programas específicos desde o Jiu-Jitsu Kids e natação infantil até atividades para idosos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section id="modalidades" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-[#E11D24] font-bold uppercase tracking-widest text-xs">
              Treinamento Completo
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase mt-2">
              Nossas Modalidades
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm">
            Do levantamento de peso pesado às aulas coletivas de alta queima calórica e complexo aquático climatizado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Dumbbell,
              title: 'Musculação & Cross',
              desc: 'Maquinário moderno de alta biomecânica, pesos livres e área dedicada de Cross Training.',
              tag: 'Todas as unidades',
            },
            {
              icon: Waves,
              title: 'CT Acqua (Natação)',
              desc: 'Complexo aquático completo com aulas para crianças, adultos e terceira idade.',
              tag: 'Complexo Aquático',
            },
            {
              icon: ShieldAlert,
              title: 'Artes Marciais',
              desc: 'Aulas técnicas de Jiu-Jitsu adulto, Jiu-Jitsu Kids e Muay Thai com professores graduados.',
              tag: 'Adulto & Kids',
            },
            {
              icon: Flame,
              title: 'Aulas Coletivas',
              desc: 'Energia máxima com Spinning, Bike Indoor, FitDance e Ritbox inclusos na grade.',
              tag: 'Alta Queima',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={chamferCardStyle}
                className="bg-[#111111] border border-white/10 hover:border-[#E11D24] p-7 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#E11D24]/15 border border-[#E11D24]/40 flex items-center justify-center text-[#E11D24] mb-6 group-hover:bg-[#E11D24] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8A96E]">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-black uppercase mt-1 mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* GRADE DE AULAS COLETIVAS */}
      <section id="horarios" className="py-20 bg-[#0D0D0D] border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#E11D24] font-bold uppercase tracking-widest text-xs">
              Programação Semanal
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase mt-2">
              Grade de Aulas Coletivas
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {Object.keys(schedule).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 font-black uppercase text-xs tracking-wider transition-all ${
                  selectedDay === day
                    ? 'bg-[#E11D24] text-white shadow-[0_0_20px_rgba(225,29,36,0.4)]'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {schedule[selectedDay].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#141414] border border-white/10 p-5 flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E11D24]">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-black uppercase mt-0.5">{item.activity}</h4>
                </div>
                <div className="px-3 py-1.5 bg-black border border-white/15 font-mono font-bold text-sm text-[#C8A96E]">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS E CONVÊNIOS */}
      <section id="planos" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#E11D24] font-bold uppercase tracking-widest text-xs">
            Invista na sua saúde
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase mt-2">
            Planos & Condições
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            Acesso às duas unidades do CT ZHN em Paulínia. Consulte disponibilidade e condições vigentes.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          <div
            style={chamferCardStyle}
            className="bg-gradient-to-b from-[#1c0708] to-[#0f0f0f] border-2 border-[#E11D24] p-8 flex flex-col justify-between relative"
          >
            <div>
              <span className="inline-block bg-[#E11D24] text-white text-[11px] font-black uppercase tracking-widest px-3 py-1 mb-4">
                Oferta de Entrada
              </span>
              <h3 className="text-2xl font-black uppercase">Plano Fidelidade</h3>
              <p className="text-zinc-400 text-xs mt-1">Permanência mínima de 5 meses</p>

              <div className="my-6">
                <span className="text-xs text-zinc-400 uppercase block">1º Mês por apenas</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg font-bold text-[#E11D24]">R$</span>
                  <span className="text-5xl font-black tracking-tight">39,90</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Demais mensalidades por <strong className="text-white">R$ 159,90/mês</strong> no recorrente.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-zinc-300 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D24] shrink-0" />
                  Acesso às 2 unidades CT ZHN
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D24] shrink-0" />
                  Musculação completa
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E11D24] shrink-0" />
                  Spinning, FitDance e Ritbox inclusos
                </li>
              </ul>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 block text-center bg-[#E11D24] hover:bg-[#c5161d] text-white font-black uppercase tracking-wider text-xs py-4 transition-colors"
            >
              Garantir Promoção
            </a>
          </div>

          <div
            style={chamferCardStyle}
            className="bg-[#111111] border border-white/15 p-8 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block bg-[#C8A96E]/20 text-[#C8A96E] border border-[#C8A96E]/40 text-[11px] font-black uppercase tracking-widest px-3 py-1 mb-4">
                Especial Infantil
              </span>
              <h3 className="text-2xl font-black uppercase">Combo Kids</h3>
              <p className="text-zinc-400 text-xs mt-1">Natação + Jiu-Jitsu Kids</p>

              <div className="my-6">
                <span className="text-xs text-zinc-400 uppercase block">Investimento Mensal</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-lg font-bold text-[#C8A96E]">R$</span>
                  <span className="text-5xl font-black tracking-tight">399,90</span>
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Desenvolvimento motor, disciplina e segurança aquática.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-zinc-300 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A96E] shrink-0" />
                  Aulas no Complexo CT Acqua
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A96E] shrink-0" />
                  Jiu-Jitsu Kids com metodologia dedicada
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A96E] shrink-0" />
                  Professores especializados
                </li>
              </ul>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 block text-center bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-wider text-xs py-4 transition-colors"
            >
              Consultar Turmas Kids
            </a>
          </div>

          <div
            style={chamferCardStyle}
            className="bg-[#111111] border border-white/15 p-8 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block bg-white/10 text-zinc-300 text-[11px] font-black uppercase tracking-widest px-3 py-1 mb-4">
                Benefícios Corporativos
              </span>
              <h3 className="text-2xl font-black uppercase">Wellhub & TotalPass</h3>
              <p className="text-zinc-400 text-xs mt-1">Use o benefício da sua empresa</p>

              <div className="my-6 space-y-3">
                <div className="p-4 bg-black/50 border border-white/10">
                  <p className="font-black text-sm uppercase text-white">Wellhub (Gympass)</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Aceito a partir dos planos <strong className="text-white">Basic+ e Silver+</strong>.
                  </p>
                </div>
                <div className="p-4 bg-black/50 border border-white/10">
                  <p className="font-black text-sm uppercase text-white">TotalPass</p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Check-in liberado diretamente pelo aplicativo TotalPass.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 block text-center bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-wider text-xs py-4 transition-colors"
            >
              Validar Meu Plano
            </a>
          </div>
        </div>
      </section>

      {/* UNIDADES E LOCALIZAÇÃO */}
      <section id="unidades" className="py-24 bg-[#0D0D0D] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-[#E11D24] font-bold uppercase tracking-widest text-xs">
                Onde Estamos
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase mt-2">
                Nossas Unidades em Paulínia
              </h2>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedUnit('bela-vista')}
                className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all ${
                  selectedUnit === 'bela-vista'
                    ? 'bg-[#E11D24] text-white'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Bela Vista (Matriz)
              </button>
              <button
                onClick={() => setSelectedUnit('vila-bressani')}
                className={`px-5 py-3 text-xs font-black uppercase tracking-wider transition-all ${
                  selectedUnit === 'vila-bressani'
                    ? 'bg-[#E11D24] text-white'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                Vila Bressani
              </button>
            </div>
          </div>

          <div
            style={chamferCardStyle}
            className="bg-[#131313] border border-white/10 p-8 sm:p-12 grid lg:grid-cols-2 gap-10 items-center"
          >
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                {units[selectedUnit].name}
              </h3>

              <div className="space-y-4 text-zinc-300 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E11D24] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">{units[selectedUnit].address}</p>
                    <p className="text-zinc-500">CEP: {units[selectedUnit].cep}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#E11D24] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">{units[selectedUnit].hoursWeek}</p>
                    <p className="text-zinc-400">{units[selectedUnit].hoursWeekend}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#E11D24] shrink-0" />
                  <p className="font-bold text-white">{units[selectedUnit].phone}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                {units[selectedUnit].highlights.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#C8A96E] shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={units[selectedUnit].mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-wider text-xs px-6 py-3.5 transition-colors inline-flex items-center gap-2"
                >
                  Abrir no Google Maps
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#E11D24] hover:bg-[#c5161d] text-white font-black uppercase tracking-wider text-xs px-6 py-3.5 transition-colors"
                >
                  Agendar Visita
                </a>
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 p-8 text-center space-y-4">
              <img
                src="/logo-ctzhn.png"
                alt="CT ZHN"
                className="h-24 w-auto mx-auto"
              />
              <p className="text-xs uppercase tracking-widest text-[#C8A96E] font-bold">
                @ctzhnpaulinia
              </p>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                Siga nosso perfil oficial no Instagram para acompanhar novidades, eventos internos e atualizações da grade de aulas.
              </p>
              <a
                href="https://www.instagram.com/ctzhnpaulinia/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white border border-white/20 hover:border-[#E11D24] px-6 py-3 transition-colors"
              >
                Acessar Instagram
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/logo-ctzhn.png" alt="CT ZHN" className="h-10 w-auto" />
            <div className="text-xs text-zinc-500">
              <p className="text-zinc-300 font-bold uppercase">CT ZHN Centro de Treinamento</p>
              <p>Paulínia – SP • Todos os direitos reservados</p>
            </div>
          </div>

          <div className="text-xs text-zinc-500 text-center md:text-right">
            <p>Av. Paulista, 609 (Bela Vista) • Av. Brasil, 428 (Vila Bressani)</p>
            <p className="mt-1">WhatsApp: (19) 99701-4081</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;