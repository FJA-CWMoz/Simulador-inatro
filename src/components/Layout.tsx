import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Cabecalho } from './Cabecalho';
import { useIdioma } from '../hooks/useIdioma';

export const Layout: React.FC = () => {
  const { t } = useIdioma();
  const location = useLocation();

  // No modo exame ativo, ocultamos a barra de abas inferior padrão para dar lugar aos botões de navegação de perguntas
  const ehTelaExame = location.pathname.startsWith('/exame');

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9] text-[#1e293b]">
      {/* Cabeçalho Sticky com logo, candidato e seletor de idioma */}
      <Cabecalho />

      {/* Conteúdo Principal com padding inferior para navegação móvel */}
      <main className={`flex-1 w-full max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 ${ehTelaExame ? 'pb-24 sm:pb-8' : 'pb-20 sm:pb-8'}`}>
        <Outlet />
      </main>

      {/* Barra de Navegação Inferior Mobile-First (Tabs nativos para smartphone) */}
      {!ehTelaExame && (
        <nav
          className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 px-1.5"
          aria-label="Navegação móvel"
        >
          <div className="grid grid-cols-5 gap-0.5 text-center">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] font-bold transition ${
                  isActive
                    ? 'text-[#35495E] bg-[#35495E]/10 font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              <i className="fa-solid fa-house text-sm mb-0.5"></i>
              <span>Início</span>
            </NavLink>

            <NavLink
              to="/aulas"
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] font-bold transition ${
                  isActive
                    ? 'text-indigo-700 bg-indigo-50 font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              <i className="fa-solid fa-book-open text-sm mb-0.5 text-indigo-600"></i>
              <span>Aulas</span>
            </NavLink>

            <NavLink
              to="/exame"
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] font-bold transition ${
                  isActive
                    ? 'text-rose-700 bg-rose-50 font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              <i className="fa-solid fa-stopwatch text-sm mb-0.5 text-rose-600"></i>
              <span>Exame</span>
            </NavLink>

            <NavLink
              to="/treino"
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] font-bold transition ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50 font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              <i className="fa-solid fa-graduation-cap text-sm mb-0.5 text-emerald-600"></i>
              <span>Treino</span>
            </NavLink>

            <NavLink
              to="/historico"
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-0.5 rounded-xl text-[9px] font-bold transition ${
                  isActive
                    ? 'text-amber-700 bg-amber-50 font-extrabold'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              <i className="fa-solid fa-chart-line text-sm mb-0.5 text-amber-600"></i>
              <span>Histórico</span>
            </NavLink>
          </div>
        </nav>
      )}

      {/* Rodapé Oficial INATRO */}
      <footer className="bg-slate-800 text-slate-400 border-t border-slate-700/60 py-6 text-xs mt-auto hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-bold text-slate-200 flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t('nomeApp')}</span>
            </div>
            <p className="text-[11px] text-slate-400">
              {t('subtituloApp')} • Regulamento do Código de Estrada
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-700/60 text-emerald-400 text-[11px] font-medium border border-slate-600/50">
              <i className="fa-solid fa-cloud-arrow-down text-xs"></i>
              <span>{t('modoOffline')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
