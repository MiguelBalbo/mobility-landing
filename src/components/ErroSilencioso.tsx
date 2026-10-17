import { Component, type ReactNode } from 'react';

// Se o WebGL não estiver disponível (ou a cena falhar), a página segue sem o 3D em vez de quebrar.
export class ErroSilencioso extends Component<{ children: ReactNode }, { falhou: boolean }> {
  state = { falhou: false };
  static getDerivedStateFromError() {
    return { falhou: true };
  }
  render() {
    return this.state.falhou ? null : this.props.children;
  }
}
