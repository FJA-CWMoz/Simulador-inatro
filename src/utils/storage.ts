import {
  DiagnosticoCategoria,
  EstatisticasGerais,
  IdiomaCodigo,
  PerfilCandidato,
  Pergunta,
  TentativaExame,
} from '../types';
import { CHAVE_STORAGE_IDIOMA, IDIOMA_PADRAO } from './idioma';

const CHAVE_CANDIDATO = 'inatro_simulador_candidato';
const CHAVE_HISTORICO = 'inatro_simulador_historico';
const CHAVE_EXAME_EM_CURSO = 'inatro_simulador_em_curso';
const CHAVE_CADERNO_ERROS = 'inatro_caderno_erros';
const CHAVE_TEMA = 'inatro_simulador_tema';

/**
 * Obtém os dados de identificação do candidato guardados localmente.
 */
export function obterCandidato(): PerfilCandidato {
  try {
    const raw = localStorage.getItem(CHAVE_CANDIDATO);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Erro ao ler candidato do localStorage', e);
  }
  return {
    nome: '',
    numero: '',
    categoria: 'B',
  };
}

/**
 * Guarda a identificação do candidato no localStorage.
 */
export function salvarCandidato(perfil: PerfilCandidato): void {
  try {
    localStorage.setItem(CHAVE_CANDIDATO, JSON.stringify(perfil));
  } catch (e) {
    console.error('Erro ao guardar candidato no localStorage', e);
  }
}

/**
 * Obtém todo o histórico de exames e treinos realizados.
 */
export function obterHistorico(): TentativaExame[] {
  try {
    const raw = localStorage.getItem(CHAVE_HISTORICO);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => b.timestamp - a.timestamp);
      }
    }
  } catch (e) {
    console.error('Erro ao ler histórico do localStorage', e);
  }
  return [];
}

/**
 * Salva uma nova tentativa no histórico e alimenta automaticamente o Caderno de Erros.
 */
export function salvarTentativa(tentativa: TentativaExame): TentativaExame[] {
  const lista = obterHistorico();
  const novaLista = [tentativa, ...lista];
  try {
    localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(novaLista));

    // Identifica e adiciona automaticamente as perguntas que o aluno errou
    const perguntasErradas: Pergunta[] = [];
    tentativa.questoes.forEach((q, idx) => {
      const respAluno = tentativa.respostas[idx];
      if (respAluno !== undefined && respAluno !== q.correta) {
        perguntasErradas.push(q);
      }
    });

    if (perguntasErradas.length > 0) {
      adicionarErros(perguntasErradas);
    }
  } catch (e) {
    console.error('Erro ao salvar tentativa no localStorage', e);
  }
  return novaLista;
}

/**
 * Apaga todo o histórico guardado.
 */
export function limparHistorico(): void {
  try {
    localStorage.removeItem(CHAVE_HISTORICO);
  } catch (e) {
    console.error('Erro ao limpar histórico', e);
  }
}

/**
 * CADERNO DE ERROS (Reforço Inteligente)
 */
