import { useCallback, useEffect, useRef, useState } from 'react';
import { ConfigExame, Pergunta, TentativaExame } from '../types';
import { gerarExameOficial } from '../utils/dados';
import {
  obterCandidato,
  salvarExameEmCurso,
  salvarTentativa,
} from '../utils/storage';

export function useExame(onAutoFinalizar?: (tentativa: TentativaExame) => void) {
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [questoes, setQuestoes] = useState<Pergunta[]>([]);
  const [config, setConfig] = useState<ConfigExame | null>(null);
  const [indiceAtual, setIndiceAtual] = useState<number>(0);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [tempoRestante, setTempoRestante] = useState<number>(1800); // 30 minutos em segundos (1800s)
  const [finalizado, setFinalizado] = useState<boolean>(false);
  const [tentativaFinal, setTentativaFinal] = useState<TentativaExame | null>(null);

  const timerRef = useRef<number | null>(null);
  const finalizadoRef = useRef<boolean>(false);
  const respostasRef = useRef<Record<number, number>>({});
  const tempoRestanteRef = useRef<number>(1800);
  const questoesRef = useRef<Pergunta[]>([]);
  const configRef = useRef<ConfigExame | null>(null);
  const onAutoFinalizarRef = useRef(onAutoFinalizar);

  respostasRef.current = respostas;
  tempoRestanteRef.current = tempoRestante;
  questoesRef.current = questoes;
  configRef.current = config;
  onAutoFinalizarRef.current = onAutoFinalizar;

  // Iniciar novo exame oficial de 40 questões
  const iniciarNovoExame = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      setFinalizado(false);
      finalizadoRef.current = false;

      const { questoes: novasQuestoes, config: novaConfig } = await gerarExameOficial();
      setQuestoes(novasQuestoes);
      setConfig(novaConfig);
      setIndiceAtual(0);
      setRespostas({});

      const duracaoSegundos = (novaConfig.duracaoMinutos || 30) * 60;
      setTempoRestante(duracaoSegundos);
      tempoRestanteRef.current = duracaoSegundos;

      salvarExameEmCurso({
        questoes: novasQuestoes,
        respostas: {},
        tempoRestante: duracaoSegundos,
        tipo: 'exame',
      });
      setCarregando(false);
    } catch (e: any) {
      console.error('Erro ao iniciar exame', e);
      setErro(e.message || 'Falha ao carregar exame');
      setCarregando(false);
    }
  }, []);

  // Inicialização no primeiro render
  useEffect(() => {
    iniciarNovoExame();
  }, [iniciarNovoExame]);

  // Função para finalizar o exame
  const finalizarExame = useCallback((): TentativaExame | null => {
    if (finalizadoRef.current) return null;
    const listaQuestoes = questoesRef.current;
    if (listaQuestoes.length === 0) return null;

    finalizadoRef.current = true;
    setFinalizado(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const candidatoAtual = obterCandidato();
    let certas = 0;
    const respostasFinais = respostasRef.current;

    listaQuestoes.forEach((q, idx) => {
      const respEscolhida = respostasFinais[idx];
      if (respEscolhida !== undefined && respEscolhida === q.correta) {
        certas++;
      }
    });

    const total = listaQuestoes.length;
    const percentagem = Math.round((certas / total) * 100);
    const conf = configRef.current;
    const notaMinima = conf?.notaMinimaAprovacao || 30;
    const aprovado = certas >= notaMinima;
    const duracaoTotal = (conf?.duracaoMinutos || 30) * 60;
    const tempoGasto = Math.max(0, duracaoTotal - tempoRestanteRef.current);

    const tentativa: TentativaExame = {
      id: `exame_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      data: new Date().toLocaleDateString('pt-MZ', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: Date.now(),
      tipo: 'exame',
      candidato: {
        nome: candidatoAtual.nome || 'Convidado',
        numero: candidatoAtual.numero || '',
      },
      questoes: listaQuestoes,
      respostas: respostasFinais,
      tempoGastoSegundos: tempoGasto,
      pontuacao: certas,
      total,
      percentagem,
      aprovado,
    };

    salvarTentativa(tentativa);
    salvarExameEmCurso(null);
    setTentativaFinal(tentativa);

    return tentativa;
  }, []);

  // Gestão estável do temporizador regressivo
  useEffect(() => {
    if (carregando || finalizado) return;

    timerRef.current = window.setInterval(() => {
      setTempoRestante((prev) => {
        const proximo = prev - 1;
        if (proximo <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          const t = finalizarExame();
          if (t && onAutoFinalizarRef.current) {
            onAutoFinalizarRef.current(t);
          }
          return 0;
        }
        return proximo;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [carregando, finalizado, finalizarExame]);

  // Registo de resposta do aluno
  const responder = useCallback((indicePergunta: number, indiceOpcao: number) => {
    if (finalizadoRef.current) return;
    setRespostas((prev) => {
      const novo = { ...prev, [indicePergunta]: indiceOpcao };
      return novo;
    });
  }, []);

  const irParaPergunta = useCallback((idx: number) => {
    if (idx >= 0 && idx < questoesRef.current.length) {
      setIndiceAtual(idx);
    }
  }, []);

  const proximaPergunta = useCallback(() => {
    if (indiceAtual < questoes.length - 1) {
      setIndiceAtual((prev) => prev + 1);
    }
  }, [indiceAtual, questoes.length]);

  const perguntaAnterior = useCallback(() => {
    if (indiceAtual > 0) {
      setIndiceAtual((prev) => prev - 1);
    }
  }, [indiceAtual]);

  const totalRespondidas = Object.keys(respostas).length;
  const duracaoTotal = (config?.duracaoMinutos || 30) * 60;
  const tempoAlerta = tempoRestante <= (config?.avisoTempoRestanteMinutos || 5) * 60;

  return {
    carregando,
    erro,
    questoes,
    config,
    indiceAtual,
    perguntaAtual: questoes[indiceAtual],
    respostas,
    totalQuestoes: questoes.length,
    totalRespondidas,
    tempoRestante,
    duracaoTotal,
    tempoAlerta,
    finalizado,
    tentativaFinal,
    responder,
    irParaPergunta,
    proximaPergunta,
    perguntaAnterior,
    finalizarExame,
    iniciarNovoExame,
  };
}
