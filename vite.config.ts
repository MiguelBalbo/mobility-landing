import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { LINKS_LOJA } from './src/lib/dados';

// GitHub Pages publica o repositório em https://miguelbalbo.github.io/mobility-landing/. Com domínio próprio,
// rode o build com BASE_PATH=/ e SITE_ORIGIN=https://seu-dominio (o workflow já passa os dois).
const BASE_PRODUCAO = process.env.BASE_PATH ?? '/mobility-landing/';
// Os cards de compartilhamento exigem URLs absolutas.
const ORIGEM = (process.env.SITE_ORIGIN ?? 'https://miguelbalbo.github.io').replace(/\/$/, '');

const playPublicado = LINKS_LOJA.googlePlay.startsWith('http');

type Pagina = {
  rota: string; // '' = página inicial
  titulo: string;
  descricao: string;
  imagem: 'card-geral.png' | 'card-ios.png' | 'card-android.png';
  // Rotas de compartilhamento: redirecionam para a loja já no HTML, antes do React carregar.
  redireciona?: 'auto' | 'ios' | 'android';
};

const DESCRICAO =
  'Previsão de chegada dos ônibus, posição no mapa e status do metrô, trem e VLT em São Paulo e no Rio de Janeiro. Grátis e sem cadastro.';

// Cada página ganha um HTML próprio no Pages (abre com status 200) com título, descrição e card (Open Graph para
// Facebook, Instagram e WhatsApp; Twitter Card para o X). As imagens vêm de `npm run gerar:cards`.
const PAGINAS: Pagina[] = [
  { rota: '', titulo: 'Mobility — ônibus, metrô e trem em tempo real', descricao: DESCRICAO, imagem: 'card-geral.png' },
  { rota: 'termos', titulo: 'Termos de uso — Mobility', descricao: DESCRICAO, imagem: 'card-geral.png' },
  { rota: 'privacidade', titulo: 'Política de privacidade — Mobility', descricao: DESCRICAO, imagem: 'card-geral.png' },
  { rota: 'suporte', titulo: 'Suporte — Mobility', descricao: 'Dúvidas, problemas e sugestões sobre o Mobility.', imagem: 'card-geral.png' },
  {
    rota: 'baixar',
    titulo: 'Baixe o Mobility — seu ônibus em tempo real',
    descricao: `Previsão de chegada, ônibus no mapa e status do metrô, trem e VLT em São Paulo e no Rio. Grátis para iPhone${
      playPublicado ? ' e Android' : ''
    }.`,
    imagem: 'card-geral.png',
    redireciona: 'auto',
  },
  {
    rota: 'baixar/ios',
    titulo: 'Mobility para iPhone — seu ônibus em tempo real',
    descricao: 'Previsão de chegada, ônibus no mapa e status do metrô, trem e VLT em São Paulo e no Rio. Grátis na App Store.',
    imagem: 'card-ios.png',
    redireciona: 'ios',
  },
  {
    rota: 'baixar/android',
    titulo: 'Mobility para Android — seu ônibus em tempo real',
    descricao: playPublicado
      ? 'Previsão de chegada, ônibus no mapa e status do metrô, trem e VLT em São Paulo e no Rio. Grátis no Google Play.'
      : 'Previsão de chegada, ônibus no mapa e status do metrô, trem e VLT em São Paulo e no Rio. Em breve no Google Play.',
    imagem: 'card-android.png',
    redireciona: 'android',
  },
];

const escapar = (t: string) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function metaDaPagina(p: Pagina, base: string) {
  // Com barra no fim: o Pages serve cada rota como pasta e redirecionaria /baixar para /baixar/.
  const url = `${ORIGEM}${base}${p.rota ? `${p.rota}/` : ''}`;
  const imagem = `${ORIGEM}${base}compartilhar/${p.imagem}`;
  const t = escapar(p.titulo);
  const d = escapar(p.descricao);
  return `<!-- meta:inicio -->
    <title>${t}</title>
    <meta name="description" content="${d}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Mobility" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:image" content="${imagem}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Mobility: saiba quando o ônibus chega." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${imagem}" />${p.redireciona ? `\n    ${scriptRedirecionamento(p.redireciona)}` : ''}
    <!-- meta:fim -->`;
}

// Redireciona pela user agent antes de o React carregar. Os robôs que montam os cards (Facebook, WhatsApp, X)
// não executam JavaScript, então leem as meta tags acima. Sem link para a plataforma, a página do React assume.
function scriptRedirecionamento(modo: 'auto' | 'ios' | 'android') {
  const links = {
    ios: LINKS_LOJA.appStore.startsWith('http') ? LINKS_LOJA.appStore : null,
    android: playPublicado ? LINKS_LOJA.googlePlay : null,
  };
  return `<script>(function(){var u=navigator.userAgent,m=${JSON.stringify(modo)},l=${JSON.stringify(links)};var p=m!=="auto"?m:/iPhone|iPad|iPod/.test(u)||(/Macintosh/.test(u)&&navigator.maxTouchPoints>1)?"ios":/Android/i.test(u)?"android":null;if(p&&l[p])location.replace(l[p]);})();</script>`;
}

const BLOCO_META = /<!-- meta:inicio[\s\S]*?<!-- meta:fim -->/;

// O Pages não tem rewrite de SPA: grava um index.html por página (com as meta tags dela) e o 404.html (qualquer
// outro caminho cai na página de 404 do app). O .nojekyll evita que o Pages processe o dist.
function githubPages(): Plugin {
  let saida = 'dist';
  let base = '/';
  return {
    name: 'github-pages',
    apply: 'build',
    configResolved(config) {
      saida = config.build.outDir;
      base = config.base;
    },
    closeBundle() {
      const html = readFileSync(join(saida, 'index.html'), 'utf8');
      for (const p of PAGINAS) {
        mkdirSync(join(saida, p.rota), { recursive: true });
        writeFileSync(join(saida, p.rota, 'index.html'), html.replace(BLOCO_META, metaDaPagina(p, base)));
      }
      writeFileSync(join(saida, '404.html'), html.replace(BLOCO_META, metaDaPagina(PAGINAS[0], base)));
      writeFileSync(join(saida, '.nojekyll'), '');
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  // O dev usa a raiz; o build e o preview (que serve o dist) usam o caminho do Pages.
  base: command === 'build' || isPreview ? BASE_PRODUCAO : '/',
  plugins: [react(), tailwindcss(), githubPages()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
}));
