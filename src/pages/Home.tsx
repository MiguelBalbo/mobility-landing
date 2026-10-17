import { useEffect } from 'react';
import { ChamadaFinal } from '@/sections/ChamadaFinal';
import { FaixaStatus } from '@/sections/FaixaStatus';
import { Hero } from '@/sections/Hero';
import { Perguntas } from '@/sections/Perguntas';
import { Privacidade } from '@/sections/Privacidade';
import { Produto } from '@/sections/Produto';
import { Recursos } from '@/sections/Recursos';
import { Trilhos } from '@/sections/Trilhos';

export default function Home() {
  useEffect(() => {
    document.title = 'Mobility — ônibus, metrô e trem em tempo real';
  }, []);

  return (
    <>
      <Hero />
      <FaixaStatus />
      <Produto />
      <Recursos />
      <Trilhos />
      <Privacidade />
      <Perguntas />
      <ChamadaFinal />
    </>
  );
}
