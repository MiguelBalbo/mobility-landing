import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Revelar } from '@/components/Revelar';
import { STATUS_ROTULO, TRILHOS } from '@/lib/dados';

type Cidade = keyof typeof TRILHOS;

export function Trilhos() {
  const [cidade, setCidade] = useState<Cidade>('sp');
  const dados = TRILHOS[cidade];

  return (
    <section id="trilhos" className="scroll-mt-24 border-y border-line bg-abyss py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Revelar className="max-w-[640px]">
            <p className="label-mono text-signal">Metrô · Trem · VLT</p>
            <h2 className="display mt-5 text-display-sm">
              Antes de sair, <em>veja os trilhos.</em>
            </h2>
            <p className="mt-6 max-w-[480px] text-[18px] font-light leading-relaxed text-ash">
              O status de cada linha nas duas cidades, no app e nos widgets. E o mapa da rede guardado para consultar sem
              internet.
            </p>
          </Revelar>

          <Revelar atraso={0.1}>
            <div role="tablist" aria-label="Cidade" className="inline-flex rounded-full border border-line bg-surface p-1">
              {(Object.keys(TRILHOS) as Cidade[]).map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={cidade === c}
                  onClick={() => setCidade(c)}
                  className={`relative rounded-full px-5 py-2.5 text-[15px] transition-colors duration-200 ${cidade === c ? 'text-deep' : 'text-ash hover:text-cloud'}`}
                >
                  {cidade === c && (
                    <motion.span layoutId="aba-cidade" className="absolute inset-0 rounded-full bg-signal" transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
                  )}
                  <span className="relative font-medium">{TRILHOS[c].cidade}</span>
                </button>
              ))}
            </div>
          </Revelar>
        </div>

        <div className="mt-14 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.ul
              key={cidade}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              initial="fora"
              animate="dentro"
              exit="saindo"
              variants={{ dentro: { transition: { staggerChildren: 0.04 } } }}
            >
              {dados.linhas.map((l) => {
                const status = STATUS_ROTULO[l.status];
                return (
                  <motion.li
                    key={`${l.operadora}-${l.numero}`}
                    variants={{
                      fora: { opacity: 0, y: 14 },
                      dentro: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                      saindo: { opacity: 0, y: -8, transition: { duration: 0.2 } },
                    }}
                    className="flex items-center gap-4 rounded-card border border-line bg-surface p-4 transition-colors duration-200 hover:bg-raised"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full text-[16px] font-bold" style={{ backgroundColor: l.cor, color: l.corTexto }}>
                      {l.numero}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[17px] text-cloud">Linha {l.numero} – {l.nome}</p>
                      <p className="label-mono text-smoke">{l.operadora}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-2 text-[13px]" style={{ color: status.cor }} title={status.texto}>
                      <span className="size-2 rounded-full" style={{ backgroundColor: status.cor }} />
                      {status.curto}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
        <p className="label-mono mt-6 text-smoke">Prévia ilustrativa. No app, o status vem dos canais oficiais das operadoras.</p>
      </div>
    </section>
  );
}
