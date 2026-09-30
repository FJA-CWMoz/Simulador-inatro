import { useCallback, useEffect, useState } from 'react';
import { IdiomaCodigo, TextoTraduzido } from '../types';
import { DICIONARIO_UI, IDIOMAS_DISPONIVEIS, traduzirTexto } from '../utils/idioma';
import { obterIdiomaStorage, salvarIdiomaStorage } from '../utils/storage';

const EVENTO_IDIOMA_ALTERADO = 'inatro_evento_idioma_alterado';

export function useIdioma() {
  const [idioma, setIdiomaState] = useState<IdiomaCodigo>(() => obterIdiomaStorage());

  useEffect(() => {
    const handleStorage = () => {
      const atual = obterIdiomaStorage();
      setIdiomaState(atual);
    };

    window.addEventListener(EVENTO_IDIOMA_ALTERADO, handleStorage);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(EVENTO_IDIOMA_ALTERADO, handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setIdioma = useCallback((novo: IdiomaCodigo) => {
    salvarIdiomaStorage(novo);
    setIdiomaState(novo);
    window.dispatchEvent(new Event(EVENTO_IDIOMA_ALTERADO));
  }, []);

  /**
   * Traduz um objeto { pt, en, ch }
   */
  const t = useCallback(
    (objOuChave: TextoTraduzido | string): string => {
      if (typeof objOuChave === 'string') {
        const itemDicionario = DICIONARIO_UI[objOuChave];
        if (itemDicionario) {
          return traduzirTexto(itemDicionario, idioma);
        }
        return objOuChave;
      }
      return traduzirTexto(objOuChave, idioma);
    },
    [idioma]
  );

  return {
    idioma,
    setIdioma,
    idiomasDisponiveis: IDIOMAS_DISPONIVEIS,
    t,
  };
}
