import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Celular } from '@/components/Celular';
import { Revelar } from '@/components/Revelar';
import { SimboloMobility } from '@/components/Marca';

const PASSOS = [
  { n: '01', titulo: 'Busque a linha ou o ponto', texto: 'Pelo número, pelo nome ou pelo mapa. O ponto mais perto de você aparece primeiro.' },
  { n: '02', titulo: 'Veja o ônibus chegando', texto: 'O trajeto, os veículos em movimento e o tempo até o próximo, com o sinal de precisão.' },
  { n: '03', titulo: 'Guarde o celular', texto: 'Ative o acompanhamento: a tela de bloqueio avisa quando for a hora de ir para o ponto.' },
];

function LiveActivity() {
  return (
    <div className="glass w-[290px] rounded-[26px] p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-[7px] bg-signal text-deep">
            <SimboloMobility className="size-3.5" />
          </span>
          <span className="rounded-md px-1.5 py-0.5 text-[13px] font-bold text-white" style={{ backgroundColor: '#FB8C00' }}>8000-10</span>
        </span>
        <span className="text-[22px] font-bold leading-none text-signal">3 min</span>
      </div>
      <p className="mt-2 text-[12px] text-ash">Terminal Lapa · Pça. Ramos de Azevedo</p>
      <div className="relative mt-3 h-1.5 rounded-full bg-cloud/10">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-signal"
          initial={{ width: '30%' }}
          whileInView={{ width: '78%' }}
          viewport={{ once: false }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

function WidgetMini() {
  return (
    <div className="flex size-[156px] flex-col justify-between rounded-[30px] border border-cloud/8 bg-surface p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
      <span className="label-mono text-[9px] text-fog">Próximo ônibus</span>
      <div>
        <span className="rounded-md px-1.5 py-0.5 text-[12px] font-bold text-white" style={{ backgroundColor: '#1E88E5' }}>675K-10</span>
        <p className="mt-1.5 truncate text-[11px] text-ash">Metrô Jabaquara</p>
      </div>
      <p className="text-[34px] font-bold leading-none text-cloud">
        7<span className="ml-1 text-[13px] font-normal text-ash">min</span>
      </p>
    </div>
  );
}

export function Produto() {
  const palco = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: palco, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  const rotX = useTransform(p, [0, 0.5, 1], reduzir ? [0, 0, 0] : [32, 6, -8]);
  const rotY = useTransform(p, [0, 0.5, 1], reduzir ? [0, 0, 0] : [-28, -12, 6]);
  const rotZ = useTransform(p, [0, 0.5], reduzir ? [0, 0] : [8, 2]);
  const yCelular = useTransform(p, [0, 1], reduzir ? [0, 0] : [90, -60]);
  const yAtividade = useTransform(p, [0, 1], reduzir ? [0, 0] : [180, -140]);
  const yWidget = useTransform(p, [0, 1], reduzir ? [0, 0] : [40, -200]);

  return (
    <section className="relative py-28 md:py-40">
      <div className="container-page grid items-center gap-20 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Revelar>
            <p className="label-mono text-signal">Como funciona</p>
            <h2 className="display mt-5 text-display-sm">
              O ponto inteiro <em>na palma da mão.</em>
            </h2>
            <p className="mt-6 max-w-[460px] text-[18px] font-light leading-relaxed text-ash">
              Nada de ficar olhando para a rua. O Mobility mostra onde o ônibus está e quanto falta, com dados das fontes
              públicas de transporte.
            </p>
          </Revelar>

          <ol className="mt-12 space-y-2">
            {PASSOS.map((passo, i) => (
              <Revelar key={passo.n} atraso={i * 0.12}>
                <li className="group grid grid-cols-[52px_1fr] gap-4 rounded-[20px] p-4 transition-colors duration-300 hover:bg-surface">
                  <span className="label-mono pt-1 text-smoke transition-colors group-hover:text-signal">{passo.n}</span>
                  <div>
                    <p className="text-[19px] font-medium text-cloud">{passo.titulo}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-fog">{passo.texto}</p>
                  </div>
                </li>
              </Revelar>
            ))}
          </ol>
        </div>

        <div ref={palco} className="relative flex h-[640px] items-center justify-center [perspective:1400px] md:h-[720px]">
          {/* Brilho volumétrico sob o aparelho */}
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[110px]" />

          <motion.div style={{ rotateX: rotX, rotateY: rotY, rotateZ: rotZ, y: yCelular, transformStyle: 'preserve-3d' }} className="relative">
            <Celular />
          </motion.div>

          <motion.div
            style={{ y: yAtividade }}
            className="absolute -left-2 top-[14%] hidden sm:block lg:-left-10"
          >
            <p className="label-mono mb-2 pl-2 text-fog">Tela de bloqueio</p>
            <LiveActivity />
          </motion.div>

          <motion.div style={{ y: yWidget }} className="absolute -right-2 bottom-[10%] hidden sm:block lg:-right-6">
            <p className="label-mono mb-2 pl-2 text-fog">Widget</p>
            <WidgetMini />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
