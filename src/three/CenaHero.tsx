import { Environment, Float, Grid, Lightformer } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import {
  CapsuleGeometry,
  CatmullRomCurve3,
  Color,
  ExtrudeGeometry,
  type Group,
  type Mesh,
  Vector3,
} from 'three';
import { criarFormaLogo } from '@/three/formaLogo';

// Linhas de trilhos atravessando a cena ao fundo, com as cores reais de algumas linhas de SP e do Rio.
const LINHAS = [
  { cor: '#0455A1', pontos: [[-14, 2.6, -6], [-5, 3.4, -5], [3, 1.6, -7], [14, 3.2, -6]] },
  { cor: '#EE372F', pontos: [[-14, -0.6, -8], [-6, 0.8, -6.5], [2, -1.2, -9], [14, 0.4, -8]] },
  { cor: '#FED304', pontos: [[-14, -2.4, -4.5], [-4, -1.4, -5.5], [5, -2.8, -4], [14, -1.6, -5]] },
  { cor: '#7C3C8E', pontos: [[-14, 4.6, -10], [-3, 5.2, -9], [6, 3.8, -11], [14, 5, -10]] },
  { cor: '#3DF58F', pontos: [[-14, 0.9, -3.5], [-7, -0.2, -2.8], [1, 1.4, -4.2], [8, 0.2, -3], [14, 1.2, -3.6]] },
  { cor: '#F58220', pontos: [[-14, -4.2, -7], [-2, -3.2, -8], [7, -4.6, -6.5], [14, -3.6, -7.5]] },
] as const;

const reduzMovimento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Suavização exponencial independente do frame rate.
const amortecer = (atual: number, alvo: number, lambda: number, dt: number) =>
  atual + (alvo - atual) * (1 - Math.exp(-lambda * dt));

