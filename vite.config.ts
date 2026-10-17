import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

// GitHub Pages publica o repositório em https://miguelbalbo.github.io/mobility-landing/. Com domínio próprio,
// rode o build com BASE_PATH=/ (ou ajuste o workflow).
const BASE_PRODUCAO = process.env.BASE_PATH ?? '/mobility-landing/';

// Rotas do React Router que precisam de um HTML próprio no Pages.
const ROTAS = ['termos', 'privacidade'];

// O Pages não tem rewrite de SPA: copia o index.html para cada rota (abre com status 200) e para o 404.html
// (qualquer outro caminho cai na página de 404 do app). O .nojekyll evita que o Pages processe o dist.
function githubPages(): Plugin {
  let saida = 'dist';
  return {
    name: 'github-pages',
    apply: 'build',
    configResolved(config) {
      saida = config.build.outDir;
    },
    closeBundle() {
      const index = join(saida, 'index.html');
      for (const rota of ROTAS) {
        mkdirSync(join(saida, rota), { recursive: true });
        copyFileSync(index, join(saida, rota, 'index.html'));
      }
      copyFileSync(index, join(saida, '404.html'));
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
