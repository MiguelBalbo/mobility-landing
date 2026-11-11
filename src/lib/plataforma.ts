import { LINKS_LOJA } from '@/lib/dados';

export type Plataforma = 'ios' | 'android';

// iPadOS se identifica como Mac; o toque denuncia que é um iPad.
export function detectarPlataforma(): Plataforma | null {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  return null;
}

// Link da loja da plataforma, ou null enquanto o app não está publicado nela.
export function linkDaLoja(plataforma: Plataforma): string | null {
  const link = plataforma === 'ios' ? LINKS_LOJA.appStore : LINKS_LOJA.googlePlay;
  return link.startsWith('http') ? link : null;
}
