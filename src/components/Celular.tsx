import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

// Recriação da Home do app (aba Favoritos): cartões com a faixa da cor da linha à esquerda, letreiro,
// destino e o tempo até o próximo ônibus. Os minutos descem sozinhos para dar a sensação de "ao vivo".
const LINHAS_INICIAIS = [
  { letreiro: '8000-10', destino: 'Terminal Lapa', cor: '#FB8C00', minutos: 3, preciso: true },
  { letreiro: '675K-10', destino: 'Metrô Jabaquara', cor: '#1E88E5', minutos: 7, preciso: true },
  { letreiro: '477P-10', destino: 'Ipiranga', cor: '#1B5E20', minutos: 12, preciso: false },
  { letreiro: '2290-10', destino: 'Pq. D. Pedro II', cor: '#3949AB', minutos: 18, preciso: true },
];

function useMinutosAoVivo() {
  const [linhas, setLinhas] = useState(LINHAS_INICIAIS);
  useEffect(() => {
    const id = window.setInterval(() => {
      setLinhas((atual) => atual.map((l) => ({ ...l, minutos: l.minutos <= 0 ? l.minutos + 14 : l.minutos - 1 })));
    }, 3200);
    return () => window.clearInterval(id);
  }, []);
  return linhas;
}

function SinalPrecisao({ preciso }: { preciso: boolean }) {
  return (
    <span
      className={`grid size-3.5 place-items-center rounded-full ${preciso ? 'bg-signal/20' : 'bg-warn/20'}`}
      aria-label={preciso ? 'Previsão por GPS' : 'Previsão estimada'}
    >
      <span className={`size-1.5 rounded-full ${preciso ? 'bg-signal' : 'bg-warn'}`} />
    </span>
  );
}

function Tempo({ minutos, preciso }: { minutos: number; preciso: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <SinalPrecisao preciso={preciso} />
      <div className="relative h-[38px] w-[62px] overflow-hidden text-right">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={minutos <= 1 ? 'chegando' : minutos}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col items-end justify-center"
          >
            {minutos <= 1 ? (
              <span className="text-[12px] font-bold text-signal">Chegando</span>
            ) : (
              <>
                <span className="text-[20px] font-bold leading-[22px] text-cloud">{minutos}</span>
                <span className="text-[10px] text-ash">min</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function BarraAbas() {
  const abas = ['Home', 'Linhas', 'Buscar', 'Ajustes'];
  return (
    <div className="absolute inset-x-3 bottom-3 flex h-[58px] items-center justify-around rounded-full border border-cloud/10 bg-raised/80 backdrop-blur-xl">
      {abas.map((a, i) => (
        <div key={a} className="flex flex-col items-center gap-1">
          <span className={`block size-[18px] rounded-md ${i === 0 ? 'bg-signal' : 'bg-fog/50'}`} />
          <span className={`text-[9px] ${i === 0 ? 'text-signal' : 'text-fog'}`}>{a}</span>
        </div>
      ))}
    </div>
  );
}

export function TelaApp() {
  const linhas = useMinutosAoVivo();
  return (
    <div className="relative h-full w-full overflow-hidden bg-canvas font-sans">
      {/* Barra de status */}
      <div className="flex items-center justify-between px-7 pt-4 text-[12px] font-semibold text-cloud">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-4 rounded-[3px] border border-cloud/70" />
        </span>
      </div>

      <div className="px-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-fog">Cidade</p>
            <p className="text-[19px] font-bold text-cloud">São Paulo ⌄</p>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-surface text-[15px] text-ash">⚙</span>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-[24px] border border-line bg-surface px-4 py-3">
          <span className="size-3.5 rounded-full border-2 border-fog" />
          <span className="text-[13px] text-fog">Buscar linha ou ponto</span>
        </div>

        <div className="mt-4 grid grid-cols-2 rounded-full bg-surface p-1 text-center text-[12px] font-semibold">
          <span className="rounded-full bg-raised py-1.5 text-cloud">Favoritos</span>
          <span className="py-1.5 text-fog">Recentes</span>
        </div>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-fog">Linhas</p>
        <div>
          {linhas.map((l) => (
            <div key={l.letreiro} className="mt-2.5 flex overflow-hidden rounded-xl bg-abyss">
              <span className="w-1.5" style={{ backgroundColor: l.cor }} />
              <div className="flex flex-1 items-center gap-3 py-2.5 pl-3 pr-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] text-cloud">{l.letreiro}</p>
                  <p className="truncate text-[12px] text-ash">{l.destino}</p>
                </div>
                <Tempo minutos={l.minutos} preciso={l.preciso} />
                <span className="text-fog">›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BarraAbas />
    </div>
  );
}

// Moldura do aparelho: o gradiente "dark chrome" do sistema é o único usado em superfícies.
export function Celular({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19.2] w-[300px] rounded-[54px] p-[11px] shadow-[0_60px_120px_-30px_rgb(0_0_0/0.8),inset_0_0_0_1px_rgb(255_255_255/0.08)] ${className}`}
      style={{ background: 'linear-gradient(135deg, rgb(43,48,46), rgb(16,20,18))' }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[44px]">
        <TelaApp />
        <div className="absolute left-1/2 top-2.5 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
