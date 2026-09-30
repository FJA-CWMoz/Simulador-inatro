import { useState, useEffect, useCallback } from 'react';
import { IdiomaCodigo } from '../types';

export function useAudioLeitor(idioma: IdiomaCodigo = 'pt') {
  const [falando, setFalando] = useState<boolean>(false);
  const [suportado, setSuportado] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSuportado(false);
    }
  }, []);

  const parar = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setFalando(false);
    }
  }, []);

  const falar = useCallback(
    (texto: string) => {
      if (!suportado || !texto.trim()) return;

      // Cancela qualquer fala anterior
      parar();

      try {
        const utterance = new SpeechSynthesisUtterance(texto);

        // Seleciona voz e idioma apropriado
        if (idioma === 'en') {
          utterance.lang = 'en-US';
          utterance.rate = 0.95;
        } else {
          // pt ou ch (Changana usa voz em português para fonética clara)
          utterance.lang = 'pt-PT';
          utterance.rate = 0.9;
        }

        utterance.pitch = 1.0;

        utterance.onstart = () => {
          setFalando(true);
        };

        utterance.onend = () => {
          setFalando(false);
        };

        utterance.onerror = () => {
          setFalando(false);
        };

        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error('Erro ao reproduzir áudio', e);
        setFalando(false);
      }
    },
    [idioma, suportado, parar]
  );

  // Cancela o áudio ao desmontar
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    falar,
    parar,
    falando,
    suportado,
  };
}
