import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIdioma } from '../hooks/useIdioma';
import { SeletorIdioma } from './SeletorIdioma';
import { ModalIdentificacao } from './ModalIdentificacao';
import { obterCandidato } from '../utils/storage';
import { PerfilCandidato } from '../types';

export const Cabecalho: React.FC = () => {
  const { t } = useIdioma();
  const location = useLocation();
  const [modalAberto, setModalAberto] = useState(false);
  const [candidato, setCandidato] = useState<PerfilCandidato>(() => obterCandidato());

  const atualizarCandidato = () => {
    setCandidato(obterCandidato());
  };

  useEffect(() => {
    atualizarCandidato();
  }, [modalAberto]);

  const ehPaginaInicial = location.pathname === '/';

  // Primeiro nome e iniciais do candidato
  const primeiroNome = candidato.nome
    ? candidato.nome.trim().split(' ')[0]
    : '';

  const iniciais = candidato.nome
    ? candidato.nome
        .trim()
        .split(' ')
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <>
      {/* Barra de Topo Governamental (República de Moçambique) */}
      <div className="bg-[#1b2530] text-slate-300 text-[10px] sm:text-[11px] font-bold py-1 px-3 sm:px-6 border-b border-white/10 flex items-center justify-between tracking-wider uppercase">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-xs">🇲🇿</span>
          <span className="text-white font-black">República de Moçambique</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Ministério dos Transportes e Comunicações</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 font-semibold lowercase tracking-normal">
          <span className="hidden md:inline">inatro.gov.mz</span>
          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold uppercase text-[9px] tracking-wider bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Simulador Ativo
          </span>
        </div>
      </div>

      {/* Cabeçalho Principal Imponente */}
      <header className="sticky top-0 z-40 bg-[#35495E] text-white shadow-lg border-b border-[#EFBAAE]/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
          
          {/* Lado Esquerdo: Identidade Imponente da Plataforma INATRO */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {!ehPaginaInicial && (
              <Link
                to="/"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition shrink-0 border border-white/10"
                title={t('voltarInicio')}
                aria-label={t('voltarInicio')}
              >
                <i className="fa-solid fa-arrow-left text-xs"></i>
              </Link>
            )}

            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              {/* Emblema / Escudo Oficial do INATRO */}
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#EFBAAE] via-amber-200 to-[#EFBAAE] flex items-center justify-center text-[#35495E] font-black shadow-md group-hover:scale-105 transition-transform shrink-0 border border-white/30">
                <i className="fa-solid fa-car text-base sm:text-lg"></i>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-[#35495E] flex items-center justify-center text-[7px] text-white font-black">
                  ✓
                </span>
              </div>

              {/* Título e Subtítulo Oficial */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-lg sm:text-2xl tracking-tighter text-white drop-shadow-sm">
                    INATRO
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black bg-[#EFBAAE] text-[#35495E] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Teórico Oficial
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium tracking-tight truncate max-w-[160px] sm:max-w-none">
                  Simulador de Exame • Código da Estrada
                </span>
              </div>
            </Link>
          </div>

          {/* Centro: Links de Navegação (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/10 text-xs font-bold text-slate-200">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                ehPaginaInicial ? 'bg-white text-[#35495E] shadow-sm' : 'hover:bg-white/10 text-slate-200'
              }`}
            >
              <i className="fa-solid fa-house text-xs"></i>
              <span>Início</span>
            </Link>

            <Link
              to="/aulas"
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                location.pathname.startsWith('/aulas')
                  ? 'bg-white text-[#35495E] shadow-sm'
                  : 'hover:bg-white/10 text-slate-200'
              }`}
            >
              <i className="fa-solid fa-book-open text-xs text-amber-300"></i>
              <span>Aulas Teóricas</span>
              <span className="text-[9px] bg-amber-400 text-slate-900 font-black px-1.5 py-0.2 rounded-full uppercase">
                Manual
              </span>
            </Link>

            <Link
              to="/treino"
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                location.pathname.startsWith('/treino')
                  ? 'bg-white text-[#35495E] shadow-sm'
                  : 'hover:bg-white/10 text-slate-200'
              }`}
            >
              <i className="fa-solid fa-graduation-cap text-xs text-emerald-300"></i>
              <span>{t('modoTreino')}</span>
            </Link>

            <Link
              to="/exame"
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                location.pathname.startsWith('/exame')
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'hover:bg-white/10 text-slate-200'
              }`}
            >
              <i className="fa-solid fa-stopwatch text-xs text-rose-300"></i>
              <span>Exame (40 Q)</span>
            </Link>

            <Link
              to="/historico"
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                location.pathname.startsWith('/historico')
                  ? 'bg-white text-[#35495E] shadow-sm'
                  : 'hover:bg-white/10 text-slate-200'
              }`}
            >
              <i className="fa-solid fa-chart-line text-xs"></i>
              <span>{t('historico')}</span>
            </Link>
          </nav>

          {/* Lado Direito: Ficha do Candidato + Seletor de Idioma */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Bloco de Dados do Candidato */}
            <button
              type="button"
              onClick={() => setModalAberto(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white transition border border-white/20 shadow-sm cursor-pointer text-left"
              title={candidato.nome ? `Candidato: ${candidato.nome}` : 'Identificar Candidato'}
              aria-label="Dados do Candidato"
            >
              {/* Avatar com Iniciais ou Ícone */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EFBAAE] to-amber-200 text-[#35495E] flex items-center justify-center text-xs font-black shrink-0 shadow-inner">
                {iniciais ? iniciais : <i className="fa-solid fa-user text-xs"></i>}
              </div>

              {/* Informações Textuais do Candidato */}
              <div className="hidden sm:flex flex-col min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-tight truncate max-w-[130px] text-white">
                    {candidato.nome ? primeiroNome : t('convidado')}
                  </span>
                  {candidato.categoria && (
                    <span className="text-[9px] font-bold bg-[#EFBAAE] text-[#35495E] px-1 rounded uppercase">
                      Cat. {candidato.categoria}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-300 font-semibold truncate max-w-[140px]">
                  {candidato.numero ? (
                    <span>Nº {candidato.numero}</span>
                  ) : (
                    <span className="text-[#EFBAAE] font-bold flex items-center gap-1">
                      <i className="fa-solid fa-pen text-[8px]"></i>
                      Identificar-se
                    </span>
                  )}
                </div>
              </div>

              {/* Em Mobile muito pequeno mostra apenas pill compacta */}
              <div className="sm:hidden flex flex-col">
                <span className="text-[11px] font-black truncate max-w-[70px]">
                  {primeiroNome || 'Perfil'}
                </span>
                <span className="text-[9px] text-[#EFBAAE] font-bold">
                  {candidato.numero ? `Nº ${candidato.numero}` : 'Inserir'}
                </span>
              </div>
            </button>

            {/* Seletor de Idioma [PT | EN | CH] */}
            <SeletorIdioma />
          </div>

        </div>
      </header>

      {/* Modal de Identificação do Candidato */}
      <ModalIdentificacao
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        onSalvo={atualizarCandidato}
      />
    </>
  );
};
