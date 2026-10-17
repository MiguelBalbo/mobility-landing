import { Link } from 'react-router';
import { Marca } from '@/components/Marca';

export function Footer() {
  return (
    <footer className="border-t border-line bg-abyss">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Marca />
          <p className="mt-5 text-[15px] leading-relaxed text-fog">
            Ônibus, metrô, trem e VLT em tempo real em São Paulo e no Rio de Janeiro. Grátis e sem cadastro.
          </p>
          <p className="mt-6 text-[13px] leading-relaxed text-smoke">
            O Mobility não é um aplicativo oficial e não tem vínculo com a SPTrans, o Metrô, a CPTM, o MetrôRio, as
            Prefeituras ou as concessionárias. Previsões são estimativas de fontes públicas.
          </p>
        </div>
        <nav aria-label="Produto">
          <p className="label-mono text-smoke">Produto</p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><Link className="text-ash transition-colors hover:text-cloud" to="/#recursos">Recursos</Link></li>
            <li><Link className="text-ash transition-colors hover:text-cloud" to="/#trilhos">Status dos trilhos</Link></li>
            <li><Link className="text-ash transition-colors hover:text-cloud" to="/#perguntas">Perguntas frequentes</Link></li>
            <li><Link className="text-ash transition-colors hover:text-cloud" to="/#baixar">Baixar o app</Link></li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="label-mono text-smoke">Legal</p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li><Link className="text-ash transition-colors hover:text-cloud" to="/termos">Termos de uso</Link></li>
            <li><Link className="text-ash transition-colors hover:text-cloud" to="/privacidade">Política de privacidade</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-line py-6 text-[13px] text-smoke sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Mobility</span>
        <span className="label-mono">Feito para quem pega ônibus</span>
      </div>
    </footer>
  );
}
