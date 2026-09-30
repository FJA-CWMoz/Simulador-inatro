import React from 'react';
import { useIdioma } from '../hooks/useIdioma';

interface TemporizadorProps {
  tempoRestanteSegundos: number;
  duracaoTotalSegundos?: number;
  tempoAlerta?: boolean;
  className?: string;
  formato?: 'compacto' | 'completo';
}

export const Temporizador: React.FC<TemporizadorProps> = ({
  tempoRestanteSegundos,
  duracaoTotalSegundos = 1800,
  tempoAlerta = false,
  className = '',
  formato = 'completo',
}) => {
  const { t } = useIdioma();

  const minutos = Math.floor(Math.max(0, tempoRestanteSegundos) / 60);
  const segundos = Math.max(0, tempoRestanteSegundos) % 60;
  const minutosFormatados = String(minutos).padStart(2, '0');
  const segundosFormatados = String(segundos).padStart(2, '0');

  // Percentagem do tempo decorrido para a barra de progresso do timer
  const percentagemRestante = Math.max(
    0,
    Math.min(100, (tempoRestanteSegundos / duracaoTotalSegundos) * 100)
  );

  if (formato === 'compacto') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-sm shadow-sm transition-all duration-300 ${
          tempoAlerta
            ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400'
            : 'bg-[#35495E] text-white'
        } ${className}`}
        role="timer"
        aria-live="polite"
      >
        <i className={`fa-regular fa-clock text-xs ${tempoAlerta ? 'animate-spin' : ''}`}></i>
        <span className="tracking-wider">
          {minutosFormatados}:{segundosFormatados}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 p-3 sm:p-4 ${
        tempoAlerta
          ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white border-rose-500 shadow-lg shadow-rose-600/20 ring-2 ring-rose-400 animate-pulse'
          : 'bg-[#35495E] text-white border-slate-700 shadow-md'
      } ${className}`}
      role="timer"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${
              tempoAlerta ? 'bg-white/20 text-white' : 'bg-[#EFBAAE]/20 text-[#EFBAAE]'
            }`}
          >
            <i className="fa-solid fa-stopwatch text-base"></i>
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300">
              {t('tempoRestante')}
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black tracking-wider leading-none mt-0.5">
              <span>{minutosFormatados}</span>
              <span className="animate-pulse">:</span>
              <span>{segundosFormatados}</span>
            </div>
          </div>
        </div>

        {tempoAlerta && (
          <div className="text-right">
            <span className="inline-block text-[10px] font-extrabold bg-white text-rose-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Atenção!
            </span>
            <div className="text-[10px] text-white/90 font-medium mt-0.5">
              Menos de 5 min
            </div>
          </div>
        )}
      </div>

      {/* Barra de Progresso do Tempo Restante */}
      <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden mt-3">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            tempoAlerta ? 'bg-amber-300' : 'bg-[#EFBAAE]'
          }`}
          style={{ width: `${percentagemRestante}%` }}
        ></div>
      </div>
    </div>
  );
};
