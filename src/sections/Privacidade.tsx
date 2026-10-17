import { animate, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Revelar } from '@/components/Revelar';

function Contador({ ate, sufixo = '' }: { ate: number; sufixo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref, { once: true });
  const [valor, setValor] = useState(0);
  useEffect(() => {
    if (!visivel || ate === 0) return;
    const c = animate(0, ate, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValor(Math.round(v)) });
    return () => c.stop();
  }, [visivel, ate]);
  return <span ref={ref}>{valor}{sufixo}</span>;
}

const NUMEROS = [
  { ate: 0, sufixo: '', texto: 'cadastros, logins ou e-mails pedidos' },
  { ate: 0, sufixo: '', texto: 'coordenadas de GPS enviadas aos nossos servidores' },
  { ate: 100, sufixo: '%', texto: 'dos favoritos e do histórico guardados no seu aparelho' },
];

// Cartão invertido (claro): quebra o ritmo escuro uma única vez, para o recado mais importante.
export function Privacidade() {
  return (
    <section id="privacidade" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-page">
        <Revelar>
          <div className="relative overflow-hidden rounded-tile bg-cloud p-8 text-[#0F1A15] md:p-14 lg:p-20">
            <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              <div>
                <p className="label-mono text-[#4B594F]">Privacidade</p>
                <h2 className="mt-5 text-display-sm font-light [font-stretch:108%]">
                  O seu GPS <em className="text-forest">fica</em> no seu celular.
                </h2>
                <p className="mt-6 max-w-[500px] text-[18px] font-light leading-relaxed text-[#34413A]">
                  O GPS é usado no próprio aparelho para achar o ponto mais perto e acompanhar a chegada. Só o mapa de
                  pontos e o acompanhamento pelo servidor enviam uma área ou um ponto, nunca as coordenadas. Sem conta,
                  sem perfil. Estatísticas de uso e anúncios personalizados só se você permitir, e dá para mudar em
                  Ajustes a qualquer momento.
                </p>
                <Link
                  to="/privacidade"
                  className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-[#0F1A15] px-6 text-[15px] font-semibold text-paper transition-colors duration-200 hover:bg-[#1F2B25]"
                >
                  Ler a política de privacidade <span aria-hidden>→</span>
                </Link>
              </div>

              <dl className="divide-y divide-[#0F1A15]/12 border-y border-[#0F1A15]/12">
                {NUMEROS.map((n, i) => (
                  <motion.div
                    key={n.texto}
                    className="flex items-baseline gap-6 py-6"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <dt className="w-[120px] shrink-0 text-[64px] font-extralight leading-none tracking-[-0.04em] [font-stretch:110%]">
                      <Contador ate={n.ate} sufixo={n.sufixo} />
                    </dt>
                    <dd className="text-[15px] leading-snug text-[#4B594F]">{n.texto}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
