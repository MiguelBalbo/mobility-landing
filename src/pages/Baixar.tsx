import { motion } from 'motion/react';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { BotoesLoja } from '@/components/BotoesLoja';
import { SimboloMobility } from '@/components/Marca';
import { detectarPlataforma, linkDaLoja, type Plataforma } from '@/lib/plataforma';

// Links de compartilhamento: /baixar (detecta o aparelho), /baixar/ios e /baixar/android. No site publicado, o
// HTML de cada rota já redireciona antes do React carregar (vite.config.ts); esta página cobre a navegação
// dentro do site, o computador (mostra as lojas e um QR code) e a plataforma em que o app ainda não está.

const NOME_LOJA: Record<Plataforma, string> = { ios: 'App Store', android: 'Google Play' };
const EASE = [0.22, 1, 0.36, 1] as const;

function useQrCode(url: string) {
  const [svg, setSvg] = useState<string | null>(null);
  useEffect(() => {
    QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: '#08110D', light: '#0000' } })
      .then(setSvg)
      .catch(() => setSvg(null));
  }, [url]);
  return svg;
}

export default function Baixar({ plataforma }: { plataforma?: Plataforma }) {
  const [alvo] = useState(() => plataforma ?? detectarPlataforma());
  const link = alvo ? linkDaLoja(alvo) : null;
  const urlCompartilhar = `${window.location.origin}${import.meta.env.BASE_URL}baixar`;
  const qr = useQrCode(urlCompartilhar);

  useEffect(() => {
    document.title = plataforma ? `Mobility para ${plataforma === 'ios' ? 'iPhone' : 'Android'}` : 'Baixe o Mobility';
  }, [plataforma]);

  useEffect(() => {
    if (link) window.location.replace(link);
  }, [link]);

  const titulo = link ? (
    <>
      Abrindo a <em>{NOME_LOJA[alvo!]}…</em>
    </>
  ) : alvo === 'android' ? (
    <>
      Em breve no <em>Google Play.</em>
    </>
  ) : (
    <>
      Baixe o <em>Mobility.</em>
    </>
  );

  const texto = link
    ? 'Se a loja não abrir sozinha, toque no botão abaixo.'
    : alvo === 'android'
      ? 'O Mobility ainda não chegou ao Android. Enquanto isso, ele já está disponível para iPhone na App Store.'
      : 'Ônibus, metrô, trem e VLT em tempo real em São Paulo e no Rio de Janeiro. Grátis, sem cadastro.';

  return (
    <section className="container-page flex min-h-[88svh] flex-col items-center justify-center pb-16 pt-32 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
        <span className="mx-auto grid size-20 place-items-center rounded-[22px] bg-brand text-white shadow-[0_24px_60px_-20px_rgb(20_200_106/0.6)]">
          <SimboloMobility className="size-11" />
        </span>
        <h1 className="display mt-9 text-display-sm">{titulo}</h1>
        <p className="mx-auto mt-6 max-w-[460px] text-[18px] font-light leading-relaxed text-ash">{texto}</p>

        <div className="mt-10">
          {link ? (
            <a
              href={link}
              className="inline-flex h-14 items-center gap-2 rounded-full bg-signal px-7 text-[17px] font-semibold text-deep transition-colors hover:bg-halo"
            >
              Abrir a {NOME_LOJA[alvo!]} <span aria-hidden>→</span>
            </a>
          ) : (
            <BotoesLoja centro />
          )}
        </div>
      </motion.div>

      {/* No computador, o QR code leva o link para o celular */}
      {!alvo && qr && (
        <motion.div
          className="mt-14 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          <div
            className="size-[168px] rounded-[24px] bg-paper p-4 [&_svg]:size-full"
            role="img"
            aria-label="QR code para baixar o Mobility no celular"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <p className="label-mono text-fog">Aponte a câmera do celular</p>
        </motion.div>
      )}

      <Link to="/" className="mt-14 text-[15px] text-fog underline-offset-4 hover:text-cloud hover:underline">
        Conhecer o Mobility
      </Link>
    </section>
  );
}
