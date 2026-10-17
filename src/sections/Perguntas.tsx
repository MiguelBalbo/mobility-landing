import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';
import { Link } from 'react-router';
import { Revelar } from '@/components/Revelar';

const PERGUNTAS: { p: string; r: React.ReactNode }[] = [
  {
    p: 'O Mobility é grátis?',
    r: 'Sim. O app se mantém com anúncios do Google AdMob. Eles são genéricos, a menos que você permita a personalização (só para maiores de 18 anos), e você pode mudar isso em Ajustes › Privacidade.',
  },
  {
    p: 'Preciso criar uma conta?',
    r: 'Não. Não pedimos nome, e-mail, telefone nem documento. Seus favoritos e recentes ficam guardados só no aparelho.',
  },
  {
    p: 'Em quais cidades funciona?',
    r: 'Em São Paulo (ônibus da SPTrans, metrô e trens) e no Rio de Janeiro (ônibus municipais, MetrôRio e VLT Carioca). Novas cidades podem aparecer no app sem precisar atualizar.',
  },
  {
    p: 'As previsões são precisas?',
    r: 'Elas são estimativas das fontes públicas de transporte e podem variar com o trânsito, desvios ou falhas de GPS dos veículos. O sinal ao lado do tempo indica se a previsão vem do GPS do ônibus ou é estimada.',
  },
  {
    p: 'O app é oficial da SPTrans ou da Prefeitura?',
    r: 'Não. O Mobility é independente e não tem vínculo com a SPTrans, o Metrô, a CPTM, o MetrôRio, as Prefeituras ou as concessionárias. Ele usa dados públicos dessas fontes.',
  },
  {
    p: 'O acompanhamento gasta muita bateria?',
    r: (
      <>
        Quando é atualizado pelo aparelho, ele usa a localização em segundo plano só enquanto estiver ativo; quando é
        atualizado pelo servidor, dispensa a localização em segundo plano. Nos dois casos, termina quando o ônibus chega
        ou quando você o encerra, e pode aumentar um pouco o consumo de bateria e dados. Mais detalhes nos{' '}
        <Link to="/termos" className="text-signal underline-offset-4 hover:underline">Termos de uso</Link>.
      </>
    ),
  },
];

function Item({ p, r, aberto, alternar }: { p: string; r: React.ReactNode; aberto: boolean; alternar: () => void }) {
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={alternar}
          aria-expanded={aberto}
          aria-controls={id}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] text-cloud transition-colors hover:text-signal md:text-[21px]"
        >
          {p}
          <span className={`grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-ash transition-transform duration-300 ${aberto ? 'rotate-45' : ''}`} aria-hidden>
            +
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[680px] pb-7 text-[16px] leading-relaxed text-ash">{r}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Perguntas() {
  const [aberto, setAberto] = useState<number | null>(0);
  return (
    <section id="perguntas" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.6fr]">
        <Revelar>
          <p className="label-mono text-signal">Perguntas frequentes</p>
          <h2 className="display mt-5 text-heading md:text-[3rem]">
            Dúvidas <em>comuns.</em>
          </h2>
        </Revelar>
        <Revelar atraso={0.1} className="border-t border-line">
          {PERGUNTAS.map((q, i) => (
            <Item key={q.p} p={q.p} r={q.r} aberto={aberto === i} alternar={() => setAberto(aberto === i ? null : i)} />
          ))}
        </Revelar>
      </div>
    </section>
  );
}
