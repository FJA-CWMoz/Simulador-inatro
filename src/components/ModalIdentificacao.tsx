import React, { useState, useEffect } from 'react';
import { useIdioma } from '../hooks/useIdioma';
import { obterCandidato, salvarCandidato } from '../utils/storage';

interface ModalIdentificacaoProps {
  aberto: boolean;
  onFechar: () => void;
  onSalvo?: () => void;
}

export const ModalIdentificacao: React.FC<ModalIdentificacaoProps> = ({
  aberto,
  onFechar,
  onSalvo,
}) => {
  const { t } = useIdioma();
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [escola, setEscola] = useState('');
  const [categoria, setCategoria] = useState('B');

  useEffect(() => {
    if (aberto) {
      const atual = obterCandidato();
      setNome(atual.nome || '');
      setNumero(atual.numero || '');
      setEscola(atual.escola || '');
      setCategoria(atual.categoria || 'B');
    }
  }, [aberto]);

  if (!aberto) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    salvarCandidato({
      nome: nome.trim(),
      numero: numero.trim(),
      escola: escola.trim(),
      categoria,
      dataRegisto: new Date().toISOString(),
    });
    if (onSalvo) onSalvo();
    onFechar();
  };

  const handleLimpar = () => {
    salvarCandidato({ nome: '', numero: '', escola: '', categoria: 'B' });
    setNome('');
    setNumero('');
    setEscola('');
    setCategoria('B');
    if (onSalvo) onSalvo();
    onFechar();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-[#35495E] p-6 text-white text-center relative">
          <button
            onClick={onFechar}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Fechar"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="w-14 h-14 mx-auto mb-3 bg-[#EFBAAE]/20 border border-[#EFBAAE]/40 rounded-2xl flex items-center justify-center text-[#EFBAAE] text-2xl shadow-inner">
            <i className="fa-solid fa-id-card"></i>
          </div>
          <h2 className="text-xl font-bold font-display">
            {t('identificacaoCandidato')}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Ficha Oficial do Candidato • INATRO Moçambique
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t('nomeCompleto')} *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <i className="fa-solid fa-user text-sm"></i>
              </span>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder={t('exemploNome')}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#35495E] focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('numeroCandidato')}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                  <i className="fa-solid fa-hashtag text-sm"></i>
                </span>
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Ex: 84920"
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#35495E] focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Categoria da Carta
              </label>
              <div className="relative">
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#35495E] focus:border-transparent transition cursor-pointer"
                >
                  <option value="B">Ligeiros (Cat. B)</option>
                  <option value="C">Pesados (Cat. C)</option>
                  <option value="D">Passageiros (Cat. D)</option>
                  <option value="A">Motociclos (Cat. A)</option>
                  <option value="CE">Articulados (Cat. CE)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Escola de Condução (Opcional)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <i className="fa-solid fa-school text-sm"></i>
              </span>
              <input
                type="text"
                value={escola}
                onChange={(e) => setEscola(e.target.value)}
                placeholder="Ex: Escola de Condução Moderna / ACM"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#35495E] focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
            <i className="fa-solid fa-circle-info text-amber-600 mt-0.5 shrink-0"></i>
            <span>{t('notaOpcional')}</span>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#35495E] hover:bg-[#2c3d4f] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-floppy-disk text-sm"></i>
              <span>{t('salvarIdentificacao')}</span>
            </button>

            <button
              type="button"
              onClick={handleLimpar}
              className="w-full py-2.5 px-4 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              {t('continuarComoConvidado')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
