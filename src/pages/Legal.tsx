import { motion, useScroll, useSpring } from 'motion/react';
import { Children, isValidElement, useEffect, useMemo, useState, type ReactNode } from 'react';
import Markdown, { type Components } from 'react-markdown';
import { Link } from 'react-router';
import remarkGfm from 'remark-gfm';
// Cópia de legal/*.md do app (mesma fonte das telas de termos); atualize com `npm run sync:legal`.
import privacidadeMd from '@/conteudo/legal/politica-de-privacidade.md?raw';
import termosMd from '@/conteudo/legal/termos-de-uso.md?raw';

type Documento = { titulo: string; atualizacao: string | null; corpo: string; secoes: { id: string; titulo: string }[] };

const slug = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function textoDe(no: ReactNode): string {
  if (typeof no === 'string' || typeof no === 'number') return String(no);
  if (Array.isArray(no)) return no.map(textoDe).join('');
  if (isValidElement<{ children?: ReactNode }>(no)) return textoDe(no.props.children);
  return Children.toArray(no).map(textoDe).join('');
}

// O título (# ...) e a linha "Última atualização" vão para o cabeçalho da página; o resto é o corpo.
function lerDocumento(md: string): Documento {
  const linhas = md.split('\n');
  const titulo = linhas.find((l) => l.startsWith('# '))?.slice(2).trim() ?? '';
  const linhaData = linhas.find((l) => /^Última atualização:/i.test(l));
  const corpo = linhas.filter((l) => !l.startsWith('# ') && l !== linhaData).join('\n').trim();
  const secoes = linhas
    .filter((l) => l.startsWith('## '))
    .map((l) => {
      const t = l.slice(3).trim();
      return { id: slug(t), titulo: t };
    });
  return { titulo, atualizacao: linhaData?.replace(/^Última atualização:\s*/i, '') ?? null, corpo, secoes };
}

const componentes: Components = {
  h2: ({ children }) => (
    <h2 id={slug(textoDe(children))} className="mt-16 scroll-mt-28 border-t border-line pt-10 text-[28px] font-light leading-tight tracking-[-0.01em] text-cloud [font-stretch:105%] first:mt-0 first:border-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slug(textoDe(children))} className="mt-10 scroll-mt-28 text-[19px] font-medium text-cloud">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-5 text-[16.5px] leading-[1.75] text-ash">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 space-y-2.5">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2.5 pl-5">{children}</ol>,
  li: ({ children }) => (
    <li className="relative pl-6 text-[16.5px] leading-[1.7] text-ash before:absolute before:left-0 before:top-[0.72em] before:h-[2px] before:w-3 before:rounded-full before:bg-signal">
      {children}
    </li>
  ),
  strong: ({ children }) => <strong className="font-semibold text-cloud">{children}</strong>,
  a: ({ href, children }) => {
    const externo = href?.startsWith('http');
    return (
      <a
        href={href}
        className="break-words text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:decoration-signal"
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  },
};

function useSecaoAtiva(ids: string[]) {
  const [ativa, setAtiva] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visiveis[0]) setAtiva(visiveis[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return ativa;
}

function PaginaLegal({ md, rotulo, outro }: { md: string; rotulo: string; outro: { para: string; texto: string } }) {
  const doc = useMemo(() => lerDocumento(md), [md]);
  const ids = useMemo(() => doc.secoes.map((s) => s.id), [doc]);
  const ativa = useSecaoAtiva(ids);
  const { scrollYProgress } = useScroll();
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.title = `${doc.titulo} — Mobility`;
  }, [doc.titulo]);

  return (
    <article>
      <motion.div className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-signal" style={{ scaleX: progresso }} />

      <header className="relative overflow-hidden border-b border-line pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="container-page">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
            <p className="label-mono text-signal">{rotulo}</p>
            <h1 className="display mt-5 text-display-sm">{doc.titulo}</h1>
            {doc.atualizacao && (
              <p className="label-mono mt-8 text-fog">
                Última atualização · <span className="text-ash">{doc.atualizacao}</span>
              </p>
            )}
          </motion.div>
        </div>
      </header>

      <div className="container-page grid gap-14 py-16 md:py-20 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <nav aria-label="Seções" className="sticky top-28">
            <p className="label-mono text-smoke">Nesta página</p>
            <ol className="mt-5 space-y-1 border-l border-line">
              {doc.secoes.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`-ml-px block border-l py-1.5 pl-4 text-[14px] leading-snug transition-colors duration-200 ${
                      ativa === s.id ? 'border-signal text-cloud' : 'border-transparent text-fog hover:text-ash'
                    }`}
                  >
                    {s.titulo}
                  </a>
                </li>
              ))}
            </ol>
            <Link to={outro.para} className="mt-10 inline-flex items-center gap-2 text-[14px] text-signal hover:underline">
              {outro.texto} <span aria-hidden>→</span>
            </Link>
          </nav>
        </aside>

        <motion.div
          className="max-w-[720px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Markdown remarkPlugins={[remarkGfm]} components={componentes}>
            {doc.corpo}
          </Markdown>

          <div className="mt-20 flex flex-col gap-4 rounded-card border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] text-ash">Leia também</p>
            <Link to={outro.para} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] text-cloud transition-colors hover:bg-steel">
              {outro.texto} <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}

export function Termos() {
  return <PaginaLegal md={termosMd} rotulo="Documento legal · Termos" outro={{ para: '/privacidade', texto: 'Política de privacidade' }} />;
}

export function Privacidade() {
  return <PaginaLegal md={privacidadeMd} rotulo="Documento legal · LGPD" outro={{ para: '/termos', texto: 'Termos de uso' }} />;
}
