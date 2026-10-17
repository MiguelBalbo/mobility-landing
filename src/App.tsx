import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Avisos } from '@/components/Avisos';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

// As páginas legais carregam o markdown e o react-markdown só quando abertas.
const Termos = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Termos })));
const Privacidade = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Privacidade })));

// Ao trocar de página, volta ao topo; com âncora (#recursos), rola até a seção.
function RolagemPorRota() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <RolagemPorRota />
      <Nav />
      <main>
        <Suspense fallback={<div className="min-h-svh" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/termos" element={<Termos />} />
            <Route path="/privacidade" element={<Privacidade />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Avisos />
    </>
  );
}
