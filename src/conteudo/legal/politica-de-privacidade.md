# Política de Privacidade

Última atualização: 17 de outubro de 2026 · Versão 2

Esta Política de Privacidade explica, de forma direta, quais informações o aplicativo **Mobility** ("Mobility", "aplicativo", "nós") trata, por que, com quem e por quanto tempo, e como você controla cada uma delas. Ela segue a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD).

## Resumo

- **Sem cadastro:** não pedimos nome, e-mail, telefone ou documento.
- **Seus dados ficam no aparelho:** favoritos, recentes, histórico de buscas, widgets e preferências são guardados só no seu celular.
- **O GPS é processado no aparelho.** A sua localização aproximada só pode ser deduzida pelo nosso servidor em dois casos, ambos acionados por você: no **mapa de pontos** e no **acompanhamento de um ônibus** (seção 2.2).
- **Estatísticas de uso e anúncios personalizados só com a sua permissão**, e você pode mudar de ideia a qualquer momento em Ajustes.
- **Não vendemos dados** e não criamos perfis seus. Seus direitos estão na seção 7 e o contato do encarregado, na seção 1.

## 1. Quem é o responsável

O controlador dos dados tratados pelo Mobility é **Miguel Balbo Victor**, pessoa física, que pode ser contatado pelo e-mail **destny.miguel@gmail.com**.

O encarregado pelo tratamento de dados pessoais (art. 41 da LGPD) é **Miguel Balbo Victor**, pelo mesmo e-mail: **destny.miguel@gmail.com**.

## 2. Quais informações tratamos

### 2.1 O que fica só no seu aparelho

O Mobility guarda localmente, **apenas no seu aparelho**, e não envia para nós:

- a cidade escolhida e o tema do aplicativo;
- linhas e pontos favoritos e as linhas e pontos dos widgets;
- linhas e pontos abertos recentemente;
- o histórico das últimas buscas;
- o estado de um acompanhamento em andamento;
- uma cópia do mapa da rede de trilhos, para consulta sem internet;
- os registros das suas escolhas: a data em que você aceitou os Termos de uso e esta Política, a versão da Política que você já viu, a sua escolha sobre anúncios personalizados (com a data, a versão da Política e se você declarou ter 18 anos ou mais) e a sua escolha sobre as estatísticas de uso (com a data e a versão da Política).

Você pode remover esses dados pelo próprio aplicativo (tocando e segurando um favorito ou recente) ou apagando os dados do aplicativo / desinstalando-o. Como o registro das suas escolhas fica só no aparelho, ao apagá-lo o aplicativo pedirá as escolhas de novo.

### 2.2 Localização

Com a sua permissão, o Mobility acessa a localização do aparelho para mostrar você no mapa, sugerir a sua cidade na primeira abertura, encontrar o ponto de ônibus mais próximo em cada linha e acompanhar a chegada do ônibus com a tela apagada.

**As coordenadas do GPS são processadas no seu aparelho.** Elas não são enviadas aos nossos servidores, ao Google, aos anunciantes ou às estatísticas de uso, e não são armazenadas por nós. Há apenas **duas situações**, ambas iniciadas por você, em que o nosso servidor recebe uma informação que indica, de forma aproximada, onde você está:

- **Mapa de pontos.** Ao abrir o mapa de pontos, ele fica centrado na sua posição. Para listar os pontos de ônibus da área, o aplicativo envia ao servidor os **limites da região visível na tela** (latitude e longitude mínimas e máximas, no máximo cerca de 11 km de lado). Esses limites são usados apenas para responder à consulta: não são gravados, não entram em registros do servidor e não são repassados a terceiros.
- **Acompanhamento do ônibus.** Ao iniciar um acompanhamento, o servidor recebe o **código do ponto** que estava selecionado, normalmente o mais próximo de você, junto com um código para enviar notificações ao seu aparelho. A sua posição não é usada depois disso. Os detalhes estão na seção 2.4.

O mesmo vale, em menor grau, para as consultas de previsão: o código do ponto consultado pode indicar onde você está ou para onde vai (seção 2.3).

