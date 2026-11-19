import React, { useState } from 'react';
import {
  Dumbbell,
  Flame,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  Shield,
  Sparkles,
  Calendar,
  ExternalLink,
  Award,
  Zap,
} from 'lucide-react';

const CT_CONFIG = {
  nome: 'CT ZHN',
  subtitulo: 'CENTRO DE TREINAMENTO • PAULÍNIA',
  whatsapp: '5519997014081',
  whatsappDisplay: '(19) 99701-4081',
  instagram: 'https://instagram.com/ctzhnpaulinia',
  endereco: 'Av. Paulista, 609 - São Luiz, Paulínia - SP (CEP 13145-040)',
  horarioSemana: 'Seg a Sex: 04h30 às 24h',
  horarioFds: 'Sáb e Dom: 07h às 17h',
};

const MODALIDADES = [
  {
    titulo: 'Musculação Completa',
    descricao:
      'Equipamentos de última geração em um espaço amplo de +2.000m² com acompanhamento profissional do iniciante ao avançado.',
    icon: Dumbbell,
    tag: 'Área Principal',
  },
  {
    titulo: 'Cross Training Híbrido',
    descricao:
      'Treinos intensos de força, resistência e condicionamento metabólico com turmas pela manhã e à noite.',
    icon: Flame,
    tag: 'Alta Intensidade',
  },
  {
    titulo: 'Danças, FitDance & Ritbox',
    descricao:
      'Aulas cheias de ritmo, energia e alto gasto calórico em salas exclusivas e climatizadas.',
    icon: Zap,
    tag: 'Incluso no Plano',
  },
  {
    titulo: 'Spinning / Bike',
    descricao:
      'Treinos cardiovasculares dinâmicos para acelerar seus resultados e elevar sua resistência.',
    icon: Users,
    tag: 'Incluso no Plano',
  },
  {
    titulo: 'Lutas & Artes Marciais',
    descricao:
      'Muay Thai, Jiu-Jitsu Adulto e Jiu-Jitsu Kids unindo técnica, disciplina, defesa pessoal e condicionamento.',
    icon: Shield,
    tag: 'Adulto e Kids',
  },
  {
    titulo: 'Pilates Solo',
    descricao:
      'Fortalecimento do core, postura, respiração, alongamento e consciência corporal para máxima qualidade de vida.',
    icon: Sparkles,
    tag: 'Bem-estar',
  },
];

type DiaSemana = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado';

