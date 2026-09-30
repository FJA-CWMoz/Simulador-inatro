import React from 'react';

interface OpcaoProps {
  indice: number; // 0, 1, 2, 3 -> A, B, C, D
  texto: string;
  selecionada: boolean;
  correta?: boolean;
  mostrarResultado?: boolean; // Se true, aplica estilos de verificação (verde se correta, vermelho se errada)
  desabilitada?: boolean;
  onSelecionar: (indice: number) => void;
}

const LETRAS = ['A', 'B', 'C', 'D', 'E'];

export const Opcao: React.FC<OpcaoProps> = ({
  indice,
  texto,
  selecionada,
  correta = false,
  mostrarResultado = false,
  desabilitada = false,
  onSelecionar,
}) => {
  const letra = LETRAS[indice] || `${indice + 1}`;

  // Definição de estilos contextuais
  let containerClasses =
    'relative w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-3.5 group cursor-pointer active:scale-[0.99] select-none';
  let badgeClasses =
    'w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 transition-colors duration-150';
  let icone = null;

  if (mostrarResultado) {
    if (correta) {
      // Opção correta (sempre verde)
      containerClasses += ' bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm';
      badgeClasses += ' bg-emerald-600 text-white shadow';
      icone = <i className="fa-solid fa-circle-check text-emerald-600 text-lg ml-auto shrink-0 mt-0.5"></i>;
    } else if (selecionada && !correta) {
      // Opção incorreta que o aluno escolheu (vermelha)
      containerClasses += ' bg-rose-50 border-rose-500 text-rose-950 shadow-sm';
      badgeClasses += ' bg-rose-600 text-white shadow';
      icone = <i className="fa-solid fa-circle-xmark text-rose-600 text-lg ml-auto shrink-0 mt-0.5"></i>;
    } else {
      // Outras opções neutras
      containerClasses += ' bg-white/60 border-slate-200 text-slate-400 opacity-60';
      badgeClasses += ' bg-slate-200 text-slate-500';
    }
  } else {
    // Modo Normal (Exame ou antes de responder no Treino)
    if (selecionada) {
      containerClasses += ' bg-[#35495E]/5 border-[#35495E] text-[#35495E] shadow-md ring-2 ring-[#35495E]/20';
      badgeClasses += ' bg-[#35495E] text-white shadow';
      icone = <i className="fa-solid fa-circle-dot text-[#35495E] text-lg ml-auto shrink-0 mt-0.5"></i>;
    } else {
      containerClasses += ' bg-white border-slate-200 hover:border-[#35495E]/50 hover:bg-slate-50 text-slate-800 shadow-sm';
      badgeClasses += ' bg-slate-100 group-hover:bg-[#35495E]/10 text-slate-600 group-hover:text-[#35495E]';
      icone = <i className="fa-regular fa-circle text-slate-300 group-hover:text-slate-400 text-lg ml-auto shrink-0 mt-0.5"></i>;
    }
  }

  if (desabilitada) {
    containerClasses += ' cursor-default pointer-events-none';
  }

  return (
    <button
      type="button"
      onClick={() => !desabilitada && onSelecionar(indice)}
      className={containerClasses}
      disabled={desabilitada}
    >
      <div className={badgeClasses}>{letra}</div>
      <div className="flex-1 text-sm sm:text-base font-medium leading-relaxed pt-0.5">
        {texto}
      </div>
      {icone}
    </button>
  );
};
