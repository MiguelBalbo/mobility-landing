import { Link } from 'react-router';

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="label-mono text-signal">Erro 404 · Ponto não encontrado</p>
      <h1 className="display mt-5 text-display-sm">
        Esta linha <em>não passa aqui.</em>
      </h1>
      <Link to="/" className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 font-semibold text-deep hover:bg-halo">
        Voltar ao início <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
