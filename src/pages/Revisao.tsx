import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIdioma } from '../hooks/useIdioma';
import { obterHistorico } from '../utils/storage';
import { Pergunta as PerguntaComponent } from '../components/Pergunta';
import { TentativaExame } from '../types';

type FiltroTipo = 'todas' | 'erradas' | 'certas';

export const Revisao: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useIdioma();
  const [tentativa, setTentativa] = useState<TentativaExame | null>(null);
  const [filtro, setFiltro] = useState<FiltroTipo>('todas');

  useEffect(() => {
    const historico = obterHistorico();
    const encontrada = id ? historico.find((h) => h.id === id) : historico[0];
    if (encontrada) {
      setTentativa(encontrada);
    }
  }, [id]);

  if (!tentativa) {
    return (
      <div className="text-center py-16 space-y-4">
        <i className="fa-solid fa-file-circle-question text-5xl text-slate-300"></i>
        <h2 className="text-xl font-bold text-slate-700">Exame não encontrado</h2>
        <Link to="/" className="inline-block px-5 py-2.5 bg-[#35495E] text-white rounded-xl font-bold text-sm">
          {t('voltarInicio')}
        </Link>
      </div>
    );
  }

  const { questoes, respostas, pontuacao, total, aprovado } = tentativa;

  // Filtrar questões
  const questoesFiltradas = questoes
    .map((q, idx) => ({ questao: q, indiceOriginal: idx }))
    .filter(({ questao, indiceOriginal }) => {
      const respEscolhida = respostas[indiceOriginal];
      const acertou = respEscolhida !== undefined && respEscolhida === questao.correta;
      if (filtro === 'certas') return acertou;
      if (filtro === 'erradas') return !acertou;
      return true;
    });

  const totalCertas = pontuacao;
  const totalErradas = total - pontuacao;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Cabeçalho da Revisão */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                aprovado ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {aprovado ? t('aprovado') : t('reprovado')}
            </span>
            <span className="text-xs text-slate-400 font-semibold">• {tentativa.data}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-1">
            {t('revisaoExame')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Classificação final: <strong className="text-slate-800">{pontuacao}/{total}</strong> ({tentativa.percentagem}%)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/resultado/${tentativa.id}`}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs sm:text-sm transition"
          >
            <i className="fa-solid fa-square-poll-vertical mr-1.5"></i>
            {t('resultado')}
          </Link>
          <Link
            to="/exame"
            className="px-4 py-2.5 bg-[#35495E] hover:bg-[#2c3d4f] text-white font-bold rounded-xl text-xs sm:text-sm transition shadow-sm"
          >
            <i className="fa-solid fa-rotate-right mr-1.5"></i>
            {t('repetirExame')}
          </Link>
        </div>
      </div>

      {/* Barra de Filtros (Todas / Erradas / Certas) */}
      <div className="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-2xl max-w-md">
        <button
          type="button"
          onClick={() => setFiltro('todas')}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition ${
            filtro === 'todas'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t('todas')} ({total})
        </button>

        <button
          type="button"
          onClick={() => setFiltro('erradas')}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            filtro === 'erradas'
              ? 'bg-white text-rose-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>{t('apenasErradas')}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 text-[10px]">
            {totalErradas}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFiltro('certas')}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            filtro === 'certas'
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>{t('apenasCertas')}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 text-[10px]">
            {totalCertas}
          </span>
        </button>
      </div>

      {/* Lista das Questões com Correção Completa */}
      {questoesFiltradas.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
          <i className="fa-solid fa-check-double text-4xl text-emerald-500 mb-3"></i>
          <p className="font-bold">Nenhuma questão nesta categoria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {questoesFiltradas.map(({ questao, indiceOriginal }) => (
            <PerguntaComponent
              key={questao.id}
              pergunta={questao}
              numero={indiceOriginal + 1}
              total={total}
              respostaSelecionada={respostas[indiceOriginal]}
              mostrarFeedback={true}
              desabilitarOpcoes={true}
              onSelecionarOpcao={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
};
