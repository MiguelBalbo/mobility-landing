// Conteúdo estático da landing. As cores das linhas de trilhos são as mesmas de src/widgets/apresentacao.ts do app.

// TODO: trocar pelos links das lojas quando o app for publicado. Enquanto não começam com http, os botões
// mostram o aviso de "ainda não disponível" (lib/avisoLoja.ts).
export const LINKS_LOJA = {
  appStore: '#baixar',
  googlePlay: '#baixar',
};

export type StatusTrilho = 'normal' | 'parcial' | 'paralisada';

export type LinhaTrilho = { numero: string; nome: string; cor: string; corTexto: string; operadora: string; status: StatusTrilho };

export const TRILHOS: Record<'sp' | 'rj', { cidade: string; linhas: LinhaTrilho[] }> = {
  sp: {
    cidade: 'São Paulo',
    linhas: [
      { numero: '1', nome: 'Azul', cor: '#0455A1', corTexto: '#fff', operadora: 'Metrô', status: 'normal' },
      { numero: '2', nome: 'Verde', cor: '#007E5E', corTexto: '#fff', operadora: 'Metrô', status: 'normal' },
      { numero: '3', nome: 'Vermelha', cor: '#EE372F', corTexto: '#fff', operadora: 'Metrô', status: 'parcial' },
      { numero: '4', nome: 'Amarela', cor: '#FED304', corTexto: '#111', operadora: 'ViaQuatro', status: 'normal' },
      { numero: '5', nome: 'Lilás', cor: '#7C3C8E', corTexto: '#fff', operadora: 'ViaMobilidade', status: 'normal' },
      { numero: '7', nome: 'Rubi', cor: '#A0215A', corTexto: '#fff', operadora: 'TIC Trens', status: 'normal' },
      { numero: '9', nome: 'Esmeralda', cor: '#01A9A7', corTexto: '#fff', operadora: 'ViaMobilidade', status: 'normal' },
      { numero: '11', nome: 'Coral', cor: '#F04E23', corTexto: '#fff', operadora: 'CPTM', status: 'normal' },
      { numero: '12', nome: 'Safira', cor: '#083E89', corTexto: '#fff', operadora: 'CPTM', status: 'normal' },
      { numero: '13', nome: 'Jade', cor: '#00B352', corTexto: '#fff', operadora: 'CPTM', status: 'normal' },
      { numero: '15', nome: 'Prata', cor: '#9E9E9E', corTexto: '#111', operadora: 'Metrô', status: 'normal' },
    ],
  },
  rj: {
    cidade: 'Rio de Janeiro',
    linhas: [
      { numero: '1', nome: 'Laranja', cor: '#F58220', corTexto: '#fff', operadora: 'MetrôRio', status: 'normal' },
      { numero: '2', nome: 'Verde', cor: '#00A859', corTexto: '#fff', operadora: 'MetrôRio', status: 'normal' },
      { numero: '4', nome: 'Amarela', cor: '#FDB913', corTexto: '#111', operadora: 'MetrôRio', status: 'normal' },
      { numero: '1', nome: 'Azul', cor: '#005CB9', corTexto: '#fff', operadora: 'VLT Carioca', status: 'normal' },
      { numero: '2', nome: 'Verde', cor: '#76BC21', corTexto: '#111', operadora: 'VLT Carioca', status: 'parcial' },
      { numero: '3', nome: 'Amarela', cor: '#F6BD00', corTexto: '#111', operadora: 'VLT Carioca', status: 'normal' },
      { numero: '4', nome: 'Laranja', cor: '#FA7933', corTexto: '#fff', operadora: 'VLT Carioca', status: 'normal' },
    ],
  },
};

export const STATUS_ROTULO: Record<StatusTrilho, { texto: string; curto: string; cor: string }> = {
  normal: { texto: 'Operação normal', curto: 'Normal', cor: 'var(--color-signal)' },
  parcial: { texto: 'Velocidade reduzida', curto: 'Reduzida', cor: 'var(--color-warn)' },
  paralisada: { texto: 'Paralisada', curto: 'Paralisada', cor: 'var(--color-danger)' },
};
