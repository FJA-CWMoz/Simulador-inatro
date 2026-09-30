export type IdiomaCodigo = 'pt' | 'en' | 'ch';

export interface TextoTraduzido {
  pt: string;
  en: string;
  ch: string;
  [key: string]: string;
}

export interface OpcoesTraduzidas {
  pt: string[];
  en: string[];
  ch: string[];
  [key: string]: string[];
}

export interface ImagemPergunta {
  tipo?: string;
  codigo?: string;
  ficheiro?: string;
  alt: TextoTraduzido;
  posicao?: string;
  svgContent?: string;
}

export interface Pergunta {
  id: string;
  grupo: string;
  variacao: number;
  subtema: string;
  dificuldade: number;
  tags: string[];
  pergunta: TextoTraduzido;
  imagem?: ImagemPergunta;
  opcoes: OpcoesTraduzidas;
  correta: number;
  explicacao: TextoTraduzido;
}

export interface SubtemaManifest {
  id: string;
  ficheiro: string;
  nome: TextoTraduzido;
  icone: string;
}

export interface CategoriaManifest {
  id: string;
  nome: TextoTraduzido;
  icone: string;
  subtemas: SubtemaManifest[];
}

export interface ManifestData {
  versao: string;
  dataAtualizacao: string;
  categorias: CategoriaManifest[];
}

export interface ConfigExame {
  nome: TextoTraduzido;
  descricao: TextoTraduzido;
  duracaoMinutos: number;
  avisoTempoRestanteMinutos: number;
  totalQuestoes: number;
  notaMinimaAprovacao: number;
  percentagemAprovacao: number;
  distribuicaoId: string;
}

export interface DistribuicaoDef {
  id: string;
  titulo: TextoTraduzido;
  total: number;
  distribuicao: Record<string, number>;
}

export interface PerfilCandidato {
  nome: string;
  numero: string;
  escola?: string;
  categoria?: string;
  dataRegisto?: string;
}

export interface TentativaExame {
  id: string;
  data: string;
  timestamp: number;
  tipo: 'exame' | 'treino';
  candidato: PerfilCandidato;
  questoes: Pergunta[];
  respostas: Record<number, number>; // index da pergunta -> index da opção escolhida
  tempoGastoSegundos: number;
  pontuacao: number;
  total: number;
  percentagem: number;
  aprovado: boolean;
}

export interface EstatisticasGerais {
  totalTentativas: number;
  totalAprovados: number;
  taxaAprovacao: number;
  melhorNota: number;
  mediaNota: number;
  totalExames: number;
  totalTreinos: number;
}

export interface DiagnosticoCategoria {
  id: string;
  nome: TextoTraduzido;
  icone: string;
  cor: string;
  totalPerguntas: number;
  totalAcertos: number;
  percentagem: number;
  moduloReferencia: number;
  status: 'excelente' | 'bom' | 'reforco';
}
