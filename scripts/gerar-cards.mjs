// Gera as imagens dos cards de compartilhamento (Open Graph / Twitter, 1200×630) em public/compartilhar/.
// Rode `npm run gerar:cards` depois de mudar o visual ou de publicar o app no Google Play (o card do Android
// troca "Em breve" por "Disponível" quando LINKS_LOJA.googlePlay vira um link http).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const fonte = (arquivo) => readFileSync(join(raiz, 'scripts', 'fontes', arquivo));
const FONTES = [
  { name: 'Archivo', data: fonte('Archivo_300Light.ttf'), weight: 300, style: 'normal' },
  { name: 'Archivo', data: fonte('Archivo_400Regular.ttf'), weight: 400, style: 'normal' },
  { name: 'Archivo', data: fonte('Archivo_600SemiBold.ttf'), weight: 600, style: 'normal' },
  { name: 'Archivo', data: fonte('Archivo_700Bold.ttf'), weight: 700, style: 'normal' },
];

const dados = readFileSync(join(raiz, 'src', 'lib', 'dados.ts'), 'utf8');
const playPublicado = /googlePlay:\s*'https?:/.test(dados);

const COR = {
  canvas: '#08110D',
  surface: '#0F1A15',
  line: '#22332A',
  cloud: '#E8EFEA',
  ash: '#B0BEB4',
  fog: '#8A998F',
  signal: '#3DF58F',
  brand: '#14C86A',
  deep: '#04361F',
};

// Mesmo desenho de src/components/Marca.tsx (ícone do app).
const CAMINHO_ICONE =
  'M384 210H640A120 120 0 0 1 760 330V413H783A26 26 0 0 1 809 439V527A26 26 0 0 1 783 553H760V692A120 120 0 0 1 640 812H384A120 120 0 0 1 264 692V553H240A26 26 0 0 1 214 527V439A26 26 0 0 1 240 413H264V330A120 120 0 0 1 384 210Z' +
  'M333 320H429L511 401L594 320H690V530H616V393L511 496L408 393V530H333Z' +
  'M343 697a45 45 0 1 0 90 0a45 45 0 1 0 -90 0Z' +
  'M591 697a45 45 0 1 0 90 0a45 45 0 1 0 -90 0Z';

const svgUri = (svg) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

const iconeApp = (tamanho) =>
  svgUri(`<svg xmlns="http://www.w3.org/2000/svg" width="${tamanho}" height="${tamanho}" viewBox="0 0 1024 1024">
    <rect width="1024" height="1024" rx="230" fill="${COR.brand}"/>
    <path d="${CAMINHO_ICONE}" fill="#fff" fill-rule="evenodd"/>
  </svg>`);

// Linhas de trilhos ao fundo, com as cores reais de linhas de SP e do Rio (como no hero do site).
const decoracao = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" width="620" height="630" viewBox="0 0 620 630">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.35" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <mask id="esmaecer"><rect width="620" height="630" fill="url(#g)"/></mask>
  </defs>
  <g mask="url(#esmaecer)">
  ${[
    ['#0455A1', 'M0 90 C 160 40, 300 150, 620 70'],
    ['#EE372F', 'M0 210 C 180 260, 360 130, 620 200'],
    ['#3DF58F', 'M0 330 C 200 290, 380 400, 620 320'],
    ['#FED304', 'M0 450 C 170 500, 380 380, 620 470'],
    ['#7C3C8E', 'M0 560 C 220 520, 400 610, 620 540'],
  ]
    .map(
      ([cor, d]) =>
        `<path d="${d}" fill="none" stroke="${cor}" stroke-width="5" stroke-linecap="round" opacity="0.55"/>`,
    )
    .join('')}
  </g>
  <circle cx="330" cy="315" r="230" fill="none" stroke="${COR.signal}" stroke-width="2" opacity="0.35"/>
</svg>`);

const iconeApple = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" style="color:${COR.deep}" d="M16.37 12.6c-.02-2.1 1.72-3.12 1.8-3.17-.98-1.43-2.5-1.63-3.04-1.65-1.29-.13-2.52.76-3.18.76-.65 0-1.66-.74-2.73-.72-1.4.02-2.7.82-3.42 2.08-1.46 2.53-.37 6.28 1.05 8.33.7 1 1.52 2.13 2.6 2.09 1.05-.04 1.44-.67 2.7-.67 1.27 0 1.62.67 2.73.65 1.13-.02 1.84-1.02 2.53-2.03.8-1.16 1.13-2.29 1.14-2.35-.02-.01-2.18-.84-2.2-3.32ZM14.3 6.42c.58-.7.97-1.68.86-2.65-.83.03-1.84.55-2.44 1.25-.53.62-1 1.62-.88 2.57.93.07 1.88-.47 2.46-1.17Z"/></svg>`);