Você pode negar ou revogar a permissão de localização a qualquer momento nos ajustes do sistema. O aplicativo continua funcionando, mas sem os recursos que dependem dela.

### 2.3 Consultas ao nosso servidor

Para mostrar linhas, posições dos ônibus, previsões de chegada e o status das linhas de trilhos, inclusive nos widgets, o aplicativo consulta o nosso servidor. O servidor, por sua vez, consulta fontes públicas de transporte (seção 4). Nessas consultas são enviados apenas:

- a cidade escolhida;
- o termo digitado na busca de linhas;
- os códigos da linha e do ponto consultados;
- no mapa de pontos, os limites da região exibida na tela (seção 2.2);
- um código de acesso temporário (válido por 2 horas), igual para todos os aparelhos, que não identifica você.

Como em qualquer conexão pela internet, o servidor também recebe dados técnicos, como o endereço IP, a data e a hora da requisição. O IP é usado apenas por alguns instantes, em memória, para limitar o número de requisições por minuto e proteger o serviço contra abusos. **O servidor não mantém registro de acesso com o seu IP** e não associa as consultas a você.

Para responder mais rápido, o servidor guarda em memória, por até 12 horas, as respostas de buscas de linhas já feitas, sem nenhum vínculo com quem buscou. Os registros técnicos de funcionamento, como avisos de falha das fontes de transporte, não incluem o seu IP, os termos de busca nem a região do mapa, e são apagados em até 30 dias.

### 2.4 Notificações e acompanhamento do ônibus

Quando você ativa o acompanhamento de uma linha, o Mobility mostra a previsão de chegada na Live Activity (iOS) ou numa notificação (Android) e avisa quando o ônibus estiver chegando. O acompanhamento usa o ponto que estava selecionado no momento em que você o iniciou: o nosso servidor calcula a previsão desse ponto a cada minuto e envia as atualizações ao seu aparelho por notificações push.

Para isso, o aplicativo envia ao servidor apenas:

- um **código de envio de notificações** gerado pela Apple (Apple Push Notification service, inclusive o código da Live Activity) ou pelo Google (Firebase Cloud Messaging), que serve só para entregar a notificação neste aparelho;
- a cidade, o código da linha, o **código do ponto** escolhido e os textos exibidos no acompanhamento (o letreiro, o destino e o nome do ponto).

A sua localização do GPS **não** é enviada, e o aplicativo **não usa a localização em segundo plano**. O servidor usa esses dados **somente** para calcular a previsão e enviar as atualizações daquele acompanhamento. Eles não são usados para publicidade, estatísticas ou qualquer outra finalidade, não são associados ao seu IP e são **apagados** quando o ônibus chega, quando você encerra o acompanhamento ou, no máximo, **2 horas** depois do início, o que ocorrer primeiro.

As notificações push são entregues pela Apple (no iOS) ou pelo Google (no Android), que recebem o código de envio e o conteúdo da notificação (a linha, o ponto e a previsão). **Não usamos notificações para publicidade.** Você pode desligar as notificações do Mobility a qualquer momento nos ajustes do sistema. Sem elas, no iOS a Live Activity continua funcionando, mas você não recebe o aviso de chegada; no Android, o acompanhamento não funciona.

### 2.5 Configuração remota (Firebase)

O Mobility usa o **Firebase Remote Config** (Google LLC) para receber configurações do serviço sem precisar de uma nova versão do aplicativo, como o endereço do nosso servidor. Para isso, o SDK do Firebase instalado no aplicativo envia ao Google:

- um identificador de instalação do Firebase, gerado aleatoriamente para esta instalação do aplicativo e que não identifica você nem o seu aparelho fora dele;
- informações técnicas do aparelho e do aplicativo, como sistema operacional, idioma, país/região e versão do aplicativo;
- o endereço IP, como em qualquer conexão pela internet.

Esses dados são usados apenas para entregar a configuração certa ao aplicativo. O identificador de instalação deixa de ser usado quando você desinstala o aplicativo; uma nova instalação gera outro.

### 2.6 Verificação de segurança (Firebase App Check)

