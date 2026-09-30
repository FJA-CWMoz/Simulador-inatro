import {
  ConfigExame,
  DistribuicaoDef,
  ManifestData,
  Pergunta,
} from '../types';

// Cache em memória para evitar múltiplos re-fetches
const cacheMemoria: {
  manifest: ManifestData | null;
  exameConfig: ConfigExame | null;
  distribuicoes: Record<string, DistribuicaoDef> | null;
  perguntasPorSubtema: Record<string, Pergunta[]>;
  todasPerguntas: Pergunta[] | null;
} = {
  manifest: null,
  exameConfig: null,
  distribuicoes: null,
  perguntasPorSubtema: {},
  todasPerguntas: null,
};

/**
 * Função utilitária com fetch resiliente e timeout
 */
async function fetchJson<T>(caminho: string): Promise<T> {
  const urlLimpa = caminho.startsWith('/') ? caminho : `/${caminho}`;
  const resposta = await fetch(urlLimpa, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao carregar ${urlLimpa}: status ${resposta.status}`);
  }

  return resposta.json();
}

/**
 * Carrega o manifest.json com categorias e subtemas
 */
export async function carregarManifest(): Promise<ManifestData> {
  if (cacheMemoria.manifest) {
    return cacheMemoria.manifest;
  }
  const manifest = await fetchJson<ManifestData>('/data/manifest.json');
  cacheMemoria.manifest = manifest;
  return manifest;
}

/**
 * Carrega a configuração do exame (exames.json)
 */
export async function carregarConfigExame(): Promise<ConfigExame> {
  if (cacheMemoria.exameConfig) {
    return cacheMemoria.exameConfig;
  }
  const config = await fetchJson<ConfigExame>('/data/config/exames.json');
  cacheMemoria.exameConfig = config;
  return config;
}

/**
 * Carrega as distribuições de perguntas (distribuicoes.json)
 */
export async function carregarDistribuicoes(): Promise<Record<string, DistribuicaoDef>> {
  if (cacheMemoria.distribuicoes) {
    return cacheMemoria.distribuicoes;
  }
  const dist = await fetchJson<Record<string, DistribuicaoDef>>('/data/config/distribuicoes.json');
  cacheMemoria.distribuicoes = dist;
  return dist;
}

/**
 * Carrega perguntas de um subtema específico (com cache em memória)
 * Ex: 'sinalizacao/perigo' -> carrega '/data/perguntas/sinalizacao/perigo.json'
 */
export async function carregarPerguntasSubtema(chaveSubtema: string): Promise<Pergunta[]> {
  if (cacheMemoria.perguntasPorSubtema[chaveSubtema]) {
    return cacheMemoria.perguntasPorSubtema[chaveSubtema];
  }

  const caminho = `/data/perguntas/${chaveSubtema}.json`;
  const perguntas = await fetchJson<Pergunta[]>(caminho);
  cacheMemoria.perguntasPorSubtema[chaveSubtema] = perguntas;
  return perguntas;
}

/**
 * Carrega todas as perguntas de todos os subtemas do manifest
 */
export async function carregarTodasPerguntas(): Promise<Pergunta[]> {
  if (cacheMemoria.todasPerguntas && cacheMemoria.todasPerguntas.length > 0) {
    return cacheMemoria.todasPerguntas;
  }

  const manifest = await carregarManifest();
  const subtemasChaves: string[] = [];

  for (const cat of manifest.categorias) {
    for (const sub of cat.subtemas) {
      subtemasChaves.push(`${cat.id}/${sub.id}`);
    }
  }

  const promessas = subtemasChaves.map(carregarPerguntasSubtema);
  const listas = await Promise.all(promessas);
  const todas = listas.flat();

  cacheMemoria.todasPerguntas = todas;
  return todas;
}

/**
 * Baralha um array (algoritmo Fisher-Yates)
 */
function baralharArray<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Seleciona perguntas de um conjunto garantindo que nenhum 'grupo' se repete
 */
function selecionarQuestoesSemRepeticaoDeGrupo(perguntasDisponiveis: Pergunta[], quantidadeDesejada: number): Pergunta[] {
  const perguntasBaralhadas = baralharArray(perguntasDisponiveis);
  const gruposJaUsados = new Set<string>();
  const selecionadas: Pergunta[] = [];

  // Primeira passagem: apenas perguntas com grupos únicos
  for (const p of perguntasBaralhadas) {
    if (selecionadas.length >= quantidadeDesejada) break;
    const grupo = p.grupo || p.id;
    if (!gruposJaUsados.has(grupo)) {
      gruposJaUsados.add(grupo);
      selecionadas.push(p);
    }
  }

  // Se por alguma razão o número de grupos distintos for menor que a quantidade, preenche com as restantes
  if (selecionadas.length < quantidadeDesejada) {
    for (const p of perguntasBaralhadas) {
      if (selecionadas.length >= quantidadeDesejada) break;
      if (!selecionadas.some((s) => s.id === p.id)) {
        selecionadas.push(p);
      }
    }
  }

  return selecionadas;
}

/**
 * Gera um exame oficial com 40 questões segundo a distribuição oficial e regras de grupo
 */
export async function gerarExameOficial(): Promise<{ questoes: Pergunta[]; config: ConfigExame }> {
  const config = await carregarConfigExame();
  const distribuicoes = await carregarDistribuicoes();
  const dist = distribuicoes[config.distribuicaoId] || Object.values(distribuicoes)[0];

  const questoesExame: Pergunta[] = [];
  const gruposGlobaisUsados = new Set<string>();

  // Para cada subtema da distribuição
  for (const [chaveSubtema, qtdNecessaria] of Object.entries(dist.distribuicao)) {
    try {
      const perguntasSubtema = await carregarPerguntasSubtema(chaveSubtema);
      // Filtra evitando grupos já sorteados globalmente
      const disponiveis = perguntasSubtema.filter((p) => !gruposGlobaisUsados.has(p.grupo || p.id));
      const pool = disponiveis.length >= qtdNecessaria ? disponiveis : perguntasSubtema;
      const selecionadas = selecionarQuestoesSemRepeticaoDeGrupo(pool, qtdNecessaria);

      for (const sel of selecionadas) {
        gruposGlobaisUsados.add(sel.grupo || sel.id);
        questoesExame.push(sel);
      }
    } catch (e) {
      console.warn(`Erro ao carregar subtema ${chaveSubtema} para exame`, e);
    }
  }

  // Se faltarem questões para atingir o total desejado (ex: 40), preenche com outras perguntas
  if (questoesExame.length < config.totalQuestoes) {
    const todas = await carregarTodasPerguntas();
    const restantes = todas.filter((p) => !questoesExame.some((q) => q.id === p.id));
    const extras = baralharArray(restantes).slice(0, config.totalQuestoes - questoesExame.length);
    questoesExame.push(...extras);
  }

  // Baralha as 40 questões para simular exame real sem ordem fixa por subtema
  const questoesFinais = baralharArray(questoesExame).slice(0, config.totalQuestoes);

  return {
    questoes: questoesFinais,
    config,
  };
}

/**
 * Gera questões para o Modo Treino (pode filtrar por subtema específico ou geral)
 */
export async function gerarQuestoesTreino(subtemaFiltro?: string): Promise<Pergunta[]> {
  if (subtemaFiltro && subtemaFiltro !== 'todos') {
    const questoes = await carregarPerguntasSubtema(subtemaFiltro);
    return baralharArray(questoes);
  }

  const todas = await carregarTodasPerguntas();
  return baralharArray(todas);
}