// Logo do Google Play nas cores oficiais (o mesmo de src/components/BotoesLoja.tsx).
const iconePlay = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26">
  <defs><mask id="m"><polygon points="2,1.5 2,24.5 22.5,13" fill="#fff" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></mask></defs>
  <g mask="url(#m)">
    <polygon points="0,0 0,26 11.5,13" fill="#4285F4"/>
    <polygon points="0,0 11.5,13 16.6,8.6 24,0" fill="#34A853"/>
    <polygon points="0,26 11.5,13 16.6,17.4 24,26" fill="#EA4335"/>
    <polygon points="16.6,8.6 24,13 16.6,17.4 11.5,13" fill="#FBBC04"/>
  </g>
</svg>`);

// Elemento no formato que o satori espera (sem JSX).
const h = (type, style = {}, ...children) => ({ type, props: { style, children: children.flat() } });
const img = (src, largura, altura, style = {}) => ({ type: 'img', props: { src, width: largura, height: altura, style } });

function pilula({ icone, linha1, linha2, primaria }) {
  return h(
    'div',
    {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      height: 84,
      padding: '0 34px 0 26px',
      borderRadius: 999,
      backgroundColor: primaria ? COR.signal : 'transparent',
      border: primaria ? 'none' : `2px solid #34413A`,
    },
    img(icone, 36, 36),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', lineHeight: 1 },
      h('span', { fontSize: 17, fontWeight: 400, color: primaria ? COR.deep : COR.ash, opacity: 0.85 }, linha1),
      h('span', { fontSize: 30, fontWeight: 600, color: primaria ? COR.deep : COR.cloud, marginTop: 6 }, linha2),
    ),
  );
}

const PILULA_IOS = { icone: iconeApple, linha1: 'Baixar na', linha2: 'App Store', primaria: true };
const PILULA_ANDROID = playPublicado
  ? { icone: iconePlay, linha1: 'Disponível no', linha2: 'Google Play', primaria: false }
  : { icone: iconePlay, linha1: 'Em breve no', linha2: 'Google Play', primaria: false };

const CARDS = [
  {
    arquivo: 'card-geral.png',
    rotulo: 'IPHONE E ANDROID · GRÁTIS',
    pilulas: [PILULA_IOS, PILULA_ANDROID],
  },
  {
    arquivo: 'card-ios.png',
    rotulo: 'PARA IPHONE · GRÁTIS',
    pilulas: [PILULA_IOS],
  },
  {
    arquivo: 'card-android.png',
    rotulo: playPublicado ? 'PARA ANDROID · GRÁTIS' : 'PARA ANDROID · EM BREVE',
    pilulas: [{ ...PILULA_ANDROID, primaria: playPublicado }],
  },
];

function card({ rotulo, pilulas }) {
  return h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      position: 'relative',
      backgroundColor: COR.canvas,
      fontFamily: 'Archivo',
      color: COR.cloud,
    },
    img(decoracao, 620, 630, { position: 'absolute', right: 0, top: 0 }),
    img(iconeApp(300), 300, 300, {
      position: 'absolute',
      right: 160,
      top: 165,
      borderRadius: 68,
      boxShadow: '0 40px 80px rgba(0,0,0,0.55)',
    }),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', width: 760 },
      h(
        'div',
        { display: 'flex', alignItems: 'center', gap: 18 },
        img(iconeApp(64), 64, 64, { borderRadius: 16 }),
        h('span', { fontSize: 38, fontWeight: 600, letterSpacing: -0.5 }, 'Mobility'),
      ),
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        h('span', { fontSize: 18, fontWeight: 600, letterSpacing: 4, color: COR.signal }, rotulo),
        h(
          'div',
          { display: 'flex', flexDirection: 'column', marginTop: 18, fontSize: 76, fontWeight: 300, lineHeight: 0.98, letterSpacing: -2.5 },
          h('span', {}, 'Saiba quando'),
          h('div', { display: 'flex' }, h('span', {}, 'o ônibus '), h('span', { color: COR.signal }, 'chega.')),
        ),
        h(
          'span',
          { fontSize: 26, fontWeight: 300, color: COR.ash, marginTop: 22, lineHeight: 1.35, maxWidth: 600 },
          'Ônibus, metrô, trem e VLT em tempo real em São Paulo e no Rio de Janeiro.',
        ),
      ),
      h('div', { display: 'flex', gap: 16 }, ...pilulas.map(pilula)),
    ),
  );
}

const destino = join(raiz, 'public', 'compartilhar');
mkdirSync(destino, { recursive: true });

for (const c of CARDS) {
  const svg = await satori(card(c), { width: 1200, height: 630, fonts: FONTES });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(join(destino, c.arquivo), png);
  console.log(`public/compartilhar/${c.arquivo} (${Math.round(png.length / 1024)} KB)`);
}
