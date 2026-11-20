import React, { useState } from 'react';
import {
  Dumbbell,
  Flame,
  Users,
  Clock,
  MapPin,
  Check,
  ArrowUpRight,
  Phone,
  Shield,
  Sparkles,
  Calendar,
  ExternalLink,
  Zap,
  ChevronRight,
  Building2,
  Menu,
  X,
} from 'lucide-react';

const CT_CONFIG = {
  nome: 'CT ZHN',
  whatsapp: '5519997014081',
  whatsappDisplay: '(19) 99701-4081',
  instagram: 'https://instagram.com/ctzhnpaulinia',
  endereco: 'Av. Paulista, 609 - São Luiz, Paulínia - SP',
  cep: 'CEP 13145-040',
  horarioSemana: 'Seg a Sex: 04h30 às 24h',
  horarioFds: 'Sáb e Dom: 07h às 17h',
};

const MODALIDADES = [
  {
    num: '01',
    titulo: 'Musculação de Alta Performance',
    descricao:
      'Equipamentos biomecânicos de última geração distribuídos em mais de 2.000m² com instrutores presentes o tempo todo.',
    icon: Dumbbell,
    tag: 'Área Principal',
    imagem:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '02',
    titulo: 'Cross Training Híbrido',
    descricao:
      'Treinos metabólicos e de força explosiva com turmas de manhã e à noite para levar seu condicionamento ao limite.',
    icon: Flame,
    tag: 'Alta Intensidade',
    imagem:
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '03',
    titulo: 'Lutas & Artes Marciais',
    descricao:
      'Muay Thai, Jiu-Jitsu Adulto e Jiu-Jitsu Kids em tatame profissional. Técnica, disciplina e defesa pessoal.',
    icon: Shield,
    tag: 'Adulto & Kids',
    imagem:
      'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '04',
    titulo: 'FitDance, Ritbox & Danças',
    descricao:
      'Salas exclusivas com som e iluminação de alto impacto para você queimar calorias com energia máxima.',
    icon: Zap,
    tag: 'Incluso no Plano',
    imagem:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '05',
    titulo: 'Spinning / Bike Indoor',
    descricao:
      'Aulas dinâmicas de ciclismo indoor para acelerar o metabolismo, fortalecer membros inferiores e ganhar fôlego.',
    icon: Users,
    tag: 'Incluso no Plano',
    imagem:
      'https://images.unsplash.com/photo-1591741535018-d042766c62eb?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '06',
    titulo: 'Pilates Solo',
    descricao:
      'Controle postural, respiração, fortalecimento do core e mobilidade articular para equilíbrio físico e mental.',
    icon: Sparkles,
    tag: 'Bem-estar',
    imagem:
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=900&q=80',
  },
];

type DiaSemana = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado';

