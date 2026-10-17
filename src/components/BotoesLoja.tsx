import { useId, type MouseEvent } from 'react';
import { avisarIndisponivel, type Loja } from '@/lib/avisoLoja';
import { LINKS_LOJA } from '@/lib/dados';

// Sem link real da loja ainda, o clique avisa que o app não está disponível em vez de navegar.
const aoClicar = (loja: Loja, href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (href.startsWith('http')) return;
  e.preventDefault();
  avisarIndisponivel(loja);
};

function IconeApple() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px]" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.6c-.02-2.1 1.72-3.12 1.8-3.17-.98-1.43-2.5-1.63-3.04-1.65-1.29-.13-2.52.76-3.18.76-.65 0-1.66-.74-2.73-.72-1.4.02-2.7.82-3.42 2.08-1.46 2.53-.37 6.28 1.05 8.33.7 1 1.52 2.13 2.6 2.09 1.05-.04 1.44-.67 2.7-.67 1.27 0 1.62.67 2.73.65 1.13-.02 1.84-1.02 2.53-2.03.8-1.16 1.13-2.29 1.14-2.35-.02-.01-2.18-.84-2.2-3.32ZM14.3 6.42c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.25-.53.62-1 1.62-.88 2.57.93.07 1.88-.47 2.46-1.17Z" />
    </svg>
  );
}

// Logo do Google Play nas cores oficiais (azul, verde, amarelo e vermelho), com os cantos arredondados.
function IconePlay() {
  // Id único por instância: os botões aparecem mais de uma vez na página.
  const mascara = useId();
  return (
    <svg viewBox="0 0 24 26" className="size-[22px]" aria-hidden="true">
      <defs>
        <mask id={mascara}>
          <polygon points="2,1.5 2,24.5 22.5,13" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        </mask>
      </defs>
      <g mask={`url(#${mascara})`}>
        <polygon points="0,0 0,26 11.5,13" fill="#4285F4" />
        <polygon points="0,0 11.5,13 16.6,8.6 24,0" fill="#34A853" />
        <polygon points="0,26 11.5,13 16.6,17.4 24,26" fill="#EA4335" />
        <polygon points="16.6,8.6 24,13 16.6,17.4 11.5,13" fill="#FBBC04" />
      </g>
    </svg>
  );
}

const estilo =
  'inline-flex h-14 items-center gap-3 rounded-full pl-5 pr-6 transition-[background-color,transform,box-shadow] duration-200 ease-out active:scale-[0.98]';

// Botões das lojas. O principal segue o BotaoPrincipal do app: pílula verde com texto verde-escuro.
export function BotoesLoja({ centro = false }: { centro?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-3 ${centro ? 'justify-center' : ''}`}>
      <a href={LINKS_LOJA.appStore} onClick={aoClicar('App Store', LINKS_LOJA.appStore)} className={`${estilo} bg-signal text-deep hover:bg-halo hover:shadow-[0_10px_40px_-10px_rgb(61_245_143/0.6)]`}>
        <IconeApple />
        <span className="flex flex-col leading-none">
          <span className="text-[11px] font-medium opacity-75">Baixar na</span>
          <span className="text-[17px] font-semibold">App Store</span>
        </span>
      </a>
      <a href={LINKS_LOJA.googlePlay} onClick={aoClicar('Google Play', LINKS_LOJA.googlePlay)} className={`${estilo} border border-line-strong text-cloud hover:border-smoke hover:bg-steel`}>
        <IconePlay />
        <span className="flex flex-col leading-none">
          <span className="text-[11px] font-medium text-ash">Disponível no</span>
          <span className="text-[17px] font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
