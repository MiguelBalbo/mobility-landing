import { motion, type HTMLMotionProps } from 'motion/react';

type Props = HTMLMotionProps<'div'> & { atraso?: number; distancia?: number };

// Entrada suave ao rolar: sobe, ganha opacidade e foco. Uma vez só, sem molas nem overshoot.
export function Revelar({ atraso = 0, distancia = 28, children, ...resto }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distancia, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.1, delay: atraso, ease: [0.22, 1, 0.36, 1] }}
      {...resto}
    >
      {children}
    </motion.div>
  );
}
