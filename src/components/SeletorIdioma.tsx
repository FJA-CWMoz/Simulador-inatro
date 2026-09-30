import React, { useState, useRef, useEffect } from 'react';
import { useIdioma } from '../hooks/useIdioma';
import { IdiomaCodigo } from '../types';

export const SeletorIdioma: React.FC = () => {
  const { idioma, setIdioma } = useIdioma();
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const opcoes: { codigo: IdiomaCodigo; label: string; bandeira: string; nome: string; nativo: string }[] = [
    { codigo: 'pt', label: 'PT', bandeira: '🇲🇿', nome: 'Português', nativo: 'Português' },
    { codigo: 'en', label: 'EN', bandeira: '🇬🇧', nome: 'English', nativo: 'English' },
    { codigo: 'ch', label: 'CH', bandeira: '🇲🇿', nome: 'Changana', nativo: 'Xichangana' },
  ];

  const opcaoAtiva = opcoes.find((o) => o.codigo === idioma) || opcoes[0];

  // Fecha o menu ao clicar fora do componente
  useEffect(() => {
    const handleClickFora = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setAberto(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAberto(false);
      }
    };

    if (aberto) {
      document.addEventListener('mousedown', handleClickFora);
      document.addEventListener('touchstart', handleClickFora);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickFora);
      document.removeEventListener('touchstart', handleClickFora);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [aberto]);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Botão Expansivo Compacto que poupa espaço */}
      <button
        type="button"
        onClick={() => setAberto((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={aberto}
        aria-label={`Idioma atual: ${opcaoAtiva.nome}. Clicar para alterar idioma.`}
        title={`Idioma: ${opcaoAtiva.nome}`}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer border shadow-sm ${
          aberto
            ? 'bg-white/25 text-white border-white/30 ring-2 ring-white/20'
            : 'bg-white/10 hover:bg-white/20 text-slate-100 border-white/15'
        }`}
      >
        <span className="text-sm leading-none drop-shadow-sm">{opcaoAtiva.bandeira}</span>
        <span className="font-extrabold tracking-wider">{opcaoAtiva.label}</span>
        <i
          className={`fa-solid fa-chevron-down text-[10px] text-slate-300 transition-transform duration-200 ${
            aberto ? 'rotate-180 text-white' : ''
          }`}
        ></i>
      </button>

      {/* Menu Suspenso Expansivo (Dropdown Popover) */}
      {aberto && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-48 bg-[#243342] text-white rounded-2xl border border-white/20 shadow-2xl p-1.5 z-50 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 origin-top-right focus:outline-none"
        >
          <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-white/10 mb-1 flex items-center justify-between">
            <span>Selecione o Idioma</span>
            <i className="fa-solid fa-language text-xs text-[#EFBAAE]"></i>
          </div>

          <div className="space-y-0.5">
            {opcoes.map((opcao) => {
              const selecionado = opcao.codigo === idioma;
              return (
                <button
                  key={opcao.codigo}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIdioma(opcao.codigo);
                    setAberto(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer text-left ${
                    selecionado
                      ? 'bg-[#EFBAAE] text-[#35495E] shadow-sm'
                      : 'hover:bg-white/10 text-slate-200 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{opcao.bandeira}</span>
                    <div className="flex flex-col leading-tight">
                      <span className="font-bold">{opcao.nome}</span>
                      <span
                        className={`text-[10px] ${
                          selecionado ? 'text-[#35495E]/80 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        {opcao.nativo}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                        selecionado
                          ? 'bg-[#35495E] text-white'
                          : 'bg-black/20 text-slate-300'
                      }`}
                    >
                      {opcao.label}
                    </span>
                    {selecionado && (
                      <i className="fa-solid fa-check text-xs text-[#35495E]"></i>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