Para impedir que robôs ou cópias modificadas do aplicativo usem o nosso servidor, o Mobility usa o **Firebase App Check** (Google LLC). Antes de consultar o servidor, o aplicativo pede ao sistema do aparelho um atestado de que ele é a versão original, instalada pela loja:

- no Android, pelo **Google Play Integrity**;
- no iOS, pelo **App Attest** ou **DeviceCheck** da Apple.

Nesse processo, o Google e a Apple recebem informações técnicas sobre a integridade do aparelho e do aplicativo (por exemplo, se o aplicativo é original e se o sistema não foi adulterado), o identificador do aplicativo e o endereço IP. Nós recebemos apenas um sinal de "aprovado" ou "recusado"; nenhuma informação sobre você ou o seu aparelho chega ao nosso servidor. Essa verificação é necessária para o serviço funcionar e não pode ser desligada, mas não é usada para publicidade nem para criar perfis.

### 2.7 Estatísticas de uso (Google Analytics for Firebase): só com a sua permissão

Para entender como o aplicativo é usado e onde melhorá-lo, o Mobility pode usar o **Google Analytics for Firebase** (Google LLC), **somente se você permitir**. As estatísticas ficam **desligadas por padrão**: você escolhe na abertura do aplicativo e pode mudar de ideia a qualquer momento em **Ajustes › Privacidade › Estatísticas de uso**.

Com a sua permissão, são registrados:

- as telas abertas (pelo nome da tela, como "detalhes da linha", sem os códigos consultados);
- algumas ações: abrir uma linha, favoritar ou desfavoritar uma linha, iniciar um acompanhamento, adicionar um ponto ao widget, fazer uma busca (apenas a quantidade de resultados) e trocar de cidade;
- a cidade escolhida e, nas ações que envolvem uma linha, o **código da linha** (o letreiro, como "8000-10") e o sentido (ida ou volta);
- dados técnicos coletados automaticamente pelo SDK, como um identificador gerado aleatoriamente para esta instalação, modelo e sistema do aparelho, idioma, versão do aplicativo, país/região estimados pelo IP, além do início e da duração das sessões.

As estatísticas **não incluem** a localização do GPS, os pontos de ônibus consultados, os termos que você digita nas buscas, os seus favoritos nem o identificador de publicidade do aparelho (IDFA ou ID de publicidade do Android). Elas não são usadas para publicidade, não são cruzadas com dados dos anúncios e nós só vemos números agregados, como "quantas pessoas abriram a linha X nesta semana".

Esses dados são tratados pelo Google em servidores fora do Brasil, principalmente nos **Estados Unidos** (seção 5). Sem a sua permissão, ou depois que você a revogar, o aplicativo não envia nenhum dado ao Google Analytics e continua funcionando normalmente.

### 2.8 Anúncios: personalizados só com a sua permissão

O Mobility é gratuito e exibe anúncios do **Google AdMob** (Google LLC), em faixas (banners) nas telas principais e em tela cheia ao abrir as telas de linha, de ponto e de mapa. Para exibir, limitar a repetição, medir e evitar fraudes nos anúncios, o SDK do Google instalado no aplicativo coleta, diretamente do seu aparelho:

- o identificador de publicidade do aparelho (IDFA no iOS ou ID de publicidade no Android), **somente se você permitir anúncios personalizados**;
- o endereço IP, do qual se estima uma localização aproximada (cidade ou região);
- informações técnicas do aparelho e do aplicativo, como modelo, sistema operacional, idioma e versão do aplicativo;
- interações com os anúncios, como exibições e toques.

**Você escolhe se os anúncios podem ser personalizados** na primeira abertura do aplicativo e pode mudar essa escolha a qualquer momento em **Ajustes › Privacidade › Anúncios personalizados**:

