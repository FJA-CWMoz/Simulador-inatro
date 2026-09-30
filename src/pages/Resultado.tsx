import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useIdioma } from '../hooks/useIdioma';
import { obterHistorico } from '../utils/storage';
import { TentativaExame } from '../types';

export const Resultado: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useIdioma();
  const [tentativa, setTentativa] = useState<TentativaExame | null>(null);

  useEffect(() => {
    const historico = obterHistorico();
    const encontrada = id ? historico.find((h) => h.id === id) : historico[0];
    if (encontrada) {
      setTentativa(encontrada);
      if (encontrada.aprovado) {
        // Dispara efeito festivo de confetes
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#16a34a', '#EFBAAE', '#35495E', '#facc15'],
          });
        } catch (e) {
          // ignora caso bloqueado
        }
      }
    } else {
      // Se não encontrou, volta ao início
      navigate('/');
    }
  }, [id, navigate]);

  if (!tentativa) {
    return null;
  }

  const {
    candidato,
    pontuacao,
    total,
    percentagem,
    aprovado,
    tempoGastoSegundos,
  } = tentativa;

  const minutos = Math.floor(tempoGastoSegundos / 60);
  const segundos = tempoGastoSegundos % 60;
  const tempoTexto = `${minutos}m ${segundos}s`;
  const erradas = total - pontuacao;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Cartão de Resultado Principal */}
      <div
        className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center border shadow-xl ${
          aprovado
            ? 'bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 border-emerald-300'
            : 'bg-gradient-to-b from-rose-50 via-white to-rose-50/40 border-rose-300'
        }`}
      >
        {/* Ícone de Sucesso ou Reprovação */}
        <div
          className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl shadow-lg ${
            aprovado
              ? 'bg-emerald-600 text-white shadow-emerald-500/20'
              : 'bg-rose-600 text-white shadow-rose-500/20'
          }`}
        >
          {aprovado ? (
            <i className="fa-solid fa-trophy"></i>
          ) : (
            <i className="fa-solid fa-triangle-exclamation"></i>
          )}
        </div>

        {/* Estado Oficial Aprovado / Reprovado */}
        <div className="space-y-2">
          <div
            className={`text-xs font-black tracking-widest uppercase ${
              aprovado ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {t('resultado')} • INATRO
          </div>

          <h1
            className={`text-3xl sm:text-5xl font-black font-display tracking-tight ${
              aprovado ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {aprovado ? t('aprovado') : t('reprovado')}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-medium">
            {aprovado ? t('parabens') : t('precisaPraticar')}
          </p>
        </div>

        {/* Ficha do Candidato */}
        <div className="mt-8 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm max-w-md mx-auto text-left space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Candidato
              </div>
              <div className="text-sm font-bold text-slate-800">
                {candidato.nome ? candidato.nome : t('convidado')}
              </div>
            </div>
            {candidato.numero && (
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  N.º Registo
                </div>
                <div className="text-sm font-bold text-slate-800 font-mono">
                  {candidato.numero}
                </div>
              </div>
            )}
          </div>
          {(candidato.categoria || candidato.escola) && (
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              {candidato.categoria && <span>Categoria: <strong className="text-slate-800 font-bold">Cat. {candidato.categoria}</strong></span>}
              {candidato.escola && <span className="truncate max-w-[200px]">Escola: <strong className="text-slate-800 font-bold">{candidato.escola}</strong></span>}
            </div>
          )}
        </div>

        {/* Nota Numérica e Percentagem */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">{t('notaFinal')}</div>
            <div className="text-2xl font-black font-display text-slate-900 mt-1">
              {pontuacao} <span className="text-sm font-bold text-slate-400">/{total}</span>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">Percentagem</div>
            <div
              className={`text-2xl font-black font-display mt-1 ${
                aprovado ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {percentagem}%
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">{t('erradas')}</div>
            <div className="text-2xl font-black font-display text-rose-600 mt-1">
              {erradas}
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">{t('tempoGasto')}</div>
            <div className="text-2xl font-black font-display text-slate-700 mt-1">
              {tempoTexto}
            </div>
          </div>
        </div>

        {/* Nota regulamentar */}
        <div className="mt-6 text-xs text-slate-500 font-medium">
          {t('regraDistribuicao')}
        </div>
      </div>

      {/* Botões de Ação Obrigatórios */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
        <Link
          to={`/revisao/${tentativa.id}`}
          className="w-full sm:w-auto px-6 py-4 bg-[#35495E] hover:bg-[#2c3d4f] text-white font-bold rounded-2xl shadow-md transition active:scale-95 flex items-center justify-center gap-2.5 text-sm cursor-pointer"
        >
          <i className="fa-solid fa-list-check"></i>
          <span>{t('verRevisao')}</span>
        </Link>

        <Link
          to="/exame"
          className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200 shadow-sm transition active:scale-95 flex items-center justify-center gap-2.5 text-sm cursor-pointer"
        >
          <i className="fa-solid fa-rotate-right"></i>
          <span>{t('repetirExame')}</span>
        </Link>

        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition active:scale-95 flex items-center justify-center gap-2.5 text-sm cursor-pointer"
        >
          <i className="fa-solid fa-house"></i>
          <span>{t('voltarInicio')}</span>
        </Link>
      </div>
    </div>
  );
};
