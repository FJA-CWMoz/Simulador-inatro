import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIdioma } from '../hooks/useIdioma';

interface TopicoAula {
  titulo: { pt: string; en: string; ch: string };
  conteudo: { pt: string; en: string; ch: string };
  dicaExame?: { pt: string; en: string; ch: string };
  icone?: string;
  pontosChave?: { pt: string[]; en: string[]; ch: string[] };
}

interface ModuloAula {
  id: string;
  numero: number;
  titulo: { pt: string; en: string; ch: string };
  icone: string;
  subtemaFiltro: string;
  cor: string;
  resumo: { pt: string; en: string; ch: string };
  topicos: TopicoAula[];
}

export const Aulas: React.FC = () => {
  const { t, idioma } = useIdioma();
  const [moduloAtivo, setModuloAtivo] = useState<number>(0);
  const [termoBusca, setTermoBusca] = useState<string>('');

  const modulos: ModuloAula[] = [
    {
      id: 'sinalizacao',
      numero: 1,
      titulo: {
        pt: 'Sinalização Rodoviária Completa',
        en: 'Complete Road Signs & Signals',
        ch: 'Swikombiso swa le Magondzweni Hinkwaswo',
      },
      icone: 'fa-solid fa-traffic-light',
      subtemaFiltro: 'sinalizacao/perigo',
      cor: 'from-blue-600 to-indigo-700',
      resumo: {
        pt: 'Hierarquia jurídica dos sinais, formatos geométricos, cores regulamentares, semáforos e marcas rodoviárias no Código de Estrada de Moçambique.',
        en: 'Legal hierarchy of road signals, geometric formats, colors, traffic lights, and pavement lines in Mozambique Highway Code.',
        ch: 'Matimba ya swikombiso, swivumbeko, mivala, ti-semáforo ni tilayini ta le hansi ka gondzo.',
      },
      topicos: [
        {
          titulo: {
            pt: 'Hierarquia Oficial dos Sinais de Trânsito',
            en: 'Official Traffic Sign Hierarchy',
            ch: 'Ndlela ya Matimba ya Swikombiso',
          },
          conteudo: {
            pt: 'No Código de Estrada de Moçambique, quando existem instruções contraditórias na via pública, a lei estabelece uma hierarquia rigorosa que deve ser respeitada por todos os condutores:\n\n1.º Ordens e Gestos dos Agentes da Autoridade (Polícia de Trânsito / PRM) — Prevalecem sobre TODAS as outras regras e sinais, incluindo semáforos verdes ou vermelhos!\n2.º Sinalização Temporária e de Obras — Prevalece sobre os sinais permanentes da via.\n3.º Sinalização Luminosa (Semáforos) — Regula a passagem e prevalece sobre sinais verticais.\n4.º Sinais Verticais (Perigo, Cedência, Proibição, Obrigação, Indicação).\n5.º Marcas Rodoviárias no Pavimento (Linhas contínuas, descontínuas, zebrados).\n6.º Regras Gerais do Código da Estrada (ex: regra da prioridade à direita).',
            en: 'Under Mozambican Road Law, when contradictory instructions appear, this exact hierarchy applies:\n1st Traffic Police Orders (prevail over everything);\n2nd Temporary roadwork signage;\n3rd Traffic lights;\n4th Vertical signs (Danger, Prohibitory, Mandatory);\n5th Road surface pavement markings;\n6th General Highway Code rules.',
            ch: 'Loko ku ri na swikombiso swo hambana:\n1º Swileriso swa Maphorisa (swi hlula hinkwaswo);\n2º Swikombiso swa Mintirho ya Gondzo;\n3º Semáforo;\n4º Swikombiso swa Puleki;\n5º Tilayini ta le hansi ka gondzo;\n6º Milawu ya xinene.',
          },
          dicaExame: {
            pt: 'Pergunta frequente no INATRO: "Se o semáforo estiver VERDE mas o agente de trânsito levantar a mão mandando parar, o que faz?" Resposta: PARAR! A ordem do agente de autoridade está no topo absoluto da hierarquia.',
            en: 'Frequent INATRO trap: If the light is GREEN but the police officer signals STOP, you must STOP! Police orders rank top.',
            ch: 'Xivutiso xa ntolovelo: Loko semáforo ri ri rihlaza kambe phorisa ri ku "yima", u fanele ku YIMA. Rito ra phorisa ri hlula semáforo!',
          },
          icone: 'fa-solid fa-ranking-star',
          pontosChave: {
            pt: ['Agente > Sinal Temporário > Semáforo > Sinal Vertical > Marca no Chão > Regra Geral'],
            en: ['Officer > Temporary > Traffic Light > Vertical Sign > Road Markings > General Rules'],
            ch: ['Phorisa > Ntirho > Semáforo > Puleki > Layini > Nawu wa Tiko'],
          },
        },
        {
          titulo: {
            pt: 'Tipos, Formas e Cores dos Sinais Verticais',
            en: 'Shapes, Colors & Categories of Vertical Signs',
            ch: 'Swivumbeko ni Mivala ya Swikombiso',
          },
          conteudo: {
            pt: '• Sinais de Perigo (Série A): Triangulares com vértice para cima, orla vermelha e fundo branco. Alertam com antecedência sobre perigos futuros na via (curvas perigosas, lombas, estreitamentos, passadeiras adiante).\n• Sinais de Proibição (Série C): Circulares com orla vermelha e fundo branco ou azul. Impõem vedações a partir da localização do sinal (sentido proibido, ultrapassagem proibida, limites de velocidade).\n• Sinais de Obrigação (Série D): Circulares com fundo azul e símbolos brancos. Ordenam comportamentos mandatórios (sentido giratório, via obrigatória para ciclistas, velocidade mínima).\n• Sinais de Cedência de Passagem (Série B): Formatos especiais como o B1 (triângulo invertido para baixo) e o B2 STOP (octógono de 8 lados vermelho com inscrição STOP branca).\n• Sinais de Informação e Indicação (Série H): Retangulares ou quadrados com fundo azul, verde ou branco.',
            en: '• Warning Signs: Triangular, apex up, red border, white field.\n• Prohibitory Signs: Circular, red border, white/blue center.\n• Mandatory Signs: Circular, blue background with white icons.\n• Priority Signs: Inverted triangle (Yield B1) and 8-sided red octagon (STOP B2).\n• Information Signs: Rectangles or squares with blue/green/white grounds.',
            ch: '• Khombo: Tinhla tinharhu ni rimba ro tshwuka.\n• Ku Yirisa: Xirhendzevutana xo tshwuka.\n• Ku Boheka: Xirhendzevutana xa wasi ni mfungho wo basa.\n• STOP: Xirhendzevutana xa 8 wa matlhelo xo tshwuka.\n• Mahungu: Puleki ya wasi kumbe ya rihlaza.',
          },
          dicaExame: {
            pt: 'O sinal de STOP (B2) exige SEMPRE a imobilização COMPLETA das quatro rodas antes da linha de paragem no chão, mesmo que a estrada esteja totalmente deserta! Não basta abrandar.',
            en: 'The STOP sign (B2) ALWAYS mandates a complete vehicle standstill behind the line, even on an empty road.',
            ch: 'STOP yi lava ku yimisa mavhilwa hinkwawo ya 4 ma rhula hi ku helela, hambi ku hava munhu!',
          },
          icone: 'fa-solid fa-shapes',
        },
        {
          titulo: {
            pt: 'Marcas no Pavimento e Linhas Regulamentares',
            en: 'Pavement Markings and Continuous Lines',
            ch: 'Layini ya le Hansi ka Gondzo',
          },
          conteudo: {
            pt: '• Linha Contínua (M1): É terminantemente PROIBIDO pisar, transpor ou circular sobre ela. Separa sentidos de trânsito em curvas, lombas e pontes.\n• Linha Descontínua (M2): Pode ser transposta para efetuar ultrapassagens ou mudanças de direção, desde que em perfeita segurança.\n• Linha Mista (M3): Composta por uma contínua e uma descontínua lado a lado. O condutor deve obedecer APENAS à linha que estiver mais próxima do seu sentido de condução!\n• Linha Amarela Contínua junto à Berma: Proíbe terminantemente a PARAGEM e o ESTACIONAMENTO.\n• Linha Amarela Descontínua junto à Berma: Proíbe o ESTACIONAMENTO, mas permite a PARAGEM rápida para entrada/saída de passageiros.',
            en: '• Solid White Line: Strictly forbidden to cross or step on.\n• Broken White Line: May be crossed when safe to overtake.\n• Mixed Line: Obey the line closest to your lane.\n• Solid Yellow Curb Line: Prohibits both stopping and parking.\n• Broken Yellow Curb Line: Prohibits parking, allows brief passenger stop.',
            ch: '• Layini leyi Pfariweke: A yi kandziyeki hambi ku tsemakanyiwa.\n• Layini ya Swiphemu: U nga yi tsemakanya ku hundza hi vuhlayiseki.\n• Tilayini Timbirhi: Landzela leyi nga tlhelo ra wena.\n• Layini ya Xitshopana leyi Pfariweke: A swi pfumeleriwi ku yima hambi ku paka.\n• Layini ya Xitshopana ya Swiphemu: U nga yimela munhu a nghena.',
          },
          icone: 'fa-solid fa-road',
        },
      ],
    },
    {
      id: 'prioridade',
      numero: 2,
      titulo: {
        pt: 'Prioridade de Passagem & Cruzamentos',
        en: 'Right-of-Way & Intersection Rules',
        ch: 'Ku Nyika Ndlela ni Rotundas',
      },
      icone: 'fa-solid fa-arrows-split-up-and-left',
      subtemaFiltro: 'prioridade/cruzamentos',
      cor: 'from-amber-600 to-orange-700',
      resumo: {
        pt: 'A regra geral da direita em Moçambique, resolução de cruzamentos com múltiplos veículos (A, B, C) e regras em rotundas.',
        en: 'General priority to the right, multi-car crossing resolutions (Car A, B, C), and roundabout maneuvers.',
        ch: 'Nawu wa priority ya xinene, mahlanganelo ya mimovha ya yitalo ni ku chayela eka rotunda.',
      },
      topicos: [
        {
          titulo: {
            pt: 'A Regra Geral da Direita e as 4 Exceções',
            en: 'The Right-Hand Priority Rule & 4 Exceptions',
            ch: 'Nawu wa Xinene ni Swihlawulekiso swa 4',
          },
          conteudo: {
            pt: 'Em qualquer cruzamento ou entroncamento sem sinalização que dite o contrário, o condutor DEVE ceder a passagem a todos os veículos que se apresentem pela sua DIREITA.\n\nContudo, perdem a prioridade da direita os seguintes veículos:\n1. Veículos prioritários de emergência em marcha urgente (ambulâncias, bombeiros, polícia com sirene e luzes azuis ligadas);\n2. Veículos sobre carris (comboios têm prioridade absoluta);\n3. Veículos que saiam de caminhos particulares, garagens, postos de abastecimento ou parques de estacionamento;\n4. Veículos que estejam a aceder a uma autoestrada pela via de aceleração.',
            en: 'At unsignaled crossings, drivers must yield to vehicles approaching from their RIGHT.\n\nVehicles that LOSE priority from the right:\n1. Emergency responders with sirens and lights;\n2. Rail vehicles (trains have absolute right-of-way);\n3. Vehicles entering from private alleys, garages, or gas stations;\n4. Vehicles merging into motorways.',
            ch: 'Ka mahlanganelo lama nga riki na xikombiso, nyika ndlela movha lowu humaka XINENE.\n\nKambe va lahlekeriwa hi priority:\n1. Ambulância ni maphorisa loko va duma;\n2. Switimela;\n3. Lava humaka emakaya kumbe eka garaji;\n4. Lava nghenaka ka autoestrada.',
          },
          dicaExame: {
            pt: 'Ao virar à ESQUERDA num cruzamento, deves ceder passagem TANTO aos veículos que vêm em sentido contrário (em frente) como aos veículos que se apresentam pela tua DIREITA!',
            en: 'Turning left requires yielding to oncoming straight traffic AND vehicles on your right!',
            ch: 'Loko u jikela ximatsi, nyika ndlela movha lowu taka emahlweni ni lowu humaka xinene!',
          },
          icone: 'fa-solid fa-code-fork',
        },
        {
          titulo: {
            pt: 'Cruzamento com Três Veículos (A, B e C)',
            en: 'Three-Vehicle Intersection Resolution (A, B, C)',
            ch: 'Mahlanganelo ya Mimovha Minharhu (A, B, C)',
          },
          conteudo: {
            pt: 'Como resolver uma questão de prioridade com 3 carros no exame INATRO:\n• Passo 1: Verifica se existe algum sinal de cedência (STOP ou Triângulo de Cedência) em alguma das vias.\n• Passo 2: Se não houver sinais, aplica a regra da direita: procura qual dos veículos tem a direita LIVRE de qualquer outro veículo.\n• Passo 3: O veículo com a direita livre arranca em primeiro lugar!\n• Passo 4: Após a saída do primeiro, a direita do segundo veículo fica desimpedida, e assim sucessivamente.',
            en: 'How to solve a 3-car priority question:\n1. Check for STOP or Yield signs;\n2. If none, check which vehicle has an open, free RIGHT lane;\n3. The vehicle with a free right moves first;\n4. The remaining cars proceed in turn as their right clears.',
            ch: 'Ndlela yo lulamisa mimovha minharhu:\n1. Languta loko ku ri na xikombiso xa STOP;\n2. Loko ku hava, kuma movha lowu nga riki na munhu XINENE ka wona;\n3. Lowu wu rhangaka wu famba;\n4. Lava saleke va landzelana.',
          },
          icone: 'fa-solid fa-route',
        },
        {
          titulo: {
            pt: 'Circulação Correta em Rotundas',
            en: 'Proper Navigation in Roundabouts',
            ch: 'Ku Chayela Kahle ka Rotunda',
          },
          conteudo: {
            pt: '• Prioridade no Anel: Quem já circula DENTRO da rotunda tem prioridade sobre quem pretende aceder a ela.\n• Primeira Saída: O condutor que pretende sair na 1.ª saída deve ocupar a via mais à direita desde a entrada e acionar o pisca direito.\n• Saídas Seguintes ou Inversão: O condutor que pretende sair em saídas posteriores deve ocupar a via mais à esquerda (interior do anel), com o pisca esquerdo ligado, e só passar para a via da direita imediatamente após ultrapassar a saída anterior à que deseja tomar.',
            en: '• Ring Priority: Vehicles already inside have priority over entering cars.\n• 1st Exit: Enter and stay on right lane with right indicator.\n• Later Exits / U-Turns: Enter and stay on inside lane with left indicator, shift to outside lane after passing previous exit.',
            ch: '• Priority: Movha lowu nga endzeni wu na priority eka lowu nghenaka.\n• Xikotelo xo sungula: Famba tlhelo ra xinene u tshiva pisca ra xinene.\n• Swikotelo swa kule: Famba layini ya le xikarhi, u ya handle loko se ku sale xikotelo xa wena.',
          },
          icone: 'fa-solid fa-arrows-spin',
        },
      ],
    },
    {
      id: 'velocidade',
      numero: 3,
      titulo: {
        pt: 'Velocidade & Distâncias de Paragem',
        en: 'Speed Limits & Braking Distances',
        ch: 'Rivengo ni Mpfhuka wo Yimisa Movha',
      },
      icone: 'fa-solid fa-gauge-high',
      subtemaFiltro: 'velocidade/limites',
      cor: 'from-emerald-600 to-teal-700',
      resumo: {
        pt: 'Tabela oficial de limites no Código de Estrada de Moçambique, fórmula da paragem total e a regra dos dois segundos.',
        en: 'Official speed limit tables in Mozambique, total stopping distance formulas, and the two-second rule.',
        ch: 'Mimbimi ya rivengo le Moçambique ni ndlela yo yimisa movha hi vuhlayiseki.',
      },
      topicos: [
        {
          titulo: {
            pt: 'Quadro Oficial de Velocidades Máximas em Moçambique',
            en: 'Official Speed Matrix in Mozambique',
            ch: 'Mimbimi ya Rivengo eMoçambique',
          },
          conteudo: {
            pt: '1. Automóveis Ligeiros de Passageiros sem reboque:\n• Dentro das Localidades: 60 km/h\n• Fora das Localidades: 100 km/h\n• Autoestradas homologadas: 120 km/h\n\n2. Automóveis Pesados de Passageiros (Autocarros/Machimbombos):\n• Dentro das Localidades: 50 ou 60 km/h\n• Fora das Localidades: 80 km/h\n• Autoestradas: 100 km/h\n\n3. Automóveis Pesados de Mercadorias (Camions):\n• Dentro das Localidades: 50 km/h\n• Fora das Localidades: 80 km/h\n• Autoestradas: 90 km/h\n\n4. Motociclos com cilindrada superior a 50cc:\n• Dentro das Localidades: 60 km/h\n• Fora das Localidades: 90 km/h\n• Autoestradas: 100 km/h',
            en: '1. Light Passenger Cars:\n• Urban: 60 km/h\n• Rural: 100 km/h\n• Motorway: 120 km/h\n\n2. Heavy Buses:\n• Urban: 50-60 km/h\n• Rural: 80 km/h\n• Motorway: 100 km/h\n\n3. Heavy Trucks:\n• Urban: 50 km/h\n• Rural: 80 km/h\n• Motorway: 90 km/h\n\n4. Motorcycles > 50cc:\n• Urban: 60 km/h\n• Rural: 90 km/h\n• Motorway: 100 km/h',
            ch: '1. Mimovha Leyitsongo:\n• Endzeni ka doroba: 60 km/h\n• Ehandle: 100 km/h\n• Autoestrada: 120 km/h\n\n2. Mabazi ya Vanhu: 80 km/h ehandle\n3. Tikamioni: 80 km/h ehandle\n4. Swithuthuthu: 90 km/h ehandle',
          },
          dicaExame: {
            pt: 'Atenção à pergunta clássica: "O limite geral de 60 km/h dentro das localidades autoriza-te a conduzir a 60 km/h perto de uma escola?" NÃO! O condutor deve SEMPRE moderar especialmente a velocidade perante crianças, passadeiras e curvas cegas.',
            en: 'Exam Trap: The 60 km/h urban limit does NOT grant permission to drive 60 km/h near schools or crosswalks. Speed must be moderated.',
            ch: 'Kusuhi ni swikolo ni swibedlhela, u fanele ku hunguta rivengo swinene u kota ku yima xikan’we!',
          },
          icone: 'fa-solid fa-tachograph-digital',
        },
        {
          titulo: {
            pt: 'Fórmula da Paragem: Reação + Travagem',
            en: 'Total Stopping Distance: Reaction + Braking',
            ch: 'Mpfhuka wo Yimisa: Reacção + Travagem',
          },
          conteudo: {
            pt: 'Distância de Paragem Total = Distância de Reação + Distância de Travagem\n\n• Distância de Reação: Espaço percorrido pelo veículo desde o momento em que o condutor avista o obstáculo até começar a carregar no travão (média de 1 segundo). Aumenta significativamente com cansaço, álcool, telemóvel e medicamentos!\n• Distância de Travagem: Espaço percorrido desde o momento em que as pastilhas travam os discos até à imobilização total. Depende da velocidade ao quadrado, estado dos pneus, suspensão e piso da estrada.\n• Efeito Chuva: Em piso molhado ou com lama, a distância de travagem DUPLICA ou TRIPLICA e o risco de aquaplanagem dispara!',
            en: 'Stopping Distance = Reaction Distance + Braking Distance\n• Reaction: ~1 second delay from eyes to foot. Increases with alcohol and phone use.\n• Braking: Mechanical distance to halt. Doubles or triples in rainy conditions.',
            ch: 'Mpfhuka wa ku yima = Nkarhi wo ehleketa + Mpfhuka wa ku ba travão.\n• Reacção yi teka sekoni yin’we kambe ya leha loko u nwe byala.\n• Travagem yi tlula kambirhi loko gondzo ri tsakamile.',
          },
          icone: 'fa-solid fa-ruler-horizontal',
        },
      ],
    },
    {
      id: 'manobras',
      numero: 4,
      titulo: {
        pt: 'Manobras no Trânsito & Ultrapassagens',
        en: 'Traffic Maneuvers & Overtaking',
        ch: 'Ku Hundza Movha ni Ku Jika',
      },
      icone: 'fa-solid fa-car-burst',
      subtemaFiltro: 'seguranca/conduta',
      cor: 'from-cyan-600 to-blue-800',
      resumo: {
        pt: 'Regras rigorosas para ultrapassar em segurança, proibições de ultrapassagem, mudança de direção e paragem vs estacionamento.',
        en: 'Strict rules for safe overtaking, overtaking prohibitions, turning procedures, and stopping vs parking.',
        ch: 'Milawu yo hundza movha wun’wana, ku jika ni ku hambanisa ku yima ni ku paka.',
      },
      topicos: [
        {
          titulo: {
            pt: 'Regras de Ultrapassagem e Exceções pela Direita',
            en: 'Overtaking Rules & Right-Side Exceptions',
            ch: 'Ku Hundza Movha hi Xinene',
          },
          conteudo: {
            pt: '• Regra Geral: A ultrapassagem faz-se SEMPRE pela ESQUERDA.\n• Exceção Única pela Direita: É permitido ultrapassar pela direita quando o veículo à frente tiver assinalado claramente a intenção de virar à esquerda (pisca à esquerda) e tiver deixado espaço suficiente livre à sua direita.\n\nLocais onde a Ultrapassagem é ESTRITAMENTE PROIBIDA:\n1. Em curvas de visibilidade reduzida e lombas sem visibilidade;\n2. Imediatamente antes e sobre passadeiras de peões;\n3. Em cruzamentos e entroncamentos (salvo se tiver prioridade assinalada);\n4. Em passagens de nível ferroviárias;\n5. Perante linha longitudinal contínua ou sinal de proibição de ultrapassar (C14a).',
            en: '• General Rule: Overtake ONLY on the LEFT.\n• Sole Exception: Overtaking on the right is allowed if the front car is signaling a left turn and leaves ample room on the right.\n• Strictly Prohibited: Blind corners, crests, pedestrian crossings, unsignaled intersections, railway crossings, and across solid lines.',
            ch: '• Nawu: Hundza hi XIMATSI ntsena.\n• Swihlawulekiso: U nga hundza hi xinene ntsena loko movha wa phambheni wu kombisa ku jikela ximatsi.\n• A swi pfumeleriwi: Ka majiko ya khombo, ka passadeira, ka tilayini leti pfariweke.',
          },
          dicaExame: {
            pt: 'Se um condutor à tua frente parar antes de uma passadeira de peões, é TERMINANTEMENTE PROIBIDO ultrapassá-lo! Deves parar imediatamente atrás dele e garantir a segurança do peão.',
            en: 'If a car stops before a pedestrian crossing, NEVER overtake it! Stop behind it.',
            ch: 'Loko movha wu yimile ka passadeira ya vafambi va milenge, u nga tshuki u wu hundza!',
          },
          icone: 'fa-solid fa-arrows-left-right',
        },
        {
          titulo: {
            pt: 'Diferença entre Paragem e Estacionamento',
            en: 'Stopping vs Parking: Legal Differences',
            ch: 'Ku Hambanisa Ku Yima ni Ku Paka',
          },
          conteudo: {
            pt: '• Paragem: É a imobilização da viatura pelo tempo estritamente necessário para a entrada ou saída rápida de passageiros, ou para operações breves de carga ou descarga, desde que o condutor permaneça junto do veículo pronto a retirá-lo se perturbar o trânsito.\n• Estacionamento: É qualquer imobilização do veículo que não se enquadre no conceito de paragem, ou em que o condutor abandone o veículo.',
            en: '• Stopping: Brief halt strictly for passenger embarkation or unloading, with driver ready at the wheel.\n• Parking: Any halt beyond a brief stop, or where the driver leaves the car.',
            ch: '• Ku Yima: Ku yima nkarhi wutsongo ku nghenisa vanhu, muchayeri a nga sukanga.\n• Ku Paka: Ku yimisa movha u famba kumbe ku wu siya.',
          },
          icone: 'fa-solid fa-square-parking',
        },
      ],
    },
    {
      id: 'seguranca',
      numero: 5,
      titulo: {
        pt: 'Segurança Rodoviária & Equipamentos',
        en: 'Road Safety & Compulsory Equipment',
        ch: 'Vuhlayiseki ni Switirho swa Movha',
      },
      icone: 'fa-solid fa-shield-halved',
      subtemaFiltro: 'seguranca/equipamento',
      cor: 'from-rose-600 to-red-700',
      resumo: {
        pt: 'Equipamento obrigatório a bordo em Moçambique, colocação de triângulos, cintos de segurança e proteção de menores.',
        en: 'Mandatory on-board equipment in Mozambique, triangle placement distances, seatbelt laws, and child safety.',
        ch: 'Switirho swo boheka swa movha, matinhla-nharhu ya 30m, mabhandi ni vana.',
      },
      topicos: [
        {
          titulo: {
            pt: 'O Kit de Emergência Obrigatório em Moçambique',
            en: 'Mandatory Vehicle Emergency Kit in Mozambique',
            ch: 'Switirho swo Boheka eMoçambique',
          },
          conteudo: {
            pt: 'De acordo com a legislação do INATRO, todo o veículo automóvel que circula em território moçambicano deve estar equipado com:\n\n1. Dois Triângulos de pré-sinalização de perigo homologados:\n   - Em caso de avaria ou acidente, colocar a pelo menos 30 METROS da retaguarda do veículo, de modo a ser visível a pelo menos 100 METROS pelos outros condutores.\n2. Colete retrorrefletor de alta visibilidade:\n   - Deve ser guardado no habitáculo do veículo (nunca trancado na bagageira) e vestido ANTES de colocar os pés no asfalto!\n3. Extintor de incêndio carregado, com manómetro no verde e selo anual de inspeção válido.\n4. Roda sobresselente (pneu de estepe) em bom estado e calibrada, juntamente com macaco e chave de rodas.\n5. Caixa de primeiros socorros.',
            en: '1. Two warning triangles (placed 30m behind, visible from 100m away);\n2. High-visibility reflective vest (kept in cabin, put on BEFORE stepping out);\n3. Inspected fire extinguisher with gauge in green and valid seal;\n4. Inflated spare wheel with jack and lug wrench;\n5. First-aid kit.',
            ch: '1. Matinhla-nharhu mambirhi (2) ma vekiwa mpfhuka wa 30m ma vonaka hi 100m;\n2. Colete ro phatsima ri tshama endzeni ka movha;\n3. Extintor yo tima ndzilo leyi tirhaka;\n4. Vhilwa ra reserva, jeke ni chave de rodas;\n5. Bokisi ra mirhi.',
          },
          dicaExame: {
            pt: 'Onde deves guardar o colete refletor? No porta-luvas ou sob o assento! Se responderes "na mala do carro", erras a pergunta no INATRO, pois a lei exige que o condutor saia da viatura JÁ com o colete vestido.',
            en: 'Keep the vest in the cabin, NEVER locked in the trunk. The law demands you step out wearing it.',
            ch: 'Colete ri veke endzeni ka movha, a ri fanelanga ku pfaleriwa ka bagageira!',
          },
          icone: 'fa-solid fa-triangle-exclamation',
        },
        {
          titulo: {
            pt: 'Cintos de Segurança e Transporte de Menores',
            en: 'Seatbelts & Child Restraints',
            ch: 'Mabhandi ya Vuhlayiseki ni Vana',
          },
          conteudo: {
            pt: '• O cinto de segurança é OBRIGATÓRIO para o condutor e para TODOS os passageiros, quer nos bancos dianteiros quer nos traseiros.\n• Crianças com menos de 12 anos e menos de 135 cm devem viajar obrigatoriamente nos bancos de trás, acomodadas em cadeirinha de retenção homologada ao seu peso.\n• É proibido transportar crianças no colo de outro passageiro à frente.',
            en: '• Seatbelts are mandatory for all front and rear occupants.\n• Children under 12 and under 135 cm must ride in the rear using certified restraint seats.\n• Carrying children on laps is strictly illegal.',
            ch: '• Mabhandi ma bohiwa hi vanhu hinkwavo (phambheni ni ndzhaku).\n• Vana lava nga si fiki 12 wa malembe va tshama ndzhaku ka switulu swa vona.',
          },
          icone: 'fa-solid fa-child',
        },
      ],
    },
    {
      id: 'infracoes',
      numero: 6,
      titulo: {
        pt: 'Legislação, Álcool & Fiscalização',
        en: 'Laws, Alcohol Limits & Police Checks',
        ch: 'Milawu, Byala ni Tihlawulelo',
      },
      icone: 'fa-solid fa-gavel',
      subtemaFiltro: 'infracoes/leis',
      cor: 'from-purple-600 to-violet-800',
      resumo: {
        pt: 'Os 4 documentos obrigatórios na fiscalização rodoviária, regime legal de álcool e crime de desobediência por recusa ao bafómetro.',
        en: 'The 4 mandatory inspection documents, alcohol tolerance rules, and criminal disobedience for breathalyzer refusal.',
        ch: 'Mapapila ya 4 lama bohekaka, xikambelo xa byala ni nandzu wa desobediência.',
      },
      topicos: [
        {
          titulo: {
            pt: 'Os Quatro Documentos Obrigatórios na Fiscalização',
            en: 'The 4 Mandatory Driving Documents',
            ch: 'Mapapila ya 4 Lama Bohekaka',
          },
          conteudo: {
            pt: 'Ao ser mandado parar por agentes da Polícia de Trânsito ou fiscais do INATRO, o condutor deve obrigatoriamente exibir:\n1. Carta de Condução válida e adequada à categoria do veículo;\n2. Livrete ou Título de Registo de Propriedade do Veículo;\n3. Certificado de Inspeção Periódica Obrigatória dentro da validade;\n4. Apólice ou Certificado do Seguro Obrigatório de Responsabilidade Civil.',
            en: 'When signaled by Traffic Police or INATRO, present:\n1. Valid Driver\'s License matching vehicle category;\n2. Vehicle Registration / Logbook;\n3. Valid Periodic Inspection Certificate;\n4. Mandatory Third-Party Insurance Certificate.',
            ch: 'Loko maphorisa ma ku yimisa, komba:\n1. Carteira ya ku chayela leyi tirhaka;\n2. Livrete ra movha;\n3. Xitifiketi xa Inspeção;\n4. Seguro (Inxuranse) leyi tirhaka.',
          },
          icone: 'fa-solid fa-id-card',
        },
        {
          titulo: {
            pt: 'Álcool ao Volante & Crime de Desobediência Qualificada',
            en: 'Drunk Driving & Crime of Refusing Breathalyzer',
            ch: 'Byala ni Ku Ala ku Kamberiwa',
          },
          conteudo: {
            pt: '• Em Moçambique, a condução sob a influência do álcool é punida com coimas pesadas, apreensão da carta de condução e inibição de conduzir de 1 mês a 2 anos.\n• A RECUSA a submeter-se ao teste do bafómetro constitui CRIME DE DESOBEDIÊNCIA QUALIFICADA: o condutor é detido imediatamente pela autoridade policial e responde judicialmente perante o tribunal, sendo-lhe aplicada a penalidade máxima correspondente!',
            en: '• Driving under alcohol influence leads to license confiscation and driving bans.\n• REFUSING to blow into the breathalyzer is a CRIME OF DISOBEDIENCE: the driver is arrested immediately on the spot and tried in court!',
            ch: '• Ku chayela u nwe byala swi ku teka carteira u yirisiwa ku chayela.\n• Loko u ALA ku hefemula ka bafómetro, u wela ka nandzu wa vugevenga wa DESOBEDIÊNCIA: maphorisa ma ku khoma ma ku pfalela ejele xikan’we!',
          },
          dicaExame: {
            pt: 'Nunca recuses o teste de alcoolemia! A recusa não evita a punição, agrava-a para crime penal com detenção imediata.',
            en: 'Never refuse a breathalyzer test. Refusal escalates to immediate criminal arrest.',
            ch: 'U nga tshuki u ala bafómetro. Ku ala swi ku yisa ejele!',
          },
          icone: 'fa-solid fa-wine-bottle',
        },
      ],
    },
    {
      id: 'mecanica',
      numero: 7,
      titulo: {
        pt: 'Mecânica Elementar & Manutenção',
        en: 'Elementary Mechanics & Maintenance',
        ch: 'Swilo swa Injini ya Movha',
      },
      icone: 'fa-solid fa-wrench',
      subtemaFiltro: 'mecanica/motor',
      cor: 'from-slate-700 to-slate-900',
      resumo: {
        pt: 'Verificação do óleo de motor, luzes de emergência no painel, travões ABS, profundidade legal dos pneus (1,6 mm) e calibragem.',
        en: 'Engine oil dipstick checks, warning lights, ABS brake pulses, minimum tire depth (1.6mm), and cold pressure.',
        ch: 'Mafurha ya injini, travão, ABS ni ku pima mavhilwa (1,6 mm).',
      },
      topicos: [
        {
          titulo: {
            pt: 'Óleo do Motor & Avaria Crítica de Pressão',
            en: 'Engine Oil Check & Red Oil Warning Lamp',
            ch: 'Mafurha ya Injini ni Mboni yo Tshwuka',
          },
          conteudo: {
            pt: '• Como verificar o óleo: A viatura deve estar em piso plano e horizontal, com o motor completamente desligado e frio (ou repousado há 15 minutos). Retirar a vareta, limpar com pano limpo, recolocar até ao fundo e retirar novamente. O nível deve estar rigorosamente entre as marcas MÍN e MÁX.\n• Luz Vermelha da Almotolia de Óleo no Painel: Se esta luz acender com o carro em andamento, PARA IMEDIATAMENTE e DESLIGA O MOTOR! Indica falta crítica de pressão de óleo; continuar a marcha provocará a fusão do motor em menos de um minuto.',
            en: '• Checking oil: Park on flat ground with engine off and cold. Clean dipstick and re-insert. Oil must read between MIN and MAX.\n• Red Oil Lamp: PULL OVER AND SHUT ENGINE OFF IMMEDIATELY! Oil pressure has dropped and will seize the engine.',
            ch: '• Pima óleo lomu ku ololokeke, injini yi horile. Mafurha ma fanele ku va exikarhi ka MIN na MAX.\n• Loko mboni yo tshwuka ya xiketlele yi tshiva: YIMA XIKAN’WE U TIMA INJINI!',
          },
          dicaExame: {
            pt: 'Nunca abras a tampa do vaso de expansão do radiador com o motor quente! O líquido está a mais de 100 ºC sob alta pressão e causará jactos de vapor com queimaduras graves.',
            en: 'Never open the radiator cap when engine is hot. Boiling pressurized coolant will cause severe burns.',
            ch: 'U nga pfuli tampa ya mati ya radiador loko injini yi hisa!',
          },
          icone: 'fa-solid fa-oil-can',
        },
        {
          titulo: {
            pt: 'Pneus: Profundidade Mínima de 1,6 mm e Pressão a Frio',
            en: 'Tyres: 1.6 mm Tread Depth & Cold Calibration',
            ch: 'Mavhilwa: 1,6 mm ni Ku Chela Moya',
          },
          conteudo: {
            pt: '• Profundidade Mínima Legal: Para automóveis ligeiros em Moçambique, a profundidade mínima dos sulcos do pneu é de 1,6 MILÍMETROS em toda a banda de rodagem (indicada pelos ressaltos TWI nos canais).\n• Calibragem da Pressão: Deve ser verificada com os pneus a FRIO (sem terem rodado mais de 2 km).\n• Pressão Baixa: Desgasta os bordos exteriores (ombros) do pneu e aumenta consideravelmente o consumo de combustível.\n• Pressão Excessiva: Desgasta o centro da banda de rodagem e diminui a aderência ao solo.',
            en: '• Minimum Tread Depth: 1.6 mm across the tire circumference.\n• Calibration: Check tires while COLD.\n• Low Pressure: Wears shoulder edges and increases fuel consumption.\n• Over-Inflation: Wears center band and reduces road grip.',
            ch: '• Mpfhuka wa le hansi wa mavhilwa i 1,6 mm.\n• Chela moya mavhilwa ma ha HORILE.\n• Moya wutsongo wu vanga ku hela ka mavhilwa hi tlhelo.',
          },
          icone: 'fa-solid fa-circle-notch',
        },
      ],
    },
  ];

  const moduloSelecionado = modulos[moduloAtivo] || modulos[0];

  // Filtro de tópicos se houver busca
  const topicosFiltrados = moduloSelecionado.topicos.filter((topico) => {
    if (!termoBusca.trim()) return true;
    const busca = termoBusca.toLowerCase();
    const titulo = (topico.titulo[idioma] || topico.titulo.pt).toLowerCase();
    const conteudo = (topico.conteudo[idioma] || topico.conteudo.pt).toLowerCase();
    return titulo.includes(busca) || conteudo.includes(busca);
  });

  return (
    <div className="space-y-6 pb-20 sm:pb-8 animate-in fade-in duration-200">
      {/* Cabeçalho da Seção de Aulas com Brasão e Identidade */}
      <section className="bg-gradient-to-br from-[#35495E] via-[#283848] to-[#1c2733] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EFBAAE] text-xs font-black border border-white/15 shadow-sm">
            <span className="text-xs">🇲🇿</span>
            <span>Manual Teórico Oficial • INATRO Moçambique</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            {t('aulasTeoricas')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Estuda os 7 módulos do Código da Estrada moçambicano com explicações didáticas, ilustrações regulamentares e as dicas de ouro para passares à primeira no exame do INATRO.
          </p>
        </div>

        {/* Barra de pesquisa rápida nas aulas */}
        <div className="mt-5 relative z-10 max-w-md">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input
              type="text"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="Pesquisar regras, sinais, velocidades..."
              className="w-full pl-9 pr-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-slate-300 focus:bg-white focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#EFBAAE] transition shadow-inner"
            />
            {termoBusca && (
              <button
                type="button"
                onClick={() => setTermoBusca('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-300 hover:text-white"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Seletor de Módulos (Tabs Horizontais Mobile-Friendly) */}
      <section className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {modulos.map((mod, idx) => {
          const ativo = idx === moduloAtivo;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => {
                setModuloAtivo(idx);
                setTermoBusca('');
              }}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer shrink-0 active:scale-95 shadow-sm border ${
                ativo
                  ? 'bg-[#35495E] text-white border-[#35495E] shadow-md ring-2 ring-[#35495E]/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <i className={`${mod.icone} text-xs ${ativo ? 'text-[#EFBAAE]' : 'text-slate-400'}`}></i>
              <span>
                {mod.numero}. {mod.titulo[idioma] || mod.titulo.pt}
              </span>
            </button>
          );
        })}
      </section>

      {/* Conteúdo do Módulo Ativo */}
      <section className="space-y-6">
        {/* Banner do Módulo */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              {t('modulo')} {moduloSelecionado.numero} de {modulos.length}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              {moduloSelecionado.titulo[idioma] || moduloSelecionado.titulo.pt}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-medium">
              {moduloSelecionado.resumo[idioma] || moduloSelecionado.resumo.pt}
            </p>
          </div>

          <Link
            to={`/treino?subtema=${moduloSelecionado.subtemaFiltro}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 shrink-0"
          >
            <i className="fa-solid fa-graduation-cap"></i>
            <span>{t('praticarModulo')}</span>
          </Link>
        </div>

        {/* Tópicos e Lições Didáticas */}
        <div className="space-y-4">
          {topicosFiltrados.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl text-center text-slate-500 border border-slate-200">
              Nenhum tópico encontrado para a pesquisa "{termoBusca}".
            </div>
          ) : (
            topicosFiltrados.map((topico, idx) => {
              const tituloTopico = topico.titulo[idioma] || topico.titulo.pt;
              const conteudoTopico = topico.conteudo[idioma] || topico.conteudo.pt;
              const dicaExame = topico.dicaExame ? (topico.dicaExame[idioma] || topico.dicaExame.pt) : null;
              const pontos = topico.pontosChave ? (topico.pontosChave[idioma] || topico.pontosChave.pt) : null;

              return (
                <article
                  key={idx}
                  className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200/80 space-y-4"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#35495E]/10 text-[#35495E] flex items-center justify-center text-base shrink-0">
                      <i className={topico.icone || 'fa-solid fa-book-bookmark'}></i>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-display text-slate-900">
                      {tituloTopico}
                    </h3>
                  </div>

                  {/* Conteúdo didático formatado */}
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line pl-1">
                    {conteudoTopico}
                  </div>

                  {/* Pontos Chave */}
                  {pontos && pontos.length > 0 && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 font-semibold space-y-1">
                      <div className="text-[10px] uppercase font-black tracking-wider text-slate-500">
                        Resumo Rápido:
                      </div>
                      {pontos.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-emerald-600 text-xs"></i>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cartão Especial: Dica de Ouro INATRO */}
                  {dicaExame && (
                    <div className="p-4 bg-amber-50/90 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-amber-950">
                      <div className="w-8 h-8 rounded-lg bg-amber-200/70 text-amber-800 flex items-center justify-center text-sm shrink-0 mt-0.5">
                        <i className="fa-solid fa-lightbulb"></i>
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-black uppercase tracking-wider text-amber-900">
                          {t('dicaExame')}
                        </div>
                        <p className="text-xs font-semibold leading-relaxed">
                          {dicaExame}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Navegação entre Módulos de Estudo */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            disabled={moduloAtivo === 0}
            onClick={() => {
              setModuloAtivo((prev) => Math.max(0, prev - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl text-xs sm:text-sm transition disabled:opacity-40 disabled:pointer-events-none shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            <span>Módulo Anterior</span>
          </button>

          {moduloAtivo < modulos.length - 1 ? (
            <button
              type="button"
              onClick={() => {
                setModuloAtivo((prev) => Math.min(modulos.length - 1, prev + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#35495E] hover:bg-[#2c3d4f] text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Próximo Módulo</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </button>
          ) : (
            <Link
              to="/exame"
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Fazer Exame Oficial</span>
              <i className="fa-solid fa-flag-checkered text-xs"></i>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};
