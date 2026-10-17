import type { ReactNode } from 'react';

// Pílula de sobrancelha acima dos títulos (mono, caixa alta).
export function Rotulo({ children, aoVivo = false }: { children: ReactNode; aoVivo?: boolean }) {
  return (
    <span className="label-mono inline-flex items-center gap-2.5 rounded-full border border-cloud/12 bg-cloud/[0.06] px-4 py-1.5 text-cloud">
      {aoVivo && <span className="size-1.5 rounded-full bg-signal animate-pulse-live" />}
      {children}
    </span>
  );
}
