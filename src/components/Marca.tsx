// Marca do app em SVG: o mesmo desenho do ícone (assets/images/icon.png), com o M e os faróis vazados.
const CAMINHO =
  'M384 210H640A120 120 0 0 1 760 330V413H783A26 26 0 0 1 809 439V527A26 26 0 0 1 783 553H760V692A120 120 0 0 1 640 812H384A120 120 0 0 1 264 692V553H240A26 26 0 0 1 214 527V439A26 26 0 0 1 240 413H264V330A120 120 0 0 1 384 210Z' +
  'M333 320H429L511 401L594 320H690V530H616V393L511 496L408 393V530H333Z' +
  'M343 697a45 45 0 1 0 90 0a45 45 0 1 0 -90 0Z' +
  'M591 697a45 45 0 1 0 90 0a45 45 0 1 0 -90 0Z';

export function SimboloMobility({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="200 196 624 630" className={className} aria-hidden="true">
      <path d={CAMINHO} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

export function Marca({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid size-8 place-items-center rounded-[10px] bg-signal text-deep">
        <SimboloMobility className="size-[18px]" />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-cloud">Mobility</span>
    </span>
  );
}
