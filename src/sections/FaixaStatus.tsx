import { TRILHOS } from '@/lib/dados';

// Letreiro contínuo com as linhas de trilhos, no estilo dos painéis das estações.
export function FaixaStatus() {
  const itens = [...TRILHOS.sp.linhas.map((l) => ({ ...l, uf: 'SP' })), ...TRILHOS.rj.linhas.map((l) => ({ ...l, uf: 'RJ' }))];
  const sequencia = [...itens, ...itens];

  return (
    <div className="relative overflow-hidden border-y border-line bg-abyss py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {sequencia.map((l, i) => (
          <span key={i} className="label-mono flex items-center gap-3 whitespace-nowrap text-ash">
            <span className="grid size-6 place-items-center rounded-full text-[10px] font-medium tracking-normal" style={{ backgroundColor: l.cor, color: l.corTexto }}>
              {l.numero}
            </span>
            <span className="text-cloud">{l.uf} · {l.nome}</span>
            <span className="text-smoke">{l.operadora}</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-abyss to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-abyss to-transparent" />
    </div>
  );
}