- **Anúncios personalizados:** o Google pode usar o identificador de publicidade para mostrar anúncios relacionados aos seus interesses, tratando os dados em servidores fora do Brasil, como nos Estados Unidos. **Essa opção é só para maiores de 18 anos:** antes de ativá-la, o aplicativo pergunta a sua idade (seção 10). No iOS, ela também depende de você permitir o rastreamento no pedido do sistema ("Permitir que o app rastreie").
- **Anúncios genéricos (o padrão, sem a sua permissão):** o identificador de publicidade não é usado e os anúncios se baseiam apenas no contexto do momento, como o aplicativo e a região aproximada. Mesmo assim, o Google ainda trata o IP e os dados técnicos acima para entregar, medir e proteger os anúncios.

O Mobility **não envia ao AdMob** a localização do GPS, as linhas e pontos que você consulta, os seus favoritos ou o seu histórico de buscas. Os anúncios são configurados para conteúdo adequado a todos os públicos. No Android, você também pode redefinir ou excluir o ID de publicidade nas configurações do sistema (Google › Anúncios).

## 3. O que não fazemos

- Não vendemos nem alugamos dados.
- Não pedimos cadastro nem mantemos contas de usuários.
- Não guardamos a sua localização nem um histórico das linhas e pontos que você consulta.
- Não usamos a sua localização, as suas buscas ou os seus favoritos para publicidade.
- Não ligamos as estatísticas de uso nem personalizamos anúncios sem o seu consentimento.
- Não usamos notificações para publicidade.
- Não tomamos decisões automatizadas sobre você.

## 4. Com quem as informações são compartilhadas

- **Fontes de dados de transporte:** a SPTrans (API Olho Vivo e GTFS), o Metrô de São Paulo, a CPTM, a ViaMobilidade, a TIC Trens e a Linha Uni em São Paulo; a Prefeitura do Rio de Janeiro (dados de mobilidade), o MetrôRio e o VLT Carioca no Rio de Janeiro. Quem as consulta é o nosso servidor, não o seu aparelho: a SPTrans recebe apenas os termos de busca e os códigos de linha e de ponto, e as demais fontes não recebem nada relacionado a você. Nenhuma delas recebe a sua localização nem o seu IP.
- **Google (Firebase Remote Config, App Check, Analytics e Cloud Messaging):** recebe os dados das seções 2.4 a 2.7, diretamente do seu aparelho ou, no caso das notificações push, do nosso servidor. Atua como **operador**, seguindo as nossas instruções e os termos de proteção de dados do Firebase. Política do Firebase: https://firebase.google.com/support/privacy.
- **Google (AdMob):** recebe os dados da seção 2.8, diretamente do seu aparelho. Na publicidade, o Google atua como **controlador independente**, com responsabilidade própria pelo que faz com esses dados, e pode compartilhá-los com parceiros de publicidade conforme a política dele; no caso de anúncios personalizados, apenas com o seu consentimento. Políticas: https://policies.google.com/privacy e https://policies.google.com/technologies/partner-sites.
- **Apple (App Attest, DeviceCheck e notificações push):** recebe os dados técnicos da seção 2.6 e, no modo atualizado pelo servidor, o código de envio e o conteúdo das notificações (seção 2.4). Segue a política de privacidade da Apple.
- **Provedores de mapas (Apple Maps no iOS e Google Maps no Android):** exibem o mapa dentro do aplicativo, recebem a área do mapa exibida e dados técnicos do aparelho, e seguem as próprias políticas de privacidade.
- **Provedores de infraestrutura:** a Oracle (Oracle Cloud), que hospeda o nosso servidor em Vinhedo (SP), e o Supabase, que guarda o banco de dados do transporte público (sem dados de usuários) em São Paulo. Os dois atuam sob as nossas instruções e mantêm esses dados no Brasil.
- **Provedor de e-mail:** se você nos escrever, a mensagem passa pelo provedor do nosso e-mail (Yahoo).
- **Autoridades:** quando houver obrigação legal ou ordem judicial.

## 5. Transferência internacional

O nosso servidor e o banco de dados ficam **no Brasil** (seção 4). O Google, a Apple e o provedor do nosso e-mail tratam dados em servidores fora do Brasil, principalmente nos Estados Unidos:

