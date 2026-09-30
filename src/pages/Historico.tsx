import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIdioma } from '../hooks/useIdioma';
import {
  calcularEstatisticas,
  limparHistorico,
  obterHistorico,
} from '../utils/storage';
import { EstatisticasGerais, TentativaExame } from '../types';

export const Historico: React.FC = () => {
  const { t } = useIdioma();
  const [historico, setHistorico] = useState<TentativaExame[]>([]);
  const [estatisticas, setEstatisticas] = useState<EstatisticasGerais>({
    totalTentativas: 0,
    totalAprovados: 0,
    taxaAprovacao: 0,
    melhorNota: 0,
    mediaNota: 0,
    totalExames: 0,
    totalTreinos: 0,
  });
  const [modalLimpar, setModalLimpar] = useState(false);

  const carregarDados = () => {
    const lista = obterHistorico();
    setHistorico(lista);
    setEstatisticas(calcularEstatisticas(lista));
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleConfirmarLimpeza = () => {
    limparHistorico();
    setModalLimpar(false);
    carregarDados();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Cabeçalho da Página */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            {t('historico')}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Registo de todas as tuas simulações de exame e treinos guardados no teu navegador.
          </p>
        </div>

        {historico.length > 0 && (
          <button
            type="button"
            onClick={() => setModalLimpar(true)}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-xl text-xs sm:text-sm border border-rose-200 transition active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-trash-can"></i>
            <span>{t('limparHistorico')}</span>
          </button>
        )}
      </div>

      {/* Cartões Estatísticos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#35495E]/10 text-[#35495E] flex items-center justify-center text-lg mb-3">
            <i className="fa-solid fa-clipboard-check"></i>
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {t('totalTentativas')}
          </div>
          <div className="text-2xl font-black font-display text-slate-900 mt-1">
            {estatisticas.totalTentativas}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg mb-3">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {t('taxaAprovacao')}
          </div>
          <div className="text-2xl font-black font-display text-emerald-600 mt-1">
            {estatisticas.taxaAprovacao}%
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg mb-3">
            <i className="fa-solid fa-star"></i>
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {t('melhorNota')}
          </div>
          <div className="text-2xl font-black font-display text-amber-600 mt-1">
            {estatisticas.melhorNota} <span className="text-xs text-slate-400">/40</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg mb-3">
            <i className="fa-solid fa-calculator"></i>
          </div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            {t('mediaGeral')}
          </div>
          <div className="text-2xl font-black font-display text-slate-800 mt-1">
            {estatisticas.mediaNota} <span className="text-xs text-slate-400">/40</span>
          </div>
        </div>
      </div>

      {/* Lista de Tentativas */}
      {historico.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-16 h-16 mx-auto bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center text-3xl">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <p className="text-sm text-slate-600 max-w-sm mx-auto font-medium">
            {t('semHistorico')}
          </p>
          <div className="pt-2">
            <Link
              to="/exame"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#35495E] hover:bg-[#2c3d4f] text-white font-bold text-sm rounded-xl shadow transition"
            >
              <i className="fa-solid fa-play text-xs"></i>
              <span>{t('iniciarExame')}</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 font-bold text-sm text-slate-700 flex items-center justify-between">
            <span>Sessões Registadas</span>
            <span className="text-xs text-slate-400 font-normal">
              {historico.length} tentativa(s)
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {historico.map((item) => {
              const minutos = Math.floor(item.tempoGastoSegundos / 60);
              const segundos = item.tempoGastoSegundos % 60;
              const tempoFormatado = `${minutos}m ${segundos}s`;

              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                        item.aprovado
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {item.aprovado ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        <i className="fa-solid fa-xmark"></i>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-black uppercase px-2 py-0.5 rounded-md ${
                            item.aprovado
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {item.aprovado ? t('aprovado') : t('reprovado')}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {item.tipo === 'treino' ? 'Treino' : 'Exame Oficial'}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-slate-800">
                        {item.candidato.nome ? item.candidato.nome : t('convidado')}
                        {item.candidato.numero && (
                          <span className="text-xs font-normal text-slate-400 ml-1.5">
                            ({item.candidato.numero})
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 flex items-center gap-3">
                        <span>
                          <i className="fa-regular fa-calendar mr-1"></i>
                          {item.data}
                        </span>
                        {item.tempoGastoSegundos > 0 && (
                          <span>
                            <i className="fa-regular fa-clock mr-1"></i>
                            {tempoFormatado}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <div className="text-lg font-black font-display text-slate-900">
                        {item.pontuacao}{' '}
                        <span className="text-xs text-slate-400 font-bold">/{item.total}</span>
                      </div>
                      <div
                        className={`text-xs font-bold ${
                          item.aprovado ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {item.percentagem}%
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/revisao/${item.id}`}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                        title={t('verRevisao')}
                      >
                        <i className="fa-solid fa-list-check mr-1.5"></i>
                        {t('verRevisao')}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal de Confirmação para Limpar Histórico */}
      {modalLimpar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 mx-auto bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-3xl">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 className="text-xl font-bold font-display text-slate-900">
              {t('limparHistorico')}?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('confirmarLimpeza')}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalLimpar(false)}
                className="py-3 px-4 rounded-xl border border-slate-200 font-bold text-sm text-slate-700 hover:bg-slate-100 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarLimpeza}
                className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition shadow-md"
              >
                Sim, apagar tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
