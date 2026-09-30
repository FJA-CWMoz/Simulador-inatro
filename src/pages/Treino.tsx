import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIdioma } from '../hooks/useIdioma';
import { Pergunta as PerguntaComponent } from '../components/Pergunta';
import { carregarManifest, gerarQuestoesTreino } from '../utils/dados';
import { Pergunta, ManifestData } from '../types';

export const Treino: React.FC = () => {
  const { t } = useIdioma();
  const [searchParams] = useSearchParams();
  const paramSubtema = searchParams.get('subtema');
  const [manifest, setManifest] = useState<ManifestData | null>(null);
  const [subtemaSelecionado, setSubtemaSelecionado] = useState<string>(paramSubtema || 'todos');
  const [questoes, setQuestoes] = useState<Pergunta[]>([]);
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [carregando, setCarregando] = useState<boolean>(true);
  const [gavetaQuestoesAberta, setGavetaQuestoesAberta] = useState(false);

  useEffect(() => {
    const p = searchParams.get('subtema');
    if (p) {
      setSubtemaSelecionado(p);
    }
  }, [searchParams]);

  // Carrega o manifest para preencher os filtros de subtemas
  useEffect(() => {
    carregarManifest()
      .then((m) => setManifest(m))
      .catch((e) => console.error('Erro ao carregar manifest', e));
  }, []);

  // Carrega as questões do modo treino baseado no filtro
  const carregarQuestoesTreino = useCallback(async (subtema: string) => {
    try {
      setCarregando(true);
      const lista = await gerarQuestoesTreino(subtema);
      setQuestoes(lista);
      setIndiceAtual(0);
      setRespostas({});
      setCarregando(false);
    } catch (e) {
      console.error('Erro ao carregar questões de treino', e);
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarQuestoesTreino(subtemaSelecionado);
  }, [subtemaSelecionado, carregarQuestoesTreino]);

  const perguntaAtual = questoes[indiceAtual];
  const respostaAtual = respostas[indiceAtual];
  const respondeuAtual = respostaAtual !== undefined;

  const handleSelecionarOpcao = (indiceOpcao: number) => {
    if (respondeuAtual) return; // Fixa a resposta para manter a explicação
    setRespostas((prev) => ({
      ...prev,
      [indiceAtual]: indiceOpcao,
    }));
  };

  const proximaPergunta = () => {
    if (indiceAtual < questoes.length - 1) {
      setIndiceAtual((prev) => prev + 1);
    }
  };

  const perguntaAnterior = () => {
    if (indiceAtual > 0) {
      setIndiceAtual((prev) => prev - 1);
    }
  };

  // Contagem de acertos no treino
  const acertos = Object.entries(respostas).filter(
    ([idx, opcao]) => questoes[Number(idx)]?.correta === opcao
  ).length;
  const totalRespondidas = Object.keys(respostas).length;

  return (
    <div className="space-y-4 pb-28 sm:pb-8 animate-in fade-in duration-200">
      {/* Barra de Filtro e Modos de Treino */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-1">
              <i className="fa-solid fa-graduation-cap"></i>
              <span>{t('modoTreino')} • Sem Pressão de Tempo</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold font-display text-slate-900 leading-tight">
              Treino com Correção Imediata
            </h1>
            <p className="text-xs text-slate-500">
              Clica na tua opção para veres de imediato a resposta certa e a fundamentação jurídica.
            </p>
          </div>

          {/* Placar de Treino */}
          {totalRespondidas > 0 && (
            <div className="flex items-center justify-around sm:justify-start gap-2 bg-slate-50 p-2 sm:p-2.5 rounded-2xl border border-slate-200 shrink-0">
              <div className="text-center px-3 border-r border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Certas</div>
                <div className="text-base sm:text-lg font-black font-display text-emerald-600">{acertos}</div>
              </div>
              <div className="text-center px-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Respondidas</div>
                <div className="text-base sm:text-lg font-black font-display text-slate-800">
                  {totalRespondidas}/{questoes.length}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Seletor de Subtemas */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <label htmlFor="filtro-subtema" className="text-xs font-bold text-slate-600 uppercase tracking-wider shrink-0">
            {t('treinoFiltroTema')}:
          </label>
          <select
            id="filtro-subtema"
            value={subtemaSelecionado}
            onChange={(e) => setSubtemaSelecionado(e.target.value)}
            className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="todos">{t('todosOsTemas')}</option>
            {manifest?.categorias.map((cat) => (
              <optgroup key={cat.id} label={t(cat.nome)}>
                {cat.subtemas.map((sub) => (
                  <option key={sub.id} value={`${cat.id}/${sub.id}`}>
                    {t(cat.nome)} &gt; {t(sub.nome)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <button
            type="button"
            onClick={() => carregarQuestoesTreino(subtemaSelecionado)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition active:scale-95 shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
            title="Reiniciar perguntas deste subtema"
          >
            <i className="fa-solid fa-arrows-rotate"></i>
            <span>Baralhar</span>
          </button>
        </div>
      </div>

      {carregando ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin"></div>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">A carregar perguntas de treino...</p>
        </div>
      ) : !perguntaAtual ? (
        <div className="bg-white p-8 rounded-3xl text-center text-slate-500 border border-slate-200">
          Nenhuma pergunta encontrada para este tema.
        </div>
      ) : (
        <>
          {/* Pergunta do Treino */}
          <PerguntaComponent
            pergunta={perguntaAtual}
            numero={indiceAtual + 1}
            total={questoes.length}
            respostaSelecionada={respostaAtual}
            mostrarFeedback={respondeuAtual}
            desabilitarOpcoes={respondeuAtual}
            onSelecionarOpcao={handleSelecionarOpcao}
          />

          {/* DOCK FIXO MOBILE DE NAVEGAÇÃO DE TREINO */}
          <div className="fixed bottom-14 sm:bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 shadow-lg sm:static sm:bg-transparent sm:border-0 sm:p-0 sm:shadow-none sm:z-auto">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={perguntaAnterior}
                disabled={indiceAtual === 0}
                className="flex-1 sm:flex-none min-h-[46px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs sm:text-sm transition active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-xs"></i>
                <span>{t('anterior')}</span>
              </button>

              <button
                type="button"
                onClick={() => setGavetaQuestoesAberta(true)}
                className="sm:hidden px-3 py-2.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-black min-h-[46px] flex items-center justify-center gap-1 active:scale-95"
              >
                <span>{indiceAtual + 1}/{questoes.length}</span>
                <i className="fa-solid fa-chevron-up text-[10px] text-slate-400"></i>
              </button>

              {indiceAtual < questoes.length - 1 ? (
                <button
                  type="button"
                  onClick={proximaPergunta}
                  className="flex-1 sm:flex-none min-h-[46px] px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t('proxima')}</span>
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => carregarQuestoesTreino(subtemaSelecionado)}
                  className="flex-1 sm:flex-none min-h-[46px] px-6 py-2.5 bg-[#35495E] hover:bg-[#2c3d4f] text-white font-bold rounded-2xl text-xs sm:text-sm transition active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-right text-xs"></i>
                  <span>Reiniciar</span>
                </button>
              )}
            </div>
          </div>

          {/* Mini-mapa de navegação rápida (Desktop e Gaveta) */}
          <div className="hidden sm:block bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Questões deste Tema</span>
              <span className="text-slate-400 font-normal">
                {indiceAtual + 1} de {questoes.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {questoes.map((q, idx) => {
                const resp = respostas[idx];
                const respondeu = resp !== undefined;
                const acertou = respondeu && resp === q.correta;
                const ehAtual = idx === indiceAtual;

                let classes =
                  'w-9 h-9 rounded-xl text-xs font-bold flex items-center justify-center transition cursor-pointer active:scale-90 ';
                if (ehAtual) {
                  classes += 'ring-2 ring-[#35495E] ring-offset-2 ';
                }

                if (respondeu) {
                  classes += acertou
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-rose-600 text-white shadow-sm';
                } else {
                  classes += 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setIndiceAtual(idx)}
                    className={classes}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gaveta Mobile para saltar perguntas no treino */}
          {gavetaQuestoesAberta && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-150">
              <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Navegar Perguntas de Treino
                  </h3>
                  <button
                    type="button"
                    onClick={() => setGavetaQuestoesAberta(false)}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2 py-1">
                  {questoes.map((q, idx) => {
                    const resp = respostas[idx];
                    const respondeu = resp !== undefined;
                    const acertou = respondeu && resp === q.correta;
                    const ehAtual = idx === indiceAtual;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setIndiceAtual(idx);
                          setGavetaQuestoesAberta(false);
                        }}
                        className={`h-10 rounded-xl text-xs font-bold flex items-center justify-center transition active:scale-95 ${
                          ehAtual
                            ? 'ring-2 ring-slate-800 bg-[#35495E] text-white shadow'
                            : respondeu
                            ? acertou
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setGavetaQuestoesAberta(false)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