- **Configuração remota, verificação de segurança e entrega de notificações (Google e Apple):** a transferência é necessária para prestar o serviço que você pediu, já que sem ela o aplicativo não encontra nem acessa o servidor e as atualizações do acompanhamento não chegam ao aparelho (art. 33, IX, da LGPD).
- **Estatísticas de uso e anúncios personalizados:** só com o seu consentimento específico, dado nas telas de escolha, que informam esse envio (art. 33, VIII).
- **Anúncios genéricos e mapas:** o Google e a Apple coletam esses dados diretamente pelo SDK, como controladores independentes, sob as próprias políticas e garantias.
- **E-mail:** se você nos escrever, a mensagem é tratada pelo provedor do nosso e-mail, a seu pedido.

Você pode pedir mais informações sobre essas transferências pelo e-mail do encarregado.

## 6. Bases legais

Tratamos as informações com base em:

- **execução do serviço** que você solicitou (art. 7º, V): uso da localização no aparelho, consultas de linhas, pontos, previsões e mapa, acompanhamento de um ônibus (inclusive as notificações enviadas pelo servidor) e dados guardados no aparelho;
- **consentimento** (art. 7º, I): estatísticas de uso e uso do identificador de publicidade para anúncios personalizados;
- **legítimo interesse** (art. 7º, IX, e art. 10): verificação de segurança (App Check), configuração remota, exibição de anúncios genéricos que mantêm o aplicativo gratuito e proteção do servidor contra abusos, sempre limitados ao mínimo necessário e sem criar perfis seus;
- **cumprimento de obrigação legal e exercício regular de direitos** (art. 7º, II e VI): atendimento e guarda dos pedidos que você nos enviar.

As permissões do sistema (localização, notificações e, no iOS, rastreamento) continuam sob o seu controle e podem ser revogadas a qualquer momento.

## 7. Seus direitos e como exercê-los

Pelo art. 18 da LGPD, você pode, a qualquer momento:

- confirmar se tratamos dados seus e acessá-los;
- corrigir dados incompletos, inexatos ou desatualizados;
- pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;
- pedir a portabilidade dos dados;
- pedir a eliminação dos dados tratados com o seu consentimento;
- saber com quem compartilhamos os seus dados;
- ser informado sobre a possibilidade de não dar consentimento e o que acontece se você não der;
- revogar o consentimento, de forma tão fácil quanto o deu;
- se opor a um tratamento baseado em legítimo interesse;
- reclamar à Autoridade Nacional de Proteção de Dados (ANPD): https://www.gov.br/anpd.

Como o Mobility não tem cadastro e o servidor não guarda quem fez cada consulta, normalmente não temos dados que permitam identificar você. Por isso, a maior parte dos seus direitos é exercida diretamente no aplicativo:

- **Estatísticas de uso:** permita ou revogue em **Ajustes › Privacidade › Estatísticas de uso**.
- **Anúncios personalizados:** ligue ou desligue em **Ajustes › Privacidade › Anúncios personalizados**. No iOS, você também pode negar o rastreamento em Ajustes › Privacidade e Segurança › Rastreamento. Quem está em regiões onde o Google exige um formulário próprio de consentimento (como a União Europeia) encontra em Ajustes o atalho "Opções de privacidade do Google".
- **Acompanhamento:** encerre-o no aplicativo; os dados do modo atualizado pelo servidor são apagados em seguida.
- **Localização e notificações:** revogue nos ajustes do sistema.
- **Dados no aparelho:** remova pelo aplicativo ou apague os dados do aplicativo / desinstale-o.
- **Dados tratados pelo Google para anúncios:** consulte e gerencie em https://myadcenter.google.com.

Para os demais pedidos, escreva para **destny.miguel@gmail.com**. Responderemos em até 15 dias (art. 19, II, da LGPD).

## 8. Retenção

