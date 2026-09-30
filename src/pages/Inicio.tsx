import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIdioma } from '../hooks/useIdioma';
import { ModalIdentificacao } from '../components/ModalIdentificacao';
import {
  calcularEstatisticas,
  obterCandidato,
  obterHistorico,
} from '../utils/storage';
import { EstatisticasGerais, PerfilCandidato } from '../types';

export const Inicio: React.FC = () => {
  const { t } = useIdioma();
  const [modalIdentificacao, setModalIdentificacao] = useState(false);
  const [candidato, setCandidato] = useState<PerfilCandidato>(() => obterCandidato());
  const [estatisticas, setEstatisticas] = useState<EstatisticasGerais>(() =>
    calcularEstatisticas(obterHistorico())
  );

  const carregarDadosLocais = () => {
    setCandidato(obterCandidato());
    setEstatisticas(calcularEstatisticas(obterHistorico()));
  };

  useEffect(() => {
    carregarDadosLocais();
  }, [modalIdentificacao]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 sm:pb-8 animate-in fade-in duration-300">
      {/* Hero Oficial INATRO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#35495E] via-[#2a3b4c] to-[#1e2a38] text-white rounded-3xl p-5 sm:p-10 shadow-xl border border-white/10">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#EFBAAE]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3.5">
          {/* Ficha de identificação do candidato com botão rápido de editar */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#EFBAAE]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {candidato.nome ? `Candidato: ${candidato.nome}` : t('convidado')}
              {candidato.numero && ` • N.º ${candidato.numero}`}
              {candidato.categoria && ` (Cat. ${candidato.categoria})`}
            </span>
            <button
              onClick={() => setModalIdentificacao(true)}
              className="ml-1 text-[11px] underline text-slate-300 hover:text-white"
            >
              (Editar)
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight leading-tight">
            {t('nomeApp')}
          </h1>

          <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
            {t('subtituloApp')} • Estuda pelas aulas didáticas, treina por temas com correção instantânea e simula o exame oficial com cronómetro de 30 minutos.
          </p>

          {/* Botões de Ação Imediata */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              to="/aulas"
              className="px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-lg transition transform active:scale-95 flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <i className="fa-solid fa-book-open"></i>
              <span>{t('aulasTeoricas')}</span>
            </Link>

            <Link
              to="/exame"
              className="px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-[#EFBAAE] to-amber-200 hover:from-[#e8a99b] hover:to-amber-300 text-[#35495E] font-extrabold rounded-2xl shadow-lg transition transform active:scale-95 flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <i className="fa-solid fa-play text-xs"></i>
              <span>{t('iniciarExame')}</span>
            </Link>

            <Link
              to="/treino"
              className="px-4 py-3 sm:px-5 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition active:scale-95 flex items-center gap-1.5 text-xs sm:text-sm"
            >
              <i className="fa-solid fa-graduation-cap"></i>
              <span>{t('modoTreino')}</span>
            </Link>
          </div>
        </div>

        {/* Resumo rápido se já fez testes */}
        {estatisticas.totalTentativas > 0 && (
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium">{t('totalTentativas')}</div>
              <div className="text-lg sm:text-2xl font-bold font-display text-white mt-0.5">
                {estatisticas.totalTentativas}
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium">{t('taxaAprovacao')}</div>
              <div className="text-lg sm:text-2xl font-bold font-display text-emerald-400 mt-0.5">
                {estatisticas.taxaAprovacao}%
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium">{t('melhorNota')}</div>
              <div className="text-lg sm:text-2xl font-bold font-display text-amber-300 mt-0.5">
                {estatisticas.melhorNota}/40
              </div>
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-medium">{t('mediaGeral')}</div>
              <div className="text-lg sm:text-2xl font-bold font-display text-slate-200 mt-0.5">
                {estatisticas.mediaNota}/40
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Cartões Principais de Navegação */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Cartão Novo: Aulas Teóricas Didáticas */}
        <Link
          to="/aulas"
          className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {t('aulasTeoricas')}
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  Didático
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                {t('descAulasTeoricas')}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-bold text-indigo-700">
            <span>Abrir Manual de Estudo</span>
            <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </div>
        </Link>

        {/* Cartão: Iniciar Exame Oficial */}
        <Link
          to="/exame"
          className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#35495E]/40 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#35495E] text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-stopwatch"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-[#35495E] transition-colors">
                  {t('iniciarExame')}
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  30 min
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                {t('descIniciarExame')}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#35495E]">
            <span>Começar Simulação</span>
            <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </div>
        </Link>

        {/* Cartão: Modo Treino */}
        <Link
          to="/treino"
          className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-book-open-reader"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {t('modoTreino')}
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Sem Pressa
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                {t('descModoTreino')}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-bold text-emerald-700">
            <span>Treinar Agora</span>
            <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </div>
        </Link>

        {/* Cartão: Histórico */}
        <Link
          to="/historico"
          className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-amber-700 transition-colors">
                  {t('historico')}
                </h2>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                {t('descHistorico')}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-700">
            <span>Ver Estatísticas</span>
            <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </div>
        </Link>

        {/* Cartão: Identificar-me */}
        <button
          type="button"
          onClick={() => setModalIdentificacao(true)}
          className="text-left group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#664321]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#664321] text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-user-pen"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-[#664321] transition-colors">
                  {candidato.nome ? t('editarIdentificacao') : t('identificar')}
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Opcional
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                {candidato.nome
                  ? `Registado como ${candidato.nome}${candidato.numero ? ` (N.º ${candidato.numero})` : ''}. Clica para alterar.`
                  : t('notaOpcional')}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs font-bold text-[#664321]">
            <span>{candidato.nome ? 'Alterar Dados' : 'Inserir Nome'}</span>
            <i className="fa-solid fa-pen-to-square"></i>
          </div>
        </button>
      </section>

      {/* Modal de Identificação Opcional */}
      <ModalIdentificacao
        aberto={modalIdentificacao}
        onFechar={() => setModalIdentificacao(false)}
        onSalvo={carregarDadosLocais}
      />
    </div>
  );
};
