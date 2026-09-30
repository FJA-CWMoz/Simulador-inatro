import React from 'react';
import { ImagemPergunta } from '../types';

interface SinalIlustracaoProps {
  imagem?: ImagemPergunta;
  className?: string;
  tamanho?: number;
}

export const SinalIlustracao: React.FC<SinalIlustracaoProps> = ({
  imagem,
  className = '',
  tamanho = 160,
}) => {
  if (!imagem) return null;

  const codigo = imagem.codigo || '';

  // Renderização vetorial nativa e precisa conforme o Código da Estrada de Moçambique
  const renderizarSvg = () => {
    switch (codigo) {
      // Sinais de Perigo (Triângulo Branco com Orla Vermelha)
      case 'A1a': // Curva à direita
        return (
          <svg viewBox="0 0 100 90" width={tamanho} height={(tamanho * 90) / 100} className="drop-shadow-md">
            <polygon points="50,6 94,84 6,84" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="50,18 84,78 16,78" fill="#ffffff" />
            {/* Curva à direita */}
            <path
              d="M 40 70 L 40 50 C 40 40 60 40 60 34"
              fill="none"
              stroke="#1e293b"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <polygon points="54,34 60,25 66,34" fill="#1e293b" />
          </svg>
        );

      case 'A2a': // Lomba
        return (
          <svg viewBox="0 0 100 90" width={tamanho} height={(tamanho * 90) / 100} className="drop-shadow-md">
            <polygon points="50,6 94,84 6,84" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="50,18 84,78 16,78" fill="#ffffff" />
            {/* Desenho da lomba */}
            <path
              d="M 28 62 L 40 62 Q 50 48 60 62 L 72 62"
              fill="none"
              stroke="#1e293b"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        );

      case 'A16': // Crianças / Peões
        return (
          <svg viewBox="0 0 100 90" width={tamanho} height={(tamanho * 90) / 100} className="drop-shadow-md">
            <polygon points="50,6 94,84 6,84" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="50,18 84,78 16,78" fill="#ffffff" />
            {/* Silhueta de adulto e criança a caminhar */}
            <circle cx="44" cy="38" r="4.5" fill="#1e293b" />
            <path d="M 40 44 L 48 44 L 46 62 L 42 62 Z" fill="#1e293b" />
            <path d="M 41 62 L 38 72 M 45 62 L 48 72" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
            {/* Criança */}
            <circle cx="58" cy="46" r="3.5" fill="#1e293b" />
            <path d="M 55 51 L 61 51 L 60 64 L 56 64 Z" fill="#1e293b" />
            <path d="M 56 64 L 54 72 M 59 64 L 62 72" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'A4a': // Estreitamento da via
        return (
          <svg viewBox="0 0 100 90" width={tamanho} height={(tamanho * 90) / 100} className="drop-shadow-md">
            <polygon points="50,6 94,84 6,84" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="50,18 84,78 16,78" fill="#ffffff" />
            {/* Linhas de estreitamento */}
            <path d="M 34 72 L 34 56 Q 34 46 42 36 L 42 30" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
            <path d="M 66 72 L 66 56 Q 66 46 58 36 L 58 30" fill="none" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          </svg>
        );

      case 'A13a': // Animais
        return (
          <svg viewBox="0 0 100 90" width={tamanho} height={(tamanho * 90) / 100} className="drop-shadow-md">
            <polygon points="50,6 94,84 6,84" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="50,18 84,78 16,78" fill="#ffffff" />
            <path
              d="M 32 58 Q 36 48 50 48 Q 62 48 68 54 L 72 48 L 74 52 L 70 58 L 68 68 L 64 68 L 64 60 L 42 60 L 42 68 L 38 68 L 38 58 Z"
              fill="#1e293b"
            />
          </svg>
        );

      // Sinais de Proibição (Círculo Vermelho)
      case 'C1': // Sentido Proibido
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
            <rect x="18" y="42" width="64" height="16" rx="3" fill="#ffffff" />
          </svg>
        );

      case 'C13': // Limite 60 km/h
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
            <text x="50" y="60" textAnchor="middle" fill="#1e293b" fontSize="32" fontWeight="800" fontFamily="sans-serif">
              60
            </text>
          </svg>
        );

      case 'C14a': // Ultrapassagem Proibida
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
            {/* Carro vermelho à esquerda */}
            <rect x="22" y="44" width="22" height="14" rx="3" fill="#dc2626" />
            <circle cx="27" cy="58" r="3" fill="#1e293b" />
            <circle cx="39" cy="58" r="3" fill="#1e293b" />
            {/* Carro preto à direita */}
            <rect x="56" y="44" width="22" height="14" rx="3" fill="#1e293b" />
            <circle cx="61" cy="58" r="3" fill="#1e293b" />
            <circle cx="73" cy="58" r="3" fill="#1e293b" />
          </svg>
        );

      case 'C18': // Proibição de Sinais Sonoros (Buzina)
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
            {/* Buzina */}
            <path d="M 32 46 L 44 42 L 56 34 L 56 66 L 44 58 L 32 54 Z" fill="#1e293b" />
            <circle cx="28" cy="50" r="6" fill="#1e293b" />
            {/* Barra transversal vermelha */}
            <line x1="22" y1="22" x2="78" y2="78" stroke="#dc2626" strokeWidth="8" />
          </svg>
        );

      case 'C3': // Proibição de Virar à Esquerda
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
            <path d="M 64 68 L 64 46 Q 64 36 50 36 L 40 36" fill="none" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <polygon points="42,28 30,36 42,44" fill="#1e293b" />
            <line x1="22" y1="22" x2="78" y2="78" stroke="#dc2626" strokeWidth="8" />
          </svg>
        );

      case 'C4': // Proibição de Inversão de Marcha (U-Turn)
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
            <path d="M 62 68 L 62 44 A 14 14 0 0 0 38 44 L 38 60" fill="none" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
            <polygon points="30,58 38,70 46,58" fill="#1e293b" />
            <line x1="22" y1="22" x2="78" y2="78" stroke="#dc2626" strokeWidth="8" />
          </svg>
        );

      case 'C7': // Trânsito Proibido a Veículos de Mercadorias (Camiões)
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="10" />
            {/* Camião */}
            <rect x="24" y="38" width="34" height="20" fill="#1e293b" rx="2" />
            <path d="M 58 44 L 68 44 L 74 52 L 74 58 L 58 58 Z" fill="#1e293b" />
            <circle cx="34" cy="62" r="5" fill="#dc2626" stroke="#1e293b" strokeWidth="2" />
            <circle cx="48" cy="62" r="5" fill="#dc2626" stroke="#1e293b" strokeWidth="2" />
            <circle cx="68" cy="62" r="5" fill="#dc2626" stroke="#1e293b" strokeWidth="2" />
          </svg>
        );

      case 'C15': // Fim de Todas as Proibições Locais
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#94a3b8" strokeWidth="6" />
            <line x1="26" y1="26" x2="74" y2="74" stroke="#475569" strokeWidth="4" />
            <line x1="23" y1="29" x2="71" y2="77" stroke="#475569" strokeWidth="4" />
            <line x1="29" y1="23" x2="77" y2="71" stroke="#475569" strokeWidth="4" />
          </svg>
        );

      case 'B1': // Cedência de Passagem
        return (
          <svg viewBox="0 0 100 90" width={tamanho} height={(tamanho * 90) / 100} className="drop-shadow-md">
            <polygon points="50,84 6,6 94,6" fill="#ffffff" stroke="#dc2626" strokeWidth="12" strokeLinejoin="round" />
          </svg>
        );

      case 'AGENTE_TRANSITO': // Agente com braço erguido
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#1e293b" />
            {/* Agente de uniforme PRM azul escuro e colete refletor */}
            <circle cx="50" cy="30" r="7" fill="#fbcfe8" />
            <polygon points="43,26 57,26 54,20 46,20" fill="#3b82f6" />
            <rect x="42" y="38" width="16" height="28" rx="3" fill="#eab308" />
            <line x1="50" y1="38" x2="50" y2="66" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
            {/* Braço direito levantado verticalmente */}
            <line x1="58" y1="40" x2="58" y2="12" stroke="#eab308" strokeWidth="5" strokeLinecap="round" />
            <circle cx="58" cy="10" r="3.5" fill="#fbcfe8" />
            {/* Braço esquerdo junto ao corpo */}
            <line x1="42" y1="42" x2="38" y2="58" stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
            {/* Pernas */}
            <line x1="46" y1="66" x2="44" y2="90" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" />
            <line x1="54" y1="66" x2="56" y2="90" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" />
            <text x="50" y="98" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">PRM TRÂNSITO</text>
          </svg>
        );

      case 'CRUZAMENTO_3_VEICULOS': // Diagrama de cruzamento A, B, C
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="rounded-xl overflow-hidden shadow">
            {/* Estrada em cruz */}
            <rect width="100" height="100" fill="#334155" />
            <rect x="36" y="0" width="28" height="100" fill="#475569" />
            <rect x="0" y="36" width="100" height="28" fill="#475569" />
            {/* Linhas pontilhadas centrais */}
            <line x1="50" y1="0" x2="50" y2="36" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50" y1="64" x2="50" y2="100" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="36" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="64" y1="50" x2="100" y2="50" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Veículo A (sul subindo e virando) */}
            <rect x="52" y="74" width="10" height="18" rx="2" fill="#ef4444" />
            <text x="57" y="86" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">A</text>
            {/* Veículo B (leste vindo para oeste) */}
            <rect x="74" y="38" width="18" height="10" rx="2" fill="#3b82f6" />
            <text x="83" y="46" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">B</text>
            {/* Veículo C (norte descendo) */}
            <rect x="38" y="8" width="10" height="18" rx="2" fill="#10b981" />
            <text x="43" y="20" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">C</text>
          </svg>
        );

      case 'SPEED_TRUCK_80':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
            <text x="50" y="60" textAnchor="middle" fill="#1e293b" fontSize="32" fontWeight="800" fontFamily="sans-serif">
              80
            </text>
          </svg>
        );

      case 'SPEED_120':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
            <text x="50" y="60" textAnchor="middle" fill="#1e293b" fontSize="28" fontWeight="800" fontFamily="sans-serif">
              120
            </text>
          </svg>
        );

      case 'M1_YELLOW_CONTINUOUS':
        return (
          <svg viewBox="0 0 120 70" width={tamanho} height={(tamanho * 70) / 120} className="rounded-lg overflow-hidden shadow">
            <rect width="120" height="70" fill="#334155" />
            {/* Passeio */}
            <rect x="0" y="0" width="120" height="24" fill="#64748b" />
            {/* Linha amarela contínua no lancil */}
            <rect x="0" y="24" width="120" height="6" fill="#eab308" />
            <text x="60" y="16" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">PASSEIO</text>
            <text x="60" y="52" textAnchor="middle" fill="#eab308" fontSize="9" fontWeight="bold">PROIBIDO PARAR E PAKAR</text>
          </svg>
        );

      case 'M2_YELLOW_DASHED':
        return (
          <svg viewBox="0 0 120 70" width={tamanho} height={(tamanho * 70) / 120} className="rounded-lg overflow-hidden shadow">
            <rect width="120" height="70" fill="#334155" />
            <rect x="0" y="0" width="120" height="24" fill="#64748b" />
            {/* Linha amarela descontínua */}
            <line x1="0" y1="26" x2="120" y2="26" stroke="#eab308" strokeWidth="5" strokeDasharray="14 10" />
            <text x="60" y="16" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">PASSEIO</text>
            <text x="60" y="52" textAnchor="middle" fill="#eab308" fontSize="9" fontWeight="bold">PERMITE PARAGEM RÁPIDA</text>
          </svg>
        );

      // Sinais de Obrigação (Círculo Azul)
      case 'D1a': // Sentido Obrigatório em Frente
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M 50 22 L 68 44 L 56 44 L 56 78 L 44 78 L 44 44 L 32 44 Z" fill="#ffffff" />
          </svg>
        );

      case 'D3b': // Passagem Obrigatória à Esquerda
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <g transform="rotate(45 50 50)">
              <path d="M 50 22 L 66 44 L 56 44 L 56 78 L 44 78 L 44 44 L 34 44 Z" fill="#ffffff" />
            </g>
          </svg>
        );

      case 'D4': // Sentido Giratório Obrigatório (Rotunda)
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            {/* Três setas curvadas formando círculo */}
            <g fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round">
              <path d="M 50 24 A 26 26 0 0 1 76 50" />
              <path d="M 76 50 A 26 26 0 0 1 50 76" />
              <path d="M 50 76 A 26 26 0 0 1 24 50" />
            </g>
            <polygon points="50,18 56,26 44,26" fill="#ffffff" />
            <polygon points="82,50 74,56 74,44" fill="#ffffff" />
            <polygon points="50,82 44,74 56,74" fill="#ffffff" />
          </svg>
        );

      case 'D5': // Velocidade Mínima 50 km/h
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <text x="50" y="62" textAnchor="middle" fill="#ffffff" fontSize="34" fontWeight="800" fontFamily="sans-serif">
              50
            </text>
          </svg>
        );

      case 'D8': // Cinto de Segurança
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <circle cx="42" cy="38" r="6" fill="#ffffff" />
            <path d="M 38 48 C 38 48 42 66 52 74" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 30 72 L 68 34" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          </svg>
        );

      // Sinais de Informação
      case 'H1': // Hospital
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="56" fontWeight="800" fontFamily="sans-serif">
              H
            </text>
          </svg>
        );

      case 'H7': // Posto de Combustível
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            {/* Bomba */}
            <rect x="28" y="32" width="30" height="42" rx="4" fill="#ffffff" />
            <rect x="34" y="38" width="18" height="12" fill="#2563eb" />
            <path d="M 58 44 Q 68 44 68 56 L 68 68" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'H8': // Parque P
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect x="6" y="6" width="88" height="88" rx="8" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <text x="50" y="68" textAnchor="middle" fill="#ffffff" fontSize="56" fontWeight="800" fontFamily="sans-serif">
              P
            </text>
          </svg>
        );

      case 'H24': // Sentido Único
        return (
          <svg viewBox="0 0 100 60" width={tamanho} height={(tamanho * 60) / 100} className="drop-shadow-md">
            <rect x="4" y="4" width="92" height="52" rx="6" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
            <path d="M 20 30 L 62 30 L 62 20 L 80 30 L 62 40 L 62 30" fill="#ffffff" />
          </svg>
        );

      case 'B3': // Estrada com Prioridade
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <polygon points="50,6 94,50 50,94 6,50" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <polygon points="50,18 82,50 50,82 18,50" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          </svg>
        );

      case 'B2_STOP': // STOP
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <polygon points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
            <polygon points="31,10 69,10 90,31 90,69 69,90 31,90 10,69 10,31" fill="none" stroke="#ffffff" strokeWidth="2.5" />
            <text x="50" y="60" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="800" fontFamily="sans-serif" letterSpacing="1">
              STOP
            </text>
          </svg>
        );

      // Cenários de Trânsito e Marcas Rodoviárias
      case 'M1': // Linha Contínua
        return (
          <svg viewBox="0 0 120 70" width={tamanho} height={(tamanho * 70) / 120} className="rounded-lg overflow-hidden shadow">
            <rect width="120" height="70" fill="#334155" />
            <line x1="60" y1="0" x2="60" y2="70" stroke="#ffffff" strokeWidth="5" />
            {/* Faixas laterais */}
            <line x1="10" y1="0" x2="10" y2="70" stroke="#facc15" strokeWidth="2" />
            <line x1="110" y1="0" x2="110" y2="70" stroke="#facc15" strokeWidth="2" />
          </svg>
        );

      case 'M2': // Linha Descontínua
        return (
          <svg viewBox="0 0 120 70" width={tamanho} height={(tamanho * 70) / 120} className="rounded-lg overflow-hidden shadow">
            <rect width="120" height="70" fill="#334155" />
            <line x1="60" y1="0" x2="60" y2="70" stroke="#ffffff" strokeWidth="5" strokeDasharray="14 10" />
            <line x1="10" y1="0" x2="10" y2="70" stroke="#facc15" strokeWidth="2" />
            <line x1="110" y1="0" x2="110" y2="70" stroke="#facc15" strokeWidth="2" />
          </svg>
        );

      case 'M3': // Linha Mista
        return (
          <svg viewBox="0 0 120 70" width={tamanho} height={(tamanho * 70) / 120} className="rounded-lg overflow-hidden shadow">
            <rect width="120" height="70" fill="#334155" />
            {/* Contínua à esquerda, descontínua à direita */}
            <line x1="56" y1="0" x2="56" y2="70" stroke="#ffffff" strokeWidth="4" />
            <line x1="64" y1="0" x2="64" y2="70" stroke="#ffffff" strokeWidth="4" strokeDasharray="14 10" />
          </svg>
        );

      case 'M8': // Linha de Paragem STOP
        return (
          <svg viewBox="0 0 120 70" width={tamanho} height={(tamanho * 70) / 120} className="rounded-lg overflow-hidden shadow">
            <rect width="120" height="70" fill="#334155" />
            <line x1="10" y1="45" x2="110" y2="45" stroke="#ffffff" strokeWidth="7" />
            <text x="60" y="63" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800" fontFamily="sans-serif">
              STOP
            </text>
          </svg>
        );

      case 'M17': // Ilhéu Zebrado
        return (
          <svg viewBox="0 0 120 70" width={tamanho} height={(tamanho * 70) / 120} className="rounded-lg overflow-hidden shadow">
            <rect width="120" height="70" fill="#334155" />
            <polygon points="60,10 90,60 30,60" fill="#1e293b" stroke="#ffffff" strokeWidth="3" />
            <line x1="42" y1="40" x2="78" y2="40" stroke="#ffffff" strokeWidth="2" />
            <line x1="48" y1="30" x2="72" y2="30" stroke="#ffffff" strokeWidth="2" />
            <line x1="54" y1="20" x2="66" y2="20" stroke="#ffffff" strokeWidth="2" />
            <line x1="36" y1="50" x2="84" y2="50" stroke="#ffffff" strokeWidth="2" />
          </svg>
        );

      case 'PASSADEIRA_PEAO':
        return (
          <svg viewBox="0 0 120 70" width={tamanho} height={(tamanho * 70) / 120} className="rounded-lg overflow-hidden shadow">
            <rect width="120" height="70" fill="#334155" />
            {/* Listas brancas da passadeira */}
            {[15, 30, 45, 60, 75, 90, 105].map((x) => (
              <rect key={x} x={x - 4} y="20" width="8" height="30" fill="#ffffff" />
            ))}
            {/* Peão caminhando */}
            <circle cx="60" cy="26" r="3.5" fill="#facc15" />
            <line x1="60" y1="30" x2="60" y2="42" stroke="#facc15" strokeWidth="2.5" />
            <line x1="60" y1="42" x2="56" y2="50" stroke="#facc15" strokeWidth="2" />
            <line x1="60" y1="42" x2="64" y2="50" stroke="#facc15" strokeWidth="2" />
          </svg>
        );

      case 'EQUIP_HELMET':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#1e293b" />
            <circle cx="50" cy="50" r="46" fill="#0f172a" />
            <path d="M 28 54 C 28 32 40 22 56 22 C 72 22 80 34 80 50 C 80 66 74 74 60 74 L 44 74 C 34 74 28 66 28 54 Z" fill="#3b82f6" />
            <path d="M 44 42 L 72 42 C 76 52 74 60 68 64 L 46 64 Z" fill="#0ea5e9" opacity="0.8" />
            <circle cx="44" cy="52" r="4" fill="#ffffff" />
          </svg>
        );

      case 'EQUIP_CHILD_SEAT':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#1e293b" />
            <path d="M 32 24 L 68 24 L 64 64 L 72 76 L 36 76 L 32 64 Z" fill="#6366f1" />
            <circle cx="50" cy="38" r="8" fill="#fbcfe8" />
            <path d="M 42 48 L 58 48 L 56 64 L 44 64 Z" fill="#ec4899" />
            <line x1="42" y1="52" x2="58" y2="60" stroke="#facc15" strokeWidth="3" />
            <line x1="58" y1="52" x2="42" y2="60" stroke="#facc15" strokeWidth="3" />
          </svg>
        );

      case 'MECH_BATTERY_LAMP':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#0f172a" />
            <rect x="20" y="34" width="60" height="42" rx="4" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" />
            <rect x="28" y="24" width="12" height="10" fill="#dc2626" rx="2" />
            <rect x="60" y="24" width="12" height="10" fill="#dc2626" rx="2" />
            <text x="34" y="58" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="bold">-</text>
            <text x="66" y="58" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="bold">+</text>
          </svg>
        );

      case 'MECH_TEMP_RED':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#0f172a" />
            <rect x="46" y="22" width="8" height="40" rx="4" fill="#ffffff" />
            <circle cx="50" cy="66" r="14" fill="#dc2626" />
            <rect x="48" y="32" width="4" height="30" fill="#dc2626" />
            <path d="M 28 36 Q 32 30 36 36 T 44 36" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <path d="M 56 36 Q 60 30 64 36 T 72 36" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'MECH_COOLANT_TANK':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#0f172a" />
            <rect x="24" y="30" width="52" height="52" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            <rect x="40" y="20" width="20" height="10" rx="3" fill="#2563eb" />
            <rect x="26" y="54" width="48" height="26" rx="6" fill="#10b981" opacity="0.8" />
            <text x="68" y="46" fill="#dc2626" fontSize="9" fontWeight="bold">MAX</text>
            <line x1="28" y1="46" x2="62" y2="46" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="68" y="66" fill="#dc2626" fontSize="9" fontWeight="bold">MIN</text>
            <line x1="28" y1="66" x2="62" y2="66" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        );

      case 'PENAL_HIT_AND_RUN':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#450a0a" />
            <circle cx="50" cy="50" r="42" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
            <polygon points="50,18 84,76 16,76" fill="#ef4444" />
            <polygon points="50,28 76,72 24,72" fill="#450a0a" />
            <text x="50" y="64" textAnchor="middle" fill="#ef4444" fontSize="24" fontWeight="black">!</text>
            <text x="50" y="90" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">OMISSÃO DE SOCORRO</text>
          </svg>
        );

      case 'PENAL_SEIZE_CAR':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#1e1b4b" />
            <circle cx="50" cy="50" r="42" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
            <rect x="24" y="44" width="40" height="18" rx="3" fill="#ef4444" />
            <circle cx="34" cy="62" r="5" fill="#0f172a" />
            <circle cx="54" cy="62" r="5" fill="#0f172a" />
            <path d="M 64 30 L 78 44 L 64 48" fill="none" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
            <text x="50" y="86" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">APREENSÃO POLICIAL</text>
          </svg>
        );

      case 'PENAL_DRUGS_CHECK':
        return (
          <svg viewBox="0 0 100 100" width={tamanho} height={tamanho} className="drop-shadow-md">
            <rect width="100" height="100" rx="16" fill="#312e81" />
            <circle cx="50" cy="50" r="40" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
            <line x1="22" y1="22" x2="78" y2="78" stroke="#ffffff" strokeWidth="8" />
            <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="black">DROGAS</text>
          </svg>
        );

      default:
        // Ícone ilustrativo temático padrão
        return (
          <div
            className="flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 rounded-xl shadow-inner text-slate-700 font-bold"
            style={{ width: tamanho, height: (tamanho * 80) / 100 }}
          >
            <div className="text-center p-3">
              <i className="fa-solid fa-car-side text-3xl text-[#35495E] mb-1"></i>
              <div className="text-xs uppercase tracking-wider text-slate-600 font-semibold">
                INATRO Moçambique
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm ${className}`}>
      {renderizarSvg()}
      {imagem.alt?.pt && (
        <span className="text-[11px] font-medium text-slate-500 mt-2 text-center max-w-[220px] line-clamp-1">
          {imagem.alt.pt}
        </span>
      )}
    </div>
  );
};