- **Dados no aparelho:** ficam lá até você removê-los ou desinstalar o aplicativo.
- **Servidor:** o IP fica em memória por, no máximo, 1 minuto; os limites do mapa não são guardados; as respostas de buscas ficam em cache por até 12 horas, sem vínculo com você; os registros técnicos de funcionamento são apagados em até 30 dias.
- **Acompanhamento atualizado pelo servidor:** o código de envio de notificações e os códigos da linha e do ponto são apagados quando o ônibus chega, quando você encerra o acompanhamento ou em até 2 horas do início.
- **Estatísticas de uso (se permitidas):** os dados de cada instalação ficam no Google Analytics por 2 meses e depois são apagados; os relatórios agregados, que não identificam ninguém, podem ser mantidos.
- **Configuração remota, verificação de segurança e notificações push:** seguem os prazos do Google e da Apple; o identificador de instalação deixa de ser usado ao desinstalar o aplicativo.
- **Anúncios:** seguem os prazos da política do Google.
- **Pedidos e mensagens enviados a nós:** guardados por até 5 anos após o atendimento, para comprovar que respondemos.

## 9. Segurança

A comunicação com o nosso servidor é criptografada (HTTPS) e só é aceita de cópias originais do aplicativo (seção 2.6). O servidor e o banco de dados ficam em ambientes com acesso restrito no Brasil, e as coordenadas do GPS não saem do seu aparelho. Mesmo assim, nenhum sistema é totalmente imune a falhas. Se ocorrer um incidente de segurança que possa trazer risco ou dano relevante a você, você e a ANPD serão comunicados, conforme o art. 48 da LGPD e a Resolução CD/ANPD nº 15/2024. Como não temos o seu contato, o aviso será feito no próprio aplicativo e no site do Mobility.

## 10. Crianças e adolescentes

O Mobility é um aplicativo de transporte público para o público em geral e pode ser usado por adolescentes. Não é direcionado a crianças (menores de 12 anos) e não coleta intencionalmente dados delas.

- **Anúncios personalizados são só para maiores de 18 anos.** Antes de ativá-los, o aplicativo pergunta se você tem 18 anos ou mais. Se você responder que tem menos, os anúncios ficam genéricos e o Google é avisado de que os pedidos de anúncio devem ser tratados como de um menor de idade. Não fazemos perfilamento de crianças e adolescentes para publicidade (Lei nº 15.211/2025 – ECA Digital, e art. 14 da LGPD).
- Todos os anúncios são configurados para conteúdo adequado a todos os públicos.
- O aplicativo não tem chat, perfis públicos, compras ou conteúdo gerado por usuários.

Se você é responsável por uma criança ou adolescente e tem alguma dúvida ou pedido, fale com o encarregado.

## 11. Usuários fora do Brasil

O Mobility é oferecido para o transporte público de cidades brasileiras e é direcionado a pessoas no Brasil; esta Política segue a LGPD. Se a legislação de outro país se aplicar ao seu caso, como o Regulamento Geral sobre a Proteção de Dados da União Europeia (GDPR), as bases deste documento correspondem às do art. 6º do GDPR (consentimento, execução do serviço solicitado e legítimo interesse) e você pode exercer os direitos de acesso, retificação, eliminação, limitação, portabilidade, oposição e revogação do consentimento pelo mesmo e-mail do encarregado, além de reclamar à autoridade de proteção de dados do seu país.

## 12. Alterações nesta política

Podemos atualizar esta Política para refletir mudanças no aplicativo ou na lei. A data e a versão no topo indicam a versão em vigor. Mudanças relevantes, como novas finalidades, novos compartilhamentos ou novos prazos, serão avisadas no próprio aplicativo antes de valerem e, quando dependerem do seu consentimento, ele será pedido de novo. As versões anteriores podem ser solicitadas pelo e-mail do encarregado.

## 13. Contato

Dúvidas sobre esta Política ou sobre os seus dados: **destny.miguel@gmail.com** (encarregado: Miguel Balbo Victor).

Histórico de versões:

- Versão 2 (17 de outubro de 2026): estatísticas de uso só com consentimento; regra de idade para anúncios personalizados; acompanhamento atualizado pelo servidor por notificações push, sem localização em segundo plano; verificação de segurança (App Check); correção da retenção no servidor; papel de cada empresa; transferência internacional; usuários fora do Brasil.
- Versão 1 (17 de outubro de 2026): estatísticas de uso (Google Analytics for Firebase) e detalhamento do mapa de pontos.
