import { BotoesLoja } from '@/components/BotoesLoja';
import { Icone3D } from '@/components/Icone3D';
import { Revelar } from '@/components/Revelar';

export function ChamadaFinal() {
  return (
    <section id="baixar" className="relative scroll-mt-24 overflow-hidden pb-28 pt-12 md:pb-40">
      <div className="container-page text-center">
        <Icone3D />
        <Revelar>
          <h2 className="display mx-auto mt-8 max-w-[900px] text-display">
            Chegue no ponto <em>na hora certa.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-[460px] text-[18px] font-light leading-relaxed text-ash">
            Baixe o Mobility e pare de esperar no escuro. Grátis para iPhone e Android.
          </p>
          <div className="mt-10">
            <BotoesLoja centro />
          </div>
        </Revelar>
      </div>
    </section>
  );
}
