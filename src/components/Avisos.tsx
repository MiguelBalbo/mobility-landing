import { AnimatePresence, motion } from 'motion/react';
import { SimboloMobility } from '@/components/Marca';
import { fecharAviso, useAvisos } from '@/lib/avisoLoja';

// Aviso flutuante no rodapé da tela, no mesmo vidro da navegação.
export function Avisos() {
  const avisos = useAvisos();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <AnimatePresence>
        {avisos.map((a) => (
          <motion.div
            key={a.id}
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="glass pointer-events-auto flex w-full max-w-[420px] items-start gap-3 rounded-[22px] p-4 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-signal text-deep">
              <SimboloMobility className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-cloud">{a.titulo}</p>
              <p className="mt-0.5 text-[14px] leading-snug text-ash">{a.texto}</p>
            </div>
            <button
              type="button"
              onClick={() => fecharAviso(a.id)}
              className="grid size-7 shrink-0 place-items-center rounded-full text-fog hover:bg-cloud/10 hover:text-cloud"
              aria-label="Fechar aviso"
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
