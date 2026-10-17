import type { ReactNode } from 'react';
import { Inclinavel } from '@/components/Inclinavel';
import { Revelar } from '@/components/Revelar';

// Cartões de recurso: a cor do bloco é o que diferencia cada um (como os painéis do template), com a
// paleta do app — verde Mobility, menta, verde profundo, âmbar de alerta e as superfícies escuras.
type Bloco = {
  rotulo: string;
  titulo: ReactNode;
  texto: string;
  classe: string;
  visual: ReactNode;
  span: string;
};

function VisualPrevisao() {
  return (
    <div className="flex items-end gap-6">
      <p className="text-[clamp(5rem,12vw,9rem)] font-extralight leading-[0.8] tracking-[-0.05em] [font-stretch:110%]">
        3<span className="ml-2 text-[0.28em] font-normal tracking-normal">min</span>
      </p>
      <ul className="label-mono mb-2 space-y-1.5 text-deep/80">
        <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-deep" />GPS do veículo</li>
        <li className="flex items-center gap-2"><span className="size-2 rounded-full border border-deep" />Estimada</li>
      </ul>
    </div>
  );
}

function VisualMapa() {
  const caminho = 'M10 120 C 60 120, 70 40, 130 50 S 200 110, 250 30';
  return (
    <svg viewBox="0 0 260 150" className="w-full max-w-[280px]" aria-hidden="true">
      <path d={caminho} fill="none" stroke="#04361F" strokeOpacity="0.2" strokeWidth="10" strokeLinecap="round" />
      <path d={caminho} fill="none" stroke="#04361F" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" />
      {[[10, 120], [92, 62], [168, 82], [250, 30]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="#A3F3C8" stroke="#04361F" strokeWidth="3" />
      ))}
      <g>
        <rect x="-11" y="-8" width="22" height="16" rx="5" fill="#04361F" />
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto" path={caminho} />
      </g>
    </svg>
  );
}

function VisualTelaApagada() {
  return (
    <div className="w-full max-w-[260px] rounded-[22px] bg-black/35 p-3.5 backdrop-blur [transform:translateZ(40px)]">
      <div className="flex items-center justify-between text-paper">
        <span className="rounded-md bg-[#FB8C00] px-1.5 py-0.5 text-[12px] font-bold">8000-10</span>
        <span className="text-[18px] font-bold text-signal">Chegando</span>
      </div>
      <div className="mt-3 h-1 rounded-full bg-white/15">
        <div className="h-full w-[92%] rounded-full bg-signal" />
      </div>
    </div>
  );
}

