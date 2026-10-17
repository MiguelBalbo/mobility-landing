<img src="public/favicon.png" width="300" alt="Logo">

# Mobility — Landing page

Site de divulgação do **Mobility**, o app de ônibus, metrô, trem e VLT em tempo real para São Paulo e Rio de Janeiro.
Tem a página inicial e as páginas de **Termos de uso** e **Política de privacidade**.

Publicado no GitHub Pages: **https://miguelbalbo.github.io/mobility-landing/**

É um repositório separado do app Expo (fica dentro da pasta do app, que o ignora no `.gitignore`), com `package.json`
e `node_modules` próprios. O Metro, o ESLint e o `tsc` do app também ignoram esta pasta.

## Stack

| Uso | Biblioteca |
| --- | --- |
| UI | React 19 + TypeScript |
| Build e servidor de desenvolvimento | Vite |
| Estilos | Tailwind CSS v4 (tokens em `@theme`, sem `tailwind.config`) |
| Cena 3D do hero | three.js + React Three Fiber + drei |
| Animações | Motion (`motion/react`) |
| Rotas | React Router |
| Textos legais | react-markdown + remark-gfm |

## Comandos

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm run typecheck  # checagem de tipos
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o dist/ localmente em http://localhost:4173/mobility-landing/
npm run sync:legal # copia ../legal/*.md do app para src/conteudo/legal/
```

## Estrutura

```
Landing/
├── index.html              # meta tags, fontes (Archivo e Spline Sans Mono) e favicon
├── vite.config.ts          # caminho base do Pages e geração das páginas de cada rota no build
├── scripts/
│   └── sincronizar-legal.mjs  # npm run sync:legal
├── .github/workflows/
│   └── deploy.yml          # build e publicação no GitHub Pages
├── public/                 # favicon
└── src/
    ├── main.tsx            # entrada (BrowserRouter)
    ├── App.tsx             # rotas, navegação, rodapé e avisos
    ├── index.css           # tokens de design (@theme) e classes base
    ├── pages/
    │   ├── Home.tsx        # monta as seções da landing
    │   ├── Legal.tsx       # Termos e Privacidade (renderiza src/conteudo/legal/*.md)
    │   └── NotFound.tsx    # 404
    ├── sections/           # Hero, FaixaStatus, Produto, Recursos, Trilhos, Privacidade, Perguntas, ChamadaFinal
    ├── components/         # Nav, Footer, Celular (mockup do app), BotoesLoja, Avisos, Icone3D, Inclinavel, Revelar…
    ├── three/              # cena 3D do hero e o contorno do ícone extrudado
    ├── conteudo/legal/     # cópia dos textos legais do app
    └── lib/
        ├── dados.ts        # links das lojas e linhas de trilhos (cores iguais às do app)
        └── avisoLoja.ts    # aviso de "ainda não disponível" nos botões das lojas
```

## Design

A estrutura segue um template "midnight gallery" (canvas escuro, títulos leves, rótulos mono e blocos coloridos),
adaptada à identidade do app:

- **Cores:** as do tema escuro do app (`src/constants/theme.ts` na raiz) — tinta esverdeada `#08110D` como fundo e o
  verde Mobility `#3DF58F` como destaque. Os tokens ficam em `src/index.css`; ao mudar a paleta do app, atualize lá.
- **Tipografia:** Archivo (a fonte do app) leve e levemente expandida nos títulos, Archivo na interface e
  Spline Sans Mono nos rótulos e dados.
- **Botões:** pílula verde com texto verde-escuro, como o `BotaoPrincipal` do app.
- **3D e movimento:** o hero tem o ícone do app extrudado em 3D com linhas de metrô e veículos ao fundo (carregado sob
  demanda); o mockup do celular e o ícone da chamada final giram com a rolagem; os cartões de recurso inclinam com o
  mouse. Tudo respeita `prefers-reduced-motion`, e a página funciona sem WebGL.

## Conteúdo

- **Textos legais:** a fonte é `legal/*.md` do app (a mesma das telas de termos). Como este repositório é separado,
  uma cópia fica versionada em `src/conteudo/legal/`: depois de editar os termos no app, rode `npm run sync:legal` e
  faça commit aqui. O título (`# …`) e a linha "Última atualização" viram o cabeçalho da página; cada `## …` entra no
  índice lateral.
- **Links das lojas:** em `LINKS_LOJA` (`src/lib/dados.ts`). Enquanto o link não começa com `http`, o clique em
  "App Store" ou "Google Play" mostra um aviso na
  própria página de que o app ainda não está disponível. Com os links reais, os botões passam a abrir as lojas sem
  mudar mais nada.
- **Status dos trilhos:** a seção "Trilhos" é uma prévia ilustrativa com dados fixos em `src/lib/dados.ts`.

## Deploy (GitHub Pages)

Cada push na `main` dispara `.github/workflows/deploy.yml`, que instala as dependências, faz o build e publica o
`dist/` no Pages. Também dá para rodar manualmente em **Actions › Deploy no GitHub Pages › Run workflow**.

Configuração única no GitHub: **Settings › Pages › Build and deployment › Source = GitHub Actions**.

Como o Pages não tem rewrite de SPA, o build (plugin `githubPages` em `vite.config.ts`):

- usa o caminho base `/mobility-landing/` (o React Router recebe o mesmo `basename`);
- copia o `index.html` para `termos/index.html` e `privacidade/index.html`, então essas URLs abrem direto com
  status 200 — ao criar uma rota nova, adicione-a em `ROTAS`;
- copia o `index.html` para `404.html`, que mostra a página de 404 do app em qualquer outro caminho;
- cria o `.nojekyll`.

**Domínio próprio:** configure em Settings › Pages › Custom domain. O workflow já lê o caminho base do Pages
(fica vazio com domínio próprio); para builds locais, use `BASE_PATH=/ npm run build`.

Links para as fichas das lojas:

- Termos: `https://miguelbalbo.github.io/mobility-landing/termos`
- Privacidade: `https://miguelbalbo.github.io/mobility-landing/privacidade`