// Entrada lenta (2,4 s) com a curva "calm" do sistema.
const easeCalm = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function LinhaTrilho({ cor, pontos, indice, parado }: { cor: string; pontos: readonly (readonly number[])[]; indice: number; parado: boolean }) {
  const curva = useMemo(() => new CatmullRomCurve3(pontos.map((p) => new Vector3(p[0], p[1], p[2]))), [pontos]);
  const veiculos = useRef<(Mesh | null)[]>([]);
  const cores = useMemo(() => new Color(cor), [cor]);
  const velocidade = 0.018 + (indice % 3) * 0.006;
  const sentido = indice % 2 === 0 ? 1 : -1;
  const estacoes = useMemo(() => [0.18, 0.42, 0.66, 0.88].map((t) => curva.getPointAt(t)), [curva]);
  const tangente = useMemo(() => new Vector3(), []);
  // A cápsula nasce em pé (eixo Y); deitada no eixo Z, o lookAt a alinha com o trilho.
  const capsula = useMemo(() => new CapsuleGeometry(0.09, 0.42, 6, 12).rotateX(Math.PI / 2), []);

  useFrame(({ clock }) => {
    const tempo = parado ? 0 : clock.elapsedTime;
    veiculos.current.forEach((v, i) => {
      if (!v) return;
      let t = (tempo * velocidade * sentido + i / 3 + indice * 0.13) % 1;
      if (t < 0) t += 1;
      v.position.copy(curva.getPointAt(t));
      curva.getTangentAt(t, tangente);
      v.lookAt(v.position.x + tangente.x, v.position.y + tangente.y, v.position.z + tangente.z);
    });
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curva, 160, 0.045, 10, false]} />
        <meshStandardMaterial color={cores} emissive={cores} emissiveIntensity={0.55} roughness={0.4} transparent opacity={0.85} />
      </mesh>
      {estacoes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial color="#E8EFEA" emissive="#E8EFEA" emissiveIntensity={0.2} />
        </mesh>
      ))}
      {[0, 1, 2].map((i) => (
        <mesh key={i} geometry={capsula} ref={(m) => { veiculos.current[i] = m; }}>
          <meshStandardMaterial color="#F4F8F5" emissive={cores} emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Logo({ parado }: { parado: boolean }) {
  const grupo = useRef<Group>(null);
  const anel = useRef<Group>(null);
  const ponteiro = useRef({ x: 0, y: 0 });
  const { size, viewport } = useThree();
  const compacto = size.width < 1024;
  // Em telas estreitas o ícone fica no topo, acima do texto, e encolhe com a largura visível da cena.
  const escala = compacto ? Math.min(0.36, viewport.width * 0.07) : 0.56;

  const geometria = useMemo(() => {
    const g = new ExtrudeGeometry(criarFormaLogo(), {
      depth: 1.1,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.12,
      bevelSegments: 8,
      curveSegments: 48,
    });
    g.center();
    return g;
  }, []);

  useEffect(() => () => geometria.dispose(), [geometria]);

  useEffect(() => {
    const mover = (e: PointerEvent) => {
      ponteiro.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ponteiro.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', mover, { passive: true });
    return () => window.removeEventListener('pointermove', mover);
  }, []);

  useFrame(({ clock }, dt) => {
    const g = grupo.current;
    if (!g) return;
    const entrada = parado ? 1 : easeCalm(Math.min(clock.elapsedTime / 2.4, 1));
    const rolagem = Math.min(window.scrollY / window.innerHeight, 1.5);

    const baseX = compacto ? 0 : 3.7;
    const baseY = compacto ? viewport.height * 0.27 : 0.1;
    g.position.x = baseX;
    g.position.y = amortecer(g.position.y, baseY + rolagem * 2.2, 6, dt);
    g.scale.setScalar(escala * (0.7 + 0.3 * entrada));

    const giroEntrada = (1 - entrada) * -Math.PI * 0.9;
    const alvoY = parado ? -0.35 : ponteiro.current.x * 0.45 - 0.35 + giroEntrada + rolagem * 1.1;
    const alvoX = parado ? 0.12 : ponteiro.current.y * 0.25 + 0.12 - rolagem * 0.3;
    g.rotation.y = amortecer(g.rotation.y, alvoY, 4, dt);
    g.rotation.x = amortecer(g.rotation.x, alvoX, 4, dt);

    if (anel.current && !parado) {
      anel.current.rotation.z += dt * 0.35;
    }
  });

  return (
    <group ref={grupo}>
      <Float speed={parado ? 0 : 1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh geometry={geometria} castShadow>
          <meshPhysicalMaterial
            color="#3DF58F"
            emissive="#0B6B3C"
            emissiveIntensity={0.35}
            roughness={0.22}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.12}
            sheen={0.4}
            sheenColor="#A3F3C8"
          />
        </mesh>
        {/* Rota em volta do ícone, com um veículo percorrendo o anel */}
        <group ref={anel} rotation={[1.15, 0.2, 0]}>
          <mesh>
            <torusGeometry args={[4.6, 0.025, 12, 200]} />
            <meshStandardMaterial color="#63F5A6" emissive="#3DF58F" emissiveIntensity={0.8} transparent opacity={0.6} />
          </mesh>
          <mesh position={[4.6, 0, 0]}>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial color="#F4F8F5" emissive="#3DF58F" emissiveIntensity={2} toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function CenaHero({ ativo }: { ativo: boolean }) {
  const parado = useMemo(reduzMovimento, []);

  return (
    <Canvas
      frameloop={ativo ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 13], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <fog attach="fog" args={['#08110D', 10, 26]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 8]} intensity={1.6} color="#F4F8F5" />
      <pointLight position={[-6, -2, 4]} intensity={30} color="#3DF58F" distance={20} />

      {LINHAS.map((l, i) => (
        <LinhaTrilho key={l.cor} cor={l.cor} pontos={l.pontos} indice={i} parado={parado} />
      ))}

      <Logo parado={parado} />

      <Grid
        position={[0, -4.6, 0]}
        args={[60, 60]}
        cellSize={0.8}
        cellThickness={0.6}
        cellColor="#16241D"
        sectionSize={4}
        sectionThickness={1}
        sectionColor="#22332A"
        fadeDistance={34}
        fadeStrength={1.6}
        infiniteGrid
      />

      {/* Ambiente gerado na hora (sem HDR externo): reflexos suaves verdes e brancos no ícone */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#F4F8F5" position={[0, 5, -9]} scale={[12, 2, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#63F5A6" position={[-6, 1, 3]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={0.9} color="#7AA7FF" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={1.2} color="#3DF58F" position={[0, -4, 6]} scale={3} />
      </Environment>
    </Canvas>
  );
}
