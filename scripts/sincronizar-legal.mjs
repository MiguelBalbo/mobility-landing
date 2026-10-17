// Copia os textos legais do app (../legal/*.md) para src/conteudo/legal/. O repositório da landing é separado,
// então os arquivos ficam versionados aqui; rode `npm run sync:legal` depois de editar os termos no app.
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = join(raiz, '..', 'legal');
const destino = join(raiz, 'src', 'conteudo', 'legal');

if (!existsSync(origem)) {
  console.error(`Pasta ${origem} não encontrada (a landing precisa estar dentro do projeto do app).`);
  process.exit(1);
}
mkdirSync(destino, { recursive: true });
for (const arquivo of readdirSync(origem).filter((a) => a.endsWith('.md'))) {
  copyFileSync(join(origem, arquivo), join(destino, arquivo));
  console.log(`legal/${arquivo} → src/conteudo/legal/${arquivo}`);
}
