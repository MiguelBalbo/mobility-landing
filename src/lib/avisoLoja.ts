import { useSyncExternalStore } from 'react';

// Enquanto o app não está nas lojas, os botões de download mostram um aviso na própria página.

export type Loja = 'App Store' | 'Google Play';
export type Aviso = { id: number; titulo: string; texto: string };

let avisos: Aviso[] = [];
const ouvintes = new Set<() => void>();
const emitir = () => ouvintes.forEach((o) => o());

export function fecharAviso(id: number) {
  avisos = avisos.filter((a) => a.id !== id);
  emitir();
}

function mostrarNaPagina(titulo: string, texto: string) {
  const id = Date.now();
  avisos = [{ id, titulo, texto }];
  emitir();
  window.setTimeout(() => fecharAviso(id), 6000);
}

export function avisarIndisponivel(loja: Loja) {
  const titulo = 'O Mobility ainda não está disponível';
  const texto = `O app ainda não está ${loja === 'App Store' ? 'na App Store' : 'no Google Play'}. Em breve você poderá baixá-lo por lá.`;
  mostrarNaPagina(titulo, texto);
}

export function useAvisos() {
  return useSyncExternalStore(
    (o) => {
      ouvintes.add(o);
      return () => ouvintes.delete(o);
    },
    () => avisos,
  );
}
