import { IdiomaCodigo, TextoTraduzido } from '../types';

export const IDIOMAS_DISPONIVEIS: { codigo: IdiomaCodigo; nome: string; bandeira: string; nativo: string }[] = [
  { codigo: 'pt', nome: 'Português', bandeira: '🇲🇿', nativo: 'Português' },
  { codigo: 'en', nome: 'English', bandeira: '🇬🇧', nativo: 'English' },
  { codigo: 'ch', nome: 'Changana', bandeira: '🇲🇿', nativo: 'Xichangana' },
];

export const IDIOMA_PADRAO: IdiomaCodigo = 'pt';
export const CHAVE_STORAGE_IDIOMA = 'inatro_simulador_idioma';

/**
 * Traduz um objeto de texto para o idioma selecionado com fallback para português.
 */
export function traduzirTexto(obj: TextoTraduzido | null | undefined, lang: IdiomaCodigo): string {
  if (!obj) return '';
  if (obj[lang] && typeof obj[lang] === 'string' && obj[lang].trim() !== '') {
    return obj[lang];
  }
  if (obj.pt && typeof obj.pt === 'string') {
    return obj.pt;
  }
  if (obj.en && typeof obj.en === 'string') {
    return obj.en;
  }
  const keys = Object.keys(obj);
  return keys.length > 0 ? String(obj[keys[0]]) : '';
}

/**
 * Dicionário central de interface traduzido em pt, en e ch.
 */
