<img src="public/favicon.png" width="300" alt="Logo">

# Mobility — Landing page

Site de divulgação do **Mobility**, o app de ônibus, metrô, trem e VLT em tempo real para São Paulo e Rio de Janeiro.
Tem a página inicial e as páginas de **Termos de uso** e **Política de privacidade**.

É um projeto separado do app Expo: tem `package.json` e `node_modules` próprios. O Metro, o ESLint e o `tsc` da raiz
ignoram esta pasta (ver `metro.config.js`, `eslint.config.js` e `tsconfig.json` na raiz).

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
npm run preview    # serve o dist/ localmente
```

## Estrutura

```
Landing/
├── index.html              # meta tags, fontes (Archivo e Spline Sans Mono) e favicon
├── public/                 # favicon
└── src/
    ├── main.tsx            # entrada (BrowserRouter)
    ├── App.tsx             # rotas, navegação, rodapé e avisos
    ├── index.css           # tokens de design (@theme) e classes base
    ├── pages/
    │   ├── Home.tsx        # monta as seções da landing
    │   ├── Legal.tsx       # Termos e Privacidade (lidos de ../legal/*.md)
    │   └── NotFound.tsx    # 404
    ├── sections/           # Hero, FaixaStatus, Produto, Recursos, Trilhos, Privacidade, Perguntas, ChamadaFinal
    ├── components/         # Nav, Footer, Celular (mockup do app), BotoesLoja, Avisos, Icone3D, Inclinavel, Revelar…
    ├── three/              # cena 3D do hero e o contorno do ícone extrudado
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

- **Textos legais:** `src/pages/Legal.tsx` importa `../legal/termos-de-uso.md` e `../legal/politica-de-privacidade.md`,
  a mesma fonte das telas de termos do app. Edite os `.md` e as duas coisas se atualizam. O título (`# …`) e a linha
  "Última atualização" viram o cabeçalho da página; cada `## …` entra no índice lateral.
- **Links das lojas:** em `LINKS_LOJA` (`src/lib/dados.ts`). Enquanto o link não começa com `http`, o clique em
  "App Store" ou "Google Play" mostra um aviso na própria página de que o app ainda não está disponível. Com os links reais, os botões passam a abrir as
  lojas sem mudar mais nada.
- **Status dos trilhos:** a seção "Trilhos" é uma prévia ilustrativa com dados fixos em `src/lib/dados.ts`.

## Deploy

O build gera um site estático em `dist/`. Como as rotas (`/termos`, `/privacidade`) usam o histórico do navegador,
configure o host para responder `index.html` em qualquer caminho (rewrite de SPA):

- **Vercel:** `vercel.json` com `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`
- **Netlify:** arquivo `public/_redirects` com `/*  /index.html  200`
- **Firebase Hosting:** `"rewrites": [{ "source": "**", "destination": "/index.html" }]` no `firebase.json`

Os textos legais precisam ficar acessíveis por URL pública para as lojas; aponte os links de Termos e Privacidade
das fichas do app para `https://<seu-domínio>/termos` e `https://<seu-domínio>/privacidade`.
