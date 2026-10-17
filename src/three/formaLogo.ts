import { Path, Shape } from 'three';

// Contorno do ícone do app (assets/images/icon.png, grade de 1024): o "ônibus" com retrovisores, o M vazado
// e os dois faróis. Coordenadas da imagem (y para baixo) convertidas para unidades da cena, centradas.
const ESCALA = 1 / 100;
const px = (x: number) => (x - 512) * ESCALA;
const py = (y: number) => -(y - 512) * ESCALA;

// Constante do arco de 90° por Bézier cúbica.
const K = 0.5523;

function canto(s: Shape, cx: number, cy: number, x: number, y: number, fromX: number, fromY: number) {
  // De (fromX, fromY) até (x, y), arredondando em torno do canto (cx, cy).
  s.bezierCurveTo(
    px(fromX + (cx - fromX) * K), py(fromY + (cy - fromY) * K),
    px(x + (cx - x) * K), py(y + (cy - y) * K),
    px(x), py(y),
  );
}

export function criarFormaLogo(): Shape {
  const s = new Shape();
  const r = 120;
  const rr = 26;

  s.moveTo(px(264 + r), py(210));
  s.lineTo(px(760 - r), py(210));
  canto(s, 760, 210, 760, 210 + r, 760 - r, 210);
  s.lineTo(px(760), py(413));
  // Retrovisor direito
  s.lineTo(px(809 - rr), py(413));
  canto(s, 809, 413, 809, 413 + rr, 809 - rr, 413);
  s.lineTo(px(809), py(553 - rr));
  canto(s, 809, 553, 809 - rr, 553, 809, 553 - rr);
  s.lineTo(px(760), py(553));
  s.lineTo(px(760), py(812 - r));
  canto(s, 760, 812, 760 - r, 812, 760, 812 - r);
  s.lineTo(px(264 + r), py(812));
  canto(s, 264, 812, 264, 812 - r, 264 + r, 812);
  s.lineTo(px(264), py(553));
  // Retrovisor esquerdo
  s.lineTo(px(214 + rr), py(553));
  canto(s, 214, 553, 214, 553 - rr, 214 + rr, 553);
  s.lineTo(px(214), py(413 + rr));
  canto(s, 214, 413, 214 + rr, 413, 214, 413 + rr);
  s.lineTo(px(264), py(413));
  s.lineTo(px(264), py(210 + r));
  canto(s, 264, 210, 264 + r, 210, 264, 210 + r);

  // M vazado
  const m = new Path();
  const pontosM: [number, number][] = [
    [333, 320], [429, 320], [511, 401], [594, 320], [690, 320], [690, 530],
    [616, 530], [616, 393], [511, 496], [408, 393], [408, 530], [333, 530],
  ];
  pontosM.forEach(([x, y], i) => (i === 0 ? m.moveTo(px(x), py(y)) : m.lineTo(px(x), py(y))));
  m.closePath();
  s.holes.push(m);

  // Faróis
  for (const cx of [388, 636]) {
    const farol = new Path();
    farol.absarc(px(cx), py(697), 45 * ESCALA, 0, Math.PI * 2, true);
    s.holes.push(farol);
  }

  return s;
}
