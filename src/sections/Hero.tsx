import { motion, useInView } from 'motion/react';
import { lazy, Suspense, useRef } from 'react';
import { BotoesLoja } from '@/components/BotoesLoja';
import { ErroSilencioso } from '@/components/ErroSilencioso';
import { Rotulo } from '@/components/Rotulo';

const CenaHero = lazy(() => import('@/three/CenaHero'));

const EASE = [0.22, 1, 0.36, 1] as const;

// Cada palavra sobe de dentro de uma máscara, em sequência.
function Palavras({ texto, atraso, enfase = false }: { texto: string; atraso: number; enfase?: boolean }) {
  return (
    <>
      {texto.split(' ').map((p, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.3, delay: atraso + i * 0.09, ease: EASE }}
          >
            {enfase ? <em>{p}</em> : p}
            {' '}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const visivel = useInView(ref);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-[max(44svh,17rem)] lg:items-center lg:pb-0 lg:pt-28">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.455, 0.03, 0.515, 0.955] }}
      >
        <ErroSilencioso>
          <Suspense fallback={null}>
            <CenaHero ativo={visivel} />
          </Suspense>
        </ErroSilencioso>
      </motion.div>
      {/* Funde a cena com o canvas embaixo e garante leitura do texto no celular */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-b from-transparent via-canvas/70 to-canvas lg:h-48 lg:via-transparent" />

      <div className="container-page">
        <div className="max-w-[800px]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: EASE }}>
            <Rotulo aoVivo>São Paulo · Rio de Janeiro</Rotulo>
          </motion.div>

          <h1 className="display mt-7 text-display">
            <Palavras texto="Saiba quando" atraso={0.45} />
            <br />
            <Palavras texto="o ônibus" atraso={0.65} />
            <Palavras texto="chega." atraso={0.83} enfase />
          </h1>

          <motion.p
            className="mt-7 max-w-[520px] text-[18px] font-light leading-relaxed text-ash"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.15, ease: EASE }}
          >
            Previsão de chegada em cada ponto, os ônibus andando no mapa e o status do metrô, trem e VLT. Grátis e sem
            cadastro.
          </motion.p>

          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
          >
            <BotoesLoja />
          </motion.div>

          <motion.ul
            className="label-mono mt-10 flex flex-wrap gap-x-6 gap-y-2 text-fog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.6 }}
          >
            <li>iOS e Android</li>
            <li>Sem login</li>
            <li>Widgets e Live Activity</li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
