import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { SimboloMobility } from '@/components/Marca';

const CAMADAS = 16;

// Ícone do app em 3D só com CSS: camadas empilhadas em Z dão a espessura, e a rolagem gira a peça.
export function Icone3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const rotY = useTransform(p, [0, 1], reduzir ? [-18, -18] : [-55, 40]);
  const rotX = useTransform(p, [0, 1], reduzir ? [12, 12] : [28, -14]);
  const y = useTransform(p, [0, 1], reduzir ? [0, 0] : [40, -40]);

  return (
    <div ref={ref} className="relative mx-auto grid h-[260px] w-[260px] place-items-center [perspective:900px]">
      <div className="absolute bottom-2 h-10 w-44 rounded-full bg-signal/30 blur-2xl" />
      <motion.div style={{ rotateX: rotX, rotateY: rotY, y, transformStyle: 'preserve-3d' }} className="relative size-[176px]">
        {Array.from({ length: CAMADAS }, (_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-[46px]"
            style={{
              transform: `translateZ(${-i * 1.5}px)`,
              backgroundColor: i === 0 ? '#14C86A' : `color-mix(in oklab, #0B8247 ${100 - i * 3}%, #04361F)`,
            }}
          />
        ))}
        <div
          className="absolute inset-0 grid place-items-center rounded-[46px]"
          style={{
            transform: 'translateZ(1px)',
            background: 'linear-gradient(150deg, rgb(255 255 255 / 0.28), rgb(255 255 255 / 0) 45%)',
          }}
        >
          <SimboloMobility className="size-[92px] text-white drop-shadow-[0_6px_10px_rgb(4_54_31/0.35)]" />
        </div>
      </motion.div>
    </div>
  );
}