export const DICIONARIO_UI: Record<string, TextoTraduzido> = {
  nomeApp: {
    pt: 'Simulador de Exame Teórico INATRO',
    en: 'INATRO Theoretical Exam Simulator',
    ch: 'Xikambelo xa Mahanyelo ya Movha INATRO',
  },
  subtituloApp: {
    pt: 'Instituto Nacional dos Transportes Rodoviários de Moçambique',
    en: 'National Road Transport Institute of Mozambique',
    ch: 'Mfumo wa Switirho swa Magondzo wa le Mozambiki',
  },
  convidado: {
    pt: 'Candidato Convidado',
    en: 'Guest Candidate',
    ch: 'Muchayeri Muyeni',
  },
  identificar: {
    pt: 'Identificar-me',
    en: 'Identify Profile',
    ch: 'Titive (Pfunani)',
  },
  editarIdentificacao: {
    pt: 'Alterar Candidato',
    en: 'Change Candidate',
    ch: 'Cinca Vito ra Muchayeri',
  },
  iniciarExame: {
    pt: 'Iniciar Exame Oficial',
    en: 'Start Official Exam',
    ch: 'Sungula Xikambelo xa Ntiyiso',
  },
  descIniciarExame: {
    pt: '40 perguntas sorteadas com cronómetro de 30 minutos, igual ao exame oficial do INATRO.',
    en: '40 randomized questions with a 30-minute timer, mirroring official INATRO testing.',
    ch: 'Swivutiso swa 40 leswi avanyisiweke ni nkarhi wa 30 wa timinete ku fana ni le INATRO.',
  },
  modoTreino: {
    pt: 'Modo Treino Livre',
    en: 'Free Practice Mode',
    ch: 'Modo ya Kuringetela (Treino)',
  },
  descModoTreino: {
    pt: 'Pratica sem limite de tempo, com correção imediata e explicações detalhadas por pergunta.',
    en: 'Practice with no timer, immediate answer feedback, and detailed explanations per question.',
    ch: 'Ringetela handle ka nkarhi, u vona nhlamulo ya kona hi xikan’we ni nhlamuselo.',
  },
  historico: {
    pt: 'Histórico & Desempenho',
    en: 'History & Performance',
    ch: 'Matimu ni Matimba ya Wena',
  },
  descHistorico: {
    pt: 'Consulta as tuas notas anteriores, taxa de aprovação e evolução ao longo dos testes.',
    en: 'Review previous scores, overall passing rate, and progress over practice attempts.',
    ch: 'Languta tinomboro ta wena ta khale, ku phumelela ka wena ni nhluvuko.',
  },
  bancoQuestoes: {
    pt: 'Banco de Questões',
    en: 'Question Bank',
    ch: 'Ndhawu ya Swivutiso',
  },
  descBancoQuestoes: {
    pt: 'Explora os 6 temas e 18 subtemas do Código da Estrada com sinalização completa.',
    en: 'Explore all 6 categories and 18 road code subthemes with full sign illustrations.',
    ch: 'Kambisisa swiyimo swa 6 ni swiphemu swa 18 swa milawu ya le gondzweni.',
  },
  tempoRestante: {
    pt: 'Tempo Restante',
    en: 'Time Remaining',
    ch: 'Nkarhi lowu Saleke',
  },
  questao: {
    pt: 'Questão',
    en: 'Question',
    ch: 'Xivutiso',
  },
  de: {
    pt: 'de',
    en: 'of',
    ch: 'xa',
  },
  anterior: {
    pt: 'Anterior',
    en: 'Previous',
    ch: 'Ndzhaku',
  },
  proxima: {
    pt: 'Próxima',
    en: 'Next',
    ch: 'Emahlweni',
  },
  finalizar: {
    pt: 'Finalizar Exame',
    en: 'Submit & Finish',
    ch: 'Hetisa Xikambelo',
  },
  confirmarFinalizar: {
    pt: 'Tens a certeza de que desejas entregar e finalizar o exame agora?',
    en: 'Are you sure you want to submit and complete the exam now?',
    ch: 'U tiyisile leswaku u lava ku nyikela ni ku hetisa xikambelo sweswi?',
  },
  tempoEsgotado: {
    pt: 'Tempo esgotado! O exame foi finalizado automaticamente.',
    en: 'Time expired! The exam was automatically finalized.',
    ch: 'Nkarhi wu herile! Xikambelo xi pfalekile hi xoxe.',
  },
  resultado: {
    pt: 'Resultado do Exame',
    en: 'Exam Results',
    ch: 'Mbuyelo wa Xikambelo',
  },
  aprovado: {
    pt: 'APROVADO',
    en: 'PASSED',
    ch: 'U PHUMELERILE',
  },
  reprovado: {
    pt: 'REPROVADO',
    en: 'FAILED',
    ch: 'U TSANDZEKILE',
  },
  parabens: {
    pt: 'Parabéns! Estás preparado para o exame oficial de condução do INATRO.',
    en: 'Congratulations! You are well prepared for the official INATRO driving test.',
    ch: 'Hakunene! U lulamile kahle ku tsala xikambelo xa le INATRO.',
  },
  precisaPraticar: {
    pt: 'Ainda não atingiste a pontuação mínima (30/40). Continua a treinar e revê as tuas respostas.',
    en: 'You did not meet the minimum passing score (30/40). Keep training and review your mistakes.',
    ch: 'A wu si fikelela tinomboro ta le hansi (30/40). Ya emahlweni u ringetela u languta swihoxo.',
  },
  notaFinal: {
    pt: 'Nota Final',
    en: 'Final Score',
    ch: 'Tinomboro ta Makumu',
  },
  certas: {
    pt: 'Respostas Certas',
    en: 'Correct Answers',
    ch: 'Tinhlamulo Letinene',
  },
  erradas: {
    pt: 'Respostas Erradas',
    en: 'Wrong Answers',
    ch: 'Tinhlamulo ta Swihoxo',
  },
  tempoGasto: {
    pt: 'Tempo Utilizado',
    en: 'Time Elapsed',
    ch: 'Nkarhi lowu Tirhisiweke',
  },
  verRevisao: {
    pt: 'Ver Revisão Completa',
    en: 'Review All Answers',
    ch: 'Langutisa Tinhlamulo Hinkwato',
  },
  repetirExame: {
    pt: 'Repetir Exame',
    en: 'Retake Exam',
    ch: 'Phinda Xikambelo',
  },
  voltarInicio: {
    pt: 'Voltar ao Início',
    en: 'Return Home',
    ch: 'Tlhelela eKaya',
  },
  revisaoExame: {
    pt: 'Revisão do Exame',
    en: 'Exam Review',
    ch: 'Ku Languta Nakambe ka Xikambelo',
  },
  todas: {
    pt: 'Todas',
    en: 'All',
    ch: 'Hinkwaswo',
  },
  apenasErradas: {
    pt: 'Apenas Erradas',
    en: 'Only Mistakes',
    ch: 'Swihoxo Ntsena',
  },
  apenasCertas: {
    pt: 'Apenas Certas',
    en: 'Only Correct',
    ch: 'Letinene Ntsena',
  },
  suaResposta: {
    pt: 'A tua resposta',
    en: 'Your answer',
    ch: 'Nhlamulo ya wena',
  },
  respostaCorreta: {
    pt: 'Resposta correta',
    en: 'Correct answer',
    ch: 'Nhlamulo ya ntiyiso',
  },
  explicacao: {
    pt: 'Explicação Regulamentar',
    en: 'Regulatory Explanation',
    ch: 'Nhlamuselo ya Nawu',
  },
  semResposta: {
    pt: 'Não respondida',
    en: 'Unanswered',
    ch: 'A yi hlamuriwanga',
  },
  limparHistorico: {
    pt: 'Limpar Todo o Histórico',
    en: 'Clear All History',
    ch: 'Sula Matimu Hinkwawo',
  },
  confirmarLimpeza: {
    pt: 'Tens a certeza de que desejas apagar todas as tentativas registadas?',
    en: 'Are you sure you want to permanently erase all recorded attempts?',
    ch: 'U tiyisile leswaku u lava ku sula matimu hinkwawo ya ku ringetela?',
  },
  semHistorico: {
    pt: 'Ainda não tens nenhuma tentativa gravada. Começa já um exame ou treino!',
    en: 'No recorded attempts yet. Start an exam or practice session now!',
    ch: 'A ku si va ni matimu ya xikambelo. Sungula xikambelo kumbe kuringetela!',
  },
  estatisticas: {
    pt: 'Resumo Estatístico',
    en: 'Statistical Summary',
    ch: 'Nkatsakanyo wa Matimba',
  },
  totalTentativas: {
    pt: 'Total de Testes',
    en: 'Total Tests Taken',
    ch: 'Swikambelo Hinkwaswo',
  },
  taxaAprovacao: {
    pt: 'Taxa de Aprovação',
    en: 'Pass Rate',
    ch: 'Ku Phumelela (%)',
  },
  melhorNota: {
    pt: 'Melhor Nota',
    en: 'Best Score',
    ch: 'Tinomboro ta le Henhla',
  },
  mediaGeral: {
    pt: 'Média de Pontuação',
    en: 'Average Score',
    ch: 'Xikarhi ka Tinomboro',
  },
  identificacaoCandidato: {
    pt: 'Identificação do Candidato',
    en: 'Candidate Identification',
    ch: 'Vito ni Nomboro ya Muchayeri',
  },
  nomeCompleto: {
    pt: 'Nome Completo',
    en: 'Full Name',
    ch: 'Vito Hinkwaro',
  },
  exemploNome: {
    pt: 'Ex: Amosse Cumbane',
    en: 'e.g., Amosse Cumbane',
    ch: 'Xik: Amosse Cumbane',
  },
  numeroCandidato: {
    pt: 'N.º de Candidato / BI (Opcional)',
    en: 'Candidate ID / National ID (Optional)',
    ch: 'Nomboro ya BI kumbe ya Xikolo (Opcional)',
  },
  exemploNumero: {
    pt: 'Ex: 1102938472M',
    en: 'e.g., 1102938472M',
    ch: 'Xik: 1102938472M',
  },
  salvarIdentificacao: {
    pt: 'Guardar Identificação',
    en: 'Save Profile',
    ch: 'Hlayisa Vito',
  },
  continuarComoConvidado: {
    pt: 'Continuar como Convidado',
    en: 'Continue as Guest',
    ch: 'Famba tanihi Muyeni',
  },
  notaOpcional: {
    pt: 'A identificação é totalmente opcional e fica guardada apenas no teu navegador (localStorage).',
    en: 'Identification is fully optional and saved only locally inside your browser (localStorage).',
    ch: 'Ku tsala vito a swi bohi; swi hlayisiwa ka foni kumbe computer ya wena ntsena.',
  },
  treinoFiltroTema: {
    pt: 'Filtrar por Subtema',
    en: 'Filter by Subtheme',
    ch: 'Hlawula Xiyimo (Subtema)',
  },
  todosOsTemas: {
    pt: 'Todos os Subtemas (Treino Geral)',
    en: 'All Subthemes (Comprehensive Practice)',
    ch: 'Swiyimo Hinkwaswo',
  },
  verificarImediato: {
    pt: 'Correção instantânea ativada',
    en: 'Instant correction enabled',
    ch: 'Nhlamulo ya xikan’we yi pfuriwile',
  },
  corretoMsg: {
    pt: 'Resposta Correta! Muito bem.',
    en: 'Correct Answer! Well done.',
    ch: 'I Ntiyiso! U hlulile.',
  },
  incorretoMsg: {
    pt: 'Resposta Incorreta! Observa a solução explicada abaixo.',
    en: 'Incorrect Answer! Check the explanation below.',
    ch: 'Xihoxo! Languta nhlamuselo leyi nga hansi.',
  },
  regraDistribuicao: {
    pt: 'Norma INATRO: Mínimo 30 respostas certas em 40 (75%) para aprovação.',
    en: 'INATRO Rule: Minimum 30 correct out of 40 (75%) to pass.',
    ch: 'Nawu wa INATRO: Swivutiso swa 30 ka 40 (75%) swi fanele ku lulama ku phumelela.',
  },
  modoOffline: {
    pt: '100% Offline e Seguro',
    en: '100% Offline & Private',
    ch: 'A swi lavi Neti (Offline)',
  },
  descOffline: {
    pt: 'Sem servidores, sem necessidade de internet após carregar.',
    en: 'No server dependency, works completely offline once loaded.',
    ch: 'A swi lavi data ya Internet endzhaku ka ku pfuleka.',
  },
  selecionarOpcaoAviso: {
    pt: 'Por favor, seleciona uma das opções antes de prosseguir.',
    en: 'Please select an option before proceeding.',
    ch: 'Hi kombela u hlawula nhlamulo u nga si hundza.',
  },
  naoRespondida: {
    pt: 'Não respondida',
    en: 'Unanswered',
    ch: 'A yi hlamuriwanga',
  },
  questoesRespondidas: {
    pt: 'Respondidas',
    en: 'Answered',
    ch: 'Leti hlamuriweke',
  },
  aulasTeoricas: {
    pt: 'Aulas Teóricas',
    en: 'Theory Lessons',
    ch: 'Tidyondzo ta Mahanyelo',
  },
  descAulasTeoricas: {
    pt: 'Aprende todas as regras do Código da Estrada moçambicano organizadas por módulos didáticos com ilustrações e dicas de ouro.',
    en: 'Learn all Mozambican Highway Code rules organized into study modules with diagrams and exam tips.',
    ch: 'Dyondza milawu hinkwayo ya magondzo ya le Mozambiki hi swifaniso ni switsundzuxo swa ntiyiso.',
  },
  modulo: {
    pt: 'Módulo',
    en: 'Module',
    ch: 'Xiyimo',
  },
  dicaExame: {
    pt: 'Dica de Exame INATRO',
    en: 'INATRO Exam Tip',
    ch: 'Xitsundzuxo xa Xikambelo',
  },
  praticarModulo: {
    pt: 'Treinar Este Tema',
    en: 'Practice this Topic',
    ch: 'Ringetela ka Xiyimo lexi',
  },
};
