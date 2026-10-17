import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { PointerEvent, ReactNode } from 'react';

type Props = { children: ReactNode; className?: string; intensidade?: number; style?: React.CSSProperties };

// Cartão que inclina em 3D seguindo o ponteiro, com um reflexo que acompanha a luz.
// Os filhos podem usar `translateZ` (classe `[transform:translateZ(40px)]`) para ganhar profundidade.
export function Inclinavel({ children, className = '', intensidade = 8, style }: Props) {
  const reduzir = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const molaX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 });
  const molaY = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 });
  const rotY = useTransform(molaX, [0, 1], [-intensidade, intensidade]);
  const rotX = useTransform(molaY, [0, 1], [intensidade, -intensidade]);
  const brilhoX = useTransform(molaX, [0, 1], ['0%', '100%']);
  const brilhoY = useTransform(molaY, [0, 1], ['0%', '100%']);
  const brilho = useMotionTemplate`radial-gradient(520px circle at ${brilhoX} ${brilhoY}, rgb(255 255 255 / 0.16), transparent 45%)`;

  const mover = (e: PointerEvent<HTMLDivElement>) => {
    if (reduzir || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const sair = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div className="[perspective:1100px]" style={style}>
      <motion.div
        onPointerMove={mover}
        onPointerLeave={sair}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className={`group relative h-full ${className}`}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: brilho }}
        />
      </motion.div>
    </div>
  );
}
