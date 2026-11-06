import { Link } from 'react-router';

// Endereço "Incorporar" do Formulário Google de suporte (Enviar › <> › copiar o src do iframe, que termina em
// "?embedded=true"). Vazio = a página mostra só o e-mail.
const URL_FORMULARIO = 'https://docs.google.com/forms/d/e/1FAIpQLSeSPd7Lm2UGdyuCtWNoXkdFkdrKsxfxibDhzOr8FiqfxEDiAg/viewform?embedded=true';
// Formulário com envio de captura de tela: o Google exige login para anexar arquivos e não deixa incorporar.
const URL_FORMULARIO_COM_PRINT = 'https://docs.google.com/forms/d/e/1FAIpQLSf6dRTxuyHVtmKe5bnnXh9w6nT_gCcPnwdvHaf1MRWkrn7aCg/viewform?usp=header';

const EMAIL = 'destny.miguel@gmail.com';

const DUVIDAS: { p: string; r: string }[] = [
  {
    p: 'A previsão não aparece ou mostra "Sem previsão"',
    r: 'A previsão depende de ônibus em operação: de madrugada e em linhas com poucos horários pode não haver nenhum a caminho. Confira também se a localização está permitida ou escolha o ponto tocando nele no mapa da linha.',
  },
  {
    p: 'Aparece "Dados offline" ou "Conexão lenta"',
    r: 'O app não conseguiu falar com o servidor a tempo e mostra os últimos dados salvos, com o horário. Verifique a internet e toque no aviso para tentar de novo.',
  },
  {
    p: 'Em quais cidades o Mobility funciona?',
    r: 'São Paulo e Rio de Janeiro. Fora delas, escolha uma das duas em Ajustes › Cidade para consultar as linhas.',
  },
  {
    p: 'Como acompanhar o ônibus com a tela apagada?',
    r: 'Abra a linha, escolha o ponto e toque no sino. No iPhone o acompanhamento aparece como Atividade ao Vivo: se não aparecer, ative em Ajustes › Mobility › Atividades ao Vivo.',
  },
  {
    p: 'Como adicionar os widgets?',
    r: 'Escolha as linhas em Ajustes › Widgets no app. Depois toque e segure a tela inicial, toque em Editar › Adicionar widget e procure por Mobility.',
  },
  {
    p: 'Vi um anúncio impróprio',
    r: 'Toque em "Denunciar anúncio" no próprio anúncio ou em Ajustes › Privacidade › Denunciar um anúncio. Também pode nos escrever pelo formulário abaixo.',
  },
  {
    p: 'Privacidade, dados pessoais e anúncios personalizados',
    r: 'O Mobility não pede cadastro. Estatísticas de uso e anúncios personalizados podem ser ligados ou desligados em Ajustes › Privacidade. Pedidos sobre seus dados (LGPD) podem ser feitos pelo e-mail do encarregado.',
  },
];

export default function Suporte() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-line pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="container-page">
          <p className="label-mono text-signal">Suporte</p>
          <h1 className="display mt-5 text-display-sm">
            Como podemos <em>ajudar?</em>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ash">
            Dúvidas, problemas no app, sugestões ou pedidos sobre os seus dados: escreva para nós. Respondemos em até
            5 dias úteis (pedidos da LGPD, em até 15 dias).
          </p>
        </div>
      </header>

      <div className="container-page grid gap-14 py-16 md:py-20 lg:grid-cols-[1fr_1.1fr]">
        <section aria-labelledby="contato">
          <h2 id="contato" className="text-[28px] font-light leading-tight text-cloud [font-stretch:105%]">Fale com a gente</h2>
          {URL_FORMULARIO ? (
            <>
              <p className="mt-4 text-[16px] leading-relaxed text-ash">
                Preencha o formulário abaixo. Se preferir, escreva para{' '}
                <a className="text-signal underline underline-offset-4" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
              <a
                href={URL_FORMULARIO_COM_PRINT}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-signal">
                <span>
                  <span className="block text-[16px] font-medium text-cloud">Quer enviar uma captura de tela?</span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-fog">
                    Use este outro formulário. Para anexar arquivos, o Google pede que você entre na sua conta.
                  </span>
                </span>
                <span aria-hidden className="text-signal">↗</span>
              </a>
              <iframe
                src={URL_FORMULARIO}
                title="Formulário de suporte do Mobility"
                className="mt-8 h-[1900px] w-full rounded-2xl border border-line bg-white"
                loading="lazy"
              >
                Carregando…
              </iframe>
            </>
          ) : (
            <div className="mt-8 rounded-2xl border border-line p-8">
              <p className="label-mono text-smoke">E-mail</p>
              <a className="mt-3 block break-all text-[22px] text-signal underline underline-offset-4" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Suporte Mobility')}`}>
                {EMAIL}
              </a>
              <p className="mt-4 text-[15px] leading-relaxed text-ash">
                Conte o que aconteceu, a cidade, a linha e o modelo do celular. Se puder, envie um print da tela.
              </p>
            </div>
          )}
          <p className="mt-8 text-[15px] leading-relaxed text-fog">
            Veja também os <Link className="text-ash underline underline-offset-4 hover:text-cloud" to="/termos">Termos de uso</Link> e a{' '}
            <Link className="text-ash underline underline-offset-4 hover:text-cloud" to="/privacidade">Política de privacidade</Link>.
          </p>
        </section>

        <section aria-labelledby="duvidas">
          <h2 id="duvidas" className="text-[28px] font-light leading-tight text-cloud [font-stretch:105%]">Dúvidas frequentes</h2>
          <dl className="mt-8 space-y-8">
            {DUVIDAS.map(({ p, r }) => (
              <div key={p} className="border-t border-line pt-6">
                <dt className="text-[17px] font-medium text-cloud">{p}</dt>
                <dd className="mt-2 text-[16px] leading-[1.7] text-ash">{r}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