function VisualWidgets() {
  return (
    <div className="flex gap-3 [transform:translateZ(40px)]">
      <div className="flex size-[104px] flex-col justify-between rounded-[22px] bg-canvas p-3">
        <span className="label-mono text-[8px] text-fog">Metrô</span>
        <div className="flex -space-x-1.5">
          {['#0455A1', '#007E5E', '#EE372F', '#FED304'].map((c) => (
            <span key={c} className="size-5 rounded-full ring-2 ring-canvas" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-[11px] text-signal">Tudo normal</span>
      </div>
      <div className="flex size-[104px] flex-col justify-between rounded-[22px] bg-canvas p-3">
        <span className="label-mono text-[8px] text-fog">Ônibus</span>
        <span className="text-[30px] font-bold leading-none text-cloud">12</span>
        <span className="text-[11px] text-ash">min · 477P</span>
      </div>
    </div>
  );
}

function VisualTrilhos() {
  const linhas = [
    { n: '1', c: '#0455A1', s: 'Normal' },
    { n: '3', c: '#EE372F', s: 'Reduzida' },
    { n: '4', c: '#FED304', s: 'Normal', t: '#111' },
  ];
  return (
    <ul className="w-full max-w-[240px] space-y-2 [transform:translateZ(30px)]">
      {linhas.map((l) => (
        <li key={l.n} className="flex items-center justify-between rounded-full bg-[#2B1B00]/10 py-1.5 pl-1.5 pr-4">
          <span className="grid size-7 place-items-center rounded-full text-[12px] font-bold" style={{ backgroundColor: l.c, color: l.t ?? '#fff' }}>{l.n}</span>
          <span className="label-mono text-[#2B1B00]">{l.s}</span>
        </li>
      ))}
    </ul>
  );
}

function VisualFavoritos() {
  const itens = [
    { t: '8000-10', c: '#FB8C00' },
    { t: 'Av. Paulista, 1578', c: '#3DF58F' },
    { t: '675K-10', c: '#1E88E5' },
    { t: 'Metrô Sé', c: '#3DF58F' },
    { t: '477P-10', c: '#1B5E20' },
  ];
  return (
    <div className="flex flex-wrap gap-2 [transform:translateZ(30px)]">
      {itens.map((i) => (
        <span key={i.t} className="inline-flex items-center gap-2 rounded-full border border-signal/20 bg-canvas/60 py-2 pl-2 pr-4 text-[14px] text-cloud">
          <span className="h-4 w-1.5 rounded-full" style={{ backgroundColor: i.c }} />
          {i.t}
        </span>
      ))}
    </div>
  );
}

const BLOCOS: Bloco[] = [
  {
    rotulo: '01 · Previsão',
    titulo: <>O tempo até o <em className="not-italic">próximo ônibus</em></>,
    texto: 'Em cada ponto, para cada linha. O sinal mostra se a previsão vem do GPS do veículo ou é estimada.',
    classe: 'bg-signal text-deep',
    visual: <VisualPrevisao />,
    span: 'md:col-span-6 lg:col-span-4',
  },
  {
    rotulo: '02 · Mapa',
    titulo: 'Ônibus andando no mapa',
    texto: 'Trajeto, pontos e a posição dos veículos, atualizados sozinhos.',
    classe: 'bg-mint text-deep',
    visual: <VisualMapa />,
    span: 'md:col-span-3 lg:col-span-2',
  },
  {
    rotulo: '03 · Tela apagada',
    titulo: 'Acompanhe sem abrir o app',
    texto: 'Live Activity no iOS e notificação no Android avisam quando o ônibus está chegando.',
    classe: 'bg-forest text-paper',
    visual: <VisualTelaApagada />,
    span: 'md:col-span-3 lg:col-span-2',
  },
  {
    rotulo: '04 · Widgets',
    titulo: 'Na tela inicial',
    texto: 'Próximo ônibus, suas linhas e o status de metrô e trem, sem abrir nada.',
    classe: 'bg-raised text-cloud border border-line',
    visual: <VisualWidgets />,
    span: 'md:col-span-3 lg:col-span-2',
  },
  {
    rotulo: '05 · Trilhos',
    titulo: 'Metrô, trem e VLT',
    texto: 'O status de cada linha e o mapa da rede, que funciona até sem internet.',
    classe: 'bg-warn text-[#2B1B00]',
    visual: <VisualTrilhos />,
    span: 'md:col-span-3 lg:col-span-2',
  },
  {
    rotulo: '06 · Favoritos',
    titulo: 'Suas linhas, a um toque',
    texto: 'Linhas e pontos favoritos e recentes ficam guardados só no seu aparelho.',
    classe: 'bg-moss text-cloud',
    visual: <VisualFavoritos />,
    span: 'md:col-span-6 lg:col-span-6',
  },
];

export function Recursos() {
  return (
    <section id="recursos" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-page">
        <Revelar className="mx-auto max-w-[760px] text-center">
          <p className="label-mono text-signal">Recursos</p>
          <h2 className="display mt-5 text-display-sm">
            Feito para o <em>dia a dia</em> no transporte.
          </h2>
        </Revelar>

        <div className="mt-16 grid gap-3 md:grid-cols-6">
          {BLOCOS.map((b, i) => {
            const largo = i === BLOCOS.length - 1;
            const textos = (
              <div className="[transform:translateZ(24px)]">
                <h3 className={`font-light leading-[1] tracking-[-0.02em] [font-stretch:108%] ${i === 0 ? 'text-[clamp(2rem,3.4vw,2.75rem)]' : 'text-heading'}`}>
                  {b.titulo}
                </h3>
                <p className="mt-3 max-w-[440px] text-[15px] leading-relaxed opacity-80">{b.texto}</p>
              </div>
            );
            return (
              <Revelar key={b.rotulo} atraso={(i % 3) * 0.08} className={b.span}>
                <Inclinavel intensidade={largo ? 3 : 6} className={`rounded-tile ${b.classe}`}>
                  {largo ? (
                    <article className="relative grid h-full min-h-[260px] gap-10 overflow-hidden rounded-tile p-8 lg:grid-cols-2 lg:items-end" style={{ transformStyle: 'preserve-3d' }}>
                      <div className="flex h-full flex-col justify-between gap-10">
                        <p className="label-mono opacity-70">{b.rotulo}</p>
                        {textos}
                      </div>
                      <div className="[transform:translateZ(50px)]">{b.visual}</div>
                    </article>
                  ) : (
                    <article
                      className={`relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-tile p-8 ${i === 0 ? 'min-h-[400px]' : 'min-h-[380px]'}`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div>
                        <p className="label-mono opacity-70">{b.rotulo}</p>
                        <div className="mt-8 [transform:translateZ(50px)]">{b.visual}</div>
                      </div>
                      {textos}
                    </article>
                  )}
                </Inclinavel>
              </Revelar>
            );
          })}
        </div>
      </div>
    </section>
  );
}