const GRADE_AULAS: Record<DiaSemana, { hora: string; aula: string; categoria: string }[]> = {
  Segunda: [
    { hora: '05:30 • 06:30 • 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '07:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '08:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '17:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '17:30 • 18:30 • 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '18:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '19:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '20:00', aula: 'Jiu-Jitsu', categoria: 'Lutas' },
  ],
  Terça: [
    { hora: '05:30 • 06:30 • 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '17:30 • 18:30 • 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '18:00', aula: 'Ritbox', categoria: 'Dança' },
    { hora: '19:00', aula: 'Jiu-Jitsu Kids', categoria: 'Lutas' },
    { hora: '20:00', aula: 'Muay Thai', categoria: 'Lutas' },
  ],
  Quarta: [
    { hora: '05:30 • 06:30 • 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '07:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '08:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '17:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '17:30 • 18:30 • 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '18:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '19:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '20:00', aula: 'Jiu-Jitsu', categoria: 'Lutas' },
  ],
  Quinta: [
    { hora: '05:30 • 06:30 • 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '17:30 • 18:30 • 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '18:00', aula: 'Ritbox', categoria: 'Dança' },
    { hora: '19:00', aula: 'Jiu-Jitsu Kids', categoria: 'Lutas' },
    { hora: '20:00', aula: 'Muay Thai', categoria: 'Lutas' },
  ],
  Sexta: [
    { hora: '05:30 • 06:30 • 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '17:30 • 18:30 • 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '20:00', aula: 'Jiu-Jitsu', categoria: 'Lutas' },
  ],
  Sábado: [
    { hora: '07:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '08:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '10:00', aula: 'Muay Thai', categoria: 'Lutas' },
  ],
};

const PLANOS = [
  {
    nome: 'Anual',
    sub: '12x no cartão',
    valorInteiro: '139',
    valorCentavos: ',90',
    observacao: 'Total R$ 1.678,80 • Economia máxima',
    destaque: 'Mais Escolhido',
    recomendado: true,
    beneficios: [
      'Musculação livre +2.000m²',
      'Todas as Aulas Coletivas inclusas',
      'Acesso às 2 unidades do CT ZHN',
      'Horário estendido (04h30 às 24h)',
    ],
  },
  {
    nome: 'Semestral',
    sub: '6x no cartão',
    valorInteiro: '149',
    valorCentavos: ',90',
    observacao: 'Total R$ 899,40 em até 6x',
    destaque: null,
    recomendado: false,
    beneficios: [
      'Musculação livre +2.000m²',
      'Todas as Aulas Coletivas inclusas',
      'Acesso às 2 unidades do CT ZHN',
      'Horário estendido (04h30 às 24h)',
    ],
  },
  {
    nome: 'Recorrente',
    sub: 'Cobrança mensal',
    valorInteiro: '159',
    valorCentavos: ',90',
    observacao: 'Não compromete o limite do cartão',
    destaque: null,
    recomendado: false,
    beneficios: [
      'Musculação livre +2.000m²',
      'Todas as Aulas Coletivas inclusas',
      'Cobrança automática mensal',
      'Horário estendido (04h30 às 24h)',
    ],
  },
  {
    nome: 'Mensal',
    sub: 'Pagamento único',
    valorInteiro: '179',
    valorCentavos: ',90',
    observacao: '1x à vista • Sem fidelidade',
    destaque: null,
    recomendado: false,
    beneficios: [
      'Musculação livre +2.000m²',
      'Todas as Aulas Coletivas inclusas',
      'Acesso completo por 30 dias',
      'Horário estendido (04h30 às 24h)',
    ],
  },
];

export function App() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState<DiaSemana>('Segunda');
  const [nomeLead, setNomeLead] = useState('');
  const [modalidadeInteresse, setModalidadeInteresse] = useState('Musculação + Aulas Coletivas');
  const [horarioPreferido, setHorarioPreferido] = useState('Noite (18h às 24h)');

  const abrirWhatsApp = (mensagem?: string) => {
    const texto =
      mensagem ||
      'Olá! Vim pelo site do CT ZHN Paulínia e gostaria de agendar uma visita / aula experimental.';
    window.open(`https://wa.me/${CT_CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeLead.trim()) return;
    const msg = `Olá, equipe CT ZHN! Meu nome é *${nomeLead}*.\nInteresse: *${modalidadeInteresse}*\nTurno preferido: *${horarioPreferido}*\n\nQuero resgatar minha visita / aula experimental!`;
    abrirWhatsApp(msg);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-red-600 selection:text-white">
      {/* FAIXA DE OFERTA */}
      <div className="relative z-50 bg-red-600 px-4 py-2 text-center text-xs sm:text-sm font-bold tracking-wide text-white">
        <span className="inline-flex flex-wrap items-center justify-center gap-2">
          <span>🔥 CONDIÇÃO LIMITADA: Comece a treinar pagando apenas R$ 39,90 no 1º mês</span>
          <button
            onClick={() =>
              abrirWhatsApp('Olá! Quero garantir a promoção de R$ 39,90 no primeiro mês no CT ZHN Paulínia!')
            }
            className="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-0.5 text-xs uppercase tracking-wider hover:bg-black/50 transition cursor-pointer"
          >
            Garantir vaga <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </span>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090b]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center rounded-xl bg-white p-1 shadow-md shadow-red-600/10 transition group-hover:scale-105">
              <img
                src="/logo-ctzhn.png"
                alt="CT ZHN Centro de Treinamento"
                className="h-11 w-auto object-contain"
              />
            </div>
            <div>
              <span className="font-display block text-2xl font-bold tracking-wider text-white leading-none">
                CT ZHN
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400">
                Paulínia • SP
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-300">
            <a href="#estrutura" className="hover:text-white transition">Estrutura</a>
            <a href="#modalidades" className="hover:text-white transition">Modalidades</a>
            <a href="#grade" className="hover:text-white transition">Grade Horária</a>
            <a href="#planos" className="hover:text-white transition">Planos</a>
            <a href="#localizacao" className="hover:text-white transition">Unidade</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#experimental"
              className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/5 transition"
            >
              Aula Grátis
            </a>
            <button
              onClick={() => abrirWhatsApp()}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-red-600/25 hover:bg-red-500 transition cursor-pointer"
            >
              Matricule-se <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* BOTÃO MOBILE */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden rounded-lg border border-white/10 p-2 text-zinc-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {menuAberto && (
          <div className="md:hidden border-t border-white/10 bg-[#09090b] px-4 py-5 space-y-4">
            <div className="flex flex-col space-y-3 text-sm font-semibold text-zinc-300">
              <a href="#estrutura" onClick={() => setMenuAberto(false)}>Estrutura</a>
              <a href="#modalidades" onClick={() => setMenuAberto(false)}>Modalidades</a>
              <a href="#grade" onClick={() => setMenuAberto(false)}>Grade Horária</a>
              <a href="#planos" onClick={() => setMenuAberto(false)}>Planos</a>
              <a href="#localizacao" onClick={() => setMenuAberto(false)}>Localização</a>
            </div>
            <button
              onClick={() => abrirWhatsApp()}
              className="w-full rounded-xl bg-red-600 py-3 text-sm font-extrabold uppercase tracking-wider text-white"
            >
              Falar no WhatsApp
            </button>
          </div>
        )}
      </header>

      {/* HERO CINEMATOGRÁFICO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden border-b border-white/10">
        {/* IMAGEM DE FUNDO COM OVERLAY DRAMÁTICO */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1920&q=80"
            alt="Estrutura CT ZHN Paulínia"
            className="h-full w-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/90 to-[#09090b]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/60" />
        </div>

        {/* BRILHO VERMELHO DE AMBIENTE */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 w-full">
          <div className="max-w-3xl space-y-7">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-400">
                O Maior Centro de Treinamento de Paulínia
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-[84px] font-bold tracking-tight leading-[0.95] text-white">
              ESTRUTURA DE ELITE.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">
                RESULTADO REAL.
              </span>
            </h1>

            <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl leading-relaxed font-normal">
              Mais de <strong className="text-white font-bold">2.000 m²</strong> com equipamentos de ponta, Cross Training, Lutas, Danças, Spinning e Pilates. Aberto de{' '}
              <strong className="text-amber-400 font-bold">Segunda a Sexta das 04h30 à meia-noite</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#experimental"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-8 py-4.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-2xl shadow-red-600/30 hover:bg-red-500 transition"
              >
                <span>Agendar Aula Experimental</span>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#planos"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-4.5 text-sm font-extrabold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/10 transition"
              >
                Ver Planos e Valores
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA DE NÚMEROS / AUTORIDADE */}
      <section id="estrutura" className="border-b border-white/10 bg-zinc-950/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-2 border-red-600 pl-4">
              <p className="font-display text-4xl sm:text-5xl font-bold text-white">+2.000m²</p>
              <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">
                Maior estrutura fitness de Paulínia
              </p>
            </div>
            <div className="border-l-2 border-amber-400 pl-4">
              <p className="font-display text-4xl sm:text-5xl font-bold text-white">04h30 - 24h</p>
              <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">
                Horário estendido de Seg a Sex
              </p>
            </div>
            <div className="border-l-2 border-red-600 pl-4">
              <p className="font-display text-4xl sm:text-5xl font-bold text-white">2 UNIDADES</p>
              <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">
                Acesso integrado na rede CT ZHN
              </p>
            </div>
            <div className="border-l-2 border-amber-400 pl-4">
              <p className="font-display text-4xl sm:text-5xl font-bold text-white">+12.600</p>
              <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-1">
                Alunos e seguidores na comunidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODALIDADES COM FOTOS E VISUAL EDITORIAL */}
      <section id="modalidades" className="py-24 bg-grid-pattern relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-red-500">
                Tudo em um só lugar
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-white leading-none">
                Nossas Modalidades
              </h2>
            </div>
            <p className="text-zinc-400 max-w-md text-sm sm:text-base">
              Ambientes exclusivos, climatizados e equipados para você evoluir na musculação, no cardio ou no tatame.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODALIDADES.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.titulo}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60"
                >
                  {/* IMAGEM DO CARD */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={mod.imagem}
                      alt={mod.titulo}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-black/70 border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur-md">
                      {mod.tag}
                    </span>
                    <span className="font-display absolute bottom-2 right-5 text-5xl font-bold text-white/15">
                      {mod.num}
                    </span>
                  </div>

                  {/* CONTEÚDO DO CARD */}
                  <div className="p-6 pt-3 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="rounded-lg bg-red-600/20 p-2 text-red-500">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                          {mod.titulo}
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{mod.descricao}</p>
                    </div>

                    <button
                      onClick={() =>
                        abrirWhatsApp(
                          `Olá! Gostaria de conhecer mais sobre a modalidade *${mod.titulo}* no CT ZHN Paulínia.`
                        )
                      }
                      className="pt-3 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-red-400 group-hover:text-red-300 transition cursor-pointer"
                    >
                      Agendar aula experimental <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRADE HORÁRIA INTERATIVA */}
      <section id="grade" className="py-24 border-y border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">
              Aulas Coletivas & Cross
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white">
              Grade de Horários
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Escolha o dia da semana e reserve sua vaga direto pelo WhatsApp.
            </p>
          </div>

          {/* ABAS DE DIAS */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {(Object.keys(GRADE_AULAS) as DiaSemana[]).map((dia) => (
              <button
                key={dia}
                onClick={() => setDiaSelecionado(dia)}
                className={`rounded-xl px-6 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition cursor-pointer ${
                  diaSelecionado === dia
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                    : 'border border-white/10 bg-zinc-900/80 text-zinc-400 hover:border-white/25 hover:text-white'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>

          {/* CARDS DE HORÁRIOS */}
          <div className="grid sm:grid-cols-2 gap-4">
            {GRADE_AULAS[diaSelecionado].map((item, idx) => (
              <div
                key={`${item.aula}-${idx}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/50 p-5 hover:border-red-500/40 transition"
              >
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 rounded-md bg-red-600/15 px-2.5 py-1 text-xs font-bold text-red-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.hora}</span>
                  </div>
                  <h4 className="font-display text-2xl font-bold text-white tracking-wide">
                    {item.aula}
                  </h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {item.categoria}
                  </p>
                </div>

                <button
                  onClick={() =>
                    abrirWhatsApp(
                      `Olá! Quero agendar uma aula experimental de *${item.aula}* na *${diaSelecionado}* (${item.hora}) no CT ZHN Paulínia.`
                    )
                  }
                  className="shrink-0 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white hover:bg-red-600 transition cursor-pointer"
                >
                  Reservar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-24 bg-grid-pattern relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-red-500">
              Invista em Você
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-white">
              Planos CT ZHN
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Todos os planos incluem musculação completa e acesso às aulas coletivas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {PLANOS.map((plano) => (
              <div
                key={plano.nome}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all ${
                  plano.recomendado
                    ? 'border-2 border-red-500 bg-gradient-to-b from-red-950/40 via-zinc-900 to-zinc-950 shadow-2xl shadow-red-600/20 lg:-translate-y-2'
                    : 'border border-white/10 bg-zinc-900/70'
                }`}
              >
                {plano.destaque && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400 px-4 py-1 text-xs font-black uppercase tracking-wider text-black shadow-lg">
                    ★ {plano.destaque}
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-white tracking-wide">
                      Plano {plano.nome}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mt-1">
                      {plano.sub}
                    </p>
                  </div>

                  <div className="flex items-baseline text-white">
                    <span className="text-lg font-bold text-zinc-400 mr-1">R$</span>
                    <span className="font-display text-6xl font-bold tracking-tight">
                      {plano.valorInteiro}
                    </span>
                    <span className="text-2xl font-bold text-red-500">{plano.valorCentavos}</span>
                    <span className="text-xs text-zinc-400 ml-1">/mês</span>
                  </div>

                  <p className="text-xs text-zinc-400 border-b border-white/10 pb-5">
                    {plano.observacao}
                  </p>

                  <ul className="space-y-3">
                    {plano.beneficios.map((ben) => (
                      <li key={ben} className="flex items-start gap-2.5 text-sm text-zinc-200">
                        <span className="mt-0.5 rounded-full bg-red-600/20 p-1 text-red-500">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    abrirWhatsApp(
                      `Olá! Quero assinar o *Plano ${plano.nome}* (${plano.sub} de R$ ${plano.valorInteiro}${plano.valorCentavos}) no CT ZHN Paulínia!`
                    )
                  }
                  className={`mt-8 w-full rounded-xl py-4 text-xs font-extrabold uppercase tracking-widest transition cursor-pointer ${
                    plano.recomendado
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-500'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                >
                  Quero Este Plano
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE CAPTURA DE LEAD (AULA EXPERIMENTAL) */}
      <section id="experimental" className="py-24 border-t border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/30 grid lg:grid-cols-12">
            {/* LADO ESQUERDO: CHAMADA */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="inline-block rounded-full bg-red-600/20 border border-red-500/30 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-red-400">
                  Passe Livre • Sem Compromisso
                </span>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
                  VENHA CONHECER A ESTRUTURA NA PRÁTICA.
                </h2>
                <p className="text-zinc-300 text-base leading-relaxed">
                  Agende agora um treino experimental gratuito no CT ZHN Paulínia. Conheça nossos equipamentos, salas de aula e tire suas dúvidas direto com nossa equipe.
                </p>
              </div>

              <div className="space-y-3 text-sm text-zinc-300">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-amber-400" />
                  <span>Mais de 2.000m² climatizados em Paulínia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-400" />
                  <span>Aberto das 04h30 às 24h (Segunda a Sexta)</span>
                </div>
              </div>
            </div>

            {/* LADO DIREITO: FORMULÁRIO */}
            <div className="lg:col-span-6 bg-black/40 p-8 sm:p-12 border-t lg:border-t-0 lg:border-l border-white/10">
              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lucas Oliveira"
                    value={nomeLead}
                    onChange={(e) => setNomeLead(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-zinc-950 px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Modalidade de Interesse
                  </label>
                  <select
                    value={modalidadeInteresse}
                    onChange={(e) => setModalidadeInteresse(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-zinc-950 px-4 py-3.5 text-sm text-white focus:border-red-500 focus:outline-none"
                  >
                    <option value="Musculação + Aulas Coletivas">Musculação + Aulas Coletivas</option>
                    <option value="Cross Training Híbrido">Cross Training Híbrido</option>
                    <option value="Lutas (Muay Thai / Jiu-Jitsu)">Lutas (Muay Thai / Jiu-Jitsu)</option>
                    <option value="Danças / FitDance / Ritbox / Bike">Danças / FitDance / Ritbox / Bike</option>
                    <option value="Pilates Solo">Pilates Solo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Turno que prefere treinar
                  </label>
                  <select
                    value={horarioPreferido}
                    onChange={(e) => setHorarioPreferido(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-zinc-950 px-4 py-3.5 text-sm text-white focus:border-red-500 focus:outline-none"
                  >
                    <option value="Madrugada / Manhã cedo (04h30 às 09h)">Madrugada / Manhã cedo (04h30 às 09h)</option>
                    <option value="Manhã / Almoço (09h às 14h)">Manhã / Almoço (09h às 14h)</option>
                    <option value="Tarde (14h às 18h)">Tarde (14h às 18h)</option>
                    <option value="Noite (18h às 24h)">Noite (18h às 24h)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-xl shadow-emerald-600/20 hover:bg-emerald-500 transition cursor-pointer"
                >
                  <Phone className="h-4 w-4" /> Resgatar Aula Grátis no WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section id="localizacao" className="py-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-amber-400">
              Localização
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              Onde Estamos
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 flex items-start gap-4">
                <MapPin className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Endereço Oficial</h4>
                  <p className="text-sm text-zinc-300 mt-1">{CT_CONFIG.endereco}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{CT_CONFIG.cep}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 flex items-start gap-4">
                <Clock className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Horário de Funcionamento</h4>
                  <p className="text-sm text-zinc-300 mt-1">{CT_CONFIG.horarioSemana}</p>
                  <p className="text-sm text-zinc-300">{CT_CONFIG.horarioFds}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 flex items-start gap-4">
                <Phone className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Atendimento WhatsApp</h4>
                  <p className="text-sm text-zinc-300 mt-1">{CT_CONFIG.whatsappDisplay}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-3xl border border-white/10 h-96 shadow-2xl">
            <iframe
              title="Mapa CT ZHN Paulínia"
              src="https://www.google.com/maps?q=Av.+Paulista,+609+-+Sao+Luiz,+Paulinia+-+SP&output=embed"
              className="h-full w-full border-0 grayscale contrast-125 invert opacity-85"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-400">
          <div className="flex items-center gap-3">
            <img
              src="/logo-ctzhn.png"
              alt="CT ZHN"
              className="h-10 w-auto rounded-lg bg-white p-1"
            />
            <div>
              <span className="font-display block text-lg font-bold text-white tracking-wider">
                CT ZHN • CENTRO DE TREINAMENTO
              </span>
              <span className="text-xs text-zinc-500">Av. Paulista, 609 • Paulínia - SP</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={CT_CONFIG.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-zinc-300 hover:text-white transition"
            >
              <ExternalLink className="h-4 w-4 text-red-500" /> @ctzhnpaulinia
            </a>
            <button
              onClick={() => abrirWhatsApp()}
              className="font-semibold text-zinc-300 hover:text-white transition cursor-pointer"
            >
              {CT_CONFIG.whatsappDisplay}
            </button>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <button
        onClick={() => abrirWhatsApp()}
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-2xl shadow-emerald-600/40 hover:bg-emerald-500 hover:scale-105 transition cursor-pointer"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden sm:inline">Falar no WhatsApp</span>
      </button>
    </div>
  );
}

export default App;
