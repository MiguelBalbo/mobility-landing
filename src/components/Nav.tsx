import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Marca } from '@/components/Marca';

const ITENS = [
  { rotulo: 'Recursos', href: '/#recursos' },
  { rotulo: 'Trilhos', href: '/#trilhos' },
  { rotulo: 'Privacidade', href: '/#privacidade' },
  { rotulo: 'Perguntas', href: '/#perguntas' },
];

// Barra fixa em vidro fosco; ganha fundo e borda depois do primeiro scroll.
export function Nav() {
  const { scrollY } = useScroll();
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const { pathname, hash } = useLocation();

  useMotionValueEvent(scrollY, 'change', (y) => setRolou(y > 24));
  useEffect(() => setAberto(false), [pathname, hash]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`mx-auto flex h-14 max-w-[1200px] items-center justify-between rounded-full pl-4 pr-2 transition-[background-color,border-color] duration-300 ${
          rolou || aberto ? 'glass' : 'border border-transparent'
        }`}
        aria-label="Principal"
      >
        <Link to="/" aria-label="Mobility, início">
          <Marca />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {ITENS.map((i) => (
            <li key={i.href}>
              <Link
                to={i.href}
                className="rounded-full px-4 py-2 text-[15px] text-ash transition-colors duration-200 hover:bg-cloud/[0.07] hover:text-cloud"
              >
                {i.rotulo}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/#baixar"
            className="hidden h-10 items-center gap-2 rounded-full bg-signal px-5 text-[15px] font-semibold text-deep transition-colors duration-200 hover:bg-halo sm:inline-flex"
          >
            Baixar grátis
            <span aria-hidden>→</span>
          </Link>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            className="grid size-10 place-items-center rounded-full text-cloud hover:bg-cloud/[0.07] md:hidden"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${aberto ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${aberto ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {aberto && (
          <motion.div
            id="menu-movel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="glass mx-auto mt-2 max-w-[1200px] rounded-[24px] p-2 md:hidden"
          >
            {ITENS.map((i) => (
              <Link key={i.href} to={i.href} className="block rounded-2xl px-4 py-3.5 text-lg text-cloud hover:bg-cloud/[0.06]">
                {i.rotulo}
              </Link>
            ))}
            <Link to="/#baixar" className="mt-1 flex h-12 items-center justify-center rounded-full bg-signal font-semibold text-deep">
              Baixar grátis
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
