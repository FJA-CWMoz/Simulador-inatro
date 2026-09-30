import React, { useEffect } from 'react';
import { Pergunta as PerguntaType } from '../types';
import { useIdioma } from '../hooks/useIdioma';
import { useAudioLeitor } from '../hooks/useAudioLeitor';
import { Opcao } from './Opcao';
import { SinalIlustracao } from './SinalIlustracao';

interface PerguntaProps {
  pergunta: PerguntaType;
  numero: number;
  total: number;
  respostaSelecionada?: number;
  mostrarFeedback?: boolean; // Se true, revela se acertou e a explicação
  desabilitarOpcoes?: boolean;
  onSelecionarOpcao: (indice: number) => void;
}

export const Pergunta: React.FC<PerguntaProps> = ({
  pergunta,
  numero,
  total,
  respostaSelecionada,
  mostrarFeedback = false,
  desabilitarOpcoes = false,
  onSelecionarOpcao,
}) => {
  const { t, idioma } = useIdioma();
  const { falar, parar, falando, suportado } = useAudioLeitor(idioma);

  const textoPergunta = t(pergunta.pergunta);
  const explicacao = t(pergunta.explicacao);

  // Lista de opções traduzidas para o idioma selecionado
  const opcoesLista =
    pergunta.opcoes[idioma] && pergunta.opcoes[idioma].length > 0
      ? pergunta.opcoes[idioma]
      : pergunta.opcoes.pt || [];

  const acertou = respostaSelecionada !== undefined && respostaSelecionada === pergunta.correta;

  // Interrompe o áudio ao mudar de pergunta
  useEffect(() => {
    parar();
  }, [pergunta.id, parar]);

  const toggleLeituraAudio = () => {
    if (falando) {
      parar();
    } else {
      const opcoesFaladas = opcoesLista
        .map((op, i) => `Opção ${String.fromCharCode(65 + i)}: ${op}`)
        .join('. ');
      const textoCompleto = `${textoPergunta}. ${opcoesFaladas}`;
      falar(textoCompleto);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6 transition-colors">
      {/* Cabeçalho da Pergunta: Número, Subtema e Botão de Áudio */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#35495E] dark:bg-slate-800 text-white text-xs font-extrabold rounded-lg tracking-wide border border-white/10">
            {t('questao')} {numero} {t('de')} {total}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
            {pergunta.subtema.replace('-', ' ')}
          </span>
        </div>

        {/* Lado Direito: Leitor de Áudio em Voz Alta + Tags */}
        <div className="flex items-center gap-2">
          {suportado && (
            <button
              type="button"
              onClick={toggleLeituraAudio}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm border ${
                falando
                  ? 'bg-amber-500 text-white border-amber-600 animate-pulse shadow-amber-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
              }`}
              title={falando ? 'Parar leitura por voz' : 'Ouvir pergunta e opções em voz alta'}
              aria-label="Ouvir Pergunta"
            >
              <i className={`fa-solid ${falando ? 'fa-volume-xmark' : 'fa-volume-high'} text-xs`}></i>
              <span className="text-[11px]">{falando ? 'Parar' : 'Ouvir'}</span>
            </button>
          )}

          {pergunta.tags && pergunta.tags.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
              <i className="fa-solid fa-tag text-[10px]"></i>
              <span>{pergunta.tags.slice(0, 2).join(' • ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Ilustração / Sinal Rodoviário (se existir) */}
      {pergunta.imagem && (
        <div className="flex justify-center py-1">
          <SinalIlustracao imagem={pergunta.imagem} tamanho={170} />
        </div>
      )}

      {/* Enunciado da Pergunta */}
      <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
        {textoPergunta}
      </div>

      {/* Lista de Opções A, B, C, D */}
      <div className="space-y-3 pt-1">
        {opcoesLista.map((opcaoTexto, idx) => (
          <Opcao
            key={idx}
            indice={idx}
            texto={opcaoTexto}
            selecionada={respostaSelecionada === idx}
            correta={idx === pergunta.correta}
            mostrarResultado={mostrarFeedback}
            desabilitada={desabilitarOpcoes}
            onSelecionar={onSelecionarOpcao}
          />
        ))}
      </div>

      {/* Cartão de Explicação Regulamentar (Modo Treino e Revisão) */}
      {mostrarFeedback && respostaSelecionada !== undefined && (
        <div
          className={`p-5 rounded-2xl border transition-all animate-in fade-in duration-200 ${
            acertou
              ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-950 dark:text-emerald-200'
              : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700/60 text-rose-950 dark:text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm mb-2">
            {acertou ? (
              <>
                <i className="fa-solid fa-circle-check text-emerald-600 dark:text-emerald-400 text-base"></i>
                <span className="text-emerald-800 dark:text-emerald-300">{t('corretoMsg')}</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-circle-xmark text-rose-600 dark:text-rose-400 text-base"></i>
                <span className="text-rose-800 dark:text-rose-300">{t('incorretoMsg')}</span>
              </>
            )}
          </div>

          <div className="text-xs sm:text-sm font-medium leading-relaxed opacity-90 pl-6 border-l-2 border-current/30 my-1">
            <span className="font-bold mr-1">{t('explicacao')}:</span>
            {explicacao}
          </div>
        </div>
      )}
    </div>
  );
};