export function obterCadernoErros(): Pergunta[] {
  try {
    const raw = localStorage.getItem(CHAVE_CADERNO_ERROS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Erro ao ler caderno de erros', e);
  }
  return [];
}

export function salvarCadernoErros(perguntas: Pergunta[]): void {
  try {
    localStorage.setItem(CHAVE_CADERNO_ERROS, JSON.stringify(perguntas));
  } catch (e) {
    console.error('Erro ao guardar caderno de erros', e);
  }
}

export function adicionarErros(novasErradas: Pergunta[]): void {
  const atuais = obterCadernoErros();
  const mapa = new Map<string, Pergunta>();
  atuais.forEach((p) => mapa.set(p.id, p));
  novasErradas.forEach((p) => mapa.set(p.id, p));
  salvarCadernoErros(Array.from(mapa.values()));
}

export function removerErro(perguntaId: string): void {
  const atuais = obterCadernoErros();
  const filtradas = atuais.filter((p) => p.id !== perguntaId);
  salvarCadernoErros(filtradas);
}

export function limparCadernoErros(): void {
  try {
    localStorage.removeItem(CHAVE_CADERNO_ERROS);
  } catch (e) {
    console.error('Erro ao limpar caderno de erros', e);
  }
}

/**
 * Calcula estatísticas agregadas a partir da lista de tentativas.
 */
export function calcularEstatisticas(historico: TentativaExame[]): EstatisticasGerais {
  if (!historico || historico.length === 0) {
    return {
      totalTentativas: 0,
      totalAprovados: 0,
      taxaAprovacao: 0,
      melhorNota: 0,
      mediaNota: 0,
      totalExames: 0,
      totalTreinos: 0,
    };
  }

  const exames = historico.filter((h) => h.tipo === 'exame');
  const treinos = historico.filter((h) => h.tipo === 'treino');
  const baseAnalise = exames.length > 0 ? exames : historico;

  const total = baseAnalise.length;
  const aprovados = baseAnalise.filter((h) => h.aprovado).length;
  const melhor = Math.max(...baseAnalise.map((h) => h.pontuacao));
  const somaPontos = baseAnalise.reduce((acc, h) => acc + h.pontuacao, 0);
  const media = total > 0 ? Math.round((somaPontos / total) * 10) / 10 : 0;
  const taxa = total > 0 ? Math.round((aprovados / total) * 100) : 0;

  return {
    totalTentativas: historico.length,
    totalAprovados: aprovados,
    taxaAprovacao: taxa,
    melhorNota: melhor,
    mediaNota: media,
    totalExames: exames.length,
    totalTreinos: treinos.length,
  };
}

/**
 * DIAGNÓSTICO POR CATEGORIA (Onde precisas de estudar mais?)
 */
export function calcularDiagnosticoCategorias(historico: TentativaExame[]): DiagnosticoCategoria[] {
  const categoriasBase: {
    id: string;
    nome: { pt: string; en: string; ch: string };
    icone: string;
    cor: string;
    moduloReferencia: number;
    prefixos: string[];
  }[] = [
    {
      id: 'sinalizacao',
      nome: {
        pt: 'Sinalização Rodoviária',
        en: 'Road Signs & Signals',
        ch: 'Swikombiso swa le Magondzweni',
      },
      icone: 'fa-solid fa-traffic-light',
      cor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      moduloReferencia: 1,
      prefixos: ['sin-', 'sinalizacao'],
    },
    {
      id: 'prioridade',
      nome: {
        pt: 'Prioridades & Cruzamentos',
        en: 'Right-of-Way & Intersections',
        ch: 'Ku Nyika Ndlela ni Rotundas',
      },
      icone: 'fa-solid fa-arrows-split-up-and-left',
      cor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      moduloReferencia: 2,
      prefixos: ['prio-', 'prioridade'],
    },
    {
      id: 'velocidade',
      nome: {
        pt: 'Velocidade & Distâncias',
        en: 'Speed & Distances',
        ch: 'Rivengo ni Mpfhuka',
      },
      icone: 'fa-solid fa-gauge-high',
      cor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      moduloReferencia: 3,
      prefixos: ['vel-', 'velocidade'],
    },
    {
      id: 'seguranca',
      nome: {
        pt: 'Segurança & Equipamento',
        en: 'Road Safety & Gear',
        ch: 'Vuhlayiseki ni Switirho',
      },
      icone: 'fa-solid fa-shield-halved',
      cor: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      moduloReferencia: 5,
      prefixos: ['seg-', 'seguranca'],
    },
    {
      id: 'infracoes',
      nome: {
        pt: 'Legislação & Fiscalização',
        en: 'Traffic Laws & Fines',
        ch: 'Milawu ni Tihlawulelo',
      },
      icone: 'fa-solid fa-gavel',
      cor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      moduloReferencia: 6,
      prefixos: ['inf-', 'infracoes'],
    },
    {
      id: 'mecanica',
      nome: {
        pt: 'Mecânica Elementar',
        en: 'Basic Mechanics',
        ch: 'Swilo swa Injini',
      },
      icone: 'fa-solid fa-wrench',
      cor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
      moduloReferencia: 7,
      prefixos: ['mec-', 'mecanica'],
    },
  ];

  // Acumuladores
  const contadores: Record<string, { total: number; acertos: number }> = {};
  categoriasBase.forEach((c) => {
    contadores[c.id] = { total: 0, acertos: 0 };
  });

  historico.forEach((tentativa) => {
    tentativa.questoes.forEach((q, idx) => {
      const resp = tentativa.respostas[idx];
      if (resp === undefined) return;

      const categoriaId = categoriasBase.find((c) =>
        c.prefixos.some((p) => q.id.startsWith(p) || q.subtema.includes(p))
      )?.id || 'sinalizacao';

      contadores[categoriaId].total += 1;
      if (resp === q.correta) {
        contadores[categoriaId].acertos += 1;
      }
    });
  });

  return categoriasBase.map((cat) => {
    const dados = contadores[cat.id];
    const percentagem =
      dados.total > 0 ? Math.round((dados.acertos / dados.total) * 100) : 0;

    let status: 'excelente' | 'bom' | 'reforco' = 'excelente';
    if (dados.total === 0) {
      status = 'bom';
    } else if (percentagem < 70) {
      status = 'reforco';
    } else if (percentagem < 85) {
      status = 'bom';
    }

    return {
      id: cat.id,
      nome: cat.nome,
      icone: cat.icone,
      cor: cat.cor,
      totalPerguntas: dados.total,
      totalAcertos: dados.acertos,
      percentagem,
      moduloReferencia: cat.moduloReferencia,
      status,
    };
  });
}

/**
 * Gestão do idioma selecionado no localStorage.
 */
export function obterIdiomaStorage(): IdiomaCodigo {
  try {
    const raw = localStorage.getItem(CHAVE_STORAGE_IDIOMA);
    if (raw === 'pt' || raw === 'en' || raw === 'ch') {
      return raw;
    }
  } catch (e) {
    console.error('Erro ao ler idioma', e);
  }
  return IDIOMA_PADRAO;
}

export function salvarIdiomaStorage(lang: IdiomaCodigo): void {
  try {
    localStorage.setItem(CHAVE_STORAGE_IDIOMA, lang);
  } catch (e) {
    console.error('Erro ao salvar idioma', e);
  }
}

/**
 * GESTÃO DO MODO ESCURO (DARK MODE)
 */
export function obterTema(): 'light' | 'dark' {
  try {
    const raw = localStorage.getItem(CHAVE_TEMA);
    if (raw === 'dark' || raw === 'light') {
      return raw;
    }
    // Preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) {
    // fallback
  }
  return 'light';
}

export function salvarTema(tema: 'light' | 'dark'): void {
  try {
    localStorage.setItem(CHAVE_TEMA, tema);
    aplicarTema(tema);
  } catch (e) {
    console.error('Erro ao salvar tema', e);
  }
}

export function aplicarTema(tema: 'light' | 'dark'): void {
  if (typeof document !== 'undefined') {
    if (tema === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

/**
 * Guarda o estado em curso de um exame não finalizado.
 */
export function salvarExameEmCurso(dados: {
  questoes: any[];
  respostas: Record<number, number>;
  tempoRestante: number;
  tipo: 'exame' | 'treino';
} | null): void {
  try {
    if (!dados) {
      localStorage.removeItem(CHAVE_EXAME_EM_CURSO);
    } else {
      localStorage.setItem(CHAVE_EXAME_EM_CURSO, JSON.stringify(dados));
    }
  } catch (e) {
    console.error('Erro ao salvar exame em curso', e);
  }
}

export function obterExameEmCurso(): {
  questoes: any[];
  respostas: Record<number, number>;
  tempoRestante: number;
  tipo: 'exame' | 'treino';
} | null {
  try {
    const raw = localStorage.getItem(CHAVE_EXAME_EM_CURSO);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao obter exame em curso', e);
  }
  return null;
}