const GRADE_AULAS: Record<DiaSemana, { hora: string; aula: string; categoria: string }[]> = {
  Segunda: [
    { hora: '05:30 / 06:30 / 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '07:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '08:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '17:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '17:30 / 18:30 / 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '18:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '19:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '20:00', aula: 'Jiu-Jitsu', categoria: 'Lutas' },
  ],
  Terça: [
    { hora: '05:30 / 06:30 / 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '17:30 / 18:30 / 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '18:00', aula: 'Ritbox', categoria: 'Dança' },
    { hora: '19:00', aula: 'Jiu-Jitsu Kids', categoria: 'Lutas' },
    { hora: '20:00', aula: 'Muay Thai', categoria: 'Lutas' },
  ],
  Quarta: [
    { hora: '05:30 / 06:30 / 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '07:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '08:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '17:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '17:30 / 18:30 / 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '18:00', aula: 'Bike / Spinning', categoria: 'Cardio' },
    { hora: '19:00', aula: 'Fit Dance', categoria: 'Dança' },
    { hora: '20:00', aula: 'Jiu-Jitsu', categoria: 'Lutas' },
  ],
  Quinta: [
    { hora: '05:30 / 06:30 / 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '17:30 / 18:30 / 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '18:00', aula: 'Ritbox', categoria: 'Dança' },
    { hora: '19:00', aula: 'Jiu-Jitsu Kids', categoria: 'Lutas' },
    { hora: '20:00', aula: 'Muay Thai', categoria: 'Lutas' },
  ],
  Sexta: [
    { hora: '05:30 / 06:30 / 07:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
    { hora: '17:30 / 18:30 / 19:30', aula: 'Cross Training Híbrido', categoria: 'Cross' },
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
    parcela: '12x de',
    preco: 'R$ 139,90',
    total: 'Total R$ 1.678,80 em até 12x',
    destaque: 'Mais Vantajoso',
    recomendado: true,
    beneficios: [
      'Acesso completo à Musculação',
      'Todas as Aulas Coletivas inclusas',
      'Acesso às duas unidades do CT ZHN',
      'Horário estendido (04h30 às 24h)',
    ],
  },
  {
    nome: 'Semestral',
    parcela: '6x de',
    preco: 'R$ 149,90',
    total: 'Total R$ 899,40 em até 6x',
    destaque: null,
    recomendado: false,
    beneficios: [
      'Acesso completo à Musculação',
      'Todas as Aulas Coletivas inclusas',
      'Acesso às duas unidades do CT ZHN',
      'Horário estendido (04h30 às 24h)',
    ],
  },
  {
    nome: 'Recorrente',
    parcela: 'Cobrança mensal',
    preco: 'R$ 159,90',
    total: 'Sem comprometer o limite do cartão',
    destaque: null,
    recomendado: false,
    beneficios: [
      'Acesso completo à Musculação',
      'Todas as Aulas Coletivas inclusas',
      'Pagamento recorrente no crédito',
      'Horário estendido (04h30 às 24h)',
    ],
  },
  {
    nome: 'Mensal',
    parcela: 'À vista',
    preco: 'R$ 179,90',
    total: '1x de R$ 179,90 sem fidelidade',
    destaque: null,
    recomendado: false,
    beneficios: [
      'Acesso completo à Musculação',
      'Todas as Aulas Coletivas inclusas',
      'Ideal para quem quer testar por 30 dias',
      'Horário estendido (04h30 às 24h)',
    ],
  },
];

export function App() {
  const [diaSelecionado, setDiaSelecionado] = useState<DiaSemana>('Segunda');
  const [nomeLead, setNomeLead] = useState('');
  const [modalidadeInteresse, setModalidadeInteresse] = useState('Musculação + Aulas Coletivas');
  const [horarioPreferido, setHorarioPreferido] = useState('Noite (após 18h)');

  const abrirWhatsApp = (mensagem?: string) => {
    const texto =
      mensagem ||
      'Olá! Vim pelo site do CT ZHN Paulínia e gostaria de mais informações sobre planos e aula experimental.';
    window.open(`https://wa.me/${CT_CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeLead.trim()) return;
    const msg = `Olá, equipe CT ZHN! Meu nome é *${nomeLead}*.\nTenho interesse em: *${modalidadeInteresse}*\nHorário que costumo treinar: *${horarioPreferido}*\n\nGostaria de agendar uma visita / aula experimental e conhecer as condições!`;
    abrirWhatsApp(msg);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-red-600 selection:text-white">
      {/* TOP BAR PROMOCIONAL */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 px-4 py-2 text-center text-xs sm:text-sm font-bold tracking-wide text-white">
        🔥 CONDIÇÃO ESPECIAL: Comece a treinar pagando apenas <span className="underline">R$ 39,90 no 1º mês</span>!{' '}
        <button
          onClick={() =>
            abrirWhatsApp('Olá! Vi no site a condição especial de R$ 39,90 no primeiro mês e quero garantir a minha!')
          }
          className="ml-2 inline-flex items-center gap-1 rounded bg-neutral-950/30 px-2.5 py-0.5 text-xs uppercase hover:bg-neutral-950/50 transition cursor-pointer"
        >
          Garantir agora <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/logo-ctzhn.png"
              alt="Logo CT ZHN Centro de Treinamento"
              className="h-12 w-auto object-contain rounded-lg bg-white/95 p-1"
            />
            <div className="hidden sm:block">
              <span className="block font-black text-lg tracking-wider text-white leading-none">
                {CT_CONFIG.nome}
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-amber-400">
                PAULÍNIA • SP
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a href="#modalidades" className="hover:text-red-500 transition">Modalidades</a>
            <a href="#grade" className="hover:text-red-500 transition">Grade de Aulas</a>
            <a href="#planos" className="hover:text-red-500 transition">Planos</a>
            <a href="#localizacao" className="hover:text-red-500 transition">Localização</a>
          </nav>

          <button
            onClick={() => abrirWhatsApp()}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 transition cursor-pointer"
          >
            <Phone className="h-4 w-4" />
            <span>Matricule-se</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-red-600/15 blur-3xl" />

        <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Award className="h-4 w-4 text-amber-400" />
              O Maior Centro de Treinamento de Paulínia
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
              Mais de <span className="text-red-500">2.000 m²</span> de estrutura para você atingir sua{' '}
              <span className="text-amber-400">melhor versão.</span>
            </h1>

            <p className="text-neutral-300 text-lg max-w-xl leading-relaxed">
              Musculação com equipamentos de ponta, Cross Training, Lutas, Danças, Spinning e Pilates em um só lugar — com horário estendido das{' '}
              <strong className="text-white">04h30 à meia-noite</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#agendar"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-red-600/25 hover:bg-red-500 transition"
              >
                Agendar Visita / Aula Grátis <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#planos"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900/90 px-7 py-4 text-base font-bold text-neutral-100 hover:border-neutral-500 hover:bg-neutral-800 transition"
              >
                Conhecer Planos
              </a>
            </div>

            {/* NÚMEROS DE AUTORIDADE */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">+2.000m²</p>
                <p className="text-xs text-neutral-400">De estrutura completa</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-red-500">04h30 - 24h</p>
                <p className="text-xs text-neutral-400">Segunda a Sexta</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400">2 Unidades</p>
                <p className="text-xs text-neutral-400">Acesso livre no CT ZHN</p>
              </div>
            </div>
          </div>

          {/* CARD DESTAQUE / FORMULÁRIO RÁPIDO HERO */}
          <div id="agendar" className="lg:col-span-5">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Atendimento Rápido
                </span>
                <h2 className="text-2xl font-black text-white">
                  Garanta seu Treino Experimental
                </h2>
                <p className="text-sm text-neutral-400">
                  Preencha abaixo e fale direto com a recepção do CT ZHN no WhatsApp.
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Digite seu nome completo"
                    value={nomeLead}
                    onChange={(e) => setNomeLead(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    O que você busca treinar?
                  </label>
                  <select
                    value={modalidadeInteresse}
                    onChange={(e) => setModalidadeInteresse(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  >
                    <option value="Musculação + Aulas Coletivas">Musculação + Aulas Coletivas</option>
                    <option value="Cross Training Híbrido">Cross Training Híbrido</option>
                    <option value="Lutas (Muay Thai / Jiu-Jitsu)">Lutas (Muay Thai / Jiu-Jitsu)</option>
                    <option value="Danças / FitDance / Ritbox / Bike">Danças / FitDance / Ritbox / Bike</option>
                    <option value="Pilates Solo">Pilates Solo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Melhor turno para você
                  </label>
                  <select
                    value={horarioPreferido}
                    onChange={(e) => setHorarioPreferido(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  >
                    <option value="Madrugada / Manhã cedo (04h30 - 09h)">Madrugada / Manhã cedo (04h30 - 09h)</option>
                    <option value="Manhã / Almoço (09h - 14h)">Manhã / Almoço (09h - 14h)</option>
                    <option value="Tarde (14h - 18h)">Tarde (14h - 18h)</option>
                    <option value="Noite (18h - 24h)">Noite (18h - 24h)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition cursor-pointer"
                >
                  <Phone className="h-4 w-4" /> Receber Passe no WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section id="modalidades" className="py-20 bg-neutral-900/50 border-y border-neutral-800/80 px-4">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Estrutura Completa
            </span>
            <h2 className="text-3xl md:text-4xl font-black">Modalidades do CT ZHN</h2>
            <p className="text-neutral-400">
              Ambientes exclusivos e climatizados para você treinar com intensidade, segurança e motivação.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODALIDADES.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.titulo}
                  className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 hover:border-red-500/60 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-red-600/15 p-3 text-red-500 group-hover:bg-red-600 group-hover:text-white transition">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs font-semibold text-amber-400">
                      {mod.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{mod.titulo}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{mod.descricao}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRADE DE AULAS COLETIVAS INTERATIVA */}
      <section id="grade" className="py-20 px-4">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Organize sua Rotina
            </span>
            <h2 className="text-3xl md:text-4xl font-black">Grade de Aulas Coletivas & Cross</h2>
            <p className="text-neutral-400">
              Selecione o dia da semana para conferir os horários das turmas em Paulínia.
            </p>
          </div>

          {/* SELETOR DE DIAS */}
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(GRADE_AULAS) as DiaSemana[]).map((dia) => (
              <button
                key={dia}
                onClick={() => setDiaSelecionado(dia)}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition cursor-pointer ${
                  diaSelecionado === dia
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                {dia}
              </button>
            ))}
          </div>

          {/* LISTA DE HORÁRIOS DO DIA */}
          <div className="grid sm:grid-cols-2 gap-4">
            {GRADE_AULAS[diaSelecionado].map((item, idx) => (
              <div
                key={`${item.aula}-${idx}`}
                className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-5"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.hora}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">{item.aula}</h4>
                  <span className="inline-block text-xs text-neutral-400">{item.categoria}</span>
                </div>

                <button
                  onClick={() =>
                    abrirWhatsApp(
                      `Olá! Gostaria de agendar uma aula experimental de *${item.aula}* (${diaSelecionado} - ${item.hora}) no CT ZHN Paulínia.`
                    )
                  }
                  className="shrink-0 rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2 text-xs font-bold text-white hover:border-red-500 hover:bg-red-600 transition cursor-pointer"
                >
                  Agendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20 bg-neutral-900/50 border-y border-neutral-800/80 px-4">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Planos CT ZHN
            </span>
            <h2 className="text-3xl md:text-4xl font-black">Escolha o Plano Ideal para Você</h2>
            <p className="text-neutral-400">
              Opções flexíveis para todos os perfis, com estrutura completa e acesso às modalidades.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANOS.map((plano) => (
              <div
                key={plano.nome}
                className={`relative rounded-2xl p-6 flex flex-col justify-between border ${
                  plano.recomendado
                    ? 'border-red-500 bg-neutral-900 shadow-xl shadow-red-950/30'
                    : 'border-neutral-800 bg-neutral-950'
                }`}
              >
                {plano.destaque && (
                  <span className="absolute -top-3 right-4 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-black uppercase text-neutral-950">
                    {plano.destaque}
                  </span>
                )}

                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-black text-white">Plano {plano.nome}</h3>
                    <p className="text-xs text-neutral-400 mt-1">{plano.parcela}</p>
                    <p className="text-3xl font-black text-white mt-0.5">{plano.preco}</p>
                    <p className="text-xs text-neutral-400 mt-1">{plano.total}</p>
                  </div>

                  <ul className="space-y-2.5 border-t border-neutral-800 pt-4">
                    {plano.beneficios.map((ben) => (
                      <li key={ben} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    abrirWhatsApp(
                      `Olá! Tenho interesse no *Plano ${plano.nome}* (${plano.parcela} ${plano.preco}). Gostaria de fazer minha matrícula!`
                    )
                  }
                  className={`mt-6 w-full rounded-xl py-3 text-sm font-extrabold uppercase tracking-wide transition cursor-pointer ${
                    plano.recomendado
                      ? 'bg-red-600 text-white hover:bg-red-500'
                      : 'bg-neutral-800 text-white hover:bg-neutral-700'
                  }`}
                >
                  Eu Quero
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO E HORÁRIOS */}
      <section id="localizacao" className="py-20 px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Venha Conhecer
            </span>
            <h2 className="text-3xl md:text-4xl font-black">Onde Estamos em Paulínia</h2>
            <p className="text-neutral-400">
              Fácil acesso na Av. Paulista com amplo horário de funcionamento para se adaptar à sua rotina.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                <MapPin className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Endereço</h4>
                  <p className="text-sm text-neutral-300">{CT_CONFIG.endereco}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                <Clock className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Horário de Funcionamento</h4>
                  <p className="text-sm text-neutral-300">{CT_CONFIG.horarioSemana}</p>
                  <p className="text-sm text-neutral-300">{CT_CONFIG.horarioFds}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4">
                <Phone className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">WhatsApp / Contato</h4>
                  <p className="text-sm text-neutral-300">{CT_CONFIG.whatsappDisplay}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAPA GOOGLE EMBED */}
          <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 h-80 md:h-96">
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
      <footer className="border-t border-neutral-900 bg-neutral-950 py-10 px-4">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <div className="flex items-center gap-3">
            <img
              src="/logo-ctzhn.png"
              alt="CT ZHN"
              className="h-9 w-auto rounded bg-white p-0.5"
            />
            <span className="font-bold text-white">CT ZHN • Centro de Treinamento Paulínia</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={CT_CONFIG.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition"
            >
              <ExternalLink className="h-4 w-4 text-red-500" /> @ctzhnpaulinia
            </a>
            <button
              onClick={() => abrirWhatsApp()}
              className="hover:text-white transition cursor-pointer"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;