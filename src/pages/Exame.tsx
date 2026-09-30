import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExame } from '../hooks/useExame';
import { useIdioma } from '../hooks/useIdioma';
import { Pergunta } from '../components/Pergunta';
import { Temporizador } from '../components/Temporizador';
import { TentativaExame } from '../types';

export const Exame: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useIdioma();
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [gavetaQuestoesAberta, setGavetaQuestoesAberta] = useState(false);

  // Callback ao esgotar o tempo automaticamente
  const handleAutoFinalizar = (tentativa: TentativaExame) => {
    navigate(`/resultado/${tentativa.id}`);
  };

  const {
    carregando,
    erro,
    questoes,
    indiceAtual,
    perguntaAtual,
    respostas,
    totalQuestoes,
    totalRespondidas,
    tempoRestante,
    duracaoTotal,
    tempoAlerta,
    responder,
    irParaPergunta,
    proximaPergunta,
    perguntaAnterior,
    finalizarExame,
  } = useExame(handleAutoFinalizar);

  const handleEntregarExame = () => {
    const tentativa = finalizarExame();
    if (tentativa) {
      navigate(`/resultado/${tentativa.id}`);
    }
  };

  if (carregando) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full border-4 border-[#35495E]/20 border-t-[#35495E] animate-spin"></div>
        <div className="space-y-1">
          <p className="text-base font-bold text-slate-800 font-display">
            A preparar o Exame Teórico INATRO...
          </p>
          <p className="text-xs text-slate-500">
            A sortear 40 questões regulamentares segundo a distribuição oficial.
          </p>
        </div>
      </div>
    );
  }

  if (erro || !perguntaAtual) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-200 text-center space-y-4 shadow-sm max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-2xl">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h2 className="text-lg font-bold text-slate-900 font-display">Falha ao carregar exame</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {erro || 'Não foi possível carregar as perguntas do simulador.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-[#35495E] text-white rounded-xl font-bold text-sm shadow hover:bg-[#2c3d4f] transition cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const percentagemRespondida = Math.round((totalRespondidas / totalQuestoes) * 100);

  return (
    <div className="space-y-4 pb-28 sm:pb-12 animate-in fade-in duration-200">
      {/* HUD DE TOPO MOBILE-FIRST: TEMPORIZADOR EM DESTAQUE */}
      <section className="space-y-3">
        {/* Bloco Oficial do Temporizador */}
        <div className="w-full">
          <Temporizador
            tempoRestanteSegundos={tempoRestante}
            duracaoTotalSegundos={duracaoTotal}
            tempoAlerta={tempoAlerta}
          />
        </div>

        {/* Barra de Progresso e Acesso Rápido ao Mapa de Questões */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setGavetaQuestoesAberta(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition active:scale-95 cursor-pointer"
            title="Abrir mapa de perguntas"
          >
            <i className="fa-solid fa-table-cells-large text-slate-500"></i>
            <span>
              Questão {indiceAtual + 1} de {totalQuestoes}
            </span>
            <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 hidden sm:inline">
              {totalRespondidas}/{totalQuestoes} ({percentagemRespondida}%)
            </span>
            <button
              type="button"
              onClick={() => setModalConfirmacao(true)}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-sm transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-flag-checkered text-[11px]"></i>
              <span>{t('finalizar')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* CARTÃO DA PERGUNTA ATUAL */}
      <section>
        <Pergunta
          pergunta={perguntaAtual}
          numero={indiceAtual + 1}
          total={totalQuestoes}
          respostaSelecionada={respostas[indiceAtual]}
          mostrarFeedback={false}
          desabilitarOpcoes={false}
          onSelecionarOpcao={(indiceOpcao) => responder(indiceAtual, indiceOpcao)}
        />
      </section>

      {/* DOCK INFERIOR FIXO PARA MOBILE (THUMB-REACH NATIVE FEEL) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl sm:static sm:bg-transparent sm:border-0 sm:p-0 sm:shadow-none sm:z-auto">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Botão Anterior */}
          <button
            type="button"
            onClick={perguntaAnterior}
            disabled={indiceAtual === 0}
            className="flex-1 sm:flex-none min-h-[48px] px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs sm:text-sm transition active:scale-95 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            <span>{t('anterior')}</span>
          </button>

          {/* Botão Central: Abrir Mapa das 40 questões */}
          <button
            type="button"
            onClick={() => setGavetaQuestoesAberta(true)}
            className="sm:hidden px-3 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-black min-h-[48px] flex items-center justify-center gap-1.5 active:scale-95"
            title="Ver todas as 40 questões"
          >
            <i className="fa-solid fa-grip text-slate-500"></i>
            <span>{indiceAtual + 1}/{totalQuestoes}</span>
          </button>

          {/* Botão Próxima ou Finalizar */}
          {indiceAtual < totalQuestoes - 1 ? (
            <button
              type="button"
              onClick={proximaPergunta}
              className="flex-1 sm:flex-none min-h-[48px] px-6 py-3 bg-[#35495E] hover:bg-[#2c3d4f] text-white font-bold rounded-2xl text-xs sm:text-sm transition active:scale-95 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>{t('proxima')}</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setModalConfirmacao(true)}
              className="flex-1 sm:flex-none min-h-[48px] px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition active:scale-95 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>{t('finalizar')}</span>
              <i className="fa-solid fa-check text-xs"></i>
            </button>
          )}
        </div>
      </div>

      {/* MAPA DAS 40 QUESTÕES NA VERSÃO DESKTOP */}
      <section className="hidden sm:block bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-map-location-dot text-[#35495E]"></i>
            <span>Grelha das 40 Perguntas</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Respondida
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Pendente
            </span>
          </div>
        </div>

        <div className="grid grid-cols-10 md:grid-cols-20 gap-2">
          {questoes.map((_, idx) => {
            const respondida = respostas[idx] !== undefined;
            const ehAtual = idx === indiceAtual;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => irParaPergunta(idx)}
                className={`w-full aspect-square rounded-xl text-xs font-bold flex items-center justify-center transition cursor-pointer active:scale-90 ${
                  ehAtual
                    ? 'ring-2 ring-[#35495E] ring-offset-2 bg-[#35495E] text-white shadow-sm'
                    : respondida
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </section>

      {/* GAVETA / MODAL MOBILE DO MAPA DAS 40 QUESTÕES */}
      {gavetaQuestoesAberta && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold font-display text-slate-900">
                  Caderno de 40 Questões
                </h3>
                <p className="text-xs text-slate-400">
                  {totalRespondidas} de {totalQuestoes} respondidas
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGavetaQuestoesAberta(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5 py-2">
              {questoes.map((_, idx) => {
                const respondida = respostas[idx] !== undefined;
                const ehAtual = idx === indiceAtual;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      irParaPergunta(idx);
                      setGavetaQuestoesAberta(false);
                    }}
                    className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center transition cursor-pointer active:scale-95 ${
                      ehAtual
                        ? 'ring-2 ring-[#35495E] ring-offset-2 bg-[#35495E] text-white shadow-md'
                        : respondida
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {respondida && (
                      <i className="fa-solid fa-check text-[10px] ml-1 text-emerald-700"></i>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setGavetaQuestoesAberta(false)}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition"
            >
              Fechar Mapa
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO PARA FINALIZAR EXAME */}
      {modalConfirmacao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 text-center">
            <div className="w-16 h-16 mx-auto bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center text-3xl">
              <i className="fa-solid fa-flag-checkered"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-display text-slate-900">
                {t('finalizar')}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t('confirmarFinalizar')}
              </p>
              {totalRespondidas < totalQuestoes && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-bold leading-normal">
                  <i className="fa-solid fa-triangle-exclamation mr-1.5"></i>
                  Ainda tens {totalQuestoes - totalRespondidas} questão(ões) por responder!
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalConfirmacao(false)}
                className="py-3 px-4 rounded-xl border border-slate-200 font-bold text-xs sm:text-sm text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Voltar ao Exame
              </button>
              <button
                type="button"
                onClick={handleEntregarExame}
                className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm transition shadow-md cursor-pointer"
              >
                Sim, finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
